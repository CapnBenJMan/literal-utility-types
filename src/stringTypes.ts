import { Length, Tuple } from "./arrayTypes"

type strKeys = { [K in keyof String]: any }

export type repeat<S extends string, len extends number, l extends any[] = []> = Length<l> extends len ? S : `${S}${repeat<S, len, [any, ...l]>}`

export type trimLeft<S extends string> = S extends ` ${infer B}` ? trimLeft<B> : S

export type trimRight<S extends string> = S extends `${infer B} ` ? trimRight<B> : S

export type trim<S extends string> = trimLeft<trimRight<S>>

export type split<S extends string, D extends string, Acc extends any[] = []> =
	S extends `${infer A}${D}${infer B}` ?
	split<B, D, [...Acc, A]> :
	[...Acc, S]

export type conditionalSplit<S extends string, D extends string, C extends string, Acc extends any[] = []> =
	S extends `${infer A}${D}${infer B}` ?
	B extends C ?
	[...Acc, A, B] :
	conditionalSplit<B, D, C, [...Acc, A]> :
	[...Acc, S]

export type cSplit<
	S extends string,
	D extends string,
	C extends string,
	Acc extends string[] = []
> = includes<S, C> extends true ?
	S extends `${infer A}${D}${infer B}` ?
	includes<B, C> extends true ?
	[...Acc, A, B] :
	cSplit<B, D, C, [...Acc, A]> : "" :
	split<S, D>

export type includes<S extends string, I extends string> = S extends `${string}${I}${string}` ? true : false

export type concat<S extends string, U extends string[] = []> =
	Length<U> extends 0 ? S :
	Length<U> extends 1 ? `${S}${U[0]}` :
	U extends [infer V extends string, ...infer W extends string[]] ? concat<`${S}${V}`, W> :
	never

export type replace<T extends string, S extends string, R extends string> =
	T extends `${infer A}${S}${infer B}` ?
	replace<`${A}${R}${B}`, S, R> :
	T