define(['d3', 'jquery', 'modules/Grid', 'modules/Hunter', 'simple-statistics'], function(d3, jq, g, h, ss) {


  var module = function(container) {

    console.log(ss);
    console.log(ss.sum([1, 2, 3])); // 6
    
    var svg = d3.select(container).append("svg")
      .attr("width", "100%")
      .append("g");

    //svg.attr("transform", "translate(" + [20, 20] + ")");


    // TODO грид рисуется статичным, он ресайзится в зависимости от вьюпорта

    var showTime = svg.append('text')
      .attr("x", 20)
      .attr("y", 20)
      .attr("fill", "red")
      .text("");

    g(svg, window);


    var prev = performance.now();
    var times = 0;

    requestAnimationFrame(function measure(time) {
      prev = time;

      showTime.text(time + "");
      // TODO каждую секунду делаем итерацию 


      requestAnimationFrame(measure);
    })

  };

  return module;
});