import {
  assertThat,
  equalTo,
} from 'hamjest';

import { createComponents } from './components';

describe('createComponent', () => {
  it('given properties are bypassed', () => {
    const componentDefinition = [{ property: 'is bypassed' }];
    const components = createComponents(componentDefinition);

    assertThat(components[0].property, equalTo('is bypassed'));
  });

  describe('initialize()', () => {
    describe('WHEN component specified an initialize method', () => {
      it('calls components initialize method', () => {
        let initialized = void 0;
        const componentDefinition = [{
          initialize(...args) { initialized = args; },
        }];
        const components = createComponents(componentDefinition);
        components[0].initialize('wasCalled');

        assertThat(initialized, equalTo(['wasCalled']));
      });
    });

    describe('OR component is already initialized', () => {
      it('does NOT call initialize method again', () => {
        let initialized = 0;
        const componentDefinition = [{
          initialize() { initialized += 1; },
        }];
        const components = createComponents(componentDefinition);
        components[0].initialize();
        components[0].initialize();

        assertThat(initialized, equalTo(1));
      });
    });



    describe('WHEN component didn\'t specify an initialize method', () => {
      it('doesn\'t fail', () => {
        const componentDefinition = [{}];
        const components = createComponents(componentDefinition);
        components[0].initialize('wasCalled');
      });
    });

    describe('WHEN component was initialized', () => {
      it('isInitialized is true', () => {
        const componentDefinition = [{ initialize() {} }];
        const components = createComponents(componentDefinition);
        components[0].initialize();

        assertThat(components[0].isInitialized(), equalTo(true));
      });
    });
  });

  describe('destruct()', () => {
    it('calls components destruct method', () => {
      let destructed = void 0;
      const componentDefinition = [{
        destruct(...args) { destructed = args; },
      }];
      const components = createComponents(componentDefinition);
      components[0].initialize();
      components[0].destruct('wasCalled');

      assertThat(destructed, equalTo(['wasCalled']));
    });

    describe('OR component is NOT initialized', () => {
      it('does NOT call destruct method again', () => {
        let destructed = 0;
        const componentDefinition = [{
          destruct() { destructed += 1; },
        }];
        const components = createComponents(componentDefinition);
        components[0].initialize();
        components[0].destruct();
        components[0].destruct();

        assertThat(destructed, equalTo(1));
      });
    });

    describe('WHEN component didn\'t specify an destruct method', () => {
      it('doesn\'t fail', () => {
        const componentDefinition = [{}];
        const components = createComponents(componentDefinition);
        components[0].destruct('wasCalled');
      });
    });

    describe('WHEN component was destructed', () => {
      it('isInitialized is false', () => {
        const componentDefinition = [{ destruct() {} }];
        const components = createComponents(componentDefinition);
        components[0].destruct();

        assertThat(components[0].isInitialized(), equalTo(false));
      });
    });
  });
});
