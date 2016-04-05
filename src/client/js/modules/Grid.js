define(['d3', 'jquery', 'modules/Cell', 'simple-statistics'], function(d3, jq, cellModule, ss) {


  var module = function(svg, w) {

    var thisGrid = this;




    var cells = [];


    var maxCount = 40;

    for(var j = 0; j < maxCount; j++){
      
      
      setTimeout( function() {


        cells.push(new cellModule(Math.floor((Math.random() * 60) + 1), Math.floor((Math.random() * 30) + 1), null, cells, thisGrid));
        
      } , j *  78);

    
      
      
      
    }





    //var cell = ;

    //console.log(cell.Ask("your color?", "hex", 6));



    var drawGrid = function(s){
      d3.selectAll(".gridLine").remove();
      
      d3.selectAll(".cell").remove();
      
      var width = $( w ).width();
      var height = $( w ).height();
  
  
      var minCellWidth = 30;
  
      var thisCellWidth = width / Math.floor(width / minCellWidth)
      var thisCellHeight = height / Math.floor(height / minCellWidth)
      
      
      $.each(cells, function(i, cell){
        
        s.append("rect")
          .attr("class", "cell")
          .attr("fill", "#" + cell.Ask("your color?", "hex", 6))
          .attr("x", (cell.X() - 1) * thisCellWidth)
          .attr("y", (cell.Y() - 1) * thisCellHeight)
          .attr("width", thisCellWidth)
          .attr("height", thisCellHeight);
        
      })
      
      

      
      
      
      
      
      
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


    thisGrid.DrawGrid = function(){
      drawGrid(svg);
    } 

    drawGrid(svg);




    $( w ).on("orientationchange pageshow resize", function(){
      
      drawGrid(svg);
      
    });

  };

  return module;
});