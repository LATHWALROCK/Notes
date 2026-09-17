import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

export default function BinarySearchTree() {
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
 cur=6   6 > 5   -> go LEFT,  left is null -> 6.left = new TreeNode(5), break

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

      {/* 8.1 */}
      <div id="s8-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        Five problems that all cash in on the same two facts from 7.1: <strong>inorder is sorted</strong>, and{' '}
        <strong>every node lives inside an implicit range</strong>. Once you see which of the two a problem wants,
        the code writes itself.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 230</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Inorder + counter</span>
        <span className="pill">Early exit</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return the <code>k</code>-th <strong>smallest</strong> value in the BST (
          <code>1</code>-indexed, so <code>k = 1</code> is the minimum).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 One sentence solves it</div>
          <strong>Inorder traversal of a BST is sorted ascending</strong> (7.1). So the <code>k</code>-th element{' '}
          <em>visited</em> by an inorder walk <em>is</em> the answer. You do not need to collect the values, sort
          anything, or know the size of the tree — just count visits and stop at <code>k</code>.
          <br /><br />
          For <strong>kth largest</strong>, run the walk mirrored — <code>Right → Root → Left</code>, which is{' '}
          <em>descending</em> order — and count the same way. Do <strong>not</strong> compute <code>n</code> and ask
          for the <code>(n - k + 1)</code>-th smallest; that is an extra pass for no reason.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation — Recursive inorder with a counter</h3></div>
      <div className="card">
        <p>
          The direct translation. The counter has to live <em>outside</em> the recursion (an instance field, or the{' '}
          <code>int[1]</code> box from Part 3) because every frame must see the same count. The{' '}
          <code>if (count &gt;= k) return;</code> guard is what makes it a genuine early exit rather than a full
          traversal — without it the walk still visits all <code>n</code> nodes, which merely wastes time here but
          would be a real problem in the follow-up below.
        </p>
      </div>
      <Code>{
`class Solution {
    private int count  = 0;
    private int answer = 0;

    public int kthSmallest(TreeNode root, int k) {
        inorder(root, k);
        return answer;
    }

    private void inorder(TreeNode node, int k) {
        if (node == null) return;
        if (count >= k) return;              // answer already found -> unwind early

        inorder(node.left, k);               // LEFT  (smaller values first)

        if (++count == k) {                  // ROOT: this is the k-th smallest
            answer = node.val;
            return;
        }

        inorder(node.right, k);              // RIGHT (larger values)
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Iterative, stop the instant you find it</h3></div>
      <div className="card">
        <p>
          The better answer, and the one to write in an interview. It is the iterative inorder from 2.3 with a{' '}
          <code>--k</code> in the middle. Because the loop is explicit, &quot;stop early&quot; is a plain{' '}
          <code>return</code>: on average it touches only <code>O(h + k)</code> nodes rather than all{' '}
          <code>n</code>, and there is no recursion to unwind.
        </p>
        <ol className="steps">
          <li>
            Dive left from the root, pushing every node passed. The stack now holds the path to the minimum.
          </li>
          <li>
            Pop — that is the next value in ascending order. Decrement <code>k</code>.
          </li>
          <li>If <code>k</code> hit zero, this node is the answer. Return immediately.</li>
          <li>Otherwise pivot to <code>node.right</code> and dive left again.</li>
        </ol>
      </div>
      <Code>{
`class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> st = new ArrayDeque<>();
        TreeNode node = root;

        while (node != null || !st.isEmpty()) {

            while (node != null) {           // dive to the smallest unvisited value
                st.push(node);
                node = node.left;
            }

            node = st.pop();                 // next value in ASCENDING order
            if (--k == 0) return node.val;   // found it -- stop right here

            node = node.right;               // otherwise continue the inorder walk
        }
        return -1;                           // unreachable when 1 <= k <= n
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Kth largest, the mirror</h3></div>
      <Code>{
`public int kthLargest(TreeNode root, int k) {
    Deque<TreeNode> st = new ArrayDeque<>();
    TreeNode node = root;

    while (node != null || !st.isEmpty()) {
        while (node != null) {
            st.push(node);
            node = node.right;               // dive RIGHT: reverse inorder
        }
        node = st.pop();                     // next value in DESCENDING order
        if (--k == 0) return node.val;
        node = node.left;                    // and mirror this too
    }
    return -1;
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — k = 3</h3></div>
      <pre className="diagram">{
`              (8)
             /   \\
           (4)   (12)
          /  \\   /  \\
        (2) (6)(10)(14)

 sorted (inorder) order:  2, 4, 6, 8, 10, 12, 14
 so the 3rd smallest is 6, and we should NEVER touch 8, 10, 12 or 14.

 node=8   push 8, push 4, push 2      st=[8,4,2]   node=null
 pop 2    k: 3 -> 2                   st=[8,4]     node=2.right=null
 pop 4    k: 2 -> 1                   st=[8]       node=4.right=6
 push 6                               st=[8,6]     node=null
 pop 6    k: 1 -> 0  ==> RETURN 6     ✓

 5 nodes pushed/popped in total; the entire right subtree of 8 was never
 visited. That is the O(h + k) behaviour.`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(h + k)">
          <code>O(h)</code> to reach the minimum, then <code>k</code> steps. Worst case <code>O(n)</code> when{' '}
          <code>k = n</code>.
        </CxBox>
        <CxBox label="Space" value="O(h)">
          The stack holds one root-to-node path. Morris (6.5) would make it <code>O(1)</code>.
        </CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">
          💡 The real follow-up: &quot;the BST is modified often, and kth smallest is queried often&quot;
        </div>
        This is asked almost every time, and <code>O(h + k)</code> per query is the wrong answer for it. The fix is
        to <strong>augment the node</strong> with the size of its left subtree:
        <Code>{
`class TreeNode {
    int val;
    int leftCount;        // number of nodes in the LEFT subtree
    TreeNode left, right;
}

// Now the query is a single descent -- no traversal at all:
int kthSmallest(TreeNode root, int k) {
    while (root != null) {
        if (k == root.leftCount + 1) return root.val;   // exactly here
        if (k <= root.leftCount)     root = root.left;  // it is in the left subtree
        else { k -= root.leftCount + 1; root = root.right; }  // skip left + self
    }
    return -1;
}`
        }</Code>
        Query drops to <code>O(h)</code>, and insert/delete stay <code>O(h)</code> because each only has to bump{' '}
        <code>leftCount</code> along the single path it already walks. This is called an{' '}
        <strong>order-statistic tree</strong>, and the <code>k -= leftCount + 1</code> line is the same &quot;skip a
        known-size block&quot; idea as <code>numsLeft</code> in 6.2.
      </div>

      {/* 8.2 */}
      <div id="s8-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 98</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Range propagation</span>
        <span className="pill">Classic interview trap</span>
      </div>
      <div className="card">
        <p><strong>Problem.</strong> Return <code>true</code> if the tree is a valid BST.</p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The trap that catches everybody</div>
          The tempting solution checks each node against its immediate children:
          <Code>{
`// WRONG -- only checks parent against its direct children
boolean isValidBST(TreeNode root) {
    if (root == null) return true;
    if (root.left  != null && root.left.val  >= root.val) return false;
    if (root.right != null && root.right.val <= root.val) return false;
    return isValidBST(root.left) && isValidBST(root.right);
}`
          }</Code>
          It happily accepts the <strong>NOT A BST</strong> tree drawn in 7.1: node <code>9</code> sitting under{' '}
          <code>4</code> passes the local test (<code>9 &gt; 4</code>) even though <code>9</code> is in{' '}
          <code>8</code>&apos;s <em>left</em> subtree and must be below <code>8</code>. The BST property is about{' '}
          <strong>all descendants</strong>, not children — so a node must be checked against every ancestor above
          it, not just its parent.
        </div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The fix: carry the allowed range down the tree</div>
          Instead of comparing a node with its neighbours, give every node an <strong>open interval</strong>{' '}
          <code>(minVal, maxVal)</code> that its value must fall inside. Start with <code>(-∞, +∞)</code> at the
          root and tighten on the way down:
          <ul>
            <li>
              going <strong>left</strong>, the parent becomes the new <strong>upper</strong> bound →{' '}
              <code>(minVal, root.val)</code>
            </li>
            <li>
              going <strong>right</strong>, the parent becomes the new <strong>lower</strong> bound →{' '}
              <code>(root.val, maxVal)</code>
            </li>
          </ul>
          A node&apos;s range therefore encodes <em>every</em> ancestor constraint at once, in <code>O(1)</code>{' '}
          space per frame. Node <code>9</code> in the bad tree arrives with the range <code>(-∞, 8)</code> from
          having gone left at the root, and <code>9 ≥ 8</code> fails immediately.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public boolean isValidBST(TreeNode root) {
        return isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    public boolean isValidBST(TreeNode root, long minVal, long maxVal) {
        if (root == null) return true;                                  // empty is valid

        if (root.val >= maxVal || root.val <= minVal) return false;     // outside the range

        return isValidBST(root.left,  minVal, root.val)     // left: tighten the MAX
            && isValidBST(root.right, root.val, maxVal);    // right: tighten the MIN
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Why the bounds are <code>long</code> and not <code>int</code></div>
        This is the detail the problem is actually testing. Node values are allowed to be{' '}
        <code>Integer.MIN_VALUE</code> and <code>Integer.MAX_VALUE</code>. With <code>int</code> bounds, a
        single-node tree holding <code>Integer.MIN_VALUE</code> would be tested as{' '}
        <code>root.val &lt;= Integer.MIN_VALUE</code> → <code>true</code> → <strong>false</strong>, rejecting a
        perfectly valid tree. Widening to <code>long</code> gives you sentinels that no <code>int</code> value can
        ever reach.
        <br /><br />
        The alternatives, if you dislike the widening: pass <code>Integer</code> objects and treat{' '}
        <code>null</code> as &quot;no bound&quot;, or use the inorder approach below which needs no sentinels at
        all.
      </div>

      <div className="subsection-header"><h3>Dry run — on the invalid tree from 7.1</h3></div>
      <pre className="diagram">{
`              (8)
             /   \\
           (4)   (12)
          /  \\
        (2)  (9)      <-- 9 is in 8's LEFT subtree but 9 > 8

 isValidBST(8,  -INF, +INF)   8 inside (-INF, +INF)  ✓
   isValidBST(4, -INF, 8)     4 inside (-INF, 8)     ✓
     isValidBST(2, -INF, 4)   2 inside (-INF, 4)     ✓   -> leaf, true
     isValidBST(9, 4, 8)      9 >= 8  ->  FALSE      ✗   <-- caught
   -> the && short-circuits, node 12 is never visited
 result = false        ✓

 Note the range (4, 8) handed to node 9: the 4 came from its parent, the 8
 came from its GRANDparent. That is the whole point of range propagation.`
      }</pre>

      <div className="subsection-header"><h3>Alternative — inorder must be strictly increasing</h3></div>
      <div className="card">
        <p>
          An entirely different angle on the same problem, and arguably the more elegant one: by 7.1 a tree is a BST{' '}
          <strong>if and only if</strong> its inorder traversal is strictly increasing. So do an inorder walk and
          compare each value with the previous one — no ranges, no sentinels. Only one variable of state is needed,
          and it is the same <code>prev</code> pointer that 9.3 (Recover BST) will reuse.
        </p>
      </div>
      <Code>{
`class Solution {
    private TreeNode prev = null;

    public boolean isValidBST(TreeNode root) {
        if (root == null) return true;

        if (!isValidBST(root.left)) return false;          // LEFT

        if (prev != null && prev.val >= root.val) {        // ROOT: compare with predecessor
            return false;                                  // not strictly increasing
        }
        prev = root;

        return isValidBST(root.right);                     // RIGHT
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Every node visited once; short-circuits on the first violation.
        </CxBox>
        <CxBox label="Space" value="O(h)">Recursion stack only, in both versions.</CxBox>
      </Cx>

      {/* 8.3 */}
      <div id="s8-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 235</span>
        <span className="pill pill-success">Easy–Medium</span>
        <span className="pill">Compare with 5.2</span>
        <span className="pill">O(h), not O(n)</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given two nodes <code>p</code> and <code>q</code>, return their lowest common
          ancestor — the deepest node having both as descendants (a node counts as a descendant of itself).
        </p>
        <p>
          <strong>Compare with the general tree version (5.2).</strong> In a plain binary tree you had to search{' '}
          <em>both</em> subtrees and detect the split from below, costing <code>O(n)</code>. In a BST the values
          tell you which way to go without any searching at all, so the whole thing collapses to a single downward
          walk.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The LCA is the first node where the path splits</div>
          Standing at <code>root</code> there are exactly three possibilities:
          <ul>
            <li>
              <strong>Both <code>p</code> and <code>q</code> are smaller</strong> → both live in the left subtree,
              so the answer is somewhere left. Go left.
            </li>
            <li><strong>Both are larger</strong> → both live in the right subtree. Go right.</li>
            <li>
              <strong>Anything else</strong> — one is smaller and one is larger, or one <em>equals</em>{' '}
              <code>root</code> → the paths to <code>p</code> and <code>q</code> diverge here (or end here).{' '}
              <strong>This node is the LCA.</strong> Return it.
            </li>
          </ul>
          The third case needs no explicit test: if the first two conditions both fail, you are already standing on
          the answer. That is why the code is five lines.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;

        int curr = root.val;

        if (curr < p.val && curr < q.val) {                  // both are bigger
            return lowestCommonAncestor(root.right, p, q);
        }
        if (curr > p.val && curr > q.val) {                  // both are smaller
            return lowestCommonAncestor(root.left, p, q);
        }
        return root;                                          // split point -> the LCA
    }
}`
      }</Code>

      <div className="card">
        <p>
          Both recursive calls are in tail position, so the iterative form is strictly better — <code>O(1)</code>{' '}
          space and, by 7.1&apos;s master template, the shape you should reach for by default:
        </p>
      </div>
      <Code>{
`public TreeNode lowestCommonAncestorIterative(TreeNode root, TreeNode p, TreeNode q) {
    while (root != null) {
        if (root.val < p.val && root.val < q.val)      root = root.right;
        else if (root.val > p.val && root.val > q.val) root = root.left;
        else return root;                              // the first split point
    }
    return null;
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`              (8)
             /   \\
           (4)   (12)
          /  \\   /  \\
        (2) (6)(10)(14)

 LCA(2, 6)
   root=8   both 2 and 6 < 8   -> go LEFT
   root=4   2 < 4 but 6 > 4    -> SPLIT -> return 4      ✓

 LCA(2, 14)
   root=8   2 < 8 but 14 > 8   -> SPLIT immediately -> return 8   ✓

 LCA(4, 6)     (an ancestor-descendant pair -- the case people forget)
   root=8   both < 8            -> go LEFT
   root=4   curr == p.val, so neither "both bigger" nor "both smaller" holds
            -> return 4         ✓   a node IS its own ancestor`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(h)">
          A single descent. Contrast 5.2&apos;s <code>O(n)</code> for a general binary tree.
        </CxBox>
        <CxBox label="Space" value="O(1)">
          Iterative version. Recursive costs <code>O(h)</code> for tail calls Java will not remove.
        </CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 What if a node might not be in the tree?</div>
        LeetCode 235 guarantees both <code>p</code> and <code>q</code> exist. If that guarantee is removed this code
        returns a plausible-looking node that is not really an LCA — so you must <strong>verify</strong>: run
        7.2&apos;s search for both values (starting from the returned candidate is enough) and return{' '}
        <code>null</code> unless both are found. Still <code>O(h)</code>. Interviewers do ask this follow-up.
      </div>

      {/* 8.4 */}
      <div id="s8-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 1008</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Upper-bound trick</span>
        <span className="pill">O(n), one pass</span>
      </div>
      <div className="card">
        <p><strong>Problem.</strong> Given the preorder traversal of a BST, rebuild the tree.</p>
        <p>
          <strong>Why one traversal is enough here.</strong> 6.2 insisted that preorder alone cannot determine a
          binary tree. A <strong>BST</strong> is different: the sorted order is implied by the values themselves, so
          the missing inorder array is <em>free</em> — it is just the preorder array sorted. That observation gives
          three solutions of increasing quality.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Approach</th><th>Idea</th><th>Time</th></tr></thead>
            <tbody>
              <tr>
                <td><span className="pill pill-danger">Naive</span></td>
                <td>Insert each value with 7.5&apos;s <code>insertIntoBST</code></td>
                <td><code>O(n²)</code> — and the input is often sorted, which is the worst case</td>
              </tr>
              <tr>
                <td><span className="pill pill-warn">Sort</span></td>
                <td>Sort a copy to get inorder, then run 6.2 unchanged</td>
                <td><code>O(n log n)</code></td>
              </tr>
              <tr>
                <td><span className="pill pill-success">Upper bound</span></td>
                <td>One pass, each node carrying the largest value it is allowed to hold</td>
                <td><span className="pill pill-success">O(n)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The upper-bound trick</div>
          Walk the array left to right with a shared cursor <code>i</code>. Each recursive call is told a{' '}
          <code>bound</code> — the strict upper limit for values belonging in this subtree. Then:
          <ul>
            <li>
              If <code>A[i] &gt; bound</code>, the current value does not belong in this subtree at all → return{' '}
              <code>null</code> without consuming it. The value will be picked up by an ancestor further up, whose
              bound is looser.
            </li>
            <li>
              Otherwise consume it as the subtree&apos;s root, then recurse{' '}
              <strong>left with bound = root.val</strong> (everything left of a node is smaller than it) and{' '}
              <strong>right with the inherited bound</strong> (the right subtree is limited by the same ancestor
              that limited this node).
            </li>
          </ul>
          This is 8.2&apos;s range propagation used <em>constructively</em> rather than as a check — and only the
          upper bound is needed, because preorder already guarantees you never see a too-small value.
        </div>
        <p>
          <strong>Why <code>int[] i</code>.</strong> The cursor must be shared across every frame — when the left
          subtree consumes six values, the right subtree has to start after them. Java has no output parameters, so
          it goes in a one-slot array, exactly the <code>int[1]</code> idiom from Part 3.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public TreeNode bstFromPreorder(int[] A) {
        return bstFromPreorder(A, Integer.MAX_VALUE, new int[]{0});
    }

    public TreeNode bstFromPreorder(int[] A, int bound, int[] i) {
        if (i[0] == A.length || A[i[0]] > bound) return null;   // done, or not mine

        TreeNode root = new TreeNode(A[i[0]++]);                // consume one value

        root.left  = bstFromPreorder(A, root.val, i);           // left: capped by ME
        root.right = bstFromPreorder(A, bound,    i);           // right: capped by my ancestor

        return root;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` A = [8, 5, 1, 7, 10, 12]        i = 0,  bound = +INF

 build(bound=INF)  A[0]=8 <= INF   -> root 8, i=1
   LEFT  build(bound=8)
           A[1]=5 <= 8   -> root 5, i=2
           LEFT  build(bound=5)
                   A[2]=1 <= 5   -> root 1, i=3
                   LEFT  build(bound=1): A[3]=7 > 1  -> null   (7 is not mine)
                   RIGHT build(bound=5): A[3]=7 > 5  -> null   (nor mine)
                   => leaf 1
           RIGHT build(bound=8)
                   A[3]=7 <= 8   -> root 7, i=4
                   LEFT  build(bound=7):  A[4]=10 > 7  -> null
                   RIGHT build(bound=8):  A[4]=10 > 8  -> null
                   => leaf 7
           => subtree 5(1, 7)
   RIGHT build(bound=INF)
           A[4]=10 <= INF -> root 10, i=5
           LEFT  build(bound=10): A[5]=12 > 10 -> null
           RIGHT build(bound=INF): A[5]=12 <= INF -> root 12, i=6
                   both children: i[0] == A.length -> null, null
           => subtree 10(-, 12)

 result:          (8)
                 /   \\
               (5)   (10)
              /  \\      \\
            (1)  (7)    (12)

 Notice the rejections: 7 was refused by bounds 1 and 5 before node 5's
 right call (bound 8) claimed it; 10 was refused by bounds 7 and 8 before
 the root's right call (bound INF) claimed it. Each rejection is O(1) and
 every value is accepted exactly once, so the total stays O(n).`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Each value is consumed once; each rejection immediately returns.
        </CxBox>
        <CxBox label="Space" value="O(h)">
          Recursion stack only — no HashMap, unlike 6.2.
        </CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Two variants worth a sentence each</div>
        <ul>
          <li>
            <strong>From postorder.</strong> Read the array <em>backwards</em> (postorder reversed is{' '}
            <code>Root → Right → Left</code>) and swap the roles: track a <strong>lower</strong> bound, build{' '}
            <code>right</code> before <code>left</code>.
          </li>
          <li>
            <strong>From a sorted array (LeetCode 108).</strong> A different problem — you want the{' '}
            <em>balanced</em> BST, so take the middle element as root and recurse on the halves. <code>O(n)</code>,
            and the result has height <code>O(log n)</code> by construction.
          </li>
        </ul>
      </div>

      {/* 8.5 */}
      <div id="s8-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 285</span>
        <span className="pill">GfG</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Same loop as 7.3 / 7.4</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a node <code>p</code>, find the node that comes immediately{' '}
          <strong>after</strong> it (successor) and immediately <strong>before</strong> it (predecessor) in the
          inorder — that is, sorted — order. Return <code>null</code> when none exists.
        </p>
        <p>
          <strong>The naive approach.</strong> Do a full inorder traversal into a list and look at the neighbours of{' '}
          <code>p</code>: <code>O(n)</code> time and <code>O(n)</code> space. Correct, and it also works on a plain
          binary tree — but it ignores the ordering completely.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Successor = the tightest &quot;greater than <code>p</code>&quot; seen on the way down
          </div>
          Walk down from the root looking for values strictly greater than <code>p.val</code>:
          <ul>
            <li>
              <code>p.val ≥ root.val</code> → this node cannot be the successor (it is too small, or it{' '}
              <em>is</em> <code>p</code>). Everything to its left is smaller still. <strong>Go right.</strong>
            </li>
            <li>
              <code>p.val &lt; root.val</code> → this node <em>is</em> a valid successor candidate. Record it, then{' '}
              <strong>go left</strong> to hunt for a smaller value that is still bigger than <code>p</code>.
            </li>
          </ul>
          Identical in shape to ceil (7.3); the only difference is that <code>≥</code> makes it{' '}
          <strong>strict</strong>, so a node equal to <code>p</code> is never itself the answer. The predecessor is
          the exact mirror, and matches floor (7.4).
          <br /><br />
          Note this needs no parent pointers and does not care whether <code>p</code> has children — it answers by
          value, from the root, in one pass.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {

    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        TreeNode successor = null;

        while (root != null) {

            if (p.val >= root.val) {
                root = root.right;          // too small (or equal) -> answer is to the right
            } else {
                successor = root;           // valid candidate: root.val > p.val
                root = root.left;           // try to tighten it
            }
        }

        return successor;                   // null if p is the maximum
    }

    // Mirror image: swap the comparison and the two directions.
    public TreeNode inorderPredecessor(TreeNode root, TreeNode p) {
        TreeNode predecessor = null;

        while (root != null) {

            if (p.val <= root.val) {
                root = root.left;           // too big (or equal) -> answer is to the left
            } else {
                predecessor = root;         // valid candidate: root.val < p.val
                root = root.right;          // try to tighten it
            }
        }

        return predecessor;                 // null if p is the minimum
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Both at once — the GfG signature</h3></div>
      <div className="card">
        <p>
          GeeksforGeeks asks for both in a single pass, writing into two out-parameters. It is the two loops above
          fused, which costs nothing extra since they walk independently:
        </p>
      </div>
      <Code>{
`public void findPreSuc(TreeNode root, TreeNode[] pre, TreeNode[] suc, int key) {
    TreeNode cur = root;
    while (cur != null) {                    // hunt for the successor
        if (key < cur.val) { suc[0] = cur; cur = cur.left; }
        else                 cur = cur.right;
    }

    cur = root;
    while (cur != null) {                    // hunt for the predecessor
        if (key > cur.val) { pre[0] = cur; cur = cur.right; }
        else                 cur = cur.left;
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

 sorted order: 2, 4, 6, 8, 10, 12, 14

 successor(p = 8)                       expect 10
   root=8   8 >= 8   -> go RIGHT             (equal is NOT a candidate)
   root=12  8 < 12   -> successor = 12, go LEFT
   root=10  8 < 10   -> successor = 10, go LEFT
   root=null -> return 10        ✓

 successor(p = 6)                       expect 8
   root=8   6 < 8    -> successor = 8, go LEFT
   root=4   6 >= 4   -> go RIGHT
   root=6   6 >= 6   -> go RIGHT
   root=null -> return 8         ✓   (the answer was an ANCESTOR, not a child)

 predecessor(p = 10)                    expect 8
   root=8   10 > 8   -> predecessor = 8, go RIGHT
   root=12  10 <= 12 -> go LEFT
   root=10  10 <= 10 -> go LEFT
   root=null -> return 8         ✓

 successor(p = 14)                      14 is the maximum
   root=8 -> right, root=12 -> right, root=14 -> right, root=null
   successor never set -> return null   ✓`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(h)">
          One descent each. The traversal-into-a-list approach is <code>O(n)</code>.
        </CxBox>
        <CxBox label="Space" value="O(1)">One pointer of state per answer.</CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The other formulation: when you are standing <em>on</em> the node</div>
        If you are handed the node itself (and it has a parent pointer, as in a real <code>TreeMap</code>{' '}
        implementation), the successor has a two-case structure worth knowing:
        <ul>
          <li>
            <strong>Has a right child</strong> → the successor is the{' '}
            <strong>leftmost node of the right subtree</strong>. No parents needed.
          </li>
          <li>
            <strong>No right child</strong> → climb parents until you step up from a <strong>left</strong> child;
            that parent is the successor. (If you run out of parents, <code>p</code> was the maximum.)
          </li>
        </ul>
        The first case is exactly what 7.6&apos;s delete used to find its replacement node, and the second is
        exactly what Morris threading (6.5) simulated by rewiring pointers instead of climbing.
      </div>

      {/* 9.1 */}
      <div id="s9-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        The last four problems combine everything: a paused traversal turned into an object, two of those objects
        solving a two-pointer problem, an inorder walk that repairs a broken tree, and a postorder walk that reports
        upward on three quantities at once.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 173</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Design</span>
        <span className="pill">Amortised O(1)</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Implement an iterator over a BST returning values in ascending order, with{' '}
          <code>next()</code> and <code>hasNext()</code>. The constraint that makes it interesting:{' '}
          <code>O(h)</code> memory, <em>not</em> <code>O(n)</code>.
        </p>
        <p>
          <strong>The forbidden solution.</strong> Run a full inorder traversal in the constructor, store the{' '}
          <code>n</code> values in a list, and hand them out one at a time. Both methods become <code>O(1)</code> —
          but you paid <code>O(n)</code> memory and <code>O(n)</code> up-front time, so a caller who only wants the
          first three values funded the entire traversal. The constraint exists to rule this out.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 An iterator is a traversal you are allowed to pause</div>
          This is the payoff promised back in 2.3. Recursion cannot be paused halfway — its state lives in the call
          stack, which you do not control. An <strong>explicit stack</strong> can: keep exactly the nodes whose left
          subtrees are still owed, and each <code>next()</code> resumes the walk, does the minimum work, and stops
          again.
          <br /><br />
          The invariant, which is the whole design:{' '}
          <strong>the stack always holds the path from the root down to the smallest unvisited node</strong>, so{' '}
          <code>stack.peek()</code> is always the next value to return. <code>pushAll(node)</code> establishes it by
          walking left; the constructor establishes it once from the root, and <code>next()</code> restores it by
          calling <code>pushAll(popped.right)</code>.
        </div>
        <ol className="steps">
          <li>
            <strong>Constructor:</strong> <code>pushAll(root)</code> — push the root and every left child down to
            the minimum.
          </li>
          <li>
            <strong><code>hasNext()</code>:</strong> the stack is non-empty. That is the entire test.
          </li>
          <li>
            <strong><code>next()</code>:</strong> pop the top (the smallest unvisited node). Its left subtree is
            finished by construction, so re-establish the invariant with <code>pushAll(node.right)</code>, then
            return the value.
          </li>
        </ol>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`public class BSTIterator {
    private Stack<TreeNode> stack = new Stack<TreeNode>();

    public BSTIterator(TreeNode root) {
        pushAll(root);                       // establish the invariant
    }

    /** @return whether we have a next smallest number */
    public boolean hasNext() {
        return !stack.isEmpty();
    }

    /** @return the next smallest number */
    public int next() {
        TreeNode tmpNode = stack.pop();      // smallest unvisited node
        pushAll(tmpNode.right);              // its right subtree is now the frontier
        return tmpNode.val;
    }

    private void pushAll(TreeNode node) {
        for (; node != null; stack.push(node), node = node.left);
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 That <code>for</code> loop with an empty body</div>
        <code>for (; node != null; stack.push(node), node = node.left);</code> is a compact idiom, not a typo. The
        update section uses the comma operator to do two things per step, and the body is empty (the trailing{' '}
        <code>;</code>). It is exactly equivalent to the clearer:
        <Code>{
`private void pushAll(TreeNode node) {
    while (node != null) {
        stack.push(node);
        node = node.left;
    }
}`
        }</Code>
        Also worth noting: <code>java.util.Stack</code> is synchronised legacy (see the note in 2.3);{' '}
        <code>Deque&lt;TreeNode&gt; stack = new ArrayDeque&lt;&gt;()</code> is the modern choice. Neither changes
        the algorithm.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`              (8)
             /   \\
           (4)   (12)
          /  \\   /  \\
        (2) (6)(10)(14)

 new BSTIterator(8)
   pushAll(8): push 8, push 4, push 2      stack=[8,4,2]   (top on the right)

 next() -> pop 2,  pushAll(2.right = null) stack=[8,4]        return 2
 next() -> pop 4,  pushAll(4.right = 6)    stack=[8,6]        return 4
 next() -> pop 6,  pushAll(null)           stack=[8]          return 6
 next() -> pop 8,  pushAll(8.right = 12):
             push 12, push 10              stack=[12,10]      return 8
 next() -> pop 10, pushAll(null)           stack=[12]         return 10
 next() -> pop 12, pushAll(12.right = 14)  stack=[14]         return 12
 next() -> pop 14, pushAll(null)           stack=[]           return 14
 hasNext() -> false

 output: 2, 4, 6, 8, 10, 12, 14        ✓  sorted, and the stack never
 held more than 3 nodes = the height of the tree.`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(1) amortised">
          A single <code>next()</code> can cost <code>O(h)</code>, but <code>n</code> calls push each node exactly
          once → <code>O(n)</code> total, so <code>O(1)</code> each on average.
        </CxBox>
        <CxBox label="Space" value="O(h)">
          The stack holds one root-to-node path, never the whole tree.
        </CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The follow-up: add <code>prev()</code></div>
        LeetCode 1586 asks for a bidirectional iterator. The clean answer is <em>not</em> to make one stack walk
        backwards — it is to keep the visited values in a list plus a cursor, so <code>prev()</code> just steps the
        cursor back and <code>next()</code> either steps forward through already-known values or advances the
        underlying stack walk. Costs <code>O(n)</code> memory in the worst case, which is unavoidable once you can
        move both ways. Section 9.2 shows the <em>other</em> use of direction: two independent one-way iterators.
      </div>

      {/* 9.2 */}
      <div id="s9-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 653</span>
        <span className="pill pill-success">Easy–Medium</span>
        <span className="pill">Two pointers on a tree</span>
        <span className="pill">Builds on 9.1</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return <code>true</code> if two <em>different</em> nodes of the BST sum to{' '}
          <code>k</code>.
        </p>
        <p>
          <strong>The easy answers first.</strong> A <code>HashSet</code> works exactly as in the array version —
          traverse, and for each value ask whether <code>k - val</code> has been seen. <code>O(n)</code> time,{' '}
          <code>O(n)</code> space, and it ignores the BST property entirely. Or flatten to a sorted array by inorder
          and run classic two pointers: also <code>O(n)</code> space.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The elegant answer: two iterators facing each other</div>
          Classic two pointers on a sorted array needs one pointer walking up from the smallest value and one
          walking down from the largest. From 9.1 we know how to produce ascending values in <code>O(h)</code>{' '}
          space — so produce descending values the same way (dive <strong>right</strong> instead of{' '}
          <strong>left</strong>) and run one of each:
          <ul>
            <li>
              <code>i + j == k</code> → found the pair, return <code>true</code>.
            </li>
            <li>
              <code>i + j &lt; k</code> → the sum is too small, so advance the <strong>ascending</strong> iterator:{' '}
              <code>i = l.next()</code>.
            </li>
            <li>
              <code>i + j &gt; k</code> → too big, so advance the <strong>descending</strong> iterator:{' '}
              <code>j = r.next()</code>.
            </li>
          </ul>
          The loop guard <code>while (i &lt; j)</code> is what stops the two ends crossing — and it is also what
          forbids using the same node twice, since <code>i == j</code> would mean both iterators are standing on one
          node.
          <br /><br />
          Space drops from <code>O(n)</code> to <code>O(h)</code>: two stacks, each holding one path. On a balanced
          tree of a million nodes that is 40 pointers instead of a million.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <div className="card">
        <p>
          Two pieces, and the second one does all the new work. <code>findTarget</code> is the two-pointer sweep;{' '}
          <code>BSTIterator</code> is 9.1&apos;s class with a single <code>boolean reverse</code> flag added, so
          that every place the original dived <code>left</code> it now consults the flag instead — one class, two
          directions, and the sweep simply builds one of each.
        </p>
      </div>
      <Code>{
`class Solution {
    public boolean findTarget(TreeNode root, int k) {
        if (root == null) return false;

        BSTIterator l = new BSTIterator(root, false);   // ascending  -> smallest first
        BSTIterator r = new BSTIterator(root, true);    // descending -> largest first

        int i = l.next();                               // current smallest
        int j = r.next();                               // current largest

        while (i < j) {                                 // i < j forbids reusing one node
            if (i + j == k) return true;
            else if (i + j < k) i = l.next();           // need a bigger sum
            else j = r.next();                          // need a smaller sum
        }
        return false;
    }
}

// ── 9.1's iterator, made bidirectional by one flag ──
class BSTIterator {
    private Stack<TreeNode> stack = new Stack<TreeNode>();
    private boolean reverse;                 // true  -> descending (largest first)
                                             // false -> ascending  (smallest first)
    public BSTIterator(TreeNode root, boolean isReverse) {
        reverse = isReverse;
        pushAll(root);
    }

    /** @return whether another value is available in this iterator's direction */
    public boolean hasNext() {
        return !stack.isEmpty();
    }

    /** @return the next value: smallest-first when ascending, largest-first when descending */
    public int next() {
        TreeNode tmpNode = stack.pop();
        if (!reverse) pushAll(tmpNode.right);           // ascending: frontier is the right
        else          pushAll(tmpNode.left);            // descending: frontier is the left
        return tmpNode.val;
    }

    private void pushAll(TreeNode node) {
        while (node != null) {
            stack.push(node);
            if (reverse) {
                node = node.right;           // descending: dive to the MAXIMUM
            } else {
                node = node.left;            // ascending: dive to the MINIMUM
            }
        }
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — k = 16</h3></div>
      <pre className="diagram">{
`              (8)
             /   \\
           (4)   (12)
          /  \\   /  \\
        (2) (6)(10)(14)

 sorted view:  2  4  6  8  10  12  14
               ^                    ^
               i                    j

 l (ascending)  stack after construction = [8,4,2]   -> first next() = 2
 r (descending) stack after construction = [8,12,14] -> first next() = 14

 i=2,  j=14   2 + 14 = 16 == k  ->  return true      ✓

 ---- a longer sweep, k = 18 ----
 i=2,  j=14   16 < 18  -> i = l.next() = 4
 i=4,  j=14   18 == 18 -> return true                ✓

 ---- no solution, k = 100 ----
 i=2,  j=14   16 < 100 -> i = 4
 i=4,  j=14   18 < 100 -> i = 6
 i=6,  j=14   20 < 100 -> i = 8
 i=8,  j=14   22 < 100 -> i = 10
 i=10, j=14   24 < 100 -> i = 12
 i=12, j=14   26 < 100 -> i = 14
 i=14, j=14   loop guard i < j fails -> return false ✓
              (and note it correctly refused to use node 14 twice)`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Each iterator advances at most <code>n</code> times in total, at <code>O(1)</code> amortised each.
        </CxBox>
        <CxBox label="Space" value="O(h)">
          Two stacks of one path each — the win over the <code>HashSet</code> and flatten-to-array solutions, which
          both need <code>O(n)</code>.
        </CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 Three tidy-ups from the version in your notes</div>
        All cosmetic — the algorithm is untouched — but each one is the kind of thing a reviewer notices:
        <ul>
          <li>
            <strong>The Javadoc lied in one direction.</strong> Your screenshot keeps 9.1&apos;s comments, so{' '}
            <code>next()</code> is documented as returning &quot;<em>the next smallest number</em>&quot; even when{' '}
            <code>reverse == true</code>, where it actually returns the next <em>largest</em>. A comment that
            contradicts the code is worse than no comment, so both are reworded to describe the flag.
          </li>
          <li>
            <strong><code>boolean reverse = true;</code> had a dead initialiser.</strong> The constructor always
            assigns <code>reverse = isReverse</code>, so the <code>= true</code> could never be observed — it only
            invites the reader to wonder which default wins. It is now declared{' '}
            <code>private boolean reverse;</code> and set once.
          </li>
          <li>
            <strong><code>if (reverse == true)</code> → <code>if (reverse)</code>.</strong> Comparing a{' '}
            <code>boolean</code> to a literal is noise, and <code>== true</code> is one keystroke away from the{' '}
            <code>= true</code> that silently assigns.
          </li>
        </ul>
      </div>

      {/* 9.3 */}
      <div id="s9-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 99</span>
        <span className="pill pill-warn">Medium–Hard</span>
        <span className="pill">Count the violations</span>
        <span className="pill">Beautiful problem</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Exactly <strong>two</strong> nodes of a valid BST had their values swapped by
          mistake. Restore the BST by swapping them back, without changing the structure.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Think in the sorted array, not in the tree</div>
          By 7.1 the inorder traversal of a correct BST is strictly increasing. Swapping two elements of a sorted
          array produces one of exactly two patterns, and telling them apart is the whole problem:
          <pre className="diagram">{
` correct:            1   4   6   8   10   12   14

 CASE A -- the two swapped values are NOT adjacent
 swap 4 and 12:      1  [12]  6   8   10  [4]  14
                         ^^                ^^
      violation 1: 12 > 6   (prev=12, curr=6)   -> first = 12, middle = 6
      violation 2: 10 > 4   (prev=10, curr=4)   -> last  = 4
      TWO violations. The answer is the FIRST value of violation 1 and the
      SECOND value of violation 2, i.e. swap \`first\` and \`last\`.

 CASE B -- the two swapped values ARE adjacent
 swap 6 and 8:       1   4  [8] [6]  10   12   14
                             ^^^ ^^^
      violation 1: 8 > 6    (prev=8, curr=6)    -> first = 8, middle = 6
      ONE violation only. Swap \`first\` and \`middle\`.`
          }</pre>
          So: do one inorder walk, remember the previous node, and record <em>the first two violations you see</em>.
          Two violations → swap <code>first</code> with <code>last</code>. One violation → swap{' '}
          <code>first</code> with <code>middle</code>. That is the entire algorithm.
        </div>
        <p>
          <strong>The three pointers, precisely.</strong> On a violation (<code>prev.val &gt; curr.val</code>):
        </p>
        <ul>
          <li>
            <code>first</code> — the <code>prev</code> of the <strong>first</strong> violation. This is always one
            of the two culprits: it is a value that has been moved too far <em>left</em>.
          </li>
          <li>
            <code>middle</code> — the <code>curr</code> of the first violation. It is the second culprit{' '}
            <em>only in the adjacent case</em>.
          </li>
          <li>
            <code>last</code> — the <code>curr</code> of the <strong>second</strong> violation. When it exists it is
            the true second culprit: a value moved too far <em>right</em>.
          </li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private TreeNode first;
    private TreeNode prev;
    private TreeNode middle;
    private TreeNode last;

    private void inorder(TreeNode root) {
        if (root == null) return;

        inorder(root.left);

        if (prev != null && (root.val < prev.val))
        {
            // If this is first violation, mark these two nodes as
            // 'first' and 'middle'
            if (first == null)
            {
                first  = prev;
                middle = root;
            }

            // If this is second violation, mark this node as last
            else
                last = root;
        }

        // Mark this node as previous
        prev = root;
        inorder(root.right);
    }

    public void recoverTree(TreeNode root) {
        first = middle = last = null;
        prev  = new TreeNode(Integer.MIN_VALUE);     // sentinel: nothing precedes the minimum

        inorder(root);

        if (first != null && last != null) {         // two violations -> non-adjacent swap
            int t = first.val;
            first.val = last.val;
            last.val  = t;
        }
        else if (first != null && middle != null) {  // one violation -> adjacent swap
            int t = first.val;
            first.val = middle.val;
            middle.val = t;
        }
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Two details in this implementation</div>
        <ul>
          <li>
            <strong>The <code>prev</code> sentinel.</strong> Initialising <code>prev</code> to a node holding{' '}
            <code>Integer.MIN_VALUE</code> means the very first real node can never appear to be a violation, which
            removes a null check from the hot path. The <code>prev != null</code> test inside <code>inorder</code>{' '}
            then never actually fires — it is belt-and-braces. Note the sentinel fails if a real node holds{' '}
            <code>Integer.MIN_VALUE</code>; leaving <code>prev = null</code> and relying on the null check is the
            safer choice.
          </li>
          <li>
            <strong>Values are swapped, not nodes.</strong> <code>first.val = last.val</code> exchanges{' '}
            <em>contents</em>, leaving every pointer alone. Re-parenting the two nodes would be far harder and is
            unnecessary — the problem only cares that the tree reads correctly.
          </li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Dry run — both cases</h3></div>
      <pre className="diagram">{
` CASE A: non-adjacent.  8 and 2 were swapped.

              (2)                      inorder walk: 8, 4, 6, 2, 10, 12, 14
             /   \\                                   ^^^^     ^^^^^^^
           (4)   (12)
          /  \\   /  \\
        (8) (6)(10)(14)

   prev=MIN curr=8    8 > MIN, fine        prev = 8
   prev=8   curr=4    4 < 8   VIOLATION 1  first = 8, middle = 4
   prev=4   curr=6    fine                 prev = 6
   prev=6   curr=2    2 < 6   VIOLATION 2  last = 2
   prev=2   curr=10   fine
   prev=10  curr=12   fine
   prev=12  curr=14   fine

   first=8 and last=2 both set -> swap them
   -> the tree now reads 2, 4, 6, 8, 10, 12, 14      ✓

 CASE B: adjacent.  6 and 8 were swapped.

              (6)                      inorder walk: 2, 4, 8, 6, 10, 12, 14
             /   \\                                         ^^^^
           (4)   (12)
          /  \\   /  \\
        (2) (8)(10)(14)

   prev=4  curr=8   fine
   prev=8  curr=6   6 < 8  VIOLATION 1   first = 8, middle = 6
   ... no further violations, so last stays null

   first=8, last=null -> fall through to the second branch
   swap first(8) with middle(6)
   -> the tree now reads 2, 4, 6, 8, 10, 12, 14      ✓`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One inorder traversal. You cannot do better — the swapped pair could be anywhere.
        </CxBox>
        <CxBox label="Space" value="O(h)">
          Recursion stack plus four pointers. Morris (6.5) makes it a true <code>O(1)</code>, which is the
          problem&apos;s own follow-up.
        </CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ The naive solution is <code>O(n log n)</code> and misses the point
        </div>
        Collecting the inorder list, sorting a copy, and comparing to find the two differing positions works and is
        easy to write — but it costs <code>O(n)</code> space and <code>O(n log n)</code> time, and it throws away
        the one fact the problem gave you: the list is <em>already</em> sorted except for one swap. The
        violation-counting solution above is the answer being tested for. Mention the naive one as a fallback, then
        write this.
      </div>

      {/* 9.4 */}
      <div id="s9-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 333</span>
        <span className="pill">GfG</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Postorder, three values up</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given an arbitrary binary tree (<em>not</em> a BST), find the number of nodes in
          its largest subtree that <em>is</em> a valid BST.
        </p>
        <p>
          <strong>The naive approach.</strong> For every node, run 8.2&apos;s validator on its subtree and count the
          nodes if it passes. Each check is <code>O(n)</code> and there are <code>n</code> nodes →{' '}
          <code>O(n²)</code>. This is the same &quot;recomputing information the children already knew&quot; mistake
          as the naive balanced-tree check in 3.2 — and it has the same fix.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 One postorder pass, three values returned upward</div>
          To decide whether the subtree at a node is a BST, a parent needs three things from each child:
          <ul>
            <li><code>minNode</code> — the smallest value in that subtree</li>
            <li><code>maxNode</code> — the largest value in that subtree</li>
            <li><code>maxSize</code> — the size of the largest BST found <em>anywhere</em> inside it</li>
          </ul>
          Java can only return one object, so bundle them into a small class. Then the check at each node is a
          single line: this subtree is a BST exactly when{' '}
          <code>left.maxNode &lt; root.val &lt; right.minNode</code>. Notice that this compares against the{' '}
          <strong>extremes of whole subtrees</strong>, not against child values — which is precisely the &quot;all
          descendants&quot; requirement from 7.1 that 8.2&apos;s naive check got wrong.
          <br /><br />
          This is Part 3&apos;s <em>return one thing, record another</em> pattern grown up: the node returns the
          range its parent needs <strong>and</strong> carries the running best size along in the same object.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The sentinel inversion — read this twice</div>
          An empty subtree returns{' '}
          <code>new NodeValue(Integer.MAX_VALUE, Integer.MIN_VALUE, 0)</code> — and since the constructor&apos;s
          parameter order is <code>(minNode, maxNode, maxSize)</code>, that means{' '}
          <strong><code>min = +∞</code> and <code>max = -∞</code></strong>. Deliberately <em>backwards</em>.
          <br /><br />
          Why: a leaf asks &quot;is <code>left.maxNode &lt; root.val</code>?&quot; With{' '}
          <code>left.maxNode = -∞</code> the answer is always yes, so an absent child never blocks anything. If the
          sentinels were the sensible way round, every leaf would fail and the algorithm would return 0.
          <br /><br />
          The failure branch inverts them again for the same reason, in reverse: returning{' '}
          <code>(min = -∞, max = +∞)</code> for a non-BST subtree guarantees the <em>parent&apos;s</em> comparison
          fails too, so invalidity propagates all the way up. The <code>maxSize</code> is still carried through, so
          the best BST found deeper inside is never lost.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class NodeValue {
    public int maxNode, minNode, maxSize;

    NodeValue(int minNode, int maxNode, int maxSize) {
        this.maxNode = maxNode;
        this.minNode = minNode;
        this.maxSize = maxSize;
    }
}

class Solution {
    private NodeValue largestBSTSubtreeHelper(TreeNode root) {
        // An empty tree is a BST of size 0.
        if (root == null) {
            return new NodeValue(Integer.MAX_VALUE, Integer.MIN_VALUE, 0);
        }

        // Get values from left and right subtree of current tree.
        NodeValue left  = largestBSTSubtreeHelper(root.left);
        NodeValue right = largestBSTSubtreeHelper(root.right);

        // Current node is greater than max in left AND smaller than min in
        // right, so it is a BST.
        if (left.maxNode < root.val && root.val < right.minNode) {
            // It is a BST.
            return new NodeValue(Math.min(root.val, left.minNode),
                                 Math.max(root.val, right.maxNode),
                                 left.maxSize + right.maxSize + 1);
        }

        // Otherwise, return [-inf, +inf] so that the parent can't be a valid BST
        return new NodeValue(Integer.MIN_VALUE, Integer.MAX_VALUE,
                             Math.max(left.maxSize, right.maxSize));
    }

    public int largestBSTSubtree(TreeNode root) {
        return largestBSTSubtreeHelper(root).maxSize;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 Why <code>Math.min(root.val, left.minNode)</code> and not just <code>left.minNode</code>
        </div>
        Because <code>left</code> may be the empty sentinel, whose <code>minNode</code> is <code>+∞</code>. The{' '}
        <code>Math.min</code> against <code>root.val</code> corrects for that in one step, so a node with no left
        child correctly reports <em>itself</em> as the subtree minimum. Same reasoning for{' '}
        <code>Math.max(root.val, right.maxNode)</code> on the other side. Two <code>Math</code> calls remove the
        need for any null branching.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                (10)                 <-- NOT a BST overall
               /    \\
             (5)    (15)
            /   \\      \\
          (1)   (8)    (7)           <-- 7 sits in 15's right subtree: invalid

 reading NodeValue as (min, max, size):

 helper(1)   leaf: left=(+INF,-INF,0), right=(+INF,-INF,0)
             -INF < 1 < +INF  -> BST
             -> (min(1,+INF), max(1,-INF), 0+0+1) = (1, 1, 1)

 helper(8)   same shape -> (8, 8, 1)

 helper(5)   left=(1,1,1)  right=(8,8,1)
             1 < 5 < 8  -> BST
             -> (min(5,1), max(5,8), 1+1+1) = (1, 8, 3)      <-- a BST of size 3

 helper(7)   leaf -> (7, 7, 1)

 helper(15)  left=(+INF,-INF,0)  right=(7,7,1)
             -INF < 15 but 15 < 7 is FALSE  -> NOT a BST
             -> (-INF, +INF, max(0, 1)) = (-INF, +INF, 1)
                the size 1 survives: node 7 alone is still a BST

 helper(10)  left=(1,8,3)  right=(-INF,+INF,1)
             8 < 10 ✓  but 10 < -INF is FALSE  -> NOT a BST
             -> (-INF, +INF, max(3, 1)) = (-INF, +INF, 3)

 answer = 3      ✓   the subtree {1, 5, 8}

 Note how 15's poisoned (-INF, +INF) made node 10 fail automatically --
 nobody had to re-check the subtree below it.`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One postorder pass, <code>O(1)</code> work per node. The naive version is <code>O(n²)</code>.
        </CxBox>
        <CxBox label="Space" value="O(h)">
          Recursion stack; each frame holds two small objects.
        </CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The variant that changes the answer</div>
        LeetCode 333 asks for the largest BST <strong>subtree</strong> — a node <em>and all</em> of its descendants,
        which is what the code above computes. Some versions ask for the largest BST <em>sub-structure</em>, where
        you may delete arbitrary nodes; that is a different and much harder problem. Read the statement: if it says
        &quot;subtree&quot;, the whole subtree must qualify, and this solution is the <code>O(n)</code> answer.
      </div>

      {/* 9.5 */}
      <div id="s9-5" data-topic-boundary="true" />
      <div className="card">
        <p>
          Every problem in these notes, with the pattern that solves it. <code>n</code> = number of nodes,{' '}
          <code>h</code> = height (<code>log n</code> balanced, <code>n</code> skewed), <code>w</code> = maximum
          width, <code>k</code> = the query parameter.
        </p>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>#</th><th>Problem</th><th>Pattern</th><th>Time</th><th>Space</th></tr>
          </thead>
          <tbody>
            <tr><td>2.1</td><td>Recursive traversals</td><td>DFS</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>2.2</td><td>Level order traversal</td><td>BFS + level-size snapshot</td><td><code>O(n)</code></td><td><code>O(w)</code></td></tr>
            <tr><td>2.3</td><td>Inorder iterative</td><td>Explicit stack, dive left</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>2.4</td><td>Preorder iterative</td><td>Stack, push right then left</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>2.5</td><td>Postorder iterative</td><td>Two stacks (reversal) / one stack</td><td><code>O(n)</code></td><td><code>O(n)</code> / <code>O(h)</code></td></tr>
            <tr><td>2.6</td><td>All three in one go</td><td>Stack of <code>(node, state)</code></td><td><code>O(3n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>3.1</td><td>Maximum depth</td><td>Postorder <code>1 + max</code></td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>3.2</td><td>Balanced binary tree</td><td>Height with <code>-1</code> sentinel</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>3.3</td><td>Diameter</td><td>Return height, record <code>lh + rh</code></td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>3.4</td><td>Maximum path sum</td><td>Diameter + clamp negatives at 0</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>3.5</td><td>Identical trees</td><td>Lockstep DFS on two trees</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>4.1</td><td>Zig-zag traversal</td><td>BFS + direction flag</td><td><code>O(n)</code></td><td><code>O(w)</code></td></tr>
            <tr><td>4.2</td><td>Boundary traversal</td><td>Left spine + leaves + reversed right spine</td><td><code>O(n)</code></td><td><code>O(n)</code></td></tr>
            <tr><td>4.3</td><td>Vertical order traversal</td><td>BFS + <code>TreeMap/TreeMap/PQ</code></td><td><code>O(n log n)</code></td><td><code>O(n)</code></td></tr>
            <tr><td>4.4</td><td>Top view</td><td>BFS + first value per <code>hd</code></td><td><code>O(n log n)</code></td><td><code>O(n)</code></td></tr>
            <tr><td>4.5</td><td>Bottom view</td><td>BFS + last value per <code>hd</code></td><td><code>O(n log n)</code></td><td><code>O(n)</code></td></tr>
            <tr><td>4.6</td><td>Right / left side view</td><td>Reverse preorder + <code>depth == size</code></td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>4.7</td><td>Symmetric tree</td><td>Mirrored pairwise DFS</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>5.1</td><td>Root to node path</td><td>DFS + backtracking</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>5.2</td><td>Lowest common ancestor</td><td>One-pass postorder split detection</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>5.3</td><td>Maximum width</td><td>BFS + normalised virtual indices</td><td><code>O(n)</code></td><td><code>O(w)</code></td></tr>
            <tr><td>5.4</td><td>Children sum property</td><td>Push down (preorder) then fix up (postorder)</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>5.5</td><td>Nodes at distance K</td><td>Parent map + BFS + visited</td><td><code>O(n)</code></td><td><code>O(n)</code></td></tr>
            <tr><td>5.6</td><td>Burn the tree</td><td>Parent map + BFS, count levels</td><td><code>O(n)</code></td><td><code>O(n)</code></td></tr>
            <tr><td>6.1</td><td>Count complete tree nodes</td><td>Left/right height equality → <code>2<sup>h+1</sup>-1</code> formula</td><td><code>O(log² n)</code></td><td><code>O(log n)</code></td></tr>
            <tr><td>6.2</td><td>Build from inorder + preorder</td><td>Root from preorder, split from inorder, HashMap index</td><td><code>O(n)</code></td><td><code>O(n)</code></td></tr>
            <tr><td>6.3</td><td>Build from inorder + postorder</td><td>Same, but the root is the <em>last</em> postorder element</td><td><code>O(n)</code></td><td><code>O(n)</code></td></tr>
            <tr><td>6.4</td><td>Serialize &amp; deserialize</td><td>BFS with explicit <code>&quot;n&quot;</code> null markers</td><td><code>O(n)</code></td><td><code>O(n)</code></td></tr>
            <tr><td>6.5</td><td>Morris inorder</td><td>Thread the predecessor&apos;s null <code>right</code>; print on 2nd visit</td><td><code>O(n)</code></td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td>6.6</td><td>Morris preorder</td><td>Same threading; print on 1st visit</td><td><code>O(n)</code></td><td><span className="pill pill-success">O(1)</span></td></tr>
            <tr><td>6.7</td><td>Flatten to linked list</td><td>Reverse preorder + <code>prev</code>, or Morris splice</td><td><code>O(n)</code></td><td><code>O(h)</code> / <code>O(1)</code></td></tr>
            <tr><td>7.2</td><td>Search in a BST</td><td>Compare and descend one side</td><td><code>O(h)</code></td><td><code>O(1)</code></td></tr>
            <tr><td>7.3</td><td>Ceil in a BST</td><td>Search, saving the candidate when going left</td><td><code>O(h)</code></td><td><code>O(1)</code></td></tr>
            <tr><td>7.4</td><td>Floor in a BST</td><td>Search, saving the candidate when going right</td><td><code>O(h)</code></td><td><code>O(1)</code></td></tr>
            <tr><td>7.5</td><td>Insert into a BST</td><td>Walk to the failing null pointer, attach a leaf</td><td><code>O(h)</code></td><td><code>O(1)</code></td></tr>
            <tr><td>7.6</td><td>Delete from a BST</td><td>Three cases; splice via inorder predecessor / successor</td><td><code>O(h)</code></td><td><code>O(1)</code> / <code>O(h)</code></td></tr>
            <tr><td>8.1</td><td>Kth smallest / largest</td><td>Iterative inorder with a counter and early exit</td><td><code>O(h + k)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>8.2</td><td>Validate a BST</td><td>Propagate <code>(min, max)</code> ranges, or check inorder is increasing</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>8.3</td><td>LCA in a BST</td><td>Descend until the two values straddle the node</td><td><code>O(h)</code></td><td><code>O(1)</code></td></tr>
            <tr><td>8.4</td><td>Construct BST from preorder</td><td>Shared cursor + inherited upper bound</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>8.5</td><td>Predecessor &amp; successor</td><td>Strict version of floor / ceil</td><td><code>O(h)</code></td><td><code>O(1)</code></td></tr>
            <tr><td>9.1</td><td>BST iterator</td><td>Stack holding the path to the next smallest node</td><td><code>O(1)</code> amortised</td><td><code>O(h)</code></td></tr>
            <tr><td>9.2</td><td>Two sum in a BST</td><td>One ascending + one descending iterator, two pointers</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>9.3</td><td>Recover a BST</td><td>Inorder, record the first two violations</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
            <tr><td>9.4</td><td>Largest BST in a binary tree</td><td>Postorder returning <code>(min, max, size)</code> with inverted sentinels</td><td><code>O(n)</code></td><td><code>O(h)</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>How to recognise the pattern in an interview</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>If the question mentions…</th><th>Reach for</th></tr></thead>
          <tbody>
            <tr>
              <td>height, depth, balance, diameter, &quot;sum along a path&quot;</td>
              <td>
                <strong>Postorder DFS</strong> returning one value, recording another in an <code>int[1]</code>
              </td>
            </tr>
            <tr>
              <td>&quot;level&quot;, &quot;each row&quot;, zig-zag, width, &quot;shortest number of steps&quot;</td>
              <td><strong>BFS</strong> with the <code>queue.size()</code> snapshot</td>
            </tr>
            <tr>
              <td>top view, bottom view, vertical lines, columns</td>
              <td><strong>BFS + horizontal distance</strong> in a <code>TreeMap</code></td>
            </tr>
            <tr>
              <td>left view, right view, &quot;first node of each level&quot;</td>
              <td>
                <strong>DFS with depth</strong> and the <code>depth == result.size()</code> test
              </td>
            </tr>
            <tr>
              <td>&quot;the path to&quot;, &quot;all paths&quot;, path sum enumeration</td>
              <td><strong>DFS + backtracking</strong> on a shared list</td>
            </tr>
            <tr>
              <td>ancestor, common parent</td>
              <td><strong>LCA</strong> split detection</td>
            </tr>
            <tr>
              <td>distance <em>between</em> nodes, spreading, burning, infecting</td>
              <td><strong>Parent map</strong> → treat it as an undirected graph → BFS</td>
            </tr>
            <tr>
              <td>&quot;it&apos;s a BST&quot;, sorted, kth, rank, range of values</td>
              <td>
                <strong>Inorder is sorted</strong> — then a counter, a comparison with <code>prev</code>, or two
                pointers
              </td>
            </tr>
            <tr>
              <td>find / insert / delete / ceil / floor / successor</td>
              <td>
                <strong>The BST master template</strong> (7.1) — one iterative descent, <code>O(h)</code>,{' '}
                <code>O(1)</code> space
              </td>
            </tr>
            <tr>
              <td>&quot;is this a valid BST&quot;, &quot;largest BST inside&quot;</td>
              <td>
                <strong>Ranges</strong>: propagate <code>(min, max)</code> down, or return them up from a postorder
                walk
              </td>
            </tr>
            <tr>
              <td>&quot;build the tree from…&quot;, given traversal arrays</td>
              <td>
                <strong>Root + split</strong>: preorder/postorder names the root, inorder (or the BST ordering
                itself) gives the boundary
              </td>
            </tr>
            <tr>
              <td><code>O(1)</code> space, &quot;no stack and no recursion&quot;</td>
              <td><strong>Morris threading</strong> (6.5, 6.6) — borrow the null right pointers</td>
            </tr>
            <tr>
              <td>iterator, streaming, &quot;next()&quot;, &quot;one at a time&quot;</td>
              <td><strong>Explicit stack holding one path</strong> (9.1) — a traversal you can pause</td>
            </tr>
            <tr>
              <td>&quot;complete tree&quot;, heap-shaped, indices <code>2i+1 / 2i+2</code></td>
              <td><strong>Height equality</strong> and the perfect-tree formula (6.1)</td>
            </tr>
            <tr>
              <td>encode / decode / persist / send over a network</td>
              <td>
                <strong>Traversal + null markers</strong> (6.4) — one traversal suffices once nulls are explicit
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout callout-key">
        <div className="callout-title">🔑 The ten things to remember if you remember nothing else</div>
        <ol>
          <li>
            <strong>Traversal decides everything.</strong> Need child information? Postorder. Need to act on the way
            down? Preorder. Need level structure? BFS.
          </li>
          <li>
            <strong>Return one value, record another.</strong> Diameter (3.3), maximum path sum (3.4), balance (3.2)
            and largest BST (9.4) all use this. An <code>int[1]</code> is Java&apos;s cheapest output parameter.
          </li>
          <li>
            <strong><code>queue.size()</code> at the top of the loop</strong> is the level boundary. Nearly every
            BFS problem in Part 4 depends on it.
          </li>
          <li>
            <strong>Horizontal distance</strong> (<code>hd − 1</code> left, <code>hd + 1</code> right) converts
            three separate view problems into one.
          </li>
          <li>
            <strong>A parent map turns a tree into a graph.</strong> The moment you need to travel upward, build it
            — and bring a visited set.
          </li>
          <li>
            <strong>In a BST, inorder is sorted.</strong> Sections 8.1, 8.2, 8.5, 9.1, 9.2 and 9.3 are all this one
            sentence wearing different clothes.
          </li>
          <li>
            <strong>In a BST you descend one side, never both</strong> — which is what turns 5.2&apos;s{' '}
            <code>O(n)</code> LCA into 8.3&apos;s <code>O(h)</code>. And always quote <code>O(h)</code>{' '}
            <em>first</em>: &quot;<code>O(log n)</code> if balanced, <code>O(n)</code> on a skewed tree&quot;.
            Saying <code>O(log n)</code> unconditionally is the most common complexity mistake in BST interviews.
          </li>
          <li>
            <strong>The BST property is about all descendants, not children.</strong> Check against <em>ranges</em>{' '}
            (8.2) or subtree <em>extremes</em> (9.4) — never against the immediate child&apos;s value.
          </li>
          <li>
            <strong>A tree&apos;s null pointers are free memory.</strong> Threading them gives you Morris traversal
            (6.5, 6.6) and in-place flattening (6.7) — the only route to genuine <code>O(1)</code> space.
          </li>
          <li>
            <strong>Two traversals determine a tree; one traversal plus null markers also does.</strong> 6.2 and 6.3
            take the first route, 6.4 the second, and 8.4 gets the second array for free because a BST&apos;s
            ordering already implies its inorder.
          </li>
        </ol>
      </div>
    </>
  );
}
