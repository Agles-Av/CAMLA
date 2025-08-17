import AxiosClient from '../../../axios/AxiosClient';
/**
 * Servicio para registrar un nuevo usuario
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.nombre - Nombre del usuario
 * @param {string} userData.email - Email del usuario
 * @param {string} userData.username - Username del usuario
 * @param {string} userData.password - Contraseña del usuario
 * @returns {Promise} Respuesta del servidor
 */
export const registerUser = async (userData) => {
  try {
    const data = {
      nombre: userData.nombre,
      email: userData.email,
      username: userData.username,
      password: userData.password,
    };


    const response = await AxiosClient({
        method: 'POST',
        url: '/auth/register',
        data: data,
    })
    return response
  } catch (error) {
    throw error
  }
}
