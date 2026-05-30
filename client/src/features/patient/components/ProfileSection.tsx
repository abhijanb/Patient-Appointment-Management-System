import { LoaderCircle } from 'lucide-react'

interface Props {
  name: string
  email: string
  isProfileDirty: boolean
  updatingProfile: boolean
  onChangeName: (v: string) => void
  onChangeEmail: (v: string) => void
  onSave: () => void
}

export default function ProfileSection({
  name, email, isProfileDirty, updatingProfile,
  onChangeName, onChangeEmail, onSave,
}: Props) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile</h2>

      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="full-name" className="text-xs font-semibold text-gray-500 px-1">Full Name</label>
          <input
            id="full-name"
            className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary py-2 px-4 text-base"
            type="text"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email-address" className="text-xs font-semibold text-gray-500 px-1">Email Address</label>
          <input
            id="email-address"
            className="rounded-lg border-gray-200 focus:border-primary focus:ring-primary py-2 px-4 text-base"
            type="email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onSave}
          disabled={!isProfileDirty || updatingProfile}
          className="bg-primary text-white py-2 px-10 rounded-lg font-semibold hover:opacity-90 transition-opacity active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
        >
          {updatingProfile && <LoaderCircle size={16} className="animate-spin" />}
          Save Changes
        </button>
      </div>
    </section>
  )
}
