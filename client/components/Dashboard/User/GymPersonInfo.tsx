import Image from "next/image";
import React from "react";

interface GymPersonInfoProps {
  name: string;
  age: number;
  expertise: string;
  experience: number; // in years
  goals: string;
  image: string; // URL of the person's image
  bio: string;
  certifications: string[];
  socialMedia: {
    platform: string;
    url: string;
  }[];
}

const GymPersonInfo: React.FC<GymPersonInfoProps> = ({
  name,
  age,
  expertise,
  experience,
  goals,
  image,
  bio,
  certifications,
  socialMedia,
}) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url('https://example.com/background-image.jpg')`,
      }} // replace with actual background image URL
    >
      <div className="max-w-3xl bg-white bg-opacity-90 shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gray-800 p-6">
          <h1 className="text-white text-4xl font-bold text-center">{name}</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center p-6">
          <Image
            className="w-48 h-48 rounded-full border-4 border-gray-200 shadow-lg"
            src={image}
            alt={`${name}'s profile`}
            width={300}
            height={400}
          />
          <div className="ml-0 md:ml-6 mt-4 md:mt-0">
            <p className="text-gray-700">
              <strong>Age:</strong> {age}
            </p>
            <p className="text-gray-700">
              <strong>Expertise:</strong> {expertise}
            </p>
            <p className="text-gray-700">
              <strong>Experience:</strong> {experience} years
            </p>
            <p className="text-gray-700">
              <strong>Goals:</strong> {goals}
            </p>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Bio</h2>
          <p className="text-gray-700 leading-relaxed">{bio}</p>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Certifications</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {certifications.map((certification, index) => (
              <li key={index} className="mb-1">
                {certification}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Connect with Me</h2>
          <ul className="list-none text-gray-700">
            {socialMedia.map((social, index) => (
              <li key={index} className="mb-1">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {social.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GymPersonInfo;
