import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {AuthLayout,MainLayout} from './components/layout/'
import HomeScreen from './screens/HomeScreen'
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<h1>Login</h1>}/>
          <Route path="/register" element={<h1>Register</h1>}/>
        </Route>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<HomeScreen/>}/>
        </Route>

      </Routes>

    </Router>
  )
}

export default App
