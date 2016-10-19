import { assertThat, equalTo } from 'hamjest';

const ignoreReturnFor = (fn) => (arg) => {
  fn(arg);
  return arg;
};

const rethrowError = (fn) => (error) => Promise.resolve()
  .then(() => fn(error))
  .then(() => { throw error });

export const delay = (seconds) => new Promise((resolve) =>
  setTimeout(resolve, seconds * 1000));

const waitAtLeastSeconds = (seconds) => (action) => (args) =>
  Promise.all([action(args), delay(seconds)]).then(([actionResult]) => actionResult);

const parallel = (...args) => () =>
  Promise.all(args.map((fn) => fn()));

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

describe('waitAtLeast', () => {
  it('waits at least 15ms', () => {
    const startTime = +new Date();
    return Promise.resolve()
      .then(waitAtLeastSeconds(0.015)(() => {}))
      .then(() => {
        const timeDifference = new Date() - startTime;
        assertThat(timeDifference >= 10, equalTo(true));
      });
  });
});

describe('parallel', () => {
  it('executes code blocks in parallel', () => {
    return Promise.resolve()
      .then(parallel(
        () => 'promise 1',
        () => Promise.resolve('promise 2')
      ))
      .then(([promise1, promise2]) => {
        assertThat(promise1, equalTo(promise1));
        assertThat(promise2, equalTo(promise2));
      });
  });
});




