mapboxgl.accessToken =
  "pk.eyJ1IjoieWFhcnVzaWsiLCJhIjoiY2t1Z2xoMW8xMjVrdjJ1bW9saXlpdXl0NSJ9.3l_KqoZuoTwJZDJdPLGk5g";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/yaarusik/ckugphzdm4dmq18ohg4csbkis", // style URL
  center: [2.3364, 48.86091], // starting position [lng, lat]
  zoom: 15.75, // starting zoom
});

const marker1 = new mapboxgl.Marker({
  color: "#000000",
})
  .setLngLat([2.3364, 48.86091])
  .addTo(map);

const marker2 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3333, 48.8602])
  .addTo(map);
const marker3 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3397, 48.8607])
  .addTo(map);
const marker4 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.333, 48.8619])
  .addTo(map);
const marker5 = new mapboxgl.Marker({
  color: "#757575",
})
  .setLngLat([2.3365, 48.8625])
  .addTo(map);

map.addControl(new mapboxgl.NavigationControl());
