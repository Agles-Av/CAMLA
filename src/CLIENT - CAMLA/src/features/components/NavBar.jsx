import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Dropdown, Avatar, Button, DropdownHeader, DropdownItem } from "flowbite-react"
import { HiLogout, HiUser, HiCog, HiHome } from "react-icons/hi"
import AuthConAtext from "../../context/AuthContext"
import { logoutUser } from "../access-control/service/authService"
import { AlertHelper } from "../../utilities/AlertHelper"

const Navbar = () => {
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthConAtext)

  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch({ type: "LOGOUT" })
      AlertHelper.showAlert("Sesión cerrada correctamente", "success")
      navigate("/login")
    } catch (error) {
      AlertHelper.showAlert("Error al cerrar sesión", "error")
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                <h1 className="text-2xl font-bold">CAMLA</h1>
              </div>
            </button>

            <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
              <HiHome className="w-4 h-4" />
              <span>Sistema de Gestión de Catálogos</span>
            </div>
          </div>

          {/* Menú de usuario */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-700">{user?.name || user?.username}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>

            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Cerrar sesión
                </Button>
              }
            >
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
