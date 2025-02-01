"use client"
import { Button } from "@/components/ui/button"
import { Rocket } from 'lucide-react' 
import { useToast } from "@/hooks/use-toast"


export default function Page() {
  const { toast } = useToast()
  return (
    <div>
      <div className="min-h-screen max-w-[690px] mx-auto pt-28 px-4">
        <h1 className="text-5xl font-serif mb-8">
          Open-source video hosting and tracking platform.
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-12">
          Host and track videos seamlessly. Share securely with full control. Your #1 open-source alternative to Wistia & Vimeo.
        </p>
        <Button className="rounded-xl"
              onClick={() => {
                toast({
                  title: "You really thought we had a waitlist? ",
                  description: "Keep coding NERD!",
                })
              }}
        >
          <Rocket /> 
          <span>Join waitlist</span>
        </Button>
      </div>
    </div>
  )
}
