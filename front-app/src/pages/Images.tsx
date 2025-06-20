import { useState } from "react";
import GalleryHeader from "@/components/gallery-header";
import MinistryGallery from "@/components/ministry-gallery";
import ServicesGallery from "@/components/services-gallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Images() {
  const [activeTab, setActiveTab] = useState("ministry");

  return (
    <div className="mb-40 min-h-screen font-[poppins]">
      <GalleryHeader />

      <div className="container mx-auto px-4 py-8">
        <Tabs
          defaultValue={activeTab}
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="mb-8 flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="ministry">Ministry</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="ministry">
            <MinistryGallery />
          </TabsContent>

          <TabsContent value="services">
            <ServicesGallery />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
