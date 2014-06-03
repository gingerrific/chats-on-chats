/* global describe, it */

(function () {
    'use strict';

    describe('Server Interaction', function () {
        describe('GET request constructors', function () {
 
            it('should only accept an object as its argument', function () {
            	var stringMessageOnly = function () {
            		new MessageForMe.initialMessageParse('cool');
            	}
            	expect(stringMessageOnly).to.throw(Error);
            });

            it('should only accept an non-empty object as its argument', function () {
            	var emptyMessage = function () {
            		new MessageForMe.initialMessageParse({});
            	}
            	expect(emptyMessage).to.throw(Error);
            });

            it('should only accept an object with correct properties', function () {
            	var messagelessMessageReceived = function () {
            		new MessageForMe.initialMessageParse({name: "Bill Brasky", isARealSonOfABitch: true, time: Date.now()});
            	}
            	var namelessMessageReceived = function () {
            		new MessageForMe.initialMessageParse({message: "how you doin?", time: Date.now()});
            	}

            	var timelessMessageReceived = function () {
            		new MessageForMe.initialMessageParse({message: "how you doin?", time: Date.now()});
            	}

            	expect(namelessMessageReceived).to.throw(Error);
            	expect(messagelessMessageReceived).to.throw(Error);
            	expect(timelessMessageReceived).to.throw(Error);
            });

            // it('should only accept a successful ajax call as an argument', function () {
            // 	var badMessageReceived = function () {
            // 		new MessageForMe({statusCode:404});
            // 	}
            // 	expect(badMessageReceived).to.throw(Error);
            // });

        });
		
		describe('GET constructor instances', function () {
			var dummyInstance = new MessageForMe ();
		    it('should respond to it\'s methods', function () {
		      expect(dummyInstance).to.respondTo('initialMessageParse');
		      expect(dummyInstance).to.respondTo('updatedMessageParse');

		    });

		});
    });

    describe('Login interaction', function () {
    	it('should require at least one character to submit', function () {
    		$('.login-name').val('');
    		$('.login').click();
    		expect(login).to.throw(Error);
    	})

    	it('should correclty save the username', function () {
    		$('.login-name').val('Bill Brasky');
    		$('.login').click();
    		expect(displayName).to.equal('Bill Brasky');
    	})
    })

    describe('Chatting', function () {
    	describe('Sending messages', function () {
    		it('should require messages with one or more characters', function () {
    			$('.message-send').click();
    			expect(messageSend).to.throw(Error);
    		})
    	})

    	describe('Receiving messages', function () {
    		it('should only update add messages that haven yet to be displayed')
    	})
    })
})();
