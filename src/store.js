export const createStore = (initialData = {}) => {
  let data = initialData;
  const updateCallbacks = [];

  const read = () => ({ ...data });

  const subscribe = (next) => {
    next(data);
    updateCallbacks.push(next);
  };

  const update = (newData = {}) => {
    data = { ...data, ...newData };
    updateCallbacks.forEach((callback) => {
      callback(data);
    });
  };

  return { read, update, subscribe };
};
