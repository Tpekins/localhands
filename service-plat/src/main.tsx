import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { UserProvider } from './contexts/userContext';
import { DataProvider } from './contexts/DataContext';
import { AuthFormProvider } from './contexts/AuthFormContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <DataProvider>
        <AuthFormProvider>
          <App />
        </AuthFormProvider>
      </DataProvider>
    </UserProvider>
  </StrictMode>,
);
