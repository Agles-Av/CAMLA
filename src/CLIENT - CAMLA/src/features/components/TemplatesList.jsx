"use client"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Card, Spinner, Button } from "flowbite-react"
import { HiTemplate, HiPlus } from "react-icons/hi"
import  AuthConAtext  from "../../context/AuthContext"
import { createCatalog } from "../../services/CatalogService"
import { AlertHelper } from "../../utilities/AlertHelper"

const TemplatesList = ({ templates, isLoading, onRefresh }) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthConAtext)

  // Crear catálogo desde plantilla
  const handleUseTemplate = async (template) => {
    try {
      const catalogData = {
        nombre: `${template.nombre} - Copia`,
        usuario: user,
        status: false,
        contenidoJson:
          template.contenidoJson ||
          JSON.stringify({
            pages: [
              {
                id: Date.now(),
                elements: [],
                background: { type: "color", value: "#ffffff" },
              },
            ],
          }),
      }

      const response = await createCatalog(catalogData)

      AlertHelper.showAlert("Catálogo creado desde plantilla","success")
      onRefresh()

      // Redirigir al editor
      navigate(`/editor/${response.id}`)
    } catch (error) {
      AlertHelper.showAlert("Error al crear catálogo desde plantilla","error")
      console.error("Create from template error:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spinner size="xl" />
      </div>
    )
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-8">
        <HiTemplate className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">No hay plantillas disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {templates.map((template) => (
        <Card key={template.id} className="bg-gradient-to-r from-purple-900 to-blue-900 hover:from-purple-800 hover:to-blue-800">
          {/* Preview de la plantilla */}
          <div className="bg-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={'/preview.png'}
              alt={`Preview de ${template.nombre}`}
              className="max-h-full max-w-full object-contain rounded"
            />
          </div>

          {/* Información de la plantilla */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-white truncate" title={template.nombre}>
                {template.nombre}
              </h3>
              <p className="text-sm text-gray-100 line-clamp-2 mt-1">
                {template.descripcion || "Plantilla prediseñada para crear catálogos profesionales"}
              </p>
            </div>

            {/* Botón usar plantilla */}
            <Button
              onClick={() => handleUseTemplate(template)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              size="sm"
            >
              <HiPlus className="mr-2 h-4 w-4" />
              Usar Plantilla
            </Button> 

            {/* Información adicional */}
            <div className="text-xs text-gray-200">
              <div>Categoría: {template.categoria?.nombre || "General"}</div>
              {template.fechaCreacion && <div>Creada: {new Date(template.fechaCreacion).toLocaleDateString()}</div>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default TemplatesList
