import {
  assertThat,
  equalTo,
} from 'hamjest';

const createSessionStorage = ({ initialData = {} }) => {
  const retrieve = () => {
    return initialData;
  };

  return { retrieve };
};

describe('session storage', () => {
  describe('retrieve', () => {
    it('responds the whole store', () => {
      const data = { dummy: 'data' };
      const session = createSessionStorage({ initialData: data });

      assertThat(session.retrieve(), equalTo(data));
    });
  });
});

