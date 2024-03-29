import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Starting from './pages/starting/Starting.tsx';
import Home from './pages/home/Home.tsx';
import MainLayout from './layout/MainLayout.tsx';
import Calendar from './pages/calendar/Calendar.tsx';
import History from './pages/history/History.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Starting />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
