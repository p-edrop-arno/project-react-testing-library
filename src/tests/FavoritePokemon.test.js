import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemon } from '../pages';

describe('Testando o componente <FavoritePokemon.js />', () => {
  test('Exibida na tela a mensagem "No favorite pokemon found" caso não tenha ', () => {
    renderWithRouter(<FavoritePokemon />);

    const noFavoritePokemon = screen.getByText(/No favorite pokémon found/i);

    expect(noFavoritePokemon).toBeInTheDocument();
  });

  test('São exibidos todos os cards de Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const checkbox = screen.getByText(/pokémon favoritado\?/i);

    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const favorite = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const pikachu = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(pikachu).toBeInTheDocument();
  });
});
