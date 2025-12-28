"use client"

import { useEffect } from "react"
import { User, ChevronDown } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

export interface Member {
    id: string
    name: string
    position: string
    position_order: number
    order_index: number
}

type EntityType = "pura" | "yayasan" | "pasraman"

interface OrganizationContentProps {
    initialData: Member[]
    entityType: EntityType
    title?: string
    subtitle?: string
}

export default function OrganizationContent({ 
    initialData, 
    entityType,
    title = "Struktur Organisasi",
    subtitle = "Susunan Pengurus"
}: OrganizationContentProps) {
    
    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    const themeConfig = {
        pura: {
            line: "bg-orange-600",
            text: "text-orange-600",
            numberBg: "bg-orange-600 shadow-orange-600/20",
            borderLeft: "border-orange-400",
            hoverBorder: "hover:border-orange-200 dark:hover:border-orange-900",
            iconHoverBg: "group-hover/member:bg-orange-100",
            iconHoverText: "group-hover/member:text-orange-600",
            textHover: "group-hover/member:text-orange-600",
            chevronText: "text-orange-500",
            gradientText: "text-orange-600",
        },
        yayasan: {
            line: "bg-blue-600",
            text: "text-blue-600",
            numberBg: "bg-blue-600 shadow-blue-600/20",
            borderLeft: "border-blue-400",
            hoverBorder: "hover:border-blue-200 dark:hover:border-blue-900",
            iconHoverBg: "group-hover/member:bg-blue-100",
            iconHoverText: "group-hover/member:text-blue-600",
            textHover: "group-hover/member:text-blue-600",
            chevronText: "text-blue-500",
            gradientText: "text-blue-600",
        },
        pasraman: {
            line: "bg-emerald-600",
            text: "text-emerald-600",
            numberBg: "bg-emerald-600 shadow-emerald-600/20",
            borderLeft: "border-emerald-400",
            hoverBorder: "hover:border-emerald-200 dark:hover:border-emerald-900",
            iconHoverBg: "group-hover/member:bg-emerald-100",
            iconHoverText: "group-hover/member:text-emerald-600",
            textHover: "group-hover/member:text-emerald-600",
            chevronText: "text-emerald-500",
            gradientText: "text-emerald-600",
        },
    }

    const theme = themeConfig[entityType] || themeConfig.pura

    const groupByOrder = initialData.reduce<Record<string, Member[]>>((acc, m) => {
        if (!acc[m.position_order]) acc[m.position_order] = []
        acc[m.position_order].push(m)
        return acc
    }, {})

    const sortedOrders = Object.keys(groupByOrder).sort((a, b) => Number(a) - Number(b))

    return (
        <section className="min-h-screen py-32 bg-gray-50 dark:bg-gray-950">
            <div className="container mx-auto px-6 md:px-12">

                <div className="text-center mb-20 space-y-4" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-4">
                        <div className={`h-[2px] w-12 ${theme.line}`}></div>
                        <span className={`${theme.text} dark:${theme.text} text-sm font-bold tracking-[0.2em] uppercase`}>
                            {title}
                        </span>
                        <div className={`h-[2px] w-12 ${theme.line}`}></div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        {subtitle.split(' ').slice(0, -1).join(' ')} <span className={theme.gradientText}>{subtitle.split(' ').pop()}</span>
                    </h1>
                </div>

                <div className="max-w-5xl mx-auto space-y-12">
                    {sortedOrders.map((order, index) => {
                        const groupMembers = groupByOrder[order].sort((a, b) => a.order_index - b.order_index)

                        const fullPosition = groupMembers[0].position
                        const mainTitle = fullPosition.includes(" - ") ? fullPosition.split(" - ")[0] : fullPosition

                        const subGroups: Record<string, Member[]> = {}
                        groupMembers.forEach((item) => {
                            const parts = item.position.split(" - ")
                            const subTitle = parts.length > 1 ? parts[1].trim() : "Pengurus"

                            if (!subGroups[subTitle]) subGroups[subTitle] = []
                            subGroups[subTitle].push(item)
                        })

                        return (
                            <div key={order} className="relative group">
                                {index > 0 && (
                                    <div className="absolute -top-12 left-8 md:left-[2.25rem] w-[2px] h-12 border-l-2 border-dashed border-gray-300 dark:border-gray-700 -z-10"></div>
                                )}

                                <div
                                    className={`bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl ${theme.hoverBorder} transition-all duration-500`}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 50}
                                >

                                    <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700 flex items-center gap-6 bg-gray-50/50 dark:bg-gray-800/50">
                                        <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg ${theme.numberBg}`}>
                                            {order}
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                            {mainTitle}
                                        </h2>
                                    </div>

                                    <div className="p-6 md:p-8">
                                        <div className={`grid gap-8 ${
                                            Object.keys(subGroups).length === 1
                                                ? "grid-cols-1"
                                                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                        }`}>
                                            {Object.keys(subGroups).map((subTitle) => (
                                                <div key={subTitle} className="space-y-4">
                                                    {(subTitle !== "Pengurus" || Object.keys(subGroups).length > 1) && (
                                                        <h3 className={`text-sm font-bold text-gray-400 uppercase tracking-widest border-l-4 pl-3 ${theme.borderLeft}`}>
                                                            {subTitle}
                                                        </h3>
                                                    )}

                                                    <ul className="space-y-3">
                                                        {subGroups[subTitle].map((person) => (
                                                            <li key={person.id} className="flex items-start gap-3 group/member">
                                                                <div className={`mt-1 shrink-0 p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors ${theme.iconHoverBg} ${theme.iconHoverText}`}>
                                                                    <User className="w-3.5 h-3.5" />
                                                                </div>
                                                                <div>
                                                                    <p className={`text-gray-700 dark:text-gray-200 font-medium text-base leading-snug transition-colors ${theme.textHover}`}>
                                                                        {person.name}
                                                                    </p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                {index < sortedOrders.length - 1 && (
                                    <div className="flex justify-center -mb-6 relative z-10">
                                        <div className={`w-8 h-8 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm mt-4 ${theme.chevronText}`}>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16 text-center" data-aos="fade-up">
                    <p className="text-sm text-gray-400">
                        Total {initialData.length} Pengurus & Anggota
                    </p>
                </div>

            </div>
        </section>
    )
}