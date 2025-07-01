import { useState } from "react"
import GalleryGrid from "@/components/gallery-grid"
import ChurchImageCard from "@/components/church-image-card"
import ImageModal from "@/components/image-modal"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Sample data for church service images
const churchImagesData = [
  {
    id: 1,
    title: "Sunday Worship Service",
    date: "May 12, 2024",
    category: "Worship",
    description: "Our congregation gathered for a joyful Sunday worship service with special music from the choir.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    title: "Children's Bible Study",
    date: "May 5, 2024",
    category: "Education",
    description: "Children engaged in interactive Bible study lessons with our dedicated teachers.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "Community Outreach",
    date: "April 28, 2024",
    category: "Outreach",
    description: "Church members participated in a community outreach program, providing meals to those in need.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 4,
    title: "Easter Celebration",
    date: "April 21, 2024",
    category: "Celebration",
    description: "Our Easter service celebration with special performances and activities for the children.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 5,
    title: "Youth Group Meeting",
    date: "April 14, 2024",
    category: "Youth",
    description: "Weekly youth group meeting with games, worship, and Bible discussion.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 6,
    title: "Choir Practice",
    date: "April 7, 2024",
    category: "Music",
    description: "Our dedicated choir members practicing for upcoming Sunday services.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 7,
    title: "Prayer Meeting",
    date: "March 31, 2024",
    category: "Prayer",
    description: "Community prayer meeting focusing on the needs of our church and community.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 8,
    title: "Baptism Service",
    date: "March 24, 2024",
    category: "Sacrament",
    description: "Special baptism service welcoming new members into our church family.",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function ChurchGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<(typeof churchImagesData)[0] | null>(null)

  // Filter images based on search term and category
  const filteredImages = churchImagesData.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || image.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter
  const categories = Array.from(new Set(churchImagesData.map((image) => image.category)))

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label htmlFor="search-images" className="text-sm font-medium text-gray-700">
            Search Images
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="search-images"
              placeholder="Search by title or description..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-64 space-y-2">
          <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
            Filter by Category
          </label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("")
            setCategoryFilter("all")
          }}
        >
          Reset Filters
        </Button>
      </div>

      {filteredImages.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No images found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      ) : (
        <GalleryGrid>
          {filteredImages.map((image) => (
            <ChurchImageCard key={image.id} image={image} onClick={() => setSelectedImage(image)} />
          ))}
        </GalleryGrid>
      )}

      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </div>
  )
}
