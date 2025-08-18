import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Spinner, Button } from "flowbite-react"
import Navbar from "./NavBar"
import Sidebar from "./Sidebar"
import { getCatalogById, createCatalog } from "../../services/CatalogService"
import { AlertHelper } from "../../utilities/AlertHelper"

const CatalogView = () => {
  const { catalogId } = useParams()
  const navigate = useNavigate()
  const [catalog, setCatalog] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUsing, setIsUsing] = useState(false)
  const PAGE_WIDTH = 1202;   // ancho fijo
  const PAGE_HEIGHT = 474;  // alto fijo


  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setIsLoading(true)
        const response = await getCatalogById(catalogId)
        setCatalog(response.data)
      } catch (error) {
        AlertHelper.showAlert("Error al cargar el catálogo", "error")
        navigate("/dashboard")
      } finally {
        setIsLoading(false)
      }
    }
    if (catalogId) fetchCatalog()
  }, [catalogId, navigate])

  const handleUseAsTemplate = async () => {
    if (!catalog) return
    try {
      setIsUsing(true)
      const catalogData = {
        nombre: `${catalog.nombre} - Copia`,
        usuario: catalog.usuario,
        status: false,
        contenidoJson: catalog.contenidoJson,
        descripcion: catalog.descripcion,
        categoria: catalog.categoria,
      }
      const response = await createCatalog(catalogData)
      AlertHelper.showAlert("Catálogo copiado como plantilla", "success")
      navigate(`/editor/${response.id}`)
    } catch (error) {
      AlertHelper.showAlert("Error al usar como plantilla", "error")
    } finally {
      setIsUsing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Spinner size="xl" />
      </div>
    )
  }

  if (!catalog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Catálogo no encontrado</p>
        <Button onClick={() => navigate(-1)} className="mt-4">Regresar</Button>
      </div>
    )
  }

  // Parsear páginas
  let pages = []
  try {
    const parsed = JSON.parse(catalog.contenidoJson || '{"pages":[]}')
    console.log("Plantilla", parsed);

    pages = parsed.pages || []
  } catch {
    pages = []
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
      <div className="flex flex-1">
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">{catalog.nombre}</h1>
              <div className="flex space-x-2">
                <Button color="gray" onClick={() => navigate(-1)}>
                  Regresar
                </Button>
                {/**
                 * <Button color="purple" onClick={handleUseAsTemplate} disabled={isUsing}>
                  {isUsing ? "Creando..." : "Usar este catálogo como plantilla"}
                </Button>
                 */}
              </div>
            </div>
            <div className="mb-4 text-gray-600">{catalog.descripcion}</div>
            {/* Visualización de páginas */}
            <div className="space-y-8">
              {pages.length === 0 ? (
                <div className="text-center text-gray-400">No hay páginas en este catálogo</div>
              ) : (
                pages.map((page, idx) => (
                  <div key={page.id || idx} className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Página {idx + 1}</h2>
                    <div
                      className="canvas-catalogo mx-auto"
                      style={{
                        width: PAGE_WIDTH,
                        height: PAGE_HEIGHT,
                        background: page.background?.type === "color" ? page.background.value : "#fff",
                        backgroundImage: page.background?.type === "image" ? `url(${page.background.value})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: "0 0 8px 0 rgba(0,0,0,0.08)",
                        position: "relative",
                      }}
                    >
                      {/* Renderizar elementos visualmente, solo modo visualización */}
                      {page.elements.map((el) => {
                        if (el.type === "image") {
                          return (
                            <img
                              key={el.id}
                              src={el.data.url || "/preview.png"}
                              alt={el.data.nombre}
                              style={{
                                position: "absolute",
                                left: el.position.x,
                                top: el.position.y,
                                width: el.size.width,
                                height: el.size.height,
                                objectFit: "cover",
                                borderRadius: 8,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                              }}
                            />
                          )
                        }
                        if (el.type === "text") {
                          return (
                            <div
                              key={el.id}
                              style={{
                                position: "absolute",
                                left: el.position.x,
                                top: el.position.y,
                                width: el.size.width,
                                height: el.size.height,
                                fontSize: el.data.fontSize,
                                fontFamily: el.data.fontFamily,
                                color: el.data.color,
                                fontWeight: el.data.fontWeight,
                                textAlign: el.data.textAlign,
                                fontStyle: el.data.fontStyle,
                                textDecoration: el.data.textDecoration,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 8,
                                overflow: "hidden",
                                background: "rgba(255,255,255,0.0)",
                              }}
                            >
                              {el.data.text}
                            </div>
                          )
                        }
                        if (el.type === "card") {
                          return (
                            <div
                              key={el.id}
                              style={{
                                position: "absolute",
                                left: el.position.x,
                                top: el.position.y,
                                width: el.size.width,
                                height: el.size.height,
                                background: el.data.backgroundColor || "#fff",  // ahora usamos backgroundColor
                                borderRadius: el.data.borderRadius || 12,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                                border: `${el.data.borderWidth || 1}px solid ${el.data.borderColor || "#eee"}`, // usamos borderColor
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 16,
                                overflow: "hidden",
                                boxSizing: "border-box",
                              }}
                            >
                              {el.data.imageData && (
                                <img
                                  src={el.data.imageData.url}
                                  alt={el.data.title || "Imagen"}
                                  style={{
                                    width: "100%",
                                    maxHeight: 180,
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                              <div
                                style={{
                                  fontWeight: el.data.titleFontWeight || "bold",
                                  fontSize: el.data.titleFontSize || 18,
                                  color: el.data.titleColor || "#1F2937",
                                  marginBottom: 8,
                                }}
                              >
                                {el.data.title || "Card"}
                              </div>
                              <div
                                style={{
                                  color: el.data.descriptionColor || "#555",
                                  fontSize: el.data.descriptionFontSize || 14,
                                  textAlign: el.data.descriptionAlign || "center",
                                }}
                              >
                                {el.data.description || "Contenido de la tarjeta"}
                              </div>
                            </div>
                          )
                        }

                        if (el.type === "shape") {
                          const width = typeof el.size.width === "string" ? parseFloat(el.size.width) : el.size.width
                          const height = typeof el.size.height === "string" ? parseFloat(el.size.height) : el.size.height
                          const left = typeof el.position.x === "string" ? parseFloat(el.position.x) : el.position.x
                          const top = typeof el.position.y === "string" ? parseFloat(el.position.y) : el.position.y

                          return (
                            <div
                              key={el.id}
                              style={{
                                position: "absolute",
                                left,
                                top,
                                width,
                                height,
                                background: el.data.fillColor || "#000",
                                border: `${el.data.borderWidth || 1}px solid ${el.data.borderColor || "#000"}`,
                                borderRadius: el.data.shapeType === "circle" ? "50%" : el.data.borderRadius || 0,
                                transform: `rotate(${el.rotation || 0}deg)`,
                                opacity: el.opacity ?? 1,
                                boxSizing: "border-box",
                              }}
                            />
                          )
                        }

                        return null
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogView
