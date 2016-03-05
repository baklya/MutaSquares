define(['jquery'], function(jq) {


  var module = function(x, y, dna) {
    
    var thisDna = dna || "bb4696d89538b1728ba5d43ca0020ec0";
    
    var thisX = x;
    
    var thisY = y;


    // внутренний массив функций клетки
    // когда появляется вопрос, то ответ ищется здесь 
    var functions = {};
    
    
    
    // TODO создание функции 
    var generateFunction = function(type, length){
      
      
      if(type === "hex" && length === 6){
        
        
        return function(){
          return thisDna[2] + thisDna[8] + thisDna[5] + thisDna[2] + thisDna[16] + thisDna[19];
        }
        
      }
      
      
    }
    
    
    // dna - случайная последовательность
    
    // строка 32 числа в 16-ой системе
    var thisCell = this;
    
    // получение стартовых жизней
    var getStartingHealth = function(_dna){
        
        
        
    }
    

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
        
    }
    
    
    

    thisCell.X = function(){
        return thisX;
    }
    thisCell.Y = function(){
        return thisY;
    }
    
    // мутация клетки
    thisCell.Mutate = function(){
        
        
        
        
    }
    
    
    
    // TODO изобрести механизм, который будет порождать новый функционал у клеток


  };

  return module;
});