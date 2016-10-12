const buildArray = (number) => {
  const array = [];
  for(let i = 0; i < number; i++) { array.push(i); }
  return array;
};

const FORBIDDEN = 400;
export const createBackendApi = () => {
  const signIn = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if( username === 'username' && password === 'password' ) {
          return resolve({ username, twitter: '@webpapaya' });
        }
        reject({ statusCode: FORBIDDEN });
      }, 500);
    });
  };

  const getUserList = (page = 1) => {
    const itemsPerPage = 5;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          buildArray(itemsPerPage).map((index) =>({
            username: `username${(itemsPerPage - 1) * page + index}`,
            twitter: `@username${(itemsPerPage - 1) * page + index}`,
          })));
      }, 500);
    });
  };

  return { getUserList, signIn };
};

