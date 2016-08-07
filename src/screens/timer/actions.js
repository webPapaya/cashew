export const createActions = ({ store }) => {
  const tick = () => {
    const { duration = 0 } = store.retrieve();
    store.saveInSession({ duration: duration + 1 });
  };

  const pause = () => {
    const { interval } = store.retrieve();
    global.clearInterval(interval);
  };

  const start = () => {
    stopInterval();
    startInterval();
  };

  const stop = () => {
    stopInterval();
    resetDuration();
  };

  const resetDuration = () => {
    store.saveInSession({ duration: 0 });
  };

  const stopInterval = () => {
    const { interval } = store.retrieve();
    global.clearInterval(interval);
  };

  const startInterval = () => {
    const interval = global.setInterval(() => { tick() }, 1);
    store.saveInSession({ interval });
  };

  return { tick, pause, start, stop };
};
