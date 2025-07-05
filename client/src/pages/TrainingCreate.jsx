import TrainingFormCreate from '../components/forms/TrainingFormCreate';

function TrainingCreate() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Create Training</h1>
      <TrainingFormCreate />
    </div>
  );
}

export default TrainingCreate;
