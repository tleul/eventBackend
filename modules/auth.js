const jwt = require('jsonwebtoken');

module.exports = async function auth(req, res, next) {
	const token = req.header('x-auth-user');
	if (!token) return res.status(401).json({ msg: 'Not authorized' });

	let decoded = await jwt.verify(token, process.env.JWT_SECRET);

	req.user = decoded;
	next();
};
