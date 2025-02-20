import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import NotFound from './components/NotFound/NotFound.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import ThemeProvider from './providers/ThemeProvider/ThemeProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
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
