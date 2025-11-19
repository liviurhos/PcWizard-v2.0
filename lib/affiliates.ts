export const AFFILIATES = {
  RO: {
    emag: (q: string) => `https://www.emag.ro/search/${encodeURIComponent(q)}`,
    pcgarage: (q: string) => `https://www.pcgarage.ro/cauta/${encodeURIComponent(q)}`,
    ebay: (q: string) => `https://ro.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q)}`,
  },
  UK: {
    amazon: (q: string) => `https://www.amazon.co.uk/s?k=${encodeURIComponent(q)}&tag=YOURTAG-21`,
    currys: (q: string) => `https://www.currys.co.uk/search?keyword=${encodeURIComponent(q)}`,
    ebay: (q: string) => `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(q)}`,
  },
};