import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import SandboxPage from '../pages/SandboxPage'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SandboxPage />
    </StrictMode>,
)
