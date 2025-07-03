import { format } from "date-fns";

const trainings = [
  {
    title: "JS Basics",
    description: "Learn JS",
    date: new Date(),
    location: "Room 1",
    trainerId: 3,
  },
  {
    title: "React Intro",
    description: "Learn React",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    location: "Room 2",
    trainerId: 3,
  },
  {
    title: "Node.js Workshop",
    description: "Learn Node.js basics",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    location: "Room 3",
    trainerId: 2,
  },
  {
    title: "TypeScript Essentials",
    description: "Master TypeScript for scalable JS",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    location: "Room 4",
    trainerId: 1,
  },
  {
    title: "Fullstack Crash Course",
    description: "Overview of frontend and backend integration",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    location: "Room 5",
    trainerId: 1,
  },
  {
    title: "Advanced Git",
    description: "Learn branching, rebasing, cherry-pick, etc.",
    date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    location: "Room 6",
    trainerId: 2,
  },
  {
    title: "Debugging JavaScript",
    description: "Techniques for finding and fixing bugs",
    date: new Date(),
    location: "Room 7",
    trainerId: 2,
  },
];

function TrainingCard() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
      {trainings.map((t, index) => {
        const month = format(t.date, "LLLL"); 
        const day = format(t.date, "d"); 
        const time = format(t.date, "HH:mm"); 

        return (
          <div
            key={index}
            className="border rounded-xl p-4 shadow-md bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out"
          >
            <div className="flex items-center gap-4">
              <div className="text-center w-20 shrink-0">
                <p className="text-lg font-semibold text-black-700">{month}</p>
                <p className="text-4xl font-bold text-gray-800">{day}</p>
                <p className="text-gray-500">{time}</p>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
                <p className="text-gray-600">{t.description}</p>
                <p className="text-gray-400 mt-1">Location: {t.location}</p>
                <button className="bg-[#0056d2] text-white mt-2 px-4 py-2 rounded hover:bg-[#0e71eb] text-sm">
                  Register
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TrainingCard;
