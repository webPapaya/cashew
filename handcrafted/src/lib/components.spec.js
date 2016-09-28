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

  describe('construct()', () => {
    describe('WHEN component specified an construct method', () => {
      it('calls components construct method', () => {
        let constructed = void 0;
        const componentDefinition = [{
          construct(...args) { constructed = args; },
        }];
        const components = createComponents(componentDefinition);
        components[0].construct('wasCalled');

        assertThat(constructed, equalTo(['wasCalled']));
      });
    });

    describe('OR component is already initialized', () => {
      it('does NOT call construct method again', () => {
        let constructed = 0;
        const componentDefinition = [{
          construct() { constructed += 1; },
        }];
        const components = createComponents(componentDefinition);
        components[0].construct();
        components[0].construct();

        assertThat(constructed, equalTo(1));
      });
    });

    describe('WHEN component didn\'t specify an construct method', () => {
      it('doesn\'t fail', () => {
        const componentDefinition = [{}];
        const components = createComponents(componentDefinition);
        components[0].construct('wasCalled');
      });
    });

    describe('WHEN component was initialized', () => {
      it('isInitialized is true', () => {
        const componentDefinition = [{ construct() {} }];
        const components = createComponents(componentDefinition);
        components[0].construct();

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
      components[0].construct();
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
        components[0].construct();
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
