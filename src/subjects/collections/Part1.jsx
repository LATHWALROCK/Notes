function Code({ children }) {
  return (
    <div className="code-block">
      <span className="lang-badge">JAVA</span>
      <pre>{children}</pre>
    </div>
  );
}

export default function Part1() {
  return (
    <>
      {/* 1.1 */}
      <div id="s1-1" data-topic-boundary="true" />
      <div className="card">
        <p>
          <strong>The Java Collections Framework (JCF)</strong> is a unified architecture for representing and
          manipulating groups of objects. Introduced in Java 2 (JDK 1.2), it provides:
        </p>
        <ul>
          <li><strong>Interfaces</strong> — abstract data types (List, Set, Queue, Map, Deque, etc.) that define
            contracts independent of implementation.</li>
          <li><strong>Implementations</strong> — concrete classes (ArrayList, HashMap, TreeSet, etc.) that fulfil
            those contracts with different performance trade-offs.</li>
          <li><strong>Algorithms</strong> — static utility methods in <code>java.util.Collections</code> (sort,
            shuffle, binarySearch, min, max, etc.) that operate on any collection.</li>
          <li><strong>Infrastructure</strong> — Iterator, ListIterator, Comparator, Comparable, Spliterator —
            enabling uniform traversal and ordering.</li>
        </ul>
        <p>
          All core interfaces and classes live in <code>java.util</code>. Stream-related extras live in{' '}
          <code>java.util.stream</code>.
        </p>
      </div>

      <div className="subsection-header"><h3>JCF Interface &amp; Class Hierarchy</h3></div>
      <pre className="diagram">{
`java.lang.Iterable<E>
  └── java.util.Collection<E>
        ├── java.util.List<E>
        │     ├── ArrayList<E>          (resizable array, O(1) random access)
        │     ├── LinkedList<E>         (doubly-linked list, also implements Deque)
        │     ├── Vector<E>             (legacy, synchronized)
        │     └── Stack<E>              (legacy LIFO, extends Vector)
        │
        ├── java.util.Set<E>
        │     ├── HashSet<E>            (hash table, O(1) avg add/contains)
        │     ├── LinkedHashSet<E>      (hash table + linked list, insertion order)
        │     └── TreeSet<E>            (Red-Black tree, sorted, O(log n))
        │
        ├── java.util.Queue<E>
        │     ├── LinkedList<E>         (also implements List)
        │     ├── PriorityQueue<E>      (min-heap, O(log n) offer/poll)
        │     └── ArrayDeque<E>         (resizable array deque)
        │
        └── java.util.Deque<E>          (extends Queue)
              ├── ArrayDeque<E>          (preferred stack/queue impl)
              └── LinkedList<E>

java.util.Map<K,V>   (separate hierarchy — NOT a Collection)
  ├── HashMap<K,V>                      (hash table, O(1) avg get/put)
  ├── LinkedHashMap<K,V>               (hash table + linked list, insertion order)
  ├── TreeMap<K,V>                      (Red-Black tree, sorted by key, O(log n))
  ├── Hashtable<K,V>                    (legacy, synchronized)
  └── java.util.SortedMap<K,V>
        └── java.util.NavigableMap<K,V>
              └── TreeMap<K,V>

Additional Interfaces:
  SortedSet<E> → NavigableSet<E> → TreeSet<E>
  BlockingQueue<E> → ArrayBlockingQueue, LinkedBlockingQueue (java.util.concurrent)
  ConcurrentMap<K,V> → ConcurrentHashMap<K,V>`
      }</pre>

      <div className="subsection-header"><h3>Interface Comparison</h3></div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Interface</th><th>Ordering</th><th>Duplicates</th><th>Null Allowed</th><th>Key-Value Pairs</th><th>Common Implementations</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>List</strong></td><td>Insertion order (index-based)</td>
              <td><span className="pill pill-success">Yes</span></td>
              <td><span className="pill pill-success">Yes (multiple)</span></td>
              <td><span className="pill pill-danger">No</span></td>
              <td>ArrayList, LinkedList, Vector</td></tr>
            <tr><td><strong>Set</strong></td><td>No guaranteed order (HashSet); insertion order (LinkedHashSet); sorted (TreeSet)</td>
              <td><span className="pill pill-danger">No</span></td>
              <td><span className="pill pill-warn">At most one null (not TreeSet)</span></td>
              <td><span className="pill pill-danger">No</span></td>
              <td>HashSet, LinkedHashSet, TreeSet</td></tr>
            <tr><td><strong>Queue</strong></td><td>FIFO (LinkedList, ArrayDeque); priority order (PriorityQueue)</td>
              <td><span className="pill pill-success">Yes</span></td>
              <td><span className="pill pill-warn">Impl-dependent (no for PriorityQueue)</span></td>
              <td><span className="pill pill-danger">No</span></td>
              <td>LinkedList, PriorityQueue, ArrayDeque</td></tr>
            <tr><td><strong>Deque</strong></td><td>Both-ends access; FIFO or LIFO</td>
              <td><span className="pill pill-success">Yes</span></td>
              <td><span className="pill pill-warn">ArrayDeque: No; LinkedList: Yes</span></td>
              <td><span className="pill pill-danger">No</span></td>
              <td>ArrayDeque, LinkedList</td></tr>
            <tr><td><strong>Map</strong></td><td>No order (HashMap); insertion order (LinkedHashMap); sorted by key (TreeMap)</td>
              <td>Keys: No; Values: Yes</td>
              <td>Keys: at most 1 null (not TreeMap); Values: yes</td>
              <td><span className="pill pill-success">Yes</span></td>
              <td>HashMap, LinkedHashMap, TreeMap, Hashtable</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout callout-key">
        <div className="callout-title">🔑 Why Use JCF Over Raw Arrays?</div>
        <ul>
          <li><strong>Dynamic sizing</strong> — Collections grow/shrink automatically; arrays have fixed length
            requiring manual resizing and copying.</li>
          <li><strong>Rich built-in API</strong> — Sorting, searching, shuffling, min/max, frequency counting — all
            built in via the <code>Collections</code> utility class and instance methods.</li>
          <li><strong>Type safety with Generics</strong> — Generics prevent <code>ClassCastException</code> at
            compile time; arrays are covariant and can cause runtime errors.</li>
          <li><strong>Interoperability &amp; polymorphism</strong> — Any algorithm coded against{' '}
            <code>Collection&lt;E&gt;</code> works with all implementations; swap ArrayList for LinkedList without
            changing client code.</li>
          <li><strong>Iterator &amp; Stream support</strong> — Uniform traversal, lazy pipelines, parallel processing
            with minimal boilerplate — impossible with plain arrays.</li>
          <li><strong>Consistent null and equality semantics</strong> — <code>equals()</code> and{' '}
            <code>hashCode()</code> handled consistently across all implementations.</li>
          <li><strong>Thread-safe variants ready-made</strong> — <code>Collections.synchronizedList()</code>,{' '}
            <code>CopyOnWriteArrayList</code>, <code>ConcurrentHashMap</code> — no manual locking needed.</li>
          <li><strong>Expressive code</strong> — <code>list.removeIf(x -&gt; x &lt; 0)</code> vs manually compacting
            an array — JCF leads to shorter, more readable code.</li>
        </ul>
      </div>

      {/* 1.2 */}
      <div id="s1-2" data-topic-boundary="true" />
      <div className="card">
        <p>
          <strong><code>java.util.Collection&lt;E&gt;</code></strong> is the root interface of the collection
          hierarchy. It extends <code>java.lang.Iterable&lt;E&gt;</code>, meaning every collection supports the
          enhanced <code>for</code> loop and provides an <code>iterator()</code>.
        </p>
        <p>
          Collection defines the minimum contract that all collections must honour: adding, removing, querying, and
          iterating elements. <strong>Note:</strong> the <code>Collection</code> interface itself does <em>not</em>{' '}
          include index-based methods — those are defined in <code>List</code>. The table below includes both{' '}
          <code>Collection</code> methods and key <code>List</code> methods (marked <em>List</em>) for a complete
          everyday reference.
        </p>
        <p>
          Optional operations (those that may throw <code>UnsupportedOperationException</code> for unmodifiable or
          fixed-size views) are noted in their descriptions.
        </p>
      </div>

      <div className="subsection-header"><h3>All Core Methods — Collection / List Interface</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>boolean add(E e)</code></td>
              <td>Appends element <code>e</code> to the collection. Returns <code>true</code> if the collection
                changed as a result (Sets return <code>false</code> for duplicate elements). Optional operation —
                throws <code>UnsupportedOperationException</code> on immutable views.</td>
              <td>O(1) amortized (ArrayList); O(log n) (TreeSet); O(1) avg (HashSet)</td></tr>
            <tr><td><code>void add(int index, E e)</code> <em>(List)</em></td>
              <td>Inserts element at the specified index, shifting all subsequent elements one position to the
                right. Throws <code>IndexOutOfBoundsException</code> if index &lt; 0 or index &gt; size.</td>
              <td>O(n) (ArrayList — shift); O(1) (LinkedList if iterator at position)</td></tr>
            <tr><td><code>boolean addAll(Collection&lt;? extends E&gt; c)</code></td>
              <td>Appends all elements of collection <code>c</code> to this collection in the order returned by{' '}
                <code>c</code>'s iterator. Returns <code>true</code> if the collection changed. Throws{' '}
                <code>NullPointerException</code> if <code>c</code> is null.</td>
              <td>O(k) where k = c.size(); O(n+k) if array resize needed</td></tr>
            <tr><td><code>boolean addAll(int index, Collection&lt;? extends E&gt; c)</code> <em>(List)</em></td>
              <td>Inserts all elements of <code>c</code> into this list starting at the specified index. Existing
                elements from <code>index</code> onward are shifted right by <code>c.size()</code> positions.</td>
              <td>O(n + k) where k = c.size()</td></tr>
            <tr><td><code>boolean remove(Object o)</code></td>
              <td>Removes the <strong>first occurrence</strong> of element <code>o</code> from the collection using{' '}
                <code>equals()</code>. Returns <code>true</code> if the collection changed. Handles{' '}
                <code>null</code> argument correctly.</td>
              <td>O(n) (ArrayList linear scan); O(log n) (TreeSet); O(1) avg (HashSet)</td></tr>
            <tr><td><code>E remove(int index)</code> <em>(List)</em></td>
              <td>Removes and returns the element at the specified index. All subsequent elements are shifted one
                position left. Throws <code>IndexOutOfBoundsException</code>.</td>
              <td>O(n) (ArrayList shift); O(n) (LinkedList traversal to find position)</td></tr>
            <tr><td><code>boolean removeAll(Collection&lt;?&gt; c)</code></td>
              <td>Removes from this collection every element that is also contained in <code>c</code> (set
                difference: this − c). Returns <code>true</code> if the collection changed as a result. Iterates{' '}
                <code>this</code> and calls <code>c.contains()</code> per element.</td>
              <td>O(n·m) if c is a List; O(n) if c is a HashSet (O(1) contains)</td></tr>
            <tr><td><code>boolean retainAll(Collection&lt;?&gt; c)</code></td>
              <td>Retains only the elements present in <code>c</code> — removes everything else (intersection: this
                ∩ c). Returns <code>true</code> if the collection changed. Iterates <code>this</code> and calls{' '}
                <code>c.contains()</code> per element.</td>
              <td>O(n·m) if c is a List; O(n) if c is a HashSet</td></tr>
            <tr><td><code>E get(int index)</code> <em>(List)</em></td>
              <td>Returns the element at the specified position. Direct array lookup for ArrayList. Throws{' '}
                <code>IndexOutOfBoundsException</code> if index &lt; 0 or index ≥ size.</td>
              <td>O(1) (ArrayList); O(n) (LinkedList)</td></tr>
            <tr><td><code>E set(int index, E element)</code> <em>(List)</em></td>
              <td>Replaces the element at position <code>index</code> with <code>element</code>. Returns the
                element that was previously at that position. Throws <code>IndexOutOfBoundsException</code>.</td>
              <td>O(1) (ArrayList); O(n) (LinkedList)</td></tr>
            <tr><td><code>boolean contains(Object o)</code></td>
              <td>Returns <code>true</code> if the collection contains at least one element equal to{' '}
                <code>o</code> using <code>equals()</code>. Handles <code>null</code>: returns <code>true</code> if
                the collection contains a null element and <code>o</code> is null.</td>
              <td>O(n) (ArrayList/LinkedList); O(1) avg (HashSet); O(log n) (TreeSet)</td></tr>
            <tr><td><code>boolean containsAll(Collection&lt;?&gt; c)</code></td>
              <td>Returns <code>true</code> if this collection contains all elements in <code>c</code>. Iterates
                over <code>c</code> and calls <code>this.contains()</code> for each. Returns <code>true</code> if{' '}
                <code>c</code> is empty.</td>
              <td>O(n·m) if this is a List; O(m) if this is a HashSet</td></tr>
            <tr><td><code>int size()</code></td>
              <td>Returns the number of elements currently in the collection. Returns 0 for an empty collection.
                Stored as a field — no counting. Returns <code>Integer.MAX_VALUE</code> if size exceeds that
                (rare).</td>
              <td>O(1)</td></tr>
            <tr><td><code>boolean isEmpty()</code></td>
              <td>Returns <code>true</code> if the collection contains no elements. Equivalent to{' '}
                <code>size() == 0</code> but preferred — some implementations can check emptiness faster.</td>
              <td>O(1)</td></tr>
            <tr><td><code>void clear()</code></td>
              <td>Removes all elements from the collection. The collection will be empty after this call. Optional
                operation. For ArrayList, nulls out backing array slots and resets <code>size = 0</code> (capacity
                unchanged).</td>
              <td>O(n) (ArrayList nulling refs); O(n) (TreeSet/HashMap clearing buckets)</td></tr>
            <tr><td><code>Iterator&lt;E&gt; iterator()</code></td>
              <td>Returns an <code>Iterator</code> over the elements in this collection. Iteration order depends on
                implementation (insertion order for List/LinkedHashSet; sorted for TreeSet; undefined for HashSet).
                Fail-fast for ArrayList.</td>
              <td>O(1) to obtain; O(n) full traversal</td></tr>
            <tr><td><code>ListIterator&lt;E&gt; listIterator()</code> <em>(List)</em></td>
              <td>Returns a <code>ListIterator</code> positioned before the first element. Supports bidirectional
                traversal (<code>next()</code>/<code>previous()</code>), element replacement (<code>set()</code>),
                and insertion (<code>add()</code>) during iteration.</td>
              <td>O(1)</td></tr>
            <tr><td><code>ListIterator&lt;E&gt; listIterator(int index)</code> <em>(List)</em></td>
              <td>Returns a <code>ListIterator</code> positioned so the first call to <code>next()</code> returns
                the element at <code>index</code>. Throws <code>IndexOutOfBoundsException</code> if index is out of
                range.</td>
              <td>O(1) (ArrayList); O(n) (LinkedList walk to index)</td></tr>
            <tr><td><code>Object[] toArray()</code></td>
              <td>Returns a new <code>Object[]</code> containing all elements in iteration order. The returned
                array is a fresh copy — modifying it does not affect the collection. Does not preserve generic type
                at runtime.</td>
              <td>O(n)</td></tr>
            <tr><td><code>&lt;T&gt; T[] toArray(T[] a)</code></td>
              <td>Returns an array of the runtime type of the argument array. If <code>a</code> is large enough,
                elements are stored in it (trailing <code>null</code> set if larger than needed); otherwise a new
                array of the same component type is allocated and returned.</td>
              <td>O(n)</td></tr>
            <tr><td><code>int indexOf(Object o)</code> <em>(List)</em></td>
              <td>Returns the index of the <strong>first</strong> occurrence of <code>o</code> using{' '}
                <code>equals()</code>, or <code>-1</code> if not found. Scans from index 0. Correctly handles{' '}
                <code>null</code> search.</td>
              <td>O(n)</td></tr>
            <tr><td><code>int lastIndexOf(Object o)</code> <em>(List)</em></td>
              <td>Returns the index of the <strong>last</strong> occurrence of <code>o</code> using{' '}
                <code>equals()</code>, or <code>-1</code> if not found. Scans backward from <code>size-1</code> to
                0.</td>
              <td>O(n)</td></tr>
            <tr><td><code>List&lt;E&gt; subList(int from, int to)</code> <em>(List)</em></td>
              <td>Returns a <strong>view</strong> (not a copy) of the portion of the list between <code>from</code>{' '}
                (inclusive) and <code>to</code> (exclusive). Changes to the view reflect in the original list and
                vice versa. Structural modifications to the original invalidate the view.</td>
              <td>O(1) to create; view operations O(n)</td></tr>
            <tr><td><code>void sort(Comparator&lt;? super E&gt; c)</code> <em>(List, Java 8+)</em></td>
              <td>Sorts the list in-place according to the given <code>Comparator</code>. Pass <code>null</code> to
                use natural ordering (elements must implement <code>Comparable</code>). Internally uses stable
                Timsort via <code>Arrays.sort()</code>.</td>
              <td>O(n log n)</td></tr>
            <tr><td><code>Spliterator&lt;E&gt; spliterator()</code></td>
              <td>(Java 8+) Returns a <code>Spliterator</code> over elements, enabling parallel decomposition for
                parallel streams. For ArrayList, reports <code>ORDERED | SIZED | SUBSIZED</code> characteristics.</td>
              <td>O(1)</td></tr>
            <tr><td><code>Stream&lt;E&gt; stream()</code></td>
              <td>(Java 8+) Returns a sequential <code>Stream</code> with this collection as the source. Enables
                fluent functional-style processing: filter, map, reduce, collect. The stream is lazy — no work done
                until terminal operation.</td>
              <td>O(1) to create stream; pipeline lazy</td></tr>
            <tr><td><code>Stream&lt;E&gt; parallelStream()</code></td>
              <td>(Java 8+) Returns a possibly parallel <code>Stream</code>. Uses the common ForkJoinPool to split
                processing across CPU cores via the Spliterator. Best for computationally intensive,
                order-independent pipelines on large collections.</td>
              <td>O(1) to create stream; pipeline lazy</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout callout-note">
        <div className="callout-title">📝 Collection vs Collections — Don't Confuse Them!</div>
        <ul>
          <li><strong><code>java.util.Collection&lt;E&gt;</code></strong> (singular) — an <em>interface</em>. It is
            the root of the collection hierarchy. Every List, Set, and Queue is a <code>Collection</code>. You
            declare variables as <code>Collection&lt;String&gt; c = new ArrayList&lt;&gt;();</code></li>
          <li><strong><code>java.util.Collections</code></strong> (plural, with <strong>s</strong>) — a{' '}
            <em>utility class</em> with only <code>static</code> methods. It cannot be instantiated (private
            constructor). Provides algorithms: <code>sort()</code>, <code>binarySearch()</code>,{' '}
            <code>shuffle()</code>, <code>reverse()</code>, <code>min()</code>, <code>max()</code>,{' '}
            <code>frequency()</code>, <code>disjoint()</code>, <code>unmodifiableList()</code>,{' '}
            <code>synchronizedList()</code>, <code>singletonList()</code>, <code>emptyList()</code>,{' '}
            <code>nCopies()</code>, <code>fill()</code>, <code>copy()</code>, <code>rotate()</code>,{' '}
            <code>swap()</code> and more.</li>
          <li>Similarly: <code>java.util.Arrays</code> is a utility class for working with primitive and object
            arrays (sort, fill, binarySearch, copyOf, asList, stream).</li>
          <li><strong>Memory tip:</strong> <em>Collection</em> is the blueprint (interface); <em>Collections</em> is
            the toolbox (utility class).</li>
        </ul>
      </div>

      {/* 1.3 */}
      <div id="s1-3" data-topic-boundary="true" />
      <div className="card">
        <p>
          <strong><code>java.util.ArrayList&lt;E&gt;</code></strong> is the most commonly used <code>List</code>{' '}
          implementation. It stores elements in a contiguous <strong><code>Object[]</code> backing array</strong>.
          When elements are added beyond the current capacity, a larger array is allocated, all elements are copied,
          and the old array is discarded.
        </p>
        <ul>
          <li><strong>Package:</strong> <code>java.util</code></li>
          <li><strong>Hierarchy:</strong> <code>AbstractList → AbstractCollection → Object</code>; implements{' '}
            <code>List</code>, <code>RandomAccess</code>, <code>Cloneable</code>, <code>Serializable</code></li>
          <li><strong>Initial capacity:</strong> 10 (default constructor) — backing array is a shared empty array
            and expanded lazily on first <code>add()</code>.</li>
          <li><strong>Growth factor:</strong> <code>newCapacity = oldCapacity + (oldCapacity &gt;&gt; 1)</code> —{' '}
            <strong>1.5×</strong> previous size.</li>
          <li><strong>Random access:</strong> O(1) — direct index into backing array.</li>
          <li><strong>Insert/delete at middle:</strong> O(n) — requires shifting elements via{' '}
            <code>System.arraycopy()</code>.</li>
          <li><strong>Append at end:</strong> O(1) amortized — occasional O(n) resize averaged over many adds equals
            O(1).</li>
          <li><strong>Permits nulls</strong> and <strong>duplicates</strong>; maintains{' '}
            <strong>insertion order</strong>.</li>
          <li><strong>Not synchronized</strong> — use <code>Collections.synchronizedList()</code> or{' '}
            <code>CopyOnWriteArrayList</code> for multi-threaded use.</li>
          <li><strong>Fail-fast iterators</strong> — throw <code>ConcurrentModificationException</code> if the list
            is structurally modified during iteration (except through the iterator's own methods).</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Internal Array Resizing — How It Works</h3></div>
      <pre className="diagram">{
`Initial state (capacity=10, size=0):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │   │   │   │   │   │   │  ← backing Object[] elementData
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
 [0] [1] [2] [3] [4] [5] [6] [7] [8] [9]
size=0, capacity=10

After adding 10 elements (A..J), capacity is exactly full:
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ A │ B │ C │ D │ E │ F │ G │ H │ I │ J │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
size=10, capacity=10

Adding element K triggers resize:
  newCapacity = 10 + (10 >> 1) = 10 + 5 = 15
  Arrays.copyOf(elementData, 15) allocates new array & copies:
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ A │ B │ C │ D │ E │ F │ G │ H │ I │ J │ K │   │   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
size=11, capacity=15    ← old array becomes eligible for GC

Removing element at index 2 (C): D..K must shift left by 1
  System.arraycopy(elementData, 3, elementData, 2, size-3)
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ A │ B │ D │ E │ F │ G │ H │ I │ J │ K │   │   │   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
size=10, capacity=15    ← slot[10] set to null for GC

Inserting element X at index 1: A stays, B..K shift right
  System.arraycopy(elementData, 1, elementData, 2, size-1)
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ A │ X │ B │ D │ E │ F │ G │ H │ I │ J │ K │   │   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
size=11, capacity=15`
      }</pre>

      <div className="subsection-header"><h3>Constructors</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>ArrayList()</code></td>
              <td>Creates an empty list. The backing array is initially a shared empty array
                (<code>DEFAULTCAPACITY_EMPTY_ELEMENTDATA</code>) — no heap allocation until first element is added,
                at which point capacity becomes 10.</td>
              <td>O(1)</td></tr>
            <tr><td><code>ArrayList(int initialCapacity)</code></td>
              <td>Creates an empty list with the specified initial capacity. Allocates a backing array of that
                exact size immediately. Throws <code>IllegalArgumentException</code> if{' '}
                <code>initialCapacity &lt; 0</code>. Use when the expected number of elements is known upfront to
                avoid incremental resizes.</td>
              <td>O(1)</td></tr>
            <tr><td><code>ArrayList(Collection&lt;? extends E&gt; c)</code></td>
              <td>Creates a list containing all elements of collection <code>c</code> in iteration order. Calls{' '}
                <code>c.toArray()</code> then copies the result. If <code>c.toArray()</code> returns a non-Object[]
                array (some impls do), a second <code>Arrays.copyOf</code> ensures Object[] type. Throws{' '}
                <code>NullPointerException</code> if <code>c</code> is null.</td>
              <td>O(n) where n = c.size()</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>All ArrayList Methods</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>boolean add(E e)</code></td>
              <td>Appends element <code>e</code> at the end. Triggers array resize if{' '}
                <code>size == capacity</code> (copies all elements to new 1.5× array). Always returns{' '}
                <code>true</code>.</td>
              <td>O(1) amortized; O(n) worst-case on resize</td></tr>
            <tr><td><code>void add(int index, E e)</code></td>
              <td>Inserts <code>e</code> at position <code>index</code>. All elements from <code>index</code> to{' '}
                <code>size-1</code> are shifted right one position using <code>System.arraycopy()</code>. Index
                range: 0 ≤ index ≤ size. Throws <code>IndexOutOfBoundsException</code> otherwise.</td>
              <td>O(n)</td></tr>
            <tr><td><code>boolean addAll(Collection&lt;? extends E&gt; c)</code></td>
              <td>Appends all elements of <code>c</code> at the end. Converts <code>c</code> to an array, then
                bulk-copies with <code>System.arraycopy()</code>. Triggers resize if needed. Returns{' '}
                <code>true</code> if any elements were added.</td>
              <td>O(k) where k = c.size(); O(n+k) if resize needed</td></tr>
            <tr><td><code>boolean addAll(int index, Collection&lt;? extends E&gt; c)</code></td>
              <td>Inserts all elements of <code>c</code> starting at <code>index</code>. Existing elements from{' '}
                <code>index</code> onward shift right by <code>c.size()</code>. Returns <code>true</code> if list
                changed.</td>
              <td>O(n + k)</td></tr>
            <tr><td><code>E get(int index)</code></td>
              <td>Returns element at position <code>index</code> via direct array lookup:{' '}
                <code>return (E) elementData[index]</code>. Bounds checked. The fastest possible random access — no
                traversal needed.</td>
              <td>O(1)</td></tr>
            <tr><td><code>E set(int index, E element)</code></td>
              <td>Replaces the element at <code>index</code> with <code>element</code>. Returns the old element.
                Direct array write: <code>elementData[index] = element</code>. Does not change <code>size</code> or
                capacity.</td>
              <td>O(1)</td></tr>
            <tr><td><code>E remove(int index)</code></td>
              <td>Removes and returns the element at <code>index</code>. Shifts all elements after{' '}
                <code>index</code> one position left using <code>System.arraycopy()</code>. Sets slot at{' '}
                <code>size-1</code> to <code>null</code> for GC eligibility. Decrements <code>size</code>.</td>
              <td>O(n)</td></tr>
            <tr><td><code>boolean remove(Object o)</code></td>
              <td>Finds the <strong>first occurrence</strong> of <code>o</code> using <code>equals()</code>
                (handles <code>null</code>), then performs the same shift-left as index removal. Returns{' '}
                <code>true</code> if found. Does nothing and returns <code>false</code> if not found.</td>
              <td>O(n)</td></tr>
            <tr><td><code>boolean contains(Object o)</code></td>
              <td>Returns <code>true</code> if list contains element equal to <code>o</code>. Implemented as{' '}
                <code>indexOf(o) &gt;= 0</code>. Scans from front. Handles <code>null</code>: returns{' '}
                <code>true</code> if any null slot exists.</td>
              <td>O(n)</td></tr>
            <tr><td><code>int indexOf(Object o)</code></td>
              <td>Returns index of <strong>first</strong> occurrence of <code>o</code>, or <code>-1</code>. Uses{' '}
                <code>equals()</code>. Null-safe: has a separate branch for <code>o == null</code> that looks for
                null elements.</td>
              <td>O(n)</td></tr>
            <tr><td><code>int lastIndexOf(Object o)</code></td>
              <td>Returns index of <strong>last</strong> occurrence of <code>o</code>, or <code>-1</code>. Iterates
                backward from <code>size-1</code> to 0. Null-safe.</td>
              <td>O(n)</td></tr>
            <tr><td><code>int size()</code></td>
              <td>Returns the number of elements currently stored. Read of the <code>private int size</code> field
                — O(1). This is the logical size, not the capacity of the backing array.</td>
              <td>O(1)</td></tr>
            <tr><td><code>boolean isEmpty()</code></td>
              <td>Returns <code>true</code> iff <code>size == 0</code>. Prefer over <code>size() == 0</code> for
                readability.</td>
              <td>O(1)</td></tr>
            <tr><td><code>void clear()</code></td>
              <td>Removes all elements. Sets each slot from 0 to <code>size-1</code> to <code>null</code> (to allow
                GC of referenced objects), then sets <code>size = 0</code>. The backing array capacity is{' '}
                <strong>not</strong> reduced — call <code>trimToSize()</code> afterward if memory is a concern.</td>
              <td>O(n)</td></tr>
            <tr><td><code>void trimToSize()</code></td>
              <td>Trims the capacity of this ArrayList to its current <code>size</code>. Allocates a new backing
                array of exactly <code>size</code> elements via <code>Arrays.copyOf()</code>. Useful to minimize
                memory after all inserts are complete and no further growth is expected.</td>
              <td>O(n)</td></tr>
            <tr><td><code>void ensureCapacity(int minCapacity)</code></td>
              <td>Ensures the backing array has at least <code>minCapacity</code> slots, growing if necessary. Call
                before a batch of <code>add()</code> calls to avoid repeated incremental resizes. If{' '}
                <code>minCapacity &le; capacity</code>, no action.</td>
              <td>O(n) if resize triggered; O(1) otherwise</td></tr>
            <tr><td><code>List&lt;E&gt; subList(int fromIndex, int toIndex)</code></td>
              <td>Returns a <strong>view</strong> (not a copy) of this list from <code>fromIndex</code> (inclusive)
                to <code>toIndex</code> (exclusive). All operations on the sublist reflect in the original.
                Structural modification of the original list after calling <code>subList()</code> makes the sublist
                invalid (throws <code>ConcurrentModificationException</code>). Classic idiom:{' '}
                <code>list.subList(from, to).clear()</code> to delete a range.</td>
              <td>O(1) to create; O(n) per structural operation on view</td></tr>
            <tr><td><code>Iterator&lt;E&gt; iterator()</code></td>
              <td>Returns a fail-fast <code>Itr</code> iterator. Tracks <code>modCount</code> at creation; throws{' '}
                <code>ConcurrentModificationException</code> if the list is structurally modified while iterating
                except through the iterator's own <code>remove()</code>. Supports <code>hasNext()</code>,{' '}
                <code>next()</code>, <code>remove()</code>.</td>
              <td>O(1)</td></tr>
            <tr><td><code>ListIterator&lt;E&gt; listIterator()</code></td>
              <td>Returns a fail-fast <code>ListItr</code> starting before index 0. Supports bidirectional
                traversal (<code>next()</code>/<code>previous()</code>), <code>hasPrevious()</code>,{' '}
                <code>nextIndex()</code>, <code>previousIndex()</code>, <code>add()</code>, <code>set()</code>,{' '}
                <code>remove()</code>.</td>
              <td>O(1)</td></tr>
            <tr><td><code>ListIterator&lt;E&gt; listIterator(int index)</code></td>
              <td>Returns a <code>ListIterator</code> starting at <code>index</code> — the next call to{' '}
                <code>next()</code> returns element at <code>index</code>. Throws{' '}
                <code>IndexOutOfBoundsException</code>. Useful for inserting into the middle of a list efficiently.</td>
              <td>O(1)</td></tr>
            <tr><td><code>Object[] toArray()</code></td>
              <td>Returns a new <code>Object[]</code> snapshot of all elements in order. Backed by a fresh{' '}
                <code>Arrays.copyOf()</code> — completely independent of the list. <strong>Caveat:</strong> runtime
                type is <code>Object[]</code>, not <code>E[]</code>, due to erasure.</td>
              <td>O(n)</td></tr>
            <tr><td><code>&lt;T&gt; T[] toArray(T[] a)</code></td>
              <td>Returns a typed array. If <code>a.length ≥ size</code>, elements are placed in <code>a</code> and
                slot <code>a[size]</code> is set to <code>null</code>. If <code>a.length &lt; size</code>, a new
                array of <code>a</code>'s runtime type and size <code>n</code> is returned. Idiom:{' '}
                <code>list.toArray(new String[0])</code> is preferred (JVM can optimize better than pre-sizing).</td>
              <td>O(n)</td></tr>
            <tr><td><code>void sort(Comparator&lt;? super E&gt; c)</code></td>
              <td>Sorts the list in-place. Internally calls <code>Arrays.sort((E[]) elementData, 0, size, c)</code>{' '}
                which uses a <strong>stable Timsort</strong>. Pass <code>null</code> for natural ordering. Equal
                elements retain their relative order. Equivalent to <code>Collections.sort(list, c)</code>.</td>
              <td>O(n log n)</td></tr>
            <tr><td><code>boolean removeIf(Predicate&lt;? super E&gt; filter)</code></td>
              <td>(Java 8+) Removes all elements for which <code>filter.test(element)</code> returns{' '}
                <code>true</code>. Uses a bitset to track indices to remove in one pass, then compacts the array in
                a second pass. Avoids the pitfalls of removing during iterator traversal. Returns{' '}
                <code>true</code> if any element was removed.</td>
              <td>O(n)</td></tr>
            <tr><td><code>void replaceAll(UnaryOperator&lt;E&gt; operator)</code></td>
              <td>(Java 8+) Replaces each element with the result of applying <code>operator</code> to that
                element. Equivalent to: <code>for (int i=0; i&lt;size; i++) set(i, operator.apply(get(i)))</code>.
                Modifies in-place — does not change size or capacity.</td>
              <td>O(n)</td></tr>
            <tr><td><code>void forEach(Consumer&lt;? super E&gt; action)</code></td>
              <td>(Java 8+, from <code>Iterable</code>) Performs <code>action</code> on each element in iteration
                order. Slightly faster than an external for-each loop because it avoids iterator creation overhead
                and accesses <code>elementData[]</code> directly.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Spliterator&lt;E&gt; spliterator()</code></td>
              <td>(Java 8+) Returns an <code>ArrayListSpliterator</code> with characteristics{' '}
                <code>ORDERED | SIZED | SUBSIZED</code>. Used by <code>stream()</code> and{' '}
                <code>parallelStream()</code> for efficient splitting of the list across ForkJoinPool worker
                threads.</td>
              <td>O(1)</td></tr>
            <tr><td><code>Stream&lt;E&gt; stream()</code></td>
              <td>(Java 8+) Returns a sequential, lazy <code>Stream</code> backed by this list. No computation
                happens until a terminal operation (<code>collect</code>, <code>forEach</code>, <code>reduce</code>,
                etc.) is called. Enables filter/map/reduce/collect pipelines.</td>
              <td>O(1) to create</td></tr>
            <tr><td><code>Stream&lt;E&gt; parallelStream()</code></td>
              <td>(Java 8+) Returns a possibly parallel <code>Stream</code>. The ForkJoinCommonPool splits the list
                using <code>spliterator()</code> for concurrent processing. Best for large collections with
                stateless, CPU-intensive operations. Use cautiously with stateful or order-dependent logic.</td>
              <td>O(1) to create</td></tr>
            <tr><td><code>int hashCode()</code></td>
              <td>Computed as: <code>31 * result + (e==null ? 0 : e.hashCode())</code> for each element in order
                (from <code>AbstractList</code>). Two lists with equal elements in equal order always produce equal
                hash codes.</td>
              <td>O(n)</td></tr>
            <tr><td><code>boolean equals(Object o)</code></td>
              <td>Returns <code>true</code> if <code>o</code> is a <code>List</code> with the same size and all
                corresponding elements pairwise equal (by <code>equals()</code>). Order matters — unlike Set
                equality.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Object clone()</code></td>
              <td>Returns a <strong>shallow copy</strong> of this ArrayList. A new ArrayList is created with a copy
                of the backing array, but the element objects themselves are shared (same references). Modifying
                elements in the clone affects the original if elements are mutable objects.</td>
              <td>O(n)</td></tr>
            <tr><td><code>boolean containsAll(Collection&lt;?&gt; c)</code></td>
              <td>Returns <code>true</code> if this list contains all elements in <code>c</code>. Iterates over{' '}
                <code>c</code> and calls <code>contains()</code> for each. Slow for large lists — consider
                converting <code>this</code> to a <code>HashSet</code> first for frequent containment checks.</td>
              <td>O(n·m)</td></tr>
            <tr><td><code>boolean removeAll(Collection&lt;?&gt; c)</code></td>
              <td>Removes from this list all elements found in <code>c</code>. Iterates this list and checks each
                element via <code>c.contains()</code>. Returns <code>true</code> if any element was removed. Tip:
                wrap <code>c</code> in a <code>HashSet</code> if <code>c</code> is large for faster lookups.</td>
              <td>O(n·m); O(n) with HashSet c</td></tr>
            <tr><td><code>boolean retainAll(Collection&lt;?&gt; c)</code></td>
              <td>Retains only elements present in <code>c</code>; removes all others. Returns <code>true</code> if
                the list changed. Internally: iterate, call <code>c.contains()</code>, compact survivors. Tip: use a{' '}
                <code>HashSet</code> for <code>c</code> for O(n) performance.</td>
              <td>O(n·m); O(n) with HashSet c</td></tr>
            <tr><td><code>protected void removeRange(int fromIndex, int toIndex)</code></td>
              <td>Removes all elements between <code>fromIndex</code> (inclusive) and <code>toIndex</code>
                (exclusive). Protected — not accessible directly. Use the idiom{' '}
                <code>list.subList(from, to).clear()</code> which calls this internally. More efficient than
                calling <code>remove()</code> repeatedly.</td>
              <td>O(n)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Collections Utility Methods for ArrayList</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>Collections.sort(List&lt;T&gt; list)</code></td>
              <td>Sorts the list according to natural ordering. Elements must implement <code>Comparable</code>.
                Uses stable Timsort internally. Equivalent to <code>list.sort(null)</code> since Java 8.</td>
              <td>O(n log n)</td></tr>
            <tr><td><code>Collections.sort(List&lt;T&gt; list, Comparator&lt;? super T&gt; c)</code></td>
              <td>Sorts using the given comparator. Stable — equal elements keep their relative order. Essential
                for multi-criteria sorts (e.g., sort by age then by name).</td>
              <td>O(n log n)</td></tr>
            <tr><td><code>Collections.binarySearch(List list, T key)</code></td>
              <td>Searches a <strong>pre-sorted</strong> list for <code>key</code> using natural ordering. Returns
                the index if found; otherwise returns <code>-(insertion point) - 1</code>.{' '}
                <strong>List must be sorted ascending before calling</strong> or results are undefined.</td>
              <td>O(log n)</td></tr>
            <tr><td><code>Collections.binarySearch(List list, T key, Comparator c)</code></td>
              <td>Binary search using the given comparator. List must be sorted by the same comparator. Returns
                index if found or <code>-(insertion point) - 1</code> if not.</td>
              <td>O(log n)</td></tr>
            <tr><td><code>Collections.reverse(List&lt;?&gt; list)</code></td>
              <td>Reverses the order of elements in the list in-place. Uses a two-pointer swap approach from both
                ends toward the center. Modifies the original list.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.shuffle(List&lt;?&gt; list)</code></td>
              <td>Randomly permutes all elements of the list in-place using a default <code>Random</code> source.
                Useful for testing and randomized algorithms.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.shuffle(List&lt;?&gt; list, Random rnd)</code></td>
              <td>Randomly permutes using a specified <code>Random</code> source. Pass{' '}
                <code>new Random(seed)</code> for reproducible shuffles in tests.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.min(Collection&lt;? extends T&gt; coll)</code></td>
              <td>Returns the minimum element according to natural ordering (elements must implement{' '}
                <code>Comparable</code>). Iterates the entire collection. Throws{' '}
                <code>NoSuchElementException</code> if empty.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.max(Collection&lt;? extends T&gt; coll)</code></td>
              <td>Returns the maximum element according to natural ordering. Iterates the entire collection. Throws{' '}
                <code>NoSuchElementException</code> if empty.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.min(Collection coll, Comparator c)</code></td>
              <td>Returns the minimum element according to the given comparator. Elements do not need to implement{' '}
                <code>Comparable</code>.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.max(Collection coll, Comparator c)</code></td>
              <td>Returns the maximum element according to the given comparator. Iterates once through the
                collection.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.frequency(Collection&lt;?&gt; c, Object o)</code></td>
              <td>Returns the number of elements in <code>c</code> equal to <code>o</code> using{' '}
                <code>equals()</code>. Linear scan.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.fill(List&lt;? super T&gt; list, T obj)</code></td>
              <td>Replaces all elements in the list with the specified object <code>obj</code>. Every slot is set
                to the same reference. Does not change list size.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.copy(List&lt;? super T&gt; dest, List&lt;? extends T&gt; src)</code></td>
              <td>Copies all elements from <code>src</code> into <code>dest</code> starting at index 0.{' '}
                <code>dest</code> must be at least as large as <code>src</code> (<code>dest.size() ≥ src.size()</code>)
                or throws <code>IndexOutOfBoundsException</code>.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.nCopies(int n, T o)</code></td>
              <td>Returns an <strong>immutable</strong> list with <code>n</code> copies of object <code>o</code>.
                All elements are the same reference. Efficient — backed by a single-element internal structure.
                Useful to initialize an ArrayList: <code>new ArrayList&lt;&gt;(Collections.nCopies(100, 0))</code>.</td>
              <td>O(1)</td></tr>
            <tr><td><code>Collections.unmodifiableList(List&lt;? extends T&gt; list)</code></td>
              <td>Returns an unmodifiable view of the list. Any mutating call (<code>add</code>, <code>set</code>,{' '}
                <code>remove</code>, etc.) throws <code>UnsupportedOperationException</code>. The underlying list
                can still be modified directly — this is a view, not a deep-immutable copy.</td>
              <td>O(1) to wrap; O(1) reads</td></tr>
            <tr><td><code>Collections.synchronizedList(List&lt;T&gt; list)</code></td>
              <td>Returns a thread-safe (synchronized) wrapper. Every method is synchronized on the wrapper object.{' '}
                <strong>Iteration still requires manual synchronization:</strong>{' '}
                <code>synchronized(syncList) {'{'} for (T e : syncList) {'{...}'} {'}'}</code> to avoid{' '}
                <code>ConcurrentModificationException</code>.</td>
              <td>O(1) to wrap</td></tr>
            <tr><td><code>Collections.disjoint(Collection&lt;?&gt; c1, Collection&lt;?&gt; c2)</code></td>
              <td>Returns <code>true</code> if the two collections have <strong>no elements in common</strong>.
                Iterates the smaller collection and calls <code>contains()</code> on the larger. Pass a{' '}
                <code>Set</code> as the second argument for O(n) performance.</td>
              <td>O(n·m); O(n) if one is a Set</td></tr>
            <tr><td><code>Collections.swap(List&lt;?&gt; list, int i, int j)</code></td>
              <td>Swaps the elements at positions <code>i</code> and <code>j</code> in the list. Uses a temporary
                variable.</td>
              <td>O(1)</td></tr>
            <tr><td><code>Collections.rotate(List&lt;?&gt; list, int distance)</code></td>
              <td>Rotates the elements by <code>distance</code> positions. Positive = rotate right (toward higher
                indices), negative = rotate left. Element at index <code>i</code> goes to index{' '}
                <code>(i + distance) % size</code>.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.replaceAll(List&lt;T&gt; list, T oldVal, T newVal)</code></td>
              <td>Replaces all occurrences of <code>oldVal</code> with <code>newVal</code> using{' '}
                <code>equals()</code> for comparison. Returns <code>true</code> if at least one replacement was
                made.</td>
              <td>O(n)</td></tr>
            <tr><td><code>Collections.indexOfSubList(List&lt;?&gt; src, List&lt;?&gt; target)</code></td>
              <td>Returns the starting index of the <strong>first</strong> occurrence of <code>target</code> as a
                contiguous subsequence of <code>src</code>, or <code>-1</code> if not found.</td>
              <td>O(n × m)</td></tr>
            <tr><td><code>Collections.lastIndexOfSubList(List&lt;?&gt; src, List&lt;?&gt; target)</code></td>
              <td>Returns the starting index of the <strong>last</strong> occurrence of <code>target</code> in{' '}
                <code>src</code>, or <code>-1</code>.</td>
              <td>O(n × m)</td></tr>
            <tr><td><code>Collections.singletonList(T o)</code></td>
              <td>Returns an <strong>immutable</strong> list containing only the single specified object. Size is
                always 1. Useful to pass a single-element list where a list is required.</td>
              <td>O(1)</td></tr>
            <tr><td><code>Collections.emptyList()</code></td>
              <td>Returns an <strong>immutable empty</strong> list. Type-safe. Preferred over{' '}
                <code>new ArrayList&lt;&gt;()</code> when an empty, unmodifiable list is needed (e.g., as a default
                method return value).</td>
              <td>O(1)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Complete Code Example — Create, Add, Access, Sort, Stream</h3></div>
      <Code>{
`import java.util.*;
import java.util.stream.*;

public class ArrayListDemo {
    public static void main(String[] args) {

        // ── 1. CONSTRUCTORS ──
        ArrayList<String> fruits = new ArrayList<>();          // default cap 10
        ArrayList<Integer> nums  = new ArrayList<>(50);      // initial cap 50
        List<String> copy  = new ArrayList<>(fruits);         // copy constructor

        // ── 2. ADDING ELEMENTS ──
        fruits.add("Cherry");                       // [Cherry]
        fruits.add("Apple");                        // [Cherry, Apple]
        fruits.add("Mango");                        // [Cherry, Apple, Mango]
        fruits.add(1, "Banana");                   // [Cherry, Banana, Apple, Mango]
        fruits.addAll(List.of("Grape", "Kiwi"));  // [Cherry, Banana, Apple, Mango, Grape, Kiwi]
        fruits.addAll(2, Arrays.asList("Peach", "Plum"));
        System.out.println(fruits);

        // ── 3. ACCESSING & UPDATING ──
        String first = fruits.get(0);         // O(1) — "Cherry"
        fruits.set(0, "Coconut");              // O(1) — replace index 0
        int idx  = fruits.indexOf("Apple");    // O(n)
        int last = fruits.lastIndexOf("Kiwi"); // O(n)
        boolean has = fruits.contains("Mango"); // O(n)

        // ── 4. REMOVING ELEMENTS ──
        fruits.remove("Grape");    // by object — O(n)
        fruits.remove(0);          // by index — O(n) shift
        fruits.removeIf(s -> s.startsWith("P")); // removes Peach, Plum — O(n)

        // ── 5. ITERATION — four patterns ──
        // a) Classic for-loop (use when you need the index)
        for (int i = 0; i < fruits.size(); i++)
            System.out.print(fruits.get(i) + " ");

        // b) Enhanced for-loop
        for (String s : fruits) System.out.print(s + " ");

        // c) ListIterator — bidirectional, supports add/set during iteration
        ListIterator<String> lit = fruits.listIterator(fruits.size());
        while (lit.hasPrevious())
            System.out.print(lit.previous() + " ");  // reverse order

        // d) forEach lambda
        fruits.forEach(s -> System.out.print(s.toUpperCase() + " "));

        // ── 6. SORTING ──
        Collections.sort(fruits);          // natural order (alphabetical)
        fruits.sort(null);                  // same — null = natural order

        // Custom Comparator — by length ascending, then alphabetically
        fruits.sort(Comparator
            .comparingInt(String::length)
            .thenComparing(Comparator.naturalOrder()));

        // Reverse order
        fruits.sort(Comparator.reverseOrder());

        // Lambda comparator — sort integers descending
        nums.addAll(List.of(5, 2, 8, 1, 9, 3));
        nums.sort((a, b) -> b - a);  // descending

        // ── 7. BINARY SEARCH ──
        Collections.sort(fruits);   // MUST be sorted first!
        int pos = Collections.binarySearch(fruits, "Kiwi");
        // pos >= 0 — found at that index
        // pos < 0  — not found; insertion point = -(pos+1)

        // ── 8. BULK UTILITY OPERATIONS ──
        String min = Collections.min(fruits);         // lexicographic min
        String max = Collections.max(fruits);         // lexicographic max
        int    freq = Collections.frequency(fruits, "Kiwi");
        Collections.shuffle(fruits, new Random(42));   // reproducible shuffle
        Collections.reverse(fruits);
        Collections.rotate(fruits, 2);                // rotate right by 2
        Collections.swap(fruits, 0, fruits.size()-1); // swap first & last

        // ── 9. REPLACE ALL ELEMENTS ──
        fruits.replaceAll(String::toUpperCase);       // O(n)

        // ── 10. SUBLIST OPERATIONS ──
        List<String> sub = fruits.subList(1, 3);        // view only
        sub.clear();  // removes elements 1..2 from fruits too!

        // ── 11. STREAM PIPELINE ──
        List<String> result = fruits.stream()
            .filter(s -> s.length() > 4)
            .map(String::toLowerCase)
            .sorted()
            .collect(Collectors.toList());

        // ── 12. MEMORY MANAGEMENT ──
        fruits.ensureCapacity(1000);  // pre-allocate before bulk inserts
        fruits.trimToSize();          // reclaim unused capacity after inserts

        // ── 13. CONVERT TO ARRAY ──
        Object[]  objArr  = fruits.toArray();                  // Object[]
        String[]  strArr  = fruits.toArray(new String[0]);    // typed, preferred

        // ── 14. THREAD-SAFE WRAPPERS ──
        List<String> syncList = Collections.synchronizedList(fruits);
        synchronized(syncList) {          // still need this around iteration!
            for (String s : syncList) System.out.println(s);
        }
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Thread Safety Warning</div>
        <p>
          <strong>ArrayList is NOT synchronized.</strong> If multiple threads access an ArrayList concurrently and
          at least one thread modifies it structurally (add, remove, resize), the behavior is undefined — you may
          get garbled data, <code>ArrayIndexOutOfBoundsException</code>, or an infinite loop in the worst case.
        </p>
        <p>
          Additionally, the internal <strong><code>modCount</code></strong> field tracks structural modifications.
          An iterator captures <code>modCount</code> at creation; if the list is modified outside the iterator
          during traversal, it throws <code>ConcurrentModificationException</code> on the next iterator call.
        </p>
        <p><strong>Thread-safe alternatives:</strong></p>
        <ul>
          <li><code>Collections.synchronizedList(new ArrayList&lt;&gt;())</code> — wraps every method in{' '}
            <code>synchronized</code>. <strong>Still requires manual synchronization around iteration blocks.</strong></li>
          <li><code>CopyOnWriteArrayList&lt;E&gt;</code> (<code>java.util.concurrent</code>) — each write creates a
            fresh copy of the backing array. Reads are lock-free and never throw{' '}
            <code>ConcurrentModificationException</code>. Best for read-heavy, rarely-written lists. Write
            operations are expensive (O(n) per write).</li>
          <li><code>Vector&lt;E&gt;</code> (legacy) — synchronized on every method but coarser-grained; generally
            avoided in modern code.</li>
        </ul>
      </div>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Arrays.asList() vs List.of() — Know the Differences</div>
        <div className="table-wrap" style={{ marginTop: '10px' }}>
          <table>
            <thead><tr><th>Feature</th><th><code>Arrays.asList(T... a)</code></th><th><code>List.of(T... elements)</code> (Java 9+)</th></tr></thead>
            <tbody>
              <tr><td><strong>Can call set()</strong></td>
                <td><span className="pill pill-success">Yes</span> — elements are replaceable</td>
                <td><span className="pill pill-danger">No</span> — throws <code>UnsupportedOperationException</code></td></tr>
              <tr><td><strong>Can call add() / remove()</strong></td>
                <td><span className="pill pill-danger">No</span> — fixed size; throws <code>UnsupportedOperationException</code></td>
                <td><span className="pill pill-danger">No</span> — fully immutable</td></tr>
              <tr><td><strong>Null elements</strong></td>
                <td><span className="pill pill-success">Allowed</span></td>
                <td><span className="pill pill-danger">Not allowed</span> — throws <code>NullPointerException</code></td></tr>
              <tr><td><strong>Backed by original array</strong></td>
                <td><span className="pill pill-success">Yes</span> — <code>set()</code> writes reflect in the source array</td>
                <td><span className="pill pill-danger">No</span> — fully independent</td></tr>
              <tr><td><strong>Serializable</strong></td>
                <td><span className="pill pill-success">Yes</span></td>
                <td><span className="pill pill-success">Yes</span></td></tr>
              <tr><td><strong>RandomAccess</strong></td>
                <td><span className="pill pill-success">Yes</span></td>
                <td><span className="pill pill-success">Yes</span></td></tr>
              <tr><td><strong>Convert to mutable list</strong></td>
                <td><code>new ArrayList&lt;&gt;(Arrays.asList(a, b, c))</code></td>
                <td><code>new ArrayList&lt;&gt;(List.of(a, b, c))</code></td></tr>
              <tr><td><strong>Best use case</strong></td>
                <td>Quick list from array; when <code>set()</code> is needed</td>
                <td>Truly immutable constants; defensive API returns</td></tr>
            </tbody>
          </table>
        </div>
        <Code>{
`// Arrays.asList — fixed-size, elements replaceable, allows null, backed by array
String[] arr = {"A", "B", "C"};
List<String> asList = Arrays.asList(arr);
asList.set(0, "Z");       // ✓ OK — also sets arr[0] = "Z"!
asList.add("D");          // ✗ UnsupportedOperationException — fixed size
asList.add(null);         // ✗ UnsupportedOperationException (fixed-size, not null)
Arrays.asList("A", null); // ✓ null elements are allowed

// List.of — fully immutable, no nulls (Java 9+)
List<String> immutable = List.of("A", "B", "C");
immutable.set(0, "Z");   // ✗ UnsupportedOperationException
immutable.add("D");       // ✗ UnsupportedOperationException
List.of("A", null);        // ✗ NullPointerException at creation time

// Convert either to a fully mutable ArrayList
List<String> mutable1 = new ArrayList<>(Arrays.asList("A", "B"));
List<String> mutable2 = new ArrayList<>(List.of("A", "B"));
mutable1.add("C");  mutable2.add("C");  // ✓ Both work fine now

// Tip: List.copyOf() (Java 10+) — unmodifiable copy with no nulls
List<String> safeCopy = List.copyOf(mutable1);  // throws NPE if any element is null`
        }</Code>
      </div>

      {/* 1.4 */}
      <div id="s14" data-topic-boundary="true" />
      <div className="card">
        <p>
          <strong>LinkedList</strong> is a doubly-linked list implementation that implements <em>both</em> the{' '}
          <code>List</code> and <code>Deque</code> interfaces. Each element is stored in a <strong>node</strong>
          that holds references to the previous and next nodes, enabling O(1) insert/delete at either end. Random
          access by index requires traversal, giving O(n) get/set.
        </p>
        <ul>
          <li>Part of <code>java.util</code> — no import beyond <code>java.util.LinkedList</code> needed</li>
          <li>Not thread-safe — wrap with <code>Collections.synchronizedList()</code> if needed</li>
          <li>Allows <code>null</code> elements</li>
          <li>Can be used as a <strong>List</strong>, <strong>Stack</strong>, or <strong>Queue/Deque</strong></li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Node Structure</h3></div>
      <pre className="diagram">{
`  NULL ◄──                                          ──► NULL
       │                                          │
┌──────┴───────┐     ┌──────────────┐     ┌───────┴──────┐
│ prev │ "A"  │─────▶│ prev │ "B"  │─────▶│ prev │ "C"  │
│ null │ next │◀─────│  &A  │ next │◀─────│  &B  │ null │
└──────────────┘     └──────────────┘     └──────────────┘
  head (first)           node              tail (last)

Each node: [prev pointer | data | next pointer]
head.prev == null,  tail.next == null`
      }</pre>

      <div className="subsection-header"><h3>Constructors</h3></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><code>LinkedList()</code></td><td>Creates an empty doubly-linked list</td><td>Size = 0</td></tr>
              <tr><td><code>LinkedList(Collection&lt;? extends E&gt; c)</code></td>
                <td>Creates list from existing collection, preserving iteration order</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>All Methods — List &amp; Deque</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td colSpan={3} style={{ background: 'var(--pill-bg)', fontWeight: 700, color: 'var(--primary-accent)', fontSize: '.8rem', letterSpacing: '.05em' }}>LIST METHODS</td></tr>
            <tr><td><code>add(E e)</code></td><td>Appends element to the end of the list</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>add(int index, E e)</code></td><td>Inserts element at specified position; shifts subsequent elements right</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>get(int index)</code></td><td>Returns element at index; traverses from nearest end</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>set(int index, E e)</code></td><td>Replaces element at index with specified element</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>remove(int index)</code></td><td>Removes element at index and returns it; adjusts pointers</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>remove(Object o)</code></td><td>Removes first occurrence of the specified object</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>size()</code></td><td>Returns number of elements in the list</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>contains(Object o)</code></td><td>Returns true if list contains the specified element</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>indexOf(Object o)</code></td><td>Returns index of first occurrence, or -1 if not found</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>clear()</code></td><td>Removes all elements; nulls all node references to aid GC</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>toArray()</code></td><td>Returns an Object array containing all elements in order</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td colSpan={3} style={{ background: 'var(--pill-bg)', fontWeight: 700, color: 'var(--primary-accent)', fontSize: '.8rem', letterSpacing: '.05em' }}>DEQUE METHODS</td></tr>
            <tr><td><code>addFirst(E e)</code></td><td>Inserts element at the front of the list</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>addLast(E e)</code></td><td>Appends element to the end of the list (same as add)</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>getFirst()</code></td><td>Returns first element; throws <code>NoSuchElementException</code> if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>getLast()</code></td><td>Returns last element; throws <code>NoSuchElementException</code> if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>removeFirst()</code></td><td>Removes and returns first element; throws if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>removeLast()</code></td><td>Removes and returns last element; throws if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>peekFirst()</code></td><td>Returns first element without removing; returns null if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>peekLast()</code></td><td>Returns last element without removing; returns null if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>offerFirst(E e)</code></td><td>Inserts element at front; returns true (deque is unbounded)</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>offerLast(E e)</code></td><td>Inserts element at end; returns true (deque is unbounded)</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>pollFirst()</code></td><td>Retrieves and removes first element; returns null if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>pollLast()</code></td><td>Retrieves and removes last element; returns null if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>push(E e)</code></td><td>Pushes element onto stack represented by this list (calls addFirst)</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>pop()</code></td><td>Pops element from stack represented by this list (calls removeFirst)</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>peek()</code></td><td>Retrieves but does not remove head; returns null if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Code Example — List, Stack, and Queue</h3></div>
      <Code>{
`import java.util.LinkedList;
import java.util.Deque;
import java.util.Queue;

public class LinkedListDemo {
    public static void main(String[] args) {

        // ── 1. As a List ──
        LinkedList<String> list = new LinkedList<>();
        list.add("B");
        list.addFirst("A");          // ["A","B"]
        list.addLast("C");           // ["A","B","C"]
        list.add(1, "X");            // ["A","X","B","C"]
        System.out.println(list.get(2));   // B
        list.remove("X");            // ["A","B","C"]

        // ── 2. As a Stack (LIFO) ──
        Deque<Integer> stack = new LinkedList<>();
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println(stack.peek());  // 30 (top)
        System.out.println(stack.pop());   // 30, stack=[20,10]

        // ── 3. As a Queue (FIFO) ──
        Queue<String> queue = new LinkedList<>();
        queue.offer("first");
        queue.offer("second");
        queue.offer("third");
        System.out.println(queue.peek());  // "first"
        System.out.println(queue.poll());  // "first", queue=["second","third"]
    }
}`
      }</Code>

      <div className="subsection-header"><h3>ArrayList vs LinkedList Comparison</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Operation</th><th>ArrayList</th><th>LinkedList</th></tr></thead>
          <tbody>
            <tr><td><strong>Access by index</strong></td>
              <td><span className="pill pill-success">O(1)</span> — direct array offset</td>
              <td><span className="pill pill-danger">O(n)</span> — must traverse nodes</td></tr>
            <tr><td><strong>Insert at head</strong></td>
              <td><span className="pill pill-danger">O(n)</span> — shift all elements right</td>
              <td><span className="pill pill-success">O(1)</span> — rewire head pointer</td></tr>
            <tr><td><strong>Insert at tail</strong></td>
              <td><span className="pill pill-success">O(1)</span> amortized — append to array</td>
              <td><span className="pill pill-success">O(1)</span> — rewire tail pointer</td></tr>
            <tr><td><strong>Insert at middle</strong></td>
              <td><span className="pill pill-danger">O(n)</span> — shift elements</td>
              <td><span className="pill pill-warn">O(n)</span> — traverse + O(1) rewire</td></tr>
            <tr><td><strong>Memory overhead</strong></td>
              <td>Low — contiguous array, no node objects</td>
              <td>High — each node = object + 2 pointers (~24 bytes)</td></tr>
            <tr><td><strong>Best use case</strong></td>
              <td>Frequent reads, rare inserts/deletes</td>
              <td>Frequent inserts/deletes at ends, queue/deque usage</td></tr>
          </tbody>
        </table>
      </div>

      {/* 1.5 */}
      <div id="s15" data-topic-boundary="true" />
      <div className="card">
        <p>
          <strong>Vector</strong> is a <em>synchronized</em> dynamic array — essentially the thread-safe predecessor
          to <code>ArrayList</code>. Every public method is synchronized, making it safe for concurrent access but
          slower under single-threaded use. It was part of the original Java 1.0 API and is now considered{' '}
          <strong>legacy</strong>.
        </p>
        <ul>
          <li>Default initial capacity: <strong>10</strong></li>
          <li>Default growth: <strong>doubles</strong> the current capacity when full</li>
          <li>With <code>capacityIncrement &gt; 0</code>: grows by that fixed amount instead</li>
          <li>Every method is <code>synchronized</code> — causes contention under heavy load</li>
          <li>Allows <code>null</code> elements; maintains insertion order</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Constructors</h3></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><code>Vector()</code></td><td>Creates empty vector with initial capacity 10; doubles on growth</td><td>Most common</td></tr>
              <tr><td><code>Vector(int initialCapacity)</code></td><td>Creates empty vector with specified initial capacity; doubles on growth</td><td>Avoids early resizes</td></tr>
              <tr><td><code>Vector(int initialCapacity, int capacityIncrement)</code></td><td>Creates vector with given capacity; grows by capacityIncrement (doubles if 0)</td><td>Predictable growth</td></tr>
              <tr><td><code>Vector(Collection&lt;? extends E&gt; c)</code></td><td>Creates vector from an existing collection in iteration order</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>All Methods</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>add(E e)</code></td><td>Appends element to end; may trigger capacity growth</td><td><span className="pill pill-success">O(1)</span> amortized</td></tr>
            <tr><td><code>add(int index, E e)</code></td><td>Inserts element at index; shifts subsequent elements right</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>addElement(E e)</code></td><td>Legacy: appends element to end; equivalent to <code>add(E)</code></td><td><span className="pill pill-success">O(1)</span> amortized</td></tr>
            <tr><td><code>get(int index)</code></td><td>Returns element at index with bounds checking</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>elementAt(int index)</code></td><td>Legacy: returns element at index; equivalent to <code>get(int)</code></td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>set(int index, E e)</code></td><td>Replaces element at index; returns old element</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>setElementAt(E e, int index)</code></td><td>Legacy: replaces element at index; no return value</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>remove(int index)</code></td><td>Removes element at index; shifts subsequent elements left</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>remove(Object o)</code></td><td>Removes first occurrence of the specified object</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>removeElement(Object o)</code></td><td>Legacy: removes first occurrence; returns boolean success indicator</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>removeElementAt(int index)</code></td><td>Legacy: removes element at index; shifts elements left</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>removeAllElements()</code></td><td>Legacy: removes all elements; equivalent to <code>clear()</code></td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>size()</code></td><td>Returns the number of elements currently in the vector</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>capacity()</code></td><td>Returns the current internal array capacity (≥ size)</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>isEmpty()</code></td><td>Returns true if the vector contains no elements</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>contains(Object o)</code></td><td>Returns true if vector contains at least one occurrence of element</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>indexOf(Object o)</code></td><td>Returns index of first occurrence, or -1 if not present</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>lastIndexOf(Object o)</code></td><td>Returns index of last occurrence, or -1 if not present</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>firstElement()</code></td><td>Returns first element; throws <code>NoSuchElementException</code> if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>lastElement()</code></td><td>Returns last element; throws <code>NoSuchElementException</code> if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>copyInto(Object[] anArray)</code></td><td>Copies all elements into the provided array starting at index 0</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>trimToSize()</code></td><td>Trims internal array capacity to current size; releases unused memory</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>ensureCapacity(int minCapacity)</code></td><td>Ensures capacity is at least minCapacity; may trigger reallocation</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>clear()</code></td><td>Removes all elements and nulls internal array slots</td><td><span className="pill pill-warn">O(n)</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Capacity Growth Behaviour</h3></div>
      <pre className="diagram">{
`capacityIncrement = 0  (default — doubles):
┌─────────────────────────────────────────────┐
│  capacity:  10  →  20  →  40  →  80  →  160  →  ...  │
│  on fill:   double  double  double  double   double  │
└─────────────────────────────────────────────┘

capacityIncrement = 5  (fixed increment):
┌─────────────────────────────────────────────┐
│  capacity:  10  →  15  →  20  →  25  →  30  →  ...   │
│  on fill:   +5      +5      +5      +5      +5       │
└─────────────────────────────────────────────┘

Note: ArrayList always grows by ~50% (capacity + capacity/2)`
      }</pre>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Vector is Legacy — Prefer ArrayList</div>
        <p>
          Every method in <code>Vector</code> is <code>synchronized</code>, causing unnecessary overhead in
          single-threaded code. For <strong>thread-safe</strong> use, prefer{' '}
          <code>Collections.synchronizedList(new ArrayList&lt;&gt;())</code> or <code>CopyOnWriteArrayList</code>.
          For <strong>general use</strong>, prefer <code>ArrayList</code>. <code>Vector</code> exists mainly for
          backward compatibility.
        </p>
      </div>

      <div className="subsection-header"><h3>Vector vs ArrayList vs CopyOnWriteArrayList</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Feature</th><th>Vector</th><th>ArrayList</th><th>CopyOnWriteArrayList</th></tr></thead>
          <tbody>
            <tr><td><strong>Thread-safe</strong></td>
              <td><span className="pill pill-success">Yes</span> — all methods synchronized</td>
              <td><span className="pill pill-danger">No</span></td>
              <td><span className="pill pill-success">Yes</span> — copy-on-write</td></tr>
            <tr><td><strong>Performance</strong></td><td>Slow (synchronization overhead)</td><td>Fast (no locking)</td><td>Fast reads; slow writes</td></tr>
            <tr><td><strong>Growth strategy</strong></td><td>Doubles (or +increment)</td><td>Grows by 50%</td><td>New array on each write</td></tr>
            <tr><td><strong>Null elements</strong></td><td>Allowed</td><td>Allowed</td><td>Allowed</td></tr>
            <tr><td><strong>Iterator type</strong></td><td>Fail-fast (throws CME)</td><td>Fail-fast (throws CME)</td><td>Snapshot — never throws CME</td></tr>
          </tbody>
        </table>
      </div>

      {/* 1.6 */}
      <div id="s16" data-topic-boundary="true" />
      <div className="card">
        <p>
          <strong>Stack</strong> extends <code>Vector</code> and represents a <em>Last-In-First-Out (LIFO)</em>{' '}
          data structure. It adds five operations — <code>push</code>, <code>pop</code>, <code>peek</code>,{' '}
          <code>empty</code>, and <code>search</code> — on top of the full <code>Vector</code> API. Because it
          inherits <code>Vector</code>, all operations are <strong>synchronized</strong>.
        </p>
        <ul>
          <li>Introduced in Java 1.0 — considered <strong>legacy</strong></li>
          <li>Inherits all 24+ <code>Vector</code> methods (get, add, remove, etc.)</li>
          <li>The <code>search()</code> method returns a 1-based distance from the top</li>
          <li>Thread-safe due to <code>Vector</code> synchronization, but with contention cost</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Constructor</h3></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><code>Stack()</code></td><td>Creates an empty stack backed by an empty Vector (capacity 10)</td><td>Only constructor</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>Stack-Specific Methods</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>push(E item)</code></td><td>Pushes item onto the top of the stack; returns the item</td><td><span className="pill pill-success">O(1)</span> amortized</td></tr>
            <tr><td><code>pop()</code></td><td>Removes and returns the top item; throws <code>EmptyStackException</code> if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>peek()</code></td><td>Returns top item without removing it; throws <code>EmptyStackException</code> if empty</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>empty()</code></td><td>Returns true if the stack contains no elements</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>search(Object o)</code></td><td>Returns 1-based position from top (1 = top); returns -1 if not found</td><td><span className="pill pill-warn">O(n)</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Code Example</h3></div>
      <Code>{
`import java.util.Stack;

public class StackDemo {
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();

        // push — add to top
        stack.push(10);
        stack.push(20);
        stack.push(30);   // stack = [10, 20, 30]  — top is 30

        // peek — look at top without removing
        System.out.println(stack.peek());   // 30

        // pop — remove from top
        System.out.println(stack.pop());    // 30 — stack = [10, 20]

        // search — 1-based distance from top
        stack.push(40);  // stack = [10, 20, 40]
        System.out.println(stack.search(40)); // 1  (top)
        System.out.println(stack.search(20)); // 2  (one below top)
        System.out.println(stack.search(10)); // 3  (bottom)
        System.out.println(stack.search(99)); // -1 (not found)

        // empty check
        System.out.println(stack.empty());   // false
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Prefer ArrayDeque as a Stack</div>
        <p>
          The Java documentation itself recommends using <code>Deque&lt;E&gt; stack = new ArrayDeque&lt;&gt;()</code>{' '}
          instead of <code>Stack</code>. <code>ArrayDeque</code> is <strong>faster</strong> (no synchronization
          overhead), <strong>not legacy</strong>, and provides a <strong>richer API</strong>. Use{' '}
          <code>Stack</code> only when interoperating with existing legacy code.
        </p>
        <Code>{
`// Preferred modern approach
Deque<Integer> stack = new ArrayDeque<>();
stack.push(10);     // addFirst
stack.push(20);
System.out.println(stack.peek());  // 20
System.out.println(stack.pop());   // 20`
        }</Code>
      </div>

      {/* 1.7 */}
      <div id="s17" data-topic-boundary="true" />
      <div className="card">
        <p>
          <strong>CopyOnWriteArrayList</strong> is a thread-safe variant of <code>ArrayList</code> from the{' '}
          <code>java.util.concurrent</code> package. The key mechanism: every <em>mutating</em> operation (add,
          set, remove) creates a <strong>brand-new copy</strong> of the underlying array, writes to it, then
          atomically swaps it in. Meanwhile, all <em>readers</em> continue using the old array — no locking required
          for reads.
        </p>
        <ul>
          <li>Part of <code>java.util.concurrent</code> — import{' '}
            <code>java.util.concurrent.CopyOnWriteArrayList</code></li>
          <li>Reads are <strong>lock-free</strong> and very fast</li>
          <li>Writes allocate + copy the entire array — O(n) per write operation</li>
          <li>Iterator reflects a <strong>point-in-time snapshot</strong> — never throws{' '}
            <code>ConcurrentModificationException</code></li>
          <li>Best for <strong>read-heavy</strong>, <strong>write-rare</strong> scenarios (e.g., event listener
            lists)</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>How Copy-On-Write Works</h3></div>
      <pre className="diagram">{
`Initial state:
┌──────────────────────────────────────────┐
│  array ref ──▶  [ A | B | C | D ]        │  ← readers hold this ref
└──────────────────────────────────────────┘

Thread 1: add("E")  — write operation
┌───────────────────────────────────────────────────────────┐
│  1. Copy array  ──▶  [ A | B | C | D | _ ]  (new array)   │
│  2. Write "E"   ──▶  [ A | B | C | D | E ]                │
│  3. Atomic swap:  array ref ──▶ new array                 │
└───────────────────────────────────────────────────────────┘

Thread 2 (iterating concurrently):
┌──────────────────────────────────────────┐
│  Still sees:  [ A | B | C | D ]           │  ← snapshot from before write
│  No ConcurrentModificationException!      │
└──────────────────────────────────────────┘`
      }</pre>

      <div className="subsection-header"><h3>Constructors</h3></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><code>CopyOnWriteArrayList()</code></td><td>Creates an empty list with an empty internal array</td><td>Most common</td></tr>
              <tr><td><code>CopyOnWriteArrayList(Collection&lt;? extends E&gt; c)</code></td><td>Creates list with all elements from collection in iteration order</td><td>O(n) copy</td></tr>
              <tr><td><code>CopyOnWriteArrayList(Object[] toCopyIn)</code></td><td>Creates list holding a copy of the provided array</td><td>O(n) copy</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>All Methods</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td colSpan={3} style={{ background: 'var(--pill-bg)', fontWeight: 700, color: 'var(--primary-accent)', fontSize: '.8rem', letterSpacing: '.05em' }}>WRITE OPERATIONS (copy whole array each time)</td></tr>
            <tr><td><code>add(E e)</code></td><td>Appends element to end; copies entire array then adds element</td><td><span className="pill pill-danger">O(n)</span></td></tr>
            <tr><td><code>add(int index, E e)</code></td><td>Inserts element at index; copies and shifts subsequent elements</td><td><span className="pill pill-danger">O(n)</span></td></tr>
            <tr><td><code>addIfAbsent(E e)</code></td><td>Appends element only if it is not already present; scans then copies</td><td><span className="pill pill-danger">O(n)</span></td></tr>
            <tr><td><code>addAllAbsent(Collection&lt;? extends E&gt; c)</code></td><td>Adds all elements not already present; O(n*m) where m = collection size</td><td><span className="pill pill-danger">O(n·m)</span></td></tr>
            <tr><td><code>set(int index, E e)</code></td><td>Replaces element at index; copies entire array to perform mutation</td><td><span className="pill pill-danger">O(n)</span></td></tr>
            <tr><td><code>remove(int index)</code></td><td>Removes element at index; copies and compacts the array</td><td><span className="pill pill-danger">O(n)</span></td></tr>
            <tr><td><code>remove(Object o)</code></td><td>Removes first occurrence of element; copies array without it</td><td><span className="pill pill-danger">O(n)</span></td></tr>
            <tr><td><code>clear()</code></td><td>Replaces internal array reference with a new empty array</td><td><span className="pill pill-danger">O(n)</span></td></tr>
            <tr><td colSpan={3} style={{ background: 'var(--pill-bg)', fontWeight: 700, color: 'var(--primary-accent)', fontSize: '.8rem', letterSpacing: '.05em' }}>READ OPERATIONS (lock-free)</td></tr>
            <tr><td><code>get(int index)</code></td><td>Returns element at index from current snapshot — no locking</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>contains(Object o)</code></td><td>Returns true if current snapshot contains the element</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>size()</code></td><td>Returns number of elements in the current snapshot</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>isEmpty()</code></td><td>Returns true if the current snapshot contains no elements</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>iterator()</code></td><td>Returns iterator over a point-in-time snapshot; never throws CME</td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td><code>toArray()</code></td><td>Returns a copy of the current snapshot as an Object array</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>indexOf(Object o)</code></td><td>Returns index of first occurrence in snapshot, or -1 if absent</td><td><span className="pill pill-warn">O(n)</span></td></tr>
            <tr><td><code>lastIndexOf(Object o)</code></td><td>Returns index of last occurrence in snapshot, or -1 if absent</td><td><span className="pill pill-warn">O(n)</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>CopyOnWriteArrayList vs synchronizedList vs Vector</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Feature</th><th>CopyOnWriteArrayList</th><th>Collections.synchronizedList</th><th>Vector</th></tr></thead>
          <tbody>
            <tr><td><strong>Thread-safe</strong></td><td><span className="pill pill-success">Yes</span></td><td><span className="pill pill-success">Yes</span></td><td><span className="pill pill-success">Yes</span></td></tr>
            <tr><td><strong>Read performance</strong></td><td><span className="pill pill-success">Excellent</span> — no locking</td><td><span className="pill pill-warn">Moderate</span> — synchronized</td><td><span className="pill pill-warn">Moderate</span> — synchronized</td></tr>
            <tr><td><strong>Write performance</strong></td><td><span className="pill pill-danger">Slow</span> — full array copy</td><td><span className="pill pill-warn">Moderate</span> — single lock</td><td><span className="pill pill-warn">Moderate</span> — method lock</td></tr>
            <tr><td><strong>Iterator safety</strong></td><td>Snapshot — no CME ever</td><td>Must manually synchronize block during iteration</td><td>Fail-fast — throws CME</td></tr>
            <tr><td><strong>Iteration while writing</strong></td><td><span className="pill pill-success">Safe</span> — sees old snapshot</td><td><span className="pill pill-danger">Unsafe</span> without extra lock</td><td><span className="pill pill-danger">Throws CME</span></td></tr>
            <tr><td><strong>Memory</strong></td><td>High — creates full copy per write</td><td>Low — single array</td><td>Low — single array</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout callout-key">
        <div className="callout-title">🔑 When to Use CopyOnWriteArrayList</div>
        <ul>
          <li><strong>Read-heavy workloads</strong> — e.g., observer/listener lists where traversal vastly
            outnumbers mutation</li>
          <li><strong>Concurrent iteration without locking</strong> — no need to wrap loops in synchronized blocks</li>
          <li><strong>No ConcurrentModificationException</strong> is acceptable — iterators always see a
            consistent snapshot</li>
          <li><strong>Avoid when</strong>: writes are frequent or the list is large — copying on every write
            becomes expensive in both time and memory</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Code Example</h3></div>
      <Code>{
`import java.util.concurrent.CopyOnWriteArrayList;
import java.util.Iterator;

public class COWALDemo {
    public static void main(String[] args) {
        CopyOnWriteArrayList<String> list =
                new CopyOnWriteArrayList<>();

        list.add("alpha");
        list.add("beta");
        list.add("gamma");

        // Snapshot iterator — safe to iterate while another thread mutates
        Iterator<String> it = list.iterator();  // snapshot taken here
        list.add("delta");                      // new array; iterator unaffected

        while (it.hasNext()) {
            System.out.print(it.next() + " "); // prints: alpha beta gamma
        }
        System.out.println("\\nFinal: " + list); // [alpha, beta, gamma, delta]

        // addIfAbsent — avoids duplicates atomically
        list.addIfAbsent("beta");   // ignored — already exists
        list.addIfAbsent("epsilon"); // added
        System.out.println(list.size()); // 5
    }
}`
      }</Code>
    </>
  );
}
