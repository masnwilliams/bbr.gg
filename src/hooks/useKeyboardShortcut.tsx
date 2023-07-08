import { useEffect } from 'react'

type Key = 'mod' | 'shift' | 'alt' | string

export const useKeyboardShortcut = (keys: Key[], callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key)
      if (
        keys.every(
          (key) =>
            (key === 'mod' && event.ctrlKey) ||
            (key === 'mod' && event.metaKey) ||
            (key === 'shift' && event.shiftKey) ||
            (key === 'alt' && event.altKey) ||
            event.key.toLowerCase() === key
        )
      ) {
        callback()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [keys, callback])
}
