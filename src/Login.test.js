import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
const EMAIL_VALUE = 'email@email.com';

describe('1- Faça o teste da página de Login', () => {
  it(`Deve ter todos os elementos e 
  atributos descritos no protótipo para a tela de login`,
  async () => {
    render(<App />);
    const inputLogin = await screen.findByTestId(EMAIL_INPUT);
    const inputPassword = await screen.findByTestId(PASSWORD_INPUT);
    const submitButton = await screen.findByTestId(LOGIN_SUBMIT_BTN);
    expect(inputLogin).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it(`Desenvolva a tela de login de maneira que cumpra os requisitos do
   input de login e password para liberarem o botão entrar`,
  async () => {
    render(<App />);
    const inputLogin = await screen.findByTestId(EMAIL_INPUT);
    const inputPassword = await screen.findByTestId(PASSWORD_INPUT);
    const submitButton = await screen.findByTestId(LOGIN_SUBMIT_BTN);

    expect(submitButton).toBeDisabled();
    fireEvent.change(inputLogin, { target: { value: EMAIL_VALUE } });
    expect(inputLogin).toHaveValue(EMAIL_VALUE);
    fireEvent.change(inputPassword, { target: { value: '1234567' } });
    expect(inputPassword).toHaveValue('1234567');
    expect(submitButton).toBeEnabled();
  });
  it(`Salve 2 tokens no localStorage, cocktailsToken e mealsToken, e 
  redireciona a página após a submissão do login`,
  async () => {
    render(<App />);
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
  });
});
