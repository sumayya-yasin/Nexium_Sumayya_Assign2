import "./global.css";
import { cn } from "@/lib/utils";


export const metadata = {
  title: "Blog Summarizer",
  description: "Summarize blogs and translate to Urdu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-slate-50")}>
        {children}
      </body>
    </html>
  );
}
