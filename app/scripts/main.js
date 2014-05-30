'use strict';
// /collections/chat-messages

//	{
// 	user:"", 
// 	message:"", 
// 	time: epoch, 
// 	meta:"", 
// 	appID: static tag for identification
// }
	// else {
	// 	throw new Error('Return does not contain the properties user, message and/or time.')
	// }


var messageTemplate = _.template($('.message-reply-template').text());

function messageRendering (data) {
		data.forEach(function (info) {
			if(info.user && info.time && info.message) {
				// add in regex for img set
				info.time = (moment(parseInt(info.time)).fromNow());
				var messageContent = messageTemplate(info);
				$('.message-list').prepend(messageContent);
			}
		})
		$(".messages-wrapper").scrollTop($('.messages-container').height())
}



$.getJSON('http://tiny-pizza-server.herokuapp.com/collections/chat-messages').done(function (reply) {
	messageRendering(reply);
	
});




function MessageForMe () {

} 

function MessageForYou () {

}


$('button').click(function () {
	var message = $('input').val();
	var rightNow = moment().format('X')*1000;
	var name = 'JD';
	$.post('http://tiny-pizza-server.herokuapp.com/collections/chat-messages', {'user': name , 'time': rightNow, 'message': message});

})