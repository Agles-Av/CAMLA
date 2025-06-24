/**
 * Valida los datos del formulario de login
 * @param {Object} formData - Datos del formulario
 * @param {string} formData.email - Email del usuario
 * @param {string} formData.password - Contraseña del usuario
 * @returns {Object} Objeto con los errores encontrados
 */
export const validateLoginForm = (formData) => {
  const errors = {}

  // Validar email
  if (!formData.email) {
    errors.email = "El correo electrónico es obligatorio"
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Por favor ingresa un correo electrónico válido"
  }

  // Validar contraseña
  if (!formData.password) {
    errors.password = "La contraseña es obligatoria"
  } else if (formData.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres"
  }

  return errors
}

/**
 * Valida el formato de un email
 * @param {string} email - Email a validar
 * @returns {boolean} True si el email es válido
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida solo el email para recuperación de contraseña
 * @param {string} email - Email a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateRecoveryEmail = (email) => {
  if (!email) {
    return "El correo electrónico es obligatorio"
  }

  if (!isValidEmail(email)) {
    return "Por favor ingresa un correo electrónico válido"
  }

  return null
}

/**
 * Valida la fortaleza de una contraseña
 * @param {string} password - Contraseña a validar
 * @returns {Object} Objeto con información sobre la fortaleza
 */
export const validatePasswordStrength = (password) => {
  const result = {
    isValid: false,
    score: 0,
    feedback: [],
  }

  if (!password) {
    result.feedback.push("La contraseña es obligatoria")
    return result
  }

  // Longitud mínima
  if (password.length < 6) {
    result.feedback.push("Debe tener al menos 6 caracteres")
  } else {
    result.score += 1
  }

  // Contiene números
  if (/\d/.test(password)) {
    result.score += 1
  } else {
    result.feedback.push("Incluye al menos un número")
  }

  // Contiene letras minúsculas
  if (/[a-z]/.test(password)) {
    result.score += 1
  } else {
    result.feedback.push("Incluye al menos una letra minúscula")
  }

  // Contiene letras mayúsculas
  if (/[A-Z]/.test(password)) {
    result.score += 1
  } else {
    result.feedback.push("Incluye al menos una letra mayúscula")
  }

  // Contiene caracteres especiales
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.score += 1
  }

  result.isValid = result.score >= 2 && password.length >= 6

  return result
}
