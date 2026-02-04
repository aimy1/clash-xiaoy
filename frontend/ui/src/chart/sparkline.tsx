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
<<<<<<< HEAD
      line: 'var(--primary, #00fff0)',
      lineOpacity: 0.7,
      area: 'var(--primary-soft, rgba(0, 255, 240, 0.15))',
=======
      line: 'var(--primary, #4da3ff)',
      lineOpacity: 0.7,
      area: 'var(--primary-soft, rgba(77, 163, 255, 0.15))',
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
      areaOpacity: 1,
    }),
    [],
  )

  const svgRef = useRef<SVGSVGElement | null>(null)
<<<<<<< HEAD
=======
  const initializedRef = useRef(false)
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
<<<<<<< HEAD

    const { width, height } = svg.node()?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
    }

    const maxHeight = () => {
      const dataRange = d3.max(data)! - d3.min(data)!

      if (dataRange / d3.max(data)! < 0.1) {
        return height * 0.65
      }

      if (d3.max(data)) {
=======
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
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
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
<<<<<<< HEAD
      .x((d, i) => xScale(i))
=======
      .x((_, i) => xScale(i))
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
      .y((d) => yScale(d))
      .curve(d3.curveCatmullRom.alpha(0.5))

    const area = d3
      .area<number>()
<<<<<<< HEAD
      .x((d, i) => xScale(i))
=======
      .x((_, i) => xScale(i))
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
      .y0(height)
      .y1((d) => yScale(d))
      .curve(d3.curveCatmullRom.alpha(0.5))

<<<<<<< HEAD
    svg.selectAll('*').remove()

    svg
      .append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('fill', colors.area)
      .attr('fill-opacity', colors.areaOpacity)
      .attr('d', area)

    svg
      .append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', colors.line)
      .attr('stroke-opacity', colors.lineOpacity)
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('d', line)

    const updateChart = () => {
      // Skip animation if component is not visible to prevent performance issues
      if (!visible) {
        // Update without animation
        svg.select('.area').datum(data).attr('d', area)
        svg.select('.line').datum(data).attr('d', line)
        return
      }

      xScale.domain([0, data.length - 1])
      yScale.domain([0, d3.max(data) ?? 0])

      const t = svg.transition().duration(750).ease(d3.easeCubic)
      svg
        .select('.area')
=======
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
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
        .datum(data)
        .transition(t as any)
        .attrTween('d', function (d) {
          const previous = d3.select(this).attr('d')
          const current = area(d)
<<<<<<< HEAD
          return interpolatePath(previous, current as string)
        })

      svg
        .select('.line')
=======
          return interpolatePath(previous || '', current as string)
        })

      linePath
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
        .datum(data)
        .transition(t as any)
        .attrTween('d', function (d) {
          const previous = d3.select(this).attr('d')
          const current = line(d)
<<<<<<< HEAD
          return interpolatePath(previous, current as string)
        })
    }

    updateChart()
=======
          return interpolatePath(previous || '', current as string)
        })
    }
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
  }, [colors, data, visible])

  return (
    <svg
      className={className}
      ref={svgRef}
      style={{ width: '100%', height: '100%', ...style }}
    />
  )
}
