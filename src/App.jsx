import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Scrolls from './pages/Scrolls'
import Editor from './pages/Editor'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/scrolls" element={<Scrolls />} />
          <Route path="/spells" element={<Scrolls />} />
          <Route path="/potions" element={<Scrolls />} />
          <Route path="/grimoire" element={<Scrolls />} />
          <Route path="/rituals" element={<Scrolls />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
