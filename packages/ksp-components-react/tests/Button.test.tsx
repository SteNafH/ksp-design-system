import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../src';

describe('Button Component', () => {
  it('renders a button with text "Button"', () => {
    render(<Button />);
    const buttonElement = screen.getByRole('button', { name: /button/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
