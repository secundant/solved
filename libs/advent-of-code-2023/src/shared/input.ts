import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const prepareInput = (input: string) => input.trim();

export async function loadInput(day: number | string) {
  const path = resolve(
    fileURLToPath(import.meta.url),
    `../../data/${day.toString().padStart(2, '0')}.txt`,
  );

  return prepareInput(await readFile(path, 'utf-8'));
}
