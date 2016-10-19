import { assertThat, equalTo } from 'hamjest';

const ignoreReturnFor = (fn) => (arg) => {
  fn(arg);
  return arg;
};

describe('ignoreReturnFor', () => {
  it('ignores return value', () => Promise.resolve()
    .then(() => '1 value')
    .then(ignoreReturnFor(() => '2 value'))
    .then((value) =>
      assertThat(value, equalTo('1 value'))));
});


