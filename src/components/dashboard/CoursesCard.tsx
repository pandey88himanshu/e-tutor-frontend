"use client";

import Image from "next/image";
import { useState } from "react";

interface CoursesCardProps {
    id: string;
    category: string;
    title: string;
    thumbnail: string;
    progress?: number;
    isActive?: boolean;
}

const CoursesCard = ({
    id,
    category,
    title,
    thumbnail,
    progress = 0,
    isActive = false,
}: CoursesCardProps) => {
    const [imgError, setImgError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Button shows dark on hover or if active
    const isDarkButton = isHovered || isActive;

    // Button styles matching Figma
    const lightBtnStyles = "bg-[rgb(var(--primary-100))] text-[rgb(var(--primary-500))]";
    const darkBtnStyles = "bg-[rgb(var(--primary-500))] text-white";

    return (
        <div
            className="flex flex-col bg-white rounded-lg overflow-hidden transition-all duration-200 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Thumbnail - Taller aspect ratio matching Figma */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[rgb(var(--gray-100))] to-[rgb(var(--gray-200))] rounded-lg">
                {thumbnail && !imgError ? (
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">📚</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="pt-3 pb-1">
                {/* Category - Smaller gray text */}
                <p className="body-xs-400 text-[rgb(var(--gray-500))] line-clamp-1 mb-0.5">
                    {category}
                </p>

                {/* Main Title - Darker, bolder */}
                <p className="body-sm-500 text-[rgb(var(--gray-900))] line-clamp-1 mb-3">
                    {title}
                </p>

                {/* Action Row */}
                <div className="flex items-center justify-between gap-2">
                    {/* Watch Lecture Button */}
                    <button
                        className={`
                            px-4 py-2.5 rounded body-sm-500 transition-all duration-200 w-full
                            ${progress > 0 ? 'flex-1' : 'w-full'}
                            ${isDarkButton ? darkBtnStyles : lightBtnStyles}
                        `}
                    >
                        Watch Lecture
                    </button>

                    {/* Progress Text - Only show if progress > 0 */}
                    {progress > 0 && (
                        <span className="body-sm-500 text-[rgb(var(--success-500))] whitespace-nowrap">
                            {progress}% Completed
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursesCard;
