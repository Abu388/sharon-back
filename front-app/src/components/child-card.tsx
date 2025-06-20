"use client"

interface ChildCardProps {
  child: {
    id: number
    name: string
    age: number
    grade: string
    status: string
    image: string
  }
  onClick: () => void
}

export default function ChildCard({ child, onClick }: ChildCardProps) {
  // Function to determine status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sponsored":
        return "bg-green-100 text-green-800"
      case "Needs Sponsor":
        return "bg-red-100 text-red-800"
      case "Partially Sponsored":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-64">
        <img src={child.image || "/placeholder.svg"} alt={child.name} className="w-full h-full object-cover" />
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(child.status)}`}
        >
          {child.status}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{child.name}</h3>
        <div className="mt-1 text-gray-600">
          <p>Age: {child.age}</p>
          <p>Grade: {child.grade}</p>
        </div>
      </div>
    </div>
  )
}
