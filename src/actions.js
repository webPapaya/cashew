export const createActions = ({ store }) => {
  const updateCounter = (newValue) => {
    store.saveOffline({ counts: newValue });
    store.saveLocation({ counts: newValue });
  };

  const incrementCounter = () => {
    const { counts = 0 } = store.retrieve();
    updateCounter(counts + 1);
  };

  return { incrementCounter, updateCounter };
};
