import React from 'react';
import { assertThat, equalTo, containsString } from 'hamjest';
import { server } from './bootstrap';

describe('bootstrap server', () => {
  it('renders given component as string', () => {
    const DummyComponent = ({ text }) => <div>{ text }</div>;
    const textForComponent = 'My Component';

    assertThat(server(<DummyComponent text={ textForComponent }/>),
      containsString(textForComponent));
  });
});

