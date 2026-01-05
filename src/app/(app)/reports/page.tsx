import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { onboardingStats, transactionVolumeByDay } from "@/lib/data";
import { FileDown, Filter } from "lucide-react";
import { OnboardingChart } from "./_components/onboarding-chart";
import { TransactionVolumeChart } from "../dashboard/_components/transaction-volume-chart";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ReportFilters } from "./_components/report-filters";

export default function ReportsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header title="Reports & Analytics" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Generate Reports</CardTitle>
                        <CardDescription>Filter and export detailed reports on sales, transactions, onboarding, and fraud trends.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <ReportFilters />
                         <div className="flex items-center gap-2">
                            <Button>
                                <Filter className="mr-2 h-4 w-4" />
                                Apply Filters
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <FileDown className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                                    <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                                    <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction Volume</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TransactionVolumeChart data={transactionVolumeByDay} />
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Merchant Onboarding Stats</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <OnboardingChart data={onboardingStats} />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
