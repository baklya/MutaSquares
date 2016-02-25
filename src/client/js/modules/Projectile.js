define(['d3', 'jquery'], function(d3, jq) {

  var module = function(svg, x0, y0, x, y, s) {

    var w = 1200;

    var h = 600;


    var speed = s; // +1 per tick

    var tick = 0;

    var removed = false;

    var shape = svg.append("circle")
      .attr("cx", x0)
      .attr("cy", y0)
      .attr("r", 3)
      .style("fill", "blue");

    var k = (y0 - y) / (x0 - x);

    var alpha = Math.atan(k);


    if (x0 > x) {
      alpha += Math.PI;
    }



    this.GetCoords = function() {
      return {
        x: parseFloat(shape.attr("cx")),
        y: parseFloat(shape.attr("cy"))
      };
    };

    


    this.Remove = function() {
      shape.remove();
      removed = true;
      
      shape
          .attr("cx", -100000)
          .attr("cy", -100000);
    };

    this.Tick = function(target) {


      if (!removed) {
        tick++;

        shape
          .attr("cx", (x0 + speed * tick * Math.cos(alpha)))
          .attr("cy", (y0 + speed * tick * Math.sin(alpha)));

      }


    };

  };

  return module;
});