'use client';

import React, { useState } from 'react';
import { MoreHorizontal, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Transaction } from '@/lib/data';
import { checkTransactionAnomaly } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface RowActionsProps {
  transaction: Transaction;
}

export function RowActions({ transaction }: RowActionsProps) {
    const [isChecking, setIsChecking] = useState(false);
    const [anomalyResult, setAnomalyResult] = useState<{ isAnomalous: boolean; anomalyExplanation: string } | null>(null);
    const { toast } = useToast();

    const handleDetectAnomaly = async () => {
        setIsChecking(true);
        setAnomalyResult(null);
        try {
            const result = await checkTransactionAnomaly(transaction);
            setAnomalyResult(result);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Error",
                description: "Failed to check for anomaly."
            });
            setIsChecking(false);
        }
    }

    const AnomalyDialogContent = () => {
        if (isChecking && !anomalyResult) {
            return (
                <>
                 <AlertDialogHeader>
                    <AlertDialogTitle>Analyzing Transaction...</AlertDialogTitle>
                    <AlertDialogDescription>
                       <div className="space-y-2 mt-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                       </div>
                    </AlertDialogDescription>
                 </AlertDialogHeader>
                </>
            )
        }

        if (anomalyResult) {
            return (
                <>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        {anomalyResult.isAnomalous ? (
                            <ShieldAlert className="h-6 w-6 text-destructive" />
                        ) : (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                        )}
                        Anomaly Detection Result
                    </AlertDialogTitle>
                    <AlertDialogDescription className="pt-4">
                        <p className="font-semibold">
                         {anomalyResult.isAnomalous ? "Anomalous transaction detected." : "Transaction appears normal."}
                        </p>
                        <p className="mt-2 text-foreground">{anomalyResult.anomalyExplanation}</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => {
                        setIsChecking(false);
                        setAnomalyResult(null);
                    }}>Close</AlertDialogAction>
                </AlertDialogFooter>
                </>
            )
        }
        return null;
    }


  return (
    <>
    <AlertDialog open={isChecking || !!anomalyResult}>
        <AlertDialogContent>
           <AnomalyDialogContent />
        </AlertDialogContent>
    </AlertDialog>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction.id)}>
          Copy Transaction ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View Details</DropdownMenuItem>
        <DropdownMenuItem>Mark as Reconciled</DropdownMenuItem>
        <DropdownMenuItem>Initiate Dispute</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDetectAnomaly} className="text-amber-600 focus:text-amber-700 focus:bg-amber-50">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Detect Anomaly (AI)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}
