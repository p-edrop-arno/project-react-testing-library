import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <PokemonDetails.js />', () => {
  test('Informações detalhadas do Pokémon selecionado são mostradas', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const title = screen.getByRole('heading', { name: /Pikachu details/i });

    expect(title).toBeInTheDocument();

    const subtitle = screen.getByRole('heading', { name: /summary/i });

    expect(subtitle).toBeInTheDocument();

    const text = 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.';
    const summary = screen.getByText(`${text}`);

    expect(summary).toBeInTheDocument();
  });

  test('Existe na página uma seção com os mapas', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const title = screen.getByRole('heading', { name: /Game Locations of pikachu/i });

    expect(title).toBeInTheDocument();

    const locationOne = screen.getByText(/Kanto Viridian Forest/i);

    expect(locationOne).toBeInTheDocument();

    const locationTwo = screen.getByText(/Kanto power plant/i);

    expect(locationTwo).toBeInTheDocument();

    const map = screen.getAllByRole('img', { alt: /Pikachu location/i });

    expect((map[1]).src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect((map[1]).alt).toBe('Pikachu location');
    expect((map[2]).src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect((map[2]).alt).toBe('Pikachu location');
  });

  test('Usuário pode favoritar um Pokémon através da página', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });

    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const favoriteStar = screen.getByAltText(/pikachu is marked as favorite/i);

    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
