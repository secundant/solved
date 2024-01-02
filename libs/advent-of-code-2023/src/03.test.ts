import { fromGrid } from '@solved/std/array';
import { hasPropIn, mapEntries, prop } from '@solved/std/object';
import { entries, multiply, sum, toInt } from '@solved/std/shared';
import { describe, expect, test } from 'vitest';
import { loadInput, prepareInput } from './shared/input.ts';

/**
 * @see {@url https://adventofcode.com/2023/day/3}
 *
 * The engine schematic (your puzzle input) consists of a visual representation of the engine.
 * There are lots of numbers and symbols you don't really understand,
 * but apparently any number adjacent to a symbol, even diagonally,
 * is a "part number" and should be included in your sum.
 * (Periods (.) do not count as a symbol.)
 *
 * What is the sum of all of the part numbers in the engine schematic?
 */

const solveGears = (input: string[]) => {
  const { numbers, symbols } = scanScheme(input);
  const gears = mapEntries(symbols, ([key, char]) => char === '*' && [key, [] as number[]]);

  for (const { keys, value } of numbers) {
    for (const key of keys.filter(hasPropIn(gears))) {
      gears[key]!.push(value);
    }
  }

  return sum(
    entries(gears)
      .filter(([, values]) => values.length === 2)
      .map(([, values]) => multiply(values)),
  );
};
const solve = (input: string[]) => {
  const { numbers, symbols } = scanScheme(input);

  return sum(numbers.filter(({ keys }) => keys.some(key => symbols[key])).map(prop('value')));
};
const scanScheme = (input: string[]) => {
  const symbols: Record<`${number}.${number}`, string> = {};

  return {
    symbols,
    numbers: input.flatMap((line, y) => {
      for (const match of line.matchAll(/([^.\d]+)/g)) {
        symbols[positionKey(match.index!, y)] = match[0];
      }

      return [...line.matchAll(/(\d+)/g)].map(match => ({
        keys: createAdjacentKeys(match.index!, y, match[0].length - 1),
        value: toInt(match[0]),
      }));
    }),
  };
};

const createAdjacentKeys = (x: number, y: number, width: number) =>
  fromGrid(y - 1, y + 1, x - 1, x + width + 1, positionKey).flat();
const positionKey = (x: number, y: number) => `${x}.${y}` as const;

describe('day 3', async () => {
  const exampleInput = prepareInput(
    `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`,
    true,
  );
  const input = await loadInput(3, true);

  test('part 1', async () => {
    expect(solve(exampleInput)).toEqual(4361);
    expect(solve(input)).toMatchInlineSnapshot(`527369`);
  });

  test('part 2', async () => {
    expect(solveGears(exampleInput)).toEqual(467835);
    expect(solveGears(input)).toMatchInlineSnapshot(`73074886`);
  });
});
