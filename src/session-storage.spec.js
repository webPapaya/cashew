import {
  assertThat,
  equalTo,
} from 'hamjest';

const createSessionStorage = ({ initialData = {} } = {}) => {
  let data = initialData;
  const retrieve = () => {
    return data;
  };

  const update = (newData) => {
    data = { ...data, ...newData };
  };

  return { retrieve, update };
};

describe('session storage', () => {
  describe('retrieve', () => {
    it('responds the whole store', () => {
      const data = { dummy: 'data' };
      const session = createSessionStorage({ initialData: data });

      assertThat(session.retrieve(), equalTo(data));
    });
  });

  describe('update', () => {
    it('updates store by given object', () => {
      const sessionStorage = createSessionStorage();

      const data = { myKey: 'myValue' };
      sessionStorage.update(data);
      assertThat(sessionStorage.retrieve(), equalTo(data));
    });

    it('AND doesn\'t override existing data', () => {
      const existingData = { existing: 'value' };
      const updateData = { myKey: 'myValue' };

      const sessionStorage = createSessionStorage({ initialData: existingData });
      sessionStorage.update(updateData);

      assertThat(sessionStorage.retrieve(),
        equalTo({ ...existingData, ...updateData }));
    });
  });
});

