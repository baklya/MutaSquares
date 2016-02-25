define(['d3', 'jquery', 'modules/Projectile'], function(d3, jq, p) {

  var module = function(svg, x0, y0, t, paintModule, sign, svg) {

    var w = 1200;

    var h = 600;

    var coolDown = 20;

    var target = t;

    var ammoCount = 40;

    var bulletSpeed = 5;

    var targetVelocity = {
      x: 0,
      y: 0
    };
    
    var targetPrevPos = target.GetCoords();
    
    var targetAccel = {
      x: 0,
      y: 0
    };

    var targetPrevVelocity = {x: 0, y: 0};

    var shape = svg.append("circle")
      .attr("cx", x0)
      .attr("cy", y0)
      .attr("r", 15)
      .style("fill", "red");

    var bullets = [];

    var fire = function(targ) {
      coolDown = 20;

      var bulletVelocity = {
        x: 0,
        y: 0
      };




      var aim = {
        x: 0,
        y: 0
      };
      
      
      var T = -1;


      var a = bulletSpeed * bulletSpeed - targetVelocity.x * targetVelocity.x - targetVelocity.y * targetVelocity.y;
      var b = -2 * ((targ.x - x0) * targetVelocity.x + (targ.y - y0) * targetVelocity.y);
      var c = -((targ.x - x0) * (targ.x - x0) + (targ.y - y0) * (targ.y - y0));

      var a2 = 2 * a;
      var ac = 4 * a * c;
      var dis = b * b;
      dis = dis - ac;
      if (dis < 0) {
        console.log("no roots");
      }
      else {
        var dis_sqrt = Math.sqrt(dis);
        var x1 = -b + dis_sqrt;
        x1 = x1 / a2;
        var x2 = -b - dis_sqrt;
        x2 = x2 / a2;
        
        if(x1 > 0){
          T = x1;
        }
        
        if(x2 > 0 && x2 < x1){
          T = x2;
        }
        
        

      }


      if(T > 0 && ammoCount > 0){

        aim.x = targ.x + targetVelocity.x * T;

        aim.y = targ.y + targetVelocity.y * T;

        paintModule.IncrShots();
        ammoCount--;
        bullets.push(new p(svg, x0, y0, aim.x, aim.y, bulletSpeed));
      }


      
    };


    //this.SetTarget = function(t){
    //  target = t;
    //} 





    this.Tick = function() {


      targetVelocity.x = target.GetCoords().x - targetPrevPos.x;

      targetVelocity.y = target.GetCoords().y - targetPrevPos.y;
      
      
      targetAccel.x = targetVelocity.x - targetPrevVelocity.x;

      targetAccel.y = targetVelocity.y - targetPrevVelocity.y;
      
      
          

      //label.text("AccelX: " + targetAccel.x + " AccelY: " + targetAccel.y + "AbsAccel: " + Math.sqrt(targetAccel.x * targetAccel.x + targetAccel.y * targetAccel.y) )
      paintModule.Log("AbsAccel: " + Math.sqrt(targetAccel.x * targetAccel.x + targetAccel.y * targetAccel.y) );

      coolDown--;

      if (target && coolDown < 0) {
        fire(target.GetCoords());
      }




      for (var i = 0; i < bullets.length; i++) {
        bullets[i].Tick();
      }

      // TODO check bullets positions
      
      var newBullets = [];
      
      for (var i = 0; i < bullets.length; i++) {
        //bullets[i].Tick();
        var bltPos = bullets[i].GetCoords();
        
        if (bltPos.y < h && bltPos.y > 0 && bltPos.x < w && bltPos.x > 0) {
          newBullets.push(bullets[i]);
        }
        else{
          bullets[i].Remove();
        }
        
        
        
        
        if (Math.abs(bltPos.x - target.GetCoords().x) < 6.5 && Math.abs(bltPos.y - target.GetCoords().y) < 6.5) {
          //newBullets.push(bullets[i]);
          
          bullets[i].Remove();
          paintModule.IncrHits();
        }
        //else{
          
        //}
        
      }
      

      
      bullets = newBullets;

      targetPrevPos = target.GetCoords();
      
      targetPrevVelocity.x = targetVelocity.x;
      targetPrevVelocity.y = targetVelocity.y;
    }



  };

  return module;
});