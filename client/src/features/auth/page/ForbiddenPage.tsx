import { ShieldAlert, HeartPulse, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { APP_NAME } from '../../../config'

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <HeartPulse className="text-white" size={22} />
          </div>
          <span className="text-xl font-bold text-primary">{APP_NAME}</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center space-y-8">
          <div className="relative mx-auto w-fit">
            <div className="w-40 h-40 mx-auto flex items-center justify-center bg-red-50 rounded-full border-4 border-red-100">
              <ShieldAlert className="text-red-400" size={64} />
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[56px] font-bold text-gray-200 select-none">
              403
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Access Denied
            </h1>
            <p className="text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
              You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
