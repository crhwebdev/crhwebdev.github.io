$('document').ready(function(){
  //handler for page scrolling
  /*1. detach social menu as side bar
    2. change nav menu to fixed placement so it stays on top
  */

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
