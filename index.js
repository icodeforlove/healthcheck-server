const os = require('os');
const http = require('http');

module.exports = ({port = 8080, path = '/healthcheck', status = () => true}) => {
	const app = new http.Server();

	app.on('request', (request, response) => {
		if (request.url === path) {
			const memory = parseFloat((1 - (os.freemem() / os.totalmem())).toFixed(2));
			const cpu = parseFloat((os.loadavg().shift() / os.cpus().length).toFixed(2));
			const healthy = !!status({memory, cpu});

			response.writeHead(healthy ? 200 : 500, { 'Content-Type': 'application/json' });
			response.write(JSON.stringify({
				healthy,
				memory,
				cpu
			}, null, '\t'));
			response.end('\n');
		} else {
			response.writeHead(404, {});
			response.end('\n');
		}
	});

	app.listen(port, () => {
		console.log(`healthcheck is listening on port ${port}`);
	});

	return {
		close: () => {
			app.close();
		}
	};
}
