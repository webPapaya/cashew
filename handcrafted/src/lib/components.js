export const createComponent = (componentDefinition) => {
  let isInitialized = false;

  const construct = (...args) => {
    if (!isInitialized && componentDefinition.construct) {
      componentDefinition.construct(...args);
    }

    isInitialized = true;
  };

  const destruct = (...args) => {
    if (isInitialized && componentDefinition.destruct) {
      componentDefinition.destruct(...args);
    }

    isInitialized = false;
  };

  return {
    ...componentDefinition,
    construct,
    destruct,
    isInitialized() { return isInitialized; },
  };
};

export const createComponents = (componentsDefinition) =>
  componentsDefinition.map(createComponent);
