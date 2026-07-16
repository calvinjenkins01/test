import React from 'react'

export default function Timeline({ currentTime, duration, onSeek }) {
  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const time = percent * duration
    onSeek(Math.max(0, Math.min(time, duration)))
  }

  const percent = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="space-y-2">
      <div
        onClick={handleTimelineClick}
        className="relative w-full h-8 bg-slate-700 rounded-lg cursor-pointer group overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg transition-all"
          style={{ width: `${percent}%` }}
        />
        <div
          className="absolute top-0 h-full w-1 bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `${percent}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-slate-300 pointer-events-none">
          {duration > 0 && `${(percent).toFixed(0)}%`}
        </div>
      </div>
      <div className="flex justify-between text-xs text-slate-400">
        <span>{Math.floor(currentTime)}s</span>
        <span>{Math.floor(duration)}s</span>
      </div>
    </div>
  )
}
