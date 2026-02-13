exports.handler = async function(event) {
  const ip =
    event.headers["x-nf-client-connection-ip"] ||
    event.headers["client-ip"] ||
    event.headers["x-forwarded-for"]?.split(",")[0] ||
    "Unknown";

  const country = event.headers["x-country"] || "Unknown";
  const region = event.headers["x-region"] || "Unknown";
  const city = event.headers["x-city"] || "Unknown";

  return {
    statusCode: 200,
    body: JSON.stringify({
      ip: ip,
      city: city,
      region: region,
      country: country
    })
  };
};
