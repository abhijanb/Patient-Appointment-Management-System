import { useEffect } from 'react'
import { useDoctorManagement } from '../hooks/useDoctorManagement'
import DoctorCard from '../components/DoctorCard'
import DoctorFilters from '../components/DoctorFilters'
import DoctorPagination from '../components/DoctorPagination'
import DoctorFormModal from '../components/DoctorFormModal'

export default function DoctorManagementPage() {
  const {
    doctors,
    totalCount,
    isLoading,
    isSubmitting,
    search,
    setSearch,
    selectedBranch,
    setSelectedBranch,
    selectedSpecialization,
    setSelectedSpecialization,
    page,
    setPage,
    isModalOpen,
    isEditing,
    openAddModal,
    openEditModal,
    closeModal,
    register,
    handleSubmit,
    errors,
    fileInputRef,
    handleDelete,
  } = useDoctorManagement()

  const totalPages = Math.ceil(totalCount / 10)

  useEffect(() => {
    if (!isModalOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isModalOpen, closeModal])

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto w-full">
      <DoctorFilters
        search={search}
        onSearchChange={setSearch}
        selectedBranch={selectedBranch}
        onBranchChange={setSelectedBranch}
        selectedSpecialization={selectedSpecialization}
        onSpecializationChange={setSelectedSpecialization}
        onAdd={openAddModal}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <p className="col-span-full text-center text-gray-500 py-12">Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-12">No doctors found</p>
        ) : (
          doctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} onEdit={openEditModal} onDelete={handleDelete} />
          ))
        )}
      </section>

      <DoctorPagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />

      <DoctorFormModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        register={register}
        errors={errors}
        fileInputRef={fileInputRef}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
