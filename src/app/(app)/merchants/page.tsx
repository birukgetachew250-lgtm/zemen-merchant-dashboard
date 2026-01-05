import { Header } from "@/components/layout/header";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { merchants } from "@/lib/data";
import { MerchantsDataTable } from "./_components/merchants-data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function MerchantsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Merchants" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Merchant Management</CardTitle>
                            <CardDescription>
                                Onboard, view, and manage all merchants.
                            </CardDescription>
                        </div>
                        <Button asChild className="ml-auto gap-1">
                            <Link href="/merchants/onboard">
                                <PlusCircle className="h-4 w-4" />
                                Onboard Merchant
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <MerchantsDataTable data={merchants} />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
