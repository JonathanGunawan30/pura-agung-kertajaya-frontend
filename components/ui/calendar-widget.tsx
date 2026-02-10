"use client"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getDay,
  parseISO
} from "date-fns"
import { id } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ActivityModal from "@/components/activity_modal"

export interface Activity {
  id: string
  title: string
  description: string
  time_info: string
  order_index: number
  location: string
  event_date: string
  entity_type: "pura" | "yayasan" | "pasraman"
}

interface CalendarWidgetProps {
  activities: Activity[]
  entityType?: "pura" | "yayasan" | "pasraman"
}

export function CalendarWidget({ activities, entityType = "pura" }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const [modalActivity, setModalActivity] = useState<Activity | null>(null)

  const themeConfig = {
    pura: {
      headerText: "text-orange-600",
      bgSelected: "bg-orange-600 text-white shadow-orange-200",
      bgToday: "border-orange-600 text-orange-700 font-bold bg-orange-50",
      dot: "bg-orange-500",
      cardBorder: "border-l-orange-500",
      buttonHover: "hover:bg-orange-50 hover:text-orange-600",
    },
    yayasan: {
      headerText: "text-blue-600",
      bgSelected: "bg-blue-600 text-white shadow-blue-200",
      bgToday: "border-blue-600 text-blue-700 font-bold bg-blue-50",
      dot: "bg-blue-500",
      cardBorder: "border-l-blue-500",
      buttonHover: "hover:bg-blue-50 hover:text-blue-600",
    },
    pasraman: {
      headerText: "text-emerald-600",
      bgSelected: "bg-emerald-600 text-white shadow-emerald-200",
      bgToday: "border-emerald-600 text-emerald-700 font-bold bg-emerald-50",
      dot: "bg-emerald-500",
      cardBorder: "border-l-emerald-500",
      buttonHover: "hover:bg-emerald-50 hover:text-emerald-600",
    },
  }

  const theme = themeConfig[entityType]

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const startingDayIndex = getDay(monthStart)

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const selectedActivities = activities.filter(act => {
    if (!act.event_date) return false
    return isSameDay(parseISO(act.event_date), selectedDate)
  })

  selectedActivities.sort((a, b) => {
    if (a.order_index !== b.order_index) {
      return a.order_index - b.order_index
    }
    return (a.time_info || "").localeCompare(b.time_info || "")
  })

  return (
      <>
        <div className="flex flex-col lg:flex-row gap-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8">

          {/* BAGIAN KIRI: KALENDER */}
          <div className="w-full lg:w-7/12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize flex items-center gap-2">
                {format(currentDate, "MMMM yyyy", { locale: id })}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={goToToday} className="mr-2 text-xs h-8">
                  Hari Ini
                </Button>
                <Button variant="outline" size="icon" onClick={prevMonth} className={`h-9 w-9 ${theme.buttonHover}`}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth} className={`h-9 w-9 ${theme.buttonHover}`}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 mb-4">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    {day}
                  </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 lg:gap-3">
              {Array.from({ length: startingDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} />
              ))}

              {daysInMonth.map((day) => {
                const isToday = isSameDay(day, new Date())
                const isSelected = isSameDay(day, selectedDate)
                const isCurrentMonth = isSameMonth(day, currentDate)

                const hasActivity = activities.some(act =>
                    act.event_date && isSameDay(parseISO(act.event_date), day)
                )

                return (
                    <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        className={`
                    relative h-12 w-full lg:h-14 rounded-2xl flex flex-col items-center justify-center text-sm font-medium transition-all duration-200
                    ${!isCurrentMonth && "opacity-30"}
                    ${isSelected
                            ? `shadow-lg scale-105 ${theme.bgSelected}`
                            : isToday
                                ? `border-2 ${theme.bgToday}`
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }
                  `}
                    >
                      <span>{format(day, "d")}</span>

                      {hasActivity && (
                          <span className={`absolute bottom-2 w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : theme.dot}`} />
                      )}
                    </button>
                )
              })}
            </div>
          </div>

          <div className="w-full lg:w-5/12 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800 pt-8 lg:pt-0 lg:pl-8">
            <div className="h-full flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <CalendarIcon className={`w-5 h-5 ${theme.headerText}`} />
                  Agenda: <span className={theme.headerText}>{format(selectedDate, "d MMMM yyyy", { locale: id })}</span>
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedActivities.length} kegiatan terjadwal.
                </p>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 pb-4">
                {selectedActivities.length > 0 ? (
                    selectedActivities.map((act) => (
                        <div
                            key={act.id}
                            onClick={() => setModalActivity(act)}
                            className={`
                      group cursor-pointer relative bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border-l-4 ${theme.cardBorder} 
                      animate-in fade-in slide-in-from-bottom-2 duration-300
                      hover:shadow-md hover:bg-white dark:hover:bg-gray-800 hover:-translate-y-1 transition-all
                    `}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                              {act.title}
                            </h4>
                            <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {act.time_info && (
                                <Badge variant="outline" className="bg-white dark:bg-gray-900 border-gray-200 text-gray-600 gap-1 font-normal text-[11px] px-2 py-0.5">
                                  <Clock className="w-3 h-3" /> {act.time_info}
                                </Badge>
                            )}
                            {act.location && (
                                <Badge variant="outline" className="bg-white dark:bg-gray-900 border-gray-200 text-gray-600 gap-1 font-normal text-[11px] px-2 py-0.5">
                                  <MapPin className="w-3 h-3" /> {act.location}
                                </Badge>
                            )}
                          </div>

                          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                            {act.description}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-2 font-medium">Klik untuk detail</p>
                        </div>
                    ))
                ) : (
                    <div className="h-40 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-full mb-3 shadow-sm">
                        <CalendarIcon className="w-6 h-6 text-gray-300" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Tidak ada kegiatan</p>
                      <p className="text-xs text-gray-500 mt-1">Pilih tanggal lain yang bertanda titik.</p>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {modalActivity && (
            <ActivityModal
                activity={modalActivity}
                onClose={() => setModalActivity(null)}
            />
        )}
      </>
  )
}