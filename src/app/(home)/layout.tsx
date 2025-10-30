import Header from "@/components/Header";
import Title from "@/components/Title";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Title />
      </div>
      {children}
    </>
  );
}
