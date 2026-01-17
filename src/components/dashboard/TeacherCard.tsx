"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface TeacherCardProps {
    id: string;
    name: string;
    role: string;
    photo: string;
    rating: number;
    students: number;
    bgColor?: string;
}

const TeacherCard = ({
    id,
    name,
    role,
    photo,
    rating,
    students,
    bgColor = "bg-[rgb(var(--warning-100))]",
}: TeacherCardProps) => {
    const [imgError, setImgError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Format student count
    const formatStudents = (count: number) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
        return count.toString();
    };

    // Get initials from name
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Button styles
    const lightBtnStyles = "bg-[rgb(var(--primary-100))] text-[rgb(var(--primary-500))]";
    const darkBtnStyles = "bg-[rgb(var(--primary-500))] text-white";

    return (
        <div
            className="flex flex-col items-center bg-white rounded-lg p-4 transition-all duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Photo with colored background */}
            <div className={`relative w-full aspect-square rounded-lg overflow-hidden mb-4 ${bgColor}`}>
                {photo && !imgError ? (
                    <Image
                        src={photo}
                        alt={name}
                        fill
                        className="object-cover object-top"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-semibold text-[rgb(var(--gray-600))]">
                            {getInitials(name)}
                        </span>
                    </div>
                )}
            </div>

            {/* Name */}
            <h3 className="body-md-600 text-[rgb(var(--gray-900))] text-center mb-0.5">
                {name}
            </h3>

            {/* Role */}
            <p className="body-sm-400 text-[rgb(var(--gray-500))] text-center mb-2">
                {role}
            </p>

            {/* Rating & Students */}
            <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                    <FaStar className="text-[rgb(var(--warning-500))] text-sm" />
                    <span className="body-sm-500 text-[rgb(var(--gray-900))]">{rating.toFixed(1)}</span>
                </div>
                <span className="text-[rgb(var(--gray-300))]">•</span>
                <span className="body-sm-400 text-[rgb(var(--gray-500))]">
                    {formatStudents(students)} students
                </span>
            </div>

            {/* Send Message Button */}
            <button
                className={`
                    w-full px-4 py-2.5 rounded body-sm-500 transition-all duration-200
                    ${isHovered ? darkBtnStyles : lightBtnStyles}
                `}
            >
                Send Message
            </button>
        </div>
    );
};

export default TeacherCard;
