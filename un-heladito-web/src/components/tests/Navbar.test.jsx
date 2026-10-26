import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import * as CartContext from '../../context/CartContext.jsx';
import * as AuthContext from '../../context/AuthContext.jsx';


vi.mock('../../context/CartContext.jsx', async () => {
    const actual = await vi.importActual('../../context/CartContext.jsx');
    return {
        ...actual,
        useCart: vi.fn(),
    };
});

vi.mock('../../context/AuthContext.jsx', async () => {
    const actual = await vi.importActual('../../context/AuthContext.jsx');
    return {
        ...actual,
        useAuth: vi.fn(),
    };
});

describe('Componente Navbar', () => {
  
    const setupMocks = ({ cartCount = 0, user = null } = {}) => {
        vi.mocked(CartContext.useCart).mockReturnValue({
        count: cartCount,
        items: [],
        total: 0,
        addToCart: vi.fn(),
        });

        vi.mocked(AuthContext.useAuth).mockReturnValue({
        user,
        login: vi.fn(),
        logout: vi.fn(),
        register: vi.fn(),
        });
    };

    it('deben procesar y mostrarse correctamente los enlaces principales de navegación', () => {
        setupMocks({ cartCount: 0, user: null });

        render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
        );

    
        expect(screen.getByText('Un Heladito')).toBeInTheDocument();

        
        expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /catálogo/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /categorías/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /ofertas/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /nosotros/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /contacto/i })).toBeInTheDocument();
    });

    it('debe mostrar el contador actualizado del carrito', () => {
        setupMocks({ cartCount: 5, user: null });

        render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
        );

    
        const cartBadge = screen.getByText('5');
        expect(cartBadge).toBeInTheDocument();
        expect(cartBadge).toHaveClass('cart-badge');
    });


});