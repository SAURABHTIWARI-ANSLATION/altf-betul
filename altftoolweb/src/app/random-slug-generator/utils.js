export const getRandomUrl = (category, config) => {
  if (!category || !config || !config[category]) {
    return { error: 'Invalid category or configuration missing.', url: null };
  }

  const urls = config[category].filter(item => item.active && item.url);
  
  if (urls.length === 0) {
    return { error: 'No active URLs found for this category.', url: null };
  }

  const randomIndex = Math.floor(Math.random() * urls.length);
  return { error: null, url: urls[randomIndex].url, title: urls[randomIndex].title };
};

export const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
};
