function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const config = {
  tmdbApiKey: getEnvVar('TMDB_API_KEY'),
  tmdbBaseUrl: getEnvVar('TMDB_BASE_URL'),
};
