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
    const interval = global.setInterval(() => { tick() }, 1000);
    store.saveInSession({ interval });
  };

  const stopTick = () => {
    const { interval } = store.retrieve();
    global.clearInterval(interval);
    store.saveInSession({ duration: 0, interval: void 0 });
  };

  return { tick, pauseTick, startTick, stopTick };
};
