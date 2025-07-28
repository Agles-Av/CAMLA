/**
 * Valida los datos de un catálogo
 * @param {Object} catalogData - Datos del catálogo
 * @returns {Object} Objeto con los errores encontrados
 */
export const validateCatalogData = (catalogData) => {
  const errors = {}

  // Validar nombre
  if (!catalogData.nombre || catalogData.nombre.trim().length === 0) {
    errors.nombre = "El nombre del catálogo es obligatorio"
  } else if (catalogData.nombre.length > 100) {
    errors.nombre = "El nombre no puede exceder 100 caracteres"
  }

  // Validar descripción si existe
  if (catalogData.descripcion && catalogData.descripcion.length > 500) {
    errors.descripcion = "La descripción no puede exceder 500 caracteres"
  }

  // Validar páginas
  if (catalogData.pages && catalogData.pages.length > 30) {
    errors.pages = "Un catálogo no puede tener más de 30 páginas"
  }

  // Validar usuarioId
  if (!catalogData.usuarioId) {
    errors.usuarioId = "El ID del usuario es obligatorio"
  }

  return errors
}

/**
 * Valida los datos de una página del catálogo
 * @param {Object} pageData - Datos de la página
 * @returns {Object} Objeto con los errores encontrados
 */
export const validatePageData = (pageData) => {
  const errors = {}

  // Validar elementos
  if (pageData.elements && pageData.elements.length > 50) {
    errors.elements = "Una página no puede tener más de 50 elementos"
  }

  // Validar background
  if (pageData.background) {
    if (!pageData.background.type || !["color", "image"].includes(pageData.background.type)) {
      errors.background = "Tipo de fondo inválido"
    }

    if (pageData.background.type === "color" && !isValidColor(pageData.background.value)) {
      errors.background = "Color de fondo inválido"
    }
  }

  return errors
}

/**
 * Valida los datos de un elemento del canvas
 * @param {Object} elementData - Datos del elemento
 * @returns {Object} Objeto con los errores encontrados
 */
export const validateElementData = (elementData) => {
  const errors = {}

  // Validar tipo
  if (!elementData.type || !["text", "image", "shape"].includes(elementData.type)) {
    errors.type = "Tipo de elemento inválido"
  }

  // Validar posición
  if (
    !elementData.position ||
    typeof elementData.position.x !== "number" ||
    typeof elementData.position.y !== "number"
  ) {
    errors.position = "Posición del elemento inválida"
  }

  // Validar tamaño
  if (!elementData.size || elementData.size.width <= 0 || elementData.size.height <= 0) {
    errors.size = "Tamaño del elemento inválido"
  }

  // Validaciones específicas por tipo
  if (elementData.type === "text") {
    if (!elementData.data || !elementData.data.text) {
      errors.text = "El texto es obligatorio"
    }

    if (
      elementData.data &&
      elementData.data.fontSize &&
      (elementData.data.fontSize < 8 || elementData.data.fontSize > 72)
    ) {
      errors.fontSize = "El tamaño de fuente debe estar entre 8 y 72 píxeles"
    }
  }

  if (elementData.type === "image") {
    if (!elementData.data || !elementData.data.url) {
      errors.image = "La URL de la imagen es obligatoria"
    }
  }

  return errors
}

/**
 * Valida si un color es válido (hex)
 * @param {string} color - Color a validar
 * @returns {boolean} True si el color es válido
 */
const isValidColor = (color) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

/**
 * Valida el nombre de un catálogo
 * @param {string} name - Nombre a validar
 * @returns {string|null} Mensaje de error o null si es válido
 */
export const validateCatalogName = (name) => {
  if (!name || name.trim().length === 0) {
    return "El nombre del catálogo es obligatorio"
  }

  if (name.length > 100) {
    return "El nombre no puede exceder 100 caracteres"
  }

  if (name.length < 3) {
    return "El nombre debe tener al menos 3 caracteres"
  }

  return null
}
