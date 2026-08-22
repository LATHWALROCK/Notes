import Code from "../components/Code.jsx";
export default function Part4() {
  return (
    <>
      {/* 4.1 */}
      <div id="s4-1" data-topic-boundary="true" />

      <div className="subsection-header"><h3>Race Condition — The Counter++ Problem</h3></div>
      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Warning</div>
        <strong><code>counter++</code> is NOT atomic.</strong> It is 3 separate operations: <strong>READ</strong>{' '}
        (load counter) → <strong>MODIFY</strong> (add 1) → <strong>WRITE</strong> (store result). Two threads can
        interleave these steps, causing lost updates.
      </div>
      <pre className="diagram">{
`Thread 1          Thread 2         counter value
READ counter=5                      5
                  READ counter=5    5
ADD 1 → 6                           5
                  ADD 1 → 6         5
WRITE 6                             6
                  WRITE 6           6   ← expected 7, got 6! Update lost!`
      }</pre>
      <Code>{
`// UNSAFE — race condition
public class UnsafeCounter {
    private int count = 0;
    public void increment() { count++; }   // NOT thread-safe!
    public int  getCount()  { return count; }
}`
      }</Code>

      <div className="subsection-header"><h3>Critical Section &amp; Mutual Exclusion</h3></div>
      <p>
        A <strong>critical section</strong> is code that accesses shared mutable state. <strong>Mutual
        exclusion</strong> ensures only one thread executes it at a time.
      </p>

      <div className="subsection-header"><h3>Intrinsic Locks / Monitors</h3></div>
      <div className="callout callout-key">
        <div className="callout-title">🔑 Key Concept</div>
        Every Java object has a built-in <strong>intrinsic lock</strong> (monitor lock). When a thread enters a{' '}
        <code>synchronized</code> method/block, it acquires the object's lock. Other threads trying to enter{' '}
        <em>any</em> synchronized method on the same object are blocked until the lock is released.
      </div>

      <div className="subsection-header"><h3>synchronized Method vs Block</h3></div>
      <Code>{
`public class SafeCounter {
    private int count = 0;
    private final Object lock = new Object();

    // Method-level: locks 'this' object
    public synchronized void increment() {
        count++;
    }

    // Block-level: finer-grained, specify lock object explicitly
    public void add(int n) {
        synchronized (lock) {   // only this block is protected
            count += n;
        }
        // other non-critical work here runs concurrently
    }

    // Static synchronized: locks the CLASS object, not instance
    public static synchronized void staticMethod() { /* ... */ }

    public int getCount() { return count; }
}`
      }</Code>

      <div className="subsection-header"><h3>Reentrant Locks</h3></div>
      <p>
        Java's intrinsic locks are <strong>reentrant</strong>: a thread that already holds a lock can re-enter
        another <code>synchronized</code> method on the same object without blocking itself.
      </p>
      <Code>{
`public synchronized void methodA() {
    methodB();   // OK! same thread already holds 'this' lock
}
public synchronized void methodB() { /* ... */ }`
      }</Code>

      <div className="subsection-header"><h3>Drawbacks of Intrinsic Locks</h3></div>
      <ul>
        <li>No <code>tryLock()</code> — cannot attempt without blocking indefinitely</li>
        <li>No timeout — can wait forever</li>
        <li>Cannot interrupt a thread waiting for a monitor lock</li>
        <li>All waiters contend on same lock — no read/write separation</li>
      </ul>

      <div className="subsection-header"><h3>volatile Keyword</h3></div>
      <div className="callout callout-key">
        <div className="callout-title">🔑 Key Concept</div>
        <strong><code>volatile</code> guarantees visibility, NOT atomicity.</strong> Reads/writes to a{' '}
        <code>volatile</code> variable go directly to main memory — no CPU cache buffering. Establishes a{' '}
        <em>happens-before</em> relationship for that variable.
      </div>
      <Code>{
`public class StatusFlag {
    private volatile boolean running = true;   // visible to all threads

    public void stop()      { running = false; }  // write visible immediately
    public boolean isOn()  { return running; }    // always reads fresh value
}

// volatile is NOT enough for compound operations:
private volatile int count = 0;
count++;   // STILL a race! volatile ≠ atomic`
      }</Code>

      <div className="subsection-header"><h3>volatile vs synchronized</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Property</th><th><code>volatile</code></th><th><code>synchronized</code></th></tr></thead>
          <tbody>
            <tr><td>Visibility</td><td>✓ Guaranteed</td><td>✓ Guaranteed</td></tr>
            <tr><td>Atomicity</td><td>✗ Single read/write only</td><td>✓ Entire block is atomic</td></tr>
            <tr><td>Mutual exclusion</td><td>✗ No locking</td><td>✓ One thread at a time</td></tr>
            <tr><td>Performance</td><td>Faster (no lock overhead)</td><td>Slower (lock acquire/release)</td></tr>
            <tr><td>Use for</td><td>Simple flags, status, single variable</td><td>Compound operations, multiple variables</td></tr>
            <tr><td>Blocking</td><td>Never blocks</td><td>Can block threads</td></tr>
          </tbody>
        </table>
      </div>

      {/* 4.2 */}
      <div id="s4-2" data-topic-boundary="true" />

      <div className="subsection-header"><h3>Lock Interface</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>lock()</code></td><td>Acquires lock; blocks until available</td></tr>
            <tr><td><code>tryLock()</code></td><td>Acquires immediately if available; returns <code>boolean</code>; never blocks</td></tr>
            <tr><td><code>tryLock(long time, TimeUnit unit)</code></td><td>Waits up to given time; returns <code>boolean</code></td></tr>
            <tr><td><code>lockInterruptibly()</code></td><td>Like <code>lock()</code> but can be interrupted while waiting</td></tr>
            <tr><td><code>unlock()</code></td><td>Releases the lock; must be in <code>finally</code> block</td></tr>
            <tr><td><code>newCondition()</code></td><td>Returns a <code>Condition</code> bound to this lock</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>ReentrantLock — Basic Pattern</h3></div>
      <Code>{
`import java.util.concurrent.locks.*;

public class SafeCounter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();

    public void increment() {
        lock.lock();
        try {
            count++;              // critical section
        } finally {
            lock.unlock();      // ALWAYS in finally to avoid lock leak
        }
    }

    public int getCount() {
        lock.lock();
        try { return count; }
        finally { lock.unlock(); }
    }
}`
      }</Code>

      <div className="subsection-header"><h3>tryLock() Pattern — Avoiding Deadlock</h3></div>
      <Code>{
`public boolean transfer(Account from, Account to, double amount) {
    boolean fromLocked = false, toLocked = false;
    try {
        fromLocked = from.lock.tryLock(100, TimeUnit.MILLISECONDS);
        toLocked   = to.lock.tryLock(100, TimeUnit.MILLISECONDS);
        if (fromLocked && toLocked) {
            from.balance -= amount;
            to.balance   += amount;
            return true;
        }
        return false;   // retry or abort if either lock not acquired
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        return false;
    } finally {
        if (toLocked)   to.lock.unlock();
        if (fromLocked) from.lock.unlock();
    }
}`
      }</Code>

      <div className="subsection-header"><h3>ReentrantReadWriteLock</h3></div>
      <div className="callout callout-key">
        <div className="callout-title">🔑 Key Concept</div>
        <strong>Rule:</strong> Multiple threads can hold the <em>read lock</em> simultaneously (readers don't block
        each other). Only one thread can hold the <em>write lock</em>, and it excludes all readers. Perfect for
        read-heavy caches.
      </div>
      <Code>{
`ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
Lock readLock  = rwLock.readLock();
Lock writeLock = rwLock.writeLock();
Map<String, String> cache = new HashMap<>();

public String get(String key) {
    readLock.lock();
    try { return cache.get(key); }
    finally { readLock.unlock(); }   // multiple threads can read in parallel
}

public void put(String key, String val) {
    writeLock.lock();
    try { cache.put(key, val); }
    finally { writeLock.unlock(); }  // exclusive: no readers allowed
}`
      }</Code>

      <div className="subsection-header"><h3>StampedLock (Java 8+) — Optimistic Reading</h3></div>
      <Code>{
`StampedLock sl = new StampedLock();

double read() {
    long stamp = sl.tryOptimisticRead();   // no actual lock acquired
    double value = x;
    if (!sl.validate(stamp)) {             // was a write in between?
        stamp = sl.readLock();             // fall back to real read lock
        try { value = x; }
        finally { sl.unlockRead(stamp); }
    }
    return value;
}`
      }</Code>

      <div className="subsection-header"><h3>Fairness</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th></th><th>Fair Lock <code>new ReentrantLock(true)</code></th><th>Non-fair (default)</th></tr></thead>
          <tbody>
            <tr><td>Acquisition order</td><td>FIFO — longest-waiting thread first</td><td>Any waiting thread (barging allowed)</td></tr>
            <tr><td>Starvation</td><td>Prevented</td><td>Possible</td></tr>
            <tr><td>Throughput</td><td>Lower (strict ordering overhead)</td><td>Higher (barging improves throughput)</td></tr>
            <tr><td>Use when</td><td>Starvation is a real concern</td><td>Default — most applications</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Lock vs synchronized</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Feature</th><th><code>synchronized</code></th><th><code>ReentrantLock</code></th></tr></thead>
          <tbody>
            <tr><td>tryLock()</td><td>✗</td><td>✓</td></tr>
            <tr><td>Timeout</td><td>✗</td><td>✓ <code>tryLock(time, unit)</code></td></tr>
            <tr><td>Interruptible wait</td><td>✗</td><td>✓ <code>lockInterruptibly()</code></td></tr>
            <tr><td>Fairness option</td><td>✗</td><td>✓ constructor param</td></tr>
            <tr><td>Multiple conditions</td><td>✗ (one per object)</td><td>✓ <code>newCondition()</code></td></tr>
            <tr><td>Automatic release</td><td>✓ (JVM handles)</td><td>✗ (must call <code>unlock()</code> in finally)</td></tr>
            <tr><td>Reentrant</td><td>✓</td><td>✓</td></tr>
            <tr><td>Performance</td><td>Good (JVM optimized)</td><td>Good (similar)</td></tr>
          </tbody>
        </table>
      </div>

      {/* 4.3 */}
      <div id="s4-3" data-topic-boundary="true" />

      <div className="subsection-header"><h3>wait() / notify() / notifyAll()</h3></div>
      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Warning</div>
        These methods must be called from within a <code>synchronized</code> block/method on the same object.
        Calling them outside throws <code>IllegalMonitorStateException</code>.
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Action</th><th>Lock released?</th></tr></thead>
          <tbody>
            <tr><td><code>wait()</code></td><td>Releases lock and waits indefinitely until notified</td><td>✓ Yes</td></tr>
            <tr><td><code>wait(long ms)</code></td><td>Waits up to ms milliseconds, then re-acquires</td><td>✓ Yes</td></tr>
            <tr><td><code>notify()</code></td><td>Wakes ONE arbitrary waiting thread</td><td>✗ Not until block exits</td></tr>
            <tr><td><code>notifyAll()</code></td><td>Wakes ALL waiting threads (they compete for lock)</td><td>✗ Not until block exits</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Producer-Consumer with wait/notify</h3></div>
      <Code>{
`public class BoundedBuffer<T> {
    private final Queue<T> queue = new LinkedList<>();
    private final int     capacity;

    public BoundedBuffer(int capacity) { this.capacity = capacity; }

    public synchronized void produce(T item) throws InterruptedException {
        while (queue.size() == capacity) {   // ← WHILE not IF (spurious wakeups)
            wait();                           // releases lock; waits
        }
        queue.add(item);
        System.out.println("Produced: " + item);
        notifyAll();                         // wake consumers
    }

    public synchronized T consume() throws InterruptedException {
        while (queue.isEmpty()) {            // ← WHILE not IF
            wait();                           // releases lock; waits
        }
        T item = queue.poll();
        System.out.println("Consumed: " + item);
        notifyAll();                         // wake producers
        return item;
    }
}`
      }</Code>
      <div className="callout callout-key">
        <div className="callout-title">🔑 Key Concept</div>
        <strong>Always use <code>while</code>, never <code>if</code></strong> when checking wait conditions.
        Spurious wakeups (thread wakes without notification) can occur. The <code>while</code> loop re-checks the
        condition and goes back to <code>wait()</code> if it's still not met.
      </div>

      <div className="subsection-header"><h3>Condition Variables (with ReentrantLock)</h3></div>
      <Code>{
`import java.util.concurrent.locks.*;

public class ConditionBuffer<T> {
    private final Lock      lock      = new ReentrantLock();
    private final Condition notFull   = lock.newCondition();
    private final Condition notEmpty  = lock.newCondition();
    private final Queue<T> queue    = new LinkedList<>();
    private final int        capacity;

    public ConditionBuffer(int cap) { this.capacity = cap; }

    public void produce(T item) throws InterruptedException {
        lock.lock();
        try {
            while (queue.size() == capacity) notFull.await();
            queue.add(item);
            notEmpty.signal();   // wake ONE consumer specifically
        } finally { lock.unlock(); }
    }

    public T consume() throws InterruptedException {
        lock.lock();
        try {
            while (queue.isEmpty()) notEmpty.await();
            T item = queue.poll();
            notFull.signal();    // wake ONE producer specifically
            return item;
        } finally { lock.unlock(); }
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Condition vs wait/notify</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Feature</th><th><code>wait/notify</code></th><th><code>Condition (await/signal)</code></th></tr></thead>
          <tbody>
            <tr><td>Lock type</td><td>Intrinsic (synchronized)</td><td>Explicit (<code>ReentrantLock</code>)</td></tr>
            <tr><td>Multiple conditions</td><td>✗ One wait-set per object</td><td>✓ Multiple <code>Condition</code> objects</td></tr>
            <tr><td>Selective wake</td><td>✗ <code>notify()</code> wakes arbitrary</td><td>✓ Signal specific condition</td></tr>
            <tr><td>Interruptible</td><td>✓ <code>InterruptedException</code></td><td>✓ <code>await()</code> also throws it</td></tr>
            <tr><td>Timed wait</td><td>✓ <code>wait(ms)</code></td><td>✓ <code>await(time, unit)</code></td></tr>
            <tr><td>Method names</td><td><code>wait()</code>, <code>notify()</code>, <code>notifyAll()</code></td>
              <td><code>await()</code>, <code>signal()</code>, <code>signalAll()</code></td></tr>
          </tbody>
        </table>
      </div>

      {/* 4.4 */}
      <div id="s4-4" data-topic-boundary="true" />

      <div className="subsection-header"><h3>The 4 Necessary Conditions for Deadlock</h3></div>
      <p>ALL four must hold simultaneously. Remove any one to prevent deadlock.</p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Condition</th><th>Meaning</th><th>How to break it</th></tr></thead>
          <tbody>
            <tr><td><strong>Mutual Exclusion</strong></td><td>At least one resource is held non-shareably</td>
              <td>Use shareable resources (read locks)</td></tr>
            <tr><td><strong>Hold &amp; Wait</strong></td><td>Thread holds resource(s) while waiting for more</td>
              <td>Acquire all resources at once or release before waiting</td></tr>
            <tr><td><strong>No Preemption</strong></td><td>Resources cannot be forcibly taken away</td>
              <td>Use <code>tryLock()</code> with timeout</td></tr>
            <tr><td><strong>Circular Wait</strong></td><td>Chain of threads, each waiting for the next's resource</td>
              <td><strong>Lock ordering</strong> — always acquire locks in the same fixed order</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Deadlock Example</h3></div>
      <Code>{
`final Object lockA = new Object();
final Object lockB = new Object();

// Thread 1: acquires lockA, then waits for lockB
Thread t1 = new Thread(() -> {
    synchronized (lockA) {
        System.out.println("T1 holds lockA, waiting for lockB");
        try { Thread.sleep(50); } catch (InterruptedException e) {}
        synchronized (lockB) {   // ← DEADLOCK: T2 holds lockB
            System.out.println("T1 acquired both locks");
        }
    }
});

// Thread 2: acquires lockB, then waits for lockA
Thread t2 = new Thread(() -> {
    synchronized (lockB) {
        System.out.println("T2 holds lockB, waiting for lockA");
        try { Thread.sleep(50); } catch (InterruptedException e) {}
        synchronized (lockA) {   // ← DEADLOCK: T1 holds lockA
            System.out.println("T2 acquired both locks");
        }
    }
});
t1.start(); t2.start();`
      }</Code>

      <div className="subsection-header"><h3>Deadlock Prevention — Lock Ordering</h3></div>
      <Code>{
`// FIX: always acquire locks in the same canonical order
void transfer(Account a, Account b, double amt) {
    Account first  = a.id < b.id ? a : b;   // consistent order by ID
    Account second = a.id < b.id ? b : a;
    synchronized (first) {
        synchronized (second) {
            first.balance  -= amt;
            second.balance += amt;
        }
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Deadlock Avoidance — tryLock with Timeout</h3></div>
      <Code>{
`boolean acquireBothOrFail(ReentrantLock l1, ReentrantLock l2)
        throws InterruptedException {
    if (l1.tryLock(50, TimeUnit.MILLISECONDS)) {
        try {
            if (l2.tryLock(50, TimeUnit.MILLISECONDS)) {
                try {
                    doWork();
                    return true;
                } finally { l2.unlock(); }
            }
        } finally { l1.unlock(); }
    }
    return false;   // couldn't get both; caller can retry with backoff
}`
      }</Code>

      <div className="subsection-header"><h3>Deadlock Detection — Thread Dumps</h3></div>
      <div className="callout callout-tip">
        <div className="callout-title">💡 Tip</div>
        <strong>jstack</strong> — attach to running JVM: <code>jstack &lt;PID&gt;</code><br />
        Produces a thread dump showing each thread's state and lock waits.<br />
        Look for: <code>"Found one Java-level deadlock:"</code> sections.<br />
        In IDEs: IDEA and Eclipse have built-in thread dump analyzers.<br />
        Online: paste dump at <em>fastthread.io</em> for visual analysis.
      </div>

      <div className="subsection-header"><h3>Starvation, Livelock &amp; Other Liveness Hazards</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Problem</th><th>Description</th><th>Solution</th></tr></thead>
          <tbody>
            <tr><td><strong>Starvation</strong></td>
              <td>A thread never gets CPU or lock due to scheduling; low-priority thread perpetually eclipsed</td>
              <td>Use fair locks (<code>new ReentrantLock(true)</code>); avoid extreme priority differences</td></tr>
            <tr><td><strong>Livelock</strong></td>
              <td>Threads keep responding to each other's actions but make no progress — both "politely yield" forever</td>
              <td>Introduce randomness in retry timing; use structured protocols</td></tr>
            <tr><td><strong>Priority Inversion</strong></td>
              <td>High-priority thread blocked because low-priority holds resource needed by medium-priority</td>
              <td>Priority inheritance protocols; avoid holding locks across long operations</td></tr>
          </tbody>
        </table>
      </div>

      {/* 4.5 */}
      <div id="s4-5" data-topic-boundary="true" />

      <div className="subsection-header"><h3>Why Not Manual Thread Creation?</h3></div>
      <ul>
        <li>No upper bound → resource exhaustion under load</li>
        <li>Thread creation is expensive: OS memory allocation, kernel objects</li>
        <li>No task queue management or result retrieval</li>
        <li>No lifecycle management (graceful shutdown)</li>
      </ul>

      <div className="subsection-header"><h3>Interface Hierarchy</h3></div>
      <pre className="diagram">{
`Executor
  └── ExecutorService
        └── ScheduledExecutorService`
      }</pre>

      <div className="subsection-header"><h3>Executors Factory Methods</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Pool size</th><th>Queue</th><th>Best for</th></tr></thead>
          <tbody>
            <tr><td><code>newFixedThreadPool(n)</code></td><td>Fixed n threads</td>
              <td>Unbounded <code>LinkedBlockingQueue</code></td><td>Stable load, CPU-bound tasks</td></tr>
            <tr><td><code>newCachedThreadPool()</code></td><td>0–Integer.MAX_VALUE</td>
              <td>SynchronousQueue; idle threads reused for 60s</td><td>Many short-lived tasks</td></tr>
            <tr><td><code>newSingleThreadExecutor()</code></td><td>1 thread</td>
              <td>Unbounded queue; tasks serialized</td><td>Sequential processing, ordered tasks</td></tr>
            <tr><td><code>newScheduledThreadPool(n)</code></td><td>Fixed n threads</td>
              <td>Delay queue</td><td>Delayed/periodic tasks</td></tr>
            <tr><td><code>newWorkStealingPool()</code> (Java 8+)</td><td>CPU cores</td>
              <td>Work-stealing deques</td><td>Recursive/parallel computations</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>ExecutorService Methods</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Accepts</th><th>Returns</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><code>execute(Runnable)</code></td><td>Runnable</td><td>void</td><td>Fire and forget; no result</td></tr>
            <tr><td><code>submit(Runnable)</code></td><td>Runnable</td><td><code>Future&lt;?&gt;</code></td><td>Future.get() returns null</td></tr>
            <tr><td><code>submit(Callable&lt;T&gt;)</code></td><td>Callable</td><td><code>Future&lt;T&gt;</code></td><td>Result retrievable via get()</td></tr>
            <tr><td><code>invokeAll(Collection)</code></td><td>List of Callables</td><td><code>List&lt;Future&gt;</code></td><td>Blocks until ALL complete</td></tr>
            <tr><td><code>invokeAny(Collection)</code></td><td>List of Callables</td><td><code>T</code></td><td>Returns first success; cancels rest</td></tr>
            <tr><td><code>shutdown()</code></td><td>—</td><td>void</td><td>No new tasks; finishes queued</td></tr>
            <tr><td><code>shutdownNow()</code></td><td>—</td><td><code>List&lt;Runnable&gt;</code></td><td>Attempts interrupt; returns unstarted</td></tr>
            <tr><td><code>awaitTermination(t, unit)</code></td><td>timeout</td><td>boolean</td><td>Waits for shutdown to complete</td></tr>
            <tr><td><code>isShutdown()</code></td><td>—</td><td>boolean</td><td>True after shutdown() called</td></tr>
            <tr><td><code>isTerminated()</code></td><td>—</td><td>boolean</td><td>True when all tasks finished</td></tr>
          </tbody>
        </table>
      </div>
      <Code>{
`import java.util.concurrent.*;

ExecutorService pool = Executors.newFixedThreadPool(4);

// Submit Callable for result
Future<String> future = pool.submit(() -> {
    Thread.sleep(500);
    return "Done!";
});

try {
    String result = future.get(1, TimeUnit.SECONDS);  // wait up to 1s
    System.out.println(result);
} catch (TimeoutException e)     { future.cancel(true); }
  catch (ExecutionException e)    { e.getCause().printStackTrace(); }
  catch (InterruptedException e)  { Thread.currentThread().interrupt(); }
finally {
    pool.shutdown();
    pool.awaitTermination(5, TimeUnit.SECONDS);
}`
      }</Code>

      <div className="subsection-header"><h3>Callable vs Runnable</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th></th><th><code>Runnable</code></th><th><code>Callable&lt;V&gt;</code></th></tr></thead>
          <tbody>
            <tr><td>Method</td><td><code>void run()</code></td><td><code>V call() throws Exception</code></td></tr>
            <tr><td>Return value</td><td>✗ None</td><td>✓ Returns result of type V</td></tr>
            <tr><td>Checked exceptions</td><td>✗ Cannot throw</td><td>✓ Can throw any Exception</td></tr>
            <tr><td>Use with</td><td><code>Thread</code>, <code>execute()</code>, <code>submit()</code></td>
              <td><code>submit()</code>, <code>invokeAll()</code>, <code>invokeAny()</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Future Interface</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>get()</code></td><td>Blocks until result available; throws <code>ExecutionException</code> if task threw</td></tr>
            <tr><td><code>get(long, TimeUnit)</code></td><td>Waits up to timeout; throws <code>TimeoutException</code></td></tr>
            <tr><td><code>isDone()</code></td><td>True if completed (normally, exceptionally, or cancelled)</td></tr>
            <tr><td><code>isCancelled()</code></td><td>True if cancelled before completion</td></tr>
            <tr><td><code>cancel(boolean mayInterrupt)</code></td><td>Attempts cancellation; if running and mayInterrupt=true, interrupts thread</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>CompletableFuture (Java 8+)</h3></div>
      <div className="callout callout-key">
        <div className="callout-title">🔑 Key Concept</div>
        <strong>CompletableFuture</strong> enables non-blocking, composable async programming without blocking{' '}
        <code>get()</code> calls.
      </div>
      <Code>{
`CompletableFuture.supplyAsync(() -> fetchUser(42))          // async step 1
    .thenApply(user -> enrichUser(user))                    // transform result
    .thenAccept(rich -> System.out.println("Got: " + rich))   // consume (void)
    .exceptionally(ex -> { System.err.println(ex); return null; });

// Combine multiple futures
CompletableFuture<String> cf1 = CompletableFuture.supplyAsync(() -> "A");
CompletableFuture<String> cf2 = CompletableFuture.supplyAsync(() -> "B");
CompletableFuture.allOf(cf1, cf2).join();   // wait for both
// thenCompose: flatMap (chain dependent futures)
// anyOf: first to complete wins`
      }</Code>

      <div className="subsection-header"><h3>ScheduledExecutorService</h3></div>
      <Code>{
`ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(2);

// Run once after 3-second delay
scheduler.schedule(() -> System.out.println("Delayed"), 3, TimeUnit.SECONDS);

// Run every 5s (fixed RATE — next run at start + 5s regardless of duration)
scheduler.scheduleAtFixedRate(() -> System.out.println("Fixed rate"),
    0, 5, TimeUnit.SECONDS);

// Run 5s after PREVIOUS run COMPLETES (fixed DELAY — gap between completions)
scheduler.scheduleWithFixedDelay(() -> System.out.println("Fixed delay"),
    0, 5, TimeUnit.SECONDS);`
      }</Code>
      <pre className="diagram">{
`scheduleAtFixedRate (period=5s, task takes 2s):
  |--task(2s)--|   |--task(2s)--|   |--task(2s)--|
  0            5   5            10  10           15  ← next at 0+5, 0+10, 0+15

scheduleWithFixedDelay (delay=5s, task takes 2s):
  |--task(2s)--|--delay(5s)--|--task(2s)--|--delay(5s)--|
  0            2             7            9             14  ← gap from end`
      }</pre>

      {/* 4.6 */}
      <div id="s4-6" data-topic-boundary="true" />

      <div className="subsection-header"><h3>CountDownLatch</h3></div>
      <p>
        Allows one or more threads to wait until a set of operations completes. Count starts at N, decremented by{' '}
        <code>countDown()</code>. Cannot be reset.
      </p>
      <Code>{
`CountDownLatch latch = new CountDownLatch(3);   // 3 workers must finish

for (int i = 0; i < 3; i++) {
    final int id = i;
    new Thread(() -> {
        try {
            doWork(id);
        } finally {
            latch.countDown();   // decrement; never skip — use finally
        }
    }).start();
}

latch.await();                // main thread blocks until count reaches 0
System.out.println("All workers done!");
// Optional: latch.await(5, TimeUnit.SECONDS)  — with timeout`
      }</Code>

      <div className="subsection-header"><h3>CyclicBarrier</h3></div>
      <p>
        N parties each call <code>await()</code>; all block until all N have arrived, then are released together.
        Can be <strong>reused</strong> for multiple phases.
      </p>
      <Code>{
`CyclicBarrier barrier = new CyclicBarrier(3, () ->
    System.out.println("=== Phase complete, all threads proceed ===")
);

Runnable worker = () -> {
    try {
        doPhase1();
        barrier.await();   // wait for all 3 to reach this point
        doPhase2();
        barrier.await();   // barrier reused for phase 2!
    } catch (BrokenBarrierException | InterruptedException e) {
        Thread.currentThread().interrupt();
    }
};`
      }</Code>

      <div className="subsection-header"><h3>CountDownLatch vs CyclicBarrier</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th></th><th>CountDownLatch</th><th>CyclicBarrier</th></tr></thead>
          <tbody>
            <tr><td>Reusable?</td><td>✗ One-time use</td><td>✓ Auto-resets after each phase</td></tr>
            <tr><td>Who waits?</td><td>Waiting thread(s) + countdown thread(s) separate</td><td>All N parties wait for each other</td></tr>
            <tr><td>Count down by</td><td>Any thread calling <code>countDown()</code></td><td>Only parties calling <code>await()</code></td></tr>
            <tr><td>Barrier action</td><td>✗</td><td>✓ Optional Runnable on each trip</td></tr>
            <tr><td>Broken state</td><td>N/A</td><td>Thread dies → <code>BrokenBarrierException</code></td></tr>
            <tr><td>Best for</td><td>Wait for N events/services to be ready</td><td>Multi-phase parallel algorithms</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Semaphore</h3></div>
      <p>Controls access to N permits. Used to limit concurrent access to a resource pool (e.g. max 5 DB connections).</p>
      <Code>{
`Semaphore sem = new Semaphore(5);   // max 5 concurrent accesses

void accessResource() throws InterruptedException {
    sem.acquire();          // blocks if 0 permits available
    try {
        useResource();
    } finally {
        sem.release();      // always release in finally
    }
}

// A Semaphore(1) behaves like a mutex (binary semaphore)`
      }</Code>

      <div className="subsection-header"><h3>Atomic Variables</h3></div>
      <div className="callout callout-key">
        <div className="callout-title">🔑 Key Concept</div>
        Atomic classes use <strong>CAS (Compare-And-Swap)</strong> — a single hardware instruction that atomically
        reads, compares, and writes. No locks needed; very fast under low-medium contention.
      </div>
      <Code>{
`AtomicInteger counter = new AtomicInteger(0);

counter.getAndIncrement();           // i++ (atomic)
counter.incrementAndGet();           // ++i (atomic)
counter.addAndGet(5);               // counter += 5 (atomic)
counter.get();                        // read current value
counter.set(100);                    // write (volatile write)

// CAS — change only if current value equals expected
boolean updated = counter.compareAndSet(50, 51);   // returns true if swapped

// AtomicReference for objects
AtomicReference<String> ref = new AtomicReference<>("initial");
ref.compareAndSet("initial", "updated");`
      }</Code>

      <div className="subsection-header"><h3>CAS &amp; ABA Problem</h3></div>
      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Warning</div>
        <strong>ABA problem:</strong> Value changes A→B→A. CAS sees A and succeeds, not knowing it changed. Fix: Use{' '}
        <code>AtomicStampedReference</code> (version number) or <code>AtomicMarkableReference</code>.
      </div>

      <div className="subsection-header"><h3>Concurrent Collections</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Class</th><th>Thread-safety mechanism</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><code>ConcurrentHashMap</code></td><td>Java 7: segment locking; Java 8+: CAS + per-bucket sync</td>
              <td>No lock for reads; null keys/values not allowed</td></tr>
            <tr><td><code>CopyOnWriteArrayList</code></td><td>Copy-on-write: new array on every write</td>
              <td>Reads are lock-free; writes are expensive; good for rare-write scenarios</td></tr>
            <tr><td><code>ArrayBlockingQueue</code></td><td>Single ReentrantLock, bounded</td>
              <td>Fixed capacity; blocks on full/empty</td></tr>
            <tr><td><code>LinkedBlockingQueue</code></td><td>Two locks (head/tail)</td>
              <td>Optionally bounded; higher throughput than Array version</td></tr>
            <tr><td><code>ConcurrentLinkedQueue</code></td><td>Lock-free CAS</td><td>Unbounded; non-blocking</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>ConcurrentHashMap vs HashMap vs Hashtable</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th></th><th>HashMap</th><th>Hashtable</th><th>ConcurrentHashMap</th></tr></thead>
          <tbody>
            <tr><td>Thread-safe</td><td>✗</td><td>✓ (entire map lock)</td><td>✓ (fine-grained)</td></tr>
            <tr><td>Null keys/values</td><td>✓ 1 null key, null values</td><td>✗</td><td>✗</td></tr>
            <tr><td>Performance (concurrent)</td><td>Unsafe</td><td>Poor (full lock)</td><td>Excellent</td></tr>
            <tr><td>Iterator</td><td>Fail-fast</td><td>Fail-fast</td><td>Weakly consistent (no CME)</td></tr>
            <tr><td>Atomic ops</td><td>✗</td><td>✗</td><td>✓ <code>putIfAbsent()</code>, <code>computeIfAbsent()</code></td></tr>
            <tr><td>Java version</td><td>1.2</td><td>1.0 (legacy)</td><td>5.0</td></tr>
          </tbody>
        </table>
      </div>
      <Code>{
`// ConcurrentHashMap atomic operations
ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

map.putIfAbsent("key", 1);                       // atomic insert-if-absent
map.computeIfAbsent("key", k -> compute(k));     // compute only if missing
map.merge("key", 1, Integer::sum);               // atomic: put or merge

// Word frequency count — thread-safe
words.forEach(w -> map.merge(w, 1, Integer::sum));`
      }</Code>
    </>
  );
}
