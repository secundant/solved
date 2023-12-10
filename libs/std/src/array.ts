import { identity } from './shared';

type IteratorFn<T> = (index: number) => T;

export function fromLength(length: number): number[];
export function fromLength<T>(length: number, fn: IteratorFn<T>): T[];
export function fromLength<T>(length: number, fn: IteratorFn<T> = identity as IteratorFn<T>) {
  return Array.from({ length }, (_, index) => fn(index));
}

export function iterableToArray<T>(source: Iterable<T>): T[] {
  return Array.from(source);
}

export function fromRange(start: number, end: number): number[];
export function fromRange<T>(start: number, end: number, fn: IteratorFn<T>): T[];
export function fromRange<T>(
  start: number,
  end: number,
  fn: IteratorFn<T> = identity as IteratorFn<T>,
) {
  return Array.from({ length: end - start + 1 }, (_, index) => fn(index + start));
}
