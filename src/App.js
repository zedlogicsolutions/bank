import './style/nav.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './compontans/Home';
import Counters from './compontans/Counters';
import Report from './compontans/Report';
import Staff from './compontans/Staff';

const App = () => {
  return (
    <>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/counters">Counters</Link>
        <Link to="/report">Report</Link>
        <Link to="/staff">Staff</Link>
        <Link to="/category">Category</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counters" element={<Counters />} />
        <Route path="/report" element={<Report />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </>
  );
};

export default App;
