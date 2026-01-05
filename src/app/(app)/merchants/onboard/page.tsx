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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { FileUp, Loader2 } from 'lucide-react';
import React from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const formSchema = z.object({
    merchantName: z.string().min(2, { message: "Merchant name must be at least 2 characters." }),
    branch: z.string().min(2, { message: "Branch name must be at least 2 characters." }),
    contactPerson: z.string().min(2, { message: "Contact person name is required." }),
    contactPhone: z.string().regex(/^\+?[0-9]{10,15}$/, { message: "Invalid phone number format." }),
    email: z.string().email({ message: "Invalid email address." }),
    address: z.string().min(10, { message: "Address must be at least 10 characters." }),
    businessLicense: z.any()
        .refine((files) => files?.length == 1, 'Business license is required.')
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => ALLOWED_FILE_TYPES.includes(files?.[0]?.type),
            'Only .jpg, .png, and .pdf files are accepted.'
        ),
    companyRegistration: z.any()
        .refine((files) => files?.length == 1, 'Company registration is required.')
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => ALLOWED_FILE_TYPES.includes(files?.[0]?.type),
            'Only .jpg, .png, and .pdf files are accepted.'
        ),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions.",
    }),
});

function FileUploadDisplay({ file }: { file: File | null }) {
    if (!file) return null;
    return (
        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground bg-muted p-2 rounded-md">
            <span>{file.name}</span>
            <span>{(file.size / 1024).toFixed(2)} KB</span>
        </div>
    );
}

export default function OnboardMerchantPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        merchantName: "",
        branch: "",
        contactPerson: "",
        contactPhone: "",
        email: "",
        address: "",
        terms: false,
    }
  });

  const businessLicenseRef = form.register("businessLicense");
  const companyRegistrationRef = form.register("companyRegistration");
  const businessLicenseFile = form.watch('businessLicense')?.[0];
  const companyRegistrationFile = form.watch('companyRegistration')?.[0];


  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false);
        toast({
            title: "Onboarding Request Submitted",
            description: `Request for ${values.merchantName} has been submitted for approval.`,
        });
        router.push('/merchants');
    }, 2000);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Onboard New Merchant" />
      <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
        <Card className="w-full max-w-4xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Merchant Information</CardTitle>
                        <CardDescription>Fill out the form below to onboard a new merchant.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="merchantName"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Merchant Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Bole Cafe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="branch"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Branch</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., CMC Branch" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="contactPerson"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Contact Person</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Almaz Ayana" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                        <Input type="email" placeholder="contact@bolecafe.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-6">
                             <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Full Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Woreda, Kebele, House No." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="businessLicense"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business License</FormLabel>
                                    <FormControl>
                                        <Button asChild variant="outline" className="w-full">
                                            <label className="cursor-pointer">
                                                <FileUp className="mr-2 h-4 w-4" />
                                                Upload Document
                                                <Input type="file" className="sr-only" {...businessLicenseRef} />
                                            </label>
                                        </Button>
                                    </FormControl>
                                    <FileUploadDisplay file={businessLicenseFile} />
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="companyRegistration"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Registration / TIN</FormLabel>
                                    <FormControl>
                                         <Button asChild variant="outline" className="w-full">
                                            <label className="cursor-pointer">
                                                <FileUp className="mr-2 h-4 w-4" />
                                                Upload Document
                                                <Input type="file" className="sr-only" {...companyRegistrationRef} />
                                            </label>
                                        </Button>
                                    </FormControl>
                                    <FileUploadDisplay file={companyRegistrationFile} />
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="terms"
                                render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-8">
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Agree to terms and conditions
                                    </FormLabel>
                                    <FormDescription>
                                        You agree to our Merchant Service Agreement.
                                    </FormDescription>
                                     <FormMessage />
                                    </div>
                                </FormItem>
                                )}
                            />
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit for Approval
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
      </main>
    </div>
  );
}
