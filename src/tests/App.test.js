import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <App.js />', () => {
  test('Topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });

    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /About/i });

    expect(aboutLink).toBeInTheDocument();

    const favoritePokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });

    expect(favoritePokemon).toBeInTheDocument();
  });

  test('Aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });

    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  test('aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });

    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  test('aplicação é redirecionada para a página de Pokémon Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });

    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);
    expect(history.location.pathname).toBe('/favorites');
  });
});
