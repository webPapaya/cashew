const filesToFileList = (files) => {
  const fileList = [];
  for (let i = 0, file; file = files[i]; i++) {
    fileList.push(file)
  }
  return fileList;
};

export const createActions = ({ store }) => {
  const readFiles = (files) => {
    const fileList = filesToFileList(files);
    store.saveInSession({ fileList });
  };

  return { readFiles };
};
