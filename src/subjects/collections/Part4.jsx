function Code({ children }) {
  return (
    <div className="code-block">
      <span className="lang-badge">JAVA</span>
      <pre>{children}</pre>
    </div>
  );
}

export default function Part4() {
  return (
    <>
      {/* 4.1 */}
      <div id="part4" data-topic-boundary="true" />
      <div className="card">
        <p>
          <code>Queue&lt;E&gt;</code> extends <code>Collection&lt;E&gt;</code> and models a <strong>FIFO</strong>{' '}
          (first-in, first-out) data structure. Each operation comes in two flavours: one that <em>throws an
          exception</em> on failure and one that <em>returns a special value</em> (<code>null</code> or{' '}
          <code>false</code>).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Two API Families</div>
          Always prefer the <em>returns-value</em> variant (<code>offer</code>, <code>poll</code>, <code>peek</code>)
          unless the throwing behaviour is explicitly needed.
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td colSpan={3} style={{ background: 'var(--pill-bg)', fontWeight: 700, color: 'var(--danger)', fontSize: '.82rem', textAlign: 'center' }}>Throws Exception on Failure</td></tr>
              <tr><td><code>add(E e)</code></td><td>Inserts element at tail; throws <code>IllegalStateException</code> if queue is full</td><td>O(1) amortized</td></tr>
              <tr><td><code>remove()</code></td><td>Retrieves and removes head; throws <code>NoSuchElementException</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>element()</code></td><td>Retrieves (does NOT remove) head; throws <code>NoSuchElementException</code> if empty</td><td>O(1)</td></tr>
              <tr><td colSpan={3} style={{ background: '#F0FDF4', fontWeight: 700, color: 'var(--success)', fontSize: '.82rem', textAlign: 'center' }}>Returns null / false on Failure</td></tr>
              <tr><td><code>offer(E e)</code></td><td>Inserts element at tail; returns <code>false</code> if capacity exceeded</td><td>O(1) amortized</td></tr>
              <tr><td><code>poll()</code></td><td>Retrieves and removes head; returns <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>peek()</code></td><td>Retrieves (does NOT remove) head; returns <code>null</code> if empty</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="callout callout-tip">
          <div className="callout-title">💡 Primary Implementations</div>
          <ul>
            <li><code>LinkedList</code> — doubly-linked, O(1) all queue ops, allows null</li>
            <li><code>ArrayDeque</code> — circular array, faster in practice, no null</li>
            <li><code>PriorityQueue</code> — heap-based, priority order not FIFO</li>
          </ul>
        </div>
      </div>

      {/* 4.2 */}
      <div id="s4-2" data-topic-boundary="true" />
      <div className="card">
        <p>
          <code>PriorityQueue&lt;E&gt;</code> implements <code>Queue</code> using a <strong>binary min-heap</strong>{' '}
          stored in an array. The head is always the <em>least</em> element (natural ordering) or the element
          deemed smallest by the <code>Comparator</code>. Permits neither <code>null</code> elements nor
          non-comparable objects without a comparator. <strong>Not thread-safe</strong>.
        </p>
        <pre className="diagram">{
`Min-Heap Array Representation
     1 (index 0)
    / \\
   3   5
  / \\ / \\
 7  4 8  9
Array: [1, 3, 5, 7, 4, 8, 9]
Parent(i) = (i-1)/2  |  Left(i) = 2i+1  |  Right(i) = 2i+2`
        }</pre>

        <div className="subsection-header"><h3>Constructors</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>PriorityQueue()</code></td><td>Default capacity 11, natural ordering</td><td>O(1)</td></tr>
              <tr><td><code>PriorityQueue(int capacity)</code></td><td>Initial capacity hint; natural ordering</td><td>O(1)</td></tr>
              <tr><td><code>PriorityQueue(Comparator&lt;? super E&gt; c)</code></td><td>Custom comparator; default capacity</td><td>O(1)</td></tr>
              <tr><td><code>PriorityQueue(int capacity, Comparator&lt;? super E&gt; c)</code></td><td>Custom capacity and comparator</td><td>O(1)</td></tr>
              <tr><td><code>PriorityQueue(Collection&lt;? extends E&gt; c)</code></td><td>Heapifies all elements from collection (Floyd's algorithm)</td><td>O(n)</td></tr>
              <tr><td><code>PriorityQueue(PriorityQueue&lt;? extends E&gt; pq)</code></td><td>Copy constructor; inherits comparator</td><td>O(n)</td></tr>
              <tr><td><code>PriorityQueue(SortedSet&lt;? extends E&gt; ss)</code></td><td>Constructs from sorted set; inherits comparator</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="subsection-header"><h3>Methods</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>add(E e)</code></td><td>Inserts element and sifts up; equivalent to <code>offer</code></td><td>O(log n)</td></tr>
              <tr><td><code>offer(E e)</code></td><td>Inserts element, maintaining heap property via sift-up</td><td>O(log n)</td></tr>
              <tr><td><code>peek()</code></td><td>Returns (does NOT remove) the minimum element; returns <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>poll()</code></td><td>Removes and returns minimum element; sifts down replacement</td><td>O(log n)</td></tr>
              <tr><td><code>remove(Object o)</code></td><td>Removes specific element; requires linear scan to find it</td><td>O(n)</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Linear scan; heap structure does not support O(log n) lookup</td><td>O(n)</td></tr>
              <tr><td><code>size()</code></td><td>Returns number of elements</td><td>O(1)</td></tr>
              <tr><td><code>clear()</code></td><td>Nulls all array slots</td><td>O(n)</td></tr>
              <tr><td><code>toArray()</code></td><td>Returns elements as <code>Object[]</code> in heap (NOT sorted) order</td><td>O(n)</td></tr>
              <tr><td><code>iterator()</code></td><td>Fail-fast; iterates in heap order, <strong>NOT</strong> priority order</td><td>O(1)</td></tr>
              <tr><td><code>comparator()</code></td><td>Returns the comparator, or <code>null</code> if natural ordering</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Iteration is NOT sorted</div>
          <code>iterator()</code> traverses the heap array in index order — NOT in priority order. To drain in
          sorted order, call <code>poll()</code> repeatedly.
        </div>
        <Code>{
`PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.add(5); pq.add(1); pq.add(3);
System.out.println(pq.peek());   // 1  (min)
System.out.println(pq.poll());   // 1  (removes 1)
System.out.println(pq.poll());   // 3

// Max-heap with reversed comparator
PriorityQueue<Integer> maxPQ =
    new PriorityQueue<>(Collections.reverseOrder());
maxPQ.add(5); maxPQ.add(1); maxPQ.add(9);
System.out.println(maxPQ.peek()); // 9`
        }</Code>
      </div>

      {/* 4.3 */}
      <div id="s4-3" data-topic-boundary="true" />
      <div className="card">
        <p>
          <code>Deque&lt;E&gt;</code> (double-ended queue) extends <code>Queue</code> and supports insertion and
          removal at <strong>both ends</strong>. <code>ArrayDeque&lt;E&gt;</code> implements <code>Deque</code>{' '}
          using a <strong>resizable circular array</strong>. It is the <strong>recommended replacement</strong> for
          both <code>Stack</code> (use as LIFO) and <code>LinkedList</code> (use as queue), being faster due to
          better cache locality and no node allocation overhead.
        </p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ No null elements</div>
          <code>ArrayDeque</code> does not permit <code>null</code>. It uses <code>null</code> internally as a
          sentinel to detect empty slots in the circular buffer.
        </div>

        <div className="subsection-header"><h3>Constructors</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>ArrayDeque()</code></td><td>Default initial capacity of 16</td><td>O(1)</td></tr>
              <tr><td><code>ArrayDeque(int capacity)</code></td><td>Initial capacity hint (rounded up to next power of 2)</td><td>O(1)</td></tr>
              <tr><td><code>ArrayDeque(Collection&lt;? extends E&gt; c)</code></td><td>Constructs deque with all elements of <code>c</code> in iteration order</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>

        <div className="subsection-header"><h3>Methods</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td colSpan={3} style={{ background: 'var(--pill-bg)', fontWeight: 700, color: 'var(--primary-accent)', fontSize: '.82rem', textAlign: 'center' }}>Front (Head) Operations</td></tr>
              <tr><td><code>addFirst(E e)</code></td><td>Inserts element at front; throws if <code>null</code></td><td>O(1) amortized</td></tr>
              <tr><td><code>offerFirst(E e)</code></td><td>Inserts element at front; returns <code>false</code> on failure</td><td>O(1) amortized</td></tr>
              <tr><td><code>removeFirst()</code></td><td>Removes and returns front element; throws if empty</td><td>O(1)</td></tr>
              <tr><td><code>pollFirst()</code></td><td>Removes and returns front element; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>getFirst()</code></td><td>Returns front element without removing; throws if empty</td><td>O(1)</td></tr>
              <tr><td><code>peekFirst()</code></td><td>Returns front element without removing; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td colSpan={3} style={{ background: '#F0FDF4', fontWeight: 700, color: 'var(--success)', fontSize: '.82rem', textAlign: 'center' }}>Back (Tail) Operations</td></tr>
              <tr><td><code>addLast(E e)</code></td><td>Inserts element at back; throws if <code>null</code></td><td>O(1) amortized</td></tr>
              <tr><td><code>offerLast(E e)</code></td><td>Inserts element at back; returns <code>false</code> on failure</td><td>O(1) amortized</td></tr>
              <tr><td><code>removeLast()</code></td><td>Removes and returns back element; throws if empty</td><td>O(1)</td></tr>
              <tr><td><code>pollLast()</code></td><td>Removes and returns back element; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>getLast()</code></td><td>Returns back element without removing; throws if empty</td><td>O(1)</td></tr>
              <tr><td><code>peekLast()</code></td><td>Returns back element without removing; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td colSpan={3} style={{ background: '#EEF2FF', fontWeight: 700, color: '#5C55E8', fontSize: '.82rem', textAlign: 'center' }}>Stack / Queue Aliases &amp; General</td></tr>
              <tr><td><code>push(E e)</code></td><td>Stack push — equivalent to <code>addFirst(e)</code></td><td>O(1) amortized</td></tr>
              <tr><td><code>pop()</code></td><td>Stack pop — equivalent to <code>removeFirst()</code></td><td>O(1)</td></tr>
              <tr><td><code>peek()</code></td><td>Returns front element (Queue-style alias for <code>peekFirst</code>)</td><td>O(1)</td></tr>
              <tr><td><code>offer(E e)</code></td><td>Queue enqueue — equivalent to <code>addLast(e)</code></td><td>O(1) amortized</td></tr>
              <tr><td><code>add(E e)</code></td><td>Queue enqueue — equivalent to <code>addLast(e)</code></td><td>O(1) amortized</td></tr>
              <tr><td><code>poll()</code></td><td>Queue dequeue — equivalent to <code>pollFirst()</code></td><td>O(1)</td></tr>
              <tr><td><code>remove()</code></td><td>Queue dequeue — equivalent to <code>removeFirst()</code></td><td>O(1)</td></tr>
              <tr><td><code>size()</code></td><td>Returns number of elements</td><td>O(1)</td></tr>
              <tr><td><code>isEmpty()</code></td><td>Returns <code>true</code> if the deque has no elements</td><td>O(1)</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Linear scan from head to tail</td><td>O(n)</td></tr>
              <tr><td><code>iterator()</code></td><td>Fail-fast iterator from head to tail</td><td>O(1)</td></tr>
              <tr><td><code>descendingIterator()</code></td><td>Fail-fast iterator from tail to head</td><td>O(1)</td></tr>
              <tr><td><code>toArray()</code></td><td>Returns all elements as <code>Object[]</code> from head to tail</td><td>O(n)</td></tr>
              <tr><td><code>clear()</code></td><td>Nulls all elements in the circular buffer</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="compare">
          <div className="compare-side bad">
            <div className="compare-label">✗ Avoid Stack class</div>
            <Code>{
`// Synchronized, extends Vector — legacy
Stack<Integer> stack = new Stack<>();
stack.push(1);
stack.pop();`
            }</Code>
          </div>
          <div className="compare-side good">
            <div className="compare-label">✓ Use ArrayDeque as Stack</div>
            <Code>{
`// Faster, no synchronisation overhead
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);
stack.pop();`
            }</Code>
          </div>
        </div>
      </div>

      {/* 4.4 */}
      <div id="s4-4" data-topic-boundary="true" />

      <div className="subsection-header"><h3>BlockingQueue Interface</h3></div>
      <div className="card">
        <p>
          <code>BlockingQueue&lt;E&gt;</code> (in <code>java.util.concurrent</code>) extends <code>Queue</code> and
          adds <strong>blocking semantics</strong>: threads can wait for space (on insert) or wait for an element
          (on remove). All implementations are thread-safe. Four operation families:
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td colSpan={3} style={{ background: '#FEE2E2', fontWeight: 700, color: '#B91C1C', fontSize: '.82rem', textAlign: 'center' }}>Throws Exception</td></tr>
              <tr><td><code>add(E e)</code></td><td>Inserts at tail; throws <code>IllegalStateException</code> if queue full</td><td>O(1)</td></tr>
              <tr><td><code>remove()</code></td><td>Removes head; throws <code>NoSuchElementException</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>element()</code></td><td>Returns head without removing; throws if empty</td><td>O(1)</td></tr>
              <tr><td colSpan={3} style={{ background: '#F0FDF4', fontWeight: 700, color: '#15803D', fontSize: '.82rem', textAlign: 'center' }}>Returns Special Value (non-blocking)</td></tr>
              <tr><td><code>offer(E e)</code></td><td>Inserts at tail; returns <code>false</code> if full</td><td>O(1)</td></tr>
              <tr><td><code>poll()</code></td><td>Removes head; returns <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>peek()</code></td><td>Returns head without removing; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td colSpan={3} style={{ background: '#EEF2FF', fontWeight: 700, color: '#5C55E8', fontSize: '.82rem', textAlign: 'center' }}>Blocks Indefinitely</td></tr>
              <tr><td><code>put(E e)</code></td><td>Inserts at tail; <strong>blocks</strong> if queue is full until space becomes available</td><td>O(1) + wait</td></tr>
              <tr><td><code>take()</code></td><td>Removes head; <strong>blocks</strong> if queue is empty until element available</td><td>O(1) + wait</td></tr>
              <tr><td colSpan={3} style={{ background: '#FFFBEB', fontWeight: 700, color: '#B45309', fontSize: '.82rem', textAlign: 'center' }}>Times Out</td></tr>
              <tr><td><code>offer(E e, long t, TimeUnit unit)</code></td><td>Inserts at tail; waits up to <code>t</code> time units for space; returns <code>false</code> on timeout</td><td>O(1) + wait</td></tr>
              <tr><td><code>poll(long t, TimeUnit unit)</code></td><td>Removes head; waits up to <code>t</code> time units for element; returns <code>null</code> on timeout</td><td>O(1) + wait</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>ArrayBlockingQueue</h3></div>
      <div className="card">
        <p>
          <code>ArrayBlockingQueue&lt;E&gt;</code> is a <strong>bounded</strong> blocking queue backed by a
          fixed-size circular array. Uses a <strong>single <code>ReentrantLock</code></strong> for both producers
          and consumers (less concurrent than <code>LinkedBlockingQueue</code>). The capacity must be specified at
          construction time and cannot change.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>ArrayBlockingQueue(int capacity)</code></td><td>Fixed-size queue; non-fair access policy</td><td>O(1)</td></tr>
              <tr><td><code>ArrayBlockingQueue(int capacity, boolean fair)</code></td><td>Fair=<code>true</code>: longest-waiting thread gets access first (lower throughput)</td><td>O(1)</td></tr>
              <tr><td><code>ArrayBlockingQueue(int capacity, boolean fair, Collection c)</code></td><td>Constructs with initial elements; throws if capacity exceeded</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>put(E e)</code></td><td>Blocks until space available; inserts at tail</td><td>O(1) + wait</td></tr>
              <tr><td><code>take()</code></td><td>Blocks until element available; removes and returns head</td><td>O(1) + wait</td></tr>
              <tr><td><code>offer(E e)</code></td><td>Non-blocking insert; returns <code>false</code> if full</td><td>O(1)</td></tr>
              <tr><td><code>poll()</code></td><td>Non-blocking remove; returns <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>peek()</code></td><td>Returns head without removing; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>size()</code></td><td>Returns current number of elements</td><td>O(1)</td></tr>
              <tr><td><code>remainingCapacity()</code></td><td>Returns available space (capacity − size)</td><td>O(1)</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Linear scan under lock</td><td>O(n)</td></tr>
              <tr><td><code>drainTo(Collection c)</code></td><td>Atomically removes all elements into <code>c</code>; faster than polling in a loop</td><td>O(n)</td></tr>
              <tr><td><code>iterator()</code></td><td>Weakly-consistent iterator; snapshot taken under lock</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>LinkedBlockingQueue</h3></div>
      <div className="card">
        <p>
          <code>LinkedBlockingQueue&lt;E&gt;</code> is an <strong>optionally bounded</strong> blocking queue backed
          by a singly-linked list. Default capacity is <code>Integer.MAX_VALUE</code> (effectively unbounded).
          Uses <strong>two separate locks</strong>: <code>putLock</code> for producers and <code>takeLock</code>{' '}
          for consumers — allowing simultaneous puts and takes, offering higher throughput than{' '}
          <code>ArrayBlockingQueue</code>.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>LinkedBlockingQueue()</code></td><td>Capacity = <code>Integer.MAX_VALUE</code>; effectively unbounded</td><td>O(1)</td></tr>
              <tr><td><code>LinkedBlockingQueue(int capacity)</code></td><td>Bounded queue with specified capacity</td><td>O(1)</td></tr>
              <tr><td><code>LinkedBlockingQueue(Collection&lt;? extends E&gt; c)</code></td><td>Capacity = <code>Integer.MAX_VALUE</code>; initially filled with <code>c</code></td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>put(E e)</code></td><td>Acquires putLock; blocks if capacity reached</td><td>O(1) + wait</td></tr>
              <tr><td><code>take()</code></td><td>Acquires takeLock; blocks if empty</td><td>O(1) + wait</td></tr>
              <tr><td><code>offer(E e)</code></td><td>Non-blocking; returns <code>false</code> if full</td><td>O(1)</td></tr>
              <tr><td><code>poll()</code></td><td>Non-blocking; returns <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>peek()</code></td><td>Returns head without removing; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>size()</code></td><td>Returns current number of elements (atomic counter)</td><td>O(1)</td></tr>
              <tr><td><code>remainingCapacity()</code></td><td>Returns available space</td><td>O(1)</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Acquires both locks for a full scan</td><td>O(n)</td></tr>
              <tr><td><code>drainTo(Collection c)</code></td><td>Atomically drains all available elements into <code>c</code></td><td>O(n)</td></tr>
              <tr><td><code>iterator()</code></td><td>Weakly-consistent iterator</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>PriorityBlockingQueue</h3></div>
      <div className="card">
        <p>
          <code>PriorityBlockingQueue&lt;E&gt;</code> is an <strong>unbounded</strong> blocking min-heap queue.{' '}
          <code>put()</code> <em>never blocks</em> (the queue grows dynamically); only <code>take()</code> blocks
          when the queue is empty. Elements are ordered by natural ordering or a <code>Comparator</code>.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>PriorityBlockingQueue()</code></td><td>Default initial capacity 11; natural ordering</td><td>O(1)</td></tr>
              <tr><td><code>PriorityBlockingQueue(int capacity)</code></td><td>Initial capacity hint; auto-grows as needed</td><td>O(1)</td></tr>
              <tr><td><code>PriorityBlockingQueue(int capacity, Comparator&lt;? super E&gt; c)</code></td><td>Custom ordering</td><td>O(1)</td></tr>
              <tr><td><code>PriorityBlockingQueue(Collection&lt;? extends E&gt; c)</code></td><td>Heapifies all elements</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>put(E e)</code></td><td>Inserts (never blocks; queue is unbounded); sifts up</td><td>O(log n)</td></tr>
              <tr><td><code>offer(E e)</code></td><td>Same as <code>put</code>; always returns <code>true</code></td><td>O(log n)</td></tr>
              <tr><td><code>take()</code></td><td>Blocks until element available; removes and returns minimum</td><td>O(log n) + wait</td></tr>
              <tr><td><code>poll()</code></td><td>Non-blocking; returns minimum or <code>null</code></td><td>O(log n)</td></tr>
              <tr><td><code>peek()</code></td><td>Returns minimum without removing; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>size()</code></td><td>Returns number of elements</td><td>O(1)</td></tr>
              <tr><td><code>remainingCapacity()</code></td><td>Always returns <code>Integer.MAX_VALUE</code> (unbounded)</td><td>O(1)</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Linear scan under lock</td><td>O(n)</td></tr>
              <tr><td><code>drainTo(Collection c)</code></td><td>Drains all elements in heap order into <code>c</code></td><td>O(n)</td></tr>
              <tr><td><code>iterator()</code></td><td>Weakly-consistent; heap (not priority) order</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>SynchronousQueue</h3></div>
      <div className="card">
        <p>
          <code>SynchronousQueue&lt;E&gt;</code> has <strong>zero capacity</strong>. Each <code>put()</code> must
          wait for a corresponding <code>take()</code> (and vice versa). It acts as a <em>rendezvous channel</em>:
          the producer and consumer must meet. Used heavily as the work queue in{' '}
          <code>Executors.newCachedThreadPool()</code>.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>SynchronousQueue()</code></td><td>Non-fair mode (LIFO for waiting threads)</td><td>O(1)</td></tr>
              <tr><td><code>SynchronousQueue(boolean fair)</code></td><td>Fair=<code>true</code>: FIFO ordering for waiting threads</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>put(E e)</code></td><td>Blocks until another thread calls <code>take()</code></td><td>O(1) + wait</td></tr>
              <tr><td><code>take()</code></td><td>Blocks until another thread calls <code>put(e)</code></td><td>O(1) + wait</td></tr>
              <tr><td><code>offer(E e)</code></td><td>Returns <code>true</code> only if a thread is already waiting on <code>take()</code>; otherwise returns <code>false</code> immediately</td><td>O(1)</td></tr>
              <tr><td><code>poll()</code></td><td>Returns the element if a producer is waiting on <code>put()</code>; otherwise returns <code>null</code></td><td>O(1)</td></tr>
              <tr><td><code>peek()</code></td><td>Always returns <code>null</code> (queue has no capacity)</td><td>O(1)</td></tr>
              <tr><td><code>size()</code></td><td>Always returns 0</td><td>O(1)</td></tr>
              <tr><td><code>isEmpty()</code></td><td>Always returns <code>true</code></td><td>O(1)</td></tr>
              <tr><td><code>iterator()</code></td><td>Returns an empty iterator (no elements ever stored)</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>DelayQueue</h3></div>
      <div className="card">
        <p>
          <code>DelayQueue&lt;E extends Delayed&gt;</code> is an <strong>unbounded</strong> blocking queue where
          elements are only available once their <strong>delay has expired</strong>. Backed internally by a{' '}
          <code>PriorityQueue</code> ordered by delay. Elements must implement the <code>Delayed</code> interface.
          Common use cases: task scheduling, cache expiry, session timeouts.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Constructor</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>DelayQueue()</code></td><td>Empty queue; elements must implement <code>Delayed</code></td><td>O(1)</td></tr>
              <tr><td><code>DelayQueue(Collection&lt;? extends E&gt; c)</code></td><td>Constructs with initial elements; heapifies by delay</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>put(E e)</code></td><td>Inserts element; never blocks (unbounded queue)</td><td>O(log n)</td></tr>
              <tr><td><code>offer(E e)</code></td><td>Same as <code>put</code>; always returns <code>true</code></td><td>O(log n)</td></tr>
              <tr><td><code>take()</code></td><td>Blocks until the head element's delay has expired, then removes and returns it</td><td>O(log n) + wait</td></tr>
              <tr><td><code>poll()</code></td><td>Returns and removes head only if its delay has expired; otherwise returns <code>null</code></td><td>O(log n)</td></tr>
              <tr><td><code>peek()</code></td><td>Returns head (possibly unexpired) without removing; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>size()</code></td><td>Returns total number of elements (including unexpired)</td><td>O(1)</td></tr>
              <tr><td><code>drainTo(Collection c)</code></td><td>Transfers all <em>expired</em> elements to <code>c</code></td><td>O(n)</td></tr>
              <tr><td><code>iterator()</code></td><td>Weakly-consistent; includes all elements regardless of expiry</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <div className="subsection-header"><h3>Delayed Interface (required by elements)</h3></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>getDelay(TimeUnit unit)</code></td><td>Returns remaining delay in the given time unit; ≤0 means expired</td><td>O(1)</td></tr>
              <tr><td><code>compareTo(Delayed o)</code></td><td>Orders by delay (smaller delay = higher priority in the min-heap)</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <Code>{
`class DelayedTask implements Delayed {
    private final long expireAt;
    private final String name;
    DelayedTask(String name, long delayMs) {
        this.name = name;
        this.expireAt = System.currentTimeMillis() + delayMs;
    }
    @Override
    public long getDelay(TimeUnit unit) {
        return unit.convert(expireAt - System.currentTimeMillis(),
                             TimeUnit.MILLISECONDS);
    }
    @Override
    public int compareTo(Delayed o) {
        return Long.compare(this.expireAt,
                            ((DelayedTask) o).expireAt);
    }
}
DelayQueue<DelayedTask> dq = new DelayQueue<>();
dq.put(new DelayedTask("job1", 1000)); // ready in 1s
DelayedTask t = dq.take(); // blocks ~1 second`
        }</Code>
      </div>

      <div className="subsection-header"><h3>BlockingQueue Variants — Comparison</h3></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Class</th><th>Bounded?</th><th>Ordering</th><th>Locking</th><th>put blocks?</th><th>Null?</th></tr></thead>
            <tbody>
              <tr><td><code>ArrayBlockingQueue</code></td><td><span className="pill pill-danger">Yes (fixed)</span></td><td>FIFO</td><td>Single lock</td><td>Yes, if full</td><td>No</td></tr>
              <tr><td><code>LinkedBlockingQueue</code></td><td><span className="pill pill-warn">Optional</span></td><td>FIFO</td><td>Two locks</td><td>Yes, if bounded &amp; full</td><td>No</td></tr>
              <tr><td><code>PriorityBlockingQueue</code></td><td><span className="pill pill-success">No (grows)</span></td><td>Priority (min)</td><td>Single lock</td><td>Never blocks</td><td>No</td></tr>
              <tr><td><code>SynchronousQueue</code></td><td><span className="pill pill-danger">Zero capacity</span></td><td>Rendezvous</td><td>CAS / transfer</td><td>Until take()</td><td>No</td></tr>
              <tr><td><code>DelayQueue</code></td><td><span className="pill pill-success">No (grows)</span></td><td>Expiry time</td><td>Single lock</td><td>Never blocks</td><td>No</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4.5 */}
      <div id="s4-5" data-topic-boundary="true" />

      <div className="subsection-header"><h3>ConcurrentLinkedQueue</h3></div>
      <div className="card">
        <p>
          <code>ConcurrentLinkedQueue&lt;E&gt;</code> is an <strong>unbounded thread-safe FIFO queue</strong> based
          on a non-blocking linked list using <strong>CAS (Compare-And-Swap)</strong> operations. No locks are
          used; all operations are lock-free. Does not permit <code>null</code> elements.
        </p>
        <div className="callout callout-tip">
          <div className="callout-title">💡 When to use</div>
          Prefer over <code>LinkedBlockingQueue</code> when you don't need blocking semantics and want maximum
          throughput with many concurrent producers/consumers.
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>add(E e)</code></td><td>CAS-based insert at tail; returns <code>true</code> always</td><td>O(1)</td></tr>
              <tr><td><code>offer(E e)</code></td><td>Same as <code>add</code>; non-blocking CAS at tail</td><td>O(1)</td></tr>
              <tr><td><code>poll()</code></td><td>CAS-based remove from head; returns <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>peek()</code></td><td>Returns head without removing; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>size()</code></td><td>Traverses entire list; not atomic — may be inaccurate under concurrency</td><td>O(n)</td></tr>
              <tr><td><code>isEmpty()</code></td><td>Returns <code>true</code> if head == tail (constant time check)</td><td>O(1)</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Linear scan of the list</td><td>O(n)</td></tr>
              <tr><td><code>remove(Object o)</code></td><td>Scans and unlinks first occurrence; CAS-based</td><td>O(n)</td></tr>
              <tr><td><code>iterator()</code></td><td>Weakly-consistent; never throws <code>ConcurrentModificationException</code></td><td>O(1)</td></tr>
              <tr><td><code>toArray()</code></td><td>Snapshot of elements at time of call</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>ConcurrentLinkedDeque</h3></div>
      <div className="card">
        <p>
          <code>ConcurrentLinkedDeque&lt;E&gt;</code> is an <strong>unbounded thread-safe double-ended queue</strong>{' '}
          based on a non-blocking doubly-linked list using CAS. All head/tail operations are lock-free. Provides
          the full <code>Deque</code> API concurrently.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>addFirst(E e)</code></td><td>CAS insert at head</td><td>O(1)</td></tr>
              <tr><td><code>addLast(E e)</code></td><td>CAS insert at tail</td><td>O(1)</td></tr>
              <tr><td><code>offerFirst(E e)</code></td><td>Non-blocking insert at head; returns <code>true</code></td><td>O(1)</td></tr>
              <tr><td><code>offerLast(E e)</code></td><td>Non-blocking insert at tail; returns <code>true</code></td><td>O(1)</td></tr>
              <tr><td><code>pollFirst()</code></td><td>CAS remove from head; returns <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>pollLast()</code></td><td>CAS remove from tail; returns <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>peekFirst()</code></td><td>Returns head without removing; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>peekLast()</code></td><td>Returns tail without removing; <code>null</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>removeFirst()</code></td><td>Removes head; throws <code>NoSuchElementException</code> if empty</td><td>O(1)</td></tr>
              <tr><td><code>removeLast()</code></td><td>Removes tail; throws if empty</td><td>O(1)</td></tr>
              <tr><td><code>push(E e)</code></td><td>Alias for <code>addFirst</code>; stack push</td><td>O(1)</td></tr>
              <tr><td><code>pop()</code></td><td>Alias for <code>removeFirst</code>; stack pop</td><td>O(1)</td></tr>
              <tr><td><code>size()</code></td><td>Traverses list; not atomic</td><td>O(n)</td></tr>
              <tr><td><code>contains(Object o)</code></td><td>Linear scan</td><td>O(n)</td></tr>
              <tr><td><code>remove(Object o)</code></td><td>Removes first occurrence; CAS unlink</td><td>O(n)</td></tr>
              <tr><td><code>iterator()</code></td><td>Weakly-consistent forward iterator</td><td>O(1)</td></tr>
              <tr><td><code>descendingIterator()</code></td><td>Weakly-consistent reverse iterator</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>Iterable Interface</h3></div>
      <div className="card">
        <p>
          <code>Iterable&lt;T&gt;</code> is the root interface for objects that can be iterated using the enhanced
          for-each loop. Any class implementing <code>Iterable</code> can be used in{' '}
          <code>for (T t : obj)</code> syntax. The interface contains a single abstract method.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>iterator()</code></td><td>Returns an <code>Iterator&lt;T&gt;</code> over elements of this object (abstract)</td><td>Impl-dependent</td></tr>
              <tr><td><code>forEach(Consumer action)</code></td><td>Default method; executes action for each element (Java 8+)</td><td>O(n)</td></tr>
              <tr><td><code>spliterator()</code></td><td>Default method; returns a <code>Spliterator&lt;T&gt;</code> for parallel traversal</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>Iterator Interface</h3></div>
      <div className="card">
        <p>
          <code>Iterator&lt;E&gt;</code> provides a standard way to traverse a collection element by element.
          Obtained from <code>Iterable.iterator()</code>. Supports optional element removal during traversal.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Fail-Fast vs Weakly-Consistent</div>
          <ul>
            <li><strong>Fail-fast</strong>: throws <code>ConcurrentModificationException</code> if the collection
              is structurally modified during iteration (used in <code>ArrayList</code>, <code>HashSet</code>,{' '}
              <code>TreeSet</code>, etc.). Detects modification via a <code>modCount</code> counter.</li>
            <li><strong>Weakly-consistent</strong>: used by all <code>java.util.concurrent</code> collections —
              will NOT throw <code>ConcurrentModificationException</code>; may or may not reflect concurrent
              modifications.</li>
          </ul>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>hasNext()</code></td><td>Returns <code>true</code> if iteration has more elements</td><td>O(1)</td></tr>
              <tr><td><code>next()</code></td><td>Returns the next element and advances the cursor</td><td>O(1)</td></tr>
              <tr><td><code>remove()</code></td><td>Removes the last element returned by <code>next()</code> from the underlying collection; call at most once per <code>next()</code></td><td>O(1)</td></tr>
              <tr><td><code>forEachRemaining(Consumer action)</code></td><td>Default method (Java 8+); applies action to all remaining elements</td><td>O(n)</td></tr>
            </tbody>
          </table>
        </div>
        <Code>{
`List<String> list = new ArrayList<>(List.of("a", "b", "c", "d"));
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (s.equals("b")) it.remove(); // safe removal during iteration
}
// list is now [a, c, d]`
        }</Code>
      </div>

      <div className="subsection-header"><h3>ListIterator Interface</h3></div>
      <div className="card">
        <p>
          <code>ListIterator&lt;E&gt;</code> extends <code>Iterator&lt;E&gt;</code> and is available only for{' '}
          <code>List</code> implementations. It supports <strong>bidirectional traversal</strong> and element
          modification during iteration.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Description</th><th>Time Complexity</th></tr></thead>
            <tbody>
              <tr><td><code>hasNext()</code></td><td>Returns <code>true</code> if more elements forward</td><td>O(1)</td></tr>
              <tr><td><code>next()</code></td><td>Returns next element; advances cursor forward</td><td>O(1)</td></tr>
              <tr><td><code>hasPrevious()</code></td><td>Returns <code>true</code> if more elements backward</td><td>O(1)</td></tr>
              <tr><td><code>previous()</code></td><td>Returns previous element; moves cursor backward</td><td>O(1)</td></tr>
              <tr><td><code>nextIndex()</code></td><td>Returns index of element that would be returned by <code>next()</code></td><td>O(1)</td></tr>
              <tr><td><code>previousIndex()</code></td><td>Returns index of element that would be returned by <code>previous()</code></td><td>O(1)</td></tr>
              <tr><td><code>remove()</code></td><td>Removes the last element returned by <code>next()</code> or <code>previous()</code></td><td>O(1)</td></tr>
              <tr><td><code>set(E e)</code></td><td>Replaces the last element returned by <code>next()</code> or <code>previous()</code></td><td>O(1)</td></tr>
              <tr><td><code>add(E e)</code></td><td>Inserts element immediately before the element that <code>next()</code> would return</td><td>O(1) for LinkedList; O(n) for ArrayList</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>Iterator vs ListIterator vs Spliterator — Comparison</h3></div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Feature</th><th>Iterator</th><th>ListIterator</th><th>Spliterator</th></tr></thead>
            <tbody>
              <tr><td><strong>Direction</strong></td><td>Forward only</td><td>Forward &amp; backward</td><td>Forward only (parallel)</td></tr>
              <tr><td><strong>Applicable to</strong></td><td>Any <code>Iterable</code> / <code>Collection</code></td><td><code>List</code> only</td><td>Any <code>Collection</code>; also arrays &amp; streams</td></tr>
              <tr><td><strong>Modification</strong></td><td><code>remove()</code> only</td><td><code>add()</code>, <code>set()</code>, <code>remove()</code></td><td>No modification support</td></tr>
              <tr><td><strong>Parallel support</strong></td><td>None</td><td>None</td><td>Yes — <code>trySplit()</code> splits into sub-Spliterators</td></tr>
              <tr><td><strong>Index access</strong></td><td>No</td><td>Yes — <code>nextIndex()</code>, <code>previousIndex()</code></td><td>No (but knows <code>estimateSize()</code>)</td></tr>
              <tr><td><strong>Characteristics</strong></td><td>None declared</td><td>None declared</td><td>Bitmask: ORDERED, SIZED, SORTED, DISTINCT, etc.</td></tr>
              <tr><td><strong>Usage</strong></td><td>Sequential traversal; safe removal</td><td>Sequential bidirectional traversal of lists</td><td>Stream API, parallel operations, bulk traversal</td></tr>
              <tr><td><strong>Introduced</strong></td><td>Java 1.2</td><td>Java 1.2</td><td>Java 8</td></tr>
            </tbody>
          </table>
        </div>
        <Code>{
`// ListIterator — bidirectional + mutation
List<Integer> nums = new ArrayList<>(List.of(1, 2, 3));
ListIterator<Integer> li = nums.listIterator();
while (li.hasNext()) {
    int n = li.next();
    li.set(n * 2); // double each element in-place
}
// nums = [2, 4, 6]

// Spliterator — parallel stream
Spliterator<Integer> sp = nums.spliterator();
System.out.println(sp.estimateSize()); // 3
nums.stream().parallel().forEach(System.out::println);`
        }</Code>
      </div>
    </>
  );
}
