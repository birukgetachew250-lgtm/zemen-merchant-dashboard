
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
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
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  publicKey: z.string().startsWith('pk_').min(16, "Invalid Public Key"),
  secretKey: z.string().startsWith('sk_').min(16, "Invalid Secret Key"),
  testMode: z.boolean().default(false),
});

export function GatewaySettings() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [showSecret, setShowSecret] = React.useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { 
            publicKey: "pk_test_xxxxxxxxxxxxxxxx",
            secretKey: "sk_test_xxxxxxxxxxxxxxxx",
            testMode: true 
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
            title: "Gateway Settings Saved",
            description: "Your payment gateway API keys have been updated.",
        });

        setIsSubmitting(false);
    }

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Payment Gateway</CardTitle>
                        <CardDescription>Configure your API keys for processing payments.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="publicKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Public Key</FormLabel>
                                    <FormControl>
                                        <Input placeholder="pk_live_..." {...field} />
                                    </FormControl>
                                    <FormDescription>This key is safe to be shared publicly.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="secretKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Secret Key</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input 
                                                type={showSecret ? 'text' : 'password'}
                                                placeholder="sk_live_..." 
                                                {...field} />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                                            onClick={() => setShowSecret(!showSecret)}
                                        >
                                            {showSecret ? <EyeOff /> : <Eye />}
                                        </Button>
                                    </div>
                                    <FormDescription>This key should never be shared. Keep it confidential.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="testMode"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Test Mode
                                        </FormLabel>
                                        <FormDescription>
                                            Use test keys to simulate transactions without actual charges.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save API Keys
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
