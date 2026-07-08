import "./globals.css";

export const metadata = {
  title: "PharmaVoice AI",
  description: "AI-powered Pharmacy Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}