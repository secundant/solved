import { type AnyRecord, entries, type Falsy, fromEntries, isTruthy } from './shared.ts';

export function mapEntries<Input extends AnyRecord, Result extends AnyRecord>(
  target: Input,
  fn: <Key extends keyof Input>(entry: [Key, Input[Key]]) => [Key, Result[Key]] | Falsy,
): Result;
export function mapEntries<Input extends AnyRecord, ResultValue>(
  target: Input,
  fn: <Key extends keyof Input>(entry: [Key, Input[Key]]) => [Key, ResultValue] | Falsy,
): Record<keyof Input, ResultValue>;
export function mapEntries<Input extends AnyRecord, OutputValue>(
  target: Input,
  fn: <Key extends keyof Input>(entry: [Key, Input[Key]]) => [Key, OutputValue] | Falsy,
) {
  return fromEntries(entries(target).map(fn).filter(isTruthy));
}

export function mapValues<Input extends AnyRecord, Result extends Record<keyof Input, any>>(
  target: Input,
  fn: <Key extends keyof Input>(value: Input[Key], key: Key) => Result[Key],
): Result;
export function mapValues<Input extends AnyRecord, ResultValue>(
  target: Input,
  fn: <Key extends keyof Input>(value: Input[Key], key: Key) => ResultValue,
): Record<keyof Input, ResultValue>;
export function mapValues<Input extends AnyRecord, OutputValue>(
  target: Input,
  fn: <Key extends keyof Input>(value: Input[Key], key: Key) => OutputValue,
) {
  return mapEntries(target, ([key, value]) => [key, fn(value, key)]);
}

export function prop<Input extends AnyRecord, Key extends keyof Input>(key: Key) {
  return (target: Input) => target[key];
}

export function hasProp<Key extends keyof any>(key: Key) {
  return <Input extends Record<Key, any>>(
    target: Input,
  ): target is Input & Record<Key, Exclude<Input[Key], undefined>> => Object.hasOwn(target, key);
}

export function hasPropIn<Input extends AnyRecord>(target: Input) {
  return <Key extends keyof Input>(key: Key | keyof any): key is Key & keyof Input & string =>
    Object.hasOwn(target, key);
}
