'use strict';
// /collections/chat-messages

// 	{
//user:"", 
//message:"",
//time: epoch,
//meta:"",
//appID: static tag for identification
// }
	//else {
	//throw new Error('Return does not contain the properties user, message and/or time.')
	//}


function MessageForMe () {
	var i;
	var g;
	var messageTemplate = _.template($('.message-reply-template').text());
	
	this.initialMessageParse = function (data) {
		data.forEach(function (info) {
			if(info.user && info.time && info.message && info.appID) {
				// add in regex for img set
				info.time = (moment(parseInt(info.time)).fromNow());
				var messageContent = messageTemplate(info);
				$('.message-list').prepend(messageContent);
			}
		});
	};
	var that = this;

	this.initialMessageGet =
		$.getJSON('http://tiny-pizza-server.herokuapp.com/collections/chat-messages').done(function (reply) {
			i = reply.length;
			that.initialMessageParse(reply);
			setTimeout(function () {

				$(".messages-wrapper").scrollTop($('.messages-container').height());
			}, 500);
		});
	

	this.updatedMessageParse = function (data) {
		data.forEach(function (info) {
			if(info.user && info.time && info.message && info.appID) {
				// add in regex for img set
				info.time = (moment(parseInt(info.time)).fromNow());
				var messageContent = messageTemplate(info);
				$('.message-list').append(messageContent); //append for new messages
			}
		});	
	};

	this.updatedMessageGet =
		setInterval(function () {
			$.getJSON('http://tiny-pizza-server.herokuapp.com/collections/chat-messages').done(function (data) {
				g = (data.length - i);
				i = data.length;

				if (g>0){
					console.log(g);
					var smallerSet = data.slice(0,g);
					that.updatedMessageParse(smallerSet);
					$(".messages-wrapper").scrollTop($('.messages-container').height());
				}
			});
		}, 4000);
}


var chatApp;
var displayName;

$('.login').click(function () {
	displayName = $('.login-name').val();
	$('.login-wrapper').css({'opacity': '0'});
	setTimeout(function () {
		$('.login-wrapper').hide();
		$('.messages-wrapper').removeClass('hide-me');
		$('.text-wrapper').removeClass('hide-me');
	},550);
	setTimeout(function () {
		$('.messages-wrapper').css({'opacity': '1'});
		$('.text-wrapper').css({'opacity': '1'});
		$('.display-name').append(displayName);
		chatApp = new MessageForMe();
		
	},650);
});

$('.login-name').keypress(function (key) {
	if (key.which == 13) {
		$(".login").click();
	}
});


function MessageForYou () {
	var message, rightNow, name, identifier;

	this.composeTheMessage = function () {
			message = $('.message-text').val();
			rightNow = moment().format('X')*1000;
			name = displayName;
			identifier = 'chatsOnChats';
			$('input').val('');
			$('input').focus();
		};

	this.sendTheMessage = function () {

		$.post('http://tiny-pizza-server.herokuapp.com/collections/chat-messages', {'user': name , 'time': rightNow, 'message': message, 'appID': identifier });
	};

}


$('.message-send').click(function () {
	var chat = new MessageForYou ();
	chat.composeTheMessage();
	chat.sendTheMessage();
});


$('.message-text').keypress(function (key) {
  if (key.which == 13) {
    $(".message-send").click();
  }
});


// // find where



 
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

// 