import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function prepareInput(input: string, split: true): string[];
export function prepareInput(input: string, split?: false): string;
export function prepareInput(input: string, split = false) {
  input = input.trim();
  return split ? input.split('\n') : input;
}

export async function loadInput(day: number | string, split: true): Promise<string[]>;
export async function loadInput(day: number | string, split?: false): Promise<string>;
export async function loadInput(day: number | string, split = false) {
  const path = resolve(
    fileURLToPath(import.meta.url),
    `../../data/${day.toString().padStart(2, '0')}.txt`,
  );

  return prepareInput(await readFile(path, 'utf-8'), split as any) as string | string[];
}
