import AxiosClient from "../axios/AxiosClient"

/**
 * Obtener todas las categorías
 * @returns {Promise} Respuesta del servidor
 */
export const getCategories = async () => {
  try {
    console.log("Pedir categorias");
    
    const response = await AxiosClient({
      method: "GET",
      url: "/categorias/"
    })
    console.log("Data de categorias",response.data.data);
    
    return response.data.data
  } catch (error) {
    throw error
  }
}

/**
 * Obtener categoría por ID
 * @param {string} categoryId - ID de la categoría
 * @returns {Promise} Respuesta del servidor
 */
export const getCategoryById = async (categoryId) => {
  try {
    const response = await AxiosClient.get(`/categorias/${categoryId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * Obtener imágenes por categoría
 * @param {string} categoryId - ID de la categoría
 * @returns {Promise} Respuesta del servidor
 */
export const getImagesByCategory = async (categoryId) => {
  try {
    const response = await AxiosClient.get(`/categorias/${categoryId}/imagenes`)
    return response.data
  } catch (error) {
    throw error
  }
}
