import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Login'
import Home from './Pages/Home'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
     <Route path='/login' element={<Login />} />
    <Route path='/' element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
      } />
    </Routes>
    </>
  )
}

export default App
