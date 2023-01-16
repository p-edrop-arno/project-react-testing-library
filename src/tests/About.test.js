import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testando o componente <About.js />', () => {
  test('Paǵina contém um h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: /about pokédex/i });

    expect(title).toBeInTheDocument();
  });

  test('Página contém dois parágrafos com o texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const texts = screen.getAllByText(/pokémon/i);

    expect(texts).toHaveLength(2);
  });

  test('Página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexPic = screen.getByRole('img', { name: /pokédex/i });

    expect(pokedexPic).toBeInTheDocument();
    expect(pokedexPic.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
