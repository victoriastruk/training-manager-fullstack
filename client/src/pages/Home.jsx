import SelectFilter from '../components/SelectFilter';
import TrainingCard from '../components/TrainingCard';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Upcoming Trainings
      </h1>

      <div className="flex justify-center mb-6">
        <SelectFilter />
      </div>

      <TrainingCard />
    </div>
  );
}

export default Home;
