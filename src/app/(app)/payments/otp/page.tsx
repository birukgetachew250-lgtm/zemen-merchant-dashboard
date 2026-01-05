
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
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  operatorId: z.string({ required_error: 'Please select an operator.' }),
  amount: z.coerce.number().positive({ message: 'Please enter a valid amount.' }),
  phone: z.string().regex(/^(?:\+251|0)?[79]\d{8}$/, { message: 'Please enter a valid Ethiopian phone number.' }),
});

export default function OtpPaymentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSending, setIsSending] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSending(true);

    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
        title: "OTP Sent",
        description: `An OTP has been sent to ${values.phone}.`,
    });

    setIsSending(false);
    
    const params = new URLSearchParams({
        operatorId: values.operatorId,
        amount: values.amount.toString(),
        phone: values.phone,
    });

    router.push(`/payments/otp/verify?${params.toString()}`);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
        <Header title="Generate OTP Payment" />
        <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
            <Card className="w-full max-w-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                         <CardHeader>
                            <CardTitle>Generate OTP Payment</CardTitle>
                            <CardDescription>
                                Enter transaction details to send a payment OTP to the customer.
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
                             <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Customer Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="+251 91 123 4567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                         <CardFooter>
                            <Button type="submit" disabled={isSending} className="w-full">
                                {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send OTP
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </main>
    </div>
  );
}
