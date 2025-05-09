import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Login'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import Myprofile from './Pages/Myprofile'
import HomePage from './Pages/Explore'
import DigitalLibrary from './components/DigitalLibrary'
import Ai from './Pages/Ai'
import BookViewer from './components/BookViewer'
import Progress from './Pages/Progress'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<><HomePage /> <Footer/></>} />
        <Route
          path='/my-profile'
          element={
            <ProtectedRoute>
              <Myprofile />
              <Footer/>
            </ProtectedRoute>
          }
        />
        
        <Route
          path='/AI'
          element={
            <ProtectedRoute>
              <Ai />
            </ProtectedRoute>
          }
        />
        <Route
          path='/Books'
          element={
            <ProtectedRoute>
              <DigitalLibrary/>
              <Footer/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/Books/:id'
          element={
            <ProtectedRoute>
              <BookViewer/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
