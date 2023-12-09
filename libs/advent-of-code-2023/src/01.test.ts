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

const getDocumentValue = (input: string) => sum(input.split('\n').map(getLineValue));
const getLineValue = (line: string) => {
  const chars = Array.from(line);

  return toInt(chars.find(isNumericChar) + chars.findLast(isNumericChar)!);
};
const isNumericChar = (char: string) => !Number.isNaN(toInt(char));

describe('day 1', () => {
  test('example', () => {
    expect(
      getDocumentValue(
        prepareInput(`
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`),
      ),
    ).toEqual(142);
  });

  test('solution', async () => {
    expect(getDocumentValue(await loadInput(1))).toMatchInlineSnapshot(`54450`);
  });
});
