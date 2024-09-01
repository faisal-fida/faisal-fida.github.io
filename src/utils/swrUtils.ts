export const fetcher = async (url: string) => {
  const cachedData = localStorage.getItem(url);
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem(url, JSON.stringify(data));
  return data;
};

export const localStorageProvider = () => {
  const map = new Map<string, any>(
    JSON.parse(localStorage.getItem("app-cache") || "[]")
  );

  window.addEventListener("beforeunload", () => {
    localStorage.setItem(
      "app-cache",
      JSON.stringify(Array.from(map.entries()))
    );
  });

  return map;
};
