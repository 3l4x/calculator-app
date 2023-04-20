import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthLayout, MainLayout } from './components/layout/'
import {HomeScreen,LoginScreen,RegisterScreen} from './screens/'

import './App.css'
function App() {
  return (
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path="/" element={<HomeScreen />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
