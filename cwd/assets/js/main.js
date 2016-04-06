if (!window['YT']) {var YT = {loading: 0,loaded: 0};}if (!window['YTConfig']) {var YTConfig = {'host': 'http://www.youtube.com'};}if (!YT.loading) {YT.loading = 1;(function(){var l = [];YT.ready = function(f) {if (YT.loaded) {f();} else {l.push(f);}};window.onYTReady = function() {YT.loaded = 1;for (var i = 0; i < l.length; i++) {try {l[i]();} catch (e) {}}};YT.setConfig = function(c) {for (var k in c) {if (c.hasOwnProperty(k)) {YTConfig[k] = c[k];}}};var a = document.createElement('script');a.type = 'text/javascript';a.id = 'www-widgetapi-script';a.src = 'https:' + '//s.ytimg.com/yts/jsbin/www-widgetapi-vfl-4F7A7/www-widgetapi.js';a.async = true;var b = document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a, b);})();}
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

/*========================================
=            Href Strip Space            =
========================================*/

function hrefStripSpaces(){
  $(".strip").each(function(){
    var href=$(this).prop("href").replace(/ /g,'');   
    $(this).prop("href",href);
  });
}
hrefStripSpaces();

/*======================================
=            Activation Tab            =
======================================*/
var activation = {
   subMenu: function(wrap){
      $(wrap+" a").each(function(){
        var url=$(this).prop("href").split(".aspx");
        var results = new RegExp(url[0]).exec(window.location.href);
        console.log("url: "+url[0]);
        console.log("results: "+results);
        
        if(results){
          $(this).addClass('active');
        }
      });
    },
   sideBar: function(wrap,idTag){
      $(wrap+" a").each(function(){
        var category=$(idTag).attr('data-category');
        var current = $(this).html().replace("&amp;","&");
        if (null!=category){
          var results = category.localeCompare(current);
        }
        console.log("url: "+category);
        console.log("results: "+results);
        console.log("current: "+current);
        
        if(!results){
          $(this).addClass('active');
        }
      });
   },
   mainMenu: function(wrap){
      $(wrap+" > li > a").each(function(){
        var menu=$(this).find("span").html().toLowerCase().replace(" ","-");
        var results = window.location.href.search(menu);
        console.log("menu: "+menu);
        console.log("results: "+results);
        
        if(results){
          $(this).addClass('active');
        }
      });
   } 

}

activation.sideBar(".sidebar-categories","#category-name")
activation.subMenu(".button-group");





/*===============================
=  Navigation actions           =
===============================*/

var Navigation = {
  //Close all subnavs when clicked elsewhere
  closeSubNavs: function(e) {
    $('body').on('click', function (e) {
        $('.preventNav.parent').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.preventNav.parent').has(e.target).length === 0) {
                $('.sub-nav').not('#'+$(e.target).data('id')).slideUp();
              //alert($(this).innerHTML);
            }
        });
    });
  },
  toggleSubNavs: function(e) {
    $('.preventNav.parent').on('click',function(){
      $('#'+$(this).data('id')).slideToggle()
    });
  },
  fadeOutPages: function(e) {
    $('a').click(function(event) {
      event.preventDefault();
      newLocation = this.href;
      console.log("target");
      if ($(this).prop('target').replace(" ","")===""){
        
        if($(this).attr('class')) {
          if($(this).attr('class').indexOf('case-study-button')>=0) {
            var e1 = this,
                e2 = document.querySelector($(this).attr('data-cta-target'));
            cta(e1, e2);
            Navigation.fadeBody();
          }
          else if($(this).attr('class').indexOf('preventNav')>=0) {
            //do nothing to stop page from navigating
          }
          else {
            Navigation.fadeBody();
          }
        }
        else {
          Navigation.fadeBody();
        } 
      }else{
        window.open(newLocation,$(this).prop('target'));
      }

        
    });
  },
  fadeBody: function() {
    $('body').fadeOut(500, function(){
      window.location = newLocation;
    });
  },
  fadeInPages: function(e) {
    $('.body-overlay').fadeOut(1000);
  }
}


/*===============================
=    Popups           =
===============================*/
var Popups = {
  showContent: function(element, url, getContentSelector) {
    $.ajax({
      url: url,
      context: $(getContentSelector)
    }).success(function(data){
      var modifiedContent = $(data).find(getContentSelector);
      $('#contentDisplay .modal-body').html(modifiedContent);
      // $('#contentDisplay .modal-body .previous').html(previous);
      // $('#contentDisplay .modal-body .next').html(next);
      $('#contentDisplay').modal('show');
       
      });
  },
  linkPopups: function(element,getContentSelector) {
    $(element).click(function(event) {
      event.preventDefault();
      var url = this.href;
          // next = this.siblings(".link.next"),
          // previuos = this.siblings(".link.previous");
      Popups.showContent(element,url,getContentSelector);
    });
  }
}

  Navigation.closeSubNavs();
  Popups.linkPopups('.card-project .link','.ajax-content');
  Popups.linkPopups('.ajax-content .link','.ajax-content');


/*==================================================
=            Get Index of Obj from Attr            =
==================================================*/
var getIndexIfObjWithOwnAttr = function(array, attr) {
    for(var i = 0; i < Object.keys(array).length; i++) {
        if(array.hasOwnProperty(attr)) {
            return i;
        }
    }
    return -1;
}


var getAttrValueByIndex = function(array, index) {
  var i = 0;
  if( index < Object.keys(array).length){
    for (var key in array) {
      if (i == index){
        return array[key];
      }
      i++;
    }
  }else{
    return -1;
  }
}

getIndexIfObjWithOwnAttr;
getAttrValueByIndex;
    $('#contentDisplay').on('shown.bs.modal', function () {
       var id=$("#contentDisplay #item-id").html();
       var currentIndex= getIndexIfObjWithOwnAttr(projects,id);
       $("#contentDisplay .next").prop("href",getAttrValueByIndex(cuurentIndext+1));
       console.log("modal Loaded");
    }) 

