/**
 * Valida los datos del formulario de restablecimiento de contraseña
 * @param {Object} data - Datos del formulario
 * @param {string} data.newPassword - Nueva contraseña
 * @param {string} data.confirmPassword - Confirmación de la nueva contraseña
 * @returns {Object} Objeto con los errores encontrados
 */
export const validateResetPassword = (data) => {
  const errors = {}

  // Validar nueva contraseña
  if (!data.newPassword) {
    errors.newPassword = "La nueva contraseña es obligatoria"
  } else if (data.newPassword.length < 6) {
    errors.newPassword = "La contraseña debe tener al menos 6 caracteres"
  } else if (!isPasswordStrong(data.newPassword)) {
    errors.newPassword = "La contraseña debe ser más segura (incluye mayúsculas, números)"
  }

  // Validar confirmación de contraseña
  if (!data.confirmPassword) {
    errors.confirmPassword = "Debes confirmar tu nueva contraseña"
  } else if (data.newPassword !== data.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden"
  }

  return errors
}

/**
 * Valida solo el campo de nueva contraseña
 * @param {string} password - Contraseña a validar
 * @returns {string|null} Mensaje de error o null si es válida
 */
export const validateNewPassword = (password) => {
  if (!password) {
    return "La nueva contraseña es obligatoria"
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres"
  }

  if (!isPasswordStrong(password)) {
    return "La contraseña debe incluir al menos una mayúscula y un número"
  }

  return null
}

/**
 * Evalúa la fortaleza de una contraseña
 * @param {string} password - Contraseña a evaluar
 * @returns {boolean} True si la contraseña es fuerte
 */
const isPasswordStrong = (password) => {
  // Criterios mínimos para una contraseña fuerte
  const hasMinLength = password.length >= 6
  const hasUpperCase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  return hasMinLength && hasUpperCase && hasNumber
}

/**
 * Obtiene el nivel de fortaleza de una contraseña
 * @param {string} password - Contraseña a evaluar
 * @returns {Object} Objeto con información detallada de la fortaleza
 */
export const getPasswordStrength = (password) => {
  const result = {
    score: 0,
    level: "weak",
    feedback: [],
    criteria: {
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
    },
  }

  if (!password) {
    result.feedback.push("Ingresa una contraseña")
    return result
  }

  // Evaluar criterios
  if (password.length >= 6) {
    result.criteria.minLength = true
    result.score += 1
  } else {
    result.feedback.push("Al menos 6 caracteres")
  }

  if (/[A-Z]/.test(password)) {
    result.criteria.hasUpperCase = true
    result.score += 1
  } else {
    result.feedback.push("Una letra mayúscula")
  }

  if (/[a-z]/.test(password)) {
    result.criteria.hasLowerCase = true
    result.score += 1
  } else {
    result.feedback.push("Una letra minúscula")
  }

  if (/[0-9]/.test(password)) {
    result.criteria.hasNumber = true
    result.score += 1
  } else {
    result.feedback.push("Un número")
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.criteria.hasSpecialChar = true
    result.score += 1
  } else {
    result.feedback.push("Un carácter especial")
  }

  // Determinar nivel
  if (result.score >= 4) {
    result.level = "strong"
  } else if (result.score >= 2) {
    result.level = "medium"
  } else {
    result.level = "weak"
  }

  return result
}

/**
 * Valida que las contraseñas coincidan
 * @param {string} password - Contraseña original
 * @param {string} confirmPassword - Confirmación de contraseña
 * @returns {string|null} Mensaje de error o null si coinciden
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "Debes confirmar tu contraseña"
  }

  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden"
  }

  return null
}
