import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ChildModalProps {
  child: {
    id: number
    name: string
    age: number
    grade: string
    status: string
    bio: string
    image: string
  }
  onClose: () => void
}

export default function ChildModal({ child, onClose }: ChildModalProps) {
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{child.name}</DialogTitle>
          <DialogDescription>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(child.status)}`}>
              {child.status}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img src={child.image || "/placeholder.svg"} alt={child.name} className="w-full h-auto rounded-md" />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">About {child.name}</h3>
              <p className="mt-2 text-gray-600">{child.bio}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Age</h4>
                <p className="text-gray-900">{child.age} years old</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Grade</h4>
                <p className="text-gray-900">{child.grade}</p>
              </div>
            </div>
            {child.status === "Needs Sponsor" || child.status === "Partially Sponsored" ? (
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Sponsor {child.name}</Button>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
