"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const models = [
  {
    value: "gpt-4",
    label: "GPT-4",
  },
  {
    value: "gpt-3.5-turbo",
    label: "GPT-3.5 Turbo",
  },
  {
    value: "claude-3",
    label: "Claude 3",
  },
]

export function ModelSelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("gpt-4")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] justify-between rounded-md border-gray-200 transition-all duration-300 hover:border-primary hover:shadow-sm"
        >
          {value ? models.find((model) => model.value === value)?.label : "Select model..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 rounded-md shadow-md border-gray-100">
        <Command>
          <CommandInput placeholder="Search model..." className="rounded-t-md" />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  className="transition-colors duration-200"
                >
                  <Check className={cn("mr-2 h-4 w-4", value === model.value ? "opacity-100" : "opacity-0")} />
                  {model.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
