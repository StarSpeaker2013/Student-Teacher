import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/cardContent";

const locations = [
  { name: "Irvine" },
  { name: "Tustin" },
  { name: "Norman" },
];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [location, setLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalLocation = location === "custom" ? customLocation : location;
    console.log("Submitting form with location:", finalLocation);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <Card className="w-full max-w-md p-6 shadow-xl">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? "Login" : "Register"} to NearbyNinja
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <Input placeholder="Username" type="text" required />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input placeholder="Email" type="email" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Input placeholder="Password" type="password" required />
            </div>
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <Input placeholder="YYYY-MM-DD" type="date" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  >
                    <option value="">Select a location</option>
                    {locations.map((loc) => (
                      <option key={loc.name} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                    <option value="custom">Other (type manually)</option>
                  </select>
                  {location === "custom" && (
                    <input
                      type="text"
                      placeholder="Enter your location"
                      className="w-full border border-gray-300 rounded px-3 py-2 mt-2"
                      onChange={(e) => setCustomLocation(e.target.value)}
                      required
                    />
                  )}
                </div>
              </>
            )}
            <Button className="w-full mt-2">
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="text-blue-500 ml-2 hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
