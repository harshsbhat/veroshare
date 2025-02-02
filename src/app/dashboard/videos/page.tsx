import { VideoDashboard } from "./video-list"

interface Video {
    id: string;
    title: string;
    thumbnail: string; 
  }

export default function DashboardPage() {
  const videos: Video[] = []

  return <VideoDashboard videos={videos} />
}
