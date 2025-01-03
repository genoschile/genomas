"use client";

import CardMembers from "./CardMembers";

const teamMembers = [
  {
    name: "Dra. Karen Oróstica",
    title: "Phd Bioinformatics",
    image: "https://via.placeholder.com/80",
  },
  {
    name: "Dr. Karen Oróstica ",
    title: "Clinical Physician",
    image: "https://via.placeholder.com/80",
  },
  {
    name: "Dr.Karen Oróstica",
    title: "AI Researcher",
    image: "https://via.placeholder.com/80",
  },
  {
    name: "Dr. Karen Oróstica",
    title: "Genomics Expert",
    image: "https://via.placeholder.com/80",
  },
];

const TeamSection = () => {
  return (
    <section className="container mx-auto px-4 py-8 text-center flex flex-col gap-4">
      {/* Título */}
      <h2 className="text-4xl font-bold text-gray-800 leading-tight">
        Meet the Team Behind GENOMAS
      </h2>

      {/* Descripción */}
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Our interdisciplinary team of bioinformaticians, clinical physicians,
        engineers, and researchers brings diverse expertise and insights.
        Together, we deliver innovative solutions informed by experience and
        tailored to address complex challenges in healthcare and genomics.
      </p>

      {/* Grid de cartas */}
      <div className="w-full max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
          {teamMembers.map((member, index) => (
            <CardMembers
              key={index}
              name={member.name}
              title={member.title}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
