import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Claim from './pages/Claim';
import Success from './pages/Success';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/claim/:session_id" element={<Claim />} />
        <Route path="/claim/:session_id/success" element={<Success />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
