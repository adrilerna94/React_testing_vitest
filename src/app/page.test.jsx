import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Importamos la página que queremos testear
import Home from './page';

describe('Home Page', () => {
  describe('when the Home page is rendered', () => {
    it('should render a heading with "Mission: Red Planet"', () => {
      render(<Home />);
      const heading = screen.getByRole('heading', {
        name: /Mission: Red Planet/i,
      });
      expect(heading).toBeInTheDocument();
    });

    it('should have a link to "/resourcePanel" with text "Resource Panel"', () => {
      render(<Home />);
      const link = screen.getByRole('link', { name: /Resource Panel/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/resourcePanel');
    });

    it('should use a <main> element with Tailwind classes "p-8 flex flex-col gap-10"', () => {
      render(<Home />);
      const mainElement = screen.getByRole('main');
      expect(mainElement).toHaveClass('p-8', 'flex', 'flex-col', 'gap-10');
    });

    it('should render a List (ul) and a single ListItem (li) containing the "Resource Panel" link', () => {
      render(<Home />);
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(1);
      expect(listItems[0]).toContainElement(
        screen.getByRole('link', { name: /Resource Panel/i })
      );
    });
  });
});
