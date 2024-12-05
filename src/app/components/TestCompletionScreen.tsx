import { Button } from "@/components/ui/button"

export default function TestCompletionScreen() {
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-3xl font-bold text-purple-600">Interview Completed!</h2>
      <p className="text-lg">Thank you for participating in our AI interview process.</p>
      <p className="text-lg">We appreciate your time and responses.</p>
      <p className="text-lg">Our team will review your interview and get back to you soon.</p>
      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
        Thank You
      </Button>
    </div>
  )
}

