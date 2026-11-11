import Code from '../../components/Code.jsx';

export default function Greedy() {
  return (
    <>
      {/* 1. Greedy Algorithm Fundamentals */}
      <div id="greedy-fundamentals" data-topic-boundary="true" />
      <p className="page-sub">
        A Greedy Algorithm builds a global optimum piece by piece, always selecting the choice that looks best at the
        current moment without reconsidering prior decisions.
      </p>
      <div className="meta-row">
        <span className="pill">Foundations</span>
        <span className="pill pill-success">Pattern Guide</span>
        <span className="pill">Greedy Choice Property &bull; Exchange Argument</span>
      </div>

      <div className="card">
        <p>
          <strong>When Does Greedy Work?</strong> Unlike Dynamic Programming, which explores every valid subproblem and
          combines optimal states backward or bottom-up, a greedy algorithm commits to one choice immediately. For a
          greedy strategy to be provably correct, the problem must satisfy two properties:
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 The Two Pillars of Greedy Correctness</div>
          <ol>
            <li>
              <strong>Greedy Choice Property:</strong> A globally optimal solution can always be reached by making a
              locally optimal (greedy) decision at the current step. We prove this via an{' '}
              <strong>Exchange Argument</strong> &mdash; take any hypothetical optimal solution that deviates from our
              greedy choice, swap the greedy choice in, and prove the resulting solution is still valid and at least as
              good.
            </li>
            <li>
              <strong>Optimal Substructure:</strong> After making the greedy choice, the remaining subproblem has the exact
              same structure, so solving it optimally yields a globally optimal combined solution.
            </li>
          </ol>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Greedy vs. Dynamic Programming</div>
          <p>
            Greedy fails when a tempting local choice blocks strictly better future choices (e.g.,{' '}
            <strong>0/1 Knapsack</strong> where items cannot be split, or <strong>Coin Change</strong> with arbitrary
            denominations like <code>&#123;1, 3, 4&#125;</code> for target <code>6</code>: greedy picks <code>4 + 1 + 1</code> = 3 coins,
            while optimal DP picks <code>3 + 3</code> = 2 coins). Always verify with a counterexample before trusting greedy!
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Master Pattern Cheatsheet</h3>
      </div>
      <pre className="diagram">{`+-----------------------------------+--------------------------------------------------------+--------------------------------------+
| Greedy Archetype                  | Canonical Strategy                                     | Classic Problems                     |
+-----------------------------------+--------------------------------------------------------+--------------------------------------+
| 1. Sorting + Minimal Allocation   | Sort ascending; pair smallest valid resource first     | Assign Cookies, Shortest Job First   |
| 2. Conserve Flexible Resources    | Spend constrained denominations before versatile ones  | Lemonade Change                      |
| 3. Range / Reachability Tracking  | Maintain [minOpen, maxOpen] or farthest reachable idx  | Jump Game I & II, Valid Paren String |
| 4. Interval Scheduling            | Sort by earliest finish time; skip overlaps            | N Meetings, Non-overlapping, Insert  |
| 5. Timeline Sweep / Late Slot     | Sort arrivals & departures independently / reverse slot| Min Platforms, Job Sequencing        |
| 6. Value Density & Two-Pass Rule  | Sort by value/weight ratio; pass L->R then R->L max    | Fractional Knapsack, Candy           |
+-----------------------------------+--------------------------------------------------------+--------------------------------------+`}</pre>

      {/* 2. Assign Cookies */}
      <div id="assign-cookies" data-topic-boundary="true" />
      <p className="page-sub">
        You are given children with greed factors <code>g[i]</code> and cookies with sizes <code>s[j]</code>.
        Each child can receive at most one cookie, and child <code>i</code> is content only if <code>s[j] &ge; g[i]</code>.
        Maximize the number of content children.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 455</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Sorting + Two Pointers &bull; O(N log N)</span>
      </div>

      <div className="card">
        <p>
          <strong>Exchange Argument Intuition.</strong> To satisfy as many children as possible, we should never waste a
          large cookie on a child who would be satisfied by a smaller cookie. First sort both <code>g</code> and{' '}
          <code>s</code> in ascending order, then greedily try to satisfy the least greedy remaining child using the
          smallest remaining cookie that fits them.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Two-Pointer Matching Protocol</div>
          <ol>
            <li>Sort greed factors <code>g</code> and cookie sizes <code>s</code> in non-decreasing order.</li>
            <li>Compare the smallest unsatisfied child <code>g[childIndex]</code> against <code>s[cookieIndex]</code>.</li>
            <li>
              <strong>Match (<code>s[cookieIndex] &ge; g[childIndex]</code>):</strong> Give this cookie to the child! Advance
              both <code>childIndex</code> and <code>cookieIndex</code>, and increment <code>satisfiedChildren</code>.
            </li>
            <li>
              <strong>Too Small (<code>s[cookieIndex] &lt; g[childIndex]</code>):</strong> Since <code>g</code> is sorted,
              all subsequent children require even larger cookies. This cookie is permanently unusable, so discard it by
              incrementing only <code>cookieIndex</code>.
            </li>
          </ol>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Finds the maximum number of children
     * that can be satisfied using greedy matching.
     */
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);

        // This pointer tracks the next child waiting for a cookie.
        int childIndex = 0;

        // This pointer tracks the next unused cookie.
        int cookieIndex = 0;

        // This stores how many children have been satisfied so far.
        int satisfiedChildren = 0;

        while (childIndex < g.length && cookieIndex < s.length) {
            // If this cookie is large enough,
            // it can satisfy the current child.
            if (s[cookieIndex] >= g[childIndex]) {
                satisfiedChildren++;
                childIndex++;
                cookieIndex++;
            } else {
                // This cookie is too small for the least greedy
                // remaining child, so it cannot help anyone later.
                cookieIndex++;
            }
        }

        return satisfiedChildren;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`g = [1, 5, 3, 3, 4],  s = [4, 2, 1, 2, 1, 3]

After sorting:
  g = [1, 3, 3, 4, 5]
  s = [1, 1, 2, 2, 3, 4]

Step 1: s[0]=1 >= g[0]=1 -> Match! satisfied=1, child=1, cookie=1
Step 2: s[1]=1 <  g[1]=3 -> Skip cookie 1 (too small for everyone left), cookie=2
Step 3: s[2]=2 <  g[1]=3 -> Skip cookie 2, cookie=3
Step 4: s[3]=2 <  g[1]=3 -> Skip cookie 3, cookie=4
Step 5: s[4]=3 >= g[1]=3 -> Match! satisfied=2, child=2, cookie=5
Step 6: s[5]=4 >= g[2]=3 -> Match! satisfied=3, child=3, cookie=6
Loop ends (cookieIndex == s.length).

Result = 3 satisfied children.`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N log N + M log M)</div>
          <div className="cx-note">Dominated by sorting both arrays; the two-pointer pass takes O(N + M).</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1) Auxiliary</div>
          <div className="cx-note">Uses constant pointer variables (or O(log N + log M) stack for dual-pivot quicksort).</div>
        </div>
      </div>

      {/* 3. Shortest Job First */}
      <div id="shortest-job-first" data-topic-boundary="true" />
      <p className="page-sub">
        Given <code>n</code> non-preemptive CPU processes arriving simultaneously at time <code>0</code> with burst
        times <code>bt[i]</code>, compute the minimum average waiting time achievable.
      </p>
      <div className="meta-row">
        <span className="pill">OS Scheduling / GFG</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Greedy Weighting &bull; O(N log N)</span>
      </div>

      <div className="card">
        <p>
          <strong>Mathematical Proof of Shortest Job First (SJF).</strong> Suppose we execute jobs in order{' '}
          <code>p[0], p[1], ..., p[n - 1]</code>. Each job waits for the sum of all earlier jobs:
        </p>
        <div className="recurrence">{`Waiting times:  w[0] = 0
                w[1] = p[0]
                w[2] = p[0] + p[1]
                ...
Total Wait = (n - 1)*p[0] + (n - 2)*p[1] + ... + 1*p[n - 2]`}</div>
        <p>
          Notice that <code>p[0]</code> is added to the waiting time of all <code>n - 1</code> subsequent jobs, while{' '}
          <code>p[n - 1]</code> adds zero wait to anyone else! By the rearrangement inequality, pairing the largest
          multipliers <code>(n - 1 - i)</code> with the smallest burst times strictly minimizes the total (and therefore
          average) waiting time.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Algorithm Steps</div>
          <ol>
            <li>Sort the burst times array <code>bt</code> in ascending order.</li>
            <li>Maintain running <code>elapsedTime</code> (wait time for the next job) and <code>totalWaitingTime</code>.</li>
            <li>For each process burst time <code>t</code>: add <code>elapsedTime</code> to <code>totalWaitingTime</code>, then advance <code>elapsedTime += t</code>.</li>
            <li>Return integer average <code>(int) (totalWaitingTime / n)</code> (standard GFG/TUF signature).</li>
          </ol>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Returns the minimum average waiting time (floored)
     * across all processes using Shortest Job First scheduling.
     */
    public int shortestJobFirst(int[] bt) {
        int n = bt.length;
        if (n == 0) {
            return 0;
        }

        // Execute shortest jobs first so shorter durations appear in more wait sums.
        Arrays.sort(bt);

        long elapsedTime = 0;
        long totalWaitingTime = 0;

        for (int burstTime : bt) {
            // The current process waits for every process scheduled before it.
            totalWaitingTime += elapsedTime;
            elapsedTime += burstTime;
        }

        return (int) (totalWaitingTime / n);
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`bt = [4, 3, 7, 1, 2],  n = 5
Sorted bt = [1, 2, 3, 4, 7]

Process 1 (bt=1): waits 0            totalWait = 0,   elapsed = 1
Process 2 (bt=2): waits 1            totalWait = 1,   elapsed = 3
Process 3 (bt=3): waits 3            totalWait = 4,   elapsed = 6
Process 4 (bt=4): waits 6            totalWait = 10,  elapsed = 10
Process 5 (bt=7): waits 10           totalWait = 20,  elapsed = 17

Average Waiting Time = 20 / 5 = 4.`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N log N)</div>
          <div className="cx-note">Sorting burst times takes O(N log N); accumulating waiting times takes O(N).</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1) Auxiliary</div>
          <div className="cx-note">Two long accumulators only (sorting done in-place).</div>
        </div>
      </div>

      {/* 4. Lemonade Change */}
      <div id="lemonade-change" data-topic-boundary="true" />
      <p className="page-sub">
        Each lemonade costs <code>$5</code>. Customers stand in a queue and pay with either a <code>$5</code>,{' '}
        <code>$10</code>, or <code>$20</code> bill. Starting with no change in hand, determine if you can return exact
        change to every customer in order.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 860</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Conserving Versatile Bills &bull; O(N)</span>
      </div>

      <div className="card">
        <p>
          <strong>Why Spend $10 Before $5?</strong> We do not even need to count <code>$20</code> bills because no change
          ever exceeds <code>$15</code>! When a customer pays with <code>$20</code>, we must return <code>$15</code> in
          one of two ways: <code>$10 + $5</code> or <code>$5 + $5 + $5</code>.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Dominance of the $5 Bill</div>
          <ul>
            <li>A <code>$10</code> bill can <em>only</em> make change for a future <code>$20</code> customer.</li>
            <li>A <code>$5</code> bill is universally useful &mdash; it can make change for <em>both</em> <code>$10</code> and <code>$20</code> customers.</li>
            <li>
              Therefore, whenever giving <code>$15</code> change, always consume <code>ten-- ; five--</code> first if a{' '}
              <code>$10</code> bill is available; fall back to <code>five -= 3</code> only when <code>ten == 0</code>.
            </li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Checks whether correct change can be given
     * to every customer in the given order.
     */
    public boolean lemonadeChange(int[] bills) {
        // Stores how many $5 bills are currently available.
        int five = 0;

        // Stores how many $10 bills are currently available.
        int ten = 0;

        for (int bill : bills) {
            // A $5 bill needs no change and becomes useful later.
            if (bill == 5) {
                five++;
            }
            // A $10 bill needs one $5 bill as change.
            else if (bill == 10) {
                // Without a $5 bill, correct change cannot be given.
                if (five == 0) {
                    return false;
                }
                five--;
                ten++;
            }
            // A $20 bill needs $15 as change.
            else {
                /*
                 * Prefer giving one $10 and one $5
                 * so more $5 bills are saved for later.
                 */
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                }
                /*
                 * If no $10 bill is available, three $5 bills
                 * can still make the required $15 change.
                 */
                else if (five >= 3) {
                    five -= 3;
                }
                // No valid way exists to give $15 change.
                else {
                    return false;
                }
            }
        }

        return true;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`Example A: bills = [5, 5, 5, 10, 20]
  bill=5  -> five=1, ten=0
  bill=5  -> five=2, ten=0
  bill=5  -> five=3, ten=0
  bill=10 -> give $5 back       -> five=2, ten=1
  bill=20 -> give $10 + $5 back -> five=1, ten=0  -> returns true

Example B: bills = [5, 5, 10, 10, 20]
  after two 5s and two 10s -> five=0, ten=2
  bill=20 -> need $15, cannot pay $5 at all! -> returns false`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Single linear pass through all customers with O(1) work per bill.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Only two integer counters: five and ten.</div>
        </div>
      </div>

      {/* 5. Jump Game - 1 */}
      <div id="jump-game-i" data-topic-boundary="true" />
      <p className="page-sub">
        Given an integer array <code>nums</code> where <code>nums[i]</code> is the maximum jump length from index{' '}
        <code>i</code>, determine if you can reach the last index starting from index <code>0</code>.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 55</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Greedy Reach Tracking &bull; O(N) Time</span>
      </div>

      <div className="card">
        <p>
          <strong>Reachable Prefix Invariant.</strong> Rather than branching over all <code>nums[i]</code> possible landing
          spots, observe that if some sequence of jumps can reach index <code>farthest</code>, then <em>every</em> index
          in <code>[0, farthest]</code> is also reachable (simply stop short earlier). Thus, the reachable set is always a
          contiguous prefix <code>[0, farthest]</code>!
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Algorithm Rules</div>
          <ul>
            <li>Maintain <code>farthest = 0</code>, the maximum index reachable so far.</li>
            <li>If at any index <code>i</code>, we observe <code>i &gt; farthest</code>, index <code>i</code> is across an uncrossable zero-trap &mdash; return <code>false</code> immediately.</li>
            <li>Otherwise extend reach: <code>farthest = Math.max(farthest, i + nums[i])</code>.</li>
            <li>As soon as <code>farthest &ge; nums.length - 1</code>, the end is reachable &mdash; return <code>true</code>.</li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Returns true if the last index can be reached
     * from the first index using greedy reach tracking.
     */
    public boolean canJump(int[] nums) {
        /*
         * farthest stores the maximum index that can be
         * reached using the jumps seen so far.
         */
        int farthest = 0;

        for (int i = 0; i < nums.length; i++) {
            /*
             * If the current index is beyond farthest,
             * this position cannot be reached.
             */
            if (i > farthest) {
                return false;
            }

            /*
             * From a reachable index, try to extend the
             * farthest reachable position.
             */
            farthest = Math.max(farthest, i + nums[i]);

            /*
             * If the reachable range already covers the
             * last index, the answer is confirmed.
             */
            if (farthest >= nums.length - 1) {
                return true;
            }
        }

        return true;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`Reachable: nums = [2, 3, 1, 1, 4]
  i=0 (val=2): farthest = max(0, 0+2) = 2
  i=1 (val=3): farthest = max(2, 1+3) = 4 >= last(4) -> Early exit: true!

Stuck at Zero: nums = [3, 2, 1, 0, 4]
  i=0 (val=3): farthest = 3
  i=1 (val=2): farthest = max(3, 1+2) = 3
  i=2 (val=1): farthest = max(3, 2+1) = 3
  i=3 (val=0): farthest = max(3, 3+0) = 3
  i=4 (val=4): i (4) > farthest (3) -> Unreachable gap! returns false`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Single forward pass across nums, often exiting early once end is covered.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Only integer farthest tracker.</div>
        </div>
      </div>

      {/* 6. Jump Game - 2 */}
      <div id="jump-game-ii" data-topic-boundary="true" />
      <p className="page-sub">
        Assuming you can always reach the last index, return the <strong>minimum number of jumps</strong> needed to
        reach <code>nums[n - 1]</code> from <code>nums[0]</code>.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 45</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Implicit BFS Level Window &bull; O(N) Time</span>
      </div>

      <div className="card">
        <p>
          <strong>BFS Level-by-Level Compression.</strong> Think of the array as BFS layers where layer <code>k</code>
          is the range <code>[left, currentEnd]</code> of all indices reachable in exactly <code>k</code> jumps. While
          scanning through the current range up to <code>currentEnd</code>, track <code>farthest = max(i + nums[i])</code>.
          When <code>i</code> reaches <code>currentEnd</code>, we must spend <code>1</code> more jump and expand the next
          layer boundary to <code>currentEnd = farthest</code>!
        </p>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Why Loop Ends at n - 2 (`i &lt; n - 1`)</div>
          <p>
            If <code>i == n - 1</code> coincides with <code>currentEnd</code>, we are <em>already standing on the destination</em>
            and must not trigger an extra jump! Stopping the loop at <code>n - 2</code> prevents overcounting when a jump lands
            exact at <code>n - 1</code>.
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Returns the minimum number of jumps needed
     * to reach the last index using greedy ranges.
     */
    public int jump(int[] nums) {
        int n = nums.length;

        // A single index is already the destination.
        if (n <= 1) {
            return 0;
        }

        // Stores how many jumps have been used so far.
        int jumps = 0;

        // Marks the end of the range covered by current jumps.
        int currentEnd = 0;

        // Stores the farthest index reachable from the current range.
        int farthest = 0;

        for (int i = 0; i < n - 1; i++) {
            // Try to extend the next reachable range from this index.
            farthest = Math.max(farthest, i + nums[i]);

            // When the current range ends, one more jump is needed.
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;

                // Once the last index is inside the range,
                // no more scanning is needed.
                if (currentEnd >= n - 1) {
                    break;
                }
            }
        }

        return jumps;
    }
}`}</Code>

      <div className="sub-header">
        <h3>BFS Layer Window Trace</h3>
      </div>
      <pre className="diagram">{`nums = [2, 3, 1, 1, 4],  n = 5 (target index = 4)
Initial: jumps = 0, currentEnd = 0, farthest = 0

i=0 (val=2): farthest = max(0, 0+2) = 2
             i == currentEnd (0): jump #1! jumps=1, currentEnd=2
i=1 (val=3): farthest = max(2, 1+3) = 4
i=2 (val=1): farthest = max(4, 2+1) = 4
             i == currentEnd (2): jump #2! jumps=2, currentEnd=4 >= 4 -> break!

Minimum Jumps = 2  (0 -> 1 -> 4).`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Single linear scan without explicit queue or nested DP transitions.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Constant tracking variables jumps, currentEnd, and farthest.</div>
        </div>
      </div>

      {/* 7. Job Sequencing Problem */}
      <div id="job-sequencing-problem" data-topic-boundary="true" />
      <p className="page-sub">
        Given <code>N</code> jobs where each job has a <code>deadline</code> and a <code>profit</code>, and each job takes
        exactly <code>1</code> unit of time, find the number of jobs completed and maximum total profit achievable when at
        most one job can run at a time.
      </p>
      <div className="meta-row">
        <span className="pill">GFG / Striver 180</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Profit Descending + Latest Valid Slot</span>
      </div>

      <div className="card">
        <p>
          <strong>Delay as Much as Possible.</strong> Because every job pays its full profit as long as it finishes on or
          before <code>job.deadline</code>, scheduling a profitable job on day <code>1</code> wastes an early slot that a
          tight-deadline job might desperately need! Instead:
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Two-Part Greedy Strategy</div>
          <ol>
            <li><strong>Order by Profit:</strong> Sort all jobs in descending order of <code>profit</code> so higher rewards always get priority.</li>
            <li><strong>Assign Latest Available Slot:</strong> For each job, scan backwards from <code>slot = job.deadline</code> down to <code>1</code> and occupy the first free slot <code>timeline[slot] == -1</code>. This preserves earlier slots <code>[1 ... slot - 1]</code> for jobs with tighter deadlines.</li>
          </ol>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Scaling to Large Constraints (DSU Optimization)</div>
          <p>
            The linear backward slot search takes <code>O(N &times; maxDeadline)</code> in the worst case. If deadlines reach{' '}
            <code>10^5</code>, replace the inner loop with a Disjoint Set Union <code>parent[slot]</code> pointing to the
            latest available slot &le; <code>slot</code> (merging <code>slot</code> with <code>slot - 1</code> upon occupation),
            reducing lookup to amortized <code>O(1)</code>!
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Job {
    int id;
    int deadline;
    int profit;

    // Initializes one job's identifier, deadline, and profit.
    Job(int id, int deadline, int profit) {
        this.id = id;
        this.deadline = deadline;
        this.profit = profit;
    }
}

class Solution {
    // Returns the number of jobs done and the maximum profit.
    public int[] jobScheduling(Job[] jobs) {
        // Consider higher-profit jobs before lower-profit jobs.
        Arrays.sort(jobs, (first, second) -> Integer.compare(second.profit, first.profit));

        int maxDeadline = 0;

        // Find the largest deadline to size the timeline.
        for (Job job : jobs) {
            // A larger deadline increases the required timeline length.
            if (job.deadline > maxDeadline) {
                maxDeadline = job.deadline;
            }
        }

        int[] timeline = new int[maxDeadline + 1];
        Arrays.fill(timeline, -1);

        int countJobs = 0;
        int totalProfit = 0;

        // Try to schedule each job in descending profit order.
        for (Job job : jobs) {
            // Search for the latest free slot before this job's deadline.
            for (int slot = job.deadline; slot > 0; slot--) {
                // A free slot allows this job to be scheduled.
                if (timeline[slot] == -1) {
                    timeline[slot] = job.id;
                    countJobs++;
                    totalProfit += job.profit;
                    break;
                }
            }
        }

        return new int[] {countJobs, totalProfit};
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`Jobs (id, deadline, profit): (1, 4, 20), (2, 1, 10), (3, 1, 40), (4, 1, 30)
Sorted by Profit Descending:
  1) Job 3 (dl=1, profit=40) -> placed in slot 1. Timeline: [_, 3, _, _, _]  profit=40
  2) Job 4 (dl=1, profit=30) -> slot 1 taken -> skipped.
  3) Job 1 (dl=4, profit=20) -> placed in slot 4. Timeline: [_, 3, _, _, 1]  profit=60
  4) Job 2 (dl=1, profit=10) -> slot 1 taken -> skipped.

Result: [2 jobs, 60 profit].`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N log N + N &times; maxD)</div>
          <div className="cx-note">Sorting takes O(N log N); each job scans backward up to maxDeadline slots.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(maxDeadline)</div>
          <div className="cx-note">Slot timeline array indexed from 1 to maxDeadline.</div>
        </div>
      </div>

      {/* 8. N Meetings in One Room */}
      <div id="n-meetings-in-one-room" data-topic-boundary="true" />
      <p className="page-sub">
        Given <code>start[]</code> and <code>end[]</code> times of <code>N</code> meetings, determine the maximum number
        of meetings that can be held in a single conference room without any overlap.
      </p>
      <div className="meta-row">
        <span className="pill">GFG / Activity Selection</span>
        <span className="pill pill-success">Easy / Medium</span>
        <span className="pill">Sort by End Time &bull; Classic Activity Selection</span>
      </div>

      <div className="card">
        <p>
          <strong>Why Earliest Finish Time Dominates.</strong> Why not sort by shortest duration or earliest start time?
          A meeting starting at <code>0</code> could last all day <code>[0, 100]</code>, blocking dozens of short meetings;
          and a short meeting <code>[4, 6]</code> sitting squarely across <code>[1, 5]</code> and <code>[5, 9]</code> blocks two
          meetings for the gain of one! Sorting by <strong>earliest end time</strong> always maximizes the leftover room
          horizon for future meetings.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Strict Inequality Rule</div>
          <p>
            In the classic N Meetings problem, if Meeting A ends at time <code>2</code> and Meeting B starts at time{' '}
            <code>2</code>, they <em>cannot</em> both be accommodated &mdash; the next meeting must satisfy{' '}
            <code>currentStart &gt; lastEndTime</code>! Pair start &amp; end before sorting so they stay bound together.
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Finds the maximum number of meetings that can be
     * scheduled in one room without overlapping.
     */
    public int maxMeetings(int[] start, int[] end) {
        int n = start.length;

        /*
         * Each meeting stores start and end time together
         * so sorting does not separate the two values.
         */
        int[][] meetings = new int[n][2];
        for (int i = 0; i < n; i++) {
            meetings[i][0] = start[i];
            meetings[i][1] = end[i];
        }

        // Prioritize meetings that finish earliest to leave more room time.
        Arrays.sort(meetings, (a, b) -> Integer.compare(a[1], b[1]));

        /*
         * This stores the ending time of the last selected
         * meeting. -1 allows the first valid meeting to fit.
         */
        int lastEndTime = -1;

        /*
         * This stores how many meetings have been selected so far.
         */
        int count = 0;

        for (int[] meeting : meetings) {
            int currentStart = meeting[0];
            int currentEnd = meeting[1];

            /*
             * A meeting can be selected only when it starts
             * strictly after the previously selected meeting ends.
             */
            if (currentStart > lastEndTime) {
                count++;
                lastEndTime = currentEnd;
            }
        }

        return count;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Timeline Visualization</h3>
      </div>
      <pre className="diagram">{`Meetings sorted by end time:
  (1, 2)  |==|                         -> Picked! lastEnd = 2, count = 1
  (3, 4)      |==|                     -> 3 > 2 -> Picked! lastEnd = 4, count = 2
  (0, 6)  |===========|                -> 0 <= 4 -> Overlap, skip
  (5, 7)          |===|                -> 5 > 4 -> Picked! lastEnd = 7, count = 3
  (8, 9)                |==|           -> 8 > 7 -> Picked! lastEnd = 9, count = 4
  (5, 9)          |========|           -> 5 <= 9 -> Overlap, skip

Maximum non-overlapping meetings = 4.`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N log N)</div>
          <div className="cx-note">Packing pairs and greedy sweep take O(N); sorting by finish time takes O(N log N).</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Auxiliary N x 2 matrix storing paired start and end timestamps.</div>
        </div>
      </div>

      {/* 9. Non-overlapping Intervals */}
      <div id="non-overlapping-intervals" data-topic-boundary="true" />
      <p className="page-sub">
        Given an array of intervals <code>intervals[i] = [start_i, end_i]</code>, return the minimum number of intervals
        you need to remove to make the rest of the intervals non-overlapping.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 435</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Complement of Activity Selection &bull; Endpoint Touch Allowed</span>
      </div>

      <div className="card">
        <p>
          <strong>Duality with Activity Selection.</strong> Minimizing the number of intervals <em>removed</em> is
          mathematically identical to maximizing the number of intervals <em>kept</em> without overlap:{' '}
          <code>Min Removals = N - Max Kept Non-Overlapping Intervals</code>!
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Subtle Comparison Detail vs. N Meetings</div>
          <p>
            Unlike N Meetings in One Room, LeetCode 435 defines touching endpoints like <code>[1, 2]</code> and{' '}
            <code>[2, 3]</code> as <strong>non-overlapping</strong>! Thus an interval only conflicts when{' '}
            <code>intervals[i][0] &lt; lastEndTime</code>. When we detect a conflict after sorting by end time ascending,
            the incoming interval ends later (<code>&ge; lastEndTime</code>), so dropping it (<code>removeCount++</code>)
            leaves strictly more space for later intervals!
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Returns the minimum number of intervals to remove.
    public int eraseOverlapIntervals(int[][] intervals) {
        // Empty input has no overlapping interval to remove.
        if (intervals.length == 0) {
            return 0;
        }

        // Sort intervals so the interval ending earliest is considered first.
        Arrays.sort(intervals, (first, second) -> Integer.compare(first[1], second[1]));

        int removeCount = 0;
        int lastEndTime = intervals[0][1];

        // Check every remaining interval against the last kept interval.
        for (int i = 1; i < intervals.length; i++) {
            // A start before the last kept end time means the current interval overlaps.
            if (intervals[i][0] < lastEndTime) {
                removeCount++;
            } else {
                // A start at or after the last kept end time means the interval can stay.
                lastEndTime = intervals[i][1];
            }
        }

        return removeCount;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
Sorted by end time: [[1, 2], [2, 3], [1, 3], [3, 4]]

Start: kept [1, 2], lastEndTime = 2, removeCount = 0
  i=1 ([2, 3]): 2 >= 2 (no overlap!) -> keep, lastEndTime = 3
  i=2 ([1, 3]): 1 <  3 (overlaps!)   -> removeCount = 1 (drop [1, 3])
  i=3 ([3, 4]): 3 >= 3 (no overlap!) -> keep, lastEndTime = 4

Minimum removals = 1.`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N log N)</div>
          <div className="cx-note">Dominated by sorting intervals by end timestamp; single linear verification scan.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1) Auxiliary</div>
          <div className="cx-note">In-place sort with scalar removeCount and lastEndTime variables.</div>
        </div>
      </div>

      {/* 10. Insert Intervals */}
      <div id="insert-interval" data-topic-boundary="true" />
      <p className="page-sub">
        Given an array of sorted, non-overlapping intervals and a <code>newInterval</code>, insert <code>newInterval</code>{' '}
        into <code>intervals</code> and merge any overlapping intervals so the result remains sorted and non-overlapping.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 57</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Three-Phase Linear Sweep &bull; O(N)</span>
      </div>

      <div className="card">
        <p>
          <strong>Three-Region Partitioning.</strong> Because <code>intervals</code> is already sorted and disjoint, every
          existing interval falls cleanly into one of three sequential phases relative to <code>newInterval</code>:
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 The 3 Sequential Phases</div>
          <ol>
            <li>
              <strong>Left (Strictly Before):</strong> Intervals ending strictly before <code>newInterval</code> begins
              (<code>intervals[i][1] &lt; newInterval[0]</code>). Copy directly to output.
            </li>
            <li>
              <strong>Middle (Overlapping Merge Zone):</strong> All intervals starting at or before{' '}
              <code>newInterval</code> ends (<code>intervals[i][0] &le; newInterval[1]</code>). Absorb all of them into{' '}
              <code>newInterval</code> via <code>min(start)</code> and <code>max(end)</code>, then append the merged{' '}
              <code>newInterval</code> once.
            </li>
            <li>
              <strong>Right (Strictly After):</strong> All remaining intervals starting strictly after the merged{' '}
              <code>newInterval[1]</code>. Copy directly to output.
            </li>
          </ol>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Inserts newInterval into sorted non-overlapping intervals and merges overlaps.
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        int n = intervals.length;

        // Phase 1: Add all intervals completely before the new interval.
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }

        // Phase 2: Merge all overlapping intervals into one combined interval.
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        // Add the fully merged new interval.
        result.add(newInterval);

        // Phase 3: Add all remaining intervals after the merged zone.
        while (i < n) {
            result.add(intervals[i]);
            i++;
        }

        return result.toArray(new int[result.size()][]);
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]],  newInterval = [4, 8]

Phase 1 (end < 4):
  [1, 2] -> 2 < 4 -> add [1, 2]

Phase 2 (start <= newInterval[1]):
  [3, 5]: 3 <= 8 -> newInterval = [min(4,3), max(8,5)] = [3, 8]
  [6, 7]: 6 <= 8 -> newInterval = [min(3,6), max(8,7)] = [3, 8]
  [8, 10]: 8 <= 8 -> newInterval = [min(3,8), max(8,10)] = [3, 10]
  [12, 16]: 12 > 10 -> stop Phase 2, add [3, 10]

Phase 3:
  add [12, 16]

Output: [[1, 2], [3, 10], [12, 16]].`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Pointer i visits each interval at most once across all three while loops.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Result list holding merged output intervals.</div>
        </div>
      </div>

      {/* 11. Minimum Number of Platforms Required */}
      <div id="minimum-platforms" data-topic-boundary="true" />
      <p className="page-sub">
        Given arrival <code>arr[]</code> and departure <code>dep[]</code> times of <code>N</code> trains at a railway
        station, find the minimum number of platforms required so no train ever waits.
      </p>
      <div className="meta-row">
        <span className="pill">GFG / Meeting Rooms II</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Independent Event Timeline Sweep &bull; O(N log N)</span>
      </div>

      <div className="card">
        <p>
          <strong>Decoupling Arrivals &amp; Departures.</strong> Why can we sort <code>arr[]</code> and <code>dep[]</code>
          <em>independently</em> without pairing each train&apos;s arrival with its own departure? Because every station
          platform is identical! At any point in time, the number of occupied platforms depends solely on{' '}
          <code>(# of arrivals up to t) &minus; (# of departures strictly before t)</code> &mdash; never on which
          specific train is leaving.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Two-Pointer Sweep-Line Rules</div>
          <ul>
            <li>Sort <code>arr</code> ascending and <code>dep</code> ascending independently.</li>
            <li>
              <strong>Arrival First (<code>arr[a] &le; dep[d]</code>):</strong> Even if one train arrives at the exact minute
              another departs (<code>==</code>), the arriving train requires a separate platform! Increment{' '}
              <code>currentPlatforms++</code>, update <code>answer</code>, and advance <code>arrivalIndex++</code>.
            </li>
            <li>
              <strong>Departure First (<code>arr[a] &gt; dep[d]</code>):</strong> A train vacates its platform before the next
              arrival. Decrement <code>currentPlatforms--</code> and advance <code>departureIndex++</code>.
            </li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Finds the minimum platforms using sorted
     * arrivals, sorted departures, and two pointers.
     */
    public int minimumPlatforms(int[] arr, int[] dep) {
        Arrays.sort(arr);
        Arrays.sort(dep);

        int n = arr.length;

        // This pointer tracks the next arrival to process.
        int arrivalIndex = 0;

        // This pointer tracks the earliest pending departure.
        int departureIndex = 0;

        // This stores how many platforms are occupied right now.
        int currentPlatforms = 0;

        // This stores the maximum platforms needed at any time.
        int answer = 0;

        while (arrivalIndex < n) {
            // If the next train arrives before or when the earliest
            // pending train leaves, a new platform is needed.
            if (arr[arrivalIndex] <= dep[departureIndex]) {
                currentPlatforms++;

                // The maximum occupied count is the required answer.
                answer = Math.max(answer, currentPlatforms);
                arrivalIndex++;
            } else {
                // A train leaves before the next arrival,
                // so one occupied platform becomes free.
                currentPlatforms--;
                departureIndex++;
            }
        }

        return answer;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Event Timeline Sweep Trace</h3>
      </div>
      <pre className="diagram">{`arr = [0900, 0940, 0950, 1100, 1500, 1800] (sorted)
dep = [0910, 1120, 1130, 1200, 1900, 2000] (sorted)

0900 (arr <= 0910) -> +1 -> plat=1, max=1
0940 (arr >  0910) -> -1 -> plat=0 (0910 leaves)
0940 (arr <= 1120) -> +1 -> plat=1, max=1
0950 (arr <= 1120) -> +1 -> plat=2, max=2
1100 (arr <= 1120) -> +1 -> plat=3, max=3  <-- Peak concurrency!
1500 (arr >  1120, 1130, 1200) -> 3 trains depart -> plat=0
1500 (arr <= 1900) -> +1 -> plat=1
1800 (arr <= 1900) -> +1 -> plat=2

Minimum Platforms Required = 3.`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N log N)</div>
          <div className="cx-note">Sorting two arrays takes O(N log N); the two-pointer event sweep runs in O(2N).</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1) Auxiliary</div>
          <div className="cx-note">In-place sorting with four integer tracking variables.</div>
        </div>
      </div>

      {/* 12. Valid Parenthesis String */}
      <div id="valid-parenthesis-string" data-topic-boundary="true" />
      <p className="page-sub">
        Given a string <code>s</code> containing only <code>&apos;(&apos;</code>, <code>&apos;)&apos;</code>, and{' '}
        <code>&apos;*&apos;</code>, where <code>&apos;*&apos;</code> can act as <code>&apos;(&apos;</code>,{' '}
        <code>&apos;)&apos;</code>, or an empty string <code>&quot;&quot;</code>, return <code>true</code> if the
        string can form a valid balanced parenthesis expression.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 678</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Greedy [minOpen, maxOpen] Range &bull; O(N) Time, O(1) Space</span>
      </div>

      <div className="card">
        <p>
          <strong>Compressing 3^K Choices into a Contiguous Interval.</strong> Trying all 3 interpretations of every{' '}
          <code>&apos;*&apos;</code> recursively takes exponential time, and memoized DP uses <code>O(N&sup2;)</code> space.
          Instead, notice that after scanning any prefix of <code>s</code>, the set of achievable unmatched open
          parenthesis counts always forms a <strong>contiguous integer interval</strong> <code>[minOpen, maxOpen]</code>!
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Range Transition Rules</div>
          <ul>
            <li><strong>On <code>&apos;(&apos;</code>:</strong> Both bounds rise by 1: <code>minOpen++; maxOpen++;</code></li>
            <li><strong>On <code>&apos;)&apos;</code>:</strong> Both bounds drop by 1: <code>minOpen--; maxOpen--;</code></li>
            <li>
              <strong>On <code>&apos;*&apos;</code>:</strong> Can act as <code>&apos;)&apos;</code> (lowers lower bound:{' '}
              <code>minOpen--</code>), <code>&quot;&quot;</code> (same), or <code>&apos;(&apos;</code> (raises upper
              bound: <code>maxOpen++</code>).
            </li>
            <li>
              <strong>Validity Clamping:</strong>
              <ul>
                <li>If <code>maxOpen &lt; 0</code>: Even treating every <code>&apos;*&apos;</code> as <code>&apos;(&apos;</code> leaves unmatched closing brackets &rarr; return <code>false</code>!</li>
                <li>If <code>minOpen &lt; 0</code>: Clamp <code>minOpen = 0</code> because any prefix path dipping below zero is invalid (and choosing <code>&quot;&quot;</code> keeps it valid at 0).</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Checks if string with '(', ')' and wildcard '*' is valid
     * by maintaining [minOpen, maxOpen] unmatched bracket bounds.
     */
    public boolean checkValidString(String s) {
        int minOpen = 0; // Minimum possible unmatched '(' count
        int maxOpen = 0; // Maximum possible unmatched '(' count

        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);

            if (ch == '(') {
                minOpen++;
                maxOpen++;
            } else if (ch == ')') {
                minOpen--;
                maxOpen--;
            } else {
                // '*' can close ')', do nothing "", or open '('
                minOpen--;
                maxOpen++;
            }

            // Too many ')' seen; impossible to balance even optimistically.
            if (maxOpen < 0) {
                return false;
            }

            // Prune invalid negative open counts (keep at least 0).
            if (minOpen < 0) {
                minOpen = 0;
            }
        }

        // Valid only if 0 unmatched '(' is reachable at the end.
        return minOpen == 0;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`s = "(*))"
  i=0 '(': min=1, max=1
  i=1 '*': min=0, max=2   ('*' -> ')', "", or '(')
  i=2 ')': min=-1 -> clamped to 0, max=1
  i=3 ')': min=-1 -> clamped to 0, max=0
End: minOpen == 0 -> VALID (true, e.g. "(())" or "()").

s = "(((*))"
  End: min=1, max=3 -> minOpen != 0 -> INVALID (false).`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Single pass evaluating character-by-character transitions.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Two integer bounds minOpen and maxOpen; beats O(N&sup2;) DP and O(N) dual-stack.</div>
        </div>
      </div>

      {/* 13. Fractional Knapsack */}
      <div id="fractional-knapsack" data-topic-boundary="true" />
      <p className="page-sub">
        Given <code>values[]</code> and <code>weights[]</code> of <code>N</code> items and a knapsack of capacity{' '}
        <code>W</code>, find the maximum total value you can carry when items can be broken into fractions.
      </p>
      <div className="meta-row">
        <span className="pill">GFG Classic</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Sort by Value/Weight Density &bull; O(N log N)</span>
      </div>

      <div className="card">
        <p>
          <strong>Why Greedy Works Here (and Not in 0/1 Knapsack).</strong> When items are infinitely divisible, every single
          unit of knapsack weight should be filled with the highest <strong>value per unit weight</strong> (<code>val / wt</code>)
          available! There is never wasted slack capacity at the end because the last item can simply be trimmed to match{' '}
          <code>remainingCapacity</code>.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Precision-Safe Ratio Comparator</div>
          <p>
            When sorting items in descending order of ratio <code>a.val / a.wt</code> vs <code>b.val / b.wt</code>, compare
            by cross-multiplication <code>Double.compare((double) b.val * a.wt, (double) a.val * b.wt)</code> (or{' '}
            <code>Long.compare</code>) to eliminate floating-point division rounding issues!
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Item {
    int value;
    int weight;

    Item(int value, int weight) {
        this.value = value;
        this.weight = weight;
    }
}

class Solution {
    /*
     * Returns the maximum value achievable in a knapsack of capacity W
     * when arbitrary fractional quantities of items may be taken.
     */
    public double fractionalKnapsack(int[] values, int[] weights, int W) {
        int n = values.length;
        Item[] items = new Item[n];
        for (int i = 0; i < n; i++) {
            items[i] = new Item(values[i], weights[i]);
        }

        // Sort descending by value-to-weight density using cross multiplication.
        Arrays.sort(items, (a, b) -> Long.compare(
            (long) b.value * a.weight,
            (long) a.value * b.weight
        ));

        int remainingCapacity = W;
        double totalValue = 0.0;

        for (Item item : items) {
            if (remainingCapacity == 0) {
                break;
            }

            if (item.weight <= remainingCapacity) {
                // Take the complete item when full weight fits.
                totalValue += item.value;
                remainingCapacity -= item.weight;
            } else {
                // Take the exact remaining fraction needed to fill the knapsack.
                double unitValue = (double) item.value / item.weight;
                totalValue += unitValue * remainingCapacity;
                remainingCapacity = 0;
            }
        }

        return totalValue;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`values = [60, 100, 120], weights = [10, 20, 30], W = 50

Ratios (value / weight):
  Item 0: 60 / 10  = 6.0
  Item 1: 100 / 20 = 5.0
  Item 2: 120 / 30 = 4.0

Already sorted descending by density:
  1) Item 0 (wt=10 <= 50): take full -> total=60.0,  rem=40
  2) Item 1 (wt=20 <= 40): take full -> total=160.0, rem=20
  3) Item 2 (wt=30 >  20): take fraction (20/30) -> + 4.0 * 20 = +80.0

Maximum Knapsack Value = 240.0.`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N log N)</div>
          <div className="cx-note">Sorting items by value density takes O(N log N); single pass fills knapsack.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Auxiliary array pairing each item's value and weight for sorting.</div>
        </div>
      </div>

      {/* 14. Candy */}
      <div id="candy" data-topic-boundary="true" />
      <p className="page-sub">
        <code>N</code> children stand in a line with rating values. Every child must receive at least <code>1</code> candy,
        and children with a strictly higher rating than either immediate neighbor must receive more candies than that
        neighbor. Return the minimum total candies required.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 135</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Two-Pass Neighbor Propagation &bull; O(N)</span>
      </div>

      <div className="card">
        <p>
          <strong>Decoupling Left and Right Neighbor Rules.</strong> Satisfying both neighbors simultaneously is tricky because
          raising a child&apos;s candy count affects their other side. The clean greedy insight splits the problem into two
          independent directional sweeps:
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Bidirectional Pass Protocol</div>
          <ol>
            <li><strong>Base Baseline:</strong> Every child starts with <code>1</code> candy.</li>
            <li><strong>Left-to-Right Pass:</strong> Ensure <code>ratings[i] &gt; ratings[i - 1]</code> implies <code>candies[i] = candies[i - 1] + 1</code>.</li>
            <li><strong>Right-to-Left Pass:</strong> Ensure <code>ratings[i] &gt; ratings[i + 1]</code> implies <code>candies[i] = Math.max(candies[i], candies[i + 1] + 1)</code>. Taking <code>Math.max</code> preserves the left-pass guarantee at peaks!</li>
          </ol>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Alternative: O(1) Space Slope Method</div>
          <p>
            You can also solve Candy in single pass <code>O(1)</code> space by tracking upward and downward rating slopes:{' '}
            award <code>1 + peak</code> candies at hills and <code>down</code> candies along descents, adding{' '}
            <code>down - peak</code> extra to the peak if the downward slope is longer than the upward climb!
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    /*
     * Finds the minimum candies needed so every child
     * satisfies both adjacent rating rules.
     */
    public int candy(int[] ratings) {
        int n = ratings.length;

        // Each child must receive at least one candy.
        int[] candies = new int[n];
        Arrays.fill(candies, 1);

        for (int i = 1; i < n; i++) {
            // If the current child has a higher rating
            // than the left child, they need more candies.
            if (ratings[i] > ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }

        for (int i = n - 2; i >= 0; i--) {
            // If the current child has a higher rating
            // than the right child, the right-side rule
            // must also be satisfied.
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = Math.max(candies[i], candies[i + 1] + 1);
            }
        }

        // This stores the minimum total candies required.
        int totalCandies = 0;
        for (int candyCount : candies) {
            totalCandies += candyCount;
        }

        return totalCandies;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`ratings = [1, 3, 2, 2, 1]

Initial:    [1, 1, 1, 1, 1]
Left -> R:  [1, 2, 1, 1, 1]   (index 1: rating 3 > 1 -> 2)
Right -> L:
  i=3 (rat 2 > rat 1): candies[3] = max(1, 1+1) = 2
  i=2 (rat 2 == rat 2): unchanged -> 1
  i=1 (rat 3 > rat 2): candies[1] = max(2, 1+1) = 2
  i=0 (rat 1 < rat 3): unchanged -> 1

Final candies = [1, 2, 1, 2, 1] -> Total = 7.`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Three linear passes: left-to-right, right-to-left, and final summation.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Candies array of size N (can be reduced to O(1) using slope counting).</div>
        </div>
      </div>
    </>
  );
}
