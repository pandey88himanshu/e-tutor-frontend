"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CourseCardProps {
    id: string;
    title: string;
    thumbnail: string;
    currentLesson: string;
    progress?: number;
    isActive?: boolean;
}

const CourseCard = ({
    id,
    title,
    thumbnail,
    currentLesson,
    progress = 0,
    isActive = false,
}: CourseCardProps) => {
    const [imgError, setImgError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Determine button state: dark on card hover or if isActive
    const isDarkButton = isHovered || isActive;

    // Button styles matching LightBgBtn and DarkBgBtn components
    const lightBtnStyles = "bg-[rgb(var(--primary-100))] text-[rgb(var(--primary-500))] hover:bg-[rgb(var(--primary-200))]";
    const darkBtnStyles = "bg-[rgb(var(--primary-500))] text-white hover:bg-[rgb(var(--primary-600))]";

    return (
        <div
            className="flex flex-col bg-white border border-[rgb(var(--gray-200))] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden">
                {thumbnail && !imgError ? (
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[rgb(var(--gray-100))] to-[rgb(var(--gray-200))]">
                        <span className="text-5xl">📚</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4">
                {/* Course Title - Gray smaller text */}
                <p className="body-sm-400 text-[rgb(var(--gray-500))] line-clamp-1 mb-1">
                    {title}
                </p>

                {/* Current Lesson - Darker, bolder */}
                <p className="body-md-500 text-[rgb(var(--gray-900))] line-clamp-2 flex-1 min-h-[40px]">
                    {currentLesson}
                </p>

                {/* Action Row */}
                <div className="flex items-center justify-between mt-4 gap-2">
                    {/* Watch Lecture Button - Light (default) or Dark (on card hover) */}
                    <Link
                        href={`/course/${id}/watch`}
                        className={`
                            px-4 py-2.5 rounded body-sm-600 transition-all duration-200
                            ${isDarkButton ? darkBtnStyles : lightBtnStyles}
                        `}
                    >
                        Watch Lecture
                    </Link>

                    {/* Progress Text */}
                    {progress > 0 && (
                        <span className="body-sm-500 text-[rgb(var(--success-500))]">
                            {progress}% {progress === 100 ? "Completed" : "Finish"}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
