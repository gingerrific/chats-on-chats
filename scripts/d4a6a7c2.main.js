"use strict";function MessageForMe(){var a,b,c=_.template($(".message-reply-template").text());this.initialMessageParse=function(a){a.forEach(function(a){if(!(a.user&&a.time&&a.message&&a.appID))throw new Error("initialMessageParse requires an object with the .name, .message, .time and .appID properties.");a.time=moment(parseInt(a.time)).fromNow();var b=c(a);$(".message-list").prepend(b)})};var d=this;this.initialMessageGet=$.getJSON("http://tiny-pizza-server.herokuapp.com/collections/chat-messages").done(function(b){a=b.length,d.initialMessageParse(b),setTimeout(function(){$(".messages-wrapper").scrollTop($(".messages-container").height())},500)}),this.updatedMessageParse=function(a){a.forEach(function(a){if(a.user&&a.time&&a.message&&a.appID){a.time=moment(parseInt(a.time)).fromNow();var b=c(a);$(".message-list").append(b)}})},this.updatedMessageGet=setInterval(function(){$.getJSON("http://tiny-pizza-server.herokuapp.com/collections/chat-messages").done(function(c){if(b=c.length-a,a=c.length,b>0){console.log(b);var e=c.slice(0,b);d.updatedMessageParse(e),$(".messages-wrapper").scrollTop($(".messages-container").height())}})},4e3)}function MessageForYou(){var a,b,c,d;this.composeTheMessage=function(){a=$(".message-text").val(),b=1e3*moment().format("X"),c=displayName,d="chatsOnChats",$("input").val(""),$("input").focus()},this.sendTheMessage=function(){$.post("http://tiny-pizza-server.herokuapp.com/collections/chat-messages",{user:c,time:b,message:a,appID:d})}}var chatApp,displayName;$(".login").click(function(){$(".login-name").val().length>0&&(displayName=$(".login-name").val(),$(".login-wrapper").css({opacity:"0"}),setTimeout(function(){$(".login-wrapper").hide(),$(".messages-wrapper").removeClass("hide-me"),$(".text-wrapper").removeClass("hide-me")},550),setTimeout(function(){$(".messages-wrapper").css({opacity:"1"}),$(".text-wrapper").css({opacity:"1"}),$(".display-name").append(displayName),chatApp=new MessageForMe},650))}),$(".login-name").keypress(function(a){13==a.which&&$(".login").click()}),$(".message-send").click(function(){if(!($(".message-text").text().length>0))throw new Error("Your message must be at least one character long");var a=new MessageForYou;a.composeTheMessage(),a.sendTheMessage()}),$(".message-text").keypress(function(a){13==a.which&&$(".message-send").click()});