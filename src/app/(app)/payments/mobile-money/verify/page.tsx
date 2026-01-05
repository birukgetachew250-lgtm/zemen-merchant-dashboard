
'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { paymentProviders } from '../../data';
import Image from 'next/image';
import { Operator } from '@prisma/client';

const COUNTDOWN_SECONDS = 90;

export default function VerifyMobileMoneyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [status, setStatus] = React.useState<'pending' | 'verifying' | 'success'>('pending');
  const [countdown, setCountdown] = React.useState(COUNTDOWN_SECONDS);

  const operatorId = searchParams.get('operatorId');
  const amount = searchParams.get('amount');
  const providerId = searchParams.get('provider');
  const identifier = searchParams.get('identifier');
  
  // In a real app this would be fetched from an API
  const [operator, setOperator] = React.useState<Operator | null>(null);
  const provider = paymentProviders.find(p => p.id === providerId);

  React.useEffect(() => {
    if (!operatorId || !amount || !providerId || !identifier) {
      toast({ variant: 'destructive', title: 'Error', description: 'Missing transaction details. Please start over.' });
      router.push('/payments/mobile-money');
    }
  }, [operatorId, amount, providerId, identifier, router, toast]);

  React.useEffect(() => {
    if (status === 'pending' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (status === 'pending' && countdown === 0) {
        setStatus('verifying');
        // Simulate checking for payment status
        setTimeout(() => {
            // In a real app, you'd check a webhook or poll an endpoint.
            // We'll simulate a failure here for demonstration.
            toast({
                variant: 'destructive',
                title: "Payment Timed Out",
                description: "The customer did not approve the payment in time.",
            });
            router.push('/payments/mobile-money');
        }, 2000);
    }
  }, [countdown, status, router, toast]);

  // This would be replaced by a webhook or server-sent event in a real app
  React.useEffect(() => {
    if (status === 'pending') {
        const fakeWebhookCall = setTimeout(() => {
            setStatus('success');
            toast({
                title: "Payment Successful!",
                description: `${formatCurrency(Number(amount))} has been processed.`,
                className: 'bg-green-100 text-green-800 border-green-300'
            });
        }, 8000); // Simulate customer taking 8 seconds to approve
        return () => clearTimeout(fakeWebhookCall);
    }
  }, [status, amount, toast]);


  if (!provider || !amount || !identifier) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
        <Header title="Verify Mobile Money Payment" />
        <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
            <Card className="w-full max-w-md">
                 <CardHeader>
                    <CardTitle className="text-center">{
                        status === 'pending' ? 'Awaiting Customer Confirmation' : 
                        status === 'verifying' ? 'Verifying Payment...' : 'Payment Successful!'
                    }</CardTitle>
                    <CardDescription className="text-center">
                        A payment request for <span className="font-semibold text-foreground">{formatCurrency(Number(amount))}</span> was sent to the customer.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                        <Image src={provider.logoUrl} alt={provider.name} width={120} height={60} className="object-contain h-16"/>
                        {status === 'success' && (
                            <div className="absolute -right-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                                <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                        )}
                    </div>

                    <div className="text-center">
                        <p className="font-semibold text-lg">{provider.name}</p>
                        <p className="text-muted-foreground">{identifier}</p>
                    </div>

                    <div className="text-center space-y-2">
                        {status === 'pending' && (
                            <>
                                <p className="text-sm">Please ask the customer to enter their PIN on the prompt they receive on their phone to authorize the payment.</p>
                                <div className="text-lg font-mono pt-2">
                                    Time remaining: {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
                                </div>
                            </>
                        )}
                        {status === 'verifying' && (
                           <div className="flex items-center gap-2 text-muted-foreground">
                             <Loader2 className="h-5 w-5 animate-spin" />
                             <span>Checking payment status...</span>
                           </div>
                        )}
                         {status === 'success' && (
                           <div className="flex flex-col items-center gap-2 text-green-600">
                             <p>The payment has been successfully confirmed.</p>
                           </div>
                        )}
                    </div>
                </CardContent>
                 <CardFooter className="flex-col gap-4">
                    {status === 'success' ? (
                        <Button asChild className="w-full"><Link href="/dashboard">Back to Dashboard</Link></Button>
                    ) : (
                        <Button variant="outline" asChild><Link href="/payments/mobile-money"><ArrowLeft className="mr-2 h-4 w-4"/>Cancel Payment</Link></Button>
                    )}
                </CardFooter>
            </Card>
        </main>
    </div>
  );
}
