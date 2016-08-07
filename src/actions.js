export const createActions = ({ store }) => {
  const tick = () => {
    const { duration = 0 } = store.retrieve();
    store.saveInSession({ duration: duration + 1 });
  };

  const pauseTick = () => {
    const { interval } = store.retrieve();
    global.clearInterval(interval);
  };

  const startTick = () => {
    stopInterval();
    const interval = global.setInterval(() => { tick() }, 1000);
    store.saveInSession({ interval });
  };

  const stopTick = () => {
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

  return { tick, pauseTick, startTick, stopTick };
};
