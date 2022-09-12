import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Shows from './pages/Shows'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/tv-shows' element={<Shows />} />
          <Route path='/' element={<Navigate replace to='/home' />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
