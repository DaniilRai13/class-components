import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import App from './App.tsx';
import NotFound from './components/NotFound/NotFound.tsx';
import './index.css';
import ThemeProvider from './providers/ThemeProvider/ThemeProvider.tsx';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter basename='/class-components/'>
          <Routes>
            <Route path="/people/*" element={<App />} />
            <Route path="/" element={<Navigate to="/people" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
