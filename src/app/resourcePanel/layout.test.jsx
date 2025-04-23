import { useContext } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import ResourceLayout from './layout';
import { ResourceContext } from '@/context/resourceContext/resourceContext';

// Componente de prueba que verifica el acceso al contexto
function TestChildComponent() {
  const { state } = useContext(ResourceContext);
  return <p data-testid="child-text">{`Water: ${state.water}`}</p>;
}

describe('ResourceLayout', () => {
  describe('when the layout is rendered', () => {
    it('should display the heading "Recursos"', () => {
      render(<ResourceLayout>Test Content</ResourceLayout>);
      expect(screen.getByText('Recursos')).toBeInTheDocument();
    });

    it('should have the container divs with Tailwind classes', () => {
      const { container } = render(
        <ResourceLayout>Test Content</ResourceLayout>
      );
      // El primer contenedor (root) debe tener "flex flex-col gap-4"
      const rootDiv = container.firstChild;
      expect(rootDiv).toHaveClass('flex', 'flex-col', 'gap-4');

      // El segundo contenedor con "flex flex-col gap-2 items-center justify-center min-h-screen" es el primer hijo del rootDiv.
      const innerDiv = rootDiv.querySelector(
        'div.flex.flex-col.gap-2.items-center.justify-center.min-h-screen'
      );
      expect(innerDiv).toBeInTheDocument();

      // Dentro de ese contenedor esperamos un div con "flex gap-2"
      const flexGap2 = innerDiv.querySelector('div.flex.gap-2');
      expect(flexGap2).toBeInTheDocument();
    });
  });

  describe('when ResourceLayout wraps children with ResourceProvider', () => {
    it('should allow children to access ResourceContext state (water=100)', () => {
      render(
        <ResourceLayout>
          <TestChildComponent />
        </ResourceLayout>
      );
      // 'TestChildComponent' usa ResourceContext.
      // Por defecto, el water = 100 (initialResourceState).
      const childText = screen.getByTestId('child-text');
      expect(childText).toHaveTextContent('Water: 100');
    });

    it('should render multiple children within the ResourceProvider', () => {
      render(
        <ResourceLayout>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </ResourceLayout>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });
  });
});
