"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MessageSquare, LayoutGrid, FileText, Download, Menu, X } from "lucide-react"

const navItems = [
  {
    name: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Overview",
    href: "/overview",
    icon: LayoutGrid,
  },
  {
    name: "Primary",
    href: "/sections/primary",
    icon: FileText,
  },
  {
    name: "Secondary",
    href: "/sections/secondary",
    icon: FileText,
  },
  {
    name: "Tertiary",
    href: "/sections/tertiary",
    icon: FileText,
  },
  {
    name: "Export",
    href: "/export",
    icon: Download,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={cn("fixed inset-0 z-40 bg-black/80 lg:hidden", isOpen ? "block" : "hidden")}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-900 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-32">
              <Image src="/images/procaps-logo.png" alt="Procaps Logo" fill className="object-contain" />
            </div>
          </Link>
          <button
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-6 px-4">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-4 py-3 text-sm font-medium transition-all duration-300",
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "bg-primary/80 text-white shadow-sm"
                      : "text-gray-600 hover:bg-accent hover:text-accent-foreground dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5",
                      pathname === item.href || pathname.startsWith(`${item.href}/`) ? "text-white" : "text-gray-400",
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <button
        className="fixed left-4 top-4 z-30 rounded-md bg-white p-2 shadow-md transition-transform duration-300 hover:scale-110 lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  )
}
