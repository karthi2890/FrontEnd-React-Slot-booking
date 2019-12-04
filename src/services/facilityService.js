import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/facility";

export function getFacilities() {
  return http.get(apiEndpoint);
}
