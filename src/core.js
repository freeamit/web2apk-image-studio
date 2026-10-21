export const FORMATS = ['image/png', 'image/jpeg', 'image/webp'];

export function boundedDimension(value) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 8192) throw new Error('Dimensions must be whole numbers from 1 to 8192.');
  return n;
}

export function safePackageName(input) {
  const value = String(input).trim();
  if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*){2,}$/.test(value)) throw new Error('Use a valid Android ID, e.g. com.example.myapp');
  return value;
}

export function verifyUrl(input) {
  const url = new URL(String(input));
  if (url.protocol !== 'https:') throw new Error('Use an HTTPS website URL.');
  if (!url.hostname.includes('.') || url.username || url.password) throw new Error('Enter a public website URL.');
  return url.origin;
}

export function makeConfig({name, url, packageName, themeColor}) {
  const appName = String(name).trim();
  if (!appName || appName.length > 50) throw new Error('App name must be 1–50 characters.');
  if (!/^#[0-9a-fA-F]{6}$/.test(themeColor)) throw new Error('Use a six-digit hex theme color.');
  return { appName, websiteOrigin: verifyUrl(url), packageName: safePackageName(packageName), themeColor, suggestedAndroidMode: 'Trusted Web Activity', note: 'Configuration only. APK compilation and domain verification require Android tools and assetlinks.json.' };
}
