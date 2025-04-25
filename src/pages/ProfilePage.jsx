import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { id } = useParams();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold">Tutor Profile #{id}</h2>
      <p className="mt-2">Hi! I'm a friendly student tutor. I can teach Math, Swim.</p>
      <p className="mt-2">Available: Weekdays after 4pm</p>
      <p className="mt-2">Rate: $10/hr</p>
      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Book a Spot</button>
    </div>
  );
}