function sendMail(subject, message) {
  var json = {};
  json['subject'] = subject;
  json['message'] = message;
  console.log('sendmail');
  $.ajax({
    type: 'POST',
    url: '/sendmail',
    data: json
  });
}