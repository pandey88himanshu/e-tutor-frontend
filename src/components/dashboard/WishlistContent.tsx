"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";

// Mock wishlist data
const mockWishlistItems = [
    {
        id: "1",
        title: "The Ultimate Drawing Course - Beginner to Advanced",
        thumbnail: "",
        rating: 4.8,
        reviews: 451444,
        instructors: ["Harry Potter", "John Wick"],
        price: 37.00,
        originalPrice: 49.00,
    },
    {
        id: "2",
        title: "Digital Marketing Masterclass - 23 Courses in 1",
        thumbnail: "",
        rating: 4.8,
        reviews: 451444,
        instructors: ["Nobody"],
        price: 24.00,
        originalPrice: null,
    },
    {
        id: "3",
        title: "Angular - The Complete Guide (2021 Edition)",
        thumbnail: "",
        rating: 4.7,
        reviews: 451444,
        instructors: ["Kevin Gilbert"],
        price: 13.00,
        originalPrice: null,
    },
];

interface WishlistItem {
    id: string;
    title: string;
    thumbnail: string;
    rating: number;
    reviews: number;
    instructors: string[];
    price: number;
    originalPrice: number | null;
}

const WishlistContent = () => {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(mockWishlistItems);

    // Format review count
    const formatReviews = (count: number) => {
        return count.toLocaleString();
    };

    // Handle removing item from wishlist
    const handleRemoveFromWishlist = (itemId: string) => {
        setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    };

    // Get initials for placeholder
    const getInitials = (title: string) => {
        return title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    };

    return (
        <div className="w-full bg-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                {/* Header */}
                <h2 className="text-lg font-semibold text-[rgb(var(--gray-900))] mb-6">
                    Wishlist <span className="font-normal text-[rgb(var(--gray-500))]">({wishlistItems.length})</span>
                </h2>

                {/* Table Container */}
                <div className="bg-white border border-[rgb(var(--gray-200))] rounded-lg overflow-hidden">
                    {/* Table Header - Desktop */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[rgb(var(--gray-50))] border-b border-[rgb(var(--gray-200))]">
                        <div className="col-span-6">
                            <span className="body-xs-500 text-[rgb(var(--gray-500))] uppercase tracking-wide">Course</span>
                        </div>
                        <div className="col-span-2">
                            <span className="body-xs-500 text-[rgb(var(--gray-500))] uppercase tracking-wide">Prices</span>
                        </div>
                        <div className="col-span-4">
                            <span className="body-xs-500 text-[rgb(var(--gray-500))] uppercase tracking-wide">Action</span>
                        </div>
                    </div>

                    {/* Wishlist Items */}
                    {wishlistItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center ${index !== wishlistItems.length - 1 ? 'border-b border-[rgb(var(--gray-200))]' : ''
                                }`}
                        >
                            {/* Course Info */}
                            <div className="md:col-span-6 flex gap-4">
                                {/* Thumbnail */}
                                <div className="relative w-24 h-16 md:w-32 md:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[rgb(var(--gray-100))] to-[rgb(var(--gray-200))]">
                                    {item.thumbnail ? (
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-2xl">📚</span>
                                        </div>
                                    )}
                                </div>

                                {/* Course Details */}
                                <div className="flex-1 min-w-0">
                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-1">
                                        <FaStar className="text-[rgb(var(--warning-500))] text-xs" />
                                        <span className="body-xs-500 text-[rgb(var(--gray-900))]">{item.rating}</span>
                                        <span className="body-xs-400 text-[rgb(var(--gray-500))]">
                                            ({formatReviews(item.reviews)} Review)
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="body-sm-500 text-[rgb(var(--gray-900))] line-clamp-2 mb-1">
                                        {item.title}
                                    </h3>

                                    {/* Instructors */}
                                    <p className="body-xs-400 text-[rgb(var(--gray-500))]">
                                        Course by: <span className="text-[rgb(var(--gray-700))]">{item.instructors.join(' • ')}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="md:col-span-2 flex items-center gap-2">
                                <span className="body-md-600 text-[rgb(var(--primary-500))]">
                                    ${item.price.toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                    <span className="body-sm-400 text-[rgb(var(--gray-400))] line-through">
                                        ${item.originalPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="md:col-span-4 flex items-center gap-2 flex-wrap md:flex-nowrap">
                                {/* Buy Now Button */}
                                <button className="px-4 py-2 border border-[rgb(var(--gray-300))] rounded body-sm-500 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))] transition-colors">
                                    Buy Now
                                </button>

                                {/* Add To Cart Button */}
                                <button className="px-4 py-2 bg-[rgb(var(--primary-500))] text-white rounded body-sm-500 hover:bg-[rgb(var(--primary-600))] transition-colors">
                                    Add To Cart
                                </button>

                                {/* Remove from Wishlist */}
                                <button
                                    onClick={() => handleRemoveFromWishlist(item.id)}
                                    className="w-9 h-9 flex items-center justify-center rounded bg-[rgb(var(--primary-100))] text-[rgb(var(--primary-500))] hover:bg-[rgb(var(--primary-200))] transition-colors"
                                >
                                    <FaHeart className="text-sm" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {wishlistItems.length === 0 && (
                        <div className="px-6 py-12 text-center">
                            <p className="text-[rgb(var(--gray-500))]">Your wishlist is empty</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WishlistContent;
