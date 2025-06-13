# 🧾 Información General del Proyecto

**Tipo de sistema:** Página web  
**Usuarios:** Cada usuario crea su cuenta (registro individual)  
**Rol único:** Sólo existe un tipo de usuario  
**Colores del sistema:** Predominantemente claros  
**Documentación:** Sólo se registrarán avances  

---

## 👤 Gestión de Usuarios

**Registro**  
Campos requeridos:  
- Nombre  
- Correo electrónico  
- Username (único)  
- Contraseña  

**Inicio de sesión**  
- Correo electrónico  
- Contraseña  

**Recuperación de contraseña**  
- Vía correo electrónico: el usuario solicita la recuperación y recibe un enlace o código

---

## 📁 Catálogos (Lienzos de trabajo)

- Los usuarios podrán crear catálogos (como proyectos de diseño)
- Cada catálogo puede contener múltiples páginas (lienzos)
- Al crear un catálogo:
  - Se elimina el panel derecho (catálogos)
  - Se mantiene el panel izquierdo (banco de imágenes)
- Opción de definir si el catálogo es:
  - Público: visible por otros usuarios
  - Privado: solo visible por el creador
- Esta opción siempre podrá editarse

**Los catálogos pueden contener:**
- Imágenes
- Textos
- Fondos
- Cards o figuras

**Exportación disponible:**
- Página individual (imagen o PDF)
- Catálogo completo (imágenes o PDF)

---

## 🎨 Editor de Catálogos

Funcionalidades similares a Canva o Word:

**Posibilidades de edición:**
- Posición de imagen, texto, fondo
- Tamaño y color de figuras
- Tipografía, tamaño y color del texto
- Agregar hasta 30 páginas por catálogo

**Elementos disponibles:**
- Plantillas prediseñadas (por el equipo)
- Fondos individuales
- Cards o figuras predefinidas

**Cada elemento puede modificarse en:**
- Tamaño
- Color
- Posición

**Filtros, categorías y descripciones de productos** (editables por el usuario)

---

## 🏞 Banco de Imágenes

**Ubicación:** Panel izquierdo  
**Funciones:**
- Mostrar imágenes globales
- Mostrar imágenes del usuario (por catálogo)
- Buscador por nombre o categoría

**Cada imagen:**
- Tiene nombre
- Tiene categoría
- Se conserva aunque el catálogo se elimine

---

## 🖥️ Interfaz de Usuario (UI)

**Layout principal:**

**Panel izquierdo:**
- Banco de imágenes (global + del usuario)
- Buscador por nombre o categoría

**Panel derecho:**
- Lista de catálogos del usuario y públicos
- Botón para crear catálogo
- Mensaje de bienvenida con el username

> Al crear un catálogo, se oculta el panel derecho y se conserva el banco de imágenes

---

## 📦 Gestión de Productos

Cada usuario puede configurar sus productos:  
- Añadir descripciones  
- Filtrar por categorías  
- Definir atributos personalizados  

---

## 🔐 Seguridad y Datos

- Username único (evita duplicaciones)
- Contraseñas encriptadas
- Autenticación por correo y contraseña
- Recuperación de acceso por correo
- Solo existe un tipo de usuario

---

# 📂 Estructura de Carpetas del Proyecto

📁 docs/ → Documentación del proyecto (avances, especificaciones)
📁 src/ → Código fuente principal de la aplicación
📁 assets/ → Imágenes, fondos y recursos gráficos utilizados
📁 tests/ → Pruebas del sistema (unitarias, integradas)
📁 data/ → Archivos de datos (mockups, plantillas, JSON de ejemplo)