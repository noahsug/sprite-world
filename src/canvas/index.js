import { Container } from 'aurelia-dependency-injection'

import App from './app'

export const createCanvasApp = (root) => {
  const di = new Container()
  const app = di.get(App)
  app.attach(root)
  return app.ui
};
