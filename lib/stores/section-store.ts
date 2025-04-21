import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Section } from "@/lib/types"

interface SectionState {
  sections: Section[]
  addSection: (section: Section) => void
  updateSection: (section: Section) => void
  deleteSection: (id: string) => void
}

// Sample sections data
const initialSections: Section[] = [
  {
    id: "1",
    title: "Propósito",
    type: "primary",
    description: "Define the purpose of the system",
    content:
      "El propósito de este sistema es facilitar la generación de documentos URS mediante un enfoque multi-agente.",
    status: "in-progress",
  },
  {
    id: "2",
    title: "Alcance",
    type: "primary",
    description: "Define the scope of the system",
    content: "El alcance de este sistema incluye la generación, edición y exportación de documentos URS.",
    status: "not-started",
  },
  {
    id: "3",
    title: "Funcionalidades",
    type: "primary",
    description: "Define the functionalities of the system",
    content:
      "Las funcionalidades principales incluyen chat con agentes, carga de archivos, edición de secciones y exportación de documentos.",
    status: "not-started",
  },
  {
    id: "4",
    title: "Requisitos de Usuario",
    type: "secondary",
    description: "Define user requirements",
    content:
      "Los requisitos de usuario incluyen una interfaz intuitiva, capacidad de carga de archivos y exportación en múltiples formatos.",
    status: "not-started",
  },
  {
    id: "5",
    title: "Requisitos Funcionales",
    type: "secondary",
    description: "Define functional requirements",
    content:
      "Los requisitos funcionales incluyen procesamiento de lenguaje natural, integración con sistemas externos y gestión de documentos.",
    status: "not-started",
  },
  {
    id: "6",
    title: "Requisitos No Funcionales",
    type: "tertiary",
    description: "Define non-functional requirements",
    content: "Los requisitos no funcionales incluyen rendimiento, seguridad, escalabilidad y disponibilidad.",
    status: "done",
  },
]

export const useSectionStore = create<SectionState>()(
  persist(
    (set) => ({
      sections: initialSections,
      addSection: (section) =>
        set((state) => ({
          sections: [...state.sections, section],
        })),
      updateSection: (updatedSection) =>
        set((state) => ({
          sections: state.sections.map((section) => (section.id === updatedSection.id ? updatedSection : section)),
        })),
      deleteSection: (id) =>
        set((state) => ({
          sections: state.sections.filter((section) => section.id !== id),
        })),
    }),
    {
      name: "section-store",
    },
  ),
)
