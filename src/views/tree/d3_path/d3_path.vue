<template>
  <div id='app'>
    <div class='content'></div>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import treeJson from './tree.json';
  // import logoImg from '@/assets/logo.png';
  
  export default {
    name: 'd3_path',
    data() {
      return {};
    },
    mounted() {
      this.$nextTick(() => {
        this.layoutFn();
      });
    },
    methods: {
      layoutFn() {
        let {width, height} = {
          width: 1000,
          height: 500
        };
        let svg = d3.select('.content')
          .append('svg')
          .attr('width', width)
          .attr('height', height);
        
        let defs = svg.append('defs');
        let marker = defs.append('marker')
          .attr('id', 'arrow')
          .attr('markerUnits', 'strokeWidth')
          .attr('markerWidth', 6)
          .attr('markerHeight', 6)
          .attr('viewBox', '0 0 6 6')
          .attr('refX', '3')
          .attr('refY', '3')
          .attr('orient', 'auto');
        marker.append('path')
          .attr('d', 'M0,0 L6,3 L0,6 L2,3 L0,0')
          .attr('fill', 'teal');
        
        let tree = d3.layout.tree()
          .size([width, height - 100])
          .separation((a, b) => {
            return a.parent === b.parent ? 1 : 2;
          });
        
        let diagonal = d3.svg.diagonal()
          .projection((d, i) => {
            if (i === 0) {
              return [d.x, d.y];
            }
            if (i === 3) {
              return [d.x, d.y - 30];
            }
            return [d.x, d.y];
          });
        
        let root = treeJson;
        let nodes = tree.nodes(root);
        nodes[0].y = 40;
        let links = tree.links(nodes);
        
        let link = svg.append('g')
          .classed('linkArea', true)
          .selectAll('.link')
          .data(links)
          .enter()
          .append('path')
          .classed('link', true)
          .attr('d', diagonal)
          .attr('fill', 'none')
          .attr('stroke', 'teal')
          .attr('stroke-width', 2)
          .attr('marker-end', 'url(#arrow)');
        
        let circleG = svg.append('g');
        
        let node = svg.append('g')
          .classed('nodeArea', true)
          .selectAll('.node')
          .data(nodes)
          .enter()
          .append('g')
          .classed('node', true)
          .attr('transform', (d, i) => {
            return 'translate(' + d.x + ',' + (d.y) + ')';
          });
        
        // node.append('image')
        //   .attr('width', 100)
        //   .attr('height', 100)
        //   .attr('xlink:href', logoImg)
        //   .attr('fill', '#fff')
        //   .attr('x', -50)
        //   .attr('y', -65);
        
        node.append('text')
          .text(d => d.name);
        
        function addCircle(i, delay) {
          debugger;
          let points = links[i];
          let path = link[0][i];
          let circle = circleG.append('circle')
            .classed('c', true)
            .attr('r', 6)
            .attr('fill', 'orangered')
            .attr('transform', 'translate(' + points.source.x + ',' + points.source.y + ')');
          
          circle.transition()
            .ease('linear')
            .delay(delay || 0)
            .duration(Math.random() * 500 + 1000)
            .attrTween('transform', (d, i, a) => {
              let l = path.getTotalLength(); // 路径的长度
              return (t) => {
                let p = path.getPointAtLength(t * l); // 返回给定路径上给定长度的点坐标
                return 'translate(' + p.x + ',' + p.y + ')';
              };
            })
            .each('end', () => {
              debugger;
              // d3.select(this).remove();
              d3.selectAll('.c').remove();
              addCircle(i, Math.random() * 500);
            });
        };
        
        link.each((d, i) => {
          console.log(d);
          if (d.source.name === '中国') {
            addCircle(i, Math.random() * 500);
          }
          // if (d.source.name === '四川' && d.target.name === '成都') {
          //   addCircle(i, Math.random() * 500);
          // }
        });
      }
    }
  };
</script>

<style>
</style>
