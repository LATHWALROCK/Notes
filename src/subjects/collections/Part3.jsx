import Code from "../../components/Code.jsx";
export default function Part3() {
  return (
    <>
      {/* 3.1 */}
      <div id="part3" data-topic-boundary="true" />
      <div className="card">
        <p>
          A <code>Set</code> is a <code>Collection</code> that contains <strong>no duplicate elements</strong>. It
          models the mathematical set abstraction and extends <code>Collection&lt;E&gt;</code>. Uniqueness is
          determined via <code>equals()</code> and <code>hashCode()</code> — any class stored in a{' '}
          <code>Set</code> should override both.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Key Contract</div>
          Adding an element that already exists (per <code>equals()</code>) is a no-op — <code>add()</code> returns{' '}
          <code>false</code>. Sets permit at most one <code>null</code> (HashSet / LinkedHashSet only).
        </div>

        <div className="subsection-header"><h3>Core Methods Inherited from Collection</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>add(E e)</code></td><td>Adds element if not already present; returns <code>false</code> if duplicate</td><td>Impl-dependent</td></tr>
              <tr><td><code>remove(Object o)</code></td><td>Removes element equal to <code>o</code>, if present</td><td>Impl-dependent</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Returns <code>true</code> if set contains <code>o</code></td><td>Impl-dependent</td></tr>
              <tr><td><code>size()</code></td><td>Returns number of elements</td><td>O(1)</td></tr>
              <tr><td><code>isEmpty()</code></td><td>Returns <code>true</code> if set has no elements</td><td>O(1)</td></tr>
              <tr><td><code>iterator()</code></td><td>Returns an iterator over elements (order is impl-defined)</td><td>Impl-dependent</td></tr>
              <tr><td><code>addAll(Collection c)</code></td><td>Adds all elements from <code>c</code> (union)</td><td>Impl-dependent</td></tr>
              <tr><td><code>retainAll(Collection c)</code></td><td>Retains only elements also in <code>c</code> (intersection)</td><td>Impl-dependent</td></tr>
              <tr><td><code>removeAll(Collection c)</code></td><td>Removes all elements also in <code>c</code> (difference)</td><td>Impl-dependent</td></tr>
              <tr><td><code>containsAll(Collection c)</code></td><td>Returns <code>true</code> if this set contains all elements of <code>c</code></td><td>Impl-dependent</td></tr>
              <tr><td><code>clear()</code></td><td>Removes all elements</td><td>Impl-dependent</td></tr>
              <tr><td><code>toArray()</code></td><td>Returns all elements as an <code>Object[]</code></td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="subsection-header"><h3>Factory &amp; Utility Methods</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>Set.of(e1, e2, ...)</code></td><td>Returns an <strong>immutable</strong> set (Java 9+); throws on duplicate or null</td><td>O(n)</td></tr>
              <tr><td><code>Set.copyOf(Collection c)</code></td><td>Returns an immutable copy (Java 10+)</td><td>O(n)</td></tr>
              <tr><td><code>Collections.unmodifiableSet(s)</code></td><td>Returns an unmodifiable view of set <code>s</code>; mutations throw <code>UnsupportedOperationException</code></td><td>O(1)</td></tr>
              <tr><td><code>Collections.synchronizedSet(s)</code></td><td>Returns a thread-safe view; synchronizes on the set object</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <Code>{
`// Immutable set (Java 9+)
Set<String> immutable = Set.of("a", "b", "c");

// Unmodifiable view
Set<String> mutable = new HashSet<>();
Set<String> unmod  = Collections.unmodifiableSet(mutable);

// Thread-safe view
Set<String> safe = Collections.synchronizedSet(new HashSet<>());`
        }</Code>
      </div>

      {/* 3.2 */}
      <div id="s3-2" data-topic-boundary="true" />
      <div className="card">
        <p>
          <code>HashSet&lt;E&gt;</code> is backed by a <code>HashMap&lt;E, Object&gt;</code> where every entry maps
          to the sentinel value <code>PRESENT</code>. Elements are <strong>unordered</strong>; iteration order may
          change across JVM runs. Provides <strong>O(1) average</strong> time for the core operations assuming
          good hash distribution.
        </p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ hashCode + equals</div>
          If you override <code>equals()</code> you MUST override <code>hashCode()</code>. Objects that are equal
          must have the same hash code; failing this breaks all hash-based collections.
        </div>

        <div className="subsection-header"><h3>Constructors</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>HashSet()</code></td><td>Default capacity 16, load factor 0.75</td><td>O(1)</td></tr>
              <tr><td><code>HashSet(int capacity)</code></td><td>Initial capacity; load factor 0.75</td><td>O(1)</td></tr>
              <tr><td><code>HashSet(int capacity, float loadFactor)</code></td><td>Custom capacity and load factor</td><td>O(1)</td></tr>
              <tr><td><code>HashSet(Collection&lt;? extends E&gt; c)</code></td><td>Constructs set from all elements of <code>c</code></td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="subsection-header"><h3>Methods</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>add(E e)</code></td><td>Adds element; returns <code>false</code> if already present</td><td>O(1) avg</td></tr>
              <tr><td><code>remove(Object o)</code></td><td>Removes element if present; returns <code>true</code> on success</td><td>O(1) avg</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Returns <code>true</code> if element exists in set</td><td>O(1) avg</td></tr>
              <tr><td><code>size()</code></td><td>Returns number of elements</td><td>O(1)</td></tr>
              <tr><td><code>isEmpty()</code></td><td>Returns <code>true</code> if the set is empty</td><td>O(1)</td></tr>
              <tr><td><code>clear()</code></td><td>Removes all elements; resets all bucket slots to null</td><td>O(n)</td></tr>
              <tr><td><code>iterator()</code></td><td>Returns fail-fast iterator; order undefined; traverses all buckets</td><td>O(h+n)*</td></tr>
              <tr><td><code>toArray()</code></td><td>Returns all elements as <code>Object[]</code></td><td>O(n)</td></tr>
              <tr><td><code>addAll(Collection c)</code></td><td>Adds all elements from <code>c</code>; no-op for duplicates</td><td>O(n)</td></tr>
              <tr><td><code>removeAll(Collection c)</code></td><td>Removes all elements that appear in <code>c</code></td><td>O(n)</td></tr>
              <tr><td><code>retainAll(Collection c)</code></td><td>Retains only elements in <code>c</code>; removes the rest</td><td>O(n)</td></tr>
              <tr><td><code>containsAll(Collection c)</code></td><td>Returns <code>true</code> if all elements of <code>c</code> are present</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '.8rem', color: 'var(--text-secondary)' }}>
          * h = number of buckets (capacity), n = number of elements. Iterator must visit every bucket slot.
        </p>
        <Code>{
`HashSet<String> fruits = new HashSet<>();
fruits.add("apple");
fruits.add("banana");
fruits.add("apple");  // duplicate — ignored
System.out.println(fruits.size());  // 2
System.out.println(fruits.contains("banana"));  // true
fruits.remove("apple");
// set-math operations
Set<String> a = new HashSet<>(List.of("x","y","z"));
Set<String> b = new HashSet<>(List.of("y","z","w"));
a.retainAll(b); // intersection → {y, z}`
        }</Code>
      </div>

      {/* 3.3 */}
      <div id="s3-3" data-topic-boundary="true" />
      <div className="card">
        <p>
          <code>LinkedHashSet&lt;E&gt;</code> extends <code>HashSet</code> and maintains a{' '}
          <strong>doubly-linked list</strong> through all entries, preserving <strong>insertion order</strong>. The
          backing data structure is a <code>LinkedHashMap</code>. All operations have the same average time
          complexity as <code>HashSet</code>, but iteration is <strong>O(n)</strong> (not O(h+n)) since it follows
          the linked chain.
        </p>
        <div className="callout callout-tip">
          <div className="callout-title">💡 When to prefer LinkedHashSet over HashSet</div>
          Use <code>LinkedHashSet</code> when you need uniqueness <em>and</em> predictable iteration order
          (insertion order). Overhead: one additional pointer pair per entry.
        </div>

        <div className="subsection-header"><h3>Constructors</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>LinkedHashSet()</code></td><td>Default capacity 16, load factor 0.75</td><td>O(1)</td></tr>
              <tr><td><code>LinkedHashSet(int capacity)</code></td><td>Initial capacity; load factor 0.75</td><td>O(1)</td></tr>
              <tr><td><code>LinkedHashSet(int capacity, float loadFactor)</code></td><td>Custom capacity and load factor</td><td>O(1)</td></tr>
              <tr><td><code>LinkedHashSet(Collection&lt;? extends E&gt; c)</code></td><td>Constructs set from all elements of <code>c</code>, preserving iteration order of <code>c</code></td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="subsection-header"><h3>Methods</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>add(E e)</code></td><td>Adds element at end of linked list if not present; returns <code>false</code> if duplicate</td><td>O(1) avg</td></tr>
              <tr><td><code>remove(Object o)</code></td><td>Removes element and unlinks it from the linked list</td><td>O(1) avg</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Hash-based lookup; returns <code>true</code> if element present</td><td>O(1) avg</td></tr>
              <tr><td><code>size()</code></td><td>Returns number of elements</td><td>O(1)</td></tr>
              <tr><td><code>isEmpty()</code></td><td>Returns <code>true</code> if the set is empty</td><td>O(1)</td></tr>
              <tr><td><code>clear()</code></td><td>Removes all elements and resets linked list</td><td>O(n)</td></tr>
              <tr><td><code>iterator()</code></td><td>Returns fail-fast iterator in <strong>insertion order</strong></td><td>O(n)</td></tr>
              <tr><td><code>toArray()</code></td><td>Returns elements as <code>Object[]</code> in insertion order</td><td>O(n)</td></tr>
              <tr><td><code>addAll(Collection c)</code></td><td>Adds all elements preserving their relative order from <code>c</code></td><td>O(n)</td></tr>
              <tr><td><code>removeAll(Collection c)</code></td><td>Removes all elements also in <code>c</code></td><td>O(n)</td></tr>
              <tr><td><code>retainAll(Collection c)</code></td><td>Retains only elements in <code>c</code></td><td>O(n)</td></tr>
              <tr><td><code>containsAll(Collection c)</code></td><td>Returns <code>true</code> if all elements of <code>c</code> are present</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="compare">
          <div className="compare-side bad">
            <div className="compare-label">✗ HashSet — unordered</div>
            <Code>{
`Set<String> s = new HashSet<>();
s.add("c"); s.add("a"); s.add("b");
// prints: a, c, b (unpredictable)`
            }</Code>
          </div>
          <div className="compare-side good">
            <div className="compare-label">✓ LinkedHashSet — insertion order</div>
            <Code>{
`Set<String> s = new LinkedHashSet<>();
s.add("c"); s.add("a"); s.add("b");
// prints: c, a, b (insertion order)`
            }</Code>
          </div>
        </div>
      </div>

      {/* 3.4 */}
      <div id="s3-4" data-topic-boundary="true" />
      <div className="card">
        <p>
          <code>TreeSet&lt;E&gt;</code> implements <code>NavigableSet&lt;E&gt;</code> backed by a{' '}
          <code>TreeMap</code> (Red-Black tree). Elements are stored in <strong>sorted order</strong> (natural
          ordering via <code>Comparable</code>, or a supplied <code>Comparator</code>). Does not permit{' '}
          <code>null</code> elements. All navigation and modification operations run in{' '}
          <strong>O(log n)</strong>.
        </p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Comparator consistency with equals</div>
          The comparator (or natural ordering) must be <em>consistent with equals</em>: if <code>compareTo</code>{' '}
          returns 0 for two objects, they must be <code>equals</code>. Otherwise the set violates the general
          contract of <code>Set</code>.
        </div>

        <div className="subsection-header"><h3>Constructors</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>TreeSet()</code></td><td>Natural ordering via <code>Comparable</code></td><td>O(1)</td></tr>
              <tr><td><code>TreeSet(Comparator&lt;? super E&gt; c)</code></td><td>Custom comparator for ordering</td><td>O(1)</td></tr>
              <tr><td><code>TreeSet(Collection&lt;? extends E&gt; c)</code></td><td>Constructs from collection; natural ordering</td><td>O(n log n)</td></tr>
              <tr><td><code>TreeSet(SortedSet&lt;E&gt; s)</code></td><td>Constructs from sorted set, inheriting its comparator</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="subsection-header"><h3>Methods</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>add(E e)</code></td><td>Inserts element in sorted position; returns <code>false</code> if duplicate</td><td>O(log n)</td></tr>
              <tr><td><code>remove(Object o)</code></td><td>Removes element if present</td><td>O(log n)</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Returns <code>true</code> if element exists</td><td>O(log n)</td></tr>
              <tr><td><code>size()</code></td><td>Returns number of elements</td><td>O(1)</td></tr>
              <tr><td><code>iterator()</code></td><td>Returns fail-fast iterator in ascending sorted order</td><td>O(1)</td></tr>
              <tr><td><code>first()</code></td><td>Returns the smallest (first) element</td><td>O(log n)</td></tr>
              <tr><td><code>last()</code></td><td>Returns the largest (last) element</td><td>O(log n)</td></tr>
              <tr><td><code>floor(E e)</code></td><td>Greatest element ≤ <code>e</code>, or <code>null</code></td><td>O(log n)</td></tr>
              <tr><td><code>ceiling(E e)</code></td><td>Smallest element ≥ <code>e</code>, or <code>null</code></td><td>O(log n)</td></tr>
              <tr><td><code>lower(E e)</code></td><td>Greatest element strictly &lt; <code>e</code>, or <code>null</code></td><td>O(log n)</td></tr>
              <tr><td><code>higher(E e)</code></td><td>Smallest element strictly &gt; <code>e</code>, or <code>null</code></td><td>O(log n)</td></tr>
              <tr><td><code>pollFirst()</code></td><td>Retrieves and removes smallest element, or <code>null</code> if empty</td><td>O(log n)</td></tr>
              <tr><td><code>pollLast()</code></td><td>Retrieves and removes largest element, or <code>null</code> if empty</td><td>O(log n)</td></tr>
              <tr><td><code>headSet(E toE)</code></td><td>View of elements strictly &lt; <code>toE</code> (exclusive)</td><td>O(log n)</td></tr>
              <tr><td><code>tailSet(E fromE)</code></td><td>View of elements ≥ <code>fromE</code> (inclusive)</td><td>O(log n)</td></tr>
              <tr><td><code>subSet(E fromE, E toE)</code></td><td>View of elements from <code>fromE</code> (incl) to <code>toE</code> (excl)</td><td>O(log n)</td></tr>
              <tr><td><code>headSet(E toE, boolean inclusive)</code></td><td>View with controllable inclusivity on upper bound</td><td>O(log n)</td></tr>
              <tr><td><code>tailSet(E fromE, boolean inclusive)</code></td><td>View with controllable inclusivity on lower bound</td><td>O(log n)</td></tr>
              <tr><td><code>subSet(E fromE, boolean fromInc, E toE, boolean toInc)</code></td><td>Full control over both bounds' inclusivity</td><td>O(log n)</td></tr>
              <tr><td><code>descendingSet()</code></td><td>Returns a reverse-order view of this set</td><td>O(1)</td></tr>
              <tr><td><code>descendingIterator()</code></td><td>Iterator in descending (reverse) order</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <Code>{
`TreeSet<Integer> ts = new TreeSet<>();
ts.add(5); ts.add(2); ts.add(8); ts.add(1);
System.out.println(ts);               // [1, 2, 5, 8]
System.out.println(ts.floor(6));       // 5
System.out.println(ts.ceiling(6));     // 8
System.out.println(ts.subSet(2, 8));   // [2, 5]
System.out.println(ts.headSet(5));     // [1, 2]
System.out.println(ts.pollFirst());    // 1, set is now [2, 5, 8]`
        }</Code>
      </div>

      {/* 3.5 */}
      <div id="s3-5" data-topic-boundary="true" />

      <div className="subsection-header"><h3>EnumSet</h3></div>
      <div className="card">
        <p>
          <code>EnumSet&lt;E extends Enum&lt;E&gt;&gt;</code> is a specialized <code>Set</code> for enum types
          implemented internally as a <strong>bit vector</strong> (a <code>long</code> for ≤64 constants, or a{' '}
          <code>long[]</code> for larger enums via <code>JumboEnumSet</code>). All operations are{' '}
          <strong>O(1)</strong> — bitwise AND/OR/XOR. <em>Cannot be instantiated directly</em>; use factory methods.
        </p>
        <div className="callout callout-tip">
          <div className="callout-title">💡 Fastest Set for enums</div>
          EnumSet is dramatically faster than HashSet for enum elements. Prefer it whenever you work with enum
          flags or options.
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>EnumSet.allOf(Class&lt;E&gt; type)</code></td><td>Creates set containing all constants of enum <code>type</code></td><td>O(n)</td></tr>
              <tr><td><code>EnumSet.noneOf(Class&lt;E&gt; type)</code></td><td>Creates empty set with specified element type</td><td>O(1)</td></tr>
              <tr><td><code>EnumSet.of(E first, E... rest)</code></td><td>Creates set with specified enum constants</td><td>O(n)</td></tr>
              <tr><td><code>EnumSet.range(E from, E to)</code></td><td>Creates set of all constants in the range [from, to]</td><td>O(n)</td></tr>
              <tr><td><code>EnumSet.copyOf(Collection&lt;E&gt; c)</code></td><td>Creates set from existing collection or EnumSet</td><td>O(n)</td></tr>
              <tr><td><code>EnumSet.complementOf(EnumSet&lt;E&gt; s)</code></td><td>Creates set with all constants NOT in <code>s</code></td><td>O(n)</td></tr>
              <tr><td><code>add(E e)</code></td><td>Sets the corresponding bit; returns <code>false</code> if already present</td><td>O(1)</td></tr>
              <tr><td><code>remove(Object o)</code></td><td>Clears the corresponding bit</td><td>O(1)</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Checks the corresponding bit</td><td>O(1)</td></tr>
              <tr><td><code>size()</code></td><td>Returns number of set bits (via <code>Long.bitCount</code>)</td><td>O(1)</td></tr>
              <tr><td><code>addAll(Collection c)</code></td><td>Bitwise OR of the two sets</td><td>O(1)</td></tr>
              <tr><td><code>retainAll(Collection c)</code></td><td>Bitwise AND of the two sets</td><td>O(1)</td></tr>
              <tr><td><code>removeAll(Collection c)</code></td><td>Bitwise AND-NOT of the two sets</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <Code>{
`enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }

EnumSet<Day> weekdays  = EnumSet.range(Day.MON, Day.FRI);
EnumSet<Day> weekend   = EnumSet.of(Day.SAT, Day.SUN);
EnumSet<Day> allDays   = EnumSet.allOf(Day.class);
EnumSet<Day> noWeekend = EnumSet.complementOf(weekend);`
        }</Code>
      </div>

      <div className="subsection-header"><h3>CopyOnWriteArraySet</h3></div>
      <div className="card">
        <p>
          <code>CopyOnWriteArraySet&lt;E&gt;</code> (in <code>java.util.concurrent</code>) is backed by a{' '}
          <code>CopyOnWriteArrayList</code>. On every mutating operation (<code>add</code>, <code>remove</code>),
          the entire underlying array is <strong>copied</strong>. Reads are completely lock-free. Best used for{' '}
          <strong>small sets</strong> that are <em>read far more often than written</em>.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>add(E e)</code></td><td>Copies array and appends if not already present</td><td>O(n)</td></tr>
              <tr><td><code>remove(Object o)</code></td><td>Copies array minus the removed element</td><td>O(n)</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Linear scan of snapshot array; no lock</td><td>O(n)</td></tr>
              <tr><td><code>size()</code></td><td>Returns length of current snapshot array</td><td>O(1)</td></tr>
              <tr><td><code>isEmpty()</code></td><td>Checks if snapshot array length is zero</td><td>O(1)</td></tr>
              <tr><td><code>iterator()</code></td><td>Returns snapshot iterator; never throws <code>ConcurrentModificationException</code></td><td>O(1)</td></tr>
              <tr><td><code>clear()</code></td><td>Replaces backing array with empty array</td><td>O(1)</td></tr>
              <tr><td><code>addAll(Collection c)</code></td><td>Copies array and appends all elements not already present</td><td>O(n²)</td></tr>
              <tr><td><code>retainAll(Collection c)</code></td><td>Copies array retaining only elements in <code>c</code></td><td>O(n²)</td></tr>
              <tr><td><code>removeAll(Collection c)</code></td><td>Copies array removing all elements in <code>c</code></td><td>O(n²)</td></tr>
              <tr><td><code>toArray()</code></td><td>Returns snapshot array copy</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>ConcurrentSkipListSet</h3></div>
      <div className="card">
        <p>
          <code>ConcurrentSkipListSet&lt;E&gt;</code> is a <strong>thread-safe sorted set</strong> based on a{' '}
          <code>ConcurrentSkipListMap</code>. It implements <code>NavigableSet</code> and provides the full
          navigation API of <code>TreeSet</code> with <strong>O(log n)</strong> expected time for all operations
          and no global lock (lock-free CAS for concurrent access).
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>add(E e)</code></td><td>Inserts in sorted order; CAS-based; returns <code>false</code> if present</td><td>O(log n)</td></tr>
              <tr><td><code>remove(Object o)</code></td><td>Removes element; CAS-based</td><td>O(log n)</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Lock-free lookup in sorted skip-list</td><td>O(log n)</td></tr>
              <tr><td><code>size()</code></td><td>Traverses to count; not O(1) due to concurrent modifications</td><td>O(n)</td></tr>
              <tr><td><code>first()</code></td><td>Returns current smallest element</td><td>O(log n)</td></tr>
              <tr><td><code>last()</code></td><td>Returns current largest element</td><td>O(log n)</td></tr>
              <tr><td><code>floor(E e)</code></td><td>Greatest element ≤ <code>e</code>, or <code>null</code></td><td>O(log n)</td></tr>
              <tr><td><code>ceiling(E e)</code></td><td>Smallest element ≥ <code>e</code>, or <code>null</code></td><td>O(log n)</td></tr>
              <tr><td><code>pollFirst()</code></td><td>Atomically retrieves and removes the smallest element</td><td>O(log n)</td></tr>
              <tr><td><code>pollLast()</code></td><td>Atomically retrieves and removes the largest element</td><td>O(log n)</td></tr>
              <tr><td><code>iterator()</code></td><td>Weakly-consistent iterator in ascending order</td><td>O(1)</td></tr>
              <tr><td><code>descendingIterator()</code></td><td>Weakly-consistent iterator in descending order</td><td>O(1)</td></tr>
              <tr><td><code>subSet(E from, E to)</code></td><td>Returns a concurrent view of the range</td><td>O(log n)</td></tr>
              <tr><td><code>headSet(E toE)</code></td><td>View of elements strictly &lt; <code>toE</code></td><td>O(log n)</td></tr>
              <tr><td><code>tailSet(E fromE)</code></td><td>View of elements ≥ <code>fromE</code></td><td>O(log n)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📝 TreeSet vs ConcurrentSkipListSet</div>
          Both are sorted NavigableSets. Use <code>TreeSet</code> in single-threaded code (faster in practice). Use{' '}
          <code>ConcurrentSkipListSet</code> when multiple threads read/write concurrently without a coarse lock.
        </div>
      </div>
    </>
  );
}
