function Code({ children }) {
  return (
    <div className="code-block">
      <span className="lang-badge">JAVA</span>
      <pre>{children}</pre>
    </div>
  );
}

export default function Part5() {
  return (
    <>
      {/* 5.1 */}
      <div id="s5-1" data-topic-boundary="true" />
      <div className="card">
        <p>
          A <strong>lambda expression</strong> is an anonymous function — it has parameters, a body, and a return
          type, but no name. It provides a concise way to implement a functional interface (an interface with a
          single abstract method).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Syntax</div>
          <code>(parameters) -&gt; expression</code> &nbsp;or&nbsp;{' '}
          <code>(parameters) -&gt; {'{ statements; }'}</code>
        </div>
      </div>

      <div className="subsection-header"><h3>Lambda Syntax Variants</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Variant</th><th>Syntax</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><strong>0 parameters</strong></td><td><code>() -&gt; expression</code></td><td><code>() -&gt; System.out.println("Hello")</code></td></tr>
            <tr><td><strong>1 parameter (no parens)</strong></td><td><code>x -&gt; expression</code></td><td><code>x -&gt; x * x</code></td></tr>
            <tr><td><strong>1 parameter (with parens)</strong></td><td><code>(x) -&gt; expression</code></td><td><code>(s) -&gt; s.length()</code></td></tr>
            <tr><td><strong>2 parameters</strong></td><td><code>(a, b) -&gt; expression</code></td><td><code>(a, b) -&gt; a + b</code></td></tr>
            <tr><td><strong>Multi-line body</strong></td><td><code>(params) -&gt; {'{ ... }'}</code></td><td><code>(x, y) -&gt; {'{ int r = x + y; return r; }'}</code></td></tr>
            <tr><td><strong>Explicit types</strong></td><td><code>(Type a, Type b) -&gt; expr</code></td><td><code>(int x, int y) -&gt; x + y</code></td></tr>
            <tr><td><strong>Returning value</strong></td><td><code>(params) -&gt; value</code></td><td><code>(s) -&gt; s.toUpperCase()</code></td></tr>
          </tbody>
        </table>
      </div>

      <Code>{
`// Runnable — 0 params
Runnable r = () -> System.out.println("run");

// Comparator — 2 params, expression body
Comparator<String> cmp = (a, b) -> a.compareTo(b);

// Multi-line body
Comparator<Integer> cmp2 = (x, y) -> {
    if (x == y) return 0;
    return x < y ? -1 : 1;
};`
      }</Code>

      <div className="subsection-header"><h3>Key Concepts</h3></div>
      <div className="two-col">
        <div className="card">
          <p><strong>Effectively Final</strong></p>
          <p>
            A lambda can capture local variables from the enclosing scope, but those variables must be{' '}
            <em>effectively final</em> — never reassigned after first assignment. Instance and static fields are
            NOT subject to this restriction.
          </p>
          <Code>{
`int limit = 10;          // effectively final
Predicate<Integer> p = x -> x < limit; // OK
// limit = 20;           // would break capture`
          }</Code>
        </div>
        <div className="card">
          <p><strong>Target Type</strong></p>
          <p>
            The compiler infers the functional interface type from context. The same lambda body can satisfy
            different interfaces if the method signatures match.
          </p>
          <Code>{
`Runnable   r = () -> {};   // Runnable
Callable<Void> c = () -> null; // Callable
// Type inferred from assignment context`
          }</Code>
        </div>
      </div>

      <div className="subsection-header"><h3>Lambda vs Anonymous Class</h3></div>
      <div className="compare">
        <div className="compare-side bad">
          <div className="compare-label">✗ Anonymous Class (verbose)</div>
          <Code>{
`Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("hello");
    }
};

Comparator<String> c =
    new Comparator<String>() {
        public int compare(String a,
                           String b){
            return a.compareTo(b);
        }
    };`
          }</Code>
        </div>
        <div className="compare-side good">
          <div className="compare-label">✓ Lambda (concise)</div>
          <Code>{
`Runnable r =
    () -> System.out.println("hello");




Comparator<String> c =
    (a, b) -> a.compareTo(b);`
          }</Code>
        </div>
      </div>
      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Key Differences</div>
        <ul>
          <li>Lambda does <strong>not</strong> introduce a new scope for <code>this</code> — <code>this</code>{' '}
            refers to the enclosing class, unlike anonymous classes.</li>
          <li>Anonymous classes can have state (fields); lambdas cannot.</li>
          <li>Anonymous classes can implement multi-method interfaces; lambdas can only target{' '}
            <strong>functional interfaces</strong> (1 abstract method).</li>
        </ul>
      </div>

      {/* 5.2 */}
      <div id="s5-2" data-topic-boundary="true" />
      <div className="callout callout-note">
        <div className="callout-title">📝 What is a Functional Interface?</div>
        <p>
          An interface with <strong>exactly one abstract method</strong> (SAM). May have default/static methods.
          Annotated with <code>@FunctionalInterface</code> (optional but recommended). Enables lambda expressions
          and method references as implementations.
        </p>
      </div>

      <div className="subsection-header"><h3>Predicate&lt;T&gt;</h3></div>
      <div className="card">
        <p><strong>Signature:</strong> <code>@FunctionalInterface public interface Predicate&lt;T&gt;</code></p>
        <p><strong>Abstract method:</strong> <code>boolean test(T t)</code> — evaluates this predicate on the given
          argument.</p>
        <p><strong>Default methods:</strong> <code>and(Predicate&lt;? super T&gt;)</code>,{' '}
          <code>or(Predicate&lt;? super T&gt;)</code>, <code>negate()</code></p>
        <p><strong>Static methods:</strong> <code>not(Predicate&lt;? super T&gt;)</code>{' '}
          <span className="pill">Java 11</span>, <code>isEqual(Object targetRef)</code></p>
        <Code>{
`Predicate<String> isEmpty  = String::isEmpty;
Predicate<String> notEmpty = Predicate.not(String::isEmpty);
Predicate<Integer> pos   = n -> n > 0;
Predicate<Integer> even  = n -> n % 2 == 0;
Predicate<Integer> posEven = pos.and(even);   // composed
Predicate<Integer> either  = pos.or(even);
Predicate<Integer> negPos  = pos.negate();
boolean b = Predicate.isEqual("hello").test("hello"); // true`
        }</Code>
      </div>

      <div className="subsection-header"><h3>Function&lt;T, R&gt;</h3></div>
      <div className="card">
        <p><strong>Signature:</strong> <code>@FunctionalInterface public interface Function&lt;T, R&gt;</code></p>
        <p><strong>Abstract method:</strong> <code>R apply(T t)</code> — applies this function to the argument.</p>
        <p><strong>Default methods:</strong> <code>andThen(Function&lt;? super R,? extends V&gt;)</code>,{' '}
          <code>compose(Function&lt;? super V,? extends T&gt;)</code></p>
        <p><strong>Static methods:</strong> <code>identity()</code> — returns a function that always returns its
          input.</p>
        <Code>{
`Function<String, Integer> len    = String::length;
Function<Integer, String> toStr  = Object::toString;
Function<String, String> upper  = String::toUpperCase;

// andThen: apply len, then toStr   f.andThen(g) = g(f(x))
Function<String, String> lenStr = len.andThen(toStr);
// compose: apply upper first, then len   f.compose(g) = f(g(x))
Function<String, Integer> upperLen = len.compose(upper);
Function<String, String> id = Function.identity();`
        }</Code>
      </div>

      <div className="subsection-header"><h3>Consumer&lt;T&gt;</h3></div>
      <div className="card">
        <p><strong>Signature:</strong> <code>@FunctionalInterface public interface Consumer&lt;T&gt;</code></p>
        <p><strong>Abstract method:</strong> <code>void accept(T t)</code> — performs the operation on the
          argument, returns nothing.</p>
        <p><strong>Default methods:</strong> <code>andThen(Consumer&lt;? super T&gt;)</code> — returns a composed
          Consumer that performs <em>this</em> then the given Consumer.</p>
        <Code>{
`Consumer<String> print  = System.out::println;
Consumer<String> log    = s -> System.err.println("LOG: " + s);
Consumer<String> both   = print.andThen(log); // prints, then logs
both.accept("hello");`
        }</Code>
      </div>

      <div className="subsection-header"><h3>Supplier&lt;T&gt;</h3></div>
      <div className="card">
        <p><strong>Signature:</strong> <code>@FunctionalInterface public interface Supplier&lt;T&gt;</code></p>
        <p><strong>Abstract method:</strong> <code>T get()</code> — supplies a result of type T; no input, no
          default/static helper methods.</p>
        <Code>{
`Supplier<List<String>> listFactory = ArrayList::new;
Supplier<String> greeting = () -> "Hello, World!";
List<String> list = listFactory.get(); // new ArrayList`
        }</Code>
      </div>

      <div className="subsection-header"><h3>UnaryOperator&lt;T&gt; extends Function&lt;T,T&gt;</h3></div>
      <div className="card">
        <p><strong>Signature:</strong>{' '}
          <code>@FunctionalInterface public interface UnaryOperator&lt;T&gt; extends Function&lt;T,T&gt;</code></p>
        <p><strong>Abstract method:</strong> <code>T apply(T t)</code> — inherited from Function; operand and
          result are the same type.</p>
        <p><strong>Static methods:</strong> <code>identity()</code> — inherited from Function; returns a
          UnaryOperator returning its input.</p>
        <Code>{
`UnaryOperator<String> upper  = String::toUpperCase;
UnaryOperator<Integer> double_ = x -> x * 2;
List<String> names = Arrays.asList("alice", "bob");
names.replaceAll(upper); // ["ALICE", "BOB"]`
        }</Code>
      </div>

      <div className="subsection-header"><h3>BinaryOperator&lt;T&gt; extends BiFunction&lt;T,T,T&gt;</h3></div>
      <div className="card">
        <p><strong>Signature:</strong>{' '}
          <code>@FunctionalInterface public interface BinaryOperator&lt;T&gt; extends BiFunction&lt;T,T,T&gt;</code></p>
        <p><strong>Abstract method:</strong> <code>T apply(T t1, T t2)</code> — both operands and result are the
          same type.</p>
        <p><strong>Static methods:</strong> <code>maxBy(Comparator&lt;? super T&gt;)</code>,{' '}
          <code>minBy(Comparator&lt;? super T&gt;)</code></p>
        <Code>{
`BinaryOperator<Integer> add = (a, b) -> a + b;
BinaryOperator<String> longer =
    BinaryOperator.maxBy(Comparator.comparingInt(String::length));
String result = longer.apply("hi", "hello"); // "hello"`
        }</Code>
      </div>

      <div className="subsection-header"><h3>BiPredicate&lt;T,U&gt;</h3></div>
      <div className="card">
        <p><strong>Signature:</strong> <code>@FunctionalInterface public interface BiPredicate&lt;T,U&gt;</code></p>
        <p><strong>Abstract method:</strong> <code>boolean test(T t, U u)</code> — two-argument predicate.</p>
        <p><strong>Default methods:</strong> <code>and(BiPredicate)</code>, <code>or(BiPredicate)</code>,{' '}
          <code>negate()</code></p>
        <Code>{
`BiPredicate<String, Integer> longerThan = (s, n) -> s.length() > n;
boolean ok = longerThan.test("hello", 3); // true`
        }</Code>
      </div>

      <div className="subsection-header"><h3>BiFunction&lt;T,U,R&gt;</h3></div>
      <div className="card">
        <p><strong>Signature:</strong> <code>@FunctionalInterface public interface BiFunction&lt;T,U,R&gt;</code></p>
        <p><strong>Abstract method:</strong> <code>R apply(T t, U u)</code> — two arguments, one result type.</p>
        <p><strong>Default methods:</strong> <code>andThen(Function&lt;? super R,? extends V&gt;)</code></p>
        <Code>{
`BiFunction<String, String, String> concat = (a, b) -> a + b;
BiFunction<Integer, Integer, String> addStr =
    ((a, b) -> a + b).andThen(Object::toString); // sum then toString`
        }</Code>
      </div>

      <div className="subsection-header"><h3>BiConsumer&lt;T,U&gt;</h3></div>
      <div className="card">
        <p><strong>Signature:</strong> <code>@FunctionalInterface public interface BiConsumer&lt;T,U&gt;</code></p>
        <p><strong>Abstract method:</strong> <code>void accept(T t, U u)</code> — two-argument consumer, returns
          void.</p>
        <p><strong>Default methods:</strong> <code>andThen(BiConsumer&lt;? super T,? super U&gt;)</code></p>
        <Code>{
`BiConsumer<String, Integer> repeat =
    (s, n) -> System.out.println(s.repeat(n));
repeat.accept("ha", 3); // hahaha`
        }</Code>
      </div>

      <div className="subsection-header"><h3>Primitive Specializations</h3></div>
      <div className="callout callout-tip">
        <div className="callout-title">💡 Why Primitives?</div>
        <p>
          Avoids boxing/unboxing overhead. Use <code>IntPredicate</code> instead of{' '}
          <code>Predicate&lt;Integer&gt;</code> when working with primitives.
        </p>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Interface</th><th>Description</th><th>Return Type / Notes</th></tr></thead>
          <tbody>
            <tr><td><code>IntPredicate</code></td><td>Predicate for <code>int</code> — <code>boolean test(int)</code></td><td><code>boolean</code></td></tr>
            <tr><td><code>LongPredicate</code></td><td>Predicate for <code>long</code> — <code>boolean test(long)</code></td><td><code>boolean</code></td></tr>
            <tr><td><code>DoublePredicate</code></td><td>Predicate for <code>double</code> — <code>boolean test(double)</code></td><td><code>boolean</code></td></tr>
            <tr><td><code>IntFunction&lt;R&gt;</code></td><td>Takes <code>int</code>, returns R — <code>R apply(int)</code></td><td><code>R</code></td></tr>
            <tr><td><code>IntUnaryOperator</code></td><td>int -&gt; int — <code>int applyAsInt(int)</code></td><td><code>int</code></td></tr>
            <tr><td><code>IntBinaryOperator</code></td><td>(int,int) -&gt; int — <code>int applyAsInt(int,int)</code></td><td><code>int</code></td></tr>
            <tr><td><code>IntSupplier</code></td><td>Supplies an <code>int</code> — <code>int getAsInt()</code></td><td><code>int</code></td></tr>
            <tr><td><code>LongSupplier</code></td><td>Supplies a <code>long</code> — <code>long getAsLong()</code></td><td><code>long</code></td></tr>
            <tr><td><code>DoubleSupplier</code></td><td>Supplies a <code>double</code> — <code>double getAsDouble()</code></td><td><code>double</code></td></tr>
            <tr><td><code>IntConsumer</code></td><td>Consumes an <code>int</code> — <code>void accept(int)</code></td><td><code>void</code></td></tr>
            <tr><td><code>LongConsumer</code></td><td>Consumes a <code>long</code> — <code>void accept(long)</code></td><td><code>void</code></td></tr>
            <tr><td><code>DoubleConsumer</code></td><td>Consumes a <code>double</code> — <code>void accept(double)</code></td><td><code>void</code></td></tr>
            <tr><td><code>ToIntFunction&lt;T&gt;</code></td><td>T -&gt; int — <code>int applyAsInt(T)</code></td><td><code>int</code></td></tr>
            <tr><td><code>ToLongFunction&lt;T&gt;</code></td><td>T -&gt; long — <code>long applyAsLong(T)</code></td><td><code>long</code></td></tr>
            <tr><td><code>ToDoubleFunction&lt;T&gt;</code></td><td>T -&gt; double — <code>double applyAsDouble(T)</code></td><td><code>double</code></td></tr>
            <tr><td><code>ObjIntConsumer&lt;T&gt;</code></td><td>(T, int) -&gt; void — <code>void accept(T,int)</code></td><td><code>void</code></td></tr>
            <tr><td><code>ObjLongConsumer&lt;T&gt;</code></td><td>(T, long) -&gt; void — <code>void accept(T,long)</code></td><td><code>void</code></td></tr>
            <tr><td><code>ObjDoubleConsumer&lt;T&gt;</code></td><td>(T, double) -&gt; void — <code>void accept(T,double)</code></td><td><code>void</code></td></tr>
          </tbody>
        </table>
      </div>

      {/* 5.3 */}
      <div id="s5-3" data-topic-boundary="true" />
      <div className="card">
        <p>
          A <strong>method reference</strong> is a compact, readable alternative to a lambda expression when the
          lambda body simply calls an existing method. Uses the <code>::</code> operator.
        </p>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Type</th><th>Syntax</th><th>Lambda Equivalent</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><strong>Static method</strong></td><td><code>ClassName::staticMethod</code></td>
              <td><code>(args) -&gt; ClassName.staticMethod(args)</code></td>
              <td><code>Integer::parseInt</code> ≡ <code>s -&gt; Integer.parseInt(s)</code></td></tr>
            <tr><td><strong>Instance — particular object</strong></td><td><code>object::instanceMethod</code></td>
              <td><code>(args) -&gt; object.instanceMethod(args)</code></td>
              <td><code>System.out::println</code> ≡ <code>x -&gt; System.out.println(x)</code></td></tr>
            <tr><td><strong>Instance — arbitrary object of type</strong></td><td><code>ClassName::instanceMethod</code></td>
              <td><code>(obj, args) -&gt; obj.instanceMethod(args)</code></td>
              <td><code>String::toUpperCase</code> ≡ <code>s -&gt; s.toUpperCase()</code></td></tr>
            <tr><td><strong>Constructor</strong></td><td><code>ClassName::new</code></td>
              <td><code>(args) -&gt; new ClassName(args)</code></td>
              <td><code>ArrayList::new</code> ≡ <code>() -&gt; new ArrayList()</code></td></tr>
          </tbody>
        </table>
      </div>
      <Code>{
`// Static method reference
Function<String, Integer> parse = Integer::parseInt;

// Instance — particular (bound) object
String prefix = "Hello, ";
Function<String, String> greet = prefix::concat;

// Instance — arbitrary (unbound) object
Function<String, String> upper = String::toUpperCase;
Comparator<String> cmp = String::compareTo;

// Constructor reference
Supplier<ArrayList<String>> factory = ArrayList::new;
Function<Integer, int[]> arrFactory = int[]::new; // array constructor

// Use in stream
List<String> upper2 = List.of("a","b").stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());`
      }</Code>

      {/* 5.4 */}
      <div id="s5-4" data-topic-boundary="true" />
      <div className="card">
        <p>
          <code>java.util.Optional&lt;T&gt;</code> is a container object that may or may not hold a non-null value.
          It is designed to replace null checks and express "absence of a value" explicitly, avoiding{' '}
          <code>NullPointerException</code>.
        </p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ When to Use Optional</div>
          <ul>
            <li>Use as a <strong>return type</strong> from methods that might not find a result (e.g., repository
              lookups).</li>
            <li><strong>Do NOT</strong> use as a field type, method parameter, or in collections — high overhead
              and breaks serialization.</li>
          </ul>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Return Type / Notes</th></tr></thead>
          <tbody>
            <tr><td><code>Optional.of(T value)</code></td><td>Creates Optional with non-null value; throws <code>NullPointerException</code> if null</td><td><code>Optional&lt;T&gt;</code></td></tr>
            <tr><td><code>Optional.ofNullable(T value)</code></td><td>Creates Optional; empty if value is null, present otherwise</td><td><code>Optional&lt;T&gt;</code></td></tr>
            <tr><td><code>Optional.empty()</code></td><td>Returns an empty Optional</td><td><code>Optional&lt;T&gt;</code></td></tr>
            <tr><td><code>get()</code></td><td>Returns the value if present; throws <code>NoSuchElementException</code> if empty</td><td><code>T</code> — prefer <code>orElse</code> family</td></tr>
            <tr><td><code>isPresent()</code></td><td>Returns true if a value is present</td><td><code>boolean</code></td></tr>
            <tr><td><code>isEmpty()</code></td><td>Returns true if no value is present <span className="pill">Java 11</span></td><td><code>boolean</code></td></tr>
            <tr><td><code>ifPresent(Consumer)</code></td><td>Executes the Consumer if value present; no-op if empty</td><td><code>void</code></td></tr>
            <tr><td><code>ifPresentOrElse(Consumer, Runnable)</code></td><td>Executes Consumer if present, Runnable if empty <span className="pill">Java 9</span></td><td><code>void</code></td></tr>
            <tr><td><code>orElse(T other)</code></td><td>Returns value if present, else returns <code>other</code>; <code>other</code> is always evaluated</td><td><code>T</code></td></tr>
            <tr><td><code>orElseGet(Supplier)</code></td><td>Returns value if present, else calls Supplier; lazy — Supplier called only when empty</td><td><code>T</code></td></tr>
            <tr><td><code>orElseThrow()</code></td><td>Returns value or throws <code>NoSuchElementException</code> <span className="pill">Java 10</span></td><td><code>T</code></td></tr>
            <tr><td><code>orElseThrow(Supplier)</code></td><td>Returns value or throws the exception from Supplier</td><td><code>T</code></td></tr>
            <tr><td><code>filter(Predicate)</code></td><td>If present and matches predicate, returns same Optional; otherwise empty</td><td><code>Optional&lt;T&gt;</code></td></tr>
            <tr><td><code>map(Function)</code></td><td>If present, applies function and wraps result; returns empty if result is null</td><td><code>Optional&lt;U&gt;</code></td></tr>
            <tr><td><code>flatMap(Function)</code></td><td>Like map, but function must return Optional; prevents Optional&lt;Optional&lt;T&gt;&gt;</td><td><code>Optional&lt;U&gt;</code></td></tr>
            <tr><td><code>or(Supplier&lt;Optional&gt;)</code></td><td>If present returns self; else returns Optional supplied by Supplier <span className="pill">Java 9</span></td><td><code>Optional&lt;T&gt;</code></td></tr>
            <tr><td><code>stream()</code></td><td>Returns Stream of one element if present, else empty Stream <span className="pill">Java 9</span></td><td><code>Stream&lt;T&gt;</code></td></tr>
            <tr><td><code>equals(Object)</code></td><td>Compares two Optionals by their values using <code>equals()</code></td><td><code>boolean</code></td></tr>
            <tr><td><code>hashCode()</code></td><td>Returns hashCode of value if present, 0 if empty</td><td><code>int</code></td></tr>
            <tr><td><code>toString()</code></td><td>Returns <code>"Optional[value]"</code> or <code>"Optional.empty"</code></td><td><code>String</code></td></tr>
          </tbody>
        </table>
      </div>

      <Code>{
`Optional<String> opt = Optional.ofNullable(getName());

// Chaining
String upper = opt
    .filter(s -> s.length() > 2)
    .map(String::toUpperCase)
    .orElse("DEFAULT");

// ifPresentOrElse (Java 9)
opt.ifPresentOrElse(
    s -> System.out.println("Found: " + s),
    () -> System.out.println("Not found")
);

// Chaining Optional via or() (Java 9)
Optional<String> result = opt.or(() -> Optional.of("fallback"));

// Converting to stream (Java 9) — useful in flatMap
List<String> items = List.of("a", null, "b").stream()
    .map(Optional::ofNullable)
    .flatMap(Optional::stream)
    .collect(Collectors.toList()); // ["a", "b"]`
      }</Code>

      {/* 5.5 */}
      <div id="s5-5" data-topic-boundary="true" />
      <div className="card">
        <p>
          A <strong>Stream</strong> is a sequence of elements supporting sequential and parallel aggregate
          operations. Key properties:
        </p>
        <ul>
          <li><strong>Not a data structure</strong> — doesn't store data; processes from a source (collection,
            array, I/O channel).</li>
          <li><strong>Lazy evaluation</strong> — intermediate operations are not executed until a terminal
            operation is invoked.</li>
          <li><strong>Consumable once</strong> — after a terminal operation, the stream is closed and cannot be
            reused.</li>
          <li><strong>Functional</strong> — operations produce new streams; the source is not modified.</li>
        </ul>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Stream Pipeline</div>
          <pre className="diagram">{
`Source  ──▶  Intermediate Ops (lazy, return Stream)  ──▶  Terminal Op (eager, triggers execution)
  │                │ filter()  map()  flatMap()                │ collect()  forEach()  reduce()
  │                │ distinct()  sorted()  limit()             │ count()  findFirst()  anyMatch()
  ▼                ──────────────────────────────────────────▶
Collection / Array / Generator / I/O`
          }</pre>
        </div>
      </div>

      <div className="subsection-header"><h3>Stream Creation Methods</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>collection.stream()</code></td><td>Sequential stream from any Collection</td><td><code>list.stream()</code></td></tr>
            <tr><td><code>collection.parallelStream()</code></td><td>Parallel stream from any Collection</td><td><code>list.parallelStream()</code></td></tr>
            <tr><td><code>Arrays.stream(array)</code></td><td>Stream from entire array</td><td><code>Arrays.stream(arr)</code></td></tr>
            <tr><td><code>Arrays.stream(array, start, end)</code></td><td>Stream from array sub-range [start, end)</td><td><code>Arrays.stream(arr, 1, 4)</code></td></tr>
            <tr><td><code>Stream.of(elements)</code></td><td>Stream of specified elements (varargs)</td><td><code>Stream.of("a","b","c")</code></td></tr>
            <tr><td><code>Stream.empty()</code></td><td>Empty sequential stream</td><td><code>Stream.&lt;String&gt;empty()</code></td></tr>
            <tr><td><code>Stream.generate(Supplier)</code></td><td>Infinite stream; each element from Supplier</td><td><code>Stream.generate(Math::random)</code></td></tr>
            <tr><td><code>Stream.iterate(seed, UnaryOperator)</code></td><td>Infinite ordered stream; each element from applying function to previous</td><td><code>Stream.iterate(0, n -&gt; n+1)</code></td></tr>
            <tr><td><code>Stream.iterate(seed, Predicate, UnaryOp)</code></td><td>Finite iterate; stops when predicate is false <span className="pill">Java 9</span></td><td><code>Stream.iterate(0, n-&gt;n&lt;10, n-&gt;n+1)</code></td></tr>
            <tr><td><code>Stream.concat(s1, s2)</code></td><td>Concatenates two streams lazily</td><td><code>Stream.concat(s1, s2)</code></td></tr>
            <tr><td><code>Stream.builder()</code></td><td>Returns a mutable builder; call <code>add()</code> then <code>build()</code></td><td><code>Stream.builder().add(1).build()</code></td></tr>
            <tr><td><code>IntStream.range(start, end)</code></td><td>IntStream [start, end), exclusive end</td><td><code>IntStream.range(0, 10)</code></td></tr>
            <tr><td><code>IntStream.rangeClosed(start, end)</code></td><td>IntStream [start, end], inclusive end</td><td><code>IntStream.rangeClosed(1, 10)</code></td></tr>
            <tr><td><code>Files.lines(path)</code></td><td>Lazy stream of lines from a file; must close stream</td><td><code>Files.lines(Path.of("f.txt"))</code></td></tr>
            <tr><td><code>BufferedReader.lines()</code></td><td>Stream of lines from a BufferedReader</td><td><code>reader.lines()</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Intermediate Operations</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Operation</th><th>Description</th><th>Stateful?</th></tr></thead>
          <tbody>
            <tr><td><code>filter(Predicate)</code></td><td>Keeps elements matching the predicate</td><td>No — stateless</td></tr>
            <tr><td><code>map(Function)</code></td><td>Transforms each element using the function</td><td>No — stateless</td></tr>
            <tr><td><code>mapToInt(ToIntFunction)</code></td><td>Maps to IntStream (avoids boxing)</td><td>No — stateless</td></tr>
            <tr><td><code>mapToLong(ToLongFunction)</code></td><td>Maps to LongStream</td><td>No — stateless</td></tr>
            <tr><td><code>mapToDouble(ToDoubleFunction)</code></td><td>Maps to DoubleStream</td><td>No — stateless</td></tr>
            <tr><td><code>flatMap(Function)</code></td><td>Maps each element to a Stream, then flattens all into one stream</td><td>No — stateless</td></tr>
            <tr><td><code>flatMapToInt(Function)</code></td><td>flatMap to IntStream</td><td>No — stateless</td></tr>
            <tr><td><code>flatMapToLong(Function)</code></td><td>flatMap to LongStream</td><td>No — stateless</td></tr>
            <tr><td><code>flatMapToDouble(Function)</code></td><td>flatMap to DoubleStream</td><td>No — stateless</td></tr>
            <tr><td><code>distinct()</code></td><td>Removes duplicates (uses <code>equals()</code>)</td><td><strong>Yes</strong> — must see all elements</td></tr>
            <tr><td><code>sorted()</code></td><td>Natural order sort; full buffering required</td><td><strong>Yes</strong> — full buffering</td></tr>
            <tr><td><code>sorted(Comparator)</code></td><td>Sort by given Comparator; full buffering</td><td><strong>Yes</strong> — full buffering</td></tr>
            <tr><td><code>peek(Consumer)</code></td><td>Executes Consumer on each element, returns same stream; useful for debugging</td><td>No — stateless</td></tr>
            <tr><td><code>limit(long)</code></td><td>Truncates stream to at most n elements</td><td><strong>Yes</strong> — short-circuit</td></tr>
            <tr><td><code>skip(long)</code></td><td>Discards first n elements</td><td><strong>Yes</strong> — stateful</td></tr>
            <tr><td><code>takeWhile(Predicate)</code></td><td>Takes elements while predicate true; stops on first false <span className="pill">Java 9</span></td><td>No (ordered)</td></tr>
            <tr><td><code>dropWhile(Predicate)</code></td><td>Drops elements while predicate true; takes rest <span className="pill">Java 9</span></td><td>No (ordered)</td></tr>
            <tr><td><code>unordered()</code></td><td>Hint to drop encounter order; may improve parallel performance</td><td>No — hint only</td></tr>
            <tr><td><code>sequential()</code></td><td>Returns an equivalent sequential stream</td><td>No — mode switch</td></tr>
            <tr><td><code>parallel()</code></td><td>Returns an equivalent parallel stream</td><td>No — mode switch</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Terminal Operations</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Operation</th><th>Description</th><th>Returns</th></tr></thead>
          <tbody>
            <tr><td><code>forEach(Consumer)</code></td><td>Performs action for each element; no ordering guarantee in parallel</td><td><code>void</code></td></tr>
            <tr><td><code>forEachOrdered(Consumer)</code></td><td>Like forEach but respects encounter order even in parallel</td><td><code>void</code></td></tr>
            <tr><td><code>count()</code></td><td>Returns number of elements in the stream</td><td><code>long</code></td></tr>
            <tr><td><code>collect(Collector)</code></td><td>Mutable reduction; accumulates elements into a result container</td><td><code>R</code> (e.g., List, Map, String)</td></tr>
            <tr><td><code>toArray()</code></td><td>Collects to <code>Object[]</code></td><td><code>Object[]</code></td></tr>
            <tr><td><code>toArray(IntFunction)</code></td><td>Collects to typed array: <code>toArray(String[]::new)</code></td><td><code>A[]</code></td></tr>
            <tr><td><code>reduce(BinaryOperator)</code></td><td>Reduces elements using associative function; returns Optional (empty stream → empty)</td><td><code>Optional&lt;T&gt;</code></td></tr>
            <tr><td><code>reduce(identity, BinaryOperator)</code></td><td>Reduces with identity seed; identity returned for empty stream</td><td><code>T</code></td></tr>
            <tr><td><code>reduce(identity, BiFunction, BinaryOperator)</code></td><td>Parallel-capable reduce with mapping; combiner merges partial results</td><td><code>U</code></td></tr>
            <tr><td><code>min(Comparator)</code></td><td>Returns minimum element per comparator; empty stream → empty Optional</td><td><code>Optional&lt;T&gt;</code></td></tr>
            <tr><td><code>max(Comparator)</code></td><td>Returns maximum element per comparator</td><td><code>Optional&lt;T&gt;</code></td></tr>
            <tr><td><code>findFirst()</code></td><td>Returns first element; respects encounter order; short-circuits</td><td><code>Optional&lt;T&gt;</code></td></tr>
            <tr><td><code>findAny()</code></td><td>Returns any element; may be non-deterministic in parallel</td><td><code>Optional&lt;T&gt;</code></td></tr>
            <tr><td><code>anyMatch(Predicate)</code></td><td>True if any element matches; short-circuits on first match</td><td><code>boolean</code></td></tr>
            <tr><td><code>allMatch(Predicate)</code></td><td>True if ALL elements match; short-circuits on first non-match</td><td><code>boolean</code></td></tr>
            <tr><td><code>noneMatch(Predicate)</code></td><td>True if NO element matches; short-circuits on first match</td><td><code>boolean</code></td></tr>
            <tr><td><code>sum()</code></td><td>Sum of all elements — <strong>IntStream / LongStream / DoubleStream only</strong></td><td><code>int</code> / <code>long</code> / <code>double</code></td></tr>
            <tr><td><code>average()</code></td><td>Arithmetic mean — <strong>IntStream / LongStream / DoubleStream only</strong></td><td><code>OptionalDouble</code></td></tr>
            <tr><td><code>summaryStatistics()</code></td><td>Returns count, sum, min, max, average in one pass — <strong>primitive streams only</strong></td><td><code>IntSummaryStatistics</code> etc.</td></tr>
          </tbody>
        </table>
      </div>

      <Code>{
`List<String> words = List.of("banana", "apple", "cherry", "avocado");

// filter + map + collect
List<String> aWords = words.stream()
    .filter(s -> s.startsWith("a"))
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList()); // [APPLE, AVOCADO]

// reduce
int totalLen = words.stream()
    .mapToInt(String::length)
    .reduce(0, Integer::sum); // 25

// flatMap — flatten list of lists
List<List<Integer>> nested = List.of(List.of(1,2), List.of(3,4));
List<Integer> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList()); // [1,2,3,4]

// takeWhile / dropWhile (Java 9)
List<Integer> nums = List.of(1,2,3,4,5);
List<Integer> taken  = nums.stream().takeWhile(n -> n < 4).collect(Collectors.toList()); // [1,2,3]
List<Integer> dropped = nums.stream().dropWhile(n -> n < 4).collect(Collectors.toList()); // [4,5]`
      }</Code>

      {/* 5.6 */}
      <div id="s5-6" data-topic-boundary="true" />
      <div className="card">
        <p>
          <code>java.util.stream.Collectors</code> provides factory methods for common <code>Collector</code>{' '}
          implementations. Pass the result to <code>stream.collect()</code>.
        </p>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Collector</th><th>Description</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>toList()</code></td><td>Collects into a mutable <code>List</code> (order preserved)</td><td><code>.collect(Collectors.toList())</code></td></tr>
            <tr><td><code>toUnmodifiableList()</code></td><td>Collects into an unmodifiable <code>List</code> <span className="pill">Java 10</span></td><td><code>.collect(Collectors.toUnmodifiableList())</code></td></tr>
            <tr><td><code>toSet()</code></td><td>Collects into a mutable <code>Set</code> (no duplicates, no order)</td><td><code>.collect(Collectors.toSet())</code></td></tr>
            <tr><td><code>toUnmodifiableSet()</code></td><td>Collects into an unmodifiable <code>Set</code> <span className="pill">Java 10</span></td><td><code>.collect(Collectors.toUnmodifiableSet())</code></td></tr>
            <tr><td><code>toCollection(Supplier)</code></td><td>Collects into a custom collection supplied by factory</td><td><code>.collect(Collectors.toCollection(TreeSet::new))</code></td></tr>
            <tr><td><code>joining()</code></td><td>Concatenates CharSequence stream elements</td><td><code>.collect(Collectors.joining())</code> — <code>"abcdef"</code></td></tr>
            <tr><td><code>joining(delimiter)</code></td><td>Joins with delimiter between elements</td><td><code>.collect(Collectors.joining(", "))</code></td></tr>
            <tr><td><code>joining(delimiter, prefix, suffix)</code></td><td>Joins with delimiter, prefix, and suffix</td><td><code>.collect(Collectors.joining(", ","[","]"))</code></td></tr>
            <tr><td><code>counting()</code></td><td>Counts elements; equivalent to <code>stream.count()</code></td><td><code>.collect(Collectors.counting())</code></td></tr>
            <tr><td><code>summingInt(ToIntFunction)</code></td><td>Sums integer-valued function applied to elements</td><td><code>.collect(Collectors.summingInt(String::length))</code></td></tr>
            <tr><td><code>summingLong(ToLongFunction)</code></td><td>Sums long-valued function</td><td><code>.collect(Collectors.summingLong(Item::getCount))</code></td></tr>
            <tr><td><code>summingDouble(ToDoubleFunction)</code></td><td>Sums double-valued function</td><td><code>.collect(Collectors.summingDouble(Item::getPrice))</code></td></tr>
            <tr><td><code>averagingInt(ToIntFunction)</code></td><td>Returns average as Double of int-mapped elements</td><td><code>.collect(Collectors.averagingInt(String::length))</code></td></tr>
            <tr><td><code>averagingLong(ToLongFunction)</code></td><td>Average of long-mapped elements</td><td><code>.collect(Collectors.averagingLong(...))</code></td></tr>
            <tr><td><code>averagingDouble(ToDoubleFunction)</code></td><td>Average of double-mapped elements</td><td><code>.collect(Collectors.averagingDouble(...))</code></td></tr>
            <tr><td><code>summarizingInt(ToIntFunction)</code></td><td>Returns <code>IntSummaryStatistics</code> (count, sum, min, max, avg)</td><td><code>.collect(Collectors.summarizingInt(String::length))</code></td></tr>
            <tr><td><code>summarizingLong</code> / <code>summarizingDouble</code></td><td>Analogous for long/double, return corresponding statistics</td><td><code>LongSummaryStatistics</code>, <code>DoubleSummaryStatistics</code></td></tr>
            <tr><td><code>minBy(Comparator)</code></td><td>Returns Optional minimum element</td><td><code>.collect(Collectors.minBy(Comparator.naturalOrder()))</code></td></tr>
            <tr><td><code>maxBy(Comparator)</code></td><td>Returns Optional maximum element</td><td><code>.collect(Collectors.maxBy(Comparator.naturalOrder()))</code></td></tr>
            <tr><td><code>groupingBy(Function)</code></td><td>Groups elements into <code>Map&lt;K, List&lt;V&gt;&gt;</code> by classifier function</td><td><code>.collect(Collectors.groupingBy(String::length))</code></td></tr>
            <tr><td><code>groupingBy(Function, Collector)</code></td><td>Groups with downstream Collector applied to each group</td><td><code>.collect(Collectors.groupingBy(String::length, Collectors.counting()))</code></td></tr>
            <tr><td><code>groupingBy(Function, Supplier, Collector)</code></td><td>Groups using a custom Map factory (e.g., <code>TreeMap::new</code>)</td><td><code>.collect(Collectors.groupingBy(f, TreeMap::new, Collectors.toList()))</code></td></tr>
            <tr><td><code>partitioningBy(Predicate)</code></td><td>Splits into <code>Map&lt;Boolean, List&gt;</code> — true/false groups</td><td><code>.collect(Collectors.partitioningBy(n-&gt;n%2==0))</code></td></tr>
            <tr><td><code>partitioningBy(Predicate, Collector)</code></td><td>Partitions with downstream Collector applied to each partition</td><td><code>.collect(Collectors.partitioningBy(p, Collectors.counting()))</code></td></tr>
            <tr><td><code>toMap(keyMapper, valueMapper)</code></td><td>Collects to <code>Map</code>; throws on duplicate keys</td><td><code>.collect(Collectors.toMap(s-&gt;s, String::length))</code></td></tr>
            <tr><td><code>toMap(keyMapper, valueMapper, mergeFunction)</code></td><td>Collects to Map; merge function handles duplicate keys</td><td><code>.collect(Collectors.toMap(k, v, (a,b)-&gt;a+b))</code></td></tr>
            <tr><td><code>toMap(keyMapper, valueMapper, mergeFn, Supplier)</code></td><td>Collects to Map with custom Map factory (e.g., <code>LinkedHashMap::new</code>)</td><td><code>.collect(Collectors.toMap(k,v,f,LinkedHashMap::new))</code></td></tr>
            <tr><td><code>toUnmodifiableMap(keyMapper, valueMapper)</code></td><td>Collects to unmodifiable Map <span className="pill">Java 10</span></td><td><code>.collect(Collectors.toUnmodifiableMap(...))</code></td></tr>
            <tr><td><code>mapping(Function, Collector)</code></td><td>Adapts a Collector by first applying a mapping function to each element</td><td><code>.collect(Collectors.groupingBy(dept, mapping(Employee::getName, toList())))</code></td></tr>
            <tr><td><code>flatMapping(Function, Collector)</code></td><td>Like mapping but function returns Stream; flattens before collecting <span className="pill">Java 9</span></td><td><code>.collect(Collectors.groupingBy(k, flatMapping(v-&gt;v.stream(),toList())))</code></td></tr>
            <tr><td><code>filtering(Predicate, Collector)</code></td><td>Filters elements before passing to downstream Collector <span className="pill">Java 9</span></td><td><code>.collect(Collectors.groupingBy(f, filtering(p, toList())))</code></td></tr>
            <tr><td><code>collectingAndThen(Collector, Function)</code></td><td>Wraps a Collector; applies finisher function to final result</td><td><code>.collect(Collectors.collectingAndThen(toList(), Collections::unmodifiableList))</code></td></tr>
            <tr><td><code>teeing(Collector, Collector, BiFunction)</code></td><td>Passes elements to two collectors; merges results with BiFunction <span className="pill">Java 12</span></td><td><code>.collect(Collectors.teeing(counting(), joining(","), List::of))</code></td></tr>
          </tbody>
        </table>
      </div>

      <Code>{
`List<String> words = List.of("apple","banana","cherry","avocado","blueberry");

// groupingBy with downstream counting
Map<Integer, Long> byLength = words.stream()
    .collect(Collectors.groupingBy(String::length, Collectors.counting()));

// partitioningBy
Map<Boolean, List<String>> partitioned = words.stream()
    .collect(Collectors.partitioningBy(s -> s.startsWith("a")));
// {true=[apple, avocado], false=[banana, cherry, blueberry]}

// joining with prefix/suffix
String joined = words.stream()
    .collect(Collectors.joining(", ", "[", "]"));
// "[apple, banana, cherry, avocado, blueberry]"

// collectingAndThen — unmodifiable list
List<String> immutable = words.stream()
    .collect(Collectors.collectingAndThen(
        Collectors.toList(), Collections::unmodifiableList));

// teeing (Java 12): count AND join simultaneously
String teeResult = words.stream().collect(Collectors.teeing(
    Collectors.counting(),
    Collectors.joining(","),
    (count, csv) -> count + " items: " + csv
));`
      }</Code>

      {/* 5.7 */}
      <div id="s5-7" data-topic-boundary="true" />

      <div className="subsection-header"><h3>Parallel Streams</h3></div>
      <div className="card">
        <p>
          A parallel stream splits its source into substreams, processes them concurrently using the{' '}
          <strong>ForkJoinPool.commonPool()</strong>, and combines the results. Created via{' '}
          <code>collection.parallelStream()</code> or <code>stream.parallel()</code>.
        </p>
        <div className="two-col">
          <div>
            <p><strong>Effective When:</strong></p>
            <ul>
              <li>Large datasets (&gt; few thousand elements)</li>
              <li>CPU-intensive stateless operations</li>
              <li>Data is easily splittable (ArrayList &gt; LinkedList)</li>
              <li>Operations are independent (no shared mutable state)</li>
              <li>Associative reduction operations (<code>reduce</code>, <code>collect</code>)</li>
            </ul>
          </div>
          <div>
            <p><strong>Avoid When:</strong></p>
            <ul>
              <li>Small datasets (thread overhead dominates)</li>
              <li>I/O-bound operations (threads block, no CPU gain)</li>
              <li>Stateful / order-dependent operations</li>
              <li>Operations with side-effects on shared mutable state</li>
              <li>LinkedList, I/O streams (poor splitability)</li>
            </ul>
          </div>
        </div>
      </div>

      <Code>{
`// Create parallel stream
long count = IntStream.rangeClosed(1, 1_000_000)
    .parallel()
    .filter(n -> n % 2 == 0)
    .count(); // 500000

// Convert back to sequential
Stream<String> seq = list.parallelStream().sequential();

// forEachOrdered preserves order in parallel
List.of(1,2,3,4,5).parallelStream()
    .forEachOrdered(System.out::println); // always 1,2,3,4,5

// Parallel reduce — must be associative
int sum = IntStream.rangeClosed(1, 100).parallel()
    .reduce(0, Integer::sum); // 5050`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Pitfall: Stateful Lambda in Parallel Stream</div>
        <Code>{
`List<Integer> results = new ArrayList<>(); // NOT thread-safe!
IntStream.rangeClosed(1, 1000).parallel()
    .forEach(results::add); // ✗ race condition, size unpredictable

// ✓ Use collect instead
List<Integer> safe = IntStream.rangeClosed(1, 1000).parallel()
    .boxed().collect(Collectors.toList());`
        }</Code>
      </div>

      <div className="subsection-header"><h3>Primitive Streams: IntStream, LongStream, DoubleStream</h3></div>
      <div className="card">
        <p>
          Primitive streams avoid autoboxing overhead. They have all the standard Stream methods plus
          numeric-specific operations.
        </p>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Return Type / Notes</th></tr></thead>
          <tbody>
            <tr><td><code>sum()</code></td><td>Returns the sum of elements; returns 0 for empty stream</td><td><code>int</code> / <code>long</code> / <code>double</code></td></tr>
            <tr><td><code>average()</code></td><td>Returns arithmetic mean; empty stream → empty</td><td><code>OptionalDouble</code></td></tr>
            <tr><td><code>min()</code></td><td>Returns minimum element</td><td><code>OptionalInt</code> / <code>OptionalLong</code> / <code>OptionalDouble</code></td></tr>
            <tr><td><code>max()</code></td><td>Returns maximum element</td><td><code>OptionalInt</code> / <code>OptionalLong</code> / <code>OptionalDouble</code></td></tr>
            <tr><td><code>summaryStatistics()</code></td><td>Returns all statistics (count, sum, min, max, average) in one pass</td><td><code>IntSummaryStatistics</code> etc.</td></tr>
            <tr><td><code>boxed()</code></td><td>Converts to <code>Stream&lt;Integer&gt;</code> / <code>Stream&lt;Long&gt;</code> / <code>Stream&lt;Double&gt;</code></td><td><code>Stream&lt;T&gt;</code></td></tr>
            <tr><td><code>asLongStream()</code></td><td>Widens <code>IntStream</code> to <code>LongStream</code></td><td><code>LongStream</code></td></tr>
            <tr><td><code>asDoubleStream()</code></td><td>Widens <code>IntStream</code> or <code>LongStream</code> to <code>DoubleStream</code></td><td><code>DoubleStream</code></td></tr>
            <tr><td><code>IntStream.range(start, end)</code></td><td>Half-open range [start, end) — exclusive end</td><td><code>IntStream</code></td></tr>
            <tr><td><code>IntStream.rangeClosed(start, end)</code></td><td>Closed range [start, end] — inclusive end</td><td><code>IntStream</code></td></tr>
            <tr><td><code>Random.ints(n)</code></td><td>Stream of n pseudorandom int values</td><td><code>IntStream</code></td></tr>
            <tr><td><code>Random.doubles(n)</code></td><td>Stream of n pseudorandom double values in [0.0, 1.0)</td><td><code>DoubleStream</code></td></tr>
            <tr><td><code>String.chars()</code></td><td>Returns IntStream of char values (UTF-16 code units) of the string</td><td><code>IntStream</code></td></tr>
          </tbody>
        </table>
      </div>

      <Code>{
`// IntStream.range — loop replacement
IntStream.range(0, 5).forEach(System.out::println); // 0 1 2 3 4

// summaryStatistics in one pass
int[] data = {3, 1, 4, 1, 5, 9, 2, 6};
IntSummaryStatistics stats = Arrays.stream(data).summaryStatistics();
// count=8, sum=31, min=1, max=9, avg=3.875

// average() returns OptionalDouble
double avg = IntStream.of(1,2,3,4).average().orElse(0.0); // 2.5

// boxed() — back to object stream
List<Integer> list = IntStream.rangeClosed(1, 5)
    .boxed().collect(Collectors.toList());

// String.chars() — character processing
long vowels = "Hello World".chars()
    .filter(c -> "aeiouAEIOU".indexOf(c) >= 0)
    .count(); // 3

// Random stream of numbers
int[] randoms = new Random().ints(5, 1, 100).toArray(); // 5 randoms in [1,100)`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 mapToInt / mapToObj</div>
        <p>
          Move between object and primitive streams: <code>stream.mapToInt(String::length)</code> → IntStream;{' '}
          <code>intStream.mapToObj(Integer::toString)</code> → Stream&lt;String&gt;. Use <code>boxed()</code> as
          shorthand for <code>mapToObj(Integer::valueOf)</code>.
        </p>
      </div>
    </>
  );
}
