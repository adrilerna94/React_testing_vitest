import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Importamos la página que queremos testear
import Home from './page';

// Mockeamos el componente ResourceControls
vi.mock('./components/ResourceControls/ResourceControls', () => {
  // Retorna un mock genérico
  return {
    default: () => (
      <div data-testid="mock-resource-controls">
        <h4>Estado de Recursos</h4>
        <p>Mock Resource</p>
      </div>
    ),
  };
});

describe('Home Page', () => {
  describe('when the Home page is rendered', () => {
    it('should render the mocked ResourceControls component', () => {
      render(<Home />);
      // Verificamos el texto que aparece en el mock
      const resourceText = screen.getByText(/Estado de Recursos/i);
      expect(resourceText).toBeInTheDocument();
    });

    it("should have a container with Tailwind classes 'flex justify-center items-center'", () => {
      const { container } = render(<Home />);
      const divElement = container.firstChild;
      expect(divElement).toBeInTheDocument();
      expect(divElement).toHaveClass('flex', 'justify-center', 'items-center');
    });

    it('should not contain any additional elements besides the ResourceControls component in the root', () => {
      const { container } = render(<Home />);
      // El root div con las clases
      const rootDiv = container.querySelector(
        'div.flex.justify-center.items-center'
      );
      // Debe tener exactamente 1 hijo: <ResourceControls /> (mock)
      expect(rootDiv.children.length).toBe(1);
    });
  });
});
