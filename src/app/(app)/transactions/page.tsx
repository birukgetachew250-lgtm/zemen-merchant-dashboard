
import { Header } from "@/components/layout/header";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { TransactionsDataTable } from "./_components/transactions-data-table";
import { prisma } from "@/lib/db";

export default async function TransactionsPage() {
    const transactions = await prisma.transaction.findMany({
        include: {
            merchant: {
                select: { name: true }
            },
            operator: {
                select: { name: true }
            }
        },
        orderBy: {
            date: 'desc'
        }
    });

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Transactions" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>
                            Monitor, reconcile, and analyze all transactions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TransactionsDataTable data={transactions} />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
