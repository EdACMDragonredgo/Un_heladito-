import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';
import * as AuthContext from '../../context/AuthContext.jsx';

vi.mock('../../context/AuthContext.jsx', () => ({ useAuth: vi.fn() }));

describe('Página Login', () => {
    beforeEach(() => {
      vi.mocked(AuthContext.useAuth).mockReturnValue({ user: null, login: vi.fn() });
    });

    it('actualiza los valores de correo y contraseña al escribir', async () => {
      const user = userEvent.setup();
      render(<MemoryRouter><Login /></MemoryRouter>);
      await user.type(screen.getByLabelText(/correo electrónico/i), 'alumno@example.com');
      await user.type(screen.getByLabelText(/contraseña/i), 'clave123');
      expect(screen.getByLabelText(/correo electrónico/i)).toHaveValue('alumno@example.com');
      expect(screen.getByLabelText(/contraseña/i)).toHaveValue('clave123');
    });

    it('muestra el error de correo inválido sin llamar al servicio de autenticación', async () => {
      const user = userEvent.setup();
      const login = vi.fn();
      vi.mocked(AuthContext.useAuth).mockReturnValue({ user: null, login });
      render(<MemoryRouter><Login /></MemoryRouter>);
      await user.type(screen.getByLabelText(/correo electrónico/i), 'correo-invalido');
      await user.type(screen.getByLabelText(/contraseña/i), 'clave123');
      fireEvent.submit(screen.getByRole('button', { name: /^ingresar$/i }).closest('form'));
      expect(screen.getByRole('status')).toHaveTextContent(/ingresa un correo válido/i);
      expect(login).not.toHaveBeenCalled();
    });

    it('muestra el mensaje del servicio cuando las credenciales son incorrectas', async () => {
      const user = userEvent.setup();
      const login = vi.fn().mockReturnValue({ ok: false, message: 'Correo o contraseña incorrectos.' });
      vi.mocked(AuthContext.useAuth).mockReturnValue({ user: null, login });
      render(<MemoryRouter><Login /></MemoryRouter>);
      await user.type(screen.getByLabelText(/correo electrónico/i), 'alumno@example.com');
      await user.type(screen.getByLabelText(/contraseña/i), 'clave123');
      await user.click(screen.getByRole('button', { name: /^ingresar$/i }));
      expect(login).toHaveBeenCalledWith('alumno@example.com', 'clave123');
      expect(screen.getByRole('status')).toHaveTextContent(/correo o contraseña incorrectos/i);
    });
});
