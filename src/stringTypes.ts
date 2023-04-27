import { Length, Tuple } from "./arrayTypes"

type strKeys = { [K in keyof String]: any }

export type Repeat<S extends string, len extends number, l extends any[] = []> = Length<l> extends len ? S : `${S}${Repeat<S, len, [any, ...l]>}`

export type TrimLeft<S extends string> = S extends ` ${infer B}` ? TrimLeft<B> : S

export type TrimRight<S extends string> = S extends `${infer B} ` ? TrimRight<B> : S

export type Trim<S extends string> = TrimLeft<TrimRight<S>>

export type Split<S extends string, D extends string, Acc extends any[] = []> =
	S extends `${infer A}${D}${infer B}` ?
	Split<B, D, [...Acc, A]> :
	[...Acc, S]

export type ConditionalSplit<S extends string, D extends string, C extends string, Acc extends any[] = []> =
	S extends `${infer A}${D}${infer B}` ?
	B extends C ?
	[...Acc, A, B] :
	ConditionalSplit<B, D, C, [...Acc, A]> :
	[...Acc, S]

export type CSplit<
	S extends string,
	D extends string,
	C extends string,
	Acc extends string[] = []
> = Includes<S, C> extends true ?
	S extends `${infer A}${D}${infer B}` ?
	Includes<B, C> extends true ?
	[...Acc, A, B] :
	CSplit<B, D, C, [...Acc, A]> : "" :
	Split<S, D>

export type Includes<S extends string, I extends string> = S extends `${string}${I}${string}` ? true : false

export type Concat<S extends string, U extends string[] = []> =
	Length<U> extends 0 ? S :
	Length<U> extends 1 ? `${S}${U[0]}` :
	U extends [infer V extends string, ...infer W extends string[]] ? Concat<`${S}${V}`, W> :
	never

export type Replace<T extends string, S extends string, R extends string> =
	T extends `${infer A}${S}${infer B}` ?
	Replace<`${A}${R}${B}`, S, R> :
	T