export const createStore = (initialData = {}) => {
  let data = initialData;
  const updateCallbacks = [];

  const read = () => ({ ...data });

  const subscribe = (next) => {
    next(data);
    updateCallbacks.push(next);
  };

  const notify = () => {
    updateCallbacks
      .forEach((callback) => { callback(data); });
  };

  const update = (newData = {}) => {
    data = { ...data, ...newData };
    notify();
  };

  return { read, update, subscribe };
};
