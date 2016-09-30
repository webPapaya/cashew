const FORBIDDEN = 400;
export const createApi = () => {
  const apiSignIn = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if( username === 'username' && password === 'password' ) {
          return resolve({ username, twitter: '@webpapaya' });
        }
        reject({ statusCode: FORBIDDEN });
      }, 500);
    });
  };

  const apiGetUserList = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { username: 'username1', twitter: '@username1'},
          { username: 'username2', twitter: '@username2'},
          { username: 'username3', twitter: '@username3'},
          { username: 'username4', twitter: '@username4'},
          { username: 'username5', twitter: '@username5'},
          { username: 'username6', twitter: '@username6'},
        ]);
      }, 500);
    });
  };

  return { apiGetUserList, apiSignIn };
};
