import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import { router } from './routes/Router';
import AuthProvider from './providers/AuthProvider';
import QueryClientProviders from './providers/QueryClientProviders';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProviders>
     <RouterProvider router={router} />
     </QueryClientProviders>
     </AuthProvider>
  </StrictMode>,
)
