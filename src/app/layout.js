import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import DataProvider from "./DataProvider";


export const metadata = {
  title: "চিথলিয়া কেন্দ্রীয় জামে মসজিদ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <DataProvider>
          <div>
            <header className='z-50'>
              <Header />
            </header>
            <main className='z-0 py-5 mb-5'>
              {children}
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
