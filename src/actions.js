import { createActions as createTimerActions } from './screens/timer/index';
import { createActions as createGithubProfileActions } from './screens/github-profile/index';

export const createActions = ({ store }) => {
  const timer = createTimerActions({ store });
  const githubProfile = createGithubProfileActions({ store });

  return { timer: timer, githubProfile: githubProfile };
};
