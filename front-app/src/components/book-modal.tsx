"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Book } from "@/lib/book-data"
import { ShoppingCart, Heart } from "lucide-react"
import { useState } from "react"

interface BookModalProps {
  book: Book
  onClose: () => void
}

export default function BookModal({ book, onClose }: BookModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [addedToWishlist, setAddedToWishlist] = useState(false)

  const handleAddToCart = () => {
    // Here you would typically add the book to a cart state or make an API call
    console.log(`Added ${quantity} of ${book.title} to cart`)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleAddToWishlist = () => {
    // Here you would typically add the book to a wishlist state or make an API call
    console.log(`Added ${book.title} to wishlist`)
    setAddedToWishlist(true)
    setTimeout(() => setAddedToWishlist(false), 2000)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{book.title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <div className="relative w-full max-w-[300px]">
              <img
                src={book.coverImage || "/placeholder.svg?height=600&width=400"}
                alt={`${book.title} cover`}
                className="w-full h-auto rounded-md shadow-md"
              />
              {book.isNew && <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">New</Badge>}
              {book.isBestseller && (
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Bestseller</Badge>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">About this Book</h3>
              <p className="mt-2 text-gray-600">{book.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Author</h4>
                <p className="text-gray-900">{book.author}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Age Group</h4>
                <p className="text-gray-900">{book.ageGroup}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Category</h4>
                <p className="text-gray-900">{book.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Pages</h4>
                <p className="text-gray-900">{book.pages}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-blue-600">${book.price.toFixed(2)}</span>
                <span className={book.inStock ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {book.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {book.inStock && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                      Quantity:
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={handleAddToCart}
                      disabled={addedToCart}
                    >
                      {addedToCart ? (
                        "Added to Cart!"
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleAddToWishlist} disabled={addedToWishlist}>
                      {addedToWishlist ? (
                        "Added to Wishlist!"
                      ) : (
                        <>
                          <Heart className="mr-2 h-4 w-4" /> Wishlist
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
