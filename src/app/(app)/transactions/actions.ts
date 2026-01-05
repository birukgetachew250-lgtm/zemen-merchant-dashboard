'use server'

import { detectTransactionAnomalies } from "@/ai/flows/detect-transaction-anomalies";
import { transactions, Transaction } from "@/lib/data";

export async function checkTransactionAnomaly(transaction: Transaction) {
  try {
    const priorTransactions = transactions.filter(t => t.operator === transaction.operator && new Date(t.date) < new Date(transaction.date));
    
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
