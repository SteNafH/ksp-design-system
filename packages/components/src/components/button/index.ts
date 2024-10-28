import { lazy } from 'react';
import { createWebComponent } from '../createWebComponent';

const KspButton = createWebComponent(
  'ksp-button',
  lazy(() =>
    import('./KspButton').then((module) => ({
      default: module.KspButton,
    })),
  ),
);

export { KspButton };
