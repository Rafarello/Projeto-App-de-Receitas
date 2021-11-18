import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Comidas from './pages/Bebidas';

const PROFILE_BTN = 'profile-top-btn';
const PAGE_TITLE = 'page-title';
const SEARCH_BTN = 'search-top-btn';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('1- Faça o teste do componente Footer', () => {
  test('Deve ter todos os elementos descrito no enunciado do projeto',
    async () => {
      renderWithRouter(<Comidas />);
      const profileBtn = screen.getByTestId(PROFILE_BTN);
      const pageTitle = screen.getByTestId(PAGE_TITLE);
      const searchBtn = screen.getByTestId(SEARCH_BTN);

      expect(profileBtn).toBeInTheDocument();
      expect(pageTitle).toBeInTheDocument();
      expect(searchBtn).toBeInTheDocument();

      userEvent.click(searchBtn);
      const ingredientRadio = screen.getByTestId(INGREDIENT_RADIO);
      const nameRadio = screen.getByTestId(NAME_RADIO);
      const firstLetterRadio = screen.getByTestId(FIRST_LETTER_RADIO);
      const execSearchBtn = screen.getByTestId(EXEC_SEARCH_BTN);
      expect(ingredientRadio).toBeInTheDocument();
      expect(nameRadio).toBeInTheDocument();
      expect(firstLetterRadio).toBeInTheDocument();
      expect(execSearchBtn).toBeInTheDocument();
    });
});
