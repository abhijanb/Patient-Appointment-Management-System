import { Component, type ReactNode, type ErrorInfo } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="text-center space-y-6 max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
              <AlertTriangle className="text-red-600" size={32} />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
              <p className="text-gray-500 text-base">
                An unexpected error occurred. Please try refreshing the page.
              </p>
            </div>
            {this.state.error && (
              <p className="text-sm text-gray-400 font-mono bg-gray-100 rounded-lg p-3 text-left break-all">
                {this.state.error.message}
              </p>
            )}
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-all cursor-pointer"
            >
              <RotateCcw size={18} />
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
