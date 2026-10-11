import { memo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';

/*
 * Highlighting is pure and every snippet in these notes is a static string, so
 * the result is cached by source text and computed at most once per snippet for
 * the life of the page. Switching topics back and forth is then free.
 */
const cache = new Map();

function highlight(source) {
  let html = cache.get(source);
  if (html === undefined) {
    html = Prism.highlight(source, Prism.languages.java, 'java');
    cache.set(source, html);
  }
  return html;
}

function Code({ children }) {
  const source = typeof children === 'string' ? children.trim() : String(children);
  return (
    <div className="code-block">
      <span className="lang-badge">JAVA</span>
      <pre><code dangerouslySetInnerHTML={{ __html: highlight(source) }} /></pre>
    </div>
  );
}

/* memo so a parent re-render never re-runs the cache lookup or rebuilds the DOM. */
export default memo(Code);
