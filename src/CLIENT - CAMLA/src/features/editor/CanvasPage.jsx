import { useState, useRef } from "react"
import { Rnd } from "react-rnd"
import { Button } from "flowbite-react"
import { HiPlus, HiTrash, HiColorSwatch } from "react-icons/hi"
import PropertiesPanel from "./PropertiesPanel"

const CanvasPage = ({ page, onUpdate }) => {
  const [selectedElement, setSelectedElement] = useState(null)
  const canvasRef = useRef(null)

  // Manejar drop de imágenes desde el sidebar
  const handleDrop = (e) => {
    e.preventDefault()

    try {
      const imageData = JSON.parse(e.dataTransfer.getData("application/json"))
      const rect = canvasRef.current.getBoundingClientRect()

      const newElement = {
        id: Date.now(),
        type: "image",
        data: imageData,
        position: {
          x: Math.max(0, e.clientX - rect.left - 50),
          y: Math.max(0, e.clientY - rect.top - 50),
        },
        size: { width: 100, height: 100 },
        rotation: 0,
        opacity: 1,
      }

      const updatedPage = {
        ...page,
        elements: [...page.elements, newElement],
      }

      onUpdate(updatedPage)
    } catch (error) {
      console.error("Error handling drop:", error)
    }
  }

  // Agregar elemento de texto
  const addTextElement = () => {
    const newElement = {
      id: Date.now(),
      type: "text",
      data: {
        text: "Nuevo texto",
        fontSize: 16,
        fontFamily: "Arial",
        color: "#000000",
        fontWeight: "normal",
        textAlign: "left",
        fontStyle: "normal",
        textDecoration: "none",
      },
      position: { x: 100, y: 100 },
      size: { width: 200, height: 50 },
      rotation: 0,
      opacity: 1,
    }

    const updatedPage = {
      ...page,
      elements: [...page.elements, newElement],
    }

    onUpdate(updatedPage)
    setSelectedElement(newElement)
  }

  // Agregar forma/shape
  const addShapeElement = (shapeType = "rectangle") => {
    const newElement = {
      id: Date.now(),
      type: "shape",
      data: {
        shapeType,
        fillColor: "#3B82F6",
        borderColor: "#1E40AF",
        borderWidth: 2,
        borderRadius: shapeType === "rectangle" ? 8 : 0,
      },
      position: { x: 150, y: 150 },
      size: { width: 120, height: 80 },
      rotation: 0,
      opacity: 1,
    }

    const updatedPage = {
      ...page,
      elements: [...page.elements, newElement],
    }

    onUpdate(updatedPage)
    setSelectedElement(newElement)
  }

  // Eliminar elemento
  const deleteElement = (elementId) => {
    const updatedPage = {
      ...page,
      elements: page.elements.filter((el) => el.id !== elementId),
    }

    onUpdate(updatedPage)
    setSelectedElement(null)
  }

  // Actualizar elemento
  const updateElement = (elementId, updates) => {
    const updatedPage = {
      ...page,
      elements: page.elements.map((el) => (el.id === elementId ? { ...el, ...updates } : el)),
    }

    onUpdate(updatedPage)

    // Actualizar elemento seleccionado si es el que se está editando
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement({ ...selectedElement, ...updates })
    }
  }

  // Cambiar fondo
  const changeBackground = (type, value) => {
    const updatedPage = {
      ...page,
      background: { type, value },
    }

    onUpdate(updatedPage)
  }

  // Manejar actualización de posición y tamaño con react-rnd
  const handleElementUpdate = (elementId, newPosition, newSize) => {
    updateElement(elementId, {
      position: newPosition,
      size: newSize,
    })
  }

  return (
    <div className="flex h-full">
      {/* Canvas principal */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                onClick={addTextElement}
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <HiPlus className="mr-2 h-4 w-4" />
                Texto
              </Button>

              <Button
                onClick={() => addShapeElement("rectangle")}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <HiColorSwatch className="mr-2 h-4 w-4" />
                Rectángulo
              </Button>

              <Button
                onClick={() => addShapeElement("circle")}
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <HiColorSwatch className="mr-2 h-4 w-4" />
                Círculo
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Fondo:</span>
                <input
                  type="color"
                  value={page.background?.value || "#ffffff"}
                  onChange={(e) => changeBackground("color", e.target.value)}
                  className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                />
              </div>

              {selectedElement && (
                <Button onClick={() => deleteElement(selectedElement.id)} color="failure" size="sm">
                  <HiTrash className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div
            ref={canvasRef}
            className="canvas-catalogo relative w-full h-full min-h-96"
            style={{
              backgroundColor: page.background?.type === "color" ? page.background.value : "#ffffff",
              backgroundImage: page.background?.type === "image" ? `url(${page.background.value})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => setSelectedElement(null)}
          >
            {/* Elementos del canvas */}
            {page.elements.map((element) => (
              <Rnd
                key={element.id}
                size={{ width: element.size.width, height: element.size.height }}
                position={{ x: element.position.x, y: element.position.y }}
                onDragStop={(e, d) => {
                  handleElementUpdate(element.id, { x: d.x, y: d.y }, element.size)
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  handleElementUpdate(element.id, position, {
                    width: ref.style.width,
                    height: ref.style.height,
                  })
                }}
                bounds="parent"
                className={`${selectedElement?.id === element.id ? "ring-2 ring-purple-500" : ""}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedElement(element)
                }}
              >
                <div
                  className="w-full h-full cursor-move"
                  style={{
                    transform: `rotate(${element.rotation}deg)`,
                    opacity: element.opacity,
                  }}
                >
                  {element.type === "image" && (
                    <img
                      src={
                        element.data.url ||
                        `/placeholder.svg?height=${element.size.height || "/placeholder.svg"}&width=${element.size.width}&query=${element.data.nombre}`
                      }
                      alt={element.data.nombre}
                      crossOrigin="anonymous"
                      className="w-full h-full object-cover rounded"
                      draggable={false}
                    />
                  )}

                  {element.type === "text" && (
                    <div
                      className="w-full h-full flex items-center justify-center p-2 cursor-text"
                      style={{
                        fontSize: element.data.fontSize,
                        fontFamily: element.data.fontFamily,
                        color: element.data.color,
                        fontWeight: element.data.fontWeight,
                        textAlign: element.data.textAlign,
                        fontStyle: element.data.fontStyle,
                        textDecoration: element.data.textDecoration,
                        wordWrap: "break-word",
                        overflow: "hidden",
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {
                        updateElement(element.id, {
                          data: { ...element.data, text: e.target.textContent },
                        })
                      }}
                    >
                      {element.data.text}
                    </div>
                  )}

                  {element.type === "shape" && (
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundColor: element.data.fillColor,
                        border: `${element.data.borderWidth}px solid ${element.data.borderColor}`,
                        borderRadius: element.data.shapeType === "circle" ? "50%" : `${element.data.borderRadius}px`,
                      }}
                    />
                  )}
                </div>
              </Rnd>
            ))}

            {/* Mensaje cuando está vacío */}
            {page.elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center text-gray-400">
                  <HiPlus className="mx-auto h-12 w-12 mb-4" />
                  <p className="text-lg font-medium">Arrastra imágenes aquí</p>
                  <p className="text-sm">o agrega elementos usando los botones de arriba</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Panel de propiedades */}
      {selectedElement && (
        <div className="w-80 ml-4">
          <PropertiesPanel
            element={selectedElement}
            onUpdate={(updates) => updateElement(selectedElement.id, updates)}
          />
        </div>
      )}
    </div>
  )
}

export default CanvasPage
