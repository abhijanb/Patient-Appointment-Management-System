import { Mail, Lock, Eye, EyeOff, HeartPulse, ArrowRight, LoaderCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    toggleShowPassword,
    isLoading,
    authChecked,
    APP_NAME,
  } = useLogin()

  if (!authChecked) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-gray-50">
        <LoaderCircle className="animate-spin text-primary" size={32} />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-gray-50">
      <section className="flex flex-col items-center justify-center p-6 md:p-20">
        <div className="w-full max-w-[420px]">
          <div className="mb-12 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                <HeartPulse className="text-white" size={22} />
              </div>
              <span className="text-xl font-bold text-primary">{APP_NAME}</span>
            </div>
            <h2 className="text-3xl text-gray-900 mb-1">Welcome Back</h2>
            <p className="text-base text-gray-500">Please enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group">
              <label
                className={`block text-xs font-semibold tracking-wider transition-all duration-300 ease-out ${
                  errors.email ? 'text-red-500' : 'text-gray-500 group-focus-within:text-primary'
                }`}
                htmlFor="email"
              >
                Email Address
              </label>
              <div className={`relative rounded-lg transition-all duration-300 ease-out ${
                errors.email ? 'focus-within:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : 'focus-within:shadow-[0_0_0_4px_rgba(15,76,129,0.1)]'
              }`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={errors.email ? 'text-red-400' : 'text-gray-400'} size={20} />
                </div>
                <input
                  className={`block w-full pl-10 pr-6 py-3 bg-gray-100 border rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-300 ease-out ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-primary'
                  }`}
                  id="email"
                  placeholder="name@clinic.com"
                  type="email"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center">
                <label
                  className={`block text-xs font-semibold tracking-wider transition-all duration-300 ease-out ${
                    errors.passwordHash ? 'text-red-500' : 'text-gray-500 group-focus-within:text-primary'
                  }`}
                  htmlFor="passwordHash"
                >
                  Password
                </label>
                <a className="text-xs font-semibold tracking-wider text-secondary hover:text-primary-container transition-all duration-300 ease-out" href="#">
                  Forgot password?
                </a>
              </div>
              <div className={`relative rounded-lg transition-all duration-300 ease-out ${
                errors.passwordHash ? 'focus-within:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : 'focus-within:shadow-[0_0_0_4px_rgba(15,76,129,0.1)]'
              }`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={errors.passwordHash ? 'text-red-400' : 'text-gray-400'} size={20} />
                </div>
                <input
                  className={`block w-full pl-10 pr-12 py-3 bg-gray-100 border rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all duration-300 ease-out ${
                    errors.passwordHash 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:border-primary'
                  }`}
                  id="passwordHash"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  {...register('passwordHash')}
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 transition-all duration-300 ease-out cursor-pointer"
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.passwordHash && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.passwordHash.message}</p>
              )}
            </div>

            <button
              className="w-full flex justify-center items-center gap-2 py-3.5 bg-primary text-white text-xs font-semibold tracking-wider rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin" size={18} />
                  Authenticating...
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-gray-300 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link className="text-secondary font-semibold tracking-wider hover:underline decoration-2 underline-offset-4" to="/register">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
