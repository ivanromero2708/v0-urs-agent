import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {index > 0 && <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />}
            {item.active ? (
              <span className="font-medium text-primary">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-primary transition-colors duration-200 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
