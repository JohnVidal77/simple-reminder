import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store as AppStore } from '../app/store';

function render(ui: JSX.Element, { store = AppStore, ...renderOptions } = {}) {
  function Wrapper({ children }: { children: JSX.Element }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
