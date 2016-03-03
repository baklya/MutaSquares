define(['d3', 'jquery'], function(d3, jq) {

  var module = function(svg, w) {



    var drawGrid = function(s){
      d3.selectAll(".gridLine").remove();
      
      var width = $( w ).width();

      var height = $( w ).height();
  
  
      var minCellWidth = 30;
  
      var thisCellWidth = width / Math.floor(width / minCellWidth)
  
      var thisCellHeight = height / Math.floor(height / minCellWidth)
      
      for(var x = 0; x < width; x += thisCellWidth){
      
        s.append("line")
          .attr("class", "gridLine")
          .attr("x1", x)
          .attr("y1", 0)
         .attr("x2", x)
         .attr("y2", height)
         .attr("stroke-width", 2)
         .attr("stroke", "black");
      }
      
      
      for(var y = 0; y < height; y += thisCellHeight){
        
        s.append("line")
          .attr("class", "gridLine")
          .attr("x1", 0)
          .attr("y1", y)
         .attr("x2", width)
         .attr("y2", y)
         .attr("stroke-width", 2)
         .attr("stroke", "black");
      }
    }

    drawGrid(svg);



    

    
    $( w ).on("orientationchange pageshow resize", function(){
      
      drawGrid(svg);
      
      //width = $( w ).width();

      //height = $( w ).height();
      
      //line
      //  .attr("x2", width)
      //  .attr("y2", height);


      
    });

  };

  return module;
});