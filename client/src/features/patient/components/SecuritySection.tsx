import { Eye, EyeOff, KeyRound, LoaderCircle } from 'lucide-react'

interface Props {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  showCurrentPwd: boolean
  showNewPwd: boolean
  showConfirmPwd: boolean
  changingPassword: boolean
  onChangeCurrentPassword: (v: string) => void
  onChangeNewPassword: (v: string) => void
  onChangeConfirmPassword: (v: string) => void
  onToggleShowCurrentPwd: () => void
  onToggleShowNewPwd: () => void
  onToggleShowConfirmPwd: () => void
  onChangePassword: () => void
}

export default function SecuritySection({
  currentPassword, newPassword, confirmPassword,
  showCurrentPwd, showNewPwd, showConfirmPwd,
  changingPassword,
  onChangeCurrentPassword, onChangeNewPassword, onChangeConfirmPassword,
  onToggleShowCurrentPwd, onToggleShowNewPwd, onToggleShowConfirmPwd,
  onChangePassword,
}: Props) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Security</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-3">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1 relative">
              <input
                className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary py-2.5 px-4 text-sm pr-10"
                placeholder="Current Password"
                type={showCurrentPwd ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => onChangeCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={onToggleShowCurrentPwd}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showCurrentPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex flex-col gap-1 relative">
              <input
                className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary py-2.5 px-4 text-sm pr-10"
                placeholder="New Password"
                type={showNewPwd ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => onChangeNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={onToggleShowNewPwd}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showNewPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex flex-col gap-1 relative">
              <input
                className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary py-2.5 px-4 text-sm pr-10"
                placeholder="Confirm New Password"
                type={showConfirmPwd ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => onChangeConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={onToggleShowConfirmPwd}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showConfirmPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button
            onClick={onChangePassword}
            disabled={!currentPassword || !newPassword || !confirmPassword || changingPassword}
            className="mt-4 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
          >
            {changingPassword ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <KeyRound size={16} />
            )}
            {changingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>
    </section>
  )
}
