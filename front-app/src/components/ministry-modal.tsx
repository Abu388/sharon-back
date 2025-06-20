"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MinistryModalProps {
  ministry: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
  onClose: () => void;
}

export default function MinistryModal({
  ministry,
  onClose,
}: MinistryModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="font-[poppins] sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">
            {ministry.title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <img
              src={ministry.image || "/placeholder.svg"}
              alt={ministry.title}
              className="h-auto w-full rounded-md"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                About this Ministry
              </h3>
              <p className="mt-2 text-gray-600">{ministry.description}</p>
            </div>
            <div className="pt-4">
              <button
                className="rounded-md bg-(--blue)/80 px-4 py-2 text-white transition-colors hover:bg-(--blue)"
                onClick={onClose}
              >
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
