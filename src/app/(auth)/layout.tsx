import NavBar from "@/components/common/NavBar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className='min-h-[calc(100vh-64px)]'>{children}</main>
    </>
  );
}
