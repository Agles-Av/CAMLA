import { useState } from "react"
import { Button, Spinner } from "flowbite-react"
import { HiEye, HiEyeOff, HiExclamationCircle } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

const RegisterForm = ({ onSubmit, isLoading }) =>  {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    username: "",
    password: "", 
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  // Función para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Función para validar todos los campos
  const validateForm = () => {
    const newErrors = {}

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "El formato del correo no es válido"
    }

    // Validar username
    if (!formData.username.trim()) {
      newErrors.username = "El username es obligatorio"
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
      {/* Título del formulario */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear Cuenta</h2>
        <p className="text-gray-600">Completa todos los campos para registrarte</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              errors.nombre
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-purple-200 focus:border-purple-500 bg-purple-50/30"
            }`}
            placeholder="Ingresa tu nombre completo"
            disabled={isLoading}
          />
          {errors.nombre && (
            <div className="flex items-center mt-2 text-red-600">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">{errors.nombre}</span>
            </div>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Correo Electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              errors.email
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-blue-200 focus:border-blue-500 bg-blue-50/30"
            }`}
            placeholder="ejemplo@correo.com"
            disabled={isLoading}
          />
          {errors.email && (
            <div className="flex items-center mt-2 text-red-600">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">{errors.email}</span>
            </div>
          )}
        </div>

        {/* Campo Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
            Username *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
              errors.username
                ? "border-red-300 focus:border-red-500 bg-red-50"
                : "border-pink-200 focus:border-pink-500 bg-pink-50/30"
            }`}
            placeholder="Elige un username único"
            disabled={isLoading}
          />
          {errors.username && (
            <div className="flex items-center mt-2 text-red-600">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">{errors.username}</span>
            </div>
          )}
        </div>

        {/* Campo Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
            Contraseña *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none transition-all ${
                errors.password
                  ? "border-red-300 focus:border-red-500 bg-red-50"
                  : "border-purple-200 focus:border-purple-500 bg-purple-50/30"
              }`}
              placeholder="Mínimo 6 caracteres"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center mt-2 text-red-600">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">{errors.password}</span>
            </div>
          )}
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Registrando...
            </>
          ) : (
            "Registrar Usuario"
          )}
        </button>
      </form>

      {/* Enlace para iniciar sesión */}
      <div className="text-center mt-6">
        <p className="text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="inline-block text-purple-600 hover:text-purple-700 font-semibold bg-transparent border-none p-0 m-0 underline focus:outline-none focus:underline transition-colors"
            disabled={isLoading}
          >
            Iniciar sesión
          </button>
        </p>
      </div>
    </div>
  )
}


export default  RegisterForm