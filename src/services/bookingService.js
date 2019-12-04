import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/booking";

export function saveBooking(booking) {
  return http.post(apiEndpoint, booking);
}
