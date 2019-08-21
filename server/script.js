import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 20,
  duration: "1m"
};

export default function() {
  var id = Math.ceil(Math.random() * 10000)
  http.get(`http://ec2-3-15-159-47.us-east-2.compute.amazonaws.com/${id}`);
  sleep(1);

  // var hostsId = Math.ceil(Math.random() * 10000000);
  // var spacesId = Math.ceil(Math.random() * 4);
  // var url = "http://localhost:3000/api/details";
  // var payload = JSON.stringify({
  //   title: `kennys house number ${hostsId}` , 
  //   location: `austin`,
  //   hosts_id: hostsId,
  //   spaces_id: spacesId,
  //   max_guests: 5,
  //   room_number: 1,
  //   bed_number: 1,
  //   bed_type: "water",
  //   bath_number: 1,
  //   spaceDescIntro: `some words here or something`,
  //   spaceDesc: "smells like swords and stuff.",
  //   guestAccessDesc: "only females plz",
  //   guestInteraction: "see previous prop",
  //   others: "nah",
  //   license: " STR-0000069"
  // });
  // var params =  { headers: { "Content-Type": "application/json" } }
  // http.post(url, payload, params);
};