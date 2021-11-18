import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from './App';

const FOOTER = 'footer';
const LINK_BEBIDAS = 'drinks-bottom-btn';
const LINK_EXPLORAR = 'explore-bottom-btn';
const LINK_COMIDAS = 'food-bottom-btn';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
const EMAIL_VALUE = 'email@email.com';

describe('1- Faça o teste do componente Footer', () => {
  test('Deve ter todos os elementos descrito no enunciado do projeto',
    async () => {
      renderWithRouter(<App />);
      const inputLogin = await screen.findByTestId(EMAIL_INPUT);
      const inputPassword = await screen.findByTestId(PASSWORD_INPUT);
      const submitButton = await screen.findByTestId(LOGIN_SUBMIT_BTN);
      const { location } = globalThis;
      expect(submitButton).toBeDisabled();

      userEvent.type(inputLogin, EMAIL_VALUE);
      expect(inputLogin).toHaveValue(EMAIL_VALUE);
      fireEvent.change(inputPassword, { target: { value: '1234567' } });
      expect(inputPassword).toHaveValue('1234567');
      expect(submitButton).toBeEnabled();
      fireEvent.click(submitButton);
      expect(localStorage.getItem('mealsToken')).toBe('1');
      expect(localStorage.getItem('cocktailsToken')).toBe('1');
      expect(JSON.parse(localStorage.getItem('user')))
        .toStrictEqual({ email: EMAIL_VALUE });
      expect(location.pathname).toBe('/comidas');

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
