const url = require('url');
const RequestInterface = require('./request.interface');
const Transformer = require('./transformer');

const osrmHost = 'router.project-osrm.org'; // offical hosted demo server supports driving mode in berlin only http://project-osrm.org/

class DemoOsrmFetcher extends RequestInterface {
  constructor() {
    super({ provider: 'osrm' });
  }

  getRoute(mode, origin, destination) {
    const waypoints = Transformer.latLngString2osrmWaypoints(
      origin,
      destination,
    );

    // Example GET http://router.project-osrm.org/route/v1/driving/13.383285,52.53297;13.364635,52.507606?overview=full&geometries=polyline
    const requestUrl = url.parse(
      url.format({
        protocol: 'http',
        hostname: osrmHost,
        pathname: `/route/v1/driving/${waypoints}`,
        query: {
          overview: 'full',
          geometries: 'polyline',
        },
      }),
    );

    return this.getEndPointContent({
      uri: requestUrl,
    });
  }
}

module.exports = {
  DemoOsrmFetcher,
};
