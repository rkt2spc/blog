'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import DarkThemeIcon from './dark.svg'
import LightThemeIcon from './light.svg'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="h-8 w-8 rounded p-1"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <DarkThemeIcon />
      ) : (
        <LightThemeIcon />
      )}
    </button>
  )
}
