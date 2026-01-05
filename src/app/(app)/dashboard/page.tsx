import {
    Activity,
    ArrowUpRight,
    CreditCard,
    DollarSign,
    Users,
    KeyRound,
    QrCode
  } from "lucide-react"
  
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Header } from "@/components/layout/header"
  import { dashboardStats, transactions, transactionVolumeByDay } from "@/lib/data"
  import { formatCurrency } from "@/lib/utils"
  import { TransactionVolumeChart } from "./_components/transaction-volume-chart"
import Link from "next/link"
  
  export default function DashboardPage() {
    const recentTransactions = transactions.slice(0, 5);
  
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header title="Dashboard" />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Transaction Volume
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(dashboardStats.totalVolume)}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Transactions
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{dashboardStats.totalTransactions}</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Merchants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{dashboardStats.newMerchants}</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{dashboardStats.disputes}</div>
                <p className="text-xs text-muted-foreground">
                  +2 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Transactions</CardTitle>
                  <CardDescription>
                    Recent transactions from your merchants.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="/transactions">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Merchant</TableHead>
                      <TableHead className="hidden xl:table-column">
                        Type
                      </TableHead>
                      <TableHead className="hidden xl:table-column">
                        Status
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map(tx => (
                       <TableRow key={tx.id}>
                        <TableCell>
                          <div className="font-medium">{tx.merchant}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {tx.operator}
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                           <Badge className="text-xs" variant={tx.type === 'QR' ? 'default' : 'secondary'}>
                            {tx.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden xl_table-column">
                          <Badge className="text-xs" variant="outline">
                            {tx.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(tx.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(tx.amount)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Generate payments instantly.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Button asChild variant="outline" size="lg" className="h-auto py-4 flex-col gap-2">
                      <Link href="/payments/qr">
                        <QrCode className="h-6 w-6"/>
                        <span>QR Payment</span>
                      </Link>
                    </Button>
                     <Button asChild variant="outline" size="lg" className="h-auto py-4 flex-col gap-2">
                        <Link href="/payments/otp">
                          <KeyRound className="h-6 w-6"/>
                          <span>OTP Payment</span>
                        </Link>
                    </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Volume</CardTitle>
                  <CardDescription>Daily transaction volume for the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent>
                    <TransactionVolumeChart data={transactionVolumeByDay} />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    )
  }
  