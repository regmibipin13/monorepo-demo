import { Inter } from "next/font/google";
import Head from 'next/head';
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inline Hiring",
  description: "Inline Hiring is a job board for developers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>
      <body className={inter.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
