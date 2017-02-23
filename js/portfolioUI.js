$('document').ready(function(){
  //handler for page scrolling
  /*1. detach social menu as side bar
    2. change nav menu to fixed placement so it stays on top
    3. change active nav menu button based on position in document
  */
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

    //change active nav-menu button based on position in document
    //At projects
    if(currentPosition < aboutOffset){
        if(!portfolioButton.hasClass('active')){
          $('.nav-btn.active').removeClass('active');
          portfolioButton.addClass('active');
        }
    }
    //at about
    else if(currentPosition === aboutOffset || currentPosition < contactOffset){
      //in about section
      if(!aboutButton.hasClass('active')){
        $('.nav-btn.active').removeClass('active');
        aboutButton.addClass('active');
      }
    }
    //at contacts
    else{
      //in contact section
      if(!contactButton.hasClass('active')){
        $('.nav-btn.active').removeClass('active');
        contactButton.addClass('active');
      }
    }
    //change position of nav menu based on scrolling
    if(currentPosition > navOffset){
      if(!$('#nav-bar').hasClass('fixed'))
      $('#nav-bar').addClass('fixed');
      $('#contents').addClass('offset');
    }
    else{
      if($('#nav-bar').hasClass('fixed')){
        $('#nav-bar').removeClass('fixed');
        $('#contents').removeClass('offset');
      }
    }
  });
  //handler for window resize
  /*$( window ).resize(function() {
    //$( "body" ).prepend( "<div>" + $( window ).width() + "</div>" );
    //console.log('My window width is: ' + $(window).width());
  });*/
  //handler for nav button clicks
  $('.nav-btn').on('click', function(e){
    var btnList = $('.nav-btn');
    var btn = $(this);
    var id = "#" + btn.attr('id').slice(4);
    e.preventDefault();
    btnList.each(function(){
      $(this).removeClass('active');
    });
    btn.toggleClass('active');
    $('html, body').animate({
            scrollTop: $(id).offset().top - 150
        }, 250);
  });
  //handler for hamburger-helper clicks
  $('#hamburger-helper').on('click', function(e){
    console.log("You clicked me!");
    $('#nav-container').addClass('expanded');
    e.preventDefault();
  });
  $('#hamburger-closer').on('click', function(e){
    $('#nav-container').removeClass('expanded');
    e.preventDefault();
  });
  //handler for flip card clicks
  $('.flip-container').on('click', function(e){
    console.log('clicked on flip container');
    $(this).children('.flipper').toggleClass('flip');
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

});
