exports.handler = async function(event) {
  try {
    const ip =
      event.headers["x-nf-client-connection-ip"] ||
      event.headers["client-ip"] ||
      event.headers["x-forwarded-for"]?.split(",")[0] ||
      "Unknown";

    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        ip: ip,
        city: data.city || "Unknown",
        region: data.region || "Unknown",
        country: data.country_name || "Unknown"
      })
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        ip: "Unknown",
        city: "Unknown",
        region: "Unknown",
        country: "Unknown"
      })
    };
  }
};
