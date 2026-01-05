
import { Header } from "@/components/layout/header";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { OperatorsDataTable } from "./_components/operators-data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function OperatorsPage() {
    const operators = await prisma.operator.findMany({
      include: {
        merchant: {
          select: { name: true }
        }
      }
    });

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Operators" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Operator Management</CardTitle>
                            <CardDescription>
                                Add, view, and manage all operators and sales agents.
                            </CardDescription>
                        </div>
                        <Button asChild className="ml-auto gap-1">
                            <Link href="/operators/onboard">
                                <PlusCircle className="h-4 w-4" />
                                Add Operator
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <OperatorsDataTable data={operators} />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
