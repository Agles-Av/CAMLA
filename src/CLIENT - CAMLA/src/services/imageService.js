import AxiosClient from "../axios/AxiosClient"

/**
 * Obtener imágenes globales
 * @returns {Promise} Respuesta del servidor
 */
export const getGlobalImages = async () => {
  try {
    const response = await AxiosClient.get("/imagenes")
    return response.data.data
  } catch (error) {
    throw error
  }
}

/**
 * Obtener imágenes del usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise} Respuesta del servidor
 */
export const getUserImages = async (userId) => {
  try {
    const response = await AxiosClient.get(`/imagenes/usuario/${userId}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

/**
 * Subir nueva imagen
 * @param {FormData} formData - Datos del formulario con la imagen
 * @returns {Promise} Respuesta del servidor
 */
export const uploadImage = async (formData) => {
  try {
    const response = await AxiosClient.post("/imagenes/subir", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Eliminar imagen
 * @param {string} imageId - ID de la imagen
 * @returns {Promise} Respuesta del servidor
 */
export const deleteImage = async (imageId) => {
  try {
    const response = await AxiosClient.delete(`/imagenes/${imageId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Actualizar información de imagen
 * @param {string} imageId - ID de la imagen
 * @param {Object} imageData - Datos actualizados
 * @returns {Promise} Respuesta del servidor
 */
export const updateImage = async (imageId, imageData) => {
  try {
    const response = await AxiosClient.put(`/imagenes/${imageId}`, imageData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Cambiar estado público/privado de imagen
 * @param {string} imageId - ID de la imagen
 * @param {Object} statusData - Nuevo estado
 * @returns {Promise} Respuesta del servidor
 */
export const updateImageStatus = async (imageId, statusData) => {
  try {
    const response = await AxiosClient.patch(`/imagenes/status/${imageId}`, statusData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Buscar imágenes por término
 * @param {string} searchTerm - Término de búsqueda
 * @param {string} category - Categoría opcional
 * @returns {Promise} Respuesta del servidor
 */
export const searchImages = async (searchTerm, category = "") => {
  try {
    const params = new URLSearchParams()
    if (searchTerm) params.append("search", searchTerm)
    if (category) params.append("category", category)

    const response = await AxiosClient.get(`/imagenes/search?${params.toString()}`)
    return response.data
  } catch (error) {
    throw error
  }
}
