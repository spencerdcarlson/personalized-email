var namesAndEmails = new Object();
$(document).ready(function() {
  
  //$('#to').append(window.)
});

var recipientId = 2;
function addRecipientField() {
  // Prevent Form Submision 
  //event.preventDefault();
  $('#addRecipients').append("<input class='recipient" + recipientId + " recipientName' type='text' name='name' placeholder='name' required /> <input class='recipient" + recipientId + " recipientEmail' type='email' name='email' placeholder='email' required /> <i id='recipient" + recipientId + "' class='icon-minus recipient" + recipientId + "' onClick='removeRecipientField(this.id);'></i>");
  //$('#addRecipients').append("<input class='recipient" + recipientId + " recipientName' type='text' name='name"+recipientId+"' placeholder='name' required /> <input class='recipient" + recipientId + " recipientEmail' type='email' name='email"+recipientId+"' placeholder='email' required /> <i id='recipient" + recipientId + "' class='icon-minus recipient" + recipientId + "' onClick='removeRecipientField(this.id);'></i>");
  recipientId += 1;
}

function removeRecipientField(classId) {
  $('.'+classId+'').empty();
  $('.'+classId+'').remove();
}

function addRecipients(){
  namesAndEmails = new Object();
  $('#to').hide();
  document.getElementById('to').innerHTML = '';
  document.getElementById('toConfirm').innerHTML = '';
  var names = document.getElementsByName('name');
  var emails = document.getElementsByName('email');
  for (var i = 0; i < names.length; i++ ) {
    if (names[i].value != "") {
      namesAndEmails[names[i].value] = emails[i].value;
    }
  }
  for (var k in namesAndEmails) {
    if ( indexOf(namesAndEmails, namesAndEmails[k] ) == ( objectLength(namesAndEmails) -1 ) ){
      $('#to').append(k);
      $('#toConfirm').append(k);
      //alert("Last Element in object 'namesAndEmails': " + namesAndEmails[k]);
    }
    else {
      $('#to').append( k +", ");
      $('#toConfirm').append( k +", ");
    }
  }
  $('#to').fadeIn(2000);
}
function confirm(){
  document.getElementById('messageConfirm').innerHTML = '';
  $('#messageConfirm').append(document.getElementById('messageText').value);
}

function sendLetters(){
  alert("clickSend");
  $.post('letter.php', function(data) {
    alert("Mail Sent");
  })
}

//Form to JSON
$.fn.serializeJSON = function() {
  var json = {},
      tokenize = function(input) {
        return input.split('[')
          .map(function(t) {
            return t.replace(']', '');
          });
      },
      baseObject = function(json, tokens, depth) {
        var out = json;
        for (var i = 0; i < depth; i++)
          out = out[tokens[i]];

        return out;
      };

  jQuery.map($(this).serializeArray(), function(n, i) {
    var name   = n['name'],
        tokens = tokenize(name),
        value  = n['value'];

    for (var i = tokens.length - 1; i > -1; i--) {
      var token = tokens[i], tmp = {};

      // If the token is blank, we're dealing with an array.
      // Handle this by wrapping the single value in an array
      // and attaching it to the next token up if it's an array,
      // or just creating a new array if not.
      //
      if (token == "") {
        if ((base = baseObject(json, tokens, i)) && $.isArray(base)) {
          base.push(value);
          i = 0; // We've updated the final output, so just break out of loop
        } else {
          tmp = [value];
        }
      } else {
        tmp[token] = value;
      }
      value = tmp;
    }
    $.extend(true, json, value);
  });
  return json;
};

/* Return Index of a Objet that is being treated like a HashMap
* Param: objectMap, objectMap[k]
*
*/
function indexOf(objectMap, value){
  var index = 0;
  for (var k in objectMap){
    if (objectMap[k] == value) {
      return index;
    }
    index += 1;
  }
  return null;
}
// Get the length of an object that is being reated like a HashMap
function objectLength(objectMap){
  var length = 0;
  for( var i in objectMap ) {
      if (objectMap.hasOwnProperty(i)) {
          length += 1;
      }
  }
  return length;
}


