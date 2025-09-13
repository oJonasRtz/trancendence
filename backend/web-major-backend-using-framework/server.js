const path = require('path');
const server = require(path.resolve(__dirname, 'index.js'));
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3001;

(async () => {
	try {
		await server.listen({port: PORT, host: '0.0.0.0'});
		console.log(`Server is running on http://localhost:${PORT}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
})();
