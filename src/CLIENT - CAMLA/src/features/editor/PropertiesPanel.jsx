
import { Card, Label, TextInput, Select, Button, ToggleSwitch } from "flowbite-react"
import { HiColorSwatch, HiPlus, HiTrash } from "react-icons/hi"

const PropertiesPanel = ({ element, onUpdate }) => {
  if (!element) return null

  const handleDataUpdate = (key, value) => {
    onUpdate({
      data: { ...element.data, [key]: value },
    })
  }

  const handlePropertyUpdate = (key, value) => {
    onUpdate({ [key]: value })
  }

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
          <HiColorSwatch className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-white">Propiedades</h3>
        </div>

        {/* Propiedades específicas por tipo */}
        {element.type === "text" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-content" value="Contenido" className="text-sm font-medium text-gray-700" />
              <textarea
                id="text-content"
                value={element.data.text}
                onChange={(e) => handleDataUpdate("text", e.target.value)}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg resize-none"
                rows={3}
                placeholder="Escribe tu texto aquí..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="font-size" value="Tamaño" className="text-sm font-medium text-gray-700" />
                <TextInput
                  id="font-size"
                  type="number"
                  min="8"
                  max="72"
                  value={element.data.fontSize}
                  onChange={(e) => handleDataUpdate("fontSize", Number.parseInt(e.target.value))}
                  className="mt-1"
                  sizing="sm"
                />
              </div>

              <div>
                <Label htmlFor="font-family" value="Fuente" className="text-sm font-medium text-gray-700" />
                <Select
                  id="font-family"
                  value={element.data.fontFamily}
                  onChange={(e) => handleDataUpdate("fontFamily", e.target.value)}
                  className="mt-1"
                  sizing="sm"
                >
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Courier New">Courier New</option>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="text-color" value="Color" className="text-sm font-medium text-gray-700" />
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="text-color"
                  type="color"
                  value={element.data.color}
                  onChange={(e) => handleDataUpdate("color", e.target.value)}
                  className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <TextInput
                  value={element.data.color}
                  onChange={(e) => handleDataUpdate("color", e.target.value)}
                  className="flex-1"
                  sizing="sm"
                />
              </div>
            </div>

            <div>
              <Label value="Alineación" className="text-sm font-medium text-gray-700" />
              <div className="flex space-x-1 mt-1">
                {["left", "center", "right", "justify"].map((align) => (
                  <Button
                    key={align}
                    size="xs"
                    color={element.data.textAlign === align ? "purple" : "gray"}
                    onClick={() => handleDataUpdate("textAlign", align)}
                    className="flex-1"
                  >
                    {align === "left" && "←"}
                    {align === "center" && "↔"}
                    {align === "right" && "→"}
                    {align === "justify" && "≡"}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label value="Negrita" className="text-sm font-medium text-gray-100" />
                <ToggleSwitch
                  checked={element.data.fontWeight === "bold"}
                  onChange={(checked) => handleDataUpdate("fontWeight", checked ? "bold" : "normal")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label value="Cursiva" className="text-sm font-medium text-gray-100" />
                <ToggleSwitch
                  checked={element.data.fontStyle === "italic"}
                  onChange={(checked) => handleDataUpdate("fontStyle", checked ? "italic" : "normal")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label value="Subrayado" className="text-sm font-medium text-gray-100" />
                <ToggleSwitch
                  checked={element.data.textDecoration === "underline"}
                  onChange={(checked) => handleDataUpdate("textDecoration", checked ? "underline" : "none")}
                />
              </div>
            </div>
          </div>
        )}

        {element.type === "image" && (
          <div className="space-y-4">
            <div>
              <Label value="Información" className="text-sm font-medium text-gray-700" />
              <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-800">{element.data.nombre}</p>
                <p className="text-xs text-gray-500 mt-1">{element.data.categoria?.nombre}</p>
              </div>
            </div>

            <div>
              <Label htmlFor="border-radius" value="Redondeo de bordes" className="text-sm font-medium text-gray-700" />
              <TextInput
                id="border-radius"
                type="number"
                min="0"
                max="50"
                value={element.data.borderRadius || 0}
                onChange={(e) => handleDataUpdate("borderRadius", Number.parseInt(e.target.value))}
                className="mt-1"
                sizing="sm"
              />
            </div>
          </div>
        )}

        {element.type === "shape" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fill-color" value="Color de relleno" className="text-sm font-medium text-gray-700" />
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="fill-color"
                  type="color"
                  value={element.data.fillColor}
                  onChange={(e) => handleDataUpdate("fillColor", e.target.value)}
                  className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <TextInput
                  value={element.data.fillColor}
                  onChange={(e) => handleDataUpdate("fillColor", e.target.value)}
                  className="flex-1"
                  sizing="sm"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="border-color" value="Color del borde" className="text-sm font-medium text-gray-700" />
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="border-color"
                  type="color"
                  value={element.data.borderColor}
                  onChange={(e) => handleDataUpdate("borderColor", e.target.value)}
                  className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <TextInput
                  value={element.data.borderColor}
                  onChange={(e) => handleDataUpdate("borderColor", e.target.value)}
                  className="flex-1"
                  sizing="sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="border-width" value="Grosor borde" className="text-sm font-medium text-gray-700" />
                <TextInput
                  id="border-width"
                  type="number"
                  min="0"
                  max="10"
                  value={element.data.borderWidth}
                  onChange={(e) => handleDataUpdate("borderWidth", Number.parseInt(e.target.value))}
                  className="mt-1"
                  sizing="sm"
                />
              </div>

              {element.data.shapeType === "rectangle" && (
                <div>
                  <Label htmlFor="border-radius-shape" value="Redondeo" className="text-sm font-medium text-gray-700" />
                  <TextInput
                    id="border-radius-shape"
                    type="number"
                    min="0"
                    max="50"
                    value={element.data.borderRadius}
                    onChange={(e) => handleDataUpdate("borderRadius", Number.parseInt(e.target.value))}
                    className="mt-1"
                    sizing="sm"
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {element.type === "card" && (
  <div className="space-y-4">
    {/* Contenido de texto */}
    <div>
      <Label htmlFor="card-title" value="Título" className="text-sm font-medium text-gray-700" />
      <TextInput
        id="card-title"
        value={element.data.title}
        onChange={(e) => handleDataUpdate("title", e.target.value)}
        className="mt-1"
        sizing="sm"
        placeholder="Título de la tarjeta"
      />
    </div>

    <div>
      <Label htmlFor="card-description" value="Descripción" className="text-sm font-medium text-gray-700" />
      <textarea
        id="card-description"
        value={element.data.description}
        onChange={(e) => handleDataUpdate("description", e.target.value)}
        className="mt-1 w-full p-2 border border-gray-300 rounded-lg resize-none"
        rows={3}
        placeholder="Descripción de la tarjeta..."
      />
    </div>

    <div>
      <Label htmlFor="card-image" value="Imagen" className="text-sm font-medium text-gray-700" />
      {element.data.imageData ? (
        <div className="mt-1 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">{element.data.imageData.nombre}</p>
              <p className="text-xs text-gray-500">{element.data.imageData.categoria?.nombre}</p>
            </div>
            <Button
              size="xs"
              color="gray"
              onClick={() => handleDataUpdate("imageData", null)}
            >
              <HiTrash className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-1 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
          <HiPlus className="mx-auto h-8 w-8 mb-2" />
          <p className="text-sm">Arrastra una imagen desde el sidebar al área de imagen de la tarjeta</p>
        </div>
      )}
    </div>

    {/* Posición de imagen */}
    <div>
      <Label htmlFor="image-position" value="Posición de imagen" className="text-sm font-medium text-gray-700" />
      <Select
        id="image-position"
        value={element.data.imagePosition}
        onChange={(e) => handleDataUpdate("imagePosition", e.target.value)}
        className="mt-1"
        sizing="sm"
      >
        <option value="top">Arriba</option>
        <option value="left">Izquierda</option>
        <option value="right">Derecha</option>
      </Select>
    </div>

    {/* Configuración del título */}
    <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
      <h5 className="text-sm font-medium text-gray-700">Configuración del Título</h5>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="title-size" value="Tamaño" className="text-xs text-gray-600" />
          <TextInput
            id="title-size"
            type="number"
            min="10"
            max="48"
            value={element.data.titleFontSize}
            onChange={(e) => handleDataUpdate("titleFontSize", parseInt(e.target.value))}
            sizing="sm"
          />
        </div>

        <div>
          <Label value="Color" className="text-xs text-gray-600" />
          <input
            type="color"
            value={element.data.titleColor}
            onChange={(e) => handleDataUpdate("titleColor", e.target.value)}
            className="w-full h-8 rounded border border-gray-300 cursor-pointer"
          />
        </div>
      </div>

      <div>
        <Label value="Peso de fuente" className="text-xs text-gray-600" />
        <Select
          value={element.data.titleFontWeight}
          onChange={(e) => handleDataUpdate("titleFontWeight", e.target.value)}
          sizing="sm"
        >
          <option value="normal">Normal</option>
          <option value="bold">Negrita</option>
          <option value="600">Semi-negrita</option>
        </Select>
      </div>
    </div>

    {/* Configuración de descripción */}
    <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
      <h5 className="text-sm font-medium text-gray-700">Configuración de Descripción</h5>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="desc-size" value="Tamaño" className="text-xs text-gray-600" />
          <TextInput
            id="desc-size"
            type="number"
            min="8"
            max="24"
            value={element.data.descriptionFontSize}
            onChange={(e) => handleDataUpdate("descriptionFontSize", parseInt(e.target.value))}
            sizing="sm"
          />
        </div>

        <div>
          <Label value="Color" className="text-xs text-gray-600" />
          <input
            type="color"
            value={element.data.descriptionColor}
            onChange={(e) => handleDataUpdate("descriptionColor", e.target.value)}
            className="w-full h-8 rounded border border-gray-300 cursor-pointer"
          />
        </div>
      </div>
    </div>

    {/* Alineación de texto */}
    <div>
      <Label value="Alineación de texto" className="text-sm font-medium text-gray-700" />
      <div className="flex space-x-1 mt-1">
        {["left", "center", "right"].map((align) => (
          <Button
            key={align}
            size="xs"
            color={element.data.textAlign === align ? "purple" : "gray"}
            onClick={() => handleDataUpdate("textAlign", align)}
            className="flex-1"
          >
            {align === "left" && "←"}
            {align === "center" && "↔"}
            {align === "right" && "→"}
          </Button>
        ))}
      </div>
    </div>

    {/* Estilo de tarjeta */}
    <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
      <h5 className="text-sm font-medium text-gray-700">Estilo de Tarjeta</h5>
      
      <div>
        <Label value="Color de fondo" className="text-xs text-gray-600" />
        <div className="flex items-center space-x-2 mt-1">
          <input
            type="color"
            value={element.data.backgroundColor}
            onChange={(e) => handleDataUpdate("backgroundColor", e.target.value)}
            className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
          />
          <TextInput
            value={element.data.backgroundColor}
            onChange={(e) => handleDataUpdate("backgroundColor", e.target.value)}
            className="flex-1"
            sizing="sm"
          />
        </div>
      </div>

      <div>
        <Label value="Color del borde" className="text-xs text-gray-600" />
        <div className="flex items-center space-x-2 mt-1">
          <input
            type="color"
            value={element.data.borderColor}
            onChange={(e) => handleDataUpdate("borderColor", e.target.value)}
            className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
          />
          <TextInput
            value={element.data.borderColor}
            onChange={(e) => handleDataUpdate("borderColor", e.target.value)}
            className="flex-1"
            sizing="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <Label htmlFor="border-width-card" value="Grosor" className="text-xs text-gray-600" />
          <TextInput
            id="border-width-card"
            type="number"
            min="0"
            max="5"
            value={element.data.borderWidth}
            onChange={(e) => handleDataUpdate("borderWidth", parseInt(e.target.value))}
            sizing="sm"
          />
        </div>

        <div>
          <Label htmlFor="border-radius-card" value="Redondeo" className="text-xs text-gray-600" />
          <TextInput
            id="border-radius-card"
            type="number"
            min="0"
            max="24"
            value={element.data.borderRadius}
            onChange={(e) => handleDataUpdate("borderRadius", parseInt(e.target.value))}
            sizing="sm"
          />
        </div>

        <div>
          <Label htmlFor="padding-card" value="Espaciado" className="text-xs text-gray-600" />
          <TextInput
            id="padding-card"
            type="number"
            min="4"
            max="32"
            value={element.data.padding}
            onChange={(e) => handleDataUpdate("padding", parseInt(e.target.value))}
            sizing="sm"
          />
        </div>
      </div>

      <div>
        <Label value={`Sombra (${element.data.shadowLevel})`} className="text-xs text-gray-600" />
        <input
          type="range"
          min="0"
          max="3"
          value={element.data.shadowLevel}
          onChange={(e) => handleDataUpdate("shadowLevel", parseInt(e.target.value))}
          className="w-full mt-1"
        />
      </div>
    </div>
  </div>
)}

        {/* Propiedades comunes */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700">Propiedades Generales</h4>

          <div>
            <Label
              htmlFor="opacity"
              value={`Opacidad (${Math.round(element.opacity * 100)}%)`}
              className="text-sm font-medium text-gray-700"
            />
            <input
              id="opacity"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={element.opacity}
              onChange={(e) => handlePropertyUpdate("opacity", Number.parseFloat(e.target.value))}
              className="w-full mt-1"
            />
          </div>

          <div>
            <Label
              htmlFor="rotation"
              value={`Rotación (${element.rotation}°)`}
              className="text-sm font-medium text-gray-700"
            />
            <input
              id="rotation"
              type="range"
              min="0"
              max="360"
              value={element.rotation}
              onChange={(e) => handlePropertyUpdate("rotation", Number.parseInt(e.target.value))}
              className="w-full mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="pos-x" value="Posición X" className="text-sm font-medium text-gray-700" />
              <TextInput
                id="pos-x"
                type="number"
                value={Math.round(element.position.x)}
                onChange={(e) =>
                  handlePropertyUpdate("position", { ...element.position, x: Number.parseInt(e.target.value) })
                }
                className="mt-1"
                sizing="sm"
              />
            </div>

            <div>
              <Label htmlFor="pos-y" value="Posición Y" className="text-sm font-medium text-gray-700" />
              <TextInput
                id="pos-y"
                type="number"
                value={Math.round(element.position.y)}
                onChange={(e) =>
                  handlePropertyUpdate("position", { ...element.position, y: Number.parseInt(e.target.value) })
                }
                className="mt-1"
                sizing="sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="width" value="Ancho" className="text-sm font-medium text-gray-700" />
              <TextInput
                id="width"
                type="number"
                min="10"
                value={Math.round(element.size.width)}
                onChange={(e) =>
                  handlePropertyUpdate("size", { ...element.size, width: Number.parseInt(e.target.value) })
                }
                className="mt-1"
                sizing="sm"
              />
            </div>

            <div>
              <Label htmlFor="height" value="Alto" className="text-sm font-medium text-gray-700" />
              <TextInput
                id="height"
                type="number"
                min="10"
                value={Math.round(element.size.height)}
                onChange={(e) =>
                  handlePropertyUpdate("size", { ...element.size, height: Number.parseInt(e.target.value) })
                }
                className="mt-1"
                sizing="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PropertiesPanel
