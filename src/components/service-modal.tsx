import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ServiceModalProps {
  service: {
    id: number
    title: string
    description: string
    image: string
  }
  onClose: () => void
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl font-[poppins]">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">{service.title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img src={service.image || "/placeholder.svg"} alt={service.title} className="w-full h-auto rounded-md" />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">About this Service</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
            <div className="pt-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                onClick={onClose}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
