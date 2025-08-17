import { useState, useRef } from "react"
import { Rnd } from "react-rnd"
import { Button } from "flowbite-react"
import { HiPlus, HiTrash, HiColorSwatch } from "react-icons/hi"
import PropertiesPanel from "./PropertiesPanel"

const CanvasPage = ({ page, onUpdate }) => {
  const [selectedElement, setSelectedElement] = useState(null)
  const canvasRef = useRef(null)

  const addCardElement = () => {
    const newElement = {
      id: Date.now(),
      type: "card",
      data: {
        title: "Título de la tarjeta",
        description: "Descripción de la tarjeta. Aquí puedes agregar detalles sobre el producto o servicio.",
        imageData: null, // Cambiado de imageUrl a imageData para almacenar el objeto de imagen
        titleFontSize: 18,
        titleColor: "#1F2937",
        titleFontWeight: "bold",
        descriptionFontSize: 14,
        descriptionColor: "#6B7280",
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        borderRadius: 8,
        shadowLevel: 1, // 0-3 para diferentes niveles de sombra
        padding: 16,
        imagePosition: "top", // top, left, right
        textAlign: "left",
      },
      position: { x: 100, y: 100 },
      size: { width: 280, height: 320 },
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
  const handleCardImageDrop = (e, cardId) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      const imageData = JSON.parse(e.dataTransfer.getData("application/json"))

      updateElement(cardId, {
        data: {
          ...page.elements.find(el => el.id === cardId).data,
          imageData: imageData
        }
      })
    } catch (error) {
      console.error("Error handling card image drop:", error)
    }
  }

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
  const getShadowStyle = (level) => {
    const shadows = {
      0: "none",
      1: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      2: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      3: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    };
    return shadows[level] || shadows[1];
  };

  const getCardLayoutClass = (imagePosition) => {
    switch (imagePosition) {
      case "left":
        return "flex flex-row gap-3";
      case "right":
        return "flex flex-row-reverse gap-3";
      case "top":
      default:
        return "flex flex-col gap-3";
    }
  };

  const getImageContainerClass = (imagePosition) => {
    switch (imagePosition) {
      case "left":
      case "right":
        return "w-1/3 h-full";
      case "top":
      default:
        return "w-full h-1/2";
    }
  };



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
              <Button
                onClick={addCardElement}
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <HiPlus className="mr-2 h-4 w-4" />
                Producto
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
                  {element.type === "card" && (
                    <div
                      className="w-full h-full overflow-hidden"
                      style={{
                        backgroundColor: element.data.backgroundColor,
                        border: `${element.data.borderWidth}px solid ${element.data.borderColor}`,
                        borderRadius: `${element.data.borderRadius}px`,
                        padding: `${element.data.padding}px`,
                        boxShadow: getShadowStyle(element.data.shadowLevel),
                      }}
                    >
                      {/* Layout flexbox según posición de imagen */}
                      <div className={`h-full ${getCardLayoutClass(element.data.imagePosition)}`}>
                        {/* Área de imagen con drag & drop */}
                        <div
                          className={`${getImageContainerClass(element.data.imagePosition)} relative group`}
                          onDrop={(e) => handleCardImageDrop(e, element.id)}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          {element.data.imageData ? (
                            // Imagen existente
                            <div className="w-full h-full relative">
                              <img
                                src={element.data.imageData.url || `/placeholder.svg?height=120&width=200&text=${element.data.imageData.nombre}`}
                                alt={element.data.imageData.nombre || "Card image"}
                                crossOrigin="anonymous"
                                className="w-full h-full object-cover rounded"
                                draggable={false}
                              />
                              {/* Overlay para remover imagen */}
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Button
                                  size="xs"
                                  color="failure"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateElement(element.id, {
                                      data: { ...element.data, imageData: null }
                                    });
                                  }}
                                  className="shadow-lg"
                                >
                                  <HiTrash className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            // Zona de drop cuando no hay imagen
                            <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200">
                              <HiPlus className="w-6 h-6 text-gray-400 mb-2" />
                              <span className="text-xs text-gray-500 text-center px-2">
                                Arrastra una imagen aquí
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Contenido de texto */}
                        <div className="flex-1 flex flex-col justify-center">
                          {/* Título editable */}
                          <div
                            contentEditable
                            suppressContentEditableWarning={true}
                            className="outline-none cursor-text mb-2 hover:bg-gray-50 hover:bg-opacity-50 rounded px-1 transition-colors duration-150"
                            style={{
                              fontSize: `${element.data.titleFontSize}px`,
                              color: element.data.titleColor,
                              fontWeight: element.data.titleFontWeight,
                              textAlign: element.data.textAlign,
                              wordWrap: "break-word",
                            }}
                            onBlur={(e) => {
                              updateElement(element.id, {
                                data: { ...element.data, title: e.target.textContent },
                              })
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {element.data.title}
                          </div>

                          {/* Descripción editable */}
                          <div
                            contentEditable
                            suppressContentEditableWarning={true}
                            className="outline-none cursor-text flex-1 hover:bg-gray-50 hover:bg-opacity-50 rounded px-1 transition-colors duration-150"
                            style={{
                              fontSize: `${element.data.descriptionFontSize}px`,
                              color: element.data.descriptionColor,
                              textAlign: element.data.textAlign,
                              wordWrap: "break-word",
                              overflow: "hidden",
                            }}
                            onBlur={(e) => {
                              updateElement(element.id, {
                                data: { ...element.data, description: e.target.textContent },
                              })
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {element.data.description}
                          </div>
                        </div>
                      </div>
                    </div>
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
