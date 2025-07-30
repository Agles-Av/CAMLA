import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, Badge, Dropdown, Modal, Spinner, ToggleSwitch, TextInput, Label,ModalBody, ModalFooter, ModalHeader, DropdownItem,DropdownDivider } from "flowbite-react"
import { HiPlus, HiDotsVertical, HiPencil, HiTrash, HiEye, HiTemplate, HiDuplicate } from "react-icons/hi"
import  AuthConAtext from "../../context/AuthContext"
import { createCatalog, deleteCatalog, updateCatalogStatus } from "../../services/CatalogService"
import { getTemplates } from "../../services/PlantillaService"
import { validateCatalogName } from "../../validations/CatalogValidations"
import { AlertHelper } from "../../utilities/AlertHelper"

const CatalogCards = ({ catalogs, isLoading, onEdit, onRefresh }) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthConAtext)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCatalog, setSelectedCatalog] = useState(null)
  const [templates, setTemplates] = useState([])
  const [templatesLoading, setTemplatesLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [catalogName, setCatalogName] = useState("")
  const [nameError, setNameError] = useState("")



  // Cargar plantillas al abrir modal
  const handleOpenCreateModal = async () => {
    setShowCreateModal(true)
    setCatalogName("")
    setNameError("")

    try {
      setTemplatesLoading(true)
      const response = await getTemplates()
      setTemplates(response || [])
    } catch (error) {
      AlertHelper.showAlert("Error al cargar plantillas","error")
    } finally {
      setTemplatesLoading(false)
    }
  }

  // Crear catálogo
  const handleCreateCatalog = async (templateId = null) => {
    const name = catalogName.trim() || (templateId ? `Catálogo desde plantilla` : `Nuevo catálogo`)

    const nameValidation = validateCatalogName(name)
    if (nameValidation) {
      setNameError(nameValidation)
      return
    }

    try {
      setCreateLoading(true)

      const catalogData = {
        nombre: name,
        usuario: user,
        status: false,
        contenidoJson: JSON.stringify({
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
      console.log("Verificar el ID lo traiga",response.id);
      

      AlertHelper.showAlert("Catálogo creado correctamente","success")
      setShowCreateModal(false)
      setCatalogName("")
      onRefresh()

      // Redirigir al editor
      navigate(`/editor/${response.id}`)
    } catch (error) {
      AlertHelper.showAlert("Error al crear el catálogo","error")
      console.error("Create catalog error:", error)
    } finally {
      setCreateLoading(false)
    }
  }

  // Eliminar catálogo
  const handleDeleteCatalog = async () => {
    if (!selectedCatalog) return

    try {
      setDeleteLoading(true)
      await deleteCatalog(selectedCatalog.id)

      AlertHelper.showAlert("Catálogo eliminado correctamente","success")
      setShowDeleteModal(false)
      setSelectedCatalog(null)
      onRefresh()
    } catch (error) {
      AlertHelper.showAlert("Error al eliminar el catálogo","error")
      console.error("Delete catalog error:", error)
    } finally {
      setDeleteLoading(false)
    }
  }

  // Cambiar estado público/privado
  const handleToggleStatus = async (catalog, newStatus) => {
    try {
      await updateCatalogStatus(catalog.id, { status: newStatus })

      AlertHelper.showAlert(`Catálogo ${newStatus ? "publicado" : "marcado como privado"}`,"success")
      onRefresh()
    } catch (error) {
      AlertHelper.showAlert("Error al cambiar el estado del catálogo","error")
      console.error("Toggle status error:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
      </div>
    )
  }

  return (
    <div>
      {/* Botón crear catálogo */}
      <div className="mb-6">
        <Button
          onClick={handleOpenCreateModal}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          size="lg"
        >
          <HiPlus className="mr-2 h-5 w-5" />
          Crear Nuevo Catálogo
        </Button>
      </div>

      {/* Grid de catálogos */}
      {catalogs.length === 0 ? (
        <div className="text-center py-12">
          <HiTemplate className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No tienes catálogos aún</h3>
          <p className="text-gray-500 mb-6">Crea tu primer catálogo para comenzar a diseñar</p>
          <Button
            onClick={handleOpenCreateModal}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <HiPlus className="mr-2 h-4 w-4" />
            Crear Catálogo
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogs.map((catalog) => (
            <Card key={catalog.id} className="bg-gradient-to-r from-purple-900 to-blue-900 hover:from-purple-800 hover:to-blue-800">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 truncate" title={catalog.nombre}>
                    {catalog.nombre}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge color={catalog.status ? "success" : "gray"}>{catalog.status ? "Público" : "Privado"}</Badge>
                    <span className="text-sm text-gray-100">
                      {JSON.parse(catalog.contenidoJson || '{"pages":[]}').pages?.length || 0} páginas
                    </span>
                  </div>
                </div>

                {/* Menú de opciones */}
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<HiDotsVertical className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />}
                >
                  <DropdownItem icon={HiPencil} onClick={() => onEdit(catalog.id)}>
                    Editar catálogo
                  </DropdownItem>
                  <DropdownItem icon={HiEye} onClick={() => navigate(`/catalog/${catalog.id}`)}>
                    Ver catálogo
                  </DropdownItem>
                  <DropdownItem icon={HiDuplicate} onClick={() => console.log("Duplicar", catalog.id)}>
                    Duplicar
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem
                    icon={HiTrash}
                    onClick={() => {
                      setSelectedCatalog(catalog)
                      setShowDeleteModal(true)
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </DropdownItem>
                </Dropdown>
              </div>

              {/* Preview del catálogo */}
              <div className="bg-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={
                    `/preview.png`
                  }
                  alt={`Preview de ${catalog.nombre}`}
                  className="max-h-full max-w-full object-contain rounded"
                />
              </div>

              {/* Toggle público/privado */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-100">Estado público:</span>
                <ToggleSwitch checked={catalog.status} onChange={(checked) => handleToggleStatus(catalog, checked)} />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal crear catálogo */}
      <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)} size="lg">
        <ModalHeader>
          <div className="flex items-center space-x-2">
            <HiPlus className="w-5 h-5 text-purple-600" />
            <span>Crear Nuevo Catálogo</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            {/* Nombre del catálogo */}
            <div>
              <Label htmlFor="catalogName" value="Nombre del catálogo" className="text-gray-700 font-medium" />
              <TextInput
                id="catalogName"
                placeholder="Ej: Catálogo de productos 2024"
                value={catalogName}
                onChange={(e) => {
                  setCatalogName(e.target.value)
                  if (nameError) setNameError("")
                }}
                color={nameError ? "failure" : "gray"}
                className="mt-1"
              />
              {nameError && <p className="mt-1 text-sm text-red-600">{nameError}</p>}
            </div>

            <p className="text-gray-600">Elige una plantilla prediseñada o comienza con un catálogo en blanco</p>

            {/* Opción catálogo en blanco */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-400 transition-colors">
              <Button
                onClick={() => handleCreateCatalog()}
                disabled={createLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                {createLoading ? (
                  <>
                    <Spinner size="sm" light className="mr-2" />
                    Creando...
                  </>
                ) : (
                  <>
                    <HiPlus className="mr-2 h-5 w-5" />
                    Catálogo en Blanco
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-500 mt-2 text-center">Comienza desde cero con un lienzo vacío</p>
            </div>

            {/* Plantillas disponibles */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Plantillas Disponibles</h3>

              {templatesLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner size="lg" />
                </div>
              ) : templates.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay plantillas disponibles</p>
              ) : (
                <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-purple-300"
                      onClick={() => handleCreateCatalog(template.id)}
                    >
                      <img
                        src={
                          '/preview.png'
                        }
                        alt={template.nombre}
                        className="w-full h-20 object-cover rounded mb-2"
                      />
                      <h4 className="font-medium text-gray-800 text-sm truncate">{template.nombre}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{template.descripcion}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal confirmar eliminación */}
      <Modal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setSelectedCatalog(null)
        }}
        size="md"
      >
        <ModalHeader>Confirmar Eliminación</ModalHeader>
        <ModalBody>
          <div className="text-center">
            <HiTrash className="mx-auto mb-4 h-14 w-14 text-red-600" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              ¿Estás seguro de que quieres eliminar el catálogo "{selectedCatalog?.nombre}"?
            </h3>
            <p className="text-sm text-gray-400 mb-4">Esta acción no se puede deshacer.</p>
          </div>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button color="failure" onClick={handleDeleteCatalog} disabled={deleteLoading}>
            {deleteLoading ? (
              <>
                <Spinner size="sm" light className="mr-2" />
                Eliminando...
              </>
            ) : (
              "Sí, eliminar"
            )}
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setShowDeleteModal(false)
              setSelectedCatalog(null)
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CatalogCards
