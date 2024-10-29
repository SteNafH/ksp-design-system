import r2wc from '@r2wc/react-to-web-component';
import type { ComponentType } from 'react';

const createWebComponent = <T extends ComponentType>(
  name: string,
  component: T,
  options?: Parameters<typeof r2wc>[1],
): T => {
  const customElement = customElements.get(name);
  if (customElement) {
    return customElement.prototype.Component;
  }

  const WebComponent = r2wc(component, options);
  WebComponent.prototype.Component = component;
  customElements.define(name, WebComponent);

  return component;
};

export { createWebComponent };
