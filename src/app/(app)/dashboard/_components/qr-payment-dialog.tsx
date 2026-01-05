'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
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
import { operators, Operator } from '@/lib/data';
import Image from 'next/image';
import { Loader2, QrCode } from 'lucide-react';

const formSchema = z.object({
  operatorId: z.string({ required_error: 'Please select an operator.' }),
  amount: z.coerce.number().positive({ message: 'Please enter a valid amount.' }),
});

export function QrPaymentDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
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

    // This data would conform to the National Bank's QR standard.
    // For this example, we'll just use a simple string.
    const qrData = `Account: ${operator.bankAccount}\nAmount: ${values.amount}\nMerchant: ${operator.merchant}`;
    
    // Using an external service to generate the QR code image
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=250x250`;
    
    // In a real app, you would fetch this. For the prototype we can just set it.
    setQrCodeUrl(qrApiUrl);
    setIsGenerating(false);
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
        form.reset();
        setQrCodeUrl(null);
        setIsGenerating(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="h-auto py-4 flex-col gap-2">
            <QrCode className="h-6 w-6"/>
            <span>QR Payment</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate QR Payment</DialogTitle>
          <DialogDescription>
            Select an operator and enter the amount to generate a payment QR code.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            {qrCodeUrl ? (
                <div className="flex flex-col items-center justify-center gap-4">
                    <Image src={qrCodeUrl} alt="Generated QR Code" width={250} height={250} />
                    <p className="text-sm text-center text-muted-foreground">
                        Operator: {operator?.name} <br/>
                        Amount: {form.getValues('amount')} ETB
                    </p>
                    <Button onClick={() => setQrCodeUrl(null)}>Generate New QR Code</Button>
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <DialogFooter>
                            <Button type="submit" disabled={isGenerating}>
                                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Generate QR Code
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
