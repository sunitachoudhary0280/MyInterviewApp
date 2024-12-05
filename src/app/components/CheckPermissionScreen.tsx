import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function CheckPermissionScreen({ onNext, setPermissions }: { onNext: () => void, setPermissions: (permissions: any) => void }) {
  const [audioPermission, setAudioPermission] = useState(false)
  const [videoPermission, setVideoPermission] = useState(false)
  const [screenPermission, setScreenPermission] = useState(false)
  const [screenError, setScreenError] = useState("")

  const checkAudioVideoPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      setAudioPermission(true)
      setVideoPermission(true)
    } catch (err) {
      console.error("Error accessing media devices.", err)
    }
  }

  const checkScreenPermission = async () => {
    if (!(navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
      console.error("Screen sharing not supported");
      setScreenError("Screen sharing is not supported in this browser or context.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately after getting permission
      setScreenPermission(true);
      setScreenError("");
    } catch (err) {
      console.error("Error accessing screen sharing.", err);
      if (err.name === "NotAllowedError") {
        setScreenError("Screen sharing permission was denied. Please try again.");
      } else if (err.name === "NotReadableError") {
        setScreenError("Unable to access your screen. Please check your display settings and try again.");
      } else {
        setScreenError("An error occurred while trying to access screen sharing. Please ensure you're using a supported browser and try again.");
      }
    }
  }

  const handleNext = () => {
    if (audioPermission && videoPermission && (screenPermission || screenError)) {
      setPermissions({ audio: audioPermission, video: videoPermission, screen: screenPermission });
      onNext();
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-pink-600">Check Permissions</h2>
      <div className="space-y-4">
        <Button onClick={checkAudioVideoPermission} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
          Check Audio & Video
        </Button>
        <Button onClick={checkScreenPermission} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
          Check Screen Sharing
        </Button>
        {screenError && (
          <p className="text-red-500 text-sm">{screenError}</p>
        )}
      </div>
      <div className="flex justify-center">
        <Button 
          onClick={handleNext} 
          disabled={!audioPermission || !videoPermission || (!screenPermission && !screenError)} 
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

