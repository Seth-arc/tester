import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-10">
        {children}
      </main>
      <footer className="border-t bg-muted/50">
        <div className="container py-6 md:py-0 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by the Modulogica team. The source code is available on{" "}
              <a
                href="https://github.com/yourusername/module-design-lab"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">Modulogica</span>
      </Link>
      <nav className="flex gap-6">
        <Link
          href="/assessment"
          className={cn(
            "flex items-center text-sm font-medium text-muted-foreground",
            "transition-colors hover:text-primary"
          )}
        >
          Assessment
        </Link>
        <Link
          href="/design"
          className={cn(
            "flex items-center text-sm font-medium text-muted-foreground",
            "transition-colors hover:text-primary"
          )}
        >
          Design
        </Link>
        <Link
          href="/about"
          className={cn(
            "flex items-center text-sm font-medium text-muted-foreground",
            "transition-colors hover:text-primary"
          )}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={cn(
            "flex items-center text-sm font-medium text-muted-foreground",
            "transition-colors hover:text-primary"
          )}
        >
          Contact
        </Link>
      </nav>
    </div>
  )
}

function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

