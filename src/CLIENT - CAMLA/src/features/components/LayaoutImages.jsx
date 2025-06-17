import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

const LayaoutImages = () => {
    return (
        <>
            <Sidebar aria-label="Default sidebar example" className="w-64 h-screen fixed top-0 left-0 z-40 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <SidebarItems>
                    <SidebarItemGroup>
                        <SidebarItem href="#" icon={HiChartPie}>
                            Dashboard
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
                            Kanban
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiInbox} label="3">
                            Inbox
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiUser}>
                            Users
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiShoppingBag}>
                            Products
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiArrowSmRight}>
                            Sign In
                        </SidebarItem>
                        <SidebarItem href="#" icon={HiTable}>
                            Sign Up
                        </SidebarItem>
                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>

            <div className="p-4 sm:ml-64">
                <Outlet />
            </div>

        </>
    )
}

export default LayaoutImages