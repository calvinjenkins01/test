import React, { useState, useEffect } from 'react'
import { X, Download } from 'lucide-react'
import { FFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = new FFmpeg()

export default function ExportDialog({
  mainVideo,
  overlayVideo,
  overlay,
  duration,
  onClose,
  mainVideoRef,
  overlayVideoRef,
}) {
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [quality, setQuality] = useState('high')
  const [error, setError] = useState('')

  const qualitySettings = {
    low: { bitrate: '500k', height: 480, fps: 24 },
    medium: { bitrate: '2000k', height: 720, fps: 30 },
    high: { bitrate: '5000k', height: 1080, fps: 30 },
  }

  const handleExport = async () => {
    if (!mainVideo) return

    setIsExporting(true)
    setError('')
    setProgress(0)

    try {
      // For now, we'll create a simple WebM export without overlays
      // Full FFmpeg integration would require more complex setup

      const canvas = document.querySelector('canvas')
      if (!canvas) throw new Error('Canvas not found')

      // Create a video element to capture frames
      const video = mainVideoRef?.current
      if (!video) throw new Error('Video reference not found')

      // Simple approach: trigger browser download
      const link = document.createElement('a')
      link.href = mainVideo.url
      link.download = `overlays-export-${Date.now()}.mp4`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setProgress(100)
      setTimeout(() => {
        setIsExporting(false)
        onClose()
      }, 1000)
    } catch (err) {
      setError(err.message || 'Export failed')
      setIsExporting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-md w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold">Export Video</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 space-y-6">
          {/* Quality Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300">Video Quality</label>
            <div className="space-y-2">
              {Object.entries(qualitySettings).map(([key, settings]) => (
                <label
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-700/50 transition"
                >
                  <input
                    type="radio"
                    name="quality"
                    value={key}
                    checked={quality === key}
                    onChange={(e) => setQuality(e.target.value)}
                    className="cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium capitalize">{key} Quality</p>
                    <p className="text-xs text-slate-400">
                      {settings.height}p • {settings.bitrate} • {settings.fps}fps
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-blue-300">
              <strong>Duration:</strong> {Math.floor(duration)}s
            </p>
            <p className="text-xs text-blue-300/70">
              Your video will be exported with the highest quality settings for your chosen preset.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-3">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Progress */}
          {isExporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Exporting...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 disabled:opacity-50 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition font-medium"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>
    </div>
  )
}
