export const createActions = ({ store }) => {
  const updateCounter = (newValue) => {
    store.saveOffline({ counts: newValue });
    store.saveInLocation({ counts: newValue });
  };

  const incrementCounter = () => {
    const { counts = 0 } = store.retrieve();
    updateCounter(counts + 1);
  };

  const startClock = () => {
    global.setInterval(() => {
      store.saveInSession({ currentTime: new Date() });
    }, 1000);
  };

  return { incrementCounter, updateCounter, startClock };
};
