import AxiosClient from '../../../axios/AxiosClient'

/**
 * Servicio para autenticar usuario
 * @param {Object} loginData - Datos de login
 * @param {string} loginData.email - Email del usuario
 * @param {string} loginData.password - Contraseña del usuario
 * @returns {Promise} Respuesta del servidor
 */
export const loginUser = async (loginData) => {
  try {
    const data = {
      email: loginData.email,
      password: loginData.password,
    }
    const response = await AxiosClient({
      method: 'POST',
      url: '/auth/login',
      data: data,
    })
    return response
  } catch (error) {
    // Re-lanzar el error para que sea manejado en el componente
    throw error
  }
}

/**
 * Servicio para enviar email de recuperación de contraseña
 * @param {string} email - Email del usuario
 * @returns {Promise} Respuesta del servidor
 */
export const sendRecoveryEmail = async (email) => {
  try {
    const response = await AxiosClient.post(`/auth/password/request-reset?email=${encodeURIComponent(email)}`)

    return response
  } catch (error) {
    // Re-lanzar el error para que sea manejado en el componente
    throw error
  }
}

/**
 * Servicio para verificar si el token es válido
 * @param {string} token - Token a verificar
 * @returns {Promise} Respuesta del servidor
 */
export const verifyToken = async (token) => {
  try {
    const response = await AxiosClient.post("/auth/verify-token", {
      token: token,
    })

    return response
  } catch (error) {
    throw error
  }
}

/**
 * Servicio para cerrar sesión
 * @returns {Promise} Respuesta del servidor
 */
export const logoutUser = async () => {
  try {
    const response = await AxiosClient.post("/auth/logout")

    // Limpiar localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    return response
  } catch (error) {
    // Aunque falle la petición, limpiamos el localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    throw error
  }
}

/**
 * Servicio para refrescar el token
 * @returns {Promise} Respuesta del servidor con nuevo token
 */
export const refreshToken = async () => {
  try {
    const response = await AxiosClient.post("/auth/refresh-token")

    // Actualizar token en localStorage si viene en la respuesta
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
    }

    return response
  } catch (error) {
    throw error
  }
}

/**
 * Servicio para obtener información del usuario actual
 * @returns {Promise} Respuesta del servidor con datos del usuario
 */
export const getCurrentUser = async () => {
  try {
    const response = await AxiosClient.get("/auth/me")

    return response
  } catch (error) {
    throw error
  }
}

/**
 * Servicio para cambiar contraseña
 * @param {Object} passwordData - Datos para cambio de contraseña
 * @param {string} passwordData.currentPassword - Contraseña actual
 * @param {string} passwordData.newPassword - Nueva contraseña
 * @param {string} passwordData.confirmPassword - Confirmación de nueva contraseña
 * @returns {Promise} Respuesta del servidor
 */
export const changePassword = async (passwordData) => {
  try {
    const response = await AxiosClient.post("/auth/change-password", {
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword,
      confirm_password: passwordData.confirmPassword,
    })

    return response
  } catch (error) {
    throw error
  }
}

/**
 * Servicio para restablecer contraseña con token
 * @param {Object} resetData - Datos para restablecer contraseña
 * @param {string} resetData.token - Token de restablecimiento
 * @param {string} resetData.newPassword - Nueva contraseña
 * @returns {Promise} Respuesta del servidor
 */
export const resetPassword = async (resetData) => {
  try {
    const response = await AxiosClient.post("/auth/password/reset", {
      token: resetData.token,
      newPassword: resetData.newPassword,
    })

    return response
  } catch (error) {
    // Re-lanzar el error para que sea manejado en el componente
    throw error
  }
}
