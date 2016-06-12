import Rx from 'rxjs/Rx';
export const createStore = (initialData = {}) => {
  let data = initialData;
  const renderLoop = new Rx.Subject();

  const read = () => ({ ...data });

  const subscribe = (...args) =>
    renderLoop.subscribe(...args);

  const update = (newData = {}) => {
    data = { ...data, ...newData };
    renderLoop.next(data);
  };

  return { read, update, subscribe };
};
