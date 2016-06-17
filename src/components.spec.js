import {
  assertThat,
  equalTo,
} from 'hamjest';

const createComponents = (componentsDefinition) => {
  return componentsDefinition.map((componentDefinition) => {
    let isInitialized = false;

    const initialize = (...args) => {
      componentDefinition.initialize(...args);
      isInitialized = true;
    };


    return {
      initialize,
      get isInitialized() { return isInitialized; }
    };
  });
};

describe('createComponent', () => {
  describe('initialize()', () => {
    it('calls components initialize method', () => {
      let initialized = void 0;
      const COMPONENTS = [{
        initialize(...args) { initialized = args; }
      }];
      const components = createComponents(COMPONENTS);
      components[0].initialize('wasCalled');

      assertThat(initialized, equalTo(['wasCalled']));
    });

    describe('WHEN component was initialized', () => {
      it('isInitialized is true', () => {
        const COMPONENTS = [{ initialize() {} }];
        const components = createComponents(COMPONENTS);
        components[0].initialize();

        assertThat(components[0].isInitialized, equalTo(true));
      });
    });
  });
});

