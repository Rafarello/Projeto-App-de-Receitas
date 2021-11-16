import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
  


describe('1- Faça o teste da página de Login', () => {
  it('Deve ter todos os elementos e atributos descritos no protótipo para a tela de login', async () => {
    render(<App />)

    const inputLogin = await screen.findByTestId('email-input');
    const inputPassword = await screen.findByTestId('password-input');
    const submitButton = await screen.findByTestId('login-submit-btn');
    expect(inputLogin).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  })
  it('Desenvolva a tela de login de maneira que cumpra os requisitos do input de login e password para liberarem o botão entrar',
  async () => {
    render(<App />)

    const inputLogin = await screen.findByTestId('email-input');
    const inputPassword = await screen.findByTestId('password-input');
    const submitButton = await screen.findByTestId('login-submit-btn');
    
    expect(submitButton).toBeDisabled();

    fireEvent.change(inputLogin, { target: { value: 'email@email.com' } });
    expect(inputLogin).toHaveValue('email@email.com');
    fireEvent.change(inputPassword, { target: { value: '1234567' } });
    expect(inputPassword).toHaveValue('1234567');
    expect(submitButton).toBeEnabled();
  })
  it('Salve 2 tokens no localStorage, cocktailsToken e mealsToken, e redireciona a página após a submissão do login',
  async () => {
    render(<App />);

    const inputLogin = await screen.findByTestId('email-input');
    const inputPassword = await screen.findByTestId('password-input');
    const submitButton = await screen.findByTestId('login-submit-btn');
    
    expect(submitButton).toBeDisabled();

    userEvent.type(inputLogin, 'email@email.com');
    expect(inputLogin).toHaveValue('email@email.com');
    fireEvent.change(inputPassword, { target: { value: '1234567' } });
    expect(inputPassword).toHaveValue('1234567');
    expect(submitButton).toBeEnabled();
    fireEvent.click(submitButton)
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
    expect(JSON.parse(localStorage.getItem('user')))
      .toStrictEqual({ email: 'email@email.com' });
    expect(location.pathname).toBe('/comidas')
  })
})