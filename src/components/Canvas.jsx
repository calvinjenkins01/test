import React, { useRef, useEffect, useState } from 'react'

export default function Canvas({ mainVideoUrl, overlayVideoUrl, overlay, currentTime }) {
  const canvasRef = useRef(null)
  const mainVideoRef = useRef(null)
  const overlayVideoRef = useRef(null)
  const [videoDimensions, setVideoDimensions] = useState({ width: 1280, height: 720 })

  const CANVAS_WIDTH = Math.min(window.innerWidth - 48, 960)
  const CANVAS_HEIGHT = (CANVAS_WIDTH / 16) * 9

  useEffect(() => {
    if (!mainVideoRef.current) {
      mainVideoRef.current = new Image()
    }
    mainVideoRef.current.src = mainVideoUrl
    mainVideoRef.current.onloadedmetadata = () => {
      if (mainVideoRef.current instanceof HTMLVideoElement) {
        setVideoDimensions({
          width: mainVideoRef.current.videoWidth,
          height: mainVideoRef.current.videoHeight,
        })
      }
    }
  }, [mainVideoUrl])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawFrame = () => {
      const scaleX = CANVAS_WIDTH / videoDimensions.width
      const scaleY = CANVAS_HEIGHT / videoDimensions.height
      const scale = Math.min(scaleX, scaleY)

      const scaledWidth = videoDimensions.width * scale
      const scaledHeight = videoDimensions.height * scale
      const offsetX = (CANVAS_WIDTH - scaledWidth) / 2
      const offsetY = (CANVAS_HEIGHT - scaledHeight) / 2

      // Clear canvas
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Draw main video
      const mainVideo = document.querySelector('video[style*="none"]')
      if (mainVideo && mainVideo.readyState === mainVideo.HAVE_ENOUGH_DATA) {
        ctx.drawImage(mainVideo, offsetX, offsetY, scaledWidth, scaledHeight)
      }

      // Draw overlay
      if (overlayVideoUrl) {
        const overlayVideo = document.querySelectorAll('video')[1]
        if (overlayVideo && overlayVideo.readyState === overlayVideo.HAVE_ENOUGH_DATA) {
          ctx.save()

          const overlayX = (overlay.x / 100) * CANVAS_WIDTH
          const overlayY = (overlay.y / 100) * CANVAS_HEIGHT
          const overlayWidth = overlay.width
          const overlayHeight = overlay.height

          ctx.globalAlpha = overlay.opacity
          ctx.translate(overlayX + overlayWidth / 2, overlayY + overlayHeight / 2)
          ctx.rotate((overlay.rotation * Math.PI) / 180)
          ctx.scale(overlay.scale, overlay.scale)

          ctx.beginPath()
          ctx.roundRect(
            -overlayWidth / 2,
            -overlayHeight / 2,
            overlayWidth,
            overlayHeight,
            overlay.borderRadius
          )
          ctx.clip()

          ctx.drawImage(
            overlayVideo,
            -overlayWidth / 2,
            -overlayHeight / 2,
            overlayWidth,
            overlayHeight
          )

          ctx.restore()
        }
      }
    }

    drawFrame()
  }, [currentTime, overlayVideoUrl, overlay, CANVAS_WIDTH, videoDimensions])

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
      <div className="flex justify-center bg-black p-4 sm:p-6">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full max-w-full rounded-lg shadow-2xl"
          style={{ maxHeight: '70vh' }}
        />
      </div>
    </div>
  )
}
