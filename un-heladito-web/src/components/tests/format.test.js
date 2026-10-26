import { describe, it, expect } from 'vitest';
import { formatCLP, calculateCartCount, calculateCartTotal } from '../../services/format.js';

describe('Funciones del servicio format.js', () => {
  
    it('se debe pasar correctamente un numero a pesos chilenos ', () => {
        const resultado = formatCLP(3500);
        expect(resultado).toContain('$3.500');
    });

    it('se debe calcular correctamente la cantidad total de items en el carrito', () => {
        const items = [
        { id: 1, qty: 2 },
        { id: 2, qty: 3 }
        ];
        expect(calculateCartCount(items)).toBe(5);
    });

    it('se debe calcular correctamente el precio total del carrito', () => {
        const items = [
        { price: 1000, qty: 2 },
        { price: 2000, qty: 1 }
        ];
        expect(calculateCartTotal(items)).toBe(4000);
    });

});