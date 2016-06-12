export const createActions = ({ store }) => {
  const repositoriesLoading = () => {
    store.update({ status: 'fetching' })
  };

  const repositoriesLoaded = (reposFromRemote) => {
    const repos = reposFromRemote.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
    }));

    store.update({ repos, status: 'idle' });
  };
  
  return { repositoriesLoading, repositoriesLoaded };
};
