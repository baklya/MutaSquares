define(['d3', 'jquery'], function(d3, jq) {

  var module = function(svg, x0, y0, a) {

    var w = 1200;

    var h = 600;

    var angle = a;
    var speed = 10;
    
    //var delta = 2 * Math.PI / 4000;

    var shape = svg.append("circle")
      .attr("cx", x0)
      .attr("cy", y0)
      .attr("r", 5)
      .style("fill", "white");



    this.GetCoords = function(){
      return {x: parseFloat(shape.attr("cx")), y: parseFloat(shape.attr("cy")) };
    };
    
    
    this.SetNextPosition = function() {
      
        if (y0 > h || y0 < 0) {
          angle = - angle;
        }



        if (x0 > w || x0 < 0) {
          angle = Math.PI - angle;
        }

      
      x0 = x0 + speed * Math.cos(angle);
      y0 = y0 + speed * Math.sin(angle);

      shape
        .attr("cx", x0)
        .attr("cy", y0);
    };
    
  };

  return module;
});