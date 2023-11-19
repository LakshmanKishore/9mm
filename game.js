window.onload = function() {

    var gameBoard = document.querySelector("#gameBoard");
    var input = document.querySelector(".input")
    var count = 1;
    var i;
    var line = [
                [b1c1,b1c2,b1c3,true],
                [b1c3,b1c4,b1c5,true],
                [b1c5,b1c6,b1c7,true],
                [b1c7,b1c8,b1c1,true],                                                
                [b2c1,b2c2,b2c3,true],                                                            
                [b2c3,b2c4,b2c5,true],                                                                        
                [b2c5,b2c6,b2c7,true],                                                                                    
                [b2c7,b2c8,b2c1,true],                                                              
                [b3c1,b3c2,b3c3,true],                                                              
                [b3c3,b3c4,b3c5,true],                                                                              
                [b3c5,b3c6,b3c7,true],                                                                                  
                [b3c7,b3c8,b3c1,true],                                                                                          
                [b1c2,b2c2,b3c2,true],                                                                                          
                [b1c4,b2c4,b3c4,true],                                          
                [b1c6,b2c6,b3c6,true],                                 
                [b1c8,b2c8,b3c8,true],            
               ];
    var removed = false; //to remove the coin
    var select = false;
    var n=18;
    var selected,sc,mc,movedMill;//sc-->select change
    var move=1;
    var p1c=(n/2); //p1c-->player1 coins
    var p2c=(n/2); //p2c-->player2 coins
    
    gameBoard.addEventListener("click",start);
    
    function start(e) {
        
        var circle = e.target.closest('circle');
        
        if (!circle) return 
        
        //selecting red coin for move 
        if((circle.getAttribute("fill")=="red")&&
           (move%2==1)&&(count==(n+2))&&(!select))
        {
            circle.setAttribute("stroke","#30fc03")
            selected = circle.id;
            sc= document.getElementById(selected)
            select = true;
            move++;
        }
        
        //selecting blue coin for move
        if((circle.getAttribute("fill")=="blue")&&
           (move%2==0)&&(count==(n+2))&&(!select))
        {
            circle.setAttribute("stroke","#30fc03")
            selected = circle.id;
            sc= document.getElementById(selected)
            select = true;
            move++;
        }
        
        //adding circle
        if((!removed)&&count<(n+1))
        add(circle);
        
        //selecting different red coin for move
        if((!(circle.getAttribute("stroke")=="#30fc03"))&&
            (circle.getAttribute("fill")=="red")&&
            (move%2==0)&&(selected!=undefined))
        {
            sc.setAttribute("stroke","black")
            circle.setAttribute("stroke","#30fc03")
            selected = circle.id;
            sc = document.getElementById(selected)
            select = true;
        }
        
        //selecting different blue coin for move
        if((!(circle.getAttribute("stroke")=="#30fc03"))&&
            (circle.getAttribute("fill")=="blue")&&
            (move%2==1)&&(selected!=undefined))
        {
            sc.setAttribute("stroke","black")
            circle.setAttribute("stroke","#30fc03")
            selected = circle.id;
            sc = document.getElementById(selected)
            select = true;
        }
        
        //moving the coin
        if((circle.getAttribute("fill")=="white")&&
           selected!=undefined)
        {
            circle.setAttribute("fill",
                sc.getAttribute("fill"))
            sc.setAttribute("fill","white")
            sc.setAttribute("stroke","black")
            selected = undefined; 
            select = false;
            
            if(move%2==0)
            input.innerText = "Blue's turn"
            else if(move%2==1)
            input.innerText = "Red's turn"
            
            mc=circle.id;
            movedMill = document.getElementById(mc)
            
            for(i=0;i<16;i++)
            for(j=0;j<3;j++)
            if(line[i][j]==movedMill)
            {
           if((((line[i][0].getAttribute("fill")=="red")&&
           (line[i][1].getAttribute("fill")=="red")&&
           (line[i][2].getAttribute("fill")=="red")
           )||
           ((line[i][0].getAttribute("fill")=="blue")&&
           (line[i][1].getAttribute("fill")=="blue")&&
           (line[i][2].getAttribute("fill")=="blue")
           )))
           line[i][3]=true;
            }
            
        }
        
        //checking for the line
        for(i=0;i<16;i++)
        if((((line[i][0].getAttribute("fill")=="red")&&
           (line[i][1].getAttribute("fill")=="red")&&
           (line[i][2].getAttribute("fill")=="red")&&
           (line[i][3]))||
           ((line[i][0].getAttribute("fill")=="blue")&&
           (line[i][1].getAttribute("fill")=="blue")&&
           (line[i][2].getAttribute("fill")=="blue")&&
           (line[i][3]))))
        {
            line[i][0].setAttribute("stroke","yellow")
            line[i][1].setAttribute("stroke","yellow")
            line[i][2].setAttribute("stroke","yellow")
            line[i][3]=false;
            removed=true;
        }
        
        //removing the coin
        for(i=0;i<16;i++)
        if(
            line[i][0].getAttribute("stroke")=="yellow"&&
            line[i][1].getAttribute("stroke")=="yellow"&&
            line[i][2].getAttribute("stroke")=="yellow"
          )
        {
            if(line[i][1].getAttribute("fill")=="red"){
            input.innerText = "Remove Blue mill";
            if(circle.getAttribute("fill")=="blue"){
            circle.setAttribute("fill","white")
            circle.setAttribute("stroke","black")
            line[i][0].setAttribute("stroke","black")
            line[i][1].setAttribute("stroke","black")
            line[i][2].setAttribute("stroke","black")
            removed=false;
            input.innerText = "Blue's Turn";
            p2c--;
            }}
            if(line[i][1].getAttribute("fill")=="blue"){
            input.innerText = "Remove Red mill";
            if(circle.getAttribute("fill")=="red"){
            circle.setAttribute("fill","white")
            circle.setAttribute("stroke","black")
            line[i][0].setAttribute("stroke","black")
            line[i][1].setAttribute("stroke","black")
            line[i][2].setAttribute("stroke","black")
            removed=false;
            input.innerText = "Red's turn"
            p1c--;
            }}
                
        }
        
        if(p2c==2)
        {
            gameBoard.removeEventListener("click",start)
            win.innerText = "Red won the game"
            input.innerText = " "
            win.style.color = "red";
        }
        
        if(p1c==2)
        {
            gameBoard.removeEventListener("click",start)
            win.innerText = "Blue Won the game"
            input.innerText = " "
            win.style.color = "blue";
        }
    
        
    }
    
    
    function add(circle){
        if((count%2==0)&&
            (count<=(n))&&
            (circle.getAttribute("fill")=="white"))
        {
            circle.setAttribute("fill","blue");
            count++;
            input.innerText = "Red's turn"
        }
        else if((count<(n))&&
                (circle.getAttribute("fill")=="white"))
        {
            circle.setAttribute("fill","red");
            count++;
            input.innerText = "Blue's turn"
        }
        if(count==(n+1)){
            alert("As all the coins are placed and its time to move the coin. For moving coin please select the coin and then press on the required position ");
            input.innerText = "Select and move Red mill"
            count=(n+2);
        }
        
    }
    
    
    }
    
    
    