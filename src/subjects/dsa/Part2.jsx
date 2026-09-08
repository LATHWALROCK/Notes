import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

export default function Part2() {
  return (
    <>
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
    </>
  );
}
