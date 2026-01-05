// src/ai/flows/detect-transaction-anomalies.ts
'use server';
/**
 * @fileOverview Detects anomalous transaction patterns in real-time using GenAI.
 *
 * - detectTransactionAnomalies - A function that detects anomalous transaction patterns.
 * - DetectTransactionAnomaliesInput - The input type for the detectTransactionAnomalies function.
 * - DetectTransactionAnomaliesOutput - The return type for the detectTransactionAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectTransactionAnomaliesInputSchema = z.object({
  transactionData: z.string().describe('A JSON string containing transaction data, including timestamp, amount, merchant, and user ID.'),
  priorTransactionData: z.string().describe('A JSON string containing prior transaction data for the same user, for comparison.'),
});
export type DetectTransactionAnomaliesInput = z.infer<typeof DetectTransactionAnomaliesInputSchema>;

const DetectTransactionAnomaliesOutputSchema = z.object({
  isAnomalous: z.boolean().describe('Whether the transaction is anomalous.'),
  anomalyExplanation: z.string().describe('Explanation of why the transaction is considered anomalous.'),
});
export type DetectTransactionAnomaliesOutput = z.infer<typeof DetectTransactionAnomaliesOutputSchema>;

export async function detectTransactionAnomalies(input: DetectTransactionAnomaliesInput): Promise<DetectTransactionAnomaliesOutput> {
  return detectTransactionAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectTransactionAnomaliesPrompt',
  input: {schema: DetectTransactionAnomaliesInputSchema},
  output: {schema: DetectTransactionAnomaliesOutputSchema},
  prompt: `You are an expert in fraud detection and anomaly detection in financial transactions.

You are provided with current transaction data and prior transaction data for a user.

Analyze the transaction data to determine if the current transaction is anomalous compared to the user's typical transaction patterns.

Consider factors such as transaction amount, time of day, merchant, and any other relevant information.

Based on your analysis, determine whether the transaction is anomalous and provide a detailed explanation.

Current Transaction Data: {{{transactionData}}}
Prior Transaction Data: {{{priorTransactionData}}}

Respond with the isAnomalous boolean and anomalyExplanation string.
`, 
});

const detectTransactionAnomaliesFlow = ai.defineFlow(
  {
    name: 'detectTransactionAnomaliesFlow',
    inputSchema: DetectTransactionAnomaliesInputSchema,
    outputSchema: DetectTransactionAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
