"use client"

import { useEffect, useMemo, useState } from "react"
import { Star, X } from "lucide-react"
import Marquee from "react-fast-marquee"

export interface FeaturableReview {
    id: string
    author: {
        name: string
        avatarUrl: string
        profileUrl?: string | null
    }
    text: string | null
    originalText: string | null
    rating: {
        value: number
    }
    platform: string
    publishedAt?: string
    url?: string | null
}

type EntityType = "pura" | "yayasan" | "pasraman"

interface TestimonialsSectionProps {
    reviews: FeaturableReview[]
    entityType: EntityType
}

const getTheme = (type: EntityType) => {
    switch (type) {
        case "yayasan":
            return {
                text: "text-blue-600",
                bg: "bg-blue-600",
                link: "text-blue-600 dark:text-blue-400",
                avatarBg: "bg-blue-600",
                border: "border-blue-600"
            }
        case "pasraman":
            return {
                text: "text-emerald-600",
                bg: "bg-emerald-600",
                link: "text-emerald-600 dark:text-emerald-400",
                avatarBg: "bg-emerald-600",
                border: "border-emerald-600"
            }
        case "pura":
        default:
            return {
                text: "text-orange-600",
                bg: "bg-orange-600",
                link: "text-orange-600 dark:text-orange-400",
                avatarBg: "bg-orange-600",
                border: "border-orange-600"
            }
    }
}

function timeAgo(dateString?: string) {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return ""; 
        
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " thn lalu";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " bln lalu";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " hr lalu";
        return "Baru saja";
    } catch (e) {
        return "";
    }
}

function FeaturableLogo({className}: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 749.55 133.6" className={className} fill="none">
            <g><g>
                <path fill="currentColor" d="M140.82,104.78V15.31h59.8v14.41h-43.35v24.74h37.95v14.53h-37.95v35.79h-16.45Z"></path>
                <path fill="currentColor" d="M238.21,106.22c-6.72,0-12.63-1.52-17.71-4.56-5.08-3.04-9.03-7.16-11.83-12.37-2.8-5.2-4.2-10.97-4.2-17.29s1.44-12.39,4.32-17.47c2.88-5.08,6.76-9.11,11.65-12.07,4.88-2.96,10.41-4.44,16.57-4.44,5.12,0,9.63,.84,13.51,2.52,3.88,1.68,7.18,4,9.91,6.96,2.72,2.96,4.8,6.35,6.24,10.15,1.44,3.8,2.16,7.91,2.16,12.31,0,1.2-.06,2.38-.18,3.54-.12,1.16-.34,2.22-.66,3.18h-50.44v-12.13h41.55l-7.57,5.64c.8-3.68,.66-6.96-.42-9.85-1.08-2.88-2.84-5.16-5.28-6.84-2.44-1.68-5.39-2.52-8.83-2.52s-6.21,.84-8.77,2.52c-2.56,1.68-4.5,4.08-5.82,7.21-1.32,3.12-1.82,6.93-1.5,11.41-.32,4,.22,7.55,1.62,10.63,1.4,3.08,3.48,5.46,6.25,7.15s5.94,2.52,9.55,2.52,6.66-.76,9.19-2.28c2.52-1.52,4.5-3.56,5.95-6.12l12.73,6.24c-1.28,3.12-3.28,5.88-6,8.29-2.72,2.4-5.96,4.28-9.73,5.64-3.76,1.36-7.85,2.04-12.25,2.04Z"></path>
                <path fill="currentColor" d="M298.98,106.22c-4.56,0-8.55-.76-11.95-2.28-3.4-1.52-6.03-3.7-7.87-6.54-1.84-2.84-2.76-6.14-2.76-9.91s.82-6.82,2.46-9.67c1.64-2.84,4.14-5.22,7.51-7.14,3.36-1.92,7.6-3.28,12.73-4.08l21.26-3.48v12.01l-18.25,3.24c-3.12,.56-5.44,1.54-6.96,2.94-1.52,1.4-2.28,3.26-2.28,5.58s.86,4.02,2.58,5.34c1.72,1.32,3.86,1.98,6.42,1.98,3.28,0,6.18-.7,8.71-2.1,2.52-1.4,4.46-3.34,5.82-5.82,1.36-2.48,2.04-5.16,2.04-8.05v-16.93c0-2.8-1.08-5.14-3.24-7.03-2.16-1.88-5.04-2.82-8.65-2.82-3.36,0-6.35,.92-8.95,2.76-2.6,1.84-4.5,4.2-5.71,7.09l-12.85-6.24c1.28-3.44,3.3-6.43,6.06-8.95s6.02-4.5,9.79-5.94c3.76-1.44,7.85-2.16,12.25-2.16,5.36,0,10.09,.98,14.17,2.94,4.08,1.96,7.27,4.71,9.55,8.23,2.28,3.52,3.42,7.57,3.42,12.13v43.47h-14.89v-11.17l3.36-.12c-1.68,2.72-3.7,5.04-6.06,6.96-2.36,1.92-5,3.36-7.93,4.32-2.92,.96-6.19,1.44-9.79,1.44Z"></path>
                <path fill="currentColor" d="M376.07,105.5c-7.37,0-13.09-2.02-17.17-6.06s-6.12-9.75-6.12-17.11v-28.82h-11.17v-14.05h1.2c3.2,0,5.66-.84,7.39-2.52,1.72-1.68,2.58-4.12,2.58-7.33v-5.04h15.85v14.89h15.01v14.05h-15.01v27.98c0,2.16,.38,4,1.14,5.52,.76,1.52,1.96,2.68,3.6,3.48,1.64,.8,3.74,1.2,6.3,1.2,.56,0,1.22-.04,1.98-.12,.76-.08,1.5-.16,2.22-.24v13.45c-1.12,.16-2.4,.32-3.84,.48-1.44,.16-2.76,.24-3.96,.24Z"></path>
                <path fill="currentColor" d="M417.87,106.22c-5.12,0-9.53-1.12-13.21-3.36-3.68-2.24-6.53-5.36-8.53-9.37-2-4-3-8.69-3-14.05V39.45h15.85v38.67c0,2.72,.54,5.1,1.62,7.14,1.08,2.04,2.64,3.64,4.68,4.8,2.04,1.16,4.34,1.74,6.91,1.74s4.84-.58,6.84-1.74c2-1.16,3.56-2.78,4.68-4.86,1.12-2.08,1.68-4.56,1.68-7.45V39.45h15.73V104.78h-14.89v-12.85l1.2,2.28c-1.52,4-4,7.01-7.45,9.01-3.44,2-7.49,3-12.13,3Z"></path>
                <path fill="currentColor" d="M464.34,104.78V39.45h14.89v14.53l-1.2-2.16c1.52-4.88,3.9-8.29,7.15-10.21,3.24-1.92,7.15-2.88,11.71-2.88h3.84v14.05h-5.64c-4.48,0-8.09,1.36-10.81,4.08-2.72,2.72-4.08,6.57-4.08,11.53v36.39h-15.85Z"></path>
                <path fill="currentColor" d="M527.86,106.22c-4.56,0-8.55-.76-11.95-2.28-3.4-1.52-6.03-3.7-7.87-6.54-1.84-2.84-2.76-6.14-2.76-9.91s.82-6.82,2.46-9.67c1.64-2.84,4.14-5.22,7.51-7.14,3.36-1.92,7.6-3.28,12.73-4.08l21.26-3.48v12.01l-18.25,3.24c-3.12,.56-5.45,1.54-6.97,2.94-1.52,1.4-2.28,3.26-2.28,5.58s.86,4.02,2.58,5.34c1.72,1.32,3.86,1.98,6.42,1.98,3.28,0,6.18-.7,8.71-2.1,2.52-1.4,4.46-3.34,5.82-5.82,1.36-2.48,2.04-5.16,2.04-8.05v-16.93c0-2.8-1.08-5.14-3.24-7.03-2.16-1.88-5.04-2.82-8.65-2.82-3.36,0-6.35,.92-8.95,2.76-2.6,1.84-4.5,4.2-5.7,7.09l-12.85-6.24c1.28-3.44,3.3-6.43,6.06-8.95,2.76-2.52,6.02-4.5,9.79-5.94,3.76-1.44,7.85-2.16,12.25-2.16,5.36,0,10.09,.98,14.17,2.94,4.08,1.96,7.27,4.71,9.55,8.23,2.28,3.52,3.42,7.57,3.42,12.13v43.47h-14.89v-11.17l3.36-.12c-1.68,2.72-3.7,5.04-6.06,6.96-2.36,1.92-5,3.36-7.93,4.32-2.92,.96-6.18,1.44-9.79,1.44Z"></path>
                <path fill="currentColor" d="M612.04,106.22c-4.72,0-9.07-.92-13.03-2.76s-7.11-4.56-9.43-8.17l1.56-3.12v12.61h-14.89V13.87h15.85V52.42l-2.4-3.24c2.24-3.52,5.28-6.26,9.13-8.23,3.84-1.96,8.29-2.94,13.33-2.94,6.16,0,11.73,1.52,16.69,4.56,4.96,3.04,8.91,7.13,11.83,12.25,2.92,5.12,4.38,10.89,4.38,17.29s-1.44,12.09-4.32,17.29c-2.88,5.21-6.81,9.31-11.77,12.31-4.96,3-10.61,4.5-16.93,4.5Zm-1.8-14.41c3.6,0,6.79-.84,9.55-2.52,2.76-1.68,4.94-4,6.54-6.96,1.6-2.96,2.4-6.37,2.4-10.21s-.8-7.12-2.4-10.09c-1.6-2.96-3.78-5.28-6.54-6.96-2.76-1.68-5.94-2.52-9.55-2.52s-6.54,.84-9.31,2.52c-2.76,1.68-4.92,4-6.49,6.96-1.56,2.96-2.34,6.33-2.34,10.09s.78,7.25,2.34,10.21c1.56,2.96,3.72,5.28,6.49,6.96s5.86,2.52,9.31,2.52Z"></path>
                <path fill="currentColor" d="M655.64,104.78V13.87h15.85V104.78h-15.85Z"></path>
                <path fill="currentColor" d="M715.68,106.22c-6.73,0-12.63-1.52-17.71-4.56-5.09-3.04-9.03-7.16-11.83-12.37-2.8-5.2-4.2-10.97-4.2-17.29s1.44-12.39,4.32-17.47c2.88-5.08,6.76-9.11,11.65-12.07,4.88-2.96,10.41-4.44,16.57-4.44,5.12,0,9.63,.84,13.51,2.52,3.88,1.68,7.18,4,9.91,6.96,2.72,2.96,4.8,6.35,6.25,10.15s2.16,7.91,2.16,12.31c0,1.2-.06,2.38-.18,3.54-.12,1.16-.34,2.22-.66,3.18h-50.44v-12.13h41.55l-7.57,5.64c.8-3.68,.66-6.96-.42-9.85-1.08-2.88-2.84-5.16-5.28-6.84-2.44-1.68-5.38-2.52-8.83-2.52s-6.21,.84-8.77,2.52c-2.56,1.68-4.5,4.08-5.82,7.21s-1.82,6.93-1.5,11.41c-.32,4,.22,7.55,1.62,10.63,1.4,3.08,3.48,5.46,6.25,7.15,2.76,1.68,5.94,2.52,9.55,2.52s6.67-.76,9.19-2.28c2.52-1.52,4.5-3.56,5.94-6.12l12.73,6.24c-1.28,3.12-3.28,5.88-6,8.29-2.72,2.4-5.97,4.28-9.73,5.64-3.76,1.36-7.85,2.04-12.25,2.04Z"></path>
                <path fill="#1762e5" d="M53.8,6.98C21.59,7-3.81,35.35,1.62,67.02c2.03,11.82,4.28,22.72-1.05,34.08-1.64,3.49,.33,5.28,4.49,4.95,4.07-.33,8.13-.92,12.17-1.54,4.16-.64,7.84-.19,11.66,2.13,7.81,4.74,16.64,6.58,25.69,6.47,29.13-.34,52.43-24.45,52.22-53.74-.21-28.97-23.93-52.41-53.02-52.39Z"></path>
                <path fill="#ffffff" d="M64.11,95.24l-14.25-11.33c-.95-.75-2.21-.99-3.37-.64l-17.41,5.31c-2.92,.89-5.6-1.95-4.53-4.81l6.37-17.05c.42-1.14,.26-2.41-.43-3.4l-10.43-14.91c-1.75-2.5,.13-5.93,3.18-5.79l18.18,.79c1.21,.05,2.37-.49,3.1-1.46l10.96-14.53c1.84-2.44,5.68-1.71,6.49,1.23l4.87,17.54c.32,1.17,1.2,2.1,2.35,2.5l17.21,5.93c2.89,1,3.38,4.87,.83,6.56l-15.18,10.05c-1.01,.67-1.63,1.79-1.65,3.01l-.32,18.2c-.05,3.05-3.59,4.72-5.98,2.82Z"></path>
            </g></g>
        </svg>
    )
}

function GoogleRatingBadge() {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm flex flex-row items-center justify-between gap-4 mt-6 md:mt-0 w-full md:w-auto">
            <div className="flex items-center gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-5 w-auto md:h-6" />
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-none">4.8</span>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-[#FFB80F] text-[#FFB80F] border-none" strokeWidth={0}/>
                            ))}
                        </div>
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 mt-0.5 md:mt-1 font-medium">Based on 207 Reviews</span>
                </div>
            </div>
            <a href="https://search.google.com/local/writereview?placeid=ChIJBzhQOcv4aS4RQA0zkoa4UY0" target="_blank" rel="noreferrer" className="bg-[#1A73E8] hover:bg-[#1557b0] text-white text-xs md:text-sm font-medium py-2.5 px-4 md:px-5 rounded-full transition-colors whitespace-nowrap">
                Write a review
            </a>
        </div>
    )
}


function ReviewModal({ review, isOpen, onClose, theme }: {
    review: FeaturableReview | null,
    isOpen: boolean,
    onClose: () => void,
    theme: any
}) {
    if (!isOpen || !review) return null;

    const rawText = (review.originalText && review.originalText.trim() !== "") ? review.originalText : (review.text || "");
    const relativeDate = timeAgo(review.publishedAt);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors bg-gray-100 dark:bg-gray-800 rounded-full z-10">
                    <X className="w-5 h-5"/>
                </button>

                <div className="flex items-center gap-4 mb-6 flex-shrink-0">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                        {review.author?.avatarUrl ? (
                            <img src={review.author.avatarUrl} alt={review.author.name} className="w-full h-full object-cover" referrerPolicy="no-referrer"/>
                        ) : (
                            <div className={`w-full h-full flex items-center justify-center ${theme.avatarBg} text-white font-bold text-lg`}>
                                {review.author?.name ? review.author.name.charAt(0) : "U"}
                            </div>
                        )}
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-sm">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" className="w-4 h-4"/>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{review.author?.name || "Pengunjung"}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{relativeDate}</span>
                    </div>
                </div>

                <div className="flex gap-1 mb-4 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#FFB80F] text-[#FFB80F]" strokeWidth={0}/>
                    ))}
                </div>

                <div className="overflow-y-auto flex-1 pr-2 mb-4 custom-scrollbar" style={{scrollbarWidth: 'thin'}}>
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed whitespace-pre-line">
                        {rawText}
                    </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end flex-shrink-0">
                    <a href="https://www.google.com/maps/place/Pura+Agung+Kertajaya/@-6.1918644,106.6166595,17z" target="_blank" rel="noreferrer" className={`${theme.link} hover:underline text-sm font-medium flex items-center gap-1`}>
                        Lihat di Google Maps →
                    </a>
                </div>
            </div>
        </div>
    );
}

function ReviewCard({ review, onClickReadMore, theme }: {
    review: FeaturableReview,
    onClickReadMore: (r: FeaturableReview) => void,
    theme: any
}) {
    const rawText = (review.originalText && review.originalText.trim() !== "") ? review.originalText : (review.text || "");
    const relativeDate = timeAgo(review.publishedAt);
    const isTextTruncated = rawText.length > 110;

    return (
        <div className="relative shrink-0 w-[280px] sm:w-[320px] md:w-[350px] mr-4 md:mr-0 md:mx-3 min-h-[260px] p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                            {review.author?.avatarUrl ? (
                                <img src={review.author.avatarUrl} alt={review.author.name} className="w-full h-full object-cover" referrerPolicy="no-referrer"/>
                            ) : (
                                <div className={`w-full h-full flex items-center justify-center ${theme.avatarBg} text-white font-bold text-xs`}>
                                    {review.author?.name ? review.author.name.charAt(0) : "U"}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[15px] font-bold text-gray-900 dark:text-white truncate">{review.author?.name || "Pengunjung"}</span>
                            <span className="text-xs text-gray-400 font-medium">{relativeDate}</span>
                        </div>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" className="w-5 h-5 shrink-0 ml-2"/>
                </div>

                <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFB80F] text-[#FFB80F]" strokeWidth={0}/>
                    ))}
                </div>

                <div className="relative">
                    {rawText ? (
                        <p className="text-gray-600 dark:text-gray-300 text-[14px] leading-relaxed line-clamp-4">{rawText}</p>
                    ) : (
                        <p className="text-gray-400 italic text-sm">(Hanya memberikan rating)</p>
                    )}
                </div>
            </div>

            {rawText && isTextTruncated && (
                <button
                    onClick={(e) => { e.stopPropagation(); onClickReadMore(review); }}
                    className={`text-left text-sm font-medium ${theme.link} hover:underline mt-3 focus:outline-none cursor-pointer`}
                >
                    Read more
                </button>
            )}
        </div>
    )
}


export default function TestimonialsSection({ reviews, entityType }: TestimonialsSectionProps) {
    const [selectedReview, setSelectedReview] = useState<FeaturableReview | null>(null);
    const [gradientColor, setGradientColor] = useState("#f9fafb");

    const theme = getTheme(entityType);

    const safeReviews = useMemo(() => {
        if (!Array.isArray(reviews)) {
            console.warn(`[TestimonialsSection] Reviews is not an array for ${entityType}`, reviews);
            return [];
        }

        return reviews.map(r => {
            if (!r) return null;

            return {
                ...r,
                author: {
                    name: r.author?.name || "Pengunjung Google",
                    avatarUrl: r.author?.avatarUrl || "", 
                    profileUrl: r.author?.profileUrl || null
                },
                text: r.text || "",
                rating: r.rating || { value: 5 },
                publishedAt: r.publishedAt || new Date().toISOString()
            }
        }).filter(Boolean) as FeaturableReview[]; 
    }, [reviews, entityType]);

    useEffect(() => {
        if (entityType === 'pasraman') {
            console.log("Pasraman Raw Reviews:", reviews);
            console.log("Pasraman Safe Reviews:", safeReviews);
        }
    }, [reviews, safeReviews, entityType]);

    useEffect(() => {
        
        const updateGradientColor = () => {
            if (document.documentElement.classList.contains("dark")) {
                setGradientColor("#030712");
            } else {
                setGradientColor("#f9fafb");
            }
        };
        updateGradientColor();
        const observer = new MutationObserver(updateGradientColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, [])

    useEffect(() => {
        if (selectedReview) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedReview]);

    const displayData = useMemo(() => {
        if (safeReviews.length === 0) return [];
        return safeReviews.length < 4 ? [...safeReviews, ...safeReviews, ...safeReviews] : safeReviews;
    }, [safeReviews]);

    if (safeReviews.length === 0) {
        console.warn(`[TestimonialsSection] No valid reviews to display for ${entityType}`);
        return null; 
    }

    return (
        <section className="py-24 bg-white dark:bg-gray-950 relative w-full max-w-[100vw] overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 relative z-10 mb-8 md:mb-12">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8" data-aos="fade-up">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-4">
                            <div className={`h-[2px] w-12 ${theme.bg}`}></div>
                            <span className={`${theme.text} text-sm font-bold tracking-[0.2em] uppercase`}>
                                Kata Mereka
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                            Pengalaman <span className={theme.text}>Spiritual</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                            Kesan tulus dari para umat dan pengunjung yang telah merasakan pelayanan dan kedamaian di lembaga kami.
                        </p>
                    </div>

                    <div className="shrink-0 w-full md:w-auto">
                        <GoogleRatingBadge />
                    </div>
                </div>
            </div>

            <div className="md:hidden w-full overflow-x-auto pb-8 pt-2 px-6 flex overscroll-behavior-x-auto touch-action-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {safeReviews.map((review, index) => (
                    <ReviewCard key={`${review.id}-mobile-${index}`} review={review} onClickReadMore={setSelectedReview} theme={theme} />
                ))}
                <div className="w-6 shrink-0"></div>
            </div>

            <div className="hidden md:block relative z-10 w-full overflow-hidden">
                <Marquee pauseOnHover gradient={true} gradientColor={gradientColor} gradientWidth={100} speed={40} className="py-4 overflow-hidden">
                    {displayData.map((review, index) => (
                        <ReviewCard key={`${review.id}-desktop-${index}`} review={review} onClickReadMore={setSelectedReview} theme={theme} />
                    ))}
                </Marquee>
            </div>

            <ReviewModal isOpen={!!selectedReview} review={selectedReview} onClose={() => setSelectedReview(null)} theme={theme} />

            <div className="mt-8 flex justify-center">
                <a href="https://featurable.com/?utm_source=widget&utm_medium=af21c3b9-e428-49bd-9ba8-de90b731316a" target="_blank" rel="noreferrer nofollow" className="group text-[11px] md:text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-1.5">
                    <span className="font-medium">Powered by</span>
                    <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                        <FeaturableLogo className="h-4 w-auto" />
                    </div>
                </a>
            </div>
        </section>
    )
}

