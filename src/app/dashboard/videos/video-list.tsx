"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { EmptyState } from "./empty-state"

interface Video {
  id: string;
  title: string;
  thumbnail: string; 
}

interface VideoDashboardProps {
  videos: Video[]
}

export function VideoDashboard({ videos }: VideoDashboardProps) {
  const handleUpload = () => {
    console.log("Upload button clicked")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Videos</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input type="search" placeholder="Search videos..." className="flex-grow" />
        <Button onClick={handleUpload}>
          <Upload className="mr-2 h-4 w-4" /> Upload Video
        </Button>
      </div>

      {videos.length === 0 ? (
        <div className="bg-white shadow rounded-lg">
          <EmptyState onUpload={handleUpload} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-white shadow rounded-lg overflow-hidden">
              <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
