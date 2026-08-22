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
      <h1 className="part-title">Part 5 — Generics</h1>

      {/* 5.1 */}
      <div className="section-header anchor" id="s51">
        <div className="section-badge">5.1</div>
        <h2>Why Generics?</h2>
      </div>
      <p>
        Before generics (Java 1.4 and earlier), collections stored everything as <code>Object</code>. This worked,
        but forced you to cast on every retrieval and pushed type errors to <em>runtime</em>. Generics, introduced in{' '}
        <strong>Java 5</strong>, move those errors to <em>compile time</em>.
      </p>
      <div className="compare">
        <div className="compare-side bad">
          <div className="compare-label">✗ Pre-Generics (Java 1.4)</div>
          <Code>{
`List names = new ArrayList();
names.add("Alice");
names.add("Bob");
names.add(42);          // compiles! ⚠️

for (Object o : names) {
    // Mandatory cast:
    String s = (String) o; // 💥 ClassCastException on 42
    System.out.println(s.toUpperCase());
}`
          }</Code>
        </div>
        <div className="compare-side good">
          <div className="compare-label">✓ With Generics (Java 5+)</div>
          <Code>{
`List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
// names.add(42); ← COMPILE ERROR ✓

for (String s : names) {
    // No cast needed:
    System.out.println(s.toUpperCase());
    // Always safe ✓
}`
          }</Code>
        </div>
      </div>
      <div className="card">
        <h3>Three Core Benefits of Generics</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Benefit</th><th>What It Means</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><strong>Compile-time type safety</strong></td>
                <td>Type mismatches caught by the compiler, not at runtime</td>
                <td><code>List&lt;String&gt;</code> rejects <code>add(42)</code></td></tr>
              <tr><td><strong>Elimination of casts</strong></td>
                <td>No explicit <code>(Type)</code> casting needed on retrieval</td>
                <td><code>String s = list.get(0)</code></td></tr>
              <tr><td><strong>Reusability</strong></td>
                <td>Write one algorithm/class that works for many types</td>
                <td><code>Comparable&lt;T&gt;</code>, <code>Optional&lt;T&gt;</code></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="callout callout-key">
        <div className="callout-title">🔑 Key Concept — Compile-time Feature Only</div>
        <p>
          <strong>Generics are a compile-time feature only.</strong> At runtime, all type parameters are{' '}
          <em>erased</em> — <code>List&lt;String&gt;</code> and <code>List&lt;Integer&gt;</code> are both just{' '}
          <code>List</code> in the JVM. This is called <strong>type erasure</strong> and is covered in depth in
          Section 5.6.
        </p>
      </div>

      {/* 5.2 */}
      <div className="section-header anchor" id="s52">
        <div className="section-badge">5.2</div>
        <h2>Generic Classes &amp; Interfaces</h2>
      </div>
      <p>
        A <strong>generic class</strong> is declared with a type parameter list in angle brackets after the class
        name. The type parameter acts as a placeholder that is filled in when the class is instantiated.
      </p>
      <Code>{
`public class Box<T> {          // T is the type parameter

    private T value;            // field of type T

    public Box(T value) {        // constructor
        this.value = value;
    }

    public T getValue() {       // getter returns T
        return value;
    }

    public void setValue(T value) {  // setter accepts T
        this.value = value;
    }
}

// Instantiation — diamond operator <> infers type
Box<String>  strBox  = new Box<>("Hello");
Box<Integer> intBox  = new Box<>(99);
Box<List<String>> nested = new Box<>(new ArrayList<>());

String s = strBox.getValue();   // no cast needed`
      }</Code>
      <div className="two-col">
        <div className="card">
          <h3>Multiple Type Parameters — Pair&lt;K, V&gt;</h3>
          <Code>{
`public class Pair<K, V> {
    private final K key;
    private final V value;

    public Pair(K key, V value) {
        this.key   = key;
        this.value = value;
    }

    public K getKey()   { return key; }
    public V getValue() { return value; }

    @Override
    public String toString() {
        return "(" + key + ", " + value + ")";
    }
}

// Usage
Pair<String, Integer> p =
    new Pair<>("age", 30);
System.out.println(p);  // (age, 30)`
          }</Code>
        </div>
        <div className="card">
          <h3>Generic Interfaces</h3>
          <Code>{
`// Built-in generic interfaces
public interface Comparable<T> {
    int compareTo(T other);
}

public interface Iterable<E> {
    Iterator<E> iterator();
}

// Implementing a generic interface
public class Temperature
    implements Comparable<Temperature> {

    private double celsius;

    @Override
    public int compareTo(Temperature other) {
        return Double.compare(
            this.celsius, other.celsius);
    }
}`
          }</Code>
        </div>
      </div>
      <div className="card">
        <h3>Type Parameter Naming Conventions</h3>
        <p>By convention, single uppercase letters are used for type parameters. The standard names recognized by the Java community:</p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Letter</th><th>Stands For</th><th>Typical Usage</th><th>Examples</th></tr></thead>
            <tbody>
              <tr><td><code>T</code></td><td>Type</td><td>General purpose, first type parameter</td>
                <td><code>Box&lt;T&gt;</code>, <code>Optional&lt;T&gt;</code></td></tr>
              <tr><td><code>E</code></td><td>Element</td><td>Collection element type</td>
                <td><code>List&lt;E&gt;</code>, <code>Set&lt;E&gt;</code></td></tr>
              <tr><td><code>K</code></td><td>Key</td><td>Map key type</td><td><code>Map&lt;K, V&gt;</code></td></tr>
              <tr><td><code>V</code></td><td>Value</td><td>Map value type</td><td><code>Map&lt;K, V&gt;</code></td></tr>
              <tr><td><code>N</code></td><td>Number</td><td>Numeric subtype</td><td><code>class Calc&lt;N extends Number&gt;</code></td></tr>
              <tr><td><code>R</code></td><td>Return type</td><td>Method return in functional interfaces</td><td><code>Function&lt;T, R&gt;</code></td></tr>
              <tr><td><code>S, U, W</code></td><td>2nd / 3rd / 4th types</td><td>Additional type parameters</td><td><code>BiFunction&lt;T, U, R&gt;</code></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="callout callout-note">
        <div className="callout-title">📝 Diamond Operator &lt;&gt;</div>
        <p>
          The <strong>diamond operator</strong> <code>&lt;&gt;</code> (Java 7+) lets the compiler infer the type
          argument from context. <code>new Box&lt;String&gt;()</code> and <code>new Box&lt;&gt;()</code> are
          identical — prefer <code>&lt;&gt;</code> to avoid redundancy. Anonymous classes do <em>not</em> support the
          diamond operator prior to Java 9.
        </p>
      </div>

      {/* 5.3 */}
      <div className="section-header anchor" id="s53">
        <div className="section-badge">5.3</div>
        <h2>Generic Methods &amp; Constructors</h2>
      </div>
      <p>
        A <strong>generic method</strong> introduces its own type parameter(s), declared in angle brackets{' '}
        <em>before the return type</em>. This is independent of whether the enclosing class is itself generic.
      </p>
      <Code>{
`// Anatomy:  <TypeParam>  ReturnType  methodName(params)
public static <T> T identity(T t) {
    return t;
}

// Works with any type:
String  s = identity("hello");    // T inferred as String
Integer i = identity(42);         // T inferred as Integer

// Swap two elements in an array — generic utility method
public static <T> void swap(T[] arr, int i, int j) {
    T temp  = arr[i];
    arr[i]  = arr[j];
    arr[j]  = temp;
}

// Convert array to List — generic method in non-generic class
public class ArrayUtils {            // class not generic
    public static <E> List<E> asList(E... elements) {
        return new ArrayList<>(Arrays.asList(elements));
    }
}
List<String> words = ArrayUtils.asList("a", "b", "c");`
      }</Code>
      <div className="two-col">
        <div className="card">
          <h3>Type Inference vs Explicit Witness</h3>
          <p>The compiler usually infers the type argument. You can override with an explicit <strong>type witness</strong>:</p>
          <Code>{
`// Type inference (preferred)
List<String> ls =
    Collections.emptyList();

// Explicit type witness
List<String> ls =
    Collections.<String>emptyList();

// Useful when inference fails:
void process(List<String> list) { }

process(Collections.emptyList()); // ✓ inferred`
          }</Code>
        </div>
        <div className="card">
          <h3>Generic Constructor</h3>
          <p>Constructors can also declare their own type parameters, independent of the class type parameter:</p>
          <Code>{
`class Container<T> {
    private T content;
    private String label;

    // Generic constructor — own <U> type param
    public <U extends T> Container(
            U content, String label) {
        this.content = content;
        this.label   = label;
    }
}

// U = Integer, T = Number
Container<Number> c =
    new Container<>(42, "answer");`
          }</Code>
        </div>
      </div>
      <div className="card">
        <h3>Generic Method Returning Multiple Related Types</h3>
        <Code>{
`// Method that takes a Map and returns its entry set sorted by key
public static <K extends Comparable<K>, V>
        List<Map.Entry<K, V>> sortedEntries(Map<K, V> map) {
    List<Map.Entry<K, V>> entries = new ArrayList<>(map.entrySet());
    entries.sort(Map.Entry.comparingByKey());
    return entries;
}`
        }</Code>
      </div>
      <div className="callout callout-tip">
        <div className="callout-title">💡 Tip — Enums and Generic Methods</div>
        <p>
          <strong>Enums CANNOT have class-level type parameters</strong> — <code>enum MyEnum&lt;T&gt;</code> is a
          compile error. However, enum methods CAN be generic: <code>public &lt;T&gt; T convert(Class&lt;T&gt; type)</code>{' '}
          inside an enum body is perfectly legal.
        </p>
      </div>

      {/* 5.4 */}
      <div className="section-header anchor" id="s54">
        <div className="section-badge">5.4</div>
        <h2>Bounded Type Parameters</h2>
      </div>
      <p>
        Bounds restrict which types can be substituted for a type parameter. An <strong>upper bound</strong> (
        <code>extends</code>) says "T must be a subtype of X". This also lets you call X's methods on values of type T.
      </p>
      <Code>{
`// Without bound — T is just Object, can't call intValue()
public static <T> double sumBad(List<T> list) {
    double sum = 0;
    for (T t : list)
        sum += t.intValue();  // COMPILE ERROR — T is Object
    return sum;
}

// With upper bound — T is a Number, .doubleValue() is available
public static <T extends Number> double sum(List<T> list) {
    double result = 0;
    for (T t : list)
        result += t.doubleValue();  // ✓ Number method available
    return result;
}

List<Integer> ints    = List.of(1, 2, 3);
List<Double>  doubles = List.of(1.5, 2.5);
sum(ints);    // ✓ 6.0
sum(doubles); // ✓ 4.0`
      }</Code>
      <Code>{
`// T must extend Comparable AND implement Serializable
public static <T extends Comparable<T> & Serializable>
        T clampAndSerialize(T val, T min, T max) {
    if (val.compareTo(min) < 0) return min;
    if (val.compareTo(max) > 0) return max;
    return val;
}

// If one of the bounds is a class, it MUST be first:
// ✓  <T extends AbstractList<E> & Serializable>
// ✗  <T extends Serializable & AbstractList<E>>  ← COMPILE ERROR`
      }</Code>
      <Code>{
`// Find the maximum element in any List of Comparable elements
public static <T extends Comparable<T>> T max(List<T> list) {
    if (list.isEmpty())
        throw new NoSuchElementException("Empty list");

    T result = list.get(0);
    for (int i = 1; i < list.size(); i++) {
        if (list.get(i).compareTo(result) > 0)
            result = list.get(i);
    }
    return result;
}

// Works for any Comparable type:
max(List.of(3, 1, 4, 1, 5));      // 5  (Integer)
max(List.of("pear", "apple", "mango")); // "pear" (String)`
      }</Code>
      <div className="card">
        <h3>Bounds Reference Table</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Syntax</th><th>Name</th><th>Allowed On</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>&lt;T extends Foo&gt;</code></td><td>Upper bound</td><td>Type parameters &amp; wildcards</td>
                <td>T must be Foo or a subtype of Foo</td></tr>
              <tr><td><code>&lt;? super Bar&gt;</code></td><td>Lower bound</td><td><strong>Wildcards ONLY</strong></td>
                <td>Unknown type is Bar or a supertype of Bar</td></tr>
              <tr><td><code>&lt;T extends A &amp; B&gt;</code></td><td>Intersection</td><td>Type parameters only</td>
                <td>T must satisfy both bounds; class first</td></tr>
              <tr><td><code>&lt;?&gt;</code></td><td>Unbounded wildcard</td><td>Wildcards only</td>
                <td>Unknown, any type</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Warning — Class Must Come First in Intersection Bounds</div>
        <p>
          When using multiple bounds with <code>&amp;</code>, if one of them is a <strong>class</strong> (not an
          interface), it <strong>MUST be listed first</strong>. Interfaces can follow in any order, but only one
          class is permitted. Violating this order is a compile error.
        </p>
        <p style={{ marginTop: '8px' }}>
          <code>&lt;T extends MyClass &amp; InterfaceA &amp; InterfaceB&gt;</code> ← ✓ correct
        </p>
        <p><code>&lt;T extends InterfaceA &amp; MyClass&gt;</code> ← ✗ compile error if MyClass is a class</p>
      </div>

      {/* 5.5 */}
      <div className="section-header anchor" id="s55">
        <div className="section-badge">5.5</div>
        <h2>Wildcards</h2>
      </div>
      <p>
        A <strong>wildcard</strong> <code>?</code> represents an unknown type. Unlike type parameters (which name a
        type for reuse), wildcards are used in method signatures where you don't need to reference the specific type
        by name. They provide <em>flexibility</em> at use-site.
      </p>

      <div className="card">
        <h3>1. Unbounded Wildcard — <code>List&lt;?&gt;</code></h3>
        <p>Accepts a list of <em>any</em> type. Can only read elements as <code>Object</code>; cannot add anything (except <code>null</code>).</p>
        <Code>{
`public static void printAll(List<?> list) {
    for (Object o : list) {   // only Object, no specific type
        System.out.println(o);
    }
    // list.add("x");  ← COMPILE ERROR — cannot add to List<?>
    // list.add(null); ← OK (null is always valid)
}

printAll(List.of("a", "b"));      // ✓
printAll(List.of(1, 2, 3));      // ✓
printAll(List.of(new Object())); // ✓`
        }</Code>
      </div>

      <div className="card">
        <h3>2. Upper-Bounded Wildcard — <code>&lt;? extends Number&gt;</code></h3>
        <p>
          Accepts a list of <code>Number</code> or any subtype (<code>Integer</code>, <code>Double</code>, etc). You
          can <strong>read</strong> as <code>Number</code> but <strong>cannot add</strong> (covariant — safe producer).
        </p>
        <Code>{
`public static double sumList(List<? extends Number> list) {
    double sum = 0;
    for (Number n : list)       // read as Number ✓
        sum += n.doubleValue();
    // list.add(3.14); ← COMPILE ERROR
    // Compiler can't guarantee it's safe — list might be List<Integer>
    return sum;
}

sumList(List.of(1, 2, 3));          // List<Integer> ✓
sumList(List.of(1.5, 2.5));         // List<Double>  ✓
sumList(List.of(1L, 2L, 3L));       // List<Long>    ✓`
        }</Code>
      </div>

      <div className="card">
        <h3>3. Lower-Bounded Wildcard — <code>&lt;? super Integer&gt;</code></h3>
        <p>
          Accepts a list of <code>Integer</code> or any <em>supertype</em> (<code>Number</code>, <code>Object</code>).
          You can <strong>add</strong> <code>Integer</code> values but can only <strong>read</strong> as{' '}
          <code>Object</code> (contravariant — safe consumer).
        </p>
        <Code>{
`public static void fillIntegers(List<? super Integer> list, int n) {
    for (int i = 0; i < n; i++)
        list.add(i);     // ✓ adding Integer is always safe
}

List<Integer> ints    = new ArrayList<>();
List<Number>  numbers = new ArrayList<>();
List<Object>  objects = new ArrayList<>();

fillIntegers(ints,    3);  // ✓  ? super Integer includes Integer
fillIntegers(numbers, 3);  // ✓  Number is a supertype of Integer
fillIntegers(objects, 3);  // ✓  Object is a supertype of Integer`
        }</Code>
      </div>

      <div className="card">
        <h3>The PECS Principle — Producer Extends, Consumer Super</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Mnemonic</th><th>Wildcard</th><th>You can</th><th>You cannot</th><th>Use case</th></tr></thead>
            <tbody>
              <tr><td><strong>P</strong>roducer</td><td><code>&lt;? extends T&gt;</code></td><td>Read as T</td>
                <td>Add (except null)</td><td>Reading/consuming from a collection</td></tr>
              <tr><td><strong>C</strong>onsumer</td><td><code>&lt;? super T&gt;</code></td><td>Add T or subtype</td>
                <td>Read as anything except Object</td><td>Writing/adding to a collection</td></tr>
              <tr><td>Both</td><td><code>&lt;T&gt;</code> (type param)</td><td>Read and write</td><td>—</td>
                <td>Need to both read and write</td></tr>
            </tbody>
          </table>
        </div>
        <Code>{
`// src is a PRODUCER (we read from it)   → extends
// dest is a CONSUMER (we write into it) → super
public static <T> void copy(
        List<? super T>   dest,
        List<? extends T> src) {
    for (int i = 0; i < src.size(); i++)
        dest.set(i, src.get(i));
}`
        }</Code>
      </div>

      <div className="card">
        <h3>Why <code>List&lt;Dog&gt;</code> is NOT a subtype of <code>List&lt;Animal&gt;</code></h3>
        <p>
          Generics are <strong>invariant</strong>. Even though <code>Dog extends Animal</code>,{' '}
          <code>List&lt;Dog&gt;</code> is not a subtype of <code>List&lt;Animal&gt;</code>. This prevents a category
          of type-safety bugs that plague arrays.
        </p>
        <div className="compare">
          <div className="compare-side bad">
            <div className="compare-label">✗ Arrays (covariant) — unsafe!</div>
            <Code>{
`Dog[] dogs = new Dog[2];
Animal[] animals = dogs;   // ✓ compiles
animals[0] = new Cat();   // compiles!
// 💥 ArrayStoreException at RUNTIME
// because dogs[0] is actually a Cat`
            }</Code>
          </div>
          <div className="compare-side good">
            <div className="compare-label">✓ Generics (invariant) — safe!</div>
            <Code>{
`List<Dog> dogs = new ArrayList<>();
// List<Animal> a = dogs;
// ← COMPILE ERROR ✓
// Type safety enforced at compile time

// Use wildcard for flexibility:
List<? extends Animal> a = dogs; // ✓
// but a.add(new Cat()); ← error ✓`
            }</Code>
          </div>
        </div>
      </div>
      <div className="callout callout-note">
        <div className="callout-title">📝 Arrays vs Generics Variance Summary</div>
        <p>
          <strong>Arrays are covariant:</strong> <code>Dog[]</code> IS-A <code>Animal[]</code> — but this can cause{' '}
          <code>ArrayStoreException</code> at runtime.<br />
          <strong>Generics are invariant:</strong> <code>List&lt;Dog&gt;</code> is NOT a <code>List&lt;Animal&gt;</code>{' '}
          — prevents the problem entirely at compile time.<br />
          <strong>Wildcards add back flexibility:</strong> <code>List&lt;? extends Animal&gt;</code> accepts a{' '}
          <code>List&lt;Dog&gt;</code> safely.
        </p>
      </div>

      {/* 5.6 */}
      <div className="section-header anchor" id="s56">
        <div className="section-badge">5.6</div>
        <h2>Type Erasure</h2>
      </div>
      <p>
        <strong>Type erasure</strong> is the mechanism by which the Java compiler removes all generic type
        information from the compiled bytecode. At runtime, the JVM sees only raw types. This was a deliberate
        design choice to maintain backward compatibility with pre-Java-5 code.
      </p>
      <pre className="diagram">{
`┌─────────────────────────────────────────────────────────┐
│               TYPE ERASURE PIPELINE                      │
├────────────────────────────────────────────────────────  │
│  Source Code              Compiler Step        Bytecode  │
│                                                            │
│  List<String>       ────────────────────────►  List (raw)│
│  Box<T>          → T replaced by Object   ──►  Box (Object field)
│  <T extends      → T replaced by first    ──►  raw bound type
│   Number>          bound (Number)                        │
│                                                            │
│  + Type casts inserted at call sites by compiler          │
│  + Bridge methods generated for generic subclasses        │
└─────────────────────────────────────────────────────────┘`
      }</pre>
      <div className="two-col">
        <div className="card">
          <h3>Before Erasure (source)</h3>
          <Code>{
`public class Box<T> {
    private T value;

    public T get() {
        return value;
    }
    public void set(T v) {
        this.value = v;
    }
}

Box<String> b = new Box<>();
b.set("hello");
String s = b.get();`
          }</Code>
        </div>
        <div className="card">
          <h3>After Erasure (bytecode equivalent)</h3>
          <Code>{
`public class Box {          // raw
    private Object value;    // T → Object

    public Object get() {    // T → Object
        return value;
    }
    public void set(Object v) {
        this.value = v;
    }
}

Box b = new Box();
b.set("hello");
String s = (String) b.get(); // cast inserted`
          }</Code>
        </div>
      </div>
      <div className="card">
        <h3>Bridge Methods</h3>
        <p>
          When a generic class is subclassed with a concrete type, the compiler generates a synthetic{' '}
          <strong>bridge method</strong> so that polymorphism works correctly.
        </p>
        <Code>{
`// Source code
class StringBox extends Box<String> {
    @Override
    public void set(String v) { super.set(v); }
}

// After erasure — compiler also generates a BRIDGE METHOD:
// public void set(Object v) { set((String) v); }  ← synthetic bridge
// This allows: Box b = new StringBox(); b.set("x"); to work via polymorphism`
        }</Code>
      </div>
      <div className="card">
        <h3>What You CANNOT Do Because of Erasure</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Forbidden Operation</th><th>Why</th><th>Workaround</th></tr></thead>
            <tbody>
              <tr><td><code>new T()</code></td><td>T is erased to Object at runtime; JVM can't instantiate an unknown type</td>
                <td>Pass a <code>Supplier&lt;T&gt;</code> or <code>Class&lt;T&gt;</code> factory</td></tr>
              <tr><td><code>new T[10]</code></td><td>Array creation requires a concrete type at runtime</td>
                <td>Use <code>@SuppressWarnings</code> with <code>(T[]) new Object[10]</code>, or use{' '}
                  <code>List&lt;T&gt;</code> instead</td></tr>
              <tr><td><code>obj instanceof T</code></td><td>T is not available at runtime for reflection</td>
                <td>Pass a <code>Class&lt;T&gt;</code> and use <code>cls.isInstance(obj)</code></td></tr>
              <tr><td>Overload with same erasure</td>
                <td><code>void foo(List&lt;String&gt;)</code> and <code>void foo(List&lt;Integer&gt;)</code> have same erasure</td>
                <td>Use different method names</td></tr>
              <tr><td><code>catch (T e)</code></td><td>Exception type must be known at compile time for catch</td>
                <td>Catch a specific non-generic exception type</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <Code>{
`// ✗ Cannot do: new T()
// ✓ Workaround — pass a Supplier or Class<T>
public class Factory<T> {
    private final Supplier<T> supplier;

    public Factory(Supplier<T> supplier) {
        this.supplier = supplier;
    }
    public T create() { return supplier.get(); }
}
Factory<ArrayList> f = new Factory<>(ArrayList::new);

// ✗ Cannot do: obj instanceof T
// ✓ Workaround — Class<T> token
public <T> boolean isInstanceOf(Object obj, Class<T> cls) {
    return cls.isInstance(obj);  // ✓
}

// ✗ Cannot do: new T[n]
// ✓ Workaround — cast + suppress (use with caution)
@SuppressWarnings("unchecked")
private T[] createArray(int n) {
    return (T[]) new Object[n];  // heap pollution — prefer List<T>
}`
      }</Code>
      <div className="callout callout-tip">
        <div className="callout-title">💡 Tip — Class&lt;T&gt; as a Type Token</div>
        <p>
          To retain type information at runtime despite erasure, pass a <strong><code>Class&lt;T&gt;</code> object</strong>{' '}
          (called a <em>type token</em>). Libraries like Guava and Jackson use this pattern extensively. For complex
          generic types, use <code>TypeReference&lt;T&gt;</code> (also called a <em>super type token</em>) to
          capture parameterized types like <code>List&lt;String&gt;</code> at runtime.
        </p>
      </div>

      {/* 5.7 */}
      <div className="section-header anchor" id="s57">
        <div className="section-badge">5.7</div>
        <h2>Static Members &amp; Generic Exceptions</h2>
      </div>
      <p>
        Two common sources of confusion: static members interacting with class-level type parameters, and how
        erasure affects generic exception handling.
      </p>
      <div className="card">
        <h3>Static Fields Cannot Use Class Type Parameter</h3>
        <p>
          The class type parameter <code>T</code> belongs to each <em>instance</em> of <code>Box&lt;T&gt;</code>. A{' '}
          <strong>static field</strong> is shared across all instances and thus cannot be typed as <code>T</code>.
        </p>
        <Code>{
`public class Box<T> {

    // ✗ COMPILE ERROR — static field cannot use class type param
    private static T defaultValue;

    // ✓ OK — static field with concrete type
    private static int instanceCount = 0;

    // ✗ COMPILE ERROR — static method cannot reference T from class
    public static T getDefault() { ... }

    // ✓ OK — static method with its OWN type parameter
    public static <E> Box<E> of(E value) {
        return new Box<>(value);     // factory method
    }
}

// The static method declares its own <E>, completely independent of class T
Box<String> sb = Box.of("hello");   // E inferred as String
Box<Integer> ib = Box.of(99);       // E inferred as Integer`
        }</Code>
      </div>
      <div className="card">
        <h3>Generic Exceptions — What Is and Isn't Allowed</h3>
        <p>
          Due to type erasure, catch clauses work on raw types at runtime. This creates several restrictions on
          generics and exceptions.
        </p>
        <Code>{
`// ✗ Classes extending Throwable CANNOT be generic
class GenericException<T> extends Exception { }   // COMPILE ERROR
class GenericError<T> extends Throwable { }       // COMPILE ERROR

// ✗ Cannot catch a type parameter
public <T extends Exception> void bad() {
    try { ... }
    catch (T e) { }  // COMPILE ERROR
}

// ✓ CAN: Throw a type parameter (in try/catch context)
public <T extends Exception> void good(T ex) throws T {
    throw ex;   // ✓ allowed — useful for checked exception wrapping
}

// ✓ CAN: Non-generic exception with generic FIELDS
class DataException extends RuntimeException {
    private final List<String> errors;  // generic field ✓

    public DataException(List<String> errors) {
        super("Validation failed: " + errors);
        this.errors = errors;
    }
    public List<String> getErrors() { return errors; }
}

// ✓ CAN: Use generic type parameter as thrown type
interface Processor<T, E extends Exception> {
    void process(T item) throws E;   // ✓ generic checked exception
}`
        }</Code>
      </div>
      <div className="card">
        <h3>Summary Table — Generic + Static Rules</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Construct</th><th>Allowed?</th><th>Reason / Workaround</th></tr></thead>
            <tbody>
              <tr><td>Static field of type <code>T</code></td><td><span className="badge dont">✗ NO</span></td>
                <td>T is per-instance; static is shared. Use a concrete type.</td></tr>
              <tr><td>Static method using class <code>T</code></td><td><span className="badge dont">✗ NO</span></td>
                <td>Declare a separate <code>&lt;E&gt;</code> in the method signature.</td></tr>
              <tr><td>Static generic method with own <code>&lt;E&gt;</code></td><td><span className="badge do">✓ YES</span></td>
                <td>Method-level type param is independent of class type param.</td></tr>
              <tr><td><code>class Foo&lt;T&gt; extends Exception</code></td><td><span className="badge dont">✗ NO</span></td>
                <td>JLS prohibits generic Throwable subclasses due to erasure.</td></tr>
              <tr><td><code>catch (T e)</code></td><td><span className="badge dont">✗ NO</span></td>
                <td>Catch types must be known at compile time (bytecode needs them).</td></tr>
              <tr><td><code>throws T</code> in signature</td><td><span className="badge do">✓ YES</span></td>
                <td>Declare-site is fine; useful for checked exception tunneling.</td></tr>
              <tr><td>Exception class with generic <em>fields</em></td><td><span className="badge do">✓ YES</span></td>
                <td>Fields can be of generic type; only the class itself can't be generic.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5.8 */}
      <div className="section-header anchor" id="s58">
        <div className="section-badge">5.8</div>
        <h2>Raw Types &amp; Best Practices</h2>
      </div>
      <p>
        A <strong>raw type</strong> is a generic class or interface used without any type arguments. They exist
        solely for backward compatibility — <strong>avoid them in new code</strong>. Using raw types opts you out of
        generic type checking and can lead to <em>heap pollution</em>.
      </p>
      <div className="compare">
        <div className="compare-side bad">
          <div className="compare-label">✗ Raw Type — Avoid!</div>
          <Code>{
`// Raw type — generates "unchecked" warnings
List list = new ArrayList();
list.add("hello");
list.add(42);    // ⚠️ no error!

// Heap pollution:
List<String> typed = list;  // unchecked warning
String s = typed.get(1); // 💥 ClassCastException`
          }</Code>
        </div>
        <div className="compare-side good">
          <div className="compare-label">✓ Parameterized Type — Correct</div>
          <Code>{
`// Fully parameterized
List<String> list = new ArrayList<>();
list.add("hello");
// list.add(42); ← COMPILE ERROR ✓

// No cast needed, no surprise:
String s = list.get(0); // always String ✓
// Clean, safe, self-documenting`
          }</Code>
        </div>
      </div>
      <div className="card">
        <h3>Heap Pollution &amp; @SuppressWarnings</h3>
        <p>
          <strong>Heap pollution</strong> occurs when a variable of a parameterized type refers to an object that is
          not of that type — usually caused by mixing raw types and parameterized types, or by unchecked casts.
        </p>
        <Code>{
`// This method causes heap pollution:
@SafeVarargs                             // suppress varargs heap pollution warning
public static <T> List<T> listOf(T... items) {
    return Arrays.asList(items);
}

// @SuppressWarnings("unchecked") — when is it acceptable?
@SuppressWarnings("unchecked")
public T[] toArray(int size) {
    // ✓ OK to suppress ONLY when you have proven the cast is safe
    // AND you document WHY it's safe:
    // "Safe because this array is only used internally as T[]"
    return (T[]) new Object[size];
}

// ✓ Scope suppression as NARROWLY as possible
// Annotate the variable, not the whole method:
@SuppressWarnings("unchecked")
T[] result = (T[]) new Object[size];  // narrow scope ✓`
        }</Code>
      </div>
      <div className="card">
        <h3>Best Practices — Quick Reference</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th></th><th>Practice</th><th>Reason</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td><span className="badge do">DO</span></td><td>Use generics everywhere</td>
                <td>Compile-time safety, no casts, self-documenting</td>
                <td><code>Map&lt;String, List&lt;Integer&gt;&gt;</code></td></tr>
              <tr><td><span className="badge do">DO</span></td>
                <td>Prefer <code>List&lt;E&gt;</code> over <code>E[]</code> in generic contexts</td>
                <td>Arrays + generics mix poorly (invariance vs covariance)</td>
                <td><code>List&lt;T&gt;</code> instead of <code>T[]</code> in generic classes</td></tr>
              <tr><td><span className="badge do">DO</span></td>
                <td>Use bounded wildcards for maximum API flexibility</td>
                <td>Callers can pass subtypes/supertypes; follows PECS</td>
                <td><code>void process(List&lt;? extends Number&gt;)</code></td></tr>
              <tr><td><span className="badge do">DO</span></td>
                <td>Apply <code>@SuppressWarnings</code> on narrowest scope</td>
                <td>Minimize risk of hiding real bugs</td>
                <td>Annotate the local variable, not the whole method</td></tr>
              <tr><td><span className="badge dont">DON'T</span></td><td>Use raw types</td>
                <td>Loses all compile-time safety, causes heap pollution</td>
                <td>Use <code>List&lt;Object&gt;</code> or <code>List&lt;?&gt;</code> instead of <code>List</code></td></tr>
              <tr><td><span className="badge dont">DON'T</span></td><td>Perform unchecked casts blindly</td>
                <td>Can cause hard-to-debug ClassCastException later</td>
                <td>Always understand what the erasure is before casting</td></tr>
              <tr><td><span className="badge dont">DON'T</span></td><td>Create generic arrays directly</td>
                <td>Results in unchecked cast and potential heap pollution</td>
                <td>Use <code>new ArrayList&lt;T&gt;()</code> instead of <code>new T[n]</code></td></tr>
              <tr><td><span className="badge dont">DON'T</span></td><td>Mix raw types and generic types</td>
                <td>Heap pollution — compiler can no longer guarantee safety</td>
                <td>Never assign <code>List list = new ArrayList&lt;String&gt;()</code></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <h3>Choosing Between <code>List&lt;?&gt;</code>, <code>List&lt;Object&gt;</code>, and Raw <code>List</code></h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Type</th><th>Accepts</th><th>Can Add?</th><th>Use When</th></tr></thead>
            <tbody>
              <tr><td><code>List&lt;Object&gt;</code></td><td>Only <code>List&lt;Object&gt;</code></td>
                <td>✓ Any object</td><td>You explicitly need a heterogeneous list of Objects</td></tr>
              <tr><td><code>List&lt;?&gt;</code></td><td>Any parameterized List</td><td>✗ Only null</td>
                <td>Read-only iteration over unknown-typed lists</td></tr>
              <tr><td>Raw <code>List</code></td><td>Any List</td><td>✓ Any object (unsafe)</td>
                <td>Legacy code only — avoid in new code</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Danger — Raw Types Break the Generic Type System</div>
        <p>
          When you use a raw type, you opt out of <em>all</em> generic type checking — not just for that variable,
          but for any variable you assign it to. The compiler emits "unchecked" warnings which are easy to ignore but
          indicate real runtime danger. In production code, treat any raw-type warning as a bug to fix.
        </p>
      </div>
    </>
  );
}
