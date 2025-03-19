import Providers from '@/components/Providers'
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Metadata } from 'next';
import './globals.css'

// Done after the video and optional: add page metadata
export const metadata: Metadata = {
  title: "Sentinelle.online",
  description: "Sentinelle.online",
  icons: {icon: "/favicon.ico"},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <main>
        <Providers>{children}</Providers>
        </main>
        <ThemeToggle />
      </ThemeProvider>
      </body>
    </html>
  )
}
