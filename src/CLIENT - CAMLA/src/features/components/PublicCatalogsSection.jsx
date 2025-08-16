import React, { useEffect, useState } from "react"
import { Spinner, Card, Button } from "flowbite-react"
import { HiTemplate, HiEye } from "react-icons/hi"
import { getPublicCatalogs } from "../../services/CatalogService"
import { useNavigate } from "react-router-dom"

const PublicCatalogsSection = () => {
  const [publicCatalogs, setPublicCatalogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        setIsLoading(true)
        const catalogs = await getPublicCatalogs()
        setPublicCatalogs(catalogs || [])
      } catch {
        setError("Error al cargar los catálogos públicos")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCatalogs()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spinner size="xl" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>
  }

  if (publicCatalogs.length === 0) {
    return (
      <div className="text-center py-8">
        <HiTemplate className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">No hay catálogos públicos disponibles</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Catálogos Públicos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {publicCatalogs.map((catalog) => (
          <Card key={catalog.id} className="bg-gradient-to-r from-purple-900 to-blue-900 hover:from-purple-800 hover:to-blue-800">
            <div className="bg-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center overflow-hidden">
              <img
                src={'/preview.png'}
                alt={`Preview de ${catalog.nombre}`}
                className="max-h-full max-w-full object-contain rounded"
              />
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-white truncate" title={catalog.nombre}>
                  {catalog.nombre}
                </h3>
                <p className="text-sm text-gray-100 line-clamp-2 mt-1">
                  {catalog.descripcion || "Catálogo público disponible"}
                </p>
              </div>
              <Button
                onClick={() => navigate(`/catalog/${catalog.id}`)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="sm"
              >
                <HiEye className="mr-2 h-4 w-4" />
                Ver Catálogo
              </Button>
              <div className="text-xs text-gray-200">
                <div>{catalog.status ? "Público" : "Privado"}</div>
                {catalog.fechaCreacion && <div>Creado: {new Date(catalog.fechaCreacion).toLocaleDateString()}</div>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PublicCatalogsSection
