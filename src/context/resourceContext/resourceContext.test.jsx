import { describe, it, expect, afterEach } from 'vitest';
import { useContext } from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import { ResourceContext, ResourceProvider } from './resourceContext';
import { actionTypes } from './resourceReducer/resourceReducer';

// Componente de prueba que leerá y modificará el estado
function TestConsumer() {
  const { state, dispatch } = useContext(ResourceContext);

  const handleConsumeWater = () => {
    dispatch({
      type: actionTypes.CONSUME_WATER,
      payload: { amount: 10 },
    });
  };

  const handleUnknownAction = () => {
    dispatch({ type: 'UNKNOWN_ACTION' });
  };

  return (
    <div>
      <p data-testid="water-level">Water: {state.water}</p>
      <p data-testid="oxygen-level">Oxygen: {state.oxygen}</p>
      <p data-testid="energy-level">Energy: {state.energy}</p>
      <button onClick={handleConsumeWater}>Consume Water</button>
      <button onClick={handleUnknownAction}>Unknown Action</button>
    </div>
  );
}

describe('ResourceContext', () => {
  describe('when the ResourceProvider is rendered', () => {
    it('should provide the initial state to consumer components', () => {
      render(
        <ResourceProvider>
          <TestConsumer />
        </ResourceProvider>
      );
      // Verificamos que el estado inicial sea el esperado
      expect(screen.getByTestId('water-level').textContent).toContain('100');
      expect(screen.getByTestId('oxygen-level').textContent).toContain('100');
      expect(screen.getByTestId('energy-level').textContent).toContain('100');
    });
  });
  describe('when a consumer component dispatches CONSUME_WATER', () => {
    it('should update the state and reduce water by 10', () => {
      render(
        <ResourceProvider>
          <TestConsumer />
        </ResourceProvider>
      );
      const waterLevel = screen.getByTestId('water-level');
      expect(waterLevel.textContent).toBe('Water: 100');

      // Consumimos 10 de agua
      fireEvent.click(screen.getByText('Consume Water'));

      // Verificamos que el agua haya bajado a 90
      expect(waterLevel.textContent).toBe('Water: 90');
    });

    it('should not update other states', () => {
      render(
        <ResourceProvider>
          <TestConsumer />
        </ResourceProvider>
      );
      const oxygenLevel = screen.getByTestId('oxygen-level');
      const energyLevel = screen.getByTestId('energy-level');
      expect(oxygenLevel.textContent).toBe('Oxygen: 100');
      expect(energyLevel.textContent).toBe('Energy: 100');

      // Consumimos 10 de agua
      fireEvent.click(screen.getByText('Consume Water'));

      // Verifica que solo cambie el agua
      expect(oxygenLevel.textContent).toBe('Oxygen: 100');
      expect(energyLevel.textContent).toBe('Energy: 100');
    });
  });

  describe('when a consumer component dispatches an unknown action', () => {
    it('should keep the state unchanged', () => {
      render(
        <ResourceProvider>
          <TestConsumer />
        </ResourceProvider>
      );
      fireEvent.click(screen.getByText('Unknown Action'));
      expect(screen.getByText('Water: 100')).toBeInTheDocument();
    });
  });

  describe('when multiple ResourceProviders are rendered', () => {
    it('should keep independent states for each provider', () => {
      // Renderizamos DOS proveedores en paralelo
      render(
        <>
          <ResourceProvider>
            <div data-testid="first">
              <TestConsumer />
            </div>
          </ResourceProvider>
          <ResourceProvider>
            <div data-testid="second">
              <TestConsumer />
            </div>
          </ResourceProvider>
        </>
      );

      // Obtenemos botones y labels
      const firstDiv = screen.getByTestId('first');
      const secondDiv = screen.getByTestId('second');

      // Ambos inician en 100
      expect(firstDiv).toHaveTextContent('Water: 100');
      expect(secondDiv).toHaveTextContent('Water: 100');

      // Consumimos agua en el primer provider
      fireEvent.click(firstDiv.querySelector('button'));

      // El primero baja a 90, el segundo permanece en 100
      expect(firstDiv).toHaveTextContent('Water: 90');
      expect(secondDiv).toHaveTextContent('Water: 100');
    });
  });

  describe('when a consumer component dispatches the RESET action', () => {
    it('should reset the state to initial values', () => {
      // Componente de prueba con botón de reset
      function TestResetConsumer() {
        const { state, dispatch } = useContext(ResourceContext);
        return (
          <div>
            <p data-testid="water">{state.water}</p>
            <button
              onClick={() =>
                dispatch({
                  type: actionTypes.CONSUME_WATER,
                  payload: { amount: 50 },
                })
              }
            >
              Consume 50 Water
            </button>
            <button
              onClick={() => dispatch({ type: actionTypes.RESET_RESOURCES })}
            >
              Reset
            </button>
          </div>
        );
      }

      render(
        <ResourceProvider>
          <TestResetConsumer />
        </ResourceProvider>
      );

      const waterEl = screen.getByTestId('water');
      expect(waterEl.textContent).toBe('100');

      // Consumimos 50 agua
      fireEvent.click(screen.getByText('Consume 50 Water'));
      expect(waterEl.textContent).toBe('50');

      // Reseteamos
      fireEvent.click(screen.getByText('Reset'));
      expect(waterEl.textContent).toBe('100');
    });
  });

  describe('when the ResourceProvider is rendered without children', () => {
    it('should not throw an error', () => {
      expect(() => render(<ResourceProvider />)).not.toThrow();
    });
  });
});
