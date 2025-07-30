import React, { useContext, Suspense, lazy } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'

import AuthContext from '../context/AuthContext'
import SpinnerLazy from '../utilities/SpinnerLazy'
import NotFound404 from '../utilities/error-pages/NotFound404'

const AppRouter = () => {
    //impotaciones con lazy
    const Login = lazy(() => import('../features/access-control/Login'));
    const Register = lazy(() => import('../features/access-control/UserRegister'));
    const RecoverPassword = lazy(() => import('../features/access-control/ResetPasswordView'));
    const DashboardView = lazy(() => import('../features/components/DashboardView'));
    const EditorView = lazy(() => import('../features/editor/EditorView'))
    const LayoutImages = lazy(() => import('../features/components/LayaoutImages'))
    //manejo de contexto para la auntenticacion
    const { user, token } = useContext(AuthContext);
    //validar token y usuario
    const isAuthenticated = user && token;
    // if (!isAuthenticated) {
    //     console.log('No hay usuario autenticado o token no válido');
    //     return <SpinnerLazy />
    // }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {/* Ruta de login */}
                <Route
                    path='/login'
                    element={
                        <Suspense fallback={<SpinnerLazy />}>
                            {!isAuthenticated ? <Login /> : <Navigate to='/' replace />}
                        </Suspense>
                    }
                />
                {/* Ruta de registro */}
                <Route
                    path='/register'
                    element={
                        <Suspense fallback={<SpinnerLazy />}>
                            {!isAuthenticated ? <Register /> : <Navigate to='/' replace />}
                        </Suspense>
                    }
                />
                {/* Ruta de recuperación de contraseña */}
                <Route
                    path='/reset-password'
                    element={
                        <Suspense fallback={<SpinnerLazy />}>
                            {!isAuthenticated ? <RecoverPassword /> : <Navigate to='/' replace />}
                        </Suspense>
                    }
                />

                {/* Ruta del dashboard del usuario */}
                <Route
                    path='/'
                    element={
                        <Suspense fallback={<SpinnerLazy />}>
                           {isAuthenticated ? <DashboardView /> : <Navigate to='/login' replace />} 
                        </Suspense>
                    }

                >
              
                </Route>
                <Route 
                path='/editor/:catalogId'
                element={
                    <Suspense fallback={<SpinnerLazy/>}>
                        {isAuthenticated ? <EditorView/> : <Navigate to='/' replace />}
                    </Suspense>
                }
                />

                {/* Ruta de error 404 */}
                <Route
                    path='*'
                    element={
                        <Suspense fallback={<SpinnerLazy />}>
                            {!isAuthenticated ? <NotFound404 /> : <Navigate to='/' replace />}
                        </Suspense>
                    }
                />
            </>
        )
    );

    return <RouterProvider router={router} />
}

export default AppRouter