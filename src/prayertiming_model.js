export async function getSearchParamsWithLocation() {
  // 1. Set your default parameters as a fallback
  const params = new URLSearchParams({
    city: 'jeddah',
    country: 'SA',
  });

  try {
    // 2. Fetch the user's location via IP
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) throw new Error("Network response was not ok");
    
    const data = await response.json();

    // 3. Update the parameters with real data if available
    if (data.city && data.country_code) {
      params.set('city', data.city);
      params.set('country', data.country_code); // 'ES', 'US', 'BR', etc.
    }
  } catch (error) {
    console.warn("Could not fetch live location, using defaults:", error.message);
  }

  // 4. Return the URLSearchParams object
  return params;
  
}



export async function FiveParyer(params){
    const { data } = await (
        await fetch(`https://api.islamic.app/v1/timings/today?${params}`)
    ).json()
    return [data.timings.Fajr,data.timings.Dhuhr,data.timings.Asr,data.timings.Maghrib,data.timings.Isha]
}
