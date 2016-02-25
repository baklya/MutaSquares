define(['d3', 'jquery'], function(d3, jq) {

  var module = function(svg, x0, y0, rx, ry, a) {

    var w = 1200;

    var h = 600;

    var angle = a;
    var delta = 2 * Math.PI / 4000;

    var offside = false;

    if (y0 + ry * Math.sin(angle) > h || y0 + ry * Math.sin(angle) < 0 || x0 + rx * Math.cos(angle) > w || x0 + rx * Math.cos(angle) < 0) {
      offside = true;
    }

    var shape = svg.append("circle")
      .attr("cx", (x0 + rx * Math.cos(angle)))
      .attr("cy", (y0 + ry * Math.sin(angle)))
      .attr("r", 5)
      .style("fill", "white");

    this.GetCoords = function(){
      return {x: parseFloat(shape.attr("cx")), y: parseFloat(shape.attr("cy")) };
    }

    this.SetNextPosition = function() {
      angle += delta;

      if (y0 + ry * Math.sin(angle) < h && y0 + ry * Math.sin(angle) > 0 && x0 + rx * Math.cos(angle) < w && x0 + rx * Math.cos(angle) > 0) {
        offside = false;
      }

      if (!offside) {

        if (y0 + ry * Math.sin(angle) > h) {
          x0 += 2 * (rx * Math.cos(angle));
          angle = Math.PI - angle;
        }


        if (y0 + ry * Math.sin(angle) < 0) {
          x0 += 2 * (rx * Math.cos(angle));
          angle = 3 * Math.PI - angle;
        }


        if (x0 + rx * Math.cos(angle) > w) {
          y0 += 2 * (ry * Math.sin(angle));
          angle = 2 * Math.PI - angle;
        }

        if (x0 + rx * Math.cos(angle) < 0) {
          y0 += 2 * (ry * Math.sin(angle));
          angle = 2 * Math.PI - angle;
        }

      }



      shape
        .attr("cx", (x0 + rx * Math.cos(angle)))
        .attr("cy", (y0 + ry * Math.sin(angle)));
    };

  };

  return module;
});