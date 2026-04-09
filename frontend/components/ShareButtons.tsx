"use client";

import { useEffect, useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return (
        <div className="flex flex-col items-center mt-12">
            <p>Social share:</p>
            <div className="flex gap-3 justify-center flex-nowrap overflow-x-auto w-full">
                <a
                    href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 disabled:bg-gray-400"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                    >
                        <path d="M18.901 1.153h3.68l-8.043 9.19L24 22.847h-7.406l-5.8-7.584-6.63 7.584H.48l8.6-9.83L0 1.153h7.594l5.243 6.932 6.064-6.932zm-1.29 19.47h2.037L6.486 3.28H4.308l13.303 17.343z"/>
                    </svg>
                </a>

                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 disabled:bg-gray-400"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-4 h-4"
                    >
                        <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.404.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.596 1.324-1.324V1.325C24 .595 23.405 0 22.675 0z"/>
                    </svg>
                </a>

                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 disabled:bg-gray-400"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-4 h-4"
                    >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.039-1.852-3.039-1.854 0-2.137 1.445-2.137 2.938v5.67h-3.554V9h3.414v1.561h.049c.476-.9 1.637-1.848 3.37-1.848 3.602 0 4.268 2.37 4.268 5.455v6.284zM5.337 7.433c-1.144 0-2.068-.926-2.068-2.068 0-1.143.924-2.068 2.068-2.068s2.068.925 2.068 2.068c0 1.142-.924 2.068-2.068 2.068zm1.777 13.019H3.559V9h3.555v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.206 24 24 23.225 24 22.271V1.729C24 .774 23.206 0 22.225 0z"/>
                    </svg>
                </a>
            </div>
        </div>
    );
}