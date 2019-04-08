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
      <rect x="-10" y="-10" width="20" height="20" style="fill:#ff9;stroke:black">
        <animateMotion
            path="M50,135C100,25 150,225 200,125"
            dur="6s" fill="freeze"
            repeatCount="indefinite"
            rotate="auto">
        </animateMotion>
      </rect>
    </svg>
    <h5>沿着path运动2</h5>
    <svg width="200" height="200">
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
  </div>
</template>

<script>
  export default {
    name: 'vAnimate',
    data() {
      return {};
    },
    methods: {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

</style>
