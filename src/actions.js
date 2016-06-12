import { FETCHING, IDLE } from './states';

export const createActions = ({ store }) => {
  const repositoriesLoading = () => {
    store.update({ status: FETCHING })
  };

  const repositoriesLoaded = (reposFromRemote) => {
    const repos = reposFromRemote.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
    }));

    store.update({ repos, status: IDLE });
  };
  
  return { repositoriesLoading, repositoriesLoaded };
};
