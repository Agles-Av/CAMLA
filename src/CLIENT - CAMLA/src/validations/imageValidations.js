/**
 * Valida los datos de una imagen
 * @param {Object} imageData - Datos de la imagen
 * @returns {Object} Objeto con los errores encontrados
 */
export const validateImageData = (imageData) => {
  const errors = {}

  // Validar nombre
  if (!imageData.nombre || imageData.nombre.trim().length === 0) {
    errors.nombre = "El nombre de la imagen es obligatorio"
  } else if (imageData.nombre.length > 100) {
    errors.nombre = "El nombre no puede exceder 100 caracteres"
  }

  // Validar categoría
  if (!imageData.categoriaId) {
    errors.categoriaId = "La categoría es obligatoria"
  }

  return errors
}

/**
 * Valida un archivo de imagen
 * @param {File} file - Archivo a validar
 * @returns {Object} Objeto con los errores encontrados
 */
export const validateImageFile = (file) => {
  const errors = {}

  if (!file) {
    errors.file = "Debes seleccionar un archivo"
    return errors
  }

  // Validar tipo de archivo
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
  if (!validTypes.includes(file.type)) {
    errors.file = "Tipo de archivo no válido. Solo se permiten: JPG, PNG, GIF, WebP"
  }

  // Validar tamaño (máximo 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB en bytes
  if (file.size > maxSize) {
    errors.file = "El archivo es demasiado grande. Máximo 5MB"
  }

  return errors
}

/**
 * Valida las dimensiones de una imagen
 * @param {number} width - Ancho de la imagen
 * @param {number} height - Alto de la imagen
 * @returns {Object} Objeto con los errores encontrados
 */
export const validateImageDimensions = (width, height) => {
  const errors = {}

  // Dimensiones mínimas
  if (width < 50 || height < 50) {
    errors.dimensions = "La imagen debe tener al menos 50x50 píxeles"
  }

  // Dimensiones máximas
  if (width > 4000 || height > 4000) {
    errors.dimensions = "La imagen no puede exceder 4000x4000 píxeles"
  }

  return errors
}

/**
 * Valida el nombre de una imagen
 * @param {string} name - Nombre a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateImageName = (name) => {
  if (!name || name.trim().length === 0) {
    return "El nombre de la imagen es obligatorio"
  }

  if (name.length > 100) {
    return "El nombre no puede exceder 100 caracteres"
  }

  if (name.length < 2) {
    return "El nombre debe tener al menos 2 caracteres"
  }

  return null
}
