"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const SettingsContent = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    // Derive name parts from username if available
    const getNameFromUsername = () => {
        const name = user?.username || "Kevin Gilbert";
        const parts = name.split(/[\s._-]+/);
        return {
            first: parts[0] || "",
            last: parts.slice(1).join(" ") || ""
        };
    };

    const nameParts = getNameFromUsername();

    // Account settings state
    const [firstName, setFirstName] = useState(nameParts.first);
    const [lastName, setLastName] = useState(nameParts.last);
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [title, setTitle] = useState("");
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);

    // Password state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const MAX_TITLE_LENGTH = 50;

    // Get initials for placeholder
    const getInitials = () => {
        const first = firstName || "K";
        const last = lastName || "G";
        return `${first[0]}${last[0] || first[1] || ""}`.toUpperCase();
    };

    // Handle profile image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                alert("Image size should be under 1MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
                setImageError(false);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle save changes
    const handleSaveChanges = () => {
        console.log("Saving changes:", { firstName, lastName, username, email, title });
        // API call to save changes
    };

    // Handle change password
    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log("Changing password");
        // API call to change password
    };

    return (
        <div className="w-full bg-white min-h-screen">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                {/* Account Settings Section */}
                <div className="mb-8 sm:mb-10">
                    <h2 className="text-base sm:text-lg font-semibold text-[rgb(var(--gray-900))] mb-4 sm:mb-6">
                        Account settings
                    </h2>

                    <div className="border border-[rgb(var(--gray-200))] rounded-lg p-4 sm:p-6">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                            {/* Profile Photo Section */}
                            <div className="flex flex-col items-center mx-auto md:mx-0">
                                {/* Photo */}
                                <div className="relative w-32 h-40 sm:w-40 sm:h-48 mb-3 sm:mb-4">
                                    <div className="w-full h-full rounded-lg overflow-hidden bg-[rgb(var(--gray-200))]">
                                        {profileImage && !imageError ? (
                                            <Image
                                                src={profileImage}
                                                alt="Profile"
                                                fill
                                                className="object-cover"
                                                onError={() => setImageError(true)}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[rgb(var(--gray-100))] to-[rgb(var(--gray-300))]">
                                                <span className="text-3xl sm:text-4xl font-semibold text-[rgb(var(--gray-600))]">
                                                    {getInitials()}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Upload Button Overlay */}
                                    <label className="absolute bottom-0 left-0 right-0 bg-[rgb(var(--gray-900))]/80 text-white py-1.5 sm:py-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-[rgb(var(--gray-900))] transition-colors rounded-b-lg">
                                        <FaCamera className="text-xs sm:text-sm" />
                                        <span className="body-xs-500 text-xs sm:text-sm">Upload Photo</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {/* Image Guidelines */}
                                <p className="body-xs-400 text-[rgb(var(--gray-500))] text-center max-w-[140px] sm:max-w-[160px] text-xs">
                                    Image size should be under 1MB and image ratio needs to be 1:1
                                </p>
                            </div>

                            {/* Form Fields */}
                            <div className="flex-1 space-y-4 sm:space-y-5">
                                {/* Full Name */}
                                <div>
                                    <label className="block body-sm-500 text-[rgb(var(--gray-700))] mb-1.5 sm:mb-2 text-sm">
                                        Full name
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                        <input
                                            type="text"
                                            placeholder="First name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-[rgb(var(--gray-200))] rounded text-sm text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-[rgb(var(--gray-200))] rounded text-sm text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                                        />
                                    </div>
                                </div>

                                {/* Username */}
                                <div>
                                    <label className="block body-sm-500 text-[rgb(var(--gray-700))] mb-1.5 sm:mb-2 text-sm">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[rgb(var(--gray-200))] rounded text-sm text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block body-sm-500 text-[rgb(var(--gray-700))] mb-1.5 sm:mb-2 text-sm">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[rgb(var(--gray-200))] rounded text-sm text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                                    />
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block body-sm-500 text-[rgb(var(--gray-700))] mb-1.5 sm:mb-2 text-sm">
                                        Title
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Your title, profession or small biography"
                                            value={title}
                                            onChange={(e) => {
                                                if (e.target.value.length <= MAX_TITLE_LENGTH) {
                                                    setTitle(e.target.value);
                                                }
                                            }}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-14 sm:pr-16 border border-[rgb(var(--gray-200))] rounded text-sm text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                                        />
                                        <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-xs text-[rgb(var(--gray-400))]">
                                            {title.length}/{MAX_TITLE_LENGTH}
                                        </span>
                                    </div>
                                </div>

                                {/* Save Changes Button */}
                                <button
                                    onClick={handleSaveChanges}
                                    className="w-full sm:w-auto px-6 py-2 sm:py-2.5 bg-[rgb(var(--primary-500))] text-white rounded text-sm font-medium hover:bg-[rgb(var(--primary-600))] transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Change Password Section */}
                <div>
                    <h2 className="text-base sm:text-lg font-semibold text-[rgb(var(--gray-900))] mb-4 sm:mb-6">
                        Change password
                    </h2>

                    <div className="max-w-full sm:max-w-md space-y-4 sm:space-y-5">
                        {/* Current Password */}
                        <div>
                            <label className="block body-sm-500 text-[rgb(var(--gray-700))] mb-1.5 sm:mb-2 text-sm">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-10 sm:pr-12 border border-[rgb(var(--gray-200))] rounded text-sm text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))] hover:text-[rgb(var(--gray-600))]"
                                >
                                    {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block body-sm-500 text-[rgb(var(--gray-700))] mb-1.5 sm:mb-2 text-sm">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-10 sm:pr-12 border border-[rgb(var(--gray-200))] rounded text-sm text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))] hover:text-[rgb(var(--gray-600))]"
                                >
                                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block body-sm-500 text-[rgb(var(--gray-700))] mb-1.5 sm:mb-2 text-sm">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-10 sm:pr-12 border border-[rgb(var(--gray-200))] rounded text-sm text-[rgb(var(--gray-700))] placeholder:text-[rgb(var(--gray-400))] focus:outline-none focus:border-[rgb(var(--primary-500))]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-400))] hover:text-[rgb(var(--gray-600))]"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Change Password Button */}
                        <button
                            onClick={handleChangePassword}
                            className="w-full sm:w-auto px-6 py-2 sm:py-2.5 bg-[rgb(var(--primary-500))] text-white rounded text-sm font-medium hover:bg-[rgb(var(--primary-600))] transition-colors"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsContent;
