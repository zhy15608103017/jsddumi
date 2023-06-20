import MapBoxConfig from "@jusda-tools/mapbox-config";
import request from '../utils/request'
// mapbox通过地址查询坐标
export async function getGeocoding(params: any): Promise<any> {
  const { endpoint, search_text } = params
  const { mapboxGl: { config: {
    API_URL
  }, accessToken } } = MapBoxConfig
  // const accessToken = "pk.eyJ1IjoicGF0cmlja3dqcyIsImEiOiJjanBxbThjbXQwcWRjM3hueDk5cW44NWk2In0.9tCql2RKeE6vEvZS1k1rmA";
  return request(`${API_URL}/geocoding/v5/${endpoint}/${search_text}.json?access_token=${accessToken}`, {
    method: 'GET',
    prefix: ''
  });
}