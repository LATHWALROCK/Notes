import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

/*
 * Subtopic ids are prefixed `dp` because Binary Tree and Binary Search Tree
 * already use s1-1, s2-1, … inside this same subject, and every topic of a
 * subject is mounted at once — unprefixed ids would collide and break the
 * show/hide in App.jsx.
 */
export default function DynamicProgramming() {
  return (
    <>
      {/* 1.1 */}
      <div id="dp1-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        What DP actually is, the two properties a problem must have, and the three forms every solution in these
        notes is written in: <strong>memoization</strong> (top-down), <strong>tabulation</strong> (bottom-up) and{' '}
        <strong>space optimization</strong>. Every problem in Part 2 is that same recipe applied to a new state.
      </p>
      <div className="card">
        <p>
          <strong>Dynamic Programming is recursion plus remembering.</strong> That is the whole idea. You write a
          recursion that explores every possibility, notice that it solves the <em>same</em> subproblem many times,
          and store each answer the first time you compute it so that the second, third and millionth request are
          answered from a table instead of from a fresh recursive descent.
        </p>
        <p>
          The name is historical and unhelpful — Richard Bellman picked &quot;dynamic programming&quot; in the 1950s
          partly because it sounded impressive to a defence-funding committee. &quot;Programming&quot; here means{' '}
          <em>planning / tabulating</em>, in the sense of a TV programme, not writing code. Read it as{' '}
          <strong>&quot;careful table filling&quot;</strong> and it will stop being mysterious.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The one sentence to keep</div>
          A problem is a DP problem when it asks for an <strong>optimum</strong> (minimum / maximum), a{' '}
          <strong>count of ways</strong>, or a <strong>yes/no feasibility</strong>, and the answer for the whole
          input can be built out of answers for smaller pieces of the same shape — and those pieces repeat.
        </div>
        <p>
          The three question-words above are worth memorising, because they tell you what the base case and the
          combining step look like before you have even understood the problem:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Question asks for</th><th>Combine children with</th><th>Impossible / empty base case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Minimum cost / steps</td>
                <td><code>Math.min(...)</code></td>
                <td>A large sentinel, e.g. <code>1e9</code></td>
              </tr>
              <tr>
                <td>Maximum profit / length</td>
                <td><code>Math.max(...)</code></td>
                <td><code>0</code>, or <code>-1e9</code> if empty is illegal</td>
              </tr>
              <tr>
                <td>Number of ways</td>
                <td><code>+</code> (sum of children)</td>
                <td><code>1</code> for the one valid empty way, <code>0</code> otherwise</td>
              </tr>
              <tr>
                <td>Is it possible?</td>
                <td><code>||</code> (logical OR)</td>
                <td><code>true</code> when the target is already met, else <code>false</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="subsection-header"><h3>Greedy vs DP — when greed fails</h3></div>
      <div className="card">
        <p>
          Greedy takes the locally best choice and never revisits it. DP tries <em>every</em> choice and keeps the
          best. Greedy is faster when it works, but it silently produces wrong answers when a locally poor choice
          unlocks a better future. The classic demonstration is minimum coin change with coins{' '}
          <code>{'{1, 3, 4}'}</code> and target <code>6</code>:
        </p>
        <div className="compare">
          <div className="compare-side bad">
            <div className="compare-label">❌ Greedy — take the biggest coin</div>
            <p><code>6 → 4</code> leaves <code>2</code>, then <code>1 + 1</code>.</p>
            <p>Total: <strong>3 coins</strong> — and it is not optimal.</p>
          </div>
          <div className="compare-side good">
            <div className="compare-label">✅ DP — try every coin at every state</div>
            <p><code>6 → 3 + 3</code>.</p>
            <p>Total: <strong>2 coins</strong>. Found because DP was willing to skip the 4.</p>
          </div>
        </div>
        <p>
          Rule of thumb for interviews: if you cannot <em>prove</em> the greedy choice is safe (with an exchange
          argument), write the DP. A correct <code>O(n·target)</code> beats a wrong <code>O(n log n)</code>.
        </p>
      </div>

      {/* 1.2 */}
      <div id="dp1-2" data-topic-boundary="true" />
      <div className="card">
        <p>
          DP applies exactly when both of these hold. Miss either and you are writing something else — plain divide
          and conquer, or backtracking.
        </p>
        <div className="two-col">
          <div className="cx-box">
            <div className="cx-label">Property 1</div>
            <div className="cx-val" style={{ fontSize: '.95rem' }}>Overlapping subproblems</div>
            <div className="cx-note">
              The recursion tree asks the <em>same</em> question more than once. This is what makes caching pay off.
              Merge sort has no overlap — every half is distinct — which is why memoizing merge sort buys you
              nothing.
            </div>
          </div>
          <div className="cx-box">
            <div className="cx-label">Property 2</div>
            <div className="cx-val" style={{ fontSize: '.95rem' }}>Optimal substructure</div>
            <div className="cx-note">
              The optimal answer for a state is built from optimal answers of its sub-states. If the best path to a
              cell could ever require a <em>non</em>-best path to its neighbour, the recurrence is invalid and no
              table will save you.
            </div>
          </div>
        </div>
        <p>
          The overlap is easiest to see in the Fibonacci recursion tree. Count how often <code>f(2)</code> appears:
        </p>
        <pre className="diagram">{
`                              f(5)
                        /             \\
                    f(4)               f(3)
                  /      \\            /     \\
              f(3)       f(2)      f(2)     f(1)
             /    \\      /   \\     /   \\
         f(2)   f(1)  f(1)  f(0) f(1) f(0)
         /   \\
      f(1)  f(0)

  f(3) computed 2 times      f(2) computed 3 times
  f(1) computed 5 times      f(0) computed 3 times

  Total calls for f(5)  = 15
  Total calls for f(50) = about 2.5 x 10^10   <-- hours of CPU for a 50-term sequence
  Distinct subproblems  = only 51 (f(0) .. f(50))`
        }</pre>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why memoization collapses the exponent</div>
          Plain recursion costs <code>O(number of nodes in the recursion tree)</code>. Memoized recursion costs{' '}
          <code>O(number of distinct states) × O(work per state)</code>, because every state is computed once and
          then served from the table. For Fibonacci that is <code>2^n → n</code>. This single sentence explains every
          complexity figure in these notes: <strong>count the states, multiply by the work inside one state</strong>.
        </div>
      </div>

      {/* 1.3 */}
      <div id="dp1-3" data-topic-boundary="true" />
      <div className="card">
        <p>
          Every problem in these notes is solved three times. This is not busywork — it is the standard progression,
          and in an interview you are expected to walk it out loud: write the recursion, memoize it, convert to a
          table, then shrink the table. Each step is mechanical once you know the rules.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>&nbsp;</th><th>Memoization (Top-Down)</th><th>Tabulation (Bottom-Up)</th><th>Space Optimized</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Direction</strong></td>
                <td>Answer → base cases</td>
                <td>Base cases → answer</td>
                <td>Base cases → answer</td>
              </tr>
              <tr>
                <td><strong>Mechanism</strong></td>
                <td>Recursion + cache array</td>
                <td>Loops filling an array</td>
                <td>Loops keeping only the rows/values still needed</td>
              </tr>
              <tr>
                <td><strong>Time</strong></td>
                <td>states × work</td>
                <td>states × work (same)</td>
                <td>states × work (same)</td>
              </tr>
              <tr>
                <td><strong>Space</strong></td>
                <td>Table + <code>O(depth)</code> stack</td>
                <td>Table only, no stack</td>
                <td><code>O(1)</code> or one dimension less</td>
              </tr>
              <tr>
                <td><strong>Computes</strong></td>
                <td>Only reachable states (lazy)</td>
                <td>Every state, always (eager)</td>
                <td>Every state, always</td>
              </tr>
              <tr>
                <td><strong>Write it when</strong></td>
                <td>Deriving the recurrence; states are sparse</td>
                <td>Recursion depth risks stack overflow</td>
                <td>Memory limits are tight; the follow-up asks for it</td>
              </tr>
              <tr>
                <td><strong>Main risk</strong></td>
                <td><code>StackOverflowError</code> for large <code>n</code></td>
                <td>Loop direction must respect dependencies</td>
                <td>Overwriting a value you still need</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 Memoization vs Tabulation, the honest trade-off</div>
          They are the same algorithm read in opposite directions, so do not expect a complexity win from switching.
          What changes is the constant factor and the failure mode: recursion has call overhead and a stack that can
          blow at <code>n ≈ 10^4–10^5</code> in Java, while tabulation is a tight loop with no stack — but it
          computes states that a lazy recursion would have skipped. Where only a fraction of the state space is
          reachable, memoization can be dramatically faster in practice.
        </div>
      </div>

      <div className="subsection-header"><h3>How to convert memoization → tabulation (mechanically)</h3></div>
      <div className="card">
        <ol className="steps">
          <li>
            <strong>Copy the base cases into the table as initial values.</strong> Whatever the recursion returned
            for <code>if (i == 0) return X;</code> becomes <code>dp[0] = X;</code>.
          </li>
          <li>
            <strong>Write nested loops over the state variables.</strong> One loop per parameter of the recursive
            function.
          </li>
          <li>
            <strong>Choose each loop direction so dependencies are already filled.</strong> If <code>f(i)</code>{' '}
            reads <code>f(i-1)</code>, then <code>i</code> must increase. If it reads <code>f(i+1)</code>,{' '}
            <code>i</code> must decrease. This is the only step where thought is required.
          </li>
          <li>
            <strong>Copy the recurrence body verbatim, replacing every call with a table read.</strong>{' '}
            <code>f(i-1, j)</code> becomes <code>dp[i-1][j]</code>. Nothing else changes.
          </li>
          <li>
            <strong>Return the cell the top-level call asked for</strong> — usually <code>dp[n][target]</code> or{' '}
            <code>dp[n-1][...]</code>.
          </li>
        </ol>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The index-shift trap</div>
          Recursions happily ask for <code>f(i - 1)</code> when <code>i = 0</code>, and handle it with a base case.
          Arrays cannot: <code>dp[-1]</code> throws. The standard fix used throughout these notes is to{' '}
          <strong>shift every index by one</strong> — declare <code>dp</code> of size <code>[n+1][m+1]</code> and let
          row <code>i</code> of the table mean &quot;the first <code>i</code> items&quot;, so <code>dp[0]</code> is
          the empty prefix and needs no special case. Where that shift is applied, the notes say so explicitly,
          because it is the single most common source of off-by-one bugs in DP.
        </div>
      </div>

      <div className="subsection-header"><h3>How to space optimize (mechanically)</h3></div>
      <div className="card">
        <p>
          Look at the recurrence and ask: <strong>how far back does row <code>i</code> reach?</strong> Almost always
          the answer is &quot;one or two rows&quot;. A table with <code>n</code> rows where only the previous row is
          ever read does not need <code>n</code> rows — it needs two arrays, <code>prev</code> and <code>curr</code>,
          swapped at the end of each iteration.
        </p>
        <div className="recurrence">{
`dp[i][j]  depends on  dp[i-1][j]  and  dp[i-1][j-w]      → keep prev[] and curr[]         O(m) space
dp[i][j]  depends on  dp[i][j-w]   and  dp[i-1][j]        → keep ONE array, iterate j downward
dp[i]     depends on  dp[i-1]      and  dp[i-2]           → keep two scalars (prev, prev2)  O(1) space
dp[i][j]  depends on  dp[i+1][j]   and  dp[i][j-1]        → no row reduction; the table is the answer`
        }</div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ When a single array is safe — and when it is not</div>
          Collapsing <code>prev</code> and <code>curr</code> into one array works only if every read for{' '}
          <code>dp[i][j]</code> happens at an index you have not yet overwritten in this pass. That is why 0/1
          knapsack with one array must iterate the capacity <strong>downward</strong> (reads <code>j-w</code>, which
          must still hold row <code>i-1</code>) while unbounded knapsack iterates <strong>upward</strong> on purpose
          (it <em>wants</em> the already-updated row <code>i</code> value, so the item can be reused). Getting this
          direction wrong is a silent wrong answer, not a crash.
        </div>
        <p>
          Not every problem can be space optimized. Interval-partition recurrences, which read{' '}
          <code>dp[i][k]</code> and <code>dp[k+1][j]</code> for an arbitrary interior <code>k</code>, keep the whole
          2D table live at once. Where that is the case the honest answer is to say so and give the best genuinely
          available improvement, rather than to pretend a two-row trick exists.
        </p>
      </div>

      {/* 1.4 */}
      <div id="dp1-4" data-topic-boundary="true" />
      <div className="card">
        <p>
          This is the procedure to run on every unseen DP problem. It is deliberately mechanical — the creative part
          is only step 2.
        </p>
        <ol className="steps">
          <li>
            <strong>Express the problem in terms of an index.</strong> Almost every DP state starts with &quot;I am
            standing at position <code>i</code>&quot;. Extra parameters get appended when the decision at{' '}
            <code>i</code> depends on history: remaining capacity, coins used, whether you hold a stock,
            yesterday&apos;s task. <em>Anything the future needs to know about the past must be in the state.</em>
          </li>
          <li>
            <strong>Enumerate all choices at that state.</strong> Take / don&apos;t take. Move down / move
            diagonally. Buy / sell / skip. Cut at every possible <code>k</code>. Write one recursive call per choice
            — this is the step that decides the algorithm.
          </li>
          <li>
            <strong>Combine the choices with min / max / sum / OR</strong> according to what the problem asks (see
            the table in 1.1).
          </li>
          <li>
            <strong>Write the base cases.</strong> Handle the smallest index, the exhausted resource, and the
            impossible state — in that order. Impossible states return the sentinel that loses: <code>1e9</code>{' '}
            under <code>min</code>, <code>-1e9</code> under <code>max</code>, <code>0</code> under <code>sum</code>.
          </li>
          <li>
            <strong>Memoize:</strong> declare a table over exactly the state variables, fill it with{' '}
            <code>-1</code>, return early on a hit, store before returning.
          </li>
          <li><strong>Tabulate:</strong> apply the five conversion rules from 1.3.</li>
          <li><strong>Space optimize:</strong> count how far back the recurrence reaches.</li>
        </ol>
        <div className="callout callout-tip">
          <div className="callout-title">💡 Two habits that prevent most DP bugs</div>
          <p>
            <strong>Never memoize a state you have not fully parameterised.</strong> If your recursion also reads a
            variable that is not a function parameter (a running sum, a mutable field), the cache will return an
            answer computed under a different context. Either add the variable to the state, or do not cache.
          </p>
          <p>
            <strong>Pick a sentinel that cannot be reached legitimately.</strong> <code>-1</code> is the usual
            &quot;not computed&quot; marker, which is why it is unsafe for problems whose real answer can be{' '}
            <code>-1</code> (maximum sums with negative numbers, for instance). Use <code>Integer.MIN_VALUE</code>,
            a <code>Boolean[]</code> visited array, or <code>Long.MIN_VALUE</code> there.
          </p>
        </div>
      </div>

      {/* 2.1 */}
      <div id="dp2-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        State is a single index. Each problem is solved three times — memoized, tabulated, and space optimized — so
        the progression from Part 1 can be seen end to end on real code.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 509</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">The template problem</span>
        <span className="pill">State: (i)</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> <code>f(0) = 0</code>, <code>f(1) = 1</code>, and{' '}
          <code>f(n) = f(n-1) + f(n-2)</code> for <code>n ≥ 2</code>. Return <code>f(n)</code>.
        </p>
        <p>
          This problem carries no algorithmic interest on its own — it is here because the recurrence is handed to
          you, so all three transformations can be seen with nothing else in the way. Learn the shape here and the
          rest of the document is the same shape with a harder recurrence.
        </p>
        <div className="recurrence">{
`f(0) = 0
f(1) = 1
f(n) = f(n-1) + f(n-2)

state  = (n)                         one parameter  -> 1D table
states = n + 1
work   = O(1) per state              two lookups and one addition
time   = O(n)`
        }</div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Read the recurrence, get the space bound for free</div>
          <code>f(n)</code> reaches back exactly two positions. So the table never needs more than the last two
          values alive at any moment — which is why the space-optimized version below is two <code>int</code>s and
          no array at all. Whenever you see a fixed, small look-back distance, expect <code>O(1)</code> space.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int fib(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, -1);              // -1 = "not computed yet"
        return f(n, dp);
    }

    private int f(int n, int[] dp) {
        if (n <= 1) return n;             // base: f(0)=0, f(1)=1
        if (dp[n] != -1) return dp[n];    // cache hit -- whole subtree skipped

        return dp[n] = f(n - 1, dp) + f(n - 2, dp);   // store, then return
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 <code>return dp[n] = ...</code></div>
        In Java an assignment is an expression whose value is the assigned value, so{' '}
        <code>return dp[n] = expr;</code> stores and returns in one statement. It is the idiom to use in every
        memoized function — it makes it impossible to forget the write, which is the classic bug that turns a
        memoized solution back into an exponential one.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(n)">
          Each of the <code>n+1</code> states is computed once.
        </CxBox>
        <CxBox label="Space" value="O(n) + O(n)">
          Table plus recursion stack — the stack is the depth of the chain.
        </CxBox>
        <CxBox label="Without memo" value="O(2ⁿ)">
          Delete the two <code>dp</code> lines and <code>fib(50)</code> stops finishing.
        </CxBox>
      </Cx>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int fib(int n) {
        if (n <= 1) return n;

        int[] dp = new int[n + 1];
        dp[0] = 0;                        // base cases copied straight from the recursion
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {    // upward: dp[i] needs i-1 and i-2, both already filled
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Notice what changed — and what did not</div>
        The recurrence body is character-for-character the same; only <code>f(i-1)</code> became{' '}
        <code>dp[i-1]</code>. The base cases moved from <code>if</code> statements to array initialisation. The loop
        runs upward because the dependencies are behind us. That is the entire conversion, and it is the same three
        edits for every problem in these notes.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n)">One pass, constant work per index.</CxBox>
        <CxBox label="Space" value="O(n)">
          The table — but <strong>no recursion stack</strong>, so no overflow risk.
        </CxBox>
      </Cx>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(1) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int fib(int n) {
        if (n <= 1) return n;

        int prev2 = 0;                    // plays the role of dp[i-2]
        int prev  = 1;                    // plays the role of dp[i-1]

        for (int i = 2; i <= n; i++) {
            int curr = prev + prev2;      // dp[i]
            prev2 = prev;                 // slide the window forward by one
            prev  = curr;
        }
        return prev;                      // after the loop, prev holds dp[n]
    }
}`
      }</Code>

      <div className="callout callout-key">
        <div className="callout-title">🔑 The sliding-window rewrite</div>
        The array is gone because only two cells were ever live. The two assignments at the bottom of the loop are
        the whole trick: <code>prev2</code> takes the old <code>prev</code>, <code>prev</code> takes the new value.{' '}
        <strong>Order matters</strong> — update <code>prev</code> first and <code>prev2</code> picks up the new value
        instead of the old one, silently computing <code>2·f(i-1)</code>. This exact pattern reappears in Climbing
        Stairs (2.2), and in every 1D DP whose recurrence looks back a fixed distance.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n)">Unchanged — space optimization never improves time.</CxBox>
        <CxBox label="Space" value="O(1)">
          Two <code>int</code>s. This is the version to write in an interview.
        </CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Overflow</div>
        <code>fib(47)</code> is the last Fibonacci number that fits in a signed 32-bit <code>int</code> (
        <code>2971215073</code> already overflows). LeetCode 509 caps <code>n</code> at 30 so <code>int</code> is
        safe, but for larger <code>n</code> switch the accumulators to <code>long</code>, and past{' '}
        <code>fib(92)</code> to <code>BigInteger</code>. The same caution applies to counting DP generally — the
        number of ways tends to grow exponentially, which is why such problems usually ask for the answer modulo{' '}
        <code>10^9 + 7</code>.
      </div>

      {/* 2.2 */}
      <div id="dp2-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 70</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Count the ways</span>
        <span className="pill">Fibonacci in disguise</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> You are climbing a staircase of <code>n</code> steps. Each move climbs either{' '}
          <strong>1</strong> or <strong>2</strong> steps. In how many distinct ways can you reach the top?
        </p>
        <p>
          <strong>Deriving the recurrence.</strong> Think backwards from the destination, which is the habit worth
          building: to be standing on step <code>i</code>, your <em>last</em> move came either from step{' '}
          <code>i-1</code> (a 1-step) or from step <code>i-2</code> (a 2-step). Those two sets of routes are
          disjoint — they differ in their final move — and together they are all the routes. So the counts add.
        </p>
        <div className="recurrence">{
`ways(0) = 1        the empty way: you are already at the bottom
ways(1) = 1        a single 1-step
ways(i) = ways(i-1) + ways(i-2)

Same recurrence as Fibonacci, shifted by one:  ways(n) = fib(n+1)`
        }</div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why the base case is 1 and not 0</div>
          <code>ways(0) = 1</code> is the most-missed line in this problem. There is exactly <strong>one</strong> way
          to climb zero steps — do nothing. Setting it to <code>0</code> makes the whole table collapse to zero,
          because every count is built by summing. The general rule for counting DP:{' '}
          <strong>the empty solution counts as one way</strong>, never as zero ways.
        </div>
        <pre className="diagram">{
` n = 4, enumerate by hand:
   1+1+1+1      2+1+1      1+2+1      1+1+2      2+2      -> 5 ways

 build the table:
   dp[0] = 1
   dp[1] = 1
   dp[2] = dp[1] + dp[0] = 2
   dp[3] = dp[2] + dp[1] = 3
   dp[4] = dp[3] + dp[2] = 5      matches the enumeration`
        }</pre>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int climbStairs(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, -1);
        return f(n, dp);
    }

    private int f(int i, int[] dp) {
        if (i == 0) return 1;             // one way to stand at the bottom: do nothing
        if (i == 1) return 1;             // one way to reach step 1: a single 1-step
        if (dp[i] != -1) return dp[i];

        int oneStep = f(i - 1, dp);       // last move was a 1-step
        int twoStep = f(i - 2, dp);       // last move was a 2-step
        return dp[i] = oneStep + twoStep; // disjoint route sets -> add
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n)">
          <code>n+1</code> states, <code>O(1)</code> work each.
        </CxBox>
        <CxBox label="Space" value="O(n) + O(n)">
          Table + stack of depth <code>n</code>.
        </CxBox>
      </Cx>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int climbStairs(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;
        if (n >= 1) dp[1] = 1;            // guard: n = 0 would make dp[1] out of bounds

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(1) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int climbStairs(int n) {
        int prev2 = 1;                    // dp[0]
        int prev  = 1;                    // dp[1]

        for (int i = 2; i <= n; i++) {
            int curr = prev + prev2;
            prev2 = prev;
            prev  = curr;
        }
        return prev;                      // n = 0 and n = 1 fall straight through, both give 1
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n)">One loop.</CxBox>
        <CxBox label="Space" value="O(1)">Two variables, no array, no stack.</CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 Follow-up variants you should be able to answer instantly</div>
        <ul>
          <li>
            <strong>Steps of 1, 2 or 3</strong> (LeetCode 1137, Tribonacci): add a third term,{' '}
            <code>dp[i] = dp[i-1] + dp[i-2] + dp[i-3]</code>, and keep three scalars.
          </li>
          <li>
            <strong>Min Cost Climbing Stairs</strong> (LeetCode 746): the same shape but with <code>Math.min</code>{' '}
            instead of <code>+</code> and a <code>cost[i]</code> added —{' '}
            <code>dp[i] = cost[i] + min(dp[i-1], dp[i-2])</code>. Counting becomes optimising by swapping one
            operator; that is how closely related these problems are.
          </li>
        </ul>
      </div>

      {/* 2.3 */}
      <div id="dp2-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Minimise cost</span>
        <span className="pill">Greedy fails here</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A frog starts at stair <code>0</code> and wants to reach stair{' '}
          <code>n-1</code>. <code>heights[i]</code> is the height of stair <code>i</code>. From stair{' '}
          <code>i</code> the frog can jump to <code>i+1</code> or <code>i+2</code>, and a jump costs{' '}
          <code>|heights[i] - heights[j]|</code> energy. Find the <strong>minimum total energy</strong>.
        </p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Why the obvious greedy is wrong</div>
          &quot;Always take the cheaper of the two jumps&quot; fails on{' '}
          <code>heights = [30, 10, 60, 10, 60, 50]</code>. Greedy jumps <code>0→1</code> (cost 20, cheaper than the
          30 to stair 2), then is stuck paying <code>|10-60| = 50</code> next. The optimum is{' '}
          <code>0→2→4→5</code> for <code>30 + 0 + 10 = 40</code>. A cheap step now can force an expensive one later
          — the exact situation DP exists for.
        </div>
        <p>
          <strong>Deriving the recurrence.</strong> Same backwards reasoning as Climbing Stairs: to be on stair{' '}
          <code>i</code> you arrived from <code>i-1</code> or <code>i-2</code>, and you pay for that jump on
          arrival. But the combinator is <code>min</code>, not <code>+</code>, because we want one best route, not a
          count of routes.
        </p>
        <div className="recurrence">{
`f(0) = 0                                     start, nothing paid yet

f(i) = min( f(i-1) + |h[i] - h[i-1]| ,
            f(i-2) + |h[i] - h[i-2]| )       second term only when i >= 2

answer = f(n-1)`
        }</div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int frogJump(int n, int[] heights) {
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        return f(n - 1, heights, dp);
    }

    private int f(int i, int[] h, int[] dp) {
        if (i == 0) return 0;                          // at the start: no energy spent
        if (dp[i] != -1) return dp[i];

        int oneStep = f(i - 1, h, dp) + Math.abs(h[i] - h[i - 1]);

        int twoStep = Integer.MAX_VALUE;               // "impossible" sentinel under min
        if (i > 1) {
            twoStep = f(i - 2, h, dp) + Math.abs(h[i] - h[i - 2]);
        }
        return dp[i] = Math.min(oneStep, twoStep);
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ <code>Integer.MAX_VALUE</code> and the overflow it invites
        </div>
        Here <code>MAX_VALUE</code> is safe because nothing is added to <code>twoStep</code> after it is set. In
        problems where the sentinel gets a cost added to it — Minimum Path Sum (3.4) is the next one you will meet —{' '}
        <code>MAX_VALUE + cost</code> wraps around to a negative number and the <code>min</code> happily picks that
        impossible route. The defensive habit used throughout these notes is to use <code>(int) 1e9</code> as the
        &quot;infinite&quot; value: it still loses every comparison, but has ample headroom to be added to.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int frogJump(int n, int[] heights) {
        int[] dp = new int[n];
        dp[0] = 0;                                     // base case straight from the recursion

        for (int i = 1; i < n; i++) {
            int oneStep = dp[i - 1] + Math.abs(heights[i] - heights[i - 1]);

            int twoStep = (int) 1e9;
            if (i > 1) {
                twoStep = dp[i - 2] + Math.abs(heights[i] - heights[i - 2]);
            }
            dp[i] = Math.min(oneStep, twoStep);
        }
        return dp[n - 1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(1) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int frogJump(int n, int[] heights) {
        int prev2 = 0;                                 // dp[i-2]
        int prev  = 0;                                 // dp[i-1], starts as dp[0] = 0

        for (int i = 1; i < n; i++) {
            int oneStep = prev + Math.abs(heights[i] - heights[i - 1]);

            int twoStep = (int) 1e9;
            if (i > 1) {
                twoStep = prev2 + Math.abs(heights[i] - heights[i - 2]);
            }
            int curr = Math.min(oneStep, twoStep);

            prev2 = prev;                              // slide the window
            prev  = curr;
        }
        return prev;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run on the greedy-defeating input</h3></div>
      <pre className="diagram">{
` heights = [30, 10, 60, 10, 60, 50]
  i:         0    1    2    3    4    5

 dp[0] = 0
 dp[1] = dp[0] + |10-30|                       = 20
 dp[2] = min( dp[1] + |60-10| ,  dp[0] + |60-30| ) = min(20+50, 0+30)  = 30
 dp[3] = min( dp[2] + |10-60| ,  dp[1] + |10-10| ) = min(30+50, 20+0)  = 20
 dp[4] = min( dp[3] + |60-10| ,  dp[2] + |60-60| ) = min(20+50, 30+0)  = 30
 dp[5] = min( dp[4] + |50-60| ,  dp[3] + |50-10| ) = min(30+10, 20+40) = 40

 answer = 40     via 0 -> 2 -> 4 -> 5, not the locally cheap 0 -> 1`
      }</pre>

      <Cx three>
        <CxBox label="Time (all three)" value="O(n)">Two candidate jumps per stair.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n)">
          Memoization adds an <code>O(n)</code> stack on top.
        </CxBox>
        <CxBox label="Space — optimized" value="O(1)">Two scalars.</CxBox>
      </Cx>

      {/* 2.4 */}
      <div id="dp2-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Easy–Medium</span>
        <span className="pill">Loop over the choices</span>
        <span className="pill">No O(1) space</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Identical to 2.3, except the frog may jump any distance from <code>1</code> to{' '}
          <code>k</code>. Minimise the total <code>|heights[i] - heights[j]|</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Two hard-coded choices become a loop</div>
          This is the single most useful generalisation in DP. When the number of choices at a state stops being
          fixed and becomes a range, the two hand-written candidates turn into a <code>for</code> loop with a running
          minimum. The state does not change — it is still just <code>(i)</code> — so the number of states is still{' '}
          <code>n</code>; what changes is the work per state, from <code>O(1)</code> to <code>O(k)</code>. Total time{' '}
          <code>O(n·k)</code>.
        </div>
        <div className="recurrence">{
`f(0) = 0

f(i) = min over j = 1..k, while i-j >= 0, of
           f(i-j) + |h[i] - h[i-j]|

answer = f(n-1)                       time O(n*k), space O(n)`
        }</div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The bound check goes inside the loop</div>
          <code>i - j</code> can go negative for the later <code>j</code> values near the start of the array. Guard
          with <code>if (i - j &lt; 0) break;</code> — <code>break</code> rather than <code>continue</code>, since
          once <code>i-j</code> is negative every larger <code>j</code> is too.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minimizeCost(int n, int k, int[] heights) {
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        return f(n - 1, k, heights, dp);
    }

    private int f(int i, int k, int[] h, int[] dp) {
        if (i == 0) return 0;
        if (dp[i] != -1) return dp[i];

        int best = (int) 1e9;
        for (int j = 1; j <= k; j++) {
            if (i - j < 0) break;                      // no shorter landing spot exists
            int cost = f(i - j, k, h, dp) + Math.abs(h[i] - h[i - j]);
            best = Math.min(best, cost);
        }
        return dp[i] = best;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minimizeCost(int n, int k, int[] heights) {
        int[] dp = new int[n];
        dp[0] = 0;

        for (int i = 1; i < n; i++) {
            int best = (int) 1e9;
            for (int j = 1; j <= k; j++) {
                if (i - j < 0) break;
                int cost = dp[i - j] + Math.abs(heights[i] - heights[i - j]);
                best = Math.min(best, cost);
            }
            dp[i] = best;
        }
        return dp[n - 1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(k) SPACE</span></h3>
      </div>
      <div className="card">
        <p>
          There is no <code>O(1)</code> version here, and it is worth understanding why: state <code>i</code> reads
          back as far as <code>i-k</code>, so <code>k</code> values must stay alive at all times. Two scalars are not
          enough. What you <em>can</em> do is keep a <strong>circular buffer of size <code>k</code></strong> instead
          of the full <code>n</code>-element table — a real win when <code>k &lt;&lt; n</code>, and the honest answer
          to &quot;can you do better on space?&quot;.
        </p>
      </div>
      <Code>{
`class Solution {
    public int minimizeCost(int n, int k, int[] heights) {
        // ring[i % k] holds dp[i]; only the last k answers can ever be read again.
        int[] ring = new int[k];
        ring[0] = 0;                                   // dp[0]

        for (int i = 1; i < n; i++) {
            int best = (int) 1e9;
            for (int j = 1; j <= k; j++) {
                if (i - j < 0) break;
                int prev = ring[(i - j) % k];          // dp[i-j], still inside the window
                best = Math.min(best, prev + Math.abs(heights[i] - heights[i - j]));
            }
            ring[i % k] = best;                        // overwrites dp[i-k], which is now dead
        }
        return ring[(n - 1) % k];
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Why <code>i % k</code> is safe</div>
        Writing <code>dp[i]</code> into slot <code>i % k</code> overwrites whatever <code>dp[i-k]</code> left there.
        That is exactly the value that has just fallen out of reach: the furthest any future state can look back from{' '}
        <code>i+1</code> is <code>i+1-k</code>. The buffer holds precisely the live window and nothing more.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(n·k)">
          <code>n</code> states × <code>k</code> choices.
        </CxBox>
        <CxBox label="Space — memo / tab" value="O(n)">Full table.</CxBox>
        <CxBox label="Space — optimized" value="O(k)">
          Circular buffer. <code>O(1)</code> is impossible here.
        </CxBox>
      </Cx>

      {/* 2.5 */}
      <div id="dp2-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 198</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Pick / Not-pick</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given an array of non-negative numbers, choose a subset with the maximum sum such
          that <strong>no two chosen elements are adjacent</strong>. (Framed as House Robber: houses in a row, alarms
          trigger if you rob two neighbours.)
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The pick / not-pick template</div>
          This is the first appearance of the most important pattern in all of DP, and it powers the whole of Parts 4
          and 5. At index <code>i</code> there are exactly two choices:
          <ul>
            <li>
              <strong>Pick <code>i</code>:</strong> collect <code>nums[i]</code>, then you must skip{' '}
              <code>i-1</code>, so recurse on <code>i-2</code>.
            </li>
            <li>
              <strong>Skip <code>i</code>:</strong> collect nothing, recurse on <code>i-1</code> with no restriction.
            </li>
          </ul>
          Take the <code>max</code> of the two. The adjacency constraint is enforced <em>by the jump to{' '}
          <code>i-2</code></em>, not by any extra state — that is the elegance worth remembering.
        </div>
        <div className="recurrence">{
`f(0)  = nums[0]                              only one house, rob it
f(<0) = 0                                    nothing left to rob

f(i) = max( nums[i] + f(i-2) ,               pick i  -> skip i-1
            0       + f(i-1) )               skip i  -> i-1 free

answer = f(n-1)`
        }</div>
        <p>
          <strong>Why the greedy &quot;take all even indices&quot; fails.</strong> On <code>[2, 1, 4, 9]</code> the
          even indices give <code>2 + 4 = 6</code>, odd indices give <code>1 + 9 = 10</code>, and the true optimum is{' '}
          <code>2 + 9 = 11</code> — a non-alternating pick. The gap can be anything from 2 upward, so all
          parity-based shortcuts are wrong.
        </p>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumNonAdjacentSum(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        return f(n - 1, nums, dp);
    }

    private int f(int i, int[] nums, int[] dp) {
        if (i == 0) return nums[0];                    // base: one house left
        if (i < 0)  return 0;                          // fell off the front: nothing to collect
        if (dp[i] != -1) return dp[i];

        int pick    = nums[i] + f(i - 2, nums, dp);    // taking i forbids i-1
        int notPick = 0       + f(i - 1, nums, dp);    // skipping i leaves i-1 available

        return dp[i] = Math.max(pick, notPick);
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Both base cases must precede the cache lookup</div>
        The two base cases are disjoint, so their relative order does not matter — but both must be tested{' '}
        <strong>before</strong> <code>dp[i]</code> is read. <code>f(i - 2)</code> is called with <code>i = 1</code>,
        so <code>i</code> really does reach <code>-1</code>, and <code>dp[-1]</code> throws{' '}
        <code>ArrayIndexOutOfBoundsException</code>. Guard every array access with the base cases, always.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumNonAdjacentSum(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];
        dp[0] = nums[0];

        for (int i = 1; i < n; i++) {
            int pick    = nums[i] + (i > 1 ? dp[i - 2] : 0);   // the i < 0 base case, inlined
            int notPick = dp[i - 1];
            dp[i] = Math.max(pick, notPick);
        }
        return dp[n - 1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(1) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumNonAdjacentSum(int[] nums) {
        int n = nums.length;
        int prev2 = 0;                                 // dp[i-2]
        int prev  = nums[0];                           // dp[i-1], seeded with dp[0]

        for (int i = 1; i < n; i++) {
            int pick    = nums[i] + prev2;
            int notPick = prev;
            int curr    = Math.max(pick, notPick);

            prev2 = prev;
            prev  = curr;
        }
        return prev;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` nums = [2, 1, 4, 9]

 dp[0] = 2
 dp[1] = max( 1 + 0(nothing at -1) , 2 ) = 2
 dp[2] = max( 4 + dp[0]=2 -> 6     , dp[1]=2 ) = 6
 dp[3] = max( 9 + dp[1]=2 -> 11    , dp[2]=6 ) = 11

 answer = 11    picking indices 0 and 3 -- a gap of 3, which no parity rule finds`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n)">Two choices per index.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n)">
          Plus <code>O(n)</code> stack for memoization.
        </CxBox>
        <CxBox label="Space — optimized" value="O(1)">Two scalars.</CxBox>
      </Cx>

      {/* 2.6 */}
      <div id="dp2-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 213</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Reduce to a solved problem</span>
        <span className="pill">Run the DP twice</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> The same as 2.5, but the houses are arranged in a <strong>circle</strong>: house{' '}
          <code>0</code> and house <code>n-1</code> are now neighbours, so they cannot both be robbed.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Don&apos;t invent a new DP — cut the circle</div>
          The temptation is to add a boolean state &quot;did I take the first house?&quot;. Unnecessary. The only
          interaction the circle introduces is between <code>0</code> and <code>n-1</code>, and in any valid answer
          at least one of them is left out. So:
          <ul>
            <li>
              Run the linear House Robber on <code>nums[0 .. n-2]</code> — every solution here excludes the last
              house.
            </li>
            <li>Run it again on <code>nums[1 .. n-1]</code> — every solution here excludes the first.</li>
            <li>Answer = <code>max</code> of the two runs.</li>
          </ul>
          Together the two arrays cover every legal subset, and neither can pick both endpoints. Solving a hard
          variant by <strong>slicing it into calls to the easy one</strong> is a pattern worth keeping: before adding
          a dimension to the state, ask whether the constraint can be removed by running the simpler DP twice.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The <code>n == 1</code> edge case</div>
          With a single house, <code>nums[0 .. n-2]</code> is an empty array and <code>nums[1 .. n-1]</code> is too.
          Both runs return <code>0</code> and you lose the only house. Special-case{' '}
          <code>n == 1 → return nums[0]</code> before slicing. Interviewers look for exactly this.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int houseRobber(int[] valueInHouse) {
        int n = valueInHouse.length;
        if (n == 1) return valueInHouse[0];                    // the circle degenerates

        // Two independent linear problems, each breaking the 0 <-> n-1 adjacency.
        int[] skipLast  = Arrays.copyOfRange(valueInHouse, 0, n - 1);
        int[] skipFirst = Arrays.copyOfRange(valueInHouse, 1, n);

        return Math.max(maximumNonAdjacentSum(skipLast), maximumNonAdjacentSum(skipFirst));
    }

    private int maximumNonAdjacentSum(int[] a) {
        int[] dp = new int[a.length];
        Arrays.fill(dp, -1);
        return f(a.length - 1, a, dp);
    }

    private int f(int i, int[] a, int[] dp) {
        if (i == 0) return a[0];
        if (i < 0)  return 0;
        if (dp[i] != -1) return dp[i];

        int pick    = a[i] + f(i - 2, a, dp);
        int notPick = f(i - 1, a, dp);
        return dp[i] = Math.max(pick, notPick);
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int houseRobber(int[] valueInHouse) {
        int n = valueInHouse.length;
        if (n == 1) return valueInHouse[0];

        return Math.max(maximumNonAdjacentSum(valueInHouse, 0, n - 2),     // houses 0..n-2
                        maximumNonAdjacentSum(valueInHouse, 1, n - 1));    // houses 1..n-1
    }

    // Linear House Robber over the inclusive window [lo, hi] -- no array copying needed.
    private int maximumNonAdjacentSum(int[] nums, int lo, int hi) {
        int len = hi - lo + 1;
        if (len <= 0) return 0;

        int[] dp = new int[len];
        dp[0] = nums[lo];

        for (int i = 1; i < len; i++) {
            int pick    = nums[lo + i] + (i > 1 ? dp[i - 2] : 0);
            int notPick = dp[i - 1];
            dp[i] = Math.max(pick, notPick);
        }
        return dp[len - 1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(1) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int houseRobber(int[] valueInHouse) {
        int n = valueInHouse.length;
        if (n == 1) return valueInHouse[0];

        return Math.max(maximumNonAdjacentSum(valueInHouse, 0, n - 2),
                        maximumNonAdjacentSum(valueInHouse, 1, n - 1));
    }

    private int maximumNonAdjacentSum(int[] nums, int lo, int hi) {
        int prev2 = 0;
        int prev  = 0;

        for (int i = lo; i <= hi; i++) {
            int curr = Math.max(nums[i] + prev2, prev);
            prev2 = prev;
            prev  = curr;
        }
        return prev;
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The cleanest form of the loop</div>
        Seeding both scalars with <code>0</code> and starting the loop <em>at</em> <code>lo</code> removes the
        &quot;handle <code>dp[0]</code> separately&quot; step entirely: on the first iteration{' '}
        <code>max(nums[lo] + 0, 0)</code> is already <code>nums[lo]</code> for non-negative input. It also makes an
        empty window return <code>0</code> for free, which is what kills the <code>n == 1</code> slicing bug at the
        source. Use this form whenever the values are guaranteed non-negative.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(n)">
          Two linear passes → <code>2n</code>, still <code>O(n)</code>.
        </CxBox>
        <CxBox label="Space — memo / tab" value="O(n)">One table per run.</CxBox>
        <CxBox label="Space — optimized" value="O(1)">Two scalars, window passed as indices.</CxBox>
      </Cx>

      {/* 3.1 */}
      <div id="dp3-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        The state grows a second index. Two sub-families live here: <strong>fixed start</strong> problems (Unique
        Paths, Maze Obstacles, Minimum Path Sum — one corner in, one corner out) and{' '}
        <strong>variable start or end</strong> problems (Ninja&apos;s Training, Triangle, Falling Path Sum, Cherry
        Pickup — where the answer is a max or min taken over a whole row after the table is filled).
      </p>
      <div className="card">
        <div className="callout callout-key">
          <div className="callout-title">🔑 The grid-DP checklist</div>
          <ol className="steps">
            <li>
              <strong>State is <code>(i, j)</code></strong> — &quot;I am standing on cell <code>(i, j)</code>&quot;.
              A third index appears only when two things move at once (3.7).
            </li>
            <li>
              <strong>Recurse from whichever end is a single point.</strong> Unique Paths has one destination, so
              recurse backwards from it; Triangle has one apex, so recurse forwards from that. This choice is what
              keeps the base case a single cell instead of a whole boundary.
            </li>
            <li>
              <strong>Out of bounds returns the sentinel that loses</strong> — <code>0</code> when counting,{' '}
              <code>(int) 1e9</code> under <code>min</code>, <code>(int) -1e8</code> under <code>max</code>. Never
              return a real value for an illegal cell.
            </li>
            <li>
              <strong>Space optimize by rows.</strong> Every recurrence in this part reads only the neighbouring row
              (plus columns of the current row), so an <code>n × m</code> table always collapses to one or two{' '}
              <code>m</code>-element arrays.
            </li>
          </ol>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ <code>prev</code> versus <code>curr</code> — the one bug to watch for
          </div>
          In every space-optimized grid solution below, a <strong>vertical</strong> read comes from{' '}
          <code>prev</code> (the row just finished) and a <strong>horizontal</strong> read comes from{' '}
          <code>curr</code> (this row, at a column already written). Mixing them up does not crash — it returns a
          plausible wrong number, which is far worse. Check every read against that rule before running the code.
        </div>
      </div>

      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">State: (day, last)</span>
        <span className="pill">Choices are a loop</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A ninja trains for <code>n</code> days. On each day he can perform exactly one of{' '}
          <strong>three</strong> activities, earning <code>points[day][activity]</code>. He may <strong>not</strong>{' '}
          perform the same activity on two consecutive days. Maximise the total points.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why the state needs a second parameter</div>
          <code>f(day)</code> alone is not enough: what is allowed today depends on what was done <em>yesterday</em>,
          and a cache keyed only on <code>day</code> would hand back an answer computed under a different history.
          This is the rule from 1.4 made concrete — <strong>anything the future needs to know about the past must be
          in the state</strong>. So the state is <code>(day, last)</code> with{' '}
          <code>last ∈ {'{0, 1, 2, 3}'}</code>, where <code>3</code> is a sentinel meaning &quot;nothing is
          forbidden&quot;.
        </div>
        <div className="recurrence">{
`f(day, last) = max over task in {0,1,2}, task != last, of
                   points[day][task] + f(day-1, task)

base  day == 0:   max over task != last of points[0][task]

answer = f(n-1, 3)                 3 = no restriction on the final day

states = n * 4      work = O(3) per state      time = O(12n) = O(n)`
        }</div>
        <p>
          <strong>Reading the direction.</strong> <code>f(day, last)</code> means &quot;the most points obtainable
          over days <code>0..day</code>, given that the activity chosen on day <code>day+1</code> was{' '}
          <code>last</code>&quot;. The recursion walks backwards through the calendar while the <code>last</code>{' '}
          parameter looks forwards; that mixture is normal, and it is what makes the base case a single day rather
          than a whole boundary.
        </p>
        <div className="callout callout-note">
          <div className="callout-title">📌 Four values of <code>last</code>, not three</div>
          The table is <code>[n][4]</code>. Rows <code>0..2</code> answer &quot;yesterday I did task <em>k</em>&quot;,
          and row <code>3</code> answers &quot;there is no yesterday&quot;. Sizing it <code>[n][3]</code> leaves
          nowhere to express the unconstrained top-level call, and indexing <code>dp[day][3]</code> then throws.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int ninjaTraining(int n, int[][] points) {
        int[][] dp = new int[n][4];                    // last = 0, 1, 2, or 3 ("none")
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n - 1, 3, points, dp);
    }

    private int f(int day, int last, int[][] points, int[][] dp) {
        if (day == 0) {                                // base: best legal task on day 0
            int maxi = 0;
            for (int task = 0; task < 3; task++) {
                if (task != last) {
                    maxi = Math.max(maxi, points[0][task]);
                }
            }
            return maxi;
        }
        if (dp[day][last] != -1) return dp[day][last];

        int maxi = 0;
        for (int task = 0; task < 3; task++) {
            if (task == last) continue;                // cannot repeat yesterday's activity
            int point = points[day][task] + f(day - 1, task, points, dp);
            maxi = Math.max(maxi, point);
        }
        return dp[day][last] = maxi;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n·4·3)">
          <code>4n</code> states, three candidate tasks inside each.
        </CxBox>
        <CxBox label="Space" value="O(n·4) + O(n)">
          Table plus a recursion stack of depth <code>n</code>.
        </CxBox>
      </Cx>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int ninjaTraining(int n, int[][] points) {
        int[][] dp = new int[n][4];

        // Day 0 base row: for each "last", the best day-0 task that is not "last".
        dp[0][0] = Math.max(points[0][1], points[0][2]);
        dp[0][1] = Math.max(points[0][0], points[0][2]);
        dp[0][2] = Math.max(points[0][0], points[0][1]);
        dp[0][3] = Math.max(points[0][0], Math.max(points[0][1], points[0][2]));

        for (int day = 1; day < n; day++) {
            for (int last = 0; last < 4; last++) {
                dp[day][last] = 0;

                for (int task = 0; task < 3; task++) {
                    if (task == last) continue;
                    int point = points[day][task] + dp[day - 1][task];
                    dp[day][last] = Math.max(dp[day][last], point);
                }
            }
        }
        return dp[n - 1][3];
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ The base row is where this problem goes wrong</div>
        The four <code>dp[0][*]</code> lines <em>are</em> the recursive base case, unrolled by hand. Each one omits
        exactly one task — and <code>dp[0][3]</code>, the unconstrained row, must be the maximum over{' '}
        <strong>all three</strong>: <code>max(points[0][0], max(points[0][1], points[0][2]))</code>. Writing{' '}
        <code>points[0][1]</code> twice there is an easy slip that leaves <code>points[0][0]</code> out of the
        running, and it only shows up on inputs where day 0&apos;s best activity is task <code>0</code> — so it
        passes the small samples and fails later.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(1) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int ninjaTraining(int n, int[][] points) {
        int[] prev = new int[4];                       // dp[day-1][*]

        prev[0] = Math.max(points[0][1], points[0][2]);
        prev[1] = Math.max(points[0][0], points[0][2]);
        prev[2] = Math.max(points[0][0], points[0][1]);
        prev[3] = Math.max(points[0][0], Math.max(points[0][1], points[0][2]));

        for (int day = 1; day < n; day++) {
            int[] temp = new int[4];                   // dp[day][*], fresh zeros each day
            for (int last = 0; last < 4; last++) {
                for (int task = 0; task < 3; task++) {
                    if (task == last) continue;
                    temp[last] = Math.max(temp[last], points[day][task] + prev[task]);
                }
            }
            prev = temp;                               // today becomes yesterday
        }
        return prev[3];
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 This is genuinely <code>O(1)</code>, not <code>O(n)</code>
        </div>
        The surviving array holds four entries no matter how large <code>n</code> is — the <code>4</code> comes from
        the problem statement, not from the input size. Note also that <code>temp</code> is allocated fresh each day
        rather than reused: reusing it would require clearing it first, and a forgotten clear leaves
        yesterday&apos;s maxima in place, producing answers that are too large.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` points =        task0  task1  task2
        day 0 |    10     40     70
        day 1 |    20     50     80
        day 2 |    30     60     90

 base row (day 0):
   dp[0][0] = max(40, 70) = 70      "yesterday was task 0"  -> pick from {1,2}
   dp[0][1] = max(10, 70) = 70
   dp[0][2] = max(10, 40) = 40
   dp[0][3] = max(10, 40, 70) = 70  nothing forbidden

 day 1:
   dp[1][0] = max( 50 + dp[0][1]=70 , 80 + dp[0][2]=40 ) = max(120, 120) = 120
   dp[1][1] = max( 20 + dp[0][0]=70 , 80 + dp[0][2]=40 ) = max( 90, 120) = 120
   dp[1][2] = max( 20 + dp[0][0]=70 , 50 + dp[0][1]=70 ) = max( 90, 120) = 120
   dp[1][3] = max( 20+70 , 50+70 , 80+40 )               = 120

 day 2:
   dp[2][3] = max( 30 + dp[1][0]=120 , 60 + dp[1][1]=120 , 90 + dp[1][2]=120 )
            = max(150, 180, 210) = 210        <-- answer

 route: day0 task2 (70) -> day1 task1 (50) -> day2 task2 (90)   =   210
        no two consecutive days share a task, which is the constraint`
      }</pre>

      {/* 3.2 */}
      <div id="dp3-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 62</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Count the ways</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> In an <code>m × n</code> grid, start at <code>(0, 0)</code> and reach{' '}
          <code>(m-1, n-1)</code> moving only <strong>right</strong> or <strong>down</strong>. How many distinct
          paths are there?
        </p>
        <p>
          <strong>Deriving the recurrence.</strong> Recurse backwards from the destination: to be standing on{' '}
          <code>(i, j)</code>, your last move came from above, <code>(i-1, j)</code>, or from the left,{' '}
          <code>(i, j-1)</code>. Those two families of paths are disjoint — they differ in the final move — and
          together they are all of them. So the counts add, exactly as in Climbing Stairs.
        </p>
        <div className="recurrence">{
`f(0, 0) = 1                        one way to be at the start: be there
f(i, j) = 0    if i < 0 or j < 0   walked off the grid, no paths through here

f(i, j) = f(i-1, j) + f(i, j-1)

answer = f(m-1, n-1)               states = m*n, work O(1), time O(m*n)`
        }</div>
        <pre className="diagram">{
` 3 x 3 grid: each cell holds the number of paths from the start to it

        j=0   j=1   j=2
 i=0 |   1     1     1       top row: one way only -- keep going right
 i=1 |   1     2     3
 i=2 |   1     3     6       <-- answer

 every cell = (the one above) + (the one to its left)
 this is Pascal's triangle rotated 45 degrees, which is why the closed form below works`
        }</pre>
        <div className="callout callout-note">
          <div className="callout-title">📌 The combinatorial short-circuit</div>
          Every path makes exactly <code>m-1</code> down-moves and <code>n-1</code> right-moves in some order, so
          the answer is the binomial coefficient <code>C(m+n-2, m-1)</code> — computable in{' '}
          <code>O(min(m, n))</code> time and <code>O(1)</code> space. Worth mentioning <em>after</em> giving the DP,
          never instead of it: the moment an obstacle appears (3.3) the formula is useless and only the DP survives.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(m - 1, n - 1, dp);
    }

    private int f(int i, int j, int[][] dp) {
        if (i == 0 && j == 0) return 1;                // reached the start
        if (i < 0 || j < 0)   return 0;                // off the grid: dead route
        if (dp[i][j] != -1) return dp[i][j];

        int up   = f(i - 1, j, dp);                    // arrived by moving down
        int left = f(i, j - 1, dp);                    // arrived by moving right
        return dp[i][j] = up + left;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ The start test must precede the bounds test</div>
        Both orderings happen to work here, because <code>(0, 0)</code> is in bounds either way. But get into the
        habit of putting the <em>specific</em> base case before the <em>general</em> guard: in Maze Obstacles (3.3)
        the order stops being cosmetic and a wrong one silently returns <code>1</code> for a blocked start.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) {
                    dp[i][j] = 1;                      // base case
                } else {
                    int up   = 0;
                    int left = 0;
                    if (i > 0) up   = dp[i - 1][j];    // the "off grid -> 0" base, inlined
                    if (j > 0) left = dp[i][j - 1];
                    dp[i][j] = up + left;
                }
            }
        }
        return dp[m - 1][n - 1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(n) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int uniquePaths(int m, int n) {
        int[] prev = new int[n];                       // dp[i-1][*]

        for (int i = 0; i < m; i++) {
            int[] cur = new int[n];                    // dp[i][*]
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) {
                    cur[j] = 1;
                } else {
                    int up   = 0;
                    int left = 0;
                    if (i > 0) up   = prev[j];         // vertical read  -> previous row
                    if (j > 0) left = cur[j - 1];      // horizontal read -> current row
                    cur[j] = up + left;                // write into cur, never into a 2D dp
                }
            }
            prev = cur;
        }
        return prev[n - 1];
    }
}`
      }</Code>

      <div className="callout callout-key">
        <div className="callout-title">
          🔑 Once the table is gone, every write must go to <code>cur</code>
        </div>
        When converting a tabulated solution by hand, the assignment at the bottom of the loop is the line that gets
        forgotten: <code>dp[i][j] = up + left;</code> has to become <code>cur[j] = up + left;</code>. Leaving a
        two-dimensional write behind either fails to compile (there is no <code>dp</code> any more) or, if a{' '}
        <code>dp</code> array is still lying around, fills a table nobody reads while <code>cur</code> stays all
        zeros and the function returns <code>0</code>.
        <p>
          Since <code>left</code> only ever reads column <code>j-1</code> of the current row, the two arrays can in
          fact be collapsed into one: <code>dp[j] += dp[j-1]</code> with <code>j</code> ascending, where{' '}
          <code>dp[j]</code> on the right still holds the previous row&apos;s value. That is the tightest form,
          worth recognising but not worth writing first.
        </p>
      </div>

      <Cx three>
        <CxBox label="Time" value="O(m·n)">Each cell computed once.</CxBox>
        <CxBox label="Space — memo / tab" value="O(m·n)">
          Memoization adds an <code>O(m+n)</code> stack.
        </CxBox>
        <CxBox label="Space — optimized" value="O(n)">
          One row. Iterate over the shorter dimension if you get to choose.
        </CxBox>
      </Cx>

      {/* 3.3 */}
      <div id="dp3-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">LeetCode 63</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">One extra base case</span>
        <span className="pill">mod 10⁹+7</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> The same as 3.2, but some cells are blocked and may not be entered. In the Coding
          Ninjas version a blocked cell is marked <code>mat[i][j] == -1</code>; count the paths that avoid them,
          modulo <code>10^9 + 7</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 An obstacle is just a base case returning 0</div>
          No new state, no new recurrence — a single extra line. A blocked cell contributes zero paths, so the sums
          above it and to its right never see it. This is precisely why the DP is worth more than the binomial
          formula from 3.2: the formula has nowhere to put this line.
        </div>
        <div className="recurrence">{
`f(i, j) = 0    if i < 0 or j < 0            off the grid
f(i, j) = 0    if mat[i][j] == -1           blocked     <-- the only new rule
f(0, 0) = 1                                 start, given it is not itself blocked

f(i, j) = ( f(i-1, j) + f(i, j-1) ) % mod`
        }</div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Test the obstacle before the start, and bounds before either</div>
          Three base cases now interact, and the order matters:
          <ol className="steps">
            <li>
              <strong>Bounds first.</strong> <code>mat[i][j]</code> would throw for a negative index, so the{' '}
              <code>i &lt; 0 || j &lt; 0</code> guard has to run before any cell is dereferenced. (The notes&apos;
              version does this with the compound test{' '}
              <code>i ≥ 0 &amp;&amp; j ≥ 0 &amp;&amp; mat[i][j] == -1</code>, which is the same protection written
              inline.)
            </li>
            <li>
              <strong>Obstacle second.</strong> If the start cell is itself blocked the answer is <code>0</code>, but
              a <code>(0,0)</code> base case tested first would return <code>1</code> and the whole count would be
              wrong. LeetCode 63 ships exactly this test case.
            </li>
            <li><strong>Start last.</strong></li>
          </ol>
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int mazeObstacles(int n, int m, int[][] mat) {
        int[][] dp = new int[n][m];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n - 1, m - 1, mat, dp);
    }

    private int f(int i, int j, int[][] mat, int[][] dp) {
        if (i < 0 || j < 0)   return 0;                // bounds first: mat[i][j] would throw
        if (mat[i][j] == -1)  return 0;                // blocked -- before the start test
        if (i == 0 && j == 0) return 1;                // start, and it is free
        if (dp[i][j] != -1) return dp[i][j];

        int up   = f(i - 1, j, mat, dp);
        int left = f(i, j - 1, mat, dp);
        return dp[i][j] = (up + left) % MOD;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int mazeObstacles(int n, int m, int[][] mat) {
        int[][] dp = new int[n][m];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == -1) {
                    dp[i][j] = 0;                      // blocked: no path passes through
                } else if (i == 0 && j == 0) {
                    dp[i][j] = 1;
                } else {
                    int up   = 0;
                    int left = 0;
                    if (i > 0) up   = dp[i - 1][j];
                    if (j > 0) left = dp[i][j - 1];
                    dp[i][j] = (up + left) % MOD;
                }
            }
        }
        return dp[n - 1][m - 1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(m) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int mazeObstacles(int n, int m, int[][] mat) {
        int[] prev = new int[m];

        for (int i = 0; i < n; i++) {
            int[] cur = new int[m];
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == -1) {
                    cur[j] = 0;                        // must be WRITTEN, not skipped
                } else if (i == 0 && j == 0) {
                    cur[j] = 1;
                } else {
                    int up   = 0;
                    int left = 0;
                    if (i > 0) up   = prev[j];
                    if (j > 0) left = cur[j - 1];
                    cur[j] = (up + left) % MOD;
                }
            }
            prev = cur;
        }
        return prev[m - 1];
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ Write the zero, never <code>continue</code> past it
        </div>
        Allocating a fresh zero-filled <code>cur</code> for each row makes the obstacle branch look redundant, and it
        is — harmlessly so. But if you optimise further and reuse one array across rows, that{' '}
        <code>cur[j] = 0</code> becomes essential: skipping the assignment leaves the previous row&apos;s count in
        the slot, and paths appear to flow straight through the wall. Keep the explicit zero; it costs nothing and
        survives the next refactor.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` mat (-1 = blocked)              dp (paths to each cell)
   0   0   0                       1   1   1
   0  -1   0          --->         1   0   1
   0   0   0                       1   1   2

 dp[1][1] = 0                    blocked, contributes nothing
 dp[1][2] = up 1 + left 0 = 1     left neighbour is the blocked cell, so 0
 dp[2][1] = up 0 + left 1 = 1
 dp[2][2] = up 1 + left 1 = 2    <-- answer: one path each side of the wall`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n·m)">Unchanged by the obstacles.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n·m)">
          Plus an <code>O(n+m)</code> stack when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(m)">Two rows.</CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 The LeetCode 63 spelling</div>
        LeetCode marks obstacles with <code>1</code> rather than <code>-1</code>, names the grid{' '}
        <code>obstacleGrid</code>, and does not ask for a modulus. The algorithm is identical — change the
        comparison to <code>obstacleGrid[i][j] == 1</code> and drop the <code>% MOD</code>. Keep the modulus in the
        Coding Ninjas version: without it the path count overflows <code>int</code> on large open grids, and the
        judge&apos;s expected answers are the reduced ones.
      </div>

      {/* 3.4 */}
      <div id="dp3-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 64</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Counting → minimising</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Each cell of an <code>n × m</code> grid holds a non-negative cost. Moving only
          right or down from <code>(0,0)</code> to <code>(n-1,m-1)</code>, minimise the sum of the cells visited.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 One operator away from Total Unique Paths</div>
          Put the two recurrences side by side: 3.2 <em>adds</em> its two children, this one takes their{' '}
          <em>minimum</em> and charges the current cell. That is the whole difference. Internalise it and half of
          grid DP stops being separate problems — <strong>the moves define the table, the question defines the
          operator</strong>.
        </div>
        <div className="recurrence">{
`f(0, 0) = grid[0][0]
f(i, j) = 1e9    if i < 0 or j < 0            off the grid: cannot win a min

f(i, j) = grid[i][j] + min( f(i-1, j), f(i, j-1) )

answer = f(n-1, m-1)`
        }</div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minSumPath(int[][] grid) {
        int n = grid.length, m = grid[0].length;
        int[][] dp = new int[n][m];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n - 1, m - 1, grid, dp);
    }

    private int f(int i, int j, int[][] grid, int[][] dp) {
        if (i == 0 && j == 0) return grid[0][0];
        if (i < 0 || j < 0)   return (int) 1e9;        // loses every min, safe to add to
        if (dp[i][j] != -1) return dp[i][j];

        int up   = grid[i][j] + f(i - 1, j, grid, dp);
        int left = grid[i][j] + f(i, j - 1, grid, dp);
        return dp[i][j] = Math.min(up, left);
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ <code>(int) 1e9</code>, never <code>Integer.MAX_VALUE</code>
        </div>
        Here the sentinel <strong>is</strong> added to: <code>grid[i][j] + f(i-1, j)</code>. With{' '}
        <code>MAX_VALUE</code> that addition overflows to a large negative number, <code>Math.min</code> happily
        selects it, and the function returns a negative path sum — a wrong answer with no exception to point at it.{' '}
        <code>1e9</code> still loses against any real path (grid sums here stay far below it) and survives being
        added to. This is the trap flagged back in 2.3, now doing real damage.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minSumPath(int[][] grid) {
        int n = grid.length, m = grid[0].length;
        int[][] dp = new int[n][m];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (i == 0 && j == 0) {
                    dp[i][j] = grid[i][j];
                } else {
                    int up = grid[i][j];
                    if (i > 0) up += dp[i - 1][j];
                    else       up += (int) 1e9;        // no row above: kill this candidate

                    int left = grid[i][j];
                    if (j > 0) left += dp[i][j - 1];
                    else       left += (int) 1e9;

                    dp[i][j] = Math.min(up, left);
                }
            }
        }
        return dp[n - 1][m - 1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(m) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minSumPath(int[][] grid) {
        int n = grid.length, m = grid[0].length;
        int[] prev = new int[m];                       // dp[i-1][*]

        for (int i = 0; i < n; i++) {
            int[] cur = new int[m];                    // dp[i][*]
            for (int j = 0; j < m; j++) {
                if (i == 0 && j == 0) {
                    cur[j] = grid[i][j];
                } else {
                    int up = grid[i][j];
                    if (i > 0) up += prev[j];          // vertical read  -> previous row
                    else       up += (int) 1e9;

                    int left = grid[i][j];
                    if (j > 0) left += cur[j - 1];     // horizontal read -> current row
                    else       left += (int) 1e9;

                    cur[j] = Math.min(up, left);
                }
            }
            prev = cur;
        }
        return prev[m - 1];
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` grid                       dp (minimum cost to reach each cell)
   1  3  1                    1   4   5
   1  5  1          --->      2   7   6
   4  2  1                    6   8   7

 dp[0][0] = 1
 dp[0][1] = 3 + min(1e9+3, dp[0][0]=1) = 4      top row can only come from the left
 dp[1][0] = 1 + min(dp[0][0]=1, 1e9)   = 2      left column can only come from above
 dp[1][1] = 5 + min(dp[0][1]=4, dp[1][0]=2) = 7
 dp[1][2] = 1 + min(dp[0][2]=5, dp[1][1]=7) = 6
 dp[2][2] = 1 + min(dp[1][2]=6, dp[2][1]=8) = 7     <-- answer

 optimal route: 1 -> 3 -> 1 -> 1 -> 1 = 7      (right, right, down, down)`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n·m)">Two candidates per cell.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n·m)">
          Plus an <code>O(n+m)</code> stack when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(m)">Two rows.</CxBox>
      </Cx>

      {/* 3.5 */}
      <div id="dp3-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 120</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Fixed start, variable end</span>
        <span className="pill">Recurse forwards</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a triangular grid where row <code>i</code> holds <code>i+1</code> entries,
          start at the apex <code>(0,0)</code> and step to either <code>(i+1, j)</code> or{' '}
          <code>(i+1, j+1)</code>. Minimise the sum collected on the way to the bottom row — you may finish at{' '}
          <strong>any</strong> cell of that row.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 When the end is variable, recurse forwards</div>
          Every grid problem so far recursed backwards from a single destination. Here the destination is any of{' '}
          <code>n</code> cells, so backwards recursion would need <code>n</code> separate top-level calls. Flip it:
          start the recursion <em>at the apex</em>, which is unique, and let the base case be &quot;the bottom row
          has been reached&quot;. The rule generalises — <strong>put the base case at whichever end of the problem is
          a single point</strong>.
        </div>
        <div className="recurrence">{
`f(i, j) = triangle[n-1][j]                     if i == n-1  (bottom row reached)

f(i, j) = triangle[i][j] + min( f(i+1, j),      move straight down
                                f(i+1, j+1) )   move diagonally down-right

answer = f(0, 0)

note: i INCREASES in the recursion, so tabulation must fill rows DOWNWARD`
        }</div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minimumPathSum(int[][] triangle, int n) {
        int[][] dp = new int[n][n];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(0, 0, triangle, n, dp);
    }

    private int f(int i, int j, int[][] triangle, int n, int[][] dp) {
        if (i == n - 1) return triangle[n - 1][j];     // bottom row: nothing further to add
        if (dp[i][j] != -1) return dp[i][j];

        int d  = triangle[i][j] + f(i + 1, j,     triangle, n, dp);
        int dg = triangle[i][j] + f(i + 1, j + 1, triangle, n, dp);
        return dp[i][j] = Math.min(d, dg);
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 No bounds check is needed on <code>j</code>
        </div>
        Row <code>i+1</code> always holds one more entry than row <code>i</code>, so <code>j+1</code> is
        automatically in range whenever <code>j</code> was. The triangle&apos;s shape does the bounds checking — one
        of the few places in grid DP where dropping the guard is genuinely safe. Note also that the table is declared{' '}
        <code>[n][n]</code>, a square holding a triangle: roughly half of it is never touched, which is the price of
        indexing it directly.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minimumPathSum(int[][] triangle, int n) {
        int[][] dp = new int[n][n];

        for (int j = 0; j < n; j++) {                  // base: the bottom row copies itself
            dp[n - 1][j] = triangle[n - 1][j];
        }

        for (int i = n - 2; i >= 0; i--) {             // DOWNWARD: row i depends on row i+1
            for (int j = i; j >= 0; j--) {             // row i has entries 0..i only
                int d  = triangle[i][j] + dp[i + 1][j];
                int dg = triangle[i][j] + dp[i + 1][j + 1];
                dp[i][j] = Math.min(d, dg);
            }
        }
        return dp[0][0];
    }
}`
      }</Code>

      <div className="callout callout-key">
        <div className="callout-title">🔑 The loop direction is forced by the recurrence</div>
        <code>f(i, j)</code> reads row <code>i+1</code>, so row <code>i+1</code> must be complete before row{' '}
        <code>i</code> begins — hence <code>i</code> runs from <code>n-2</code> down to <code>0</code>. That is
        conversion rule 3 from 1.3 doing real work: <strong>every problem whose recursion moves forwards has a
        tabulation that loops backwards</strong>. The inner loop&apos;s upper bound is <code>j = i</code>, not{' '}
        <code>j = n-1</code>, because row <code>i</code> of a triangle only has <code>i+1</code> cells.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(n) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minimumPathSum(int[][] triangle, int n) {
        int[] front = new int[n];                      // dp[i+1][*] -- the row below

        for (int j = 0; j < n; j++) {
            front[j] = triangle[n - 1][j];
        }

        for (int i = n - 2; i >= 0; i--) {
            int[] cur = new int[n];                    // dp[i][*]
            for (int j = i; j >= 0; j--) {
                int d  = triangle[i][j] + front[j];
                int dg = triangle[i][j] + front[j + 1];
                cur[j] = Math.min(d, dg);
            }
            front = cur;                               // the row below, for the next iteration
        }
        return front[0];
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 A single array also works here</div>
        <code>cur[j]</code> reads only <code>front[j]</code> and <code>front[j+1]</code> — never a column below{' '}
        <code>j</code> — so one array iterated with <code>j</code> <strong>ascending</strong> is safe:{' '}
        <code>dp[j] = triangle[i][j] + min(dp[j], dp[j+1])</code>. Each write lands on a slot whose old value has
        already been consumed by that same iteration. Contrast with Falling Path Sum (3.6), which reads{' '}
        <code>j-1</code> <em>and</em> <code>j+1</code> and therefore cannot be collapsed this way.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` triangle            filling upward from the bottom row
     2                  dp[3] = 4  1  8  3       (copy of the bottom row)
    3 4
   6 5 7                dp[2][0] = 6 + min(4, 1) = 7
  4 1 8 3               dp[2][1] = 5 + min(1, 8) = 6
                        dp[2][2] = 7 + min(8, 3) = 10

                        dp[1][0] = 3 + min(7, 6)  = 9
                        dp[1][1] = 4 + min(6, 10) = 10

                        dp[0][0] = 2 + min(9, 10) = 11      <-- answer

 route: 2 -> 3 -> 5 -> 1  =  11`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n²)">
          <code>n(n+1)/2</code> cells, <code>O(1)</code> work each.
        </CxBox>
        <CxBox label="Space — memo / tab" value="O(n²)">
          Plus an <code>O(n)</code> stack when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(n)">One row of the triangle.</CxBox>
      </Cx>

      {/* 3.6 */}
      <div id="dp3-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">LeetCode 931 (min variant)</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Variable start AND end</span>
        <span className="pill">Three moves</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> In an <code>n × m</code> matrix, start at <strong>any</strong> cell of the first
          row and fall to the last row. From <code>(i, j)</code> the next step is <code>(i+1, j-1)</code>,{' '}
          <code>(i+1, j)</code> or <code>(i+1, j+1)</code>. Maximise the sum collected.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Variable start handled by a loop, not by the DP</div>
          Neither end of this problem is a single point, so no choice of recursion direction makes the base case
          unique. The fix is to leave the DP meaning &quot;the best path <em>ending</em> at <code>(i, j)</code>&quot;
          and then <strong>take the maximum over the final row in the caller</strong>. Any time a problem says
          &quot;starting anywhere&quot; or &quot;ending anywhere&quot;, expect a loop over a whole row after the
          table is filled — the same move House Robber II (2.6) used to handle its circle outside the DP rather than
          inside it.
        </div>
        <div className="recurrence">{
`f(0, j) = matrix[0][j]                         base: the first row is its own answer
f(i, j) = -1e8   if j < 0 or j >= m            fell off the side

f(i, j) = matrix[i][j] + max( f(i-1, j-1),      came from up-left
                              f(i-1, j),        came from straight up
                              f(i-1, j+1) )     came from up-right

answer = max over j of f(n-1, j)               <-- the loop in the caller`
        }</div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ Sentinel sign, and why <code>-1</code> cannot mark &quot;not computed&quot;
          </div>
          <p>
            Under <code>max</code> the losing sentinel is <strong>negative</strong>. Using <code>0</code> for
            &quot;fell off the grid&quot; looks harmless until the matrix contains negative values — then leaving the
            matrix scores better than a legitimate negative path, and the answer comes back too high along a route
            that does not exist.
          </p>
          <p>
            The matrix may contain negative numbers, so a real answer can be <code>-1</code>, which rules{' '}
            <code>-1</code> out as the &quot;not computed&quot; marker. The notes&apos; version keeps{' '}
            <code>-1</code> and gets away with it on non-negative test data; the version below fills the cache with{' '}
            <code>Integer.MIN_VALUE</code> instead, which no real path sum can reach. Use <code>-1e8</code> for the
            off-grid sentinel and <code>Integer.MIN_VALUE</code> for the cache marker and the two can never be
            confused.
          </p>
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int getMaxPathSum(int[][] matrix) {
        int n = matrix.length, m = matrix[0].length;

        int[][] dp = new int[n][m];
        for (int[] row : dp) Arrays.fill(row, Integer.MIN_VALUE);   // -1 can be a real answer

        int maxi = (int) -1e8;
        for (int j = 0; j < m; j++) {                  // the path may end anywhere on the last row
            maxi = Math.max(maxi, f(n - 1, j, matrix, dp));
        }
        return maxi;
    }

    private int f(int i, int j, int[][] matrix, int[][] dp) {
        int m = matrix[0].length;

        if (j < 0 || j >= m) return (int) -1e8;        // off the side: must lose the max
        if (i == 0) return matrix[0][j];               // started here
        if (dp[i][j] != Integer.MIN_VALUE) return dp[i][j];

        int u  = matrix[i][j] + f(i - 1, j,     matrix, dp);
        int ld = matrix[i][j] + f(i - 1, j - 1, matrix, dp);
        int rd = matrix[i][j] + f(i - 1, j + 1, matrix, dp);

        return dp[i][j] = Math.max(u, Math.max(ld, rd));
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int getMaxPathSum(int[][] matrix) {
        int n = matrix.length, m = matrix[0].length;
        int[][] dp = new int[n][m];

        for (int j = 0; j < m; j++) {                  // base row
            dp[0][j] = matrix[0][j];
        }

        for (int i = 1; i < n; i++) {
            for (int j = 0; j < m; j++) {
                int u  = dp[i - 1][j];
                int ld = (j > 0)     ? dp[i - 1][j - 1] : (int) -1e8;
                int rd = (j < m - 1) ? dp[i - 1][j + 1] : (int) -1e8;

                dp[i][j] = matrix[i][j] + Math.max(u, Math.max(ld, rd));
            }
        }

        int maxi = (int) -1e8;
        for (int j = 0; j < m; j++) {
            maxi = Math.max(maxi, dp[n - 1][j]);       // scan the whole last row
        }
        return maxi;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(m) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int getMaxPathSum(int[][] matrix) {
        int n = matrix.length, m = matrix[0].length;

        int[] prev = new int[m];                       // dp[i-1][*]
        for (int j = 0; j < m; j++) {
            prev[j] = matrix[0][j];
        }

        for (int i = 1; i < n; i++) {
            int[] cur = new int[m];                    // dp[i][*]
            for (int j = 0; j < m; j++) {
                int u  = prev[j];
                int ld = (j > 0)     ? prev[j - 1] : (int) -1e8;
                int rd = (j < m - 1) ? prev[j + 1] : (int) -1e8;

                cur[j] = matrix[i][j] + Math.max(u, Math.max(ld, rd));
            }
            prev = cur;
        }

        int maxi = (int) -1e8;
        for (int j = 0; j < m; j++) {
            maxi = Math.max(maxi, prev[j]);
        }
        return maxi;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 A single array will <em>not</em> do here
        </div>
        <code>cur[j]</code> reads <code>prev[j+1]</code> — a column to the <strong>right</strong>, which a
        left-to-right in-place pass has not yet clobbered but a right-to-left one has — and also{' '}
        <code>prev[j-1]</code>, for which the reverse holds. Since the recurrence reaches both ways, no iteration
        order leaves both reads intact, so two arrays are the floor. Triangle (3.5) collapses to one array only
        because it reads in a single direction.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` matrix                     dp (best falling path ENDING at each cell)
    1   2  10   4               1    2   10    4
  100   3   2   1    --->     102   13   12   11
    1   1  20   2             103  103   33   14

 row 0 is copied verbatim -- any cell of it is a legal start

 row 1:   each cell takes the best of the three cells above it
   dp[1][0] = 100 + max(up 1,   ld -1e8, rd 2)   = 100 + 2  = 102
   dp[1][1] =   3 + max(up 2,   ld 1,    rd 10)  =   3 + 10 =  13
   dp[1][2] =   2 + max(up 10,  ld 2,    rd 4)   =   2 + 10 =  12
   dp[1][3] =   1 + max(up 4,   ld 10,   rd -1e8)=   1 + 10 =  11

 row 2:
   dp[2][0] =   1 + max(up 102, ld -1e8, rd 13)  =   1 + 102 = 103
   dp[2][1] =   1 + max(up 13,  ld 102,  rd 12)  =   1 + 102 = 103
   dp[2][2] =  20 + max(up 12,  ld 13,   rd 11)  =  20 + 13  =  33
   dp[2][3] =   2 + max(up 11,  ld 12,   rd -1e8)=   2 + 12  =  14

 answer = max over the last row = max(103, 103, 33, 14) = 103

 route:  (0,1)=2  ->  (1,0)=100  ->  (2,0)=1     =  103
         note the start is column 1, not column 0 -- which is exactly why
         the first row is a base case and the last row needs a scan`
      }</pre>

      <div className="callout callout-tip">
        <div className="callout-title">💡 LeetCode 931 asks for the minimum</div>
        Same code, three edits: <code>Math.max → Math.min</code>, the off-grid sentinel{' '}
        <code>-1e8 → +1e8</code>, and the final row scan becomes a minimum seeded with{' '}
        <code>Integer.MAX_VALUE</code>. Nothing structural changes, because the moves are identical — only the
        question changed.
      </div>

      {/* 3.7 */}
      <div id="dp3-7" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 1463</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">3D DP</span>
        <span className="pill">Two agents, one clock</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Two players start at the top corners of an <code>r × c</code> grid of chocolate
          counts — Alice at <code>(0, 0)</code>, Bob at <code>(0, c-1)</code>. Each moves down one row per step,
          optionally shifting one column left or right (three choices each). They collect the chocolates in the cells
          they occupy, and when both stand on the <strong>same</strong> cell the chocolates count{' '}
          <strong>once</strong>. Maximise the total collected by the time they reach the last row.
        </p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Why two independent runs give the wrong answer</div>
          The natural first idea — find Alice&apos;s best path, then Bob&apos;s — fails because the two paths
          interact: the overlap rule makes Bob&apos;s value depend on where Alice went. Running a single-agent
          maximiser twice can send both down the same rich column and double-count it, or let Alice greedily eat
          chocolates Bob was better placed to collect. <strong>Interacting agents must be moved simultaneously
          inside one DP.</strong>
        </div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 One row index, two column indices</div>
          Both players descend exactly one row per step, so they are always on the <em>same</em> row. That shared
          clock is what keeps the problem tractable: instead of <code>(i1, j1, i2, j2)</code> the state is{' '}
          <code>(i, j1, j2)</code> — <code>O(r · c²)</code> states rather than <code>O(r²c²)</code>. Each state has{' '}
          <code>3 × 3 = 9</code> joint moves, so the total time is <code>O(r · c² · 9)</code>.
        </div>
        <div className="recurrence">{
`f(i, j1, j2):  max chocolates from row i downward, players in columns j1 and j2

guard  j1 or j2 outside [0, c):   -1e8                  illegal configuration

base   i == r-1:   j1 == j2 ?  grid[i][j1]              same cell -> count once
                            :  grid[i][j1] + grid[i][j2]

f(i, j1, j2) = max over dj1, dj2 in {-1, 0, +1} of
                   (chocolates on this row) + f(i+1, j1+dj1, j2+dj2)

answer = f(0, 0, c-1)`
        }</div>
        <div className="callout callout-note">
          <div className="callout-title">
            📌 <code>-1e8</code>, not <code>-1e9</code>
          </div>
          The sentinel gets real chocolate values added to it on the way back up the recursion, across up to{' '}
          <code>r</code> rows. <code>-1e8</code> leaves headroom for that without approaching{' '}
          <code>Integer.MIN_VALUE</code>, while still sitting far below any achievable score. Sentinel headroom is a
          genuine design decision in 3D DP, not a detail — and it is why the notes&apos; code uses{' '}
          <code>-1e8</code> here but <code>1e9</code> in Minimum Path Sum, where nothing accumulates.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumChocolates(int r, int c, int[][] grid) {
        int[][][] dp = new int[r][c][c];
        for (int[][] plane : dp) {
            for (int[] row : plane) Arrays.fill(row, -1);
        }
        return f(0, 0, c - 1, r, c, grid, dp);
    }

    private int f(int i, int j1, int j2, int r, int c, int[][] grid, int[][][] dp) {
        // Either player off the side: illegal branch, kill it under max.
        if (j1 < 0 || j2 < 0 || j1 >= c || j2 >= c) return (int) -1e8;

        if (i == r - 1) {                              // last row: collect and stop
            if (j1 == j2) return grid[i][j1];          // same cell -> count once
            return grid[i][j1] + grid[i][j2];
        }
        if (dp[i][j1][j2] != -1) return dp[i][j1][j2];

        // Explore all paths of Alice and Bob simultaneously: 3 x 3 = 9 joint moves.
        int maxi = (int) -1e8;
        for (int dj1 = -1; dj1 <= 1; dj1++) {
            for (int dj2 = -1; dj2 <= 1; dj2++) {
                int value;
                if (j1 == j2) value = grid[i][j1];
                else          value = grid[i][j1] + grid[i][j2];

                value += f(i + 1, j1 + dj1, j2 + dj2, r, c, grid, dp);
                maxi = Math.max(maxi, value);
            }
        }
        return dp[i][j1][j2] = maxi;
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Why the current row&apos;s value is added inside the loop</div>
        <code>value</code> does not depend on <code>dj1</code> or <code>dj2</code>, so it could be hoisted above the
        two loops and added once to the best child. Both forms are correct and cost the same asymptotically; the
        notes&apos; shape is kept here because it keeps &quot;what I collect now&quot; and &quot;what I collect
        later&quot; in a single expression, which is easier to check against the recurrence. If you hoist it, be sure
        you add it to the <em>maximum</em> of the children and not inside the <code>Math.max</code> chain twice.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumChocolates(int r, int c, int[][] grid) {
        int[][][] dp = new int[r][c][c];

        // Base: the last row, for every pair of columns.
        for (int j1 = 0; j1 < c; j1++) {
            for (int j2 = 0; j2 < c; j2++) {
                if (j1 == j2) dp[r - 1][j1][j2] = grid[r - 1][j1];
                else          dp[r - 1][j1][j2] = grid[r - 1][j1] + grid[r - 1][j2];
            }
        }

        // Rows filled DOWNWARD: row i reads row i+1.
        for (int i = r - 2; i >= 0; i--) {
            for (int j1 = 0; j1 < c; j1++) {
                for (int j2 = 0; j2 < c; j2++) {

                    int maxi = (int) -1e8;
                    for (int dj1 = -1; dj1 <= 1; dj1++) {
                        for (int dj2 = -1; dj2 <= 1; dj2++) {
                            int value;
                            if (j1 == j2) value = grid[i][j1];
                            else          value = grid[i][j1] + grid[i][j2];

                            int nj1 = j1 + dj1, nj2 = j2 + dj2;
                            if (nj1 >= 0 && nj1 < c && nj2 >= 0 && nj2 < c) {
                                value += dp[i + 1][nj1][nj2];
                            } else {
                                value += (int) -1e8;   // the off-grid guard, inlined
                            }
                            maxi = Math.max(maxi, value);
                        }
                    }
                    dp[i][j1][j2] = maxi;
                }
            }
        }
        return dp[0][0][c - 1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(c²) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumChocolates(int r, int c, int[][] grid) {
        int[][] front = new int[c][c];                 // dp[i+1][*][*] -- the row below

        for (int j1 = 0; j1 < c; j1++) {
            for (int j2 = 0; j2 < c; j2++) {
                if (j1 == j2) front[j1][j2] = grid[r - 1][j1];
                else          front[j1][j2] = grid[r - 1][j1] + grid[r - 1][j2];
            }
        }

        for (int i = r - 2; i >= 0; i--) {
            int[][] cur = new int[c][c];               // dp[i][*][*]
            for (int j1 = 0; j1 < c; j1++) {
                for (int j2 = 0; j2 < c; j2++) {

                    int maxi = (int) -1e8;
                    for (int dj1 = -1; dj1 <= 1; dj1++) {
                        for (int dj2 = -1; dj2 <= 1; dj2++) {
                            int value;
                            if (j1 == j2) value = grid[i][j1];
                            else          value = grid[i][j1] + grid[i][j2];

                            int nj1 = j1 + dj1, nj2 = j2 + dj2;
                            if (nj1 >= 0 && nj1 < c && nj2 >= 0 && nj2 < c) {
                                value += front[nj1][nj2];
                            } else {
                                value += (int) -1e8;
                            }
                            maxi = Math.max(maxi, value);
                        }
                    }
                    cur[j1][j2] = maxi;
                }
            }
            front = cur;                               // drop the row we can never read again
        }
        return front[0][c - 1];
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Two free constant-factor halvings</div>
        The state <code>(i, j1, j2)</code> is symmetric — swapping the two players describes the same configuration —
        so only the half with <code>j1 ≤ j2</code> ever needs computing. And since the players cannot cross without
        meeting on a cell, configurations with <code>j1 &gt; j2</code> are redundant rather than illegal. Neither
        observation changes the asymptotic bound, but both roughly halve the real work, and noticing the symmetry is
        a strong signal in an interview.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(r·c²·9)">Nine joint moves per state, in all three versions.</CxBox>
        <CxBox label="Space — memo / tab" value="O(r·c²)">
          The full cube; memoization adds an <code>O(r)</code> stack.
        </CxBox>
        <CxBox label="Space — optimized" value="O(c²)">
          Two <code>c × c</code> planes — the row index disappears.
        </CxBox>
      </Cx>

      {/* 4.1 */}
      <div id="dp4-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        The <strong>pick / not-pick</strong> template from 2.5, generalised. State becomes{' '}
        <code>(index, target)</code>: &quot;using items <code>0..index</code>, can I — or in how many ways can I —
        hit <code>target</code>?&quot; All five problems here are the same table read differently.
      </p>
      <div className="card">
        <div className="callout callout-key">
          <div className="callout-title">🔑 The pick / not-pick skeleton — memorise this shape</div>
          <div className="recurrence">{
`f(ind, target):  answer using items 0..ind to reach target

notTake = f(ind-1, target)                     leave item ind alone
take    = f(ind-1, target - arr[ind])          take it, target shrinks
                                               (only when arr[ind] <= target)

combine with  ||  for feasibility,  +  for counting,  max/min for optimising`
          }</div>
          Every problem in Parts 4 and 5 is this skeleton with a different combinator and a different base case.
          Write it from memory and you can derive all eleven at the whiteboard.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Why these are only &quot;pseudo-polynomial&quot;</div>
          Time is <code>O(n × target)</code>, which looks polynomial but is not: <code>target</code> is a{' '}
          <em>value</em>, and its size in bits is <code>log(target)</code>, so the running time is exponential in
          the length of the input. Subset Sum is NP-complete; the DP is fast only because the targets in these
          problems are small. A target of <code>10^9</code> makes the whole approach useless — worth saying out loud
          when an interviewer asks about constraints.
        </div>
      </div>

      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Feasibility → boolean DP</span>
        <span className="pill">State: (ind, target)</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given an array of non-negative integers and a target <code>k</code>, decide
          whether <strong>some</strong> subset sums to exactly <code>k</code>.
        </p>
        <div className="recurrence">{
`f(ind, target) = true   if target == 0            nothing left to collect
f(0, target)   = (arr[0] == target)             one item left: it must be exactly right

f(ind, target) = f(ind-1, target)                        notTake
              || f(ind-1, target - arr[ind])             take, if arr[ind] <= target

answer = f(n-1, k)        states = n*(k+1),  work O(1),  time O(n*k)`
        }</div>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Order the base cases so <code>target == 0</code> wins
          </div>
          Test <code>target == 0</code> <strong>before</strong> <code>ind == 0</code>. Take{' '}
          <code>arr = [3]</code> with <code>target = 0</code>: the right answer is <code>true</code> (the empty
          subset), but <code>arr[0] == target</code> evaluates to <code>false</code>. The zero target is always
          reachable and must be checked first — the same principle as &quot;the empty solution counts as one
          way&quot; from Climbing Stairs.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Non-negative input is load-bearing</div>
          This recurrence assumes <code>arr[ind] ≥ 0</code>. With negative numbers{' '}
          <code>target - arr[ind]</code> can <em>grow</em>, the reachable targets are no longer bounded by{' '}
          <code>k</code>, and an <code>[n][k+1]</code> table cannot hold the state space. Handle negatives by
          offsetting the target index by the total negative sum, or by switching to a <code>HashSet</code> of
          reachable sums.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public boolean subsetSumToK(int n, int k, int[] arr) {
        int[][] dp = new int[n][k + 1];                // -1 unknown, 0 false, 1 true
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n - 1, k, arr, dp);
    }

    private boolean f(int ind, int target, int[] arr, int[][] dp) {
        if (target == 0) return true;                  // empty subset -- must be tested first
        if (ind == 0) return arr[0] == target;         // single item: exact match or nothing
        if (dp[ind][target] != -1) return dp[ind][target] == 1;

        boolean notTake = f(ind - 1, target, arr, dp);

        boolean take = false;
        if (arr[ind] <= target) {                      // taking it must not overshoot
            take = f(ind - 1, target - arr[ind], arr, dp);
        }

        boolean ans = take || notTake;
        dp[ind][target] = ans ? 1 : 0;
        return ans;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 Three-valued cache, not <code>boolean[][]</code>
        </div>
        A primitive <code>boolean[][]</code> starts out all <code>false</code>, which is indistinguishable from a
        genuine &quot;no such subset&quot; — so failing states would be recomputed and the memoization would buy
        nothing. The <code>int</code> table above carries a third value, <code>-1</code>, for &quot;not
        computed&quot;; a <code>Boolean[][]</code> using <code>null</code> is the equivalent boxed form.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public boolean subsetSumToK(int n, int k, int[] arr) {
        boolean[][] dp = new boolean[n][k + 1];

        for (int i = 0; i < n; i++) dp[i][0] = true;   // target 0 always reachable
        if (arr[0] <= k) dp[0][arr[0]] = true;         // the only other truth in row 0

        for (int ind = 1; ind < n; ind++) {
            for (int target = 1; target <= k; target++) {
                boolean notTake = dp[ind - 1][target];

                boolean take = false;
                if (arr[ind] <= target) {
                    take = dp[ind - 1][target - arr[ind]];
                }
                dp[ind][target] = take || notTake;
            }
        }
        return dp[n - 1][k];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(k) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public boolean subsetSumToK(int n, int k, int[] arr) {
        boolean[] prev = new boolean[k + 1];
        prev[0] = true;
        if (arr[0] <= k) prev[arr[0]] = true;          // the guard matters: arr[0] may exceed k

        for (int ind = 1; ind < n; ind++) {
            boolean[] cur = new boolean[k + 1];
            cur[0] = true;                             // re-seed every row, cur is fresh
            for (int target = 1; target <= k; target++) {
                boolean notTake = prev[target];
                boolean take    = (arr[ind] <= target) && prev[target - arr[ind]];
                cur[target] = take || notTake;
            }
            prev = cur;
        }
        return prev[k];
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Two things the row-reduced version must not drop</div>
        <ul>
          <li>
            <strong>The <code>arr[0] &lt;= k</code> guard.</strong> Writing <code>prev[arr[0]] = true</code>{' '}
            unguarded throws <code>ArrayIndexOutOfBoundsException</code> the moment the first element is larger than
            the target — an input that is perfectly legal and common.
          </li>
          <li>
            <strong>Re-seeding <code>cur[0] = true</code> each row.</strong> <code>prev = cur</code> in Java is a
            reference assignment, so the next iteration&apos;s fresh <code>cur</code> starts all <code>false</code> —
            and without the re-seed, target <code>0</code> becomes unreachable and the whole table collapses.
          </li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Code Implementation — Single array, reverse iteration</h3></div>
      <div className="card">
        <p>
          Both reads for row <code>ind</code> come from row <code>ind-1</code>, at columns <code>target</code> and{' '}
          <code>target - arr[ind]</code> — never to the right. So a <strong>single</strong> array works if{' '}
          <code>target</code> is iterated <strong>downward</strong>: by the time slot <code>target</code> is written,
          slot <code>target - arr[ind]</code> below it still holds the previous item&apos;s value. This is the
          canonical 0/1 knapsack trick and it reappears throughout Part 5.
        </p>
      </div>
      <Code>{
`class Solution {
    public boolean subsetSumToK(int n, int k, int[] arr) {
        boolean[] dp = new boolean[k + 1];
        dp[0] = true;

        for (int ind = 0; ind < n; ind++) {
            // DOWNWARD: dp[target - arr[ind]] must still hold the previous item's value.
            for (int target = k; target >= arr[ind]; target--) {
                dp[target] = dp[target] || dp[target - arr[ind]];
            }
        }
        return dp[k];
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Iterate upward here and you have solved a different problem</div>
        With an ascending <code>target</code> loop, <code>dp[target - arr[ind]]</code> may already include item{' '}
        <code>ind</code>, so that item gets used twice, three times, any number of times. That is not always a bug —
        it is exactly how <strong>unbounded</strong> knapsack (5.5) and Coin Change 2 (5.4) are written. The
        direction of this one loop is the difference between &quot;each item once&quot; and &quot;items
        reusable&quot;.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(n·k)">Same for all versions.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n·k)">
          Plus an <code>O(n)</code> stack when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(k)">Two rows, or one array iterated downward.</CxBox>
      </Cx>

      {/* 4.2 */}
      <div id="dp4-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 416</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Reduces to 4.1</span>
        <span className="pill">Parity pre-check</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Can the array be split into two subsets with <strong>equal</strong> sums?
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Two observations turn this into Subset Sum</div>
          <ol className="steps">
            <li>
              If the halves are equal, each sums to <code>totalSum / 2</code>. So the question is only:{' '}
              <em>is there a subset summing to <code>totalSum / 2</code>?</em> — the complement is automatically the
              other half.
            </li>
            <li>
              If <code>totalSum</code> is <strong>odd</strong>, no split can exist. Return <code>false</code>{' '}
              immediately, before allocating anything. This also protects the DP from an integer-division target
              that does not correspond to a real half.
            </li>
          </ol>
        </div>
        <div className="recurrence">{
`if (total % 2 == 1) return false

target = total / 2
answer = subsetSumToK(arr, target)          exactly the DP from 4.1

time  = O(n * total/2)      space = O(total/2) after optimisation`
        }</div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;

        if (total % 2 != 0) return false;              // odd total can never split evenly
        int target = total / 2, n = nums.length;

        int[][] dp = new int[n][target + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n - 1, target, nums, dp);
    }

    private boolean f(int ind, int target, int[] nums, int[][] dp) {
        if (target == 0) return true;
        if (ind == 0) return nums[0] == target;
        if (dp[ind][target] != -1) return dp[ind][target] == 1;

        boolean notTake = f(ind - 1, target, nums, dp);
        boolean take    = (nums[ind] <= target) && f(ind - 1, target - nums[ind], nums, dp);

        boolean ans = take || notTake;
        dp[ind][target] = ans ? 1 : 0;
        return ans;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;
        if (total % 2 != 0) return false;

        int target = total / 2, n = nums.length;
        boolean[][] dp = new boolean[n][target + 1];

        for (int i = 0; i < n; i++) dp[i][0] = true;
        if (nums[0] <= target) dp[0][nums[0]] = true;

        for (int ind = 1; ind < n; ind++) {
            for (int t = 1; t <= target; t++) {
                boolean notTake = dp[ind - 1][t];
                boolean take    = (nums[ind] <= t) && dp[ind - 1][t - nums[ind]];
                dp[ind][t] = take || notTake;
            }
        }
        return dp[n - 1][target];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(sum/2) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;
        if (total % 2 != 0) return false;

        int target = total / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;                                  // the empty subset

        for (int num : nums) {
            for (int t = target; t >= num; t--) {      // DOWNWARD: each number used at most once
                dp[t] = dp[t] || dp[t - num];
            }
            if (dp[target]) return true;               // early exit once it is reachable
        }
        return dp[target];
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 This is the version to write in an interview</div>
        Ten lines, <code>O(n · sum)</code> time, <code>O(sum)</code> space, plus a genuine early exit the moment the
        target becomes reachable. A further constant-factor trick: replace the <code>boolean[]</code> with a{' '}
        <code>java.util.BitSet</code> and the inner loop becomes a single shift-OR — 64 targets per machine word,
        roughly a 64× speedup at no asymptotic cost.
      </div>

      {/* 4.3 */}
      <div id="dp4-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Read the last row</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Split the array into two subsets <code>S1</code> and <code>S2</code>, minimising{' '}
          <code>|sum(S1) - sum(S2)|</code>. Return that minimum.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Don&apos;t build a new DP — mine the one from 4.1</div>
          If one subset sums to <code>s1</code>, the other necessarily sums to <code>total - s1</code>, so the
          difference is <code>|total - 2·s1|</code>. Minimising it means finding the achievable <code>s1</code>{' '}
          closest to <code>total / 2</code> — and &quot;achievable&quot; is exactly what the last row of the Subset
          Sum table records: <code>dp[n-1][s]</code> is <code>true</code> iff some subset sums to <code>s</code>.
          <p>
            So: fill the Subset Sum table up to <code>total</code>, then <strong>scan the last row</strong> for every
            reachable <code>s1</code> and keep the smallest <code>|total - 2·s1|</code>. The DP is unchanged; only
            the way its output is read is new. &quot;The answer is in the table, not in the return value&quot; is the
            hallmark of the harder subset problems.
          </p>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 Scan only half the row</div>
          Reachable sums are symmetric: if <code>s</code> is reachable so is <code>total - s</code> (take the
          complement). Iterating <code>s1</code> from <code>0</code> to <code>total / 2</code> therefore finds the
          same minimum in half the time.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minSubsetSumDifference(int[] arr, int n) {
        int totSum = 0;
        for (int x : arr) totSum += x;

        // ONE cache shared by every probe -- see the note below.
        int[][] dp = new int[n][totSum + 1];
        for (int[] row : dp) Arrays.fill(row, -1);

        int mini = (int) 1e9;
        for (int s1 = 0; s1 <= totSum / 2; s1++) {
            if (canMake(n - 1, s1, arr, dp)) {
                mini = Math.min(mini, Math.abs((totSum - s1) - s1));
            }
        }
        return mini;
    }

    private boolean canMake(int ind, int target, int[] arr, int[][] dp) {
        if (target == 0) return true;
        if (ind == 0) return arr[0] == target;
        if (dp[ind][target] != -1) return dp[ind][target] == 1;

        boolean notTake = canMake(ind - 1, target, arr, dp);
        boolean take    = (arr[ind] <= target) && canMake(ind - 1, target - arr[ind], arr, dp);

        boolean ans = take || notTake;
        dp[ind][target] = ans ? 1 : 0;
        return ans;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 One cache across all the probes</div>
        <code>dp</code> is allocated <em>outside</em> the <code>s1</code> loop deliberately. The probes explore
        heavily overlapping states, so the first few calls fill most of the table and the rest are near-instant. A
        fresh cache per probe would multiply the work by <code>total/2</code> and turn an <code>O(n·total)</code>{' '}
        algorithm into <code>O(n·total²)</code>.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minSubsetSumDifference(int[] arr, int n) {
        int totSum = 0;
        for (int i = 0; i < n; i++) totSum += arr[i];

        int k = totSum;
        // dp[ind][target] = can some subset of arr[0..ind] sum to exactly target?
        boolean[][] dp = new boolean[n][k + 1];

        for (int i = 0; i < n; i++) dp[i][0] = true;
        if (arr[0] <= k) dp[0][arr[0]] = true;

        for (int ind = 1; ind < n; ind++) {
            for (int target = 1; target <= k; target++) {
                boolean notTake = dp[ind - 1][target];
                boolean take    = (arr[ind] <= target) && dp[ind - 1][target - arr[ind]];
                dp[ind][target] = take || notTake;
            }
        }

        // dp[n-1][col -> 0...totSum]: mine the last row for the best split.
        int mini = (int) 1e9;
        for (int s1 = 0; s1 <= totSum / 2; s1++) {
            if (dp[n - 1][s1]) {
                mini = Math.min(mini, Math.abs((totSum - s1) - s1));
            }
        }
        return mini;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(sum) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minSubsetSumDifference(int[] arr, int n) {
        int totSum = 0;
        for (int x : arr) totSum += x;

        boolean[] dp = new boolean[totSum + 1];
        dp[0] = true;

        for (int num : arr) {
            for (int s = totSum; s >= num; s--) {      // DOWNWARD: 0/1, each element once
                dp[s] = dp[s] || dp[s - num];
            }
        }

        int mini = (int) 1e9;
        for (int s1 = 0; s1 <= totSum / 2; s1++) {
            if (dp[s1]) mini = Math.min(mini, totSum - 2 * s1);
        }
        return mini;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` arr = [1, 6, 11, 5]      totSum = 23, so we want s1 as close to 11.5 as possible

 reachable sums (dp[s] == true):
   0  1  5  6  7  11  12  16  17  18  22  23

 scan s1 = 0 .. 11:
   s1=0   -> |23 - 0|  = 23
   s1=6   -> |17 - 6|  = 11
   s1=11  -> |12 - 11| = 1        <-- best:  {1, 5, 6} = 12  vs  {11} = 11

 answer = 1

 note the scan stops at totSum/2 = 11 -- s1 = 12 would give the same 1 by symmetry`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n·totSum)">
          The table, plus an <code>O(totSum)</code> scan.
        </CxBox>
        <CxBox label="Space — memo / tab" value="O(n·totSum)">
          Can be large — <code>totSum</code> is a sum, not a count.
        </CxBox>
        <CxBox label="Space — optimized" value="O(totSum)">One boolean array.</CxBox>
      </Cx>

      {/* 4.4 */}
      <div id="dp4-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill"><code>||</code> becomes <code>+</code></span>
        <span className="pill">Zeros are the trap</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Count the subsets whose elements sum to exactly <code>k</code>, modulo{' '}
          <code>10^9 + 7</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Same table, one operator changed</div>
          Replace <code>take || notTake</code> with <code>take + notTake</code> and the feasibility DP becomes a
          counting DP. It works because the subsets that include item <code>ind</code> and those that exclude it are
          disjoint families whose union is all subsets, so their counts add — the fundamental counting move in DP,
          seen here for the third time.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The zero-element trap — the whole difficulty of this problem</div>
          <p>
            With <code>arr = [0, 0, 1]</code> and <code>k = 1</code> the answer is <strong>4</strong>:{' '}
            <code>{'{1}'}</code>, <code>{'{0₁,1}'}</code>, <code>{'{0₂,1}'}</code>, <code>{'{0₁,0₂,1}'}</code>. Each
            zero can be in or out without changing the sum, so every zero <em>doubles</em> the count.
          </p>
          <p>
            A <code>target == 0 → return 1</code> base case gets this wrong: it stops as soon as the target is met
            and never counts the ways the remaining zeros could join. Base the recursion on <code>ind == 0</code>{' '}
            alone and enumerate that row carefully:
          </p>
          <div className="recurrence">{
`if (ind == 0):
    if (sum == 0 && arr[0] == 0) return 2;      pick it or not -- both sum to 0
    if (sum == 0 || arr[0] == sum) return 1;    exactly one way
    return 0;`
          }</div>
          <p>
            In the tabulated version the same care appears as <code>dp[0][0] = (arr[0] == 0) ? 2 : 1</code>. The
            simpler <code>dp[i][0] = 1</code> route is correct only when the input has no zeros — fine if the
            constraints promise strictly positive elements, but say so, because an interviewer who planted a zero is
            testing this exact line.
          </p>
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int findWays(int[] num, int tar) {
        int n = num.length;
        int[][] dp = new int[n][tar + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n - 1, tar, num, dp);
    }

    private int f(int ind, int sum, int[] num, int[][] dp) {
        if (ind == 0) {                                // careful base row -- handles zeros
            if (sum == 0 && num[0] == 0) return 2;     // take it or leave it, both valid
            if (sum == 0 || num[0] == sum) return 1;
            return 0;
        }
        if (dp[ind][sum] != -1) return dp[ind][sum];

        int notTake = f(ind - 1, sum, num, dp);

        int take = 0;
        if (num[ind] <= sum) {
            take = f(ind - 1, sum - num[ind], num, dp);
        }
        return dp[ind][sum] = (take + notTake) % MOD;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int findWays(int[] num, int tar) {
        int n = num.length;
        int[][] dp = new int[n][tar + 1];

        // Base row, written exactly as the recursion's ind == 0 case.
        dp[0][0] = (num[0] == 0) ? 2 : 1;              // a leading zero gives two ways to make 0
        if (num[0] != 0 && num[0] <= tar) dp[0][num[0]] = 1;

        for (int ind = 1; ind < n; ind++) {
            for (int sum = 0; sum <= tar; sum++) {
                int notTake = dp[ind - 1][sum];

                int take = 0;
                if (num[ind] <= sum) {
                    take = dp[ind - 1][sum - num[ind]];
                }
                dp[ind][sum] = (notTake + take) % MOD;
            }
        }
        return dp[n - 1][tar];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(k) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int findWays(int[] num, int tar) {
        int n = num.length;
        int[] prev = new int[tar + 1];

        prev[0] = (num[0] == 0) ? 2 : 1;
        if (num[0] != 0 && num[0] <= tar) prev[num[0]] = 1;

        for (int ind = 1; ind < n; ind++) {
            int[] cur = new int[tar + 1];
            for (int sum = 0; sum <= tar; sum++) {
                int notTake = prev[sum];
                int take    = (num[ind] <= sum) ? prev[sum - num[ind]] : 0;
                cur[sum] = (notTake + take) % MOD;
            }
            prev = cur;
        }
        return prev[tar];
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The single-array form, for completeness</div>
        <code>dp[t] = (dp[t] + dp[t - num]) % MOD</code> with <code>t</code> descending from <code>tar</code> to{' '}
        <code>num</code>, seeded <code>dp[0] = 1</code>, is the tightest version — but only when the array has no
        zeros, because the doubling base case has nowhere to live. Prefer the two-array form above unless the
        constraints rule zeros out.
      </div>

      {/* 4.5 */}
      <div id="dp4-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Algebra, then 4.4</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Count the ways to split the array into two subsets <code>S1</code> and{' '}
          <code>S2</code> (every element used exactly once) with <code>sum(S1) - sum(S2) = d</code> and{' '}
          <code>sum(S1) ≥ sum(S2)</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Two lines of algebra collapse this to Count Subsets</div>
          <div className="recurrence">{
`sum(S1) - sum(S2) = d          and     sum(S1) + sum(S2) = totSum

subtracting:   2 * sum(S2) = totSum - d
                 sum(S2)   = (totSum - d) / 2

so:  count partitions with difference d
   = count subsets summing to (totSum - d) / 2        <-- exactly 4.4
   (targeting S2, the smaller half, keeps the table small)`
          }</div>
          Choosing <code>S2</code> determines <code>S1</code>, so counting the subsets counts the partitions. Nothing
          new is written; the DP from 4.4 is reused on a derived target.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Two guards before the DP — both are graded</div>
          <ul>
            <li>
              <strong><code>totSum - d</code> must not be negative.</strong> A required difference larger than the
              whole array sum is impossible, and the derived target would be negative.
            </li>
            <li>
              <strong><code>totSum - d</code> must be even.</strong> Sums of integers are integers, so an odd{' '}
              <code>totSum - d</code> means <code>sum(S2)</code> would be a fraction and the count is{' '}
              <code>0</code>. Without this check integer division rounds down and you return the count for a
              different, achievable target.
            </li>
          </ul>
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int countPartitions(int n, int d, int[] arr) {
        int totSum = 0;
        for (int x : arr) totSum += x;

        if (totSum - d < 0) return 0;                  // difference bigger than everything
        if ((totSum - d) % 2 != 0) return 0;           // would need a fractional subset sum

        int target = (totSum - d) / 2;                 // = sum(S2), the smaller subset

        int[][] dp = new int[n][target + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n - 1, target, arr, dp);
    }

    private int f(int ind, int sum, int[] arr, int[][] dp) {
        if (ind == 0) {
            if (sum == 0 && arr[0] == 0) return 2;
            if (sum == 0 || arr[0] == sum) return 1;
            return 0;
        }
        if (dp[ind][sum] != -1) return dp[ind][sum];

        int notTake = f(ind - 1, sum, arr, dp);
        int take    = (arr[ind] <= sum) ? f(ind - 1, sum - arr[ind], arr, dp) : 0;

        return dp[ind][sum] = (take + notTake) % MOD;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int countPartitions(int n, int d, int[] arr) {
        int totSum = 0;
        for (int x : arr) totSum += x;
        if (totSum - d < 0 || (totSum - d) % 2 != 0) return 0;

        int target = (totSum - d) / 2;
        int[][] dp = new int[n][target + 1];

        dp[0][0] = (arr[0] == 0) ? 2 : 1;
        if (arr[0] != 0 && arr[0] <= target) dp[0][arr[0]] = 1;

        for (int ind = 1; ind < n; ind++) {
            for (int t = 0; t <= target; t++) {
                int notTake = dp[ind - 1][t];
                int take    = (arr[ind] <= t) ? dp[ind - 1][t - arr[ind]] : 0;
                dp[ind][t] = (take + notTake) % MOD;
            }
        }
        return dp[n - 1][target];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(target) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int countPartitions(int n, int d, int[] arr) {
        int totSum = 0;
        for (int x : arr) totSum += x;
        if (totSum - d < 0 || (totSum - d) % 2 != 0) return 0;

        int target = (totSum - d) / 2;
        int[] prev = new int[target + 1];

        prev[0] = (arr[0] == 0) ? 2 : 1;
        if (arr[0] != 0 && arr[0] <= target) prev[arr[0]] = 1;

        for (int ind = 1; ind < n; ind++) {
            int[] cur = new int[target + 1];
            for (int t = 0; t <= target; t++) {
                int notTake = prev[t];
                int take    = (arr[ind] <= t) ? prev[t - arr[ind]] : 0;
                cur[t] = (take + notTake) % MOD;
            }
            prev = cur;
        }
        return prev[target];
    }
}`
      }</Code>

      <Cx three>
        <CxBox label="Time" value="O(n·target)">
          <code>target = (totSum - d) / 2</code>.
        </CxBox>
        <CxBox label="Space — memo / tab" value="O(n·target)">Plus recursion stack when memoized.</CxBox>
        <CxBox label="Space — optimized" value="O(target)">Two rows.</CxBox>
      </Cx>

      {/* 5.1 */}
      <div id="dp5-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        Same pick / not-pick state as Part 4, now carrying a <strong>value</strong> to optimise rather than a target
        to hit. The one distinction that governs everything here is whether an item may be reused:{' '}
        <strong>0/1</strong> recurses on <code>ind-1</code> after taking, <strong>unbounded</strong> stays on{' '}
        <code>ind</code>.
      </p>
      <div className="card">
        <div className="callout callout-key">
          <div className="callout-title">🔑 0/1 versus unbounded — one index</div>
          <div className="recurrence">{
`0/1 knapsack:        take = val[ind] + f(ind - 1, W - wt[ind])
                                              ^^^^^ move on, item consumed

unbounded knapsack:  take = val[ind] + f(ind,     W - wt[ind])
                                              ^^^ stay, item still available

tabulated, the same distinction is:   dp[ind-1][W - wt[ind]]   vs   dp[ind][W - wt[ind]]
single array, it is the loop direction:   W descending   vs   W ascending`
          }</div>
          Five of the six problems in this part are one of those two lines. Identify which before writing anything
          else.
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Problem</th><th>Reuse?</th><th>Asks for</th><th>Combinator</th></tr>
            </thead>
            <tbody>
              <tr><td>5.1 0/1 Knapsack</td><td>No</td><td>Max value</td><td><code>max</code></td></tr>
              <tr><td>5.2 Minimum Coins</td><td>Yes</td><td>Fewest coins</td><td><code>min</code></td></tr>
              <tr><td>5.3 Target Sum</td><td>No</td><td>Count of sign assignments</td><td><code>+</code></td></tr>
              <tr><td>5.4 Coin Change 2</td><td>Yes</td><td>Count of combinations</td><td><code>+</code></td></tr>
              <tr><td>5.5 Unbounded Knapsack</td><td>Yes</td><td>Max value</td><td><code>max</code></td></tr>
              <tr><td>5.6 Rod Cutting</td><td>Yes</td><td>Max price</td><td><code>max</code></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">The archetype</span>
        <span className="pill">State: (ind, W)</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> <code>n</code> items, each with a <code>weight[i]</code> and a{' '}
          <code>value[i]</code>, and a bag of capacity <code>maxWeight</code>. Each item may be taken{' '}
          <strong>at most once</strong>. Maximise the total value carried.
        </p>
        <div className="recurrence">{
`base  ind == 0:   wt[0] <= W ?  val[0]  :  0        take it if it fits

notTake = 0 + f(ind-1, W)
take    = val[ind] + f(ind-1, W - wt[ind])      only when wt[ind] <= W

f(ind, W) = max(take, notTake)

answer = f(n-1, maxWeight)     states = n*(W+1), work O(1), time O(n*W)`
        }</div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why greedy by value/weight ratio fails</div>
          Fractional knapsack <em>is</em> solved greedily by ratio, which is why the mistake is so tempting. But when
          items are indivisible, the ratio-best item can crowd out a pair that together fill the bag better: with
          capacity <code>10</code> and items <code>(w=6, v=7)</code>, <code>(w=5, v=5)</code>,{' '}
          <code>(w=5, v=5)</code>, greed takes the first (ratio 1.17) and then nothing fits, for <code>7</code>; the
          optimum takes both fives for <code>10</code>.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int knapsack(int[] weight, int[] value, int n, int maxWeight) {
        int[][] dp = new int[n][maxWeight + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n - 1, maxWeight, weight, value, dp);
    }

    private int f(int ind, int W, int[] wt, int[] val, int[][] dp) {
        if (ind == 0) {
            if (wt[0] <= W) return val[0];             // the single item fits
            return 0;                                  // it does not
        }
        if (dp[ind][W] != -1) return dp[ind][W];

        int notTake = 0 + f(ind - 1, W, wt, val, dp);

        int take = Integer.MIN_VALUE;
        if (wt[ind] <= W) {
            take = val[ind] + f(ind - 1, W - wt[ind], wt, val, dp);
        }
        return dp[ind][W] = Math.max(take, notTake);
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 <code>Integer.MIN_VALUE</code> is safe here, but only just
        </div>
        The sentinel marks &quot;taking is impossible&quot; and is compared, never added to — the{' '}
        <code>val[ind] +</code> happens only inside the <code>if</code>. That is what makes{' '}
        <code>MIN_VALUE</code> safe, and it is the same reasoning as Frog Jump in 2.3. If you ever restructure this
        so the sentinel flows into an addition, switch it to <code>(int) -1e9</code> first.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int knapsack(int[] wt, int[] val, int n, int maxWeight) {
        int[][] dp = new int[n][maxWeight + 1];

        // Base row: with only item 0 available, every capacity that fits it holds val[0].
        for (int W = wt[0]; W <= maxWeight; W++) {
            dp[0][W] = val[0];
        }

        for (int ind = 1; ind < n; ind++) {
            for (int W = 0; W <= maxWeight; W++) {
                int notTake = 0 + dp[ind - 1][W];

                int take = Integer.MIN_VALUE;
                if (wt[ind] <= W) {
                    take = val[ind] + dp[ind - 1][W - wt[ind]];
                }
                dp[ind][W] = Math.max(take, notTake);
            }
        }
        return dp[n - 1][maxWeight];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(W) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int knapsack(int[] wt, int[] val, int n, int maxWeight) {
        int[] prev = new int[maxWeight + 1];

        for (int W = wt[0]; W <= maxWeight; W++) {
            prev[W] = val[0];
        }

        for (int ind = 1; ind < n; ind++) {
            int[] cur = new int[maxWeight + 1];
            for (int W = 0; W <= maxWeight; W++) {
                int notTake = 0 + prev[W];

                int take = Integer.MIN_VALUE;
                if (wt[ind] <= W) {
                    take = val[ind] + prev[W - wt[ind]];   // prev: item ind not reused
                }
                cur[W] = Math.max(take, notTake);
            }
            prev = cur;
        }
        return prev[maxWeight];
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Single array, reverse iteration</h3></div>
      <Code>{
`class Solution {
    public int knapsack(int[] wt, int[] val, int n, int maxWeight) {
        int[] dp = new int[maxWeight + 1];

        for (int W = wt[0]; W <= maxWeight; W++) {
            dp[W] = val[0];
        }

        for (int ind = 1; ind < n; ind++) {
            // DOWNWARD is what makes this 0/1: dp[W - wt[ind]] must predate item ind.
            for (int W = maxWeight; W >= wt[ind]; W--) {
                dp[W] = Math.max(dp[W], val[ind] + dp[W - wt[ind]]);
            }
        }
        return dp[maxWeight];
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ This one loop direction is the whole difference</div>
        Flip <code>W--</code> to <code>W++</code> and <code>dp[W - wt[ind]]</code> may already contain item{' '}
        <code>ind</code>, so the item gets taken repeatedly — you have silently written{' '}
        <strong>unbounded</strong> knapsack (5.5). Neither version crashes; only the answers differ. Say the
        direction out loud as you write it.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` wt = [1, 2, 4, 5],  val = [5, 4, 8, 6],  maxWeight = 5

 dp table (rows = items available, cols = capacity 0..5)

          W=0  1   2   3   4   5
 ind=0 |   0   5   5   5   5   5      only item 0 (w1, v5): fits from W=1 on
 ind=1 |   0   5   5   9   9   9      + item 1 (w2, v4)
 ind=2 |   0   5   5   9   9  13      + item 2 (w4, v8)
 ind=3 |   0   5   5   9   9  13      + item 3 (w5, v6)

 the interesting cells:
   dp[1][3] = max( notTake dp[0][3]=5 ,  take 4 + dp[0][1]=5 -> 9 )   = 9
   dp[2][4] = max( notTake dp[1][4]=9 ,  take 8 + dp[1][0]=0 -> 8 )   = 9
   dp[2][5] = max( notTake dp[1][5]=9 ,  take 8 + dp[1][1]=5 -> 13 )  = 13
   dp[3][5] = max( notTake dp[2][5]=13,  take 6 + dp[2][0]=0 -> 6 )   = 13

 answer = 13      items {0, 2}: weight 1 + 4 = 5, value 5 + 8 = 13`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n·W)">All versions.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n·W)">
          Plus an <code>O(n)</code> stack when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(W)">Two rows, or one array descending.</CxBox>
      </Cx>

      {/* 5.2 */}
      <div id="dp5-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 322</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Unbounded</span>
        <span className="pill">Infinity sentinel</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given coin denominations (infinite supply of each) and a <code>target</code>,
          return the <strong>fewest</strong> coins summing to the target, or <code>-1</code> if it cannot be made.
        </p>
        <div className="recurrence">{
`base  ind == 0:   T % nums[0] == 0 ?  T / nums[0]  :  1e9
                  ^ only one denomination left: use it exactly, or fail

notTake = 0 + f(ind-1, T)
take    = 1 + f(ind,   T - nums[ind])          NOTE: ind, not ind-1 -- reusable

f(ind, T) = min(take, notTake)

answer = f(n-1, target), then map >= 1e9 back to -1`
        }</div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The base case does the division, and the sentinel does the failing</div>
          With one denomination left, the target is reachable only if it is an exact multiple — and then the coin
          count is the quotient. Everything else is unreachable and must return a value that loses every{' '}
          <code>min</code>. The caller then translates that sentinel into the <code>-1</code> the problem asks for;{' '}
          <strong>do not return <code>-1</code> from inside the recursion</strong>, because <code>min</code> would
          happily select it as the smallest count.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ <code>1e9</code>, never <code>Integer.MAX_VALUE</code>
          </div>
          The sentinel is returned into <code>1 + f(...)</code>, so it <em>is</em> added to.{' '}
          <code>MAX_VALUE + 1</code> wraps to <code>Integer.MIN_VALUE</code>, <code>min</code> selects it, and the
          function returns a negative coin count. Use <code>(int) 1e9</code>, which loses every comparison and has
          room to absorb the increments. The final check is <code>ans ≥ 1e9</code> rather than <code>== 1e9</code>{' '}
          precisely because those increments may have nudged it upward.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minimumElements(int[] num, int target) {
        int n = num.length;
        int[][] dp = new int[n][target + 1];
        for (int[] row : dp) Arrays.fill(row, -1);

        int ans = f(n - 1, target, num, dp);
        if (ans >= (int) 1e9) return -1;               // unreachable target
        return ans;
    }

    private int f(int ind, int T, int[] nums, int[][] dp) {
        if (ind == 0) {
            if (T % nums[0] == 0) return T / nums[0];  // exact multiple of the last coin
            return (int) 1e9;                          // cannot be made
        }
        if (dp[ind][T] != -1) return dp[ind][T];

        int notTake = 0 + f(ind - 1, T, nums, dp);

        int take = (int) 1e9;
        if (nums[ind] <= T) {
            take = 1 + f(ind, T - nums[ind], nums, dp);   // ind stays: coin is reusable
        }
        return dp[ind][T] = Math.min(take, notTake);
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minimumElements(int[] num, int target) {
        int n = num.length;
        int[][] dp = new int[n][target + 1];

        // Base row from the recursion's ind == 0 case.
        for (int T = 0; T <= target; T++) {
            if (T % num[0] == 0) dp[0][T] = T / num[0];
            else                 dp[0][T] = (int) 1e9;
        }

        for (int ind = 1; ind < n; ind++) {
            for (int T = 0; T <= target; T++) {
                int notTake = 0 + dp[ind - 1][T];

                int take = (int) 1e9;
                if (num[ind] <= T) {
                    take = 1 + dp[ind][T - num[ind]];  // SAME row: the coin may be reused
                }
                dp[ind][T] = Math.min(take, notTake);
            }
        }

        int ans = dp[n - 1][target];
        if (ans >= (int) 1e9) return -1;
        return ans;
    }
}`
      }</Code>

      <div className="callout callout-key">
        <div className="callout-title">
          🔑 <code>dp[ind][T - num[ind]]</code> reads the row being written
        </div>
        This is legal and deliberate: by the time column <code>T</code> is reached, column{' '}
        <code>T - num[ind]</code> of the <em>same</em> row is already final, and it represents &quot;best count for
        the smaller target, with this coin still available&quot;. That self-reference is the tabulated signature of
        an unbounded item, and it is why the inner loop must run <strong>upward</strong>.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(target) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minimumElements(int[] num, int target) {
        int n = num.length;
        int[] prev = new int[target + 1];

        for (int T = 0; T <= target; T++) {
            if (T % num[0] == 0) prev[T] = T / num[0];
            else                 prev[T] = (int) 1e9;
        }

        for (int ind = 1; ind < n; ind++) {
            int[] cur = new int[target + 1];
            for (int T = 0; T <= target; T++) {
                int notTake = 0 + prev[T];

                int take = (int) 1e9;
                if (num[ind] <= T) {
                    take = 1 + cur[T - num[ind]];      // cur, not prev -- reusable coin
                }
                cur[T] = Math.min(take, notTake);
            }
            prev = cur;
        }

        int ans = prev[target];
        if (ans >= (int) 1e9) return -1;
        return ans;
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">
          💡 The flat <code>O(target)</code> one-liner
        </div>
        Because the coin is reusable, this problem also has a single-array form with no <code>ind</code> dimension at
        all: seed <code>dp[0] = 0</code> and the rest to <code>1e9</code>, then for each coin run <code>T</code>{' '}
        <strong>upward</strong> with <code>dp[T] = min(dp[T], 1 + dp[T - coin])</code>. It is the version most people
        memorise for LeetCode 322 — and the ascending loop is doing exactly the <code>cur[T - num[ind]]</code>{' '}
        self-read shown above.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(n·target)">All versions.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n·target)">
          Stack depth can reach <code>target</code> when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(target)">Two rows, or one flat array.</CxBox>
      </Cx>

      {/* 5.3 */}
      <div id="dp5-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 494</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Identical to 4.5</span>
        <span className="pill">+ / − signs</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Assign a <code>+</code> or <code>−</code> sign to every element of{' '}
          <code>nums</code> so the expression evaluates to <code>target</code>. Count the ways.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 This is Count Partitions with a Given Difference, re-worded</div>
          Every assignment of signs splits the array into the <code>+</code> group and the <code>−</code> group, and
          the expression&apos;s value is <code>sum(plus) - sum(minus)</code>. So &quot;count the sign assignments
          giving <code>target</code>&quot; <em>is</em> &quot;count the partitions whose difference is{' '}
          <code>target</code>&quot; — problem 4.5 with <code>d = target</code>. Recognising that a
          differently-dressed problem is one you have already solved is worth more than any new technique.
        </div>
        <div className="recurrence">{
`plus - minus  = target
plus + minus  = totSum
            ->  minus = (totSum - target) / 2

answer = number of subsets summing to (totSum - target) / 2

guards:  totSum - target must be >= 0 and even
         a negative target is fine -- the two groups simply swap roles`
        }</div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ <code>Math.abs(target)</code> before the guards
          </div>
          LeetCode 494 allows a negative <code>target</code>, and <code>totSum - (-5)</code> exceeds{' '}
          <code>totSum</code>, making the derived subset target larger than any reachable sum and indexing off the
          table. Flipping every sign maps a solution for <code>-target</code> onto one for <code>+target</code>{' '}
          bijectively, so take <code>target = Math.abs(target)</code> first and the guards behave.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int totSum = 0;
        for (int x : nums) totSum += x;

        target = Math.abs(target);                     // symmetric: flip every sign
        if (totSum < target || (totSum - target) % 2 != 0) return 0;

        int subsetTarget = (totSum - target) / 2;      // the sum of the minus group
        int n = nums.length;

        int[][] dp = new int[n][subsetTarget + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n - 1, subsetTarget, nums, dp);
    }

    private int f(int ind, int sum, int[] nums, int[][] dp) {
        if (ind == 0) {
            if (sum == 0 && nums[0] == 0) return 2;    // a zero can carry either sign
            if (sum == 0 || nums[0] == sum) return 1;
            return 0;
        }
        if (dp[ind][sum] != -1) return dp[ind][sum];

        int notTake = f(ind - 1, sum, nums, dp);
        int take    = (nums[ind] <= sum) ? f(ind - 1, sum - nums[ind], nums, dp) : 0;

        return dp[ind][sum] = take + notTake;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int totSum = 0;
        for (int x : nums) totSum += x;

        target = Math.abs(target);
        if (totSum < target || (totSum - target) % 2 != 0) return 0;

        int T = (totSum - target) / 2, n = nums.length;
        int[][] dp = new int[n][T + 1];

        dp[0][0] = (nums[0] == 0) ? 2 : 1;
        if (nums[0] != 0 && nums[0] <= T) dp[0][nums[0]] = 1;

        for (int ind = 1; ind < n; ind++) {
            for (int t = 0; t <= T; t++) {
                int notTake = dp[ind - 1][t];
                int take    = (nums[ind] <= t) ? dp[ind - 1][t - nums[ind]] : 0;
                dp[ind][t] = take + notTake;
            }
        }
        return dp[n - 1][T];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(target) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int totSum = 0;
        for (int x : nums) totSum += x;

        target = Math.abs(target);
        if (totSum < target || (totSum - target) % 2 != 0) return 0;

        int T = (totSum - target) / 2;
        int[] dp = new int[T + 1];
        dp[0] = 1;                                     // one way to make 0: the empty group

        for (int num : nums) {
            // DOWNWARD, and note the bound is >= num, so num == 0 still reaches t == 0
            // and performs dp[0] += dp[0] -- which correctly doubles for a zero element.
            for (int t = T; t >= num; t--) {
                dp[t] += dp[t - num];
            }
        }
        return dp[T];
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` nums = [1, 1, 1, 1, 1], target = 3        totSum = 5

 minus group must sum to (5 - 3) / 2 = 1

 count subsets of five 1s summing to 1  ->  choose any single element  ->  5 ways

 check by hand: +1+1+1+1-1 with the minus in each of 5 positions       answer = 5`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n·T)">
          <code>T = (totSum - target) / 2</code>.
        </CxBox>
        <CxBox label="Space — memo / tab" value="O(n·T)">Plus recursion stack when memoized.</CxBox>
        <CxBox label="Space — optimized" value="O(T)">One array.</CxBox>
      </Cx>

      {/* 5.4 */}
      <div id="dp5-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 518</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Unbounded + counting</span>
        <span className="pill">Needs <code>long</code></span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given denominations with infinite supply, count the number of distinct{' '}
          <strong>combinations</strong> that sum to <code>value</code>. Order does not matter:{' '}
          <code>{'{1,2}'}</code> and <code>{'{2,1}'}</code> are the same combination.
        </p>
        <div className="recurrence">{
`base  ind == 0:   (T % a[0] == 0) ? 1 : 0        one denomination: exactly one way, or none

notTake = f(ind-1, T)
take    = f(ind,   T - a[ind])                  ind stays: coin reusable

f(ind, T) = take + notTake

answer = f(n-1, value)`
        }</div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why the outer loop over coins prevents double counting</div>
          Iterating coins in the <em>outer</em> loop and targets in the inner one means each combination is built in
          one canonical coin order, so <code>{'{1,2}'}</code> is counted once. Swap the loops — targets outside,
          coins inside — and you count <strong>permutations</strong> instead, which is a different problem
          (Combination Sum IV). The loop nesting <em>is</em> the specification here.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ The count overflows <code>int</code>
          </div>
          Combination counts grow fast, which is why the Coding Ninjas signature returns <code>long</code>. Make the
          rolling arrays <code>long[]</code>, not just the return value — an <code>int[]</code> table silently
          truncates before the wider return type is ever reached.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public long countWaysToMakeChange(int[] denominations, int n, int value) {
        long[][] dp = new long[n][value + 1];
        for (long[] row : dp) Arrays.fill(row, -1L);
        return f(n - 1, value, denominations, dp);
    }

    private long f(int ind, int T, int[] a, long[][] dp) {
        if (ind == 0) {
            return (T % a[0] == 0) ? 1 : 0;            // exact multiple of the last coin
        }
        if (dp[ind][T] != -1) return dp[ind][T];

        long notTake = f(ind - 1, T, a, dp);

        long take = 0;
        if (a[ind] <= T) {
            take = f(ind, T - a[ind], a, dp);          // ind stays: coin reusable
        }
        return dp[ind][T] = take + notTake;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public long countWaysToMakeChange(int[] a, int n, int value) {
        long[][] dp = new long[n][value + 1];

        for (int T = 0; T <= value; T++) {
            dp[0][T] = (T % a[0] == 0) ? 1 : 0;
        }

        for (int ind = 1; ind < n; ind++) {
            for (int T = 0; T <= value; T++) {
                long notTake = dp[ind - 1][T];

                long take = 0;
                if (a[ind] <= T) {
                    take = dp[ind][T - a[ind]];        // SAME row: unbounded
                }
                dp[ind][T] = take + notTake;
            }
        }
        return dp[n - 1][value];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(value) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public long countWaysToMakeChange(int[] a, int n, int value) {
        long[] prev = new long[value + 1];             // long[], not int[] -- counts overflow

        for (int T = 0; T <= value; T++) {
            prev[T] = (T % a[0] == 0) ? 1 : 0;
        }

        for (int ind = 1; ind < n; ind++) {
            long[] cur = new long[value + 1];
            for (int T = 0; T <= value; T++) {
                long notTake = prev[T];

                long take = 0;
                if (a[ind] <= T) {
                    take = cur[T - a[ind]];            // cur: this coin stays available
                }
                cur[T] = take + notTake;
            }
            prev = cur;
        }
        return prev[value];
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The flat form everyone memorises</div>
        <code>long[] dp = new long[value + 1]; dp[0] = 1;</code> then{' '}
        <code>for (coin : coins) for (T = coin; T &lt;= value; T++) dp[T] += dp[T - coin];</code> — coins outside,
        targets ascending inside. That ascending inner loop is the <code>cur[T - a[ind]]</code> self-read above, and
        the coin-outside nesting is what keeps it counting combinations rather than permutations.
      </div>

      {/* 5.5 */}
      <div id="dp5-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Items reusable</span>
        <span className="pill">State: (ind, W)</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> 0/1 Knapsack (5.1), except each item may be taken <strong>any number of
          times</strong>. Maximise the value within capacity <code>w</code>.
        </p>
        <div className="recurrence">{
`base  ind == 0:   (W / wt[0]) * val[0]         fill the bag with copies of item 0

notTake = 0 + f(ind-1, W)
take    = val[ind] + f(ind, W - wt[ind])        ind stays

f(ind, W) = max(take, notTake)`
        }</div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The base case changes too, not just the recursive call</div>
          This is the step people miss when converting 5.1. With items reusable, the last denomination is not
          &quot;take it or leave it&quot; — it is &quot;take it as many times as it fits&quot;, so the base case is
          the integer division <code>(W / wt[0]) * val[0]</code>, not <code>wt[0] &lt;= W ? val[0] : 0</code>.
          Changing only the recursive call and leaving the 0/1 base case gives answers that are too small on exactly
          the inputs where one cheap item should be repeated.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int unboundedKnapsack(int n, int w, int[] val, int[] wt) {
        int[][] dp = new int[n][w + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n - 1, w, val, wt, dp);
    }

    private int f(int ind, int W, int[] val, int[] wt, int[][] dp) {
        if (ind == 0) {
            return (W / wt[0]) * val[0];               // as many copies of item 0 as fit
        }
        if (dp[ind][W] != -1) return dp[ind][W];

        int notTake = 0 + f(ind - 1, W, val, wt, dp);

        int take = 0;
        if (wt[ind] <= W) {
            take = val[ind] + f(ind, W - wt[ind], val, wt, dp);   // ind stays
        }
        return dp[ind][W] = Math.max(take, notTake);
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int unboundedKnapsack(int n, int w, int[] val, int[] wt) {
        int[][] dp = new int[n][w + 1];

        for (int W = 0; W <= w; W++) {
            dp[0][W] = (W / wt[0]) * val[0];
        }

        for (int ind = 1; ind < n; ind++) {
            for (int W = 0; W <= w; W++) {
                int notTake = 0 + dp[ind - 1][W];

                int take = 0;
                if (wt[ind] <= W) {
                    take = val[ind] + dp[ind][W - wt[ind]];   // SAME row
                }
                dp[ind][W] = Math.max(take, notTake);
            }
        }
        return dp[n - 1][w];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(W) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int unboundedKnapsack(int n, int w, int[] val, int[] wt) {
        // A single array suffices, iterated UPWARD -- the opposite of 0/1 knapsack.
        int[] dp = new int[w + 1];

        for (int W = 0; W <= w; W++) {
            dp[W] = (W / wt[0]) * val[0];
        }

        for (int ind = 1; ind < n; ind++) {
            for (int W = wt[ind]; W <= w; W++) {       // UPWARD: dp[W - wt] may include item ind
                dp[W] = Math.max(dp[W], val[ind] + dp[W - wt[ind]]);
            }
        }
        return dp[w];
    }
}`
      }</Code>

      <div className="callout callout-key">
        <div className="callout-title">🔑 The same code as 5.1, with the loop reversed</div>
        Put the two single-array versions side by side: 0/1 runs <code>W</code> from <code>maxWeight</code> down to{' '}
        <code>wt[ind]</code>, unbounded runs it from <code>wt[ind]</code> up to <code>w</code>. Everything else is
        identical. This is the clearest illustration in these notes of the rule from 1.3 — the loop direction encodes
        which row a single array is standing in for, and here it encodes the entire difference between two named
        problems.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(n·W)">
          Note this is <em>not</em> exponential despite unlimited copies — the capacity bounds the repeats.
        </CxBox>
        <CxBox label="Space — memo / tab" value="O(n·W)">
          Stack depth up to <code>W / min(wt)</code> when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(W)">One array ascending.</CxBox>
      </Cx>

      {/* 5.6 */}
      <div id="dp5-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Unbounded Knapsack in disguise</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A rod of length <code>n</code> and an array <code>price</code> where{' '}
          <code>price[i]</code> is the price of a piece of length <code>i+1</code>. Cut the rod into pieces to
          maximise the total price.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 It is Unbounded Knapsack with weight implied by the index</div>
          Read <code>ind</code> as the piece of length <code>rodLength = ind + 1</code>, priced{' '}
          <code>price[ind]</code>. Capacity is the remaining rod length <code>N</code>, and pieces may be cut any
          number of times — so this is 5.5 with <code>wt[ind]</code> replaced by <code>ind + 1</code>. The{' '}
          <code>+1</code> is the only wrinkle, and it is where the off-by-one lives: <code>price[0]</code> is the
          price of length <strong>1</strong>, not length 0.
        </div>
        <div className="recurrence">{
`base  ind == 0:   N * price[0]        length-1 pieces: N of them

rodLength = ind + 1
notTake = 0 + f(ind-1, N)
take    = price[ind] + f(ind, N - rodLength)     only when rodLength <= N

f(ind, N) = max(take, notTake)

answer = f(n-1, n)       states = n*(n+1), time O(n^2)`
        }</div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int cutRod(int[] price, int n) {
        int[][] dp = new int[n][n + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n - 1, n, price, dp);
    }

    private int f(int ind, int N, int[] price, int[][] dp) {
        if (ind == 0) {
            return N * price[0];                       // cut everything into length-1 pieces
        }
        if (dp[ind][N] != -1) return dp[ind][N];

        int notTake = 0 + f(ind - 1, N, price, dp);

        int take = Integer.MIN_VALUE;
        int rodLength = ind + 1;                       // index ind is a piece of length ind+1
        if (rodLength <= N) {
            take = price[ind] + f(ind, N - rodLength, price, dp);   // ind stays: reusable
        }
        return dp[ind][N] = Math.max(take, notTake);
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Pass the cache into every recursive call</div>
        It is worth double-checking this on every memoized solution you write: a memo table that is created and then
        never threaded through the recursive calls either fails to compile, or — if the table happens to be a field —
        turns a correct <code>O(n²)</code> into a correct-but-exponential solution with no visible symptom.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int cutRod(int[] price, int n) {
        int[][] dp = new int[n][n + 1];

        for (int N = 0; N <= n; N++) {
            dp[0][N] = N * price[0];
        }

        for (int ind = 1; ind < n; ind++) {
            for (int N = 0; N <= n; N++) {
                int notTake = 0 + dp[ind - 1][N];

                int take = Integer.MIN_VALUE;
                int rodLength = ind + 1;
                if (rodLength <= N) {
                    take = price[ind] + dp[ind][N - rodLength];   // SAME row
                }
                dp[ind][N] = Math.max(take, notTake);
            }
        }
        return dp[n - 1][n];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(n) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int cutRod(int[] price, int n) {
        // Unbounded, so one array iterated UPWARD is enough.
        int[] dp = new int[n + 1];

        for (int N = 0; N <= n; N++) {
            dp[N] = N * price[0];
        }

        for (int ind = 1; ind < n; ind++) {
            int rodLength = ind + 1;
            for (int N = rodLength; N <= n; N++) {     // UPWARD: the piece stays available
                dp[N] = Math.max(dp[N], price[ind] + dp[N - rodLength]);
            }
        }
        return dp[n];
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` price = [2, 5, 7, 8],  n = 4        (length 1 -> 2, length 2 -> 5, length 3 -> 7, length 4 -> 8)

 dp[N] after each piece length is considered:

  after length 1 only:   N: 0  1  2  3  4
                            0  2  4  6  8

  after length 2 (=5):      0  2  5  7  10      dp[2]=max(4, 5+dp[0])=5
                                                dp[3]=max(6, 5+dp[1]=7)=7
                                                dp[4]=max(8, 5+dp[2]=10)=10

  after length 3 (=7):      0  2  5  7  10      dp[3]=max(7, 7+dp[0]=7)=7
                                                dp[4]=max(10, 7+dp[1]=9)=10

  after length 4 (=8):      0  2  5  7  10      dp[4]=max(10, 8+dp[0]=8)=10

 answer = 10       two pieces of length 2, at 5 each -- better than one length-4 piece at 8`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n²)">
          <code>n</code> piece lengths × <code>n</code> capacities.
        </CxBox>
        <CxBox label="Space — memo / tab" value="O(n²)">Plus recursion stack when memoized.</CxBox>
        <CxBox label="Space — optimized" value="O(n)">One array ascending.</CxBox>
      </Cx>

      {/* 6.1 */}
      <div id="dp6-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        Two strings, one index each: state is <code>(i, j)</code>. Every problem here is either LCS itself or a
        two-line reduction to it — palindromes, insertions, deletions and supersequences all fall out of the same
        table. The harder three (Distinct Subsequences, Edit Distance, Wildcard) change the recurrence but keep the
        shape.
      </p>
      <div className="card">
        <div className="callout callout-key">
          <div className="callout-title">🔑 The index-shift convention used throughout this part</div>
          <p>
            A string recursion naturally asks for <code>f(i-1, j-1)</code> and handles <code>i &lt; 0</code> with a
            base case. Arrays cannot index <code>-1</code>, so every tabulated solution here is{' '}
            <strong>shifted by one</strong>: the table is <code>[n+1][m+1]</code>, row <code>i</code> means &quot;the
            first <code>i</code> characters of <code>s</code>&quot;, and <code>dp[0][*]</code> /{' '}
            <code>dp[*][0]</code> are the empty-prefix rows that replace the negative base cases.
          </p>
          <div className="recurrence">{
`recursion (0-based)                 table (1-based, shifted)
-------------------------           ----------------------------
f(i, j), chars s[i], t[j]           dp[i][j], chars s[i-1], t[j-1]
if (i < 0 || j < 0) return 0        dp[0][j] = dp[i][0] = 0
answer = f(n-1, m-1)                answer = dp[n][m]`
          }</div>
          <strong>The single most common bug in Part 6</strong> is comparing <code>s[i]</code> instead of{' '}
          <code>s[i-1]</code> inside a shifted loop. Whenever you see <code>dp[i][j]</code> with a{' '}
          <code>[n+1][m+1]</code> table, the characters are at <code>i-1</code> and <code>j-1</code>.
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Problem</th><th>Reduces to</th><th>Formula</th></tr></thead>
            <tbody>
              <tr>
                <td>6.4 Longest Palindromic Subsequence</td>
                <td>LCS</td>
                <td><code>LCS(s, reverse(s))</code></td>
              </tr>
              <tr>
                <td>6.5 Min insertions to make palindrome</td>
                <td>6.4</td>
                <td><code>n - LPS(s)</code></td>
              </tr>
              <tr>
                <td>6.6 Min insertions + deletions, A → B</td>
                <td>LCS</td>
                <td><code>n + m - 2·LCS(a, b)</code></td>
              </tr>
              <tr>
                <td>6.7 Shortest Common Supersequence</td>
                <td>LCS</td>
                <td>length <code>= n + m - LCS(a, b)</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="meta-row">
        <span className="pill">LeetCode 1143</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">The parent problem</span>
        <span className="pill">State: (i, j)</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given strings <code>s</code> and <code>t</code>, return the length of their
          longest common <strong>subsequence</strong> — characters in order but not necessarily contiguous.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Match, or discard one side</div>
          At <code>(i, j)</code> compare the two current characters:
          <ul>
            <li>
              <strong>They match.</strong> Then including them is always at least as good as not — take them and
              recurse on <code>(i-1, j-1)</code>. There is no need to also try discarding, which is what makes this{' '}
              <code>O(nm)</code> rather than <code>O(3^n)</code>.
            </li>
            <li>
              <strong>They differ.</strong> At most one of them can be part of the answer, so try both:{' '}
              <code>max(f(i-1, j), f(i, j-1))</code>.
            </li>
          </ul>
        </div>
        <div className="recurrence">{
`f(i, j) = 0                            if i == 0 or j == 0   (empty prefix)

if s[i-1] == t[j-1]:  f(i, j) = 1 + f(i-1, j-1)
else:                 f(i, j) = max( f(i-1, j), f(i, j-1) )

answer = f(n, m)      states = (n+1)*(m+1), work O(1), time O(n*m)`
        }</div>
        <pre className="diagram">{
` s = "abcde"   t = "ace"        LCS = "ace", length 3

        ""  a  c  e
    "" | 0  0  0  0
     a | 0  1  1  1
     b | 0  1  1  1
     c | 0  1  2  2
     d | 0  1  2  2
     e | 0  1  2  3      <-- answer

 a diagonal step (+1) happens only on a match; otherwise the value is copied
 from above or from the left, whichever is larger`
        }</pre>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int lcs(String s, String t) {
        int n = s.length(), m = t.length();
        int[][] dp = new int[n + 1][m + 1];            // shifted by one
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n, m, s, t, dp);
    }

    private int f(int i, int j, String s, String t, int[][] dp) {
        if (i == 0 || j == 0) return 0;                // an empty prefix shares nothing
        if (dp[i][j] != -1) return dp[i][j];

        if (s.charAt(i - 1) == t.charAt(j - 1)) {      // note i-1 / j-1: the table is shifted
            return dp[i][j] = 1 + f(i - 1, j - 1, s, t, dp);
        }
        return dp[i][j] = Math.max(f(i - 1, j, s, t, dp),
                                   f(i, j - 1, s, t, dp));
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int lcs(String s, String t) {
        int n = s.length(), m = t.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int j = 0; j <= m; j++) dp[0][j] = 0;     // explicit, though Java zeroes for us
        for (int i = 0; i <= n; i++) dp[i][0] = 0;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[n][m];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(m) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int lcs(String s, String t) {
        int n = s.length(), m = t.length();

        int[] prev = new int[m + 1];                   // dp[i-1][*]

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];                // dp[i][*], cur[0] stays 0
            for (int j = 1; j <= m; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];          // diagonal -> previous row, previous col
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            prev = cur;
        }
        return prev[m];
    }
}`
      }</Code>

      <div className="callout callout-key">
        <div className="callout-title">🔑 Three reads, three different places</div>
        This is the clearest place in these notes to fix the rule: <code>prev[j-1]</code> is the{' '}
        <strong>diagonal</strong>, <code>prev[j]</code> is <strong>above</strong>, and <code>cur[j-1]</code> is{' '}
        <strong>left</strong>. Getting the diagonal from <code>cur[j-1]</code> is the classic slip and it produces
        answers that are too large, because <code>cur[j-1]</code> already contains a match from this same row.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(n·m)">All versions.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n·m)">
          Memoization adds an <code>O(n+m)</code> stack.
        </CxBox>
        <CxBox label="Space — optimized" value="O(m)">
          Two rows — loop over the longer string for the smaller one.
        </CxBox>
      </Cx>

      {/* 6.2 */}
      <div id="dp6-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Backtrack the table</span>
        <span className="pill pill-topic">Needs the full table</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return the longest common subsequence <em>itself</em>, not just its length.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Walk backwards from <code>dp[n][m]</code>
          </div>
          The table already records every decision; recovering the string is just replaying them in reverse. Start
          at <code>(n, m)</code> and at each step ask which rule produced that cell:
          <ol className="steps">
            <li>
              <code>s[i-1] == t[j-1]</code> → this character is in the LCS. Emit it and move{' '}
              <strong>diagonally</strong> to <code>(i-1, j-1)</code>.
            </li>
            <li>
              Otherwise the value came from the larger neighbour. If <code>dp[i-1][j] &gt; dp[i][j-1]</code> move{' '}
              <strong>up</strong>, else move <strong>left</strong>. (Ties can go either way; different choices give
              different equally-long answers.)
            </li>
            <li>
              Stop when <code>i == 0</code> or <code>j == 0</code>, then reverse what you emitted.
            </li>
          </ol>
          The walk touches at most <code>n + m</code> cells, so printing costs <code>O(n + m)</code> on top of the{' '}
          <code>O(nm)</code> table.
        </div>
        <div className="callout callout-na">
          <div className="callout-title">🚫 Why there is only one implementation here</div>
          <p>
            This problem has <strong>no memoized and no space-optimized form</strong>, and the reason is structural
            rather than a matter of effort:
          </p>
          <ul>
            <li>
              <strong>Space optimization is impossible.</strong> The backtracking walk can move up, left or
              diagonally from any cell, so it may visit any row of the table. Keeping two rows discards exactly the
              history the walk needs. <code>O(nm)</code> space is the price of reconstructing the answer — the
              length alone is what fits in <code>O(m)</code>.
            </li>
            <li>
              <strong>A memoized version buys nothing.</strong> Recursion could rebuild the string on the way back
              up, but the cache would then have to store a <code>String</code> per state, which is{' '}
              <code>O(nm · min(n,m))</code> memory and far worse than the table. The honest answer is to fill the
              table iteratively and walk it.
            </li>
          </ul>
          <p>
            This &quot;the optimum&apos;s <em>value</em> is cheap, the optimum <em>itself</em> needs the whole
            table&quot; split applies to every print-the-answer variant — see also Print the LIS (8.2) and the
            string rebuild in Shortest Common Supersequence (6.7).
          </p>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public String printLCS(String s, String t) {
        int n = s.length(), m = t.length();

        // ── part 1: the ordinary LCS table ──
        int[][] dp = new int[n + 1][m + 1];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // ── part 2: walk it backwards, writing the answer from the end ──
        int len = dp[n][m];
        char[] ans = new char[len];                    // fill right-to-left
        int index = len - 1;

        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (s.charAt(i - 1) == t.charAt(j - 1)) {
                ans[index] = s.charAt(i - 1);          // this char is in the LCS
                index--;
                i--;
                j--;                                   // diagonal
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;                                   // the value came from above
            } else {
                j--;                                   // the value came from the left
            }
        }
        return new String(ans);
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Writing into a pre-sized buffer beats reversing</div>
        The walk discovers the characters back-to-front. Allocating <code>new char[len]</code> — the length is
        already sitting in <code>dp[n][m]</code> — and filling it from <code>index = len - 1</code> downward avoids
        both a reversal and repeated string concatenation, which in Java would be <code>O(len²)</code> with{' '}
        <code>+=</code> on a <code>String</code>.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n·m)">
          The table dominates; the walk adds <code>O(n+m)</code>.
        </CxBox>
        <CxBox label="Space" value="O(n·m)">Irreducible — the walk needs every row.</CxBox>
      </Cx>

      {/* 6.3 */}
      <div id="dp6-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Contiguous, not subsequence</span>
        <span className="pill">Answer is a max over all cells</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return the length of the longest <strong>contiguous</strong> block appearing in
          both strings.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Two changes from LCS, and they go together</div>
          <ul>
            <li>
              <strong>A mismatch resets to <code>0</code>.</strong> In LCS a mismatch inherits the better neighbour,
              because a subsequence may skip characters. A substring may not — a mismatch breaks the run, so{' '}
              <code>dp[i][j] = 0</code>.
            </li>
            <li>
              <strong>The answer is not <code>dp[n][m]</code>.</strong> Now <code>dp[i][j]</code> means &quot;length
              of the common run <em>ending exactly</em> at <code>s[i-1]</code> and <code>t[j-1]</code>&quot;, so the
              best run can end anywhere. Track a running maximum over every cell.
            </li>
          </ul>
          Those two are one idea: because the cell&apos;s meaning changed from &quot;best so far&quot; to &quot;best
          ending here&quot;, the maximum has to be collected outside the recurrence — the same move as Maximum
          Falling Path Sum (3.6).
        </div>
        <div className="recurrence">{
`dp[i][j] = 0                                   if i == 0 or j == 0

if s[i-1] == t[j-1]:  dp[i][j] = 1 + dp[i-1][j-1]
else:                 dp[i][j] = 0             <-- the run is broken

answer = max over all i, j of dp[i][j]`
        }</div>
        <pre className="diagram">{
` s = "abcjklp"   t = "acjkp"      longest common substring = "cjk", length 3

        ""  a  c  j  k  p
    "" | 0  0  0  0  0  0
     a | 0  1  0  0  0  0
     b | 0  0  0  0  0  0
     c | 0  0  1  0  0  0
     j | 0  0  0  2  0  0
     k | 0  0  0  0  3  0     <-- max = 3, the run "cjk"
     l | 0  0  0  0  0  0
     p | 0  0  0  0  0  1

 compare with LCS, where mismatches would have copied values rightward and
 downward; here every mismatch is a hard zero, so runs appear as diagonals`
        }</pre>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestCommonSubstring(String s, String t) {
        int n = s.length(), m = t.length();
        int[][] dp = new int[n + 1][m + 1];
        for (int[] row : dp) Arrays.fill(row, -1);

        // The answer can end at ANY pair of positions, so the caller takes the max.
        int ans = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                ans = Math.max(ans, f(i, j, s, t, dp));
            }
        }
        return ans;
    }

    // f(i, j) = length of the common run ending exactly at s[i-1] and t[j-1]
    private int f(int i, int j, String s, String t, int[][] dp) {
        if (i == 0 || j == 0) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        if (s.charAt(i - 1) == t.charAt(j - 1)) {
            return dp[i][j] = 1 + f(i - 1, j - 1, s, t, dp);
        }
        return dp[i][j] = 0;                           // mismatch breaks the run
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Why the memoized form needs a driving loop</div>
        A single top-level call to <code>f(n, m)</code> would only measure the run ending at the very last characters
        of both strings — usually <code>0</code>. Because the recurrence&apos;s value is &quot;best <em>ending
        here</em>&quot;, the answer lives in the maximum over all states, so the caller must visit them all. That
        makes this memoized version no lazier than the table; it is written for symmetry with the rest of the
        document, and in practice the tabulated form below is what you would submit.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestCommonSubstring(String s, String t) {
        int n = s.length(), m = t.length();
        int[][] dp = new int[n + 1][m + 1];

        int ans = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                    ans = Math.max(ans, dp[i][j]);     // collect while filling
                } else {
                    dp[i][j] = 0;
                }
            }
        }
        return ans;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(m) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestCommonSubstring(String s, String t) {
        int n = s.length(), m = t.length();

        int[] prev = new int[m + 1];
        int ans = 0;

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            for (int j = 1; j <= m; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];          // diagonal only
                    ans = Math.max(ans, cur[j]);
                } else {
                    cur[j] = 0;
                }
            }
            prev = cur;
        }
        return ans;
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Only the diagonal is ever read</div>
        Unlike LCS, this recurrence reads <em>one</em> neighbour: <code>prev[j-1]</code>. That makes the row-reduced
        version simpler, and it also means a single array iterated with <code>j</code> descending would work. Two
        arrays are clearer, and the extra <code>O(m)</code> is free.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(n·m)">All versions.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n·m)">
          Memoization&apos;s stack is <code>O(min(n,m))</code> — runs only go diagonally.
        </CxBox>
        <CxBox label="Space — optimized" value="O(m)">Two rows.</CxBox>
      </Cx>

      {/* 6.4 */}
      <div id="dp6-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 516</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">LCS with its own reverse</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return the length of the longest subsequence of <code>s</code> that reads the
          same forwards and backwards.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 <code>LPS(s) = LCS(s, reverse(s))</code>
          </div>
          <p>
            A palindromic subsequence of <code>s</code> is exactly a subsequence that also appears in{' '}
            <code>reverse(s)</code> — reading it left-to-right in <code>s</code> and left-to-right in the reversed
            string gives the same characters. So the longest one is the LCS of the string with its own reverse, and{' '}
            <strong>no new DP is needed at all</strong>.
          </p>
          <p>
            Worth knowing why this does not over-count: a common subsequence of <code>s</code> and{' '}
            <code>reverse(s)</code> could in principle pair up different occurrences and fail to be a palindrome, but
            a standard argument shows the <em>longest</em> one can always be re-chosen to be symmetric, so the
            maximum is the same.
          </p>
        </div>
        <div className="recurrence">{
`answer = lcs(s, reverse(s))

time  = O(n^2)        space = O(n^2), or O(n) after row reduction`
        }</div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestPalindromeSubsequence(String s) {
        String r = new StringBuilder(s).reverse().toString();
        int n = s.length();

        int[][] dp = new int[n + 1][n + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n, n, s, r, dp);                      // LCS(s, reverse(s))
    }

    private int f(int i, int j, String s, String t, int[][] dp) {
        if (i == 0 || j == 0) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        if (s.charAt(i - 1) == t.charAt(j - 1)) {
            return dp[i][j] = 1 + f(i - 1, j - 1, s, t, dp);
        }
        return dp[i][j] = Math.max(f(i - 1, j, s, t, dp),
                                   f(i, j - 1, s, t, dp));
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestPalindromeSubsequence(String s) {
        String r = new StringBuilder(s).reverse().toString();
        int n = s.length();

        int[][] dp = new int[n + 1][n + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i - 1) == r.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[n][n];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(n) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestPalindromeSubsequence(String s) {
        String r = new StringBuilder(s).reverse().toString();
        int n = s.length();

        int[] prev = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[n + 1];
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i - 1) == r.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            prev = cur;
        }
        return prev[n];
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 The interval-DP alternative</div>
        There is a second, equally standard formulation: <code>g(i, j)</code> = LPS of the substring{' '}
        <code>s[i..j]</code>, with <code>g(i, j) = 2 + g(i+1, j-1)</code> on a match and{' '}
        <code>max(g(i+1, j), g(i, j-1))</code> otherwise. Same <code>O(n²)</code>, and it generalises to Palindrome
        Partitioning-style problems. The LCS reduction is preferred here because it reuses code you already have and
        is far harder to get wrong under time pressure.
      </div>

      {/* 6.5 */}
      <div id="dp6-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 1312</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">One line on top of 6.4</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Find the fewest characters that must be <strong>inserted anywhere</strong> in{' '}
          <code>s</code> to make it a palindrome.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Keep the longest palindrome you already have</div>
          <p>
            Insertions never remove anything, so whatever palindromic subsequence <code>s</code> already contains
            can be kept intact; every <em>other</em> character has to be matched by inserting its mirror image. So
            the answer is
          </p>
          <div className="recurrence">{`answer = n - LPS(s)        = n - lcs(s, reverse(s))`}</div>
          <p>
            The lower bound is easy to see (you must fix at least the <code>n - LPS</code> unmatched characters);
            achieving it is the constructive part — mirror each unmatched character around the retained palindrome.
          </p>
        </div>
        <pre className="diagram">{
` s = "abcaa"      n = 5

 reverse(s) = "aacba"
 LCS("abcaa", "aacba") = "aca"   ->  LPS = 3

 answer = 5 - 3 = 2

 check by construction: insert one 'a' at the front and one 'b' after the 'c'

    a a b c b a a          is a palindrome (reads the same both ways)
    . a b c . a a          and "abcaa" is still a subsequence of it

 two characters of "abcaa" sat outside the retained palindrome "aca",
 and each needed exactly one mirror inserted`
        }</pre>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minInsertions(String s) {
        int n = s.length();
        String r = new StringBuilder(s).reverse().toString();

        int[][] dp = new int[n + 1][n + 1];
        for (int[] row : dp) Arrays.fill(row, -1);

        int lps = f(n, n, s, r, dp);                   // LPS via LCS with the reverse
        return n - lps;                                // everything else must be inserted
    }

    private int f(int i, int j, String s, String t, int[][] dp) {
        if (i == 0 || j == 0) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        if (s.charAt(i - 1) == t.charAt(j - 1)) {
            return dp[i][j] = 1 + f(i - 1, j - 1, s, t, dp);
        }
        return dp[i][j] = Math.max(f(i - 1, j, s, t, dp),
                                   f(i, j - 1, s, t, dp));
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minInsertions(String s) {
        int n = s.length();
        String r = new StringBuilder(s).reverse().toString();

        int[][] dp = new int[n + 1][n + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i - 1) == r.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return n - dp[n][n];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(n) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int minInsertions(String s) {
        int n = s.length();
        String r = new StringBuilder(s).reverse().toString();

        int[] prev = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[n + 1];
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i - 1) == r.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            prev = cur;
        }
        return n - prev[n];
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The same number answers a different-sounding question</div>
        &quot;Minimum <strong>deletions</strong> to make a string palindromic&quot; has the identical answer,{' '}
        <code>n - LPS(s)</code>: instead of inserting mirrors for the unmatched characters you delete them. If an
        interviewer asks for deletions after you have solved insertions, the correct response is that it is the same
        quantity — not a new derivation.
      </div>

      {/* 6.6 */}
      <div id="dp6-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Two lines on top of LCS</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Using only <strong>insertions</strong> and <strong>deletions</strong>, turn
          string <code>a</code> (length <code>n</code>) into string <code>b</code> (length <code>m</code>). Return
          the minimum number of operations.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The common part survives; everything else moves</div>
          <p>
            Any sequence of insertions and deletions leaves some subsequence of <code>a</code> untouched, and that
            surviving part must also be a subsequence of <code>b</code>. To do the least work, keep the{' '}
            <em>largest</em> such part — the LCS. Then:
          </p>
          <div className="recurrence">{
`deletions  from a = n - LCS(a, b)          the characters of a not kept
insertions into b = m - LCS(a, b)          the characters of b still missing

answer = (n - LCS) + (m - LCS) = n + m - 2 * LCS(a, b)`
          }</div>
          Note that <strong>no substitution is allowed</strong> here — that is what separates this from Edit Distance
          (6.9), where one replace can do the work of a delete plus an insert.
        </div>
        <pre className="diagram">{
` a = "abcd"   b = "anc"        n = 4, m = 3

 LCS("abcd", "anc") = "ac"  ->  length 2

 deletions  from a: 4 - 2 = 2      remove 'b' and 'd'   -> "ac"
 insertions into it: 3 - 2 = 1     add 'n' between them -> "anc"

 answer = 4 + 3 - 2*2 = 3`
        }</pre>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int canYouMake(String a, String b) {
        int n = a.length(), m = b.length();

        int[][] dp = new int[n + 1][m + 1];
        for (int[] row : dp) Arrays.fill(row, -1);

        int lcs = f(n, m, a, b, dp);
        return (n - lcs) + (m - lcs);                  // deletions + insertions
    }

    private int f(int i, int j, String s, String t, int[][] dp) {
        if (i == 0 || j == 0) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        if (s.charAt(i - 1) == t.charAt(j - 1)) {
            return dp[i][j] = 1 + f(i - 1, j - 1, s, t, dp);
        }
        return dp[i][j] = Math.max(f(i - 1, j, s, t, dp),
                                   f(i, j - 1, s, t, dp));
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int canYouMake(String a, String b) {
        int n = a.length(), m = b.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        int lcs = dp[n][m];
        return n + m - 2 * lcs;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(m) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int canYouMake(String a, String b) {
        int n = a.length(), m = b.length();
        int[] prev = new int[m + 1];

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            for (int j = 1; j <= m; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            prev = cur;
        }
        return n + m - 2 * prev[m];
    }
}`
      }</Code>

      {/* 6.7 */}
      <div id="dp6-7" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 1092</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Length is easy, string needs the table</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return the shortest string that contains both <code>s</code> and <code>t</code>{' '}
          as subsequences.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Write both strings out, but share the LCS once</div>
          <p>
            Concatenating gives a supersequence of length <code>n + m</code>, which is wasteful: every character of
            the LCS was written twice and needs to appear only once. So
          </p>
          <div className="recurrence">{`length of SCS = n + m - LCS(s, t)`}</div>
          <p>
            Recovering the <em>string</em> is a backtrack over the LCS table, and it is slightly richer than Print
            LCS (6.2): at a match you emit the shared character once and move diagonally, and at a mismatch you emit
            the character you are <strong>stepping over</strong> — because a supersequence must keep it, even though
            the LCS discarded it.
          </p>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The two tails at the end of the walk</div>
          The backtrack stops when either index reaches <code>0</code>, but the other string may still have
          characters left. Those must be appended too — hence the two trailing <code>while</code> loops. Omitting
          them silently drops a prefix of whichever string is longer, and the result is no longer a supersequence of
          both.
        </div>
        <pre className="diagram">{
` s = "brute"   t = "groot"

 LCS("brute", "groot") = "rt"   ->  length 2
     ('o' is not in "brute", so only 'r' and 't' are shared)

 SCS length = 5 + 5 - 2 = 8

 walking the table backwards from (5,5), emitting right-to-left:
   s='e' vs t='t'  mismatch, step over s    -> e
   s='t' vs t='t'  MATCH, emit once         -> t
   s='u' vs t='o'  mismatch, step over t    -> o
   s='u' vs t='o'  mismatch, step over t    -> o
   s='u' vs t='r'  mismatch, step over s    -> u
   s='r' vs t='r'  MATCH, emit once         -> r
   s='b' vs t='g'  mismatch, step over t    -> g
   j hit 0; drain the tail of s             -> b

 reversed:  b g r u o o t e         length 8

 check:  "brute" = b . r u . . t e      both are subsequences
         "groot" = . g r . o o t .`
        }</pre>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    // Returns the LENGTH of the shortest common supersequence.
    public int shortestSupersequenceLength(String s, String t) {
        int n = s.length(), m = t.length();

        int[][] dp = new int[n + 1][m + 1];
        for (int[] row : dp) Arrays.fill(row, -1);

        int lcs = f(n, m, s, t, dp);
        return n + m - lcs;                            // shared characters written once
    }

    private int f(int i, int j, String s, String t, int[][] dp) {
        if (i == 0 || j == 0) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        if (s.charAt(i - 1) == t.charAt(j - 1)) {
            return dp[i][j] = 1 + f(i - 1, j - 1, s, t, dp);
        }
        return dp[i][j] = Math.max(f(i - 1, j, s, t, dp),
                                   f(i, j - 1, s, t, dp));
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int shortestSupersequenceLength(String s, String t) {
        int n = s.length(), m = t.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return n + m - dp[n][m];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(m) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int shortestSupersequenceLength(String s, String t) {
        int n = s.length(), m = t.length();
        int[] prev = new int[m + 1];

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            for (int j = 1; j <= m; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            prev = cur;
        }
        return n + m - prev[m];
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Building the string itself</h3></div>
      <div className="card">
        <div className="callout callout-na">
          <div className="callout-title">🚫 Why the string has only one implementation</div>
          The three approaches above all return the <strong>length</strong>, and all three are available because the
          length depends only on <code>dp[n][m]</code>. Returning the <strong>string</strong> requires walking the
          table from <code>(n, m)</code> back to the origin, and that walk can enter any row — so the{' '}
          <code>O(nm)</code> table cannot be reduced to two rows, and a memoized version would have to cache a{' '}
          <code>String</code> per state. Same structural limit as Print the LCS (6.2): the value is cheap, the
          witness is not.
        </div>
      </div>
      <Code>{
`class Solution {
    public String shortestSupersequence(String s, String t) {
        int n = s.length(), m = t.length();

        // ── the LCS table ──
        int[][] dp = new int[n + 1][m + 1];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // ── walk it backwards, keeping every character of both strings ──
        StringBuilder sb = new StringBuilder();
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (s.charAt(i - 1) == t.charAt(j - 1)) {
                sb.append(s.charAt(i - 1));            // shared: emit once
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                sb.append(s.charAt(i - 1));            // stepping over s: keep it anyway
                i--;
            } else {
                sb.append(t.charAt(j - 1));            // stepping over t: keep it anyway
                j--;
            }
        }

        while (i > 0) { sb.append(s.charAt(i - 1)); i--; }   // leftover tail of s
        while (j > 0) { sb.append(t.charAt(j - 1)); j--; }   // leftover tail of t

        return sb.reverse().toString();                // built back-to-front
    }
}`
      }</Code>

      <Cx three>
        <CxBox label="Time" value="O(n·m)">
          All four; the walk adds <code>O(n+m)</code>.
        </CxBox>
        <CxBox label="Space — length only" value="O(m)">Row-reduced.</CxBox>
        <CxBox label="Space — the string" value="O(n·m)">Irreducible: the walk needs every row.</CxBox>
      </Cx>

      {/* 6.8 */}
      <div id="dp6-8" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 115</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Counting, not optimising</span>
        <span className="pill">Overflow risk</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Count how many distinct subsequences of <code>s</code> equal <code>t</code>.
          Answer modulo <code>10^9 + 7</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 On a match you must count both branches</div>
          <p>
            This is where the LCS instinct misleads. In LCS, a match is always taken and you move on. Here, a match
            gives <strong>two</strong> distinct families of subsequences, and both must be counted:
          </p>
          <ul>
            <li>
              <strong>Use <code>s[i-1]</code> to cover <code>t[j-1]</code>:</strong> recurse on{' '}
              <code>(i-1, j-1)</code>.
            </li>
            <li>
              <strong>Skip <code>s[i-1]</code> anyway</strong> and match <code>t[j-1]</code> with an earlier
              occurrence: recurse on <code>(i-1, j)</code>.
            </li>
          </ul>
          Those are disjoint (they differ in whether position <code>i-1</code> is used), so the counts add. On a
          mismatch only the skip is available.
        </div>
        <div className="recurrence">{
`base  j == 0:  1        t is fully matched -- one way (the empty tail)
base  i == 0:  0        s exhausted but t is not -- impossible
      (test j == 0 FIRST: when both are 0 the answer is 1, not 0)

if s[i-1] == t[j-1]:  f(i, j) = f(i-1, j-1) + f(i-1, j)
else:                 f(i, j) = f(i-1, j)

answer = f(n, m)`
        }</div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Base-case order, and the overflow to watch</div>
          <p>
            <strong>Order.</strong> <code>j == 0</code> must be checked before <code>i == 0</code>. At{' '}
            <code>(0, 0)</code> both hold, and the right answer is <code>1</code> — the empty string contains the
            empty string exactly once. Checking <code>i == 0</code> first returns <code>0</code> and zeroes the whole
            table.
          </p>
          <p>
            <strong>Overflow.</strong> The count grows combinatorially and overflows a 32-bit <code>int</code> on
            adversarial inputs. Use <code>int</code> arithmetic with <code>% (10^9 + 7)</code> as the Coding Ninjas
            version asks for, or <code>long</code> if the problem wants the exact value. A <code>double</code> table
            works on typical judge data but silently loses precision past <code>2^53</code> — not something to
            reproduce.
          </p>
        </div>
        <pre className="diagram">{
` s = "babgbag"   t = "bag"        answer = 5

     s =  b  a  b  g  b  a  g
 index =  0  1  2  3  4  5  6

 'b' at {0, 2, 4},   'a' at {1, 5},   'g' at {3, 6}
 a valid pick needs indices in increasing order:

   b(0)  a(1)  g(3)
   b(0)  a(1)  g(6)
   b(0)  a(5)  g(6)
   b(2)  a(5)  g(6)
   b(4)  a(5)  g(6)
                          -> 5 distinct subsequences

 note b(2) with a(1) is not valid -- the 'a' must come after the 'b'`
        }</pre>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int numDistinct(String s, String t) {
        int n = s.length(), m = t.length();
        int[][] dp = new int[n + 1][m + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n, m, s, t, dp);
    }

    private int f(int i, int j, String s, String t, int[][] dp) {
        if (j == 0) return 1;                          // t matched in full -- tested FIRST
        if (i == 0) return 0;                          // s exhausted, t is not
        if (dp[i][j] != -1) return dp[i][j];

        if (s.charAt(i - 1) == t.charAt(j - 1)) {
            int use  = f(i - 1, j - 1, s, t, dp);      // consume this character
            int skip = f(i - 1, j, s, t, dp);          // ignore it and look further left
            return dp[i][j] = (use + skip) % MOD;
        }
        return dp[i][j] = f(i - 1, j, s, t, dp);       // mismatch: only skip
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int numDistinct(String s, String t) {
        int n = s.length(), m = t.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) dp[i][0] = 1;     // t empty: exactly one way
        // dp[0][j] for j >= 1 stays 0: s empty cannot cover a non-empty t

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % MOD;
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }
        return dp[n][m];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(m) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final int MOD = (int) 1e9 + 7;

    public int numDistinct(String s, String t) {
        int n = s.length(), m = t.length();

        int[] prev = new int[m + 1];
        prev[0] = 1;                                   // the empty-t column

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            cur[0] = 1;                                // re-seed: Java gives a fresh zeroed array
            for (int j = 1; j <= m; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    cur[j] = (prev[j - 1] + prev[j]) % MOD;
                } else {
                    cur[j] = prev[j];
                }
            }
            prev = cur;
        }
        return prev[m];
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The single-array form, iterated right to left</div>
        Both reads come from the previous row, at <code>j</code> and <code>j-1</code>, so one array works when{' '}
        <code>j</code> runs <strong>downward</strong>: <code>dp[j] = (dp[j] + dp[j-1]) % MOD</code> on a match and
        nothing on a mismatch. The descending direction keeps <code>dp[j-1]</code> as the previous row&apos;s value —
        identical reasoning to 0/1 knapsack in 5.1.
      </div>

      {/* 6.9 */}
      <div id="dp6-9" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 72</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Insert / delete / replace</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Minimum number of operations to turn <code>str1</code> into <code>str2</code>,
          where an operation is <strong>insert</strong>, <strong>delete</strong> or <strong>replace</strong> a single
          character.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Three operations, three recursive calls</div>
          <p>
            On a match, nothing to pay: move both indices. On a mismatch, pay <code>1</code> and try each operation.
            The trick is reading which index each operation moves:
          </p>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Operation</th><th>Recursive call</th><th>Why</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong>Insert</strong> into <code>str1</code></td>
                  <td><code>f(i, j-1)</code></td>
                  <td>
                    The inserted character covers <code>str2[j-1]</code>; <code>str1</code> is untouched.
                  </td>
                </tr>
                <tr>
                  <td><strong>Delete</strong> from <code>str1</code></td>
                  <td><code>f(i-1, j)</code></td>
                  <td>
                    <code>str1[i-1]</code> is discarded; <code>str2</code> still needs <code>j</code> characters.
                  </td>
                </tr>
                <tr>
                  <td><strong>Replace</strong></td>
                  <td><code>f(i-1, j-1)</code></td>
                  <td>The two characters are now equal, so both advance.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="recurrence">{
`base  i == 0:  j        str1 empty -> insert all j remaining characters
base  j == 0:  i        str2 empty -> delete all i remaining characters

if str1[i-1] == str2[j-1]:  f(i, j) = f(i-1, j-1)          free
else:                       f(i, j) = 1 + min( f(i, j-1),      insert
                                               f(i-1, j),      delete
                                               f(i-1, j-1) )   replace

answer = f(n, m)`
        }</div>
        <div className="callout callout-note">
          <div className="callout-title">📌 The base cases are not zero</div>
          Unlike LCS, the empty-prefix rows carry real costs: <code>dp[0][j] = j</code> and{' '}
          <code>dp[i][0] = i</code>. Leaving them at <code>0</code> is the standard mistake and produces answers that
          are too small, because it pretends that turning <code>&quot;&quot;</code> into <code>&quot;abc&quot;</code>{' '}
          is free. In a 0-based recursion the same thing appears as <code>if (i &lt; 0) return j + 1;</code> and{' '}
          <code>if (j &lt; 0) return i + 1;</code>.
        </div>
        <pre className="diagram">{
` str1 = "horse"   str2 = "ros"      answer = 3

        ""  r  o  s
    "" | 0  1  2  3
     h | 1  1  2  3
     o | 2  2  1  2
     r | 3  2  2  2
     s | 4  3  3  2
     e | 5  4  4  3      <-- answer

 the route: replace 'h' -> 'r',  delete 'r',  delete 'e'      = 3 operations
 (horse -> rorse -> rose -> ros)`
        }</pre>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int editDistance(String str1, String str2) {
        int n = str1.length(), m = str2.length();
        int[][] dp = new int[n + 1][m + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n, m, str1, str2, dp);
    }

    private int f(int i, int j, String s1, String s2, int[][] dp) {
        if (i == 0) return j;                          // insert the rest of s2
        if (j == 0) return i;                          // delete the rest of s1
        if (dp[i][j] != -1) return dp[i][j];

        if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
            return dp[i][j] = f(i - 1, j - 1, s1, s2, dp);   // free, no operation
        }

        int insert  = f(i, j - 1, s1, s2, dp);
        int delete  = f(i - 1, j, s1, s2, dp);
        int replace = f(i - 1, j - 1, s1, s2, dp);

        return dp[i][j] = 1 + Math.min(insert, Math.min(delete, replace));
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int editDistance(String str1, String str2) {
        int n = str1.length(), m = str2.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 0; i <= n; i++) dp[i][0] = i;     // delete i characters
        for (int j = 0; j <= m; j++) dp[0][j] = j;     // insert j characters

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    int insert  = dp[i][j - 1];
                    int delete  = dp[i - 1][j];
                    int replace = dp[i - 1][j - 1];
                    dp[i][j] = 1 + Math.min(insert, Math.min(delete, replace));
                }
            }
        }
        return dp[n][m];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(m) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int editDistance(String str1, String str2) {
        int n = str1.length(), m = str2.length();

        int[] prev = new int[m + 1];
        for (int j = 0; j <= m; j++) prev[j] = j;      // the dp[0][*] row

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            cur[0] = i;                                // the dp[i][0] column -- must be re-seeded

            for (int j = 1; j <= m; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    cur[j] = prev[j - 1];              // diagonal
                } else {
                    int insert  = cur[j - 1];          // left, current row
                    int delete  = prev[j];             // above
                    int replace = prev[j - 1];         // diagonal
                    cur[j] = 1 + Math.min(insert, Math.min(delete, replace));
                }
            }
            prev = cur;
        }
        return prev[m];
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ <code>cur[0] = i</code> is the line people forget
        </div>
        In the full table, column <code>0</code> holds <code>i</code> — the cost of deleting everything. A freshly
        allocated <code>cur</code> starts at <code>0</code>, so without this re-seed the row believes that emptying a
        prefix of <code>str1</code> is free, and every distance that routes through column <code>0</code> comes back
        too small. The same re-seeding care appears in Distinct Subsequences (6.8), where the constant is{' '}
        <code>1</code> rather than <code>i</code>.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(n·m)">Three candidates per cell, still constant work.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n·m)">
          Plus an <code>O(n+m)</code> stack when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(m)">Two rows.</CxBox>
      </Cx>

      {/* 6.10 */}
      <div id="dp6-10" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 44</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Feasibility DP</span>
        <span className="pill">The all-stars base case</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Does <code>pattern</code> match <code>text</code>? <code>&apos;?&apos;</code>{' '}
          matches exactly one character; <code>&apos;*&apos;</code> matches any sequence of characters, including the
          empty one.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 <code>&apos;*&apos;</code> is &quot;consume nothing&quot; OR &quot;consume one more&quot;
          </div>
          <p>The star is the only interesting case, and the standard formulation gives it two branches:</p>
          <ul>
            <li>
              <strong><code>f(i-1, j)</code></strong> — the star matches the empty string; move past it in the
              pattern.
            </li>
            <li>
              <strong><code>f(i, j-1)</code></strong> — the star swallows <code>text[j-1]</code> and stays available
              to swallow more.
            </li>
          </ul>
          Those two cover every possible length the star could absorb, without a loop, which is what keeps this{' '}
          <code>O(nm)</code> instead of <code>O(nm²)</code>.
        </div>
        <div className="recurrence">{
`base  i == 0 and j == 0:  true         both exhausted
base  i == 0 and j > 0:   false        pattern used up, text remains
base  j == 0 and i > 0:   pattern[0..i-1] must be ALL stars

if pattern[i-1] == text[j-1] or pattern[i-1] == '?':
        f(i, j) = f(i-1, j-1)
if pattern[i-1] == '*':
        f(i, j) = f(i-1, j)  ||  f(i, j-1)
otherwise:
        f(i, j) = false

answer = f(n, m)`
        }</div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ The <code>j == 0</code> base case is the one that is always wrong first
          </div>
          When the text is exhausted but the pattern is not, the match survives only if every remaining pattern
          character is a <code>&apos;*&apos;</code> — <code>&quot;a*&quot;</code> against <code>&quot;&quot;</code>{' '}
          fails, <code>&quot;**&quot;</code> against <code>&quot;&quot;</code> succeeds. Returning a flat{' '}
          <code>false</code> breaks every trailing-star case; returning <code>true</code> matches far too much. In
          the tabulated version this becomes the initialisation of column <code>0</code>:{' '}
          <code>dp[i][0] = dp[i-1][0] &amp;&amp; pattern.charAt(i-1) == &apos;*&apos;</code>.
        </div>
        <pre className="diagram">{
` pattern = "ab*cd"   text = "abdefcd"        -> true

 walk:  a  matches a
        b  matches b
        *  swallows "def"     (via repeated f(i, j-1))
        c  matches c
        d  matches d

 pattern = "ab*cd"   text = "abcdx"          -> false
        the tail 'x' has no pattern character left to match it`
        }</pre>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public boolean wildcardMatching(String pattern, String text) {
        int n = pattern.length(), m = text.length();
        int[][] dp = new int[n + 1][m + 1];            // -1 unknown, 0 false, 1 true
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(n, m, pattern, text, dp);
    }

    private boolean f(int i, int j, String p, String t, int[][] dp) {
        if (i == 0 && j == 0) return true;             // both exhausted
        if (i == 0) return false;                      // pattern used up, text remains
        if (j == 0) {                                  // text used up: only stars may remain
            for (int ii = 1; ii <= i; ii++) {
                if (p.charAt(ii - 1) != '*') return false;
            }
            return true;
        }
        if (dp[i][j] != -1) return dp[i][j] == 1;

        boolean ans;
        char pc = p.charAt(i - 1);
        if (pc == t.charAt(j - 1) || pc == '?') {
            ans = f(i - 1, j - 1, p, t, dp);           // one character consumed on each side
        } else if (pc == '*') {
            ans = f(i - 1, j, p, t, dp)                // star matches the empty string
               || f(i, j - 1, p, t, dp);               // star swallows text[j-1]
        } else {
            ans = false;                               // a hard mismatch
        }

        dp[i][j] = ans ? 1 : 0;
        return ans;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public boolean wildcardMatching(String pattern, String text) {
        int n = pattern.length(), m = text.length();
        boolean[][] dp = new boolean[n + 1][m + 1];

        dp[0][0] = true;                               // empty pattern, empty text
        for (int j = 1; j <= m; j++) dp[0][j] = false;  // empty pattern cannot match text

        for (int i = 1; i <= n; i++) {                 // the all-stars column
            dp[i][0] = dp[i - 1][0] && pattern.charAt(i - 1) == '*';
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                char pc = pattern.charAt(i - 1);
                if (pc == text.charAt(j - 1) || pc == '?') {
                    dp[i][j] = dp[i - 1][j - 1];
                } else if (pc == '*') {
                    dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
                } else {
                    dp[i][j] = false;
                }
            }
        }
        return dp[n][m];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(m) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public boolean wildcardMatching(String pattern, String text) {
        int n = pattern.length(), m = text.length();

        boolean[] prev = new boolean[m + 1];
        prev[0] = true;                                // dp[0][0]; the rest of row 0 is false

        boolean allStars = true;                       // tracks the dp[i][0] column

        for (int i = 1; i <= n; i++) {
            boolean[] cur = new boolean[m + 1];

            allStars = allStars && pattern.charAt(i - 1) == '*';
            cur[0] = allStars;                         // re-seed column 0 for this row

            for (int j = 1; j <= m; j++) {
                char pc = pattern.charAt(i - 1);
                if (pc == text.charAt(j - 1) || pc == '?') {
                    cur[j] = prev[j - 1];              // diagonal
                } else if (pc == '*') {
                    cur[j] = prev[j] || cur[j - 1];    // above, or left
                } else {
                    cur[j] = false;
                }
            }
            prev = cur;
        }
        return prev[m];
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Carrying the column as a single boolean</div>
        Column <code>0</code> is &quot;every pattern character so far was a star&quot;, which is a running
        conjunction — so it needs one <code>boolean</code>, not an array. Folding it into the row loop as{' '}
        <code>allStars</code> keeps the row-reduced version honest: the only state carried between rows is{' '}
        <code>prev</code> plus that flag.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(n·m)">
          The memoized version&apos;s <code>j == 0</code> scan adds <code>O(n)</code> once.
        </CxBox>
        <CxBox label="Space — memo / tab" value="O(n·m)">
          Plus an <code>O(n+m)</code> stack when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(m)">Two rows and one flag.</CxBox>
      </Cx>

      {/* 7.1 */}
      <div id="dp7-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        One family, six variants. The state is always &quot;which day am I on, and what am I holding?&quot; —{' '}
        <code>(ind, buy)</code> — with extra dimensions bolted on for a transaction cap, a cooldown or a fee. Learn
        the two-line <code>buy</code> / <code>sell</code> body once and all six follow.
      </p>
      <div className="card">
        <div className="callout callout-key">
          <div className="callout-title">🔑 The core body, and how to read the signs</div>
          <div className="recurrence">{
`f(ind, buy):  best profit obtainable from day ind onward

buy == 1 (allowed to buy, holding nothing):
    profit = max( -prices[ind] + f(ind+1, 0),      buy today: PAY, now holding
                   0          + f(ind+1, 1) )      skip today, still allowed to buy

buy == 0 (holding a share):
    profit = max( +prices[ind] + f(ind+1, 1),      sell today: RECEIVE, free again
                   0          + f(ind+1, 0) )      hold, still holding

base  ind == n:  0        the market closed; nothing more to earn`
          }</div>
          <p>
            <strong>The sign carries the direction of money</strong>: buying is <code>-prices[ind]</code>, selling is{' '}
            <code>+prices[ind]</code>, and because every buy is eventually paired with a sell the sum telescopes into
            the profit. That is why no &quot;bought-at&quot; price needs to live in the state — a frequent and fatal
            instinct, since adding it would blow the state space up to <code>O(n × maxPrice)</code>.
          </p>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ These recursions run <em>forwards</em>, so tabulation runs backwards
          </div>
          Every recurrence in this part calls <code>f(ind+1, ...)</code>, so the table must be filled from{' '}
          <code>ind = n-1</code> down to <code>0</code>, and the answer sits at <code>dp[0][1]</code> rather than at
          the far corner. Tables are also declared with one extra row (<code>[n+1][2]</code>, or{' '}
          <code>[n+2][2]</code> for the cooldown variant) so the <code>ind == n</code> base row exists and reads as
          zero.
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Problem</th><th>Transactions</th><th>State</th><th>Extra rule</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>7.1 Buy and Sell Stock</td><td>1</td>
                <td><code>(ind, buy)</code></td><td>After selling, stop</td>
              </tr>
              <tr>
                <td>7.2 Buy and Sell Stocks II</td><td>Unlimited</td>
                <td><code>(ind, buy)</code></td><td>—</td>
              </tr>
              <tr>
                <td>7.3 Buy and Sell Stocks III</td><td>At most 2</td>
                <td><code>(ind, buy, cap)</code></td><td><code>cap</code> drops on each sell</td>
              </tr>
              <tr>
                <td>7.4 Buy and Sell Stocks IV</td><td>At most <code>k</code></td>
                <td><code>(ind, tranNo)</code></td><td><code>2k</code> half-transactions</td>
              </tr>
              <tr>
                <td>7.5 With Cooldown</td><td>Unlimited</td>
                <td><code>(ind, buy)</code></td><td>Sell jumps to <code>ind+2</code></td>
              </tr>
              <tr>
                <td>7.6 With Transaction Fee</td><td>Unlimited</td>
                <td><code>(ind, buy)</code></td><td><code>-fee</code> on each buy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="meta-row">
        <span className="pill">LeetCode 121</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Exactly one transaction</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Buy on one day and sell on a <strong>later</strong> day, at most once. Maximise
          the profit; return <code>0</code> if no profitable trade exists.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 &quot;At most one transaction&quot; is expressed by returning 0 after the sell
          </div>
          The single-transaction cap needs no <code>cap</code> dimension. In the <code>buy == 0</code> branch,
          selling contributes <code>prices[ind] + 0</code> instead of <code>prices[ind] + f(ind+1, 1)</code> — the{' '}
          <code>0</code> says &quot;and then the game is over&quot;. That one substitution is the whole difference
          from Stocks II (7.2), where the same slot recurses and thereby permits another round.
        </div>
        <div className="recurrence">{
`buy == 1:  max( -prices[ind] + f(ind+1, 0),   0 + f(ind+1, 1) )
buy == 0:  max(  prices[ind] + 0,            0 + f(ind+1, 0) )
                                ^^^ no further trading after the sell

answer = f(0, 1)`
        }</div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumProfit(int[] prices) {
        int n = prices.length;
        int[][] dp = new int[n][2];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(0, 1, prices, n, dp);
    }

    private int f(int ind, int buy, int[] prices, int n, int[][] dp) {
        if (ind == n) return 0;                        // market closed
        if (dp[ind][buy] != -1) return dp[ind][buy];

        int profit;
        if (buy == 1) {
            profit = Math.max(-prices[ind] + f(ind + 1, 0, prices, n, dp),   // buy today
                               0           + f(ind + 1, 1, prices, n, dp));  // skip
        } else {
            profit = Math.max( prices[ind] + 0,                              // sell and STOP
                               0           + f(ind + 1, 0, prices, n, dp));  // keep holding
        }
        return dp[ind][buy] = profit;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumProfit(int[] prices) {
        int n = prices.length;
        int[][] dp = new int[n + 1][2];                // row n is the all-zero base

        for (int ind = n - 1; ind >= 0; ind--) {       // BACKWARD: ind depends on ind+1
            dp[ind][1] = Math.max(-prices[ind] + dp[ind + 1][0],
                                   0           + dp[ind + 1][1]);
            dp[ind][0] = Math.max( prices[ind] + 0,
                                   0           + dp[ind + 1][0]);
        }
        return dp[0][1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(1) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumProfit(int[] prices) {
        int n = prices.length;

        int aheadBuy = 0, aheadNotBuy = 0;             // dp[ind+1][1] and dp[ind+1][0]

        for (int ind = n - 1; ind >= 0; ind--) {
            int curBuy    = Math.max(-prices[ind] + aheadNotBuy, aheadBuy);
            int curNotBuy = Math.max( prices[ind],               aheadNotBuy);

            aheadBuy    = curBuy;                      // slide the window one day earlier
            aheadNotBuy = curNotBuy;
        }
        return aheadBuy;                               // == dp[0][1]
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — The one-pass scan</h3></div>
      <div className="card">
        <p>
          Because only one transaction is allowed, the answer is simply the largest{' '}
          <code>prices[i] - min(prices[0..i])</code>. Sweeping left to right while remembering the cheapest price
          seen so far computes it directly, and this is the version to submit — the DP above exists to place the
          problem in the family, not because it is needed here.
        </p>
      </div>
      <Code>{
`class Solution {
    public int maximumProfit(int[] prices) {
        int mini = prices[0];                          // cheapest day seen so far
        int maxProfit = 0;
        int n = prices.length;

        for (int i = 1; i < n; i++) {
            int cost = prices[i] - mini;               // sell today, having bought at the min
            maxProfit = Math.max(maxProfit, cost);
            mini = Math.min(mini, prices[i]);          // update AFTER, so buy precedes sell
        }
        return maxProfit;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ Update <code>mini</code> after computing the profit
        </div>
        If <code>mini</code> is refreshed before <code>cost</code> is taken, a single day could serve as both the buy
        and the sell, yielding <code>0</code> where a real profit existed — or, worse, hiding the requirement that
        the sale comes strictly later. The order of those two lines is the entire correctness argument of the scan.
      </div>

      <Cx three>
        <CxBox label="Time" value="O(n)">All four versions.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n)">
          Two columns per day; memoization adds an <code>O(n)</code> stack.
        </CxBox>
        <CxBox label="Space — optimized" value="O(1)">Two scalars, or one in the scan.</CxBox>
      </Cx>

      {/* 7.2 */}
      <div id="dp7-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 122</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Unlimited transactions</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> As many buy/sell pairs as you like, but you may hold at most one share at a time
          (you must sell before buying again). Maximise the total profit.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 One character changes from 7.1</div>
          The sell branch becomes <code>prices[ind] + f(ind+1, 1)</code>: after selling you are free to buy again, so
          the recursion continues with <code>buy = 1</code> instead of stopping at <code>0</code>. That is the entire
          difference between &quot;at most one transaction&quot; and &quot;unlimited&quot;, and it is worth seeing
          how little the code moves.
        </div>
        <div className="recurrence">{
`buy == 1:  max( -values[ind] + f(ind+1, 0),   0 + f(ind+1, 1) )
buy == 0:  max(  values[ind] + f(ind+1, 1),   0 + f(ind+1, 0) )
                                ^^^^^^^^^^^ free to trade again

answer = f(0, 1)`
        }</div>
        <div className="callout callout-note">
          <div className="callout-title">📌 Why the greedy also works here (and not in 7.3)</div>
          With no cap, summing every positive daily difference — <code>Σ max(0, prices[i] - prices[i-1])</code> —
          gives the same answer, because any profitable multi-day rise can be decomposed into consecutive one-day
          trades. That decomposition argument fails the moment transactions are limited, which is why 7.3 and 7.4
          have no greedy form.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public long getMaximumProfit(long[] values, int n) {
        long[][] dp = new long[n][2];
        for (long[] row : dp) Arrays.fill(row, -1L);
        return f(0, 1, values, n, dp);
    }

    private long f(int ind, int buy, long[] values, int n, long[][] dp) {
        if (ind == n) return 0;
        if (dp[ind][buy] != -1) return dp[ind][buy];

        long profit;
        if (buy == 1) {
            profit = Math.max(-values[ind] + f(ind + 1, 0, values, n, dp),
                               0           + f(ind + 1, 1, values, n, dp));
        } else {
            profit = Math.max( values[ind] + f(ind + 1, 1, values, n, dp),   // sell, then free
                               0           + f(ind + 1, 0, values, n, dp));
        }
        return dp[ind][buy] = profit;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ <code>-1</code> as the cache marker is unsafe in general
        </div>
        Profits here are non-negative (doing nothing earns <code>0</code>), so <code>-1</code> can never be a real
        answer and the marker is sound. But notice how narrow that is: if the problem charged a mandatory fee, or
        asked for a signed quantity, <code>-1</code> would be attainable and the cache would return it as &quot;not
        computed&quot;, recomputing forever. Use <code>long[][]</code> when the signature says <code>long</code> —
        an <code>int</code> table truncates large profits.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public long getMaximumProfit(long[] values, int n) {
        long[][] dp = new long[n + 1][2];              // row n is the base, all zeros

        for (int ind = n - 1; ind >= 0; ind--) {
            dp[ind][1] = Math.max(-values[ind] + dp[ind + 1][0],
                                   0           + dp[ind + 1][1]);
            dp[ind][0] = Math.max( values[ind] + dp[ind + 1][1],
                                   0           + dp[ind + 1][0]);
        }
        return dp[0][1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(1) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public long getMaximumProfit(long[] values, int n) {
        long aheadBuy = 0, aheadNotBuy = 0;            // dp[ind+1][1], dp[ind+1][0]

        for (int ind = n - 1; ind >= 0; ind--) {
            long curBuy    = Math.max(-values[ind] + aheadNotBuy, aheadBuy);
            long curNotBuy = Math.max( values[ind] + aheadBuy,    aheadNotBuy);

            aheadBuy    = curBuy;
            aheadNotBuy = curNotBuy;
        }
        return aheadBuy;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ Compute both <code>cur</code> values before assigning either
        </div>
        <code>curNotBuy</code> reads <code>aheadBuy</code>, so overwriting <code>aheadBuy</code> first would feed it
        today&apos;s value instead of tomorrow&apos;s — the same ordering hazard as the two-scalar Fibonacci in 2.1,
        but here it is easy to miss because the two lines look independent. Keep both <code>cur</code> locals, then
        slide.
      </div>

      {/* 7.3 */}
      <div id="dp7-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 123</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">At most 2 transactions</span>
        <span className="pill">3D DP</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> At most <strong>two</strong> complete transactions. Maximise the profit.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 A third dimension for the remaining cap</div>
          Add <code>cap ∈ {'{0, 1, 2}'}</code> — how many transactions are still available. The decrement goes on
          the <strong>sell</strong>, since a transaction is only complete once the share is sold, and the extra base
          case is <code>cap == 0 → 0</code>: out of transactions, nothing more to earn. State count is{' '}
          <code>n × 2 × 3</code>, so still linear in <code>n</code>.
        </div>
        <div className="recurrence">{
`base  ind == n  or  cap == 0:   0

buy == 1:  max( -prices[ind] + f(ind+1, 0, cap),   0 + f(ind+1, 1, cap) )
buy == 0:  max(  prices[ind] + f(ind+1, 1, cap-1), 0 + f(ind+1, 0, cap) )
                                            ^^^^^ the transaction completes here

answer = f(0, 1, 2)`
        }</div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Decrement on the sell, not on the buy</div>
          Both conventions can be made to work, but they need different base cases and different starting caps, and
          mixing them is the standard way to get an off-by-one that allows three transactions or only one. Pick
          &quot;cap drops when the sale completes&quot; and keep it consistent across all three implementations.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maxProfit(int[] prices, int n) {
        int[][][] dp = new int[n][2][3];               // cap = 0, 1 or 2
        for (int[][] plane : dp)
            for (int[] row : plane) Arrays.fill(row, -1);

        return f(0, 1, 2, prices, n, dp);
    }

    private int f(int ind, int buy, int cap, int[] prices, int n, int[][][] dp) {
        if (ind == n || cap == 0) return 0;            // out of days, or out of transactions
        if (dp[ind][buy][cap] != -1) return dp[ind][buy][cap];

        int profit;
        if (buy == 1) {
            profit = Math.max(-prices[ind] + f(ind + 1, 0, cap, prices, n, dp),
                               0           + f(ind + 1, 1, cap, prices, n, dp));
        } else {
            profit = Math.max( prices[ind] + f(ind + 1, 1, cap - 1, prices, n, dp),  // cap--
                               0           + f(ind + 1, 0, cap,     prices, n, dp));
        }
        return dp[ind][buy][cap] = profit;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maxProfit(int[] prices, int n) {
        // dp[ind][buy][cap]; row n and cap 0 stay zero, which IS the base case.
        int[][][] dp = new int[n + 1][2][3];

        for (int ind = n - 1; ind >= 0; ind--) {
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= 2; cap++) {   // cap == 0 is left at 0
                    if (buy == 1) {
                        dp[ind][buy][cap] = Math.max(-prices[ind] + dp[ind + 1][0][cap],
                                                      0           + dp[ind + 1][1][cap]);
                    } else {
                        dp[ind][buy][cap] = Math.max( prices[ind] + dp[ind + 1][1][cap - 1],
                                                      0           + dp[ind + 1][0][cap]);
                    }
                }
            }
        }
        return dp[0][1][2];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(1) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maxProfit(int[] prices, int n) {
        // Only tomorrow's plane is ever read, and it is 2 x 3 = 6 cells -> O(1).
        int[][] ahead = new int[2][3];

        for (int ind = n - 1; ind >= 0; ind--) {
            int[][] cur = new int[2][3];
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= 2; cap++) {
                    if (buy == 1) {
                        cur[buy][cap] = Math.max(-prices[ind] + ahead[0][cap],
                                                  0           + ahead[1][cap]);
                    } else {
                        cur[buy][cap] = Math.max( prices[ind] + ahead[1][cap - 1],
                                                  0           + ahead[0][cap]);
                    }
                }
            }
            ahead = cur;
        }
        return ahead[1][2];
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The four-variable folklore solution</div>
        Because the plane is only six cells, this problem is often written with four named scalars —{' '}
        <code>buy1, sell1, buy2, sell2</code> — updated in a forward pass. It is the same DP with the loops unrolled
        by hand. Prefer the version above when deriving it under pressure: the unrolled form is easy to misremember,
        and its update order is as delicate as the two-scalar slide in 7.2.
      </div>

      {/* 7.4 */}
      <div id="dp7-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 188</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">At most <code>k</code> transactions</span>
        <span className="pill">The <code>2k</code> trick</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> At most <code>k</code> complete transactions. Maximise the profit — the same as
          7.3 but with <code>k</code> transactions instead of 2.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Replace <code>(buy, cap)</code> with a single counter
          </div>
          <p>
            Generalising 7.3 to a <code>cap</code> of <code>k</code> works directly, but there is a neater encoding:
            a single <code>tranNo</code> running from <code>0</code> to <code>2k</code>, where{' '}
            <strong>even means &quot;next action is a buy&quot;</strong> and{' '}
            <strong>odd means &quot;next action is a sell&quot;</strong>. A transaction is two half-steps, so{' '}
            <code>k</code> transactions are <code>2k</code> increments, and the whole <code>buy</code>/
            <code>cap</code> pair collapses into one dimension.
          </p>
          <div className="recurrence">{
`base  ind == n  or  tranNo == 2*k:   0

tranNo even (buy):   max( -prices[ind] + f(ind+1, tranNo+1),  0 + f(ind+1, tranNo) )
tranNo odd  (sell):  max(  prices[ind] + f(ind+1, tranNo+1),  0 + f(ind+1, tranNo) )

answer = f(0, 0)         states = n * 2k,  time O(n*k)`
          }</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 Both encodings are fine — be able to write either</div>
          <code>(ind, buy, cap)</code> with a <code>[n][2][k+1]</code> table is the direct generalisation of 7.3 and
          arguably easier to explain. The <code>tranNo</code> form has a smaller, flatter table. They have identical
          complexity, <code>O(n·k)</code> time and <code>O(n·k)</code> space before optimisation.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumProfit(int[] prices, int n, int k) {
        int[][] dp = new int[n][2 * k];                // tranNo in [0, 2k)
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(0, 0, prices, n, k, dp);
    }

    private int f(int ind, int tranNo, int[] prices, int n, int k, int[][] dp) {
        if (ind == n || tranNo == 2 * k) return 0;     // days out, or transactions used up
        if (dp[ind][tranNo] != -1) return dp[ind][tranNo];

        if (tranNo % 2 == 0) {                         // even -> buy
            return dp[ind][tranNo] =
                Math.max(-prices[ind] + f(ind + 1, tranNo + 1, prices, n, k, dp),
                          0           + f(ind + 1, tranNo,     prices, n, k, dp));
        }
        // odd -> sell
        return dp[ind][tranNo] =
            Math.max( prices[ind] + f(ind + 1, tranNo + 1, prices, n, k, dp),
                      0           + f(ind + 1, tranNo,     prices, n, k, dp));
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumProfit(int[] prices, int n, int k) {
        // Column 2k exists as the all-zero base, so the recurrence can read tranNo+1.
        int[][] dp = new int[n + 1][2 * k + 1];

        for (int ind = n - 1; ind >= 0; ind--) {
            for (int tranNo = 2 * k - 1; tranNo >= 0; tranNo--) {
                if (tranNo % 2 == 0) {                 // buy
                    dp[ind][tranNo] = Math.max(-prices[ind] + dp[ind + 1][tranNo + 1],
                                                0           + dp[ind + 1][tranNo]);
                } else {                               // sell
                    dp[ind][tranNo] = Math.max( prices[ind] + dp[ind + 1][tranNo + 1],
                                                0           + dp[ind + 1][tranNo]);
                }
            }
        }
        return dp[0][0];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(k) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumProfit(int[] prices, int n, int k) {
        int[] ahead = new int[2 * k + 1];              // dp[ind+1][*]

        for (int ind = n - 1; ind >= 0; ind--) {
            int[] cur = new int[2 * k + 1];            // index 2k stays 0: the base column
            for (int tranNo = 2 * k - 1; tranNo >= 0; tranNo--) {
                if (tranNo % 2 == 0) {
                    cur[tranNo] = Math.max(-prices[ind] + ahead[tranNo + 1],
                                            0           + ahead[tranNo]);
                } else {
                    cur[tranNo] = Math.max( prices[ind] + ahead[tranNo + 1],
                                            0           + ahead[tranNo]);
                }
            }
            ahead = cur;
        }
        return ahead[0];
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 <code>O(k)</code>, and why that is the floor here
        </div>
        Unlike 7.3, the surviving array is not a constant six cells — it grows with <code>k</code>, which is part of
        the input. So <code>O(k)</code> is genuinely the best available, not <code>O(1)</code>. One practical note:
        when <code>k ≥ n/2</code> the cap can never bind (there are not enough days for that many trades), so the
        problem degenerates to Stocks II and can be answered by 7.2&apos;s <code>O(1)</code> scan — a worthwhile
        shortcut when <code>k</code> is huge.
      </div>

      {/* 7.5 */}
      <div id="dp7-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 309</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Sell jumps two days</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Unlimited transactions, but after selling you must <strong>skip one day</strong>{' '}
          before buying again (a one-day cooldown).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The cooldown is a jump, not a new state</div>
          On a sell, recurse to <code>ind + 2</code> instead of <code>ind + 1</code> — the skipped day is consumed by
          the cooldown. No extra dimension is needed, which is what keeps the state at <code>(ind, buy)</code> and
          the complexity at <code>O(n)</code>.
        </div>
        <div className="recurrence">{
`base  ind >= n:   0        note >=, not ==, because ind+2 can overshoot

buy == 1:  max( -prices[ind] + f(ind+1, 0),   0 + f(ind+1, 1) )
buy == 0:  max(  prices[ind] + f(ind+2, 1),   0 + f(ind+1, 0) )
                                ^^^^^ skip a day after selling

answer = f(0, 1)`
        }</div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ Two consequences of the <code>ind + 2</code>
          </div>
          <ul>
            <li>
              <strong>
                The base case must be <code>ind ≥ n</code>, not <code>ind == n</code>.
              </strong>{' '}
              Selling on day <code>n-1</code> jumps to <code>n+1</code>, which an equality test would sail straight
              past into an out-of-bounds read.
            </li>
            <li>
              <strong>
                The table needs <code>n + 2</code> rows.
              </strong>{' '}
              Declaring <code>[n+1][2]</code> and then reading <code>dp[ind + 2]</code> throws for{' '}
              <code>ind = n-1</code>. The two extra zero rows are the base case.
            </li>
          </ul>
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[][] dp = new int[n][2];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(0, 1, prices, n, dp);
    }

    private int f(int ind, int buy, int[] prices, int n, int[][] dp) {
        if (ind >= n) return 0;                        // >= : a sell can overshoot to n+1
        if (dp[ind][buy] != -1) return dp[ind][buy];

        if (buy == 1) {
            return dp[ind][buy] =
                Math.max(-prices[ind] + f(ind + 1, 0, prices, n, dp),
                          0           + f(ind + 1, 1, prices, n, dp));
        }
        return dp[ind][buy] =
            Math.max( prices[ind] + f(ind + 2, 1, prices, n, dp),   // cooldown: skip a day
                      0           + f(ind + 1, 0, prices, n, dp));
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[][] dp = new int[n + 2][2];                // TWO spare rows for the ind+2 read

        for (int ind = n - 1; ind >= 0; ind--) {
            dp[ind][1] = Math.max(-prices[ind] + dp[ind + 1][0],
                                   0           + dp[ind + 1][1]);
            dp[ind][0] = Math.max( prices[ind] + dp[ind + 2][1],    // skip a day
                                   0           + dp[ind + 1][0]);
        }
        return dp[0][1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(1) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;

        // The recurrence reaches two days ahead, so keep TWO future rows.
        int[] front2 = new int[2];                     // dp[ind+2][*]
        int[] front1 = new int[2];                     // dp[ind+1][*]

        for (int ind = n - 1; ind >= 0; ind--) {
            int[] cur = new int[2];                    // dp[ind][*]

            cur[1] = Math.max(-prices[ind] + front1[0], front1[1]);
            cur[0] = Math.max( prices[ind] + front2[1], front1[0]);

            front2 = front1;                           // slide both windows
            front1 = cur;
        }
        return front1[1];
    }
}`
      }</Code>

      <div className="callout callout-key">
        <div className="callout-title">🔑 Why this one needs two rows and not two scalars</div>
        Every other unlimited-transaction variant looks back exactly one day and so collapses to a pair of scalars.
        The cooldown reaches <strong>two</strong> days, so two rows of two must stay alive — the same reasoning as
        Fibonacci keeping <code>prev</code> and <code>prev2</code>, one dimension up. It is still <code>O(1)</code>,
        since four cells is a constant, and the slide order matters: <code>front2</code> takes the old{' '}
        <code>front1</code> before <code>front1</code> takes <code>cur</code>.
      </div>

      {/* 7.6 */}
      <div id="dp7-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 714</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">One extra subtraction</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Unlimited transactions, but each completed transaction costs a fixed{' '}
          <code>fee</code>. Maximise the net profit.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Charge the fee once per transaction — pick a side and stay there</div>
          The fee can be deducted on the buy or on the sell; both are correct because every transaction has exactly
          one of each. What is <em>not</em> correct is charging it on both, which doubles the cost. These notes deduct
          on the buy (<code>-values[ind] - fee</code>), and that convention is kept throughout.
        </div>
        <div className="recurrence">{
`buy == 1:  max( -values[ind] - fee + f(ind+1, 0),   0 + f(ind+1, 1) )
                            ^^^^^ the fee, charged once, on entry
buy == 0:  max(  values[ind]       + f(ind+1, 1),   0 + f(ind+1, 0) )

answer = f(0, 1)`
        }</div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ Now a real answer can be negative — so <code>-1</code> is a poor cache marker
          </div>
          With a fee, an unlucky state can genuinely be worth a negative amount, and <code>-1</code> is reachable.
          That makes <code>Arrays.fill(dp, -1)</code> unsafe: the cache would treat a real <code>-1</code> as
          &quot;not computed&quot; and recompute it endlessly, quietly turning the memoized solution back into an
          exponential one. The version below marks unknown cells with <code>Integer.MIN_VALUE</code> instead. This is
          the sentinel rule from 1.4 finally biting on a problem where it matters.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumProfit(int n, int fee, int[] values) {
        int[][] dp = new int[n][2];
        // -1 can be a genuine answer once a fee is charged, so use MIN_VALUE as "unknown".
        for (int[] row : dp) Arrays.fill(row, Integer.MIN_VALUE);
        return f(0, 1, n, fee, values, dp);
    }

    private int f(int ind, int buy, int n, int fee, int[] values, int[][] dp) {
        if (ind == n) return 0;
        if (dp[ind][buy] != Integer.MIN_VALUE) return dp[ind][buy];

        int profit;
        if (buy == 1) {
            profit = Math.max(-values[ind] - fee + f(ind + 1, 0, n, fee, values, dp),
                               0                 + f(ind + 1, 1, n, fee, values, dp));
        } else {
            profit = Math.max( values[ind]       + f(ind + 1, 1, n, fee, values, dp),
                               0                 + f(ind + 1, 0, n, fee, values, dp));
        }
        return dp[ind][buy] = profit;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumProfit(int n, int fee, int[] values) {
        int[][] dp = new int[n + 1][2];                // row n is the zero base

        for (int ind = n - 1; ind >= 0; ind--) {
            dp[ind][1] = Math.max(-values[ind] - fee + dp[ind + 1][0],
                                   0                 + dp[ind + 1][1]);
            dp[ind][0] = Math.max( values[ind]       + dp[ind + 1][1],
                                   0                 + dp[ind + 1][0]);
        }
        return dp[0][1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(1) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumProfit(int n, int fee, int[] values) {
        int aheadBuy = 0, aheadNotBuy = 0;             // dp[ind+1][1], dp[ind+1][0]

        for (int ind = n - 1; ind >= 0; ind--) {
            // sell
            int curNotBuy = Math.max(values[ind] + aheadBuy,
                                     0           + aheadNotBuy);
            // buy -- the fee is charged here
            int curBuy    = Math.max(-values[ind] - fee + aheadNotBuy,
                                      0                 + aheadBuy);

            aheadBuy    = curBuy;
            aheadNotBuy = curNotBuy;
        }
        return aheadBuy;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` prices = [1, 3, 2, 8, 4, 9],  fee = 2        answer = 8

 the optimal plan:
   buy  at 1  (day 0)   -> pay 1 and the fee 2
   sell at 8  (day 3)   -> receive 8          net so far: 8 - 1 - 2 = 5
   buy  at 4  (day 4)   -> pay 4 and the fee 2
   sell at 9  (day 5)   -> receive 9          net:        9 - 4 - 2 = 3

 total = 5 + 3 = 8

 note what the fee rules out: buying at 1 and selling at 3 nets 3 - 1 - 2 = 0,
 so the small 1 -> 3 rise is no longer worth trading -- which is exactly why the
 greedy "sum every positive daily difference" from 7.2 fails once a fee exists`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n)">Two states per day.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n)">
          Plus an <code>O(n)</code> stack when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(1)">Two scalars.</CxBox>
      </Cx>

      {/* 8.1 */}
      <div id="dp8-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        Seven problems built on one idea: <code>dp[i]</code> = the best chain <strong>ending at</strong>{' '}
        <code>i</code>, computed by scanning every earlier element. Swap the &quot;can follow&quot; test —{' '}
        <code>&lt;</code>, divisibility, predecessor-string — and the same twelve lines solve all of them.
      </p>
      <div className="card">
        <div className="callout callout-key">
          <div className="callout-title">🔑 The two formulations, and when to use which</div>
          <div className="recurrence">{
`(A) 2D, "index + previous index"       state (ind, prevInd)
    f(ind, prevInd) = max( f(ind+1, prevInd),                       not take
                           1 + f(ind+1, ind)  if arr[ind] > arr[prevInd] )
    O(n^2) states, O(n^2) space -> O(n) after row reduction
    this is the form that memoizes cleanly

(B) 1D, "best chain ending at i"       state (i)
    dp[i] = 1 + max( dp[j] )  over all j < i with arr[j] < arr[i]
    answer = max over i of dp[i]
    O(n) space already, O(n^2) time -- the form to actually submit`
          }</div>
          <p>
            Form (A) exists to show the derivation; form (B) is what you write. Every later problem in this part uses
            (B), because the &quot;can follow&quot; predicate slots straight into the inner <code>if</code>.
          </p>
        </div>
        <div className="callout callout-na">
          <div className="callout-title">🚫 Why form (B) has no space-optimized version</div>
          Every row-reduction in these notes rests on the same fact: state <code>i</code> reads a{' '}
          <strong>fixed, small window</strong> of earlier states. Form (B) breaks that — <code>dp[i]</code> scans{' '}
          <em>all</em> of <code>dp[0..i-1]</code>, so every earlier answer must stay alive until the end.{' '}
          <code>O(n)</code> is therefore the floor, and the 1D table is already there.
          <p>
            Where a problem in this part reports a witness (the actual subsequence, in 8.2 and 8.4) it also needs a
            parallel <code>hash[]</code> array, which is likewise irreducible. Those sections say so rather than
            offering a third block that cannot exist.
          </p>
        </div>
      </div>

      <div className="meta-row">
        <span className="pill">LeetCode 300</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">State: (ind, prevInd)</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return the length of the longest strictly increasing subsequence.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why a second index is unavoidable</div>
          Whether <code>arr[ind]</code> may be taken depends on what was taken last, so the decision at{' '}
          <code>ind</code> is not determined by <code>ind</code> alone — the rule from 1.4 again. Hence the state{' '}
          <code>(ind, prevInd)</code>, where <code>prevInd = -1</code> means &quot;nothing taken yet&quot;.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ The <code>prevInd + 1</code> offset
          </div>
          <code>prevInd</code> ranges over <code>-1 .. n-1</code>, which is <code>n+1</code> values, and{' '}
          <code>-1</code> cannot index an array. Every table access is therefore written{' '}
          <code>dp[ind][prevInd + 1]</code> against an <code>[n][n+1]</code> table. Forgetting the <code>+1</code>{' '}
          in one of the three places it appears — the lookup, the store, and the top-level call — is the classic bug
          here.
        </div>
        <div className="recurrence">{
`base  ind == n:   0

len = 0 + f(ind+1, prevInd)                                    not take
if (prevInd == -1 || arr[ind] > arr[prevInd]):
    len = max(len, 1 + f(ind+1, ind))                          take, ind becomes the new prev

answer = f(0, -1)          states = n*(n+1), work O(1), time O(n^2)`
        }</div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestIncreasingSubsequence(int[] arr, int n) {
        int[][] dp = new int[n][n + 1];                // second index is prevInd + 1
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(0, -1, arr, n, dp);
    }

    private int f(int ind, int prevInd, int[] arr, int n, int[][] dp) {
        if (ind == n) return 0;
        if (dp[ind][prevInd + 1] != -1) return dp[ind][prevInd + 1];

        int len = 0 + f(ind + 1, prevInd, arr, n, dp);           // not take

        if (prevInd == -1 || arr[ind] > arr[prevInd]) {          // may we take it?
            len = Math.max(len, 1 + f(ind + 1, ind, arr, n, dp));
        }
        return dp[ind][prevInd + 1] = len;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestIncreasingSubsequence(int[] arr, int n) {
        // Row n is the all-zero base, so the table is [n+1][n+1].
        int[][] dp = new int[n + 1][n + 1];

        for (int ind = n - 1; ind >= 0; ind--) {                 // BACKWARD: reads ind+1
            for (int prevInd = ind - 1; prevInd >= -1; prevInd--) {
                int len = 0 + dp[ind + 1][prevInd + 1];

                if (prevInd == -1 || arr[ind] > arr[prevInd]) {
                    len = Math.max(len, 1 + dp[ind + 1][ind + 1]);
                }
                dp[ind][prevInd + 1] = len;
            }
        }
        return dp[0][0];                                         // f(0, -1)
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 Why <code>prevInd</code> only needs to run down to <code>ind - 1</code>
        </div>
        A <code>prevInd</code> greater than or equal to <code>ind</code> is unreachable: the previous pick always
        sits strictly to the left of the current index. Looping <code>prevInd</code> from <code>ind-1</code>{' '}
        downward visits exactly the reachable half of the table and leaves the rest at zero, harmlessly. Looping it
        over the full range also works and costs the same asymptotically.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(n) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestIncreasingSubsequence(int[] arr, int n) {
        // Only row ind+1 is ever read, so two rows suffice.
        int[] next = new int[n + 1];                             // dp[ind+1][*]

        for (int ind = n - 1; ind >= 0; ind--) {
            int[] cur = new int[n + 1];                          // dp[ind][*]
            for (int prevInd = ind - 1; prevInd >= -1; prevInd--) {
                int len = 0 + next[prevInd + 1];

                if (prevInd == -1 || arr[ind] > arr[prevInd]) {
                    len = Math.max(len, 1 + next[ind + 1]);
                }
                cur[prevInd + 1] = len;
            }
            next = cur;
        }
        return next[0];
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — The 1D formulation</h3></div>
      <div className="card">
        <p>
          The reformulation worth memorising. Let <code>dp[i]</code> be the length of the longest increasing
          subsequence <strong>ending at</strong> <code>i</code>. Every chain ending at <code>i</code> is some chain
          ending at an earlier, smaller element with <code>arr[i]</code> appended, so scan all <code>j &lt; i</code>{' '}
          and take the best. As in Longest Common Substring (6.3), the meaning shifted to &quot;ending here&quot;, so
          the answer is a maximum over the whole array rather than one cell.
        </p>
        <div className="recurrence">{
`dp[i] = 1                                      every element is a chain of length 1
dp[i] = max( dp[i], 1 + dp[j] )   for all j < i with arr[j] < arr[i]

answer = max over i of dp[i]           time O(n^2),  space O(n)`
        }</div>
      </div>
      <Code>{
`class Solution {
    public int longestIncreasingSubsequence(int[] arr, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);                                      // each element alone

        int maxi = 1;
        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (arr[prev] < arr[i]) {
                    dp[i] = Math.max(dp[i], 1 + dp[prev]);
                }
            }
            maxi = Math.max(maxi, dp[i]);                        // best chain ends anywhere
        }
        return maxi;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ <code>maxi = 1</code> assumes a non-empty array
        </div>
        Seeding the running maximum at <code>1</code> is right for <code>n ≥ 1</code> and wrong for an empty array,
        where the answer is <code>0</code>. Both the Coding Ninjas and LeetCode 300 constraints guarantee{' '}
        <code>n ≥ 1</code>, so the seed is safe there. If in doubt seed at <code>0</code> and let the loop lift it.
      </div>

      <div className="subsection-header"><h3>Dry run — the 1D form</h3></div>
      <pre className="diagram">{
` arr = [5, 4, 11, 1, 16, 8]

 i=0  arr=5   no j          dp[0] = 1
 i=1  arr=4   5 > 4         dp[1] = 1
 i=2  arr=11  5 < 11 -> 2   dp[2] = 2      (also 4 < 11 -> 2)
 i=3  arr=1   none smaller  dp[3] = 1
 i=4  arr=16  11 < 16 -> 3  dp[4] = 3      via 5, 11, 16
 i=5  arr=8   5 < 8 -> 2,  4 < 8 -> 2,  1 < 8 -> 2      dp[5] = 2

 dp = [1, 1, 2, 1, 3, 2]        answer = max = 3     ("5, 11, 16")`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n²)">
          All four versions. See 8.3 for <code>O(n log n)</code>.
        </CxBox>
        <CxBox label="Space — memo / tab" value="O(n²)">
          Plus an <code>O(n)</code> stack when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(n)">Two rows, or the flat 1D array.</CxBox>
      </Cx>

      {/* 8.2 */}
      <div id="dp8-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Parent / <code>hash</code> array</span>
        <span className="pill pill-topic">Needs the full dp array</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return the longest increasing subsequence <em>itself</em>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Record where each chain came from</div>
          <p>
            Alongside <code>dp[i]</code>, keep <code>hash[i]</code> = the index of the element that precedes{' '}
            <code>i</code> in the best chain ending at <code>i</code>. Initialise <code>hash[i] = i</code> — &quot;I
            am my own predecessor&quot;, meaning the chain starts here — and update it whenever <code>dp[i]</code>{' '}
            improves. Then:
          </p>
          <ol className="steps">
            <li>Track <code>lastIndex</code>, where the global maximum <code>dp</code> value occurred.</li>
            <li>
              Walk backwards through <code>hash</code> from <code>lastIndex</code>, collecting elements, until a node
              whose <code>hash[i] == i</code> — the start of the chain.
            </li>
            <li>Reverse what you collected.</li>
          </ol>
          The self-pointing sentinel is what makes the loop terminate without a separate &quot;is this the
          head&quot; flag.
        </div>
        <div className="callout callout-na">
          <div className="callout-title">🚫 Why memoization and space optimization do not apply</div>
          <ul>
            <li>
              <strong>No space optimization.</strong> The backward walk can jump to any earlier index, so both{' '}
              <code>dp[]</code> and <code>hash[]</code> must survive in full. There is no window to shrink — and, as
              noted at the top of this part, even the length alone already needs <code>O(n)</code>.
            </li>
            <li>
              <strong>Memoization adds nothing.</strong> The recursive <code>(ind, prevInd)</code> form computes
              lengths, not chains; to return the chain it would have to cache a list per state, which is{' '}
              <code>O(n²)</code> lists. Reconstruction wants one linear pass over a parent array, which is inherently
              the iterative shape.
            </li>
          </ul>
          Same trade-off as Print the LCS (6.2): the length is cheap, the witness costs a table.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public int[] printingLongestIncreasingSubsequence(int[] arr, int n) {
        int[] dp   = new int[n];
        int[] hash = new int[n];                                 // predecessor index
        Arrays.fill(dp, 1);

        int maxi = 1;
        int lastIndex = 0;

        for (int i = 0; i < n; i++) {
            hash[i] = i;                                         // chain starts here
            for (int prev = 0; prev < i; prev++) {
                if (arr[prev] < arr[i] && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    hash[i] = prev;                              // remember the parent
                }
            }
            if (dp[i] > maxi) {                                  // best chain so far
                maxi = dp[i];
                lastIndex = i;
            }
        }

        // Walk the parent chain backwards from the best endpoint.
        int[] ans = new int[maxi];
        int pos = maxi - 1;
        ans[pos--] = arr[lastIndex];

        while (hash[lastIndex] != lastIndex) {                    // until a self-pointing head
            lastIndex = hash[lastIndex];
            ans[pos--] = arr[lastIndex];
        }
        return ans;                                              // already in order
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 The strict <code>&gt;</code> in the update is what keeps <code>hash</code> honest
        </div>
        The inner test is <code>1 + dp[prev] &gt; dp[i]</code>, not <code>≥</code>. With <code>≥</code> the parent
        pointer would be rewritten on ties without improving the length, which still produces a valid chain but
        makes the code harder to reason about — and in 8.7, where ties are counted rather than ignored, the
        distinction becomes load-bearing.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n²)">
          The table; the walk adds <code>O(n)</code>.
        </CxBox>
        <CxBox label="Space" value="O(n)">Two arrays — irreducible, as explained above.</CxBox>
      </Cx>

      {/* 8.3 */}
      <div id="dp8-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 300</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill pill-topic">Different topic: Binary Search</span>
        <span className="pill">O(n log n)</span>
      </div>
      <div className="card">
        <div className="callout callout-topic">
          <div className="callout-title">🟣 This one is not dynamic programming</div>
          <p>
            It solves the same problem as 8.1 but by a different mechanism entirely, and it is worth being explicit
            that <strong>the three DP forms do not apply here</strong>:
          </p>
          <ul>
            <li>
              There is no recurrence over subproblems, so <strong>nothing to memoize</strong> — the algorithm is a
              single left-to-right sweep maintaining one auxiliary array.
            </li>
            <li>
              There is no table being filled base-case-first, so <strong>no tabulation</strong> in the sense used
              everywhere else in these notes.
            </li>
            <li>
              The one array it keeps is already <code>O(n)</code> and every entry can be read again, so{' '}
              <strong>no space optimization</strong>.
            </li>
          </ul>
          <p>
            What it does use is <strong>binary search</strong> (specifically a lower-bound search) over a sorted
            array — a technique from the searching topic, not from DP. It belongs in this part because it answers the
            LIS question, and it is the version to reach for when <code>n</code> is large enough that{' '}
            <code>O(n²)</code> will not pass.
          </p>
        </div>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 The invariant: <code>temp[k]</code> is the smallest possible tail of a chain of length{' '}
            <code>k+1</code>
          </div>
          <p>
            Sweep the array. For each element <code>arr[i]</code>:
          </p>
          <ul>
            <li>
              If it is larger than every tail so far (<code>arr[i] &gt; last(temp)</code>), it extends the longest
              chain — append it and the answer grows by one.
            </li>
            <li>
              Otherwise, binary-search for the first tail <code>≥ arr[i]</code> and <strong>overwrite</strong> it.
              The chain of that length now ends in a smaller value, which can only make future extensions easier.
              The length does not change.
            </li>
          </ul>
          <p>
            <code>temp</code> stays sorted throughout, which is what licenses the binary search, and{' '}
            <code>temp.size()</code> is the answer. Note the crucial caveat: <code>temp</code> is{' '}
            <strong>not</strong> itself a valid increasing subsequence of the input — only its <em>length</em> is
            meaningful. That is why printing the LIS (8.2) still uses the <code>O(n²)</code> method.
          </p>
        </div>
        <pre className="diagram">{
` arr = [10, 9, 2, 5, 3, 7, 101, 18]

 x=10   temp empty            -> temp = [10]
 x=9    9 <= 10, replace 10   -> temp = [9]
 x=2    2 <= 9,  replace 9    -> temp = [2]
 x=5    5 > 2,   append       -> temp = [2, 5]
 x=3    3 <= 5,  replace 5    -> temp = [2, 3]
 x=7    7 > 3,   append       -> temp = [2, 3, 7]
 x=101  append                -> temp = [2, 3, 7, 101]
 x=18   18 <= 101, replace    -> temp = [2, 3, 7, 18]

 answer = 4

 note temp = [2,3,7,18] IS an LIS here, but that is luck -- in general the
 array is only a record of best-possible tails, not a real subsequence`
        }</pre>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public int longestIncreasingSubsequence(int[] arr, int n) {
        int[] temp = new int[n];                                 // temp[k] = smallest tail
        int len = 0;                                             // of a chain of length k+1

        for (int i = 0; i < n; i++) {
            // lowerBound: first position whose tail is >= arr[i]
            int ind = lowerBound(temp, len, arr[i]);

            if (ind == len) {
                temp[len] = arr[i];                              // extends the longest chain
                len++;
            } else {
                temp[ind] = arr[i];                              // a smaller tail, same length
            }
        }
        return len;
    }

    // Binary search over temp[0..size) for the first element >= key.
    private int lowerBound(int[] temp, int size, int key) {
        int lo = 0, hi = size;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;                        // no overflow
            if (temp[mid] >= key) hi = mid;
            else                  lo = mid + 1;
        }
        return lo;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Java&apos;s built-in, and the strict-versus-non-strict switch</div>
        <p>
          <code>Arrays.binarySearch</code> can replace the helper, but its return value for a missing key is{' '}
          <code>-(insertionPoint) - 1</code>, so it needs unwrapping and it does not promise a <em>lower</em> bound
          among duplicates. Writing the six-line search is safer.
        </p>
        <p>
          One switch worth knowing: <code>&gt;=</code> in the search gives the{' '}
          <strong>strictly increasing</strong> LIS (duplicates replace rather than extend). Changing it to{' '}
          <code>&gt;</code> — an upper bound — yields the longest <strong>non-decreasing</strong> subsequence
          instead. One comparison operator, two different problems.
        </p>
      </div>

      <Cx>
        <CxBox label="Time" value="O(n log n)">
          One binary search per element — the reason this version exists.
        </CxBox>
        <CxBox label="Space" value="O(n)">
          The <code>temp</code> array.
        </CxBox>
      </Cx>

      {/* 8.4 */}
      <div id="dp8-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 368</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill pill-topic">Needs a sort first</span>
        <span className="pill">LIS with a new predicate</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Find the largest subset in which <strong>every pair</strong>{' '}
          <code>(a, b)</code> satisfies <code>a % b == 0</code> or <code>b % a == 0</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Sort, and the pairwise condition becomes a chain condition</div>
          <p>
            Checking all pairs sounds expensive, but divisibility is transitive: if <code>a | b</code> and{' '}
            <code>b | c</code> then <code>a | c</code>. So once the array is <strong>sorted ascending</strong>, a
            subset is valid exactly when each element divides the <em>next</em> one — a chain, not a clique. That
            reduces the problem to LIS form (B) with <code>arr[prev] &lt; arr[i]</code> replaced by{' '}
            <code>arr[i] % arr[prev] == 0</code>.
          </p>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The sort is not a convenience, it is part of the algorithm</div>
          Without sorting, &quot;each divides the next&quot; no longer implies the pairwise property, and the
          transitivity argument collapses — the DP would happily build a chain like <code>4, 2</code> whose direction
          is inconsistent with a later element. <code>Arrays.sort</code> first, always. This is the piece of the
          solution that comes from <strong>sorting</strong> rather than from DP.
        </div>
        <div className="recurrence">{
`sort(arr)

dp[i] = 1
dp[i] = max( dp[i], 1 + dp[prev] )   for all prev < i with arr[i] % arr[prev] == 0
hash[i] = prev                        whenever dp[i] improves

answer = the chain ending at the index with the largest dp value`
        }</div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    // Memoized form, returning the SIZE of the largest divisible subset.
    public int largestDivisibleSubsetSize(int[] arr) {
        int n = arr.length;
        Arrays.sort(arr);                                        // transitivity needs this

        int[][] dp = new int[n][n + 1];                          // second index is prevInd + 1
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(0, -1, arr, n, dp);
    }

    private int f(int ind, int prevInd, int[] arr, int n, int[][] dp) {
        if (ind == n) return 0;
        if (dp[ind][prevInd + 1] != -1) return dp[ind][prevInd + 1];

        int len = 0 + f(ind + 1, prevInd, arr, n, dp);           // not take

        if (prevInd == -1 || arr[ind] % arr[prevInd] == 0) {     // the only changed line
            len = Math.max(len, 1 + f(ind + 1, ind, arr, n, dp));
        }
        return dp[ind][prevInd + 1] = len;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Compare this with 8.1&apos;s memoization, line for line</div>
        The only difference is the predicate inside the <code>if</code>: <code>arr[ind] &gt; arr[prevInd]</code>{' '}
        became <code>arr[ind] % arr[prevInd] == 0</code>, plus the sort at the top. That is the whole point of this
        part — the LIS skeleton is a template, and each problem supplies its own &quot;may <code>i</code> follow{' '}
        <code>prev</code>?&quot; test.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    // Tabulated form, returning the subset itself.
    public int[] divisibleSet(int[] arr) {
        int n = arr.length;
        Arrays.sort(arr);

        int[] dp   = new int[n];
        int[] hash = new int[n];
        Arrays.fill(dp, 1);

        int maxi = 1;
        int lastIndex = 0;

        for (int i = 0; i < n; i++) {
            hash[i] = i;                                         // chain starts here
            for (int prev = 0; prev < i; prev++) {
                if (arr[i] % arr[prev] == 0 && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    hash[i] = prev;
                }
            }
            if (dp[i] > maxi) {
                maxi = dp[i];
                lastIndex = i;
            }
        }

        int[] ans = new int[maxi];
        int pos = maxi - 1;
        ans[pos--] = arr[lastIndex];

        while (hash[lastIndex] != lastIndex) {
            lastIndex = hash[lastIndex];
            ans[pos--] = arr[lastIndex];
        }
        return ans;                                              // ascending order
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-na">NOT POSSIBLE</span></h3>
      </div>
      <div className="card">
        <div className="callout callout-na">
          <div className="callout-title">🚫 Why no space-optimized version exists</div>
          <p>Two independent reasons, both structural:</p>
          <ul>
            <li>
              <strong>The recurrence has no bounded look-back.</strong> <code>dp[i]</code> scans every{' '}
              <code>dp[prev]</code> for <code>prev &lt; i</code>, so no fixed-size window of previous answers is
              enough. <code>O(n)</code> for <code>dp[]</code> is already the minimum, and the 1D table above is
              exactly that.
            </li>
            <li>
              <strong>The problem asks for the subset, not its size.</strong> Reconstructing it needs the{' '}
              <code>hash[]</code> parent array kept in full, for the same reason as Print the LIS (8.2).
            </li>
          </ul>
          <p>
            So the tabulated version above <em>is</em> the space-optimal one, at <code>O(n)</code>. The honest answer
            to &quot;can you do better on space?&quot; here is no — and being able to say why is more useful than
            inventing a third block.
          </p>
        </div>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` arr = [1, 16, 7, 8, 4]        after sorting: [1, 4, 7, 8, 16]

 i=0  a=1                                           dp[0]=1  hash[0]=0
 i=1  a=4    4 % 1 == 0  -> 1+dp[0]=2               dp[1]=2  hash[1]=0
 i=2  a=7    7 % 1 == 0  -> 1+dp[0]=2               dp[2]=2  hash[2]=0
             7 % 4 != 0
 i=3  a=8    8 % 1 == 0  -> 2;  8 % 4 == 0 -> 1+dp[1]=3      dp[3]=3  hash[3]=1
 i=4  a=16   16 % 1 -> 2;  16 % 4 -> 3;  16 % 8 == 0 -> 1+dp[3]=4
                                                    dp[4]=4  hash[4]=3

 maxi = 4 at lastIndex = 4

 walk hash: 4 -> 3 -> 1 -> 0 (self)      collecting 16, 8, 4, 1
 answer = [1, 4, 8, 16]

 every pair divides: 1|4, 1|8, 1|16, 4|8, 4|16, 8|16`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n²)">
          Plus <code>O(n log n)</code> for the sort.
        </CxBox>
        <CxBox label="Space" value="O(n)">Already minimal — see above.</CxBox>
      </Cx>

      {/* 8.5 */}
      <div id="dp8-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 1048</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill pill-topic">Sort by length + two-pointer check</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A word <code>b</code> is a <em>predecessor</em> of <code>a</code> if inserting
          exactly one character into <code>b</code> gives <code>a</code>. Find the longest chain{' '}
          <code>w₁ → w₂ → …</code> where each word is a predecessor of the next.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 LIS form (B) with a string predicate — but sort by length, not alphabetically
          </div>
          <p>
            Same skeleton as 8.4 again, with <code>checkPossible(a, b)</code> in place of the divisibility test. The
            sort is the subtle part: a chain always moves from shorter words to longer ones by exactly one character,
            so the array must be ordered by <strong>length</strong>. Sorting alphabetically would break the guarantee
            that a word&apos;s possible predecessors all appear earlier.
          </p>
        </div>
        <div className="callout callout-topic">
          <div className="callout-title">🟣 The predecessor check is a two-pointer string walk, not DP</div>
          <p>
            <code>checkPossible(s1, s2)</code> asks &quot;is <code>s2</code> obtainable from <code>s1</code> by
            deleting one character?&quot; — equivalently, is <code>s2</code> a subsequence of <code>s1</code> with{' '}
            <code>s1.length() == s2.length() + 1</code>? That is a linear <strong>two-pointer</strong> scan from the
            strings topic:
          </p>
          <ol className="steps">
            <li>Reject immediately unless the lengths differ by exactly one.</li>
            <li>
              Advance both pointers on a match; advance only the longer string&apos;s pointer on a mismatch (that is
              the one inserted character being skipped).
            </li>
            <li>Accept if both pointers reached the end — meaning at most one skip happened.</li>
          </ol>
          <p>
            The <code>if (first == s1.length() &amp;&amp; second == s2.length())</code> test at the end is what
            rejects a second mismatch: a word needing two insertions runs the longer pointer out before the shorter
            one finishes.
          </p>
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestStrChain(String[] arr) {
        int n = arr.length;
        Arrays.sort(arr, (a, b) -> a.length() - b.length());     // shortest first

        int[][] dp = new int[n][n + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(0, -1, arr, n, dp);
    }

    private int f(int ind, int prevInd, String[] arr, int n, int[][] dp) {
        if (ind == n) return 0;
        if (dp[ind][prevInd + 1] != -1) return dp[ind][prevInd + 1];

        int len = 0 + f(ind + 1, prevInd, arr, n, dp);            // not take

        if (prevInd == -1 || checkPossible(arr[ind], arr[prevInd])) {
            len = Math.max(len, 1 + f(ind + 1, ind, arr, n, dp));
        }
        return dp[ind][prevInd + 1] = len;
    }

    // ── is s2 obtainable from s1 by deleting exactly one character? ──
    private boolean checkPossible(String s1, String s2) {
        if (s1.length() != s2.length() + 1) return false;         // lengths must differ by 1

        int first = 0, second = 0;
        while (first < s1.length()) {
            if (second < s2.length() && s1.charAt(first) == s2.charAt(second)) {
                first++;
                second++;
            } else {
                first++;                                          // skip the inserted char
            }
        }
        return first == s1.length() && second == s2.length();
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestStrChain(String[] arr) {
        int n = arr.length;
        Arrays.sort(arr, (a, b) -> a.length() - b.length());     // sort by LENGTH

        int[] dp = new int[n];
        Arrays.fill(dp, 1);

        int maxi = 1;
        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (checkPossible(arr[i], arr[prev]) && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                }
            }
            if (dp[i] > maxi) maxi = dp[i];
        }
        return maxi;
    }

    private boolean checkPossible(String s1, String s2) {
        if (s1.length() != s2.length() + 1) return false;

        int first = 0, second = 0;
        while (first < s1.length()) {
            if (second < s2.length() && s1.charAt(first) == s2.charAt(second)) {
                first++;
                second++;
            } else {
                first++;
            }
        }
        return first == s1.length() && second == s2.length();
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-na">NOT POSSIBLE</span></h3>
      </div>
      <div className="card">
        <div className="callout callout-na">
          <div className="callout-title">
            🚫 Why <code>O(n)</code> is the floor
          </div>
          <p>
            Exactly as in 8.4: <code>dp[i]</code> consults <strong>every</strong> earlier <code>dp[prev]</code>, not
            a bounded window, so the full array must stay live. The tabulated version above is already{' '}
            <code>O(n)</code> and there is nothing left to shrink.
          </p>
          <p>
            What <em>can</em> be improved is the <strong>time</strong>. Instead of comparing all <code>O(n²)</code>{' '}
            pairs at <code>O(L)</code> each, put every word in a <code>HashMap&lt;String, Integer&gt;</code> and, for
            each word, delete one character at a time (<code>L</code> candidates) and look the result up:
          </p>
          <div className="recurrence">{
`for each word (in length order):
    best = 1
    for each position p in word:
        cand = word with character p removed
        if (map contains cand)  best = max(best, 1 + map.get(cand))
    map.put(word, best)

time O(n * L^2) -- L is the word length, typically tiny`
          }</div>
          <p>
            That is the version to offer when the interviewer pushes on complexity; it is a <strong>hashing</strong>{' '}
            improvement rather than a DP one, and the space is still <code>O(n)</code>.
          </p>
        </div>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` arr = ["a", "b", "ba", "bca", "bda", "bdca"]       already in length order

 i=0  "a"                                              dp[0]=1
 i=1  "b"     no predecessor of length 0 present       dp[1]=1
 i=2  "ba"    check "a": delete 'b' -> "a"   YES       dp[2]=2
              check "b": delete 'a' -> "b"   YES       (still 2)
 i=3  "bca"   check "ba" -> YES                        dp[3]=3
 i=4  "bda"   check "ba" -> YES                        dp[4]=3
 i=5  "bdca"  check "bca" -> YES (1+3=4)               dp[5]=4
              check "bda" -> YES (1+3=4)

 answer = 4        chain "a" -> "ba" -> "bda" -> "bdca"`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n²·L)">
          Pairwise checks; <code>O(n·L²)</code> with the hash-map trick.
        </CxBox>
        <CxBox label="Space — memo" value="O(n²)">
          The <code>(ind, prevInd)</code> table.
        </CxBox>
        <CxBox label="Space — tabulated" value="O(n)">Already minimal.</CxBox>
      </Cx>

      {/* 8.6 */}
      <div id="dp8-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Two LIS passes</span>
        <span className="pill">Mind the double count</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A <em>bitonic</em> subsequence increases and then decreases (either side may be
          empty). Return the length of the longest one.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Every bitonic sequence has a single peak</div>
          <p>
            Pick the peak. Everything left of it is an increasing subsequence <em>ending</em> at the peak; everything
            right of it is an increasing subsequence <em>ending</em> at the peak when read right-to-left. So:
          </p>
          <div className="recurrence">{
`dp1[i] = LIS ending at i, scanning left  to right
dp2[i] = LIS ending at i, scanning right to left      (i.e. the decreasing run going right)

answer = max over i of ( dp1[i] + dp2[i] - 1 )
                                          ^^^ element i is counted in BOTH arrays`
          }</div>
          <p>
            Same &quot;compute two directions, combine at every index&quot; move as the Diameter of a Binary Tree —
            and the same off-by-one hazard.
          </p>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ The <code>- 1</code> is not optional
          </div>
          Index <code>i</code> is the last element of both runs, so a naive <code>dp1[i] + dp2[i]</code> counts the
          peak twice and every answer comes back one too large. Forgetting it produces a result that looks plausible
          on small inputs, which is exactly why it slips through.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestBitonicSequence(int[] arr, int n) {
        // Two memoized LIS computations, one per direction, combined at every peak.
        Integer[] up   = new Integer[n];                         // LIS ending at i, from the left
        Integer[] down = new Integer[n];                         // LIS ending at i, from the right

        int maxi = 0;
        for (int i = 0; i < n; i++) {
            maxi = Math.max(maxi,
                    lisEndingAt(i, arr, up) + lisEndingAtFromRight(i, arr, n, down) - 1);
        }
        return maxi;
    }

    // longest increasing run that ends at index i, looking left
    private int lisEndingAt(int i, int[] arr, Integer[] memo) {
        if (memo[i] != null) return memo[i];

        int best = 1;
        for (int prev = 0; prev < i; prev++) {
            if (arr[prev] < arr[i]) {
                best = Math.max(best, 1 + lisEndingAt(prev, arr, memo));
            }
        }
        return memo[i] = best;
    }

    // longest increasing run that ends at index i, looking right (the decreasing side)
    private int lisEndingAtFromRight(int i, int[] arr, int n, Integer[] memo) {
        if (memo[i] != null) return memo[i];

        int best = 1;
        for (int prev = n - 1; prev > i; prev--) {
            if (arr[prev] < arr[i]) {
                best = Math.max(best, 1 + lisEndingAtFromRight(prev, arr, n, memo));
            }
        }
        return memo[i] = best;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int longestBitonicSequence(int[] arr, int n) {
        int[] dp1 = new int[n];                                  // increasing, left to right
        Arrays.fill(dp1, 1);

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (arr[prev] < arr[i] && 1 + dp1[prev] > dp1[i]) {
                    dp1[i] = 1 + dp1[prev];
                }
            }
        }

        int[] dp2 = new int[n];                                  // increasing, right to left
        Arrays.fill(dp2, 1);

        for (int i = n - 1; i >= 0; i--) {
            for (int prev = n - 1; prev > i; prev--) {
                if (arr[prev] < arr[i] && 1 + dp2[prev] > dp2[i]) {
                    dp2[i] = 1 + dp2[prev];
                }
            }
        }

        int maxi = 0;
        for (int i = 0; i < n; i++) {
            maxi = Math.max(maxi, dp1[i] + dp2[i] - 1);          // -1: peak counted twice
        }
        return maxi;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-na">NOT POSSIBLE</span></h3>
      </div>
      <div className="card">
        <div className="callout callout-na">
          <div className="callout-title">🚫 Two arrays are the floor, and both must be complete</div>
          <p>
            The <code>O(n)</code> limit from 8.4 applies to each pass individually — <code>dp1[i]</code> reads every
            earlier entry, <code>dp2[i]</code> every later one. On top of that, the final combination step needs{' '}
            <code>dp1[i]</code> and <code>dp2[i]</code> <strong>simultaneously</strong> for every <code>i</code>, and
            they are produced by scans running in opposite directions. So even if a single pass could be streamed,
            the two could not be fused: one of them has to be fully materialised before the other finishes.
          </p>
          <p>
            <code>O(n)</code> total is therefore optimal, and the tabulated version above achieves it. The small
            honest win available is dropping the peak loop by folding <code>dp1[i] + dp2[i] - 1</code> into the
            second pass.
          </p>
        </div>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` arr = [1, 11, 2, 10, 4, 5, 2, 1]

 dp1 (increasing from the left):   [1, 2, 2, 3, 3, 4, 2, 1]
 dp2 (increasing from the right):  [1, 5, 2, 4, 3, 3, 2, 1]

 dp1[i] + dp2[i] - 1:
   i=0:  1 + 1 - 1 = 1
   i=1:  2 + 5 - 1 = 6          <-- best
   i=3:  3 + 4 - 1 = 6          <-- also 6
   i=5:  4 + 3 - 1 = 6          <-- also 6

 answer = 6        e.g. peak at index 1:  1, 11, 10, 4, 2, 1`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n²)">
          Two <code>O(n²)</code> passes.
        </CxBox>
        <CxBox label="Space" value="O(n)">Two arrays — already minimal.</CxBox>
      </Cx>

      {/* 8.7 */}
      <div id="dp8-7" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 673</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Two coupled tables</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Count how many longest increasing subsequences the array has.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Carry a count alongside the length</div>
          <p>
            Keep two arrays: <code>dp[i]</code> as usual, and <code>cnt[i]</code> = how many increasing subsequences
            of length <code>dp[i]</code> end at <code>i</code>. Scanning <code>prev &lt; i</code> with{' '}
            <code>arr[prev] &lt; arr[i]</code>, there are exactly two cases:
          </p>
          <ul>
            <li>
              <code>1 + dp[prev] &gt; dp[i]</code> — a <strong>longer</strong> chain was found. Overwrite the length
              and <strong>inherit</strong> the count: <code>cnt[i] = cnt[prev]</code>. Everything counted before is
              now obsolete.
            </li>
            <li>
              <code>1 + dp[prev] == dp[i]</code> — an <strong>equally long</strong> chain was found. Keep the length
              and <strong>add</strong>: <code>cnt[i] += cnt[prev]</code>.
            </li>
          </ul>
          <p>
            Then the answer sums <code>cnt[i]</code> over every <code>i</code> whose <code>dp[i]</code> equals the
            global maximum — several different indices can host a longest chain.
          </p>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ Inherit versus accumulate — get this backwards and the count is silently wrong
          </div>
          The strict <code>&gt;</code> branch <em>assigns</em> (<code>=</code>) and the <code>==</code> branch{' '}
          <em>accumulates</em> (<code>+=</code>). Using <code>+=</code> in both double-counts; using <code>=</code>{' '}
          in both keeps only the last chain found. The length will still be right either way, which is what makes
          this bug so hard to spot — only the count is off.
        </div>
        <div className="recurrence">{
`dp[i] = cnt[i] = 1

for prev < i with arr[prev] < arr[i]:
    if (1 + dp[prev] >  dp[i]):   dp[i] = 1 + dp[prev];  cnt[i]  = cnt[prev]     inherit
    if (1 + dp[prev] == dp[i]):                          cnt[i] += cnt[prev]     accumulate

answer = sum of cnt[i] over all i with dp[i] == max(dp)`
        }</div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-na">NOT PRACTICAL</span></h3>
      </div>
      <div className="card">
        <div className="callout callout-na">
          <div className="callout-title">🚫 Why the top-down form breaks down here</div>
          <p>
            Every other problem in this part memoizes a single <code>int</code> per state. This one needs a{' '}
            <strong>pair</strong> — the best length <em>and</em> the number of ways to achieve it — and the two are
            coupled: the count is only meaningful relative to the length recorded beside it. A memoized function
            would have to return both values together (a small <code>Pair</code> class, or two parallel caches
            updated in lockstep), and the combining logic — &quot;inherit on strictly better, accumulate on
            equal&quot; — has to be replayed at every merge point rather than expressed as a single{' '}
            <code>max</code>.
          </p>
          <p>
            That is possible but strictly worse than the table: more allocation, more room for the
            inherit/accumulate mistake, and no laziness benefit, since the answer already requires visiting every
            state. <strong>The tabulated form below is the correct implementation</strong>, and saying so is the
            right answer if an interviewer asks for the recursive version.
          </p>
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int findNumberOfLIS(int[] arr) {
        int n = arr.length;

        int[] dp  = new int[n];                                  // longest chain ending at i
        int[] cnt = new int[n];                                  // how many achieve that length
        Arrays.fill(dp, 1);
        Arrays.fill(cnt, 1);

        int maxi = 1;
        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (arr[prev] < arr[i] && 1 + dp[prev] > dp[i]) {
                    dp[i]  = 1 + dp[prev];
                    cnt[i] = cnt[prev];                          // INHERIT -- longer chain found
                } else if (arr[prev] < arr[i] && 1 + dp[prev] == dp[i]) {
                    cnt[i] += cnt[prev];                         // ACCUMULATE -- equally long
                }
            }
            maxi = Math.max(maxi, dp[i]);
        }

        int nos = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == maxi) nos += cnt[i];                    // every longest chain counts
        }
        return nos;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-na">NOT POSSIBLE</span></h3>
      </div>
      <div className="card">
        <div className="callout callout-na">
          <div className="callout-title">🚫 Two full arrays, for two reasons</div>
          <ul>
            <li>
              <strong>Unbounded look-back.</strong> As throughout this part, <code>dp[i]</code> and{' '}
              <code>cnt[i]</code> consult every earlier index, so no window works.
            </li>
            <li>
              <strong>The final sum needs the whole of both arrays.</strong> The answer is a pass over all{' '}
              <code>i</code> with <code>dp[i] == maxi</code>, and <code>maxi</code> is not known until the first
              loop has finished — so neither array can be discarded as it is built.
            </li>
          </ul>
          <code>O(n)</code> is the floor and the version above sits at it.
        </div>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` arr = [1, 3, 5, 4, 7]

 i=0  a=1                                        dp=1  cnt=1
 i=1  a=3   1<3: 1+1=2 > 1  -> inherit           dp=2  cnt=1
 i=2  a=5   1<5: 1+1=2 > 1  -> inherit  cnt=1
            3<5: 1+2=3 > 2  -> inherit  cnt=1    dp=3  cnt=1
 i=3  a=4   1<4: 1+1=2 > 1  -> inherit  cnt=1
            3<4: 1+2=3 > 2  -> inherit  cnt=1    dp=3  cnt=1
            5>4: skipped
 i=4  a=7   1<7: 2 > 1 -> dp=2 cnt=1
            3<7: 3 > 2 -> dp=3 cnt=1
            5<7: 1+3=4 > 3 -> dp=4 cnt=1
            4<7: 1+3=4 == 4 -> ACCUMULATE cnt += 1    dp=4  cnt=2

 dp  = [1, 2, 3, 3, 4]        maxi = 4
 cnt = [1, 1, 1, 1, 2]

 answer = cnt[4] = 2          the chains "1,3,5,7" and "1,3,4,7"`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n²)">
          One pairwise pass, plus an <code>O(n)</code> sum.
        </CxBox>
        <CxBox label="Space" value="O(n)">Two arrays — already minimal.</CxBox>
      </Cx>

      {/* 9.1 */}
      <div id="dp9-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        State is an <strong>interval</strong> <code>(i, j)</code>, and the choice is <em>where to split it</em>. A
        loop over every cut <code>k</code> inside the interval turns the work per state from <code>O(1)</code> into{' '}
        <code>O(n)</code>, which is why this family is <code>O(n³)</code> — and why, for the first time in these
        notes, <strong>space optimization is genuinely unavailable</strong>.
      </p>
      <div className="card">
        <div className="callout callout-key">
          <div className="callout-title">🔑 The partition-DP recipe</div>
          <ol className="steps">
            <li>
              <strong>Start with the whole interval</strong> and recurse on <code>f(i, j)</code> — &quot;the best you
              can do on the segment from <code>i</code> to <code>j</code>&quot;.
            </li>
            <li>
              <strong>Try every partition point</strong> <code>k</code> from <code>i</code> to <code>j-1</code> (or{' '}
              <code>i</code> to <code>j</code>, depending on the convention the problem forces).
            </li>
            <li>
              <strong>Combine the two halves plus the cost of joining them</strong>:{' '}
              <code>f(i, k) + f(k+1, j) + costOfCombining(i, k, j)</code>. Getting that third term right{' '}
              <em>is</em> the problem — everything else is boilerplate.
            </li>
            <li>
              <strong>Take the min or max over all <code>k</code></strong>.
            </li>
          </ol>
        </div>
        <div className="callout callout-na">
          <div className="callout-title">🚫 Why no problem in 9.1–9.4 can be space optimized</div>
          <p>
            Every row reduction in these notes rests on the recurrence reaching into a <strong>fixed, nearby</strong>{' '}
            set of rows — <code>i-1</code>, or <code>i+1</code> and <code>i+2</code>. Interval DP does not:
          </p>
          <div className="recurrence">{
`dp[i][j]  reads  dp[i][k]      for every k in [i, j)      -- same row, many columns
                 and     dp[k+1][j]    for every k in [i, j)      -- many DIFFERENT rows`
          }</div>
          <p>
            The second term is the killer: as <code>k</code> sweeps the interval, <code>dp[k+1][j]</code> walks down
            an entire column of the table. There is no window of one or two rows that contains all of it, so the
            whole <code>O(n²)</code> triangle has to stay live until the end. Keeping two rows would discard values
            the very next iteration needs.
          </p>
          <p>
            So for 9.1, 9.2, 9.3 and 9.4 the <strong>tabulated version is already the space-optimal one</strong>, at{' '}
            <code>O(n²)</code>. Where a genuine improvement does exist it is a <em>constant-factor</em> one — only
            the upper triangle <code>i ≤ j</code> is ever used, so roughly half the allocation is wasted and a
            packed triangular array would halve it. That is worth saying; pretending a two-row trick exists is not.
          </p>
          <p>
            9.5 and 9.6 are the exceptions, and for a clear reason: they partition only at the{' '}
            <strong>front</strong> (<code>f(i)</code> instead of <code>f(i, j)</code>), so their state is
            one-dimensional from the start.
          </p>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Loop directions for interval tabulation</div>
          <code>dp[i][j]</code> reads <code>dp[i][k]</code> with <code>k &lt; j</code> (smaller column, same row)
          and <code>dp[k+1][j]</code> with <code>k+1 &gt; i</code> (larger row, same column). So{' '}
          <strong><code>i</code> must decrease</strong> and <strong><code>j</code> must increase</strong>. Every
          table in this part is filled with <code>i</code> running downward in the outer loop and <code>j</code>{' '}
          upward in the inner one — and <code>if (i &gt; j) continue;</code> skips the meaningless lower triangle.
        </div>
      </div>

      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">The archetype</span>
        <span className="pill">State: (i, j)</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> An array <code>arr</code> of length <code>N</code> describes <code>N-1</code>{' '}
          matrices, where matrix <code>i</code> has dimensions <code>arr[i-1] × arr[i]</code>. Multiplication is
          associative, so the product can be bracketed in many ways. Find the bracketing that minimises the total
          number of scalar multiplications.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why the state starts at 1, not 0</div>
          <p>
            Matrix <code>i</code> needs <em>two</em> array entries, <code>arr[i-1]</code> and <code>arr[i]</code>, so
            the first matrix is <code>i = 1</code> and the last is <code>i = N-1</code>. The top-level call is
            therefore <code>f(1, N-1)</code> — &quot;bracket matrices 1 through N-1&quot; — and <code>arr[0]</code>{' '}
            only ever appears as the left dimension of the first matrix. Starting at <code>0</code> is the standard
            first mistake and makes <code>arr[i-1]</code> index <code>-1</code>.
          </p>
          <div className="recurrence">{
`f(i, j):  min cost to multiply matrices i..j into one

base  i == j:   0                  a single matrix needs no multiplication

for k in [i, j):
    cost = arr[i-1] * arr[k] * arr[j]     multiply the two resulting matrices
         + f(i, k)                        bracket the left group
         + f(k+1, j)                      bracket the right group

f(i, j) = min over k of cost

answer = f(1, N-1)      states O(N^2), work O(N) each  ->  O(N^3)`
          }</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 Reading the combining cost</div>
          After bracketing <code>i..k</code> and <code>k+1..j</code>, the left group is a single matrix of size{' '}
          <code>arr[i-1] × arr[k]</code> and the right group is <code>arr[k] × arr[j]</code>. Multiplying those two
          costs <code>arr[i-1] × arr[k] × arr[j]</code> scalar operations — the shared dimension{' '}
          <code>arr[k]</code> is the one that disappears. That single product is the whole &quot;cost of
          combining&quot; for this problem.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int matrixMultiplication(int[] arr, int N) {
        int[][] dp = new int[N][N];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(1, N - 1, arr, dp);
    }

    private int f(int i, int j, int[] arr, int[][] dp) {
        if (i == j) return 0;                          // a single matrix: nothing to multiply
        if (dp[i][j] != -1) return dp[i][j];

        int mini = (int) 1e9;
        for (int k = i; k < j; k++) {                  // try every split point
            int steps = arr[i - 1] * arr[k] * arr[j]   // cost of the final multiplication
                      + f(i, k, arr, dp)               // best for the left group
                      + f(k + 1, j, arr, dp);          // best for the right group
            if (steps < mini) mini = steps;
        }
        return dp[i][j] = mini;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int matrixMultiplication(int[] arr, int N) {
        int[][] dp = new int[N][N];

        for (int i = 1; i < N; i++) dp[i][i] = 0;      // base: single matrices

        // i DOWNWARD, j UPWARD -- see the loop-direction note at the top of this part.
        for (int i = N - 1; i >= 1; i--) {
            for (int j = i + 1; j < N; j++) {
                int mini = (int) 1e9;
                for (int k = i; k < j; k++) {
                    int steps = arr[i - 1] * arr[k] * arr[j]
                              + dp[i][k]
                              + dp[k + 1][j];
                    if (steps < mini) mini = steps;
                }
                dp[i][j] = mini;
            }
        }
        return dp[1][N - 1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-na">NOT POSSIBLE</span></h3>
      </div>
      <div className="card">
        <div className="callout callout-na">
          <div className="callout-title">🚫 The recurrence walks a whole column</div>
          <p>
            <code>dp[i][j]</code> reads <code>dp[k+1][j]</code> for every <code>k</code> in <code>[i, j)</code> —
            that is rows <code>i+1</code> through <code>j</code> of column <code>j</code>, all at once. Two rows
            cannot hold them, so the full <code>O(N²)</code> table is required and the tabulated version above{' '}
            <em>is</em> the space-optimal implementation.
          </p>
          <p>
            The available wins are constant-factor: only the strict upper triangle (
            <code>1 ≤ i &lt; j &lt; N</code>) is ever written, so a packed triangular layout saves about half the
            memory, and the <code>dp[i][i] = 0</code> loop is redundant in Java since arrays start zeroed. Neither
            changes the <code>O(N²)</code> bound.
          </p>
        </div>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` arr = [10, 20, 30, 40, 50]        N = 5, so four matrices:
   M1 = 10x20   M2 = 20x30   M3 = 30x40   M4 = 40x50

 intervals of length 1:  dp[1][1] = dp[2][2] = dp[3][3] = dp[4][4] = 0

 length 2:
   dp[1][2] = 10*20*30 =  6000          (M1 M2)
   dp[2][3] = 20*30*40 = 24000          (M2 M3)
   dp[3][4] = 30*40*50 = 60000          (M3 M4)

 length 3:
   dp[1][3] = min( k=1:  10*20*40 + 0 + dp[2][3]=24000  = 8000 + 24000 = 32000
                   k=2:  10*30*40 + dp[1][2]=6000 + 0    = 12000 + 6000 = 18000 )
            = 18000                      ((M1 M2) M3)
   dp[2][4] = min( k=2:  20*30*50 + 0 + dp[3][4]=60000  = 30000 + 60000 = 90000
                   k=3:  20*40*50 + dp[2][3]=24000 + 0   = 40000 + 24000 = 64000 )
            = 64000

 length 4:
   dp[1][4] = min( k=1:  10*20*50 + 0     + dp[2][4]=64000 = 10000 + 64000 = 74000
                   k=2:  10*30*50 + 6000  + dp[3][4]=60000 = 15000 + 66000 = 81000
                   k=3:  10*40*50 + 18000 + 0              = 20000 + 18000 = 38000 )
            = 38000        <-- answer,  bracketing ((M1 M2) M3) M4`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(N³)">
          <code>O(N²)</code> intervals × <code>O(N)</code> cuts.
        </CxBox>
        <CxBox label="Space — memo" value="O(N²) + O(N)">Table plus recursion stack.</CxBox>
        <CxBox label="Space — tabulated" value="O(N²)">
          Already optimal — no row reduction exists.
        </CxBox>
      </Cx>

      {/* 9.2 */}
      <div id="dp9-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 1547</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Pad and sort the cuts</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A stick of length <code>n</code> must be cut at the positions in{' '}
          <code>cuts</code>. Cutting a piece costs the <strong>length of that piece</strong>, and the order of the
          cuts is yours to choose. Minimise the total cost.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Two preparation steps make the intervals independent</div>
          <p>
            The difficulty is that cuts are <em>not</em> independent — making one changes the lengths seen by the
            others. The fix is the classic one:
          </p>
          <ol className="steps">
            <li>
              <strong>Append <code>n</code> and prepend <code>0</code></strong> to the cuts array, so the
              stick&apos;s two ends are sentinels. A segment is then described purely by the two cut positions
              bounding it.
            </li>
            <li>
              <strong>Sort.</strong> Only then does &quot;the piece between cut <code>i-1</code> and cut{' '}
              <code>j+1</code>&quot; have length <code>cuts[j+1] - cuts[i-1]</code>, which is the cost term.
            </li>
          </ol>
          <p>
            With those in place, <code>f(i, j)</code> = minimum cost to perform all the cuts strictly inside the
            segment bounded by <code>cuts[i-1]</code> and <code>cuts[j+1]</code>, and the cuts inside the left and
            right halves become genuinely independent subproblems.
          </p>
          <div className="recurrence">{
`base  i > j:   0        no cuts left in this segment

for ind in [i, j]:
    cost = cuts[j+1] - cuts[i-1]          the length of the piece being cut NOW
         + f(i, ind-1)                    cuts to the left of ind
         + f(ind+1, j)                    cuts to the right of ind

f(i, j) = min over ind of cost

answer = f(1, c)          where c = cuts.length before padding`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ Why the cost is the <em>whole</em> segment, not the half
          </div>
          Think of <code>ind</code> as the cut made <strong>first</strong> in this segment. At that moment the piece
          is still intact, so it costs <code>cuts[j+1] - cuts[i-1]</code> — the full width. Only afterwards does it
          fall into two independent pieces. Reading <code>ind</code> as the last cut instead gives a recurrence that
          does not decompose, which is the usual reason this problem fails to come out.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int cost(int n, int c, int[] cuts) {
        // Pad with the two stick ends, then sort: cutsPadded = [0, ...cuts..., n]
        int[] a = new int[c + 2];
        a[0] = 0;
        a[c + 1] = n;
        for (int i = 0; i < c; i++) a[i + 1] = cuts[i];
        Arrays.sort(a);

        int[][] dp = new int[c + 1][c + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(1, c, a, dp);
    }

    private int f(int i, int j, int[] cuts, int[][] dp) {
        if (i > j) return 0;                           // no cuts inside this segment
        if (dp[i][j] != -1) return dp[i][j];

        int mini = (int) 1e9;
        for (int ind = i; ind <= j; ind++) {           // which cut do we make FIRST?
            int c = cuts[j + 1] - cuts[i - 1]          // the piece is still whole: full length
                  + f(i, ind - 1, cuts, dp)
                  + f(ind + 1, j, cuts, dp);
            mini = Math.min(mini, c);
        }
        return dp[i][j] = mini;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int cost(int n, int c, int[] cuts) {
        int[] a = new int[c + 2];
        a[0] = 0;
        a[c + 1] = n;
        for (int i = 0; i < c; i++) a[i + 1] = cuts[i];
        Arrays.sort(a);

        // c+2 rows so that dp[ind+1][j] is in range when ind == c.
        int[][] dp = new int[c + 2][c + 2];

        for (int i = c; i >= 1; i--) {                 // i DOWNWARD
            for (int j = 1; j <= c; j++) {             // j UPWARD
                if (i > j) continue;                   // the lower triangle is meaningless

                int mini = (int) 1e9;
                for (int ind = i; ind <= j; ind++) {
                    int cst = a[j + 1] - a[i - 1]
                            + dp[i][ind - 1]
                            + dp[ind + 1][j];
                    mini = Math.min(mini, cst);
                }
                dp[i][j] = mini;
            }
        }
        return dp[1][c];
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 Why the table is <code>[c+2][c+2]</code>
        </div>
        The recurrence reads <code>dp[i][ind-1]</code> with <code>ind = i</code> (so column <code>i-1</code>, down to{' '}
        <code>0</code>) and <code>dp[ind+1][j]</code> with <code>ind = j = c</code> (so row <code>c+1</code>). Both
        of those are outside a <code>[c+1][c+1]</code> table. Sizing it <code>[c+2][c+2]</code> gives those reads a
        legitimate all-zero home, which is exactly the <code>i &gt; j → 0</code> base case.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-na">NOT POSSIBLE</span></h3>
      </div>
      <div className="card">
        <div className="callout callout-na">
          <div className="callout-title">🚫 Same structural reason as 9.1</div>
          <code>dp[ind+1][j]</code> sweeps rows <code>i+1</code> through <code>j+1</code> as <code>ind</code>{' '}
          varies, so an entire column is live at every step. No two-row window contains it, and the{' '}
          <code>O(c²)</code> table is the floor. The tabulated version above is the space-optimal one; the only
          reduction available is packing the upper triangle, a constant factor of about two.
        </div>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` n = 7,  cuts = [1, 3, 4, 5]        padded and sorted: [0, 1, 3, 4, 5, 7]
                                     indices:            0  1  2  3  4  5

 f(1, 4) tries each cut first; the winning order is 3, then 5, then 1, then 4:

   cut at 3 first:  piece [0,7] costs 7        -> pieces [0,3] and [3,7]
   cut at 5:        piece [3,7] costs 4        -> pieces [3,5] and [5,7]
   cut at 1:        piece [0,3] costs 3        -> pieces [0,1] and [1,3]
   cut at 4:        piece [3,5] costs 2

 total = 7 + 4 + 3 + 2 = 16        <-- answer

 compare a naive left-to-right order 1, 3, 4, 5:
   7 (cut 1) + 6 (cut 3 in [1,7]) + 4 (cut 4 in [3,7]) + 3 (cut 5 in [4,7]) = 20
 so the order genuinely matters, which is what the DP is searching over`
      }</pre>

      {/* 9.3 */}
      <div id="dp9-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 312</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Think last, not first</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Bursting balloon <code>i</code> earns{' '}
          <code>a[i-1] × a[i] × a[i+1]</code>, where the neighbours are the balloons still <em>present</em> at that
          moment (out-of-range neighbours count as <code>1</code>). Burst all of them in some order to maximise the
          total.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Choose which balloon is burst <em>last</em>, not first
          </div>
          <p>
            This is the one genuine insight in the problem, and it is the mirror image of 9.2. Picking the{' '}
            <strong>first</strong> balloon does not decompose: after it pops, the two sides become adjacent and their
            future earnings depend on each other. Picking the <strong>last</strong> balloon <code>ind</code> in a
            segment does decompose — at that moment everything else in the segment is already gone, so its
            neighbours are exactly the segment&apos;s boundaries <code>a[i-1]</code> and <code>a[j+1]</code>, which
            never change.
          </p>
          <div className="recurrence">{
`base  i > j:   0

for ind in [i, j]:                        ind is burst LAST in this segment
    cost = a[i-1] * a[ind] * a[j+1]       its neighbours are the fixed boundaries
         + f(i, ind-1)                    everything left of it, burst earlier
         + f(ind+1, j)                    everything right of it, burst earlier

f(i, j) = max over ind of cost

answer = f(1, n)       after padding a with 1 at both ends`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ Pad with <code>1</code>, and do not mutate the caller&apos;s array
          </div>
          The <code>a[i-1]</code> and <code>a[j+1]</code> reads need sentinels, and they must be <code>1</code> — the
          multiplicative identity — so that a boundary contributes nothing. Build a fresh padded array rather than
          inserting into the input in place, both for clarity and because a caller may reuse the original.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length;

        // Pad with 1 at both ends: a = [1, ...nums..., 1]
        int[] a = new int[n + 2];
        a[0] = 1;
        a[n + 1] = 1;
        for (int i = 0; i < n; i++) a[i + 1] = nums[i];

        int[][] dp = new int[n + 1][n + 1];
        for (int[] row : dp) Arrays.fill(row, -1);
        return f(1, n, a, dp);
    }

    private int f(int i, int j, int[] a, int[][] dp) {
        if (i > j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int maxi = Integer.MIN_VALUE;
        for (int ind = i; ind <= j; ind++) {           // ind is burst LAST
            int cost = a[i - 1] * a[ind] * a[j + 1]    // neighbours are the fixed boundaries
                     + f(i, ind - 1, a, dp)
                     + f(ind + 1, j, a, dp);
            maxi = Math.max(maxi, cost);
        }
        return dp[i][j] = maxi;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length;

        int[] a = new int[n + 2];
        a[0] = 1;
        a[n + 1] = 1;
        for (int i = 0; i < n; i++) a[i + 1] = nums[i];

        // n+2 rows so dp[ind+1][j] is in range when ind == n.
        int[][] dp = new int[n + 2][n + 2];

        for (int i = n; i >= 1; i--) {                 // i DOWNWARD
            for (int j = 1; j <= n; j++) {             // j UPWARD
                if (i > j) continue;

                int maxi = Integer.MIN_VALUE;
                for (int ind = i; ind <= j; ind++) {
                    int cost = a[i - 1] * a[ind] * a[j + 1]
                             + dp[i][ind - 1]
                             + dp[ind + 1][j];
                    maxi = Math.max(maxi, cost);
                }
                dp[i][j] = maxi;
            }
        }
        return dp[1][n];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-na">NOT POSSIBLE</span></h3>
      </div>
      <div className="card">
        <div className="callout callout-na">
          <div className="callout-title">🚫 Interval DP again — the column is live</div>
          <code>dp[ind+1][j]</code> ranges over rows <code>i+1 .. j+1</code> for a single <code>(i, j)</code>, so the
          table cannot be reduced to a window. <code>O(n²)</code> is the floor and the tabulation above achieves it.
          Note also that a <em>greedy</em> &quot;burst the smallest balloon first&quot; heuristic is wrong here — the
          whole reason the problem is hard is that local choices reshape the neighbourhood, which is precisely what
          the burst-last reformulation removes.
        </div>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` nums = [3, 1, 5, 8]        padded: a = [1, 3, 1, 5, 8, 1]
                            indices:     0  1  2  3  4  5

 the optimal order is 1, then 5, then 3, then 8:

   burst a[2]=1  last-in-segment [2,2]:   3 * 1 * 5  = 15
   burst a[3]=5  with neighbours 3 and 8:  3 * 5 * 8 = 120
   burst a[1]=3  with neighbours 1 and 8:  1 * 3 * 8 = 24
   burst a[4]=8  with neighbours 1 and 1:  1 * 8 * 1 = 8

 total = 15 + 120 + 24 + 8 = 167        <-- answer (LeetCode 312's example)

 the DP finds this by asking, for the whole segment [1,4], which balloon is burst
 LAST: the winner is a[4]=8, contributing 1*8*1 plus the best of [1,3]`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n³)">
          <code>O(n²)</code> intervals × <code>O(n)</code> choices of last.
        </CxBox>
        <CxBox label="Space — memo" value="O(n²) + O(n)">Table plus stack.</CxBox>
        <CxBox label="Space — tabulated" value="O(n²)">Already optimal.</CxBox>
      </Cx>

      {/* 9.4 */}
      <div id="dp9-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">3D partition DP</span>
        <span className="pill">Count both truth values</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> An expression string alternates operands <code>T</code> / <code>F</code> with
          operators <code>&amp;</code>, <code>|</code>, <code>^</code> — for example <code>T|T&amp;F^T</code>. Count
          the ways to parenthesise it so that it evaluates to <strong>true</strong>, modulo{' '}
          <code>10^9 + 7</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Counting &quot;true&quot; requires also counting &quot;false&quot;</div>
          <p>
            Split at an operator and the left and right halves each have <em>two</em> counts — ways to be true and
            ways to be false. An <code>&amp;</code> needs both sides true; an <code>|</code> becoming false needs
            both sides false; <code>^</code> mixes them. So the number of false parenthesisations is not derivable
            from the number of true ones without recomputing, and the state must carry which value is wanted:{' '}
            <code>(i, j, isTrue)</code>.
          </p>
          <div className="recurrence">{
`base  i > j:    0
base  i == j:   isTrue ? (exp[i] == 'T') : (exp[i] == 'F')      a single operand

ind steps over OPERATORS only: i+1, i+3, i+5, ...     (operands sit at even offsets)

lT = f(i, ind-1, true)    lF = f(i, ind-1, false)
rT = f(ind+1, j, true)    rF = f(ind+1, j, false)

'&' and want true:   lT*rT
'&' and want false:  lT*rF + lF*rT + lF*rF
'|' and want true:   lT*rT + lT*rF + lF*rT
'|' and want false:  lF*rF
'^' and want true:   lT*rF + lF*rT
'^' and want false:  lT*rT + lF*rF

answer = f(0, n-1, true)       states O(n^2 * 2), work O(n)  ->  O(n^3)`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Three details that decide whether this works</div>
          <ul>
            <li>
              <strong><code>ind += 2</code>, starting at <code>i + 1</code>.</strong> Operands occupy the even
              positions and operators the odd ones, so stepping by one would try to split at an operand and read
              garbage. The loop runs <code>ind = i+1; ind &lt;= j-1; ind += 2</code>.
            </li>
            <li>
              <strong>Multiply in <code>long</code>, reduce with <code>% MOD</code>.</strong> Two counts each under{' '}
              <code>10^9</code> multiply to <code>10^18</code>, which overflows <code>int</code> immediately and even
              approaches the edge of <code>long</code>. Reduce after every product.
            </li>
            <li>
              <strong>
                The <code>isTrue</code> dimension is <code>2</code>, and it is indexed by <code>0</code> /{' '}
                <code>1</code>.
              </strong>{' '}
              Passing a boolean and indexing <code>dp[i][j][isTrue ? 1 : 0]</code> keeps that explicit.
            </li>
          </ul>
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final long MOD = 1000000007L;

    public int evaluateExp(String exp) {
        int n = exp.length();
        long[][][] dp = new long[n][n][2];
        for (long[][] plane : dp)
            for (long[] row : plane) Arrays.fill(row, -1L);

        return (int) f(0, n - 1, 1, exp, dp);
    }

    private long f(int i, int j, int isTrue, String exp, long[][][] dp) {
        if (i > j) return 0;
        if (i == j) {                                  // a single operand
            if (isTrue == 1) return exp.charAt(i) == 'T' ? 1 : 0;
            return exp.charAt(i) == 'F' ? 1 : 0;
        }
        if (dp[i][j][isTrue] != -1) return dp[i][j][isTrue];

        long ways = 0;
        for (int ind = i + 1; ind <= j - 1; ind += 2) {          // operators only
            long lT = f(i, ind - 1, 1, exp, dp);
            long lF = f(i, ind - 1, 0, exp, dp);
            long rT = f(ind + 1, j, 1, exp, dp);
            long rF = f(ind + 1, j, 0, exp, dp);

            char op = exp.charAt(ind);
            if (op == '&') {
                if (isTrue == 1) ways = (ways + (lT * rT) % MOD) % MOD;
                else ways = (ways + (lT * rF) % MOD + (lF * rT) % MOD + (lF * rF) % MOD) % MOD;
            } else if (op == '|') {
                if (isTrue == 1)
                    ways = (ways + (lT * rT) % MOD + (lT * rF) % MOD + (lF * rT) % MOD) % MOD;
                else ways = (ways + (lF * rF) % MOD) % MOD;
            } else {                                   // '^' : T^T=F, T^F=T, F^T=T, F^F=F
                if (isTrue == 1) ways = (ways + (lT * rF) % MOD + (lF * rT) % MOD) % MOD;
                else ways = (ways + (lT * rT) % MOD + (lF * rF) % MOD) % MOD;
            }
        }
        return dp[i][j][isTrue] = ways;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    private static final long MOD = 1000000007L;

    public int evaluateExp(String exp) {
        int n = exp.length();
        long[][][] dp = new long[n + 1][n + 1][2];

        // Base: single operands, on the diagonal.
        for (int i = 0; i < n; i++) {
            dp[i][i][1] = exp.charAt(i) == 'T' ? 1 : 0;
            dp[i][i][0] = exp.charAt(i) == 'F' ? 1 : 0;
        }

        for (int i = n - 1; i >= 0; i--) {             // i DOWNWARD
            for (int j = i + 1; j < n; j++) {          // j UPWARD, skipping the diagonal
                for (int isTrue = 0; isTrue <= 1; isTrue++) {

                    long ways = 0;
                    for (int ind = i + 1; ind <= j - 1; ind += 2) {
                        long lT = dp[i][ind - 1][1];
                        long lF = dp[i][ind - 1][0];
                        long rT = dp[ind + 1][j][1];
                        long rF = dp[ind + 1][j][0];

                        char op = exp.charAt(ind);
                        if (op == '&') {
                            if (isTrue == 1) ways = (ways + (lT * rT) % MOD) % MOD;
                            else ways = (ways + (lT * rF) % MOD + (lF * rT) % MOD
                                              + (lF * rF) % MOD) % MOD;
                        } else if (op == '|') {
                            if (isTrue == 1) ways = (ways + (lT * rT) % MOD + (lT * rF) % MOD
                                                          + (lF * rT) % MOD) % MOD;
                            else ways = (ways + (lF * rF) % MOD) % MOD;
                        } else {
                            if (isTrue == 1) ways = (ways + (lT * rF) % MOD
                                                          + (lF * rT) % MOD) % MOD;
                            else ways = (ways + (lT * rT) % MOD + (lF * rF) % MOD) % MOD;
                        }
                    }
                    dp[i][j][isTrue] = ways;
                }
            }
        }
        return (int) dp[0][n - 1][1];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-na">NOT POSSIBLE</span></h3>
      </div>
      <div className="card">
        <div className="callout callout-na">
          <div className="callout-title">🚫 Interval DP, and now three dimensions of it</div>
          <p>
            The same obstruction as 9.1–9.3, one dimension worse: <code>dp[ind+1][j][*]</code> walks down a whole
            column as <code>ind</code> steps through the operators, so every row must stay live. The table is{' '}
            <code>O(n²)</code> — the <code>isTrue</code> dimension is a constant <code>2</code> and does not affect
            the order — and that is the floor.
          </p>
          <p>
            The available savings are again constant-factor: only the upper triangle is used, and only cells where{' '}
            <code>j - i</code> is <strong>even</strong> are ever reachable (a valid sub-expression always spans an odd
            number of characters, starting and ending on an operand). Roughly three quarters of the allocated cube is
            therefore dead weight, but removing it does not change <code>O(n²)</code>.
          </p>
        </div>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` exp = "T|T&F^T"        n = 7
 index:  0123456          operands at 0,2,4,6   operators at 1,3,5

 there are 5 ways to parenthesise, and 4 of them evaluate to true:

   ((T|T)&F)^T   =  (T&F)^T   = F^T = T     ok
   (T|(T&F))^T   =  (T|F)^T   = T^T = F     no
   (T|T)&(F^T)   =  T&T       = T           ok
   T|((T&F)^T)   =  T|(F^T)   = T|T = T     ok
   T|(T&(F^T))   =  T|(T&T)  = T|T = T      ok

 answer = 4

 the DP reaches this by splitting at each of the three operators in turn and
 multiplying the left and right counts under the operator's truth table`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n³)">
          <code>O(n²)</code> intervals × <code>O(n)</code> split points.
        </CxBox>
        <CxBox label="Space — memo" value="O(n²)">
          Times the constant 2, plus an <code>O(n)</code> stack.
        </CxBox>
        <CxBox label="Space — tabulated" value="O(n²)">Already optimal.</CxBox>
      </Cx>

      {/* 9.5 */}
      <div id="dp9-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 132</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Front partition → 1D state</span>
        <span className="pill">The −1 at the end</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Cut the string into pieces that are all palindromes, using the{' '}
          <strong>minimum number of cuts</strong>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Partition at the front, and the state collapses to one index</div>
          <p>
            Instead of an interval, ask: &quot;starting at <code>i</code>, how few pieces can cover the rest?&quot;
            Try every <code>j ≥ i</code> such that <code>s[i..j]</code> is a palindrome, count that as one piece, and
            recurse from <code>j+1</code>. The right end is always the end of the string, so <code>j</code> never
            needs to be part of the state — <strong>the state is just <code>(i)</code></strong>, which is why this
            problem is <code>O(n)</code> space where 9.1–9.4 are <code>O(n²)</code>.
          </p>
          <div className="recurrence">{
`base  i == n:   0

for j in [i, n):
    if (isPalindrome(i, j)):
        cost = 1 + f(j+1)                  one piece, then the rest

f(i) = min over j of cost

answer = f(0) - 1          <-- f counts PIECES; cuts = pieces - 1`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ The <code>- 1</code> is the whole trick of the return statement
          </div>
          <code>f(0)</code> counts the number of <em>pieces</em>, because every accepted palindrome adds{' '}
          <code>1</code>. The question asks for the number of <em>cuts</em>, and <code>k</code> pieces need{' '}
          <code>k - 1</code> cuts. Dropping the <code>-1</code> gives an answer that is consistently one too large.
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 The palindrome check, and how to stop it dominating</div>
          <p>
            As written, <code>isPalindrome(i, j)</code> is an <code>O(n)</code> two-pointer scan inside two nested
            loops, giving <code>O(n³)</code> overall — which passes the usual constraints. To reach{' '}
            <code>O(n²)</code>, precompute a <code>boolean[n][n]</code> palindrome table first —{' '}
            <code>pal[i][j]</code> is true when <code>s[i] == s[j] &amp;&amp; (j - i &lt; 2 || pal[i+1][j-1])</code>{' '}
            — and then each check is <code>O(1)</code>. Worth mentioning as the follow-up; note that it{' '}
            <em>adds</em> <code>O(n²)</code> space, so it trades the very thing this problem was economical about.
          </p>
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int palindromePartitioning(String str) {
        int n = str.length();
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        return f(0, n, str, dp) - 1;                   // pieces -> cuts
    }

    private int f(int i, int n, String str, int[] dp) {
        if (i == n) return 0;                          // nothing left to partition
        if (dp[i] != -1) return dp[i];

        int minCost = Integer.MAX_VALUE;
        for (int j = i; j < n; j++) {                  // the piece is str[i..j]
            if (isPalindrome(i, j, str)) {
                int cost = 1 + f(j + 1, n, str, dp);
                minCost = Math.min(minCost, cost);
            }
        }
        return dp[i] = minCost;
    }

    private boolean isPalindrome(int i, int j, String s) {
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) return false;
            i++;
            j--;
        }
        return true;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 <code>Integer.MAX_VALUE</code> is safe here — check why
        </div>
        <code>minCost</code> starts at <code>MAX_VALUE</code> but is never added to: the <code>1 +</code> is applied
        to <code>f(j+1)</code>, not to the sentinel. And the loop always finds at least one palindrome — the single
        character <code>s[i..i]</code> — so <code>minCost</code> is always overwritten before being returned. Both
        facts are needed; remove either and <code>MAX_VALUE</code> would leak into an arithmetic expression.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int palindromePartitioning(String str) {
        int n = str.length();
        int[] dp = new int[n + 1];                     // dp[n] = 0 is the base case
        dp[n] = 0;

        for (int i = n - 1; i >= 0; i--) {             // BACKWARD: dp[i] reads dp[j+1], j >= i
            int minCost = Integer.MAX_VALUE;
            for (int j = i; j < n; j++) {
                if (isPalindrome(i, j, str)) {
                    int cost = 1 + dp[j + 1];
                    minCost = Math.min(minCost, cost);
                }
            }
            dp[i] = minCost;
        }
        return dp[0] - 1;
    }

    private boolean isPalindrome(int i, int j, String s) {
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) return false;
            i++;
            j--;
        }
        return true;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-na">ALREADY OPTIMAL</span></h3>
      </div>
      <div className="card">
        <div className="callout callout-na">
          <div className="callout-title">
            🚫 <code>O(n)</code> is the floor, for the familiar reason
          </div>
          <p>
            <code>dp[i]</code> reads <code>dp[j+1]</code> for <strong>every</strong> <code>j</code> from{' '}
            <code>i</code> to <code>n-1</code> — that is the entire remaining array, not a bounded window. So no
            scalar or fixed-size buffer can replace it, exactly as in the LIS family (Part 8). The <code>O(n)</code>{' '}
            tabulation above is the space-optimal implementation.
          </p>
          <p>
            Contrast this with 9.6, the next section: there the piece length is capped at <code>k</code>, so the
            look-ahead <em>is</em> bounded and a genuine reduction to <code>O(k)</code> exists. The cap is what makes
            the difference.
          </p>
        </div>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` a small example: str = "aab"

   dp[3] = 0                       (empty tail)
   dp[2] = "b" is a palindrome     -> 1 + dp[3] = 1
   dp[1] = "a"  -> 1 + dp[2] = 2
           "ab" not a palindrome
                                   -> dp[1] = 2
   dp[0] = "a"   -> 1 + dp[1] = 3
           "aa"  -> 1 + dp[2] = 2
           "aab" not a palindrome
                                   -> dp[0] = 2      pieces: "aa" and "b"

 answer = dp[0] - 1 = 1 cut`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n³)">
          <code>O(n²)</code> with a precomputed palindrome table.
        </CxBox>
        <CxBox label="Space — memo" value="O(n) + O(n)">Array plus recursion stack.</CxBox>
        <CxBox label="Space — tabulated" value="O(n)">Already optimal, no stack.</CxBox>
      </Cx>

      {/* 9.6 */}
      <div id="dp9-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 1043</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Front partition, capped at <code>k</code></span>
        <span className="pill">Space optimizable</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Split the array into contiguous subarrays of length{' '}
          <strong>at most <code>k</code></strong>. Every element of a subarray is then replaced by that
          subarray&apos;s maximum. Maximise the sum of the resulting array.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Grow the piece and track its maximum as you go</div>
          <p>
            Front partition again, so the state is <code>(ind)</code>. For each starting point, extend the piece one
            element at a time up to <code>k</code>, maintaining the running <code>len</code> and running{' '}
            <code>maxi</code>. A piece of length <code>len</code> whose maximum is <code>maxi</code> contributes{' '}
            <code>len × maxi</code>.
          </p>
          <div className="recurrence">{
`base  ind == n:   0

len = 0;  maxi = -infinity
for j in [ind, min(ind+k, n)):
    len++
    maxi = max(maxi, num[j])
    sum = len * maxi + f(j+1)

f(ind) = max over j of sum

answer = f(0)         states O(n), work O(k)  ->  O(n*k)`
          }</div>
          <p>
            Recomputing the maximum from scratch for each candidate length would add a factor of <code>k</code>;
            carrying it in the loop variable is what keeps the work <code>O(k)</code> per state.
          </p>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ <code>min(ind + k, n)</code>, not <code>ind + k</code>
          </div>
          Near the end of the array, a piece of the full length <code>k</code> would run past the last element. The
          bound <code>j &lt; Math.min(ind + k, n)</code> is what stops it, and it is the only place the array length
          enters the inner loop. Both <code>len</code> and <code>maxi</code> must also be reset at the top of each
          state, not hoisted out of the outer loop.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumSubarray(int[] num, int k) {
        int n = num.length;
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        return f(0, num, k, dp);
    }

    private int f(int ind, int[] num, int k, int[] dp) {
        int n = num.length;
        if (ind == n) return 0;
        if (dp[ind] != -1) return dp[ind];

        int len = 0;
        int maxi = Integer.MIN_VALUE;
        int maxAns = Integer.MIN_VALUE;

        for (int j = ind; j < Math.min(ind + k, n); j++) {
            len++;
            maxi = Math.max(maxi, num[j]);             // running max of the growing piece
            int sum = len * maxi + f(j + 1, num, k, dp);
            maxAns = Math.max(maxAns, sum);
        }
        return dp[ind] = maxAns;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int maximumSubarray(int[] num, int k) {
        int n = num.length;
        int[] dp = new int[n + 1];                     // dp[n] = 0 is the base case

        for (int ind = n - 1; ind >= 0; ind--) {       // BACKWARD: dp[ind] reads dp[j+1]
            int len = 0;
            int maxi = Integer.MIN_VALUE;
            int maxAns = Integer.MIN_VALUE;

            for (int j = ind; j < Math.min(ind + k, n); j++) {
                len++;
                maxi = Math.max(maxi, num[j]);
                int sum = len * maxi + dp[j + 1];
                maxAns = Math.max(maxAns, sum);
            }
            dp[ind] = maxAns;
        }
        return dp[0];
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(k) SPACE</span></h3>
      </div>
      <div className="card">
        <p>
          Unlike every other problem in this part, the look-ahead here is <strong>bounded</strong>:{' '}
          <code>dp[ind]</code> reads only <code>dp[ind+1] .. dp[ind+k]</code>. That is a window of <code>k</code>, so
          a <strong>circular buffer of size <code>k+1</code></strong> holds exactly the live values — the same trick
          as Frog Jump with K Distances (2.4), applied to a forward-looking recurrence instead of a backward-looking
          one.
        </p>
      </div>
      <Code>{
`class Solution {
    public int maximumSubarray(int[] num, int k) {
        int n = num.length;

        // ring[x % (k+1)] holds dp[x]; only dp[ind+1..ind+k] can ever be read again.
        int size = k + 1;
        int[] ring = new int[size];
        ring[n % size] = 0;                            // dp[n] = 0

        for (int ind = n - 1; ind >= 0; ind--) {
            int len = 0;
            int maxi = Integer.MIN_VALUE;
            int maxAns = Integer.MIN_VALUE;

            for (int j = ind; j < Math.min(ind + k, n); j++) {
                len++;
                maxi = Math.max(maxi, num[j]);
                int sum = len * maxi + ring[(j + 1) % size];
                maxAns = Math.max(maxAns, sum);
            }
            ring[ind % size] = maxAns;                 // overwrites dp[ind+k+1], now dead
        }
        return ring[0];                                // dp[0], and 0 % size == 0
    }
}`
      }</Code>

      <div className="callout callout-key">
        <div className="callout-title">
          🔑 Why the buffer needs <code>k+1</code> slots, not <code>k</code>
        </div>
        While computing <code>dp[ind]</code> the live set is <code>dp[ind+1] .. dp[ind+k]</code> — <code>k</code>{' '}
        values — but the <em>result</em> <code>dp[ind]</code> also needs a home before <code>dp[ind+k]</code>{' '}
        becomes dead. With only <code>k</code> slots the write to <code>ring[ind % k]</code> would land on{' '}
        <code>dp[ind+k]</code>, which the current state may not have finished reading. One extra slot separates the
        write from the oldest live read.
        <p>
          This is the same off-by-one that makes a ring buffer for a sliding window of size <code>w</code> need{' '}
          <code>w+1</code> cells whenever the new value is produced before the oldest is retired.
        </p>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` num = [1, 15, 7, 9, 2, 5, 10],  k = 3        answer = 84

 filling dp backwards (dp[7] = 0):

  dp[6]: piece [10]            -> 1*10 + dp[7]=0  = 10
  dp[5]: [5]      -> 1*5  + dp[6]=10 = 15
         [5,10]   -> 2*10 + dp[7]=0  = 20         -> dp[5] = 20
  dp[4]: [2]      -> 1*2  + 20 = 22
         [2,5]    -> 2*5  + 10 = 20
         [2,5,10] -> 3*10 + 0  = 30               -> dp[4] = 30
  dp[3]: [9]      -> 1*9  + 30 = 39
         [9,2]    -> 2*9  + 20 = 38
         [9,2,5]  -> 3*9  + 10 = 37               -> dp[3] = 39
  dp[2]: [7]      -> 1*7  + 39 = 46
         [7,9]    -> 2*9  + 30 = 48
         [7,9,2]  -> 3*9  + 20 = 47               -> dp[2] = 48
  dp[1]: [15]       -> 1*15 + 48 = 63
         [15,7]     -> 2*15 + 39 = 69
         [15,7,9]   -> 3*15 + 30 = 75             -> dp[1] = 75
  dp[0]: [1]        -> 1*1  + 75 = 76
         [1,15]     -> 2*15 + 48 = 78
         [1,15,7]   -> 3*15 + 39 = 84             -> dp[0] = 84

 answer = 84       pieces [1,15,7] -> 45,  [9] -> 9,  [2,5,10] -> 30`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n·k)">
          <code>n</code> states, <code>k</code> piece lengths each.
        </CxBox>
        <CxBox label="Space — memo / tab" value="O(n)">
          Plus an <code>O(n)</code> stack when memoized.
        </CxBox>
        <CxBox label="Space — optimized" value="O(k)">
          Circular buffer — a real win when <code>k &lt;&lt; n</code>.
        </CxBox>
      </Cx>

      {/* 10.1 */}
      <div id="dp10-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        Two problems about blocks of <code>1</code>s in a binary matrix. Both hinge on the same reframing — make the
        cell&apos;s value describe the shape <strong>ending at</strong> that cell — but they reach it by different
        routes: one is pure DP, the other leans on a monotonic stack.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 85</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill pill-topic">Different topic: Monotonic Stack</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> In a binary matrix, find the area of the largest <strong>rectangle</strong>{' '}
          consisting only of <code>1</code>s.
        </p>
        <div className="callout callout-topic">
          <div className="callout-title">
            🟣 This problem is solved by a different topic: Largest Rectangle in a Histogram
          </div>
          <p>
            Only a thin slice of this is dynamic programming. The solution has two halves, and the interesting one
            belongs to the <strong>stack</strong> topic:
          </p>
          <ol className="steps">
            <li>
              <strong>The DP half (one line).</strong> Sweep the rows top to bottom keeping a <code>height[]</code>{' '}
              array: <code>height[j]++</code> when <code>mat[i][j] == 1</code>, and <code>height[j] = 0</code> when
              it is <code>0</code>. After row <code>i</code>, <code>height[j]</code> is the number of consecutive{' '}
              <code>1</code>s ending at row <code>i</code> in column <code>j</code> — the same &quot;value describes
              the run ending here&quot; idea as Longest Common Substring (6.3). The reset to <code>0</code> is what
              makes it a recurrence rather than a running total.
            </li>
            <li>
              <strong>The stack half (the real work).</strong> Each row&apos;s <code>height[]</code> is a histogram,
              and the largest all-<code>1</code>s rectangle whose bottom edge sits on row <code>i</code> is the
              largest rectangle in that histogram. That subproblem is solved with a{' '}
              <strong>monotonic stack</strong> in <code>O(m)</code> — not with DP.
            </li>
          </ol>
          <p>So the three-approach treatment does not apply here, and it is worth being precise about why:</p>
          <ul>
            <li>
              <strong>No memoization.</strong> The histogram routine is not a recurrence over subproblems — it is a
              single pass maintaining a stack of indices. There are no overlapping subproblems to cache.
            </li>
            <li>
              <strong>No tabulation / space optimization beyond what is written.</strong> The one DP component,{' '}
              <code>height[]</code>, is already a single <code>O(m)</code> row reused across all <code>n</code> rows
              — it <em>is</em> the space-optimized form, and there is no <code>n × m</code> table to reduce.
            </li>
          </ul>
        </div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 How the monotonic stack finds every rectangle</div>
          <p>
            Keep a stack of bar indices whose heights are <strong>increasing</strong>. When a bar shorter than the
            stack top arrives, the bar on top can extend no further right — so pop it and settle its rectangle:
          </p>
          <ul>
            <li><strong>height</strong> = the popped bar&apos;s own height.</li>
            <li>
              <strong>width</strong> = <code>i - stack.peek() - 1</code>, the span between the new left boundary (the
              next shorter bar to the left, now on top) and the current index. When the stack empties, the bar
              extended all the way to the left edge, so the width is <code>i</code>.
            </li>
          </ul>
          <p>
            The sentinel iteration <code>i == n</code> forces every remaining bar to be popped and settled. Each
            index is pushed and popped at most once, which is why the whole scan is <code>O(m)</code> despite the
            inner <code>while</code>.
          </p>
        </div>
        <pre className="diagram">{
` mat                          height[] after each row      best rectangle ending on that row
   1 0 1 0 0                    1 0 1 0 0                   area 1
   1 0 1 1 1                    2 0 2 1 1                   area 3   (the 2,1,1 run -> 1x3)
   1 1 1 1 1                    3 1 3 2 2                   area 6   <-- 2 high x 3 wide
   1 0 0 1 0                    4 0 0 3 0                   area 4

 answer = 6

 reading row 2's histogram [3, 1, 3, 2, 2]: the bars 3, 2, 2 at columns 2..4 all
 reach height 2 or more, giving 2 x 3 = 6`
        }</pre>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public int maximalAreaOfSubMatrixOfAll1(int[][] mat, int n, int m) {
        int maxArea = 0;
        int[] height = new int[m];                     // consecutive 1s ending at this row

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (mat[i][j] == 1) height[j]++;       // the column's run grows
                else                height[j] = 0;     // a zero breaks it -- reset
            }
            int area = largestRectangleArea(height);   // the row as a histogram
            maxArea = Math.max(area, maxArea);
        }
        return maxArea;
    }

    // ── Largest Rectangle in a Histogram -- monotonic stack, O(m) ──
    private int largestRectangleArea(int[] histo) {
        Deque<Integer> st = new ArrayDeque<>();        // indices, heights increasing
        int maxA = 0;
        int n = histo.length;

        for (int i = 0; i <= n; i++) {                 // i == n is the flush sentinel
            while (!st.isEmpty() && (i == n || histo[st.peek()] >= histo[i])) {
                int height = histo[st.peek()];
                st.pop();

                int width;
                if (st.isEmpty()) width = i;           // extended to the left edge
                else               width = i - st.peek() - 1;

                maxA = Math.max(maxA, width * height);
            }
            st.push(i);
        }
        return maxA;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Three details that make or break the stack routine</div>
        <ul>
          <li>
            <strong>
              The loop runs to <code>i ≤ n</code>, not <code>i &lt; n</code>.
            </strong>{' '}
            The extra iteration is a virtual bar of height <code>0</code> that drains the stack. Without it, any bars
            still stacked at the end — which is always the case for a non-decreasing histogram — are never settled
            and their rectangles are missed entirely.
          </li>
          <li>
            <strong>
              <code>width = i - st.peek() - 1</code> after the pop, not before.
            </strong>{' '}
            The left boundary is the <em>next</em> element on the stack, which only becomes visible once the popped
            index is gone. Reading <code>peek()</code> first gives the popped bar&apos;s own index and a width of{' '}
            <code>-1</code>.
          </li>
          <li>
            <strong>
              <code>ArrayDeque</code>, not <code>java.util.Stack</code>.
            </strong>{' '}
            The legacy <code>Stack</code> is synchronised and slower; <code>ArrayDeque</code> is the standard modern
            choice, with <code>push</code> / <code>pop</code> / <code>peek</code> operating on the head.
          </li>
        </ul>
      </div>

      <Cx>
        <CxBox label="Time" value="O(n·m)">
          <code>n</code> rows, each an <code>O(m)</code> stack pass.
        </CxBox>
        <CxBox label="Space" value="O(m)">
          One height row plus the stack — already minimal.
        </CxBox>
      </Cx>

      {/* 10.2 */}
      <div id="dp10-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 1277</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Largest square ending here</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Count <strong>all</strong> square submatrices (of every size) that contain only{' '}
          <code>1</code>s.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Two ideas, and the second is the surprising one</div>
          <p>
            <strong>First:</strong> let <code>dp[i][j]</code> be the side length of the largest all-ones square whose{' '}
            <strong>bottom-right corner</strong> is <code>(i, j)</code>. A square of side <code>s</code> can end at{' '}
            <code>(i, j)</code> only if squares of side <code>s-1</code> end at the cell above, the cell to the left,{' '}
            <em>and</em> the cell diagonally up-left — so
          </p>
          <div className="recurrence">{
`dp[i][j] = 0                                       if arr[i][j] == 0
dp[i][j] = 1 + min( dp[i-1][j],      above
                    dp[i-1][j-1],    diagonal
                    dp[i][j-1] )     left

first row and first column: dp[i][j] = arr[i][j]     nothing above or left to build on`
          }</div>
          <p>
            The <code>min</code> of three is the crux: the square is limited by whichever neighbour is smallest,
            because all three must support it.
          </p>
          <p>
            <strong>Second:</strong> the answer is the <strong>sum</strong> of the whole table, not its maximum. If
            the largest square ending at <code>(i, j)</code> has side <code>s</code>, then squares of side{' '}
            <code>1, 2, …, s</code> also end there — exactly <code>s</code> of them, each distinct. So{' '}
            <code>dp[i][j]</code> is simultaneously &quot;the largest side&quot; and &quot;how many squares end
            here&quot;, and summing counts every square in the matrix exactly once.
          </p>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 The same table answers LeetCode 221</div>
          Take the <strong>maximum</strong> of this table instead of the sum and square it, and you have Maximal
          Square — the largest all-ones square&apos;s <em>area</em>. One table, two questions, chosen by the
          aggregation at the end. That is the same &quot;the answer is in the table, not the return value&quot; move
          as Minimum Subset Sum Difference (4.3).
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Memoization (Top-Down) <span className="tag-memo">TOP-DOWN</span></h3>
      </div>
      <Code>{
`class Solution {
    public int countSquares(int n, int m, int[][] arr) {
        int[][] dp = new int[n][m];
        for (int[] row : dp) Arrays.fill(row, -1);

        // Every cell can be a bottom-right corner, so the caller sums over all of them.
        int sum = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                sum += f(i, j, arr, dp);
            }
        }
        return sum;
    }

    // f(i, j) = side of the largest all-ones square with bottom-right corner (i, j),
    //           which is also the NUMBER of all-ones squares ending there.
    private int f(int i, int j, int[][] arr, int[][] dp) {
        if (i < 0 || j < 0) return 0;                  // off the grid supports nothing
        if (dp[i][j] != -1) return dp[i][j];

        if (arr[i][j] == 0) return dp[i][j] = 0;       // a zero cannot end any square

        if (i == 0 || j == 0) return dp[i][j] = 1;     // edge cell: only a 1x1 fits

        int up   = f(i - 1, j, arr, dp);
        int diag = f(i - 1, j - 1, arr, dp);
        int left = f(i, j - 1, arr, dp);

        return dp[i][j] = 1 + Math.min(up, Math.min(diag, left));
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Why this memoization needs a driving loop</div>
        As in Longest Common Substring (6.3) and Maximum Falling Path Sum (3.6), the cell&apos;s value means
        &quot;best <em>ending here</em>&quot;, so no single top-level call reaches the answer — the caller must visit
        every cell and sum. The cache still does its job: each cell is computed once, and the total work is{' '}
        <code>O(n·m)</code>.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Tabulation (Bottom-Up) <span className="tag-tab">BOTTOM-UP</span></h3>
      </div>
      <Code>{
`class Solution {
    public int countSquares(int n, int m, int[][] arr) {
        int[][] dp = new int[n][m];

        for (int j = 0; j < m; j++) dp[0][j] = arr[0][j];   // first row: 1x1 squares only
        for (int i = 0; i < n; i++) dp[i][0] = arr[i][0];   // first column: likewise

        for (int i = 1; i < n; i++) {
            for (int j = 1; j < m; j++) {
                if (arr[i][j] == 0) {
                    dp[i][j] = 0;
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j],
                                   Math.min(dp[i - 1][j - 1], dp[i][j - 1]));
                }
            }
        }

        int sum = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                sum += dp[i][j];                       // every cell contributes its count
            }
        }
        return sum;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ The two base loops overlap at <code>dp[0][0]</code> — harmlessly
        </div>
        Both the first-row and first-column loops write <code>dp[0][0] = arr[0][0]</code>, which is the same value
        twice. Writing them as two separate loops is clearer than carving out the corner. What you must{' '}
        <em>not</em> do is skip either loop: without the first row and column seeded from <code>arr</code>, every
        square in the matrix would be counted as zero.
      </div>

      <div className="subsection-header">
        <h3>Code Implementation — Space Optimized <span className="tag-space">O(m) SPACE</span></h3>
      </div>
      <Code>{
`class Solution {
    public int countSquares(int n, int m, int[][] arr) {
        // The recurrence reads only row i-1 and column j-1, so two rows suffice.
        int[] prev = new int[m];                       // dp[i-1][*]
        int sum = 0;

        for (int j = 0; j < m; j++) {                  // the first row IS the base row
            prev[j] = arr[0][j];
            sum += prev[j];
        }

        for (int i = 1; i < n; i++) {
            int[] cur = new int[m];
            cur[0] = arr[i][0];                        // first column: re-seed every row
            sum += cur[0];

            for (int j = 1; j < m; j++) {
                if (arr[i][j] == 0) {
                    cur[j] = 0;
                } else {
                    cur[j] = 1 + Math.min(prev[j],             // above
                                 Math.min(prev[j - 1],         // diagonal
                                          cur[j - 1]));        // left, current row
                }
                sum += cur[j];                         // accumulate as we go
            }
            prev = cur;
        }
        return sum;
    }
}`
      }</Code>

      <div className="callout callout-key">
        <div className="callout-title">🔑 Sum while filling, because the table is being thrown away</div>
        The tabulated version could sum in a second pass over the finished table; the row-reduced one cannot — each
        row is discarded as soon as the next is built. So the accumulation has to happen inside the loop, including
        for the seeded first row and first column. Forgetting the <code>sum += cur[0]</code> for the left column is
        the easy omission here, and it undercounts by one per row.
        <p>
          Note also the three reads, following the rule from Part 3: <code>prev[j]</code> and{' '}
          <code>prev[j-1]</code> are vertical and diagonal (previous row), <code>cur[j-1]</code> is horizontal
          (current row).
        </p>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` arr                          dp (largest square side ending at each cell)
   0 1 1 1                      0 1 1 1
   1 1 1 1          --->        1 1 2 2
   0 1 1 1                      0 1 2 3

 dp[1][2] = 1 + min(up dp[0][2]=1, diag dp[0][1]=1, left dp[1][1]=1) = 2
 dp[2][3] = 1 + min(up dp[1][3]=2, diag dp[1][2]=2, left dp[2][2]=2) = 3

 sum = (0+1+1+1) + (1+1+2+2) + (0+1+2+3) = 3 + 6 + 6 = 15

 answer = 15        ten 1x1 squares, four 2x2 squares, one 3x3 square`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n·m)">One pass, constant work per cell.</CxBox>
        <CxBox label="Space — memo / tab" value="O(n·m)">
          Memoization adds an <code>O(n+m)</code> stack.
        </CxBox>
        <CxBox label="Space — optimized" value="O(m)">Two rows, summing as it goes.</CxBox>
      </Cx>
    </>
  );
}
