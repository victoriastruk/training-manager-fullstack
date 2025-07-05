import TrainingCard from '../components/TrainingCard';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Upcoming Trainings
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Explore and register for hands-on workshops to boost your skills.
      </p>
      <TrainingCard />
    </div>
  );
}

export default Home;
