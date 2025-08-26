"use client"

import { useTheme } from "next-themes"

export function ProgressGradientDefs() {
  const { theme } = useTheme()

  const gradients = {
    light: {
      excellent: { x1: "0%", y1: "0%", x2: "100%", y2: "100%", stops: [{ offset: "0%", color: "#000000" }, { offset: "60%", color: "#00e72c" }] },
      good: { x1: "0%", y1: "0%", x2: "100%", y2: "100%", stops: [{ offset: "0%", color: "#000000" }, { offset: "60%", color: "#1d58ff" }] },
      average: { x1: "0%", y1: "0%", x2: "100%", y2: "100%", stops: [{ offset: "0%", color: "#000000" }, { offset: "60%", color: "#ffa000" }] },
      poor: { x1: "0%", y1: "0%", x2: "100%", y2: "100%", stops: [{ offset: "0%", color: "#000000" }, { offset: "60%", color: "#ff0000" }] },
    },
    dark: {
      excellent: { x1: "0%", y1: "0%", x2: "100%", y2: "100%", stops: [{ offset: "2%", color: "#00e72c00" }, { offset: "70%", color: "#00e72c" }] },
      good: { x1: "0%", y1: "0%", x2: "100%", y2: "100%", stops: [{ offset: "1%", color: "#1d58ff00" }, { offset: "100%", color: "#1d58ff" }] },
      average: { x1: "0%", y1: "0%", x2: "100%", y2: "100%", stops: [{ offset: "10%", color: "#ffa00024" }, { offset: "100%", color: "#ffa000" }] },
      poor: { x1: "0%", y1: "0%", x2: "100%", y2: "100%", stops: [{ offset: "0%", color: "#ff000000" }, { offset: "100%", color: "#ff0000" }] },
    },
  }

  const activeGradients = theme === 'dark' ? gradients.dark : gradients.light;

  return (
    <defs>
      <linearGradient id="excellent-gradient" x1={activeGradients.excellent.x1} y1={activeGradients.excellent.y1} x2={activeGradients.excellent.x2} y2={activeGradients.excellent.y2}>
        {activeGradients.excellent.stops.map((stop, index) => (
          <stop key={index} offset={stop.offset} stopColor={stop.color} />
        ))}
      </linearGradient>
      <linearGradient id="good-gradient" x1={activeGradients.good.x1} y1={activeGradients.good.y1} x2={activeGradients.good.x2} y2={activeGradients.good.y2}>
        {activeGradients.good.stops.map((stop, index) => (
          <stop key={index} offset={stop.offset} stopColor={stop.color} />
        ))}
      </linearGradient>
      <linearGradient id="average-gradient" x1={activeGradients.average.x1} y1={activeGradients.average.y1} x2={activeGradients.average.x2} y2={activeGradients.average.y2}>
        {activeGradients.average.stops.map((stop, index) => (
          <stop key={index} offset={stop.offset} stopColor={stop.color} />
        ))}
      </linearGradient>
      <linearGradient id="poor-gradient" x1={activeGradients.poor.x1} y1={activeGradients.poor.y1} x2={activeGradients.poor.x2} y2={activeGradients.poor.y2}>
        {activeGradients.poor.stops.map((stop, index) => (
          <stop key={index} offset={stop.offset} stopColor={stop.color} />
        ))}
      </linearGradient>
    </defs>
  )
}
