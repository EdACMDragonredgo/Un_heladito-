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
    it('actualiza el contenido y la clase cuando cambia el tipo de alerta', () => {
    const { rerender } = render(<Alert message="Operación exitosa" type="success" />);
    expect(screen.getByRole('status')).toHaveTextContent('Operación exitosa');
    expect(screen.getByRole('status')).toHaveClass('alert-success');

    rerender(<Alert message="Ocurrió un error" type="danger" />);
    expect(screen.getByRole('status')).toHaveTextContent('Ocurrió un error');
    expect(screen.getByRole('status')).toHaveClass('alert-danger');
  });

  it('no renderiza el mensaje cuando message está vacío', () => {
    const { container } = render(<Alert message="" type="danger" />);
    expect(container.firstChild).toBeNull();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('muestra el mensaje y el estilo correspondiente cuando existe un error', () => {
    render(<Alert message="No fue posible guardar" type="danger" />);
    expect(screen.getByRole('status')).toHaveTextContent('No fue posible guardar');
    expect(screen.getByRole('status')).toHaveClass('alert-danger');
  });

  it('oculta el botón de cierre si no recibe onClose', () => {
    render(<Alert message="Aviso informativo" />);
    expect(screen.queryByRole('button', { name: /cerrar/i })).not.toBeInTheDocument();
  });

  it('usa el tipo info por defecto y ejecuta la función onClose recibida', async () => {
    const onClose = vi.fn();
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<Alert message="Información" onClose={onClose} />);
    expect(screen.getByRole('status')).toHaveClass('alert-info');
    await user.click(screen.getByRole('button', { name: /cerrar/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

});