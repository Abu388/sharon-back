import { useState } from "react"
import BookGalleryHeader from "@/components/book-gallery-header"
import BookGrid from "@/components/book-grid"
import BookFilters from "@/components/book-filters"
import { bookData } from "@/lib/book-data"

export default function Books() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  // Filter books based on search term, category, and age group
  const filteredBooks = bookData.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory
    const matchesAgeGroup = selectedAgeGroup === "all" || book.ageGroup === selectedAgeGroup
    return matchesSearch && matchesCategory && matchesAgeGroup
  })

  // Sort books based on selected sort option
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "priceAsc") {
      return a.price - b.price
    } else if (sortBy === "priceDesc") {
      return b.price - a.price
    } else if (sortBy === "newest") {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    } else {
      // Default: featured or bestseller
      return b.featured - a.featured
    }
  })

  return (
    <div className="min-h-screen pt-17 mb-40">
      <BookGalleryHeader />

      <div className="container mx-auto px-4 py-8">
        <BookFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedAgeGroup={selectedAgeGroup}
          setSelectedAgeGroup={setSelectedAgeGroup}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No books found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        ) : (
          <BookGrid books={sortedBooks} />
        )}
      </div>
    </div>
  )
}
