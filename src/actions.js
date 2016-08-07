export const createActions = ({ store }) => {
  const tick = () => {
    const { duration } = store.retrieve();
    store.saveInSession({ duration: duration + 1 });
  };
  
  return { tick };
};
