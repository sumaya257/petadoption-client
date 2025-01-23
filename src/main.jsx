import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import { router } from './routes/Router';
import AuthProvider from './providers/AuthProvider';
import QueryClientProviders from './providers/QueryClientProviders';
import ThemeProvider from './providers/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
      <QueryClientProviders>
        <HelmetProvider>
     <RouterProvider router={router} />
     </HelmetProvider>
     </QueryClientProviders>
     </ThemeProvider>
     </AuthProvider>
  </StrictMode>,
)
