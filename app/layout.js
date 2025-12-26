import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Tech Flow - Inspirando através de histórias únicas",
  description: "Descubra artigos únicos e conteúdo de qualidade. Histórias criadas para expandir seus horizontes e transformar sua perspectiva.",
  keywords: "tech flow, blog, histórias, conteúdo, projetos, inspiração",
  author: "Tech Flow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.className} bg-gray-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
