import { useState } from "react"
import GalleryGrid from "@/components/gallery-grid"
import GalleryImage from "@/components/gallery-image"
import ServiceModal from "@/components/service-modal"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Services data
const services = [
  {
    id: 1,
    title: "Kids (0-3 years old)",
    description: "Create and serve families and centers with appropriate resources for spiritual knowledge and wisdom.",
    image: "/assets/images/Gallery/services/photo_22_2025-05-20_03-51-29.jpg",
  },
  {
    id: 2,
    title: "Children (4-6 years old)",
    description: "Witness and reveal the power of Christ's resurrection in their communities.",
    image: "/assets/images/Gallery/services/photo_9_2025-05-20_03-51-29.jpg",
  },
  {
    id: 3,
    title: "Children (7-9 years old)",
    description: "Witness and reveal the power of Christ's resurrection in their communities.",
    image: "/assets/images/Gallery/services/photo_7_2025-05-20_03-51-29.jpg",
  },
  {
    id: 4,
    title: "Adolescents (13-16 years old)",
    description: "Emulate Timothy's life, denying worldly ambitions, and accepting responsibility.",
    image: "/assets/images/Gallery/services/photo_1_2025-05-20_03-51-29.jpg",
  },
  {
    id: 5,
    title: "Adolescents (17-19 years old)",
    description: "Emulate Timothy's life, denying worldly ambitions, and accepting responsibility.",
    image: "/assets/images/Gallery/services/photo_17_2025-05-20_03-51-29.jpg",
  },
  {
    id: 6,
    title: "Young Adults (20-22 years old)",
    description: "Live exemplary lifestyles and fulfill responsibilities in their communities.",
    image: "/assets/images/Gallery/services/photo_29_2025-05-20_03-51-29.jpg",
  },
  {
    id: 7,
    title: "Young Adults (23-26 years old)",
    description: "Live exemplary lifestyles and fulfill responsibilities in their communities.",
    image: "/assets/images/Gallery/ministries/photo_27_2025-05-20_03-51-29.jpg",
  },
]

export default function ServicesGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ageGroupFilter, setAgeGroupFilter] = useState("all")
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)

  // Get unique age groups for filter
  const ageGroups = [
    { value: "kids", label: "Kids (0-3)" },
    { value: "children", label: "Children (4-9)" },
    { value: "adolescents", label: "Adolescents (13-19)" },
    { value: "young-adults", label: "Young Adults (20-26)" },
  ]

  // Filter services based on search term and age group
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesAgeGroup = true
    if (ageGroupFilter !== "all") {
      if (ageGroupFilter === "kids" && !service.title.includes("Kids")) {
        matchesAgeGroup = false
      } else if (ageGroupFilter === "children" && !service.title.includes("Children")) {
        matchesAgeGroup = false
      } else if (ageGroupFilter === "adolescents" && !service.title.includes("Adolescents")) {
        matchesAgeGroup = false
      } else if (ageGroupFilter === "young-adults" && !service.title.includes("Young Adults")) {
        matchesAgeGroup = false
      }
    }

    return matchesSearch && matchesAgeGroup
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label htmlFor="search-services" className="text-sm font-medium text-gray-700">
            Search Services
          </label>  
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="search-services"
              placeholder="Search by service name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-64 space-y-2">
          <label htmlFor="age-group-filter" className="text-sm font-medium text-gray-700">
            Filter by Age Group
          </label>
          <Select value={ageGroupFilter} onValueChange={setAgeGroupFilter}>
            <SelectTrigger id="age-group-filter">
              <SelectValue placeholder="Filter by age group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Age Groups</SelectItem>
              {ageGroups.map((group) => (
                <SelectItem key={group.value} value={group.value}>
                  {group.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("")
            setAgeGroupFilter("all")
          }}
          className="md:w-auto w-full"
        >
          Reset
        </Button>
      </div>

      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No services found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      ) : (
        <GalleryGrid>
          {filteredServices.map((service) => (
            <GalleryImage
              key={service.id}
              image={service.image}
              title={service.title}
              onClick={() => setSelectedService(service)}
            />
          ))}
        </GalleryGrid>
      )}

      {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
    </div>
  )
}
