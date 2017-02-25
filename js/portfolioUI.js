//check to see if IE
var clientIsIE = !!document.documentMode;

$('document').ready(function(){
  //handler for tracking scroll bar position
  $(window).on('scroll', function(e){
    var currentPosition = e.currentTarget.pageYOffset,
        navOffset = $('#divider').offset().top,
        portfolioOffset = $('#portfolio').offset().top - 150,
        aboutOffset = $('#about').offset().top - 150,
        contactOffset = $('#contact').offset().top - 400,
        portfolioButton = $('#btn-portfolio'),
        aboutButton = $('#btn-about'),
        contactButton = $('#btn-contact');
    safeAnimationFrame(flipCardsBackOver);
    //At projects
    if(currentPosition < aboutOffset){
        if(!portfolioButton.hasClass('is-active')){
          $('.nav-btn.is-active').removeClass('is-active');
          portfolioButton.addClass('is-active');
        }
    }
    //at about
    else if(currentPosition === aboutOffset || currentPosition < contactOffset){
      //in about section
      if(!aboutButton.hasClass('is-active')){
        $('.nav-btn.is-active').removeClass('is-active');
        aboutButton.addClass('is-active');
      }
    }
    //at contacts
    else{
      //in contact section
      if(!contactButton.hasClass('is-active')){
        $('.nav-btn.is-active').removeClass('is-active');
        contactButton.addClass('is-active');
      }
    }
    //change position of nav menu based on scrolling
    if(currentPosition > navOffset){
      if(!$('#nav-bar').hasClass('is-fixed'))
      $('#nav-bar').addClass('is-fixed');
      //$('#contents').addClass('offset');
    }
    else{
      if($('#nav-bar').hasClass('is-fixed')){
        $('#nav-bar').removeClass('is-fixed');
        //$('#contents').removeClass('offset');
      }
    }
  });
  /*handler for window resize
    1. flip features back over if they are in flipped position
    2. reset active nav bar button based on new position in document
  */
  $( window ).resize(function() {
    safeAnimationFrame(flipCardsBackOver);
    //$( "body" ).prepend( "<div>" + $( window ).width() + "</div>" );
    //console.log('My window width is: ' + $(window).width());
  });
  //handler for nav button clicks
  $('.nav-btn').on('click', function(e){
    var btnList = $('.nav-btn');
    var btn = $(this);
    var id = "#" + btn.attr('id').slice(4);
    e.preventDefault();
    btnList.each(function(){
      $(this).removeClass('is-active');
    });
    btn.toggleClass('is-active');
    $('html, body').animate({
            scrollTop: $(id).offset().top - 150
        }, 250);
  });
  //handler for hamburger-helper clicks
  $('#hamburger-helper').on('click', function(e){
    $('#nav-container').addClass('is-expanded');
    e.preventDefault();
  });
  $('#hamburger-closer').on('click', function(e){
    $('#nav-container').removeClass('is-expanded');
    e.preventDefault();
  });
  //handler for flip card clicks
  $('.flip-container').on('click', function(e){
    var card = $(this).children('.flipper');
    if(clientIsIE){
      card.children('div.back').toggleClass('is-front') /*hack for IE flip cards*/
    }
    else{
      card.toggleClass('is-fliped');
      setCardBackHeightToScroll(card);
    }
  });
  //handler for contact form submission
  $('#contact-submit').on('click', function(e){
    var validate = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    var contactNameElement = $('#contact-name'),
        contactEmailElement = $('#contact-email'),
        contactPhoneElement = $('#contact-phone'),
        contactMessageElement = $('#contact-message'),
        fromName = contactNameElement.val().replace(validate, "")
        fromEmail = contactEmailElement.val().replace(validate, ""),
        fromPhone = contactPhoneElement.val().replace(validate, ""),
        messageHTML = contactMessageElement.val().replace(validate, "");
    if(!fromEmail || !fromName || !messageHTML){
      //add red outlines to required areas that are blank
      if(contactNameElement.val() == ''){
        contactNameElement.addClass('red-outline');
      }
      else{
        contactNameElement.removeClass('red-outline');
      }
      if(contactEmailElement.val() == ''){
        contactEmailElement.addClass('red-outline');
      }
      else{
        contactEmailElement.removeClass('red-outline');
      }
      if(contactMessageElement.val() == ''){
        contactMessageElement.addClass('red-outline');
      }
      else{
        contactMessageElement.removeClass('red-outline');
      }
      alert('Please fill out all sections!');
    }
    else{
      messageHTML += "<br> Phone:" + contactPhoneElement.val();
      console.log('sending email from ' + fromName + ' at ' + fromEmail + " : " + messageHTML);
      // parameters: service_id, template_id, template_parameters - function to send emails on form submit
      emailjs.send("default_service", "template_pDJFeKtF", {"from_email":fromEmail,"from_name": fromName,"message_html": messageHTML});
      $('#contact-form>input, #contact-form>textarea').val('');
      $('#contact-form>input, #contact-form>textarea').removeClass('red-outline');
      alert('Thank you!');
    }
    e.preventDefault();
  });
  //card flipper utility functions
  function setCardBackHeightToScroll(card){
    var back = card.children('.back');
    var backScrollHeight = back.prop('scrollHeight');
    if(back.css('height')){
        back.removeAttr('style');
    }
    if(backScrollHeight > back.height()){
      if(card.hasClass('is-fliped')){
        back.height(backScrollHeight);
      }
    }
  }
  function flipCardsBackOver(){
    $('.flipper').each(function(index, card){
      if(!clientIsIE){
        if($(card).hasClass('is-fliped')){
          setCardBackHeightToScroll($(card));
          $(card).toggleClass('is-fliped');
        }
      }

    });
  }
  function safeAnimationFrame(func){
    if(window.requestAnimationFrame){
      window.requestAnimationFrame(func);
    }
    else{
      window.setTimeout(func, 16.6);
    }
  }
});
