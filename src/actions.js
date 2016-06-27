const filesToFileList = (files) => {
  const fileList = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    fileList.push(file);
  }
  return fileList;
};

export const createActions = ({ store }) => {
  const readFile = (file, id) => {
    const reader = new FileReader();
    const { fileList } = store.retrieve();

    reader.onload = ({ target }) => {
      const dataUrl = target.result;

      fileList[id].dataUrl = dataUrl;
      fileList[id].loaded = true;

      store.saveInSession({ fileList });
    };

    reader.readAsDataURL(file);
  };

  const readFiles = (files) => {
    const fileList = filesToFileList(files);
    store.saveInSession({ fileList });
    fileList.forEach(readFile);
  };

  return { readFiles };
};
