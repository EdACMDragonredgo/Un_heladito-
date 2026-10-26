import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Alert from '../Alert';

describe('Componente Alert', () => {
  
    it('se debe procesar el mensaje correcto segun el tipo de alerta', () => {
        const { rerender } = render(<Alert message="Operación exitosa" type="success" />);

        const alertElement = screen.getByRole('status');
        expect(alertElement).toHaveTextContent('Operación exitosa');
        expect(alertElement).toHaveClass('alert-success');

        rerender(<Alert message="Ocurrió un error" type="danger" />);
        expect(alertElement).toHaveTextContent('Ocurrió un error');
        expect(alertElement).toHaveClass('alert-danger');
    });

    it('se debe ejecutar correctamente el boton de cerrar cuando salga una alerta', async () => {
        const handleClose = vi.fn();
        const user = userEvent.setup();

        render(<Alert message="Mensaje de advertencia" type="warning" onClose={handleClose} />);

        const closeButton = screen.getByRole('button', { name: /cerrar/i });
        expect(closeButton).toBeInTheDocument();

        await user.click(closeButton);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});