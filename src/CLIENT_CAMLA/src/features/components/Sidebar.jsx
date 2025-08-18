"use client"

import { useState } from "react"
import { Tabs } from "flowbite-react"
import { HiPhotograph, HiUser, HiGlobeAlt } from "react-icons/hi"
import ImageBank from "./Imagebank"

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="flex flex-col h-full">
      {/* Header del sidebar */}
  <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <HiPhotograph className="w-6 h-6 text-purple-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Banco de Imágenes</h2>
            <p className="text-sm text-gray-600">Explora y gestiona recursos</p>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="flex-1 overflow-y-auto">
        <Tabs
          aria-label="Banco de imágenes"
          onActiveTabChange={(tab) => setActiveTab(tab)}
          className="h-full"
        >
          <Tabs.Item active title="Banco Global" icon={HiGlobeAlt}>
            <div className="h-full overflow-y-auto">
              <ImageBank type="global" />
            </div>
          </Tabs.Item>

          <Tabs.Item title="Tus Imágenes" icon={HiUser}>
            <div className="h-full overflow-y-auto">
              <ImageBank type="personal" />
            </div>
          </Tabs.Item>
        </Tabs>
      </div>

    </div>
  )
}

export default Sidebar
