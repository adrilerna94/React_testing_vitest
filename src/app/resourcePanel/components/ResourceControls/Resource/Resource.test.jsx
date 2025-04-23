// Importamos las herramientas necesarias para renderizar componentes y hacer pruebas en el DOM
import { render, screen } from "@testing-library/react";

// importamos funciones de test de Vitest
import { describe, it, expect } from "vitest";

// importamos el componente a testear
import Resource from "./Resource";

// agrupamos todos los test relacionados con el componente <Resource />
describe('Resource component', () => {
    //Contexto: cuando el componente se renderiza con props validos
    describe('When Resource is renderes with props', () => {
        // Verify resource name appears
        it('should render the resource name', () => {
            // Render componente with Water name value (50) color blue
            render(<Resource resourceName='Water' resourceValue={50} color='bg-blue-500' />);

            // Search water Text ignoring upper/lower case
            const name = screen.getByText(/Water/i);

            // Text shoud appear in the DOM
            expect(name).toBeInTheDocument();

        });

        it('should render the resource value', () => {
            // render oxygen with value 75
            render(<Resource resourceName='Oxygen' resourceValue={75} color='bg-green-500' />);

            // Search value 75
            const value = screen.getByText('75');

            // value 75 should appear
            expect(value).toBeInTheDocument();
        });

        it('should apply correct progress bar width style', () => {
            // render energy style width 30
            render(<Resource resourceName='Energy' resourceValue={30} color="bg-yellow-400" />);

            // Search by role progressbar
            const progressbar = screen.getByRole('progressbar');

            // expect to have stylewidth: 30%
            expect(progressbar).toHaveStyle('width: 30%');
        });

        it('should include the provided color classs in progress bar', () => {
            render(<Resource resourceName='Water' resourceValue={30} color='bg-purple-600' />);

            const progressbar = screen.getByRole('progressbar');

            expect(progressbar.className).toContain('bg-purple-600');
        });

        it ('should render a wrapper div with specific margin bottom (mb)', () => {

            const { container } = render(<Resource resourceName='oxygen' resourceValue={10} color='bg-yellow-500' />);

            const rootDiv = container.firstChild;

            expect(rootDiv).toBeInTheDocument();
            expect(rootDiv).toHaveClass('mb-4');
        });

        it ('should render name, value and progressbar together', () => {

            render(<Resource resourceName='water' resourceValue={70} color='bg-green-500' />);

            expect(screen.getByText('water')).toBeInTheDocument();
            expect(screen.getByText('70')).toBeInTheDocument();
            expect(screen.getByRole('progressbar')).toBeInTheDocument();
        });
    })
})

