import * as cheerio from 'cheerio';

export async function scrapeUrl(url: string): Promise<string> {
  const blockedPatterns = ['notion.so', 'notion.site'];
  const isBlocked = blockedPatterns.some((p) => url.includes(p));
  if (isBlocked) {
    throw new Error(
      'This site requires JavaScript rendering and cannot be automatically crawled. Please use the "Text" tab to paste the content directly.'
    );
  }

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; AIVideoPromptStudio/1.0)',
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Remove non-content elements
  $('script, style, nav, footer, header, aside, iframe, noscript').remove();

  // Try to get main content
  const mainContent =
    $('article').text() ||
    $('main').text() ||
    $('[role="main"]').text() ||
    $('body').text();

  const cleaned = mainContent
    .replace(/\s+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (cleaned.length < 50) {
    throw new Error(
      'Could not extract meaningful content from this URL. Please use the "Text" tab to paste the content directly.'
    );
  }

  return cleaned.slice(0, 50000); // Limit to ~50k chars
}
