export interface CachedURL { 
  url: string; 
  slug: string | null; 
}

const redirectHost = (w: Window) => {
  return `${window.location.protocol}//${window.location.host}`
}

const isValidURL = (s: string) => {
  try {
    new URL(s);
    return true; 
  } catch (err) {
    return false;
  }
}

const buildShortURL = (s: string) => {
  return `${window.location.protocol}//${window.location.host}/${s}`
} 

export { redirectHost, isValidURL, buildShortURL };