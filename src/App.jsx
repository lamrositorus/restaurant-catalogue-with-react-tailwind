import {Route, Routes} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home, LearnMore ,Favorite, About, Detail } from './components/pages';
import swRegister from './sw-register';
import { useEffect } from 'react';
import './App.css'

function App() {

  useEffect(() => {
    swRegister();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Favorite" element={<Favorite />} />
        <Route path="/About" element={<About />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Learnmore/" element={<LearnMore />} />
      </Routes>
    </>
  )
}

export default App
