import npmDeepMerge from 'deepmerge';

export const deepMerge = (src = {}, target = {}) =>
  npmDeepMerge(src, target);
