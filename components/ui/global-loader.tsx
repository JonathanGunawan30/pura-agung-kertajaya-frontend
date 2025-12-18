"use client"

import { useLottie } from "lottie-react"
import loadingAnimation from "../../public/animations/global-loading.json"

export default function GlobalLoaderAnimation() {
    const options = {
        animationData: loadingAnimation,
        loop: true,
        autoplay: true,
    }

    const { View } = useLottie(options)

    return (
        <div className="w-32 h-32">
            {View}
        </div>
    )
}