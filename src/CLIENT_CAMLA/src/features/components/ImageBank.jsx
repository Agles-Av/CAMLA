import { useState, useEffect, useContext } from "react"
import { Button, TextInput, Select, Modal, Label, FileInput, Spinner, Badge, ModalBody, ModalFooter, ModalHeader } from "flowbite-react"
import { HiSearch, HiPlus, HiPhotograph, HiTrash, HiEye, HiEyeOff } from "react-icons/hi"
import  AuthConAtext  from "../../context/AuthContext"
import {
  getGlobalImages,
  getUserImages,
  uploadImage,
  deleteImage,
  updateImageStatus,
} from "../../services/imageService"
import { getCategories } from "../../services/CategoriaService"
import { validateImageFile, validateImageName } from "../../validations/ImageValidations"
import { AlertHelper } from "../../utilities/AlertHelper"

const ImageBank = ({ type = "global" }) => {
  const { user } = useContext(AuthConAtext)

  const [images, setImages] = useState([])
  const [filteredImages, setFilteredImages] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)

  // Estados del formulario de subida
  const [uploadForm, setUploadForm] = useState({
    nombre: "",
    categoriaId: "",
    file: null,
  })
  const [uploadErrors, setUploadErrors] = useState({})

  // Cargar categorías
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories()
        setCategories(response || [])
      } catch (error) {
        console.error("Error loading categories:", error)
      }
    }

    loadCategories()
  }, [])

  // Cargar imágenes
  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true)
        let response

        if (type === "global") {
          response = await getGlobalImages()
          response = (response || []).filter(img => img.status !== false)
        } else {
          if (!user?.id) return
          response = await getUserImages(user.id)
        }

        setImages(response || [])
        setFilteredImages(response || [])
      } catch (error) {
        AlertHelper.showAlert("Error al cargar imágenes","error")
        console.error("Error loading images:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadImages()
  }, [type, user?.id])

  // Filtrar imágenes
  useEffect(() => {
    let filtered = images

    if (searchTerm) {
      filtered = filtered.filter((img) => img.nombre?.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (selectedCategory) {
      console.log(selectedCategory);
      
      filtered = filtered.filter((img) => img.categoria === selectedCategory)
    }

    setFilteredImages(filtered)
  }, [images, searchTerm, selectedCategory])

  // Manejar subida de imagen
  const handleUpload = async (e) => {
    e.preventDefault()

    // Validaciones
    const nameError = validateImageName(uploadForm.nombre)
    const fileError = validateImageFile(uploadForm.file)

    const errors = {}
    if (nameError) errors.nombre = nameError
    if (fileError.file) errors.file = fileError.file
    if (!uploadForm.categoriaId) errors.categoriaId = "Selecciona una categoría"

    if (Object.keys(errors).length > 0) {
      setUploadErrors(errors)
      return
    }

    try {
      setUploadLoading(true)

      const formData = new FormData()
      formData.append("nombre", uploadForm.nombre)
      formData.append("categoriaId", uploadForm.categoriaId)
      formData.append("archivo", uploadForm.file)
      formData.append("usuarioId", user.id)
      formData.append("status", type === "global" ? "true" : "false")



      await uploadImage(formData)

      AlertHelper.showAlert("Imagen subida correctamente","success")
      setShowUploadModal(false)
      setUploadForm({ nombre: "", categoriaId: "", file: null })
      setUploadErrors({})

      // Recargar imágenes
      const response = type === "global" ? await getGlobalImages() : await getUserImages(user.id)
      setImages(response || [])
    } catch (error) {
      AlertHelper.showAlert("Error al subir la imagen","error")
      console.error("Upload error:", error)
    } finally {
      setUploadLoading(false)
    }
  }

  // Eliminar imagen
  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
      return
    }

    try {
      await deleteImage(imageId)
      AlertHelper.showAlert("Imagen eliminada correctamente","success")

      // Recargar imágenes
      const response = type === "global" ? await getGlobalImages() : await getUserImages(user.id)
      setImages(response || [])
    } catch (error) {
      AlertHelper.showAlert("Error al eliminar la imagen","error")
      console.error("Delete error:", error)
    }
  }

  // Cambiar estado público/privado
  const handleToggleStatus = async (imageId, currentStatus) => {
    try {
      await updateImageStatus(imageId, { status: !currentStatus })
      AlertHelper.showAlert(`Imagen ${!currentStatus ? "publicada" : "marcada como privada"}`,"success")

      // Recargar imágenes
      const response = type === "global" ? await getGlobalImages() : await getUserImages(user.id)
      setImages(response || [])
    } catch (error) {
      AlertHelper.showAlert("Error al cambiar el estado de la imagen","error")
      console.error("Toggle status error:", error)
    }
  }

  return (
    <div className="h-full min-h-0 flex flex-col bg-gradient-to-r from-indigo-200 to-purple-300 hover:from-indigo-300 hover:to-purple-200">
      {/* Controles de búsqueda y filtros */}
      <div className="p-4 space-y-3 border-b border-gray-200 bg-gray-50 bg-gradient-to-r from-indigo-200 to-purple-300 hover:from-indigo-300 hover:to-purple-200 shrink-0 sticky top-0 z-10">
        {/* Buscador */}
        <TextInput
          icon={HiSearch}
          placeholder="Buscar imágenes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
          sizing="sm"
        />

        {/* Filtro por categoría */}
        <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} sizing="sm">
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.nombre}>
              {category.nombre}
            </option>
          ))}
        </Select>

        {/* Botón agregar imagen */}
        <Button
          onClick={() => setShowUploadModal(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          size="sm"
        >
          <HiPlus className="mr-2 h-4 w-4" />
          Agregar Imagen
        </Button>
      </div>

      {/* Grid de imágenes */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4" style={{ 
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        height: 'calc(100% - 160px)' // Ajusta según la altura de tus controles
      }}>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Spinner size="lg" />
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-8">
            <HiPhotograph className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-sm">
              {searchTerm || selectedCategory ? "No se encontraron imágenes" : "No hay imágenes disponibles"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("application/json", JSON.stringify(image))
                }}
              >
                <div className="relative">
                  <img
                    src={image.url || `/placeholder.svg?height=120&width=120&query=${image.nombre}`}
                    alt={image.nombre}
                    className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                  />

                  {/* Overlay con acciones */}
                  <div className="absolute inset-0 bg-gray bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      {type === "personal" && (
                        <>
                          <Button
                            size="xs"
                            color={image.status ? "green" : "red"}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleToggleStatus(image.id, image.status)
                            }}
                          >
                            {image.status ? <HiEye className="w-3 h-3" /> : <HiEyeOff className="w-3 h-3" />}
                          </Button>
                          <Button
                          
                            size="xs"
                            color="red"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteImage(image.id)
                            }}
                          >
                            <HiTrash  className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <p className="text-xs font-medium text-gray-700 truncate">{image.nombre}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{image.categoria?.nombre}</p>
                    {type === "personal" && (
                      <Badge size="xs" color={image.status ? "success" : "red"}>
                        {image.status ? "Público" : "Privado"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de subida de imagen */}
      <Modal
        show={showUploadModal}
        onClose={() => {
          setShowUploadModal(false)
          setUploadForm({ nombre: "", categoriaId: "", file: null })
          setUploadErrors({})
        }}
        size="md"
      >
        <ModalHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <HiPlus className="w-5 h-5 text-purple-600" />
            <span>Agregar Nueva Imagen</span>
          </div>
        </ModalHeader>
        <ModalBody className="bg-white">
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <Label htmlFor="imageName" value="Nombre de la imagen" className="text-gray-700 font-medium" />
              <TextInput
                id="imageName"
                placeholder="Ej: Logo empresa, Producto destacado..."
                value={uploadForm.nombre}
                onChange={(e) => {
                  setUploadForm((prev) => ({ ...prev, nombre: e.target.value }))
                  if (uploadErrors.nombre) setUploadErrors((prev) => ({ ...prev, nombre: "" }))
                }}
                color={uploadErrors.nombre ? "failure" : "gray"}
                className="mt-1"
              />
              {uploadErrors.nombre && <p className="mt-1 text-sm text-red-600">{uploadErrors.nombre}</p>}
            </div>

            <div>
              <Label htmlFor="imageCategory" value="Categoría" className="text-gray-700 font-medium" />
              <Select
                id="imageCategory"
                value={uploadForm.categoriaId}
                onChange={(e) => {
                  setUploadForm((prev) => ({ ...prev, categoriaId: e.target.value }))
                  if (uploadErrors.categoriaId) setUploadErrors((prev) => ({ ...prev, categoriaId: "" }))
                }}
                color={uploadErrors.categoriaId ? "failure" : "gray"}
                className="mt-1"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))}
              </Select>
              {uploadErrors.categoriaId && <p className="mt-1 text-sm text-red-600">{uploadErrors.categoriaId}</p>}
            </div>

            <div>
              <Label htmlFor="imageFile" value="Archivo de imagen" className="text-gray-700 font-medium" />
              <FileInput
                id="imageFile"
                accept="image/*"
                onChange={(e) => {
                  setUploadForm((prev) => ({ ...prev, file: e.target.files[0] }))
                  if (uploadErrors.file) setUploadErrors((prev) => ({ ...prev, file: "" }))
                }}
                color={uploadErrors.file ? "failure" : "gray"}
                className="mt-1"
              />
              {uploadErrors.file && <p className="mt-1 text-sm text-red-600">{uploadErrors.file}</p>}
              <p className="mt-1 text-xs text-gray-500">Máximo 5MB. Formatos: JPG, PNG, GIF, WebP</p>
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="bg-white">
          <Button
            onClick={handleUpload}
            disabled={uploadLoading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {uploadLoading ? (
              <>
                <Spinner size="sm" light className="mr-2" />
                Subiendo...
              </>
            ) : (
              "Subir Imagen"
            )}
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setShowUploadModal(false)
              setUploadForm({ nombre: "", categoriaId: "", file: null })
              setUploadErrors({})
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ImageBank
