import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

export function DatePicker({ onSelectDate }: any) {
  const [date, setDate] = useState<Date>()

  const handleSelectDate = (selectedDate: any) => {
    setDate(selectedDate)
    onSelectDate(selectedDate.toISOString().split('T')[0])
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start text-left font-normal px-2",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 dark border bg-card text-card-foreground shadow" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}