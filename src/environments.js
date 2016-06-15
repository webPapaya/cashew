export const DEFAULT = 'default';
export const TESTING = 'testing';

let currentEnv = DEFAULT;
export const getEnv = () => currentEnv;
export const setEnv = (env) => { currentEnv = env; };
