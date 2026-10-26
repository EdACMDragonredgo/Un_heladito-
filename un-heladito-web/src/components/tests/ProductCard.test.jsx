import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';

describe('Componente ProductCard', () => {
    const mockProduct = {
        id: 1,
        name: 'Helado de Chocolate Belga',
        description: 'Delicioso helado artesanal de chocolate belga.',
        price: 3500,
        category: 'Helados tradicionales',
        image: '/images/chocolate-belga.jpeg',
        stock: 10,
        format: '500 g'
    };

    it('debe Procesar correctamente la información del producto', () => {
        render(
            <MemoryRouter>
                <ProductCard product={mockProduct} onAddToCart={() => {}} />
            </MemoryRouter>
        );

        expect(screen.getByText('Helados tradicionales')).toBeInTheDocument();
        expect(screen.getByText('Helado de Chocolate Belga')).toBeInTheDocument();
        expect(screen.getByText('Delicioso helado artesanal de chocolate belga.')).toBeInTheDocument();
        expect(screen.getByText('$3.500')).toBeInTheDocument(); 
    });

    it('debe mostrar el botón deshabilitado y con el texto Agotado cuando el stock es 0', () => {
        const outOfStockProduct = { ...mockProduct, stock: 0 };

        render(
        <MemoryRouter>
            <ProductCard product={outOfStockProduct} onAddToCart={() => {}} />
        </MemoryRouter>
        );

        const button = screen.getByRole('button', { name: /agotado/i });
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it('debe ejecutar bien el onClick y agregar al carrito cuando se presione agregar +', async () => {
        const handleAddToCart = vi.fn();
        const user = userEvent.setup();

        render(
        <MemoryRouter>
            <ProductCard product={mockProduct} onAddToCart={handleAddToCart} />
        </MemoryRouter>
        );

        const button = screen.getByRole('button', { name: /agregar \+/i });
        await user.click(button);

        expect(handleAddToCart).toHaveBeenCalledTimes(1);
        expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
    });

});