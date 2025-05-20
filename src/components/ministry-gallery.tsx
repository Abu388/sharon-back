import { useState } from "react";
import GalleryGrid from "@/components/gallery-grid";
import GalleryImage from "@/components/gallery-image";
import MinistryModal from "@/components/ministry-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Ministry data
const ministries = [
  {
    id: 1,
    title: "Christian Parents and Guardians",
    description:
      "Practice God's way of life and disciple their children at home or in institutions.",
    image: "/assets/images/Hero/photo_3_2025-05-17_04-29-23.jpg",
  },
  {
    id: 2,
    title: "Family (Christian Parenting Ministry)",
    description:
      "Practice God's way of life and disciple their children at home or in institutions.",
    image: "/assets/images/Gallery/ministries/photo_14_2025-05-20_03-51-29.jpg",
  },
  {
    id: 3,
    title: "Prayer (Generation-Oriented National Prayer Movement)",
    description:
      "Practice God's way of life and disciple their children at home or in institutions.",
    image: "/assets/images/Gallery/ministries/photo_19_2025-05-20_03-51-29.jpg",
  },
  {
    id: 4,
    title: "Education and Training",
    description:
      "Practice God's way of life and disciple their children at home or in institutions.",
    image: "/assets/images/Gallery/ministries/photo_13_2025-05-20_03-51-29.jpg",
  },
  {
    id: 5,
    title: "Media/Promotion and Capacity-Building Service",
    description:
      "Practice God's way of life and disciple their children at home or in institutions.",
    image: "/assets/images/Hero/photo_3_2025-05-17_04-29-23.jpg",
  },
  {
    id: 6,
    title: "Organize and lead volunteers to support the ministry.",
    description:
      "Practice God's way of life and disciple their children at home or in institutions.",
    image: "/assets/images/Gallery/ministries/photo_19_2025-05-20_03-51-29.jpg",
  },
  {
    id: 7,
    title: "Implement a model church program.",
    description:
      "Practice God's way of life and disciple their children at home or in institutions.",
    image: "/assets/images/Gallery/ministries/photo_19_2025-05-20_03-51-29.jpg",
  },
  {
    id: 8,
    title: "Faith in Action Charity Service",
    description:
      "Practice God's way of life and disciple their children at home or in institutions.",
    image: "/assets/images/Hero/photo_3_2025-05-17_04-29-23.jpg",
  },
  {
    id: 9,
    title: "Event Organization and Church Model Service",
    description:
      "Practice God's way of life and disciple their children at home or in institutions.",
    image: "/assets/images/Hero/photo_3_2025-05-17_04-29-23.jpg",
  },
  {
    id: 10,
    title: "Sharonite Creative Works Club",
    description:
      "Practice God's way of life and disciple their children at home or in institutions.",
    image: "/assets/images/Gallery/ministries/photo_27_2025-05-20_03-51-29.jpg",
  },
  {
    id: 11,
    title:
      "Josiah Children's Discipleship and Timothy Youth Ministry Model Fellowships",
    description:
      "Practice God's way of life and disciple their children at home or in institutions.",
    image: "/assets/images/Gallery/ministries/photo_15_2025-05-20_03-51-29.jpg",
  },
];

export default function MinistryGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState<
    (typeof ministries)[0] | null
  >(null);

  // Filter ministries based on search term
  const filteredMinistries = ministries.filter((ministry) => {
    return ministry.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-end gap-4 md:flex-row">
        <div className="flex-1 space-y-2">
          <label
            htmlFor="search-ministry"
            className="text-sm font-medium text-gray-700"
          >
            Search Ministries
          </label>
          <div className="relative">
            <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
            <Input
              id="search-ministry"
              placeholder="Search by ministry name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setSearchTerm("")}
          className="w-full md:w-auto"
        >
          Reset
        </Button>
      </div>

      {filteredMinistries.length === 0 ? (
        <div className="py-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            No ministries found
          </h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search to find what you're looking for.
          </p>
        </div>
      ) : (
        <GalleryGrid>
          {filteredMinistries.map((ministry) => (
            <GalleryImage
              key={ministry.id}
              image={ministry.image}
              title={ministry.title}
              onClick={() => setSelectedMinistry(ministry)}
            />
          ))}
        </GalleryGrid>
      )}

      {selectedMinistry && (
        <MinistryModal
          ministry={selectedMinistry}
          onClose={() => setSelectedMinistry(null)}
        />
      )}
    </div>
  );
}
