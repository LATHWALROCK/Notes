import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

export default function BinaryTree() {
  return (
    <>
      {/* 1.1 */}
      <div id="s1-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        Vocabulary, shapes, memory layout and the four ways of walking a tree. Everything in Parts 2–5 is a
        variation on the ideas here.
      </p>
      <div className="card">
        <p>
          A <strong>binary tree</strong> is a hierarchical data structure in which every node stores a value and
          holds at most <strong>two</strong> references to child nodes, conventionally called <code>left</code> and{' '}
          <code>right</code>. &quot;At most two&quot; is the entire definition — a node may have zero, one, or two
          children, and the left/right distinction is meaningful (swapping them gives a different tree).
        </p>
        <p>
          Formally it is a connected acyclic graph with <code>n</code> nodes and exactly <code>n - 1</code> edges,
          with one distinguished node called the <strong>root</strong>. Because there are no cycles, there is
          exactly <strong>one</strong> path between any two nodes — this single-path property is what makes so many
          tree problems solvable with plain recursion and no <code>visited</code> set.
        </p>
      </div>

      <div className="subsection-header"><h3>Terminology You Must Be Fluent In</h3></div>
      <pre className="diagram">{
`                          (1)   <-- root, level 0, depth 0
                         /   \\
                       (2)   (3)      <-- level 1, siblings of each other
                      /   \\      \\
                    (4)   (5)    (6)  <-- level 2
                   /
                 (7)                  <-- level 3, a leaf

   node 2  is the PARENT of 4 and 5, and a CHILD of 1
   node 1  is an ANCESTOR of every other node
   node 7  is a DESCENDANT of 4, 2 and 1
   {2,4,5,7} is the left SUBTREE of node 1
   leaves  = {7, 5, 6}          (nodes with no children)
   internal nodes = {1, 2, 3, 4}
   height(tree) = 3  (longest root-to-leaf edge count)
   size(tree)   = 7  (number of nodes)`
      }</pre>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Term</th><th>Definition</th><th>In the diagram</th></tr></thead>
          <tbody>
            <tr>
              <td><span className="pill">Root</span></td>
              <td>The single node with no parent; the entry point to the whole structure.</td>
              <td><code>1</code></td>
            </tr>
            <tr>
              <td><span className="pill">Leaf</span></td>
              <td>A node with <code>left == null &amp;&amp; right == null</code>. Also called an external node.</td>
              <td><code>7, 5, 6</code></td>
            </tr>
            <tr>
              <td><span className="pill">Edge</span></td>
              <td>A parent → child link. A tree with <code>n</code> nodes has exactly <code>n - 1</code> edges.</td>
              <td>6 edges</td>
            </tr>
            <tr>
              <td><span className="pill">Depth of a node</span></td>
              <td>Number of edges from the <em>root down to that node</em>. Root has depth 0.</td>
              <td><code>depth(5) = 2</code></td>
            </tr>
            <tr>
              <td><span className="pill">Height of a node</span></td>
              <td>Number of edges on the longest path from that node <em>down to a leaf</em>. Leaves have height 0.</td>
              <td><code>height(2) = 2</code></td>
            </tr>
            <tr>
              <td><span className="pill">Level</span></td>
              <td>All nodes at the same depth. Level <code>i</code> holds at most <code>2<sup>i</sup></code> nodes.</td>
              <td>level 2 = <code>{'{4,5,6}'}</code></td>
            </tr>
            <tr>
              <td><span className="pill">Degree</span></td>
              <td>Number of children of a node — in a binary tree always 0, 1 or 2.</td>
              <td><code>degree(3) = 1</code></td>
            </tr>
            <tr>
              <td><span className="pill">Subtree</span></td>
              <td>
                Any node together with all of its descendants. Every subtree is itself a valid binary tree — this is
                why recursion works.
              </td>
              <td>subtree at <code>2</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Height vs Depth vs &quot;Number of Nodes&quot;</div>
        Interviewers and judges disagree about whether height is counted in <strong>edges</strong> or{' '}
        <strong>nodes</strong>. LeetCode&apos;s <em>Maximum Depth of Binary Tree</em> asks for the{' '}
        <strong>node count</strong> on the longest root-to-leaf path, so a single-node tree answers <code>1</code>.
        The academic definition counts edges, so the same tree has height <code>0</code>. Your notes say{' '}
        <em>&quot;Balanced Binary Tree → height of tree at max log(n)&quot;</em>, which is the edge-based definition.
        Whenever you write <code>maxDepth</code>, decide which one you are returning and stay consistent — nearly
        every off-by-one in tree code comes from mixing them.
      </div>

      <div className="subsection-header"><h3>Why Trees Matter</h3></div>
      <div className="card">
        <ul>
          <li>
            <strong>Hierarchy is natural</strong> — file systems, DOM, org charts, JSON, expression parsing,
            decision trees.
          </li>
          <li>
            <strong>Logarithmic operations</strong> — a <em>balanced</em> tree of <code>n</code> nodes has height{' '}
            <code>log₂(n)</code>, so search / insert / delete touch only <code>~log n</code> nodes. This is the
            basis of <code>TreeMap</code>, database B-trees and priority queues.
          </li>
          <li>
            <strong>Recursion-friendly</strong> — a tree is defined in terms of smaller trees, so almost every
            problem reduces to: <em>solve left, solve right, combine</em>.
          </li>
        </ul>
      </div>

      <div className="callout callout-key">
        <div className="callout-title">🔑 The Master Template</div>
        Roughly 80% of the problems in these notes are the same three lines with a different &quot;combine&quot;
        step:
        <Code>{
`Result solve(TreeNode node) {
    if (node == null) return BASE_CASE;      // 1. stop condition
    Result left  = solve(node.left);         // 2. trust the recursion
    Result right = solve(node.right);
    return combine(node, left, right);       // 3. do YOUR node's work
}`
        }</Code>
        Pick the base case, pick what <code>Result</code> means, pick how to combine. The rest is bookkeeping.
      </div>

      {/* 1.2 */}
      <div id="s1-2" data-topic-boundary="true" />
      <div className="card">
        <p>
          These five shapes come straight from your notes. They matter because each one guarantees something about
          height, node count, or array packing — and those guarantees are exactly what a problem exploits.
        </p>
      </div>

      <div className="subsection-header"><h3>1. Full Binary Tree — &quot;2 or 0 children&quot;</h3></div>
      <div className="card">
        <p>
          Every node has <strong>either two children or none</strong>. No node is allowed a single child. Also
          called a <em>proper</em> or <em>strict</em> binary tree.
        </p>
        <pre className="diagram">{
`        FULL  ✓                    NOT FULL  ✗
          (1)                            (1)
         /   \\                          /   \\
       (2)   (3)                      (2)   (3)
      /   \\                                /
    (4)   (5)                            (4)      <-- node 3 has exactly one child`
        }</pre>
        <ul>
          <li>
            If it has <code>L</code> leaves it has exactly <code>L - 1</code> internal nodes, so the total node
            count <code>n = 2L - 1</code> is always <strong>odd</strong>.
          </li>
          <li>Number of leaves = number of internal nodes + 1.</li>
          <li>Used by expression trees (every operator takes exactly two operands) and Huffman coding trees.</li>
        </ul>
      </div>

      <div className="subsection-header"><h3>2. Complete Binary Tree</h3></div>
      <div className="card">
        <p>
          Your note: <em>&quot;All levels are completely full except the last level and on last level all nodes are
          on left side.&quot;</em> That is exactly right — the tree is filled level by level, left to right, with no
          gaps.
        </p>
        <pre className="diagram">{
`        COMPLETE  ✓                 NOT COMPLETE  ✗
          (1)                            (1)
         /   \\                          /   \\
       (2)   (3)                      (2)   (3)
      /  \\   /                       /  \\      \\
    (4) (5)(6)                     (4) (5)     (7)   <-- gap before 7 on the last level`
        }</pre>
        <ul>
          <li>
            Height is always <code>⌊log₂ n⌋</code> — a complete tree is the tightest possible packing of{' '}
            <code>n</code> nodes.
          </li>
          <li>
            <strong>Array-friendly:</strong> store it in <code>arr[0..n-1]</code> with no wasted slots — children of{' '}
            <code>i</code> sit at <code>2i+1</code> and <code>2i+2</code>. This is precisely how{' '}
            <code>PriorityQueue</code> (a binary heap) is implemented in Java.
          </li>
          <li>
            Number of leaves = <code>⌈n/2⌉</code>; number of internal nodes = <code>⌊n/2⌋</code>.
          </li>
        </ul>
      </div>

      <div className="subsection-header"><h3>3. Perfect Binary Tree</h3></div>
      <div className="card">
        <p>
          Your note: <em>&quot;All leaf nodes are at same level.&quot;</em> Equivalently, every internal node has two
          children <strong>and</strong> every level is completely filled.
        </p>
        <pre className="diagram">{
`        PERFECT of height 2  ✓
              (1)             level 0 -> 2^0 = 1 node
             /   \\
           (2)   (3)          level 1 -> 2^1 = 2 nodes
          /  \\   /  \\
        (4) (5)(6) (7)        level 2 -> 2^2 = 4 nodes   ... all leaves at level 2`
        }</pre>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Quantity</th><th>Formula</th><th>Height 2 example</th></tr></thead>
            <tbody>
              <tr><td>Nodes at level <code>i</code></td><td><code>2<sup>i</sup></code></td><td>1, 2, 4</td></tr>
              <tr><td>Total nodes for height <code>h</code></td><td><code>2<sup>h+1</sup> - 1</code></td><td><code>2³ - 1 = 7</code></td></tr>
              <tr><td>Leaf nodes</td><td><code>2<sup>h</sup></code></td><td>4</td></tr>
              <tr><td>Internal nodes</td><td><code>2<sup>h</sup> - 1</code></td><td>3</td></tr>
              <tr><td>Height from node count</td><td><code>h = log₂(n + 1) - 1</code></td><td><code>log₂8 - 1 = 2</code></td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Containment:</strong> every perfect tree is complete, and every perfect tree is full. The converse
          fails in both directions.
        </p>
      </div>

      <div className="subsection-header"><h3>4. Balanced Binary Tree</h3></div>
      <div className="card">
        <p>
          Your note: <em>&quot;Height of tree at max log(n).&quot;</em> That is the <strong>global</strong>{' '}
          definition (height-balanced in the asymptotic sense). The <strong>local</strong> definition — the one every
          interview problem actually tests — is:
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Local definition (LeetCode 110)</div>
          For <strong>every</strong> node, <code>|height(left) - height(right)| ≤ 1</code>.
        </div>
        <p>
          The two are linked: if the local condition holds at every node, the height is provably{' '}
          <code>O(log n)</code>, which is what keeps AVL trees and <code>TreeMap</code> fast. Checking the local
          condition is section 3.2.
        </p>
        <pre className="diagram">{
`        BALANCED  ✓                  NOT BALANCED  ✗
          (1)                             (1)
         /   \\                           /   \\
       (2)   (3)                       (2)   (3)
      /                                /
    (4)                              (4)
                                     /
   |h(L)-h(R)| at node 1           (5)      at node 1: h(L)=2, h(R)=0 -> diff 2
   = |1 - 0| = 1  -> OK`
        }</pre>
      </div>

      <div className="subsection-header"><h3>5. Degenerate (Skewed) Tree</h3></div>
      <div className="card">
        <p>
          Your note: <em>&quot;Every node has a single child.&quot;</em> The tree collapses into a linked list, so
          height becomes <code>n - 1</code> instead of <code>log n</code>. This is the <strong>worst case</strong>{' '}
          you must always quote in complexity analysis.
        </p>
        <pre className="diagram">{
`    LEFT-SKEWED        RIGHT-SKEWED       ZIG-ZAG SKEWED
       (1)                (1)                 (1)
       /                    \\                   \\
     (2)                    (2)                 (2)
     /                        \\                 /
   (3)                        (3)             (3)
   /                            \\               \\
 (4)                            (4)             (4)

 All three: n nodes, height n-1, O(n) search, O(n) recursion stack.`
        }</pre>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Why this matters for your code</div>
          Every recursive solution in these notes uses <code>O(h)</code> stack space. On a balanced tree that is{' '}
          <code>O(log n)</code> and harmless; on a degenerate tree it is <code>O(n)</code> and a chain of ~10⁵ nodes
          will throw <code>StackOverflowError</code>. That is the honest reason to know the iterative traversals in
          Part 2.
        </div>
      </div>

      <div className="subsection-header"><h3>Quick Comparison</h3></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Type</th><th>Rule</th><th>Height</th><th>Implies</th></tr></thead>
          <tbody>
            <tr>
              <td><span className="pill">Full</span></td>
              <td>Degree of every node is 0 or 2</td>
              <td><code>log n</code> … <code>n/2</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><span className="pill">Complete</span></td>
              <td>Filled level-by-level, last level left-packed</td>
              <td><code>⌊log₂ n⌋</code></td>
              <td>Balanced</td>
            </tr>
            <tr>
              <td><span className="pill">Perfect</span></td>
              <td>All levels full, all leaves same level</td>
              <td><code>log₂(n+1) - 1</code></td>
              <td>Full + Complete + Balanced</td>
            </tr>
            <tr>
              <td><span className="pill">Balanced</span></td>
              <td><code>|h(L) - h(R)| ≤ 1</code> everywhere</td>
              <td><code>O(log n)</code></td>
              <td>—</td>
            </tr>
            <tr>
              <td><span className="pill pill-danger">Degenerate</span></td>
              <td>Every node has exactly one child</td>
              <td><code>n - 1</code></td>
              <td>Behaves like a linked list</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 1.3 */}
      <div id="s1-3" data-topic-boundary="true" />
      <div className="subsection-header"><h3>Linked Representation — the default</h3></div>
      <div className="card">
        <p>
          Every problem in these notes assumes this node class, and <strong>every</strong> solution in this document
          is written against it — <code>TreeNode</code> with an <code>int val</code> — so that the code reads the
          same way from 1.1 to 9.5.
        </p>
        <p>
          Be aware that the judges disagree. LeetCode uses this exact class; GeeksforGeeks hands you{' '}
          <code>Node</code> with a field <code>data</code>; Coding Ninjas hands you a generic{' '}
          <code>BinaryTreeNode&lt;Integer&gt;</code> or <code>TreeNode&lt;Integer&gt;</code>, also with{' '}
          <code>data</code>. The logic is identical — only the identifiers change — so read the signature the judge
          gives you before you start typing, and rename mechanically.
        </p>
        <p>
          One trap comes free with the generic versions: their <code>data</code> is a boxed <code>Integer</code>, so{' '}
          <code>node.data == key</code> is a <strong>reference</strong> comparison whenever both sides are boxed,
          and silently fails outside the cached −128…127 range. With a plain <code>int val</code> the hazard cannot
          arise.
        </p>
        <Code>{
`class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
        this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val   = val;
        this.left  = left;
        this.right = right;
    }
}`
        }</Code>
        <p>
          Building the sample tree by hand, which is how you should dry-run every solution in this document:
        </p>
        <Code>{
`public static void main(String[] args) {
    //          1
    //        /   \\
    //       2     3
    //      / \\     \\
    //     4   5     6
    TreeNode root = new TreeNode(1);
    root.left  = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left  = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
}`
        }</Code>
      </div>

      <div className="subsection-header"><h3>Array Representation — for complete trees only</h3></div>
      <div className="card">
        <p>
          A complete binary tree can live in a flat array with zero pointer overhead. With <strong>0-based</strong>{' '}
          indexing:
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Relationship</th><th>0-based formula</th><th>1-based formula</th></tr></thead>
            <tbody>
              <tr><td>Left child of <code>i</code></td><td><code>2i + 1</code></td><td><code>2i</code></td></tr>
              <tr><td>Right child of <code>i</code></td><td><code>2i + 2</code></td><td><code>2i + 1</code></td></tr>
              <tr><td>Parent of <code>i</code></td><td><code>(i - 1) / 2</code></td><td><code>i / 2</code></td></tr>
            </tbody>
          </table>
        </div>
        <pre className="diagram">{
`   index :  0    1    2    3    4    5
   value : [1]  [2]  [3]  [4]  [5]  [6]

   i=0 (value 1) -> children at 1 and 2  -> values 2 and 3   ✓
   i=1 (value 2) -> children at 3 and 4  -> values 4 and 5   ✓
   i=4 (value 5) -> parent at (4-1)/2=1  -> value 2          ✓`
        }</pre>
        <div className="callout callout-note">
          <div className="callout-title">📌 Note</div>
          For a <strong>skewed</strong> tree this layout is catastrophic: a right-skewed chain of 30 nodes needs an
          array of ~2³⁰ slots. Use arrays only when the tree is guaranteed complete — heaps and segment trees. Note
          also that the <code>2i+1 / 2i+2</code> indexing trick reappears in <strong>5.3 Maximum Width</strong>,
          where it is used as a <em>virtual</em> index rather than real storage.
        </div>
      </div>

      {/* 1.4 */}
      <div id="s1-4" data-topic-boundary="true" />
      <div className="card">
        <p>
          Your notes list four traversals. Three are <strong>depth-first (DFS)</strong> and differ only in{' '}
          <em>when the root is processed</em> relative to its subtrees; the fourth is{' '}
          <strong>breadth-first (BFS)</strong>.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Traversal</th><th>Order (from your notes)</th><th>Root is visited</th>
                <th>Data structure</th><th>Classic use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="pill">Inorder</span></td>
                <td>Left → Root → Right</td>
                <td>in the middle</td>
                <td>Stack</td>
                <td>Yields a <strong>sorted</strong> sequence for a BST</td>
              </tr>
              <tr>
                <td><span className="pill">Preorder</span></td>
                <td>Root → Left → Right</td>
                <td>first</td>
                <td>Stack</td>
                <td>Copying / serialising a tree, root-to-leaf paths</td>
              </tr>
              <tr>
                <td><span className="pill">Postorder</span></td>
                <td>Left → Right → Root</td>
                <td>last</td>
                <td>Stack (or two)</td>
                <td>Deleting a tree, bottom-up aggregation (height, diameter)</td>
              </tr>
              <tr>
                <td><span className="pill">Level order</span></td>
                <td>Level by level, left to right</td>
                <td>first (level 0)</td>
                <td>Queue</td>
                <td>Shortest path in edges, views, width</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
            /  \\      \\
          (4)  (5)    (6)

   Inorder    (L Root R) :  4  2  5  1  3  6
   Preorder   (Root L R) :  1  2  4  5  3  6
   Postorder  (L R Root) :  4  5  2  6  3  1
   Level order           :  1  2  3  4  5  6`
        }</pre>
        <div className="callout callout-tip">
          <div className="callout-title">💡 How to produce these by hand in 5 seconds</div>
          Walk the tree&apos;s outline counter-clockwise starting at the root, keeping your pen on the left side of
          every node. Write a node down <strong>the first time</strong> you pass it → preorder. Write it when you
          pass <strong>underneath</strong> it → inorder. Write it the <strong>last</strong> time you pass it (on its
          right) → postorder. All three orders come out of one lap — which is exactly the mechanical idea behind{' '}
          <strong>2.6 All Three in One Go</strong>.
        </div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Recursion is a hidden stack</div>
          DFS is &quot;stack-shaped&quot; and BFS is &quot;queue-shaped&quot;. Recursion gives you the stack for
          free, which is why the recursive DFS traversals are 3 lines while the BFS one is never recursive — you
          must supply the queue yourself.
        </div>
      </div>

      {/* 2.1 */}
      <div id="s2-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        The four traversals from your notes, first recursively, then iteratively. Master these and every later
        problem is a small edit to one of them.
      </p>
      <div className="card">
        <p>
          All three are the same function with <strong>one line moved</strong>. The recursion visits every node
          exactly twice (once going down, once coming back), so the traversal order is decided purely by where you
          put the <code>list.add(...)</code>.
        </p>
      </div>

      <div className="subsection-header"><h3>The three functions side by side</h3></div>
      <Code>{
`class Solution {

    // ── Inorder: Left → Root → Right ──
    private void inorder(TreeNode node, List<Integer> out) {
        if (node == null) return;          // base case
        inorder(node.left, out);           // 1. all of the left subtree
        out.add(node.val);                 // 2. THEN me
        inorder(node.right, out);          // 3. THEN all of the right subtree
    }

    // ── Preorder: Root → Left → Right ──
    private void preorder(TreeNode node, List<Integer> out) {
        if (node == null) return;
        out.add(node.val);                 // me FIRST
        preorder(node.left, out);
        preorder(node.right, out);
    }

    // ── Postorder: Left → Right → Root ──
    private void postorder(TreeNode node, List<Integer> out) {
        if (node == null) return;
        postorder(node.left, out);
        postorder(node.right, out);
        out.add(node.val);                 // me LAST
    }
}`
      }</Code>

      <div className="callout callout-key">
        <div className="callout-title">🔑 Line them up and the pattern is obvious</div>
        All three bodies contain the <em>same four statements</em>. Only the position of{' '}
        <code>out.add(node.val)</code> moves — first, middle, or last — and that single choice is the entire
        difference between the three traversals.
        <pre className="diagram">{
` inorder            preorder           postorder
 ---------------    ---------------    ---------------
 if null: return    if null: return    if null: return
 recurse LEFT       ADD me             recurse LEFT
 ADD me             recurse LEFT       recurse RIGHT
 recurse RIGHT      recurse RIGHT      ADD me`
        }</pre>
      </div>

      <div className="subsection-header"><h3>The wrapper you actually submit</h3></div>
      <div className="card">
        <p>
          The three helpers return <code>void</code> and thread the output list through as a parameter, but a judge
          hands you only the root and expects a <code>List</code> back. So each one needs the same three-line public
          wrapper to create the list, kick off the recursion, and return it. It is <strong>identical</strong> in all
          three cases — only the helper name changes:
        </p>
      </div>
      <Code>{
`public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> out = new ArrayList<>();
    inorder(root, out);            // <- swap for preorder(root, out) or postorder(root, out)
    return out;
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Why not just return the list from the recursion?</div>
        You can — <code>return concat(inorder(left), node.val, inorder(right))</code> reads nicely — but it
        allocates a fresh list at every node and copies its contents upward, turning an <code>O(n)</code> traversal
        into <code>O(n²)</code> time and <code>O(n)</code> extra garbage. Passing one shared accumulator down is the
        standard idiom precisely because it allocates exactly once. The same reasoning drives the{' '}
        <code>int[1]</code> box in Part 3 and the shared cursor in 8.4.
      </div>

      <div className="subsection-header"><h3>Dry run — inorder on the sample tree</h3></div>
      <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
            /  \\      \\
          (4)  (5)    (6)

 call inorder(1)
   call inorder(2)
     call inorder(4)
       call inorder(null) -> return
       ADD 4
       call inorder(null) -> return
     ADD 2
     call inorder(5)
       ADD 5
   ADD 1
   call inorder(3)
     call inorder(null) -> return          (3 has no left child)
     ADD 3
     call inorder(6)
       ADD 6

 output = [4, 2, 5, 1, 3, 6]`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">Every node is entered exactly once.</CxBox>
        <CxBox label="Space" value="O(h)">
          Recursion stack. <code>O(log n)</code> balanced, <code>O(n)</code> skewed. Plus <code>O(n)</code> for the
          output list.
        </CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The one property worth memorising</div>
        <strong>Inorder traversal of a Binary Search Tree is sorted ascending.</strong> This single fact solves
        &quot;validate BST&quot;, &quot;kth smallest element&quot;, &quot;BST to sorted list&quot; and &quot;recover
        swapped nodes in a BST&quot; — all of them are just an inorder walk with a comparison against the previous
        value.
      </div>

      {/* 2.2 */}
      <div id="s2-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 102</span>
        <span className="pill pill-success">Easy–Medium</span>
        <span className="pill">Queue</span>
        <span className="pill">Foundation for Parts 4 &amp; 5</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return the node values level by level, left to right, as a list of lists — one
          inner list per level.
        </p>
        <p>
          <strong>Why a queue.</strong> A queue is FIFO, so nodes come out in the order they were discovered. Since
          we discover a node&apos;s children immediately after visiting it, everything at depth <code>d</code> is
          enqueued before anything at depth <code>d+1</code>. That is BFS.
        </p>
        <p>
          <strong>The key trick.</strong> A naive queue loop gives one flat list and loses the level boundaries. To
          recover them, snapshot <code>queue.size()</code> at the top of each outer iteration: at that moment the
          queue contains <em>exactly</em> the nodes of the current level and nothing else. Loop that many times and
          you have processed precisely one level.
        </p>
        <ol className="steps">
          <li>Handle the empty tree, then <code>offer</code> the root.</li>
          <li>While the queue is non-empty, record <code>levelNum = queue.size()</code>.</li>
          <li>
            Repeat <code>levelNum</code> times: pop a node, enqueue its non-null children, add its value to the
            current level&apos;s list.
          </li>
          <li>Append the level list to the answer and go round again.</li>
        </ol>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        List<List<Integer>> wrapList = new LinkedList<List<Integer>>();

        if (root == null) return wrapList;

        queue.offer(root);
        while (!queue.isEmpty()) {
            int levelNum = queue.size();                 // size of THIS level, frozen
            List<Integer> subList = new LinkedList<Integer>();
            for (int i = 0; i < levelNum; i++) {
                if (queue.peek().left  != null) queue.offer(queue.peek().left);
                if (queue.peek().right != null) queue.offer(queue.peek().right);
                subList.add(queue.poll().val);           // poll happens last
            }
            wrapList.add(subList);
        }
        return wrapList;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Read the peek/poll order carefully</div>
        This version <code>peek()</code>s three times to push the children and only then <code>poll()</code>s. That
        works, but it is fragile — if you ever reorder those lines so the <code>poll()</code> comes first, the two{' '}
        <code>peek()</code> calls silently start looking at the <em>next</em> node. The safer habit is to pull the
        node out once into a local variable:
        <Code>{
`for (int i = 0; i < levelNum; i++) {
    TreeNode node = queue.poll();      // take it out ONCE
    subList.add(node.val);
    if (node.left  != null) queue.offer(node.left);
    if (node.right != null) queue.offer(node.right);
}`
        }</Code>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
            /  \\      \\
          (4)  (5)    (6)

 queue=[1]        levelNum=1  -> pop 1, push 2,3        subList=[1]
 queue=[2,3]      levelNum=2  -> pop 2, push 4,5
                              -> pop 3, push 6          subList=[2,3]
 queue=[4,5,6]    levelNum=3  -> pop 4 (no children)
                              -> pop 5
                              -> pop 6                  subList=[4,5,6]
 queue=[]         loop ends

 result = [[1], [2,3], [4,5,6]]`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">Each node is enqueued and dequeued exactly once.</CxBox>
        <CxBox label="Space" value="O(w)">
          <code>w</code> = maximum width of the tree. Worst case (perfect tree, last level) <code>w ≈ n/2</code>, so{' '}
          <code>O(n)</code>.
        </CxBox>
      </Cx>

      <div className="callout callout-key">
        <div className="callout-title">🔑 This template is reused constantly</div>
        Zig-zag traversal (4.1), maximum width (5.3), top and bottom view (4.4, 4.5), nodes at distance K (5.5) and
        burn-the-tree (5.6) are all this loop plus one extra piece of state. Learn it once.
        <br />
        Also note <code>Queue&lt;TreeNode&gt; q = new LinkedList&lt;&gt;()</code> is the classic Java idiom.{' '}
        <code>ArrayDeque</code> is faster, but it <strong>rejects null</strong> elements — harmless here since we
        never enqueue nulls, but it will bite you if you ever use a <code>null</code> sentinel to mark level ends.
      </div>

      {/* 2.3 */}
      <div id="s2-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 94</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Explicit stack</span>
      </div>
      <div className="card">
        <p>
          <strong>Why bother?</strong> Two reasons: recursion dies with <code>StackOverflowError</code> on a
          degenerate tree, and an explicit stack lets you <em>pause</em> mid-traversal — which is how a{' '}
          <code>BSTIterator</code> is built.
        </p>
        <p>
          <strong>Intuition.</strong> Inorder means &quot;left, me, right&quot;. So from any node, first dive as far
          left as possible, pushing everything you pass onto the stack — those are the nodes whose left subtrees you
          still owe. When you hit <code>null</code>, the top of the stack is the deepest unvisited left-most node:
          pop it, print it (its left subtree is finished by construction), then pivot to its right child and repeat
          the same dive.
        </p>
        <ol className="steps">
          <li><code>node = root</code>, empty stack.</li>
          <li>
            If <code>node != null</code>: push it, move <code>node = node.left</code>. (Going down-left, deferring
            work.)
          </li>
          <li>
            If <code>node == null</code>: if the stack is empty we are completely done → <code>break</code>.
            Otherwise pop, add the popped value to the output, and set <code>node = popped.right</code>.
          </li>
          <li>Repeat forever — the <code>break</code> is the only exit.</li>
        </ol>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> inorder = new ArrayList<Integer>();
        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode node = root;

        while (true) {
            if (node != null) {
                stack.push(node);          // owe this node a visit
                node = node.left;          // dive left
            } else {
                if (stack.isEmpty()) {
                    break;                 // nothing left to owe -> finished
                }
                node = stack.pop();        // deepest unvisited node
                inorder.add(node.val);     // ROOT step
                node = node.right;         // now handle its right subtree
            }
        }
        return inorder;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
            /  \\      \\
          (4)  (5)    (6)

 node=1  push 1              stack=[1]        node=2
 node=2  push 2              stack=[1,2]      node=4
 node=4  push 4              stack=[1,2,4]    node=null
 node=null  pop 4  ADD 4     stack=[1,2]      node=4.right=null
 node=null  pop 2  ADD 2     stack=[1]        node=5
 node=5  push 5              stack=[1,5]      node=null
 node=null  pop 5  ADD 5     stack=[1]        node=null
 node=null  pop 1  ADD 1     stack=[]         node=3
 node=3  push 3              stack=[3]        node=null
 node=null  pop 3  ADD 3     stack=[]         node=6
 node=6  push 6              stack=[6]        node=null
 node=null  pop 6  ADD 6     stack=[]         node=null
 node=null  stack empty -> BREAK

 output = [4, 2, 5, 1, 3, 6]     ✓ matches the recursive version`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">Each node is pushed once and popped once.</CxBox>
        <CxBox label="Space" value="O(h)">The stack holds at most one full root-to-leaf chain.</CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 Prefer Deque over Stack in modern Java</div>
        <code>java.util.Stack</code> extends <code>Vector</code>, so every method is <code>synchronized</code> —
        needless locking. The modern idiom is{' '}
        <code>Deque&lt;TreeNode&gt; stack = new ArrayDeque&lt;&gt;()</code> with <code>push / pop / peek</code>.
        Behaviour is the same, minus the lock. Your notes use <code>Stack</code>, which is perfectly fine on a
        judge; just know why a reviewer would flag it.
      </div>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Bonus — O(1) space with Morris traversal</div>
        Morris traversal reaches <code>O(1)</code> extra space by temporarily rewiring the rightmost node of each
        left subtree to point back at its inorder successor (a &quot;thread&quot;), walking through it, then undoing
        the link. Time stays <code>O(n)</code>. It is the answer to &quot;can you do it without a stack{' '}
        <em>and</em> without recursion?&quot; — worth knowing it exists even if you never write it.
      </div>

      {/* 2.4 */}
      <div id="s2-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 144</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Simplest of the three</span>
      </div>
      <div className="card">
        <p>
          <strong>Intuition.</strong> Preorder is &quot;me, left, right&quot; — the root is processed the instant we
          see it, so nothing needs deferring. Push the root; then repeatedly pop a node, record it, and push its
          children. The only subtlety is the <strong>push order</strong>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Push right BEFORE left</div>
          A stack is LIFO. To <em>pop</em> left first, you must <em>push</em> it last. Pushing left first would give
          you Root → Right → Left, which is the mirror image (and, incidentally, exactly what you want for a
          right-side view).
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> preorder = new ArrayList<Integer>();
        if (root == null) return preorder;

        Stack<TreeNode> st = new Stack<TreeNode>();
        st.push(root);

        while (!st.isEmpty()) {
            root = st.pop();
            preorder.add(root.val);        // ROOT first

            if (root.right != null) {      // RIGHT pushed first ...
                st.push(root.right);
            }
            if (root.left != null) {       // ... so LEFT pops first
                st.push(root.left);
            }
        }
        return preorder;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
            /  \\      \\
          (4)  (5)    (6)

 stack=[1]        pop 1  ADD 1   push 3, push 2
 stack=[3,2]      pop 2  ADD 2   push 5, push 4
 stack=[3,5,4]    pop 4  ADD 4   (no children)
 stack=[3,5]      pop 5  ADD 5
 stack=[3]        pop 3  ADD 3   push 6   (no left child)
 stack=[6]        pop 6  ADD 6
 stack=[]         done

 output = [1, 2, 4, 5, 3, 6]`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">One push and one pop per node.</CxBox>
        <CxBox label="Space" value="O(h)">Stack depth is bounded by the height; worst case <code>O(n)</code>.</CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 The parameter is being mutated</div>
        The loop reassigns the method parameter <code>root</code> as a cursor. Java passes references by value so
        the caller&apos;s variable is untouched, but reusing <code>root</code> as scratch space makes the code
        harder to read and impossible to reference later. Prefer a local <code>TreeNode node = st.pop();</code>.
      </div>

      {/* 2.5 */}
      <div id="s2-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 145</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Two stacks / one stack</span>
      </div>
      <div className="card">
        <p>
          Postorder is the hardest to do iteratively, because the root must wait until <em>both</em> subtrees are
          finished — a popped node cannot simply be recorded. There are two standard escapes.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation — Two stacks (the reversal trick)</h3></div>
      <div className="card">
        <p>
          Postorder is <code>L R Root</code>. Reverse it and you get <code>Root R L</code> — which is just{' '}
          <strong>preorder with the children swapped</strong>. So:
        </p>
        <ol className="steps">
          <li>
            Run the iterative preorder from 2.4 but push <strong>left first, then right</strong>, producing{' '}
            <code>Root → Right → Left</code>.
          </li>
          <li>
            Instead of writing to the answer, push each popped node onto a second stack <code>st2</code>.
          </li>
          <li>
            Drain <code>st2</code>. Because a stack reverses, the output comes out as{' '}
            <code>Left → Right → Root</code>. Done.
          </li>
        </ol>
      </div>
      <Code>{
`class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        Stack<TreeNode> st1 = new Stack<TreeNode>();
        Stack<TreeNode> st2 = new Stack<TreeNode>();
        List<Integer> postOrder = new ArrayList<Integer>();

        if (root == null) return postOrder;

        st1.push(root);
        while (!st1.isEmpty()) {
            root = st1.pop();
            st2.add(root);                                     // collect in Root-Right-Left order
            if (root.left  != null) st1.push(root.left);       // LEFT first this time
            if (root.right != null) st1.push(root.right);
        }
        while (!st2.isEmpty()) {
            postOrder.add(st2.pop().val);                      // reversed -> Left-Right-Root
        }
        return postOrder;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Why <code>st2.add()</code> and not <code>st2.push()</code></div>
        <code>Stack</code> inherits <code>add()</code> from <code>Vector</code>, which appends to the end of the
        underlying list — and for a <code>Stack</code>, &quot;the end&quot; <em>is</em> the top. So{' '}
        <code>add()</code> and <code>push()</code> are equivalent here. Write <code>push()</code> for clarity; this
        only works because <code>Stack</code> is a <code>List</code>, and it would not work with a{' '}
        <code>Deque</code> (where <code>add()</code> appends to the tail while <code>push()</code> prepends to the
        head).
      </div>

      <div className="subsection-header"><h3>Dry run (two stacks)</h3></div>
      <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
            /  \\      \\
          (4)  (5)    (6)

 st1=[1]        pop 1  -> st2=[1]          push 2, push 3
 st1=[2,3]      pop 3  -> st2=[1,3]        push 6      (no left)
 st1=[2,6]      pop 6  -> st2=[1,3,6]
 st1=[2]        pop 2  -> st2=[1,3,6,2]    push 4, push 5
 st1=[4,5]      pop 5  -> st2=[1,3,6,2,5]
 st1=[4]        pop 4  -> st2=[1,3,6,2,5,4]
 st1=[]

 drain st2 (top to bottom): 4, 5, 2, 6, 3, 1
 output = [4, 5, 2, 6, 3, 1]`
      }</pre>

      <div className="subsection-header"><h3>Code Implementation — One stack</h3></div>
      <div className="card">
        <p>
          Halves the auxiliary space by tracking the <em>last node we came back from</em>. If the current
          node&apos;s right child is unvisited, we still owe the right subtree; otherwise both subtrees are done and
          the node can be recorded.
        </p>
      </div>
      <Code>{
`class Solution {
    public List<Integer> postorderTraversalOneStack(TreeNode root) {
        List<Integer> postOrder = new ArrayList<>();
        if (root == null) return postOrder;

        Deque<TreeNode> st = new ArrayDeque<>();
        TreeNode curr = root, lastVisited = null;

        while (curr != null || !st.isEmpty()) {
            while (curr != null) {              // dive as far left as possible
                st.push(curr);
                curr = curr.left;
            }
            TreeNode peek = st.peek();
            if (peek.right != null && peek.right != lastVisited) {
                curr = peek.right;              // right subtree still owed
            } else {
                postOrder.add(peek.val);        // both subtrees finished -> emit
                lastVisited = st.pop();
            }
        }
        return postOrder;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time (both)" value="O(n)">Constant work per node in both approaches.</CxBox>
        <CxBox label="Space" value="O(n) / O(h)">
          Two stacks hold every node at once → <code>O(n)</code>. One stack holds only a root-to-leaf chain →{' '}
          <code>O(h)</code>.
        </CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Interview strategy</div>
        Present the two-stack version first — it is 10 lines and impossible to get wrong. Then say &quot;I can halve
        the space with a single stack and a <code>lastVisited</code> pointer&quot; and write it if asked. You get
        credit for both without risking a bug under pressure.
      </div>

      {/* 2.6 */}
      <div id="s2-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill pill-warn">Medium</span>
        <span className="pill">State machine</span>
        <span className="pill">Single pass</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Produce preorder, inorder <em>and</em> postorder in a single traversal.
        </p>
        <p>
          <strong>Intuition.</strong> Recall the pen trick from 1.4: one counter-clockwise lap of the tree passes
          every node <strong>three times</strong> — on the way in (preorder), from underneath (inorder), and on the
          way out (postorder). So push each node onto the stack together with a <em>visit counter</em>{' '}
          <code>num ∈ {'{1, 2, 3}'}</code>, and let that counter decide what to do:
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th><code>num</code></th><th>Action</th><th>Then</th></tr></thead>
            <tbody>
              <tr>
                <td><span className="pill">1</span></td>
                <td>add to <strong>preorder</strong></td>
                <td>bump to 2, push node back, then push <code>left</code> with <code>num = 1</code></td>
              </tr>
              <tr>
                <td><span className="pill">2</span></td>
                <td>add to <strong>inorder</strong></td>
                <td>bump to 3, push node back, then push <code>right</code> with <code>num = 1</code></td>
              </tr>
              <tr>
                <td><span className="pill">3</span></td>
                <td>add to <strong>postorder</strong></td>
                <td>do <em>not</em> push it back — the node is finished and leaves the stack forever</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Each node is pushed 3 times and popped 3 times, so the work is <code>3n</code> steps — still{' '}
          <code>O(n)</code>, and you have paid one traversal instead of three.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    TreeNode node;
    int num;                                  // 1 = pre, 2 = in, 3 = post

    Pair(TreeNode _node, int _num) {
        num  = _num;
        node = _node;
    }
}

class Solution {
    public void preInPostTraversal(TreeNode root) {
        Stack<Pair> st = new Stack<Pair>();
        List<Integer> pre  = new ArrayList<>();
        List<Integer> in   = new ArrayList<>();
        List<Integer> post = new ArrayList<>();

        if (root == null) return;
        st.push(new Pair(root, 1));

        while (!st.isEmpty()) {
            Pair it = st.pop();

            // this is part of pre
            // increment 1 to 2
            // push the left side of the tree
            if (it.num == 1) {
                pre.add(it.node.val);
                it.num++;
                st.push(it);

                if (it.node.left != null) {
                    st.push(new Pair(it.node.left, 1));
                }
            }

            // this is a part of in
            // increment 2 to 3
            // push right
            else if (it.num == 2) {
                in.add(it.node.val);
                it.num++;
                st.push(it);

                if (it.node.right != null) {
                    st.push(new Pair(it.node.right, 1));
                }
            }

            // don't push it back again
            else {
                post.add(it.node.val);
            }
        }

        System.out.println("Preorder  : " + pre);
        System.out.println("Inorder   : " + in);
        System.out.println("Postorder : " + post);
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Push the node back <em>before</em> pushing the child</div>
        The order of those two <code>push</code> calls is the whole algorithm. The parent must sit{' '}
        <strong>underneath</strong> the child on the stack so that the child&apos;s entire subtree finishes before
        the parent is popped again. Swap the two lines and the traversal silently produces garbage.
        <br /><br />
        Note also that <code>Pair</code> is mutated in place (<code>it.num++</code>) and then re-pushed — the same
        object, not a copy. That is deliberate and cheap; just be aware that <code>Pair</code> must therefore{' '}
        <strong>not</strong> be a record or otherwise immutable, and must not be shared anywhere else.
      </div>

      <div className="subsection-header"><h3>Dry run (first few steps)</h3></div>
      <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
            /  \\      \\
          (4)  (5)    (6)

 stack (top on the right)                       action
 [(1,1)]                                        pop (1,1): PRE=[1], push (1,2), push (2,1)
 [(1,2),(2,1)]                                  pop (2,1): PRE=[1,2], push (2,2), push (4,1)
 [(1,2),(2,2),(4,1)]                            pop (4,1): PRE=[1,2,4], push (4,2)   (no left)
 [(1,2),(2,2),(4,2)]                            pop (4,2): IN=[4], push (4,3)        (no right)
 [(1,2),(2,2),(4,3)]                            pop (4,3): POST=[4]                  node 4 done
 [(1,2),(2,2)]                                  pop (2,2): IN=[4,2], push (2,3), push (5,1)
 ...

 final  PRE  = [1, 2, 4, 5, 3, 6]
        IN   = [4, 2, 5, 1, 3, 6]
        POST = [4, 5, 2, 6, 3, 1]`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(3n) = O(n)">Three stack visits per node instead of one.</CxBox>
        <CxBox label="Space" value="O(h) + O(n)">
          Stack is <code>O(h)</code>; the three output lists are <code>O(n)</code> each.
        </CxBox>
      </Cx>

      {/* 3.1 */}
      <div id="s3-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        Five problems that all share one engine: a <strong>postorder</strong> walk that returns a small value upward
        while quietly updating a global answer on the way.
      </p>
      <div className="callout callout-key">
        <div className="callout-title">🔑 The pattern behind this entire part</div>
        Each of these problems has <em>two</em> quantities: something the parent needs (usually height) and
        something only the current node can compute (the answer <em>through</em> that node). The trick is to{' '}
        <strong>return the first and record the second in a mutable holder</strong>. That is why every solution
        below carries an <code>int[1]</code> array — Java has no output parameters, and <code>int[1]</code> is the
        cheapest way to let a recursive call write back to its caller.
        <Code>{
`int[] best = new int[1];       // a one-slot mutable box; best[0] survives every recursive frame`
        }</Code>
        An instance field <code>private int best;</code> works equally well and reads better, but the{' '}
        <code>int[1]</code> idiom is what you will see in editorial solutions because it keeps the method
        self-contained and thread-safe on LeetCode&apos;s reused <code>Solution</code> object.
      </div>

      <div className="meta-row">
        <span className="pill">LeetCode 104</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Postorder DFS</span>
        <span className="pill">Building block for 3.2 &amp; 3.3</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return the number of nodes along the longest path from the root down to the
          farthest leaf. (LeetCode counts <strong>nodes</strong>, so a single-node tree answers <code>1</code> and
          an empty tree answers <code>0</code>.)
        </p>
        <p>
          <strong>Intuition.</strong> The depth of a tree is one more than the deeper of its two subtrees. That
          sentence <em>is</em> the code. An empty tree contributes 0; the <code>+1</code> accounts for the current
          node itself.
        </p>
        <p>
          This must be a <strong>postorder</strong> traversal: you cannot decide your own height until both children
          have reported theirs, so the work happens on the way back <em>up</em>.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;                  // empty subtree contributes nothing

        int lh = maxDepth(root.left);                // height of left subtree
        int rh = maxDepth(root.right);               // height of right subtree

        return 1 + Math.max(lh, rh);                 // +1 for the current node
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
            /  \\      \\
          (4)  (5)    (6)

 maxDepth(4) -> 1 + max(0,0) = 1
 maxDepth(5) -> 1 + max(0,0) = 1
 maxDepth(2) -> 1 + max(1,1) = 2
 maxDepth(6) -> 1 + max(0,0) = 1
 maxDepth(3) -> 1 + max(0,1) = 2
 maxDepth(1) -> 1 + max(2,2) = 3

 answer = 3   (path 1 -> 2 -> 4 has 3 nodes)`
      }</pre>

      <div className="subsection-header"><h3>Alternative — BFS level counting</h3></div>
      <div className="card">
        <p>
          If recursion depth is a concern (a chain of 10⁵ nodes), count levels with the BFS template from 2.2. Same{' '}
          <code>O(n)</code> time, and the space becomes <code>O(w)</code> instead of <code>O(h)</code> — which is a
          genuine win on a skewed tree, where the width is 1.
        </p>
      </div>
      <Code>{
`public int maxDepthBFS(TreeNode root) {
    if (root == null) return 0;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    int depth = 0;

    while (!q.isEmpty()) {
        int size = q.size();
        depth++;                                    // one more complete level exists
        for (int i = 0; i < size; i++) {
            TreeNode node = q.poll();
            if (node.left  != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
    }
    return depth;
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n)">Every node visited once.</CxBox>
        <CxBox label="Space" value="O(h)">Recursion stack. BFS variant: <code>O(w)</code>.</CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Minimum depth is <em>not</em> symmetric</div>
        The mirror problem (LeetCode 111) is <strong>not</strong> <code>1 + Math.min(lh, rh)</code>. Minimum depth
        must end at a <em>leaf</em>, so for a node with only one child, the null side must be ignored rather than
        treated as depth 0:
        <Code>{
`public int minDepth(TreeNode root) {
    if (root == null) return 0;
    if (root.left  == null) return 1 + minDepth(root.right);   // only right exists
    if (root.right == null) return 1 + minDepth(root.left);    // only left exists
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}`
        }</Code>
      </div>

      {/* 3.2 */}
      <div id="s3-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 110</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Sentinel return value</span>
        <span className="pill">O(n) not O(n log n)</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return <code>true</code> if for <strong>every</strong> node{' '}
          <code>|height(left) - height(right)| ≤ 1</code>.
        </p>
        <p>
          <strong>The naive approach and why it is slow.</strong> The obvious solution recurses over every node and
          calls <code>maxDepth</code> on both children. But <code>maxDepth</code> is itself <code>O(n)</code>, so
          you pay <code>O(n)</code> per node → <code>O(n²)</code> on a skewed tree, <code>O(n log n)</code> on a
          balanced one. Heights get recomputed over and over.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The sentinel trick</div>
          Compute the height <strong>once</strong>, bottom-up, and overload the return value: a real height means
          &quot;this subtree is balanced and here is how tall it is&quot;, while <code>-1</code> means
          &quot;somewhere below me the property is broken&quot;. <code>-1</code> is safe as a sentinel because a
          genuine height can never be negative. Once a <code>-1</code> appears it is propagated straight to the top
          without doing any more work — an early exit.
        </div>
        <ol className="steps">
          <li><code>null</code> subtree → height 0, trivially balanced.</li>
          <li>
            Get <code>leftHeight</code>. If it is <code>-1</code>, bail out immediately with <code>-1</code>.
          </li>
          <li>Get <code>rightHeight</code>. Same early exit.</li>
          <li>
            If <code>|leftHeight - rightHeight| &gt; 1</code>, <em>this</em> node breaks the rule → return{' '}
            <code>-1</code>.
          </li>
          <li>Otherwise report the real height: <code>1 + max(leftHeight, rightHeight)</code>.</li>
          <li>The tree is balanced iff the top-level call did not return <code>-1</code>.</li>
        </ol>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public boolean isBalanced(TreeNode root) {
        return dfsHeight(root) != -1;                       // -1 means "unbalanced somewhere"
    }

    int dfsHeight(TreeNode root) {
        if (root == null) return 0;

        int leftHeight = dfsHeight(root.left);
        if (leftHeight == -1) return -1;                    // short-circuit: stop early
        int rightHeight = dfsHeight(root.right);
        if (rightHeight == -1) return -1;

        if (Math.abs(leftHeight - rightHeight) > 1) return -1;   // THIS node is the offender
        return Math.max(leftHeight, rightHeight) + 1;            // genuine height
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run on an unbalanced tree</h3></div>
      <pre className="diagram">{
`              (1)
             /   \\
           (2)   (3)
           /
         (4)
         /
       (5)

 dfsHeight(5) -> 0,0            -> |0-0|=0  -> 1
 dfsHeight(4) -> L=1, R=0       -> |1-0|=1  -> 2
 dfsHeight(2) -> L=2, R=0       -> |2-0|=2  -> -1     <-- broken here
 dfsHeight(1) -> L=-1           -> return -1 immediately (right subtree never even visited)

 isBalanced -> (-1 != -1) -> false`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Single postorder pass. The naive version is <code>O(n²)</code>.
        </CxBox>
        <CxBox label="Space" value="O(h)">Recursion stack only — no extra structures.</CxBox>
      </Cx>

      {/* 3.3 */}
      <div id="s3-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 543</span>
        <span className="pill pill-success">Easy–Medium</span>
        <span className="pill">Return one thing, record another</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> The diameter is the length of the longest path between <em>any</em> two nodes in
          the tree, measured in <strong>edges</strong>. Crucially, the path <strong>need not pass through the
          root</strong>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The insight</div>
          Any path has a single <strong>highest</strong> node — its topmost point, where the path turns from going up
          to going down. For that node the path length is exactly <code>height(left) + height(right)</code>. So:
          compute that quantity at <em>every</em> node and keep the maximum. Every possible path is considered
          exactly once, because every path has exactly one topmost node.
        </div>
        <p>
          This is the archetype of the pattern in this part: the function <strong>returns height</strong> (what the
          parent needs) but <strong>writes the diameter</strong> into a shared box (what only this node can
          compute).
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`public class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        int[] diameter = new int[1];              // mutable box, survives all frames
        height(root, diameter);
        return diameter[0];
    }

    private int height(TreeNode node, int[] diameter) {
        if (node == null) {
            return 0;
        }
        int lh = height(node.left,  diameter);
        int rh = height(node.right, diameter);

        diameter[0] = Math.max(diameter[0], lh + rh);   // path THROUGH this node, in edges
        return 1 + Math.max(lh, rh);                    // height reported to my parent
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — the answer does not touch the root</h3></div>
      <pre className="diagram">{
`                (1)
               /
             (2)
            /   \\
          (3)   (4)
          /       \\
        (5)       (6)

 height(5) -> 1     diameter stays 0
 height(3) -> 2     lh=1, rh=0  -> diameter = max(0, 1) = 1
 height(6) -> 1
 height(4) -> 2     lh=0, rh=1  -> diameter = max(1, 1) = 1
 height(2) -> 3     lh=2, rh=2  -> diameter = max(1, 4) = 4   <-- 5-3-2-4-6, four edges
 height(1) -> 4     lh=3, rh=0  -> diameter = max(4, 3) = 4

 answer = 4    the winning path never reaches node 1`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One postorder pass; the brute force (height at every node) is <code>O(n²)</code>.
        </CxBox>
        <CxBox label="Space" value="O(h)">Recursion stack.</CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Edges or nodes?</div>
        <code>lh + rh</code> counts <strong>edges</strong>, which is what LeetCode 543 wants. Some judges
        (GeeksforGeeks among them) define diameter as the <strong>number of nodes</strong> on the path — there, use{' '}
        <code>lh + rh + 1</code>. Read the examples in the statement before choosing.
      </div>

      {/* 3.4 */}
      <div id="s3-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 124</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Diameter + negative numbers</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Find the maximum sum of node values along any path (any node to any node, moving
          only through parent-child links, each node used at most once). Values may be{' '}
          <strong>negative</strong>.
        </p>
        <p>
          <strong>Intuition.</strong> Structurally this is the diameter problem with <code>+node.val</code> instead
          of <code>+1</code>. The same &quot;every path has one topmost node&quot; argument applies: at each node
          the candidate answer is <code>leftGain + rightGain + node.val</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The negative-value twist</div>
          A subtree that contributes a negative sum is worse than not extending into it at all — you can always stop
          at the current node. So clamp each child&apos;s contribution at zero:
          <Code>{
`int left  = Math.max(0, maxPathDown(node.left,  maxValue));   // "or just don't go left"
int right = Math.max(0, maxPathDown(node.right, maxValue));`
          }</Code>
          Without this clamp, a tree like <code>[-10, 9, 20]</code> would drag the good branch down with the bad
          one.
        </div>
        <p>
          <strong>The two different quantities.</strong> Keep them straight — this is where people go wrong:
        </p>
        <ul>
          <li>
            <strong>What you return</strong> — the best <em>downward</em> path starting at this node:{' '}
            <code>node.val + max(left, right)</code>. Only one branch, because a path handed to a parent cannot
            fork.
          </li>
          <li>
            <strong>What you record</strong> — the best path <em>peaking</em> at this node:{' '}
            <code>node.val + left + right</code>. Both branches, because here the path is allowed to turn.
          </li>
        </ul>
        <p>
          <code>maxValue[0]</code> starts at <code>Integer.MIN_VALUE</code>, not <code>0</code>, so that an
          all-negative tree correctly answers with its least-negative node rather than <code>0</code>.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public int maxPathSum(TreeNode root) {
        int maxValue[] = new int[1];
        maxValue[0] = Integer.MIN_VALUE;          // MUST NOT be 0 (all-negative trees)
        maxPathDown(root, maxValue);
        return maxValue[0];
    }

    private int maxPathDown(TreeNode node, int maxValue[]) {
        if (node == null) return 0;
        int left  = Math.max(0, maxPathDown(node.left,  maxValue));   // clamp negatives
        int right = Math.max(0, maxPathDown(node.right, maxValue));

        maxValue[0] = Math.max(maxValue[0], left + right + node.val); // path PEAKING here
        return Math.max(left, right) + node.val;                      // best path GOING DOWN
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — why the clamp matters</h3></div>
      <pre className="diagram">{
`              (-10)
              /    \\
            (9)    (20)
                   /   \\
                 (15)   (7)

 maxPathDown(15) : left=0, right=0
                   maxValue = max(MIN, 0+0+15) = 15
                   return 15
 maxPathDown(7)  : maxValue = max(15, 7) = 15         return 7
 maxPathDown(20) : left=15, right=7
                   maxValue = max(15, 15+7+20) = 42   <-- the answer
                   return max(15,7)+20 = 35
 maxPathDown(9)  : maxValue = max(42, 9) = 42         return 9
 maxPathDown(-10): left = max(0, 9) = 9
                   right = max(0, 35) = 35
                   maxValue = max(42, 9+35-10) = max(42, 34) = 42
                   return max(9,35)-10 = 25

 answer = 42   (path 15 -> 20 -> 7, never touching the negative root)`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">One postorder pass.</CxBox>
        <CxBox label="Space" value="O(h)">Recursion stack.</CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Variant: leaf-to-leaf only</div>
        Some versions require the path to start and end at <strong>leaves</strong>. Then you must not clamp at zero
        (you are forced to descend), and you may only update the answer at nodes that have <em>both</em> children —
        otherwise a single-child node would fake a leaf-to-leaf path.
      </div>

      {/* 3.5 */}
      <div id="s3-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 100</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Simultaneous traversal</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Two binary trees are identical if they have the same structure <em>and</em> the
          same values in the same positions.
        </p>
        <p>
          <strong>Intuition.</strong> Walk both trees in lockstep. At each step there are exactly three cases:
        </p>
        <ol className="steps">
          <li>
            <strong>At least one is null.</strong> They match only if <em>both</em> are null. The expression{' '}
            <code>return (p == q)</code> captures this in one line: if both are <code>null</code> the reference
            comparison is <code>true</code>; if only one is, it is <code>false</code>.
          </li>
          <li><strong>Both non-null but values differ.</strong> Not identical — stop.</li>
          <li>
            <strong>Both non-null, values equal.</strong> Recurse: left against left, right against right. Both must
            hold.
          </li>
        </ol>
        <p>
          The <code>&amp;&amp;</code> operator short-circuits, so the moment any subtree disagrees the rest of the
          traversal is skipped.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null || q == null) {
            return (p == q);              // true only when BOTH are null
        }
        return (p.val == q.val)
                && isSameTree(p.left,  q.left)
                && isSameTree(p.right, q.right);
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Why <code>p == q</code> is elegant here</div>
        Reference equality on two <code>null</code>s is <code>true</code>, and a <code>null</code> can never equal a
        real node. The line therefore means &quot;both absent&quot; without an explicit{' '}
        <code>p == null &amp;&amp; q == null</code>. Written out longhand it would be:
        <Code>{
`if (p == null && q == null) return true;
if (p == null || q == null) return false;`
        }</Code>
        Same behaviour, three extra lines. Note this only works because we <em>already know</em> at least one is
        null — do not lift <code>p == q</code> out of that guard.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`      p:   (1)              q:   (1)
          /   \\                 /   \\
        (2)   (3)             (2)   (4)

 isSameTree(1,1)  vals equal -> recurse
   isSameTree(2,2)  vals equal -> recurse
     isSameTree(null,null) -> p==q -> true
     isSameTree(null,null) -> true
     -> true
   isSameTree(3,4)  3 != 4 -> FALSE
   -> false  (short-circuit; nothing below 4 is examined)

 answer = false`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(min(n, m))">
          Stops at the first mismatch; worst case both trees fully traversed.
        </CxBox>
        <CxBox label="Space" value="O(min(h1, h2))">A single recursion stack drives both walks.</CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 Related problems built on this</div>
        <ul>
          <li>
            <strong>Symmetric tree</strong> (4.7) — compare <code>left.left</code> with <code>right.right</code>{' '}
            instead of like with like.
          </li>
          <li>
            <strong>Subtree of another tree</strong> (LeetCode 572) — for every node of the big tree, run{' '}
            <code>isSameTree</code> against the small one: <code>O(n × m)</code>.
          </li>
          <li>
            <strong>Flip-equivalent trees</strong> (LeetCode 951) — accept a match in <em>either</em> orientation at
            each node.
          </li>
        </ul>
      </div>

      {/* 4.1 */}
      <div id="s4-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        Seven problems about <em>where a node sits in space</em> rather than what it contains. Nearly all of them
        are the BFS template from 2.2 with one extra coordinate carried alongside each node.
      </p>
      <div className="callout callout-note">
        <div className="callout-title">📌 A note on node class names</div>
        The problems in this part come from two different judges, so the boilerplate you are handed differs:
        LeetCode gives you <code>TreeNode</code> with a field <code>val</code>, while GeeksforGeeks gives you{' '}
        <code>Node</code> with a field <code>data</code>. Boundary traversal, top view and bottom view are
        GeeksforGeeks problems, but they are written below with <code>TreeNode</code> / <code>val</code> like
        everything else in these notes — the algorithms are identical and only the identifiers change, so rename
        mechanically when you paste into the judge.
      </div>
      <div className="callout callout-key">
        <div className="callout-title">🔑 The coordinate that unlocks this whole part</div>
        Define the <strong>horizontal distance</strong> (<code>hd</code>) of a node: the root has{' '}
        <code>hd = 0</code>, a left child has <code>hd - 1</code>, a right child has <code>hd + 1</code>. Every node
        with the same <code>hd</code> lies on the same vertical line.
        <pre className="diagram">{
`                    hd = -2   -1    0    1    2
                                        (1)
                                   /         \\
                              (2)                (3)
                            /     \\            /     \\
                        (4)        (5)      (6)       (7)

                    hd(1)=0   hd(2)=-1  hd(3)=1
                    hd(4)=-2  hd(5)=0   hd(6)=0   hd(7)=2

              vertical line hd=0 contains {1, 5, 6}`
        }</pre>
        With <code>hd</code> in hand: <strong>vertical order</strong> = group by <code>hd</code>;{' '}
        <strong>top view</strong> = first node seen per <code>hd</code>; <strong>bottom view</strong> = last node
        seen per <code>hd</code>. Three problems, one idea.
      </div>

      <div className="meta-row">
        <span className="pill">LeetCode 103</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">BFS + direction flag</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Level order traversal, but alternate direction each level: level 0 left to right,
          level 1 right to left, level 2 left to right, and so on.
        </p>
        <p>
          <strong>Intuition.</strong> Do not change how you traverse — BFS always enqueues left to right, and that
          is fine. Change only <strong>where you write each value inside the level&apos;s list</strong>. Pre-size
          the row to <code>size</code> and compute the slot:
        </p>
        <Code>{
`int index = leftToRight ? i : (size - 1 - i);     // mirror the position on odd levels`
        }</Code>
        <p>
          On a left-to-right level the <code>i</code>-th node popped goes to slot <code>i</code>. On a right-to-left
          level it goes to slot <code>size - 1 - i</code>, filling the row backwards. Flip{' '}
          <code>leftToRight</code> at the end of each level.
        </p>
      </div>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Pre-sizing a list is not what it looks like</div>
        <code>new ArrayList&lt;&gt;(size)</code> does <strong>not</strong> give you a list with{' '}
        <code>size</code> slots — it gives you an <strong>empty</strong> list with a capacity hint, so{' '}
        <code>row.set(index, v)</code> on it throws <code>IndexOutOfBoundsException</code> immediately. The slots
        have to be materialised first, which is what <code>Collections.nCopies(size, 0)</code> does below. This is
        the one detail that makes the index-based version of this problem fiddly in Java.
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> nodesQueue = new LinkedList<>();
        nodesQueue.offer(root);
        boolean leftToRight = true;

        while (!nodesQueue.isEmpty()) {
            int size = nodesQueue.size();

            // A list that already HAS 'size' slots, so row.set(i, v) is legal.
            // new ArrayList<>(size) alone would be empty and would throw.
            List<Integer> row = new ArrayList<>(Collections.nCopies(size, 0));

            for (int i = 0; i < size; i++) {
                TreeNode node = nodesQueue.poll();

                // find position to fill node's value
                int index = leftToRight ? i : (size - 1 - i);

                row.set(index, node.val);
                if (node.left != null) {
                    nodesQueue.offer(node.left);
                }
                if (node.right != null) {
                    nodesQueue.offer(node.right);
                }
            }
            // after this level
            leftToRight = !leftToRight;
            result.add(row);
        }
        return result;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Cleaner Java alternative — LinkedList.addFirst</h3></div>
      <div className="card">
        <p>
          There is a neater tool for this: a <code>LinkedList</code> used as a deque. Instead of computing a
          mirrored index, just <strong>prepend</strong> on right-to-left levels. No pre-sizing, no index
          arithmetic, no <code>nCopies</code>, and{' '}
          <code>addFirst</code> is <code>O(1)</code> on a linked list.
        </p>
      </div>
      <Code>{
`class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        boolean leftToRight = true;

        while (!q.isEmpty()) {
            int size = q.size();
            LinkedList<Integer> row = new LinkedList<>();

            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();

                if (leftToRight) row.addLast(node.val);    // append  -> normal order
                else             row.addFirst(node.val);   // prepend -> reversed order

                if (node.left  != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            leftToRight = !leftToRight;
            result.add(row);
        }
        return result;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                    (3)
                   /   \\
                 (9)   (20)
                       /   \\
                    (15)   (7)

 level 0  leftToRight=true   size=1  pop 3            row=[3]
 level 1  leftToRight=false  size=2  pop 9  -> slot 1
                                     pop 20 -> slot 0  row=[20, 9]
 level 2  leftToRight=true   size=2  pop 15 -> slot 0
                                     pop 7  -> slot 1  row=[15, 7]

 result = [[3], [20, 9], [15, 7]]`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One BFS pass; index computation is <code>O(1)</code> per node.
        </CxBox>
        <CxBox label="Space" value="O(w)">Queue holds one level; worst case <code>O(n)</code>.</CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Why not two stacks?</div>
        A popular alternative uses two stacks and swaps them each level. It works, but it forces you to reverse the
        child push order on alternating levels — an easy bug. The direction-flag approach never changes how the tree
        is traversed, only how the row is written, which is why it is the version worth memorising.
      </div>

      {/* 4.2 */}
      <div id="s4-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">GFG Boundary Traversal</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Three-part decomposition</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Print the boundary of the tree anti-clockwise, starting from the root: the left
          boundary top-down, then all the leaves left-to-right, then the right boundary bottom-up. No node may
          appear twice.
        </p>
        <p>
          <strong>Intuition.</strong> Do not try to walk the outline in one pass. Split the boundary into three
          independent segments and concatenate them:
        </p>
        <ol className="steps">
          <li>
            <strong>The root</strong> — added first, but only if it is not itself a leaf (a single-node tree must not
            be printed twice).
          </li>
          <li>
            <strong>Left boundary, top-down, excluding leaves.</strong> Walk down from <code>root.left</code>,
            always preferring <code>left</code> and falling back to <code>right</code> when there is no left child.
            Leaves are skipped here because segment 3 will print them.
          </li>
          <li>
            <strong>All leaves, left to right.</strong> Any DFS that visits left before right produces leaves in
            left-to-right order.
          </li>
          <li>
            <strong>Right boundary, bottom-up, excluding leaves.</strong> Walk down from <code>root.right</code>{' '}
            preferring <code>right</code>, collect into a temporary list, then append it <strong>reversed</strong> —
            the cheapest way to get a bottom-up order out of a top-down walk.
          </li>
        </ol>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The two rules that prevent duplicates</div>
          <strong>(a)</strong> Neither boundary walk adds leaves — leaves belong exclusively to segment 3.{' '}
          <strong>(b)</strong> The root is added by hand, and only when it is not a leaf. Get either wrong and a
          corner node appears twice.
        </div>
      </div>

      <div className="subsection-header">
        <h3>Code Implementation (with the <code>isLeaf</code> helper filled in)</h3>
      </div>
      <Code>{
`class Solution {

    boolean isLeaf(TreeNode node) {                    // helper the screenshot referenced
        return node.left == null && node.right == null;
    }

    void addLeftBoundary(TreeNode root, ArrayList<Integer> res) {
        TreeNode cur = root.left;
        while (cur != null) {
            if (isLeaf(cur) == false) res.add(cur.val);   // skip leaves
            if (cur.left != null) cur = cur.left;          // prefer left
            else cur = cur.right;                          // else fall back to right
        }
    }

    void addRightBoundary(TreeNode root, ArrayList<Integer> res) {
        TreeNode cur = root.right;
        ArrayList<Integer> tmp = new ArrayList<Integer>();
        while (cur != null) {
            if (isLeaf(cur) == false) tmp.add(cur.val);
            if (cur.right != null) cur = cur.right;        // prefer right
            else cur = cur.left;
        }
        int i;
        for (i = tmp.size() - 1; i >= 0; --i) {            // append REVERSED -> bottom-up
            res.add(tmp.get(i));
        }
    }

    void addLeaves(TreeNode root, ArrayList<Integer> res) {
        if (isLeaf(root)) {
            res.add(root.val);
            return;
        }
        if (root.left  != null) addLeaves(root.left,  res);   // left before right
        if (root.right != null) addLeaves(root.right, res);
    }

    ArrayList<Integer> printBoundary(TreeNode node) {
        ArrayList<Integer> ans = new ArrayList<Integer>();
        if (node == null) return ans;

        if (isLeaf(node) == false) ans.add(node.val);   // root, unless it IS a leaf
        addLeftBoundary(node, ans);
        addLeaves(node, ans);
        addRightBoundary(node, ans);
        return ans;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                       (1)
                    /       \\
                 (2)          (3)
                /   \\        /   \\
             (4)    (5)    (6)   (7)
                    /  \\            \\
                 (8)   (9)          (10)

 root         : 1 is not a leaf                  -> ans = [1]
 leftBoundary : start at 2 -> not leaf, add      -> ans = [1, 2]
                2.left = 4  -> 4 IS a leaf, skip, and 4 has no children -> loop ends
                                                 -> ans = [1, 2]
 leaves (DFS L->R): 4, 8, 9, 6, 10               -> ans = [1, 2, 4, 8, 9, 6, 10]
 rightBoundary: start at 3 -> not leaf, tmp=[3]
                3.right = 7 -> not leaf, tmp=[3, 7]
                7.right = 10 -> IS a leaf, skip; 10 has no children -> ends
                append reversed [7, 3]           -> ans = [1, 2, 4, 8, 9, 6, 10, 7, 3]

 result = [1, 2, 4, 8, 9, 6, 10, 7, 3]`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Two boundary walks are <code>O(h)</code>; the leaf DFS is <code>O(n)</code>.
        </CxBox>
        <CxBox label="Space" value="O(n)">
          Output list, plus <code>O(h)</code> for the leaf recursion and the <code>tmp</code> buffer.
        </CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Edge cases that break naive solutions</div>
        <ul>
          <li>
            <strong>Single node.</strong> The root is a leaf. <code>isLeaf(node) == false</code> keeps it out of the
            root step, and <code>addLeaves</code> adds it exactly once. Result: <code>[1]</code>.
          </li>
          <li>
            <strong>Left-skewed tree.</strong> Every node except the last is on the left boundary; the last is the
            only leaf. No overlap.
          </li>
          <li>
            <strong>Root with only a left child.</strong> <code>addRightBoundary</code> starts at{' '}
            <code>root.right == null</code>, the <code>while</code> never runs, and nothing is appended.
          </li>
        </ul>
      </div>

      {/* 4.3 */}
      <div id="s4-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 987</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Map of map of PQ</span>
        <span className="pill">Strict tie-breaking</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Report nodes grouped by vertical line, ordered left to right. Within a line,
          order by level (top to bottom); when two nodes share both line <em>and</em> level, order them by{' '}
          <strong>value</strong> ascending.
        </p>
        <p>
          <strong>Why this is Hard and not Medium.</strong> The grouping is easy; it is the three-level sort that
          trips people up. You need a structure ordered by <code>hd</code>, then by <code>level</code>, then by{' '}
          <code>value</code>. Your notes solve it with exactly that shape:
        </p>
        <Code>{
`TreeMap<Integer, TreeMap<Integer, PriorityQueue<Integer>>> map;
//       ^hd            ^level            ^values at that (hd, level), min-heap`
        }</Code>
        <ul>
          <li>
            The outer <code>TreeMap</code> keeps vertical lines sorted from most negative <code>hd</code>{' '}
            (leftmost) to most positive.
          </li>
          <li>The inner <code>TreeMap</code> keeps levels sorted top to bottom.</li>
          <li>
            The <code>PriorityQueue</code> is a min-heap, so nodes colliding at the same <code>(hd, level)</code>{' '}
            come out smallest-value-first — the required tie-break, handled for free.
          </li>
        </ul>
        <p>
          Because <code>TreeMap</code> maintains the ordering, the traversal itself can be a plain BFS — you just
          need each node tagged with its <code>(hd, level)</code> coordinate, which is what the{' '}
          <code>Tuple</code> class carries.
        </p>
        <div className="callout callout-note">
          <div className="callout-title">📌 Field names cleaned up</div>
          Your screenshot names the <code>Tuple</code> fields <code>row</code> and <code>col</code>, but{' '}
          <code>row</code> is decremented for a left child — so it is really the horizontal distance, and{' '}
          <code>col</code> is really the level. They are renamed <code>hd</code> and <code>level</code> below so the
          code reads the way it behaves. A stray <code>System.out.println(nodes.peek())</code> in the output loop
          has also been dropped — it was debug output and it prints every value twice.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Tuple {
    TreeNode node;
    int hd;                                   // horizontal distance: root 0, left -1, right +1
    int level;                                // depth: root 0

    public Tuple(TreeNode _node, int _hd, int _level) {
        node  = _node;
        hd    = _hd;
        level = _level;
    }
}

class Solution {
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        TreeMap<Integer, TreeMap<Integer, PriorityQueue<Integer>>> map = new TreeMap<>();
        Queue<Tuple> q = new LinkedList<Tuple>();
        q.offer(new Tuple(root, 0, 0));

        while (!q.isEmpty()) {
            Tuple tuple  = q.poll();
            TreeNode node = tuple.node;
            int x = tuple.hd;                 // which vertical line
            int y = tuple.level;              // which level

            if (!map.containsKey(x)) {
                map.put(x, new TreeMap<>());
            }
            if (!map.get(x).containsKey(y)) {
                map.get(x).put(y, new PriorityQueue<>());
            }
            map.get(x).get(y).offer(node.val);

            if (node.left != null) {
                q.offer(new Tuple(node.left, x - 1, y + 1));    // left: hd - 1
            }
            if (node.right != null) {
                q.offer(new Tuple(node.right, x + 1, y + 1));   // right: hd + 1
            }
        }

        List<List<Integer>> list = new ArrayList<>();
        for (TreeMap<Integer, PriorityQueue<Integer>> ys : map.values()) {   // hd ascending
            list.add(new ArrayList<>());
            for (PriorityQueue<Integer> nodes : ys.values()) {              // level ascending
                while (!nodes.isEmpty()) {
                    list.get(list.size() - 1).add(nodes.poll());            // value ascending
                }
            }
        }
        return list;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Two traps</div>
        <ul>
          <li>
            <strong>The tie-break is real.</strong> LeetCode 987 has test cases where two nodes genuinely share{' '}
            <code>(hd, level)</code>. Drop the <code>PriorityQueue</code> for a plain list and you will fail them.
          </li>
          <li>
            <strong><code>root == null</code> is not guarded.</strong> This code enqueues the root unconditionally,
            so a null root throws <code>NullPointerException</code> on <code>node.val</code>. LeetCode 987
            guarantees at least one node, but add <code>if (root == null) return list;</code> if the judge does not.
          </li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                    (1)                 hd=0  level=0
                   /   \\
                 (2)   (3)              hd=-1/+1  level=1
                /  \\   /  \\
             (4) (5) (6) (7)            hd=-2, 0, 0, +2   level=2

 map after BFS:
   hd=-2 : { level 2 : [4] }
   hd=-1 : { level 1 : [2] }
   hd= 0 : { level 0 : [1], level 2 : [5, 6] }   <-- 5 and 6 collide, PQ sorts them
   hd= 1 : { level 1 : [3] }
   hd= 2 : { level 2 : [7] }

 output = [[4], [2], [1, 5, 6], [3], [7]]`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n log n)">
          BFS is <code>O(n)</code>, but every insert pays <code>log</code> for the TreeMaps and the heap.
        </CxBox>
        <CxBox label="Space" value="O(n)">
          Every node is stored once in the nested maps, plus <code>O(w)</code> for the queue.
        </CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Simpler variant — GFG vertical order</div>
        GeeksforGeeks&apos; version of this problem does <strong>not</strong> require the value tie-break; nodes at
        the same <code>(hd, level)</code> keep BFS order. There a single{' '}
        <code>TreeMap&lt;Integer, List&lt;Integer&gt;&gt;</code> keyed by <code>hd</code> is enough, because BFS
        already visits levels in order. That collapses the solution to about 15 lines. Always check whether the
        tie-break is actually required before reaching for the nested structure.
      </div>

      {/* 4.4 */}
      <div id="s4-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">GFG Top View</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">First node per hd</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Standing above the tree and looking down, report the nodes you can see, left to
          right.
        </p>
        <p>
          <strong>Intuition.</strong> On each vertical line only the <strong>topmost</strong> node is visible —
          everything below it is hidden. BFS visits nodes in increasing level order, so the <em>first</em> node BFS
          encounters at a given <code>hd</code> is the topmost one. Therefore:
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 One line does the whole job</div>
          <Code>{
`if (map.get(hd) == null) map.put(hd, temp.val);   // record ONLY the first sighting`
          }</Code>
          Equivalently <code>map.putIfAbsent(hd, temp.val)</code>. The check is what makes it &quot;top&quot; view —
          remove it and you get the bottom view (see 4.5).
        </div>
        <p>
          The map must be a <code>TreeMap</code> so that iterating it yields <code>hd</code> in ascending order —
          that is, left to right. A <code>HashMap</code> here would produce a scrambled answer.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    TreeNode node;
    int hd;                                     // horizontal distance

    Pair(TreeNode node, int hd) {
        this.node = node;
        this.hd   = hd;
    }
}

class Solution {

    // Function to return a list of nodes visible from the top view
    // from left to right in Binary Tree.
    public static ArrayList<Integer> topView(TreeNode root) {
        ArrayList<Integer> ans = new ArrayList<>();
        if (root == null) return ans;

        Map<Integer, Integer> map = new TreeMap<>();      // hd -> value, hd kept sorted
        Queue<Pair> q = new LinkedList<Pair>();
        q.add(new Pair(root, 0));

        while (!q.isEmpty()) {
            Pair it = q.remove();
            int hd    = it.hd;
            TreeNode temp = it.node;

            if (map.get(hd) == null) map.put(hd, temp.val);   // first at this hd = topmost

            if (temp.left != null) {
                q.add(new Pair(temp.left, hd - 1));
            }
            if (temp.right != null) {
                q.add(new Pair(temp.right, hd + 1));
            }
        }

        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            ans.add(entry.getValue());                          // hd ascending = left to right
        }
        return ans;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                     (1)                       hd 0
                   /     \\
                (2)       (3)                  hd -1, +1
               /   \\     /   \\
            (4)   (5) (6)   (7)                hd -2, 0, 0, +2

 BFS order and hd:  1(0)  2(-1)  3(+1)  4(-2)  5(0)  6(0)  7(+2)

 hd  0 : first sighting is 1     -> map[0] = 1
 hd -1 : first sighting is 2     -> map[-1] = 2
 hd +1 : first sighting is 3     -> map[1] = 3
 hd -2 : first sighting is 4     -> map[-2] = 4
 hd  0 : 5 arrives, already set  -> IGNORED  (5 sits under 1)
 hd  0 : 6 arrives, already set  -> IGNORED
 hd +2 : first sighting is 7     -> map[2] = 7

 TreeMap iteration: -2, -1, 0, 1, 2
 answer = [4, 2, 1, 3, 7]`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n log n)">
          <code>O(n)</code> BFS with an <code>O(log n)</code> TreeMap operation per node.
        </CxBox>
        <CxBox label="Space" value="O(n)">
          Queue plus one map entry per distinct <code>hd</code>.
        </CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Do not use DFS for top view</div>
        A preorder DFS reaches deep-left nodes before shallow-right ones, so &quot;first seen&quot; no longer means
        &quot;topmost&quot; and you get wrong answers. DFS <em>can</em> work, but only if you also store the level
        with each <code>hd</code> and overwrite when you find a strictly smaller level. BFS gets it right by
        construction — use BFS.
      </div>

      {/* 4.5 */}
      <div id="s4-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">GFG Bottom View</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Last node per hd</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Looking at the tree from below, report the visible nodes left to right.
        </p>
        <p>
          <strong>Intuition.</strong> Identical to the top view with one character changed: on each vertical line,
          the visible node is the <strong>lowest</strong>, i.e. the <em>last</em> node BFS meets at that{' '}
          <code>hd</code>. So overwrite unconditionally instead of writing only when absent.
        </p>
        <div className="compare">
          <div className="compare-side bad">
            <div className="compare-label">Top view — keep the first</div>
            <Code>{
`if (map.get(hd) == null)
    map.put(hd, temp.val);`
            }</Code>
          </div>
          <div className="compare-side good">
            <div className="compare-label">Bottom view — keep the last</div>
            <Code>{
`map.put(hd, temp.val);`
            }</Code>
          </div>
        </div>
        <p>
          Because BFS proceeds level by level, each overwrite replaces a higher node with a lower one, and the final
          value on each line is the deepest node on it.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <div className="card">
        <p>
          Your screenshot stores <code>hd</code> as a mutable field on the node itself (
          <code>root.hd = 0; temp.left.hd = hd - 1;</code>). That compiles on GFG, whose node class happens to
          expose such a field, but it has two costs: it <strong>mutates the input tree</strong> — a side effect that
          breaks if the caller reuses it — and it will not compile anywhere the node class lacks an{' '}
          <code>hd</code> field, which includes the <code>TreeNode</code> used throughout these notes unless you
          add one. The <code>Pair</code> version below is the same algorithm without touching the tree; the
          original is shown after it for reference.
        </p>
      </div>
      <Code>{
`class Solution {

    // Function to return a list containing the bottom view of the given tree.
    public ArrayList<Integer> bottomView(TreeNode root) {
        ArrayList<Integer> ans = new ArrayList<>();
        if (root == null) return ans;

        Map<Integer, Integer> map = new TreeMap<>();
        Queue<Pair> q = new LinkedList<Pair>();
        q.add(new Pair(root, 0));

        while (!q.isEmpty()) {
            Pair it   = q.remove();
            int hd    = it.hd;
            TreeNode temp = it.node;

            map.put(hd, temp.val);           // NO null-check: last write wins

            if (temp.left != null) {
                q.add(new Pair(temp.left, hd - 1));
            }
            if (temp.right != null) {
                q.add(new Pair(temp.right, hd + 1));
            }
        }

        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            ans.add(entry.getValue());
        }
        return ans;
    }
}`
      }</Code>

      <div className="subsection-header">
        <h3>Original Version (<code>hd</code> stored on the node)</h3>
      </div>
      <Code>{
`class Solution {
    public ArrayList<Integer> bottomView(TreeNode root) {
        ArrayList<Integer> ans = new ArrayList<>();
        if (root == null) return ans;

        Map<Integer, Integer> map = new TreeMap<>();
        Queue<TreeNode> q = new LinkedList<TreeNode>();
        root.hd = 0;                            // requires an 'hd' field on TreeNode
        q.add(root);

        while (!q.isEmpty()) {
            TreeNode temp = q.remove();
            int hd = temp.hd;
            map.put(hd, temp.val);

            if (temp.left != null) {
                temp.left.hd = hd - 1;          // side effect on the input tree
                q.add(temp.left);
            }
            if (temp.right != null) {
                temp.right.hd = hd + 1;
                q.add(temp.right);
            }
        }

        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            ans.add(entry.getValue());
        }
        return ans;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — same tree as the top view</h3></div>
      <pre className="diagram">{
`                     (1)                       hd 0
                   /     \\
                (2)       (3)                  hd -1, +1
               /   \\     /   \\
            (4)   (5) (6)   (7)                hd -2, 0, 0, +2

 hd  0 : 1 written, then 5 OVERWRITES it, then 6 OVERWRITES 5  -> map[0] = 6
 hd -1 : 2                                                     -> map[-1] = 2
 hd +1 : 3                                                     -> map[1] = 3
 hd -2 : 4                                                     -> map[-2] = 4
 hd +2 : 7                                                     -> map[2] = 7

 answer = [4, 2, 6, 3, 7]

 Compare with the top view [4, 2, 1, 3, 7] -- only the hd=0 slot differs.`
      }</pre>

      <div className="callout callout-note">
        <div className="callout-title">📌 Both 5 and 6 sit on line 0 at the same level</div>
        Here node 6 wins purely because BFS enqueues node 3&apos;s children after node 2&apos;s, so 6 is written
        after 5. That is the accepted GFG convention (rightmost wins on a tie). LeetCode&apos;s vertical-order
        problem (4.3) refuses to rely on traversal order and breaks such ties by value instead — which is exactly
        why it needs the <code>PriorityQueue</code>.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n log n)">BFS with a TreeMap write per node.</CxBox>
        <CxBox label="Space" value="O(n)">Queue plus one entry per vertical line.</CxBox>
      </Cx>

      {/* 4.6 */}
      <div id="s4-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 199</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Reverse preorder DFS</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Looking at the tree from the right, report the visible nodes top to bottom —
          that is, the <strong>rightmost node of each level</strong>.
        </p>
        <p>
          <strong>The BFS answer</strong> is obvious: run the level-order template and take the last node of each
          level. But your notes use the neater DFS version, which is worth understanding because the same trick
          appears in many &quot;first node per depth&quot; problems.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Reverse preorder + a size check</div>
          Traverse <strong>Root → Right → Left</strong> — a mirrored preorder. Then the <em>first</em> node you
          reach at any depth is automatically the rightmost one at that depth. Detect &quot;first time at this
          depth&quot; with a single comparison:
          <Code>{
`if (currDepth == result.size()) result.add(curr.val);`
          }</Code>
          <code>result.size()</code> is the number of depths already recorded, so it equals the next unseen depth.
          If <code>currDepth</code> matches, this is the first node at a brand-new depth → record it. Any later node
          at that depth sees <code>currDepth &lt; result.size()</code> and is skipped. No map, no level tracking, no
          queue.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`public class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<Integer>();
        rightView(root, result, 0);
        return result;
    }

    public void rightView(TreeNode curr, List<Integer> result, int currDepth) {
        if (curr == null) {
            return;
        }
        if (currDepth == result.size()) {          // first node reached at this depth
            result.add(curr.val);
        }
        rightView(curr.right, result, currDepth + 1);   // RIGHT first
        rightView(curr.left,  result, currDepth + 1);
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Left side view — swap two lines</h3></div>
      <Code>{
`public void leftView(TreeNode curr, List<Integer> result, int currDepth) {
    if (curr == null) return;
    if (currDepth == result.size()) result.add(curr.val);
    leftView(curr.left,  result, currDepth + 1);    // LEFT first now
    leftView(curr.right, result, currDepth + 1);
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                    (1)
                   /   \\
                 (2)   (3)
                /  \\      \\
              (4)  (5)    (6)
                          /
                        (7)

 rightView(1, depth 0): size=0, 0==0 -> ADD 1   result=[1]
   rightView(3, depth 1): size=1, 1==1 -> ADD 3 result=[1,3]
     rightView(6, depth 2): size=2 -> ADD 6     result=[1,3,6]
       rightView(null)  (6 has no right child)
       rightView(7, depth 3): size=3 -> ADD 7   result=[1,3,6,7]
     rightView(null)   (3 has no left child)
   rightView(2, depth 1): size=4, 1 != 4 -> SKIP  (3 already covers depth 1)
     rightView(5, depth 2): 2 != 4 -> SKIP
     rightView(4, depth 2): 2 != 4 -> SKIP

 answer = [1, 3, 6, 7]`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">Every node visited once; no map, no sorting.</CxBox>
        <CxBox label="Space" value="O(h)">
          Recursion stack. Better than BFS&apos;s <code>O(w)</code> on wide trees, worse on skewed ones.
        </CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Right view vs top view — do not confuse them</div>
        The right <em>side</em> view is indexed by <strong>level</strong> (one node per depth). The top and bottom
        views are indexed by <strong>horizontal distance</strong> (one node per vertical line). Different key,
        different answer — and in the tree above, the right view is <code>[1,3,6,7]</code> while the top view is{' '}
        <code>[4,2,1,3,6]</code>.
      </div>

      {/* 4.7 */}
      <div id="s4-7" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 101</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Mirror comparison</span>
      </div>
      <div className="card">
        <p><strong>Problem.</strong> Is the tree a mirror image of itself about its root?</p>
        <p>
          <strong>Intuition.</strong> Symmetry is a statement about <em>two</em> subtrees, not one node, so the
          helper must take two arguments. Compare <code>root.left</code> against <code>root.right</code> with the
          crossed recursion:
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Compare outside with outside, inside with inside</div>
          <Code>{
`isSymmetricHelp(left.left,  right.right)    // the two OUTER children
isSymmetricHelp(left.right, right.left)     // the two INNER children`
          }</Code>
          This crossing is the entire difference from <strong>3.5 Identical Trees</strong>, which compares{' '}
          <code>left.left</code> with <code>right.left</code>. Identical = same shape; symmetric = mirrored shape.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public boolean isSymmetric(TreeNode root) {
        return root == null || isSymmetricHelp(root.left, root.right);
    }

    private boolean isSymmetricHelp(TreeNode left, TreeNode right) {
        if (left == null || right == null)
            return left == right;                       // symmetric only if BOTH absent

        if (left.val != right.val) return false;

        return isSymmetricHelp(left.left,  right.right)  // outer pair
                &&
               isSymmetricHelp(left.right, right.left);   // inner pair
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — symmetric and not</h3></div>
      <pre className="diagram">{
`   SYMMETRIC  ✓                  NOT SYMMETRIC  ✗
         (1)                              (1)
       /     \\                          /     \\
     (2)     (2)                      (2)     (2)
     /  \\   /  \\                        \\        \\
   (3) (4)(4) (3)                       (3)      (3)

 LEFT case:
   help(2, 2)         2 == 2  -> recurse
     help(3, 3)  outer: left.left=3 vs right.right=3   -> equal, both leaves -> true
     help(4, 4)  inner: left.right=4 vs right.left=4   -> true
   -> true                                     answer = true

 RIGHT case:
   help(2, 2)         2 == 2  -> recurse
     help(null, 3)  outer: left.left=null vs right.right=3
                    one is null -> return (null == 3) -> FALSE
   -> false                                    answer = false`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">Each node participates in exactly one comparison pair.</CxBox>
        <CxBox label="Space" value="O(h)">Recursion stack.</CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Iterative version</div>
        Push the pair <code>(root.left, root.right)</code> onto a stack, then repeatedly pop a pair and push{' '}
        <code>(a.left, b.right)</code> and <code>(a.right, b.left)</code>. Same logic, no recursion — useful if you
        are asked to avoid the call stack. An alternative one-liner framing is{' '}
        <code>isSameTree(root, mirror(root))</code>, but that costs <code>O(n)</code> extra space to build the
        mirror, so it is worse than the direct comparison.
      </div>

      {/* 5.1 */}
      <div id="s5-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        The last six problems, and the two hardest ideas in these notes: <strong>backtracking</strong> a path, and
        treating a tree as an <strong>undirected graph</strong> so you can walk upward.
      </p>
      <div className="meta-row">
        <span className="pill">InterviewBit / GFG</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Backtracking</span>
        <span className="pill">Prerequisite for 5.2</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a target value <code>x</code>, return the list of values on the path from
          the root down to that node. The tree is <em>not</em> a BST, so you cannot navigate — you must search.
        </p>
        <p>
          <strong>Intuition.</strong> Do a preorder DFS carrying the path built so far. Add the current node{' '}
          <strong>on the way in</strong>. If it is the target, stop and report success — the list is exactly the
          path. If neither subtree finds the target, this node is not on the path after all, so{' '}
          <strong>remove it again</strong> before returning failure. That removal is the backtracking step and it is
          the only difficult line in the problem.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why the return type is <code>boolean</code></div>
          The function does not return the path — it returns &quot;did I find the target below me?&quot;, and the
          path accumulates as a side effect in the shared <code>arr</code>. That combination lets a single{' '}
          <code>ArrayList</code> serve the whole recursion with no copying: every node is added once and removed at
          most once, so the total work stays <code>O(n)</code>. Returning a fresh <code>List</code> per call would
          be <code>O(n²)</code> in the worst case.
        </div>
        <ol className="steps">
          <li><code>node == null</code> → <code>false</code>. Nothing to find, nothing added.</li>
          <li>
            Add <code>node.val</code> to <code>arr</code> — tentatively assume this node is on the path.
          </li>
          <li>
            If <code>node.val == x</code> → <code>true</code>. Note we leave the value in <code>arr</code>; it is
            the last element of the answer.
          </li>
          <li>
            If the left subtree finds it <strong>or</strong> the right subtree does → <code>true</code>, keeping{' '}
            <code>node.val</code> in place because it really is on the path.
          </li>
          <li>
            Otherwise <code>arr.remove(arr.size() - 1)</code> — undo step 2 — and return <code>false</code>.
          </li>
        </ol>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`public class Solution {
    private boolean getPath(TreeNode root, ArrayList<Integer> arr, int x) {
        if (root == null) {
            return false;
        }
        arr.add(root.val);                 // tentatively put me on the path

        if (root.val == x) {
            return true;                   // found -- leave me on the path
        }

        if (getPath(root.left, arr, x) || getPath(root.right, arr, x)) {
            return true;                   // found below me -- I am genuinely on the path
        }

        arr.remove(arr.size() - 1);        // BACKTRACK: I am not on the path
        return false;
    }

    public ArrayList<Integer> solve(TreeNode A, int B) {
        ArrayList<Integer> arr = new ArrayList<>();
        if (A == null) return arr;
        getPath(A, arr, B);
        return arr;                        // empty if B is not present
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — watch the backtracking</h3></div>
      <pre className="diagram">{
`                (1)                    target x = 5
               /   \\
             (2)   (3)
            /  \\      \\
          (4)  (5)    (6)

 getPath(1) : arr=[1]         1 != 5, try left
   getPath(2) : arr=[1,2]     2 != 5, try left
     getPath(4) : arr=[1,2,4] 4 != 5, try left  -> null -> false
                                       try right -> null -> false
                  arr.remove(last)  -> arr=[1,2]     BACKTRACK, 4 is not on the path
                  return false
     try right
     getPath(5) : arr=[1,2,5] 5 == 5 -> TRUE
   -> true, so 2 stays                arr=[1,2,5]
 -> true, so 1 stays                  arr=[1,2,5]

 answer = [1, 2, 5]`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Worst case the whole tree is searched; <code>||</code> short-circuits once found.
        </CxBox>
        <CxBox label="Space" value="O(h)">
          Recursion stack; <code>arr</code> never exceeds the height.
        </CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Duplicate values</div>
        Matching on <code>root.val == x</code> finds the <strong>first</strong> node with that value in preorder. If
        values are not unique, pass the <code>TreeNode</code> reference and compare with <code>==</code> instead —
        that is what LeetCode&apos;s LCA problem does, and it is the more robust habit.
      </div>

      <div className="callout callout-tip">
        <div className="callout-title">💡 What this unlocks</div>
        <strong>All root-to-leaf paths</strong> (LeetCode 257) — same skeleton, but record a copy of{' '}
        <code>arr</code> whenever you reach a leaf instead of stopping. <strong>Path sum</strong> (112 / 113) — same
        skeleton with a running total. <strong>LCA the slow way</strong> — get both root-to-node paths and walk them
        in parallel until they diverge; the last common value is the answer. That works in <code>O(n)</code> time
        and <code>O(h)</code> space, but 5.2 does it in one pass with no lists at all.
      </div>

      {/* 5.2 */}
      <div id="s5-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 236</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">One-pass postorder</span>
        <span className="pill">Classic interview question</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given two nodes <code>p</code> and <code>q</code>, find their lowest common
          ancestor — the deepest node having both as descendants. A node counts as a descendant of itself, so if{' '}
          <code>p</code> is an ancestor of <code>q</code> then <code>p</code> is the LCA.
        </p>
        <p>
          <strong>Intuition.</strong> Recurse and ask each subtree &quot;did you see <code>p</code> or{' '}
          <code>q</code>?&quot; The return value carries three meanings at once:
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Left returns</th><th>Right returns</th><th>Meaning</th><th>Return</th></tr></thead>
            <tbody>
              <tr>
                <td><code>null</code></td><td><code>null</code></td>
                <td>Neither target is below me</td><td><code>null</code></td>
              </tr>
              <tr>
                <td>a node</td><td><code>null</code></td>
                <td>Everything found so far is on my left</td><td>pass the left result up</td>
              </tr>
              <tr>
                <td><code>null</code></td><td>a node</td>
                <td>Everything found so far is on my right</td><td>pass the right result up</td>
              </tr>
              <tr>
                <td>a node</td><td>a node</td>
                <td>One target on each side — the paths <strong>split here</strong></td>
                <td><strong><code>this</code> node</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The base case is doing double duty</div>
          <code>if (root == null || root == p || root == q) return root;</code>
          <br />
          Reaching <code>p</code> means &quot;a target is here&quot; — and we deliberately do <strong>not</strong>{' '}
          keep searching below it. That is what makes the self-ancestor case work: if <code>q</code> lives under{' '}
          <code>p</code>, the recursion stops at <code>p</code>, the other side returns <code>null</code>, and{' '}
          <code>p</code> propagates all the way up as the answer. It also means the algorithm{' '}
          <strong>assumes both nodes exist</strong> in the tree.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // base case
        if (root == null || root == p || root == q) {
            return root;
        }
        TreeNode left  = lowestCommonAncestor(root.left,  p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        // result
        if (left == null) {
            return right;              // nothing on the left -> answer is whatever right found
        }
        else if (right == null) {
            return left;               // nothing on the right -> answer is whatever left found
        }
        else {                         // both left and right are not null, we found our result
            return root;               // the split point IS the LCA
        }
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — the split case</h3></div>
      <pre className="diagram">{
`                       (3)                p = 5, q = 1
                    /       \\
                 (5)         (1)
                /   \\       /   \\
             (6)    (2)   (0)   (8)
                    /  \\
                 (7)   (4)

 LCA(3): not null/p/q -> recurse both sides
   LCA(5): root == p  -> return node 5            (does NOT descend into 6 or 2)
   LCA(1): root == q  -> return node 1
   left = 5, right = 1, both non-null -> return node 3

 answer = 3`
      }</pre>

      <div className="subsection-header"><h3>Dry run — the self-ancestor case</h3></div>
      <pre className="diagram">{
`                       (3)                p = 5, q = 4
                    /       \\
                 (5)         (1)
                /   \\       /   \\
             (6)    (2)   (0)   (8)
                    /  \\
                 (7)   (4)

 LCA(3): recurse
   LCA(5): root == p -> return 5      <-- stops immediately; node 4 below is never visited
   LCA(1): -> LCA(0)=null, LCA(8)=null -> return null
   left = 5, right = null -> return left = 5

 answer = 5     correct, because 5 is an ancestor of 4`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">One pass, no path lists, no second traversal.</CxBox>
        <CxBox label="Space" value="O(h)">Recursion stack only.</CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ This breaks if a node might be missing</div>
        Given <code>p = 5</code> and a <code>q</code> that is not in the tree, the function happily returns{' '}
        <code>5</code> — not <code>null</code>. If the problem does not guarantee both nodes exist, either verify
        their presence with a separate search first, or carry two boolean flags recording whether each was actually
        seen.
      </div>

      <div className="callout callout-tip">
        <div className="callout-title">💡 In a BST it is much easier</div>
        For a Binary Search Tree (LeetCode 235) use the ordering: from the root, if both values are smaller go
        left, if both are larger go right, otherwise you are standing on the split point — that node is the LCA.{' '}
        <code>O(h)</code> time, <code>O(1)</code> space iteratively, and no recursion at all.
      </div>

      {/* 5.3 */}
      <div id="s5-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 662</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Virtual indexing</span>
        <span className="pill pill-danger">Overflow risk</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> The width of a level is the number of positions between its leftmost and
          rightmost non-null node <strong>inclusive</strong>, counting the null gaps in between as if those nodes
          existed. Return the largest width over all levels.
        </p>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ It is not just the node count per level</div>
          Level <code>[3, null, null, 9]</code> has two real nodes but a width of <strong>4</strong>, because the
          missing positions still count. This is why plain BFS counting fails and why we need indices.
        </div>
        <p>
          <strong>Intuition.</strong> Give every node the <em>virtual</em> array index it would have in a complete
          binary tree (1.3): root gets 0, and a node with index <code>i</code> has children at <code>2i + 1</code>{' '}
          and <code>2i + 2</code>. Then the width of a level is simply <code>lastIndex - firstIndex + 1</code>, gaps
          included automatically.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The normalisation step — the point of <code>mmin</code></div>
          Raw indices double every level, so at depth 60 they exceed <code>long</code>, let alone <code>int</code>.
          The fix: at the start of each level, read the index of the leftmost node (
          <code>mmin = q.peek().num</code>) and subtract it from every index on that level. The{' '}
          <em>differences</em> are what matter, and after normalisation every level restarts from 0, so indices
          never exceed the width of the tree. This is the line commented{' '}
          <code>//to make the id starting from zero</code> in your notes.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    TreeNode node;
    int num;                                   // virtual index of this node in its level

    Pair(TreeNode _node, int _num) {
        num  = _num;
        node = _node;
    }
}

class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;

        int ans = 0;
        Queue<Pair> q = new LinkedList<>();
        q.offer(new Pair(root, 0));

        while (!q.isEmpty()) {
            int size = q.size();
            int mmin = q.peek().num;           // to make the id starting from zero
            int first = 0, last = 0;

            for (int i = 0; i < size; i++) {
                int cur_id    = q.peek().num - mmin;     // normalised index
                TreeNode node = q.peek().node;
                q.poll();

                if (i == 0)        first = cur_id;       // leftmost on this level
                if (i == size - 1) last  = cur_id;       // rightmost on this level

                if (node.left != null)
                    q.offer(new Pair(node.left,  cur_id * 2 + 1));
                if (node.right != null)
                    q.offer(new Pair(node.right, cur_id * 2 + 2));
            }
            ans = Math.max(ans, last - first + 1);
        }
        return ans;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — a sparse level</h3></div>
      <pre className="diagram">{
`                    (1)                  index 0
                   /   \\
                 (3)   (2)               index 1, 2
                 /       \\
               (5)       (9)             index 3, 6
               /           \\
             (6)           (7)           index 7, 14

 level 0 : mmin=0   ids [0]              width = 0-0+1 = 1
 level 1 : mmin=1   ids [0, 1]           width = 1-0+1 = 2
 level 2 : mmin=3   ids [0, 3]           width = 3-0+1 = 4
           (5 -> 3-3 = 0,  9 -> 6-3 = 3)
 level 3 : mmin=7   ids [0, 7]           width = 7-0+1 = 8
           (6 -> 7-7 = 0,  7 -> 14-7 = 7)

 answer = 8`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">Standard BFS, constant work per node.</CxBox>
        <CxBox label="Space" value="O(w)">
          One level of <code>Pair</code> objects in the queue.
        </CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Overflow is still possible without normalisation</div>
        Normalising per level is not cosmetic — it is what keeps <code>cur_id * 2 + 2</code> inside{' '}
        <code>int</code>. On a left-skewed tree of depth 32 the un-normalised right-child index would already wrap
        negative and silently corrupt the answer. If you write this from memory, do not skip the{' '}
        <code>mmin</code> subtraction. Some editorial solutions instead widen the index to <code>long</code>;
        normalising is strictly better because it bounds the value rather than just delaying the overflow.
      </div>

      {/* 5.4 */}
      <div id="s5-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">GFG / Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Two-pass: down then up</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Modify the tree so that for every node,{' '}
          <code>node.val == left.val + right.val</code> (a missing child counts as 0). You may only{' '}
          <strong>increment</strong> node values — and the structure must not change. Leaves are exempt.
        </p>
        <p>
          <strong>Why this is genuinely hard.</strong> A single pass cannot work. If a parent is larger than the sum
          of its children, you must push the surplus <em>down</em>. If it is smaller, you must pull the
          children&apos;s sum <em>up</em>. Those requirements point in opposite directions, so the algorithm needs
          both a downward and an upward phase.
        </p>
        <ol className="steps">
          <li>
            <strong>Going down (preorder).</strong> Compute <code>child = left.val + right.val</code>.
            <ul>
              <li>
                If <code>child ≥ root.val</code>, the children already carry enough — raise the parent to match:{' '}
                <code>root.val = child</code>.
              </li>
              <li>
                If <code>child &lt; root.val</code>, the parent is too big — copy the parent&apos;s value into{' '}
                <em>each</em> existing child. Over-assigning is fine because the upward pass will correct it, and
                since we only ever increase values the &quot;increment only&quot; rule holds.
              </li>
            </ul>
          </li>
          <li>
            <strong>Recurse</strong> into both subtrees, which repeats the fix all the way down to the leaves.
          </li>
          <li>
            <strong>Coming back up (postorder).</strong> Recompute <code>tot = left.val + right.val</code> and
            assign it to the node — but <strong>only if the node has at least one child</strong>. This is what
            repairs the deliberate over-assignment from step 1, and the guard is what protects the leaves from
            being zeroed.
          </li>
        </ol>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why over-assigning downward is safe</div>
          Pushing the parent&apos;s whole value into both children temporarily makes the tree wrong in the{' '}
          <em>other</em> direction (children too large). But wrong-because-too-large is exactly the case the upward
          pass fixes: it sets each parent to the true sum of its (now final) children. Because the upward pass runs
          strictly after the whole subtree is settled, the result is consistent everywhere.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public static void changeTree(TreeNode root) {
        if (root == null) return;

        int child = 0;
        if (root.left != null) {
            child += root.left.val;
        }
        if (root.right != null) {
            child += root.right.val;
        }

        // ── DOWNWARD phase ──
        if (child >= root.val) {
            root.val = child;                          // children are enough: lift the parent
        }
        else {
            if (root.left != null) root.left.val = root.val;        // push the parent down
            else if (root.right != null) root.right.val = root.val;
        }

        changeTree(root.left);
        changeTree(root.right);

        // ── UPWARD phase ──
        int tot = 0;
        if (root.left  != null) tot += root.left.val;
        if (root.right != null) tot += root.right.val;
        if (root.left != null || root.right != null) root.val = tot;   // skip leaves
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Two details in this code worth reading twice</div>
        <ul>
          <li>
            <strong><code>else if</code> in the downward phase.</strong> When the parent is larger, the value is
            written to the left child <em>if it exists</em>, otherwise to the right. It is not written to both. The
            upward pass then rebuilds the parent from whatever the children ended up as, so this asymmetry is
            harmless — but writing <code>if</code> / <code>if</code> instead of <code>if</code> /{' '}
            <code>else if</code> would double the value and still be &quot;correct&quot; by the problem&apos;s
            rules, just with unnecessarily inflated numbers.
          </li>
          <li>
            <strong>The leaf guard on the last line.</strong> Without{' '}
            <code>if (root.left != null || root.right != null)</code>, every leaf would be assigned{' '}
            <code>tot = 0</code>, wiping the tree&apos;s actual data. This one condition is the difference between a
            correct solution and an all-zero tree.
          </li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` start                 down: 2+3=5 < 50, so push 50 into the left child
       (50)                  (50)                (50)
      /    \\      --->      /    \\     --->     /    \\
    (2)    (3)           (50)    (3)         (50)    (3)
                          (left child overwritten; right untouched)

 recurse into 50 (a leaf now) -> nothing changes
 recurse into 3  (a leaf)     -> nothing changes

 up:   tot = 50 + 3 = 53, root has children -> root.val = 53

 final          (53)
               /    \\
            (50)    (3)          50 + 3 = 53   ✓ property holds`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One traversal doing constant work on the way down and on the way up.
        </CxBox>
        <CxBox label="Space" value="O(h)">Recursion stack; the tree is modified in place.</CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 Do not confuse this with &quot;check the children sum property&quot;</div>
        The easy sibling problem only <em>verifies</em> the property and is a three-line postorder check. This one{' '}
        <em>enforces</em> it by rewriting values, which is why it needs the two-phase structure.
      </div>

      {/* 5.5 */}
      <div id="s5-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 863</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Parent map + BFS</span>
        <span className="pill">Tree as undirected graph</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a target node, return every node exactly <code>k</code> edges away — in{' '}
          <em>any</em> direction, including upward through the target&apos;s ancestors and back down other branches.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The single idea you need</div>
          A tree&apos;s <code>left</code>/<code>right</code> pointers only go downward, so &quot;distance{' '}
          <code>k</code> in any direction&quot; is impossible to express directly. <strong>Turn the tree into an
          undirected graph</strong> by recording each node&apos;s parent in a{' '}
          <code>Map&lt;TreeNode, TreeNode&gt;</code>. Now every node has up to three neighbours —{' '}
          <code>left</code>, <code>right</code> and <code>parent</code> — and the problem becomes a plain BFS from
          the target, stopping after <code>k</code> levels.
          <br /><br />
          And once you have neighbours in a graph, you need a <code>visited</code> set: without it BFS would walk
          from a node to its parent and immediately back down again, forever.
        </div>
        <ol className="steps">
          <li>
            <strong>First BFS</strong> — walk the whole tree and fill{' '}
            <code>parent_track.put(child, parent)</code> for every node.
          </li>
          <li>
            <strong>Second BFS</strong> — start from <code>target</code>, mark it visited, and expand level by
            level. Each node&apos;s neighbours are its left child, its right child and its parent, each added only
            if not already visited.
          </li>
          <li>
            Track <code>curr_level</code>. As soon as it reaches <code>k</code>, <code>break</code> out — the queue
            then holds exactly the nodes at distance <code>k</code>.
          </li>
          <li>Drain the queue into the result.</li>
        </ol>
        <p>
          The <code>break</code> placement is subtle and elegant: it fires <em>before</em> expanding the{' '}
          <code>k</code>-th level, leaving that level sitting untouched in the queue. The final drain loop is
          therefore the answer, with no extra bookkeeping.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private void markParents(TreeNode root, Map<TreeNode, TreeNode> parent_track, TreeNode target) {
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            if (current.left != null) {
                parent_track.put(current.left, current);      // remember who my parent is
                queue.offer(current.left);
            }
            if (current.right != null) {
                parent_track.put(current.right, current);
                queue.offer(current.right);
            }
        }
    }

    public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
        Map<TreeNode, TreeNode> parent_track = new HashMap<>();
        markParents(root, parent_track, root);

        Map<TreeNode, Boolean> visited = new HashMap<>();
        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.offer(target);
        visited.put(target, true);
        int curr_level = 0;

        while (!queue.isEmpty()) {  /* Second BFS to go upto K level from target node
                                       and using our hashtable info */
            int size = queue.size();
            if (curr_level == k) break;          // the queue now holds exactly level k
            curr_level++;

            for (int i = 0; i < size; i++) {
                TreeNode current = queue.poll();

                if (current.left != null && visited.get(current.left) == null) {
                    queue.offer(current.left);
                    visited.put(current.left, true);
                }
                if (current.right != null && visited.get(current.right) == null) {
                    queue.offer(current.right);
                    visited.put(current.right, true);
                }
                if (parent_track.get(current) != null
                        && visited.get(parent_track.get(current)) == null) {
                    queue.offer(parent_track.get(current));      // walk UPWARD
                    visited.put(parent_track.get(current), true);
                }
            }
        }

        List<Integer> result = new ArrayList<>();
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            result.add(current.val);
        }
        return result;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                       (3)              target = 5,  k = 2
                    /       \\
                 (5)         (1)
                /   \\       /   \\
             (6)    (2)   (0)   (8)
                    /  \\
                 (7)   (4)

 parent map: 5->3, 1->3, 6->5, 2->5, 7->2, 4->2, 0->1, 8->1

 start   : queue = [5]                       visited = {5}
 iter 1  : curr_level = 0, not k -> becomes 1
           expand 5 -> children 6, 2 and parent 3
           queue = [6, 2, 3]                 visited = {5,6,2,3}
 iter 2  : curr_level = 1, not k -> becomes 2
           expand 6 -> nothing new (parent 5 already visited)
           expand 2 -> children 7, 4
           expand 3 -> child 1 (left child 5 visited, no parent)
           queue = [7, 4, 1]                 visited = {5,6,2,3,7,4,1}
 iter 3  : curr_level == k -> BREAK before expanding
           queue still = [7, 4, 1]

 answer = [7, 4, 1]     6, 2 and 3 are at distance 1; 0 and 8 at distance 3`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">Two BFS passes, each visiting every node at most once.</CxBox>
        <CxBox label="Space" value="O(n)">
          Parent map and visited map both hold up to <code>n</code> entries.
        </CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 Style notes on this code</div>
        <ul>
          <li>
            <code>Map&lt;TreeNode, Boolean&gt; visited</code> with <code>visited.get(x) == null</code> tests is
            doing the job of a <code>Set</code>.{' '}
            <code>Set&lt;TreeNode&gt; visited = new HashSet&lt;&gt;()</code> with{' '}
            <code>!visited.contains(x)</code> is clearer — and <code>visited.add(x)</code> returns{' '}
            <code>false</code> if it was already there, collapsing check-and-mark into one call.
          </li>
          <li>
            <code>markParents</code> takes a <code>target</code> parameter it never uses — harmless leftover, safe
            to delete.
          </li>
          <li>
            <code>int size = queue.size()</code> is read before the <code>break</code> check, so on the breaking
            iteration it is computed and discarded. Cosmetic only.
          </li>
          <li>
            <code>HashMap</code> here keys on <code>TreeNode</code> <em>identity</em>, since <code>TreeNode</code>{' '}
            does not override <code>equals</code>/<code>hashCode</code>. That is exactly what we want — two
            distinct nodes holding the same value must stay distinct.
          </li>
        </ul>
      </div>

      {/* 5.6 */}
      <div id="s5-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">GFG / Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Same engine as 5.5</span>
        <span className="pill">Multi-source spread</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A fire starts at a given node. Every second it spreads from each burning node to
          all of its adjacent nodes — left child, right child <em>and</em> parent. How many seconds until the whole
          tree is burnt?
        </p>
        <p>
          <strong>Intuition.</strong> This is 5.5 without the cap. Instead of stopping at level <code>k</code>, run
          the BFS to exhaustion and <strong>count how many levels it took</strong>. Each BFS level is one second of
          spreading, so the answer is the number of levels beyond the starting node — equivalently, the maximum
          distance from the start node to any other node.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why the answer is &quot;levels − 1&quot;, and how <code>fl</code> encodes it</div>
          If the fire reaches everything in <code>L</code> BFS levels including the start, the elapsed time is{' '}
          <code>L - 1</code> seconds — the start node burns at time 0. The code implements this with a flag:{' '}
          <code>fl</code> is set to 1 only if the current level actually managed to ignite at least one new node,
          and <code>maxi++</code> happens only when <code>fl == 1</code>. The final level, which spreads to
          nothing, leaves <code>fl == 0</code> and does not increment the counter. That is a neat way to get the
          off-by-one right without a separate check.
        </div>
        <ol className="steps">
          <li>
            <strong><code>bfsToMapParents</code></strong> — one BFS that fills the parent map <em>and</em> returns a
            reference to the node whose value equals <code>start</code>. Doing both in one pass saves a traversal.
          </li>
          <li>
            <strong><code>findMaxDistance</code></strong> — BFS from that node over the three-neighbour graph,
            counting levels that ignited something new.
          </li>
        </ol>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {

    public int timeToBurnTree(TreeNode root, int start) {
        if (root == null) return 0;

        HashMap<TreeNode, TreeNode> mpp = new HashMap<>();      // child -> parent
        TreeNode target = bfsToMapParents(root, mpp, start);
        if (target == null) return -1;                          // \`start\` is not in the tree

        int maxi = findMaxDistance(mpp, target);
        return maxi;
    }

    // ── Pass 1: build the parent map AND locate the ignition point ──
    private TreeNode bfsToMapParents(TreeNode root,
                                     HashMap<TreeNode, TreeNode> mpp,
                                     int start) {

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        TreeNode res = null;

        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node.val == start) res = node;             // remember the ignition point

            if (node.left != null) {
                mpp.put(node.left, node);                  // child -> parent
                q.offer(node.left);
            }
            if (node.right != null) {
                mpp.put(node.right, node);
                q.offer(node.right);
            }
        }
        return res;
    }

    // ── Pass 2: spread the fire outward, counting the seconds ──
    private int findMaxDistance(HashMap<TreeNode, TreeNode> mpp, TreeNode target) {

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(target);
        HashMap<TreeNode, Integer> vis = new HashMap<>();
        vis.put(target, 1);
        int maxi = 0;

        while (!q.isEmpty()) {
            int sz = q.size();
            int fl = 0;                                    // did this second ignite anything?

            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();

                if (node.left != null && vis.get(node.left) == null) {
                    fl = 1;
                    vis.put(node.left, 1);
                    q.offer(node.left);
                }
                if (node.right != null && vis.get(node.right) == null) {
                    fl = 1;
                    vis.put(node.right, 1);
                    q.offer(node.right);
                }
                if (mpp.get(node) != null && vis.get(mpp.get(node)) == null) {
                    fl = 1;
                    vis.put(mpp.get(node), 1);
                    q.offer(mpp.get(node));                // the fire climbs to the parent
                }
            }
            if (fl == 1) maxi++;                           // one more second elapsed
        }
        return maxi;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                       (1)              start = 5
                    /       \\
                 (2)         (3)
                /   \\           \\
             (4)    (5)         (6)
                                  \\
                                  (7)

 parent map: 2->1, 3->1, 4->2, 5->2, 6->3, 7->6

 second 0 : queue=[5]        vis={5}
 second 1 : expand 5 -> parent 2                   fl=1  maxi=1  queue=[2]
 second 2 : expand 2 -> child 4, parent 1          fl=1  maxi=2  queue=[4,1]
 second 3 : expand 4 -> nothing new
                     1 -> child 3                  fl=1  maxi=3  queue=[3]
 second 4 : expand 3 -> child 6                    fl=1  maxi=4  queue=[6]
 second 5 : expand 6 -> child 7                    fl=1  maxi=5  queue=[7]
 second 6 : expand 7 -> nothing new                fl=0  maxi stays 5   queue=[]

 answer = 5 seconds`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Two BFS passes over <code>n</code> nodes.
        </CxBox>
        <CxBox label="Space" value="O(n)">Parent map, visited map and queue.</CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 Two changes from the version in your notes</div>
        <ul>
          <li>
            <strong>Node type.</strong> Your screenshot uses the Coding Ninjas class{' '}
            <code>BinaryTreeNode&lt;Integer&gt;</code> with a field <code>data</code>; the code above uses{' '}
            <code>TreeNode</code> with <code>val</code> so it matches every other solution in these notes (see
            1.3). Worth knowing what the generic version costs you: <code>node.data == start</code> compares a
            boxed <code>Integer</code> with an <code>int</code>, so Java <em>unboxes</em> <code>data</code> and the
            comparison is numeric — correct, but only by luck of the operand types. Had both sides been{' '}
            <code>Integer</code>, <code>==</code> would compare <strong>references</strong> and silently fail for
            values outside the −128…127 cache range. With <code>TreeNode.val</code> being a plain <code>int</code>,
            the whole hazard disappears.
          </li>
          <li>
            <strong>The not-found case.</strong> The original returns{' '}
            <code>new BinaryTreeNode&lt;&gt;(-1)</code> as its fallback, so a <code>start</code> value that is not
            in the tree yields a detached dummy node and the burn BFS quietly reports <code>0</code> — a wrong
            answer that looks like a real one. Returning <code>null</code> and checking it in{' '}
            <code>timeToBurnTree</code> surfaces the bad input instead of hiding it. Without that guard the{' '}
            <code>null</code> target would NPE inside <code>findMaxDistance</code>, which is why the two lines go
            together.
          </li>
        </ul>
      </div>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The pattern behind 5.5 and 5.6</div>
        <strong>Parent map + BFS + visited set</strong> is the answer to every &quot;distance in the tree ignoring
        direction&quot; question: nodes at distance K, time to burn, amount of time to infect all nodes (LeetCode
        2385), distance between two nodes. The moment a problem lets you move <em>upward</em>, stop thinking
        &quot;tree&quot; and start thinking &quot;undirected graph&quot;.
      </div>

      {/* 6.1 */}
      <div id="s6-1" data-topic-boundary="true" />
      <p className="part-subtitle">
        Where Parts 1–5 <em>walked</em> an existing tree, this part <strong>builds</strong> one, exploits a
        structural guarantee to beat <code>O(n)</code>, and finally learns to traverse with no stack at all.
        Everything here still rests on the master template from 1.1 — the combine step just got more interesting.
      </p>
      <div className="callout callout-key">
        <div className="callout-title">🔑 The three new ideas in this part</div>
        <ol>
          <li>
            <strong>A structural guarantee is a shortcut.</strong> &quot;Complete&quot; lets 6.1 answer in{' '}
            <code>O(log² n)</code> instead of <code>O(n)</code>, because whole perfect subtrees can be counted with
            a formula rather than walked.
          </li>
          <li>
            <strong>Two traversals pin a tree down.</strong> Preorder (or postorder) names the root; inorder says
            where the split is. 6.2, 6.3, 6.4 and 8.4 are four faces of that one fact.
          </li>
          <li>
            <strong>Null pointers are free storage.</strong> A leaf&apos;s unused <code>right</code> field can hold
            a temporary &quot;thread&quot; back up the tree, which is how Morris traversal (6.5, 6.6) reaches{' '}
            <code>O(1)</code> space and how 6.7 flattens in place.
          </li>
        </ol>
      </div>

      <div className="meta-row">
        <span className="pill">LeetCode 222</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Exploit &quot;complete&quot;</span>
        <span className="pill">O(log² n)</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given the root of a <strong>complete</strong> binary tree, return the number of
          nodes. The judge explicitly asks for better than <code>O(n)</code> — otherwise the problem is a one-liner.
        </p>
        <Code>{
`// The O(n) answer that the problem is trying to rule out:
public int countNodes(TreeNode root) {
    if (root == null) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}`
        }</Code>
        <p>
          <strong>The guarantee we are handed.</strong> Recall 1.2: a complete tree is filled level by level, left
          to right, with gaps allowed only at the far right of the last level. That has a powerful consequence —
          walk down the extreme left edge and down the extreme right edge of <em>any</em> subtree:
        </p>
        <ul>
          <li>
            If the two depths are <strong>equal</strong>, that subtree has no gap anywhere, i.e. it is{' '}
            <strong>perfect</strong>. A perfect subtree of height <code>h</code> (in edges) has exactly{' '}
            <code>2<sup>h+1</sup> - 1</code> nodes — the formula from the table in 1.2. No walking needed.
          </li>
          <li>
            If they <strong>differ</strong>, the gap is somewhere inside, so fall back to{' '}
            <code>1 + count(left) + count(right)</code> and let the children sort it out.
          </li>
        </ul>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why this is fast, not just clever</div>
          The recursion only descends along the <strong>single boundary path</strong> where the tree stops being
          perfect. At every node on that path, exactly one child is perfect (answered by formula, no recursion) and
          the other is recursed into. So there are <code>O(log n)</code> recursive calls, each doing two{' '}
          <code>O(log n)</code> height walks → <code>O(log² n)</code> total. Formally{' '}
          <code>T(n) = T(n/2) + O(log n)</code>.
          <br /><br />
          For <code>n = 10⁹</code> that is roughly <code>30 × 30 = 900</code> steps instead of a million. It is one
          of the few places in tree problems where you legitimately beat <code>O(n)</code>.
        </div>
        <ol className="steps">
          <li><code>null</code> → return 0.</li>
          <li><code>left = </code> number of edges walking <code>root.left.left.left…</code></li>
          <li><code>right = </code> number of edges walking <code>root.right.right.right…</code></li>
          <li>
            <code>left == right</code> → perfect subtree → return <code>2<sup>left+1</sup> - 1</code>.
          </li>
          <li>Otherwise recurse into both children and add 1 for the current node.</li>
        </ol>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public int countNodes(TreeNode root) {
        if (root == null) return 0;

        int left  = getHeightLeft(root);
        int right = getHeightRight(root);

        // If left and right are equal it means that the tree is complete
        // (perfect, in fact) and hence we can use the 2^(h+1) - 1 formula
        if (left == right) return ((2 << (left)) - 1);

        // else recursively calculate the number of nodes in left and right
        // and add 1 for the current node
        else return countNodes(root.left) + countNodes(root.right) + 1;
    }

    public int getHeightLeft(TreeNode root) {
        int count = 0;
        while (root.left != null) {
            count++;
            root = root.left;
        }
        return count;
    }

    public int getHeightRight(TreeNode root) {
        int count = 0;
        while (root.right != null) {
            count++;
            root = root.right;
        }
        return count;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Decoding <code>(2 &lt;&lt; left) - 1</code></div>
        This is the one line people misread. <code>1 &lt;&lt; k</code> is <code>2<sup>k</sup></code>, so{' '}
        <code>2 &lt;&lt; k</code> is <code>2<sup>k+1</sup></code>. Here <code>left</code> is a count of{' '}
        <strong>edges</strong>, so the subtree has <code>left + 1</code> levels and{' '}
        <code>2<sup>left+1</sup> - 1</code> nodes — exactly what <code>(2 &lt;&lt; left) - 1</code> evaluates to.
        Writing <code>(1 &lt;&lt; left) - 1</code> or <code>(2 &lt;&lt; left) - 2</code> are the two classic
        off-by-one bugs here.
        <Code>{
`left = 0  ->  (2 << 0) - 1 = 2 - 1  = 1      // a single node
left = 1  ->  (2 << 1) - 1 = 4 - 1  = 3      // root + 2 children
left = 2  ->  (2 << 2) - 1 = 8 - 1  = 7      // perfect tree of height 2`
        }</Code>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
            /  \\   /
          (4)  (5)(6)          complete: last level packed to the left

 countNodes(1)
   getHeightLeft(1)  : 1 -> 2 -> 4        = 2 edges
   getHeightRight(1) : 1 -> 3             = 1 edge     (3.right is null)
   2 != 1  -> not perfect, so recurse into both children

   countNodes(2)
     left  : 2 -> 4 = 1
     right : 2 -> 5 = 1
     EQUAL -> perfect -> (2 << 1) - 1 = 3      <-- 3 nodes counted with NO recursion

   countNodes(3)
     left  : 3 -> 6 = 1
     right : 3       = 0
     1 != 0 -> recurse
       countNodes(6) : left=0, right=0 -> EQUAL -> (2 << 0) - 1 = 1
       countNodes(null) = 0
     -> 1 + 0 + 1 = 2

 total = 3 + 2 + 1 = 6      ✓   (node 2's whole subtree was never walked)`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(log² n)">
          <code>O(log n)</code> recursive calls × <code>O(log n)</code> per height walk.
        </CxBox>
        <CxBox label="Space" value="O(log n)">
          Recursion stack, which for a complete tree <em>is</em> the height.
        </CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The interview follow-up</div>
        &quot;Can you do it without recursion?&quot; — yes: compute the height <code>h</code> once, then{' '}
        <strong>binary search</strong> over the <code>2<sup>h</sup></code> possible positions of the last level,
        testing whether leaf number <code>mid</code> exists by walking down using the bits of <code>mid</code> as
        left/right instructions (the <code>2i+1 / 2i+2</code> indexing from 1.3 read backwards). Same{' '}
        <code>O(log² n)</code>, <code>O(1)</code> space. Mention it; the recursive version is what you should
        actually write.
      </div>

      {/* 6.2 */}
      <div id="s6-2" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 105</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Divide &amp; conquer</span>
        <span className="pill">HashMap for O(1) lookup</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given <code>preorder</code> and <code>inorder</code> traversals of a binary tree
          with <strong>unique</strong> values, rebuild the tree.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The two facts that make this work</div>
          <ol>
            <li>
              <strong>Preorder gives you the root.</strong> Preorder is <code>Root → Left → Right</code>, so{' '}
              <code>preorder[preStart]</code> is <em>always</em> the root of the current subtree.
            </li>
            <li>
              <strong>Inorder gives you the split.</strong> Inorder is <code>Left → Root → Right</code>, so once you
              find the root&apos;s position <code>inRoot</code> inside the inorder window, everything to its left
              belongs to the left subtree and everything to its right belongs to the right subtree.
            </li>
          </ol>
          Together they let you slice both arrays into matching left/right halves and recurse. Neither traversal
          alone is enough — preorder alone has <code>2<sup>n</sup></code>-ish possible shapes.
        </div>
        <p>
          <strong>The bookkeeping.</strong> The only hard part is computing the four new index ranges. Let{' '}
          <code>numsLeft = inRoot - inStart</code> — the number of nodes in the left subtree. Then:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Call</th><th>Preorder window</th><th>Inorder window</th><th>Reading</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>left</strong></td>
                <td><code>preStart + 1 … preStart + numsLeft</code></td>
                <td><code>inStart … inRoot - 1</code></td>
                <td>skip the root, take the next <code>numsLeft</code> values</td>
              </tr>
              <tr>
                <td><strong>right</strong></td>
                <td><code>preStart + numsLeft + 1 … preEnd</code></td>
                <td><code>inRoot + 1 … inEnd</code></td>
                <td>everything after the left block</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Why the HashMap.</strong> Scanning the inorder array for the root each time costs{' '}
          <code>O(n)</code> per node → <code>O(n²)</code>. Pre-indexing <code>value → index</code> once turns that
          lookup into <code>O(1)</code> and the whole algorithm into <code>O(n)</code>. This is the single most
          important optimisation in the problem.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        Map<Integer, Integer> inMap = new HashMap<Integer, Integer>();

        for (int i = 0; i < inorder.length; i++) {     // value -> index, once
            inMap.put(inorder[i], i);
        }

        TreeNode root = buildTree(preorder, 0, preorder.length - 1,
                                  inorder,  0, inorder.length  - 1, inMap);
        return root;
    }

    public TreeNode buildTree(int[] preorder, int preStart, int preEnd,
                              int[] inorder,  int inStart,  int inEnd,
                              Map<Integer, Integer> inMap) {

        if (preStart > preEnd || inStart > inEnd) return null;   // empty window

        TreeNode root = new TreeNode(preorder[preStart]);        // FIRST of preorder

        int inRoot   = inMap.get(root.val);                      // where it sits in inorder
        int numsLeft = inRoot - inStart;                         // size of the left subtree

        root.left  = buildTree(preorder, preStart + 1, preStart + numsLeft,
                               inorder,  inStart, inRoot - 1, inMap);

        root.right = buildTree(preorder, preStart + numsLeft + 1, preEnd,
                               inorder,  inRoot + 1, inEnd, inMap);

        return root;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` preorder = [3, 9, 20, 15, 7]
 inorder  = [9, 3, 15, 20, 7]
 inMap    = {9:0, 3:1, 15:2, 20:3, 7:4}

 build(pre 0..4, in 0..4)
   root = pre[0] = 3     inRoot = 1     numsLeft = 1 - 0 = 1
   left  -> build(pre 1..1, in 0..0)
              root = pre[1] = 9   inRoot = 0   numsLeft = 0
              left  -> build(pre 2..1, ...) -> preStart > preEnd -> null
              right -> build(pre 2..1, ...) -> null
              => leaf 9
   right -> build(pre 2..4, in 2..4)
              root = pre[2] = 20  inRoot = 3   numsLeft = 3 - 2 = 1
              left  -> build(pre 3..3, in 2..2) => leaf 15
              right -> build(pre 4..4, in 4..4) => leaf 7

 result:        (3)
               /   \\
             (9)   (20)
                   /   \\
                 (15)  (7)`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One node created per call, <code>O(1)</code> map lookup each. Without the map: <code>O(n²)</code>.
        </CxBox>
        <CxBox label="Space" value="O(n)">
          <code>O(n)</code> for the map plus <code>O(h)</code> recursion stack.
        </CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Three traps in this problem</div>
        <ul>
          <li>
            <strong>Duplicates break it.</strong> <code>inMap</code> maps a value to <em>one</em> index, so a
            repeated value silently picks the wrong split. The problem guarantees uniqueness for exactly this
            reason — if an interviewer removes that guarantee, the answer is &quot;the tree is no longer uniquely
            determined&quot;.
          </li>
          <li>
            <strong><code>numsLeft</code> is measured in the inorder array</strong> (
            <code>inRoot - inStart</code>), then <em>applied</em> to the preorder array. Mixing up which array each
            index belongs to is the most common bug; keep the <code>pre</code>/<code>in</code> prefixes on every
            variable name.
          </li>
          <li>
            <strong>Preorder + postorder is not enough.</strong> Those two cannot distinguish a left-only child
            from a right-only child, so no unique tree exists. <em>Inorder must be one of the two.</em>
          </li>
        </ul>
      </div>

      {/* 6.3 */}
      <div id="s6-3" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 106</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Same idea, mirrored</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Same as 6.2, but you are given <code>inorder</code> and <code>postorder</code>.
        </p>
        <p>
          <strong>The one change.</strong> Postorder is <code>Left → Right → Root</code>, so the root is the{' '}
          <strong>last</strong> element of the window, <code>postorder[pe]</code>, rather than the first. Everything
          else — the inorder split, <code>numsLeft</code>, the HashMap — is identical.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Call</th><th>Inorder window</th><th>Postorder window</th></tr></thead>
            <tbody>
              <tr>
                <td><strong>left</strong></td>
                <td><code>is … inRoot - 1</code></td>
                <td><code>ps … ps + numsLeft - 1</code></td>
              </tr>
              <tr>
                <td><strong>right</strong></td>
                <td><code>inRoot + 1 … ie</code></td>
                <td><code>ps + numsLeft … pe - 1</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Note <code>pe - 1</code> on the right call: the root has been consumed off the <em>end</em>, so it must be
          excluded from the right window — the mirror of the <code>preStart + 1</code> in 6.2.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        if (inorder == null || postorder == null || inorder.length != postorder.length)
            return null;

        HashMap<Integer, Integer> hm = new HashMap<Integer, Integer>();

        for (int i = 0; i < inorder.length; ++i)
            hm.put(inorder[i], i);

        return buildTreePostIn(inorder, 0, inorder.length - 1,
                               postorder, 0, postorder.length - 1, hm);
    }

    private TreeNode buildTreePostIn(int[] inorder,   int is, int ie,
                                     int[] postorder, int ps, int pe,
                                     HashMap<Integer, Integer> hm) {

        if (ps > pe || is > ie) return null;

        TreeNode root = new TreeNode(postorder[pe]);       // LAST of postorder

        int inRoot   = hm.get(postorder[pe]);
        int numsLeft = inRoot - is;

        root.left  = buildTreePostIn(inorder, is, inRoot - 1,
                                     postorder, ps, ps + numsLeft - 1, hm);

        root.right = buildTreePostIn(inorder, inRoot + 1, ie,
                                     postorder, ps + numsLeft, pe - 1, hm);

        return root;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
` inorder   = [9, 3, 15, 20, 7]
 postorder = [9, 15, 7, 20, 3]
 hm        = {9:0, 3:1, 15:2, 20:3, 7:4}

 build(in 0..4, post 0..4)
   root = post[4] = 3    inRoot = 1    numsLeft = 1 - 0 = 1
   left  -> build(in 0..0, post 0..0)      root = post[0] = 9  => leaf 9
   right -> build(in 2..4, post 1..3)
              root = post[3] = 20   inRoot = 3   numsLeft = 3 - 2 = 1
              left  -> build(in 2..2, post 1..1)  root = post[1] = 15 => leaf
              right -> build(in 4..4, post 2..2)  root = post[2] = 7  => leaf

 result:        (3)
               /   \\
             (9)   (20)
                   /   \\
                 (15)  (7)      ✓ same tree as 6.2, as it must be`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One call per node, <code>O(1)</code> lookup.
        </CxBox>
        <CxBox label="Space" value="O(n)">
          HashMap <code>O(n)</code> + recursion <code>O(h)</code>.
        </CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 A memory hook for the index algebra</div>
        Don&apos;t memorise the four ranges — derive them. In <strong>both</strong> problems the left subtree has{' '}
        <code>numsLeft</code> nodes and they are <em>contiguous</em> in every traversal. So: chop the root off
        whichever end it lives at (front for preorder, back for postorder), then take the first{' '}
        <code>numsLeft</code> of what remains as the left block and the rest as the right block. Every index in
        both tables follows from that sentence.
      </div>

      {/* 6.4 */}
      <div id="s6-4" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 297</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">BFS + null markers</span>
        <span className="pill">Design question</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Design <code>serialize(TreeNode) → String</code> and{' '}
          <code>deserialize(String) → TreeNode</code> such that <code>deserialize(serialize(root))</code>{' '}
          reproduces the original tree. The format is entirely your choice — that is what makes it a design problem.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why one traversal is enough here (unlike 6.2)</div>
          6.2 needed <em>two</em> traversals because a plain traversal list is ambiguous. But that ambiguity comes
          entirely from <strong>not knowing where the nulls are</strong>. Write the nulls down explicitly and a
          single traversal becomes a complete description of the tree — shape and values. That is the whole trick:{' '}
          <code>&quot;n&quot;</code> is doing the work that a second array did in 6.2.
        </div>
        <p>
          <strong>The chosen format.</strong> Level-order (BFS), space separated, with <code>&quot;n&quot;</code>{' '}
          for a null child. Each non-null node <em>always</em> writes two children, so the stream is
          self-describing: read one value, then the next two entries are its children, and the queue keeps track of
          whose turn it is.
        </p>
        <ol className="steps">
          <li>
            <strong>Serialize:</strong> BFS from the root, but enqueue children <em>even when null</em>. On dequeue,
            a <code>null</code> appends <code>&quot;n &quot;</code> and <code>continue</code>s; a real node appends
            its value and enqueues both children.
          </li>
          <li>
            <strong>Deserialize:</strong> split on spaces. <code>values[0]</code> is the root. Then walk the array
            in <strong>pairs</strong>, popping one parent from the queue per pair and attaching the two entries as
            its left and right children (skipping <code>&quot;n&quot;</code>).
          </li>
        </ol>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "";
        Queue<TreeNode> q = new LinkedList<>();
        StringBuilder res = new StringBuilder();
        q.add(root);
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node == null) {
                res.append("n ");          // null marker, no children enqueued
                continue;
            }
            res.append(node.val + " ");
            q.add(node.left);              // nulls ARE enqueued on purpose
            q.add(node.right);
        }
        return res.toString();
    }

    public TreeNode deserialize(String data) {
        if (data == "") return null;
        Queue<TreeNode> q = new LinkedList<>();
        String[] values = data.split(" ");
        TreeNode root = new TreeNode(Integer.parseInt(values[0]));
        q.add(root);
        for (int i = 1; i < values.length; i++) {
            TreeNode parent = q.poll();                  // one parent per PAIR
            if (!values[i].equals("n")) {
                TreeNode left = new TreeNode(Integer.parseInt(values[i]));
                parent.left = left;
                q.add(left);
            }
            if (!values[++i].equals("n")) {              // ++i moves to the right child
                TreeNode right = new TreeNode(Integer.parseInt(values[i]));
                parent.right = right;
                q.add(right);
            }
        }
        return root;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Three things to know about this code before an interviewer asks</div>
        <ul>
          <li>
            <strong><code>data == &quot;&quot;</code> compares references, not contents.</strong> It happens to work
            on LeetCode because <code>serialize</code> returns the interned literal <code>&quot;&quot;</code> and
            the judge hands that same object back. Any other caller — a string read from a file or built with{' '}
            <code>StringBuilder</code> — would fail. Write <code>data.isEmpty()</code> (or{' '}
            <code>&quot;&quot;.equals(data)</code>) in real code.
          </li>
          <li>
            <strong>Only <code>LinkedList</code> survives here.</strong> The queue deliberately holds{' '}
            <code>null</code> elements, and <code>ArrayDeque</code> throws <code>NullPointerException</code> on{' '}
            <code>add(null)</code>. This is exactly the trap flagged back in 2.2 — here it is real, not
            hypothetical.
          </li>
          <li>
            <strong>The <code>++i</code> inside the loop condition is load-bearing.</strong> Each iteration
            consumes <em>two</em> array slots: <code>i</code> for the left child and <code>++i</code> for the
            right, then the <code>for</code>&apos;s own <code>i++</code> advances to the next pair. Change it to{' '}
            <code>i + 1</code> and the array pointer desynchronises immediately.
          </li>
        </ul>
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
                  /   \\
                (4)   (5)

 SERIALIZE
   q=[1]                    poll 1  -> "1 "        add 2, 3
   q=[2,3]                  poll 2  -> "1 2 "      add null, null
   q=[3,n,n]                poll 3  -> "1 2 3 "    add 4, 5
   q=[n,n,4,5]              poll n  -> "... n "
   q=[n,4,5]                poll n  -> "... n n "
   q=[4,5]                  poll 4  -> "4 "        add null, null
   q=[5,n,n]                poll 5  -> "5 "        add null, null
   q=[n,n,n,n]              four nulls -> "n n n n "

   result = "1 2 3 n n 4 5 n n n n "

 DESERIALIZE  values = [1, 2, 3, n, n, 4, 5, n, n, n, n]
   root = 1, q=[1]
   i=1  parent=1   left=values[1]=2  right=values[2]=3     q=[2,3]
   i=3  parent=2   left=values[3]=n  right=values[4]=n     q=[3]
   i=5  parent=3   left=values[5]=4  right=values[6]=5     q=[4,5]
   i=7  parent=4   n, n                                    q=[5]
   i=9  parent=5   n, n                                    q=[]

   ✓ tree rebuilt exactly`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">Both directions touch each node and each null marker once.</CxBox>
        <CxBox label="Space" value="O(n)">
          The string is <code>O(n)</code>; the queue is <code>O(w)</code>.
        </CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The DFS alternative — shorter, and often preferred</div>
        A preorder walk with the same null marker is about half the code and needs no queue. Serialising is a
        straight preorder; deserialising consumes the same stream in the same order, so the recursion rebuilds the
        tree without any index arithmetic:
        <Code>{
`public String serialize(TreeNode root) {
    StringBuilder sb = new StringBuilder();
    dfs(root, sb);
    return sb.toString();
}

private void dfs(TreeNode node, StringBuilder sb) {
    if (node == null) { sb.append("n "); return; }
    sb.append(node.val).append(' ');
    dfs(node.left,  sb);
    dfs(node.right, sb);
}

public TreeNode deserialize(String data) {
    Queue<String> tokens = new LinkedList<>(Arrays.asList(data.split(" ")));
    return build(tokens);
}

private TreeNode build(Queue<String> tokens) {
    String t = tokens.poll();
    if (t == null || t.equals("n")) return null;
    TreeNode node = new TreeNode(Integer.parseInt(t));
    node.left  = build(tokens);      // order of these two lines IS the format
    node.right = build(tokens);
    return node;
}`
        }</Code>
        Same <code>O(n)</code> time. BFS wins on a skewed tree (no <code>O(n)</code> recursion); DFS wins on
        clarity. Either answer is correct — say which trade-off you are making.
      </div>

      {/* 6.5 */}
      <div id="s6-5" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 94</span>
        <span className="pill pill-warn">Medium–Hard</span>
        <span className="pill">O(1) space</span>
        <span className="pill">Threaded binary tree</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Inorder traversal with <strong>no recursion and no stack</strong> —{' '}
          <code>O(1)</code> extra space. This is the technique that section 2.3 promised and deferred.
        </p>
        <p>
          <strong>Why a stack existed in the first place.</strong> The only reason 2.3 needed a stack was to
          remember <em>how to get back up</em> after finishing a left subtree. A tree has no parent pointers, so
          that return path has to be stored somewhere.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The insight: borrow the null pointers</div>
          In any binary tree with <code>n</code> nodes there are <code>n + 1</code> null child pointers sitting
          completely unused. Morris borrows them. Before descending into a left subtree, find that subtree&apos;s{' '}
          <strong>rightmost node</strong> — which is precisely the <em>inorder predecessor</em> of the current node
          — and point its idle <code>right</code> pointer back at the current node. That temporary link is called a{' '}
          <strong>thread</strong>.
          <br /><br />
          Now finishing the left subtree naturally walks you straight back to the parent, with no stack. On
          arriving back you recognise the thread (its <code>right</code> already points at you), remove it to
          restore the tree, print, and move right.
        </div>
        <pre className="diagram">{
` Threading node 1 (cur = 1):
   left subtree of 1 is {2, 4, 5}, its RIGHTMOST node is 5
   -> 5 is the inorder predecessor of 1
   -> set 5.right = 1                     (the "thread", drawn ....)

            (1)                             (1)
           /   \\            becomes        /   \\
         (2)   (3)                       (2)   (3)
        /   \\                           /   \\
      (4)   (5)                       (4)   (5)....> back up to (1)

 When the walk later reaches 5 and follows 5.right, it lands on 1 again.
 Seeing that 5.right == cur is the signal: "left subtree already done".`
        }</pre>
        <ol className="steps">
          <li><code>cur = root</code>. Loop while <code>cur != null</code>.</li>
          <li>
            <strong>No left child?</strong> Nothing is owed — print <code>cur</code> and move{' '}
            <code>cur = cur.right</code> (which may be a real child or a thread).
          </li>
          <li>
            <strong>Has a left child?</strong> Walk to the rightmost node of the left subtree, stopping early if you
            find a node already pointing at <code>cur</code>. Call it <code>prev</code>.
          </li>
          <li>
            <code>prev.right == null</code> → <strong>first visit</strong>. Create the thread (
            <code>prev.right = cur</code>) and dive left. Do <em>not</em> print.
          </li>
          <li>
            <code>prev.right == cur</code> → <strong>second visit</strong>, the left subtree is finished. Remove the
            thread (<code>prev.right = null</code>), print <code>cur</code>, and move right.
          </li>
        </ol>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> inorder = new ArrayList<>();
        TreeNode cur = root;

        while (cur != null) {

            if (cur.left == null) {                 // nothing owed on the left
                inorder.add(cur.val);               // so visit immediately ...
                cur = cur.right;                    // ... and go right (real child or thread)
            }
            else {
                TreeNode prev = cur.left;           // find the inorder predecessor
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;              // rightmost node of the left subtree
                }

                if (prev.right == null) {           // FIRST time here
                    prev.right = cur;               // create the thread
                    cur = cur.left;                 // dive left, do not print yet
                }
                else {                              // SECOND time here (prev.right == cur)
                    prev.right = null;              // undo the thread, restore the tree
                    inorder.add(cur.val);           // NOW print
                    cur = cur.right;                // and move on to the right subtree
                }
            }
        }
        return inorder;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
            /  \\
          (4)  (5)

 cur=1  left exists -> prev = rightmost of {2,4,5} = 5, 5.right == null
        -> THREAD 5.right = 1, cur = 2
 cur=2  left exists -> prev = rightmost of {4} = 4, 4.right == null
        -> THREAD 4.right = 2, cur = 4
 cur=4  left == null -> ADD 4, cur = 4.right = 2      (followed the thread)
 cur=2  left exists -> prev walk finds 4, and 4.right == 2 == cur
        -> UNTHREAD 4.right = null, ADD 2, cur = 5
 cur=5  left == null -> ADD 5, cur = 5.right = 1      (followed the thread)
 cur=1  left exists -> prev walk finds 5, and 5.right == 1 == cur
        -> UNTHREAD 5.right = null, ADD 1, cur = 3
 cur=3  left == null -> ADD 3, cur = null
 loop ends

 output = [4, 2, 5, 1, 3]      ✓  and the tree is back exactly as it started`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Looks like <code>O(n log n)</code> because of the inner <code>prev</code> walk, but every edge is
          traversed at most <strong>3</strong> times overall → <code>O(n)</code> amortised.
        </CxBox>
        <CxBox label="Space" value="O(1)">
          Two pointers. The output list is not counted as auxiliary space.
        </CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Morris mutates the tree while it runs</div>
        Between the <code>prev.right = cur</code> and the matching <code>prev.right = null</code>, the structure is
        temporarily <strong>not a tree</strong> — it contains a cycle. Consequences worth stating out loud in an
        interview:
        <ul>
          <li>It is <strong>not thread-safe</strong> and not safe for concurrent readers.</li>
          <li>It fails on an <strong>immutable</strong> tree.</li>
          <li>
            If you <code>break</code> out of the loop early (say, on finding a target), the threads you created are{' '}
            <strong>never removed</strong> and the tree stays corrupted. Always run the loop to completion, or
            unthread manually before leaving.
          </li>
        </ul>
      </div>

      {/* 6.6 */}
      <div id="s6-6" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 144</span>
        <span className="pill pill-warn">Medium–Hard</span>
        <span className="pill">One line moved</span>
      </div>
      <div className="card">
        <p><strong>Problem.</strong> Preorder traversal in <code>O(1)</code> space.</p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 One line moves — exactly like 2.1</div>
          In 2.1 the three recursive traversals differed only in where <code>list.add(...)</code> sat. Morris is
          the same story. Inorder prints on the <strong>second</strong> visit (when the thread is removed);
          preorder prints on the <strong>first</strong> visit (when the thread is created), because preorder wants
          the root before its left subtree.
          <Code>{
`if (prev.right == null) {
    prev.right = cur;
    preorder.add(cur.val);   // <-- MOVED HERE: print on the way DOWN
    cur = cur.left;
} else {
    prev.right = null;
    // no print here any more
    cur = cur.right;
}`
          }</Code>
          The <code>cur.left == null</code> branch still prints, because such a node is never threaded and would
          otherwise be missed entirely.
        </div>
        <p>
          Postorder has no equally simple Morris form — the usual route is Morris-preorder with the children
          mirrored, then reverse the output (the same reversal trick as 2.5).
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> preorder = new ArrayList<>();
        TreeNode cur = root;

        while (cur != null) {

            if (cur.left == null) {                 // no left subtree to defer
                preorder.add(cur.val);
                cur = cur.right;
            }
            else {
                TreeNode prev = cur.left;
                while (prev.right != null && prev.right != cur) {
                    prev = prev.right;
                }

                if (prev.right == null) {           // FIRST visit
                    prev.right = cur;               // thread
                    preorder.add(cur.val);          // ROOT BEFORE LEFT  <-- the only change
                    cur = cur.left;
                }
                else {                              // SECOND visit
                    prev.right = null;              // unthread only; already printed
                    cur = cur.right;
                }
            }
        }
        return preorder;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Return the list you actually filled</div>
        When you write this straight after the inorder version, the easy slip is to build{' '}
        <code>preorder</code> but leave the old <code>return inorder;</code> at the bottom. It compiles — both are{' '}
        <code>List&lt;Integer&gt;</code> — and quietly returns an empty list. Name the accumulator after the
        traversal and check the return statement matches it.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`                (1)
               /   \\
             (2)   (3)
            /  \\
          (4)  (5)

 cur=1  left exists, prev = 5, 5.right == null
        -> ADD 1, thread 5.right = 1, cur = 2
 cur=2  left exists, prev = 4, 4.right == null
        -> ADD 2, thread 4.right = 2, cur = 4
 cur=4  left == null -> ADD 4, cur = 4.right = 2   (thread)
 cur=2  prev = 4, 4.right == cur -> unthread, NO print, cur = 5
 cur=5  left == null -> ADD 5, cur = 5.right = 1   (thread)
 cur=1  prev = 5, 5.right == cur -> unthread, NO print, cur = 3
 cur=3  left == null -> ADD 3, cur = null

 output = [1, 2, 4, 5, 3]      ✓  root before children, everywhere`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">Amortised, same argument as 6.5.</CxBox>
        <CxBox label="Space" value="O(1)">No stack, no recursion.</CxBox>
      </Cx>

      <div className="callout callout-tip">
        <div className="callout-title">💡 When Morris is actually the right answer</div>
        Rarely, and that is fine — know it for three specific situations: (1) the interviewer explicitly says
        &quot;<code>O(1)</code> space&quot;; (2) the tree is enormous and skewed, so an <code>O(n)</code> stack is a
        real memory problem; (3) you need an in-place structural rewrite, which is exactly what 6.7 does next. For
        everyday traversal, the stack version in 2.3 is clearer and just as fast.
      </div>

      {/* 6.7 */}
      <div id="s6-7" data-topic-boundary="true" />
      <div className="meta-row">
        <span className="pill">LeetCode 114</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Reverse postorder</span>
        <span className="pill">In-place rewrite</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Rearrange the tree in place into a &quot;linked list&quot;: every node&apos;s{' '}
          <code>left</code> must be <code>null</code> and every node&apos;s <code>right</code> must point to the
          next node in <strong>preorder</strong>.
        </p>
        <pre className="diagram">{
`        BEFORE                      AFTER

          (1)                    (1)
         /   \\                     \\
       (2)   (5)                   (2)
      /  \\      \\                    \\
    (3) (4)     (6)                  (3)
                                       \\
                                       (4)
 preorder = 1 2 3 4 5 6                  \\
                                         (5)
                                           \\
                                           (6)
 every .left = null, .right = next in preorder`
        }</pre>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why you must build it backwards</div>
          The obvious plan — walk preorder and rewire as you go — destroys the pointers you still need: the moment
          you set <code>node.right = node.left</code>, the original right subtree is lost.
          <br /><br />
          The fix is to process nodes in <strong>reverse preorder</strong> (<code>Right → Left → Root</code>),
          keeping a <code>prev</code> pointer to the node that should come <em>after</em> the current one. By the
          time you rewire a node, both its subtrees are already flattened and already stitched together, so nothing
          is left to lose. Note that reverse preorder is just postorder with the two recursive calls swapped — the
          same reversal idea as 2.5.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation — Recursive, reverse preorder</h3></div>
      <Code>{
`class Solution {
    private TreeNode prev = null;                 // the node that follows \`root\` in preorder

    public void flatten(TreeNode root) {
        if (root == null) return;

        flatten(root.right);                      // RIGHT first
        flatten(root.left);                       // then LEFT
        root.right = prev;                        // then ME  -> reverse preorder
        root.left  = null;                        // mandatory: the list has no left links
        prev = root;                              // I am now the successor of the next node
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Iterative with a stack</h3></div>
      <div className="card">
        <p>
          The iterative preorder from 2.4, with one extra line: after pushing the children, the node whose turn
          comes next is sitting on top of the stack — so it is precisely <code>cur.right</code>.
        </p>
      </div>
      <Code>{
`class Solution {
    public void flatten(TreeNode root) {
        if (root == null) return;

        Deque<TreeNode> st = new ArrayDeque<>();
        st.push(root);

        while (!st.isEmpty()) {
            TreeNode cur = st.pop();

            if (cur.right != null) st.push(cur.right);   // right pushed first ...
            if (cur.left  != null) st.push(cur.left);    // ... so left pops first

            if (!st.isEmpty()) cur.right = st.peek();    // next node in preorder
            cur.left = null;
        }
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Morris, O(1) space</h3></div>
      <div className="card">
        <p>
          The optimal answer, and the reason 6.5 came first. For each node with a left child, find the{' '}
          <strong>rightmost node of that left subtree</strong> — the last node the left branch will visit in
          preorder — and splice the current right subtree onto it. Then hoist the whole left subtree over to the
          right and step forward. No stack, no recursion.
        </p>
        <ol className="steps">
          <li><code>cur = root</code>; loop while <code>cur != null</code>.</li>
          <li>
            If <code>cur.left != null</code>: walk <code>prev = cur.left</code> then <code>prev.right</code> until{' '}
            <code>prev.right == null</code>.
          </li>
          <li>
            <code>prev.right = cur.right</code> — the right subtree now hangs off the end of the left chain.
          </li>
          <li>
            <code>cur.right = cur.left</code> and <code>cur.left = null</code> — the left subtree becomes the
            continuation of the list.
          </li>
          <li>
            <code>cur = cur.right</code> and repeat. Every node is fixed up exactly once on the way past.
          </li>
        </ol>
      </div>
      <Code>{
`class Solution {
    public void flatten(TreeNode root) {
        TreeNode cur = root;

        while (cur != null) {
            if (cur.left != null) {
                TreeNode prev = cur.left;
                while (prev.right != null) {      // rightmost node of the left subtree
                    prev = prev.right;
                }

                prev.right = cur.right;           // hang the right subtree off its end
                cur.right  = cur.left;            // left subtree becomes the next link
                cur.left   = null;                // and the left pointer is cleared
            }
            cur = cur.right;                      // step to the next node of the list
        }
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run — Morris version</h3></div>
      <pre className="diagram">{
` start          (1)
               /   \\
             (2)   (5)
            /  \\      \\
          (3) (4)     (6)

 cur=1  left = 2, rightmost of {2,3,4} = 4
        4.right = 5        (splice the right subtree on)
        1.right = 2, 1.left = null
        ->  1 -> 2(3,4 -> 5(6))        cur = 2

 cur=2  left = 3, rightmost of {3} = 3
        3.right = 4
        2.right = 3, 2.left = null
        ->  1 -> 2 -> 3 -> 4 -> 5(6)   cur = 3

 cur=3  no left child                  cur = 4
 cur=4  no left child                  cur = 5
 cur=5  no left child                  cur = 6
 cur=6  no left child                  cur = null

 result: 1 -> 2 -> 3 -> 4 -> 5 -> 6    ✓  preorder order, all lefts null`
      }</pre>

      <Cx>
        <CxBox label="Time (all three)" value="O(n)">
          Morris re-walks left spines, but each edge is used a constant number of times.
        </CxBox>
        <CxBox label="Space" value="O(h) / O(h) / O(1)">
          Recursion stack, explicit stack, and nothing at all — the reason the Morris version exists.
        </CxBox>
      </Cx>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Do not forget <code>left = null</code></div>
        Every approach clears <code>left</code>. Skip it and you get a structure that <em>prints</em> correctly if
        you only follow <code>right</code> pointers, but still holds the old left links — LeetCode compares the
        full structure and will fail you. It also leaves real cycles behind (node 1&apos;s left child would point at
        node 2, which is now also its right child), which breaks any later traversal.
      </div>
    </>
  );
}
