<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>letter</title>
</head>
<body>
  <p>Send a Letter!</p>


<?php
 require_once "Mail.php";
 
foreach($_GET as $input => $value ) { 
  preg_match('/[0-9]{*}/',$input);
  //if (isset($num)) {echo $num;}
  if (preg_match('/name/', $input)) { echo "Name: {$value}<br/>";}
  if (preg_match('/email/', $input)) { echo "EMAIL: {$value}<br/>";}
  
}
 
 $from = "spencerdcarlson@gmail.com";
 $to = "spencerdcarlson@gmail.com";
 $subject = "Hi!";
 $body = "Hi,\n\nHow are you?";
 
 $host = "smtp.gmail.com";
 $username = "spencerdcarlson@gmail.com";
 $password = "hauomD&C4";
 
 $headers = array ('From' => $from,
   'To' => $to,
   'Subject' => $subject);
 $smtp = Mail::factory('smtp',
   array ('host' => $host,
     'auth' => true,
     'username' => $username,
     'password' => $password));
 
 $mail = $smtp->send($to, $headers, $body);
 
 if (PEAR::isError($mail)) {
   echo("<p>" . $mail->getMessage() . "</p>");
  } else {
   echo("<p>Message successfully sent!</p>");
  }


?>

</body>
</html>
