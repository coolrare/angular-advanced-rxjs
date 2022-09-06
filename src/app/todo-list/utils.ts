export const pipe =
  <TInput, TResult>(...fns: ((input: any) => any)[]) =>
  (input: TInput) => {
    let result: any = input;
    for (let i = 0; i < fns.length; ++i) {
      result = fns[i](result);
    }
    return result as TResult;
  };

export const prop =
  <TResult>(key: string) =>
  (object: { [key: string]: any }) => {
    return object[key] as TResult;
  };

export const toLower = (value: string) => value.toLowerCase();

export const includes = (sub: string) => (input: string) => {
  return (input || '').indexOf(sub) !== -1;
};

export const ifElse =
  <TInput extends any[], TTrue, TFalse>(
    conditionFn: (...args: TInput) => boolean,
    trueFn: (...args: TInput) => TTrue,
    falseFn: (...args: TInput) => TFalse
  ) =>
  (...args: TInput) => {
    if (conditionFn(...args)) {
      return trueFn(...args);
    }
    return falseFn(...args);
  };

export const isEmpty = (input: string) => input === '';

export const filter =
  <T>(filterFn: (value: T, index: number, array: T[]) => boolean) =>
  (data: T[]) => {
    return data.filter(filterFn);
  };

export const defaultValue =
  <TInput, TDefault>(defaultVal: TDefault) =>
  (input: TInput) => {
    return (input || defaultValue) as TInput | TDefault;
  };

export const equals = (a: any, b: any) => a === b;

export type Ord = -1 | 0 | 1;

export const ascend =
  <T>(keyFn: (input: T) => any) =>
  (a: any, b: any): Ord => {
    if (keyFn(a) > keyFn(b)) {
      return 1;
    } else if (keyFn(a) === keyFn(b)) {
      return 0;
    }
    return -1;
  };

export const descend =
  <T>(keyFn: (input: T) => any) =>
  (a: any, b: any): Ord =>
    (ascend(keyFn)(a, b) * -1) as Ord;

export const sort =
  <T>(comparator: (a: T, b: T) => Ord) =>
  (data: T[]) => {
    return [...data].sort(comparator);
  };

export const take =
  <T>(n: number) =>
  (data: T[]) => {
    return data.slice(0, n);
  };

export const takeLast =
  <T>(n: number) =>
  (data: T[]) => {
    return data.slice(data.length - n);
  };

export const length = (data: any[]) => data.length;
