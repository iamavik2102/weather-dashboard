export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const city = searchParams.get('city');

  // 1. Validate Input
  if (!city) {
    return new Response(JSON.stringify({ error: "City query parameter is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 2. Fetch the Secret Environment Variable from Cloudflare context
  const apiKey = context.env.WEATHER_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Backend Environment Configuration Missing." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  // 3. Request external data from OpenWeatherMap API
  const externalApiUrl = `https://openweathermap.org{encodeURIComponent(city)}&units=metric&appid=${apiKey}`;


  try {
    const apiResponse = await fetch(externalApiUrl);
    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return new Response(JSON.stringify({ error: data.message || "Failed to query upstream API" }), {
        status: apiResponse.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 4. Return secure clean JSON back to user interface
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: `Internal execution fault on the Edge network.Error: ${error.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
