import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

export default function Part6() {
  return (
    <>
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
      <div className="callout callout-note">
        <div className="callout-title">📌 Your notes have this one in C++</div>
        The screenshot in your notes uses <code>vector&lt;int&gt;</code> and <code>-&gt;</code>. Below is the exact
        same algorithm in Java, line for line: <code>cur-&gt;left</code> becomes <code>cur.left</code>,{' '}
        <code>NULL</code> becomes <code>null</code>, and <code>push_back</code> becomes <code>add</code>.
      </div>
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
        <div className="callout-title">⚠️ Two slips in the C++ screenshot in your notes</div>
        Worth knowing, because both compile-or-crash rather than silently misbehave:
        <ul>
          <li>
            The function is named <code>getPreorder</code> but ends with <code>return inorder;</code> — a
            copy-paste leftover from the inorder version. It builds <code>preorder</code> and returns a different
            vector.
          </li>
          <li>
            <code>preorder.push_back(cur.val)</code> uses <code>.</code> on a pointer; C++ needs{' '}
            <code>cur-&gt;val</code>. In Java it is simply <code>cur.val</code>, which is why the Java
            transcription above reads cleanly.
          </li>
        </ul>
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
