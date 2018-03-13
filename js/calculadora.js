/**
 * Calculadora JS
 *
 * Autor: Favio Barnatan
 * Fecha: 03/2018
 **/
$(function(){
    var calc, cuentas, resp, ans = 0, op = "";

    inic();

    $("#cuadrado").click( cuadrado );
    $("#inverso").click( inverso );
    $("#raiz").click( raiz );
    $("#parte_entera").click( parte_entera );
    $("#pot_cuadrada").click( pot_cuadrada );
    $("#factorial").click( factorial );
    $("#mas").click( mas );
    $("#menos").click( menos );
    $("#multiplicacion").click( multiplicacion );
    $("#division").click( division );
    $("#eleva").click( eleva );
    $("#sumatoria").click( sumatoria );
    $("#producto").click( producto );
   
    $("#ac").click( vaciar );
    $("#c").click( borra_ult_caract );
    $("#calcular").click( calcular );

    // Obtener valores
    $(".btn-valor").click(function(){
        if(Number($(this).html()) || $(this).html() == "0" || $(this).html() == "." || $(this).html() == ","){
            calc.val( calc.val()+$(this).html() );
        }
        cuentas.append($(this).html());

        $("#c").attr('disabled', false);
    });



    function inic ()             {calc = $("#calculos"); resp = $("#resultado"); cuentas = $("#cuentas");}
    function vaciar ()           {calc.val(""); resp.html("0"); cuentas.html("");}
    function borra_ult_caract () {calc.val(calc.val().slice(0, -1)); cuentas.html(cuentas.html().slice(0, -1));}

    /** 
     * Operaciones Unarias
     *******************************/
    function cuadrado()     {var resu=(calc.val() * calc.val());    resp.html(resu); cuentas.html(calc.val()+"<sup>2</sup> = "+(resu)); calc.val(resu); bloqueoC();}
    function inverso()      {var resu=(+1   /  calc.val());         resp.html(resu); cuentas.html("1/"+calc.val()+" = "+(resu)); calc.val(resu); bloqueoC();}
    function raiz()         {var resu=(Math.sqrt(calc.val()));      resp.html(resu); cuentas.html("√"+calc.val()+" = "+(resu)); calc.val(resu); bloqueoC();}
    function pot_cuadrada() {var resu=( Math.pow(2, calc.val()) );  resp.html(resu); cuentas.html("2<sup>"+calc.val()+"</sup> = "+(resu)); calc.val(resu); bloqueoC();}
    function factorial()    {var resu=( getFactorial(calc.val()) ); resp.html(resu); cuentas.html(calc.val()+"! = "+(resu)); calc.val(resu); bloqueoC();}
    function parte_entera() { 
        var resu = (calc.val() >= 0)? Math.floor(calc.val()) : Math.ceil(calc.val());
        resp.html(resu); cuentas.html("Ent("+calc.val()+") = "+(resu));  calc.val(resu); bloqueoC();
    }
    function getFactorial(n) { return (n > 0)? n * getFactorial(n - 1) : 1; }

    /** 
     * Operaciones Binaria
     *******************************/
    function mas()            { ans = calc.val();  op = "+";     calc.val("");}
    function menos()          { ans = calc.val();  op = "-";     calc.val("");}
    function multiplicacion() { ans = calc.val();  op = "*";     calc.val("");}
    function division()       { ans = calc.val();  op = "/";     calc.val("");}
    function eleva()          { ans = calc.val();  op = "eleva"; calc.val(""); cuentas.html(ans+"<sup>^</sup>");}

    /** 
     * Operaciones con N operandos
     *******************************/
    function sumatoria() {
        var lista = calc.val().split(",");
        var i=0, suma = 0;
        while (i < lista.length){ suma += (+lista[ i++ ]); }
        resp.html( suma ); cuentas.html("Σ("+calc.val()+") = "+suma); calc.val(suma); bloqueoC();
    }
    function producto() {
        var lista = calc.val().split(",");
        var i=0, prod = 1;
        while (i < lista.length){ prod *= (lista[ i++ ]); }
        resp.html( prod ); cuentas.html("P("+calc.val()+") = "+prod); calc.val(prod); bloqueoC();
    }


    function calcular() {
        // Operaciones Binarias
        if (op === "+")   {var resu=(+ans + +calc.val()); resp.html(resu);  cuentas.append(" = "+(resu)); calc.val(resu); op="";}
        if (op === "-")   {var resu=(+ans - +calc.val()); resp.html(resu);  cuentas.append(" = "+(resu)); calc.val(resu); op="";}
        if (op === "*")   {var resu=( ans *  calc.val()); resp.html(resu);  cuentas.append(" = "+(resu)); calc.val(resu); op="";}
        if (op === "/")   {var resu=( ans /  calc.val()); resp.html(resu);  cuentas.append(" = "+(resu)); calc.val(resu); op="";}
        if (op === "eleva"){var resu=Math.pow(ans, calc.val()); resp.html( resu ); cuentas.html(ans+"<sup>"+calc.val()+"</sup> = "+(resu)); calc.val(resu); op="";}
        bloqueoC();
    }

    function bloqueoC(){
        $("#c").attr('disabled', true);
    }

    
    /** 
     * Gestión de Memoria - Botones
     *******************************/
    $("#toM").click(    function(){ $("#memoria").html( resp.html() ); } );
    $("#fromM").click(  function(){ calc.val( $("#memoria").html() ); cuentas.html( $("#memoria").html() ); } );
    $("#clearM").click( function(){ $("#memoria").html( "" ); } );
    /** 
     * Gestión de Memoria - Drop
     *******************************/
    $( "#resultado" ).draggable({revert: "invalid",  helper:"clone"});
    $( "#box_num" ).droppable({activeClass:"box-droppable", drop:function(event, ui){
        $("#calculos").val( $("#memoria").html() ); 
        $("#cuentas").html( $("#memoria").html() );
    }});
    $( "#memoria" ).draggable({revert: "invalid",  helper:"clone"});
    $( "#memoria" ).droppable({activeClass:"box-droppable",  drop:function(event, ui){
        $("#memoria").html( $("#resultado").html() );
    }});
  
});

