/*======================================
=            Dropdown js           =
======================================*/
  $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
      event.preventDefault(); 
      event.stopPropagation(); 
      $(this).parent().siblings().removeClass('open');
      $(this).parent().toggleClass('open');
  });


// $('[data-submenu]').submenupicker();
/*=============================================
=               Print Article                 =
=============================================*/
function printPage(){
        window.print();
}

/*=============================================
=            Label           =
=============================================*/

$("form :input").each(function(index, elem) {
    var eId = $(elem).attr("id");
    var label = null;
    var span;
    if (eId && (label = $(elem).parents("form").find("label[for="+eId+"]")).length == 1) {
        if ($(elem).parents("form").find("label[for="+eId+"] + span").length){
          span=$(elem).parents("form").find("label[for="+eId+"] + span").html(); 
           $($(elem).parents("form").find("label[for="+eId+"] + span")).remove();       
        } else{
          span='';
        }
        $(elem).attr("placeholder", $(label).html() + span);
        
        $(label).remove();
    }
 });