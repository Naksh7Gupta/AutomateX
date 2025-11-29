// layout.js (server component)
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper"; // SessionProvider wrapper
import ThemeProvider from "./components/ThemeProvider";   // Client theme toggle

export const metadata = {
  title: "AutomateX",
  description:
    "An AI-powered productivity engine that automates tasks, organizes your workflow, and boosts your daily efficiency.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased relative overflow-x-hidden">
        {/* Wrap the whole app with SessionWrapper for useSession */}
        <SessionWrapper>
          {/* Theme toggle works inside ThemeProvider */}
          <ThemeProvider>
            <Navbar />
            <main className="min-h-screen pt-24">{children}</main>
            <Footer />
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
