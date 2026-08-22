import Code from "../components/Code.jsx";
export default function Part3() {
  return (
    <>
      {/* 3.1 */}
      <div id="s3-1" data-topic-boundary="true" />
      <p>
        Every throwable thing in Java extends <code>Throwable</code>. Two top-level branches:{' '}
        <strong>Error</strong> (JVM-level, normally unrecoverable) and <strong>Exception</strong> (application-level,
        many are recoverable).
      </p>
      <pre className="diagram">{
`Throwable
├── Error  (unchecked — do NOT catch)
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── VirtualMachineError
└── Exception
    ├── RuntimeException  (unchecked)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── ClassCastException
    │   ├── ArithmeticException
    │   └── IllegalArgumentException
    └── Checked Exceptions  (must handle or declare)
        ├── IOException
        ├── SQLException
        ├── ClassNotFoundException
        └── InterruptedException`
      }</pre>

      <div className="subsection-header"><h3>Checked vs Unchecked</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Property</th><th>Checked</th><th>Unchecked</th></tr></thead>
          <tbody>
            <tr><td>Definition</td><td>Compiler verifies you handle them</td><td>Compiler does NOT verify</td></tr>
            <tr><td>Base class</td><td><code>Exception</code> (non-Runtime)</td>
              <td><code>RuntimeException</code> or <code>Error</code></td></tr>
            <tr><td>Must handle?</td><td>Yes — catch or declare <code>throws</code></td><td>No — optional</td></tr>
            <tr><td>When thrown</td><td>Recoverable external conditions (IO, DB)</td>
              <td>Programming bugs or JVM failure</td></tr>
            <tr><td>Examples</td><td><code>IOException</code>, <code>SQLException</code></td>
              <td><code>NullPointerException</code>, <code>ArithmeticException</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>try-catch-finally</h3></div>
      <div className="callout callout-key">
        <div className="callout-title">🔑 Key Concept</div>
        <strong>Execution order:</strong> <code>try</code> → if exception → matching <code>catch</code> →{' '}
        <code>finally</code> (always). <code>finally</code> runs even if <code>return</code> is inside{' '}
        <code>try</code>. Only <code>System.exit()</code> or JVM crash skips <code>finally</code>.
      </div>
      <Code>{
`try {
    String s = null;
    s.length();               // throws NullPointerException
} catch (NullPointerException e) {
    System.out.println("Caught: " + e.getMessage());
} catch (Exception e) {      // broader catch MUST come after
    System.out.println("General: " + e.getMessage());
} finally {
    System.out.println("Always runs");
}`
      }</Code>

      <div className="subsection-header"><h3>Multi-catch (Java 7+)</h3></div>
      <Code>{
`try {
    riskyOperation();
} catch (IOException | SQLException e) {   // single handler, pipe-separated
    log.error("Data error", e);
}`
      }</Code>

      <div className="subsection-header"><h3>try-with-resources (Java 7+)</h3></div>
      <p>
        Resources implementing <code>AutoCloseable</code> are closed automatically in{' '}
        <em>reverse declaration order</em>, even if an exception is thrown.
      </p>
      <Code>{
`try (FileInputStream fis = new FileInputStream("data.txt");
     BufferedReader  br  = new BufferedReader(new InputStreamReader(fis))) {
    String line;
    while ((line = br.readLine()) != null) System.out.println(line);
} // br closed first, then fis — no explicit finally needed`
      }</Code>

      <div className="subsection-header"><h3>throw vs throws</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th></th><th><code>throw</code></th><th><code>throws</code></th></tr></thead>
          <tbody>
            <tr><td>Purpose</td><td>Actually throw an exception object</td><td>Declare method may throw</td></tr>
            <tr><td>Location</td><td>Inside method body</td><td>Method signature</td></tr>
            <tr><td>Followed by</td><td>An exception <em>instance</em></td><td>Exception <em>class name(s)</em></td></tr>
            <tr><td>Example</td><td><code>throw new IllegalArgumentException("bad");</code></td>
              <td><code>void read() throws IOException</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Custom Exceptions</h3></div>
      <Code>{
`// Checked custom exception
public class InsufficientFundsException extends Exception {
    private final double amount;
    public InsufficientFundsException(double amount) {
        super("Insufficient funds: needed " + amount);
        this.amount = amount;
    }
    public double getAmount() { return amount; }
}

// Unchecked custom exception
public class InvalidOrderException extends RuntimeException {
    public InvalidOrderException(String msg) { super(msg); }
    public InvalidOrderException(String msg, Throwable cause) { super(msg, cause); }
}`
      }</Code>

      <div className="subsection-header"><h3>Exception Chaining</h3></div>
      <Code>{
`try {
    connectToDatabase();
} catch (SQLException e) {
    // Wrap lower-level exception; original cause preserved
    throw new RuntimeException("DB connection failed", e);
}
// Retrieve later: e.getCause()`
      }</Code>
      <div className="callout callout-tip">
        <div className="callout-title">💡 Tip</div>
        <strong>Best Practices:</strong>
        <ul>
          <li>Never swallow exceptions silently: <code>catch(Exception e) {'{}'}</code> hides bugs.</li>
          <li>Never catch <code>Throwable</code> or <code>Error</code> in application code.</li>
          <li>Catch the most specific type first (more specific → more general).</li>
          <li>Include meaningful messages and preserve the cause chain.</li>
          <li>Use checked exceptions for recoverable conditions; unchecked for programming errors.</li>
          <li>Document with <code>@throws</code> Javadoc even for unchecked exceptions.</li>
        </ul>
      </div>

      {/* 3.2 */}
      <div id="s3-2" data-topic-boundary="true" />

      <div className="subsection-header"><h3>CPU Components</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Component</th><th>Role</th></tr></thead>
          <tbody>
            <tr><td><strong>ALU</strong> (Arithmetic Logic Unit)</td><td>Performs arithmetic (+, −, ×, ÷) and logical (AND, OR, NOT) operations</td></tr>
            <tr><td><strong>Control Unit (CU)</strong></td><td>Fetches, decodes, and coordinates execution of instructions</td></tr>
            <tr><td><strong>Registers</strong></td><td>Ultra-fast on-chip storage (PC, IR, accumulator, general-purpose)</td></tr>
            <tr><td><strong>Cache L1</strong></td><td>Smallest (~32 KB), fastest (~1 ns), per-core; holds most-recently used data</td></tr>
            <tr><td><strong>Cache L2</strong></td><td>Medium (~256 KB), ~4 ns; per-core or shared between a pair</td></tr>
            <tr><td><strong>Cache L3</strong></td><td>Large (~8–32 MB), ~10–20 ns; shared across all cores on die</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Memory Hierarchy &amp; Latency</h3></div>
      <pre className="diagram">{
`CPU Core
 └─ Registers     ~0.3 ns   (bytes)
     └─ L1 Cache  ~1   ns   (~32 KB per core)
         └─ L2 Cache ~4 ns  (~256 KB per core)
             └─ L3 Cache ~10-20 ns (~8-32 MB shared)
                 └─ RAM      ~60-100 ns  (GBs)
                     └─ SSD  ~100 µs     (TBs)
                         └─ HDD ~10 ms  (TBs)`
      }</pre>

      <div className="subsection-header"><h3>Program vs Process</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th></th><th>Program</th><th>Process</th></tr></thead>
          <tbody>
            <tr><td>Nature</td><td>Passive — set of instructions on disk</td><td>Active — program in execution</td></tr>
            <tr><td>Location</td><td>Secondary storage (disk)</td><td>Main memory (RAM)</td></tr>
            <tr><td>Lifetime</td><td>Persists until deleted</td><td>Exists only while running</td></tr>
            <tr><td>Resources</td><td>None allocated</td><td>CPU, memory, file handles, etc.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Process Memory Layout</h3></div>
      <pre className="diagram">{
`High address ┌──────────────┐
             │   Stack      │ ← grows downward; local vars, return addresses
             ├──────────────┤
             │      ↓       │
             │      ↑       │
             ├──────────────┤
             │   Heap       │ ← grows upward; dynamic allocations (new)
             ├──────────────┤
             │   Data Segment│ ← global/static variables (BSS + Data)
             ├──────────────┤
Low address  │   Code Segment│ ← compiled bytecode / machine instructions
             └──────────────┘
             + PCB (Process Control Block) managed by OS kernel`
      }</pre>
      <p>
        The <strong>PCB</strong> (Process Control Block) stores: PID, process state, PC, registers, memory maps, open
        files, scheduling info.
      </p>

      <div className="subsection-header"><h3>Process vs Thread</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Property</th><th>Process</th><th>Thread</th></tr></thead>
          <tbody>
            <tr><td>Memory</td><td>Own address space (isolated)</td><td>Shares process address space</td></tr>
            <tr><td>Communication</td><td>IPC (pipes, sockets, shared mem)</td><td>Shared memory (direct, fast)</td></tr>
            <tr><td>Overhead</td><td>High (separate memory maps)</td><td>Low (lightweight)</td></tr>
            <tr><td>Creation time</td><td>Slow (fork/exec)</td><td>Fast</td></tr>
            <tr><td>Context switch</td><td>Expensive (full address space swap)</td><td>Cheaper (same address space)</td></tr>
            <tr><td>Crash impact</td><td>Isolated — doesn't affect others</td><td>Thread crash can kill process</td></tr>
            <tr><td>Java</td><td>Started by OS / JVM launcher</td><td><code>java.lang.Thread</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Context Switching</h3></div>
      <p>
        When the OS switches the CPU from one thread/process to another, it must <strong>save</strong> the current
        execution state and <strong>restore</strong> the next one:
      </p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Saved / Restored</th><th>Details</th></tr></thead>
          <tbody>
            <tr><td>Program Counter (PC)</td><td>Address of next instruction to execute</td></tr>
            <tr><td>CPU Registers</td><td>All general-purpose and special registers</td></tr>
            <tr><td>Stack Pointer (SP)</td><td>Points to top of current stack frame</td></tr>
            <tr><td>Memory maps</td><td>Page table pointer (process switch only)</td></tr>
            <tr><td>I/O state</td><td>Open file descriptors, pending I/O</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Thread States: OS-level vs Java-level</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>OS State</th><th>Java State</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td>New</td><td><code>NEW</code></td><td>Thread created, not yet started</td></tr>
            <tr><td>Ready</td><td><code>RUNNABLE</code></td><td>Eligible to run, waiting for CPU</td></tr>
            <tr><td>Running</td><td><code>RUNNABLE</code></td><td>Actively executing on CPU</td></tr>
            <tr><td>Blocked (I/O)</td><td><code>BLOCKED</code></td><td>Waiting for monitor lock</td></tr>
            <tr><td>Waiting</td><td><code>WAITING</code></td><td>Indefinite wait (wait/join)</td></tr>
            <tr><td>Timed waiting</td><td><code>TIMED_WAITING</code></td><td>Wait with timeout (sleep/join(ms))</td></tr>
            <tr><td>Terminated</td><td><code>TERMINATED</code></td><td>Execution complete</td></tr>
          </tbody>
        </table>
      </div>

      {/* 3.3 */}
      <div id="s3-3" data-topic-boundary="true" />

      <div className="subsection-header"><h3>Core Concepts Comparison</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Concept</th><th>Definition</th><th>Level</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><strong>Multiprogramming</strong></td>
              <td>Multiple programs loaded in memory; CPU switches when one blocks on I/O</td>
              <td>OS</td><td>Batch systems</td></tr>
            <tr><td><strong>Multitasking</strong></td>
              <td>Multiple tasks share CPU via time slicing; gives illusion of parallel execution</td>
              <td>OS/Process</td><td>Running browser + IDE simultaneously</td></tr>
            <tr><td><strong>Multithreading</strong></td>
              <td>Multiple threads within a single process share same memory space</td>
              <td>Thread</td><td>Browser: UI thread + download thread</td></tr>
            <tr><td><strong>Multiprocessing</strong></td>
              <td>Multiple CPUs/cores execute truly in parallel</td>
              <td>Hardware</td><td>Quad-core laptop running parallel tasks</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Concurrency vs Parallelism</h3></div>
      <pre className="diagram">{
`CONCURRENCY (single core — interleaving):
Core 1:  [T1]──[T1]──[T1]──[T2]──[T2]──[T1]──[T2]
          time ─────────────────────────────────►
         Tasks appear simultaneous but take turns

PARALLELISM (multi-core — truly simultaneous):
Core 1:  [T1]──[T1]──[T1]──[T1]──
Core 2:  [T2]──[T2]──[T2]──[T2]──
          time ─────────────────►
         Tasks run at the exact same instant`
      }</pre>
      <div className="callout callout-key">
        <div className="callout-title">🔑 Key Concept</div>
        <strong>Key insight:</strong> Concurrency is about <em>dealing with</em> many things at once (structure).
        Parallelism is about <em>doing</em> many things at once (execution). You can have concurrency without
        parallelism (single core), but parallelism requires concurrent structure.
      </div>

      <div className="subsection-header"><h3>Time Slicing &amp; Scheduling Algorithms</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Algorithm</th><th>How it works</th><th>Pros</th><th>Cons</th></tr></thead>
          <tbody>
            <tr><td><strong>FCFS</strong> (First Come First Served)</td>
              <td>Queue; first arrived gets CPU until it finishes or blocks</td>
              <td>Simple, no starvation</td><td>Convoy effect; poor avg waiting time</td></tr>
            <tr><td><strong>Round Robin</strong></td>
              <td>Each thread gets a fixed time quantum (e.g. 10 ms), then pre-empted</td>
              <td>Fair; good for interactive tasks</td><td>Quantum size trade-off; context switch overhead</td></tr>
            <tr><td><strong>Priority</strong></td>
              <td>Highest priority thread runs first</td>
              <td>Critical tasks get fast response</td><td>Low-priority starvation; priority inversion</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Amdahl's Law</h3></div>
      <div className="callout callout-key">
        <div className="callout-title">🔑 Key Concept</div>
        <strong>Formula:</strong> S(n) = 1 / ( (1 − p) + p/n )<br /><br />
        Where: <code>S</code> = speedup, <code>p</code> = parallelisable fraction (0–1), <code>n</code> = number of
        processors<br /><br />
        <strong>Implication:</strong> If 5% of code is sequential (<code>p = 0.95</code>), maximum possible speedup
        is <code>1/0.05 = 20×</code>, no matter how many cores you add. Sequential bottlenecks dominate.
      </div>
      <pre className="diagram">{
`p = 0.50 → max speedup: 2×
p = 0.75 → max speedup: 4×
p = 0.90 → max speedup: 10×
p = 0.95 → max speedup: 20×
p = 0.99 → max speedup: 100×   (requires truly parallel-friendly code)`
      }</pre>

      <div className="subsection-header"><h3>Benefits of Multithreading</h3></div>
      <ul>
        <li><strong>Responsiveness:</strong> UI stays reactive while background work runs (e.g., loading data)</li>
        <li><strong>Resource sharing:</strong> Threads share heap memory — no IPC overhead</li>
        <li><strong>Economy:</strong> Cheaper to create/context-switch than processes</li>
        <li><strong>Scalability:</strong> Exploit multi-core hardware; speed scales with cores for parallel sections</li>
      </ul>

      <div className="subsection-header"><h3>Challenges of Multithreading</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Problem</th><th>Description</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><strong>Race Condition</strong></td><td>Outcome depends on thread scheduling order</td>
              <td><code>counter++</code> by two threads simultaneously</td></tr>
            <tr><td><strong>Deadlock</strong></td><td>Two+ threads wait for each other's locks forever</td>
              <td>Thread1 holds A, waits B; Thread2 holds B, waits A</td></tr>
            <tr><td><strong>Starvation</strong></td><td>A thread never gets CPU/lock due to scheduling policy</td>
              <td>Low-priority thread eclipsed by high-priority ones</td></tr>
            <tr><td><strong>Livelock</strong></td><td>Threads actively respond to each other but make no progress</td>
              <td>Two polite threads both step aside repeatedly</td></tr>
          </tbody>
        </table>
      </div>

      {/* 3.4 */}
      <div id="s3-4" data-topic-boundary="true" />

      <div className="subsection-header"><h3>4 Ways to Create a Thread</h3></div>
      <h4>① Extend <code>Thread</code> class</h4>
      <Code>{
`public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Running in: " + Thread.currentThread().getName());
    }
}

// Usage
MyThread t = new MyThread();
t.setName("Worker-1");
t.start();   // ← ALWAYS call start(), NOT run()`
      }</Code>

      <h4>② Implement <code>Runnable</code> interface</h4>
      <Code>{
`public class MyTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Task running in: " + Thread.currentThread().getName());
    }
}

// Usage
Thread t = new Thread(new MyTask(), "Worker-2");
t.start();`
      }</Code>

      <h4>③ Implement <code>Callable</code> + <code>Future</code> (returns result)</h4>
      <Code>{
`import java.util.concurrent.*;

Callable<Integer> task = () -> {
    Thread.sleep(1000);
    return 42;   // returns a result
};

ExecutorService executor = Executors.newSingleThreadExecutor();
Future<Integer> future = executor.submit(task);

try {
    Integer result = future.get();   // blocks until result ready
    System.out.println("Result: " + result);   // 42
} catch (InterruptedException | ExecutionException e) {
    e.printStackTrace();
} finally {
    executor.shutdown();
}`
      }</Code>

      <h4>④ Lambda expression (shorthand for Runnable)</h4>
      <Code>{
`Thread t = new Thread(() -> {
    System.out.println("Lambda thread: " + Thread.currentThread().getName());
}, "Lambda-Worker");
t.start();`
      }</Code>

      <div className="subsection-header"><h3>Why Prefer <code>Runnable</code> over Extending <code>Thread</code>?</h3></div>
      <div className="callout callout-tip">
        <div className="callout-title">💡 Tip</div>
        <ul>
          <li><strong>Single inheritance:</strong> Java doesn't allow multiple inheritance. Extending{' '}
            <code>Thread</code> wastes your one inheritance slot. Implementing <code>Runnable</code> leaves you free
            to extend any other class.</li>
          <li><strong>Separation of concerns:</strong> Task logic (<code>Runnable</code>) is decoupled from thread
            management.</li>
          <li><strong>Reusability:</strong> Same <code>Runnable</code> can be passed to an{' '}
            <code>ExecutorService</code> without change.</li>
          <li><strong>Flexibility:</strong> Works with thread pools, lambdas, and <code>CompletableFuture</code>.</li>
        </ul>
      </div>

      <div className="subsection-header"><h3><code>start()</code> vs <code>run()</code> — Critical Difference</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th></th><th><code>start()</code></th><th><code>run()</code></th></tr></thead>
          <tbody>
            <tr><td>What it does</td><td>Creates a new OS thread, then calls <code>run()</code> on it</td>
              <td>Executes <code>run()</code> on the <em>current</em> calling thread</td></tr>
            <tr><td>Concurrency</td><td>✓ True concurrency — new thread</td><td>✗ No concurrency — runs sequentially</td></tr>
            <tr><td>Call twice?</td><td>Throws <code>IllegalThreadStateException</code></td>
              <td>Allowed (just a normal method call)</td></tr>
            <tr><td>Correct use</td><td>Always use this to launch a thread</td><td>Never call directly to start a thread</td></tr>
          </tbody>
        </table>
      </div>
      <Code>{
`Thread t = new Thread(() -> System.out.println("In thread: " + Thread.currentThread().getName()));

t.start();   // prints "In thread: Thread-0"  ← correct
t.run();     // prints "In thread: main"      ← WRONG, ran on main thread!`
      }</Code>

      <div className="subsection-header"><h3>Thread Naming &amp; Identity</h3></div>
      <Code>{
`Thread t = new Thread(() -> {
    Thread current = Thread.currentThread();
    System.out.println("Name: "    + current.getName());
    System.out.println("ID: "      + current.getId());
    System.out.println("Priority: "+ current.getPriority());
    System.out.println("Daemon: "  + current.isDaemon());
});

t.setName("my-worker");
t.setPriority(Thread.MAX_PRIORITY);   // 10
t.start();

// Thread groups (rarely used directly in modern code)
ThreadGroup group = new ThreadGroup("workers");
Thread t2 = new Thread(group, () -> {}, "w1");
System.out.println(group.activeCount());`
      }</Code>

      {/* 3.5 */}
      <div id="s3-5" data-topic-boundary="true" />

      <div className="subsection-header"><h3>Thread State Diagram</h3></div>
      <pre className="diagram">{
`                start()
    NEW ─────────────────────► RUNNABLE ◄──────────────────┐
                                 │  ▲                       │
                       scheduled │  │ yield() /             │
                       by OS     │  │ time-slice ends       │
                                 ▼  │                       │
                              RUNNING ─────────────────────►│
                                 │                           │
      ┌──────────────────────────┼───────────────────────────┐     │
      │                          │                          │     │
synchronized             wait() / join()        sleep(ms) /│
block (lock              (no timeout)          join(ms) /  │
unavailable)                    │              LockSupport  │
      │                         │              .parkNanos() │      │
      ▼                         ▼                    │      │
  BLOCKED               WAITING            TIMED_WAITING │
      │                         │                    │      │
      │ lock             notify() /               │      │
      │ acquired         notifyAll() /            │      │
      │                  join() completes    timeout/    │
      └──────────────────────────┴──────────────────interrupt()──┘
                                                               │
                                                         TERMINATED
                                                    (run() returns)`
      }</pre>

      <div className="subsection-header"><h3>Thread States — Descriptions</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>State</th><th>Description</th><th>How to enter</th><th>How to exit</th></tr></thead>
          <tbody>
            <tr><td><code>NEW</code></td><td>Thread object created, not yet started</td>
              <td><code>new Thread()</code></td><td>Call <code>start()</code></td></tr>
            <tr><td><code>RUNNABLE</code></td><td>Running or ready to run; OS decides actual CPU time</td>
              <td><code>start()</code>, or after BLOCKED/WAITING resolves</td>
              <td>Scheduling, <code>wait()</code>, <code>sleep()</code>, I/O</td></tr>
            <tr><td><code>BLOCKED</code></td><td>Waiting to acquire an intrinsic (synchronized) lock</td>
              <td>Another thread holds the monitor</td><td>Lock becomes available</td></tr>
            <tr><td><code>WAITING</code></td><td>Indefinitely waiting for another thread's action</td>
              <td><code>wait()</code>, <code>join()</code>, <code>LockSupport.park()</code></td>
              <td><code>notify()</code>, <code>notifyAll()</code>, target thread ends</td></tr>
            <tr><td><code>TIMED_WAITING</code></td><td>Waiting with timeout</td>
              <td><code>sleep(ms)</code>, <code>wait(ms)</code>, <code>join(ms)</code></td>
              <td>Timeout expires or explicit notification</td></tr>
            <tr><td><code>TERMINATED</code></td><td>Execution complete; cannot be restarted</td>
              <td><code>run()</code> returns or throws</td><td>— (terminal state)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Thread Methods Reference</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Method</th><th>Description</th><th>Throws</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><code>start()</code></td><td>Creates new OS thread and begins execution</td>
              <td><code>IllegalThreadStateException</code></td><td>Can only call once</td></tr>
            <tr><td><code>run()</code></td><td>Thread body — override this</td><td>—</td><td>Never call directly to launch</td></tr>
            <tr><td><code>sleep(long ms)</code></td><td>Current thread sleeps; does NOT release locks</td>
              <td><code>InterruptedException</code></td><td>Static method; enters TIMED_WAITING</td></tr>
            <tr><td><code>join()</code></td><td>Calling thread waits for this thread to finish</td>
              <td><code>InterruptedException</code></td><td>Useful for sequencing</td></tr>
            <tr><td><code>join(long ms)</code></td><td>Wait up to ms milliseconds</td>
              <td><code>InterruptedException</code></td><td>Returns even if thread still alive</td></tr>
            <tr><td><code>setPriority(int)</code></td><td>Set scheduling hint 1–10</td>
              <td><code>IllegalArgumentException</code></td><td>JVM/OS may ignore</td></tr>
            <tr><td><code>getPriority()</code></td><td>Get current priority</td><td>—</td><td>Default 5 (NORM_PRIORITY)</td></tr>
            <tr><td><code>setName(String)</code></td><td>Set thread name</td><td>—</td><td>Useful for debugging/profiling</td></tr>
            <tr><td><code>getName()</code></td><td>Get thread name</td><td>—</td><td></td></tr>
            <tr><td><code>interrupt()</code></td><td>Sets interrupt flag; wakes sleeping/waiting thread</td>
              <td>—</td><td>Does NOT force stop</td></tr>
            <tr><td><code>isInterrupted()</code></td><td>Check interrupt flag (instance)</td><td>—</td>
              <td>Does NOT clear the flag</td></tr>
            <tr><td><code>interrupted()</code></td><td>Check &amp; <em>clear</em> interrupt flag</td><td>—</td>
              <td>Static; clears the flag</td></tr>
            <tr><td><code>yield()</code></td><td>Hint scheduler to give other threads CPU time</td><td>—</td>
              <td>Stays RUNNABLE; rarely useful</td></tr>
            <tr><td><code>setDaemon(boolean)</code></td><td>Mark as daemon thread</td>
              <td><code>IllegalThreadStateException</code></td><td>Must call before <code>start()</code></td></tr>
            <tr><td><code>isDaemon()</code></td><td>Returns true if daemon</td><td>—</td><td></td></tr>
            <tr><td><code>isAlive()</code></td><td>True if started and not yet terminated</td><td>—</td>
              <td>Useful after <code>join(ms)</code></td></tr>
            <tr><td><code>getState()</code></td><td>Returns <code>Thread.State</code> enum</td><td>—</td><td>For debugging</td></tr>
            <tr><td><code>currentThread()</code></td><td>Returns reference to executing thread</td><td>—</td><td>Static method</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Thread Priority Constants</h3></div>
      <Code>{
`Thread.MIN_PRIORITY   = 1   // lowest
Thread.NORM_PRIORITY  = 5   // default for all new threads
Thread.MAX_PRIORITY   = 10  // highest

// Priorities are just HINTS — the OS scheduler may ignore them.
// Never rely on priority for correctness; only for performance tuning.
t.setPriority(Thread.MAX_PRIORITY);`
      }</Code>

      <div className="subsection-header"><h3>Daemon Threads</h3></div>
      <div className="callout callout-note">
        <div className="callout-title">📝 Note</div>
        <strong>Daemon threads</strong> are background service threads. The JVM exits when all non-daemon (user)
        threads finish — it does NOT wait for daemon threads. The Garbage Collector is the classic daemon thread
        example.
      </div>
      <Code>{
`Thread daemon = new Thread(() -> {
    while (true) {
        System.out.println("Background task running...");
        try { Thread.sleep(1000); } catch (InterruptedException e) { break; }
    }
});
daemon.setDaemon(true);   // MUST be before start()
daemon.start();
// JVM will exit once main thread ends, even if daemon is looping`
      }</Code>

      <div className="subsection-header"><h3>Proper Interrupt Handling</h3></div>
      <Code>{
`Thread worker = new Thread(() -> {
    while (!Thread.currentThread().isInterrupted()) {
        try {
            doWork();
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // restore flag!
            break;
        }
    }
    System.out.println("Worker stopped cleanly");
});

worker.start();
Thread.sleep(2000);
worker.interrupt();   // request stop`
      }</Code>
      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Warning</div>
        <strong>Thread interference &amp; memory consistency:</strong> Without synchronization, one thread's writes
        may not be visible to other threads (CPU caches, instruction reordering). This leads to stale data reads. Use{' '}
        <code>synchronized</code>, <code>volatile</code>, or concurrent utilities to establish{' '}
        <em>happens-before</em> relationships.
      </div>
    </>
  );
}
