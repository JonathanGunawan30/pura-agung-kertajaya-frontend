"use client"

import { useEffect, useState } from "react"
import { User, ChevronDown } from "lucide-react"

interface Member {
    id: string
    name: string
    position: string
    position_order: number
    order_index: number
}

export default function OrganizationPage() {
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch("/api/public/organization-members")
                const data = await res.json()
                setMembers(data.data || [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchMembers()
    }, [])

    const groupByOrder = members.reduce<Record<string, Member[]>>((acc, m) => {
        if (!acc[m.position_order]) acc[m.position_order] = []
        acc[m.position_order].push(m)
        return acc
    }, {})

    const sortedOrders = Object.keys(groupByOrder).sort((a, b) => Number(a) - Number(b))

    return (
        <section className="min-h-screen py-16 md:py-20 bg-background transition-colors">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        Struktur Organisasi
                    </h1>
                    <p className="text-lg text-muted-foreground mt-3">
                        Banjar Pura Agung Kertajaya
                    </p>
                </div>

                <div className="relative">
                    {sortedOrders.map((order, orderIndex) => {
                        const group = groupByOrder[order].sort((a, b) => a.order_index - b.order_index)

                        const subGroups: Record<string, Member[]> = {}
                        group.forEach((item) => {
                            const parts = item.position.split(" - ")
                            const main = parts[0].trim()
                            const sub = parts[1]?.trim() || null
                            const key = sub ? `${main}::${sub}` : main
                            if (!subGroups[key]) subGroups[key] = []
                            subGroups[key].push(item)
                        })

                        const mainPosition = group[0].position.split(" - ")[0]

                        return (
                            <div key={order} className="relative mb-10">

                                {orderIndex > 0 && (
                                    <div className="flex justify-center mb-6">
                                        <ChevronDown className="w-6 h-6 text-orange-500" />
                                    </div>
                                )}

                                <div className=" rounded-xl bg-card text-card-foreground shadow-md transition-colors">
                                    <div className="px-6 py-4 bg-muted">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white dark:text-slate-900 text-sm font-bold">
                                                {orderIndex + 1}
                                            </div>
                                            <h2 className="text-2xl font-bold text-foreground">
                                                {mainPosition}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className={`p-6 grid gap-4${
                                        Object.keys(subGroups).length === 1
                                            ? "grid-cols-1 max-w-xl mx-auto"
                                            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                    }`}>
                                        {Object.keys(subGroups).map((key) => {
                                            const [main, sub] = key.includes("::") ? key.split("::") : [key, null]
                                            const cardTitle = sub || main

                                            return (
                                                <div key={key} className=" p-5 rounded-lg bg-background shadow-md hover:shadow-lg transition-all">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <h3 className="text-base font-semibold text-foreground">
                                                            {cardTitle}
                                                        </h3>
                                                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                                            {subGroups[key].length}
                                                        </span>
                                                    </div>

                                                    <ul className="space-y-2">
                                                        {subGroups[key].map((person) => (
                                                            <li key={person.id} className="flex items-center gap-2">
                                                                <User className="w-4 h-4 text-muted-foreground" />
                                                                <span className="text-foreground">
                                                                  {person.name}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground">
                        Total {members.length} anggota organisasi
                    </p>
                </div>
            </div>
        </section>
    )
}