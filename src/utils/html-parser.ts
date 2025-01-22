import * as cheerio from 'cheerio';

export const parseHtmlAndCheckException = (html: string): string | null => {
  // Load the HTML into cheerio
  const $ = cheerio.load(html);

  // Look for the div with monospace font-family, which contains the error message
  const errorDiv = $('div[style*="font-family:monospace"]');

  if (errorDiv.length > 0) {
    const errorText = errorDiv.text().trim();

    // Check if the error message contains the word "Exception"
    if (
      errorText &&
      (errorText.toLowerCase().includes('exception') ||
        errorText.toLowerCase().includes('error'))
    ) {
      return errorText;
    }
  }

  return null;
};

// Example usage
// const htmlContent = `<!DOCTYPE html><html><head><link rel="shortcut icon" href="//ssl.gstatic.com/docs/script/images/favicon.ico"><title>Fehler</title><style type="text/css" nonce="8A0IKWhA7IW18PQPEXRiyQ">body {background-color: #fff; margin: 0; padding: 0;}.errorMessage {font-family: Arial,sans-serif; font-size: 12pt; font-weight: bold; line-height: 150%; padding-top: 25px;}</style></head><body style="margin:20px"><div><img alt="Google Apps Script" src="//ssl.gstatic.com/docs/script/images/logo.png"></div><div style="text-align:center;font-family:monospace;margin:50px auto 0;max-width:600px">Exception: Sie haben innerhalb kurzer Zeit zu viele Kalender oder Kalendereinträge erstellt oder gelöscht. Versuchen Sie es später noch einmal. (Zeile 3, Datei &quot;Code&quot;)</div></body></html>`;

// const exceptionMessage = parseHtmlAndCheckException(htmlContent);

// if (exceptionMessage) {
//   console.log('Exception found:', exceptionMessage);
// } else {
//   console.log('No exception found in the HTML');
// }
