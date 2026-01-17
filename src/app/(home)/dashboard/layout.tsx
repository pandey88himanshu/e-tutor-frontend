export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // DashboardPage component now handles the header and tabs
    // This layout just passes through children
    return <>{children}</>;
}
