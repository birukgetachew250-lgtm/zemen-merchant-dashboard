
'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
import { Loader2, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { operators } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

const formSchema = z.object({
  otp: z.string().min(6, { message: 'OTP must be 6 digits.' }).max(6),
});

const SIMULATED_OTP = "123456";
const COUNTDOWN_SECONDS = 60;

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [countdown, setCountdown] = React.useState(COUNTDOWN_SECONDS);
  const [isResending, setIsResending] = React.useState(false);

  const operatorId = searchParams.get('operatorId');
  const amount = searchParams.get('amount');
  const phone = searchParams.get('phone');
  const operator = operators.find(op => op.id === operatorId);

  React.useEffect(() => {
    if (!operatorId || !amount || !phone) {
      toast({ variant: 'destructive', title: 'Error', description: 'Missing transaction details. Please start over.' });
      router.push('/payments/otp');
    }
  }, [operatorId, amount, phone, router, toast]);

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    setIsResending(true);
    setCountdown(COUNTDOWN_SECONDS);
    // Simulate resending OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
        title: "OTP Resent",
        description: `A new OTP has been sent to ${phone}.`,
    });
    setIsResending(false);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsVerifying(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (values.otp === SIMULATED_OTP) {
        toast({
            title: "Payment Successful!",
            description: `${formatCurrency(Number(amount))} has been processed.`,
            className: 'bg-green-100 text-green-800 border-green-300'
        });
        router.push('/dashboard');
    } else {
        toast({
            variant: 'destructive',
            title: "Invalid OTP",
            description: "The OTP you entered is incorrect. Please try again.",
        });
        form.setError("otp", { type: "manual", message: "Incorrect OTP." });
    }
    setIsVerifying(false);
  }

  if (!operator || !amount || !phone) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
        <Header title="Verify OTP Payment" />
        <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
            <Card className="w-full max-w-md">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                         <CardHeader>
                            <CardTitle>Enter OTP</CardTitle>
                            <CardDescription>
                                An OTP was sent to <span className="font-semibold text-foreground">{phone}</span>. 
                                Please enter it below to confirm the payment of <span className="font-semibold text-foreground">{formatCurrency(Number(amount))}</span>.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>One-Time Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="123456" 
                                            {...field} 
                                            maxLength={6}
                                            className="text-center text-lg tracking-[0.5em]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="text-sm text-center text-muted-foreground">
                                {countdown > 0 ? (
                                    <p>Resend OTP in {countdown}s</p>
                                ) : (
                                    <Button 
                                        type="button" 
                                        variant="link" 
                                        onClick={handleResend}
                                        disabled={isResending}
                                        className="p-0 h-auto"
                                    >
                                        {isResending ? 'Resending...' : 'Resend OTP'}
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                         <CardFooter className="flex-col gap-4">
                            <Button type="submit" disabled={isVerifying} className="w-full">
                                {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Verify & Pay
                            </Button>
                            <Button variant="link" asChild><Link href="/payments/otp"><ArrowLeft className="mr-2 h-4 w-4"/>Go Back</Link></Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </main>
    </div>
  );
}
