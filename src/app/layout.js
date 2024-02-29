import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ReduxProvider } from "@/store/provider";

export const metadata = {
  title: "Home",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body>
          <header className={"fixed"}>
            <Header />
          </header>
          <main className={"main"}>{children}</main>
          <footer className={"footer"}>
            <Footer />
          </footer>
        </body>
      </ReduxProvider>
    </html>
  );
}
