export const createActions = ({ store }) => {
  const updateCounter = (newValue) => {
    store.saveOffline({ counts: newValue });
  };

  const incrementCounter = () => {
    const { counts } = store.retrieve();
    updateCounter(counts + 1);
  };

  return { incrementCounter, updateCounter };
};
