import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function AnswerRecordingScreen({ onNext, question }: { onNext: () => void, question: string }) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        mediaRecorderRef.current = new MediaRecorder(stream)

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks((prev) => [...prev, event.data])
          }
        }
      })
  }, [])

  const startRecording = () => {
    setRecordedChunks([])
    mediaRecorderRef.current?.start()
    setIsRecording(true)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  const handleSubmit = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' })
    // Here you would typically send the blob to your server
    console.log('Submitting video blob:', blob)
    onNext()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-purple-600">Answer Recording</h2>
      <p className="text-lg text-center">{question}</p>
      <video ref={videoRef} autoPlay muted className="w-full h-64 bg-black" />
      <div className="flex justify-center space-x-4">
        {!isRecording ? (
          <Button onClick={startRecording} className="bg-green-600 hover:bg-green-700 text-white">
            Start Recording
          </Button>
        ) : (
          <Button onClick={stopRecording} className="bg-red-600 hover:bg-red-700 text-white">
            Stop Recording
          </Button>
        )}
        <Button onClick={handleSubmit} disabled={recordedChunks.length === 0} className="bg-purple-600 hover:bg-purple-700 text-white">
          Submit Answer
        </Button>
      </div>
    </div>
  )
}

