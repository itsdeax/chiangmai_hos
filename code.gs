function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  var events = json.events;

  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    
    if (event.type === 'message' && event.message.type === 'text') {
      var userId = event.source.userId;
      
      // Save userId to Google Sheets
      saveUserId(userId);
      
      // Reply message
      replyMessage(event.replyToken, 'Your userId is ' + userId);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({ 'status': 'success' })).setMimeType(ContentService.MimeType.JSON);
}

function saveUserId(userId) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([new Date(), userId]);
}

function replyMessage(replyToken, message) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + 'IVGAjbkKsOcs2Omg0ACa8Pk1SXlQLqF6FJUuc7lDbA6owWHDGisHRfJgkixxDQcEcmQSc2Ihq583DCJG2N1LX85LxzuAMWy62jtfLr7Kc4EwLNvNTbt3TBCbmwNJi4bI5UYDzq4on2hgrFE6Oje/nQdB04t89/1O/w1cDnyilFU='  // Replace with your Channel Access Token
  };
  var postData = {
    'replyToken': replyToken,
    'messages': [{
      'type': 'text',
      'text': message
    }]
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };
  UrlFetchApp.fetch(url, options);
}
