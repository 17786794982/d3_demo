<template>
  <div id='app'>
    <div class='content'></div>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import treeJson from './tree.json';
  // import logoImg from '@/assets/logo.png';
  import path_icon from './img/path.svg';
  
  export default {
    name: 'd3_path',
    data() {
      return {
        id_index: 0,
        direction: 'from',  // from:从下向上；to: 从上向下
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.layoutFn();
      });
    },
    methods: {
      layoutFn() {
        let self = this;
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
  
        let node = svg.append('g')
          .classed('nodeArea', true)
          .selectAll('.node')
          .data(nodes, d => d.id || (d.id = ++this.id_index))
          .enter()
          .append('g')
          .classed('node', true)
          .attr('transform', d => {
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
          .text(d => d.name)
          .attr('text-anchor', 'middle');
        
        let link = svg.append('g')
          .classed('linkArea', true)
          .selectAll('.link')
          .data(links)
          .enter()
          .append('path')
          .classed('link', true)
          .attr('d', diagonal)
          .attr('id', d => `path_${d.source.id}_${d.target.id}`)
          .attr('fill', 'none')
          .attr('stroke', 'teal')
          .attr('stroke-width', 2)
          .attr('marker-end', 'url(#arrow)');
  
  
        function animatePath(i) {
          let path = link[0][i];
          let d_str = path.getAttribute('d');
          // debugger;
          let d_arr = d_str.split(' ');
          let d_arr0 = d_arr[0].split('C');
          let new_path = `M${d_arr[2]}C${d_arr[1]} ${d_arr0[1]} ${d_arr0[0].substr(1)}`;
          let d_path_id = path.id;
          let img = svg.append('image')
            .attr({
              'width': '20',
              'height': '10',
              'x': '-10',
              'y': '-5',
              'xlink:href': path_icon,
            });
          let animateMotion = img.append('animateMotion')
            .attr({
              'dur': '5s',
              'fill': 'freeze',
              'rotate': 'auto',
              'repeatCount': 'indefinite',
              'path': new_path,
            });
          animateMotion.append('mpath')
            .attr('xlink:href', () => {
              if (self.direction === 'to') {
                return `#${d_path_id}`
              }
            });
        }
        
        link.each((d, i) => {
          if ((d.source.name === '四川' && d.target.name === '成都1') || (d.source.name === '中国' && d.target.name === '四川')) {
            animatePath(i);
          }
        });
      }
    }
  };
</script>

<style>
</style>
