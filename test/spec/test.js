/* global describe, it */

(function () {
    'use strict';

    describe('Server Interaction', function () {
        describe('GET request constructors', function () {
 
            it('should only accept an object as its argument', function () {
            	var stringMessageOnly = function () {
            		new MessageForMe('cool');
            	}
            	expect(stringMessageOnly).to.throw(Error);
            });

            it('should only accept an non-empty object as its argument', function () {
            	var emptyMessage = function () {
            		new MessageForMe({});
            	}
            	expect(emptyMessage).to.throw(Error);
            });

            it('should only accept an object with correct properties', function () {
            	// no name
            	var namelessMessageReceived = function () {
            		new MessageForMe({message: "how you doin?", time: Date.now()});
            	}
            	var messagelessMessageReceived = function () {
            		new MessageForMe({name: "Bill Brasky", isARealSonOfABitch: true, time: Date.now()});
            	}

            	var timelessMessageReceived = function () {
            		new MessageForMe({message: "how you doin?", time: Date.now()});
            	}

            	expect(namelessMessageReceived).to.throw(Error);
            	expect(messagelessMessageReceived).to.throw(Error);
            	expect(timelessMessageReceived).to.throw(Error);
            });

            it('should only accept a successful ajax call as an argument', function () {
            	var badMessageReceived = function () {
            		new MessageForMe({statusCode:404});
            	}
            	expect(badMessageReceived).to.throw(Error);
            });

        });
		
		describe('GET constructor instances', function () {
			var dummyInstance = new MessageForMe ({name:'josh', message: 'what an interesting duck', time: Date.now(), statusCode: 200})
		    it('should respond to it\'s methods', function () {
		      expect(dummyInstance).to.respondTo('method1');
		      expect(dummyInstance).to.respondTo('method2');
		      expect(dummyInstance).to.respondTo('method3');
		    });

		    it('should return a template', function () {
		    	dummyInstance.template();
		      expect($('.messageReceivedLine')).to.contain('Message sent');
		    });
		});

        describe('POST request constructor', function () {
            
            it('should only accept an object as its argument', function () {
            	var stringMessageOnly = function () {
            		new MessageForYou('cool');
            	}
            	expect(stringMessageOnly).to.throw(Error);
            });

            it('should only accept an non-empty object as its argument', function () {
            	var emptyMessage = function () {
            		new MessageForYou({});
            	}
            	expect(emptyMessage).to.throw(Error);
            });

            it('should only accept an object with correct properties', function () {
            	// no name
            	var namelessMessageReceived = function () {
            		new MessageForYou({message: "how you doin?", time: Date.now()});
            	}
            	var messagelessMessageReceived = function () {
            		new MessageForYou({name: "Bill Brasky", isARealSonOfABitch: true, time: Date.now()});
            	}

            	var timelessMessageReceived = function () {
            		new MessageForYou({message: "how you doin?", time: Date.now()});
            	}

            	expect(namelessMessageReceived).to.throw(Error);
            	expect(messagelessMessageReceived).to.throw(Error);
            	expect(timelessMessageReceived).to.throw(Error);
            });
        });

		describe('POST constructor instances', function () {
			var dummyInstance = new MessageForYou({name:'josh', message: 'what an interesting duck', time: Date.now(), statusCode: 200})
		    it('should respond to it\'s methods', function () {
		      expect(dummyInstance).to.respondTo('method1');
		      expect(dummyInstance).to.respondTo('method2');
		      expect(dummyInstance).to.respondTo('method3');
		    });

		    it('should assign the correct username to a message', function () {
		    	
		      expect(dummyInstance.name).to.equal($('.login-field').text());
		      expect(dummyInstance.message).to.equal($('.message-field').text());
		    });

		    it('should return a message about the POST status', function () {
		    	
		      expect(dummyInstance.status()).to.exist;
		    });
		});
    });

    describe('Login interaction', function () {
    	it('should require at least one character to submit', function () {
    		$('login-field').val('');
    		$('login-button').click();
    		expect(login).to.throw(Error);
    	})

    	it('should correclty save the username', function () {
    		$('login-field').val('Bill Brasky');
    		$('login-button').click();
    		expect($('welcome-message').text()).to.contain('Welcome, Bill Brasky');
    	})
    })

    describe('Chatting', function () {
    	describe('Sending messages', function () {
    		it('should require messages with one or more characters', function () {
    			$('message-field').val('');
    			$('send-button').click();
    			expect(messageSend).to.throw(Error);
    		})
    	})

    	describe('Receiving messages', function () {
    		it('should only update add messages that haven yet to be displayed')
    	})
    })
})();
