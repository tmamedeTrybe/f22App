import { cleanup, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MyProvider from '../../context/myProvider';

// export const renderWithContext = (component, { route = '/' } = {}) => {
//   window.history.pushState({}, 'Test page', route);

//   return {
//     ...render(<MyProvider>{component}</MyProvider>, { wrapper: BrowserRouter }),
//   };
// };

export const renderWithContext = (component) => ({
  ...render(
    <MyProvider>
      {component}
    </MyProvider>,
    { wrapper: BrowserRouter },
  ),
});

afterEach(cleanup);
