class Transformer {
  static osrm2google(osrmData) {
    return {
      routes: [
        {
          legs: [
            {
              distance: {
                value: Math.round(osrmData.routes[0].distance),
              },
              duration: {
                value: Math.round(osrmData.routes[0].duration),
              },
              end_address: osrmData.waypoints[1].name,
            },
          ],
          overview_polyline: {
            points: osrmData.routes[0].geometry,
          },
        },
      ],
    };
  }

  static latLngString2osrmWaypoints(latLng1, latLng2) {
    const list = [];
    list.push(latLng1.split(','));
    list.push(latLng2.split(','));
    return Transformer.latLngList2osrmWaypoints(list);
  }

  static latLngList2osrmWaypoints(list) {
    const result = list.map((item) => `${item[1]},${item[0]};`).join('');
    if (result.length > 0) {
      return result.substring(0, result.length - 1);
    }
    return result;
  }
}

module.exports = Transformer;
