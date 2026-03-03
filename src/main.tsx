import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Character  from './pages/Character'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/characters/:id' element={<Character/>}/>
        </Routes>
      </BrowserRouter>
      
    </QueryClientProvider>
    
  </StrictMode>,

)
