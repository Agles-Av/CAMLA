import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button, TextInput, Label, Spinner, Alert } from "flowbite-react"
import { HiLockClosed, HiEye, HiEyeOff, HiExclamationCircle, HiCheckCircle } from "react-icons/hi"
import { validateResetPassword } from "./utils/resetPasswordValidations"
import { resetPassword } from "./service/authService"
import { AlertHelper } from "../../utilities/AlertHelper"

const ResetPasswordView = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Estados del formulario
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Estados de la vista
  const [token, setToken] = useState("")
  const [isValidToken, setIsValidToken] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Capturar token del URL al cargar el componente
  useEffect(() => {
    const urlToken = searchParams.get("token")

    if (!urlToken) {
      AlertHelper.showAlert("Enlace de restablecimiento inválido. Por favor solicita un nuevo enlace.", "error")
      setIsValidToken(false)
    } else {
      setToken(urlToken)
      setIsValidToken(true)
    }
  }, [searchParams])

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

    if (!isValidToken) {
      AlertHelper.showAlert("Token inválido. No se puede procesar la solicitud.", "error")
      return
    }

    // Validar formulario
    const validationErrors = validateResetPassword(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      await resetPassword({
        token: token,
        newPassword: formData.newPassword,
      })

      setIsSuccess(true)
      AlertHelper.showAlert("¡Tu contraseña fue actualizada con éxito!", "success")

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error al restablecer la contraseña. Verifica tu enlace o intenta nuevamente."
      AlertHelper.showAlert(errorMessage, "error")
    } finally {
      setIsLoading(false)
    }
  }

  // Redirigir al login si no hay token válido
  const handleBackToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            <h1 className="text-4xl font-bold mb-2">CAMLA</h1>
          </div>
          <p className="text-gray-600">Restablece tu contraseña</p>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Alerta si no hay token válido */}
          {!isValidToken && (
            <Alert color="failure" icon={HiExclamationCircle} className="mb-6 rounded-xl">
              <span className="font-medium">Enlace inválido!</span> Este enlace de restablecimiento no es válido o ha
              expirado.
            </Alert>
          )}

          {/* Alerta de éxito */}
          {isSuccess && (
            <Alert color="success" icon={HiCheckCircle} className="mb-6 rounded-xl">
              <span className="font-medium">¡Contraseña actualizada!</span> Serás redirigido al login en unos segundos.
            </Alert>
          )}

          {/* Formulario */}
          {isValidToken && !isSuccess && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm">Ingresa tu nueva contraseña para completar el restablecimiento.</p>
              </div>

              {/* Campo Nueva Contraseña */}
              <div>
                <Label htmlFor="newPassword" value="Nueva contraseña" className="text-gray-700 font-medium" />
                <div className="relative mt-2">
                  <TextInput
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    icon={HiLockClosed}
                    className="rounded-xl"
                    color={errors.newPassword ? "failure" : "gray"}
                    disabled={!isValidToken}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={!isValidToken}
                  >
                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Campo Confirmar Contraseña */}
              <div>
                <Label
                  htmlFor="confirmPassword"
                  value="Confirmar nueva contraseña"
                  className="text-gray-700 font-medium"
                />
                <div className="relative mt-2">
                  <TextInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    icon={HiLockClosed}
                    className="rounded-xl"
                    color={errors.confirmPassword ? "failure" : "gray"}
                    disabled={!isValidToken}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={!isValidToken}
                  >
                    {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Indicador de fortaleza de contraseña */}
              {formData.newPassword && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Fortaleza de la contraseña:</p>
                  <div className="space-y-1 text-xs">
                    <div
                      className={`flex items-center ${formData.newPassword.length >= 6 ? "text-green-600" : "text-gray-400"}`}
                    >
                      <span className="mr-2">{formData.newPassword.length >= 6 ? "✓" : "○"}</span>
                      Al menos 6 caracteres
                    </div>
                    <div
                      className={`flex items-center ${/[A-Z]/.test(formData.newPassword) ? "text-green-600" : "text-gray-400"}`}
                    >
                      <span className="mr-2">{/[A-Z]/.test(formData.newPassword) ? "✓" : "○"}</span>
                      Una letra mayúscula
                    </div>
                    <div
                      className={`flex items-center ${/[0-9]/.test(formData.newPassword) ? "text-green-600" : "text-gray-400"}`}
                    >
                      <span className="mr-2">{/[0-9]/.test(formData.newPassword) ? "✓" : "○"}</span>
                      Un número
                    </div>
                  </div>
                </div>
              )}

              {/* Botón Restablecer */}
              <Button
                type="submit"
                disabled={isLoading || !isValidToken}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl h-12"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" light className="mr-2" />
                    Restableciendo contraseña...
                  </>
                ) : (
                  "Restablecer contraseña"
                )}
              </Button>
            </form>
          )}

          {/* Botón volver al login */}
          <div className="mt-8 text-center">
            <button onClick={handleBackToLogin} className="text-purple-600 hover:text-purple-800 font-medium text-sm">
              ← Volver al inicio de sesión
            </button>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">Si tienes problemas con este enlace, contacta al soporte técnico.</p>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordView
