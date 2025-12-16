"use client"

import { useEffect } from "react"
import { User, ChevronDown } from "lucide-react"
import AOS from "aos"
import "aos/dist/aos.css"

interface Member {
    id: string
    name: string
    position: string
    position_order: number
    order_index: number
}

interface OrganizationContentProps {
    initialData: Member[]
}

export default function OrganizationContent({ initialData }: OrganizationContentProps) {
    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

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
                        <div className="h-[2px] w-12 bg-orange-600"></div>
                        <span className="text-orange-600 dark:text-orange-600 text-sm font-bold tracking-[0.2em] uppercase">
                            Struktur Organisasi
                        </span>
                        <div className="h-[2px] w-12 bg-orange-600"></div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        Banjar Pura Agung <span className="text-orange-600">Kertajaya</span>
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
                                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-900 transition-all duration-500"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 50}
                                >

                                    <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700 flex items-center gap-6 bg-gray-50/50 dark:bg-gray-800/50">
                                        <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-orange-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-orange-600/20">
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
                                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-l-4 border-orange-400 pl-3">
                                                            {subTitle}
                                                        </h3>
                                                    )}

                                                    <ul className="space-y-3">
                                                        {subGroups[subTitle].map((person) => (
                                                            <li key={person.id} className="flex items-start gap-3 group/member">
                                                                <div className="mt-1 shrink-0 p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover/member:bg-orange-100 group-hover/member:text-orange-600 transition-colors">
                                                                    <User className="w-3.5 h-3.5" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-gray-700 dark:text-gray-200 font-medium text-base leading-snug group-hover/member:text-orange-600 transition-colors">
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
                                        <div className="w-8 h-8 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-orange-500 shadow-sm mt-4">
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