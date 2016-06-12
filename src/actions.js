export const createActions = ({ store }) => {
  const updateCounter = (newValue) => {
    store.update({ counter: newValue });
  };

  const incrementCounter = () => {
    const { counter } = store.read();
    updateCounter(counter + 1);
  };

  return { incrementCounter, updateCounter };
};
