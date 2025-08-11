"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TimerProps {
  initialTime: number
  onTimeUp?: () => void
  className?: string
  showWarning?: boolean
  warningThreshold?: number
}

export function Timer({
  initialTime,
  onTimeUp,
  className,
  showWarning = true,
  warningThreshold = 300,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    setTimeLeft(initialTime)
  }, [initialTime])

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const isWarning = showWarning && timeLeft <= warningThreshold && timeLeft > 0

  return (
    <div
      className={cn(
        "font-mono",
        isWarning && "timer-warning text-yellow-500",
        timeLeft <= 60 && timeLeft > 0 && "text-red-500",
        className,
      )}
    >
      {formatTime(timeLeft)}
    </div>
  )
}
