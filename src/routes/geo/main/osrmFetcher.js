const url = require('url');
const RequestInterface = require('./request.interface');
const Transformer = require('./transformer');

const osrmHost = 'localhost'; // self hosted server
const osrmWalkingPort = '5000';
const osrmDrivingPort = '5005';

class OsrmFetcher extends RequestInterface {
  constructor() {
    super({ provider: 'osrm' });
  }

  getRoute(mode, origin, destination) {
    const waypoints = Transformer.latLngString2osrmWaypoints(
      origin,
      destination,
    );

    let port = 8080;
    if (mode === 'walking') {
      port = osrmWalkingPort;
    } else if (mode === 'driving') {
      port = osrmDrivingPort;
    }

    // Example GET http://192.168.1.14:5005/route/v1/driving/13.383285,52.53297;13.364635,52.507606?overview=full&geometries=polyline
    const requestUrl = url.parse(
      url.format({
        protocol: 'http',
        hostname: osrmHost,
        port,
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
  OsrmFetcher,
};
