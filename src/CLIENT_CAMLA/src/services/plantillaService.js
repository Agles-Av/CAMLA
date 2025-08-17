import AxiosClient from "../axios/AxiosClient"


/**
 * Obtener todas las plantillas disponibles
 * @returns {Promise} Respuesta del servidor
 */
export const getTemplates = async () => {
  try {
    const response = await AxiosClient.get("/plantillas/")
    return response.data.data
  } catch (error) {
    throw error
  }
}

/**
 * Obtener plantilla por ID
 * @param {string} templateId - ID de la plantilla
 * @returns {Promise} Respuesta del servidor
 */
export const getTemplateById = async (templateId) => {
  try {
    const response = await AxiosClient.get(`/plantillas/${templateId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Obtener plantillas por categoría
 * @param {string} category - Categoría de plantillas
 * @returns {Promise} Respuesta del servidor
 */
export const getTemplatesByCategory = async (category) => {
  try {
    const response = await AxiosClient.get(`/plantillas/categoria/${category}`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Crear catálogo desde plantilla
 * @param {string} templateId - ID de la plantilla
 * @param {Object} catalogData - Datos del nuevo catálogo
 * @returns {Promise} Respuesta del servidor
 */
export const createCatalogFromTemplate = async (templateId, catalogData) => {
  try {
    const response = await AxiosClient.post(`/plantillas/${templateId}/crear-catalogo`, catalogData)
    return response.data
  } catch (error) {
    throw error
  }
}
