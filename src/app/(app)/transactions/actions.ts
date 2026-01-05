
'use server'

import { detectTransactionAnomalies } from "@/ai/flows/detect-transaction-anomalies";
import { prisma } from "@/lib/db";
import type { Transaction } from '@prisma/client';


export async function checkTransactionAnomaly(transaction: Transaction) {
  try {
    const priorTransactions = await prisma.transaction.findMany({
        where: {
            operatorId: transaction.operatorId,
            date: {
                lt: new Date(transaction.date)
            }
        },
        take: 20,
        orderBy: {
            date: 'desc'
        }
    });
    
    const result = await detectTransactionAnomalies({
      transactionData: JSON.stringify(transaction),
      priorTransactionData: JSON.stringify(priorTransactions),
    });

    return result;

  } catch (error) {
    console.error(error);
    return {
      isAnomalous: true,
      anomalyExplanation: 'Failed to analyze transaction due to an internal error.'
    }
  }
}
