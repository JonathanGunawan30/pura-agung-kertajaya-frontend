"use client"

import { useState } from "react"
import { Clock, MapPin, X, Share2, Check, XCircle, Calendar } from "lucide-react"

export interface ActivityDetail {
    id: string
    title: string
    description: string
    time_info: string
    location: string
    [key: string]: any
}

interface ActivityModalProps {
    activity: ActivityDetail
    onClose: () => void
}

export default function ActivityModal({ activity, onClose }: ActivityModalProps) {
    const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'error'>('idle')

    const handleShare = async () => {
        const shareData = {
            title: `Agenda: ${activity.title}`,
            text: `*${activity.title}*\n\n📅 Waktu: ${activity.time_info}\n📍 Lokasi: ${activity.location}\n\n"${activity.description}"`,
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData)
                return
            } catch (err) {
                return
            }
        }

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(shareData.text)
            } else {
                const textArea = document.createElement("textarea")
                textArea.value = shareData.text
                textArea.style.position = "fixed"
                textArea.style.left = "-9999px"
                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()
                document.execCommand('copy')
                document.body.removeChild(textArea)
            }

            setShareStatus('copied')
            setTimeout(() => setShareStatus('idle'), 2000)
        } catch (err) {
            console.error("Gagal menyalin", err)
            setShareStatus('error')
            setTimeout(() => setShareStatus('idle'), 3000)
        }
    }

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
                    <div className="flex items-center gap-3 text-orange-600">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Detail Acara</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleShare}
                            disabled={shareStatus !== 'idle'}
                            className={`
                                flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300
                                ${shareStatus === 'idle'
                                ? "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                : ""}
                                ${shareStatus === 'copied'
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 scale-105"
                                : ""}
                                ${shareStatus === 'error'
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 scale-105"
                                : ""}
                            `}
                        >
                            {shareStatus === 'idle' && <Share2 className="w-4 h-4" />}
                            {shareStatus === 'copied' && <Check className="w-4 h-4" />}
                            {shareStatus === 'error' && <XCircle className="w-4 h-4" />}

                            <span>
                                {shareStatus === 'idle' && "Share"}
                                {shareStatus === 'copied' && "Disalin"}
                                {shareStatus === 'error' && "Gagal"}
                            </span>
                        </button>

                        <button
                            onClick={onClose}
                            className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        {activity.title}
                    </h3>

                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-gray-800 flex items-center justify-center shrink-0 text-orange-600">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Waktu</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{activity.time_info}</p>
                            </div>
                        </div>
                        <div className="hidden sm:block w-px bg-gray-200 dark:bg-gray-800 h-10"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center shrink-0 text-blue-600">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Lokasi</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{activity.location}</p>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100 dark:border-gray-800 mb-8" />

                    <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed text-base max-w-none">
                        {activity.description ? (
                            activity.description.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                            ))
                        ) : (
                            <p className="italic text-gray-400">Tidak ada deskripsi tambahan.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}