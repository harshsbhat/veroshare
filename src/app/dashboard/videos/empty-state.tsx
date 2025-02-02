import { FileVideo2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onUpload: () => void
}

export function EmptyState({ onUpload }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <FileVideo2 className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No videos</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by uploading your first video.</p>
      <div className="mt-6">
        <Button onClick={onUpload}>
          <FileVideo2 className="mr-2 h-4 w-4" />
          Upload Video
        </Button>
      </div>
    </div>
  )
}
