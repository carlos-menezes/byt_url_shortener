import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// Components
import App from './App';

import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {DarkTheme, BaseProvider} from 'baseui';

const engine = new Styletron();

ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <App />
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

