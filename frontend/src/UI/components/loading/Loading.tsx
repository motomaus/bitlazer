import React, { useEffect, useState } from 'react'

export interface LoadingProps {
  text?: string
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ text = 'loading', className = '' }) => {
  const [loadText, setLoadText] = useState(text)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadText((prevLoadText) => {
        if (prevLoadText.length < text.length + 3) {
          return prevLoadText + '.'
        } else {
          return text
        }
      })
    }, 500)

    return () => clearInterval(interval)
  }, [text])

  return <span className={className}>{loadText}</span>
}

export default Loading
