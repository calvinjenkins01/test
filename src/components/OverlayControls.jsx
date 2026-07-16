import React, { useState, useRef, useEffect } from 'react'
import { Move } from 'lucide-react'

export default function OverlayControls({ overlay, onChange }) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleDragStart = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    const newX = Math.max(0, Math.min(100, overlay.x + (deltaX / rect.width) * 100))
    const newY = Math.max(0, Math.min(100, overlay.y + (deltaY / rect.height) * 100))

    onChange({ x: newX, y: newY })
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStart, overlay])

  const sliders = [
    { label: 'Position X', key: 'x', min: 0, max: 100, step: 1, unit: '%' },
    { label: 'Position Y', key: 'y', min: 0, max: 100, step: 1, unit: '%' },
    { label: 'Width', key: 'width', min: 50, max: 600, step: 10, unit: 'px' },
    { label: 'Height', key: 'height', min: 50, max: 450, step: 10, unit: 'px' },
    { label: 'Opacity', key: 'opacity', min: 0, max: 1, step: 0.05, unit: '' },
    { label: 'Rotation', key: 'rotation', min: -180, max: 180, step: 1, unit: '°' },
    { label: 'Scale', key: 'scale', min: 0.1, max: 2, step: 0.1, unit: 'x' },
    { label: 'Border Radius', key: 'borderRadius', min: 0, max: 50, step: 1, unit: 'px' },
  ]

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <Move size={20} /> Overlay Controls
      </h2>

      {/* Visual Preview with Drag */}
      <div
        ref={containerRef}
        className="relative w-full h-40 bg-slate-900 rounded-lg border border-slate-600 overflow-hidden cursor-move group"
        onMouseDown={handleDragStart}
      >
        <div
          className="absolute bg-blue-500/30 border-2 border-blue-400 transition-all group-hover:bg-blue-500/40"
          style={{
            left: `${overlay.x}%`,
            top: `${overlay.y}%`,
            width: `${Math.min(overlay.width * 0.2, 60)}px`,
            height: `${Math.min(overlay.height * 0.2, 45)}px`,
            transform: `rotate(${overlay.rotation}deg) scale(${overlay.scale})`,
            opacity: overlay.opacity,
            borderRadius: `${Math.min(overlay.borderRadius * 0.5, 8)}px`,
            cursor: 'grab',
          }}
        >
          <div className="absolute -right-2 -bottom-2 w-4 h-4 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition" />
        </div>
        <p className="absolute bottom-2 left-2 text-xs text-slate-400">Drag to reposition</p>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sliders.map(({ label, key, min, max, step, unit }) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300">{label}</label>
              <span className="text-sm bg-slate-700 px-2 py-1 rounded text-slate-200">
                {overlay[key].toFixed(key === 'opacity' ? 2 : 0)}{unit}
              </span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={overlay[key]}
              onChange={(e) => onChange({ [key]: parseFloat(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        ))}
      </div>

      {/* Quick Presets */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-300">Quick Positions</p>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {[
            { label: 'Top Left', x: 5, y: 5 },
            { label: 'Top Right', x: 75, y: 5 },
            { label: 'Bottom Left', x: 5, y: 75 },
            { label: 'Bottom Right', x: 75, y: 75 },
            { label: 'Center', x: 50, y: 50 },
            { label: 'Top Center', x: 50, y: 5 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => onChange({ x: preset.x, y: preset.y })}
              className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded transition font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
