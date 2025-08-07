'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Tour, CreateTourData } from '@/types/tour'
import { UpdateSocialSettingsData } from '@/types/social-settings'
import AdminTourCard from '@/components/AdminTourCard'
import TourForm from '@/components/TourForm'
import SocialSettingsForm from '@/components/SocialSettingsForm'

export default function AdminPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTour, setEditingTour] = useState<Tour | null>(null)
  const [activeTab, setActiveTab] = useState<'tours' | 'settings'>('tours')

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTours(data || [])
    } catch (error) {
      console.error('Error fetching tours:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateTour = async (tourData: CreateTourData) => {
    try {
      const { error } = await supabase
        .from('tours')
        .insert([tourData])

      if (error) throw error
      
      await fetchTours()
      setShowForm(false)
    } catch (error) {
      console.error('Error creating tour:', error)
      alert('Ошибка при создании тура')
    }
  }

  const handleUpdateTour = async (tourData: CreateTourData) => {
    if (!editingTour) return

    try {
      const { error } = await supabase
        .from('tours')
        .update(tourData)
        .eq('id', editingTour.id)

      if (error) throw error
      
      await fetchTours()
      setEditingTour(null)
      setShowForm(false)
    } catch (error) {
      console.error('Error updating tour:', error)
      alert('Ошибка при обновлении тура')
    }
  }

  const handleDeleteTour = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот тур?')) return

    try {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      await fetchTours()
    } catch (error) {
      console.error('Error deleting tour:', error)
      alert('Ошибка при удалении тура')
    }
  }

  const handleEditTour = (tour: Tour) => {
    setEditingTour(tour)
    setShowForm(true)
  }

  const handleCancelEdit = () => {
    setEditingTour(null)
    setShowForm(false)
  }

  const handleSaveSocialSettings = async (data: UpdateSocialSettingsData) => {
    const response = await fetch('/api/social-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to save settings')
    }

    return response.json()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mountain-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-main py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Административная панель</h1>
          <div className="flex space-x-4">
            <a
              href="/"
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              На главную
            </a>
            {activeTab === 'tours' && (
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Добавить тур
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('tours')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tours'
                    ? 'border-mountain-blue text-mountain-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Управление турами
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-mountain-blue text-mountain-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Настройки контактов
              </button>
            </nav>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <TourForm
                tour={editingTour}
                onSubmit={editingTour ? handleUpdateTour : handleCreateTour}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'tours' && (
          <>
            {tours.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">Туры не найдены</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary"
                >
                  Создать первый тур
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                  <AdminTourCard
                    key={tour.id}
                    tour={tour}
                    onEdit={handleEditTour}
                    onDelete={handleDeleteTour}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'settings' && (
          <SocialSettingsForm onSave={handleSaveSocialSettings} />
        )}
      </div>
    </div>
  )
}