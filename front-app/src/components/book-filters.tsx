import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

interface BookFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedAgeGroup: string
  setSelectedAgeGroup: (ageGroup: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
}

export default function BookFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedAgeGroup,
  setSelectedAgeGroup,
  sortBy,
  setSortBy,
}: BookFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "picture-books", label: "Picture Books" },
    { value: "chapter-books", label: "Chapter Books" },
    { value: "educational", label: "Educational" },
    { value: "bible-stories", label: "Bible Stories" },
    { value: "activity-books", label: "Activity Books" },
    { value: "parenting", label: "Parenting" },
  ]

  const ageGroups = [
    { value: "all", label: "All Ages" },
    { value: "0-3", label: "0-3 years" },
    { value: "4-6", label: "4-6 years" },
    { value: "7-9", label: "7-9 years" },
    { value: "10-12", label: "10-12 years" },
    { value: "13+", label: "13+ years" },
    { value: "parents", label: "For Parents" },
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
  ]

  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedAgeGroup("all")
    setSortBy("featured")
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search books by title or author..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="md:hidden flex-1" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? "block" : "hidden md:grid"}`}>
        <div>
          <label htmlFor="category-filter" className="text-sm font-medium text-gray-700 block mb-1">
            Category
          </label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="age-group-filter" className="text-sm font-medium text-gray-700 block mb-1">
            Age Group
          </label>
          <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
            <SelectTrigger id="age-group-filter">
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              {ageGroups.map((ageGroup) => (
                <SelectItem key={ageGroup.value} value={ageGroup.value}>
                  {ageGroup.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button variant="outline" onClick={resetFilters} className="w-full">
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
