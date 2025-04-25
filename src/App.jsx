import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Login'
import Home from './Pages/Home'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import Myprofile from './Pages/Myprofile'
import ExplorePage from './Pages/Explore'
import DigitalLibrary from './components/DigitalLibrary'
import Ai from './Pages/Ai'
import BookViewer from './components/BookViewer'
import Progress from './Pages/Progress'

function App() {
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route
          path='/my-profile'
          element={
            <ProtectedRoute>
              <Myprofile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/Explore'
          element={
            <ProtectedRoute>
              <ExplorePage />
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
         <Route
          path='/Progress'
          element={
            <ProtectedRoute>
              <Progress/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
