"use client";
import Image from "next/image";
import image from "./image.png";

export default function Home() {
  const features = [
    { title: "Real-Time Collaboration", description: "Collaborate with ease." },
    { title: "Automation Tools", description: "Automate repetitive tasks." },
    {
      title: "Customer Management",
      description: "Manage clients efficiently.",
    },
    { title: "Performance Tracking", description: "Monitor team performance." },
  ];

  return (
    <section>
      <div className="flex justify-between items-center px-10 py-20 bg-slate-300">
        <div className="max-w-md space-y-4">
          <h1 className="text-5xl font-bold text-dark">
            Optimize <br /> Your Corporate Workflow <br /> with Automation
            System
          </h1>
          <p className="text-gray-600">
            Empowering teams to automate tasks and streamline workflows, saving
            time and reducing errors
          </p>
          -
          <div className="space-x-4">
            <button className="px-6 py-3 bg-primary text-white rounded-lg">
              Get Started
            </button>
            <button className="px-6 py-3 border border-primary rounded-lg">
              Try for Free
            </button>
          </div>
        </div>
        <Image src={image} alt="Person Illustration" width={400} height={400} />
      </div>
      <div className="grid grid-cols-2 gap-10 px-10 py-20 bg-slate-300">
        {features.map((feature, index) => (
          <div key={index} className="p-8 bg-secondary rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-dark mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
