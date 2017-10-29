function convert(param1){
    
    var factor;
    var fac;
   let f = document.getElementById('from').value
   let t = document.getElementById('to').value
   let u = document.getElementById('froms').value
   let v = document.getElementById('tos').value

   factor = factorCalc(f,t);
   fac = facCalc(u,v);

    if(param1 == "C"){
        document.getElementById('secondinput').value = document.getElementById('firstinput').value * factor
        $("#secondinput").val = $("#firstinput").val;
    }
    if(param1 == "F"){
        return document.getElementById('firstinput').value = document.getElementById('secondinput').value * factor
        $("#firstinput").val = $("#secondinput").val;
    }
    if(param1 == "A"){
        document.getElementById('fourthinput').value = document.getElementById('thirdinput').value * fac
        $("#fourthinput").val = $("#thirdinput").val;
    }
    if(param1 == "B"){
        document.getElementById('thirdinput').value = document.getElementById('fourthinput').value * fac
        $("#thirdinput").val = $("#fourthinput").val;
    }

    }
    
    function factorCalc(f,t){
        if(f == t){
            return 1
        }
        else if(f == 'INR' && t == 'USD'){
            return  65;
        }
        else if(f == 'USD' && t == 'INR'){
           return  1/65;
        }
    }

    function facCalc(u,v){
        if(u == v){
           return  1
        }
        else if(u == 'EURO' && v == 'USD'){
          return  0.85;
        }
        else if(u == 'USD' && v == 'EURO'){
          return  1/0.85;
        }
    }

