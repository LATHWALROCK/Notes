export default function Part1() {
  return (
    <>
      {/* 1.1 */}
      <div id="part1-1" data-topic-boundary="true" />
      <div className="card">
        <p>
          <strong>Write Once, Run Anywhere (WORA)</strong> — Java source code is compiled to platform-neutral{' '}
          <em>bytecode</em> (.class files), which runs on any device that has a{' '}
          <strong>Java Virtual Machine (JVM)</strong>. The JVM acts as the translation layer between bytecode and the
          native machine code of the host OS.
        </p>
      </div>

      <div className="subsection-header"><h3>Compilation Pipeline</h3></div>
      <pre className="diagram">{
`┌──────────────┐      javac       ┌──────────────┐      JVM       ┌──────────────────┐
│  Hello.java  │  ──────────────▶ │  Hello.class │  ──────────▶   │  Machine Code    │
│  (Source)    │   Java Compiler  │  (Bytecode)  │  ClassLoader   │  (OS / Hardware)  │
└──────────────┘                  └──────────────┘                └──────────────────┘
      ▲                                                                   ▲
Human-readable                                                    Platform-specific`
      }</pre>

      <div className="subsection-header"><h3>JDK vs JRE vs JVM</h3></div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Component</th><th>Stands For</th><th>Contains</th><th>Use Case</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="pill">JVM</span></td>
              <td>Java Virtual Machine</td>
              <td>Class loader, bytecode verifier, JIT compiler, GC, runtime areas</td>
              <td>Executes .class bytecode</td>
            </tr>
            <tr>
              <td><span className="pill">JRE</span></td>
              <td>Java Runtime Environment</td>
              <td>JVM + standard class libraries (java.lang, java.util…)</td>
              <td>Run Java programs (end-users)</td>
            </tr>
            <tr>
              <td><span className="pill">JDK</span></td>
              <td>Java Development Kit</td>
              <td>JRE + javac, javadoc, jdb, jshell, other dev tools</td>
              <td>Develop &amp; compile Java programs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Tip</div>
        Since Java 11, separate JREs are no longer distributed. The JDK is the only official download. Use{' '}
        <code>jlink</code> to create a trimmed runtime image for deployment.
      </div>

      <div className="subsection-header"><h3>ClassLoader Subsystem</h3></div>
      <div className="card">
        <p>
          ClassLoaders load .class files into the JVM on demand. They follow the <strong>delegation model</strong>: a
          child loader always asks its parent first before loading itself.
        </p>
        <pre className="diagram">{
`Bootstrap ClassLoader  (native C++, loads rt.jar / java.base)
       │
Extension ClassLoader  (loads from $JAVA_HOME/lib/ext)
       │
Application ClassLoader  (loads from -classpath / CLASSPATH)
       │
Custom ClassLoader  (user-defined, used in frameworks/containers)`
        }</pre>
        <ul>
          <li><strong>Bootstrap</strong> — highest trust, loads core classes like <code>java.lang.Object</code>,{' '}
            <code>java.lang.String</code>.</li>
          <li><strong>Extension (Platform in Java 9+)</strong> — loads from <code>jre/lib/ext</code>; replaced by
            module system in Java 9.</li>
          <li><strong>Application</strong> — loads your application's classpath classes.</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>JVM Memory Areas</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Area</th><th>Per</th><th>Contents</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><strong>Method Area</strong></td><td>JVM-wide</td>
              <td>Class metadata, static variables, bytecode, constant pool</td>
              <td>Part of Metaspace (Java 8+)</td></tr>
            <tr><td><strong>Heap</strong></td><td>JVM-wide</td>
              <td>All object instances and arrays</td>
              <td>GC-managed; Eden, Survivor, Old Gen</td></tr>
            <tr><td><strong>Stack</strong></td><td>Per thread</td>
              <td>Stack frames (local vars, operand stack, frame data)</td>
              <td>StackOverflowError if exceeded</td></tr>
            <tr><td><strong>PC Register</strong></td><td>Per thread</td>
              <td>Address of current bytecode instruction</td>
              <td>Undefined for native methods</td></tr>
            <tr><td><strong>Native Method Stack</strong></td><td>Per thread</td>
              <td>Frames for native (C/C++) method calls</td>
              <td>Used with JNI</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>JIT Compiler &amp; HotSpot</h3></div>
      <div className="card">
        <p>
          The JVM starts by <strong>interpreting</strong> bytecode instruction-by-instruction. The{' '}
          <strong>JIT (Just-In-Time) Compiler</strong> monitors execution and identifies "hot spots" — code paths
          executed many times. It compiles those paths to native machine code for a dramatic speed boost.
        </p>
        <ul>
          <li><strong>C1 (Client Compiler)</strong> — fast compilation, light optimizations. Good for short-lived
            processes.</li>
          <li><strong>C2 (Server Compiler)</strong> — deeper optimizations (inlining, loop unrolling). Better peak
            throughput.</li>
          <li><strong>Tiered Compilation</strong> (default Java 8+) — starts with C1, promotes hot code to C2.</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Bytecode Verification</h3></div>
      <div className="card">
        <p>Before execution, the JVM <strong>verifier</strong> checks .class files to ensure:</p>
        <ul>
          <li>The class file format is valid and has correct magic bytes (<code>0xCAFEBABE</code>).</li>
          <li>No stack overflows/underflows occur in bytecode.</li>
          <li>Type safety is maintained (no illegal casts).</li>
          <li>No access to private members from outside the class.</li>
        </ul>
        <p>This is Java's first line of defence against malicious or corrupt class files.</p>
      </div>

      <div className="subsection-header"><h3>Garbage Collection</h3></div>
      <div className="card">
        <p><strong>Mark-and-Sweep</strong> is the foundational GC algorithm:</p>
        <ol>
          <li><strong>Mark</strong> — starting from GC roots (local vars, static refs), traverse the object graph and
            mark reachable objects.</li>
          <li><strong>Sweep</strong> — reclaim memory occupied by unmarked (unreachable) objects.</li>
          <li><strong>Compact</strong> (some collectors) — move live objects together to reduce fragmentation.</li>
        </ol>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Collector</th><th>Algorithm</th><th>Stop-the-World?</th><th>Best For</th></tr></thead>
          <tbody>
            <tr><td><strong>Serial GC</strong></td><td>Mark-Sweep-Compact</td><td>Yes (full)</td>
              <td>Single-threaded / small heaps</td></tr>
            <tr><td><strong>Parallel GC</strong></td><td>Multi-threaded M-S-C</td><td>Yes (full, shorter)</td>
              <td>Throughput-focused apps</td></tr>
            <tr><td><strong>G1 GC</strong></td><td>Region-based, incremental</td><td>Short concurrent pauses</td>
              <td>Balanced throughput + latency</td></tr>
            <tr><td><strong>ZGC</strong></td><td>Load-barrier, concurrent</td><td>&lt;1ms pauses</td>
              <td>Ultra-low latency, large heaps</td></tr>
            <tr><td><strong>Shenandoah</strong></td><td>Concurrent compaction</td><td>&lt;1ms pauses</td>
              <td>Low-latency, Red Hat JDK</td></tr>
          </tbody>
        </table>
      </div>

      {/* 1.2 */}
      <div id="part1-2" data-topic-boundary="true" />

      <div className="subsection-header"><h3>The <code>main()</code> Method — Dissected</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="kw">public</span> <span className="kw">static</span> <span className="kw">void</span> <span className="fn">main</span>(<span className="tp">String</span>[] args) {'{'}
    <span className="cm">// program entry point</span>
{'}'}
        </pre>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Keyword</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td><code>public</code></td><td>Accessible from outside the class — JVM must be able to call it.</td></tr>
            <tr><td><code>static</code></td><td>Belongs to the class, not an instance — JVM calls it without creating an object.</td></tr>
            <tr><td><code>void</code></td><td>No return value — program exit is handled by the JVM/OS.</td></tr>
            <tr><td><code>String[] args</code></td><td>Command-line arguments passed as an array of strings.</td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout callout-note">
        <div className="callout-title">📝 Note</div>
        Java 21 previews <em>unnamed classes</em> — you can write just <code>void main() {'{}'}</code> without a class
        declaration for simple scripts.
      </div>

      <div className="subsection-header"><h3>Case Sensitivity</h3></div>
      <div className="card">
        <p>Java is <strong>completely case-sensitive</strong>. Each identifier below is a distinct entity:</p>
        <div className="code-block">
          <span className="lang-badge">JAVA</span>
          <pre>
<span className="kw">int</span> count   = <span className="nm">1</span>;   <span className="cm">// variable</span>
<span className="kw">int</span> Count   = <span className="nm">2</span>;   <span className="cm">// different variable</span>
<span className="kw">int</span> COUNT   = <span className="nm">3</span>;   <span className="cm">// yet another</span>
<span className="tp">String</span> str  = <span className="st">"hello"</span>;
<span className="cm">// String ≠ string ≠ STRING</span>
          </pre>
        </div>
      </div>

      <div className="subsection-header"><h3>Naming Conventions</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Element</th><th>Convention</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td>Classes, Interfaces, Enums, Annotations</td><td>PascalCase</td>
              <td><code>BankAccount</code>, <code>Runnable</code></td></tr>
            <tr><td>Methods, Variables, Parameters</td><td>camelCase</td>
              <td><code>getBalance()</code>, <code>userName</code></td></tr>
            <tr><td>Constants (<code>static final</code>)</td><td>UPPER_SNAKE_CASE</td>
              <td><code>MAX_SIZE</code>, <code>PI</code></td></tr>
            <tr><td>Packages</td><td>lowercase, reversed domain</td><td><code>com.example.app</code></td></tr>
            <tr><td>Type Parameters (Generics)</td><td>Single uppercase letter</td>
              <td><code>T</code>, <code>E</code>, <code>K</code>, <code>V</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Comments</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="cm">// Single-line comment — from // to end of line</span>
{'\n'}
<span className="cm">{`/* Multi-line comment
   spans multiple lines
   used for block explanations */`}</span>
{'\n'}
<span className="cm">{`/**
 * Javadoc comment — generates HTML documentation.
 * @param name  the user's display name
 * @return      a personalised greeting string
 * @throws IllegalArgumentException if name is null
 */`}</span>
<span className="kw">public</span> <span className="tp">String</span> <span className="fn">greet</span>(<span className="tp">String</span> name) {'{ ... }'}
        </pre>
      </div>

      <div className="subsection-header"><h3>Operators</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Category</th><th>Operators</th><th>Example</th><th>Result</th></tr></thead>
          <tbody>
            <tr><td>Arithmetic</td><td><code>+ - * / % ++ --</code></td><td><code>10 % 3</code></td><td><code>1</code></td></tr>
            <tr><td>Relational</td><td><code>== != &lt; &gt; &lt;= &gt;=</code></td><td><code>5 &gt;= 5</code></td><td><code>true</code></td></tr>
            <tr><td>Logical</td><td><code>&amp;&amp; || !</code></td><td><code>true &amp;&amp; false</code></td><td><code>false</code></td></tr>
            <tr><td>Bitwise</td><td><code>&amp; | ^ ~ &lt;&lt; &gt;&gt; &gt;&gt;&gt;</code></td><td><code>5 &amp; 3</code></td><td><code>1</code></td></tr>
            <tr><td>Assignment</td><td><code>= += -= *= /= %= &amp;= |= ^= &lt;&lt;= &gt;&gt;=</code></td><td><code>x += 5</code></td><td>x = x+5</td></tr>
            <tr><td>Ternary</td><td><code>? :</code></td><td><code>a&gt;b ? a : b</code></td><td>max(a,b)</td></tr>
            <tr><td>instanceof</td><td><code>instanceof</code></td><td><code>obj instanceof String</code></td><td><code>true/false</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Operator Precedence (High → Low)</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Level</th><th>Operators</th><th>Associativity</th></tr></thead>
          <tbody>
            <tr><td>1 (highest)</td><td><code>() [] .</code></td><td>Left → Right</td></tr>
            <tr><td>2</td><td><code>++ -- ~ ! (unary) (cast)</code></td><td>Right → Left</td></tr>
            <tr><td>3</td><td><code>* / %</code></td><td>Left → Right</td></tr>
            <tr><td>4</td><td><code>+ -</code></td><td>Left → Right</td></tr>
            <tr><td>5</td><td><code>&lt;&lt; &gt;&gt; &gt;&gt;&gt;</code></td><td>Left → Right</td></tr>
            <tr><td>6</td><td><code>&lt; &lt;= &gt; &gt;= instanceof</code></td><td>Left → Right</td></tr>
            <tr><td>7</td><td><code>== !=</code></td><td>Left → Right</td></tr>
            <tr><td>8</td><td><code>&amp;</code></td><td>Left → Right</td></tr>
            <tr><td>9</td><td><code>^</code></td><td>Left → Right</td></tr>
            <tr><td>10</td><td><code>|</code></td><td>Left → Right</td></tr>
            <tr><td>11</td><td><code>&amp;&amp;</code></td><td>Left → Right</td></tr>
            <tr><td>12</td><td><code>||</code></td><td>Left → Right</td></tr>
            <tr><td>13</td><td><code>? :</code></td><td>Right → Left</td></tr>
            <tr><td>14</td><td><code>= += -= *= /= %= &amp;= |= ^= &lt;&lt;= &gt;&gt;= &gt;&gt;&gt;=</code></td><td>Right → Left</td></tr>
            <tr><td>15 (lowest)</td><td><code>,</code></td><td>Left → Right</td></tr>
          </tbody>
        </table>
      </div>

      {/* 1.3 */}
      <div id="part1-3" data-topic-boundary="true" />
      <div className="card">
        <p>
          The <code>static</code> keyword means a member belongs to the <strong>class</strong>, not to any particular
          instance. Static members are loaded once when the class is loaded and shared across all instances.
        </p>
      </div>

      <div className="subsection-header"><h3>Static Variables</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="kw">public class</span> <span className="tp">Counter</span> {'{'}
    <span className="kw">static int</span> count = <span className="nm">0</span>;   <span className="cm">// class-level, shared by all instances</span>
    <span className="kw">int</span> id;                    <span className="cm">// instance-level, unique per object</span>
{'\n'}
    <span className="tp">Counter</span>() {'{'}
        count++;               <span className="cm">// increments the single shared copy</span>
        <span className="kw">this</span>.id = count;
    {'}'}
{'}'}
{'\n'}
<span className="tp">Counter</span> a = <span className="kw">new</span> <span className="tp">Counter</span>(); <span className="cm">// count = 1, a.id = 1</span>
<span className="tp">Counter</span> b = <span className="kw">new</span> <span className="tp">Counter</span>(); <span className="cm">// count = 2, b.id = 2</span>
<span className="tp">System</span>.out.<span className="fn">println</span>(<span className="tp">Counter</span>.count); <span className="cm">// 2 — access via class name</span>
        </pre>
      </div>

      <div className="subsection-header"><h3>Static Methods</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="kw">public class</span> <span className="tp">MathUtils</span> {'{'}
    <span className="kw">public static int</span> <span className="fn">square</span>(<span className="kw">int</span> n) {'{'}
        <span className="kw">return</span> n * n;
    {'}'}
    <span className="cm">// static methods CANNOT access instance variables / methods directly</span>
    <span className="cm">// static methods CANNOT use 'this' or 'super'</span>
    <span className="cm">// static methods CAN call other static methods</span>
{'}'}
{'\n'}
<span className="kw">int</span> result = <span className="tp">MathUtils</span>.<span className="fn">square</span>(<span className="nm">5</span>); <span className="cm">// 25 — no object needed</span>
        </pre>
      </div>
      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Warning</div>
        Calling <code>this.staticMethod()</code> compiles (it resolves to the class), but it's bad practice — always
        use <code>ClassName.staticMethod()</code> for clarity.
      </div>

      <div className="subsection-header"><h3>Static Blocks (Initializers)</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="kw">public class</span> <span className="tp">Config</span> {'{'}
    <span className="kw">static final</span> <span className="tp">Map</span>&lt;<span className="tp">String</span>, <span className="tp">String</span>&gt; DEFAULTS;
{'\n'}
    <span className="kw">static</span> {'{'}
        <span className="cm">// runs once when class is first loaded by ClassLoader</span>
        DEFAULTS = <span className="kw">new</span> <span className="tp">HashMap</span>&lt;&gt;();
        DEFAULTS.<span className="fn">put</span>(<span className="st">"host"</span>, <span className="st">"localhost"</span>);
        DEFAULTS.<span className="fn">put</span>(<span className="st">"port"</span>, <span className="st">"8080"</span>);
    {'}'}
{'\n'}
    <span className="kw">static int</span> x;
    <span className="kw">static int</span> y;
{'\n'}
    <span className="kw">static</span> {'{ x = '}<span className="nm">10</span>; {'}'}   <span className="cm">// multiple static blocks allowed</span>
    <span className="kw">static</span> {'{ y = x * '}<span className="nm">2</span>; {'}'} <span className="cm">// executed in order of appearance</span>
{'}'}
        </pre>
      </div>
      <div className="callout callout-note">
        <div className="callout-title">📝 Initialization Order</div>
        For a class: 1) static variables &amp; blocks (in textual order) → 2) instance variables &amp; instance
        initializers → 3) constructor.
      </div>

      <div className="subsection-header"><h3>Static Imports</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="kw">import static</span> java.lang.<span className="tp">Math</span>.PI;
<span className="kw">import static</span> java.lang.<span className="tp">Math</span>.sqrt;
<span className="kw">import static</span> org.junit.<span className="tp">Assert</span>.*;  <span className="cm">// import all static members</span>
{'\n'}
<span className="kw">double</span> area = PI * r * r;      <span className="cm">// no Math. prefix needed</span>
<span className="kw">double</span> root = <span className="fn">sqrt</span>(<span className="nm">16.0</span>);     <span className="cm">// 4.0</span>
<span className="fn">assertEquals</span>(<span className="nm">4</span>, result);       <span className="cm">// from JUnit Assert</span>
        </pre>
      </div>

      <div className="subsection-header"><h3>Static Inner Classes</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="kw">public class</span> <span className="tp">Outer</span> {'{'}
    <span className="kw">private static int</span> outerStatic = <span className="nm">42</span>;
    <span className="kw">private int</span> outerInstance = <span className="nm">10</span>;
{'\n'}
    <span className="kw">static class</span> <span className="tp">Nested</span> {'{'}
        <span className="kw">void</span> <span className="fn">show</span>() {'{'}
            <span className="tp">System</span>.out.<span className="fn">println</span>(outerStatic);    <span className="cm">// ✓ can access static</span>
            <span className="cm">// System.out.println(outerInstance); // ✗ no instance ref!</span>
        {'}'}
    {'}'}
{'}'}
{'\n'}
<span className="cm">// Instantiate WITHOUT an outer object:</span>
<span className="tp">Outer</span>.<span className="tp">Nested</span> n = <span className="kw">new</span> <span className="tp">Outer</span>.<span className="tp">Nested</span>();
        </pre>
      </div>

      {/* 1.4 */}
      <div id="part1-4" data-topic-boundary="true" />

      <div className="subsection-header"><h3>Primitive Types — Full Reference</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Type</th><th>Size</th><th>Range</th><th>Default</th><th>Wrapper</th></tr></thead>
          <tbody>
            <tr><td><code>byte</code></td><td>8-bit</td><td>-128 to 127</td><td><code>0</code></td><td><code>Byte</code></td></tr>
            <tr><td><code>short</code></td><td>16-bit</td><td>-32,768 to 32,767</td><td><code>0</code></td><td><code>Short</code></td></tr>
            <tr><td><code>int</code></td><td>32-bit</td><td>-2,147,483,648 to 2,147,483,647</td><td><code>0</code></td><td><code>Integer</code></td></tr>
            <tr><td><code>long</code></td><td>64-bit</td><td>±9.2 × 10<sup>18</sup></td><td><code>0L</code></td><td><code>Long</code></td></tr>
            <tr><td><code>float</code></td><td>32-bit IEEE 754</td><td>~±3.4 × 10<sup>38</sup>, 7 decimal digits</td><td><code>0.0f</code></td><td><code>Float</code></td></tr>
            <tr><td><code>double</code></td><td>64-bit IEEE 754</td><td>~±1.7 × 10<sup>308</sup>, 15 decimal digits</td><td><code>0.0</code></td><td><code>Double</code></td></tr>
            <tr><td><code>char</code></td><td>16-bit Unicode</td><td>0 to 65535</td><td><code>'\u0000'</code></td><td><code>Character</code></td></tr>
            <tr><td><code>boolean</code></td><td>~1-bit (JVM-specific)</td><td><code>true</code>/<code>false</code></td><td><code>false</code></td><td><code>Boolean</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Type Casting</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="cm">// ── Widening (implicit, safe, no data loss) ──</span>
<span className="kw">int</span>    i = <span className="nm">100</span>;
<span className="kw">long</span>   l = i;    <span className="cm">// int → long, automatic</span>
<span className="kw">double</span> d = l;    <span className="cm">// long → double, automatic</span>
<span className="cm">// byte → short → int → long → float → double</span>
{'\n'}
<span className="cm">// ── Narrowing (explicit, may lose data) ──</span>
<span className="kw">double</span> x = <span className="nm">9.99</span>;
<span className="kw">int</span>    y = (<span className="kw">int</span>) x;  <span className="cm">// 9 — fractional part truncated!</span>
<span className="kw">int</span>    big = <span className="nm">300</span>;
<span className="kw">byte</span>   b = (<span className="kw">byte</span>) big; <span className="cm">// 44 — wraps around (300 % 256)</span>
        </pre>
      </div>

      <div className="subsection-header"><h3>Autoboxing &amp; Unboxing</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="cm">// Autoboxing: primitive → wrapper object</span>
<span className="tp">Integer</span> boxed = <span className="nm">42</span>;          <span className="cm">// compiler: Integer.valueOf(42)</span>
<span className="tp">List</span>&lt;<span className="tp">Integer</span>&gt; list = <span className="kw">new</span> <span className="tp">ArrayList</span>&lt;&gt;();
list.<span className="fn">add</span>(<span className="nm">10</span>);                  <span className="cm">// autoboxed to Integer</span>
{'\n'}
<span className="cm">// Unboxing: wrapper → primitive</span>
<span className="kw">int</span> val = boxed;              <span className="cm">// compiler: boxed.intValue()</span>
{'\n'}
<span className="cm">// ⚠️ Pitfall 1 — NullPointerException on unboxing!</span>
<span className="tp">Integer</span> n = <span className="kw">null</span>;
<span className="kw">int</span> x = n;  <span className="cm">// NPE at runtime!</span>
{'\n'}
<span className="cm">// ⚠️ Pitfall 2 — == compares references for wrappers!</span>
<span className="tp">Integer</span> a = <span className="nm">200</span>, b = <span className="nm">200</span>;
<span className="tp">System</span>.out.<span className="fn">println</span>(a == b);   <span className="cm">// false (different objects!)</span>
<span className="tp">System</span>.out.<span className="fn">println</span>(a.<span className="fn">equals</span>(b)); <span className="cm">// true ✓</span>
        </pre>
      </div>

      <div className="subsection-header"><h3>Integer Cache (-128 to 127)</h3></div>
      <div className="card">
        <p>
          The JVM caches <code>Integer</code> objects for values in the range <strong>-128 to 127</strong> inclusive.{' '}
          <code>Integer.valueOf()</code> returns the same cached object for values in this range, so <code>==</code>{' '}
          returns <code>true</code>.
        </p>
      </div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="tp">Integer</span> a = <span className="nm">127</span>, b = <span className="nm">127</span>;
<span className="tp">System</span>.out.<span className="fn">println</span>(a == b);   <span className="cm">// true  ← cached, same object</span>
{'\n'}
<span className="tp">Integer</span> c = <span className="nm">128</span>, d = <span className="nm">128</span>;
<span className="tp">System</span>.out.<span className="fn">println</span>(c == d);   <span className="cm">// false ← outside cache, new objects</span>
{'\n'}
<span className="cm">// Why? JLS 5.1.7 mandates caching for -128..127</span>
<span className="cm">// Always use .equals() to compare Integer values!</span>
        </pre>
      </div>
      <div className="callout callout-tip">
        <div className="callout-title">💡 Cache Extension</div>
        You can extend the upper cache limit with JVM flag: <code>-XX:AutoBoxCacheMax=500</code>. Only the upper
        bound is configurable; -128 is always the lower bound.
      </div>

      <div className="subsection-header"><h3>var — Local Variable Type Inference (Java 10+)</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="cm">// var lets the compiler infer the type from the right-hand side</span>
<span className="kw">var</span> name    = <span className="st">"Alice"</span>;           <span className="cm">// inferred: String</span>
<span className="kw">var</span> score   = <span className="nm">95.5</span>;              <span className="cm">// inferred: double</span>
<span className="kw">var</span> list    = <span className="kw">new</span> <span className="tp">ArrayList</span>&lt;<span className="tp">String</span>&gt;(); <span className="cm">// inferred: ArrayList&lt;String&gt;</span>
{'\n'}
<span className="cm">// RULES for var:</span>
<span className="cm">// ✓ local variables only (method body, for-loops)</span>
<span className="cm">// ✗ cannot use for fields, method params, return types</span>
<span className="cm">// ✗ cannot be null without a cast: var x = null; // error!</span>
<span className="cm">// ✗ cannot initialize with an array literal: var a = {'{1,2,3}'};</span>
{'\n'}
<span className="kw">for</span> (<span className="kw">var</span> entry : map.<span className="fn">entrySet</span>()) {'{'} <span className="cm">// works in enhanced for-loop</span>
    <span className="tp">System</span>.out.<span className="fn">println</span>(entry.<span className="fn">getKey</span>());
{'}'}
        </pre>
      </div>

      {/* 1.5 */}
      <div id="part1-5" data-topic-boundary="true" />
      <div className="card">
        <p>
          <code>String</code> is a <strong>final class</strong> in <code>java.lang</code>. Internally it's backed by
          a <code>char[]</code> (pre-Java 9) or <code>byte[]</code> with encoding flag (Java 9+ compact strings).
          Strings are <strong>immutable</strong> — once created, the content cannot change. Any "modification"
          creates a new object.
        </p>
      </div>

      <div className="subsection-header"><h3>String Pool &amp; Memory Layout</h3></div>
      <pre className="diagram">{
`┌────────────────────────────────────────────────────────────┐
│                        HEAP                                │
│                                                              │
│   ┌─────────────────────┐                                   │
│   │     String Pool      │                                   │
│   │  ┌──────────────────┐ │                                   │
│   │  │  "hello"  (obj1) │ │──┬─── String a = "hello"          │
│   │  │  "world"  (obj2) │ │  │   String b = "hello" ──┘ (same ref!)
│   │  └──────────────────┘ │  │
│   └─────────────────────┘
│
│   String c = new String("hello");  ← NEW object, outside pool
│   ┌──────────────────────┐
│   │  "hello"  (obj3)     │  ← separate heap object
│   └──────────────────────┘
└──────────────────────────────────────────────────────────────┘`
      }</pre>

      <div className="subsection-header"><h3>Literal vs new String()</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="tp">String</span> a = <span className="st">"hello"</span>;           <span className="cm">// goes to String Pool</span>
<span className="tp">String</span> b = <span className="st">"hello"</span>;           <span className="cm">// reuses same pool object</span>
<span className="tp">String</span> c = <span className="kw">new</span> <span className="tp">String</span>(<span className="st">"hello"</span>); <span className="cm">// new heap object, NOT in pool</span>
{'\n'}
<span className="tp">System</span>.out.<span className="fn">println</span>(a == b);        <span className="cm">// true  (same pool ref)</span>
<span className="tp">System</span>.out.<span className="fn">println</span>(a == c);        <span className="cm">// false (different objects)</span>
<span className="tp">System</span>.out.<span className="fn">println</span>(a.<span className="fn">equals</span>(c));   <span className="cm">// true  (same content)</span>
{'\n'}
<span className="cm">// intern() moves a heap string into the pool:</span>
<span className="tp">String</span> d = c.<span className="fn">intern</span>();
<span className="tp">System</span>.out.<span className="fn">println</span>(a == d);        <span className="cm">// true  (d is now the pool ref)</span>
        </pre>
      </div>

      <div className="subsection-header"><h3>== vs .equals() vs .equalsIgnoreCase()</h3></div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Comparison</th><th>Checks</th><th>"hello" == "hello" (literals)</th>
              <th>"hello" == new String("hello")</th><th>"Hello".equals("hello")</th></tr>
          </thead>
          <tbody>
            <tr><td><code>==</code></td><td>Reference identity</td>
              <td><span className="pill pill-success">true</span></td>
              <td><span className="pill pill-danger">false</span></td>
              <td><span className="pill pill-danger">false</span></td></tr>
            <tr><td><code>.equals()</code></td><td>Content (case-sensitive)</td>
              <td><span className="pill pill-success">true</span></td>
              <td><span className="pill pill-success">true</span></td>
              <td><span className="pill pill-danger">false</span></td></tr>
            <tr><td><code>.equalsIgnoreCase()</code></td><td>Content (case-insensitive)</td>
              <td><span className="pill pill-success">true</span></td>
              <td><span className="pill pill-success">true</span></td>
              <td><span className="pill pill-success">true</span></td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Never use == for String content comparison</div>
        It works accidentally for literals (due to pooling) but fails for String objects returned from methods,
        parsing, or <code>new String()</code>. Always use <code>.equals()</code>.
      </div>

      <div className="subsection-header"><h3>Important String Methods</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>length()</code></td><td>Number of characters</td><td><code>"hi".length()</code> → <code>2</code></td></tr>
            <tr><td><code>charAt(i)</code></td><td>Char at index i</td><td><code>"abc".charAt(1)</code> → <code>'b'</code></td></tr>
            <tr><td><code>indexOf(s)</code></td><td>First occurrence index (-1 if not found)</td><td><code>"hello".indexOf("ll")</code> → <code>2</code></td></tr>
            <tr><td><code>lastIndexOf(s)</code></td><td>Last occurrence index</td><td><code>"abab".lastIndexOf("a")</code> → <code>2</code></td></tr>
            <tr><td><code>substring(a,b)</code></td><td>From index a (inclusive) to b (exclusive)</td><td><code>"hello".substring(1,3)</code> → <code>"el"</code></td></tr>
            <tr><td><code>contains(s)</code></td><td>True if contains CharSequence</td><td><code>"hello".contains("ell")</code> → <code>true</code></td></tr>
            <tr><td><code>startsWith(s)</code></td><td>True if starts with prefix</td><td><code>"hello".startsWith("he")</code> → <code>true</code></td></tr>
            <tr><td><code>endsWith(s)</code></td><td>True if ends with suffix</td><td><code>"hello".endsWith("lo")</code> → <code>true</code></td></tr>
            <tr><td><code>replace(a,b)</code></td><td>Replace literal a with b</td><td><code>"aabaa".replace("a","x")</code> → <code>"xxbxx"</code></td></tr>
            <tr><td><code>replaceAll(regex,b)</code></td><td>Replace all regex matches</td><td><code>"a1b2".replaceAll("[0-9]","")</code> → <code>"ab"</code></td></tr>
            <tr><td><code>split(regex)</code></td><td>Split into array</td><td><code>"a,b,c".split(",")</code> → <code>["a","b","c"]</code></td></tr>
            <tr><td><code>trim()</code></td><td>Remove leading/trailing ASCII whitespace</td><td><code>" hi ".trim()</code> → <code>"hi"</code></td></tr>
            <tr><td><code>strip()</code></td><td>Remove leading/trailing Unicode whitespace (Java 11)</td><td><code>" hi ".strip()</code> → <code>"hi"</code></td></tr>
            <tr><td><code>stripLeading()</code></td><td>Remove leading whitespace (Java 11)</td><td><code>" hi ".stripLeading()</code> → <code>"hi "</code></td></tr>
            <tr><td><code>stripTrailing()</code></td><td>Remove trailing whitespace (Java 11)</td><td><code>" hi ".stripTrailing()</code> → <code>" hi"</code></td></tr>
            <tr><td><code>toUpperCase()</code></td><td>All chars uppercase</td><td><code>"hello".toUpperCase()</code> → <code>"HELLO"</code></td></tr>
            <tr><td><code>toLowerCase()</code></td><td>All chars lowercase</td><td><code>"HI".toLowerCase()</code> → <code>"hi"</code></td></tr>
            <tr><td><code>isEmpty()</code></td><td>True if length() == 0</td><td><code>"".isEmpty()</code> → <code>true</code></td></tr>
            <tr><td><code>isBlank()</code></td><td>True if empty or only whitespace (Java 11)</td><td><code>"  ".isBlank()</code> → <code>true</code></td></tr>
            <tr><td><code>String.valueOf(x)</code></td><td>Convert any type to String</td><td><code>String.valueOf(42)</code> → <code>"42"</code></td></tr>
            <tr><td><code>String.format(fmt,...)</code></td><td>Printf-style formatting</td><td><code>String.format("%s=%d","x",5)</code> → <code>"x=5"</code></td></tr>
            <tr><td><code>String.join(del,parts)</code></td><td>Join with delimiter</td><td><code>String.join("-","a","b")</code> → <code>"a-b"</code></td></tr>
            <tr><td><code>concat(s)</code></td><td>Concatenate (like +)</td><td><code>"a".concat("b")</code> → <code>"ab"</code></td></tr>
            <tr><td><code>chars()</code></td><td>IntStream of char values (Java 9)</td><td><code>"ab".chars().forEach(...)</code></td></tr>
            <tr><td><code>repeat(n)</code></td><td>Repeat string n times (Java 11)</td><td><code>"ab".repeat(3)</code> → <code>"ababab"</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>String vs StringBuilder vs StringBuffer</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Feature</th><th>String</th><th>StringBuilder</th><th>StringBuffer</th></tr></thead>
          <tbody>
            <tr><td>Mutability</td><td>Immutable</td><td>Mutable</td><td>Mutable</td></tr>
            <tr><td>Thread-safe</td><td>Yes (immutable)</td><td>No</td><td>Yes (synchronized)</td></tr>
            <tr><td>Performance</td><td>Slow for concat loops</td><td>Fastest</td><td>Slower (lock overhead)</td></tr>
            <tr><td>Use case</td><td>Fixed/read-only text</td><td>Single-threaded building</td><td>Multi-threaded building</td></tr>
            <tr><td>Storage</td><td>String Pool / Heap</td><td>Heap</td><td>Heap</td></tr>
          </tbody>
        </table>
      </div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="cm">// ✗ BAD: creates thousands of intermediate String objects</span>
<span className="tp">String</span> result = <span className="st">""</span>;
<span className="kw">for</span> (<span className="kw">int</span> i = <span className="nm">0</span>; i &lt; <span className="nm">10000</span>; i++) result += i;
{'\n'}
<span className="cm">// ✓ GOOD: StringBuilder appends in place</span>
<span className="tp">StringBuilder</span> sb = <span className="kw">new</span> <span className="tp">StringBuilder</span>();
<span className="kw">for</span> (<span className="kw">int</span> i = <span className="nm">0</span>; i &lt; <span className="nm">10000</span>; i++) sb.<span className="fn">append</span>(i);
<span className="tp">String</span> result = sb.<span className="fn">toString</span>();
{'\n'}
<span className="cm">// Note: "a" + "b" + "c" is fine — compiler optimises to StringBuilder</span>
<span className="cm">// The loop case defeats the optimisation because + is in a loop body</span>
        </pre>
      </div>

      <div className="subsection-header"><h3>Text Blocks (Java 15+)</h3></div>
      <div className="code-block">
        <span className="lang-badge">JAVA</span>
        <pre>
<span className="cm">// Old way — ugly escaping</span>
<span className="tp">String</span> json = <span className="st">{'"{\\"name\\": \\"Alice\\", \\"age\\": 30}"'}</span>;
{'\n'}
<span className="cm">// Text Block — triple quotes, preserves indentation</span>
<span className="tp">String</span> json = <span className="st">{`"""
        {
            "name": "Alice",
            "age": 30
        }
        """`}</span>;
{'\n'}
<span className="tp">String</span> html = <span className="st">{`"""
        <html>
            <body><p>Hello</p></body>
        </html>
        """`}</span>;
<span className="cm">// Trailing """ sets the common indentation level</span>
<span className="cm">// \\ and \\n still work inside text blocks</span>
        </pre>
      </div>
    </>
  );
}
