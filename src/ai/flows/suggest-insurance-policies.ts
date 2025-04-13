'use server';
/**
 * @fileOverview Suggests relevant government health insurance schemes based on user information.
 *
 * - suggestInsurancePolicies - A function that suggests insurance policies.
 * - SuggestInsurancePoliciesInput - The input type for the suggestInsurancePolicies function.
 * - SuggestInsurancePoliciesOutput - The return type for the suggestInsurancePolicies function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestInsurancePoliciesInputSchema = z.object({
  age: z.number().describe('The age of the user.'),
  income: z.number().describe('The annual income of the user.'),
  medicalHistory: z
    .string()
    .describe('A summary of the user medical history.'),
  location: z.object({
    city: z.string().describe('The city of the user.'),
    region: z.string().describe('The region of the user.'),
  }).describe('The location of the user.'),
});
export type SuggestInsurancePoliciesInput = z.infer<
  typeof SuggestInsurancePoliciesInputSchema
>;

const SuggestInsurancePoliciesOutputSchema = z.object({
  suggestedPolicies: z.array(
    z.object({
      name: z.string().describe('The name of the insurance policy.'),
      description: z.string().describe('A brief description of the policy.'),
      eligibilityCriteria: z
        .string()
        .describe('The eligibility criteria for the policy.'),
      confidenceScore: z
        .number()
        .describe(
          'A score between 0 and 1 indicating the confidence of the suggestion.'
        ),
    })
  ).describe('A list of suggested insurance policies.'),
});
export type SuggestInsurancePoliciesOutput = z.infer<
  typeof SuggestInsurancePoliciesOutputSchema
>;

export async function suggestInsurancePolicies(
  input: SuggestInsurancePoliciesInput
): Promise<SuggestInsurancePoliciesOutput> {
  return suggestInsurancePoliciesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestInsurancePoliciesPrompt',
  input: {
    schema: z.object({
      age: z.number().describe('The age of the user.'),
      income: z.number().describe('The annual income of the user.'),
      medicalHistory:
        z.string().describe('A summary of the user medical history.'),
      location: z
        .object({
          city: z.string().describe('The city of the user.'),
          region: z.string().describe('The region of the user.'),
        })
        .describe('The location of the user.'),
    }),
  },
  output: {
    schema: z.object({
      suggestedPolicies: z.array(
        z.object({
          name: z.string().describe('The name of the insurance policy.'),
          description: z
            .string()
            .describe('A brief description of the policy.'),
          eligibilityCriteria: z
            .string()
            .describe('The eligibility criteria for the policy.'),
          confidenceScore: z
            .number()
            .describe(
              'A score between 0 and 1 indicating the confidence of the suggestion.'
            ),
        })
      ).describe('A list of suggested insurance policies.'),
    }),
  },
  prompt: `You are an AI assistant specialized in suggesting relevant government health insurance schemes to users based on their personal information. The goal is to identify potential schemes that the user may not be aware of, increasing their access to healthcare benefits.

  Based on the following information, suggest relevant government health insurance schemes:

  Age: {{{age}}}
  Income: {{{income}}}
  Medical History: {{{medicalHistory}}}
  Location: {{{location.city}}}, {{{location.region}}}

  Consider factors such as age, income, medical conditions, and location to determine eligibility for various schemes. Provide a confidence score (0 to 1) indicating how likely the user is to be eligible for each suggested scheme. Always include a confidence score. Do not invent insurance policies.
  `,
});

const suggestInsurancePoliciesFlow = ai.defineFlow<
  typeof SuggestInsurancePoliciesInputSchema,
  typeof SuggestInsurancePoliciesOutputSchema
>(
  {
    name: 'suggestInsurancePoliciesFlow',
    inputSchema: SuggestInsurancePoliciesInputSchema,
    outputSchema: SuggestInsurancePoliciesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
