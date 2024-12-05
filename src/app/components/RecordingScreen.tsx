import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

interface RecordingScreenProps {
  question: string
  onComplete: () => void
}

export default function RecordingScreen({ question, onComplete }: RecordingScreenProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      setIsRecording(false)
    }
  }, [isRecording])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        console.log('Recording completed:', blob)
      }

      mediaRecorder.start()
      setIsRecording(true)
      
      setTimeLeft(60)
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording()
            setShowConfirmDialog(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      console.error('Error starting recording:', err)
    }
  }, [stopRecording])

  const handleSubmit = useCallback(() => {
    stopRecording()
    onComplete()
  }, [stopRecording, onComplete])

  const handleConfirmNext = useCallback(() => {
    setShowConfirmDialog(false)
    onComplete()
  }, [onComplete])

  // Start recording when component mounts
  useEffect(() => {
    startRecording()
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [startRecording])

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-center text-purple-600">Answer Recording</h2>
      <p className="text-lg text-center">{question}</p>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full aspect-video bg-black rounded-lg"
      />
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">{timeLeft}s</div>
        <Button
          onClick={handleSubmit}
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          Submit Answer
        </Button>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Time&apos;s Up!</DialogTitle>
            <DialogDescription>
              Your recording time has ended. Would you like to submit this answer and move to the next question?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Review Answer
            </Button>
            <Button onClick={handleConfirmNext}>
              Submit and Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

