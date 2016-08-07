import { createActions as createTimerActions } from './screens/timer/index';

export const createActions = ({ store }) => {
  const timerActions = createTimerActions({ store });
  return { timer: timerActions };
};
