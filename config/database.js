

var mongourl = process.env.MONGO_URI? process.env.MONGO_URI : 'mongodb://localhost:27017/divyapusuluru';


module.exports = {
	
	url : mongourl
};
