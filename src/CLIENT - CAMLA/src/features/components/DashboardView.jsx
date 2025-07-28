"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import  AuthConAtext  from "../../context/AuthContext"
import Navbar from './NavBar'
import Sidebar from "./Sidebar"
import CatalogCards from "./CatalogCards"
import TemplatesList from "./TemplatesList"
import { getCatalogsByUser } from "../../services/CatalogService"
import { getTemplates } from "../../services/PlantillaService"
import { AlertHelper } from "../../utilities/AlertHelper"

const DashboardView = () => {
  const navigate = useNavigate()
  const { user, token } = useContext(AuthConAtext)

  const [catalogs, setCatalogs] = useState([])
  const [templates, setTemplates] = useState([])    
  const [isLoadingCatalogs, setIsLoadingCatalogs] = useState(true)
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Verificar autenticación
  useEffect(() => {
    if (!user || !token) {
      navigate("/login")
      return
    }
  }, [user, token, navigate])

  // Cargar catálogos del usuario
  useEffect(() => {
    const loadUserCatalogs = async () => {
      if (!user?.id) return

      try {
        setIsLoadingCatalogs(true)
        const response = await getCatalogsByUser(user.id)
        setCatalogs(response || [])
      } catch (error) {
        AlertHelper.error("Error al cargar tus catálogos")
        console.error("Error loading catalogs:", error)
      } finally {
        setIsLoadingCatalogs(false)
      }
    }

    loadUserCatalogs()
  }, [user?.id, refreshTrigger])

  // Cargar plantillas
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setIsLoadingTemplates(true)
        const response = await getTemplates()
        setTemplates(response || [])
      } catch (error) {
        AlertHelper.error("Error al cargar plantillas")
        console.error("Error loading templates:", error)
      } finally {
        setIsLoadingTemplates(false)
      }
    }

    loadTemplates()
  }, [])

  // Función para refrescar catálogos
  const handleRefreshCatalogs = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  // Navegar al editor
  const handleEditCatalog = (catalogId) => {
    navigate(`/editor/${catalogId}`)
  }

  if (!user || !token) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Navbar superior */}
      <Navbar />

      <div className="flex">
        {/* Sidebar izquierdo - Banco de imágenes */}
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 h-screen sticky top-16">
          <Sidebar />
        </div>

        {/* Panel principal derecho */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Mensaje de bienvenida */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {user?.name?.charAt(0) || user?.username?.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ¡Bienvenido, {user?.name || user?.username}! 👋
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Gestiona tus catálogos, explora imágenes y crea contenido increíble con CAMLA.
                  </p>
                </div>
              </div>
            </div>

            {/* Sección de catálogos */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Tus Catálogos</h2>
                    <p className="text-gray-600 mt-1">Crea, edita y gestiona tus catálogos de productos</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {catalogs.length} catálogo{catalogs.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <CatalogCards
                  catalogs={catalogs}
                  isLoading={isLoadingCatalogs}
                  onEdit={handleEditCatalog}
                  onRefresh={handleRefreshCatalogs}
                />
              </div>
            </div>

            {/* Sección de plantillas */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Plantillas Disponibles</h2>
                    <p className="text-gray-600 mt-1">Comienza rápido con nuestras plantillas prediseñadas</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {templates.length} plantilla{templates.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <TemplatesList templates={templates} isLoading={isLoadingTemplates} onRefresh={handleRefreshCatalogs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardView
