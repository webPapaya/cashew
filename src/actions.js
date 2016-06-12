export const createActions = ({ store }) => {
  const repositoriesLoaded = (reposFromRemote) => {
    const repos = reposFromRemote.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
    }));

    store.update({ repos });
  };
  
  return { repositoriesLoaded };
};
