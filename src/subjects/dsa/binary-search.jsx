import Code from '../../components/Code.jsx';

export default function BinarySearch() {
  return (
    <>
      <div id="binary-search-basics" data-topic-boundary="true" />


        
        <p className="page-sub">
            Every problem in this document is some variation on the same three-line idea: keep a search window of
            candidate answers, look at its midpoint, and throw away whichever half the midpoint proves cannot
            contain what you're looking for.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 704</span>
            <span className="pill pill-success">Easy</span>
            <span className="pill">Halve the search space every step</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given a sorted array and a target value, return the index of the target,
                or <code>-1</code> if it isn't present.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 The window is defined by <code>[low, high]</code>, both inclusive</div>
                <p>
                    As long as <code>low ≤ high</code>, the window still has at least one candidate index left
                    to check. Look at the midpoint: if it's the target, done. If the target is bigger, it cannot be
                    anywhere in <code>[low, mid]</code> — the whole left half plus the midpoint itself is
                    ruled out, so the next window starts at <code>mid + 1</code>. Symmetrically, if the target is
                    smaller, the next window ends at <code>mid - 1</code>. Every single iteration throws away at
                    least half of whatever was left, which is what gives binary search its
                    <code>O(log n)</code> time.
                </p>
                <div className="recurrence">{`
low = 0 ; high = n - 1
while low ≤ high:
    mid = (low + high) / 2
    if arr[mid] == target: return mid
    else if target > arr[mid]: low = mid + 1    -- discard the left half, INCLUDING mid
    else: high = mid - 1                         -- discard the right half, INCLUDING mid
return -1
`}</div>
            </div>
            <div className="callout callout-warning">
                <div className="callout-title">⚠️ <code>(low + high) / 2</code> can silently overflow in other languages</div>
                In C++ or Java with 32-bit <code>int</code>s, if <code>low</code> and <code>high</code> are both
                close to <code>Integer.MAX_VALUE</code>, their sum can overflow before the division happens. The
                safe form is <code>low + (high - low) / 2</code>, which never adds two large numbers together.
                Every implementation in this document uses the simpler <code>(low + high) / 2</code> for
                readability, matching the rough notes, since none of these problems push array sizes anywhere near
                that boundary — but it's worth knowing the safer form exists for production code.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int search(int[] nums, int target) {
        int n = nums.length;
        int low = 0, high = n - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (target > nums[mid]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }
}
`}</Code>
        <div className="sub-header">
            <h3>Code Implementation — Recursive</h3>
        </div>
        <div className="card">
            <p>
                The exact same logic, phrased as a function that calls itself on a shrinking <code>[low, high]</code>
                window instead of looping. Each call either returns directly or recurses into exactly one of the
                two halves — never both — so the number of calls is still <code>O(log n)</code>.
            </p>
        </div>
        <Code>{`
class Solution {
    private int bs(int[] nums, int low, int high, int target) {
        if (low > high) {
            return -1;
        }
        int mid = (low + high) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (target > nums[mid]) {
            return bs(nums, mid + 1, high, target);
        }
        return bs(nums, low, mid - 1, target);
    }

    public int search(int[] nums, int target) {
        return bs(nums, 0, nums.length - 1, target);
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">The window halves every iteration (or call).</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1) iterative, O(log n) recursive</div>
                <div className="cx-note">The recursive version pays for its call stack.</div>
            </div>
        </div>

      <div id="lower-bound" data-topic-boundary="true" />


        
        <p className="page-sub">
            The first building block almost every later problem in this document is quietly built on top of: the
            smallest index whose value is <strong>not less than</strong> <code>x</code>.
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks</span>
            <span className="pill pill-success">Easy</span>
            <span className="pill">Remember the best answer so far, then keep looking left</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given a sorted array of <code>n</code> elements and a value <code>x</code>,
                find the smallest index <code>i</code> such that <code>arr[i] ≥ x</code>. If no such index
                exists, return <code>n</code> (one past the end — the conventional "not found, but this is
                where it would be inserted" answer).
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 A candidate answer is never discarded outright — only improved on</div>
                <p>
                    Unlike plain search, where a mismatch immediately throws a half away, lower bound needs to find
                    the <em>leftmost</em> index satisfying a condition. Whenever <code>arr[mid] ≥ x</code>, that
                    index is a <strong>valid candidate</strong> — record it in <code>ans</code> — but
                    there might be an even smaller valid index further left, so keep searching the left half anyway
                    (<code>high = mid - 1</code>). Whenever <code>arr[mid] &lt; x</code>, that index can never be
                    the answer, and neither can anything to its left, so move right. <code>ans</code> starts at
                    <code>n</code>, the answer for "nothing qualifies."
                </p>
                <div className="recurrence">{`
low = 0 ; high = n - 1 ; ans = n
while low ≤ high:
    mid = (low + high) / 2
    if arr[mid] ≥ x:
        ans = mid              -- a candidate; remember it
        high = mid - 1          -- but keep looking for something even smaller
    else:
        low = mid + 1           -- arr[mid] is too small; so is everything left of it
return ans
`}</div>
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int lowerBound(int[] arr, int n, int x) {
        int low = 0, high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = (low + high) / 2;
            // maybe an answer
            if (arr[mid] >= x) {
                ans = mid;
                // look for an even smaller qualifying index on the left
                high = mid - 1;
            } else {
                low = mid + 1; // look for right
            }
        }
        return ans;
    }
}
`}</Code>
        <div className="sub-header">
            <h3>Dry run</h3>
        </div>
        <pre className="diagram">{`
arr = [1, 2, 4, 4, 8, 10] , x = 4

  low=0,high=5: mid=2, arr[2]=4 ≥ 4 -> ans=2, high=1
  low=0,high=1: mid=0, arr[0]=1 < 4 -> low=1
  low=1,high=1: mid=1, arr[1]=2 < 4 -> low=2
  low=2 > high=1 -> loop ends

  lowerBound = 2   (the FIRST occurrence of 4)
`}</pre>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Still halves the window every step.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers and an answer variable.</div>
            </div>
        </div>

      <div id="upper-bound" data-topic-boundary="true" />


        
        <p className="page-sub">
            Lower bound's mirror image: the smallest index whose value is <strong>strictly greater than</strong>
            <code>x</code>, rather than greater-than-or-equal.
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks</span>
            <span className="pill pill-success">Easy</span>
            <span className="pill">Same shape as lower bound, one comparison changed</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given a sorted array and a value <code>x</code>, find the smallest index
                <code>i</code> such that <code>arr[i] &gt; x</code>. Return <code>n</code> if none exists.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 The only change from lower bound is <code>≥</code> becoming <code>&gt;</code></div>
                Everything else about the algorithm is identical: a candidate is remembered whenever it qualifies,
                and the search keeps probing left for something even smaller that still qualifies. The entire
                difference between "lower bound" and "upper bound" is whether an index <strong>equal</strong> to
                <code>x</code> counts as qualifying.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int upperBound(int[] arr, int x, int n) {
        int low = 0, high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = (low + high) / 2;
            // maybe an answer
            if (arr[mid] > x) {
                ans = mid;
                // look for an even smaller qualifying index on the left
                high = mid - 1;
            } else {
                low = mid + 1; // look for right
            }
        }
        return ans;
    }
}
`}</Code>
        <div className="callout callout-note">
            <div className="callout-title">📌 <code>upperBound(x) - lowerBound(x)</code> is the count of occurrences of <code>x</code></div>
            Lower bound lands on the first index <code>≥ x</code>; upper bound lands on the first index
            <code>&gt; x</code>. If <code>x</code> is actually present, everything between those two indices is
            exactly equal to <code>x</code> — which is precisely the idea Count Occurrences (7) builds on.
        </div>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Identical shape to lower bound.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers and an answer variable.</div>
            </div>
        </div>

      <div id="search-insert-position" data-topic-boundary="true" />


        
        <p className="page-sub">
            Lower bound under a different name: LeetCode asks for "where would this value go if it isn't already
            here," which is exactly what lower bound already answers.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 35</span>
            <span className="pill pill-success">Easy</span>
            <span className="pill">This problem IS lower bound</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given a sorted array and a target value, return the index if the target
                is found; otherwise return the index where it would be inserted to keep the array sorted.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 "Where would x go" and "first index ≥ x" are the same question</div>
                If <code>x</code> is already present, lower bound returns its first occurrence — correct. If
                it's absent, lower bound returns the first index whose value exceeds it, which is exactly the slot
                <code>x</code> would need to be inserted into so the array stays sorted. No new logic is needed at
                all; this is a direct rename of lower bound (2).
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int searchInsert(int[] arr, int x) {
        int n = arr.length;
        int low = 0, high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = (low + high) / 2;
            // maybe an answer
            if (arr[mid] >= x) {
                ans = mid;
                // look for an even smaller qualifying index on the left
                high = mid - 1;
            } else {
                low = mid + 1; // look for right
            }
        }
        return ans;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Lower bound's complexity, unchanged.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers and an answer variable.</div>
            </div>
        </div>

      <div id="floor-in-a-sorted-array" data-topic-boundary="true" />


        
        <p className="page-sub">
            The largest value that is still <strong>less than or equal to</strong> <code>x</code> — a search
            that moves <strong>right</strong> on a match, since there might be an even larger qualifying value
            further along.
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Mirror the lower-bound shape, but search for the LARGEST qualifier</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given a sorted array and a value <code>x</code>, find the floor of
                <code>x</code> — the largest element in the array that is <code>≤ x</code>. Return
                <code>-1</code> if none exists.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 Floor wants the rightmost qualifier, so a match keeps searching right</div>
                This flips the direction lower bound searches in: whenever <code>arr[mid] ≤ x</code>, that value
                qualifies as a candidate floor, but there might be an even bigger one to the <strong>right</strong>
                that still qualifies — so record it and continue with <code>low = mid + 1</code>. Whenever
                <code>arr[mid] &gt; x</code>, that value (and everything after it) is disqualified, so move left.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int findFloor(int[] arr, int n, int x) {
        int low = 0, high = n - 1;
        int ans = -1;

        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] <= x) {
                ans = arr[mid];
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Standard binary search shape.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers and an answer variable.</div>
            </div>
        </div>

      <div id="first-and-last-occurrence-of-x" data-topic-boundary="true" />


        
        <p className="page-sub">
            Two binary searches — one biased to stop as far left as possible, one biased to stop as far
            right — stitched together into a single answer.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 34</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Lower bound finds the first; a mirrored search finds the last</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given a sorted array and a target value <code>k</code>, return the first
                and last index at which <code>k</code> appears, or <code>{'{-1, -1}'}</code> if it isn't present.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 Lower bound already finds the first occurrence — for free</div>
                <p>
                    If <code>k</code> is actually in the array, <code>lowerBound(arr, n, k)</code> lands exactly on
                    its first occurrence (there is no element equal to <code>k</code> to its left, by
                    definition of lower bound). The last occurrence needs a second, separately-biased search: one
                    that, on a match, keeps looking <strong>right</strong> for an even later occurrence instead of
                    left.
                </p>
                <div className="recurrence">{`
firstAndLastPosition(arr, n, k):
    lb = lowerBound(arr, n, k)
    if lb == n or arr[lb] != k: return {-1, -1}    -- k isn't present at all
    return {lb, upperBound(arr, n, k) - 1}           -- upperBound is one PAST the last match
`}</div>
            </div>
            <div className="callout callout-warning">
                <div className="callout-title">⚠️ The rough notes compared against the wrong variable here</div>
                The original sketch wrote <code>if (lb == n || arr[lb] != x) return {'{-1, -1}'}</code>, but the
                function's parameter is named <code>k</code>, not <code>x</code> — a leftover from copying a
                different signature. The fix is purely cosmetic (comparing against the actual parameter name), and
                the Java below already has it corrected.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    private int lowerBound(int[] arr, int n, int x) {
        int low = 0, high = n - 1;
        int ans = n;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] >= x) { ans = mid; high = mid - 1; }
            else low = mid + 1;
        }
        return ans;
    }

    private int upperBound(int[] arr, int x, int n) {
        int low = 0, high = n - 1;
        int ans = n;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] > x) { ans = mid; high = mid - 1; }
            else low = mid + 1;
        }
        return ans;
    }

    public int[] firstAndLastPosition(int[] arr, int n, int k) {
        int lb = lowerBound(arr, n, k);
        if (lb == n || arr[lb] != k) {
            return new int[]{-1, -1};
        }
        return new int[]{lb, upperBound(arr, k, n) - 1};
    }
}
`}</Code>
        <div className="sub-header">
            <h3>Code Implementation — Direct First/Last Occurrence Search</h3>
        </div>
        <div className="card">
            <p>
                The rough notes also sketch this without reusing <code>lowerBound</code>/<code>upperBound</code>
                at all — two standalone binary searches, each one simply remembering the matching index and
                then continuing to search in the direction that could reveal an even more extreme match.
            </p>
        </div>
        <Code>{`
class Solution {
    private int firstOccurrence(int[] arr, int n, int k) {
        int low = 0, high = n - 1;
        int first = -1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == k) {
                first = mid;
                high = mid - 1;           // keep looking for an EARLIER match
            } else if (arr[mid] < k) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return first;
    }

    private int lastOccurrence(int[] arr, int n, int k) {
        int low = 0, high = n - 1;
        int last = -1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == k) {
                last = mid;
                low = mid + 1;            // keep looking for a LATER match
            } else if (arr[mid] < k) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return last;
    }

    public int[] firstAndLastPosition(int[] arr, int n, int k) {
        int first = firstOccurrence(arr, n, k);
        if (first == -1) {
            return new int[]{-1, -1};
        }
        int last = lastOccurrence(arr, n, k);
        return new int[]{first, last};
    }
}
`}</Code>
        <div className="callout callout-warning">
            <div className="callout-title">⚠️ The rough notes' <code>lastOccurrence</code> had a leftover autocomplete artifact</div>
            The sketch ended with <code>return uint_least8_t;</code> — a stray type name an editor's
            autocomplete clearly inserted in place of <code>return last;</code>. It would not compile as written;
            the Java above returns the actual tracked variable.
        </div>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Two binary searches, run one after the other.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures beyond a few pointers.</div>
            </div>
        </div>

      <div id="count-occurrences-of-x" data-topic-boundary="true" />


        
        <p className="page-sub">
            Once the first and last occurrence are known, counting how many times a value appears is pure
            arithmetic.
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks</span>
            <span className="pill pill-success">Easy</span>
            <span className="pill">last - first + 1</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given a sorted array and a value <code>x</code>, count how many times
                <code>x</code> occurs in it.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 Every occurrence of x sits in one unbroken run, by definition of sorted</div>
                Since the array is sorted, all copies of <code>x</code> are contiguous. First and Last Occurrence
                (6) already finds both ends of that run; the count of elements in an inclusive range
                <code>[first, last]</code> is simply <code>last - first + 1</code>.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int count(int[] arr, int n, int x) {
        int[] ans = firstAndLastPosition(arr, n, x);
        if (ans[0] == -1) {
            return 0;
        }
        return ans[1] - ans[0] + 1;
    }

    private int[] firstAndLastPosition(int[] arr, int n, int k) {
        int first = -1, last = -1;
        int low = 0, high = n - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == k) { first = mid; high = mid - 1; }
            else if (arr[mid] < k) low = mid + 1;
            else high = mid - 1;
        }
        if (first == -1) return new int[]{-1, -1};
        low = 0; high = n - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == k) { last = mid; low = mid + 1; }
            else if (arr[mid] < k) low = mid + 1;
            else high = mid - 1;
        }
        return new int[]{first, last};
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Two binary searches plus one subtraction.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures.</div>
            </div>
        </div>

      <div id="search-rotated-sorted-array-i" data-topic-boundary="true" />

<hr className="part-rule" />
        <div className="part-kicker">Searching a Rotated / Modified Array</div>
        <p className="part-blurb">
            A rotated sorted array is no longer globally sorted, but it keeps a crucial property: at every
            midpoint, at least <strong>one</strong> of the two halves is still perfectly sorted. Every problem
            here is built on spotting which half that is.
        </p>


        
        
        <p className="page-sub">
            No duplicates, so at every step exactly one half is cleanly sorted — check that half's own
            bounds to decide where the target could be hiding.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 33</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Identify the sorted half, then check if the target is inside it</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> A sorted array (no duplicates) has been rotated at some unknown pivot.
                Search for a target value and return its index, or <code>-1</code> if absent.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 One half of every window is always sorted — find out which</div>
                <p>
                    Comparing <code>arr[low]</code> to <code>arr[mid]</code> tells you which half is sorted:
                    if <code>arr[low] ≤ arr[mid]</code>, the <strong>left</strong> half
                    <code>[low, mid]</code> is sorted (no rotation point inside it); otherwise the
                    <strong>right</strong> half <code>[mid, high]</code> must be. Once you know which half is
                    sorted, a plain range check (<code>arr[low] ≤ k ≤ arr[mid]</code>, or the mirror on the
                    right) tells you whether the target could possibly be in that sorted half. If it is, search
                    there; if not, the target — if it exists at all — must be in the <em>other</em>
                    half, rotation point and all.
                </p>
                <div className="recurrence">{`
while low ≤ high:
    mid = (low + high) / 2
    if arr[mid] == k: return mid

    if arr[low] ≤ arr[mid]:                      -- left half [low, mid] is sorted
        if arr[low] ≤ k ≤ arr[mid]: high = mid - 1
        else: low = mid + 1
    else:                                           -- right half [mid, high] is sorted
        if arr[mid] ≤ k ≤ arr[high]: low = mid + 1
        else: high = mid - 1
return -1
`}</div>
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int search(int[] arr, int n, int k) {
        int low = 0, high = n - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == k) {
                return mid;
            }

            if (arr[low] <= arr[mid]) {              // left half is sorted
                if (arr[low] <= k && k <= arr[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {                                 // right half is sorted
                if (arr[mid] <= k && k <= arr[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Still halves the window every step.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers.</div>
            </div>
        </div>

      <div id="search-rotated-sorted-array-ii" data-topic-boundary="true" />


        
        <p className="page-sub">
            Same idea as Part I, with one extra wrinkle: duplicates can make <code>arr[low] == arr[mid] == arr[high]</code>
            without telling you anything about which half is sorted.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 81</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">When in doubt, shrink the window from both ends by one</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Same as Search in a Rotated Sorted Array I, except the array
                <strong>may contain duplicates</strong>. Return <code>true</code> if the target is present.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 Duplicates can defeat the "which half is sorted" check — so shrink past them</div>
                <p>
                    When <code>arr[low] == arr[mid] == arr[high]</code>, the comparison that normally identifies
                    the sorted half becomes uninformative — both halves look identical from the outside, even
                    though the rotation point could be hiding in either one. The fix costs nothing asymptotically
                    in the typical case: just shrink the window by moving <code>low</code> forward and
                    <code>high</code> backward by one each, and try again. This can degrade the worst case (an
                    array of all-identical values) to <code>O(n)</code>, but it's the only way to make progress
                    when the three key values give no information.
                </p>
                <div className="recurrence">{`
while low ≤ high:
    mid = (low + high) / 2
    if arr[mid] == k: return true

    if arr[low] == arr[mid] and arr[mid] == arr[high]:
        low++ ; high-- ; continue          -- can't tell which half is sorted; shrink and retry

    ...the same sorted-half logic as Part I...
return false
`}</div>
            </div>
            <div className="callout callout-warning">
                <div className="callout-title">⚠️ This is why duplicates cost Search in Rotated Sorted Array its O(log n) guarantee</div>
                A pathological input like <code>[2,2,2,2,2,2,2,1,2,2]</code> forces the <code>low++, high--</code>
                branch over and over, degrading to a linear scan in the worst case. There is no way around this
                while duplicates are allowed — it's an inherent cost of the problem, not a flaw in this
                particular implementation.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public boolean searchInARotatedSortedArrayII(int[] arr, int k) {
        int n = arr.length;
        int low = 0, high = n - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == k) {
                return true;
            }

            if (arr[low] == arr[mid] && arr[mid] == arr[high]) {
                low++;
                high--;
                continue;
            }

            if (arr[low] <= arr[mid]) {              // left half is sorted
                if (arr[low] <= k && k <= arr[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {                                 // right half is sorted
                if (arr[mid] <= k && k <= arr[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return false;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n) average, O(n) worst case</div>
                <div className="cx-note">Worst case happens only with heavy duplication.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers.</div>
            </div>
        </div>

      <div id="minimum-in-rotated-sorted-array" data-topic-boundary="true" />


        
        <p className="page-sub">
            The minimum is whatever sits just after the rotation point — find the sorted half at every step
            and keep its leftmost value as a candidate.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 153</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">The sorted half's own first element is always a valid candidate minimum</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Find the minimum element in a rotated sorted array (no duplicates).
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 Whichever half is sorted, its leftmost element is a candidate minimum</div>
                <p>
                    As soon as the remaining window <code>[low, high]</code> is itself fully sorted
                    (<code>arr[low] ≤ arr[high]</code>), <code>arr[low]</code> is the true minimum of that
                    window and the search can stop immediately. Otherwise, exactly one half is sorted; that
                    half's leftmost value (<code>arr[low]</code> or <code>arr[mid]</code>, whichever starts the
                    sorted half) is a valid candidate for the global minimum — record it, then continue
                    searching the <em>other</em>, still-rotated half, since the true minimum must live wherever
                    the rotation point still is.
                </p>
                <div className="recurrence">{`
ans = INT_MAX
while low ≤ high:
    mid = (low + high) / 2

    if arr[low] ≤ arr[high]:             -- this whole window is already sorted
        ans = min(ans, arr[low])
        break

    if arr[low] ≤ arr[mid]:              -- left half [low, mid] is sorted
        ans = min(ans, arr[low])
        low = mid + 1                        -- rotation point is on the right; keep looking there
    else:                                    -- right half [mid, high] is sorted
        high = mid - 1                        -- rotation point is on the left; keep looking there
        ans = min(ans, arr[mid])
return ans
`}</div>
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int findMin(int[] arr) {
        int low = 0, high = arr.length - 1;
        int ans = Integer.MAX_VALUE;

        while (low <= high) {
            int mid = (low + high) / 2;

            // search space is already sorted; arr[low] is the smallest in it
            if (arr[low] <= arr[high]) {
                ans = Math.min(ans, arr[low]);
                break;
            }

            if (arr[low] <= arr[mid]) {
                ans = Math.min(ans, arr[low]);
                low = mid + 1;
            } else {
                high = mid - 1;
                ans = Math.min(ans, arr[mid]);
            }
        }
        return ans;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">The window still halves every step.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers and a running answer.</div>
            </div>
        </div>

      <div id="number-of-times-array-rotated" data-topic-boundary="true" />


        
        <p className="page-sub">
            A slight reframing of Minimum in a Rotated Sorted Array: the number of rotations performed on a sorted
            array is exactly the <strong>index</strong> of its minimum element.
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Track the INDEX of the candidate minimum, not just its value</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given a rotated sorted array (no duplicates), find how many times it was
                rotated to the right from its original sorted order.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 If the minimum sits at index i, the array was rotated exactly i times</div>
                Rotating a sorted array once moves its smallest element from index <code>0</code> to the very end;
                rotating it <code>k</code> times total leaves the smallest element sitting at index <code>k</code>
                from the start of what's now the array (equivalently, at index <code>n - k</code> from the end).
                So this problem is Minimum in a Rotated Sorted Array (10), but tracking the minimum's
                <strong>index</strong> alongside its value instead of just the value.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int findKRotation(int[] arr) {
        int low = 0, high = arr.length - 1;
        int ans = Integer.MAX_VALUE;
        int index = -1;

        while (low <= high) {
            int mid = (low + high) / 2;

            // search space is already sorted; arr[low] is the smallest in it
            if (arr[low] <= arr[high]) {
                if (arr[low] < ans) {
                    index = low;
                    ans = arr[low];
                }
                break;
            }

            if (arr[low] <= arr[mid]) {              // left half is sorted
                if (arr[low] < ans) {
                    index = low;
                    ans = arr[low];
                }
                low = mid + 1;
            } else {                                  // right half is sorted
                high = mid - 1;
                if (arr[mid] < ans) {
                    index = mid;
                    ans = arr[mid];
                }
            }
        }
        return index;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Identical shape to Minimum in a Rotated Sorted Array.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers and a running best (value, index) pair.</div>
            </div>
        </div>

      <div id="single-element-in-sorted-array" data-topic-boundary="true" />


        
        <p className="page-sub">
            Every value appears exactly twice except one — and in a sorted array, "pairing up correctly" has
            a parity signature that binary search can check at any index without scanning the whole array.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 540</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Before the single element, pairs start at even indices</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> A sorted array has every element appearing exactly twice, except one
                element which appears once. Find that single element in <code>O(log n)</code>.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 The single element shifts every pair's starting index by one</div>
                <p>
                    Before the single element, each pair occupies indices <code>(even, odd)</code> — e.g.
                    indices <code>0,1</code> are a pair, <code>2,3</code> are a pair, and so on. The single element
                    breaks this pattern: from its position onward, pairs instead occupy
                    <code>(odd, even)</code>. So at any index <code>mid</code>, checking whether it still matches
                    its "expected" partner (<code>mid-1</code> if <code>mid</code> is odd, <code>mid+1</code> if
                    <code>mid</code> is even) tells you instantly whether the single element is still ahead of
                    <code>mid</code> or has already been passed.
                </p>
                <div className="recurrence">{`
if arr[mid] != arr[mid-1] and arr[mid] != arr[mid+1]: return arr[mid]   -- mid IS the single one

-- otherwise mid is still part of an intact pair; figure out which side is still "correctly paired"
if (mid is odd and arr[mid] == arr[mid-1]) or (mid is even and arr[mid] == arr[mid+1]):
    low = mid + 1      -- everything up to and including mid is still normally paired; single is to the right
else:
    high = mid - 1     -- the single element already appeared somewhere at or before mid
`}</div>
            </div>
            <div className="callout callout-tip">
                <div className="callout-title">💡 Edge checks handle the single element sitting at either end</div>
                If <code>arr[0] != arr[1]</code>, the single element must be <code>arr[0]</code> itself (nothing
                else could have broken the very first pair). The symmetric check handles
                <code>arr[n-1]</code>. These two one-line checks let the main loop safely assume
                <code>mid</code> is never the first or last index, so <code>mid-1</code> and <code>mid+1</code>
                are always in bounds.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int singleNonDuplicate(int[] arr) {
        int n = arr.length;
        if (n == 1) {
            return arr[0];
        }
        if (arr[0] != arr[1]) {
            return arr[0];
        }
        if (arr[n - 1] != arr[n - 2]) {
            return arr[n - 1];
        }

        int low = 1, high = n - 2;
        while (low <= high) {
            int mid = (low + high) / 2;

            if (arr[mid] != arr[mid + 1] && arr[mid] != arr[mid - 1]) {
                return arr[mid];
            }

            // we are on an intact pair to the left of the single element
            if ((mid % 2 == 1 && arr[mid] == arr[mid - 1])
                    || (mid % 2 == 0 && arr[mid] == arr[mid + 1])) {
                low = mid + 1;
            } else {
                // we are on (or past) the single element's side
                high = mid - 1;
            }
        }
        return -1;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Standard binary search shape.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers.</div>
            </div>
        </div>

      <div id="find-peak-element" data-topic-boundary="true" />


        
        <p className="page-sub">
            A peak is a local maximum — strictly bigger than both neighbours. Binary search can find one in
            <code>O(log n)</code> by always stepping toward the uphill direction.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 162</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Walk uphill — a peak is guaranteed to exist in that direction</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given an array where <code>arr[-1] = arr[n] = -∞</code> (the
                boundaries), find any peak element — one strictly greater than both of its neighbours —
                and return its index.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 If the slope at mid is going up, a peak is guaranteed somewhere further uphill</div>
                <p>
                    If <code>arr[mid] &gt; arr[mid-1]</code> and <code>arr[mid] &gt; arr[mid+1]</code>, <code>mid</code>
                    is itself a peak — done. Otherwise, follow the slope: if the array is still rising going
                    right (<code>arr[mid] &lt; arr[mid+1]</code>), there must be a peak somewhere to the right
                    (the sequence can't rise forever since it's bounded by <code>-∞</code> past the end), so
                    search right. Otherwise the slope is falling to the right, which guarantees a peak to the left
                    by the same logic run backward.
                </p>
                <div className="recurrence">{`
if arr[0] > arr[1]: return 0                         -- peak at the left boundary
if arr[n-1] > arr[n-2]: return n-1                     -- peak at the right boundary

low = 1 ; high = n - 2
while low ≤ high:
    mid = (low + high) / 2
    if arr[mid] > arr[mid-1] and arr[mid] > arr[mid+1]: return mid     -- mid IS a peak
    else if arr[mid] > arr[mid-1]: low = mid + 1                       -- still rising; peak is further right
    else: high = mid - 1                                                  -- falling (or at a valley); peak is left
return -1
`}</div>
            </div>
            <div className="callout callout-note">
                <div className="callout-title">📌 There can be several valid peaks — any one of them is an acceptable answer</div>
                An array like <code>[1,3,2,4,1]</code> has two peaks (index 1 and index 3). This binary search
                follows one particular slope and is only guaranteed to find <em>a</em> peak, not necessarily the
                largest or the first one — which matches exactly what the problem asks for.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int findPeakElement(int[] arr) {
        int n = arr.length;
        if (n == 1) {
            return 0;
        }
        if (arr[0] > arr[1]) {
            return 0;
        }
        if (arr[n - 1] > arr[n - 2]) {
            return n - 1;
        }

        int low = 1, high = n - 2;
        while (low <= high) {
            int mid = (low + high) / 2;

            if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) {
                return mid;
            } else if (arr[mid] > arr[mid - 1]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Standard binary search shape.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers.</div>
            </div>
        </div>

      <div id="square-root-of-a-number" data-topic-boundary="true" />

<hr className="part-rule" />
        <div className="part-kicker">Binary Search on the Answer</div>
        <p className="part-blurb">
            The pivot of this whole document: binary search doesn't need a sorted array to work on. All it needs
            is a monotonic yes/no question — "is this candidate answer good enough?" — whose answer
            flips exactly once as the candidate increases. Search the space of <em>possible answers</em> instead
            of the space of array indices.
        </p>


        
        
        <p className="page-sub">
            The first, simplest example of binary-searching over a space of candidate answers rather than array
            indices.
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks</span>
            <span className="pill pill-success">Easy</span>
            <span className="pill">Is mid*mid ≤ n? A monotonic question over candidate answers</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given a non-negative integer <code>n</code>, find
                <code>⌊√n⌋</code> — the floor of its square root — without using a
                built-in square root function.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 "Is mid² ≤ n?" is true for small mid, false for large mid — exactly once it flips</div>
                That flip point is lower bound's shape again, just over the range of <em>possible square roots</em>
                <code>[1, n]</code> instead of array indices. Every candidate whose square is <code>≤ n</code>
                is a valid (if possibly non-maximal) answer; the search keeps the largest one found by continuing
                to probe right after a success.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int floorSqrt(int n) {
        int low = 1, high = n;
        while (low <= high) {
            long mid = (low + high) / 2;
            long val = mid * mid;
            if (val <= n) {
                low = (int) mid + 1;
            } else {
                high = (int) mid - 1;
            }
        }
        return high;
    }
}
`}</Code>
        <div className="callout callout-warning">
            <div className="callout-title">⚠️ <code>mid * mid</code> needs a wider type than <code>int</code></div>
            For large <code>n</code> (close to <code>Integer.MAX_VALUE</code>), squaring <code>mid</code> can
            overflow a 32-bit <code>int</code> before the comparison even happens. Computing <code>mid</code> and
            <code>val</code> as <code>long</code> avoids that silently wrong result.
        </div>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Binary search over the range of candidate roots.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers.</div>
            </div>
        </div>

      <div id="nth-root-of-a-number" data-topic-boundary="true" />


        
        <p className="page-sub">
            Square root (14), generalised from "squared" to "raised to any power <code>n</code>."
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Is mid^n exactly m? Abort early if it overshoots</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given integers <code>n</code> and <code>m</code>, find
                <code>x</code> such that <code>x<sup>n</sup> = m</code>, or report that no such integer exists.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 A three-way helper tells the search exactly which direction to move</div>
                A helper function raises a candidate <code>mid</code> to the power <code>n</code> and reports one
                of three outcomes: exactly <code>m</code> (success), less than <code>m</code> (search higher), or
                greater than <code>m</code> (search lower). The helper bails out the instant the running product
                exceeds <code>m</code>, which avoids computing a possibly enormous, overflow-prone power in full.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    // returns 1 if mid^n == m, 0 if mid^n < m, 2 if mid^n > m
    private int func(int mid, int n, int m) {
        long ans = 1;
        for (int i = 1; i <= n; i++) {
            ans = ans * mid;
            if (ans > m) {
                return 2;
            }
        }
        if (ans == m) {
            return 1;
        }
        return 0;
    }

    public int nthRoot(int n, int m) {
        int low = 1, high = m;
        while (low <= high) {
            int mid = (low + high) / 2;
            int midN = func(mid, n, m);
            if (midN == 1) {
                return mid;
            } else if (midN == 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log m · n)</div>
                <div className="cx-note">Binary search over the answer, each check costing up to n multiplications.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers.</div>
            </div>
        </div>

      <div id="koko-eating-bananas" data-topic-boundary="true" />


        
        <p className="page-sub">
            The template for every "minimize the max" / "minimize the resource" problem in this part: binary
            search on the candidate rate, and a helper that simulates the whole process at that rate.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 875</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Faster eating is monotonically "more feasible"</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> There are <code>n</code> piles of bananas, pile <code>i</code> having
                <code>v[i]</code> bananas. Koko can eat at some speed of <code>k</code> bananas per hour: from each
                pile she eats at most <code>k</code>, and if a pile has fewer than <code>k</code> left she finishes
                it and moves on, using up the rest of that hour anyway. Find the <strong>minimum</strong> integer
                <code>k</code> such that she can eat all the bananas within <code>h</code> hours.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 "Can Koko finish in time at speed k?" flips exactly once as k increases</div>
                <p>
                    At speed <code>k</code>, eating pile <code>i</code> takes
                    <code>⌈ v[i] / k ⌉</code> hours (a partial pile still costs a whole hour). Summing
                    that over every pile gives the total hours needed at speed <code>k</code> — and that
                    total only ever <strong>decreases</strong> as <code>k</code> increases. That monotonicity is
                    exactly what binary search needs: search over candidate speeds
                    <code>[1, max(v)]</code> (eating faster than the largest pile is never useful), and for each
                    candidate, check whether the total time is within budget.
                </p>
                <div className="recurrence">{`
low = 1 ; high = max(v)
while low ≤ high:
    mid = (low + high) / 2
    totalHours = sum of ceil(v[i] / mid) for every pile
    if totalHours ≤ h: high = mid - 1      -- mid is fast enough; try something slower
    else: low = mid + 1                        -- too slow; speed up
return low
`}</div>
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    private int findMax(int[] v) {
        int maxi = Integer.MIN_VALUE;
        for (int i = 0; i < v.length; i++) {
            maxi = Math.max(maxi, v[i]);
        }
        return maxi;
    }

    private int calculateTotalHours(int[] v, int hourly) {
        int totalH = 0;
        for (int i = 0; i < v.length; i++) {
            totalH += Math.ceil((double) v[i] / (double) hourly);
        }
        return totalH;
    }

    public int minimumRateToEatBananas(int[] v, int h) {
        int low = 1, high = findMax(v);

        while (low <= high) {
            int mid = (low + high) / 2;
            int totalH = calculateTotalHours(v, mid);
            if (totalH <= h) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
}
`}</Code>
        <div className="callout callout-note">
            <div className="callout-title">📌 The loop returns <code>low</code>, not a separately tracked <code>ans</code></div>
            This is the "lowest feasible speed" shape: every time the current speed is fast enough,
            <code>high</code> shrinks in case something slower also works; every time it's too slow,
            <code>low</code> advances past it. When the loop ends, <code>low</code> has been pushed exactly to the
            smallest speed that is feasible — it doubles as the running answer, with no separate variable
            needed.
        </div>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(n · log(max(v)))</div>
                <div className="cx-note">Binary search over the speed, each check scanning every pile once.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures.</div>
            </div>
        </div>

      <div id="min-days-to-make-m-bouquets" data-topic-boundary="true" />


        
        <p className="page-sub">
            Koko's pattern again — binary search on a candidate day, with a feasibility check that scans the
            whole garden once.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 1482</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">"Can we make m bouquets by day d?" is monotonic in d</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> <code>bloomDay[i]</code> is the day flower <code>i</code> blooms. A
                bouquet needs <code>k</code> <strong>adjacent</strong> already-bloomed flowers. Find the minimum
                day by which <code>m</code> bouquets can be made, or <code>-1</code> if it's impossible.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 Feasibility at day d is a single linear scan counting adjacent runs</div>
                <p>
                    On any candidate day <code>d</code>, a flower is usable if its <code>bloomDay ≤ d</code>.
                    Scanning left to right, count how many <strong>consecutive</strong> usable flowers appear; every
                    time that run reaches exactly <code>k</code>, one bouquet is formed and the running count
                    resets to zero (a run longer than <code>k</code> just means more bouquets fit end to end). If
                    an unusable flower is hit, the run breaks. "Can we make <code>m</code> bouquets by day
                    <code>d</code>" only ever gets <strong>easier</strong> as <code>d</code> grows — exactly
                    the monotonic question binary search needs.
                </p>
                <div className="recurrence">{`
possible(arr, day, m, k):
    cnt = 0 ; noOfBouquets = 0
    for each flower:
        if arr[flower] ≤ day: cnt++
        else: noOfBouquets += cnt / k ; cnt = 0      -- run broken; bank whatever it was worth
    noOfBouquets += cnt / k                           -- bank the final run too
    return noOfBouquets ≥ m

roseGarden(arr, m, k):
    if (long) m * k > arr.length: return -1          -- not enough flowers to EVER make m bouquets
    low = min(arr) ; high = max(arr)
    while low ≤ high:
        mid = (low + high) / 2
        if possible(arr, mid, m, k): high = mid - 1    -- feasible; try an even earlier day
        else: low = mid + 1
    return low
`}</div>
            </div>
            <div className="callout callout-warning">
                <div className="callout-title">⚠️ Check <code>m * k &gt; n</code> up front, before searching at all</div>
                If there simply aren't enough flowers in total to ever form <code>m</code> bouquets of size
                <code>k</code>, no day will ever make it feasible — the binary search would run to
                completion and return a meaningless day. The notes compute <code>m * k</code> as a
                <code>long</code> specifically so this check itself can't overflow before it gets the chance to
                catch the impossible case.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    private boolean possible(int[] arr, int day, int m, int k) {
        int cnt = 0;
        int noOfB = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] <= day) {
                cnt++;
            } else {
                noOfB += (cnt / k);
                cnt = 0;
            }
        }
        noOfB += (cnt / k);
        return noOfB >= m;
    }

    public int roseGarden(int[] arr, int r, int b) {
        long val = (long) r * (long) b;
        if (val > arr.length) {
            return -1;
        }

        int mini = Integer.MAX_VALUE, maxi = Integer.MIN_VALUE;
        for (int i = 0; i < arr.length; i++) {
            mini = Math.min(mini, arr[i]);
            maxi = Math.max(maxi, arr[i]);
        }

        int low = mini, high = maxi;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (possible(arr, mid, r, b)) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(n · log(max - min))</div>
                <div className="cx-note">Binary search over the day, each check a single linear scan.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures.</div>
            </div>
        </div>

      <div id="smallest-divisor-given-a-threshold" data-topic-boundary="true" />


        
        <p className="page-sub">
            Another "smaller divisor → bigger quotient-sum" monotonic relationship, searched the same way as
            Koko's eating speed.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 1283</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Smaller divisor never decreases the sum of ceilings</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given an array and an integer <code>threshold</code>, find the smallest
                positive integer divisor such that the sum of
                <code>⌈ arr[i] / divisor ⌉</code> over the whole array is <code>≤ threshold</code>.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 Structurally identical to Koko — only the summed quantity changes</div>
                Dividing by a larger candidate divisor shrinks every term's ceiling, so the total sum only ever
                decreases as the divisor grows — exactly the monotonic shape Koko Eating Bananas (16) already
                exploits, just phrased as "sum of ceilings" instead of "sum of hours."
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    private int sumByD(int[] arr, int div) {
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum = sum + (int) Math.ceil((double) arr[i] / (double) div);
        }
        return sum;
    }

    public int smallestDivisor(int[] arr, int limit) {
        int low = 1, high = 0;
        for (int v : arr) {
            high = Math.max(high, v);
        }

        while (low <= high) {
            int mid = (low + high) / 2;
            if (sumByD(arr, mid) <= limit) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(n · log(max(arr)))</div>
                <div className="cx-note">Binary search over the divisor, each check scanning the array once.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures.</div>
            </div>
        </div>

      <div id="ship-packages-in-d-days" data-topic-boundary="true" />


        
        <p className="page-sub">
            A bigger ship capacity always needs fewer-or-equal days to clear the same packages — the
            monotonic relationship binary search needs, once again.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 1011</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Greedily load each day up to capacity, count the days it takes</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Packages (given as weights, in order) must ship within <code>d</code>
                days. Each day, packages are loaded in order onto the ship, up to its weight capacity. Find the
                minimum ship capacity that still ships everything within <code>d</code> days.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 A greedy simulation turns "feasible at capacity c" into one linear scan</div>
                <p>
                    At a candidate capacity, greedily keep adding packages to the current day's load; the moment
                    the next package would overflow capacity, start a new day with that package as its first
                    item. Counting how many days that greedy process takes gives exactly the days needed at that
                    capacity — and a bigger capacity can only ever need the same or fewer days, which is the
                    monotonicity binary search exploits.
                </p>
                <div className="recurrence">{`
low = max(weights)              -- capacity must fit the single heaviest package
high = sum(weights)              -- one day, everything at once, always works

while low ≤ high:
    mid = (low + high) / 2
    daysNeeded = greedily pack at capacity mid, counting days
    if daysNeeded ≤ d: high = mid - 1     -- feasible; try a smaller capacity
    else: low = mid + 1
return low
`}</div>
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    private int findDays(int[] weights, int cap) {
        int days = 1, load = 0;
        for (int i = 0; i < weights.length; i++) {
            if (weights[i] + load > cap) {
                days += 1;
                load = weights[i];
            } else {
                load += weights[i];
            }
        }
        return days;
    }

    public int leastWeightCapacity(int[] weights, int d) {
        int low = 0, high = 0;
        for (int w : weights) {
            low = Math.max(low, w);
            high += w;
        }

        while (low <= high) {
            int mid = (low + high) / 2;
            int numberOfDays = findDays(weights, mid);
            if (numberOfDays <= d) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(n · log(Σweights))</div>
                <div className="cx-note">Binary search over the capacity, each check a single greedy pass.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures.</div>
            </div>
        </div>

      <div id="kth-missing-positive-number" data-topic-boundary="true" />


        
        <p className="page-sub">
            Comparing an index's position against its value reveals exactly how many positive numbers have gone
            missing before it — and that "missing count" only ever grows, which is the monotonicity this
            search needs.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 1539</span>
            <span className="pill pill-success">Easy</span>
            <span className="pill">missing(mid) = arr[mid] - (mid + 1)</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given a strictly increasing array of positive integers and an integer
                <code>k</code>, find the <code>k</code>-th positive integer that is <strong>missing</strong> from
                the array.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 If nothing were missing, arr[i] would equal i + 1 — the gap IS the missing count</div>
                <p>
                    In a gap-free array, the element at index <code>i</code> (0-indexed) would be exactly
                    <code>i + 1</code>. Whenever it's larger than that, every extra unit of difference is a
                    positive integer that got skipped somewhere at or before that index. So
                    <code>arr[mid] - (mid + 1)</code> is precisely the count of missing positive numbers up to and
                    including index <code>mid</code> — and this count never decreases as <code>mid</code>
                    grows, which is exactly the monotonic signal binary search needs. Find the last index whose
                    missing-count is still <code>&lt; k</code>; the answer sits just past it.
                </p>
                <div className="recurrence">{`
low = 0 ; high = n - 1
while low ≤ high:
    mid = (low + high) / 2
    missing = arr[mid] - (mid + 1)
    if missing < k: low = mid + 1          -- not enough missing numbers yet; look further right
    else: high = mid - 1
return k + high + 1
`}</div>
            </div>
            <div className="callout callout-note">
                <div className="callout-title">📌 Why the final answer is <code>k + high + 1</code>, not just <code>high</code></div>
                When the loop ends, <code>high</code> is the last index where fewer than <code>k</code> numbers
                are missing (so exactly <code>high + 1</code> missing numbers have occurred within the first
                <code>high + 1</code> array values). The <code>k</code>-th missing number itself is
                <code>k</code> positions further along the number line than where the array has "used up"
                <code>high + 1</code> of the integers — giving <code>(high + 1) + k</code>.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int missingK(int[] vec, int n, int k) {
        int low = 0, high = n - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            int missing = vec[mid] - (mid + 1);
            if (missing < k) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return k + high + 1;
    }
}
`}</Code>
        <div className="sub-header">
            <h3>Dry run</h3>
        </div>
        <pre className="diagram">{`
arr = [2, 3, 4, 7, 11] , k = 5

  idx:     0  1  2  3   4
  arr:     2  3  4  7   11
  missing: 1  1  1  3   6     (arr[i] - (i+1))

  low=0,high=4: mid=2, missing=1 < 5 -> low=3
  low=3,high=4: mid=3, missing=3 < 5 -> low=4
  low=4,high=4: mid=4, missing=6 ≥ 5 -> high=3
  low=4 > high=3 -> loop ends

  answer = k + high + 1 = 5 + 3 + 1 = 9

  Missing numbers in order: 1, 5, 6, 8, 9, 10, ...
  The 5th one is indeed 9.
`}</pre>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log n)</div>
                <div className="cx-note">Standard binary search shape.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers.</div>
            </div>
        </div>

      <div id="aggressive-cows" data-topic-boundary="true" />

<hr className="part-rule" />
        <div className="part-kicker">Allocation &amp; Partition Problems</div>
        <p className="part-blurb">
            A family of problems that all reduce to the same question: "if I cap every share at <code>mid</code>,
            how many shares does that force me to use?" — and that forced count is always monotonic in
            <code>mid</code>.
        </p>


        
        
        <p className="page-sub">
            The template for the whole "allocation" family: binary search on the candidate minimum distance, with
            a greedy feasibility check.
        </p>
        <div className="meta-row">
            <span className="pill">SPOJ / GeeksforGeeks</span>
            <span className="pill pill-warn">Hard</span>
            <span className="pill">Maximize the minimum distance — greedily place cows as early as possible</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given stall positions and <code>k</code> cows to place in them, maximize
                the <strong>minimum</strong> distance between any two cows.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 "Can k cows all be ≥ dist apart?" is checkable with one greedy pass</div>
                <p>
                    Sort the stalls first. Place the first cow at the first stall, then greedily place every
                    subsequent cow at the next stall that is at least <code>dist</code> away from the last placed
                    cow. If that greedy process manages to place all <code>k</code> cows, <code>dist</code> is
                    feasible. A larger <code>dist</code> is strictly harder to satisfy than a smaller one —
                    the monotonicity binary search needs — so search for the <strong>largest</strong>
                    feasible <code>dist</code>, over the range <code>[1, max(stalls) - min(stalls)]</code>.
                </p>
                <div className="recurrence">{`
canWePlace(stalls, dist, cows):
    cntCows = 1 ; last = stalls[0]
    for i in 1..n-1:
        if stalls[i] - last ≥ dist:
            cntCows++ ; last = stalls[i]
        if cntCows ≥ cows: return true
    return false

aggressiveCows(stalls, k):
    sort(stalls)
    low = 1 ; high = stalls[n-1] - stalls[0]
    while low ≤ high:
        mid = (low + high) / 2
        if canWePlace(stalls, mid, k): low = mid + 1    -- feasible; try an even LARGER min distance
        else: high = mid - 1
    return high
`}</div>
            </div>
            <div className="callout callout-note">
                <div className="callout-title">📌 This is the "maximize the minimum" mirror of Koko's "minimize the maximum"</div>
                Koko Eating Bananas and the ship-capacity problem search for the <em>smallest</em> feasible
                value, so a success shrinks <code>high</code>. Here, a larger distance is "better" (that's what's
                being maximized), so a success instead pushes <code>low</code> up, and the final answer comes
                from <code>high</code> rather than <code>low</code> once the loop ends.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    private boolean canWePlace(int[] stalls, int dist, int cows) {
        int cntCows = 1;
        int last = stalls[0];
        for (int i = 1; i < stalls.length; i++) {
            if (stalls[i] - last >= dist) {
                cntCows++;
                last = stalls[i];
            }
            if (cntCows >= cows) {
                return true;
            }
        }
        return false;
    }

    public int aggressiveCows(int[] stalls, int k) {
        Arrays.sort(stalls);
        int n = stalls.length;
        int low = 1, high = stalls[n - 1] - stalls[0];

        while (low <= high) {
            int mid = (low + high) / 2;
            if (canWePlace(stalls, mid, k)) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return high;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(n log n + n log(max dist))</div>
                <div className="cx-note">Sort once, then binary search with a linear feasibility check.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Excluding the sort's own space.</div>
            </div>
        </div>

      <div id="allocate-books" data-topic-boundary="true" />


        
        <p className="page-sub">
            Aggressive Cows' mirror image: instead of maximizing a minimum gap, minimize a maximum load —
            but the binary-search-on-the-answer machinery is identical.
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks</span>
            <span className="pill pill-warn">Hard</span>
            <span className="pill">Greedily fill each student up to the candidate cap</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> <code>n</code> books (with page counts) are to be allocated to
                <code>m</code> students, each student getting a <strong>contiguous</strong> block of books.
                Minimize the maximum number of pages any single student has to read.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 Feasibility at a candidate cap is the same greedy shape as Ship Packages</div>
                <p>
                    Greedily assign books to the current student until the next book would push them over the
                    candidate page cap, then start a new student. Counting students used this way tells you
                    whether the cap is feasible — and a bigger cap can only ever need the same or fewer
                    students, which is exactly the monotonic relationship this search needs. This is, structurally,
                    the exact same problem as Least Capacity to Ship Packages (19): "pages" plays the role of
                    "weight," and "students" plays the role of "days."
                </p>
                <div className="recurrence">{`
countStudents(arr, pages):
    students = 1 ; pagesStudent = 0
    for each book:
        if pagesStudent + book ≤ pages: pagesStudent += book
        else: students++ ; pagesStudent = book
    return students

findPages(arr, m):
    if m > n: return -1                          -- fewer books than students; impossible
    low = max(arr) ; high = sum(arr)
    while low ≤ high:
        mid = (low + high) / 2
        if countStudents(arr, mid) > m: low = mid + 1    -- too many students needed; raise the cap
        else: high = mid - 1
    return low
`}</div>
            </div>
            <div className="callout callout-warning">
                <div className="callout-title">⚠️ <code>m &gt; n</code> must be checked before searching</div>
                If there are more students than books, at least one student is guaranteed to get zero books,
                which the problem disallows (every student must get at least one contiguous block) — the
                search has no feasible answer to converge to, so this case is rejected up front.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    private int countStudents(int[] arr, int pages) {
        int students = 1;
        long pagesStudent = 0;
        for (int i = 0; i < arr.length; i++) {
            if (pagesStudent + arr[i] <= pages) {
                pagesStudent += arr[i];
            } else {
                students += 1;
                pagesStudent = arr[i];
            }
        }
        return students;
    }

    public int findPages(int[] arr, int n, int m) {
        if (m > n) {
            return -1;
        }

        int low = 0, high = 0;
        for (int v : arr) {
            low = Math.max(low, v);
            high += v;
        }

        while (low <= high) {
            int mid = (low + high) / 2;
            int students = countStudents(arr, mid);
            if (students > m) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(n · log(Σpages))</div>
                <div className="cx-note">Binary search over the cap, each check a single greedy pass.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures.</div>
            </div>
        </div>

      <div id="painters-partition" data-topic-boundary="true" />


        
        <p className="page-sub">
            A different cover story, the exact same problem as Allocate Minimum Number of Pages.
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks / SPOJ</span>
            <span className="pill pill-warn">Hard</span>
            <span className="pill">Boards : painters :: books : students</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given <code>k</code> painters and board lengths, each painter paints a
                <strong>contiguous</strong> block of boards, taking one unit of time per unit length. Minimize the
                maximum time any single painter spends.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 Swap the nouns and this IS Allocate Minimum Number of Pages</div>
                "Board length" plays the role of "pages," "painter" plays the role of "student," and "time spent"
                plays the role of "pages read." Every piece of the feasibility check and the binary search bounds
                carries over unchanged — this problem needs no new logic at all, just a call into the same
                <code>findPages</code> routine from Allocate Minimum Number of Pages (22).
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    private int countStudents(int[] boards, int time) {
        int painters = 1;
        long timePainter = 0;
        for (int i = 0; i < boards.length; i++) {
            if (timePainter + boards[i] <= time) {
                timePainter += boards[i];
            } else {
                painters += 1;
                timePainter = boards[i];
            }
        }
        return painters;
    }

    private int findLargestMinDistance(int[] boards, int k) {
        int n = boards.length;
        if (k > n) {
            return -1;
        }

        int low = 0, high = 0;
        for (int v : boards) {
            low = Math.max(low, v);
            high += v;
        }

        while (low <= high) {
            int mid = (low + high) / 2;
            int painters = countStudents(boards, mid);
            if (painters > k) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }

    public int painterPartition(int[] boards, int k) {
        return findLargestMinDistance(boards, k);
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(n · log(Σboards))</div>
                <div className="cx-note">Identical to Allocate Minimum Number of Pages.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures.</div>
            </div>
        </div>

      <div id="minimize-max-distance-gas-station" data-topic-boundary="true" />


        
        <p className="page-sub">
            The answer here is a real number, not an integer — which turns the search's stopping condition
            from "pointers crossed" into "the window has shrunk below some tiny precision."
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks</span>
            <span className="pill pill-danger">Hard</span>
            <span className="pill">Binary search over a continuous range, or a greedy heap</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given <code>n</code> gas stations along a line and <code>k</code>
                additional stations to place anywhere (not necessarily at integer positions), minimize the largest
                gap between any two <strong>adjacent</strong> stations after placing them.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 Two different, both-valid approaches appear in the rough notes</div>
                <p>
                    The rough notes sketch two genuinely different strategies for this problem, and both are worth
                    knowing:
                </p>
                <ul>
                    <li><strong>Greedy + max-heap:</strong> repeatedly give one new station to whichever existing gap is currently largest, splitting it as evenly as possible. Doing this <code>k</code> times greedily is optimal, since the overall worst gap can only be improved by shrinking whichever gap is currently the biggest.</li>
                    <li><strong>Binary search on the answer:</strong> search over candidate maximum-gap values (a real number, not an integer), and for each candidate, compute how many extra stations would be needed to bring every existing gap down to at most that value. That count is monotonic: a smaller target gap always needs the same or more stations.</li>
                </ul>
            </div>
            <div className="callout callout-warning">
                <div className="callout-title">⚠️ A real-valued binary search needs a different loop condition entirely</div>
                There is no meaningful "exact match" to stop on, and no integer <code>low ≤ high</code> to
                exhaust — the candidate gap is a <code>double</code>/<code>long double</code>. The loop
                instead runs <strong>while the window is still wider than some small precision</strong>
                (<code>high - low &gt; 1e-6</code>), narrowing <code>low</code> or <code>high</code> to
                <code>mid</code> itself each time (never <code>mid ± 1</code>, since there's no discrete
                "next" value to skip past).
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation — Greedy With a Max-Heap</h3>
        </div>
        <Code>{`
class Solution {
    public double minimiseMaxDistance(int[] arr, int k) {
        int n = arr.length;
        int[] howMany = new int[n - 1];
        // max-heap of {currentGapLength, gapIndex}
        PriorityQueue<double[]> pq = new PriorityQueue<>((a, b) -> Double.compare(b[0], a[0]));

        for (int i = 0; i < n - 1; i++) {
            pq.add(new double[]{arr[i + 1] - arr[i], i});
        }

        for (int gasStations = 1; gasStations <= k; gasStations++) {
            double[] tp = pq.poll();
            int secInd = (int) tp[1];
            howMany[secInd]++;

            double iniDiff = arr[secInd + 1] - arr[secInd];
            double newSecLen = iniDiff / (double) (howMany[secInd] + 1);
            pq.add(new double[]{newSecLen, secInd});
        }

        return pq.peek()[0];
    }
}
`}</Code>
        <div className="sub-header">
            <h3>Code Implementation — Binary Search Over the Answer</h3>
        </div>
        <Code>{`
class Solution {
    private int numberOfGasStationsRequired(double dist, int[] arr) {
        int cnt = 0;
        for (int i = 1; i < arr.length; i++) {
            int numberInBetween = (int) ((arr[i] - arr[i - 1]) / dist);
            if ((arr[i] - arr[i - 1]) == numberInBetween * dist) {
                numberInBetween--;
            }
            cnt += numberInBetween;
        }
        return cnt;
    }

    public double minimiseMaxDistance(int[] arr, int k) {
        int n = arr.length;
        double low = 0, high = 0;
        for (int i = 0; i < n - 1; i++) {
            high = Math.max(high, (double) (arr[i + 1] - arr[i]));
        }

        double diff = 1e-6;
        while (high - low > diff) {
            double mid = (low + high) / 2.0;
            int cnt = numberOfGasStationsRequired(mid, arr);
            if (cnt > k) {
                low = mid;           // too many stations needed; the target gap must be larger
            } else {
                high = mid;
            }
        }
        return high;
    }
}
`}</Code>
        <div className="callout callout-note">
            <div className="callout-title">📌 The greedy heap approach is simpler to reason about; the binary search generalises better</div>
            The heap approach runs exactly <code>k</code> iterations of "split the worst gap," which is very easy
            to prove optimal but costs <code>O(k log n)</code>. The binary search version costs
            <code>O(n log(precision))</code> instead — it stops mattering how big <code>k</code> itself is,
            which wins decisively once <code>k</code> is very large relative to <code>n</code>.
        </div>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time (heap)</div>
                <div className="cx-val">O(n + k log n)</div>
                <div className="cx-note">k extractions and re-insertions into an n-sized heap.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Time (binary search)</div>
                <div className="cx-val">O(n · log(range / precision))</div>
                <div className="cx-note">Independent of k entirely.</div>
            </div>
        </div>

      <div id="median-of-two-sorted-arrays" data-topic-boundary="true" />

<hr className="part-rule" />
        <div className="part-kicker">Binary Search on Two Arrays &amp; 2D Grids</div>
        <p className="part-blurb">
            The final family: binary search where the "array" being searched isn't the input directly, but a
            <em>partition point</em> across two arrays, or a row/column index into a matrix.
        </p>


        
        
        <p className="page-sub">
            Merging both arrays and taking the middle would be <code>O(n + m)</code>. Binary searching for the
            right <strong>partition point</strong> instead gets this down to logarithmic time.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 4</span>
            <span className="pill pill-danger">Hard</span>
            <span className="pill">Search for a valid partition, not a value</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given two sorted arrays, find the median of the combined, logically
                merged array in <code>O(log(min(n, m)))</code> time.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 A valid partition splits BOTH arrays so the left side has exactly half the total elements</div>
                <p>
                    Pick a partition index <code>mid1</code> into the smaller array <code>a</code>; that forces
                    the partition into <code>b</code> to be <code>mid2 = left - mid1</code>, where
                    <code>left = ⌈ (n+m) / 2 ⌉</code>, so the two partitions together always claim
                    exactly the correct number of "left side" elements. Call the four border values
                    <code>l1, r1</code> (last-included / first-excluded in <code>a</code>) and
                    <code>l2, r2</code> (same in <code>b</code>). The partition is <strong>valid</strong> exactly
                    when <code>l1 ≤ r2</code> and <code>l2 ≤ r1</code> — everything on the left is
                    <code>≤</code> everything on the right, regardless of which array it came from. If
                    <code>l1 &gt; r2</code>, <code>mid1</code> is too far right (too much of <code>a</code> on the
                    left); if <code>l2 &gt; r1</code>, it's too far left. Binary search <code>mid1</code> itself
                    over <code>[0, n]</code> until a valid partition is found.
                </p>
                <div className="recurrence">{`
low = 0 ; high = n1                    -- partition INTO THE SMALLER array
left = (n1 + n2 + 1) / 2
while low ≤ high:
    mid1 = (low + high) / 2 ; mid2 = left - mid1
    l1 = a[mid1-1] if mid1 > 0 else -∞ ; r1 = a[mid1] if mid1 < n1 else +∞
    l2 = b[mid2-1] if mid2 > 0 else -∞ ; r2 = b[mid2] if mid2 < n2 else +∞

    if l1 ≤ r2 and l2 ≤ r1:                     -- valid partition found
        if (n1+n2) is odd: return max(l1, l2)
        return (max(l1,l2) + min(r1,r2)) / 2.0
    else if l1 > r2: high = mid1 - 1                -- too much of a on the left
    else: low = mid1 + 1
`}</div>
            </div>
            <div className="callout callout-warning">
                <div className="callout-title">⚠️ Always binary search over the SMALLER array</div>
                If <code>n1 &gt; n2</code>, the notes swap the two arrays before doing anything else
                (<code>if (n1 &gt; n2) return median(b, a)</code>). Searching over the smaller array bounds the
                time to <code>O(log(min(n,m)))</code>; more importantly, it also guarantees
                <code>mid2 = left - mid1</code> never falls outside <code>[0, n2]</code>, which would otherwise
                need extra bounds-juggling.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public double median(int[] a, int[] b) {
        int n1 = a.length, n2 = b.length;
        if (n1 > n2) {
            return median(b, a);
        }

        int low = 0, high = n1;
        int left = (n1 + n2 + 1) / 2;
        int n = n1 + n2;

        while (low <= high) {
            int mid1 = (low + high) >> 1;
            int mid2 = left - mid1;

            int l1 = Integer.MIN_VALUE, l2 = Integer.MIN_VALUE;
            int r1 = Integer.MAX_VALUE, r2 = Integer.MAX_VALUE;

            if (mid1 < n1) r1 = a[mid1];
            if (mid2 < n2) r2 = b[mid2];
            if (mid1 - 1 >= 0) l1 = a[mid1 - 1];
            if (mid2 - 1 >= 0) l2 = b[mid2 - 1];

            if (l1 <= r2 && l2 <= r1) {
                if (n % 2 == 1) {
                    return Math.max(l1, l2);
                }
                return ((double) (Math.max(l1, l2) + Math.min(r1, r2))) / 2.0;
            } else if (l1 > r2) {
                high = mid1 - 1;
            } else {
                low = mid1 + 1;
            }
        }
        return 0;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log(min(n, m)))</div>
                <div className="cx-note">Binary search over the partition point in the smaller array.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No merged array is ever built.</div>
            </div>
        </div>

      <div id="kth-element-of-two-sorted-arrays" data-topic-boundary="true" />


        
        <p className="page-sub">
            Median of Two Sorted Arrays (25), generalised from "the middle element" to "the k-th element."
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks</span>
            <span className="pill pill-danger">Hard</span>
            <span className="pill">Same partition search, just a different target split size</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given two sorted arrays, find the <code>k</code>-th smallest element
                (1-indexed) of their combined, logically merged array.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 "Median" is just "k-th element" with k fixed at the midpoint</div>
                <p>
                    Reusing the exact same partition search from problem 25, the only two things that change are:
                    the target left-side size becomes <code>left = k</code> instead of
                    <code>(n1+n2+1)/2</code>, and the search range for <code>mid1</code> (the partition into array
                    <code>a</code>) is tightened to <code>[max(0, k-n2), min(k, n1)]</code> — since
                    <code>mid1</code> can never ask for more left-side elements from <code>a</code> than
                    <code>k</code> itself allows, nor more than <code>a</code> actually has.
                </p>
                <div className="recurrence">{`
low = max(k - n2, 0) ; high = min(k, n1)
left = k
...identical partition-validity logic to problem 25, but on success just return max(l1, l2)...
`}</div>
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public int kthElement(int[] a, int[] b, int n1, int n2, int k) {
        if (n1 > n2) {
            return kthElement(b, a, n2, n1, k);
        }

        int low = Math.max(k - n2, 0), high = Math.min(k, n1);
        int left = k;

        while (low <= high) {
            int mid1 = (low + high) >> 1;
            int mid2 = left - mid1;

            int l1 = Integer.MIN_VALUE, l2 = Integer.MIN_VALUE;
            int r1 = Integer.MAX_VALUE, r2 = Integer.MAX_VALUE;

            if (mid1 < n1) r1 = a[mid1];
            if (mid2 < n2) r2 = b[mid2];
            if (mid1 - 1 >= 0) l1 = a[mid1 - 1];
            if (mid2 - 1 >= 0) l2 = b[mid2 - 1];

            if (l1 <= r2 && l2 <= r1) {
                return Math.max(l1, l2);
            } else if (l1 > r2) {
                high = mid1 - 1;
            } else {
                low = mid1 + 1;
            }
        }
        return 0;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log(min(n, m)))</div>
                <div className="cx-note">Identical shape to Median of Two Sorted Arrays.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No merged array is ever built.</div>
            </div>
        </div>

      <div id="row-with-maximum-1s" data-topic-boundary="true" />


        
        <p className="page-sub">
            Each row of a binary matrix, sorted left-to-right, is exactly the kind of array lower bound already
            knows how to search.
        </p>
        <div className="meta-row">
            <span className="pill">GeeksforGeeks</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">lowerBound(row, 1) finds where the 1s begin</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given an <code>n × m</code> binary matrix where every row is
                sorted (all <code>0</code>s before all <code>1</code>s), find the index of the row with the most
                <code>1</code>s.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 Lower bound on each row finds exactly where its 1s start</div>
                Within a single sorted 0/1 row, <code>lowerBound(row, 1)</code> finds the first index holding a
                <code>1</code> — everything from there to the end of the row is a <code>1</code> too, since
                the row is sorted. So the count of <code>1</code>s in that row is simply
                <code>m - lowerBound(row, 1)</code>. Doing this once per row and tracking the maximum gives the
                answer in <code>O(n log m)</code> instead of the <code>O(n·m)</code> a full scan would
                cost.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    private int lowerBound(int[] arr, int n, int x) {
        int low = 0, high = n - 1;
        int ans = n;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] >= x) { ans = mid; high = mid - 1; }
            else low = mid + 1;
        }
        return ans;
    }

    public int rowWithMax1s(int[][] matrix, int n, int m) {
        int cntMax = 0;
        int index = -1;

        for (int i = 0; i < n; i++) {
            int cntOnes = m - lowerBound(matrix[i], m, 1);
            if (cntOnes > cntMax) {
                cntMax = cntOnes;
                index = i;
            }
        }
        return index;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(n · log m)</div>
                <div className="cx-note">One binary search per row.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures.</div>
            </div>
        </div>

      <div id="search-a-2d-matrix-i" data-topic-boundary="true" />


        
        <p className="page-sub">
            A matrix that is sorted both along rows and across the boundary between consecutive rows is, in
            every way that matters, just a flattened 1D sorted array.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 74</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Map a flat index back to (row, col) with div and mod</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given an <code>n × m</code> matrix where each row is sorted and
                the first element of each row is greater than the last element of the previous row, search for a
                target value.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 That extra guarantee makes the whole matrix one giant sorted sequence</div>
                Reading the matrix left-to-right, top-to-bottom produces a fully sorted sequence of
                <code>n · m</code> values. Run ordinary binary search over the flat index range
                <code>[0, n·m - 1]</code>, converting each flat index <code>mid</code> back to a real
                <code>(row, col)</code> pair with <code>row = mid / m</code>, <code>col = mid % m</code>.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public boolean searchMatrix(int[][] mat, int target) {
        int n = mat.length;
        int m = mat[0].length;
        int low = 0, high = n * m - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            int row = mid / m;
            int col = mid % m;
            if (mat[row][col] == target) {
                return true;
            } else if (mat[row][col] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return false;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(log(n·m))</div>
                <div className="cx-note">One binary search over the whole flattened matrix.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures; the matrix is never actually flattened.</div>
            </div>
        </div>

      <div id="search-a-2d-matrix-ii" data-topic-boundary="true" />


        
        <p className="page-sub">
            Without Matrix I's extra cross-row guarantee, the matrix can no longer be treated as one flat sorted
            array — but it has its own, entirely different exploitable structure.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 240</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">Start at a corner where one step always rules out a whole row or column</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given an <code>n × m</code> matrix where every row is sorted
                left-to-right and every column is sorted top-to-bottom (but rows are <em>not</em> globally ordered
                against each other), search for a target value.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 The top-right corner is the one cell where every comparison is decisive</div>
                Starting at the top-right corner: if the current cell is bigger than the target, the entire
                <strong>column</strong> below it must also be too big (columns increase downward) — move
                left. If it's smaller, the entire <strong>row</strong> to its left must also be too small (rows
                increase rightward) — move down. Either way, every single step eliminates a whole row or
                column, so the walk terminates in at most <code>n + m</code> steps.
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    public boolean searchElement(int[][] mat, int target) {
        int n = mat.length;
        int m = mat[0].length;
        int row = 0, col = m - 1;

        while (row < n && col >= 0) {
            if (mat[row][col] == target) {
                return true;
            } else if (mat[row][col] < target) {
                row++;
            } else {
                col--;
            }
        }
        return false;
    }
}
`}</Code>
        <div className="callout callout-note">
            <div className="callout-title">📌 This is a linear walk, not a binary search — and that's fine</div>
            Each step only rules out one row or column rather than halving a search space, giving
            <code>O(n + m)</code> rather than a logarithmic bound. It's still far better than scanning every
            cell, and the lack of a cross-row ordering guarantee here means a true binary search (as in Matrix I)
            isn't available at all.
        </div>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(n + m)</div>
                <div className="cx-note">Each step eliminates one whole row or column.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">Two pointers.</div>
            </div>
        </div>

      <div id="find-a-peak-element-ii" data-topic-boundary="true" />


        
        <p className="page-sub">
            Find Peak Element (13), lifted from a 1D array to a 2D grid — binary search over columns,
            using a full column scan as the "which direction is uphill" check.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 1901</span>
            <span className="pill pill-danger">Hard</span>
            <span className="pill">Binary search the columns; scan each candidate column fully</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given a 2D grid where every adjacent pair of cells (horizontally or
                vertically) differs in value, find any peak — a cell strictly greater than all of its
                (up to four) neighbours — and return its <code>{'{row, col}'}</code>.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 The row holding each column's maximum is where that column's own "slope" matters</div>
                <p>
                    Binary search over the <strong>column</strong> index. For a candidate column <code>mid</code>,
                    scan it fully to find the row holding its maximum value
                    (<code>maxRowIndex</code>) — that row is the most promising place in this column to be
                    a 2D peak, since it already beats both its vertical neighbours by construction. Compare that
                    cell against its horizontal neighbours (<code>left</code> in column <code>mid-1</code>,
                    <code>right</code> in column <code>mid+1</code>, same row): if it beats both, it's a genuine
                    2D peak. If the left neighbour is bigger, a peak is guaranteed to exist somewhere in columns
                    <code>[0, mid-1]</code> instead (the same "must exist uphill" argument as the 1D version);
                    otherwise it's guaranteed in <code>[mid+1, high]</code>.
                </p>
                <div className="recurrence">{`
low = 0 ; high = m - 1
while low ≤ high:
    mid = (low + high) / 2
    maxRowIndex = row index of the maximum value in column mid
    left  = mat[maxRowIndex][mid-1]  if mid > 0     else -1
    right = mat[maxRowIndex][mid+1]  if mid < m-1   else -1

    if mat[maxRowIndex][mid] > left and mat[maxRowIndex][mid] > right: return {maxRowIndex, mid}
    else if mat[maxRowIndex][mid] < left: high = mid - 1     -- uphill is to the left
    else: low = mid + 1                                        -- uphill is to the right
`}</div>
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    private int findMaxIndex(int[][] mat, int n, int col) {
        int maxValue = -1;
        int index = -1;
        for (int i = 0; i < n; i++) {
            if (mat[i][col] > maxValue) {
                maxValue = mat[i][col];
                index = i;
            }
        }
        return index;
    }

    public int[] findPeakGrid(int[][] mat) {
        int n = mat.length;
        int m = mat[0].length;
        int low = 0, high = m - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            int maxRowIndex = findMaxIndex(mat, n, mid);

            int left = (mid - 1 >= 0) ? mat[maxRowIndex][mid - 1] : -1;
            int right = (mid + 1 < m) ? mat[maxRowIndex][mid + 1] : -1;

            if (mat[maxRowIndex][mid] > left && mat[maxRowIndex][mid] > right) {
                return new int[]{maxRowIndex, mid};
            } else if (mat[maxRowIndex][mid] < left) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return new int[]{-1, -1};
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(n · log m)</div>
                <div className="cx-note">log m columns probed, each needing a full n-tall column scan.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures.</div>
            </div>
        </div>

      <div id="median-of-a-row-wise-sorted-matrix" data-topic-boundary="true" />


        
        <p className="page-sub">
            Binary search on the answer, one more time — the candidate is a value, and the feasibility
            check counts how many matrix elements are small enough to sit on its left.
        </p>
        <div className="meta-row">
            <span className="pill">LeetCode 1288 / GeeksforGeeks</span>
            <span className="pill pill-warn">Medium</span>
            <span className="pill">upperBound per row, summed, gives a rank</span>
        </div>
        <div className="card">
            <p>
                <strong>Problem.</strong> Given an <code>n × m</code> matrix where every row is individually
                sorted (with <code>n · m</code> odd), find the median of all the elements combined.
            </p>
            <div className="callout callout-key">
                <div className="callout-title">🔑 "How many elements are ≤ x" is a sum of per-row upper bounds — and it's monotonic in x</div>
                <p>
                    For a candidate value <code>x</code>, <code>upperBound(row, x)</code> on a single sorted row
                    counts how many of that row's elements are <code>≤ x</code> (it's the first index
                    <em>strictly greater</em> than <code>x</code>, which is exactly that count). Summing this
                    across every row gives the total count of elements <code>≤ x</code> in the whole matrix
                    — the <strong>rank</strong> of <code>x</code>. That rank only grows as <code>x</code>
                    grows, so binary search over the value range
                    <code>[min element, max element]</code> for the smallest <code>x</code> whose rank passes the
                    halfway point, <code>(n·m)/2</code>.
                </p>
                <div className="recurrence">{`
countSmallEqual(matrix, x):
    return sum of upperBound(row, x) for every row

median(matrix):
    low = min over all matrix[i][0]       -- smallest possible value: each row's own first element
    high = max over all matrix[i][m-1]    -- largest possible value: each row's own last element
    req = (n * m) / 2

    while low ≤ high:
        mid = (low + high) / 2
        if countSmallEqual(matrix, mid) ≤ req: low = mid + 1     -- not enough elements below mid yet
        else: high = mid - 1
    return low
`}</div>
            </div>
        </div>
        <div className="sub-header">
            <h3>Code Implementation</h3>
        </div>
        <Code>{`
class Solution {
    private int upperBound(int[] arr, int x, int m) {
        int low = 0, high = m - 1;
        int ans = m;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] > x) { ans = mid; high = mid - 1; }
            else low = mid + 1;
        }
        return ans;
    }

    private int countSmallEqual(int[][] matrix, int n, int m, int x) {
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            cnt += upperBound(matrix[i], x, m);
        }
        return cnt;
    }

    public int median(int[][] matrix, int n, int m) {
        int low = Integer.MAX_VALUE, high = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            low = Math.min(low, matrix[i][0]);
            high = Math.max(high, matrix[i][m - 1]);
        }

        int req = (n * m) / 2;
        while (low <= high) {
            int mid = (low + high) / 2;
            int smallEqual = countSmallEqual(matrix, n, m, mid);
            if (smallEqual <= req) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }
}
`}</Code>
        <div className="cx-grid">
            <div className="cx-box">
                <div className="cx-label">Time</div>
                <div className="cx-val">O(n · log m · log(max - min))</div>
                <div className="cx-note">Binary search over the value, each check running n row-wise binary searches.</div>
            </div>
            <div className="cx-box">
                <div className="cx-label">Space</div>
                <div className="cx-val">O(1)</div>
                <div className="cx-note">No extra structures.</div>
            </div>
        </div>
    </>
  );
}
