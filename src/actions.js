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
    const { clockId } = store.retrieve();
    if(!clockId) {
      const updateClock = () => {
        store.saveInSession({ currentTime: new Date() });
      };

      updateClock();
      const newClockId = global.setInterval(updateClock, 1000);

      store.saveInSession({ clockId: newClockId });
    }
  };

  const stopClock = () => {
    const { clockId } = store.retrieve();
    global.clearInterval(clockId);
  };

  const addClock = () => {
    var iDiv = document.createElement('div');
    iDiv.id = 'counter-2';
    document.getElementsByTagName('body')[0].appendChild(iDiv);
    startClock();
  };

  const removeClock = () => {
    const domElement = document.getElementById('counter-2');
    domElement.parentNode.removeChild(domElement);
    stopClock();
    store.saveInSession({ clockId: null });
  };

  return {
    addClock,
    removeClock,
    incrementCounter, 
    updateCounter, 
    startClock, 
    stopClock, 
  };
};
