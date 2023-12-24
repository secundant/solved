import { sum, toInt, values } from '@solved/std/shared';
import { describe, expect, test } from 'vitest';
import { loadInput, prepareInput } from './shared/input.ts';

/**
 * @see {@url https://adventofcode.com/2023/day/2}
 * The Calibration document consists of lines of text;
 * each line originally contained a specific calibration value that the Elves now need to recover.
 * On each line, the calibration value can be found by combining the first digit and the last digit
 * (in that order) to form a single two-digit number.
 *
 * Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
 * What is the sum of the IDs of those games?
 */

const solve = (input: string) =>
  sum(
    parseGame(input)
      .filter(({ turns }) => turns.every(isValidTurn))
      .map(({ game }) => game),
  );
const solveRequiredPower = (input: string) =>
  sum(
    parseGame(input).map(({ turns }) => {
      const bag = { red: 0, green: 0, blue: 0 };

      for (const { color, count } of turns.flat()) {
        bag[color] = Math.max(bag[color], count);
      }
      return values(bag).reduce((acc, value) => acc * value);
    }),
  );

const parseGame = (input: string) => input.split('\n').map(parseLine);
const parseLine = (line: string) => {
  const { game, turns } = line.match(gameRe)!.groups as { game: string; turns: string };

  return {
    game: toInt(game),
    turns: turns.split(';').map(turn => turn.split(',').map(parseTurnStep)),
  };
};
const parseTurnStep = (input: string) => {
  const [count, color] = input.trim().split(' ') as [string, keyof typeof bag];

  return { count: toInt(count), color };
};
const isValidTurn = (turn: ParsedTurn) => {
  const currentBag = { ...bag };

  return turn.every(({ count, color }) => (currentBag[color] -= count) >= 0);
};

const bag = { red: 12, green: 13, blue: 14 };
const gameRe = /^Game (?<game>(\d+)): (?<turns>(.*))$/;

type ParsedGame = Exclude<ReturnType<typeof parseLine>, null>;
type ParsedTurn = ParsedGame['turns'][0];

describe('day 2', async () => {
  const exampleInput = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;
  const input = await loadInput(2);

  test('part 1', async () => {
    expect(solve(prepareInput(exampleInput))).toEqual(8);
    expect(solve(input)).toMatchInlineSnapshot(`2541`);
  });

  test('part 2', async () => {
    expect(solveRequiredPower(prepareInput(exampleInput))).toEqual(2286);
    expect(solveRequiredPower(input)).toMatchInlineSnapshot(`66016`);
  });
});
