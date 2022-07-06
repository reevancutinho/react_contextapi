import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Student from './Student';
import Teacher from './Teacher';

function App() {
  return (
    <Router>
    <Navbar/>
    <Routes>
      <Route path='/Student' element={<Student/>}/>
      <Route path="/Teacher" element={<Teacher/>}/>
    </Routes>
  </Router>
  );
}

export default App;
