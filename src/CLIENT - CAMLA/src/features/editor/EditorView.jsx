import { useState, useEffect, useCallback, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button, Spinner, Badge } from "flowbite-react"
import { HiArrowLeft, HiDownload, HiPlus, HiTrash, HiRefresh, HiSave } from "react-icons/hi"
import AuthConAtext from "../../context/AuthContext"
import Sidebar from "../components/Sidebar"
import CanvasPage from "./CanvasPage"
import { getCatalogById, updateCatalog } from "../../services/CatalogService"
import { AlertHelper } from "../../utilities/AlertHelper"
//librerias para importar cosas
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EditorView = () => {
  const { catalogId } = useParams()
  const navigate = useNavigate()
  const { user, token } = useContext(AuthConAtext)

  const [catalog, setCatalog] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Historial para undo/redo
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Verificar autenticación
  useEffect(() => {
    if (!user || !token) {
      navigate("/login")
      return
    }
  }, [user, token, navigate])

  // Cargar catálogo
  useEffect(() => {
    const loadCatalog = async () => {
      try {
        setIsLoading(true)
        const response = await getCatalogById(catalogId)
        const catalogData = response.data


        // Parsear contenido JSON
        let parsedContent
        try {
          parsedContent = JSON.parse(catalogData.contenidoJson || '{"pages":[]}')
        } catch (error) {
          parsedContent = { pages: [] }
        }

        // Si no tiene páginas, crear una página inicial
        if (!parsedContent.pages || parsedContent.pages.length === 0) {
          parsedContent.pages = [
            {
              id: Date.now(),
              elements: [],
              background: { type: "color", value: "#ffffff" },
            },
          ]
        }

        const catalogWithParsedContent = {
          ...catalogData,
          pages: parsedContent.pages,
        }

        setCatalog(catalogWithParsedContent)

        // Inicializar historial
        setHistory([catalogWithParsedContent])
        setHistoryIndex(0)
      } catch (error) {
        AlertHelper.showAlert("Error al cargar el catálogo", "error")
        navigate("/dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    if (catalogId && user && token) {
      loadCatalog()
    }
  }, [catalogId, navigate, user, token])

  // Guardar cambios manualmente
  const handleSave = useCallback(async () => {
    if (!catalog) return

    try {
      setIsSaving(true)

      const catalogData = {
        ...catalog,
        contenidoJson: JSON.stringify({ pages: catalog.pages }),
      }

      await updateCatalog(catalogId, catalogData)
      AlertHelper.showAlert("Catálogo guardado correctamente", "success")
    } catch (error) {
      AlertHelper.showAlert("Error al guardar cambios", "error")
    } finally {
      setIsSaving(false)
    }
  }, [catalog, catalogId])

  // Agregar al historial
  const addToHistory = useCallback(
    (newCatalog) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1)
        newHistory.push(newCatalog)

        // Mantener máximo 20 elementos en el historial
        if (newHistory.length > 20) {
          newHistory.shift()
          setHistoryIndex(19)
          return newHistory
        }

        setHistoryIndex(newHistory.length - 1)
        return newHistory
      })
    },
    [historyIndex],
  )

  // Deshacer
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setCatalog(history[newIndex])
    }
  }

  // Rehacer
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setCatalog(history[newIndex])
    }
  }

  // Agregar nueva página
  const addPage = () => {
    if (catalog.pages.length >= 30) {
      AlertHelper.showAlert("Máximo 30 páginas por catálogo", "error")
      return
    }

    const newPage = {
      id: Date.now(),
      elements: [],
      background: { type: "color", value: "#ffffff" },
    }

    const updatedCatalog = {
      ...catalog,
      pages: [...catalog.pages, newPage],
    }

    setCatalog(updatedCatalog)
    setCurrentPage(catalog.pages.length)
    addToHistory(updatedCatalog)
  }

  // Eliminar página
  const deletePage = (pageIndex) => {
    if (catalog.pages.length <= 1) {
      AlertHelper.showAlert("Debe haber al menos una página", "error")
      return
    }

    const updatedCatalog = {
      ...catalog,
      pages: catalog.pages.filter((_, index) => index !== pageIndex),
    }

    setCatalog(updatedCatalog)

    // Ajustar página actual si es necesario
    if (currentPage >= updatedCatalog.pages.length) {
      setCurrentPage(updatedCatalog.pages.length - 1)
    }

    addToHistory(updatedCatalog)
  }

  // Actualizar página
  const updatePage = (pageIndex, updatedPage) => {
    const updatedCatalog = {
      ...catalog,
      pages: catalog.pages.map((page, index) => (index === pageIndex ? updatedPage : page)),
    }

    setCatalog(updatedCatalog)
    addToHistory(updatedCatalog)
  }

  // Exportar catálogo
  const exportCatalog = async () => {
    try {
      // Configura PDF (A4, vertical)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
      });

      let firstPage = true;

      // Recorre cada página del catálogo
      for (let i = 0; i < catalog.pages.length; i++) {
        setCurrentPage(i); // esto cambia la página visible en el editor
        // Espera que React pinte la nueva página (ajusta si tu render es más lento)
        await new Promise(res => setTimeout(res, 400));

        const canvasNode = document.querySelector(".canvas-catalogo");
        if (!canvasNode) {
          AlertHelper.showAlert("No se encontró el área de exportación", "error");
          return;
        }

        // Captura la página
        const canvasImage = await html2canvas(canvasNode, {
          useCORS: true,
          backgroundColor: null, // respeta fondos transparentes si tienes
          allowTaint: true,
          logging: false
        });
        const imgData = canvasImage.toDataURL("image/png");

        // Calcula tamaño al PDF
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        if (!firstPage) pdf.addPage();
        firstPage = false;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save(`${catalog.nombre || "Catalogo"}.pdf`);
      AlertHelper.showAlert("Catálogo exportado correctamente en PDF", "success");
    } catch (error) {
      AlertHelper.showAlert("Error al exportar catálogo", "error");
      console.error("Export PDF error:", error);
    }
  }

  if (!user || !token) {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Spinner size="xl" />
          <p className="mt-4 text-gray-600">Cargando editor...</p>
        </div>
      </div>
    )
  }

  if (!catalog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Catálogo no encontrado</p>
          <Button onClick={() => navigate("/dashboard")} className="mt-4">
            Volver al Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header del editor */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button color="gray" onClick={() => navigate("/dashboard")} size="sm">
              <HiArrowLeft className="mr-2 h-4 w-4" />
              Dashboard
            </Button>

            <div className="flex items-center space-x-2">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">{catalog.nombre}</h1>
                <div className="flex items-center space-x-2 text-sm">
                  <span className={isSaving ? "text-blue-600" : "text-green-600"}>
                    {isSaving ? "Guardando..." : "Listo para guardar"}
                  </span>
                  <Badge color={catalog.status ? "success" : "gray"} size="sm">
                    {catalog.status ? "Público" : "Privado"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Controles de historial */}
            <Button onClick={handleUndo} disabled={historyIndex <= 0} color="gray" size="sm" title="Deshacer">
              <HiRefresh className="h-4 w-4 transform rotate-180" />
            </Button>

            <Button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              color="gray"
              size="sm"
              title="Rehacer"
            >
              <HiRefresh className="h-4 w-4" />
            </Button>

            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              size="sm"
            >
              <HiSave className="mr-2 h-4 w-4" />
              Guardar
            </Button>

            <Button
              onClick={exportCatalog}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              size="sm"
            >
              <HiDownload className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar izquierdo - Banco de imágenes */}
        <div className="w-80 bg-white shadow-lg border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Editor principal */}
        <div className="flex-1 flex flex-col">
          {/* Navegación de páginas */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 font-medium">Páginas:</span>
                <div className="flex space-x-1 max-w-md overflow-x-auto">
                  {catalog.pages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${currentPage === index
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-gray-500">{catalog.pages.length}/30</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={addPage}
                  disabled={catalog.pages.length >= 30}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <HiPlus className="mr-1 h-4 w-4" />
                  Página
                </Button>

                {catalog.pages.length > 1 && (
                  <Button onClick={() => deletePage(currentPage)} color="failure" size="sm">
                    <HiTrash className="mr-1 h-4 w-4" />
                    Eliminar
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Canvas de edición */}
          <div className="flex-1 p-6 overflow-hidden ">
            <CanvasPage
              page={catalog.pages[currentPage]}
              onUpdate={(updatedPage) => updatePage(currentPage, updatedPage)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorView
