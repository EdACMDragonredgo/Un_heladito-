import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../pages/Register';
import * as AuthContext from '../../context/AuthContext.jsx';

vi.mock('../../context/AuthContext.jsx', () => ({ useAuth: vi.fn() }));

describe('Página Register', () => {
  beforeEach(() => {
    vi.mocked(AuthContext.useAuth).mockReturnValue({ user: null, register: vi.fn() });
  });

  it('actualiza el estado de los campos al introducir texto', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Register /></MemoryRouter>);
    await user.type(screen.getByLabelText(/nombre completo/i), 'Alex Soto');
    await user.type(screen.getByLabelText(/correo electrónico/i), 'alex@example.com');
    expect(screen.getByLabelText(/nombre completo/i)).toHaveValue('Alex Soto');
    expect(screen.getByLabelText(/correo electrónico/i)).toHaveValue('alex@example.com');
  });

  it('muestra un error cuando las contraseñas no coinciden', async () => {
    const user = userEvent.setup();
    const register = vi.fn();
    vi.mocked(AuthContext.useAuth).mockReturnValue({ user: null, register });
    render(<MemoryRouter><Register /></MemoryRouter>);
    await user.type(screen.getByLabelText(/nombre completo/i), 'Alex Soto');
    await user.type(screen.getByLabelText(/correo electrónico/i), 'alex@example.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'clave1234');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), 'otra1234');
    await user.click(screen.getByRole('button', { name: /crear mi cuenta/i }));
    expect(screen.getByRole('status')).toHaveTextContent(/las contraseñas no coinciden/i);
    expect(register).not.toHaveBeenCalled();
  });

  it('llama a register con los datos del formulario cuando las contraseñas coinciden', async () => {
    const user = userEvent.setup();
    const register = vi.fn().mockReturnValue({ ok: false, message: 'Prueba controlada' });
    vi.mocked(AuthContext.useAuth).mockReturnValue({ user: null, register });
    render(<MemoryRouter><Register /></MemoryRouter>);
    await user.type(screen.getByLabelText(/nombre completo/i), 'Alex Soto');
    await user.type(screen.getByLabelText(/correo electrónico/i), 'alex@example.com');
    await user.type(screen.getByLabelText(/^contraseña$/i), 'clave1234');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), 'clave1234');
    await user.click(screen.getByRole('button', { name: /crear mi cuenta/i }));
    expect(register).toHaveBeenCalledWith({
      name: 'Alex Soto', email: 'alex@example.com', password: 'clave1234', confirm: 'clave1234'
    });
    expect(screen.getByRole('status')).toHaveTextContent('Prueba controlada');
  });
});
