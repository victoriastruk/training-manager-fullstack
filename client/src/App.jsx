import { Link, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TrainingRegistration from './pages/TrainingRegistration';
import TrainingCreate from './pages/TrainingCreate';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="p-4">
      <nav className="space-x-4">
        <Link to="/">Trainings</Link>
        <Link to="/create-training">Add trining</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="trainings/:id/registration"
          element={<TrainingRegistration />}
        />
        <Route path="/create-training" element={<TrainingCreate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
