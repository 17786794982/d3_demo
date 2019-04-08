<template>
  <div>
    <h4>动画时间与同步动画</h4>
    <svg>
      <rect x="10" y="10" width="200" height="200" stroke="black" fill="none">
        <animate id="c1"
                 attributeName="width"
                 attributeType="XML"
                 to="20"
                 begin="0s" dur="5s"
                 repeatCount="indefinite"
                 fill="freeze">
        </animate>
      </rect>
      <circle cx="120" cy="60" r="10" stroke="black" fill="none">
        <animate attributeName="r"
                 attributeType="XML"
                 begin="c1.end+5s"
                 from="10" to="20"
                 repeatCount="indefinite"
                 dur="4s">
        </animate>
      </circle>
    </svg>
  
    <h4>多边形和path动画</h4>
    <svg>
      <polygon points="30 30 70 30 90 70 10 70" style="fill: #fcc; stroke: black;">
        <animate attributeName="points"
                 attributeType="XML"
                 to="50 30 70 50 50 90 30 50"
                 repeatCount="indefinite"
                 begin="0s" dur="5s" fill="freeze">
        </animate>
      </polygon>
      <path d="M15 50 Q40 15,50 50,65 32,100 40" style="fill:#fcc;stroke:black" transform="translate(0,50)">
        <animate
            attributeName="d"
            attributeType="XML"
            to="M50 15Q15 40,50 50,32 65,40 100"
            begin="0s" dur="5s" fill="freeze"
            repeatCount="indefinite">
        </animate>
      </path>
    </svg>
  
    <h4>沿着path运动</h4>
    <h5>沿着path运动1</h5>
    <svg width="200" height="200">
      <path id="movePath" d="M50,135C100,25 150,225 200,125" fill="none" stroke="black"></path>
      <rect x="-10" y="-10" width="20" height="20"
            style="fill:#ff9; stroke:black; animation-direction:reverse;">
        <animateMotion
            path="M200,125C150,225 100,25 50,135"
            dur="6s"
            fill="freeze"
            repeatCount="indefinite"
            rotate="auto">
        </animateMotion>
      </rect>
    </svg>
    <h5>沿着path运动2--已经有了path轨迹</h5>
    <svg width="200" height="00">
      <path id="movePath" d="M50,135C100,25 150,225 200,125" fill="none" stroke="black"></path>
      <rect x="-10" y="-10" width="20" height="20" style="fill:#ff9;stroke:black">
        <animateMotion dur="6s"
                       fill="freeze"
                       rotate="auto"
                       repeatCount="indefinite">
          <mpath xlink:href="#movePath"></mpath>
        </animateMotion>
      </rect>
    </svg>
    <h5>沿着path运动3--img</h5>
    <svg id="animate_img" width="200" height="200"></svg>
  
    <h4>CSS处理SVG动画</h4>
    <svg width="200" height="200">
      <defs>
        <g id="starDef">
          <circle cx="50" cy="50" r="10"></circle>
        </g>
      </defs>
      <use id="star" class="starStyle" xlink:href="#starDef" fill="#008000"></use>
    </svg>
  
    <h4>123</h4>
    <svg width="120" height="120" viewBox="0 0 120 120">
    
      <!-- Draw the outline of the motion path in grey, along
           with 2 small circles at key points -->
      <path d="M10,110 A120,120 -45 0,1 110 10"
            stroke="lightgrey" stroke-width="2"
            fill="none" id="theMotionPath"/>
      <path d="M110 10 A120,120 -45 0,1 10,110"
            stroke="lightgrey" stroke-width="2"
            id="theMotionPath_1"
            fill="none"></path>
      <circle cx="10" cy="110" r="3" fill="lightgrey"/>
      <circle cx="110" cy="10" r="3" fill="lightgrey"/>
    
      <!-- Here is a red circle which will be moved along the motion path. -->
      <circle r="5" fill="red">
      
        <!-- Define the motion path animation -->
        <animateMotion dur="6s" repeatCount="indefinite">
          <mpath xlink:href="#theMotionPath"/>
        </animateMotion>
      </circle>
    </svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';
  import animatePath from './img/path.svg';
  
  export default {
    name: 'vAnimate',
    data() {
      return {};
    },
    mounted() {
      this.$nextTick(() => {
        this.animateImg();
      })
    },
    methods: {
      animateImg() {
        let svg = d3.select('#animate_img');
        svg.append('path')
          .attr({
            'id': 'movePath',
            'd': 'M50,135C100,25 150,225 200,125',
            'fill': 'none',
            'stroke': 'black',
          });
        let rect = svg.append('image')
          .attr({
            'x': '-10',
            'y': '-10',
            'width': '20',
            'height': '20',
            'fill': '#ff9',
            'stroke': '#000',
            'xlink:href': animatePath,
          });
        let animateMotion = rect.append('animateMotion')
          .attr({
            'dur': '5s',
            'fill': 'freeze',
            'rotate': 'auto',
            'repeatCount': 'indefinite',
          });
        animateMotion.append('mpath')
          .attr('xlink:href', '#movePath');
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .starStyle {
    animation-name: starAnim;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    /*animation-direction: reverse;*/
    animation-timing-function: ease;
    animation-play-state: running;
  }
  
  @keyframes starAnim {
    0% {
      fill: red;
      transform: translate(100px, 100px);
    }
    50% {
      fill: green;
      transform: translate(120px, 100px);
    }
    100% {
      fill: blue;
      transform: translate(100px, 120px);
    }
  }
</style>
