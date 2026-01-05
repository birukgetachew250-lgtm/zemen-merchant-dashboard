'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { operators } from '@/lib/data';
import Image from 'next/image';
import { Loader2, ArrowLeft } from 'lucide-react';
import { constructQrCodeString } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const formSchema = z.object({
  operatorId: z.string({ required_error: 'Please select an operator.' }),
  amount: z.coerce.number().positive({ message: 'Please enter a valid amount.' }),
});

export default function QrPaymentPage() {
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const selectedOperatorId = form.watch('operatorId');
  const operator = operators.find(op => op.id === selectedOperatorId);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!operator) return;

    setIsGenerating(true);
    setQrCodeUrl(null);

    const qrData = constructQrCodeString(operator.bankAccount, operator.merchant, values.amount);
    
    // Using a timeout to give the UI time to update before the API call,
    // which can sometimes block the main thread briefly.
    setTimeout(() => {
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=300x300`;
        setQrCodeUrl(qrApiUrl);
        setIsGenerating(false);
    }, 50);
  }

  const handleNewQr = () => {
    form.reset();
    setQrCodeUrl(null);
    setIsGenerating(false);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
        <Header title="Generate QR Payment" />
        <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
            <Card className="w-full max-w-md">
                {qrCodeUrl ? (
                    <>
                        <CardHeader>
                            <CardTitle>Payment QR Code</CardTitle>
                            <CardDescription>
                                Customer can scan this code to pay.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center gap-4">
                            <div className="p-4 bg-white rounded-lg">
                                <Image src={qrCodeUrl} alt="Generated QR Code" width={300} height={300} />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-lg">{operator?.merchant}</p>
                                <p className="text-sm text-muted-foreground">Operator: {operator?.name}</p>
                                <p className="text-2xl font-bold mt-2">
                                    {form.getValues('amount').toLocaleString('en-US', { style: 'currency', currency: 'ETB' })}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className='flex-col gap-4'>
                            <Button onClick={handleNewQr} className='w-full'>Generate New QR Code</Button>
                            <Button variant="link" asChild><Link href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4"/>Back to Dashboard</Link></Button>
                        </CardFooter>
                    </>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                             <CardHeader>
                                <CardTitle>Generate QR Payment</CardTitle>
                                <CardDescription>
                                    Select an operator and enter the amount to generate a payment QR code.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="operatorId"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Operator</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an operator" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                            {operators.filter(op => op.status === 'Active').map(op => (
                                                <SelectItem key={op.id} value={op.id}>{op.name} - {op.merchant}</SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Amount (ETB)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="0.00" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                             <CardFooter>
                                <Button type="submit" disabled={isGenerating} className="w-full">
                                    {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Generate QR Code
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                )}
            </Card>
        </main>
    </div>
  );
}
