export function getAgentId(): string {
  try {
    // Read BITTE_CONFIG from environment
    const config = process.env.BITTE_CONFIG;
    if (!config) return "";

    // Parse the config and extract URL
    const { url } = JSON.parse(config);
    if (!url) return "";

    // Convert https://example.loca.lt to example.loca.lt
    return url.replace(/^https?:\/\//, "");
  } catch (error) {
    console.error("Error reading agent ID:", error);
    return "";
  }
}
