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
        portfolioOffset = $('#portfolio').offset().top - 80,
        aboutOffset = $('#about').offset().top - 80,
        contactOffset = $('#contact').offset().top - 80,
        portfolioButton = $('#btn-portfolio'),
        aboutButton = $('#btn-about'),
        contactButton = $('#btn-contact');

    //change active nav-menu button based on position in document
    if(currentPosition <= portfolioOffset){
        if(!portfolioButton.hasClass('active')){
          $('.nav-btn.active').removeClass('active');
          portfolioButton.addClass('active');
        }
    }
    else if(currentPosition <= aboutOffset){
      //in about section
      if(!aboutButton.hasClass('active')){
        $('.nav-btn.active').removeClass('active');
        aboutButton.addClass('active');
      }
    }
    else if(currentPosition <= contactOffset){
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

    //console.log('I am scrolling.' + currentPosition);

    /*get current position of scroll and see if it matches offset for #projects, #about, #contact*/


  });

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
            scrollTop: $(id).offset().top - 80
        }, 250);
  });
  //handler for contact form submission
  $('#contact-submit').on('click', function(e){
    var fromEmail = "",
        fromName = "",
        messageHTML = "";
    var validate = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    fromEmail = $('#contact-email').val().replace(validate, "");
    fromName = $('#contact-name').val().replace(validate, "");;
    messageHTML = $('#contact-message').val().replace(validate, "");;
    messageHTML += "<br> Phone: " + $('#contact-phone').val();
    if(!fromEmail || !fromName || !messageHTML){
      alert('please fill out all sections!');
    }
    else{
      console.log('sending email from ' + fromName + ' at ' + fromEmail + " : " + messageHTML);
      // parameters: service_id, template_id, template_parameters - function to send emails on form submit
      emailjs.send("default_service", "template_pDJFeKtF", {"from_email":fromEmail,"from_name": fromName,"message_html": messageHTML});
      $('#contact-form>input, #contact-form>textarea').val('');
    }
    e.preventDefault();
  });

});
