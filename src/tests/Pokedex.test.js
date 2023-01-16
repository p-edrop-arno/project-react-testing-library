import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <Pokedex.js />', () => {
  test('Página contém um heading h2 com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: /encountered pokémon/i });

    expect(title).toBeInTheDocument();
  });
  test('exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const buttonClick = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(buttonClick).toBeInTheDocument();

    userEvent.click(buttonClick);

    const charmander = screen.getByText(/Charmander/i);

    expect(charmander).toBeInTheDocument();

    userEvent.click(buttonClick);
    userEvent.click(buttonClick);
    userEvent.click(buttonClick);
    userEvent.click(buttonClick);
    userEvent.click(buttonClick);
    userEvent.click(buttonClick);
    userEvent.click(buttonClick);

    const dragonair = screen.getByText(/Dragonair/i);

    expect(dragonair).toBeInTheDocument();

    userEvent.click(buttonClick);

    const pikachu = screen.getByText(/Pikachu/i);

    expect(pikachu).toBeInTheDocument();
  });
  test('É mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const card = screen.getAllByTestId('pokemon-name');

    expect(card).toHaveLength(1);

    const buttonClick = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(buttonClick);
    expect(card).toHaveLength(1);
  });
  test('Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttons = screen.getByRole('button', { name: /all/i });

    expect(buttons).toBeInTheDocument();

    const totalTypeButtons = 7;
    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    expect(typeButtons).toHaveLength(totalTypeButtons);

    const bugType = typeButtons[2];
    const pokemonType = 'Bug';

    expect(bugType).toHaveTextContent(pokemonType);
    userEvent.click(bugType);

    const type = screen.getByTestId('pokemon-type');

    expect(type).toHaveTextContent(pokemonType);
    expect(buttons).toBeInTheDocument();
  });
  test('Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const resetAll = screen.getByText('All');

    expect(resetAll).toBeInTheDocument();

    userEvent.click(resetAll);
  });
});
