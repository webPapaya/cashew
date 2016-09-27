import React from 'react';
import { SCREENS } from './constants';

class SignInScreen extends React.Component {
  render() {
    const onSubmit = () => {
      const username = this.refs.username.value;
      const password = this.refs.password.value;
      this.props.onSubmit({ username, password });
    };

    return (
      <form>
        <input ref="username" type="text" />
        <input ref="password" type="password" />
        <button onClick={ onSubmit }>Login</button>
      </form>
    );
  }
}

const ApplicationScreen = ({ currentUser, onSignOut }) => {
  return (
    <ul>
      <li>{ currentUser.username }</li>
      <li>{ currentUser.twitter }</li>
      <li><a href="#" onClick={ onSignOut }>Sign out</a></li>
    </ul>
  );
};

const SCREENS_TO_COMPONENTS = {
  [SCREENS.loading]: () => <div>Loading</div>,
  [SCREENS.application]: ({ appState, actions }) =>
    <ApplicationScreen
      currentUser={ appState.currentUser }
      onSignOut={ actions.signOut }
    />,
  default: ({ actions }) =>
    <SignInScreen onSubmit={ actions.signIn } />,
};

export const COMPONENTS = [{
  domId: 'counter-1',
  render({ appState, actions }) {
    const { currentScreen } = appState;
    const screenToRender = SCREENS_TO_COMPONENTS[currentScreen] || SCREENS_TO_COMPONENTS.default;
    return screenToRender({ appState, actions });
  },
}];
