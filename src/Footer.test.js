import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Comidas from './pages/Bebidas';

const FOOTER = 'footer';
const LINK_BEBIDAS = 'drinks-bottom-btn';
const LINK_EXPLORAR = 'explore-bottom-btn';
const LINK_COMIDAS = 'food-bottom-btn';

describe('1- Faça o teste do componente Footer', () => {
  test('Deve ter todos os elementos descrito no enunciado do projeto',
    async () => {
      renderWithRouter(<Comidas />);
      const footer = screen.getByTestId(FOOTER);
      const linkBebidas = screen.getByTestId(LINK_BEBIDAS);
      const linkExplorar = screen.getByTestId(LINK_EXPLORAR);
      const linkComidas = screen.getByTestId(LINK_COMIDAS);
      expect(footer).toBeInTheDocument();
      expect(linkBebidas).toBeInTheDocument();
      expect(linkExplorar).toBeInTheDocument();
      expect(linkComidas).toBeInTheDocument();
    });
});
