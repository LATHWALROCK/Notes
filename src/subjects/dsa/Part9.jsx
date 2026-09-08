import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

export default function Part9() {
  return (
    <>
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
