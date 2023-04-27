export type Length<T extends any[]> = T extends { length: infer L } ? L : never

type templateable = string | number | bigint | boolean | null | undefined

export type Join<
	T extends templateable[],
	D extends string = ", ",
	str extends string = ""
> =
	Length<T> extends 0 ? str :
	Length<T> extends 1 ? `${T[0]}` :
	T extends [infer A extends templateable, infer B extends templateable, ...infer C extends templateable[]] ?
	Join<C, D, `${str}${A}${D}${B}`> :
	str

export type Flat<T extends any[]> = T extends [infer H, ...infer R]
	? H extends any[]
	? [...Flat<H>, ...Flat<R>]
	: [H, ...Flat<R>]
	: []

export type Last<T extends any[], U = T extends (infer A)[] ? A : any> = T extends [...U[], infer B extends U] ? B : never

export type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>