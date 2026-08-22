function Code({ children }) {
  return (
    <div className="code-block">
      <span className="lang-badge">JAVA</span>
      <pre>{children}</pre>
    </div>
  );
}

export default function Part2() {
  return (
    <>
      <h1 className="part-title">Part 2 — Map Types</h1>

      {/* 2.1 */}
      <div className="section-header anchor" id="partC">
        <div className="section-badge">2.1</div>
        <h2>Map Interface</h2>
      </div>
      <div className="card">
        <p>
          <strong>Map</strong> stores <strong>key-value pairs</strong> where every key is unique. It is{' '}
          <em>not</em> part of the <code>Collection</code> hierarchy — <code>Map&lt;K,V&gt;</code> is its own root
          interface. It models a mathematical function mapping keys to values.
        </p>
        <ul>
          <li>Each key maps to exactly one value (duplicate keys overwrite the previous value).</li>
          <li>Keys must be immutable (or at least stable w.r.t. <code>hashCode</code> / <code>equals</code>).</li>
          <li>Values may be duplicated and may be <code>null</code> (implementation-dependent).</li>
          <li>Three collection views: <code>keySet()</code>, <code>values()</code>, <code>entrySet()</code>.</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>All Methods — Map&lt;K,V&gt;</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>put(K key, V value)</code></td><td>Associates value with key; returns previous value or null</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>get(Object key)</code></td><td>Returns value for key, or null if absent</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>remove(Object key)</code></td><td>Removes mapping for key; returns removed value or null</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>containsKey(Object key)</code></td><td>Returns true if map contains the specified key</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>containsValue(Object value)</code></td><td>Returns true if map maps any key to value (linear scan)</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>size()</code></td><td>Returns number of key-value mappings</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>isEmpty()</code></td><td>Returns true if map contains no mappings</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>clear()</code></td><td>Removes all mappings from the map</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>keySet()</code></td><td>Returns a Set view of keys; backed by the map</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>values()</code></td><td>Returns a Collection view of values; backed by the map</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>entrySet()</code></td><td>Returns a Set view of Map.Entry pairs; backed by the map</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>putAll(Map&lt;? extends K,? extends V&gt; m)</code></td><td>Copies all mappings from m into this map</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>putIfAbsent(K key, V value)</code></td><td>Puts value only if key not already present; returns existing or null</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>getOrDefault(Object key, V defaultValue)</code></td><td>Returns value for key, or defaultValue if key absent</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>replace(K key, V value)</code></td><td>Replaces value only if key is mapped; returns old value</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>replace(K key, V oldVal, V newVal)</code></td><td>Replaces entry only if currently mapped to oldVal</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>remove(Object key, Object value)</code></td><td>Removes entry only if key maps to specified value</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>compute(K key, BiFunction&lt;K,V,V&gt; f)</code></td><td>Computes new mapping for key; removes if f returns null</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>computeIfAbsent(K key, Function&lt;K,V&gt; f)</code></td><td>Computes value only if key absent or mapped to null</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>computeIfPresent(K key, BiFunction&lt;K,V,V&gt; f)</code></td><td>Recomputes value only if key present with non-null value</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>merge(K key, V value, BiFunction&lt;V,V,V&gt; f)</code></td><td>Merges given value with existing; inserts if absent</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>forEach(BiConsumer&lt;K,V&gt; action)</code></td><td>Performs action for each entry in iteration order</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>replaceAll(BiFunction&lt;K,V,V&gt; f)</code></td><td>Replaces every entry's value with result of applying f</td><td><span className="pill">O(n)</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Map.Entry&lt;K,V&gt; Interface</h3></div>
      <div className="card">
        <p>Represents a single key-value pair. Obtained via <code>map.entrySet()</code>.</p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>getKey()</code></td><td>Returns the key corresponding to this entry</td><td><span className="pill">O(1)</span></td></tr>
              <tr><td><code>getValue()</code></td><td>Returns the value corresponding to this entry</td><td><span className="pill">O(1)</span></td></tr>
              <tr><td><code>setValue(V value)</code></td><td>Replaces the value for this entry; reflects in the backing map</td><td><span className="pill">O(1)</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2.2 */}
      <div className="section-header anchor" id="hashmap">
        <div className="section-badge">2.2</div>
        <h2>HashMap</h2>
      </div>
      <div className="card">
        <p>
          <strong>HashMap&lt;K,V&gt;</strong> is the most widely used <code>Map</code> implementation. It is backed
          by a <strong>hash table</strong> (array of buckets), offers <strong>O(1) average</strong> time for
          put/get/remove, and permits <em>one null key</em> and multiple null values. It is{' '}
          <strong>not synchronized</strong>.
        </p>
        <ul>
          <li>Ordering: <strong>unordered</strong> — iteration order is not guaranteed.</li>
          <li>Default initial capacity: <strong>16</strong>; default load factor: <strong>0.75</strong>.</li>
          <li>Rehashing doubles capacity when <code>size &gt; capacity × loadFactor</code>.</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Constructors</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>HashMap()</code></td><td>Initial capacity 16, load factor 0.75</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>HashMap(int initialCapacity)</code></td><td>Custom initial capacity, load factor 0.75</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>HashMap(int initialCapacity, float loadFactor)</code></td><td>Custom capacity and load factor</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>HashMap(Map&lt;? extends K, ? extends V&gt; m)</code></td><td>Constructs from existing map; copies all entries</td><td><span className="pill">O(n)</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Internal Architecture — Deep Dive</h3></div>
      <div className="card">
        <p>
          <strong>Step 1 — Hash function:</strong> <code>key.hashCode()</code> is computed, then spread across bits
          via XOR-shift (<code>h ^ (h &gt;&gt;&gt; 16)</code>) to reduce clustering. Bucket index ={' '}
          <code>hash &amp; (n - 1)</code> (bitwise AND — works because capacity is always a power of 2).
        </p>
        <p><strong>Step 2 — Bucket array:</strong> An array of <code>Node&lt;K,V&gt;[]</code> (the "table"). Each
          slot can be null (empty), a single node, a linked list of nodes, or a red-black tree.</p>
        <p><strong>Step 3 — Collision handling:</strong></p>
        <ul>
          <li>Two keys with the same bucket index form a <strong>linked list</strong> (chaining).</li>
          <li>When a chain reaches <strong>TREEIFY_THRESHOLD = 8</strong> nodes, it is converted to a{' '}
            <strong>Red-Black Tree</strong>, reducing worst-case lookup from O(n) to O(log n).</li>
          <li>If the tree shrinks back to <strong>UNTREEIFY_THRESHOLD = 6</strong>, it reverts to a linked list.</li>
          <li>Treeification only happens if <code>capacity &gt;= MIN_TREEIFY_CAPACITY (64)</code>; otherwise a
            resize is triggered first.</li>
        </ul>
        <p><strong>Step 4 — Rehashing:</strong> When <code>size &gt; capacity × 0.75</code> the table is doubled and
          all entries are redistributed. Amortized cost is O(1) per insertion.</p>
      </div>

      <pre className="diagram">{
`HashMap internal layout
──────────────────────────────────────────────────────
  table[] (capacity = 16, then 32, 64 … on resize)
  ┌───┐
  │ 0 │──▶ null
  │ 1 │──▶ [k1,v1]──▶[k2,v2]──▶[k3,v3]  ← linked list (chain < 8)
  │ 2 │──▶ null
  │ 3 │──▶ [k4,v4]  ← single entry
  │ 4 │──▶ RBTree{ [k5,v5],[k6,v6]…[k12,v12] }  ← chain reached 8 → treeified
  │ … │
  │15 │──▶ null
  └───┘

  Hash path:  key.hashCode()  →  h ^ (h>>>16)  →  idx = hash & (n-1)

  TREEIFY_THRESHOLD   = 8   (list → Red-Black Tree)
  UNTREEIFY_THRESHOLD = 6   (tree → list on shrink)
  MIN_TREEIFY_CAPACITY= 64  (resize instead of treeify below this)
  DEFAULT_LOAD_FACTOR = 0.75
──────────────────────────────────────────────────────`
      }</pre>

      <div className="subsection-header"><h3>All Methods — HashMap</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>put(K key, V value)</code></td><td>Inserts or updates; handles null key in bucket 0</td><td><span className="pill">O(1) avg</span> / <span className="pill pill-danger">O(n) worst</span></td></tr>
            <tr><td><code>get(Object key)</code></td><td>Retrieves value; traverses chain/tree at bucket</td><td><span className="pill">O(1) avg</span> / <span className="pill pill-danger">O(n) worst</span></td></tr>
            <tr><td><code>remove(Object key)</code></td><td>Removes and unlinks node; rebalances tree if needed</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>containsKey(Object key)</code></td><td>Checks bucket and chain/tree for key existence</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>containsValue(Object value)</code></td><td>Linear scan through all buckets and chains</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>size()</code></td><td>Returns cached entry count</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>isEmpty()</code></td><td>Returns <code>size == 0</code></td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>clear()</code></td><td>Nulls all bucket slots; resets size</td><td><span className="pill">O(capacity)</span></td></tr>
            <tr><td><code>keySet()</code></td><td>Returns live Set view of keys</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>values()</code></td><td>Returns live Collection view of values</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>entrySet()</code></td><td>Returns live Set&lt;Map.Entry&gt; view</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>putAll(Map m)</code></td><td>Bulk insert; may trigger resize</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>putIfAbsent(K key, V value)</code></td><td>Inserts only if key absent or null-valued</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>getOrDefault(Object key, V def)</code></td><td>Returns value or default without modifying map</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>replace(K key, V value)</code></td><td>Updates value only if key exists</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>replace(K key, V old, V nw)</code></td><td>Conditional replace; CAS-like semantics</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>remove(Object key, Object value)</code></td><td>Removes only if key/value matches exactly</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>compute(K key, BiFunction f)</code></td><td>Atomically computes new value; removes if f returns null</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>computeIfAbsent(K key, Function f)</code></td><td>Computes and stores value only if key missing</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>computeIfPresent(K key, BiFunction f)</code></td><td>Recomputes only if key mapped to non-null value</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>merge(K key, V val, BiFunction f)</code></td><td>Inserts val if absent; applies f(existing, val) otherwise</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>forEach(BiConsumer action)</code></td><td>Iterates all entries applying action</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>replaceAll(BiFunction f)</code></td><td>Replaces all values in-place using f(key, value)</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>clone()</code></td><td>Shallow copy of the HashMap</td><td><span className="pill">O(n)</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Code Example</h3></div>
      <Code>{
`Map<String, Integer> scores = new HashMap<>();

// ── Basic operations ──
scores.put("Alice", 95);
scores.put("Bob",   82);
scores.put("Carol", 88);
scores.put("Alice", 97);   // overwrites 95 → 97

int a = scores.get("Alice");     // 97
int x = scores.getOrDefault("Dan", 0); // 0 (absent)

scores.putIfAbsent("Bob", 999);    // no-op, Bob already present
scores.putIfAbsent("Eve", 70);     // inserts Eve → 70

// ── entrySet iteration ──
for (Map.Entry<String, Integer> e : scores.entrySet()) {
    System.out.println(e.getKey() + " → " + e.getValue());
}

// ── compute: increment visit counter ──
scores.compute("Alice", (k, v) -> v == null ? 1 : v + 1); // 98

// ── merge: add bonus points, insert if absent ──
scores.merge("Bob", 5, Integer::sum);   // Bob: 82 + 5 = 87
scores.merge("Zed", 50, Integer::sum);  // Zed: 50 (new entry)

// ── forEach ──
scores.forEach((name, score) ->
    System.out.printf("%-8s %d%n", name, score));`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Thread Safety</div>
        <p>
          <strong>HashMap is not thread-safe.</strong> Concurrent modifications without synchronization can cause
          infinite loops (Java 6) or data loss. Use <code>ConcurrentHashMap</code> for concurrent scenarios, or
          wrap with <code>Collections.synchronizedMap()</code> when moderate contention is acceptable.
        </p>
      </div>

      {/* 2.3 */}
      <div className="section-header anchor" id="linkedhashmap">
        <div className="section-badge">2.3</div>
        <h2>LinkedHashMap</h2>
      </div>
      <div className="card">
        <p>
          <strong>LinkedHashMap&lt;K,V&gt;</strong> extends <code>HashMap</code> and adds a{' '}
          <strong>doubly-linked list</strong> running through all entries. This preserves either{' '}
          <strong>insertion order</strong> (default) or <strong>access order</strong> (<code>accessOrder = true</code>),
          making iteration predictable and enabling the classic <strong>LRU cache pattern</strong>.
        </p>
        <ul>
          <li>All hash-table operations remain O(1) average — the linked list adds only constant overhead.</li>
          <li>In access-order mode, <code>get()</code> and <code>getOrDefault()</code> also move the entry to the
            tail.</li>
          <li>Override <code>removeEldestEntry()</code> to build a self-evicting bounded cache.</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Constructors</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>LinkedHashMap()</code></td><td>Insertion-order, capacity 16, load factor 0.75</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>LinkedHashMap(int capacity)</code></td><td>Insertion-order, custom capacity</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>LinkedHashMap(int capacity, float loadFactor)</code></td><td>Custom capacity and load factor, insertion-order</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>LinkedHashMap(int capacity, float loadFactor, boolean accessOrder)</code></td><td>Full control; <code>true</code> enables access-order (LRU)</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>LinkedHashMap(Map&lt;? extends K, ? extends V&gt; m)</code></td><td>Insertion-order copy from existing map</td><td><span className="pill">O(n)</span></td></tr>
          </tbody>
        </table>
      </div>

      <pre className="diagram">{
`LinkedHashMap — insertion-order doubly-linked list through bucket entries
─────────────────────────────────────────────────────────────────────────
  Bucket table (hash-indexed):
  ┌───┐  ┌───┐  ┌───┐  ┌───┐
  │ 3 │  │ 7 │  │11 │  │ 1 │   ← bucket indices (hash & mask)
  └─┬─┘  └─┬─┘  └─┬─┘  └─┬─┘
    │       │       │       │
  [A,1]   [B,2]   [C,3]   [D,4]
    │                           LinkedList
    │  head                                   tail
    └─[A,1] ── [B,2] ── [C,3] ── [D,4] ──▶ null
               ▲ prev    next ▲

  Insertion order:  A → B → C → D  (same order as put() calls)
  Access-order:     after get(B) →  A → C → D → B  (B moves to tail)
─────────────────────────────────────────────────────────────────────────`
      }</pre>

      <div className="subsection-header"><h3>LRU Cache Example</h3></div>
      <Code>{
`// Self-evicting LRU Cache using LinkedHashMap
class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int maxSize;

    LRUCache(int maxSize) {
        // accessOrder=true: get() moves entry to tail → LRU order
        super(maxSize, 0.75f, true);
        this.maxSize = maxSize;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > maxSize;  // evict head (least recently used)
    }
}

LRUCache<Integer, String> cache = new LRUCache<>(3);
cache.put(1, "one");
cache.put(2, "two");
cache.put(3, "three");
// cache: {1=one, 2=two, 3=three}

cache.get(1);            // access 1 → moves to tail
// access order now: 2, 3, 1

cache.put(4, "four");   // evicts eldest = 2 (LRU)
// cache: {3=three, 1=one, 4=four}

System.out.println(cache.containsKey(2)); // false — evicted!
System.out.println(cache.keySet());       // [3, 1, 4]`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Best Use Cases</div>
        <p>
          <strong>LinkedHashMap</strong> is perfect for: (1) LRU caches with <code>accessOrder=true</code> and{' '}
          <code>removeEldestEntry</code>, (2) building ordered JSON-like maps where key iteration order must match
          insertion order, and (3) any algorithm that needs map semantics <em>plus</em> predictable iteration.
        </p>
      </div>

      {/* 2.4 */}
      <div className="section-header anchor" id="weakhashmap">
        <div className="section-badge">2.4</div>
        <h2>WeakHashMap</h2>
      </div>
      <div className="card">
        <p>
          <strong>WeakHashMap&lt;K,V&gt;</strong> holds keys using <strong>weak references</strong>{' '}
          (<code>java.lang.ref.WeakReference</code>). When a key object has <em>no strong or soft references</em>{' '}
          elsewhere in the program, the garbage collector may collect it — and the corresponding map entry is then
          automatically removed on the next map operation.
        </p>
        <ul>
          <li>Keys are weakly referenced; <strong>values are strongly referenced</strong>. Values must not hold
            strong back-references to their keys, or entries will never be cleared.</li>
          <li>Entry removal is triggered lazily — map is cleaned on the next structural operation (put, get, size,
            etc.).</li>
          <li>Like HashMap: unordered, allows null key and values, <strong>not thread-safe</strong>.</li>
          <li><code>size()</code> may over-report by a small margin until stale entries are expunged.</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Constructors</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>WeakHashMap()</code></td><td>Default capacity 16, load factor 0.75</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>WeakHashMap(int capacity)</code></td><td>Custom initial capacity, load factor 0.75</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>WeakHashMap(int capacity, float loadFactor)</code></td><td>Custom capacity and load factor</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>WeakHashMap(Map&lt;? extends K, ? extends V&gt; m)</code></td><td>Copies all entries from existing map</td><td><span className="pill">O(n)</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>All Methods — WeakHashMap</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>put(K key, V value)</code></td><td>Stores entry with weak reference to key; expunges stale entries first</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>get(Object key)</code></td><td>Retrieves value; may return null if key was collected</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>remove(Object key)</code></td><td>Removes mapping explicitly; also expunges stale entries</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>containsKey(Object key)</code></td><td>Returns false if key was GC-collected even if entry not yet expunged</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>containsValue(Object value)</code></td><td>Linear scan after expunging stale entries</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>size()</code></td><td>Returns entry count after expunging stale entries (may still lag GC)</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>isEmpty()</code></td><td>Returns true if no live entries remain</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>clear()</code></td><td>Removes all entries, clears reference queue</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>keySet()</code></td><td>Returns Set view of live (non-collected) keys</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>values()</code></td><td>Returns Collection view of values for live keys</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>entrySet()</code></td><td>Returns Set&lt;Map.Entry&gt; view; stale entries excluded</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>putAll(Map m)</code></td><td>Bulk insert with weak key references</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>putIfAbsent(K key, V value)</code></td><td>Inserts only if key absent; treats GC-collected as absent</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>getOrDefault(Object key, V def)</code></td><td>Returns value or default; null returned for collected keys</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>replace(K key, V value)</code></td><td>Updates value only if key is present and not GC-collected</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>replace(K key, V old, V nw)</code></td><td>Conditional replace</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>remove(Object key, Object value)</code></td><td>Removes entry only if key/value matches</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>compute(K key, BiFunction f)</code></td><td>Atomically computes new value for key</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>computeIfAbsent(K key, Function f)</code></td><td>Computes and stores if key absent</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>computeIfPresent(K key, BiFunction f)</code></td><td>Recomputes only if key present</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>merge(K key, V val, BiFunction f)</code></td><td>Merges value with existing entry</td><td><span className="pill">O(1) avg</span></td></tr>
            <tr><td><code>forEach(BiConsumer action)</code></td><td>Applies action to each live entry</td><td><span className="pill">O(n)</span></td></tr>
            <tr><td><code>replaceAll(BiFunction f)</code></td><td>Replaces all live values using f(key, value)</td><td><span className="pill">O(n)</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Code Example — Entry Auto-Removal After GC</h3></div>
      <Code>{
`WeakHashMap<Object, String> cache = new WeakHashMap<>();

Object key1 = new Object();  // strong reference
Object key2 = new Object();  // strong reference

cache.put(key1, "data-for-key1");
cache.put(key2, "data-for-key2");
System.out.println(cache.size());  // 2

// Drop strong reference to key2 — eligible for GC
key2 = null;
System.gc();  // suggest GC (not guaranteed immediately)

// After GC and next map operation, stale entry is expunged
cache.size();   // triggers expunge of stale entries
System.out.println(cache.size());        // 1 (key2 entry gone)
System.out.println(cache.containsKey(key1)); // true (key1 still held)

// Practical use: per-object metadata without preventing GC
WeakHashMap<MyObject, Metadata> meta = new WeakHashMap<>();
// When MyObject is GC'd, its Metadata is also freed automatically`
      }</Code>

      <div className="callout callout-key">
        <div className="callout-title">🔑 Use Case</div>
        <p>
          <strong>WeakHashMap</strong> is ideal for <strong>canonicalization caches</strong>,{' '}
          <strong>per-object metadata</strong> stores, and <strong>listener registries</strong> where entries should
          be freed automatically when the key object is no longer reachable — without requiring explicit cleanup
          code.
        </p>
      </div>

      {/* 2.5 */}
      <div className="section-header anchor" id="identityhashmap">
        <div className="section-badge">2.5</div>
        <h2>IdentityHashMap</h2>
      </div>
      <div className="card">
        <p>
          <strong>IdentityHashMap&lt;K,V&gt;</strong> intentionally violates the general <code>Map</code> contract
          by using <strong>reference equality (<code>==</code>)</strong> instead of <code>.equals()</code> for key
          comparison, and <strong><code>System.identityHashCode()</code></strong> instead of{' '}
          <code>key.hashCode()</code>.
        </p>
        <ul>
          <li>Two distinct objects that are <code>.equals()</code> are treated as <strong>different keys</strong>.</li>
          <li>The same object referenced twice is the <em>same</em> key regardless of content changes.</li>
          <li>Uses an <strong>open-addressing</strong> (linear probing) hash table — no bucket linked lists.</li>
          <li>Unordered, not synchronized, permits null keys and values.</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Constructors</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
          <tbody>
            <tr><td><code>IdentityHashMap()</code></td><td>Default expected max size 21; table initialized to 32 slots</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>IdentityHashMap(int expectedMaxSize)</code></td><td>Optimizes internal table size for expected number of entries</td><td><span className="pill">O(1)</span></td></tr>
            <tr><td><code>IdentityHashMap(Map&lt;? extends K, ? extends V&gt; m)</code></td><td>Copies all entries; uses identity semantics for keys</td><td><span className="pill">O(n)</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Code Example — Equal Strings as Different Keys</h3></div>
      <Code>{
`IdentityHashMap<String, Integer> idMap = new IdentityHashMap<>();

String a = new String("hello");   // distinct object on heap
String b = new String("hello");   // another distinct object

idMap.put(a, 1);
idMap.put(b, 2);  // different reference → separate entry!

System.out.println(a.equals(b));         // true  (.equals)
System.out.println(a == b);              // false (different refs)
System.out.println(idMap.size());        // 2 — both stored!
System.out.println(idMap.get(a));        // 1
System.out.println(idMap.get(b));        // 2

// Contrast with HashMap: equal keys overwrite
HashMap<String, Integer> hashMap = new HashMap<>();
hashMap.put(a, 1);
hashMap.put(b, 2);  // overwrites: a.equals(b) → true
System.out.println(hashMap.size());       // 1

// Use case: serialization graph traversal — track object identity
IdentityHashMap<Object, Integer> visited = new IdentityHashMap<>();
// visited.containsKey(obj) is true only for same reference`
      }</Code>

      <div className="subsection-header"><h3>Comparison: HashMap vs LinkedHashMap vs WeakHashMap vs IdentityHashMap</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Feature</th><th>HashMap</th><th>LinkedHashMap</th><th>WeakHashMap</th><th>IdentityHashMap</th></tr></thead>
          <tbody>
            <tr><td><strong>Key comparison</strong></td><td><code>.equals()</code></td><td><code>.equals()</code></td><td><code>.equals()</code></td><td><code>==</code> (reference)</td></tr>
            <tr><td><strong>Hash method</strong></td><td><code>key.hashCode()</code> + spread</td><td><code>key.hashCode()</code> + spread</td><td><code>key.hashCode()</code> + spread</td><td><code>System.identityHashCode(key)</code></td></tr>
            <tr><td><strong>Key reference</strong></td><td>Strong</td><td>Strong</td><td><strong>Weak</strong> (GC-eligible)</td><td>Strong</td></tr>
            <tr><td><strong>GC behavior</strong></td><td>Keys live as long as map lives</td><td>Keys live as long as map lives</td><td>Entries auto-removed when key collected</td><td>Keys live as long as map lives</td></tr>
            <tr><td><strong>Iteration order</strong></td><td>Undefined</td><td>Insertion or access order</td><td>Undefined</td><td>Undefined</td></tr>
            <tr><td><strong>Internal structure</strong></td><td>Chained hash table (+ RBTree)</td><td>Chained hash table + doubly-linked list</td><td>Chained hash table with weak refs</td><td>Open-addressing (linear probing)</td></tr>
            <tr><td><strong>Null key allowed</strong></td><td><span className="pill pill-success">Yes</span></td><td><span className="pill pill-success">Yes</span></td><td><span className="pill pill-success">Yes</span></td><td><span className="pill pill-success">Yes</span></td></tr>
            <tr><td><strong>Thread-safe</strong></td><td><span className="pill pill-danger">No</span></td><td><span className="pill pill-danger">No</span></td><td><span className="pill pill-danger">No</span></td><td><span className="pill pill-danger">No</span></td></tr>
            <tr><td><strong>Primary use case</strong></td><td>General-purpose fast map</td><td>Ordered map, LRU caches</td><td>Caches with auto-eviction on GC</td><td>Object graphs, serialization, topology</td></tr>
          </tbody>
        </table>
      </div>

      <div className="callout callout-note">
        <div className="callout-title">📝 When to Use IdentityHashMap</div>
        <p>
          <strong>IdentityHashMap</strong> is specifically designed for: <strong>serialization</strong> (tracking
          which exact objects have been visited), <strong>deep-copy utilities</strong> (mapping originals to their
          copies by identity), <strong>proxy frameworks</strong> (associating metadata with exact object
          instances), and any algorithm where <em>"same content"</em> must not imply <em>"same key"</em>.
        </p>
      </div>

      {/* 2.6 */}
      <div className="section-header anchor" id="s26">
        <div className="section-badge">2.6</div>
        <h2>SortedMap &amp; TreeMap / NavigableMap</h2>
      </div>

      <div className="subsection-header"><h3>SortedMap Interface</h3></div>
      <div className="card">
        <p>
          <code>SortedMap&lt;K,V&gt;</code> extends <code>Map&lt;K,V&gt;</code> and guarantees keys are kept in{' '}
          <strong>ascending sorted order</strong> — either by the keys' natural ordering (<code>Comparable</code>)
          or by a supplied <code>Comparator</code>.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>firstKey()</code></td><td>Returns the lowest (first) key in the map</td><td>O(log n)</td></tr>
              <tr><td><code>lastKey()</code></td><td>Returns the highest (last) key in the map</td><td>O(log n)</td></tr>
              <tr><td><code>headMap(toKey)</code></td><td>Returns a view of the map whose keys are strictly less than <code>toKey</code></td><td>O(log n)</td></tr>
              <tr><td><code>tailMap(fromKey)</code></td><td>Returns a view of the map whose keys are ≥ <code>fromKey</code></td><td>O(log n)</td></tr>
              <tr><td><code>subMap(fromKey, toKey)</code></td><td>Returns a view of keys in range [<code>fromKey</code>, <code>toKey</code>)</td><td>O(log n)</td></tr>
              <tr><td><code>comparator()</code></td><td>Returns the Comparator used, or null if natural ordering</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="callout callout-tip">
          <div className="callout-title">💡 Tip</div>
          All range-view methods return <strong>live backed views</strong> — changes to the view are reflected in
          the original map and vice versa.
        </div>
      </div>

      <div className="subsection-header"><h3>NavigableMap Interface</h3></div>
      <div className="card">
        <p>
          <code>NavigableMap&lt;K,V&gt;</code> extends <code>SortedMap</code> and adds navigation methods to find
          the closest match for a given search target. Introduced in Java 6.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>lowerKey(key)</code></td><td>Greatest key strictly &lt; given key; null if none</td><td>O(log n)</td></tr>
              <tr><td><code>floorKey(key)</code></td><td>Greatest key ≤ given key; null if none</td><td>O(log n)</td></tr>
              <tr><td><code>ceilingKey(key)</code></td><td>Smallest key ≥ given key; null if none</td><td>O(log n)</td></tr>
              <tr><td><code>higherKey(key)</code></td><td>Smallest key strictly &gt; given key; null if none</td><td>O(log n)</td></tr>
              <tr><td><code>lowerEntry(key)</code></td><td>Entry with greatest key strictly &lt; given key</td><td>O(log n)</td></tr>
              <tr><td><code>floorEntry(key)</code></td><td>Entry with greatest key ≤ given key</td><td>O(log n)</td></tr>
              <tr><td><code>ceilingEntry(key)</code></td><td>Entry with smallest key ≥ given key</td><td>O(log n)</td></tr>
              <tr><td><code>higherEntry(key)</code></td><td>Entry with smallest key strictly &gt; given key</td><td>O(log n)</td></tr>
              <tr><td><code>firstEntry()</code></td><td>Entry with the lowest key in the map</td><td>O(log n)</td></tr>
              <tr><td><code>lastEntry()</code></td><td>Entry with the highest key in the map</td><td>O(log n)</td></tr>
              <tr><td><code>pollFirstEntry()</code></td><td>Removes and returns entry with lowest key</td><td>O(log n)</td></tr>
              <tr><td><code>pollLastEntry()</code></td><td>Removes and returns entry with highest key</td><td>O(log n)</td></tr>
              <tr><td><code>descendingMap()</code></td><td>Returns a reverse-order view of the map</td><td>O(1)</td></tr>
              <tr><td><code>descendingKeySet()</code></td><td>Returns a NavigableSet of keys in reverse order</td><td>O(1)</td></tr>
              <tr><td><code>navigableKeySet()</code></td><td>Returns a NavigableSet view of the keys</td><td>O(1)</td></tr>
              <tr><td><code>headMap(toKey, inclusive)</code></td><td>Keys &lt; (or ≤ if inclusive) toKey</td><td>O(log n)</td></tr>
              <tr><td><code>tailMap(fromKey, inclusive)</code></td><td>Keys &gt; (or ≥ if inclusive) fromKey</td><td>O(log n)</td></tr>
              <tr><td><code>subMap(fromKey, fromInc, toKey, toInc)</code></td><td>Keys in range with configurable inclusivity on both ends</td><td>O(log n)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>TreeMap</h3></div>
      <div className="card">
        <p>
          <code>TreeMap&lt;K,V&gt;</code> is the primary implementation of <code>NavigableMap</code>. It is backed
          by a <strong>Red-Black Tree</strong>, guaranteeing <strong>O(log n)</strong> time for all Map operations.
          Not thread-safe.
        </p>
        <div className="subsection-header"><h3>Red-Black Tree Properties</h3></div>
        <pre className="diagram">{
`Red-Black Tree Invariants
─────────────────────────────────────────────────
1. Every node is RED or BLACK
2. Root is always BLACK
3. Every leaf (NIL sentinel) is BLACK
4. A RED node cannot have a RED child
   (no two consecutive red nodes on any path)
5. All paths from a node to its descendant
   NIL leaves have the SAME number of BLACK nodes
   (black-height property)

Height guarantee: h <= 2·log₂(n+1)  →  O(log n) ops

       [8 B]
      /     \\
   [3 R]   [10 B]
   /   \\      \\
[1 B] [6 B]  [14 R]
      /  \\    /
   [4 R][7 R][13 R]`
        }</pre>

        <div className="subsection-header"><h3>Constructors</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>TreeMap()</code></td><td>Natural ordering of keys (keys must implement Comparable)</td><td>O(1)</td></tr>
              <tr><td><code>TreeMap(Comparator&lt;? super K&gt; c)</code></td><td>Keys sorted by the given Comparator</td><td>O(1)</td></tr>
              <tr><td><code>TreeMap(Map&lt;? extends K,? extends V&gt; m)</code></td><td>Constructs from an existing Map; sorted by natural ordering</td><td>O(n log n)</td></tr>
              <tr><td><code>TreeMap(SortedMap&lt;K,? extends V&gt; m)</code></td><td>Constructs from a SortedMap; preserves the Comparator</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="subsection-header"><h3>All TreeMap Methods</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>put(K key, V value)</code></td><td>Associates value with key; replaces if key exists</td><td>O(log n)</td></tr>
              <tr><td><code>get(Object key)</code></td><td>Returns value for key, or null if not present</td><td>O(log n)</td></tr>
              <tr><td><code>remove(Object key)</code></td><td>Removes mapping for key; returns previous value or null</td><td>O(log n)</td></tr>
              <tr><td><code>containsKey(Object key)</code></td><td>Returns true if the map contains the key</td><td>O(log n)</td></tr>
              <tr><td><code>containsValue(Object value)</code></td><td>Returns true if the map contains the value (full scan)</td><td>O(n)</td></tr>
              <tr><td><code>size()</code></td><td>Returns number of key-value mappings</td><td>O(1)</td></tr>
              <tr><td><code>isEmpty()</code></td><td>Returns true if the map contains no mappings</td><td>O(1)</td></tr>
              <tr><td><code>clear()</code></td><td>Removes all mappings from the map</td><td>O(n)</td></tr>
              <tr><td><code>firstKey()</code></td><td>Returns the lowest key</td><td>O(log n)</td></tr>
              <tr><td><code>lastKey()</code></td><td>Returns the highest key</td><td>O(log n)</td></tr>
              <tr><td><code>headMap(toKey)</code></td><td>View of keys strictly less than toKey</td><td>O(log n)</td></tr>
              <tr><td><code>tailMap(fromKey)</code></td><td>View of keys ≥ fromKey</td><td>O(log n)</td></tr>
              <tr><td><code>subMap(fromKey, toKey)</code></td><td>View of keys in [fromKey, toKey)</td><td>O(log n)</td></tr>
              <tr><td><code>comparator()</code></td><td>Returns the Comparator, or null if natural order</td><td>O(1)</td></tr>
              <tr><td><code>lowerKey(key)</code></td><td>Greatest key strictly &lt; key</td><td>O(log n)</td></tr>
              <tr><td><code>floorKey(key)</code></td><td>Greatest key ≤ key</td><td>O(log n)</td></tr>
              <tr><td><code>ceilingKey(key)</code></td><td>Smallest key ≥ key</td><td>O(log n)</td></tr>
              <tr><td><code>higherKey(key)</code></td><td>Smallest key strictly &gt; key</td><td>O(log n)</td></tr>
              <tr><td><code>firstEntry()</code></td><td>Entry with the lowest key</td><td>O(log n)</td></tr>
              <tr><td><code>lastEntry()</code></td><td>Entry with the highest key</td><td>O(log n)</td></tr>
              <tr><td><code>pollFirstEntry()</code></td><td>Removes and returns the entry with lowest key</td><td>O(log n)</td></tr>
              <tr><td><code>pollLastEntry()</code></td><td>Removes and returns the entry with highest key</td><td>O(log n)</td></tr>
              <tr><td><code>descendingMap()</code></td><td>Reverse-order view of this map</td><td>O(1)</td></tr>
              <tr><td><code>descendingKeySet()</code></td><td>NavigableSet of keys in descending order</td><td>O(1)</td></tr>
              <tr><td><code>navigableKeySet()</code></td><td>NavigableSet view of keys in ascending order</td><td>O(1)</td></tr>
              <tr><td><code>headMap(toKey, inclusive)</code></td><td>View of keys up to (optionally inclusive) toKey</td><td>O(log n)</td></tr>
              <tr><td><code>tailMap(fromKey, inclusive)</code></td><td>View of keys from (optionally inclusive) fromKey</td><td>O(log n)</td></tr>
              <tr><td><code>subMap(fromKey, fromInc, toKey, toInc)</code></td><td>Range view with configurable endpoint inclusivity</td><td>O(log n)</td></tr>
              <tr><td><code>entrySet()</code></td><td>Returns Set view of all key-value mappings</td><td>O(1)</td></tr>
              <tr><td><code>keySet()</code></td><td>Returns Set view of all keys in sorted order</td><td>O(1)</td></tr>
              <tr><td><code>values()</code></td><td>Returns Collection view of all values</td><td>O(1)</td></tr>
              <tr><td><code>putAll(Map m)</code></td><td>Copies all mappings from the given map</td><td>O(n log n)</td></tr>
              <tr><td><code>replace(K key, V value)</code></td><td>Replaces value only if key is currently mapped</td><td>O(log n)</td></tr>
              <tr><td><code>getOrDefault(key, defaultVal)</code></td><td>Returns value or defaultVal if key absent</td><td>O(log n)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="subsection-header"><h3>TreeMap Code Examples</h3></div>
        <Code>{
`// 1. Natural ordering (Integer keys implement Comparable)
TreeMap<Integer, String> natMap = new TreeMap<>();
natMap.put(5, "five");
natMap.put(2, "two");
natMap.put(8, "eight");
natMap.put(1, "one");
// Iteration order: 1, 2, 5, 8
System.out.println(natMap); // {1=one, 2=two, 5=five, 8=eight}

// 2. Custom Comparator — reverse order
TreeMap<String, Integer> revMap = new TreeMap<>(Comparator.reverseOrder());
revMap.put("banana", 2);
revMap.put("apple",  1);
revMap.put("cherry", 3);
// {cherry=3, banana=2, apple=1}

// 3. Floor / Ceiling / Range queries
TreeMap<Integer, String> scores = new TreeMap<>();
scores.put(60, "D"); scores.put(70, "C");
scores.put(80, "B"); scores.put(90, "A");

Integer floor   = scores.floorKey(75);    // 70
Integer ceiling = scores.ceilingKey(75);  // 80
Integer lower   = scores.lowerKey(80);    // 70
Integer higher  = scores.higherKey(80);   // 90

// Range: keys in [70, 90)
SortedMap<Integer, String> range = scores.subMap(70, 90);
// {70=C, 80=B}

// Range: keys in [70, 90] inclusive
NavigableMap<Integer, String> incRange = scores.subMap(70, true, 90, true);
// {70=C, 80=B, 90=A}`
        }</Code>
      </div>

      {/* 2.7 */}
      <div className="section-header anchor" id="s27">
        <div className="section-badge">2.7</div>
        <h2>Hashtable</h2>
      </div>
      <div className="card">
        <p>
          <code>Hashtable&lt;K,V&gt;</code> is a <strong>legacy synchronized map</strong> from Java 1.0. It extends{' '}
          <code>Dictionary&lt;K,V&gt;</code> and implements <code>Map&lt;K,V&gt;</code>. Every public method is{' '}
          <code>synchronized</code>, making it thread-safe but slower than <code>HashMap</code>.
        </p>
        <ul>
          <li><strong>No null keys or null values</strong> — throws <code>NullPointerException</code></li>
          <li><strong>Thread-safe</strong> — all methods synchronize on <code>this</code></li>
          <li><strong>Legacy class</strong> — prefer <code>ConcurrentHashMap</code> for new code</li>
          <li><strong>Initial capacity</strong>: 11 (default); load factor: 0.75</li>
          <li>Iteration via <code>Enumeration</code> (legacy) or <code>Iterator</code> (fail-fast)</li>
        </ul>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Legacy Warning</div>
          <code>Hashtable</code> is considered obsolete. Use <code>ConcurrentHashMap</code> for thread-safe
          operations — it provides much better concurrency performance through lock striping / CAS rather than
          synchronizing the entire object.
        </div>
      </div>

      <div className="subsection-header"><h3>HashMap vs Hashtable vs ConcurrentHashMap</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Feature</th><th>HashMap</th><th>Hashtable</th><th>ConcurrentHashMap</th></tr></thead>
          <tbody>
            <tr><td><strong>Thread-safe</strong></td><td><span className="pill pill-danger">No</span></td><td><span className="pill pill-success">Yes (full sync)</span></td><td><span className="pill pill-success">Yes (partial lock)</span></td></tr>
            <tr><td><strong>Null keys</strong></td><td><span className="pill pill-success">1 allowed</span></td><td><span className="pill pill-danger">Not allowed</span></td><td><span className="pill pill-danger">Not allowed</span></td></tr>
            <tr><td><strong>Null values</strong></td><td><span className="pill pill-success">Allowed</span></td><td><span className="pill pill-danger">Not allowed</span></td><td><span className="pill pill-danger">Not allowed</span></td></tr>
            <tr><td><strong>Performance</strong></td><td>Fastest (no sync)</td><td>Slowest (full sync)</td><td>High (segment/CAS)</td></tr>
            <tr><td><strong>Iterator type</strong></td><td>Fail-fast</td><td>Fail-fast (Iterator); Enumeration (legacy)</td><td>Weakly consistent</td></tr>
            <tr><td><strong>Legacy class?</strong></td><td><span className="pill pill-success">No</span></td><td><span className="pill pill-warn">Yes (since Java 1.0)</span></td><td><span className="pill pill-success">No (Java 5+)</span></td></tr>
          </tbody>
        </table>
      </div>

      {/* 2.8 */}
      <div className="section-header anchor" id="s28">
        <div className="section-badge">2.8</div>
        <h2>ConcurrentHashMap</h2>
      </div>
      <div className="card">
        <p>
          <code>ConcurrentHashMap&lt;K,V&gt;</code> is a <strong>thread-safe, high-performance</strong> hash map in{' '}
          <code>java.util.concurrent</code>. It allows concurrent reads and a configurable level of concurrent
          writes without locking the entire map.
        </p>

        <div className="subsection-header"><h3>Internal Architecture</h3></div>
        <div className="two-col">
          <div>
            <p><strong>Java 7 — Segment-based Locking</strong></p>
            <ul>
              <li>Map divided into <strong>16 segments</strong> (default concurrency level)</li>
              <li>Each segment is an independent <code>ReentrantLock</code> + hash table</li>
              <li>Only the segment containing the target key is locked on write</li>
              <li>Up to 16 threads can write concurrently</li>
            </ul>
          </div>
          <div>
            <p><strong>Java 8+ — CAS + Bucket-level Sync</strong></p>
            <ul>
              <li>Segments eliminated; array of <strong>Node</strong> buckets</li>
              <li>Reads are <strong>lock-free</strong> (volatile reads)</li>
              <li>Empty bucket insertion uses <strong>CAS</strong> (Compare-And-Swap)</li>
              <li><code>synchronized</code> only on the <strong>first node</strong> of a bucket for writes</li>
              <li>Tree bins (TreeNode) used when bucket length ≥ 8</li>
            </ul>
          </div>
        </div>

        <pre className="diagram">{
`Java 7 — Segment-Based Locking             Java 8 — CAS + Node-level locking
──────────────────────────────             ────────────────────────────────────
ConcurrentHashMap                          ConcurrentHashMap
────────────────────────                   ────────────────────────────────────
│ Segment[0]  ↔Lock    │                   │ Node[] table  (volatile)         │
│  [bucket]-[bucket].. │                   │  [0] →  null                     │
│ Segment[1]  ↔Lock    │                   │  [1] →  Node(k1,v1)→Node(k2,v2) │
│  [bucket]-[bucket].. │                   │  [2] →  TreeBin (≥8 nodes)       │
│  ...                 │                   │  [3] →  Node(k3,v3)              │
│ Segment[15] ↔Lock    │                   │  ...                             │
│  [bucket]-[bucket].. │                   │  Write: CAS on empty slot        │
────────────────────────                   │  Write: sync(head) on collision  │
16 ReentrantLocks max                       │  Read:  volatile, no lock        │
                                            ────────────────────────────────────`
        }</pre>

        <div className="subsection-header"><h3>Constructors</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>ConcurrentHashMap()</code></td><td>Default capacity 16, load factor 0.75, concurrency level 16</td><td>O(1)</td></tr>
              <tr><td><code>ConcurrentHashMap(int capacity)</code></td><td>Specified initial capacity</td><td>O(1)</td></tr>
              <tr><td><code>ConcurrentHashMap(int capacity, float lf)</code></td><td>Specified capacity and load factor</td><td>O(1)</td></tr>
              <tr><td><code>ConcurrentHashMap(int capacity, float lf, int concurrency)</code></td><td>Specified capacity, load factor, and concurrency level (Java 7 hint)</td><td>O(1)</td></tr>
              <tr><td><code>ConcurrentHashMap(Map&lt;? extends K,? extends V&gt; m)</code></td><td>Initializes from existing Map</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="subsection-header"><h3>All Methods</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>put(K key, V value)</code></td><td>Associates value with key; no null allowed</td><td>O(1) avg</td></tr>
              <tr><td><code>get(Object key)</code></td><td>Lock-free read; returns value or null</td><td>O(1) avg</td></tr>
              <tr><td><code>remove(Object key)</code></td><td>Removes mapping for key; returns previous value</td><td>O(1) avg</td></tr>
              <tr><td><code>containsKey(Object key)</code></td><td>Returns true if key is present</td><td>O(1) avg</td></tr>
              <tr><td><code>putIfAbsent(K key, V value)</code></td><td>Atomically inserts only if key is absent</td><td>O(1) avg</td></tr>
              <tr><td><code>replace(K key, V value)</code></td><td>Atomically replaces value if key is currently mapped</td><td>O(1) avg</td></tr>
              <tr><td><code>replace(K key, V old, V new)</code></td><td>Atomically replaces only if current value matches old</td><td>O(1) avg</td></tr>
              <tr><td><code>compute(K, BiFunction)</code></td><td>Atomically computes new value for key using function</td><td>O(1) avg</td></tr>
              <tr><td><code>computeIfAbsent(K, Function)</code></td><td>Computes value only if key is absent</td><td>O(1) avg</td></tr>
              <tr><td><code>computeIfPresent(K, BiFunction)</code></td><td>Recomputes value only if key is present</td><td>O(1) avg</td></tr>
              <tr><td><code>merge(K, V, BiFunction)</code></td><td>Merges value or remaps existing with BiFunction</td><td>O(1) avg</td></tr>
              <tr><td><code>forEach(long par, BiConsumer)</code></td><td>Applies action to each entry, optionally in parallel</td><td>O(n)</td></tr>
              <tr><td><code>search(long par, BiFunction)</code></td><td>Searches entries in parallel; returns first non-null result</td><td>O(n)</td></tr>
              <tr><td><code>reduce(long par, BiFunction, BiFunction)</code></td><td>Reduces all entries to a single value, optionally in parallel</td><td>O(n)</td></tr>
              <tr><td><code>size()</code></td><td>Returns approximate count (may not reflect concurrent updates)</td><td>O(1)</td></tr>
              <tr><td><code>mappingCount()</code></td><td>Returns long count; more accurate than <code>size()</code> for large maps</td><td>O(1)</td></tr>
              <tr><td><code>isEmpty()</code></td><td>Returns true if no mappings exist</td><td>O(1)</td></tr>
              <tr><td><code>clear()</code></td><td>Removes all mappings (not atomic)</td><td>O(n)</td></tr>
              <tr><td><code>entrySet()</code></td><td>Returns weakly consistent set view of entries</td><td>O(1)</td></tr>
              <tr><td><code>keySet()</code></td><td>Returns weakly consistent set view of keys</td><td>O(1)</td></tr>
              <tr><td><code>values()</code></td><td>Returns weakly consistent collection view of values</td><td>O(1)</td></tr>
              <tr><td><code>newKeySet()</code></td><td>Returns a new Set backed by this ConcurrentHashMap</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Key Rule</div>
          <code>ConcurrentHashMap</code> does <strong>NOT</strong> allow <strong>null keys or null values</strong>.
          Inserting null throws <code>NullPointerException</code>. This is by design: in concurrent contexts, a
          null result from <code>get()</code> is ambiguous — it could mean the key is absent or mapped to null.
        </div>
      </div>

      {/* 2.9 */}
      <div className="section-header anchor" id="s29">
        <div className="section-badge">2.9</div>
        <h2>ConcurrentSkipListMap, EnumMap &amp; Immutable Maps</h2>
      </div>

      <div className="subsection-header"><h3>ConcurrentSkipListMap</h3></div>
      <div className="card">
        <p>
          <code>ConcurrentSkipListMap&lt;K,V&gt;</code> implements <code>ConcurrentNavigableMap</code>. It is a{' '}
          <strong>thread-safe, sorted map</strong> backed by a <strong>Skip List</strong> — a probabilistic data
          structure with expected O(log n) for all operations. Unlike <code>TreeMap</code>, it requires{' '}
          <strong>no locking</strong> for concurrent access.
        </p>
        <ul>
          <li>No null keys or null values allowed</li>
          <li>Iterators are <strong>weakly consistent</strong> (no <code>ConcurrentModificationException</code>)</li>
          <li>Good for concurrent sorted access; <code>TreeMap</code> is faster single-threaded</li>
        </ul>
        <pre className="diagram">{
`Skip List Structure (ConcurrentSkipListMap)
──────────────────────────────────────────────────────────────
Level 3:  HEAD ─────────────────────────── 50 ───────────── TAIL
Level 2:  HEAD ────── 20 ───────────────── 50 ── 80 ──────── TAIL
Level 1:  HEAD ── 10 ── 20 ── 30 ── 40 ── 50 ── 60 ── 80 ── TAIL
Level 0:  HEAD ── 10 ── 20 ── 30 ── 40 ── 50 ── 60 ── 70 ── 80 ── TAIL

Search 60:  Start top-left → drop down → O(log n) on average
Insert: random promotion across levels (probabilistic p=0.5)
Lock-free: CAS on node pointers for thread-safe updates`
        }</pre>

        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>put(K key, V value)</code></td><td>Inserts or updates a mapping; no null allowed</td><td>O(log n)</td></tr>
              <tr><td><code>get(Object key)</code></td><td>Returns value for key, or null if absent</td><td>O(log n)</td></tr>
              <tr><td><code>remove(Object key)</code></td><td>Removes mapping for key</td><td>O(log n)</td></tr>
              <tr><td><code>containsKey(Object key)</code></td><td>Returns true if key is present</td><td>O(log n)</td></tr>
              <tr><td><code>firstKey()</code></td><td>Returns the lowest key</td><td>O(log n)</td></tr>
              <tr><td><code>lastKey()</code></td><td>Returns the highest key</td><td>O(log n)</td></tr>
              <tr><td><code>floorKey(key)</code></td><td>Greatest key ≤ given key</td><td>O(log n)</td></tr>
              <tr><td><code>ceilingKey(key)</code></td><td>Smallest key ≥ given key</td><td>O(log n)</td></tr>
              <tr><td><code>headMap(toKey)</code></td><td>View of keys strictly less than toKey</td><td>O(log n)</td></tr>
              <tr><td><code>tailMap(fromKey)</code></td><td>View of keys ≥ fromKey</td><td>O(log n)</td></tr>
              <tr><td><code>subMap(fromKey, toKey)</code></td><td>View of keys in [fromKey, toKey)</td><td>O(log n)</td></tr>
              <tr><td><code>descendingMap()</code></td><td>Reverse-order view of the map</td><td>O(1)</td></tr>
              <tr><td><code>size()</code></td><td>Returns number of mappings (not constant time)</td><td>O(n)</td></tr>
              <tr><td><code>isEmpty()</code></td><td>Returns true if no mappings</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="subsection-header"><h3>Constructors</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>ConcurrentSkipListMap()</code></td><td>Natural ordering of keys</td><td>O(1)</td></tr>
              <tr><td><code>ConcurrentSkipListMap(Comparator&lt;? super K&gt; c)</code></td><td>Keys sorted by given Comparator</td><td>O(1)</td></tr>
              <tr><td><code>ConcurrentSkipListMap(Map&lt;? extends K,? extends V&gt; m)</code></td><td>From existing Map; natural ordering</td><td>O(n log n)</td></tr>
              <tr><td><code>ConcurrentSkipListMap(SortedMap&lt;K,? extends V&gt; m)</code></td><td>From SortedMap; preserves Comparator</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>EnumMap</h3></div>
      <div className="card">
        <p>
          <code>EnumMap&lt;K extends Enum&lt;K&gt;, V&gt;</code> is a highly efficient map for{' '}
          <strong>enum keys</strong>. Internally backed by a plain array — each enum constant's{' '}
          <code>ordinal()</code> is used as the array index, making all operations <strong>O(1)</strong> with
          near-zero overhead.
        </p>
        <ul>
          <li><strong>All keys must be from the same Enum type</strong></li>
          <li><strong>Null keys not allowed</strong> (null values are allowed)</li>
          <li>Iteration in enum declaration order</li>
          <li>Not thread-safe — wrap with <code>Collections.synchronizedMap()</code> if needed</li>
          <li>More compact and faster than <code>HashMap</code> for enum keys</li>
        </ul>

        <Code>{
`enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }

EnumMap<Day, String> schedule = new EnumMap<>(Day.class);
schedule.put(Day.MON, "Standup");
schedule.put(Day.WED, "Review");
schedule.put(Day.FRI, "Deploy");

// Iteration always in MON→SUN order
for (Map.Entry<Day, String> e : schedule.entrySet()) {
    System.out.println(e.getKey() + " → " + e.getValue());
}
// MON → Standup, WED → Review, FRI → Deploy`
        }</Code>
      </div>

      <div className="subsection-header"><h3>Immutable Maps</h3></div>
      <div className="card">
        <p>
          Java provides three primary ways to create immutable (or unmodifiable) maps. Any attempt to mutate them
          throws <code>UnsupportedOperationException</code>.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>Collections.unmodifiableMap(map)</code></td>
                <td>Returns an unmodifiable <em>wrapper</em> around existing map; original map is still mutable and
                  changes are visible through the wrapper</td><td>O(1)</td></tr>
              <tr><td><code>Map.of(k1,v1, ...)</code></td>
                <td>Factory method; max 10 entries; no null keys or values; throws{' '}
                  <code>IllegalArgumentException</code> on duplicate keys; unordered</td><td>O(1)</td></tr>
              <tr><td><code>Map.ofEntries(Map.entry(k,v), ...)</code></td>
                <td>Factory method for unlimited entries via varargs <code>Map.Entry</code>; no null; unordered;
                  truly immutable copy</td><td>O(n)</td></tr>
              <tr><td><code>Map.copyOf(map)</code></td>
                <td>Returns immutable copy of given map (Java 10+); no null allowed; throws on null entries</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="two-col">
          <div className="callout callout-warning" style={{ margin: 0 }}>
            <div className="callout-title">⚠️ unmodifiableMap — Not Truly Immutable</div>
            The wrapper prevents writes through itself, but the <strong>original map is still mutable</strong>.
            Changes to the original are reflected in the wrapper. Use <code>Map.copyOf()</code> for a true
            immutable snapshot.
          </div>
          <div className="callout callout-tip" style={{ margin: 0 }}>
            <div className="callout-title">💡 Map.of() Limit</div>
            <code>Map.of()</code> has overloads for up to <strong>10 key-value pairs</strong>. For more entries, use{' '}
            <code>Map.ofEntries()</code> with <code>Map.entry(k, v)</code>.
          </div>
        </div>
        <Code>{
`// 1. Collections.unmodifiableMap — wrapper (original still mutable)
Map<String, Integer> base = new HashMap<>();
base.put("a", 1);
Map<String, Integer> unmod = Collections.unmodifiableMap(base);
base.put("b", 2);        // OK — mutates original
System.out.println(unmod.get("b")); // 2 — change visible!
// unmod.put("c", 3);  → throws UnsupportedOperationException

// 2. Map.of() — truly immutable, max 10 entries
Map<String, Integer> immutable = Map.of(
    "one", 1,
    "two", 2,
    "three", 3
);
// immutable.put("four", 4); → UnsupportedOperationException

// 3. Map.ofEntries() — unlimited entries
Map<String, Integer> big = Map.ofEntries(
    Map.entry("alpha", 1),
    Map.entry("beta",  2),
    Map.entry("gamma", 3)
    // ... unlimited
);

// 4. Map.copyOf() — immutable snapshot (Java 10+)
Map<String, Integer> snapshot = Map.copyOf(base);
base.put("c", 3);
System.out.println(snapshot.containsKey("c")); // false — independent copy`
        }</Code>
      </div>

      {/* 2.10 */}
      <div className="section-header anchor" id="s210">
        <div className="section-badge">2.10</div>
        <h2>Comparable vs Comparator</h2>
      </div>

      <div className="subsection-header"><h3>Comparable — Natural Ordering</h3></div>
      <div className="card">
        <p>
          <code>java.lang.Comparable&lt;T&gt;</code> defines the <strong>natural ordering</strong> of a class. A
          class that implements <code>Comparable</code> is saying: <em>"I know how to compare myself to another
          object of my type."</em>
        </p>
        <ul>
          <li>Defined in the class itself — modifies the class</li>
          <li>One ordering per class (single <code>compareTo</code> method)</li>
          <li>Used automatically by <code>TreeMap</code>, <code>TreeSet</code>, <code>Collections.sort()</code>,{' '}
            <code>Arrays.sort()</code></li>
          <li>Contract: <code>compareTo</code> should be consistent with <code>equals</code></li>
        </ul>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>compareTo(T o)</code></td><td>Returns negative int if this &lt; o; 0 if equal; positive int if this &gt; o</td><td>O(1) typical</td></tr>
            </tbody>
          </table>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📝 compareTo Contract</div>
          <ul>
            <li><code>sgn(x.compareTo(y)) == -sgn(y.compareTo(x))</code></li>
            <li>Transitive: <code>x.compareTo(y) &gt; 0 &amp;&amp; y.compareTo(z) &gt; 0</code> implies{' '}
              <code>x.compareTo(z) &gt; 0</code></li>
            <li>Consistent with equals (recommended): <code>x.compareTo(y) == 0</code> should imply{' '}
              <code>x.equals(y)</code></li>
          </ul>
        </div>
      </div>

      <div className="subsection-header"><h3>Comparator — External/Custom Ordering</h3></div>
      <div className="card">
        <p>
          <code>java.util.Comparator&lt;T&gt;</code> defines an <strong>external ordering</strong> for objects,
          independently of their class. Useful when you need multiple orderings or can't modify the target class.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>compare(T o1, T o2)</code></td><td>Returns negative if o1 &lt; o2; 0 if equal; positive if o1 &gt; o2</td><td>O(1) typical</td></tr>
              <tr><td><code>Comparator.comparing(keyExtractor)</code></td><td>Creates a Comparator that sorts by a key extracted from each element</td><td>O(1)</td></tr>
              <tr><td><code>thenComparing(keyExtractor)</code></td><td>Secondary sort key applied when primary comparison is equal</td><td>O(1)</td></tr>
              <tr><td><code>reversed()</code></td><td>Returns a Comparator that imposes the reverse ordering</td><td>O(1)</td></tr>
              <tr><td><code>Comparator.naturalOrder()</code></td><td>Returns a Comparator using natural ordering (Comparable)</td><td>O(1)</td></tr>
              <tr><td><code>Comparator.reverseOrder()</code></td><td>Returns a Comparator using reverse natural ordering</td><td>O(1)</td></tr>
              <tr><td><code>Comparator.comparingInt()</code></td><td>Variant for int keys; avoids boxing overhead</td><td>O(1)</td></tr>
              <tr><td><code>Comparator.comparingDouble()</code></td><td>Variant for double keys</td><td>O(1)</td></tr>
              <tr><td><code>Comparator.comparingLong()</code></td><td>Variant for long keys</td><td>O(1)</td></tr>
              <tr><td><code>thenComparingInt(keyExtractor)</code></td><td>Secondary sort for int keys with no boxing</td><td>O(1)</td></tr>
              <tr><td><code>nullsFirst(comparator)</code></td><td>Returns a Comparator that treats null as less than any non-null</td><td>O(1)</td></tr>
              <tr><td><code>nullsLast(comparator)</code></td><td>Returns a Comparator that treats null as greater than any non-null</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>Comparable vs Comparator — Side by Side</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Feature</th><th>Comparable</th><th>Comparator</th></tr></thead>
          <tbody>
            <tr><td><strong>Location</strong></td><td>Defined inside the class being ordered</td><td>Defined outside the class (separate class / lambda)</td></tr>
            <tr><td><strong>Interface</strong></td><td><code>java.lang.Comparable&lt;T&gt;</code></td><td><code>java.util.Comparator&lt;T&gt;</code></td></tr>
            <tr><td><strong>Method</strong></td><td><code>int compareTo(T o)</code></td><td><code>int compare(T o1, T o2)</code></td></tr>
            <tr><td><strong>Modifies class?</strong></td><td><span className="pill pill-warn">Yes — class must implement it</span></td><td><span className="pill pill-success">No — class unchanged</span></td></tr>
            <tr><td><strong>Multiple orderings?</strong></td><td><span className="pill pill-danger">No — one natural order per class</span></td><td><span className="pill pill-success">Yes — unlimited Comparators</span></td></tr>
            <tr><td><strong>Usage with TreeMap</strong></td><td><code>new TreeMap&lt;&gt;()</code> — keys must implement Comparable</td><td><code>new TreeMap&lt;&gt;(comparator)</code> — explicit Comparator</td></tr>
            <tr><td><strong>Usage with sort</strong></td><td><code>Collections.sort(list)</code> — uses natural order</td><td><code>Collections.sort(list, comparator)</code></td></tr>
            <tr><td><strong>Lambda friendly?</strong></td><td><span className="pill pill-danger">No — must modify class</span></td><td><span className="pill pill-success">Yes — (a, b) -&gt; ...</span></td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="subsection-header"><h3>Code Examples</h3></div>
        <Code>{
`// ── 1. Implementing Comparable — natural ordering by age ──
class Person implements Comparable<Person> {
    String name;
    int    age;

    Person(String name, int age) { this.name = name; this.age = age; }

    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age); // ascending age
    }
}

List<Person> people = Arrays.asList(
    new Person("Alice", 30),
    new Person("Bob",   25),
    new Person("Carol", 35)
);
Collections.sort(people); // Bob(25), Alice(30), Carol(35)

// TreeMap uses natural order automatically
TreeMap<Person, String> map = new TreeMap<>();
map.put(new Person("Alice", 30), "Engineer");


// ── 2. Using Comparator lambda — sort by name ──
Comparator<Person> byName = (p1, p2) -> p1.name.compareTo(p2.name);
Collections.sort(people, byName);
// Alice(30), Bob(25), Carol(35)

// ── 3. Comparator.comparing() ──
Comparator<Person> byAge = Comparator.comparing(p -> p.age);

// Reverse order
Comparator<Person> byAgeDesc = Comparator
    .comparingInt((Person p) -> p.age)
    .reversed();


// ── 4. Chained thenComparing() — sort by age, then name ──
Comparator<Person> byAgeThenName = Comparator
    .comparingInt((Person p) -> p.age)
    .thenComparing(p -> p.name);

people.sort(byAgeThenName);
// Same age? Then alphabetical by name


// ── 5. Comparator with TreeMap for custom key ordering ──
TreeMap<String, Integer> caseInsensitive = new TreeMap<>(
    String.CASE_INSENSITIVE_ORDER
);
caseInsensitive.put("Banana", 2);
caseInsensitive.put("apple",  1);
caseInsensitive.put("CHERRY", 3);
// {apple=1, Banana=2, CHERRY=3} — sorted case-insensitively


// ── 6. nullsFirst / nullsLast ──
List<String> withNulls = Arrays.asList("b", null, "a", null, "c");
withNulls.sort(Comparator.nullsFirst(Comparator.naturalOrder()));
// [null, null, "a", "b", "c"]`
        }</Code>
        <div className="compare">
          <div className="compare-side bad">
            <div className="compare-label">✗ Comparable — Tight Coupling</div>
            <p>If you need to sort <code>Employee</code> by salary but you don't own the class (e.g., from a
              library), you <strong>cannot</strong> implement <code>Comparable</code>. The class is baked.</p>
          </div>
          <div className="compare-side good">
            <div className="compare-label">✓ Comparator — Flexible Strategy</div>
            <p>Pass different <code>Comparator</code> lambdas to the same list or <code>TreeMap</code> at runtime
              without touching the original class. Great for multiple sort strategies.</p>
          </div>
        </div>
      </div>
    </>
  );
}
