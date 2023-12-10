import { iterableToArray } from '@solved/std/array';
import { isNotNaN } from '@solved/std/guard';
import { sum, toInt } from '@solved/std/shared';
import { describe, expect, test } from 'vitest';
import { loadInput, prepareInput } from './shared/input.ts';

/**
 * @see {@url https://adventofcode.com/2023/day/1}
 * The Calibration document consists of lines of text;
 * each line originally contained a specific calibration value that the Elves now need to recover.
 * On each line, the calibration value can be found by combining the first digit and the last digit
 * (in that order) to form a single two-digit number.
 *
 * Consider your entire calibration document.
 * What is the sum of all the calibration values?
 */

const getNumericDocumentValue = (input: string) =>
  sum(input.split('\n').map(iterableToArray).map(getNumericLineValue));
const getNumericLineValue = (chars: string[]) =>
  toInt(chars.find(isNotNaN) + chars.findLast(isNotNaN)!);

const getSpellingOutDocumentValue = (input: string) =>
  getNumericDocumentValue(
    spellingOutDigits.reduce(
      (acc, word, index) => acc.replaceAll(word, `${word[0]}${index + 1}${word.at(-1)}`),
      input,
    ),
  );
const spellingOutDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

describe('day 1', async () => {
  const input = await loadInput(1);

  test('part 1', async () => {
    expect(
      getNumericDocumentValue(
        prepareInput(`
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`),
      ),
    ).toEqual(142);

    expect(getNumericDocumentValue(input)).toMatchInlineSnapshot(`54450`);
  });

  test('part 2', async () => {
    expect(
      getSpellingOutDocumentValue(
        prepareInput(`
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`),
      ),
    ).toBe(281);

    expect(getSpellingOutDocumentValue(input)).toMatchInlineSnapshot(`54265`);
  });
});
