'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface QuestionScreenProps {
  question: string;
  onStartRecording: () => void;
}

export default function QuestionScreen({ question, onStartRecording }: QuestionScreenProps) {
  const [isQuestionSpoken, setIsQuestionSpoken] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(question)
      utterance.onend = () => {
        setIsQuestionSpoken(true)
      }
      speechSynthesis.speak(utterance)
    } else {
      setError('Text-to-speech is not supported in this browser.')
      setIsQuestionSpoken(true)
    }
  }, [question])

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-customYellow dark:text-customYellow-light">Question</h2>
      <p className="text-lg text-customBlue-dark dark:text-customBlue-light">{question}</p>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {isQuestionSpoken && (
          <Button onClick={onStartRecording} className="button-gradient w-full">
            Start Recording Answer
          </Button>
        )}
      </div>
    </Card>
  )
}

