import { Button } from "@/components/ui/button"

export default function InstructionScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-purple-600">Welcome to the AI Interview</h1>
      <p className="text-lg text-center">Please read the following instructions carefully before proceeding.</p>
      <ul className="list-disc list-inside space-y-2">
        <li>Ensure you have a stable internet connection.</li>
        <li>Find a quiet place for the interview.</li>
        <li>Make sure your camera and microphone are working.</li>
        <li>Be prepared to share your screen during the interview.</li>
      </ul>
      <div className="flex justify-center">
        <Button onClick={onNext} className="bg-purple-600 hover:bg-purple-700 text-white">
          I'm Ready
        </Button>
      </div>
    </div>
  )
}

