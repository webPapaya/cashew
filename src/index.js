import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'node-fetch';

import { createStore } from './store';
import { createActions } from './actions';

const INITIAL_STORE_DATA = {};

const store = createStore(INITIAL_STORE_DATA);
const actions = createActions({ store });

const RepositoryList = ({ repos = [], status }) => {
  if(status === 'fetching') { return <div>fetching</div>; }

  const repoList = repos.map((repo, index) =>
    <li key={ index }><a href={ repo.url }>{ repo.name }</a></li>
  );

  return (<ul>{ repoList }</ul>);
};

const createRepositorySubscription = () => {
  fetch("https://api.github.com/users/webpapaya/repos")
    .then((result) => result.json())
    .then((result) => {
      actions.repositoriesLoaded(result);
    });

  actions.repositoriesLoading();

  return () => {
    const { repos, status } = store.read();
    ReactDOM.render(<RepositoryList repos={ repos } status={ status } />, document.getElementById('main'));
  }
};

store.subscribe(createRepositorySubscription());
