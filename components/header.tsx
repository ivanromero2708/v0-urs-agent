import type React from "react"

interface HeaderProps {
  title: string
  children?: React.ReactNode
  actions?: React.ReactNode
}

export function Header({ title, children, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white px-6 py-5 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="procaps-header text-primary/90">{title}</h1>
          {children && <div className="mt-2">{children}</div>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
    </header>
  )
}
