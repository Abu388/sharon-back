import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageModalProps {
  image: {
    id: number;
    title: string;
    date: string;
    category: string;
    description: string;
    image: string;
  };
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="font-[poppins] sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{image.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-md">
            <img
              src={image.image || "/placeholder.svg"}
              alt={image.title}
              className="h-auto w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{image.date}</span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                {image.category}
              </span>
            </div>
            <p className="text-gray-700">{image.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
