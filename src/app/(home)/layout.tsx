import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import TopNavbar from "@/components/common/TopNavbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNavbar />
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
