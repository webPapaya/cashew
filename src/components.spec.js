import {
  assertThat,
  equalTo,
} from 'hamjest';

import { createComponents } from './components';

describe('createComponent', () => {
  it('given properties are bypassed', () => {
    const COMPONENTS = [{
      property: 'is bypassed'
    }];
    const components = createComponents(COMPONENTS);

    assertThat(components[0].property, equalTo('is bypassed'));
  });

  describe('initialize()', () => {
    describe('WHEN component specified an initialize method', () => {
      it('calls components initialize method', () => {
        let initialized = void 0;
        const COMPONENTS = [{
          initialize(...args) { initialized = args; }
        }];
        const components = createComponents(COMPONENTS);
        components[0].initialize('wasCalled');

        assertThat(initialized, equalTo(['wasCalled']));
      });
    });

    describe('WHEN component didn\'t specify an initialize method', () => {
      it('doesn\'t fail', () => {
        const COMPONENTS = [{}];
        const components = createComponents(COMPONENTS);
        components[0].initialize('wasCalled');
      });
    });

    describe('WHEN component was initialized', () => {
      it('isInitialized is true', () => {
        const COMPONENTS = [{ initialize() {} }];
        const components = createComponents(COMPONENTS);
        components[0].initialize();

        assertThat(components[0].isInitialized(), equalTo(true));
      });
    });
  });

  describe('destruct()', () => {
    it('calls components destruct method', () => {
      let destructed = void 0;
      const COMPONENTS = [{
        destruct(...args) { destructed = args; }
      }];
      const components = createComponents(COMPONENTS);
      components[0].destruct('wasCalled');

      assertThat(destructed, equalTo(['wasCalled']));
    });

    describe('WHEN component didn\'t specify an destruct method', () => {
      it('doesn\'t fail', () => {
        const COMPONENTS = [{}];
        const components = createComponents(COMPONENTS);
        components[0].destruct('wasCalled');
      });
    });

    describe('WHEN component was destructed', () => {
      it('isInitialized is false', () => {
        const COMPONENTS = [{ destruct() {} }];
        const components = createComponents(COMPONENTS);
        components[0].destruct();

        assertThat(components[0].isInitialized(), equalTo(false));
      });
    });
  });
});

