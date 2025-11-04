import Title from "@/components/Title";
import { Separator } from "@/components/ui/separator";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Title />
      </div>
      <div className="w-full mx-auto px-24">
        <Separator className="w-full" />
      </div>
      {children}
    </>
  );
}
