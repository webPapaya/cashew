import { assertThat, equalTo } from 'hamjest';

const ignoreReturnFor = (fn) => (arg) => {
  fn(arg);
  return arg;
};

const rethrowError = (fn) => (error) => Promise.resolve()
  .then(() => fn(error))
  .then(() => { throw error });

describe('ignoreReturnFor', () => {
  it('ignores return value', () => Promise.resolve()
    .then(() => '1 value')
    .then(ignoreReturnFor(() => '2 value'))
    .then((value) =>
      assertThat(value, equalTo('1 value'))));
});

describe('rethrowError', () => {
  it('ignores return value', () => Promise.resolve()
    .then(() => { throw 'my error'; })
    .catch(rethrowError((error) => error))
    .then(() => assertThat(false, equalTo(true)))
    .catch((error) =>
      assertThat(error, equalTo('my error'))));
});


