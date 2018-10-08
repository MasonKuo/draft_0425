// Readme
// please install d3(v4.0) first
// you can send a Tag(motherBoard) and Array(nodes) and Array(edges) to this part
// (motherBoard, nodes, edges)
// then use init() function to render graph

import * as d3 from 'd3'

class ForceDirectedGraph {
  constructor (motherBoard, nodes, edges) {
    this.motherBoard = motherBoard
    this.nodes = nodes
    this.edges = edges
  }

  init () {
    let colorScale = d3.scaleOrdinal()
      .domain(d3.range(this.nodes.length))
      .range(d3.schemeCategory10)
    let svg = this.motherBoard.append('svg').style('border', '1px dashed #CCC').style('user-select', 'none')
    let width = 800
    let height = 500
    svg.attr('width', width)
    svg.attr('height', height)
    let forceSimulation = d3.forceSimulation()
      .force('link', d3.forceLink())
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
    forceSimulation.nodes(this.nodes)
      .on('tick', ticked)
    forceSimulation.force('link')
      .links(this.edges)
      .distance(function (d) {
        return Math.ceil(d.value + 150)
      })
    let links = svg.append('g')
      .selectAll('line')
      .data(this.edges)
      .enter()
      .append('line')
      .attr('stroke', 'black')
      .attr('stroke-width', 1)
    // let linksText = svg.append('g')
    //   .selectAll('text')
    //   .data(this.edges)
    //   .enter()
    //   .append('text')
    //   .text(function (d) {
    //     return d.relation
    //   })
    let gs = svg.selectAll('.circleText')
      .data(this.nodes)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
        let cirX = d.x
        let cirY = d.y
        return 'translate(' + cirX + ', ' + cirY + ')'
      })
      .call(d3.drag()
        .on('start', started)
        .on('drag', dragged)
        .on('end', ended)
      )
    gs.append('circle')
      .attr('r', 5)
      .attr('fill', function (d, i) {
        return colorScale(d.group)
      })
    // gs.append('text')
    //   .attr('x', -10)
    //   .attr('y', -20)
    //   .attr('dy', 10)
    //   .text(function (d) {
    //     return d.name
    //   })

    // function
    function ticked () {
      links
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
      // linksText
      //   .attr('x', function (d) {
      //     return (d.source.x + d.target.x) / 2
      //   })
      //   .attr('y', function (d) {
      //     return (d.source.y + d.target.y) / 2
      //   })
      gs
        .attr('transform', function (d) {
          return 'translate(' + d.x + ', ' + d.y + ')'
        })
    }

    function started (d) {
      if (!d3.event.active) {
        forceSimulation.alphaTarget(0.8).restart()
      }
      d.fx = d.x
      d.fy = d.y
    }

    function dragged (d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    function ended (d) {
      if (!d3.event.active) {
        forceSimulation.alphaTarget(0)
      }
      d.fx = null
      d.fy = null
    }
  }
}

export {
  ForceDirectedGraph
}
