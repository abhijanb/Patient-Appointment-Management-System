import { User, Mail, Lock, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useRegister } from '../hooks/useRegister'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    toggleShowPassword,
    isLoading,
    APP_NAME,
  } = useRegister()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[440px] space-y-12">
          <div className="space-y-3">
            <h1 className="text-xl font-bold text-primary">{APP_NAME}</h1>
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl text-gray-900">
                Create your account
              </h2>
              <p className="text-base text-gray-500">
                Join the community of modern healthcare professionals and patients.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <div className="space-y-1 group">
                <label className="block text-xs font-semibold tracking-wider text-gray-500" htmlFor="fullName">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg text-base focus:ring-2 focus:ring-primary-container transition-all focus:outline-none ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'
                    }`}
                    id="fullName"
                    placeholder="John Doe"
                    type="text"
                    {...register('name')}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1 group">
                <label className="block text-xs font-semibold tracking-wider text-gray-500" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    className={`w-full pl-10 pr-4 py-3 bg-white border rounded-lg text-base focus:ring-2 focus:ring-primary-container transition-all focus:outline-none ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'
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

              <div className="space-y-1 group">
                <label className="block text-xs font-semibold tracking-wider text-gray-500" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    className={`w-full pl-10 pr-12 py-3 bg-white border rounded-lg text-base focus:ring-2 focus:ring-primary-container transition-all focus:outline-none ${
                      errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary'
                    }`}
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
                    type="button"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-1">Minimum 8 characters with at least one number.</p>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                className="mt-1 h-5 w-5 rounded border-gray-300 accent-[#0f4c81] cursor-pointer"
                id="terms"
                type="checkbox"
                {...register('terms')}
              />
              <label className="text-sm text-gray-500 select-none cursor-pointer" htmlFor="terms">
                I agree to the{' '}
                <Link className="text-primary hover:underline font-semibold" to="#">Terms of Service</Link> and{' '}
                <Link className="text-primary hover:underline font-semibold" to="#">Privacy Policy</Link>, including the
                processing of health-related data.
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs font-medium mt-1">{errors.terms.message}</p>
            )}

            <button
              className="w-full py-4 bg-primary text-white text-xs font-semibold tracking-wider rounded-lg shadow-md hover:bg-primary-container hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin" size={20} />
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="pt-6 border-t border-gray-300 text-center">
            <p className="text-base text-gray-500">
              Already have an account?{' '}
              <Link className="text-primary font-bold hover:underline" to="/login">Log in here</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
