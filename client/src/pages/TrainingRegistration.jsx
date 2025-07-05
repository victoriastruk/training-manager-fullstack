import TrainingInfo from "../components/TrainingInfo";
import UserForm from "../components/forms/UserForm";

function TrainingRegistration() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="p-8 bg-gray-50">
          <TrainingInfo />
        </div>

        <div className="p-8">
          <UserForm />
        </div>
      </div>
    </div>
  );
}

export default TrainingRegistration;
