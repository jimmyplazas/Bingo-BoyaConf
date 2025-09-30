'use server';
/**
 * @fileOverview A Genkit flow that detects Bingo patterns and generates a personalized congratulatory message.
 *
 * - bingoDetectionAndResponse - A function that handles the bingo detection and response process.
 * - BingoDetectionAndResponseInput - The input type for the bingoDetectionAndResponse function.
 * - BingoDetectionAndResponseOutput - The return type for the bingoDetectionAndResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BingoDetectionAndResponseInputSchema = z.object({
  boardState: z
    .array(z.boolean())
    .length(25)
    .describe('An array representing the state of the Bingo board. True if marked, false otherwise.'),
});
export type BingoDetectionAndResponseInput = z.infer<typeof BingoDetectionAndResponseInputSchema>;

const BingoDetectionAndResponseOutputSchema = z.object({
  bingoAchieved: z.boolean().describe('Whether or not a Bingo has been achieved.'),
  pattern: z.string().describe('The specific Bingo pattern achieved (horizontal, vertical, diagonal, etc.).'),
  message: z.string().describe('A personalized congratulatory message for the Bingo win.'),
});
export type BingoDetectionAndResponseOutput = z.infer<typeof BingoDetectionAndResponseOutputSchema>;

export async function bingoDetectionAndResponse(
  input: BingoDetectionAndResponseInput
): Promise<BingoDetectionAndResponseOutput> {
  return bingoDetectionAndResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bingoDetectionAndResponsePrompt',
  input: {schema: BingoDetectionAndResponseInputSchema},
  output: {schema: BingoDetectionAndResponseOutputSchema},
  prompt: `You are an expert Bingo game analyzer. You will analyze the state of a 5x5 Bingo board and determine if a Bingo has been achieved.

The Bingo board state is represented as an array of booleans, where true indicates a marked square and false indicates an unmarked square.

Board State: {{{boardState}}}

Based on the board state, determine if a Bingo has been achieved. If a Bingo has been achieved, identify the specific pattern (e.g., horizontal, vertical, diagonal, X, full board).

Generate a personalized congratulatory message that is appropriate for the detected pattern. The message should be enthusiastic and make the win feel special.

Example:
If the pattern is a horizontal Bingo on the first row, the message could be: "Congratulations! You've hit a horizontal Bingo on the top row! What a start!"
If no bingo has been achieved the message should be: "Keep going, you are close to hitting a Bingo!"
`,
});

const bingoDetectionAndResponseFlow = ai.defineFlow(
  {
    name: 'bingoDetectionAndResponseFlow',
    inputSchema: BingoDetectionAndResponseInputSchema,
    outputSchema: BingoDetectionAndResponseOutputSchema,
  },
  async input => {
    // Simple Bingo detection logic (can be expanded for more complex patterns)
    const board = input.boardState;

    function checkBingo(board: boolean[]): {bingoAchieved: boolean; pattern: string} {
      // Check rows
      for (let i = 0; i < 5; i++) {
        if (board[i * 5] && board[i * 5 + 1] && board[i * 5 + 2] && board[i * 5 + 3] && board[i * 5 + 4]) {
          return {bingoAchieved: true, pattern: `horizontal row ${i + 1}`};
        }
      }

      // Check columns
      for (let i = 0; i < 5; i++) {
        if (board[i] && board[i + 5] && board[i + 10] && board[i + 15] && board[i + 20]) {
          return {bingoAchieved: true, pattern: `vertical column ${i + 1}`};
        }
      }

      // Check diagonals
      if (board[0] && board[6] && board[12] && board[18] && board[24]) {
        return {bingoAchieved: true, pattern: 'diagonal top-left to bottom-right'};
      }
      if (board[4] && board[8] && board[12] && board[16] && board[20]) {
        return {bingoAchieved: true, pattern: 'diagonal top-right to bottom-left'};
      }

      return {bingoAchieved: false, pattern: 'none'};
    }

    const bingoResult = checkBingo(board);

    const {output} = await prompt({
      ...input,
      bingoAchieved: bingoResult.bingoAchieved,
      pattern: bingoResult.pattern,
    });
    return {
      bingoAchieved: bingoResult.bingoAchieved,
      pattern: bingoResult.pattern,
      message: output!.message,
    };
  }
);
