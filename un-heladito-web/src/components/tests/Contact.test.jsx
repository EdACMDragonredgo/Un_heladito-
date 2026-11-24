import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Contact from '../../pages/Contact';

describe('Formulario Contact', () => {
    it('actualiza el estado del formulario cuando el usuario escribe', async () => {
      const user = userEvent.setup();
      render(<Contact />);
      const name = screen.getByLabelText(/nombre completo/i);
      const message = screen.getByLabelText(/^mensaje$/i);

      await user.type(name, 'Camila Pérez');
      await user.type(message, 'Me encantan sus helados');

      expect(name).toHaveValue('Camila Pérez');
      expect(message).toHaveValue('Me encantan sus helados');
    });

    it('muestra la confirmación al enviar y limpia los campos', async () => {
      const user = userEvent.setup();
      render(<Contact />);

      await user.type(screen.getByLabelText(/nombre completo/i), 'Camila');
      await user.type(screen.getByLabelText(/correo electrónico/i), 'camila@example.com');
      await user.type(screen.getByLabelText(/asunto/i), 'Consulta');
      await user.type(screen.getByLabelText(/^mensaje$/i), 'Quisiera conocer los sabores');
      await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

      expect(screen.getByRole('status')).toHaveTextContent(/¡gracias, camila!/i);
      expect(screen.getByRole('status')).toHaveTextContent(/5 estrella/i);
      expect(screen.getByLabelText(/nombre completo/i)).toHaveValue('');
      expect(screen.getByLabelText(/^mensaje$/i)).toHaveValue('');
    });

   
});
