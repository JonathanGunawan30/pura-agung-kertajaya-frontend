import GlobalLoaderAnimation from "@/components/ui/global-loader"

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
            <GlobalLoaderAnimation />
        </div>
    )
}