import * as d3 from 'd3'

class BubbleGraph {
  constructor (tag, range, size = 4) {
    this.tag = tag
    this.range = range
    this.size = size
  }

  init () {
    let w = 1366
    let h = 600
    let range = this.range
    let that = this
    let nodes = d3.range(range).map(function () {
      return {
        radius: Math.random() * 20 + that.size
      }
    })
    let links = d3.range(range).map(function () {
      return {
        source: ~~d3.randomUniform(range)(),
        target: ~~d3.randomUniform(range)()
      }
    })
    let root = nodes[0]
    root.radius = Math.random() * 20 + 150
    root.fixed = true

    let color = d3.scaleOrdinal()
      .range(d3.schemeCategory10)

    let force = d3.forceSimulation()
      .nodes(nodes)
      // .velocityDecay(0.2)
      .force('link', d3.forceLink().id(function (d, i) {
        return i
      }))
      .force('collide', d3.forceCollide(function (d) {
        return d.radius + that.size / 2 + 2
      }).iterations(24).strength(0.5))
      .force('x', d3.forceX(w / 2).strength(0.25))
      .force('y', d3.forceY(h / 2).strength(0.25))
      .force('charge', d3.forceManyBody().strength(-20))
      .force('center', d3.forceCenter(w / 2, h / 2))

    let svg = this.tag.append('svg:svg').style('border', '1px dashed #CCC').style('user-select', 'none')
      .attr('width', w)
      .attr('height', h)

    let link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', 'transparent')

    let node = svg.selectAll('circle')
      .data(nodes.slice(1))
      .enter().append('svg:circle')
      .attr('r', function (d) {
        return d.radius - 2
      })
      .style('fill', function (d, i) {
        return color(i % 3)
      })
      .style('stroke', '#801111e0')
      .on('mouseover', function (d) {
        d3.select(this).style('stroke', '#801111e0')
        d3.select(this).style('stroke-width', '3')
      })
      .on('mouseout', function (d) {
        d3.select(this).style('stroke', '#801111e0')
        d3.select(this).style('stroke-width', '1')
      })
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      )

    let ticked = function (e) {
      link
        .attr('x1', function (d) {
          return d.source.x
        })
        .attr('y1', function (d) {
          return d.source.y
        })
        .attr('x2', function (d) {
          return d.target.x
        })
        .attr('y2', function (d) {
          return d.target.y
        })
      node
        .attr('cx', function (d) {
          return d.x
        })
        .attr('cy', function (d) {
          return d.y
        })
    }

    svg.on('mousemove', function () {
      let p1 = d3.mouse(this)
      root.x = p1[0]
      root.y = p1[1]
      force.alphaTarget(0.1)
    })

    force.nodes(nodes).on('tick', ticked)
    // force.force('link').links(links)
    // node.call(d3.drag()
    //   .on('start', dragstarted)
    //   .on('drag', dragged)
    //   .on('end', dragended)
    // )

    function dragstarted (d) {
      if (!d3.event.active) {
        force.alphaTarget(0.3).restart()
      }
      d.fx = d.x
      d.fy = d.y
    }

    function dragged (d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    function dragended (d) {
      if (!d3.event.active) {
        force.alphaTarget(0)
      }
      d.fx = null
      d.fy = null
    }
  }
}

export {
  BubbleGraph
}
