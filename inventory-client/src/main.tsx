import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store/store.ts';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />

      <Toaster position="bottom-center" reverseOrder={false} />
    </Provider>
  </StrictMode>
);
