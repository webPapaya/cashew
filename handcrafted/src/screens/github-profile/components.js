import React from 'react';
import { SCREENS } from './constants';

class SignInScreen extends React.Component {
  render() {
    const onSubmit = (event) => {
      event.preventDefault();
      const username = this.refs.username.value;
      const password = this.refs.password.value;
      this.props.onSubmit({ username, password });
    };

    return (
      <form>
        { this.props.errors }
        <input ref="username" type="text" />
        <input ref="password" type="password" />
        <button onClick={ onSubmit }>Login</button>
      </form>
    );
  }
}

const ApplicationScreen = ({ currentUser, userList, onSignOut, onShowUserDetail }) => {
  const htmlListOfUsers = userList.map(({ username, twitter }, index) => {
    return (
      <li key={ index }>
        <ul onClick={ () => onShowUserDetail({ userId: index }) }>
          <li>{ username }</li>
          <li>{ twitter }</li>
        </ul>
      </li>
    );
  });

  return (
    <div>
      <ul>
        <li>{ currentUser.username }</li>
        <li>{ currentUser.twitter }</li>
        <li><a href="#" onClick={ onSignOut }>Sign out</a></li>
      </ul>
      <ul>
        { htmlListOfUsers }
      </ul>
    </div>
  );
};

const SCREENS_TO_COMPONENTS = {
  [SCREENS.loading]: () => <div>Loading</div>,
  [SCREENS.application]: ({ appState, actions }) =>
    <ApplicationScreen
      currentUser={ appState.currentUser }
      userList={ appState.userList }
      onSignOut={ actions.signOut }
      onShowUserDetail={ actions.showUserDetail }
    />,
  default: ({ actions, appState }) =>
    <SignInScreen
      onSubmit={ actions.signIn }
      errors={ appState.errors }
    />,
};

export const COMPONENT = {
  domId: 'counter-1',
  render({ appState, actions }) {
    const { currentScreen } = appState;
    const screenToRender = SCREENS_TO_COMPONENTS[currentScreen] || SCREENS_TO_COMPONENTS.default;
    return screenToRender({ appState, actions });
  },
};
