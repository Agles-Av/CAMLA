import AxiosClient from "../axios/AxiosClient"

/**
 * Obtener catálogos del usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise} Respuesta del servidor
 */
export const getCatalogsByUser = async (userId) => {
  try {
    const response = await AxiosClient.get(`/catalogos/usuario/${userId}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

/**
 * Obtener catálogos públicos
 * @returns {Promise} Respuesta del servidor
 */
export const getPublicCatalogs = async () => {
  try {
    const response = await AxiosClient.get("/catalogos/publicos")
    return response.data.data
  } catch (error) {
    throw error
  }
}

/**
 * Obtener catálogo por ID
 * @param {string} catalogId - ID del catálogo
 * @returns {Promise} Respuesta del servidor
 */
export const getCatalogById = async (catalogId) => {
  try {
    const response = await AxiosClient.get(`/catalogos/${catalogId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Crear nuevo catálogo
 * @param {Object} catalogData - Datos del catálogo
 * @returns {Promise} Respuesta del servidor
 */
export const createCatalog = async (catalogData) => {
  try {
    const response = await AxiosClient.post("/catalogos/", catalogData)
    return response.data.data
  } catch (error) {
    throw error
  }
}

/**
 * Actualizar catálogo
 * @param {string} catalogId - ID del catálogo
 * @param {Object} catalogData - Datos actualizados
 * @returns {Promise} Respuesta del servidor
 */
export const updateCatalog = async (catalogId, catalogData) => {
  console.log("Data de catalogData",catalogData);
  
  try {
    const response = await AxiosClient.put(`/catalogos/${catalogId}`, catalogData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Cambiar estado público/privado del catálogo
 * @param {string} catalogId - ID del catálogo
 * @param {Object} statusData - Nuevo estado
 * @returns {Promise} Respuesta del servidor
 */
export const updateCatalogStatus = async (catalogId, statusData) => {
  try {
    const response = await AxiosClient.patch(`/catalogos/status/${catalogId}`, statusData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Eliminar catálogo
 * @param {string} catalogId - ID del catálogo
 * @returns {Promise} Respuesta del servidor
 */
export const deleteCatalog = async (catalogId) => {
  try {
    const response = await AxiosClient.delete(`/catalogos/${catalogId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Exportar catálogo como PDF
 * @param {string} catalogId - ID del catálogo
 * @param {Object} exportOptions - Opciones de exportación
 * @returns {Promise} Respuesta del servidor
 */
export const exportCatalogPDF = async (catalogId, exportOptions = {}) => {
  try {
    const response = await AxiosClient.post(`/catalogos/${catalogId}/export/pdf`, exportOptions, {
      responseType: "blob",
    })
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Exportar página como imagen
 * @param {string} catalogId - ID del catálogo
 * @param {number} pageIndex - Índice de la página
 * @param {Object} exportOptions - Opciones de exportación
 * @returns {Promise} Respuesta del servidor
 */
export const exportPageImage = async (catalogId, pageIndex, exportOptions = {}) => {
  try {
    const response = await AxiosClient.post(`/catalogos/${catalogId}/pages/${pageIndex}/export/image`, exportOptions, {
      responseType: "blob",
    })
    return response.data
  } catch (error) {
    throw error
  }
}
