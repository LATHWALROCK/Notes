import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

export default function Part3() {
  return (
    <>
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
    </>
  );
}
