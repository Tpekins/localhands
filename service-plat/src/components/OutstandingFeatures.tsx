// src/components/OutstandingFeatures.tsx
import React from "react";
import section3 from "../assets/section3.png";
import { FaCheckCircle } from "react-icons/fa";

interface Feature {
  title: string;
  description: string;
}

const featuresData: Feature[] = [
  {
    title: "Job Challenge",
    description:
      "Put your skills to the test and compete in exciting job challenges for a chance to win prizes or recognition.",
  },
  {
    title: "Jobs",
    description:
      "Discover a wide range of job opportunities, from freelance projects to full-time positions.",
  },
  {
    title: "Account Levels",
    description:
      "Select the account level that best suits your needs, whether as an individual or business.",
  },
];

const OutstandingFeatures: React.FC = () => {
  return (
    <section className="py-12 bg-[#e2e9e5]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-8">
          Discover Our Outstanding Features
        </h2>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Feature List */}
          <div className="space-y-8">
            {featuresData.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-4 max-w-lg">
                <FaCheckCircle className="text-3xl text-[#2dc36c]" />
                <div className="bg-white p-4 rounded-lg shadow-md w-full">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Images/Photo Collage */}
          <div className="flex justify-center md:justify-end relative">
            <div className="h-auto">
              {/* Replace with real images or placeholders */}
              <img src={section3} alt="Feature1" className="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutstandingFeatures;
