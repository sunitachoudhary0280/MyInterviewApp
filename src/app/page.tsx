'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import InstructionScreen from './components/InstructionScreen'
import CheckPermissionScreen from './components/CheckPermissionScreen'
import QuestionScreen from './components/QuestionScreen'
import RecordingScreen from './components/RecordingScreen'
import CompletionScreen from './components/CompletionScreen'
import FinalQuestionScreen from './components/FinalQuestionScreen'

const INTERVIEW_QUESTIONS = [
  "Tell me about yourself and why you are interested in this role.",
  "What inspired you to pursue frontend developer as a career?",
  "What is your greatest strength as a developer, and what is one area you are currently working to improve?",
  "When faced with a challenging task, how do you approach solving it?",
  "How do you prioritize your tasks when working on multiple assignments or tight deadlines?",
  "What's a recent skill or concept you learned on your own, and how did you go about learning it?",
  "Describe a time when you worked in a team. How did you handle disagreements or conflicting ideas?",
  "Where do you see yourself in 5 years, and how does this role fit into your career goals?"
]

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('instructions')
  const [permissions, setPermissions] = useState({ audio: false, video: false, screen: false })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)

  const nextScreen = () => {
    switch (currentScreen) {
      case 'instructions':
        setCurrentScreen('checkPermissions')
        break
      case 'checkPermissions':
        setCurrentScreen('interview')
        break
      case 'interview':
        if (currentQuestionIndex < INTERVIEW_QUESTIONS.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setIsRecording(false)
        } else {
          setCurrentScreen('finalQuestion')
        }
        break
      case 'finalQuestion':
        setCurrentScreen('completion')
        break
      default:
        setCurrentScreen('instructions')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Card className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
        {currentScreen === 'instructions' && <InstructionScreen onNext={nextScreen} />}
        {currentScreen === 'checkPermissions' && (
          <CheckPermissionScreen onNext={nextScreen} setPermissions={setPermissions} />
        )}
        {currentScreen === 'interview' && (
          <>
            {!isRecording ? (
              <QuestionScreen
                question={INTERVIEW_QUESTIONS[currentQuestionIndex]}
                onStartRecording={() => setIsRecording(true)}
              />
            ) : (
              <RecordingScreen
                question={INTERVIEW_QUESTIONS[currentQuestionIndex]}
                onComplete={() => {
                  setIsRecording(false)
                  nextScreen()
                }}
              />
            )}
          </>
        )}
        {currentScreen === 'finalQuestion' && (
          <FinalQuestionScreen onNext={nextScreen} />
        )}
        {currentScreen === 'completion' && <CompletionScreen />}
      </Card>
    </main>
  )
}

