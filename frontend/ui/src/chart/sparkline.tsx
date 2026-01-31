import * as d3 from 'd3'
import { interpolatePath } from 'd3-interpolate-path'
import { CSSProperties, FC, useEffect, useMemo, useRef } from 'react'

interface SparklineProps {
  data: number[]
  className?: string
  style?: CSSProperties
  visible?: boolean
}

export const Sparkline: FC<SparklineProps> = ({
  data,
  className,
  style,
  visible = true,
}) => {
  const colors = useMemo(
    () => ({
      line: 'var(--primary, #4da3ff)',
      lineOpacity: 0.7,
      area: 'var(--primary-soft, rgba(77, 163, 255, 0.15))',
      areaOpacity: 1,
    }),
    [],
  )

  const svgRef = useRef<SVGSVGElement | null>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const node = svg.node()
    if (!node) return

    const width = node.clientWidth || node.getBoundingClientRect().width
    const height = node.clientHeight || node.getBoundingClientRect().height

    if (width === 0 || height === 0) return

    const maxHeight = () => {
      const maxVal = d3.max(data) || 0
      const minVal = d3.min(data) || 0
      const dataRange = maxVal - minVal

      if (maxVal > 0 && dataRange / maxVal < 0.1) {
        return height * 0.65
      }

      if (maxVal > 0) {
        return height * 0.35
      } else {
        return height
      }
    }

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) ?? 0])
      .range([height, maxHeight()])

    const line = d3
      .line<number>()
      .x((_, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveCatmullRom.alpha(0.5))

    const area = d3
      .area<number>()
      .x((_, i) => xScale(i))
      .y0(height)
      .y1((d) => yScale(d))
      .curve(d3.curveCatmullRom.alpha(0.5))

    if (!initializedRef.current) {
      svg.selectAll('*').remove()

      svg
        .append('path')
        .attr('class', 'area')
        .attr('fill', colors.area)
        .attr('fill-opacity', colors.areaOpacity)

      svg
        .append('path')
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', colors.line)
        .attr('stroke-opacity', colors.lineOpacity)
        .attr('stroke-width', 2)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')

      initializedRef.current = true
    }

    const areaPath = svg.select<SVGPathElement>('.area')
    const linePath = svg.select<SVGPathElement>('.line')

    if (!visible) {
      areaPath.datum(data).attr('d', area)
      linePath.datum(data).attr('d', line)
    } else {
      const t = svg.transition().duration(500).ease(d3.easeLinear)

      areaPath
        .datum(data)
        .transition(t as any)
        .attrTween('d', function (d) {
          const previous = d3.select(this).attr('d')
          const current = area(d)
          return interpolatePath(previous || '', current as string)
        })

      linePath
        .datum(data)
        .transition(t as any)
        .attrTween('d', function (d) {
          const previous = d3.select(this).attr('d')
          const current = line(d)
          return interpolatePath(previous || '', current as string)
        })
    }
  }, [colors, data, visible])

  return (
    <svg
      className={className}
      ref={svgRef}
      style={{ width: '100%', height: '100%', ...style }}
    />
  )
}
