export const createSessionStorage = ({ initialData = {} } = {}) => {
  let data = initialData;
  const retrieve = () => {
    return data;
  };

  const update = (newData) => {
    data = { ...data, ...newData };
  };

  return { retrieve, update };
};
