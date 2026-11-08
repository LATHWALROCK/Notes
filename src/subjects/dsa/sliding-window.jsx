import Code from '../../components/Code.jsx';

export default function SlidingWindow() {
  return (
    <>
      {/* 1. Sliding Window & 2 Pointers Fundamentals */}
      <div id="sliding-window-basics" data-topic-boundary="true" />
      <p className="page-sub">
        Sliding Window and Two Pointers are among the most versatile algorithmic paradigms for array and
        string problems &mdash; converting nested O(N&sup2;) search loops into graceful O(N) linear scans
        by maintaining dynamic contiguous boundaries.
      </p>
      <div className="meta-row">
        <span className="pill">Foundations</span>
        <span className="pill pill-success">Pattern Guide</span>
        <span className="pill">O(N) Amortized Time &bull; O(1) / O(K) Space</span>
      </div>

      <div className="card">
        <p>
          <strong>The Core Philosophy.</strong> A brute-force algorithm inspects all ~N&sup2; / 2 contiguous
          subarrays or substrings, repeating redundant calculations across overlapping segments. A{' '}
          <strong>sliding window</strong> maintains state across consecutive windows: as the{' '}
          <code>right</code> boundary expands to admit a new element, the <code>left</code> boundary contracts
          just enough to satisfy the problem&apos;s invariants. Because both pointers only advance forward,
          each element enters and leaves the window at most once &mdash; yielding strict <strong>O(N)</strong> total steps.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 The 4 Archetypal Sliding Window Patterns</div>
          <p>
            Every interview question in this category falls cleanly into one of four structural patterns:
          </p>
          <ol>
            <li>
              <strong>Constant / Fixed-Size Window (K):</strong> The window size is fixed at <code>k</code>.
              Advance <code>right</code>, incorporate <code>nums[right]</code>, subtract <code>nums[right - k]</code>,
              and update the running answer.
            </li>
            <li>
              <strong>Longest Subarray / Substring with Condition:</strong> Expand <code>right</code> until the
              condition is violated; shrink <code>left</code> until validity is restored; record{' '}
              <code>Math.max(maxLen, right - left + 1)</code>.
            </li>
            <li>
              <strong>Counting Subarrays (Exact K via Monotonic Subtraction):</strong> Direct sliding window
              struggles when zeros or multiple matches break strict monotonicity. The master algebraic formula:
              <br />
              <code style={{ fontSize: '1.05rem', fontWeight: 'bold' }}>
                Exact(K) = AtMost(K) &minus; AtMost(K &minus; 1)
              </code>
              <br />
              Since &ldquo;at most K&rdquo; is strictly monotonic, computing it twice in O(N) gives the exact count!
            </li>
            <li>
              <strong>Shortest / Minimum Window with Condition:</strong> Expand <code>right</code> until the window
              becomes valid; then shrink <code>left</code> as much as possible while maintaining validity, updating{' '}
              <code>Math.min(minLen, right - left + 1)</code>.
            </li>
          </ol>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Two Pointers vs. Sliding Window</div>
          <p>
            <strong>Sliding Window</strong> specifically refers to two pointers moving in the <em>same direction</em>{' '}
            (left &le; right) that demarcate a continuous subsegment <code>[left, right]</code>. In contrast, general{' '}
            <strong>Two Pointers</strong> may start at opposite ends (converging inwards, e.g. Two Sum on sorted arrays,
            Container With Most Water) or advance independently across two distinct arrays (e.g. merge step of Merge Sort).
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Master Pattern Cheatsheet</h3>
      </div>
      <pre className="diagram">{`+--------------------------------------+-------------------------------------------------------------+------------------------------------+
| Pattern Category                     | Canonical Strategy                                          | Classic Problems                   |
+--------------------------------------+-------------------------------------------------------------+------------------------------------+
| 1. Fixed Window (K)                  | Window size fixed; add right, drop (right - k)              | Max Points from Cards (LC 1423)    |
| 2. Longest Window (Condition C)      | Expand right; while (!valid) shrink left; update maxLen     | Longest Substring Unique (LC 3)    |
|                                      |                                                             | Max Consecutive Ones III (LC 1004) |
|                                      |                                                             | Fruit into Baskets (LC 904)        |
|                                      |                                                             | Longest Repeating Repl. (LC 424)   |
| 3. Count Exact K Subarrays           | Exact(K) = AtMost(K) - AtMost(K - 1)                        | Binary Subarrays with Sum (LC 930) |
|                                      | Valid subarrays ending at 'right' = right - left + 1        | Nice Subarrays (LC 1248)           |
|                                      |                                                             | Subarrays with K Distinct (LC 992) |
| 4. Shortest Window (Condition C)     | Expand right until valid; shrink left while valid; minLen   | Minimum Window Substring (LC 76)   |
+--------------------------------------+-------------------------------------------------------------+------------------------------------+`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N) Amortized</div>
          <div className="cx-note">Left and right pointers each advance at most N times; total operations &le; 2N.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1) / O(K)</div>
          <div className="cx-note">Fixed alphabet frequency array O(128)/O(26) or hash map bounded by distinct keys K.</div>
        </div>
      </div>

      {/* 2. Maximum Points You Can Pick from Cards */}
      <div id="max-points-from-cards" data-topic-boundary="true" />
      <p className="page-sub">
        You are given an array of card points and an integer k. In each step, you can take one card from
        either the beginning or the end of the row. Find the maximum score you can achieve by taking exactly k cards.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1423</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Fixed Window / Dual-Ended Prefix-Suffix</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem.</strong> There are several cards arranged in a row, and each card has an associated
          number of points <code>cardPoints[i]</code>. In one step, you can pick one card from the beginning or from
          the end of the row. You must take exactly <code>k</code> cards. Return the maximum score you can obtain.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Shift Selections Between Left and Right Ends</div>
          <p>
            Taking <code>k</code> cards from the ends means choosing <code>i</code> cards from the left and{' '}
            <code>k - i</code> cards from the right, where <code>0 &le; i &le; k</code>.
          </p>
          <ol>
            <li>
              <strong>Initial configuration:</strong> Pick all <code>k</code> cards from the left end. Compute{' '}
              <code>lsum = cardPoints[0] + cardPoints[1] + ... + cardPoints[k - 1]</code> and set <code>maxScore = lsum</code>.
            </li>
            <li>
              <strong>Sliding substitution:</strong> One by one, withdraw the rightmost picked card from the left{' '}
              (<code>lsum -= cardPoints[i]</code>) and replace it with a new card picked from the right end of the array{' '}
              (<code>rsum += cardPoints[rindex--]</code>).
            </li>
            <li>
              At each step, update <code>maxScore = Math.max(maxScore, lsum + rsum)</code>.
            </li>
          </ol>
          <div className="recurrence">{`Initial: lsum = sum(cardPoints[0 ... k-1]), rsum = 0, maxScore = lsum
For i = k-1 down to 0:
    lsum -= cardPoints[i]          // drop card from left
    rsum += cardPoints[rindex--]   // take card from right
    maxScore = max(maxScore, lsum + rsum)`}</div>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Alternative Perspective: Minimum Subarray of Size N - K</div>
          <p>
            Picking <code>k</code> cards from the outer ends leaves behind an untouched contiguous subarray of length{' '}
            <code>n - k</code> in the middle. Maximizing the sum of the <code>k</code> chosen cards is mathematically
            identical to <strong>minimizing the sum of the remaining (n - k) cards</strong>:{' '}
            <code>Max Score = Total Sum - Min Subarray Sum of size (n - k)</code>. Both approaches run in O(K) / O(N) time.
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Finds the maximum score by shifting selections between both ends.
    public int maxScore(int[] cardPoints, int k) {
        int n = cardPoints.length;

        // Invalid k cannot form a valid selection.
        if (k < 0 || k > n) {
            return -1;
        }

        // Picking no cards gives a score of zero.
        if (k == 0) {
            return 0;
        }

        // Picking all cards requires the complete array sum.
        if (k == n) {
            int total = 0;
            for (int value : cardPoints) {
                total += value;
            }
            return total;
        }

        // Start with all k selected cards taken from the left.
        int currentScore = 0;
        for (int i = 0; i < k; i++) {
            currentScore += cardPoints[i];
        }

        int maxScore = currentScore;
        int rightIndex = n - 1;

        // Replace one left card with one right card in each step.
        for (int leftIndex = k - 1; leftIndex >= 0; leftIndex--) {
            currentScore -= cardPoints[leftIndex];
            currentScore += cardPoints[rightIndex];
            rightIndex--;

            // Keep the best score after each new split.
            if (currentScore > maxScore) {
                maxScore = currentScore;
            }
        }

        return maxScore;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`cardPoints = [1, 2, 3, 4, 5, 6, 1],  k = 3,  n = 7

Initial selection (3 from left, 0 from right):
  Left cards:  [1, 2, 3]  -> currentScore = 6,  maxScore = 6,  rightIndex = 6

Step 1 (leftIndex = 2):
  Drop cardPoints[2] (= 3), Add cardPoints[6] (= 1)
  Score = 6 - 3 + 1 = 4.  maxScore = max(6, 4) = 6. rightIndex = 5

Step 2 (leftIndex = 1):
  Drop cardPoints[1] (= 2), Add cardPoints[5] (= 6)
  Score = 4 - 2 + 6 = 8.  maxScore = max(6, 8) = 8. rightIndex = 4

Step 3 (leftIndex = 0):
  Drop cardPoints[0] (= 1), Add cardPoints[4] (= 5)
  Score = 8 - 1 + 5 = 12. maxScore = max(8, 12) = 12. rightIndex = 3

Final Result = 12 (Take [5, 6, 1] from the right end)`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(k)</div>
          <div className="cx-note">Computing initial left sum takes O(k), and k replacement steps take O(k).</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Only integer score tracking variables; strictly constant extra space.</div>
        </div>
      </div>

      {/* 3. Longest Substring Without Repeating Characters */}
      <div id="longest-substring-without-repeating" data-topic-boundary="true" />
      <p className="page-sub">
        Given a string, find the length of the longest substring without repeating characters by jumping
        the left pointer directly past the previous occurrence of any seen character.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 3</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Dynamic Window / Last Seen Index Array</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem.</strong> Given a string <code>s</code>, find the length of the longest substring
          without duplicate characters.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Direct Pointer Jump via Last-Seen Position Hash Table</div>
          <p>
            A naive sliding window shrinks <code>left</code> by 1 character each step until duplicates are gone,
            wasting O(2N) moves. Instead, store the <strong>most recent 0-indexed position</strong> of every character
            in an array <code>lastPos[256]</code> initialized to <code>-1</code>.
          </p>
          <ol>
            <li>Expand <code>right</code> from <code>0</code> to <code>n - 1</code>.</li>
            <li>
              When examining <code>s.charAt(right)</code>: if it was seen at index <code>lastPos[char] &ge; left</code>,
              it lies inside the active window. Jump <code>left</code> directly to <code>lastPos[char] + 1</code>!
            </li>
            <li>Update <code>lastPos[char] = right</code>.</li>
            <li>Record <code>maxLen = Math.max(maxLen, right - left + 1)</code>.</li>
          </ol>
        </div>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Ensure <code>lastPos[char] &ge; left</code> Before Jumping</div>
          <p>
            If a character was seen at index <code>2</code> and <code>left</code> has already advanced to <code>5</code>,
            its previous occurrence is <em>outside</em> the active window. Jumping backward to <code>2 + 1 = 3</code>{' '}
            would corrupt the window boundary! Always take <code>left = Math.max(left, lastPos[char] + 1)</code>.
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Finds the length of the longest substring without duplicate characters.
    public int lengthOfLongestSubstring(String s) {
        int n = s.length();
        if (n <= 1) {
            return n;
        }

        // Store the last seen index of each ASCII character (-1 = not seen).
        int[] lastPosition = new int[256];
        Arrays.fill(lastPosition, -1);

        int left = 0;
        int maxLength = 0;

        for (int right = 0; right < n; right++) {
            char current = s.charAt(right);

            // If seen within the active window, jump left past its previous position.
            if (lastPosition[current] >= left) {
                left = lastPosition[current] + 1;
            }

            // Record the current character's new position and update window length.
            lastPosition[current] = right;
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`s = "cadbzabcd"

right=0 ('c'): lastPos['c'] = -1 < 0 -> left=0, len=1 ("c"), max=1
right=1 ('a'): lastPos['a'] = -1 < 0 -> left=0, len=2 ("ca"), max=2
right=2 ('d'): lastPos['d'] = -1 < 0 -> left=0, len=3 ("cad"), max=3
right=3 ('b'): lastPos['b'] = -1 < 0 -> left=0, len=4 ("cadb"), max=4
right=4 ('z'): lastPos['z'] = -1 < 0 -> left=0, len=5 ("cadbz"), max=5
right=5 ('a'): lastPos['a'] = 1 >= 0 -> left = 1 + 1 = 2 ("dbza"), len=4, max=5
right=6 ('b'): lastPos['b'] = 3 >= 2 -> left = 3 + 1 = 4 ("zab"), len=3, max=5
right=7 ('c'): lastPos['c'] = 0 < 4  -> not in window! left stays 4 ("zabc"), len=4, max=5
right=8 ('d'): lastPos['d'] = 2 < 4  -> not in window! left stays 4 ("zabcd"), len=5, max=5

Longest valid substring length = 5 (e.g. "cadbz" or "zabcd")`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">Every character is examined exactly once with O(1) array index updates.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(&Sigma;) = O(1)</div>
          <div className="cx-note">Constant 256-element integer table for standard ASCII characters.</div>
        </div>
      </div>

      {/* 4. Maximum Consecutive 1's III */}
      <div id="max-consecutive-ones-iii" data-topic-boundary="true" />
      <p className="page-sub">
        Given a binary array nums and an integer k, return the maximum number of consecutive 1&apos;s in the
        array if you can flip at most k 0&apos;s to 1&apos;s.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1004</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Longest Window with at most K Zeroes</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem Translation.</strong> &ldquo;Flipping at most k zeroes to ones&rdquo; is mathematically
          identical to finding the <strong>longest contiguous subarray containing at most k zeroes</strong>.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Standard Sliding Window Strategy</div>
          <ol>
            <li>Maintain <code>left = 0</code>, <code>zeroCount = 0</code>, <code>maxLength = 0</code>.</li>
            <li>Advance <code>right</code> from <code>0</code> to <code>nums.length - 1</code>.</li>
            <li>If <code>nums[right] == 0</code>, increment <code>zeroCount++</code>.</li>
            <li>
              If <code>zeroCount &gt; k</code>, the window is invalid. Shrink from the left:{' '}
              if <code>nums[left] == 0</code>, decrement <code>zeroCount--</code>; then <code>left++</code>.
            </li>
            <li>Record <code>maxLength = Math.max(maxLength, right - left + 1)</code>.</li>
          </ol>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Non-Shrinking Window Optimization (O(N) Strict)</div>
          <p>
            Notice that we only care about finding a window <em>strictly larger</em> than <code>maxLength</code>.
            Once a window of size <code>W</code> is found, shrinking <code>left</code> to restore validity when{' '}
            <code>zeroCount &gt; k</code> is unnecessary &mdash; we can simply slide the entire window of size <code>W</code>{' '}
            forward by incrementing <code>left++</code> once! The window never shrinks; it only expands when a larger valid
            sequence appears. At the end, the answer is simply <code>nums.length - left</code>.
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Finds the longest window containing at most k zeroes.
    public int longestOnes(int[] nums, int k) {
        int left = 0;
        int zeroCount = 0;
        int maxLength = 0;

        // Expand the right boundary across the complete array.
        for (int right = 0; right < nums.length; right++) {
            // Count a zero when it enters the active window.
            if (nums[right] == 0) {
                zeroCount++;
            }

            // Shrink until the window requires at most k flips.
            while (zeroCount > k) {
                // Remove a zero from the count when it leaves the window.
                if (nums[left] == 0) {
                    zeroCount--;
                }
                left++;
            }

            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`nums = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],  k = 2

r=0 (1): zeroCount=0 <= 2 -> win=[0..0], len=1, max=1
r=1 (1): zeroCount=0 <= 2 -> win=[0..1], len=2, max=2
r=2 (1): zeroCount=0 <= 2 -> win=[0..2], len=3, max=3
r=3 (0): zeroCount=1 <= 2 -> win=[0..3], len=4, max=4
r=4 (0): zeroCount=2 <= 2 -> win=[0..4], len=5, max=5
r=5 (0): zeroCount=3 >  2 -> shrink: left moves 0->1->2->3->4 (nums[3]==0, zeroCount=2)
         valid win=[4..5], len=2, max=5
r=6 (1): zeroCount=2 <= 2 -> win=[4..6], len=3, max=5
r=7 (1): zeroCount=2 <= 2 -> win=[4..7], len=4, max=5
r=8 (1): zeroCount=2 <= 2 -> win=[4..8], len=5, max=5
r=9 (1): zeroCount=2 <= 2 -> win=[4..9], len=6, max=6 (Best: [0, 0, 1, 1, 1, 1])
r=10(0): zeroCount=3 >  2 -> shrink: left moves 4->5 (nums[4]==0, zeroCount=2)
         win=[5..10], len=6, max=6

Final Answer = 6`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">Both left and right pointers increment at most n times across the loop.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Only integer pointer and counter variables are allocated.</div>
        </div>
      </div>

      {/* 5. Fruit Into Baskets */}
      <div id="fruit-into-baskets" data-topic-boundary="true" />
      <p className="page-sub">
        You visit a row of fruit trees with two baskets that can each hold only one fruit type. Find the
        maximum number of fruits you can pick in a continuous subsegment.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 904</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Longest Subarray with at most 2 Distinct Elements</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem.</strong> You are visiting a farm with trees arranged in a single row. The fruit
          type on tree <code>i</code> is <code>fruits[i]</code>. You have <strong>two baskets</strong>, each
          capable of holding an infinite quantity of <em>one single type of fruit</em>. Starting from any tree,
          you must pick exactly one fruit from each tree moving left-to-right until you encounter a fruit you cannot
          fit into either basket. Return the maximum number of fruits you can pick.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Equivalence: Longest Subarray with At Most 2 Distinct Numbers</div>
          <p>
            This problem is a direct alias for finding the longest contiguous subarray with{' '}
            <strong>at most 2 unique integers</strong>.
          </p>
          <ol>
            <li>Maintain a hash map <code>frequency</code> mapping <code>fruitType &rarr; count</code>.</li>
            <li>Expand <code>right</code>: insert <code>fruits[right]</code> and increment its frequency.</li>
            <li>
              If <code>frequency.size() &gt; 2</code>, we have 3 types in the window! Shrink from the left:{' '}
              decrement <code>frequency.get(fruits[left])</code>; if the count reaches 0, remove that type completely.{' '}
              Increment <code>left++</code>.
            </li>
            <li>When <code>frequency.size() &le; 2</code>, update <code>maxFruits = Math.max(maxFruits, right - left + 1)</code>.</li>
          </ol>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Finds the longest valid section using one forward sliding window.
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> frequency = new HashMap<>();
        int left = 0;
        int maxFruits = 0;

        // Expand the window by adding each fruit from the right.
        for (int right = 0; right < fruits.length; right++) {
            frequency.put(fruits[right], frequency.getOrDefault(fruits[right], 0) + 1);

            // Remove one left fruit when more than two types are present.
            if (frequency.size() > 2) {
                int fruit = fruits[left];
                frequency.put(fruit, frequency.get(fruit) - 1);

                // Remove a type after its final fruit leaves the window.
                if (frequency.get(fruit) == 0) {
                    frequency.remove(fruit);
                }
                left++;
            }

            // Only valid windows can contribute to the final answer.
            if (frequency.size() <= 2) {
                maxFruits = Math.max(maxFruits, right - left + 1);
            }
        }

        return maxFruits;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">Each tree is added and removed from the frequency map at most once.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">The hash map never contains more than 3 distinct keys at any time.</div>
        </div>
      </div>

      {/* 6. Longest Substring with At Most K Distinct Characters */}
      <div id="longest-substring-at-most-k-distinct" data-topic-boundary="true" />
      <p className="page-sub">
        The natural generalization of Fruit into Baskets: find the length of the longest substring containing
        at most k distinct characters using a dynamic frequency map.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 340</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Frequency Map Window Contract</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem.</strong> Given a string <code>s</code> and an integer <code>k</code>, return the length
          of the longest substring of <code>s</code> that contains at most <code>k</code> distinct characters.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Map Size as the Invariant Gauge</div>
          <p>
            The hash map&apos;s size <code>frequency.size()</code> directly reflects the number of unique characters
            currently inside the window <code>[left, right]</code>.
          </p>
          <ul>
            <li><strong>Guard clauses:</strong> If <code>s.length() == 0 || k &le; 0</code>, return <code>0</code>.</li>
            <li><strong>Expansion:</strong> Increment frequency of <code>s.charAt(right)</code>.</li>
            <li>
              <strong>Contraction:</strong> While <code>frequency.size() &gt; k</code>, decrement frequency of{' '}
              <code>s.charAt(left)</code>. As soon as a count hits <code>0</code>, explicitly delete the key from the map{' '}
              so <code>frequency.size()</code> decreases. Advance <code>left++</code>.
            </li>
            <li><strong>Result update:</strong> <code>maxLength = Math.max(maxLength, right - left + 1)</code>.</li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Uses a sliding window with character frequencies.
    public int longestSubstringAtMostKDistinct(String s, int k) {
        int n = s.length();

        // No valid non-empty substring can exist in these cases.
        if (n == 0 || k <= 0) {
            return 0;
        }

        Map<Character, Integer> frequency = new HashMap<>();
        int left = 0;
        int maxLength = 0;

        // Expand the window with right.
        for (int right = 0; right < n; right++) {
            char current = s.charAt(right);
            frequency.put(current, frequency.getOrDefault(current, 0) + 1);

            // Shrink until the window has at most k distinct characters.
            while (frequency.size() > k) {
                char leftChar = s.charAt(left);
                frequency.put(leftChar, frequency.get(leftChar) - 1);

                // Remove a character only after its last copy leaves.
                if (frequency.get(leftChar) == 0) {
                    frequency.remove(leftChar);
                }
                left++;
            }

            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">Pointers left and right traverse the string linearly.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(k)</div>
          <div className="cx-note">Map stores at most k + 1 distinct character entries.</div>
        </div>
      </div>

      {/* 7. Number of Substrings Containing All Three Characters */}
      <div id="number-of-substrings-three-characters" data-topic-boundary="true" />
      <p className="page-sub">
        Given a string consisting only of characters a, b, and c, count the number of substrings that contain
        at least one occurrence of all three characters.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1358</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Tail Multiplying Insight: count += n - right</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem.</strong> Given a string <code>s</code> consisting only of characters <code>a</code>,{' '}
          <code>b</code>, and <code>c</code>, return the number of substrings containing at least one occurrence
          of all three characters.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 The &ldquo;Every Later Ending is Valid&rdquo; Arithmetic Insight</div>
          <p>
            Suppose the current window <code>s[left ... right]</code> contains at least one <code>'a'</code>, one{' '}
            <code>'b'</code>, and one <code>'c'</code>.
          </p>
          <p>
            Notice: If <code>s[left ... right]</code> is valid, then <em>extending it to the right</em> by appending{' '}
            any suffix cannot invalidate it! Substring <code>s[left ... right]</code> is valid, <code>s[left ... right + 1]</code>{' '}
            is valid, ..., all the way to <code>s[left ... n - 1]</code>.
          </p>
          <div className="recurrence">{`Number of valid substrings starting at current 'left' = (n - 1) - right + 1 = n - right`}</div>
          <p>
            Therefore, the moment the window contains all three characters, we immediately add <code>n - right</code>{' '}
            to the total count, shrink from the left (<code>frequency[s[left] - 'a']--</code>, <code>left++</code>),
            and repeat while the condition remains true!
          </p>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 One-Pass Formula via Last Seen Indices</div>
          <p>
            Alternatively, keep an array <code>lastSeen = [-1, -1, -1]</code>. For each index <code>i</code>, update{' '}
            <code>lastSeen[s.charAt(i) - 'a'] = i</code>. If all three have been seen, any valid substring must start at or before{' '}
            <code>min(lastSeen[0], lastSeen[1], lastSeen[2])</code> and end at <code>i</code>. Hence,{' '}
            <code>count += 1 + min(lastSeen[0], lastSeen[1], lastSeen[2])</code>. Both solutions are O(N).
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Counts valid substrings using a sliding window.
    public long numberOfSubstrings(String s) {
        int n = s.length();

        // At least three characters are required.
        if (n < 3) {
            return 0;
        }

        int[] frequency = new int[3];
        int left = 0;
        long count = 0;

        // Expand the window by moving the right boundary.
        for (int right = 0; right < n; right++) {
            frequency[s.charAt(right) - 'a']++;

            // Shrink while the current window contains all three characters.
            while (frequency[0] > 0 && frequency[1] > 0 && frequency[2] > 0) {
                // Every later ending gives another valid substring.
                count += n - right;
                frequency[s.charAt(left) - 'a']--;
                left++;
            }
        }

        return count;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`s = "abcabc",  n = 6

r=0 ('a'): freq=[1,0,0]
r=1 ('b'): freq=[1,1,0]
r=2 ('c'): freq=[1,1,1] -> ALL 3 PRESENT!
  left=0 ("abc"): count += 6 - 2 = 4 (Substrings: "abc", "abca", "abcab", "abcabc")
  drop 'a': freq=[0,1,1], left=1 -> condition false, loop exits

r=3 ('a'): freq=[1,1,1] -> ALL 3 PRESENT!
  left=1 ("bca"): count += 6 - 3 = 3 (Substrings: "bca", "bcab", "bcabc")
  drop 'b': freq=[1,0,1], left=2 -> condition false, loop exits

r=4 ('b'): freq=[1,1,1] -> ALL 3 PRESENT!
  left=2 ("cab"): count += 6 - 4 = 2 (Substrings: "cab", "cabc")
  drop 'c': freq=[1,1,0], left=3 -> condition false, loop exits

r=5 ('c'): freq=[1,1,1] -> ALL 3 PRESENT!
  left=3 ("abc"): count += 6 - 5 = 1 (Substring: "abc")
  drop 'a': freq=[0,1,1], left=4 -> condition false, loop exits

Total Count = 4 + 3 + 2 + 1 = 10`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">Left and right pointers each iterate through the string at most once.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Fixed 3-element frequency array for characters 'a', 'b', and 'c'.</div>
        </div>
      </div>

      {/* 8. Longest Repeating Character Replacement */}
      <div id="longest-repeating-character-replacement" data-topic-boundary="true" />
      <p className="page-sub">
        Given an uppercase string s and integer k, find the length of the longest substring containing the
        same letter after replacing at most k characters.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 424</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Max Frequency Invariant &bull; Replacements = Len - MaxFreq</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem.</strong> You are given a string <code>s</code> consisting of uppercase English letters
          and an integer <code>k</code>. You can choose any character of the string and change it to any other
          uppercase English character at most <code>k</code> times. Return the length of the longest substring
          containing the same letter you can get after performing the above operations.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Invariant: WindowLength - MaxFrequency &le; k</div>
          <p>
            Consider any candidate window <code>[left, right]</code> of length <code>currentLength = right - left + 1</code>.
            To turn this entire window into a single identical character, the optimal choice is always to turn everything
            into the <strong>most frequent character</strong> already inside the window!
          </p>
          <div className="recurrence">{`Number of characters to replace = currentLength - maxFrequency
Valid Window Condition: (right - left + 1) - maxFrequency <= k`}</div>
          <p>
            If <code>currentLength - maxFrequency &gt; k</code>, no amount of <code>k</code> replacements can make this
            window uniform. We must shrink by moving <code>left++</code> and decrementing its frequency.
          </p>
        </div>

        <div className="callout callout-tip">
          <div className="callout-title">💡 Why We Never Need to Decrement <code>maxFrequency</code></div>
          <p>
            When shrinking <code>left</code>, we do <strong>not</strong> need to scan all 26 frequencies to find the new
            maximum. Why? Because the answer only improves when <code>maxFrequency</code> grows <em>larger</em> than its
            historical peak! A window with an equal or smaller <code>maxFrequency</code> cannot possibly establish a new
            record length.
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Uses a sliding window with character frequencies.
    public int characterReplacement(String s, int k) {
        int n = s.length();

        // No valid substring can exist for these input conditions.
        if (n == 0 || k < 0) {
            return 0;
        }

        int[] frequency = new int[26];
        int left = 0;
        int maxFrequency = 0;
        int maxLength = 0;

        // Expand the window with right.
        for (int right = 0; right < n; right++) {
            int index = s.charAt(right) - 'A';
            frequency[index]++;
            maxFrequency = Math.max(maxFrequency, frequency[index]);

            int currentLength = right - left + 1;

            // Shrink once when the window needs too many replacements.
            if (currentLength - maxFrequency > k) {
                frequency[s.charAt(left) - 'A']--;
                left++;
            }

            // Measure the adjusted window after possible shrinking.
            currentLength = right - left + 1;
            maxLength = Math.max(maxLength, currentLength);
        }

        return maxLength;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">Single pass with O(1) frequency count updates for each character.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Constant size-26 integer array for uppercase English characters.</div>
        </div>
      </div>

      {/* 9. Binary Subarray with Sum */}
      <div id="binary-subarrays-with-sum" data-topic-boundary="true" />
      <p className="page-sub">
        Given a binary array and a goal sum, count the number of non-empty subarrays whose sum equals goal
        using the Master Counting Principle: Exact(Goal) = AtMost(Goal) - AtMost(Goal - 1).
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 930</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Master Counting Principle: Exact = AtMost(K) - AtMost(K - 1)</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem.</strong> Given a binary array <code>nums</code> and an integer <code>goal</code>, return
          the number of non-empty subarrays with a sum equal to <code>goal</code>.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Why Exact Sum Fails on Standard Sliding Window &bull; The Subtraction Masterstroke</div>
          <p>
            When an array contains zeros, the condition <code>currentSum == goal</code> is <em>not strictly monotonic</em>:{' '}
            multiple zeros can precede or follow a match without changing the sum, so advancing <code>left</code> blindly
            would miss valid combinations.
          </p>
          <p>
            However, the condition <strong>&ldquo;sum &le; limit&rdquo;</strong> IS strictly monotonic! As <code>right</code>{' '}
            increases, the sum grows; as <code>left</code> advances, the sum decreases.
          </p>
          <div className="recurrence">{`ExactCount(goal) = CountAtMost(nums, goal) - CountAtMost(nums, goal - 1)`}</div>
          <p>
            In <code>countAtMost(nums, limit)</code>: for a given valid window <code>[left, right]</code> whose sum is &le; limit,
            every subarray ending at <code>right</code> and starting anywhere from <code>left</code> to <code>right</code>{' '}
            is valid. There are exactly <strong>(right - left + 1)</strong> such subarrays!
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Counts subarrays whose sum is at most the given limit.
    private int countAtMost(int[] nums, int limit) {
        // A binary subarray cannot have a negative sum.
        if (limit < 0) {
            return 0;
        }

        int left = 0;
        int currentSum = 0;
        int count = 0;

        // Expand the window using each index as the right boundary.
        for (int right = 0; right < nums.length; right++) {
            currentSum += nums[right];

            // Shrink until the window sum becomes valid again.
            while (currentSum > limit) {
                currentSum -= nums[left];
                left++;
            }

            // Every start from left to right forms a valid subarray.
            count += right - left + 1;
        }

        return count;
    }

    // Counts subarrays whose sum is exactly equal to goal.
    public int numSubarraysWithSum(int[] nums, int goal) {
        return countAtMost(nums, goal) - countAtMost(nums, goal - 1);
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`nums = [1, 0, 1, 0, 1],  goal = 2

1. Computing countAtMost(nums, 2):
   r=0: sum=1 <= 2 -> win=[0..0], count += 0-0+1 = 1  ([1])
   r=1: sum=1 <= 2 -> win=[0..1], count += 1-0+1 = 2  ([1,0], [0])
   r=2: sum=2 <= 2 -> win=[0..2], count += 2-0+1 = 3  ([1,0,1], [0,1], [1])
   r=3: sum=2 <= 2 -> win=[0..3], count += 3-0+1 = 4  ([1,0,1,0], [0,1,0], [1,0], [0])
   r=4: sum=3 >  2 -> shrink: drop nums[0]=1, sum=2 -> win=[1..4], count += 4-1+1 = 4
   Total AtMost(2) = 1 + 2 + 3 + 4 + 4 = 14

2. Computing countAtMost(nums, 1):
   r=0: sum=1 <= 1 -> win=[0..0], count += 1 = 1
   r=1: sum=1 <= 1 -> win=[0..1], count += 2 = 2
   r=2: sum=2 >  1 -> shrink: drop nums[0], sum=1 -> win=[1..2], count += 2 = 2
   r=3: sum=1 <= 1 -> win=[1..3], count += 3 = 3
   r=4: sum=2 >  1 -> shrink: drop nums[1], nums[2], sum=1 -> win=[3..4], count += 2 = 2
   Total AtMost(1) = 1 + 2 + 2 + 3 + 2 = 10

Final Exact Result = AtMost(2) - AtMost(1) = 14 - 10 = 4
Valid Subarrays: [1,0,1], [1,0,1,0], [0,1,0,1], [1,0,1]`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">Runs two linear passes of countAtMost, each taking O(n) amortized time.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Zero auxiliary storage; uses only pointers and accumulator integers.</div>
        </div>
      </div>

      {/* 10. Count Number of Nice Subarrays */}
      <div id="count-number-of-nice-subarrays" data-topic-boundary="true" />
      <p className="page-sub">
        A continuous subarray is called nice if it contains exactly k odd numbers. By translating odd numbers
        to 1 and even numbers to 0, this problem maps seamlessly to Binary Subarrays with Sum.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1248</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Parity Mapping &bull; Exact(k) = AtMost(k) - AtMost(k - 1)</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem.</strong> Given an array of integers <code>nums</code> and an integer <code>k</code>.
          A continuous subarray is called <strong>nice</strong> if there are <code>k</code> odd numbers on it.
          Return the number of nice sub-arrays.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Direct Parity Reduction to Binary Subarray with Sum</div>
          <p>
            Notice that the exact numeric values in <code>nums</code> do not matter &mdash; only their parity does!
            Replacing every odd number with <code>1</code> and every even number with <code>0</code> transforms
            this problem 1:1 into <strong>Binary Subarrays with Sum = k</strong>.
          </p>
          <div className="recurrence">{`countNiceSubarrays(nums, k) = countAtMostOdds(nums, k) - countAtMostOdds(nums, k - 1)`}</div>
          <p>
            In <code>countAtMost(nums, limit)</code>, track <code>oddCount</code>. When <code>nums[right] % 2 != 0</code>,
            increment <code>oddCount++</code>. While <code>oddCount &gt; limit</code>, if <code>nums[left] % 2 != 0</code>{' '}
            decrement <code>oddCount--</code>; then <code>left++</code>. Add <code>(right - left + 1)</code> to <code>count</code>.
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Counts subarrays containing at most the given number of odd values.
    private int countAtMost(int[] nums, int limit) {
        // A subarray cannot contain a negative number of odd values.
        if (limit < 0) {
            return 0;
        }

        int left = 0;
        int oddCount = 0;
        int count = 0;

        // Expand the window using each index as the right boundary.
        for (int right = 0; right < nums.length; right++) {
            // Count the new value when it is odd.
            if (nums[right] % 2 != 0) {
                oddCount++;
            }

            // Shrink until the window contains at most limit odd values.
            while (oddCount > limit) {
                // Remove an odd value from the count when it leaves.
                if (nums[left] % 2 != 0) {
                    oddCount--;
                }
                left++;
            }

            // Every start from left to right forms a valid subarray.
            count += right - left + 1;
        }

        return count;
    }

    // Counts subarrays containing exactly k odd numbers.
    public int numberOfSubarrays(int[] nums, int k) {
        return countAtMost(nums, k) - countAtMost(nums, k - 1);
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">Two linear scans of nums; each element visited at most twice per scan.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Operates in-place on input integers with no array or hash map allocation.</div>
        </div>
      </div>

      {/* 11. Subarrays with K Different Integers */}
      <div id="subarrays-with-k-different-integers" data-topic-boundary="true" />
      <p className="page-sub">
        Given an integer array nums and an integer k, return the number of good subarrays of nums that have
        exactly k different integers.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 992</span>
        <span className="pill pill-bad">Hard</span>
        <span className="pill">Exact(k) = AtMost(k) - AtMost(k - 1) on Frequency Map</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem.</strong> An array <code>nums</code> is considered <strong>good</strong> if the number
          of different integers in that array is exactly <code>k</code>. Return the number of good subarrays of <code>nums</code>.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 The Hardest Sliding Window Made Easy via the AtMost Transformation</div>
          <p>
            Trying to count subarrays with <em>exactly</em> <code>k</code> distinct integers directly with sliding window
            is notoriously difficult because expanding or contracting can cause unpredictable shifts in distinct elements.
          </p>
          <p>
            However, the subproblem <strong>&ldquo;number of subarrays with at most k distinct integers&rdquo;</strong> is
            supremely straightforward!
          </p>
          <div className="recurrence">{`ExactDistinct(nums, k) = CountAtMostDistinct(nums, k) - CountAtMostDistinct(nums, k - 1)`}</div>
          <p>
            In <code>countAtMost(nums, limit)</code>:
          </p>
          <ul>
            <li>Maintain <code>frequency</code> hash map of elements in <code>[left, right]</code>.</li>
            <li>While <code>frequency.size() &gt; limit</code>: decrement <code>frequency.get(nums[left])</code>, remove if 0, <code>left++</code>.</li>
            <li>Add <code>right - left + 1</code> to total count.</li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Counts subarrays having at most limit distinct values.
    private int countAtMost(int[] nums, int limit) {
        // No non-empty subarray can satisfy this limit.
        if (limit <= 0) {
            return 0;
        }

        Map<Integer, Integer> frequency = new HashMap<>();
        int left = 0;
        int count = 0;

        // Expand the window with right.
        for (int right = 0; right < nums.length; right++) {
            int value = nums[right];
            frequency.put(value, frequency.getOrDefault(value, 0) + 1);

            // Shrink until the window has at most limit values.
            while (frequency.size() > limit) {
                int leftValue = nums[left];
                frequency.put(leftValue, frequency.get(leftValue) - 1);

                // Remove the value only after its last copy leaves.
                if (frequency.get(leftValue) == 0) {
                    frequency.remove(leftValue);
                }
                left++;
            }

            // Every start from left to right forms a valid subarray.
            count += right - left + 1;
        }

        return count;
    }

    // Counts subarrays containing exactly k distinct integers.
    public int subarraysWithKDistinct(int[] nums, int k) {
        // Exactly k distinct values require a positive k.
        if (k <= 0) {
            return 0;
        }

        return countAtMost(nums, k) - countAtMost(nums, k - 1);
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(n)</div>
          <div className="cx-note">Each element is inserted and evicted from the hash map at most once per pass.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(k)</div>
          <div className="cx-note">The frequency map stores at most k + 1 distinct keys at any point.</div>
        </div>
      </div>

      {/* 12. Minimum Window Substring */}
      <div id="minimum-window-substring" data-topic-boundary="true" />
      <p className="page-sub">
        Given two strings s and t, find the minimum window substring of s that contains every character in t
        (including duplicates) in O(m + n) time using an expand-then-shrink sliding window.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 76</span>
        <span className="pill pill-bad">Hard</span>
        <span className="pill">Expand Right Until Valid &bull; Shrink Left While Valid</span>
      </div>

      <div className="card">
        <p>
          <strong>Problem.</strong> Given two strings <code>s</code> and <code>t</code> of lengths <code>m</code> and{' '}
          <code>n</code> respectively, return the <strong>minimum window substring</strong> of <code>s</code> such
          that every character in <code>t</code> (including duplicates) is included in the window. If there is no such
          substring, return the empty string <code>&quot;&quot;</code>.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Dual-Array Frequency Tracking and Matched Counter</div>
          <p>
            Use two 128-element ASCII arrays: <code>need[128]</code> storing character demands from <code>t</code>,
            and <code>window[128]</code> storing current counts in <code>s[left ... right]</code>.
          </p>
          <ol>
            <li>
              Maintain <code>matched</code>: the count of required characters currently satisfied in the window.
              A match occurs when <code>need[c] &gt; 0</code> and <code>window[c] &le; need[c]</code>.
            </li>
            <li>
              <strong>Expand <code>right</code>:</strong> Include <code>s.charAt(right)</code> into <code>window</code>.
              If it fulfills a needed count, increment <code>matched++</code>.
            </li>
            <li>
              <strong>Shrink <code>left</code> while <code>matched == t.length()</code>:</strong> The window is valid!
              Compare with <code>minLength</code> and record <code>startIndex = left</code>. Then evict{' '}
              <code>s.charAt(left)</code>: decrement <code>window[leftChar]--</code>. If it causes{' '}
              <code>window[leftChar] &lt; need[leftChar]</code>, a vital requirement is broken &mdash; decrement{' '}
              <code>matched--</code>. Advance <code>left++</code>.
            </li>
          </ol>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Finds the minimum valid substring using a sliding window.
    public String minWindow(String s, String t) {
        int n = s.length();
        int m = t.length();

        // A valid window cannot exist in these cases.
        if (n == 0 || m == 0 || n < m) {
            return "";
        }

        int[] need = new int[128];
        int[] window = new int[128];

        // Store how many copies of each character are required.
        for (int i = 0; i < m; i++) {
            need[t.charAt(i)]++;
        }

        int left = 0;
        int matched = 0;
        int minLength = Integer.MAX_VALUE;
        int startIndex = -1;

        // Expand the right boundary across the complete string.
        for (int right = 0; right < n; right++) {
            char current = s.charAt(right);
            window[current]++;

            // Count the new character only if a required copy is satisfied.
            if (need[current] > 0 && window[current] <= need[current]) {
                matched++;
            }

            // Shrink while every required character is still satisfied.
            while (matched == m) {
                int currentLength = right - left + 1;

                // Keep the smallest valid window found so far.
                if (currentLength < minLength) {
                    minLength = currentLength;
                    startIndex = left;
                }

                char leftChar = s.charAt(left);
                window[leftChar]--;

                // Losing a required copy makes the window invalid.
                if (need[leftChar] > 0 && window[leftChar] < need[leftChar]) {
                    matched--;
                }

                left++;
            }
        }

        // No window contained every required character.
        if (startIndex == -1) {
            return "";
        }

        return s.substring(startIndex, startIndex + minLength);
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`s = "ADOBECODEBANC",  t = "ABC",  m = 3, need: {'A':1, 'B':1, 'C':1}

Expand right until matched == 3:
  r=0 ('A'): matched=1
  r=3 ('B'): matched=2
  r=5 ('C'): matched=3 -> VALID WINDOW "ADOBEC" (len=6, startIndex=0)
    Shrink left:
    left=0 ('A'): window['A'] drops below need -> matched=2, left=1 (Window: "DOBEC")

Expand right again:
  r=9 ('A'): window gets 'A' -> matched=3 -> VALID WINDOW "DOBECODEBA" (len=10)
    Shrink left:
    left=1 ('D'), 2 ('O'), 3 ('B' drops below need -> matched=2), left=4

Expand right again:
  r=10 ('N'): matched=2
  r=12 ('C'): matched=3 -> VALID WINDOW "CODEBANC" (len=8)
    Shrink left:
    left=4 ('E'), 5 ('C' drops), ...
    eventually shrinks to "BANC" (len=4, startIndex=9) -> matched drops to 2

Final Minimum Window = "BANC"`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time</div>
          <div className="cx-val">O(m + n)</div>
          <div className="cx-note">Populating need takes O(m); left and right pointers together traverse s in O(n).</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space</div>
          <div className="cx-val">O(&Sigma;) = O(1)</div>
          <div className="cx-note">Two fixed 128-element integer arrays for ASCII character lookups.</div>
        </div>
      </div>
    </>
  );
}

