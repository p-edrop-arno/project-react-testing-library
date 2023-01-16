import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <Pokemon.js />', () => {
  test('é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');

    expect(name).toHaveTextContent(/pikachu/i);

    const type = screen.getByTestId('pokemon-type');

    expect(type).toHaveTextContent(/electric/i);

    const weight = screen.getByTestId('pokemon-weight');

    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);

    const image = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Card do Pokémon indicado na Pokédex contém um link de navegação para detalhes', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    expect(details.href).toBe('http://localhost/pokemon/25');
  });
  test('Existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });

    userEvent.click(details);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });

    userEvent.click(checkbox);

    const home = screen.getByRole('link', { name: /home/i });

    userEvent.click(home);

    const iconFavorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(iconFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(iconFavorite.alt).toBe('Pikachu is marked as favorite');
  });
});
