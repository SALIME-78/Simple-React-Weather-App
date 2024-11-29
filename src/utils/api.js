export const getCityname  = (latitude, longitude) => fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`,
    {
      headers: {
        'Accept-Language': 'en'
      }
    }
  )
    .then(response => response.json())
    .then(data => {
      // Extract city and country information from the response
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.hamlet;
      const country = data.address.country;
      return city
    })
    .catch(error => {
      console.error('Error:', error);
    });


