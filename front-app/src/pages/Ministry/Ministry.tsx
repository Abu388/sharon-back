import ServiceMinistryCard from "@/components/ServiceMinistryCard";
import { Ministry as M } from "@/models/Ministry";

const ministries: M[] = [
  {
    title: "Christian Parents and Guardians",
    description:
      "Practice God’s way of life and disciple their children at home or in institutions.",
  },
  {
    title: "Family (Christian Parenting Ministry)",
    description:
      "Practice God’s way of life and disciple their children at home or in institutions.",
  },
  {
    title: "Prayer (Generation-Oriented National Prayer Movement)",
    description:
      "Practice God’s way of life and disciple their children at home or in institutions.",
  },
  {
    title: "Education and Training",
    description:
      "Practice God’s way of life and disciple their children at home or in institutions.",
  },
  {
    title: "Media/Promotion and Capacity-Building Service",
    description:
      "Practice God’s way of life and disciple their children at home or in institutions.",
  },
  {
    title: "Organize and lead volunteers to support the ministry.",
    description:
      "Practice God’s way of life and disciple their children at home or in institutions.",
  },
  {
    title: "Implement a model church program.",
    description:
      "Practice God’s way of life and disciple their children at home or in institutions.",
  },
  {
    title: "Faith in Action Charity Service",
    description:
      "Practice God’s way of life and disciple their children at home or in institutions.",
  },
  {
    title: "Event Organization and Church Model Service",
    description:
      "Practice God’s way of life and disciple their children at home or in institutions.",
  },
  {
    title: "Sharonite Creative Works Club",
    description:
      "Practice God’s way of life and disciple their children at home or in institutions.",
  },
  {
    title:
      "Josiah Children’s Discipleship and Timothy Youth Ministry Model Fellowships",
    description:
      "Practice God’s way of life and disciple their children at home or in institutions.",
  },
];

const Ministry = () => {
  return (
    <div className="mb-30 min-h-screen pt-35 font-[poppins]">
      <div className="mx-auto max-w-3xl px-4">
        <header className="mb-10 text-left">
          <h2 className="text-3xl font-bold text-gray-800">Our Ministries</h2>
        </header>

        {/* Render all services in a consistent, user-friendly way */}
        {ministries.map((ministry, idx) => (
          <ServiceMinistryCard data={ministry} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Ministry;
