export const createComponents = (componentsDefinition) => {
  return componentsDefinition.map((componentDefinition) => {
    let isInitialized = false;

    const initialize = (...args) => {
      if (!isInitialized && componentDefinition.initialize) {
        componentDefinition.initialize(...args);
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
      initialize,
      destruct,
      isInitialized() { return isInitialized; },
    };
  });
};
