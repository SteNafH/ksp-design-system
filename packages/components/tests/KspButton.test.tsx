import { render, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { KspButton } from '../src';

describe('Button Component', () => {
  test('renders a button with text "Button"', async () => {
    const { getByText } = render(<KspButton />);
    await waitFor(() => expect(getByText('Button')).toBeInTheDocument());
  });
});
