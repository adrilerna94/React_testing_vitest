import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';

import ResourceControls from './ResourceControls';
import { ResourceProvider } from '@/context/resourceContext/resourceContext';

// Helper para renderizar con el Provider real
function renderWithProvider() {
  return render(
    <ResourceProvider>
      <ResourceControls />
    </ResourceProvider>
  );
}

describe('ResourceControls', () => {
  describe('when the ResourceControls component is rendered with default resources', () => {
    it('should display a heading "Estado de Recursos"', () => {
      renderWithProvider();
      const heading = screen.getByRole('heading', {
        name: /^Estado de Recursos$/i,
      });
      expect(heading).toBeInTheDocument();
    });

    it('should show water, oxygen, and energy at 100 by default', () => {
      renderWithProvider();
      // Agua, Oxígeno y Energía empiezan en 100
      const allHundredValues = screen.getAllByText('100');
      expect(allHundredValues).toHaveLength(3); // Uno para cada recurso
    });

    it('should display all four action buttons', () => {
      renderWithProvider();
      expect(
        screen.getByRole('button', { name: /^Consumir Agua$/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /^Consumir Agua y Oxígeno$/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
          name: /^Generar Oxígeno y Consumir Energía$/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /^Reset Recursos$/i })
      ).toBeInTheDocument();
    });
  });

  describe('when the user clicks "Consumir Agua"', () => {
    it('should reduce water from 100 to 90', () => {
      renderWithProvider();
      const btnConsumirAgua = screen.getByRole('button', {
        name: /^Consumir Agua$/i,
      });
      fireEvent.click(btnConsumirAgua);
      // Buscamos el recurso Agua
      const resourceAgua = screen.getByText('Agua').closest('div');
      // Ahora, el texto para el valor de Agua debe ser 90
      expect(within(resourceAgua).getByText('90')).toBeInTheDocument();
    });
  });

  describe('when the user clicks "Consumir Agua y Oxígeno"', () => {
    it('should reduce both water and oxygen from 100 to 95', () => {
      renderWithProvider();
      fireEvent.click(
        screen.getByRole('button', { name: /^Consumir Agua y Oxígeno$/i })
      );
      // Agua y Oxígeno a 95
      const values95 = screen.getAllByText('95');
      expect(values95).toHaveLength(2);
    });
  });

  describe('when the user clicks "Generar Oxígeno y Consumir Energía"', () => {
    it('should clamp oxygen to 100 and reduce energy from 100 to 94 (by default payload)', () => {
      renderWithProvider();
      // Por defecto: oxygenAmount=8, energyCost=6
      fireEvent.click(
        screen.getByRole('button', {
          name: /^Generar Oxígeno y Consumir Energía$/i,
        })
      );
      // Encuentra cada recurso por su nombre
      const resourceOxigeno = screen.getByText('Oxígeno').closest('div');
      const resourceEnergia = screen.getByText('Energía').closest('div');
      // Oxígeno = 100 (108 pero no puede pasar de 100)
      expect(within(resourceOxigeno).getByText('100')).toBeInTheDocument();
      // Energía = 94
      expect(within(resourceEnergia).getByText('94')).toBeInTheDocument();
    });
  });

  describe('when the user clicks "Reset Recursos"', () => {
    it('should reset water, oxygen, and energy back to 100', () => {
      renderWithProvider();
      // Consumir algo primero
      fireEvent.click(screen.getByRole('button', { name: /^Consumir Agua$/i }));
      expect(screen.getByText('90')).toBeInTheDocument();

      // Reset
      fireEvent.click(
        screen.getByRole('button', { name: /^Reset Recursos$/i })
      );
      const allHundredValues = screen.getAllByText('100');
      expect(allHundredValues).toHaveLength(3);
    });
  });
});
