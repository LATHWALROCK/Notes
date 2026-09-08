import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

export default function Part7() {
  return (
    <>
      {/* 7.1 */}
      <div id="s7-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        One extra rule — <em>left is smaller, right is bigger</em> — and half the work disappears. Every problem in
        Parts 7–9 is really the same question: <strong>what does the ordering let me skip?</strong>
      </p>
      <div className="card">
        <p>
          A <strong>binary search tree</strong> is a binary tree with one additional invariant at <em>every</em>{' '}
          node:
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The BST property</div>
          For every node <code>x</code>:
          <ul>
            <li>
              <strong>all</strong> values in <code>x</code>&apos;s <strong>left</strong> subtree are{' '}
              <code>&lt; x.val</code>
            </li>
            <li>
              <strong>all</strong> values in <code>x</code>&apos;s <strong>right</strong> subtree are{' '}
              <code>&gt; x.val</code>
            </li>
            <li>both subtrees are themselves BSTs</li>
          </ul>
          The word <strong>all</strong> is the entire difficulty of the definition. It is not &quot;the left child is
          smaller&quot; — it is &quot;every single node down the left is smaller&quot;. Section 8.2 exists purely
          because people forget this.
        </div>
        <pre className="diagram">{
`        A VALID BST  ✓              NOT A BST  ✗
              (8)                          (8)
             /   \\                        /   \\
           (4)   (12)                   (4)   (12)
          /  \\   /  \\                  /  \\   /  \\
        (2) (6)(10)(14)              (2) (9)(10)(14)
                                          ^^^
   every left value < parent          9 < 8 fails: 9 sits in 8's LEFT subtree
   every right value > parent         but is bigger than 8. The local check
                                      (9 > 4) passes -- which is the trap.`
        }</pre>

        <div className="subsection-header"><h3>The four consequences you will use over and over</h3></div>
        <ol className="steps">
          <li>
            <strong>Inorder traversal is sorted ascending.</strong> Already flagged in 2.1 — now it becomes the
            workhorse. 8.1, 8.2, 8.5, 9.1 and 9.3 are all &quot;an inorder walk plus one comparison&quot;.{' '}
            <em>Reverse</em> inorder (Right → Root → Left) gives descending order.
          </li>
          <li>
            <strong>Search is a decision, not a search.</strong> Comparing your key with a node tells you which{' '}
            <em>single</em> child to visit. You never branch into both subtrees, so the cost is the path length{' '}
            <code>O(h)</code>, not <code>O(n)</code>. That is the pattern behind 7.2–7.6 and 8.3.
          </li>
          <li>
            <strong>The minimum is the leftmost node, the maximum is the rightmost.</strong> Keep going left until{' '}
            <code>left == null</code>. Used by 7.6 (delete) and 8.5 (successor).
          </li>
          <li>
            <strong>Every node carries an implicit range.</strong> Descending left tightens the upper bound,
            descending right tightens the lower bound. 8.2 and 8.4 are built entirely on this.
          </li>
        </ol>

        <div className="subsection-header"><h3>Height is everything</h3></div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Operation</th><th>Balanced BST</th><th>Degenerate BST</th>
                <th>Sorted array</th><th>HashMap</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Search</td>
                <td><code>O(log n)</code></td>
                <td><span className="pill pill-danger">O(n)</span></td>
                <td><code>O(log n)</code></td>
                <td><code>O(1)</code></td>
              </tr>
              <tr>
                <td>Insert / delete</td>
                <td><code>O(log n)</code></td>
                <td><span className="pill pill-danger">O(n)</span></td>
                <td><code>O(n)</code></td>
                <td><code>O(1)</code></td>
              </tr>
              <tr>
                <td>Sorted iteration</td>
                <td><code>O(n)</code></td>
                <td><code>O(n)</code></td>
                <td><code>O(n)</code></td>
                <td><span className="pill pill-danger">O(n log n)</span></td>
              </tr>
              <tr>
                <td>Predecessor / ceil / floor</td>
                <td><code>O(log n)</code></td>
                <td><code>O(n)</code></td>
                <td><code>O(log n)</code></td>
                <td><span className="pill pill-danger">O(n)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The last two rows are why BSTs exist at all: a <code>HashMap</code> beats them on point lookups but knows
          nothing about <em>order</em>. Java&apos;s <code>TreeMap</code> / <code>TreeSet</code> are{' '}
          <strong>red-black trees</strong> — self-balancing BSTs — which is why they can offer{' '}
          <code>firstKey()</code>, <code>ceilingKey()</code>, <code>floorKey()</code> and <code>subMap()</code> and
          a <code>HashMap</code> cannot.
        </p>

        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Inserting sorted data destroys a plain BST</div>
          Insert <code>1, 2, 3, 4, 5</code> into an unbalanced BST and you get the right-skewed chain from 1.2:
          height <code>n - 1</code>, every operation <code>O(n)</code>. This is not a corner case, it is the common
          case — real data arrives sorted all the time. Production trees (AVL, red-black) rotate to stay balanced;
          the interview problems in these notes assume no rebalancing, so{' '}
          <strong>always quote complexity as <code>O(h)</code></strong> and only then say &quot;
          <code>O(log n)</code> if balanced, <code>O(n)</code> worst case&quot;.
        </div>

        <div className="callout callout-note">
          <div className="callout-title">📌 What about duplicates?</div>
          The strict definition has none, and most judges guarantee unique values. When duplicates must be
          supported there are three conventions: send equals to the right (<code>&lt;</code> left,{' '}
          <code>&gt;=</code> right — this is what 7.5 does with <code>cur.val &lt;= val</code>), send equals left,
          or store a <code>count</code> field in the node. The third is cleanest and is what real multisets do.
          Whichever you pick, note that 8.2&apos;s validator with <code>&gt;=</code> / <code>&lt;=</code>{' '}
          comparisons rejects duplicates outright — be consistent within one problem.
        </div>

        <div className="callout callout-key">
          <div className="callout-title">🔑 The BST master template</div>
          Part 3&apos;s template combined results from <em>both</em> children. The BST template picks{' '}
          <strong>one</strong>:
          <Code>{
`TreeNode cur = root;
while (cur != null) {
    if (key == cur.val)      { /* found -- do the work and stop */ break; }
    else if (key < cur.val)  { /* answer is strictly left  */ cur = cur.left;  }
    else                     { /* answer is strictly right */ cur = cur.right; }
}`
          }</Code>
          Iterative, <code>O(h)</code> time, <code>O(1)</code> space — no recursion stack at all. Sections 7.2
          through 7.6, 8.3 and 8.5 are this loop with a different body. Prefer it to recursion in a BST: the
          recursion here is pure tail recursion, so it buys nothing.
        </div>
      </div>

      {/* 7.2 */}
      <div id="s7-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 700</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">The template itself</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return the subtree rooted at the node whose value equals <code>val</code>, or{' '}
          <code>null</code> if no such node exists.
        </p>
        <p>
          <strong>Intuition.</strong> At each node there are exactly three cases: equal (done), smaller (the answer
          can only be left), larger (the answer can only be right). Nothing is ever revisited and no branch is ever
          explored twice — this is binary search, walking pointers instead of array indices.
        </p>
        <p>
          The loop condition <code>root != null &amp;&amp; root.val != val</code> handles both exits at once: fall
          off the bottom of the tree (miss, <code>root</code> is <code>null</code>) or land on the value (hit,{' '}
          <code>root</code> is the answer). Either way the variable already holds exactly what must be returned.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        while (root != null && root.val != val) {
            root = val < root.val ? root.left : root.right;
        }
        return root;                     // the node, or null -- both are correct
    }
}`
      }</Code>

      <div className="card">
        <p>
          The recursive form, for completeness. It is the same algorithm; note that both recursive calls are in
          tail position, which is why the loop above is strictly better in Java (no tail-call elimination).
        </p>
      </div>
      <Code>{
`public TreeNode searchBSTRecursive(TreeNode root, int val) {
    if (root == null || root.val == val) return root;
    return val < root.val
         ? searchBSTRecursive(root.left,  val)
         : searchBSTRecursive(root.right, val);
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — searching for 6</h3></div>
      <pre className="diagram">{
`              (8)
             /   \\
           (4)   (12)
          /  \\   /  \\
        (2) (6)(10)(14)

 root=8   8 != 6, 6 < 8  -> go LEFT       (nodes 10, 12, 14 eliminated: 4 of 7)
 root=4   4 != 6, 6 > 4  -> go RIGHT      (node 2 eliminated)
 root=6   6 == 6         -> loop exits
 return the node 6

 3 comparisons for 7 nodes. For 10^6 nodes a balanced BST needs ~20.

 Searching for 5 instead:
 root=8 -> left, root=4 -> right, root=6 -> left, root=null -> return null`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(h)">
          <code>O(log n)</code> balanced, <code>O(n)</code> on a skewed tree.
        </CxBox>
        <CxBox label="Space" value="O(1)">
          Iterative. The recursive version costs <code>O(h)</code> stack for no benefit.
        </CxBox>
      </Cx>

      {/* 7.3 */}
      <div id="s7-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Remember-the-candidate pattern</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Find the{' '}
          <strong>smallest value in the BST that is <code>≥ key</code></strong>. Return <code>-1</code> if no such
          value exists (i.e. <code>key</code> is bigger than the maximum).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The pattern: search, but remember the best candidate seen</div>
          Plain search (7.2) reports failure when it falls off the tree. Ceil cannot — the answer is usually{' '}
          <em>not</em> in the tree at all. So carry a <code>ceil</code> variable and update it every time you stand
          on a node that <strong>qualifies</strong>:
          <ul>
            <li><code>root.val == key</code> → perfect answer, return immediately.</li>
            <li>
              <code>key &gt; root.val</code> → this node is too <em>small</em> to be a ceiling, and so is everything
              left of it. Go right, record nothing.
            </li>
            <li>
              <code>key &lt; root.val</code> → this node <em>is</em> a valid ceiling. Save it, then go left to look
              for a smaller one that still qualifies.
            </li>
          </ul>
          The saved value is only ever overwritten by a smaller-but-still-valid one, so when the walk ends{' '}
          <code>ceil</code> holds the tightest candidate. Same shape as &quot;find first element{' '}
          <code>≥ x</code>&quot; in a sorted array — it is <code>lowerBound</code> on a tree.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`public class Solution {

    public static int findCeil(TreeNode root, int key) {

        int ceil = -1;                       // sentinel: "no valid ceiling found"
        while (root != null) {
            if (root.val == key) {
                ceil = root.val;            // exact hit -- cannot do better
                return ceil;
            }

            if (key > root.val) {
                root = root.right;           // too small, and so is everything to its left
            }
            else {
                ceil = root.val;            // valid candidate -- record it
                root = root.left;            // then try for a tighter one
            }
        }
        return ceil;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Renamed from the version in your notes</div>
        Ceil and floor are Coding Ninjas problems, so your screenshots use their generic{' '}
        <code>TreeNode&lt;Integer&gt;</code> with a field <code>data</code> and a <code>public static</code>{' '}
        signature. Both are written above with plain <code>TreeNode</code> / <code>val</code> to match the rest of
        these notes — the algorithm is untouched.
        <br /><br />
        The rename also removes the boxing trap described in 1.3: with the generic class,{' '}
        <code>root.data == key</code> only works because <code>key</code> is an <code>int</code>, which forces{' '}
        <code>data</code> to be unboxed. Compare two <code>Integer</code>s with <code>==</code> and you compare{' '}
        <strong>references</strong>, which quietly fails outside the cached −128…127 range. With{' '}
        <code>int val</code> there is nothing to get wrong.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`              (8)
             /   \\
           (4)   (12)
          /  \\   /  \\
        (2) (6)(10)(14)

 findCeil(key = 7)                      target: smallest value >= 7  -> 8
   root=8   7 < 8   -> ceil = 8, go LEFT
   root=4   7 > 4   -> go RIGHT              (4 is too small to be a ceiling)
   root=6   7 > 6   -> go RIGHT
   root=null -> loop ends
   return 8        ✓

 findCeil(key = 10)                     exact match exists
   root=8   10 > 8  -> go RIGHT
   root=12  10 < 12 -> ceil = 12, go LEFT
   root=10  10 == 10 -> return 10       ✓   (better than the saved 12)

 findCeil(key = 20)                     bigger than every value
   root=8 -> right, root=12 -> right, root=14 -> right, root=null
   ceil was never set -> return -1      ✓`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(h)">One root-to-leaf path at worst.</CxBox>
        <CxBox label="Space" value="O(1)">
          A single <code>int</code> of state.
        </CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ <code>-1</code> is only a safe sentinel for positive data</div>
        If the tree may contain negative values, <code>-1</code> is indistinguishable from a real answer. Return{' '}
        <code>Integer.MAX_VALUE</code>, an <code>Integer</code> that can be <code>null</code>, or an{' '}
        <code>OptionalInt</code> instead. The judge here guarantees positive values, which is the only reason the
        sentinel is acceptable — say so if asked.
      </div>

      {/* 7.4 */}
      <div id="s7-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Exact mirror of 7.3</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Find the{' '}
          <strong>largest value in the BST that is <code>≤ key</code></strong>, or <code>-1</code> if every value is
          bigger than <code>key</code>.
        </p>
        <p>
          <strong>Intuition.</strong> Mirror of 7.3, and the mirroring happens in exactly one place: which branch
          records the candidate. A node smaller than <code>key</code> is a valid <em>floor</em>, so{' '}
          <strong>the <code>key &gt; root.val</code> branch is now the one that saves</strong> before moving right
          in search of something larger but still valid. The <code>key &lt; root.val</code> branch saves nothing,
          because that node and its whole right subtree are too big.
        </p>
        <div className="compare">
          <div className="compare-side good">
            <div className="compare-label">Ceil — save when going LEFT</div>
            <Code>{
`if (key > root.val) {
    root = root.right;
} else {
    ceil = root.val;     // save
    root = root.left;
}`
            }</Code>
          </div>
          <div className="compare-side good">
            <div className="compare-label">Floor — save when going RIGHT</div>
            <Code>{
`if (key > root.val) {
    floor = root.val;    // save
    root = root.right;
} else {
    root = root.left;
}`
            }</Code>
          </div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`public class Solution {

    public static int floorInBST(TreeNode root, int key) {
        int floor = -1;
        while (root != null) {
            if (root.val == key) {
                floor = root.val;
                return floor;                // exact hit
            }

            if (key > root.val) {
                floor = root.val;           // valid candidate -- record it
                root = root.right;           // then look for a bigger valid one
            }
            else {
                root = root.left;            // this node is too big
            }
        }
        return floor;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`              (8)
             /   \\
           (4)   (12)
          /  \\   /  \\
        (2) (6)(10)(14)

 floorInBST(key = 7)                    target: largest value <= 7  -> 6
   root=8   7 < 8   -> go LEFT               (8 is too big)
   root=4   7 > 4   -> floor = 4, go RIGHT
   root=6   7 > 6   -> floor = 6, go RIGHT
   root=null -> return 6        ✓

 floorInBST(key = 1)                    smaller than every value
   root=8 -> left, root=4 -> left, root=2 -> left, root=null
   floor never set -> return -1  ✓`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(h)">One downward path.</CxBox>
        <CxBox label="Space" value="O(1)">No stack, no recursion.</CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Four problems, one loop</div>
        Ceil, floor, inorder successor (8.5) and inorder predecessor (8.5) are the <em>same</em> traversal with a
        different comparison and a different save-branch. The only difference between ceil and successor is
        strictness: ceil accepts a value equal to <code>key</code>, successor demands strictly greater. Learn the
        table and you have all four:
        <div className="table-wrap">
          <table>
            <thead><tr><th>Want</th><th>Condition</th><th>Save when</th><th>Then move</th></tr></thead>
            <tbody>
              <tr>
                <td>Ceil (<code>≥ key</code>)</td><td><code>node ≥ key</code></td>
                <td>node qualifies</td><td>left</td>
              </tr>
              <tr>
                <td>Successor (<code>&gt; key</code>)</td><td><code>node &gt; key</code></td>
                <td>node qualifies</td><td>left</td>
              </tr>
              <tr>
                <td>Floor (<code>≤ key</code>)</td><td><code>node ≤ key</code></td>
                <td>node qualifies</td><td>right</td>
              </tr>
              <tr>
                <td>Predecessor (<code>&lt; key</code>)</td><td><code>node &lt; key</code></td>
                <td>node qualifies</td><td>right</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 7.5 */}
      <div id="s7-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 701</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Always inserts at a leaf</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Insert <code>val</code> into the BST and return the root. The value is
          guaranteed not to be present already, and <strong>any</strong> valid resulting BST is accepted.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 You never have to restructure anything</div>
          That last freedom is the whole problem. Because any valid BST is accepted, you never need to rotate,
          split or re-parent: just walk down as if searching for <code>val</code>, and where the search{' '}
          <em>fails</em> — the null pointer it would have fallen through — hang the new node. It becomes a{' '}
          <strong>leaf</strong>, every ancestor&apos;s invariant still holds (each one sent you the correct way),
          and you are done in <code>O(h)</code>.
        </div>
        <p>
          <strong>Reading the code.</strong> The <code>while (true)</code> loop is a search that stops one step
          early. At each node it decides a direction; if a child exists it descends, and if not it attaches and{' '}
          <code>break</code>s. The original <code>root</code> reference is returned untouched — the tree was
          modified in place through the parent&apos;s field.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public TreeNode insertIntoBST(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);      // empty tree -> new root

        TreeNode cur = root;
        while (true) {
            if (cur.val <= val) {                        // go RIGHT (ties go right)
                if (cur.right != null) cur = cur.right;
                else {
                    cur.right = new TreeNode(val);       // found the empty slot
                    break;
                }
            } else {                                     // go LEFT
                if (cur.left != null) cur = cur.left;
                else {
                    cur.left = new TreeNode(val);
                    break;
                }
            }
        }
        return root;                                     // same root, mutated in place
    }
}`
      }</Code>

      <div className="card">
        <p>
          The recursive version is shorter and worth knowing, because the &quot;reassign the child from the return
          value&quot; idiom is exactly how 7.6 (delete) and many tree-rewriting problems are written:
        </p>
      </div>
      <Code>{
`public TreeNode insertIntoBSTRecursive(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);

    if (val < root.val) root.left  = insertIntoBSTRecursive(root.left,  val);
    else                root.right = insertIntoBSTRecursive(root.right, val);

    return root;                    // every level re-attaches its (possibly new) child
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — inserting 5</h3></div>
      <pre className="diagram">{
`              (8)                            (8)
             /   \\                          /   \\
           (4)   (12)        becomes      (4)   (12)
          /  \\                           /  \\
        (2) (6)                        (2)  (6)
                                            /
                                          (5)

 cur=8   8 > 5   -> go LEFT,  left exists  -> cur = 4
 cur=4   4 <= 5  -> go RIGHT, right exists -> cur = 6
 cur=6   6 > 5   -> go LEFT,  left is NULL -> 6.left = new TreeNode(5), break

 5 landed as a leaf. Check the invariant along the path it took:
   8's left subtree must be < 8   : 5 < 8   ✓
   4's right subtree must be > 4  : 5 > 4   ✓
   6's left subtree must be < 6   : 5 < 6   ✓
 Every comparison the search made IS the proof that the result is valid.`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(h)">One root-to-leaf walk.</CxBox>
        <CxBox label="Space" value="O(1)">
          Iterative; the recursive form costs <code>O(h)</code>.
        </CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 <code>cur.val &lt;= val</code> — the tie-breaking choice</div>
        The <code>≤</code> means a duplicate would be sent <strong>right</strong> (see the duplicates note in 7.1).
        LeetCode 701 guarantees no duplicates, so <code>&lt;</code> and <code>≤</code> behave identically here; the
        version in your notes just happens to pick <code>≤</code>. If duplicates were allowed you would have to
        state the convention — and 8.2&apos;s validator would then have to be relaxed to match.
      </div>

      {/* 7.6 */}
      <div id="s7-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 450</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Three cases</span>
        <span className="pill">Hardest of the basics</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Remove the node with value <code>key</code> and return the root of the resulting
          BST, keeping the BST property intact.
        </p>
        <p>
          <strong>Why this is the hard one.</strong> Insertion always lands at a leaf, so nothing has to be
          repaired. Deletion can remove a node from the middle of the tree, and then someone has to adopt the
          orphans without breaking the ordering.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Three cases — and only the third is interesting</div>
          <ol>
            <li>
              <strong>No left child</strong> → return <code>root.right</code>. The right subtree simply moves up.
              (This also covers the leaf case, where <code>right</code> is <code>null</code> too.)
            </li>
            <li><strong>No right child</strong> → return <code>root.left</code>. Mirror image.</li>
            <li>
              <strong>Both children</strong> → the interesting case. Take the{' '}
              <strong>rightmost node of the left subtree</strong> — the largest value smaller than the one being
              deleted, i.e. the <em>inorder predecessor</em> — and attach the whole right subtree to <em>its</em>{' '}
              right pointer. That slot is guaranteed free (it is the rightmost node, so its <code>right</code> is{' '}
              <code>null</code>) and every value in the right subtree is larger than every value in the left
              subtree, so the ordering holds. Then return <code>root.left</code> to take the deleted node&apos;s
              place.
            </li>
          </ol>
        </div>
        <p>
          <strong>The structure of the code from your notes.</strong> It is deliberately iterative, which forces one
          extra piece of bookkeeping: to detach a node you must be holding its <strong>parent</strong>. So the loop
          looks one step ahead — it checks <code>root.left.val == key</code> rather than{' '}
          <code>root.val == key</code> — and reassigns that child&apos;s field. Deleting the root itself cannot be
          done that way (it has no parent), so it is handled up front by the very first <code>if</code>.{' '}
          <code>dummy</code> holds the original root so it can still be returned after the cursor has wandered off.
        </p>
        <ol className="steps">
          <li><code>root == null</code> → nothing to do.</li>
          <li>
            <code>root.val == key</code> → the root is the target: return <code>helper(root)</code>, which is the
            new root.
          </li>
          <li>
            Save <code>dummy = root</code>, then walk down comparing <code>key</code>.
          </li>
          <li>
            If the <em>child</em> you are about to step into holds <code>key</code>, replace that child with{' '}
            <code>helper(child)</code> and <code>break</code>.
          </li>
          <li>Otherwise keep descending. Return <code>dummy</code>.</li>
        </ol>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) {
            return null;
        }
        if (root.val == key) {
            return helper(root);                 // deleting the root -> new root returned
        }
        TreeNode dummy = root;                   // keep the original root to return
        while (root != null) {
            if (root.val > key) {
                if (root.left != null && root.left.val == key) {
                    root.left = helper(root.left);       // detach via the PARENT's field
                    break;
                } else {
                    root = root.left;
                }
            } else {
                if (root.right != null && root.right.val == key) {
                    root.right = helper(root.right);
                    break;
                } else {
                    root = root.right;
                }
            }
        }
        return dummy;
    }

    // Returns whatever should take \`root\`'s place after \`root\` is removed.
    public TreeNode helper(TreeNode root) {
        if (root.left == null) {
            return root.right;                   // case 1: no left child
        } else if (root.right == null) {
            return root.left;                    // case 2: no right child
        } else {                                 // case 3: both children
            TreeNode rightChild = root.right;
            TreeNode lastRight  = findLastRight(root.left);   // inorder predecessor
            lastRight.right = rightChild;        // right subtree hangs off it
            return root.left;                    // left subtree moves up
        }
    }

    public TreeNode findLastRight(TreeNode root) {
        if (root.right == null) {
            return root;
        }
        return findLastRight(root.right);
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — deleting 12 (case 3, both children)</h3></div>
      <pre className="diagram">{
` BEFORE                                 AFTER
              (8)                              (8)
             /   \\                             /   \\
           (4)   (12)     <-- delete         (4)   (10)
          /  \\   /  \\                       /  \\   /  \\
        (2) (6)(10)(14)                   (2) (6)(9) (14)
                /
              (9)

 STEP 1 -- the walk locates 12 through its PARENT
   root=8   8 < 12 -> else branch
            root.right is 12 and 12 == key
            -> 8.right = helper(12), break
   return dummy = 8

 STEP 2 -- helper(12), case 3: both children exist
   left  subtree of 12 = {9, 10}
   right subtree of 12 = {14}
   findLastRight(10):  10.right is null -> the predecessor is 10
   10.right = 14                (the whole right subtree hangs off it)
   return 10                    (the left subtree moves up into 12's place)

 CHECK the invariant on the new subtree rooted at 10
   9  is in 10's left  ->  9 < 10   ✓
   14 is in 10's right -> 14 > 10   ✓
   {9, 10, 14} all sit in 8's right subtree -> all > 8   ✓`
      }</pre>

      <div className="subsection-header"><h3>The recursive alternative — shorter and more common</h3></div>
      <div className="card">
        <p>
          Most editorial solutions delete recursively and use the <strong>inorder successor</strong> (leftmost node
          of the right subtree) instead of the predecessor. Rather than re-pointing subtrees, it{' '}
          <em>copies the successor&apos;s value</em> into the node and then deletes the successor — which is
          guaranteed to be an easy case 1 or 2, because a leftmost node has no left child.
        </p>
      </div>
      <Code>{
`public TreeNode deleteNodeRecursive(TreeNode root, int key) {
    if (root == null) return null;

    if (key < root.val) {
        root.left  = deleteNodeRecursive(root.left,  key);
    } else if (key > root.val) {
        root.right = deleteNodeRecursive(root.right, key);
    } else {
        // found it
        if (root.left  == null) return root.right;      // case 1
        if (root.right == null) return root.left;       // case 2

        TreeNode succ = root.right;                     // case 3: inorder successor
        while (succ.left != null) succ = succ.left;      // = leftmost of right subtree

        root.val   = succ.val;                          // copy the value up ...
        root.right = deleteNodeRecursive(root.right, succ.val);   // ... then delete it
    }
    return root;
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(h)">
          One walk down to find the node, plus one walk down the left (or right) spine to find the predecessor /
          successor. Two <code>O(h)</code> walks is still <code>O(h)</code>.
        </CxBox>
        <CxBox label="Space" value="O(1) / O(h)">
          The iterative version is <code>O(1)</code> except for <code>findLastRight</code>&apos;s recursion
          (rewrite it as a loop for true <code>O(1)</code>). The recursive version is <code>O(h)</code>.
        </CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Four ways to get deletion wrong</div>
        <ul>
          <li>
            <strong>Forgetting the root case.</strong> The iterative walk can only rewrite a <em>parent&apos;s</em>{' '}
            field. If the root itself is the target it has no parent, so the up-front{' '}
            <code>if (root.val == key)</code> is not an optimisation — it is required for correctness.
          </li>
          <li>
            <strong>Losing the return value.</strong> <code>helper</code> returns the replacement node; its result{' '}
            <em>must</em> be assigned back into <code>root.left</code> / <code>root.right</code>. Calling it and
            dropping the result deletes nothing.
          </li>
          <li>
            <strong>Deleting the wrong side&apos;s extreme.</strong> It is the{' '}
            <strong>rightmost of the left</strong> subtree (predecessor) or the{' '}
            <strong>leftmost of the right</strong> subtree (successor). Mixing them — leftmost of the left, say —
            produces a subtly invalid tree that passes small tests.
          </li>
          <li>
            <strong>Deletion unbalances the tree.</strong> Repeatedly deleting with the same-side rule skews the
            tree over time, degrading later operations toward <code>O(n)</code>. Real implementations alternate
            predecessor and successor, or rebalance. Worth mentioning; not worth coding in an interview.
          </li>
        </ul>
      </div>
    </>
  );
}
