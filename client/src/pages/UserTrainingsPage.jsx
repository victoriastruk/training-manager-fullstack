import UserTrainingsList from '../components/UserTrainingsList';

function UserTrainingsPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Trainings</h1>
        <UserTrainingsList />
      </div>
    </div>
  );
}

export default UserTrainingsPage;
