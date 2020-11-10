import { STRICT } from '../helpers/constants';

QUnit.test('Array#uniqueBy', assert => {
  const { uniqueBy } = Array.prototype;
  assert.isFunction(uniqueBy);
  assert.arity(uniqueBy, 1);
  assert.name(uniqueBy, 'uniqueBy');
  assert.looksNative(uniqueBy);
  assert.nonEnumerable(Array.prototype, 'uniqueBy');

  let array = [1, 2, 3, 2, 1];
  assert.ok(array.uniqueBy() !== array);
  assert.deepEqual(array.uniqueBy(), [1, 2, 3]);

  array = [
    {
      id: 1,
      uid: 10000,
    },
    {
      id: 2,
      uid: 10000,
    },
    {
      id: 3,
      uid: 10001,
    },
  ];

  assert.deepEqual(array.uniqueBy('id'), array);

  assert.deepEqual(array.uniqueBy('uid'), [
    {
      id: 1,
      uid: 10000,
    },
    {
      id: 3,
      uid: 10001,
    },
  ]);

  assert.deepEqual(array.uniqueBy(({ id, uid }) => `${ id }-${ uid }`), array);

  assert.deepEqual([1, undefined, 2, undefined, null, 1].uniqueBy(), [1, undefined, 2, null]);
  assert.deepEqual(
    [{ id: 1 }, undefined, { id: 2 }, undefined, null, { id: 1 }].uniqueBy('id'),
    [{ id: 1 }, undefined, { id: 2 }, null],
  );

  assert.deepEqual([0, -0].uniqueBy(), [0]);
  assert.deepEqual([{ count: 0 }, { count: -0 }].uniqueBy('count'), [{ count: 0 }]);
  assert.deepEqual([NaN, NaN].uniqueBy(), [NaN]);

  assert.deepEqual(uniqueBy.call({ length: 1, 0: 1 }), [1]);

  if (STRICT) {
    assert.throws(() => uniqueBy.call(null, 0), TypeError);
    assert.throws(() => uniqueBy.call(undefined, 0), TypeError);
  }
  assert.ok('uniqueBy' in Array.prototype[Symbol.unscopables], 'In Array#@@unscopables');
});
