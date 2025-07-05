import { Link, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TrainingRegistration from './pages/TrainingRegistration';
import TrainingCreate from './pages/TrainingCreate';
import NotFound from './pages/NotFound';
import UserTrainingsPage from './pages/UserTrainingsPage';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="flex justify-center items-center py-10">
        <div className="space-x-4">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Trainings List
          </Link>
          <Link
            to="/create-training"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Create Training
          </Link>
        </div>
      </header>

      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="trainings/:id/registration"
            element={<TrainingRegistration />}
          />
          <Route path="/create-training" element={<TrainingCreate />} />
          <Route path="/users/:id/trainings" element={<UserTrainingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
