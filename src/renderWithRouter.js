import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from './context/Provider';

// Código abaixo retirado da aula ao vivo do dia 15.3 momento 1:06:00
function renderWithRouter(component) {
  const history = createMemoryHistory();
  const selectorsRTL = render(
    <Router history={ history }>
      <Provider>
        { component }
      </Provider>
    </Router>,
  );

  return {
    ...selectorsRTL,
    history,
  };
}

export default renderWithRouter;
