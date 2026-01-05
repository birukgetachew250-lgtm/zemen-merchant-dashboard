"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function ReportFilters() {
    const [date, setDate] = React.useState<DateRange | undefined>({
      from: new Date(2023, 9, 1),
      to: addDays(new Date(2023, 9, 28), 0),
    })
  
    return (
        <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
             <div className="grid gap-2">
                <Label>Date range</Label>
                <Popover>
                <PopoverTrigger asChild>
                    <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                        date.to ? (
                        <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                        </>
                        ) : (
                        format(date.from, "LLL dd, y")
                        )
                    ) : (
                        <span>Pick a date</span>
                    )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    />
                </PopoverContent>
                </Popover>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="operator">Operator</Label>
                <Select>
                    <SelectTrigger id="operator">
                        <SelectValue placeholder="All Operators" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Operators</SelectItem>
                        <SelectItem value="op1">Abebe Bikila</SelectItem>
                        <SelectItem value="op2">Tirunesh Dibaba</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="merchant">Merchant</Label>
                <Select>
                    <SelectTrigger id="merchant">
                        <SelectValue placeholder="All Merchants" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Merchants</SelectItem>
                        <SelectItem value="merch1">CMC Branch Cafe</SelectItem>
                        <SelectItem value="merch2">Bole Express</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
  }
  