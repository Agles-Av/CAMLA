import React from 'react'

const NotFound404 = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-12">
            <h1 className="text-7xl font-extrabold text-gray-900 mb-4">404</h1>
            <p className="text-2xl font-semibold text-gray-800 mb-2">
                Página no encontrada, Agles.
            </p>
            <p className="text-gray-600 text-center max-w-md mb-6">
                Esta ruta no existe o ya no está con nosotros. Pero no te preocupes, siempre hay vuelta atrás.
            </p>
            <a
                href="/"
                className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full shadow hover:bg-gray-800 transition-colors"
            >
                Volver al inicio
            </a>
        </div>
    )
}

export default NotFound404