import Header from "@/components/Header";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/components/Footer";
import DataProvider from "./DataProvider";
import { ToastContainer } from "react-toastify";




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
              <main className='z-0'>
                <ToastContainer position="top-right" />
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
