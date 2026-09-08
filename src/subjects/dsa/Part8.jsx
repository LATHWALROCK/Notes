import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

export default function Part8() {
  return (
    <>
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
      <div className="callout callout-note">
        <div className="callout-title">📌 Your notes have the successor in C++, and no predecessor</div>
        The screenshot is the C++ <code>inorderSuccessor</code>. Below it is transcribed to Java unchanged, and the
        mirrored <code>inorderPredecessor</code> plus the combined GfG-style <code>findPreSuc</code> are written
        from scratch.
      </div>
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
    </>
  );
}
