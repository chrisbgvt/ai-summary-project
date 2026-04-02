"use client";

export default function Error({error}: {error: Error}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-full">
            <p>Something went wrong {error?.message}!</p>
        </div>
    );
}