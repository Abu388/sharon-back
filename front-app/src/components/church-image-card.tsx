"use client"

interface ChurchImageCardProps {
  image: {
    id: number
    title: string
    date: string
    category: string
    image: string
  }
  onClick: () => void
}

export default function ChurchImageCard({ image, onClick }: ChurchImageCardProps) {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image.image || "/placeholder.svg"}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {image.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{image.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{image.date}</p>
      </div>
    </div>
  )
}
