interface ServiceCardProps {
  service: {
    id: number
    title: string
    image: string
  }
  onClick: () => void
}

export default function ServiceCard({ service, onClick }: ServiceCardProps) {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={service.image || "/placeholder.svg?height=400&width=400"}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">{service.title}</h3>
      </div>
    </div>
  )
}
