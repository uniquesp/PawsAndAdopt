import './App.css'
import { Toaster } from './components/ui/sonner'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <>
     <Toaster richColors position="top-right" />
     <AppRoutes/> 
    </>
  )
}

export default App
