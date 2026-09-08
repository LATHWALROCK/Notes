import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';

const BADGES = { java: 'JAVA', cpp: 'C++' };

export default function Code({ children, lang = 'java' }) {
  const source = typeof children === 'string' ? children.trim() : String(children);
  const grammar = Prism.languages[lang] ?? Prism.languages.java;
  const html = Prism.highlight(source, grammar, lang);
  return (
    <div className="code-block">
      <span className="lang-badge">{BADGES[lang] ?? lang.toUpperCase()}</span>
      <pre><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
    </div>
  );
}
