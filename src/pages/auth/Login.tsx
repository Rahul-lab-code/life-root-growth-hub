
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Hero section */}
      <div className="md:w-1/2 bg-gradient-to-br from-liferoot-green to-liferoot-blue-dark p-8 flex items-center justify-center">
        <div className="max-w-md text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Nurturing change-makers from the inside out
          </h1>
          <p className="text-lg opacity-90 mb-6">
            LifeRoot helps students grow in sustainability, emotional intelligence,
            and ethical values through real-world missions and AI mentorship.
          </p>
          <div className="flex gap-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg flex-1">
              <h3 className="font-medium mb-1">🟩 Environmental Sustainability</h3>
              <p className="text-sm opacity-80">Take on eco-missions and make a real impact</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg flex-1">
              <h3 className="font-medium mb-1">🟦 Emotional Intelligence</h3>
              <p className="text-sm opacity-80">Develop self-awareness and emotional resilience</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg flex-1">
              <h3 className="font-medium mb-1">🟨 Ethical Values</h3>
              <p className="text-sm opacity-80">Build character through value-driven actions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login form section */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
