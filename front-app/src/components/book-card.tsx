import type { Book } from "@/lib/book-data"
import { Badge } from "@/components/ui/badge"

interface BookCardProps {
  book: Book
  onClick: () => void
}

export default function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative pt-[140%]">
        {/* Book cover with aspect ratio preserved */}
        <img
          src={book.coverImage || "/placeholder.svg?height=600&width=400"}
          alt={`${book.title} cover`}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* New badge if applicable */}
        {book.isNew && <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">New</Badge>}

        {/* Bestseller badge if applicable */}
        {book.isBestseller && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Bestseller</Badge>}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-600">${book.price.toFixed(2)}</span>
          {book.inStock ? (
            <span className="text-xs text-green-600 font-medium">In Stock</span>
          ) : (
            <span className="text-xs text-red-600 font-medium">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  )
}
