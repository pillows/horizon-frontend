/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import Page from './page';

it('should render root page', () => {
  render(<Page />);

  const heading = screen.getByRole('heading');

  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent('Nodly Next Template');
});
