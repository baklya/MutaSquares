define(['jquery', 'simple-statistics'], function(jq, ss) {


  var module = function(x, y, dna, cellsArray, grid) {
    
    
    
    var replaceAt = function(str ,index, character) {
        return str.substr(0, index) + character + str.substr(index+character.length);
    };
        
    var thisCell = this;
    
    var thisDna = dna || "bb4696d89538b1728ba5d43ca0020ec0";
    
    var thisX = x;
    
    var thisY = y;

    var lifeCounts = 2;
    

    setTimeout( function() {

      var coinToss = ss.sample([0, 1], 1)[0];
      
      thisCell.Mutate();
      
      if(coinToss === 0){
        
        cellsArray.push(new module(thisX + ss.sample([-1, 0, 1], 1)[0], thisY + ss.sample([-1, 1], 1)[0], thisDna, cellsArray, grid));
        
      }
      else{
        
        cellsArray.push(new module(thisX + ss.sample([-1, 1], 1)[0], thisY + ss.sample([-1, 0, 1], 1)[0], thisDna, cellsArray, grid));
      }

      
      grid.DrawGrid();


      
    } , (lifeCounts / 2) *  1000);
    
    
    
    
    setTimeout( function() {


      var index = cellsArray.indexOf(thisCell);
      if (index > -1) {
          cellsArray.splice(index, 1);
          grid.DrawGrid();
      }
      
    } , lifeCounts *  1000);

    

    // у каждой клетки есть свое время жизни, 


    // внутренний массив функций клетки
    // когда появляется вопрос, то ответ ищется здесь 
    var functions = {};
    
    
    
    // TODO создание функции 
    var generateFunction = function(type, length){
      
      
      if(type === "hex" && length === 6){
        
        
        return function(){
          return thisDna[2] + thisDna[8] + thisDna[5] + thisDna[2] + thisDna[16] + thisDna[19];
        };
        
      }
      
      
    };
    
    
    // dna - случайная последовательность
    
    // строка 32 числа в 16-ой системе

    
    // получение стартовых жизней
    var getStartingHealth = function(_dna){
        
        
        
    };
    

    var cellHealth = getStartingHealth(thisDna);
    
    
    
    
    thisCell.Ask = function(question, t, l){
        
        if(functions.hasOwnProperty(functions)){
          
          return functions[question]();
        }
        else{
          
          var newFunc = generateFunction(t, l);
          
          functions[question] = newFunc;
          
          return newFunc();
        }
        
    };
    
    
    

    thisCell.X = function(){
        return thisX;
    };
    thisCell.Y = function(){
        return thisY;
    };
    
    // мутация клетки
    thisCell.Mutate = function(){
        
        var coinToss = ss.sample([0, 1], 1)[0];
        
        if(coinToss === 0){
          
          var position = Math.floor((Math.random() * 32) );
          
          thisDna = replaceAt(thisDna, position, ss.sample(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], 1)[0]);
          

          
        }
        
        
    };
    
    
    
    // TODO изобрести механизм, который будет порождать новый функционал у клеток


  };

  return module;
});