"use client";

import { useLoader } from "@/context/LoaderContext";
import { Spinner } from "@/components/ui/spinner";

export default function GlobalLoader() {
    const { loading } = useLoader();

    if (!loading) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <Spinner />
        </div>
    );
}