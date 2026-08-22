import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-java';

export default function Code({ children }) {
  const source = typeof children === 'string' ? children.trim() : String(children);
  const html = Prism.highlight(source, Prism.languages.java, 'java');
  return (
    <div className="code-block">
      <span className="lang-badge">JAVA</span>
      <pre><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
    </div>
  );
}
