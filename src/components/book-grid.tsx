"use client"

import { useState } from "react"
import BookCard from "@/components/book-card"
import BookModal from "@/components/book-modal"
import type { Book } from "@/lib/book-data"

interface BookGridProps {
  books: Book[]
}

export default function BookGrid({ books }: BookGridProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} />
        ))}
      </div>

      {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </div>
  )
}
