import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

export default function Part4() {
  return (
    <>
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
        <span className="pill pill-danger">Converted from C++</span>
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
        <div className="callout-title">⚠️ Your notes have this one in C++</div>
        This is the single problem in the PDF whose code was C++ (<code>vector</code>, <code>node-&gt;val</code>,{' '}
        <code>NULL</code>, <code>push_back</code>). Converted below. The one thing that does not translate directly
        is <code>vector&lt;int&gt; row(size)</code> — C++ creates a vector of <code>size</code> zeroes that you can
        index into immediately, whereas a Java <code>new ArrayList&lt;&gt;(size)</code> creates an{' '}
        <strong>empty</strong> list with a capacity hint, and <code>row.set(index, v)</code> on it throws{' '}
        <code>IndexOutOfBoundsException</code>. You must materialise the slots first.
      </div>

      <div className="subsection-header"><h3>Original C++ Version</h3></div>
      <Code lang="cpp">{
`class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (root == NULL) {
            return result;
        }

        queue<TreeNode*> nodesQueue;
        nodesQueue.push(root);
        bool leftToRight = true;

        while (!nodesQueue.empty()) {
            int size = nodesQueue.size();
            vector<int> row(size);
            for (int i = 0; i < size; i++) {
                TreeNode* node = nodesQueue.front();
                nodesQueue.pop();

                // find position to fill node's value
                int index = (leftToRight) ? i : (size - 1 - i);

                row[index] = node->val;
                if (node->left) {
                    nodesQueue.push(node->left);
                }
                if (node->right) {
                    nodesQueue.push(node->right);
                }
            }
            // after this level
            leftToRight = !leftToRight;
            result.push_back(row);
        }
        return result;
    }
};`
      }</Code>

      <div className="subsection-header"><h3>Converted to Java</h3></div>
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

            // Java equivalent of C++ "vector<int> row(size)":
            // a list that already HAS 'size' slots so row.set(i, v) is legal.
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
          Java has a tool C++ lacks here: a <code>LinkedList</code> used as a deque. Instead of computing a mirrored
          index, just <strong>prepend</strong> on right-to-left levels. No pre-sizing, no index arithmetic, and{' '}
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
    </>
  );
}
