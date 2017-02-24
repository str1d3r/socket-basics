var socket = io();
var name = getQueryVariable('name')||'Anonymous';
var room = getQueryVariable('room');
socket.on('connect', function() {
	console.log('Connected to socket.io server!');
	console.log(name + ' joined room ' + room);
	jQuery('.room-title').text(room);
	socket.emit('joinRoom',{
		name:name,
		room:room
	});

});

socket.on('message', function(message) {
	var $message = jQuery('.messages');
	console.log('New message:');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + moment.utc(message.timestamp).local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');

});
// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val(),
		name: name
	});
	$message.val('').focus();
});
