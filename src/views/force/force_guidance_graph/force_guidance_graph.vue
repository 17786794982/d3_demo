<template>
  <div id="chart" class="v-chart">{{nodeName}}</div>
</template>
<script>
  import * as d3 from 'd3';
  import data from './data'
  
  export default {
    name: 'v-chart',
    data() {
      return {
        nodeName: '万科企业股份有限公司',
        nodeLabel: 'Company',
        root: {}, // 节点数据
        colors: [
          '#f97180',
          '#f48fb1',
          '#ce93d8',
          '#b387ff',
          '#9fa8da',
          '#90caf9',
          '#2ab6f6',
          '#80cbc4',
          '#00bfa5',
          '#d4e157',
          '#ffd741',
          '#ffb302',
          '#ff6f00',
          '#bf360c',
          '#6d4c41',
          '#a1887f',
          '#90a4ae',
          '#607d8b',
          '#3747f4',
          '#f44336'
        ],
        colors1: ['rgb(199,129,53)', 'rgb(55,125,198)', 'rgb(133,158,78)']
      };
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getData();
      });
    },
    methods: {
      // 获取数据
      getData() {
        this.root = data;
        for (let i = 0, len = this.root.children.length; i < len; i++) {
          let current = this.root.children[i];
          current.color = this.colors1[i] || '#6DCE9E';
        }
        // this.draw(this.root);
        this.update(this.root);
      },
      update(root) {
        let vm = this;
        let r = 50; // 节点半径
        let chart = document.getElementById('chart');
        let width = chart.clientWidth;
        let height = chart.clientHeight;
        let svg = d3
          .select('#chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .style('pointer-events', 'all')
          .append('g');
        let rect = svg
          .append('rect')
          .attr('width', '100%')
          .attr('height', '100%')
          .attr('fill', 'none')
          .style('pointer-events', 'all');
        let container = svg.append('g').attr('id', 'container');
        
        function zoomed() {
          container.attr(
            'transform',
            'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')'
          );
        }
        
        svg
          .call(
            d3.behavior
              .zoom()
              .scaleExtent([0.5, 2])
              .on('zoom', zoomed)
          )
          .on('dblclick.zoom', null);
        
        let tree = d3.layout.tree();
        let nodes = tree.nodes(root);
        let links = tree.links(nodes);
        let force = d3.layout
          .force()
          .linkStrength(1.5)
          .charge(-600)
          .distance(100)
          .size([width, height])
          .nodes(nodes)
          .links(links)
          .start();
        
        let link = container
          .append('g')
          .selectAll('.link')
          .data(links);
        link.exit().remove();
        link
          .enter()
          .append('g')
          .attr('class', 'relationship');
        
        // 箭头
        let marker = svg
          .append('defs')
          .append('marker')
          .attr('id', 'Triangle')
          .attr('refX', 6)
          .attr('refY', 3)
          .attr('markerUnits', 'userSpaceOnUse')
          .attr('markerWidth', 6)
          .attr('markerHeight', 9)
          .attr('orient', 'auto')
          .append('path')
          .style('fill', '#dddddd')
          .attr('d', 'M 0 0 6 3 0 6 1.5 3');
        
        let Innerlink = link
          .append('path')
          .attr('class', 'innerlink')
          .attr('marker-end', 'url(#Triangle)')
          .attr('fill', 'none')
          .style('stroke-width', d => {
            return !d.source.parent ? '2px' : '1px';
          })
          .style('stroke', d => {
            if (!d.source.parent) {
              return d.target.color;
            } else {
              if (d.source.color) {
                return d.source.color;
              } else {
                d.source.linkColor = d.source.parent.color;
                return d.source.linkColor;
              }
            }
          });
        
        let Outerlink = link
          .append('path')
          .attr('class', 'outerlink')
          .attr('fill', 'none')
          .style('opacity', '0')
          .style('stroke-width', '15')
          .style('stroke', 'rgb(166, 221, 255)')
          .style('cursor', 'pointer')
          .on('mouseover', function (d) {
            d3.select(this).style('opacity', '0.6');
          })
          .on('mouseout', function (d) {
            d3.select(this).style('opacity', '0');
          });
        
        let node = container
          .append('g')
          .selectAll('.node')
          .data(nodes);
        node.exit().remove();
        
        function mouseover(d) {
          console.log(d);
        }
        
        function mouseout(d) {
          d.fixed = true;
        }
        
        node
          .enter()
          .append('g')
          .attr('class', 'node')
          .on('mouseover', mouseover)
          .on('mouseout', mouseout)
          .call(
            force.drag().on('dragstart', function (d) {
              d3.event.sourceEvent.stopPropagation();
              d.fixed = true;
            })
          )
          .append('title')
          .text(d => {
            return d.title;
          });
        // Innernode
        node
          .append('svg:circle')
          .attr('r', d => {
            if (!d.parent) {
              d.r = 30;
              return d.r;
            } else {
              let num = 1 - d.depth * 0.2 || 0.1;
              d.r = r * num;
              return r * num;
            }
          })
          .style('cursor', 'pointer')
          .attr('stroke-width', '1px')
          .attr('stroke', '#ddd')
          .attr('fill', d => {
            if (!d.parent) {
              d.fontColor = '#fff';
              return '#5ca8db';
            } else {
              if (d.depth === 1 && d.color) {
                return d.color;
              } else {
                if (d.depth === 2) {
                  if (d.parent.name === '百度风投') {
                    d.fontColor = 'rgb(103,53,28)';
                    d.color = 'rgb(238,207,177)';
                  } else if (d.parent.name === '百度资本') {
                    d.fontColor = 'rgb(133,158,78)';
                    d.color = '#fff';
                  } else if (d.parent.name === '百度投资并购部') {
                    d.fontColor = 'rgb(73,111,133)';
                    d.color = 'rgb(213,227,237)';
                  }
                } else {
                  d.color = '#fff';
                }
                return d.color;
              }
            }
          })
          .on('mouseover', function () {
            d3.select(this)
              .style('stroke-width', '4px')
              .style('stroke', '#32B0FF')
              .style('cursor', 'pointer');
          })
          .on('mouseout', function () {
            d3.select(this).style('stroke-width', function () {
              return '0px';
            });
          });
  
        // OuterNode
        node
          .append('circle')
          .attr('class', 'outerNode')
          .attr('r', d => {
            if (!d.parent) {
              d.r = 30;
            } else {
              let num = 1 - d.depth * 0.2 || 0.1;
              d.r = r * num + 5;
            }
            return d.r;
          })
          .attr('stroke-width', '1px')
          .attr('stroke', '#ddd')
          .attr('fill', '#6ac6ff')
          .style('opacity', '0')
          .style('cursor', 'pointer')
          .on('mouseover', function () {
            d3.select(this).style('opacity', '0.3');
          })
          .on('mouseout', function () {
            d3.select(this).style('opacity', '0');
          });
  
        // outerNode1
        node
          .append('path')
          .attr('fill', '#859E4E') //  蓝色
          .attr('d', d => {
            if (!d.parent) {
              return 'M54,32.4A63,63 0 0,1 -54,32.4L-28,17.4A33,33 0 0,0 28,17.4Z';
            }
          });
        // outerNode2
        node
          .append('path')
          .attr('fill', '#C78135') // 橙色
          .attr('d', d => {
            if (!d.parent) {
              return 'M1,-63A63,63 0 0,1 55,30.5L29,15.5A33,33 0 0,0 1,-33Z';
            }
          });
        // outerNode3
        node
          .append('path')
          .attr('fill', '#377DC6') //  绿色
          .attr('d', d => {
            if (!d.parent) {
              return 'M-55,30.5A63,63 0 0,1 -1,-63L-1,-33A33,33 0 0,0 -29,15.5Z';
            }
          });
        let Textnode = node
          .append('text')
          .attr('class', 'text')
          .attr('y', d => {
            return -d.r / 2;
          })
          .attr('fill', d => {
            if (d.fontColor) {
              return d.fontColor;
            } else {
              return d.parent.fontColor;
            }
          })
          .style('font-size', d => {
            // let str = d.name;
            if (!d.parent) {
              return '20px';
            } else {
              let num = 1 - d.depth * 0.2 || 0.1;
              return 20 * num;
            }
          })
          .attr('pointer-events', 'none');
        // .text(d => {
        //   let a = d.name;
        //   return a;
        // });
        
        Textnode.selectAll('tspan')
          .data(d => {
            // debugger;
            let name = d.name;
            return [name.substr(0, 2), name.substr(2, 2), name.substr(4)];
          })
          .enter()
          .append('tspan')
          .attr('x', '0')
          .attr('dy', '1em')
          .text(d => {
            return d;
          });
        
        force.on('tick', function () {
          Innerlink.attr('d', function (d) {
            // let dx = d.target.x - d.source.x;
            // let dy = d.target.y - d.source.y;
            // dr = Math.sqrt(dx * dx + dy * dy) + 100;
            return (
              'M' +
              d.source.x +
              ',' +
              d.source.y +
              'L' +
              d.target.x +
              ',' +
              d.target.y
            );
            // return "M" + d.source.x + "," + d.source.y + "A"
            // + dr + "," + dr + " 0 0,1 "
            // + d.target.x + "," + d.target.y;
          });
          
          Outerlink.attr('d', function (d) {
            let dx = d.target.x - d.source.x;
            // let dy = d.target.y - d.source.y;
            // dr = Math.sqrt(dx * dx + dy * dy) + 100;
            if (dx > 0) {
              return (
                'M' +
                d.source.x +
                ',' +
                d.source.y +
                'L' +
                d.target.x +
                ',' +
                d.target.y
              );
            } else {
              return (
                'M' +
                d.target.x +
                ',' +
                d.target.y +
                'L' +
                d.source.x +
                ',' +
                d.source.y
              );
            }
          });
          node.attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
          });
        });
      }
    }
  };
</script>
<style lang="less">
  .v-chart {
    width: 800px;
    height: 800px;
    margin: 0 auto;
    border: 1px solid #ddd;
    // text,
    tspan {
      font-family: 'microsoft yahei';
      stroke-width: 1;
      font-size: 14px;
      
      text-anchor: middle; /* 文本水平居中 */
    }
  }
</style>
