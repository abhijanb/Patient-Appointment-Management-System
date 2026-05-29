import { useState } from 'react'
import { Star, MessageSquareText, CheckCircle, X } from 'lucide-react'
import { useRateAppointmentMutation } from '../patientApi'

const descriptors = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

interface RatingModalProps {
  appointmentId: number
  doctorName: string
  onClose: () => void
  onSuccess: () => void
}

export default function RatingModal({ appointmentId, doctorName, onClose, onSuccess }: RatingModalProps) {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [rateAppointment, { isLoading }] = useRateAppointmentMutation()

  const handleSubmit = async () => {
    if (rating === 0) return
    try {
      await rateAppointment({ appointmentId, rating }).unwrap()
      setSubmitted(true)
      setTimeout(onSuccess, 2000)
    } catch {
      // error handled by UI
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
        <div className="bg-white w-full max-w-[400px] rounded-xl border border-gray-200 overflow-hidden text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={36} className="text-green-700" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-sm text-gray-500">Your feedback has been recorded.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white w-full max-w-[480px] rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 text-center border-b border-gray-200 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={20} />
          </button>
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
            <MessageSquareText size={36} className="text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-primary">How was your visit?</h2>
          <p className="text-gray-500 text-sm mt-2">
            Your feedback helps {doctorName} provide better care to all patients.
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Rate your experience
            </span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="transition-all cursor-pointer"
                >
                  <Star
                    size={36}
                    className={`transition-all ${
                      star <= rating
                        ? 'fill-secondary text-secondary'
                        : 'text-gray-300 hover:text-secondary'
                    } ${star === rating && rating > 0 ? 'scale-110' : ''}`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm text-secondary h-5 font-semibold">
              {rating > 0 ? descriptors[rating - 1] : 'Select a rating'}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500" htmlFor="feedbackText">
              Share more details (Optional)
            </label>
            <textarea
              id="feedbackText"
              className="w-full rounded-lg border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary bg-gray-50 text-sm p-3 transition-all placeholder:text-gray-400"
              placeholder="Tell us about the consultation, wait times, or quality of care..."
              rows={3}
            />
          </div>
        </div>

        <div className="p-6 flex flex-col sm:flex-row gap-3 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-primary text-base hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
          >
            Skip for now
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || isLoading}
            className="flex-1 px-4 py-3 bg-primary text-white text-base font-semibold rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </div>
    </div>
  )
}
