import { useState } from "react"
import RegisterForm from "./RegisterForm"
import { registerUser } from "./service/registerService"


import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react"
import { Alert } from "flowbite-react"
import { HiInformationCircle, HiCheckCircle } from "react-icons/hi"


const UserRegister = () => {
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)

    // Función para manejar el envío del formulario
    const handleFormSubmit = (data) => {
        setFormData(data)
        setShowModal(true)
    }

    // Función para confirmar el registro
    const handleConfirmRegister = async () => {
        setShowModal(false)
        setIsLoading(true)
        try {
            console.log("login");
            
            await registerUser(formData)
            setIsLoading(false)
            setShowSuccessAlert(true)

            // Ocultar alerta después de 5 segundos
            setTimeout(() => {
                setShowSuccessAlert(false)
            }, 5000)
        } catch (error) {
            setIsLoading(false)
            // Aquí puedes mostrar un mensaje de error si lo deseas
            // Por ejemplo: setShowErrorAlert(true)
            console.error("Error en el registro:", error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header del sistema */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                        CAMLA
                    </h1>
                    <p className="text-gray-600 mt-2">Sistema de Gestión</p>
                </div>

                {/* Alerta de éxito */}
                {showSuccessAlert && (
                    <div className="mb-6">
                        <Alert color="success" icon={HiCheckCircle}>
                            <span className="font-medium">¡Registro exitoso!</span> Tu cuenta ha sido creada correctamente.
                        </Alert>
                    </div>
                )}

                {/* Formulario de registro */}
                <RegisterForm onSubmit={handleFormSubmit} isLoading={isLoading} />

                {/* Modal de confirmación */}
                <Modal show={showModal} onClose={() => setShowModal(false)} size="md">
                    <ModalHeader className="bg">
                        <div className="flex items-center">
                            <HiInformationCircle className="w-6 h-6 text-blue-600 mr-2" />
                            Confirmar Registro
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <p className="text-gray-700">¿Confirmas que los datos son correctos?</p>
                            {formData && (
                                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                    <p>
                                        <span className="font-semibold">Nombre:</span> {formData.nombre}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Correo:</span> {formData.email}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Username:</span> {formData.username}
                                    </p>
                                </div>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmRegister}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all"
                            >
                                Confirmar
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}

export default UserRegister