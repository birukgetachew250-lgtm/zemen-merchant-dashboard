'use client';

import { Header } from "@/components/layout/header";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { KeyRound, QrCode, Smartphone } from "lucide-react";
import Link from "next/link";

export default function PaymentsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Payments" />
            <main className="flex flex-1 flex-col items-center gap-4 p-4 pt-10 md:gap-8 md:p-8">
                <Card className="w-full max-w-4xl">
                    <CardHeader className="text-center">
                        <CardTitle>Select Payment Method</CardTitle>
                        <CardDescription>
                            Choose how you want to generate a payment request.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <Link href="/payments/qr" className="group">
                             <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border p-6 text-center transition-all hover:bg-accent hover:text-accent-foreground">
                                <QrCode className="h-10 w-10 text-primary transition-transform group-hover:scale-110"/>
                                <h3 className="text-lg font-semibold">Generate IPS QR</h3>
                                <p className="text-sm text-muted-foreground">Create a QR code for customer payment.</p>
                            </div>
                        </Link>
                         <Link href="/payments/otp" className="group">
                             <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border p-6 text-center transition-all hover:bg-accent hover:text-accent-foreground">
                                <KeyRound className="h-10 w-10 text-primary transition-transform group-hover:scale-110"/>
                                <h3 className="text-lg font-semibold">Send OTP Payment</h3>
                                <p className="text-sm text-muted-foreground">Send a one-time password to a customer.</p>
                            </div>
                        </Link>
                        <Link href="/payments/mobile-money" className="group">
                             <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border p-6 text-center transition-all hover:bg-accent hover:text-accent-foreground">
                                <Smartphone className="h-10 w-10 text-primary transition-transform group-hover:scale-110"/>
                                <h3 className="text-lg font-semibold">Mobile Money</h3>
                                <p className="text-sm text-muted-foreground">Accept payments from any wallet or bank.</p>
                            </div>
                        </Link>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
