import { ChevronRight } from 'lucide-react'
import { useSettingsLogic } from '../hooks/useSettingsLogic'
import SettingsSidebar from '../components/SettingsSidebar'
import ProfileSection from '../components/ProfileSection'
import SecuritySection from '../components/SecuritySection'

export default function SettingsPage() {
  const {
    name, setName,
    email, setEmail,
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    showCurrentPwd, setShowCurrentPwd,
    showNewPwd, setShowNewPwd,
    showConfirmPwd, setShowConfirmPwd,
    activeSection, setActiveSection,
    isProfileDirty,
    updatingProfile,
    changingPassword,
    handleSaveProfile,
    handleChangePassword,
  } = useSettingsLogic()

  return (
    <div className="p-6 lg:p-12 max-w-[1200px] w-full mx-auto space-y-6 lg:space-y-12">
      <nav className="flex items-center text-gray-500 text-xs font-semibold gap-1">
        <a className="hover:text-primary transition-colors" href="#">Home</a>
        <ChevronRight size={16} />
        <span className="text-primary font-semibold">Settings</span>
      </nav>

      <h1 className="text-4xl lg:text-5xl font-bold text-primary">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        <SettingsSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        <div className="lg:col-span-9 flex flex-col gap-6">
          {activeSection === 'profile' && (
            <ProfileSection
              name={name} email={email}
              isProfileDirty={isProfileDirty}
              updatingProfile={updatingProfile}
              onChangeName={setName}
              onChangeEmail={setEmail}
              onSave={handleSaveProfile}
            />
          )}

          {activeSection === 'security' && (
            <SecuritySection
              currentPassword={currentPassword}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              showCurrentPwd={showCurrentPwd}
              showNewPwd={showNewPwd}
              showConfirmPwd={showConfirmPwd}
              changingPassword={changingPassword}
              onChangeCurrentPassword={setCurrentPassword}
              onChangeNewPassword={setNewPassword}
              onChangeConfirmPassword={setConfirmPassword}
              onToggleShowCurrentPwd={() => setShowCurrentPwd((p) => !p)}
              onToggleShowNewPwd={() => setShowNewPwd((p) => !p)}
              onToggleShowConfirmPwd={() => setShowConfirmPwd((p) => !p)}
              onChangePassword={handleChangePassword}
            />
          )}
        </div>
      </div>
    </div>
  )
}
