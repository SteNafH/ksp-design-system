import { createComponent } from './createComponent';
import { lazy } from 'react';

const Button = createComponent(
  'ksp-button',
  lazy(() =>
    import('@stenafh/ksp-components-react').then((module) => ({
      default: module.Button,
    })),
  ),
);

export { Button };
