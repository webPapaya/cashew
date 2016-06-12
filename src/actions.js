export const createActions = ({ store }) => {
  const incrementCounter = () => {
    const { counter } = store.read();
    store.update({ counter: counter + 1 });
  };

  return { incrementCounter };
};
