import Code from "../components/Code.jsx";
export default function Part2() {
  return (
    <>
      {/* 2.1 */}
      <div id="part2-1" data-topic-boundary="true" />

      <div className="subsection-header"><h3>Method Anatomy</h3></div>
      <Code>{
`//  ┌access┐ ┌return┐ ┌name┐ ┌──────params──────┐ ┌throws┐
    public    String      greet  (String name, int age)  throws IOException {
        if (name == null) throw new IllegalArgumentException("name null");
        return "Hello, " + name + "! Age: " + age;
    }`
      }</Code>
      <div className="card">
        <ul>
          <li><strong>Method Signature</strong> = name + parameter types (used for overloading resolution)</li>
          <li><strong>Method Descriptor</strong> = parameter types + return type (used in bytecode)</li>
          <li>Return type is <strong>NOT</strong> part of the signature — two methods with same name and params but
            different return types are a compile error.</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Pass by Value — Always!</h3></div>
      <Code>{
`// Primitives: a COPY of the value is passed
void increment(int x) { x++; }
int a = 5; increment(a);
System.out.println(a); // still 5 — original unchanged

// Reference types: a COPY of the REFERENCE is passed
void addItem(List<String> list) {
    list.add("new");          // modifies the OBJECT the copy points to ✓
    list = new ArrayList<>(); // rebinds local copy only, caller unaffected ✗
}
List<String> myList = new ArrayList<>();
addItem(myList);
// myList still points to the original list, but now contains "new"`
      }</Code>
      <pre className="diagram">{
`Caller stack:           Method stack:
┌────────────┐         ┌──────────────┐
│ myList ────┼────┐    │  list ───────┼──┐  (copy of reference)
└────────────┘    │    └──────────────┘  │
                   ▼                     ▼
              ┌────────────┐
              │  ArrayList │  ← same heap object
              │  ["new"]   │
              └────────────┘`
      }</pre>

      <div className="subsection-header"><h3>Method Overloading</h3></div>
      <Code>{
`class Printer {
    void print(int x)               { } // overload 1
    void print(double x)            { } // overload 2 — different param type
    void print(int x, String label) { } // overload 3 — different param count
    // String print(int x)            — ✗ COMPILE ERROR: same sig as overload 1
}
// Resolved at compile time (static dispatch) — not polymorphism`
      }</Code>

      <div className="subsection-header"><h3>Varargs</h3></div>
      <Code>{
`int sum(int... nums) {        // varargs = int[] under the hood
    int total = 0;
    for (int n : nums) total += n;
    return total;
}
sum();               // 0 — zero args allowed
sum(1, 2, 3);          // 6
sum(new int[]{4,5});  // 9 — can pass array directly

// RULES: varargs must be the LAST parameter; only ONE vararg per method
void log(String prefix, Object... args) { } // ✓ valid`
      }</Code>

      <div className="subsection-header"><h3>Constructors</h3></div>
      <Code>{
`class Person {
    String name;
    int age;

    // Default constructor (compiler auto-generates ONLY if no constructors defined)
    Person() { this("Unknown", 0); } // constructor chaining with this()

    // Parameterized constructor
    Person(String name, int age) {
        this.name = name;   // 'this' disambiguates field from param
        this.age = age;
    }

    // Copy constructor
    Person(Person other) {
        this(other.name, other.age); // this() MUST be first statement
    }
}`
      }</Code>

      <div className="subsection-header"><h3>The <code>this</code> Keyword — 5 Uses</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Use</th><th>Example</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td>1. Disambiguate field vs param</td><td><code>this.name = name;</code></td>
              <td>Refers to instance field when param has same name</td></tr>
            <tr><td>2. Constructor chaining</td><td><code>this("Alice", 30);</code></td>
              <td>Call another constructor in same class (must be first line)</td></tr>
            <tr><td>3. Pass current object</td><td><code>builder.setOwner(this);</code></td>
              <td>Pass the current instance as argument</td></tr>
            <tr><td>4. Return current object</td><td><code>return this;</code></td>
              <td>Method chaining / fluent API pattern</td></tr>
            <tr><td>5. Access outer class</td><td><code>Outer.this.field</code></td>
              <td>Inner class accessing outer class's member</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3><code>this</code> and <code>super</code> in Static Context</h3></div>
      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Critical Rule — Cannot Use <code>this</code> or <code>super</code> in Static Context</div>
        <p>
          <code>this</code> refers to the <em>current instance</em> of the class.<br />
          <code>super</code> refers to the <em>current instance's parent class</em>.<br />
          <strong>Static methods and static blocks do not belong to any instance</strong> — they belong to the class
          itself. Therefore, <code>this</code> and <code>super</code> are meaningless (and illegal) in a static context.
        </p>
      </div>
      <Code>{
`class MyClass {
    int value = 10;

    // ✓ Instance method — 'this' is valid
    void instanceMethod() {
        System.out.println(this.value);   // works fine
    }

    // ✗ Static method — 'this' and 'super' are ILLEGAL
    static void staticMethod() {
        // System.out.println(this.value);  // COMPILE ERROR: non-static variable 'this'
        // super.toString();                // COMPILE ERROR: non-static variable 'super'
        System.out.println("static — no 'this'");
    }

    // ✗ Static initializer block — same restriction
    static {
        // int x = this.value;   // COMPILE ERROR
    }

    // ✓ main() is static — create an instance to work with objects
    public static void main(String[] args) {
        MyClass obj = new MyClass();   // create instance
        obj.instanceMethod();           // ✓ call via object reference
        staticMethod();                // ✓ call directly (same class)
    }
}`
      }</Code>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Keyword</th><th>Instance Method</th><th>Static Method</th><th>Static Block</th><th>Constructor</th></tr></thead>
          <tbody>
            <tr><td><code>this</code></td>
              <td><span className="pill pill-success">✓ Allowed</span></td>
              <td><span className="pill pill-danger">✗ Compile Error</span></td>
              <td><span className="pill pill-danger">✗ Compile Error</span></td>
              <td><span className="pill pill-success">✓ Allowed</span></td></tr>
            <tr><td><code>super</code></td>
              <td><span className="pill pill-success">✓ Allowed</span></td>
              <td><span className="pill pill-danger">✗ Compile Error</span></td>
              <td><span className="pill pill-danger">✗ Compile Error</span></td>
              <td><span className="pill pill-success">✓ Allowed</span></td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout callout-tip">
        <div className="callout-title">💡 Why?</div>
        <p>
          Static members are loaded into the <strong>Method Area</strong> (Metaspace) when the class is first loaded
          by the ClassLoader — long before any instance exists on the heap. Since there is no object in memory,{' '}
          <code>this</code> (a reference to the current object) and <code>super</code> (a reference through the
          current object to its parent) have nothing to point to. The JVM has no concept of "current instance" in a
          static context.
        </p>
      </div>

      {/* 2.2 */}
      <div id="part2-2" data-topic-boundary="true" />
      <div className="card">
        <p>
          Java supports <strong>single inheritance</strong> — a class can extend only one class. This avoids the
          diamond problem (solved via interfaces with default methods). Use <code>extends</code> for classes,{' '}
          <code>implements</code> for interfaces.
        </p>
        <ul>
          <li><strong>IS-A</strong> (inheritance): <code>Dog extends Animal</code> → Dog IS-A Animal</li>
          <li><strong>HAS-A</strong> (composition): <code>Car</code> has an <code>Engine</code> field → favour
            composition over inheritance</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Method Overriding</h3></div>
      <Code>{
`class Animal {
    public String sound() { return "..."; }
}

class Dog extends Animal {
    @Override                     // annotation catches typos at compile time
    public String sound() {       // same name, same params
        return "Woof";
    }
}

// Overriding rules:
// 1. Same method signature
// 2. Return type: same OR covariant (subtype) — e.g. Dog overrides Animal getClone()
// 3. Access modifier: same or WIDER (e.g. protected → public, never narrower)
// 4. Exception: can throw fewer/narrower checked exceptions (not more/wider)
// 5. Cannot override static, final, or private methods`
      }</Code>

      <div className="subsection-header"><h3>The <code>super</code> Keyword — Uses &amp; Rules</h3></div>
      <div className="card">
        <p>
          <code>super</code> is a reference to the <strong>immediate parent class</strong> of the current object. It
          is used to access parent-class members (fields, methods, constructors) that are hidden or overridden by the
          child class. It always refers to the <strong>direct parent</strong> only — chaining{' '}
          <code>super.super.method()</code> is <strong>not supported</strong> in Java.
        </p>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Use</th><th>Syntax</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td>1. Call parent constructor</td><td><code>super(args);</code></td>
              <td>Must be the <em>first statement</em> in a constructor; invokes the parent's constructor explicitly</td></tr>
            <tr><td>2. Call overridden parent method</td><td><code>super.methodName();</code></td>
              <td>Invoke the parent's version of a method the child has overridden</td></tr>
            <tr><td>3. Access hidden parent field</td><td><code>super.fieldName</code></td>
              <td>Access a parent field when the child declares a field with the same name (field hiding)</td></tr>
          </tbody>
        </table>
      </div>
      <Code>{
`class Animal {
    String name = "Animal";              // parent field

    Animal(String name) {
        this.name = name;
    }

    void speak() {
        System.out.println("Generic animal sound");
    }
}

class Dog extends Animal {
    String name = "Dog";                  // hides parent field

    Dog(String name) {
        super(name);                       // ① call parent constructor — MUST be first
    }

    @Override
    void speak() {
        super.speak();                     // ② invoke overridden parent method
        System.out.println("Woof!");
    }

    void showNames() {
        System.out.println("Child  : " + name);           // "Dog"
        System.out.println("Parent : " + super.name);    // ③ "Animal"
    }
}

// Usage
Dog d = new Dog("Rex");
d.speak();
// Output:
//   Generic animal sound
//   Woof!

d.showNames();
// Output:
//   Child  : Dog
//   Parent : Animal`
      }</Code>
      <div className="callout callout-key">
        <div className="callout-title">🔑 Key Rules for <code>super</code></div>
        <ul>
          <li><code>super()</code> must be the <strong>first statement</strong> in a constructor — you cannot call
            both <code>this()</code> and <code>super()</code> in the same constructor (only one can be first).</li>
          <li>If you do <em>not</em> explicitly write <code>super()</code>, the compiler automatically inserts a call
            to the <strong>no-arg parent constructor</strong>. If the parent lacks a no-arg constructor, it is a{' '}
            <strong>compile error</strong>.</li>
          <li><code>super</code> always refers to the <strong>immediate parent</strong> only — you cannot write{' '}
            <code>super.super.method()</code>.</li>
          <li><code>super</code> can only be used in <strong>instance context</strong> (instance methods,
            constructors) — <strong>never in static methods or static blocks</strong>.</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Runtime Polymorphism (Dynamic Dispatch)</h3></div>
      <Code>{
`Animal a = new Dog();  // upcast: Dog IS-A Animal
System.out.println(a.sound()); // "Woof" — resolved at RUNTIME via vtable

// Downcasting (explicit, risky without instanceof check):
if (a instanceof Dog d) {     // pattern matching (Java 16+)
    d.fetch();                // no explicit cast needed!
}`
      }</Code>
      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Parent Reference — Child Instance Limitation</div>
        <p>
          If you hold a <strong>parent-class reference pointing to a child-class instance</strong>, the JVM executes
          the child's overridden method at runtime (dynamic dispatch — that is polymorphism at work). However,
          through that parent reference you can <strong>only call methods declared in the parent class</strong>.
          Child-specific methods — those <em>not</em> declared in or inherited from the parent — are invisible to the
          parent reference at compile time.
        </p>
      </div>
      <Code>{
`class Animal {
    void sound() { System.out.println("..."); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Woof"); }  // overrides parent
    void fetch() { System.out.println("Fetching!"); } // child-only method
}

// Parent reference, child instance
Animal a = new Dog();

a.sound();       // ✓ prints "Woof" — child's overridden method runs (dynamic dispatch)
// a.fetch();    // ✗ COMPILE ERROR — fetch() is not part of Animal's contract

// Java 16+ pattern matching:
if (a instanceof Dog d) {
    d.fetch();     // ✓ safe — d is typed as Dog
}

// Traditional approach (pre-Java 16):
if (a instanceof Dog) {
    ((Dog) a).fetch();   // ✓ explicit cast
}`
      }</Code>
      <div className="callout callout-note">
        <div className="callout-title">📝 Summary — Parent Reference / Child Instance</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Aspect</th><th>Decided At</th><th>Based On</th><th>Result</th></tr></thead>
            <tbody>
              <tr><td><strong>Which method body executes</strong></td><td>Runtime</td>
                <td>Actual object type (child)</td><td>Child's overridden method runs ✓</td></tr>
              <tr><td><strong>Which methods are accessible</strong></td><td>Compile time</td>
                <td>Reference type (parent)</td><td>Only parent's declared methods are visible</td></tr>
              <tr><td><strong>Child-only methods</strong></td><td>Compile time</td>
                <td>Reference type (parent)</td><td>Inaccessible — must downcast to child type first</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>Object Class Methods</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Default Behaviour</th><th>Override?</th></tr></thead>
          <tbody>
            <tr><td><code>toString()</code></td><td><code>ClassName@hashCodeHex</code></td><td>Yes — return meaningful string</td></tr>
            <tr><td><code>equals(Object o)</code></td><td>Reference equality (<code>==</code>)</td><td>Yes — for logical equality</td></tr>
            <tr><td><code>hashCode()</code></td><td>Memory-based integer</td><td>Yes — must align with equals()</td></tr>
            <tr><td><code>clone()</code></td><td>Shallow copy (protected)</td><td>Yes + implement Cloneable</td></tr>
            <tr><td><code>finalize()</code></td><td>Called before GC (deprecated)</td><td>Avoid — use try-finally or Cleaner</td></tr>
            <tr><td><code>getClass()</code></td><td>Returns runtime Class object</td><td>No (final)</td></tr>
            <tr><td><code>wait() / notify() / notifyAll()</code></td><td>Thread synchronization</td><td>No (final)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>equals() and hashCode() Contract</h3></div>
      <div className="callout callout-key">
        <div className="callout-title">🔑 The Contract</div>
        If <code>a.equals(b)</code> is <code>true</code>, then <code>a.hashCode() == b.hashCode()</code> MUST also be{' '}
        <code>true</code>. (The reverse is not required.) Breaking this contract causes bugs in HashMap, HashSet, etc.
      </div>
      <Code>{
`class Point {
    int x, y;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Point p)) return false;
        return x == p.x && y == p.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y); // same fields as equals!
    }
}`
      }</Code>

      {/* 2.3 */}
      <div id="part2-3" data-topic-boundary="true" />

      <div className="subsection-header"><h3>Abstract Classes</h3></div>
      <Code>{
`abstract class Shape {
    String color;

    // Abstract method — no body, MUST be overridden by concrete subclass
    abstract double area();

    // Concrete method — shared implementation
    void describe() {
        System.out.println(color + " shape, area=" + area());
    }

    // Abstract classes CAN have constructors (called via super() from subclass)
    Shape(String color) { this.color = color; }
}

class Circle extends Shape {
    double radius;
    Circle(String c, double r) { super(c); this.radius = r; }

    @Override
    double area() { return Math.PI * radius * radius; }
}

// Shape s = new Shape("red"); // ✗ Cannot instantiate abstract class!
Shape s = new Circle("red", 5.0); // ✓ Upcast to abstract type`
      }</Code>

      <div className="subsection-header"><h3>Abstract Class vs Interface — Comparison</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Feature</th><th>Abstract Class</th><th>Interface</th></tr></thead>
          <tbody>
            <tr><td>Instantiation</td><td>No</td><td>No</td></tr>
            <tr><td>Constructor</td><td>Yes</td><td>No</td></tr>
            <tr><td>Instance fields</td><td>Yes</td><td>No (only <code>public static final</code> constants)</td></tr>
            <tr><td>Abstract methods</td><td>Yes (optional)</td><td>Yes (implicit)</td></tr>
            <tr><td>Concrete methods</td><td>Yes</td><td>default / static / private (Java 8/9)</td></tr>
            <tr><td>Access modifiers</td><td>Any</td><td>public / private (Java 9)</td></tr>
            <tr><td>Inheritance</td><td>Single</td><td>Multiple allowed</td></tr>
            <tr><td>Use when</td><td>Shared state + partial impl</td><td>Defining a contract / capability</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>final Variable</h3></div>
      <Code>{
`final int MAX = 100;        // local final: must initialize at declaration
// MAX = 200; // ✗ compile error

class Order {
    final String orderId;    // blank final: assigned in constructor

    Order(String id) {
        this.orderId = id;    // ✓ must be set before constructor ends
    }
    // Must be set in ALL constructors (or via constructor chaining)
}`
      }</Code>

      <div className="subsection-header"><h3>final Method &amp; final Class</h3></div>
      <Code>{
`class Base {
    final void seal() { }    // cannot be overridden in subclass
}

final class ImmutablePoint {  // cannot be extended
    final int x, y;
    ImmutablePoint(int x, int y) { this.x = x; this.y = y; }
}
// Famous final classes: String, Integer, Long, Math, System`
      }</Code>

      <div className="subsection-header"><h3>Effectively Final (Java 8+)</h3></div>
      <Code>{
`void example() {
    String prefix = "Hello";    // never reassigned → effectively final
    int count = 10;             // effectively final

    // Lambdas and anonymous classes can capture effectively final locals:
    Runnable r = () -> System.out.println(prefix + count);

    // count++; // Uncommenting this breaks effectively-final → compile error
}`
      }</Code>

      {/* 2.4 */}
      <div id="part2-4" data-topic-boundary="true" />

      <div className="subsection-header"><h3>Interface Member Types</h3></div>
      <Code>{
`interface Vehicle {
    // 1. Constants (implicitly public static final)
    int MAX_SPEED = 300;

    // 2. Abstract methods (implicitly public abstract — Java <8)
    void accelerate(int speed);

    // 3. Default methods (Java 8+) — provides default implementation
    default void honk() {
        System.out.println("Beep!");
    }

    // 4. Static methods (Java 8+) — called on interface, not instance
    static Vehicle create(String type) {
        return switch (type) {
            case "car"  -> new Car();
            default     -> throw new IllegalArgumentException(type);
        };
    }

    // 5. Private methods (Java 9+) — helper for default methods
    private void logEvent(String msg) {
        System.out.println("[Vehicle] " + msg);
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Diamond Problem &amp; Resolution</h3></div>
      <Code>{
`interface A { default void greet() { System.out.println("A"); } }
interface B { default void greet() { System.out.println("B"); } }

class C implements A, B {
    @Override
    public void greet() {
        A.super.greet();  // explicitly choose A's version
        // OR B.super.greet();
        // OR write own implementation — MUST override if conflict exists
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Functional Interfaces</h3></div>
      <Code>{
`@FunctionalInterface   // optional but enforced by compiler: exactly 1 abstract method
interface Transformer<T, R> {
    R transform(T input);
}

// Can be implemented with a lambda:
Transformer<String, Integer> length = str -> str.length();
System.out.println(length.transform("hello")); // 5

// Built-in functional interfaces (java.util.function):
// Predicate<T>      — T → boolean
// Function<T,R>     — T → R
// Consumer<T>       — T → void
// Supplier<T>       — () → T
// BiFunction<T,U,R> — T,U → R`
      }</Code>

      <div className="subsection-header"><h3>Common Built-in Interfaces</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Interface</th><th>Package</th><th>Method</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code>Comparable&lt;T&gt;</code></td><td>java.lang</td><td><code>compareTo(T o)</code></td><td>Natural ordering; used by sort()</td></tr>
            <tr><td><code>Comparator&lt;T&gt;</code></td><td>java.util</td><td><code>compare(T a, T b)</code></td><td>Custom/external ordering</td></tr>
            <tr><td><code>Iterable&lt;T&gt;</code></td><td>java.lang</td><td><code>iterator()</code></td><td>Enables for-each loop</td></tr>
            <tr><td><code>Iterator&lt;T&gt;</code></td><td>java.util</td><td><code>hasNext(), next()</code></td><td>Traversal cursor</td></tr>
            <tr><td><code>Serializable</code></td><td>java.io</td><td>none (marker)</td><td>Enables object serialization</td></tr>
            <tr><td><code>Cloneable</code></td><td>java.lang</td><td>none (marker)</td><td>Enables clone() method</td></tr>
            <tr><td><code>Runnable</code></td><td>java.lang</td><td><code>run()</code></td><td>Task executed by thread</td></tr>
            <tr><td><code>Callable&lt;V&gt;</code></td><td>java.util.concurrent</td><td><code>call()</code></td><td>Task returning value + throws</td></tr>
          </tbody>
        </table>
      </div>

      {/* 2.5 */}
      <div id="part2-5" data-topic-boundary="true" />

      <div className="subsection-header"><h3>Member Inner Class</h3></div>
      <Code>{
`class Outer {
    private int outerField = 10;

    class Inner {
        void display() {
            System.out.println(outerField);  // ✓ direct access to outer private
        }
    }
}

// Instantiation: MUST go through an Outer instance
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
inner.display(); // 10

// Inner class implicitly holds a reference to Outer → can cause memory leaks!`
      }</Code>

      <div className="subsection-header"><h3>Static Nested Class</h3></div>
      <Code>{
`class Outer {
    static int outerStatic = 42;
    int outerInstance = 7;

    static class StaticNested {
        void show() {
            System.out.println(outerStatic);    // ✓ static access OK
            // System.out.println(outerInstance); // ✗ no outer instance ref
        }
    }
}
// No Outer instance needed:
Outer.StaticNested sn = new Outer.StaticNested();`
      }</Code>

      <div className="subsection-header"><h3>Local Inner Class</h3></div>
      <Code>{
`void processData() {
    final int threshold = 50;  // or effectively final

    class DataProcessor {
        boolean check(int val) {
            return val > threshold;  // can access effectively final local
        }
    }

    DataProcessor dp = new DataProcessor();
    System.out.println(dp.check(60)); // true
    // DataProcessor NOT accessible outside this method
}`
      }</Code>

      <div className="subsection-header"><h3>Anonymous Inner Class</h3></div>
      <Code>{
`// Syntax: new InterfaceOrClass() { ... body ... }
Comparator<String> byLen = new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.length() - b.length();
    }
};

// Java 8+ lambda is cleaner for functional interfaces:
Comparator<String> byLenLambda = (a, b) -> a.length() - b.length();

// Anonymous class is still needed for multi-method interfaces or abstract classes:
Thread t = new Thread(new Runnable() {
    @Override
    public void run() { System.out.println("Running!"); }
});
// Same as: Thread t = new Thread(() -> System.out.println("Running!"));`
      }</Code>

      <div className="subsection-header"><h3>Inner Class Types — Comparison</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Type</th><th>Declared</th><th>static?</th><th>Outer Instance?</th><th>Access Outer Members?</th><th>Common Use</th></tr></thead>
          <tbody>
            <tr><td><strong>Member Inner</strong></td><td>Class body</td><td>No</td><td>Required</td>
              <td>All (even private)</td><td>Iterator, Builder helpers</td></tr>
            <tr><td><strong>Static Nested</strong></td><td>Class body</td><td>Yes</td><td>Not required</td>
              <td>Static only</td><td>Helper classes, DTO, Builder</td></tr>
            <tr><td><strong>Local</strong></td><td>Method body</td><td>No</td><td>Enclosing method's</td>
              <td>Effectively final locals</td><td>One-off algorithm helpers</td></tr>
            <tr><td><strong>Anonymous</strong></td><td>Expression</td><td>No</td><td>Enclosing method's</td>
              <td>Effectively final locals</td><td>Event handlers, callbacks</td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout callout-tip">
        <div className="callout-title">💡 Best Practice</div>
        Prefer <strong>static nested classes</strong> when you don't need a reference to the outer instance. Member
        inner classes hold an implicit outer reference — this can cause memory leaks in long-lived objects (e.g.,
        Android Activities). In modern Java, <strong>lambdas</strong> replace most anonymous class use cases.
      </div>
    </>
  );
}
