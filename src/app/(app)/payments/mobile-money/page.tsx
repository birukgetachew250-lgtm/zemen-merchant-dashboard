
'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { paymentProviders, PaymentProvider } from '../data';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Operator } from '@prisma/client';

const phoneRegex = /^(?:\+251|0)?[79]\d{8}$/;
const bankAccountRegex = /^[0-9]{10,20}$/;

const formSchema = z.object({
  operatorId: z.string({ required_error: 'Please select an operator.' }),
  amount: z.coerce.number().positive({ message: 'Please enter a valid amount.' }),
  provider: z.string({ required_error: 'Please select a payment provider.' }),
  identifier: z.string().min(1, 'This field is required.'),
}).refine(data => {
    const provider = paymentProviders.find(p => p.id === data.provider);
    if (provider?.type === 'wallet') {
        return phoneRegex.test(data.identifier);
    }
    if (provider?.type === 'bank') {
        return bankAccountRegex.test(data.identifier);
    }
    return false;
}, {
    message: 'Please enter a valid phone or account number.',
    path: ['identifier'],
});


export default function MobileMoneyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSending, setIsSending] = React.useState(false);
  const [operators, setOperators] = React.useState<Operator[]>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const selectedProviderId = form.watch('provider');
  const selectedProvider = paymentProviders.find(p => p.id === selectedProviderId);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSending(true);

    // Simulate sending USSD push / OTP
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
        title: "Request Sent",
        description: `A payment request has been sent to the customer.`,
    });
    
    const params = new URLSearchParams({
        operatorId: values.operatorId,
        amount: values.amount.toString(),
        provider: values.provider,
        identifier: values.identifier,
    });

    router.push(`/payments/mobile-money/verify?${params.toString()}`);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
        <Header title="Mobile Money / Bank Transfer" />
        <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
            <Card className="w-full max-w-3xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                         <CardHeader>
                            <CardTitle>Initiate Mobile Payment</CardTitle>
                            <CardDescription>
                                Enter transaction details and select a provider to send a payment request.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                <SelectItem key={op.id} value={op.id}>{op.name} - {op.merchantId}</SelectItem>
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
                            </div>

                             <FormField
                                control={form.control}
                                name="provider"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Select Payment Provider</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                            >
                                                {paymentProviders.map((provider) => (
                                                    <FormItem key={provider.id}>
                                                        <FormControl>
                                                             <RadioGroupItem value={provider.id} className="sr-only" />
                                                        </FormControl>
                                                         <FormLabel className={cn(
                                                            "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                                            field.value === provider.id && "border-primary"
                                                         )}>
                                                            <Image src={provider.logoUrl} alt={provider.name} width={80} height={40} className="object-contain h-10 mb-2"/>
                                                            <span className="text-xs font-normal">{provider.name}</span>
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            
                            {selectedProvider && (
                                <FormField
                                    control={form.control}
                                    name="identifier"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>{selectedProvider.type === 'wallet' ? 'Customer Phone Number' : 'Customer Bank Account'}</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type={selectedProvider.type === 'wallet' ? 'tel' : 'text'}
                                                placeholder={selectedProvider.type === 'wallet' ? '0911...' : '1000...'} 
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </CardContent>
                         <CardFooter>
                            <Button type="submit" disabled={isSending || !selectedProvider} className="w-full md:w-auto">
                                {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Send Payment Request
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </main>
    </div>
  );
}
