import ServiceMinistryCard from "@/components/ServiceMinistryCard";
import Service from "@/models/Service";

const services: Service[] = [
  {
    title: "Kids (0-3 years old)",
    description:
      "Create and serve families and centers with appropriate resources for spiritual knowledge and wisdom.",
  },
  {
    title: "Children (4-6 years old)",
    description:
      "Witness and reveal the power of Christ’s resurrection in their communities.",
  },
  {
    title: "Children (7-9 years old)",
    description:
      "Witness and reveal the power of Christ’s resurrection in their communities.",
  },
  {
    title: "Adolescents (13-16 years old)",
    description:
      "Emulate Timothy’s life, denying worldly ambitions, and accepting responsibility.",
  },
  {
    title: "Adolescents (17-19 years old)",
    description:
      "Emulate Timothy’s life, denying worldly ambitions, and accepting responsibility.",
  },
  {
    title: "Young Adults (20-22 years old)",
    description:
      "Live exemplary lifestyles and fulfill responsibilities in their communities.",
  },
  {
    title: "Young Adults (23-26 years old)",
    description:
      "Live exemplary lifestyles and fulfill responsibilities in their communities.",
  },
];

const Ministry = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-35 pb-45 font-[poppins]">
      <div className="mx-auto max-w-3xl px-4">
        <header className="mb-10 text-start">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
        </header>

        {/* Render all services in a consistent, user-friendly way */}
        {services.map((service, idx) => (
          <ServiceMinistryCard data={service} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Ministry;
