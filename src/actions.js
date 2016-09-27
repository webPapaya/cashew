import { createActions as createTimerActions } from './screens/timer/index';
import { createActions as createGithubProfileActions } from './screens/github-profile/index';

export const createActions = ({ store }) => {
  const githubProfile = createGithubProfileActions({ store });
  return { ...githubProfile };
};
