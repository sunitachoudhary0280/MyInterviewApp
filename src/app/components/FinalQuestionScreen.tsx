import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FinalQuestionScreenProps {
  onNext: () => void
}

export default function FinalQuestionScreen({ onNext }: FinalQuestionScreenProps) {
  const [joinDate, setJoinDate] = useState('')
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)

  const handleSubmit = () => {
    if (!joinDate || isAvailable === null) return
    onNext()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-purple-600">Final Questions</h2>
      <div className="space-y-4">
        <p className="text-lg text-center">If selected, when can you join MyWays.ai?</p>
        <Input 
          type="date" 
          value={joinDate} 
          onChange={(e) => setJoinDate(e.target.value)}
          className="w-full text-center"
          placeholder="dd-mm-yyyy"
        />
      </div>
      <div className="space-y-4">
        <p className="text-lg text-center">Are you available for offline office work in Noida?</p>
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => setIsAvailable(true)}
            variant={isAvailable === true ? "default" : "outline"}
            className={isAvailable === true ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Yes
          </Button>
          <Button 
            onClick={() => setIsAvailable(false)}
            variant={isAvailable === false ? "default" : "outline"}
            className={isAvailable === false ? "bg-red-600 hover:bg-red-700" : ""}
          >
            No
          </Button>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <Button 
          onClick={handleSubmit}
          disabled={!joinDate || isAvailable === null}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8"
        >
          Submit and Finish Interview
        </Button>
      </div>
    </div>
  )
}

