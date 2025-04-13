// SummarizeInsurancePolicies.ts
'use server';

/**
 * @fileOverview Summarizes complex government health insurance policies into easily understandable points.
 *
 * - summarizeInsurancePolicies - A function that handles the summarization of insurance policies.
 * - SummarizeInsurancePoliciesInput - The input type for the summarizeInsurancePolicies function.
 * - SummarizeInsurancePoliciesOutput - The return type for the summarizeInsurancePolicies function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeInsurancePoliciesInputSchema = z.object({
  policyDetails: z.string().describe('Details of the government health insurance policy.'),
});
export type SummarizeInsurancePoliciesInput = z.infer<typeof SummarizeInsurancePoliciesInputSchema>;

const SummarizeInsurancePoliciesOutputSchema = z.object({
  summaryPoints: z.array(
    z.string().describe('A summarized point of the insurance policy.')
  ).describe('Summarized points of the insurance policy details.'),
});
export type SummarizeInsurancePoliciesOutput = z.infer<typeof SummarizeInsurancePoliciesOutputSchema>;

export async function summarizeInsurancePolicies(input: SummarizeInsurancePoliciesInput): Promise<SummarizeInsurancePoliciesOutput> {
  return summarizeInsurancePoliciesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeInsurancePoliciesPrompt',
  input: {
    schema: z.object({
      policyDetails: z.string().describe('Details of the government health insurance policy.'),
    }),
  },
  output: {
    schema: z.object({
      summaryPoints: z.array(
        z.string().describe('A summarized point of the insurance policy.')
      ).describe('Summarized points of the insurance policy details.'),
    }),
  },
  prompt: `You are an expert in simplifying complex government health insurance policies.

  Summarize the following insurance policy details into easily understandable points.

  Policy Details: {{{policyDetails}}}

  Provide the summary points in a bulleted list.
  `,
});

const summarizeInsurancePoliciesFlow = ai.defineFlow<
  typeof SummarizeInsurancePoliciesInputSchema,
  typeof SummarizeInsurancePoliciesOutputSchema
>({
  name: 'summarizeInsurancePoliciesFlow',
  inputSchema: SummarizeInsurancePoliciesInputSchema,
  outputSchema: SummarizeInsurancePoliciesOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
