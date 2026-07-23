export interface GeoCoordinates {
  lat: number;
  lng: number;
  isIpFallback?: boolean;
}

/**
 * Fast IP-based geolocation fallback using reliable HTTPS IP geolocation endpoints.
 */
export async function fetchIpLocation(): Promise<GeoCoordinates | null> {
  try {
    const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
    if (res.ok) {
      const data = await res.json();
      const lat = parseFloat(data.latitude);
      const lng = parseFloat(data.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng, isIpFallback: true };
      }
    }
  } catch (e) {
    // Fallback to ipapi.co
  }

  try {
    const res2 = await fetch("https://ipapi.co/json/");
    if (res2.ok) {
      const data2 = await res2.json();
      const lat = parseFloat(data2.latitude);
      const lng = parseFloat(data2.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng, isIpFallback: true };
      }
    }
  } catch (err2) {
    console.warn("IP Geolocation fallback failed:", err2);
  }

  return null;
}

/**
 * Tries browser HTML5 Geolocation first. If blocked, denied, or insecure origin (HTTP),
 * automatically falls back to IP-based location determination so user is never stuck.
 */
export function getCurrentPositionWithFallback(
  options: PositionOptions = { enableHighAccuracy: true, timeout: 8000 }
): Promise<GeoCoordinates> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Geolocation unavailable in SSR"));
      return;
    }

    if (!navigator.geolocation) {
      fetchIpLocation().then((ipPos) => {
        if (ipPos) resolve(ipPos);
        else reject(new Error("Geolocation not supported and IP fallback failed"));
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          isIpFallback: false,
        });
      },
      async (error) => {
        console.warn(
          `HTML5 Geolocation error (${error.code}: ${error.message}). Attempting IP fallback...`
        );
        const ipPos = await fetchIpLocation();
        if (ipPos) {
          resolve(ipPos);
        } else {
          reject(error);
        }
      },
      options
    );
  });
}
