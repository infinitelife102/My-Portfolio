/**
 * Triggers download of the static CV.pdf file from src/lib/CV.pdf.
 */
import cvPdfUrl from './CV.pdf?url';

export function downloadCv(): void {
  const link = document.createElement('a');
  link.href = cvPdfUrl;
  link.download = 'CV.pdf';
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
