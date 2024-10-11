import { Loader, Header, Footer } from '@components/index'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { throttle } from 'lodash'

const MainLayout = () => {
  const linesRef = useRef<HTMLDivElement[]>([])
  const [showDot, setShowDot] = useState<{
    visible: boolean
    x: number
    y: number
    rotate: number
  }>({
    visible: false,
    x: 0,
    y: 0,
    rotate: 0,
  })

  useEffect(() => {
    linesRef.current.forEach((line) => {
      const initialRotate = parseFloat(line.dataset.rotate || '0')
      const randomOffset = Math.random() * 4 - 1 // Random offset from -2 to 2 degrees
      const randomAngle = initialRotate + randomOffset // Combine initial rotation with random offset

      line.style.setProperty('--initial-rotate', `${initialRotate}deg`)
      line.style.setProperty('--random-offset', `${randomOffset}deg`)
      line.dataset.rotate = `${randomAngle}` // Update the line's data-rotate attribute
      line.style.transform = `rotate(${randomAngle}deg)` // Apply rotation directly to the line
    })
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, rotate: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    // Position the dot based on mouse position within the line and apply rotation
    setShowDot({ visible: true, x: rect.left, y: rect.top, rotate })
  }

  const handleMouseMove = throttle((e: React.MouseEvent<HTMLDivElement>, rotate: number) => {
    const { clientX, clientY } = e
    setShowDot((prev) => ({ ...prev, x: clientX, y: clientY, rotate }))
  }, 100) // ограничиваем обновление состояния каждые 100ms
  const handleMouseLeave = () => {
    setShowDot({ visible: false, x: 0, y: 0, rotate: 0 })
  }

  return (
    <div className="relative bg-black min-h-screen flex flex-col overflow-hidden md:pointer-events-none md:[&_*]:pointer-events-none">
      <div className="w-full h-full absolute top-0 left-0">
        {showDot.visible && (
          <div
            className="w-[.5713rem] h-[.5713rem] bg-[#90e38c] rounded-full blur-[.0938rem] absolute z-30 dot"
            style={{
              top: showDot.y - 6,
              left: showDot.x - 6,
              transform: `rotate(${showDot.rotate}deg)`,
            }}
          >
            <div className="w-[4.8344rem] h-[4.8344rem] bg-[#63d45d] rounded-full blur-[3.75rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          </div>
        )}

        {/* Lines */}
        <div
          ref={(el) => el && linesRef.current.push(el)}
          className="w-[110vw] h-px left-0 top-[20.0331rem] absolute origin-top-left rotate-line hover-area"
          data-rotate="-17.62"
          onMouseEnter={(e) => handleMouseEnter(e, -17.62)}
          onMouseMove={(e) => handleMouseMove(e, -17.62)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full h-full bg-[#68d861] absolute top-0 left-0"></div>
        </div>

        <div
          ref={(el) => el && linesRef.current.push(el)}
          className="w-[110vw] h-px left-[1.1987rem] top-[66.6394rem] absolute origin-top-left rotate-line hover-area"
          data-rotate="-6.96"
          onMouseEnter={(e) => handleMouseEnter(e, -6.96)}
          onMouseMove={(e) => handleMouseMove(e, -6.96)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full h-full bg-[#68d861] absolute top-0 left-0"></div>
        </div>

        <div
          ref={(el) => el && linesRef.current.push(el)}
          className="w-[110vw] h-px left-[37.6rem] top-0 absolute origin-top-left rotate-line hover-area"
          data-rotate="37.45"
          onMouseEnter={(e) => handleMouseEnter(e, 37.45)}
          onMouseMove={(e) => handleMouseMove(e, 37.45)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full h-full bg-[#68d861] absolute top-0 left-0"></div>
        </div>

        <div
          ref={(el) => el && linesRef.current.push(el)}
          className="w-[110vw] h-px left-0 top-[19.5562rem] absolute origin-top-left rotate-line hover-area"
          data-rotate="-7.18"
          onMouseEnter={(e) => handleMouseEnter(e, -7.18)}
          onMouseMove={(e) => handleMouseMove(e, -7.18)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full h-full bg-[#68d861] absolute top-0 left-0"></div>
        </div>

        <div
          ref={(el) => el && linesRef.current.push(el)}
          className="w-[110vw] h-px left-0 md:left-[1.3313rem] top-[38.2575rem] absolute origin-top-left rotate-line hover-area"
          data-rotate="8.23"
          onMouseEnter={(e) => handleMouseEnter(e, 8.23)}
          onMouseMove={(e) => handleMouseMove(e, 8.23)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full h-full bg-[#68d861] absolute top-0 left-0"></div>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <Header />
        <main className="relative z-20 ">
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </div>
  )
}

export default MainLayout
