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
		setTimeout(function () {

			$(".messages-wrapper").scrollTop($('.messages-container').height())
		}, 300);
}


// setInterval(function () {

	$.getJSON('http://tiny-pizza-server.herokuapp.com/collections/chat-messages').done(function (reply) {
		messageRendering(reply);
		
	});
// }, 1000);




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



// $.getJSON('http://tiny-pizza-server.herokuapp.com/collections/chat-messages').done(function (data) {
//   data.forEach(function (object) {
//     var id = object._id;
//      $.ajax({
//      	url:'http://tiny-pizza-server.herokuapp.com/collections/chat-messages/'+id,
//      	type:'PUT', 
//      	data: {'name': 'Dread Pirate Roberts', 'message': "<img src='http://blog.boreal-kiss.net/wp/wp-content/uploads/2012/09/large.gif'/>", 'isOfTheNight': true}
//      });
// })})

// $.getJSON('http://tiny-pizza-server.herokuapp.com/collections/chat-messages').done(function (data) {
// 	for (var i =1; i<data.length-1; i+=2) {
// 		var id = data[i]._id;
// 		$.ajax({
// 	     	url:'http://tiny-pizza-server.herokuapp.com/collections/chat-messages/'+id,
// 	     	type:'PUT', 
// 	     	data: {'name': 'ShaqFu2ElectricBoogaloo', 'message': "<img src='http://i.giftrunk.com/d3fqzq.gif'/>", 'isOfTheNight': true}
// 	     });
// 	}
// })




// <script>alert('MWAHAHAHA')</script>

// http://i.giftrunk.com/d3fqzq.gif