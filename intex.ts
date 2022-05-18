import { Foo, $TN } from 'foo/Foo-free'
import { A } from 'free-types'
import { test } from 'ts-test'

export interface $T1 extends $TN {
    type: [A<this>]
}

//@ts-expect-error: $T2 incorrectly extends $TN
export interface $T2 extends $TN {
    type: [A<this>, '2']
}

//@ts-expect-error: $Id incorrectly extends $TN
export interface $Id extends $TN {
    type: A<this>
}

test('free-type' as const, t => [
    t.equal<Foo<$T1, 1>, [0, 1]>(),
    //@ts-expect-error: $T2 does not satisfy the constraint $TN
    t.equal<Foo<$T2, 1>, [0, 1, '2']>(),
    //@ts-expect-error: $T2 does not satisfy the constraint $TN
    t.equal<Foo<$Id, 1>, [0, ...any[]]>()
])
