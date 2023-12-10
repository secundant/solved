export type Nil = null | undefined;
export type AnyFunction = (...args: any[]) => any;
export type IsTypeOfFn<Type> = <T>(value: T | Type) => value is Type;
export interface Not {
  <Positive>(
    fn: (value: unknown) => value is Positive,
  ): <Value>(value: Value) => value is Exclude<Value, Positive>;
  (fn: (value: unknown) => boolean): (value: unknown) => boolean;
}

export const not = ((fn: any) => (value: any) => !fn(value)) as Not;

export const isNil = (target: unknown): target is Nil => target == null;
export const isAnyNaN = isNaN as (value: unknown) => boolean;

export const isNotNaN = not(isAnyNaN);
export const isNotNil = not(isNil);
