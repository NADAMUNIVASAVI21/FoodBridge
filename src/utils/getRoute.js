export async function getRoute(start, end) {
  const res = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
    {
      method: "POST",
      headers: {
        "Authorization": import.meta.env.VITE_ORS_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coordinates: [
          [start.lng, start.lat],
          [end.lng, end.lat]
        ]
      })
    }
  );

  return await res.json();
}
