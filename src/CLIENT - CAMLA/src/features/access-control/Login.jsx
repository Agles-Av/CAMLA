import { useState, useContext } from "react"
import { replace, useNavigate } from "react-router-dom"
import { Button, TextInput, Label, Modal, Spinner, ModalBody, ModalFooter, ModalHeader } from "flowbite-react"
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi"
import AuthContext from "../../context/AuthContext"
import { validateLoginForm } from "./utils/LoginValidations"
import { loginUser, sendRecoveryEmail } from "./service/authService"
import { AlertHelper } from "../../utilities/AlertHelper"

const LoginView = () => {
  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)

  // Estados del formulario principal
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Estados del modal de recuperación
  const [showRecoveryModal, setShowRecoveryModal] = useState(false)
  const [recoveryEmail, setRecoveryEmail] = useState("")
  const [recoveryLoading, setRecoveryLoading] = useState(false)
  const [recoveryError, setRecoveryError] = useState("")

  // Manejar cambios en el formulario
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
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar formulario
    const validationErrors = validateLoginForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const response = await loginUser(formData)

      // Guardar en localStorage
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))

      // Actualizar contexto
      dispatch({
        type: "LOGIN",
        payload: {
          token: response.data.token,
          user: response.data.user,
        },
      })

      AlertHelper.showAlert("¡Bienvenido a CAMLA!", "success")
      navigate("/", { replace: true })
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales."
      AlertHelper.showAlert(errorMessage, "error")
      console.log(errorMessage);
      
    } finally {
      setIsLoading(false)
    }
  }

  // Manejar recuperación de contraseña
  const handlePasswordRecovery = async () => {
    if (!recoveryEmail) {
      setRecoveryError("Por favor ingresa tu correo electrónico")
      return
    }

    if (!/\S+@\S+\.\S+/.test(recoveryEmail)) {
      setRecoveryError("Por favor ingresa un correo electrónico válido")
      return
    }

    setRecoveryLoading(true)
    setRecoveryError("")

    try {
      await sendRecoveryEmail(recoveryEmail)
      AlertHelper.showAlert("Se ha enviado un enlace de recuperación a tu correo electrónico")
      setShowRecoveryModal(false)
      setRecoveryEmail("")
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error al enviar el correo de recuperación"
      setRecoveryError(errorMessage)
    } finally {
      setRecoveryLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            <h1 className="text-4xl font-bold mb-2">CAMLA</h1>
          </div>
          <p className="text-gray-600">Inicia sesión en tu cuenta</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Email */}
            <div>
              <Label htmlFor="email" value="Correo electrónico" className="text-gray-700 font-medium" />
              <div className="relative mt-2">
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  icon={HiMail}
                  className="rounded-xl"
                  color={errors.email ? "failure" : "gray"}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div>
              <Label htmlFor="password" value="Contraseña" className="text-gray-700 font-medium" />
              <div className="relative mt-2">
                <TextInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  icon={HiLockClosed}
                  className="rounded-xl"
                  color={errors.password ? "failure" : "gray"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Enlace recuperar contraseña */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowRecoveryModal(true)}
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Botón Iniciar Sesión */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl h-12"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" light className="mr-2" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </form>

          {/* Enlace a registro */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Recuperación de Contraseña */}
      <Modal
        show={showRecoveryModal}
        onClose={() => {
          setShowRecoveryModal(false)
          setRecoveryEmail("")
          setRecoveryError("")
        }}
        size="md"
        className="rounded-2xl"
      >
        <ModalHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
          Recuperar Contraseña
        </ModalHeader>
        <ModalBody className="p-6">
          <div className="space-y-4">
            <p className="text-gray-600">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>

            <div>
              <Label htmlFor="recoveryEmail" value="Correo electrónico" className="text-gray-700 font-medium" />
              <TextInput
                id="recoveryEmail"
                type="email"
                placeholder="tu@correo.com"
                value={recoveryEmail}
                onChange={(e) => {
                  setRecoveryEmail(e.target.value)
                  setRecoveryError("")
                }}
                icon={HiMail}
                className="mt-2 rounded-xl"
                color={recoveryError ? "failure" : "gray"}
              />
              {recoveryError && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">⚠️</span>
                  {recoveryError}
                </p>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-end space-x-3 p-6">
          <Button
            color="gray"
            onClick={() => {
              setShowRecoveryModal(false)
              setRecoveryEmail("")
              setRecoveryError("")
            }}
            className="rounded-xl"
          >
            Cancelar
          </Button>
          <Button
            onClick={handlePasswordRecovery}
            disabled={recoveryLoading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl"
          >
            {recoveryLoading ? (
              <>
                <Spinner size="sm" light className="mr-2" />
                Enviando...
              </>
            ) : (
              "Enviar enlace"
            )}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default LoginView
