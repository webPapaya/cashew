import React from 'react';

const FORBIDDEN = 400;
const apiSignIn = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if( username === 'username' && password === 'password' ) {
        return resolve({ username , password });
      }
      reject({ statusCode: FORBIDDEN });
    }, 500);
  });
};

export const createActions = ({ store }) => {
  const showLoadingScreen = () => {
    store.saveInSession({ currentScreen: 'loading' });
  };

  const showSignInScreen = () => {
    store.saveInSession({ currentScreen: 'sign-in' });
  };

  const showApplicationScreen = () => {
    store.saveInSession({ currentScreen: 'application' });
  };

  const signIn = ({ username, password }) => {
    Promise.resolve()
      .then(showLoadingScreen)
      .then(() => apiSignIn({ username, password }))
      .then(showApplicationScreen)
      .catch(showSignInScreen);
  };

  return { showLoadingScreen, signIn };
};





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

const SCREENS = {
  loading: () => <div>Loading</div>,
  application: () => <div>Application</div>,
  default: ({ actions }) => <SignInScreen onSubmit={ actions.signIn } />,
};

export const COMPONENTS = [{
  domId: 'counter-1',
  render({ appState, actions }) {
    const { currentScreen } = appState;
    const screenToRender = SCREENS[currentScreen] || SCREENS.default;
    return screenToRender({ appState, actions });
  },
}];
