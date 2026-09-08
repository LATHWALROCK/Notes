import Code from '../../components/Code.jsx';

export default function Part1() {
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
    </>
  );
}
