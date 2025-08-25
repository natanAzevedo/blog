import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400","500", "600", "700"],
});

export const metadata = {
  title: "Blog - Inspirando através de histórias únicas",
  description: "Descubra artigos únicos sobre tecnologia, desenvolvimento pessoal e inovação. Conteúdo criado para expandir seus horizontes e transformar sua perspectiva.",
  keywords: "blog, tecnologia, desenvolvimento, inovação, histórias, conteúdo",
  author: "Blog",
  viewport: "width=device-width, initial-scale=1",
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
