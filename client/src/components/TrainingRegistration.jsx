import TrainingForm from "./UserForm";
import { format } from "date-fns";

const trainings = {
  title: "JS Basics",
  description: "Learn JS",
  date: new Date(),
  location: "Room 1",
  trainerId: 3,
};

function TrainingRegistration() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="p-8 bg-gray-50">
          <h1 className="text-3xl font-bold mb-4">
            Register for this training
          </h1>

          <p className="text-gray-700 mb-4">
            Topic: <strong>{trainings.title}</strong>
          </p>
          <p className="text-gray-700 mb-4">
            Description: <strong>{trainings.description}</strong>
          </p>
          <p className="text-gray-700 mb-4">
            When: <strong>Thursday, July 25, 2025 · 3:00 PM EEST</strong>
          </p>
          <p className="text-gray-700">
            Location: <strong>{trainings.location}</strong>
          </p>
        </div>

        <div className="p-8">
          <TrainingForm />
        </div>
      </div>
    </div>
  );
}

export default TrainingRegistration;
