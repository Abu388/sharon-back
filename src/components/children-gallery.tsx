import { useState } from "react"
import GalleryGrid from "@/components/gallery-grid"
import ChildCard from "@/components/child-card"
import ChildModal from "@/components/child-modal"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Sample data for children
const childrenData = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 8,
    grade: "3rd Grade",
    status: "Sponsored",
    bio: "Sarah loves drawing and wants to be an artist when she grows up. She enjoys school and is particularly good at math.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 10,
    grade: "5th Grade",
    status: "Needs Sponsor",
    bio: "Michael is passionate about soccer and plays whenever he gets the chance. He's working hard to improve his reading skills.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "Amara Okafor",
    age: 7,
    grade: "2nd Grade",
    status: "Sponsored",
    bio: "Amara enjoys singing in the children's choir and helping her teachers. She dreams of becoming a doctor someday.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    name: "David Hernandez",
    age: 12,
    grade: "7th Grade",
    status: "Partially Sponsored",
    bio: "David excels in science and is curious about how things work. He hopes to study engineering and build things that help people.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 5,
    name: "Lily Nguyen",
    age: 6,
    grade: "1st Grade",
    status: "Needs Sponsor",
    bio: "Lily is new to our program and is adjusting well. She loves stories and is learning to read with enthusiasm.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 6,
    name: "James Wilson",
    age: 9,
    grade: "4th Grade",
    status: "Sponsored",
    bio: "James is a talented musician who plays the piano. He's also very helpful with younger children in the program.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 7,
    name: "Sofia Garcia",
    age: 11,
    grade: "6th Grade",
    status: "Needs Sponsor",
    bio: "Sofia is passionate about environmental issues and organizes clean-up activities. She's a natural leader among her peers.",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 8,
    name: "Ethan Kim",
    age: 8,
    grade: "3rd Grade",
    status: "Partially Sponsored",
    bio: "Ethan loves building with blocks and Legos. He's very creative and enjoys sharing his creations with others.",
    image: "/placeholder.svg?height=400&width=300",
  },
]

export default function ChildrenGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedChild, setSelectedChild] = useState<(typeof childrenData)[0] | null>(null)

  // Filter children based on search term and status
  const filteredChildren = childrenData.filter((child) => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || child.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <label htmlFor="search" className="text-sm font-medium text-gray-700">
            Search by Name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search children..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-64 space-y-2">
          <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
            Filter by Status
          </label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Children</SelectItem>
              <SelectItem value="Sponsored">Sponsored</SelectItem>
              <SelectItem value="Needs Sponsor">Needs Sponsor</SelectItem>
              <SelectItem value="Partially Sponsored">Partially Sponsored</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("")
            setStatusFilter("all")
          }}
        >
          Reset Filters
        </Button>
      </div>

      {filteredChildren.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No children found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      ) : (
        <GalleryGrid>
          {filteredChildren.map((child) => (
            <ChildCard key={child.id} child={child} onClick={() => setSelectedChild(child)} />
          ))}
        </GalleryGrid>
      )}

      {selectedChild && <ChildModal child={selectedChild} onClose={() => setSelectedChild(null)} />}
    </div>
  )
}
