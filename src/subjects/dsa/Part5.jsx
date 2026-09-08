import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

export default function Part5() {
  return (
    <>
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
    </>
  );
}
