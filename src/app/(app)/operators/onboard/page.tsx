'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { merchants } from '@/lib/data';

const formSchema = z.object({
    operatorName: z.string().min(2, { message: "Operator name must be at least 2 characters." }),
    merchantId: z.string({ required_error: "Please select a merchant." }),
    contactPhone: z.string().regex(/^\+?[0-9]{10,15}$/, { message: "Invalid phone number format." }),
    email: z.string().email({ message: "Invalid email address." }),
    bankAccount: z.string().regex(/^[0-9]{10,20}$/, { message: "Invalid bank account number." }),
});

export default function OnboardOperatorPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        operatorName: "",
        contactPhone: "",
        email: "",
        bankAccount: "",
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        toast({
            title: "Operator Onboarding Submitted",
            description: `Operator ${values.operatorName} has been created and assigned.`,
        });
        router.push('/operators');
    }, 2000);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Onboard New Operator" />
      <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
        <Card className="w-full max-w-2xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Operator Information</CardTitle>
                        <CardDescription>Fill out the form below to onboard a new operator.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="operatorName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Operator Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Haile Gebrselassie" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="merchantId"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Assign to Merchant</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a merchant to assign this operator to" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {merchants.map(merchant => (
                                        <SelectItem key={merchant.id} value={merchant.id}>{merchant.name} - {merchant.branch}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="bankAccount"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Zemen Bank Account Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="13-digit account number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This account will be used for settlement.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="contactPhone"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Contact Phone</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="+251 91 123 4567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="operator@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Operator
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
      </main>
    </div>
  );
}
