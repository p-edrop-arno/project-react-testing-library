import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente <NotFound.js />', () => {
  test('página contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const text = screen.getByRole('heading', { name: /page requested not found/i });

    expect(text).toBeInTheDocument();
  });

  test('página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByRole('img', { name: /Pikachu crying/i });

    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
