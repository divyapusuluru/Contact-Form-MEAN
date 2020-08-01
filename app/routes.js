
var Contact = require('./models/contacts');

module.exports = function(app) {
	
	app.get('/api/contacts', function(req, res) {

		
		Contact.find(function(err, contacts) {

			
			if (err)
				res.send(err)

			res.json(contacts); // return all contacts
		});
	});

	
	app.post('/api/contact', function(req, res) {

		// insert new contact			
		Contact.create({
			name : req.body.form_data.name,
			email: req.body.form_data.email,
			done : false
		}, function(err, contact) {
			if (err)
				res.send(err);

			Contact.find(function(err, contacts) {
				if (err)
					res.send(err);

				var congrats = "Congrats "+req.body.form_data.name+"! ";
				res.send({status:congrats + " Your form has been sent!"});
			});
		});

	});

	// contact update
	app.put('/api/contact:contact_id', function(req, res) {
		var id = req.params.contact_id;
		console.log("Saving contact: " + id);

		Contact.findById(id , function(err, contact) {
			if (err)
				res.send(err);

			// fields that can be updated:
			contact.name = req.body.name ? req.body.name : contact.name;
			contact.email = req.body.email ? req.body.email : contact.email;

			contact.save(function(err) {
				if (err)
					res.send(err);

				res.send({status:"ok"});
			});
		});
	});

	// contact delete
	app.delete('/api/contact:contact_id', function(req, res) {
		var id = req.params.contact_id;
		console.log("Deleting contact: " + id);
		Contact.remove({
			_id : id
		}, function(err, contact) {
			if (err)
				res.send(err);

			res.send({status:"ok"});
		});
	});


	
	app.get('*', function(req, res) {
		// load index.html otherwise
		res.sendfile('./public/index.html');
	});
};