"use client"

import { useLottie } from "lottie-react"
import loadingAnimation from "../../public/animations/global-loading.json"

export default function GlobalLoader() {
    const options = {
        animationData: loadingAnimation,
        loop: true,
        autoplay: true,
    }

    const { View } = useLottie(options)

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
            <div className="w-64 h-64"> {}
                {View}
            </div>
        </div>
    )
}