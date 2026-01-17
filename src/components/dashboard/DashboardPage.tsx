"use client";

import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardTabs, { TabName } from "./DashboardTabs";
import DashboardContent from "./DashboardContent";
import CoursesContent from "./CoursesContent";
import TeachersContent from "./TeachersContent";
import MessageContent from "./MessageContent";
import WishlistContent from "./WishlistContent";
import PurchaseHistoryContent from "./PurchaseHistoryContent";
import SettingsContent from "./SettingsContent";

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState<TabName>("dashboard");

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <DashboardContent />;
            case "courses":
                return <CoursesContent />;
            case "teachers":
                return <TeachersContent />;
            case "message":
                return <MessageContent />;
            case "wishlist":
                return <WishlistContent />;
            case "purchase-history":
                return <PurchaseHistoryContent />;
            case "settings":
                return <SettingsContent />;
            default:
                return <DashboardContent />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Dashboard Header with user profile */}
            <DashboardHeader />

            {/* Tab Navigation */}
            <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Page Content */}
            <main className="flex-1 bg-white">
                {renderContent()}
            </main>
        </div>
    );
};

export default DashboardPage;
