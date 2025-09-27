import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400","500", "600", "700"],
});

export const metadata = {
  title: "Blog - Inspirando através de histórias únicas",
  description: "Descubra artigos únicos e conteúdo de qualidade. Histórias criadas para expandir seus horizontes e transformar sua perspectiva.",
  keywords: "blog, histórias, conteúdo, projetos, inspiração",
  author: "Blog",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: null,
    shortcut: null,
    apple: null,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="data:,"/>
      </head>
      <body className={`${outfit.className} bg-gray-900 text-white`}>
        {children}
      </body>
    </html>
  );
}
