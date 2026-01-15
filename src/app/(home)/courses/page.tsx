import PageHeader from "@/components/common/PageHeader";
import CourseListing from "@/components/home/courses/CourseListing";
import React from "react";

const CoursesPage = () => {
    return (
        <div>
            <PageHeader
                title="All Courses"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Courses" },
                ]}
            />
            <CourseListing />
        </div>
    );
};

export default CoursesPage;
