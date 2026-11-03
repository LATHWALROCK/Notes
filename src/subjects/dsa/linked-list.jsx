import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

/*
 * Subtopic ids are l1 … l34, distinct from the other DSA topics (s1-1…s6-7,
 * s7-1…s9-4, dp1-1…dp10-2, g1…g54). App.jsx mounts only the active topic, so
 * uniqueness within this file is what the show/hide actually requires; the `l`
 * numbering keeps ids unambiguous across the subject regardless.
 */
export default function LinkedList() {
  return (
    <>
      {/* 1 */}
      <div id="what-is-a-linked-list" data-topic-boundary="true" />
      <p className="part-subtitle">
        A chain of independently-allocated nodes, each one holding a value and a pointer to the next. Everything in
        this topic is a variation on following that one pointer, or on redirecting it.
      </p>
      <div className="card">
        <p>
          An <strong>array</strong> stores its elements in one contiguous block of memory, so getting to element{' '}
          <code>i</code> is a single address computation — <code>O(1)</code> — but inserting or removing anything
          that is not at the end means shifting every element after it. A <strong>linked list</strong> makes the
          opposite trade: every element (<strong>node</strong>) is its own separate block of memory, holding a value
          and a reference to the next node. Reaching element <code>i</code> now costs <code>O(i)</code> — there is no
          address arithmetic, only following pointers one at a time — but once you are standing at a node, inserting
          or removing right there costs <code>O(1)</code>: no shifting, just rewiring a couple of references.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The one sentence to keep</div>
          A linked list trades <strong>fast random access</strong> (which it does not have) for{' '}
          <strong>fast local insertion and deletion</strong> (which it has everywhere). Almost every design decision
          in this topic — dummy nodes, fast/slow pointers, why you keep a <code>prev</code> reference around —
          exists to either live with the lack of random access, or to use the cheap local rewiring to its fullest.
        </div>
        <p>The canonical building block, used throughout this topic:</p>
      </div>
      <Code>{
`class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
        this.next = null;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 <code>Node</code> and <code>data</code>, not <code>ListNode</code> and <code>val</code>
        </div>
        Most of these problems come from Coding Ninjas / GeeksforGeeks, which define the node class as{' '}
        <code>Node</code> with a field named <code>data</code>. Where a problem is LeetCode-numbered, its own
        boilerplate names the same class <code>ListNode</code> with a field called <code>val</code> instead —
        functionally identical, just a different name for the exact same two fields. The code here stays with{' '}
        <code>Node</code>/<code>data</code>/<code>next</code> throughout for one consistent reading experience. Note
        also that Java has no manual deallocation: once nothing references a node, the garbage collector reclaims it,
        so there is never a <code>free()</code>-equivalent line to write after splicing a node out.
      </div>

      <pre className="diagram">{
`  array:   [10][20][30][40]           contiguous; arr[2] is one address computation

  linked list:
     head
      |
      v
    +----+----+     +----+----+     +----+----+     +----+------+
    | 10 |  o--+--->| 20 |  o--+--->| 30 |  o--+--->| 40 | null |
    +----+----+     +----+----+     +----+----+     +----+------+
    (node A)         (node B)         (node C)         (node D)

  reaching "30" costs 3 pointer hops; inserting before "30" costs O(1) once you are there`
      }</pre>

      <Cx three>
        <CxBox label="Random access" value="O(n)">
          No index arithmetic exists; the only way to the <code>i</code>-th node is through the first{' '}
          <code>i-1</code>.
        </CxBox>
        <CxBox label="Insert/delete at a known node" value="O(1)">
          Rewire a couple of references — no shifting of later elements.
        </CxBox>
        <CxBox label="Extra space per element" value="+1 reference">
          Every node pays for its own <code>next</code> pointer that an array would not need.
        </CxBox>
      </Cx>

      {/* 2 */}
      <div id="doubly-linked-list" data-topic-boundary="true" />
      <p className="part-subtitle">
        Add one more pointer per node — back to where you came from — and the list can be walked, and rewired, in
        both directions.
      </p>
      <div className="card">
        <p>
          A <strong>Doubly Linked List (DLL)</strong> gives every node a second reference, <code>prev</code>,
          pointing at the node before it. The immediate payoff: given <em>any</em> node (not just the head), you can
          now move backwards as easily as forwards, and you can delete that node outright without first having
          walked from the head to find its predecessor — the node already knows its own predecessor.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 What the second pointer buys, and what it costs</div>
          <p>
            Singly linked list deletion needs the <strong>predecessor</strong> of the node being removed, because
            that predecessor&apos;s <code>next</code> is what has to be rewired — and the only way to find a
            predecessor in a singly linked list is to walk from the head. A DLL node already holds its own
            predecessor, so deleting <em>any</em> node you have a reference to is <code>O(1)</code>, with no
            preceding search at all. The cost is one extra pointer field per node (more memory) and one more
            reference to keep consistent on every insert and delete — miss updating <code>prev</code> on just one
            side of an operation and the list silently becomes inconsistent in one direction while looking fine in
            the other.
          </p>
        </div>
      </div>
      <Code>{
`class Node {
    int data;
    Node next;
    Node prev;

    Node(int data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}`
      }</Code>

      <pre className="diagram">{
`  null <--+----+----+--> <--+----+----+--> <--+----+----+--> null
          | 10 |  o  |      | 20 |  o  |      | 30 |  o  |
          +----+----+       +----+----+       +----+----+
           prev next         prev next         prev next

  from node "20" you can reach "10" (via prev) or "30" (via next) directly --
  no walk from the head required in either direction`
      }</pre>

      <Cx>
        <CxBox label="Delete a known node" value="O(1)">
          No search for the predecessor — it is already <code>node.prev</code>.
        </CxBox>
        <CxBox label="Extra space per element" value="+1 reference">
          The <code>prev</code> pointer, on top of a singly linked list&apos;s <code>next</code>.
        </CxBox>
      </Cx>

      {/* 3 */}
      <div id="search-an-element" data-topic-boundary="true" />
      <p className="part-subtitle">The most basic traversal: walk the chain, compare, stop.</p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">The traversal template</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given the head of a linked list and a target value, return whether the value
          exists in the list.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The loop shape every later problem reuses</div>
          <code>Node temp = head; while (temp != null) &#123; …; temp = temp.next; &#125;</code> is the single most
          common piece of code in this entire topic. It never mutates <code>head</code> itself — a separate{' '}
          <code>temp</code> variable walks the list so the caller still has the original starting point once the loop
          finishes. Get comfortable with this exact shape; dozens of problems below are this loop with one extra line
          inside it.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public boolean searchInLinkedList(Node head, int k) {
        Node temp = head;                     // walk with a COPY, never mutate head itself
        while (temp != null) {
            if (temp.data == k) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n)">Worst case, every node is visited once.</CxBox>
        <CxBox label="Space" value="O(1)">One extra reference, no matter how long the list is.</CxBox>
      </Cx>

      {/* 4 */}
      <div id="length-of-a-linked-list" data-topic-boundary="true" />
      <p className="part-subtitle">The same traversal template, counting instead of comparing.</p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Count while walking</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given the head of a linked list, return the number of nodes in it.
        </p>
        <p>
          There is no shortcut here the way <code>array.length</code> is free for an array — a linked list does not
          know its own size unless something kept count as it was built. Counting therefore means visiting every node
          exactly once.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public int lengthOfLinkedList(Node head) {
        int len = 0;
        Node temp = head;
        while (temp != null) {
            len++;
            temp = temp.next;
        }
        return len;
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Where this count gets reused</div>
        This exact function reappears as a building block later: Rotate a Linked List (27) needs the list&apos;s
        length to turn a rotation count <code>k</code> into <code>k % length</code>, and several &quot;find the k-th
        node&quot; helpers below are a length-style count that stops early instead of finishing the walk.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n)">Every node is visited exactly once.</CxBox>
        <CxBox label="Space" value="O(1)">A counter and a traversal pointer.</CxBox>
      </Cx>

      {/* 5 */}
      <div id="insertion-in-a-singly-ll" data-topic-boundary="true" />
      <p className="part-subtitle">
        Inserting at the head, at the tail, at a given position, and before a given value — four variants of the same
        idea: point the new node at what comes after it, then point what comes before it at the new node. This opens
        four ways to insert and four ways to delete, done once for a singly linked list and once for a doubly linked
        list; every later problem is one of these operations wearing a disguise.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-success">Easy–Medium</span>
        <span className="pill">head / tail / k-th / by value</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Insert a new node into a singly linked list: at the front, at the end, at a
          specific 1-indexed position, or immediately before the first node holding a given value.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Insertion at the head is the one truly free case — everything else needs a predecessor
          </div>
          Inserting at the head needs no traversal at all: the new node&apos;s <code>next</code> becomes the old
          head, and the new node <em>becomes</em> the head. Every other position needs you to first walk to the node
          that will sit <strong>just before</strong> the new one, because in a singly linked list the only way to
          &quot;insert before myself&quot; is to have the node before you repoint its <code>next</code> — there is no{' '}
          <code>prev</code> to ask. That single fact is why tail, k-th, and by-value insertion all share the same
          shape: find the predecessor, then do the exact same two-line rewire.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Rewire the new node before you rewire the predecessor</div>
          <code>newNode.next = temp.next;</code> must happen <strong>before</strong> <code>temp.next = newNode;</code>.
          Swap the order and the second line overwrites <code>temp.next</code> with <code>newNode</code> first, so by
          the time the first line runs, <code>temp.next</code> is no longer the old continuation — it is{' '}
          <code>newNode</code> itself, and the rest of the list is silently dropped.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation — Insert at Head</h3></div>
      <Code>{
`class Solution {
    public Node insertAtHead(Node head, int val) {
        Node newNode = new Node(val);
        newNode.next = head;                  // point the new node at the OLD head
        return newNode;                       // the new node IS the head now
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Insert at Tail</h3></div>
      <Code>{
`class Solution {
    public Node insertAtTail(Node head, int val) {
        Node newNode = new Node(val);
        if (head == null) {
            return newNode;                   // empty list: the new node becomes the whole list
        }
        Node temp = head;
        while (temp.next != null) {           // walk all the way to the LAST node
            temp = temp.next;
        }
        temp.next = newNode;
        return head;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Insert at K-th Position</h3></div>
      <Code>{
`class Solution {
    public Node insertAtKthPosition(Node head, int val, int k) {
        if (k == 1) {                         // position 1 IS the head
            Node newNode = new Node(val);
            newNode.next = head;
            return newNode;
        }

        Node temp = head;
        int cnt = 1;
        while (temp != null && cnt < k - 1) { // walk to the (k-1)-th node: the FUTURE predecessor
            temp = temp.next;
            cnt++;
        }
        if (temp == null) {
            return head;                      // k is out of range; nothing to do
        }

        Node newNode = new Node(val);
        newNode.next = temp.next;             // rewire the new node FIRST
        temp.next = newNode;                  // then the predecessor
        return head;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Insert Before a Given Value</h3></div>
      <Code>{
`class Solution {
    public Node insertBeforeValue(Node head, int val, int target) {
        if (head == null) {
            return head;                      // nothing to insert before
        }
        if (head.data == target) {            // the target IS the head: same as insert-at-head
            Node newNode = new Node(val);
            newNode.next = head;
            return newNode;
        }

        Node temp = head;
        while (temp.next != null && temp.next.data != target) {
            temp = temp.next;
        }
        if (temp.next == null) {
            return head;                      // target never found; nothing to do
        }

        Node newNode = new Node(val);
        newNode.next = temp.next;             // temp.next currently points at the target node
        temp.next = newNode;
        return head;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 Why K-th position checks <code>cnt &lt; k - 1</code>, not <code>cnt &lt; k</code>
        </div>
        To insert <em>at</em> position <code>k</code>, the new node needs to sit right after the node currently at
        position <code>k-1</code> — that node is the predecessor the loop is walking toward. Stopping at{' '}
        <code>k-1</code> rather than <code>k</code> is what leaves <code>temp</code> pointing at exactly the right
        predecessor; walking one step too far would insert the new node one position later than asked.
      </div>

      <Cx three>
        <CxBox label="Insert at head" value="O(1)">No traversal needed.</CxBox>
        <CxBox label="Insert at tail / k-th / by value" value="O(n)">
          Walking to the predecessor dominates.
        </CxBox>
        <CxBox label="Space" value="O(1)">One new node, one traversal pointer.</CxBox>
      </Cx>

      {/* 6 */}
      <div id="deletion-in-a-singly-ll" data-topic-boundary="true" />
      <p className="part-subtitle">
        The mirror image of insertion: find the predecessor of the node being removed, then splice it out by skipping
        over it.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-success">Easy–Medium</span>
        <span className="pill">head / tail / k-th / by value</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Delete a node from a singly linked list: the head, the tail, the node at a given
          1-indexed position, or the first node holding a given value.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 &quot;Splicing out&quot; is one line: skip the deleted node entirely</div>
          Once you are standing at the predecessor of the node to delete, removing it is{' '}
          <code>predecessor.next = predecessor.next.next;</code> — the predecessor now points straight past the
          deleted node to whatever came after it. Nothing has to touch the deleted node itself; in Java there is no
          manual deallocation either, since it becomes unreachable the instant nothing points to it any more and the
          garbage collector reclaims it on its own schedule.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation — Delete the Head</h3></div>
      <Code>{
`class Solution {
    public Node deleteHead(Node head) {
        if (head == null) {
            return null;                      // nothing to delete
        }
        return head.next;                     // the second node becomes the new head
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Delete the Tail</h3></div>
      <Code>{
`class Solution {
    public Node deleteTail(Node head) {
        if (head == null || head.next == null) {
            return null;                      // 0 or 1 nodes: the list becomes empty
        }
        Node temp = head;
        while (temp.next.next != null) {      // stop at the SECOND-LAST node
            temp = temp.next;
        }
        temp.next = null;                     // cut the last node loose
        return head;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Delete the K-th Node</h3></div>
      <Code>{
`class Solution {
    public Node deleteKthNode(Node head, int k) {
        if (head == null) {
            return null;
        }
        if (k == 1) {
            return head.next;                 // deleting position 1 IS deleting the head
        }

        Node temp = head;
        int cnt = 1;
        while (temp != null && cnt < k - 1) { // walk to the (k-1)-th node: the predecessor
            temp = temp.next;
            cnt++;
        }
        if (temp == null || temp.next == null) {
            return head;                      // k is out of range; nothing to do
        }

        temp.next = temp.next.next;           // splice the k-th node out
        return head;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Delete by Value</h3></div>
      <Code>{
`class Solution {
    public Node deleteByValue(Node head, int val) {
        if (head == null) {
            return null;
        }
        if (head.data == val) {
            return head.next;                 // the target IS the head
        }

        Node temp = head;
        while (temp.next != null && temp.next.data != val) {
            temp = temp.next;
        }
        if (temp.next == null) {
            return head;                      // value never found; nothing to do
        }

        temp.next = temp.next.next;           // splice the matching node out
        return head;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Delete-the-tail needs the SECOND-last node, not the last</div>
        The loop condition is <code>temp.next.next != null</code>, one hop shorter than you might first reach for. To
        cut the last node loose you rewire <strong>its predecessor&apos;s</strong> <code>next</code> to{' '}
        <code>null</code> — so <code>temp</code> must stop at the second-last node, never at the last one itself
        (which has no <code>next.next</code> to safely dereference, and nothing useful to rewire even if it did).
      </div>

      <Cx three>
        <CxBox label="Delete head" value="O(1)">No traversal needed.</CxBox>
        <CxBox label="Delete tail / k-th / by value" value="O(n)">
          Walking to the predecessor dominates.
        </CxBox>
        <CxBox label="Space" value="O(1)">One traversal pointer; no explicit deallocation in Java.</CxBox>
      </Cx>

      {/* 7 */}
      <div id="insertion-in-a-dll" data-topic-boundary="true" />
      <p className="part-subtitle">
        Every insertion now rewires two pointers on each side instead of one — but in exchange, the tail case stops
        needing a traversal at all once you are holding a tail reference.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">head / tail / k-th</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Insert a new node into a doubly linked list: at the front, at the end, or at a
          given 1-indexed position.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Four pointers to set, not two — and order still matters</div>
          Every DLL insertion touches up to four references: the new node&apos;s <code>next</code> and{' '}
          <code>prev</code>, plus the neighbours&apos; pointers back at the new node. The safe order is the same
          principle as the singly linked case, generalised: <strong>fully wire the new node first</strong> (both its{' '}
          <code>next</code> and <code>prev</code>), and only then repoint the existing neighbours at it — that way no
          existing pointer is overwritten before it has been read for the last time.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation — Insert at Head</h3></div>
      <Code>{
`class Solution {
    public Node insertAtHead(Node head, int val) {
        Node newNode = new Node(val);
        newNode.next = head;                  // wire the new node FIRST
        if (head != null) {
            head.prev = newNode;              // THEN repoint the old head back at it
        }
        return newNode;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Insert at Tail</h3></div>
      <Code>{
`class Solution {
    public Node insertAtTail(Node head, int val) {
        Node newNode = new Node(val);
        if (head == null) {
            return newNode;
        }
        Node temp = head;
        while (temp.next != null) {           // walk to the last node
            temp = temp.next;
        }
        temp.next = newNode;
        newNode.prev = temp;                  // the ONE extra line a DLL needs over an SLL
        return head;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Insert at K-th Position</h3></div>
      <Code>{
`class Solution {
    public Node insertAtKthPosition(Node head, int val, int k) {
        if (k == 1) {
            Node newNode = new Node(val);
            newNode.next = head;
            if (head != null) {
                head.prev = newNode;
            }
            return newNode;
        }

        Node temp = head;
        int cnt = 1;
        while (temp != null && cnt < k - 1) {
            temp = temp.next;
            cnt++;
        }
        if (temp == null) {
            return head;
        }

        Node newNode = new Node(val);
        newNode.next = temp.next;
        newNode.prev = temp;
        if (temp.next != null) {
            temp.next.prev = newNode;         // the node AFTER the new one also needs rewiring
        }
        temp.next = newNode;
        return head;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Reading the four-pointer order in Insert at K-th Position</div>
        <code>newNode.next = temp.next; newNode.prev = temp;</code> fully wires the new node while{' '}
        <code>temp.next</code> still points at its old continuation. Only then does{' '}
        <code>temp.next.prev = newNode;</code> fix the node on the far side (guarded by a null check, in case the new
        node is being appended at the very end), and finally <code>temp.next = newNode;</code> closes the loop from
        the near side. Four writes, each one safe because nothing it depends on has been overwritten yet.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n) worst case">
          Head is <code>O(1)</code>; tail/k-th still require walking there.
        </CxBox>
        <CxBox label="Space" value="O(1)">One new node, one traversal pointer.</CxBox>
      </Cx>

      {/* 8 */}
      <div id="deletion-in-a-dll" data-topic-boundary="true" />
      <p className="part-subtitle">
        The payoff of keeping a <code>prev</code> pointer, in full: deleting a known node needs no search for its
        predecessor at all.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">head / tail / k-th</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Delete a node from a doubly linked list: the head, the tail, or the node at a
          given 1-indexed position.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The predecessor search disappears entirely</div>
          Compare this to the singly linked version (6): there, walking to the predecessor is unavoidable no matter
          which node is being deleted. Here, once you have found the node to remove — itself still an{' '}
          <code>O(k)</code> walk from the head — its predecessor is sitting right there as <code>node.prev</code>,
          with no additional search. The saving is specifically in never needing a &quot;look one step ahead&quot;
          trick the way singly linked deletion does; it is not that DLL deletion skips the walk to the node itself.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation — Delete the Head</h3></div>
      <Code>{
`class Solution {
    public Node deleteHead(Node head) {
        if (head == null) {
            return null;
        }
        Node newHead = head.next;
        if (newHead != null) {
            newHead.prev = null;              // the new head has no predecessor any more
        }
        head.next = null;                     // detach the old head fully
        return newHead;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Delete the Tail</h3></div>
      <Code>{
`class Solution {
    public Node deleteTail(Node head) {
        if (head == null || head.next == null) {
            return null;
        }
        Node temp = head;
        while (temp.next != null) {           // walk all the way to the LAST node
            temp = temp.next;
        }
        Node newTail = temp.prev;             // its predecessor is already known -- no extra search
        newTail.next = null;
        temp.prev = null;
        return head;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Delete the K-th Node</h3></div>
      <Code>{
`class Solution {
    public Node deleteKthNode(Node head, int k) {
        if (head == null) {
            return null;
        }

        Node temp = head;
        int cnt = 1;
        while (temp != null && cnt < k) {     // walk to the K-TH node directly (not k-1)
            temp = temp.next;
            cnt++;
        }
        if (temp == null) {
            return head;                      // k is out of range
        }

        Node prevNode = temp.prev;            // already known -- the whole point of a DLL
        Node nextNode = temp.next;

        if (prevNode != null) {
            prevNode.next = nextNode;
        } else {
            head = nextNode;                  // temp WAS the head
        }
        if (nextNode != null) {
            nextNode.prev = prevNode;
        }
        temp.next = null;
        temp.prev = null;
        return head;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Delete the K-th Node walks to K itself, not K-1</div>
        This is the opposite of the singly linked version&apos;s loop bound. There, the loop stops one node early
        because it needs the <strong>predecessor</strong> to rewire. Here, the node being deleted already carries its
        own predecessor as <code>.prev</code>, so the loop can walk straight to the node itself (
        <code>cnt &lt; k</code>, not <code>cnt &lt; k - 1</code>) and read <code>temp.prev</code> once it arrives.
        Mixing the two loop bounds up between the SLL and DLL versions is an easy, very common slip.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n) worst case">
          Head is <code>O(1)</code>; tail/k-th still require walking there.
        </CxBox>
        <CxBox label="Space" value="O(1)">One traversal pointer; no explicit deallocation in Java.</CxBox>
      </Cx>

      {/* 9 */}
      <div id="reverse-a-dll" data-topic-boundary="true" />
      <p className="part-subtitle">
        Every node&apos;s <code>next</code> and <code>prev</code> trade places, and the two ends of the list trade
        roles.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Swap next and prev at every node</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Reverse a doubly linked list in place and return the new head.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Swapping the two pointers at every node reverses the whole list</div>
          <p>
            If every node&apos;s <code>next</code> and <code>prev</code> are swapped, what used to be
            &quot;forward&quot; becomes &quot;backward&quot; and vice versa — the list is now wired in the opposite
            direction at every single link simultaneously. The only piece left to figure out is <em>where to
            stand</em> after that swap: the old head&apos;s new <code>prev</code> (which used to be its old{' '}
            <code>next</code>, the second node) is where the walk should continue toward, and the very last node
            visited — whose new <code>prev</code> is <code>null</code>, since it was the old head — is the new head of
            the reversed list.
          </p>
          <div className="recurrence">{
`prev = null
current = head

while current != null:
    prev = current.prev               -- read BEFORE the swap, so it isn't lost
    current.prev = current.next       -- SWAP
    current.next = prev
    current = current.prev            -- move forward using the field that WAS .next

return prev.prev                      -- prev now sits one step past the true new head`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ Why the function returns <code>prev.prev</code>, not <code>prev</code>
          </div>
          The loop advances with <code>current = current.prev</code> — using the field that, after the swap, now
          holds what used to be <code>next</code>. When <code>current</code> finally becomes <code>null</code>{' '}
          (walked off the end), <code>prev</code> is sitting on the <strong>old head</strong>, one node past the
          list&apos;s new tail of the walk. The new head is not <code>prev</code> itself; it is{' '}
          <code>prev.prev</code> — the old head&apos;s own new <code>.prev</code>, which (post-swap) is what used to
          be its <code>.next</code>, i.e. the second node, which became the new head during that node&apos;s own
          swap. Tracing through a short example by hand (below) makes this far clearer than the algebra does.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node reverseDLL(Node head) {
        if (head == null || head.next == null) {
            return head;
        }

        Node prev = null;
        Node current = head;

        while (current != null) {
            prev = current.prev;
            current.prev = current.next;      // SWAP next and prev at this node
            current.next = prev;
            current = current.prev;           // advance using the field that WAS .next
        }

        return prev.prev;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  before:  null <- 1 <-> 2 <-> 3 -> null             (head = 1)

  current=1: prev = 1.prev = null
             1.prev = 1.next = 2   ;   1.next = prev = null
             current = 1.prev = 2        -- note: 1.prev is now 2 (the swapped value)

  current=2: prev = 2.prev = 1       (read BEFORE this node's own swap)
             2.prev = 2.next = 3   ;   2.next = prev = 1
             current = 2.prev = 3

  current=3: prev = 3.prev = 2
             3.prev = 3.next = null ;  3.next = prev = 2
             current = 3.prev = null    -- loop ends

  return prev.prev  =  2.prev  =  3        <-- the new head

  after:   null <- 3 <-> 2 <-> 1 -> null`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">Every node&apos;s two pointers are swapped once.</CxBox>
        <CxBox label="Space" value="O(1)">In-place; no new nodes, no recursion.</CxBox>
      </Cx>

      {/* 10 */}
      <div id="add-two-numbers-as-lls" data-topic-boundary="true" />
      <p className="part-subtitle">
        Each list stores one number with its digits in reverse order. Add them exactly the way you add on paper — from
        the ones place, carrying forward. This begins seven problems that each lean on one new trick — a dummy node, a
        three-bucket rewire, a carry propagated through recursion — built on the plain operations from Part 2.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 2</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Dummy head + carry</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Two non-empty linked lists represent two non-negative integers, least significant
          digit first. Add the numbers and return the sum as a linked list in the same format.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 A dummy head removes every &quot;is this the first node?&quot; special case</div>
          <p>
            Building a new list node-by-node normally needs special handling for the very first node (there is no
            previous node yet to attach it to). A <strong>dummy head</strong> — a throwaway node created before the
            loop starts, holding no real value — sidesteps that entirely: every real node, including the first, is
            attached the exact same way, as <code>curr.next</code>. At the end, <code>dummyHead.next</code> is the
            real head of the answer, and the dummy itself is simply discarded.
          </p>
          <div className="recurrence">{
`dummyHead = new Node(-1) ; curr = dummyHead
carry = 0

while temp1 != null or temp2 != null:
    sum = carry
    if temp1 != null: sum += temp1.data ; temp1 = temp1.next
    if temp2 != null: sum += temp2.data ; temp2 = temp2.next

    curr.next = new Node(sum % 10)        -- this digit of the result
    carry = sum / 10
    curr = curr.next

if carry > 0:
    curr.next = new Node(carry)           -- one final digit if the addition overflowed

return dummyHead.next`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The loop condition is OR, not AND</div>
          Using <code>&amp;&amp;</code> instead of <code>||</code> would stop the moment the{' '}
          <strong>shorter</strong> list runs out, silently dropping every remaining digit of the longer one.{' '}
          <code>||</code> keeps the loop going until both are exhausted, and the two separate <code>if</code> guards
          inside make sure a finished list simply stops contributing to <code>sum</code> rather than throwing a
          null-pointer exception.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node addTwoNumbers(Node num1, Node num2) {
        Node dummyHead = new Node(-1);
        Node curr = dummyHead;
        Node temp1 = num1;
        Node temp2 = num2;
        int carry = 0;

        while (temp1 != null || temp2 != null) {
            int sum = carry;
            if (temp1 != null) sum += temp1.data;
            if (temp2 != null) sum += temp2.data;

            Node newNode = new Node(sum % 10);
            carry = sum / 10;

            curr.next = newNode;
            curr = curr.next;

            if (temp1 != null) temp1 = temp1.next;
            if (temp2 != null) temp2 = temp2.next;
        }

        if (carry != 0) {
            Node newNode = new Node(carry);
            curr.next = newNode;
        }

        return dummyHead.next;              // skip the dummy, return the real head
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  num1 = 2 -> 4 -> 3     (represents 342)
  num2 = 5 -> 6 -> 4     (represents 465)

  step 1: sum = 0+2+5=7            digit 7, carry 0
  step 2: sum = 0+4+6=10           digit 0, carry 1
  step 3: sum = 1+3+4=8            digit 8, carry 0

  result = 7 -> 0 -> 8   (represents 807 = 342 + 465)`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(max(n, m))">One pass over the longer of the two lists.</CxBox>
        <CxBox label="Space" value="O(max(n, m))">The newly built result list.</CxBox>
      </Cx>

      {/* 11 */}
      <div id="odd-even-linked-list" data-topic-boundary="true" />
      <p className="part-subtitle">
        Regroup the list by <strong>position</strong>, not by value: every node at an odd index first, every node at
        an even index after — done with no extra nodes at all.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 328</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Two interleaved chains, built in parallel</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Group all nodes at odd indices together, followed by all nodes at even indices
          (1-indexed: the head is index 1, an odd position). Preserve the relative order within each group, and do it
          in <code>O(1)</code> extra space.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Build both chains at once by alternating which one advances</div>
          <p>
            Keep two running pointers, <code>odd</code> and <code>even</code>, starting at the first and second
            nodes. On each step, <code>odd</code> is wired to skip past the upcoming even node straight to the next
            odd one, and likewise for <code>even</code> — the two chains are built in lock-step without ever
            allocating a new node, since the existing nodes are simply being rewired in place. The one detail to get
            right is remembering where the even chain <em>started</em> (<code>evenHead</code>), because by the time
            the odd chain is fully built, its last node needs to be pointed at that remembered start to join the two
            chains together.
          </p>
          <div className="recurrence">{
`odd = head ; even = head.next ; evenHead = even     -- remember where "even" started

while even != null and even.next != null:
    odd.next = even.next           -- skip past the even node to the next odd one
    odd = odd.next
    even.next = odd.next           -- skip past the (new) odd node to the next even one
    even = even.next

odd.next = evenHead                -- join the two chains: all odds, then all evens
return head`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The loop condition checks TWO things, in this order</div>
          <code>even != null</code> guards against dereferencing a null <code>even</code> pointer itself;{' '}
          <code>even.next != null</code> guards against the next line reading <code>odd.next = even.next</code> when
          there is nothing left for the odd chain to extend into. Both checks are necessary and Java&apos;s{' '}
          <code>&amp;&amp;</code> short-circuits left to right, so <code>even != null</code> must come first —
          checking <code>even.next</code> before confirming <code>even</code> itself is non-null would throw on a
          list of even length.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node oddEvenList(Node head) {
        if (head == null || head.next == null) {
            return head;
        }

        Node odd = head;
        Node even = head.next;
        Node evenHead = even;                 // remember where the even chain begins

        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;

            even.next = odd.next;
            even = even.next;
        }

        odd.next = evenHead;                  // stitch: all odd-position nodes, then all even
        return head;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  before:  1 -> 2 -> 3 -> 4 -> 5          (positions: 1,2,3,4,5)

  odd=1, even=2, evenHead=2

  round 1: odd.next = even.next = 3    -> odd=3
           even.next = odd.next = 4    -> even=4

  round 2: odd.next = even.next = 5    -> odd=5
           even.next = odd.next = null -> even=null
           loop ends (even.next was null)

  odd.next = evenHead  ->  5.next = 2

  after:   1 -> 3 -> 5 -> 2 -> 4          (odds 1,3,5 then evens 2,4)`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">One pass, advancing two pointers in lock-step.</CxBox>
        <CxBox label="Space" value="O(1)">Existing nodes are rewired; nothing new is allocated.</CxBox>
      </Cx>

      {/* 12 */}
      <div id="sort-ll-of-0s-1s-2s" data-topic-boundary="true" />
      <p className="part-subtitle">
        Only three distinct values ever appear, which turns &quot;sort&quot; into &quot;bucket&quot; — three small
        lists, built in one pass, then joined.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Three dummy-headed buckets</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a linked list whose every value is <code>0</code>, <code>1</code>, or{' '}
          <code>2</code>, sort it in <code>O(n)</code> time, ideally without swapping node values.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Three dummy heads, one pass, then stitch</div>
          <p>
            Because the value space is just <code>{'{0, 1, 2}'}</code>, there is no need for comparison-based sorting
            at all. Walk the list once, and append each node to one of three separate chains — <code>zero</code>,{' '}
            <code>one</code>, or <code>two</code> — based purely on its own value, using a dummy head for each chain
            for the same reason Add Two Numbers (10) used one: every append becomes the identical operation, first
            node included. Once every node has been distributed, splice the three chains together in order:{' '}
            <code>zero → one → two</code>.
          </p>
          <div className="recurrence">{
`zeroHead, oneHead, twoHead = three dummy nodes
zero, one, two = those same three dummies   -- each will walk its own chain

for each node in the original list:
    if node.data == 0: zero.next = node ; zero = zero.next
    elif node.data == 1: one.next = node ; one = one.next
    else: two.next = node ; two = two.next

zero.next = (oneHead.next != null) ? oneHead.next : twoHead.next
one.next = twoHead.next
two.next = null                     -- the very end of the sorted list, always

return zeroHead.next`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The zero-chain&apos;s tail might need to skip the one-chain entirely</div>
          If no <code>1</code>s existed in the input, <code>oneHead.next</code> is still <code>null</code> — the
          one-chain was created but never appended to. Joining <code>zero.next = oneHead.next</code> unconditionally
          in that case would point the zero-chain at <code>null</code>, silently dropping every <code>2</code> that
          came after. The ternary — fall through to <code>twoHead.next</code> whenever the one-chain is empty — is
          exactly what the traps in the DP and Graph notes would call &quot;test the empty case before assuming the
          general one.&quot;
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node sortList(Node head) {
        if (head == null || head.next == null) {
            return head;
        }

        Node zeroHead = new Node(-1);
        Node oneHead = new Node(-1);
        Node twoHead = new Node(-1);

        Node zero = zeroHead;
        Node one = oneHead;
        Node two = twoHead;
        Node temp = head;

        while (temp != null) {
            if (temp.data == 0) {
                zero.next = temp;
                zero = zero.next;
            } else if (temp.data == 1) {
                one.next = temp;
                one = one.next;
            } else {
                two.next = temp;
                two = two.next;
            }
            temp = temp.next;
        }

        // Stitch: zeros, then ones (or straight to twos if there were no ones), then twos.
        zero.next = (oneHead.next != null) ? oneHead.next : twoHead.next;
        one.next = twoHead.next;
        two.next = null;                      // this is always the true end of the list

        return zeroHead.next;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One pass to bucket every node, plus a constant amount of stitching.
        </CxBox>
        <CxBox label="Space" value="O(1)">
          Existing nodes are rewired into three chains; nothing new is allocated.
        </CxBox>
      </Cx>

      {/* 13 */}
      <div id="remove-nth-node-from-end" data-topic-boundary="true" />
      <p className="part-subtitle">
        You cannot count backwards in a singly linked list — so create a fixed gap of <code>n</code> between two
        pointers and slide both forward together instead.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 19</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Two pointers, n apart</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given the head of a linked list, remove the <code>n</code>-th node from the end of
          the list, in one pass.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 A fixed gap turns &quot;from the end&quot; into &quot;from the front&quot;</div>
          <p>
            Advance a <code>fast</code> pointer <code>n</code> steps ahead of a <code>slow</code> one first. From then
            on, advance both together, one step at a time. The gap between them stays exactly <code>n</code> the whole
            way, so the moment <code>fast</code> falls off the end of the list, <code>slow</code> is standing exactly{' '}
            <code>n</code> nodes short of the end — which is precisely the node whose <code>next</code> needs to be
            rewired to remove the target.
          </p>
          <div className="recurrence">{
`fast = head
for i in 0 .. n-1: fast = fast.next      -- open up the gap

if fast == null: return head.next        -- the head itself is the n-th from the end

while fast.next != null:
    fast = fast.next
    slow = slow.next

slow.next = slow.next.next               -- splice out the target, now one step ahead of slow
return head`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ The <code>fast == null</code> check handles removing the head itself
          </div>
          If <code>n</code> equals the list&apos;s length, advancing <code>fast</code> by <code>n</code> steps runs it
          straight off the end — meaning the target to remove <em>is</em> the head. Without this guard, the loop below
          would immediately throw on <code>fast.next</code> (since <code>fast</code> is already <code>null</code>);
          with it, the function short-circuits and simply returns <code>head.next</code>, exactly like Delete the Head
          (6).
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node removeNthFromEnd(Node head, int n) {
        Node fast = head;
        Node slow = head;

        for (int i = 0; i < n; i++) {
            fast = fast.next;
        }

        if (fast == null) {
            return head.next;                 // the n-th from the end IS the head
        }

        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }

        Node delNode = slow.next;
        slow.next = slow.next.next;
        delNode.next = null;                  // detach the removed node cleanly
        return head;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  list: 1 -> 2 -> 3 -> 4 -> 5 ,  n = 2   (remove the 2nd-from-last node, "4")

  advance fast by n=2: fast -> 3        (fast started at 1, moved 2 steps)
  fast != null, so continue

  while fast.next != null:
    fast=3.next=4 is not null -> fast=4, slow=1.next=2
    fast=4.next=5 is not null -> fast=5, slow=2.next=3
    fast=5.next=null -> loop ends

  slow is now 3 ; slow.next (=4) is the target
  slow.next = slow.next.next = 5

  result: 1 -> 2 -> 3 -> 5          (node 4 removed)`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One pass over the whole list — no separate length-counting pass needed.
        </CxBox>
        <CxBox label="Space" value="O(1)">Two traversal pointers.</CxBox>
      </Cx>

      {/* 14 */}
      <div id="reverse-a-linked-list" data-topic-boundary="true" />
      <p className="part-subtitle">
        The single most important operation on a singly linked list, in both of its standard forms: an iterative
        rewiring with three pointers, and a recursion that reverses from the tail backward.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 206</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">Iterative + Recursive</span>
        <span className="pill">Everything else leans on this</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Reverse a singly linked list and return the new head.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Iterative: flip one pointer at a time, carrying three references</div>
          <p>
            A singly linked node only ever points forward, so reversing it one node at a time means{' '}
            <strong>capturing where it was pointing before overwriting that pointer</strong>. Three rolling
            references do this: <code>prev</code> (already reversed, trailing behind), <code>temp</code> (the node
            currently being flipped), and <code>front</code> (saved before the flip, so the walk does not lose the
            rest of the list the instant <code>temp.next</code> is overwritten).
          </p>
          <div className="recurrence">{
`prev = null ; temp = head

while temp != null:
    front = temp.next        -- save BEFORE overwriting, or the rest of the list is lost
    temp.next = prev         -- flip this node's pointer backward
    prev = temp
    temp = front

return prev                  -- prev ends on the old TAIL -- the new head`
          }</div>
        </div>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Recursive: trust that everything AFTER you is already reversed</div>
          <p>
            Recurse all the way to the last node first — that becomes the new head, returned all the way back up
            unchanged. On the way back up the call stack, each node fixes exactly one link: the node after it
            (already fully reversed by the deeper call) needs to point <strong>back</strong> at it, and this
            node&apos;s own forward pointer needs to be cut.
          </p>
          <div className="recurrence">{
`reverseLinkedList(head):
    if head == null or head.next == null: return head    -- base case: 0 or 1 nodes

    newHead = reverseLinkedList(head.next)   -- trust the rest is already reversed
    front = head.next
    front.next = head                        -- the next node now points BACK at this one
    head.next = null                         -- this node no longer points forward

    return newHead                           -- unchanged all the way back up`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation — Iterative</h3></div>
      <Code>{
`class Solution {
    public Node reverseLinkedList(Node head) {
        Node prev = null;
        Node temp = head;

        while (temp != null) {
            Node front = temp.next;           // save before overwriting temp.next
            temp.next = prev;                 // flip this node's pointer
            prev = temp;
            temp = front;
        }

        return prev;                          // the old tail -- now the new head
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Code Implementation — Recursive</h3></div>
      <Code>{
`class Solution {
    public Node reverseLinkedList(Node head) {
        if (head == null || head.next == null) {
            return head;                      // 0 or 1 nodes: already "reversed"
        }

        Node newHead = reverseLinkedList(head.next);

        Node front = head.next;
        front.next = head;                    // the next node now points BACK at this one
        head.next = null;                     // and this one no longer points forward

        return newHead;                       // unchanged, passed all the way back up
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ The recursive version costs O(n) stack space the iterative one does not</div>
        Every recursive call stays on the call stack until the node after it finishes reversing, so a list of{' '}
        <code>10^5</code> nodes recurses <code>10^5</code> deep — a real risk of <code>StackOverflowError</code> in
        Java. The iterative version is <code>O(1)</code> space and has no such limit; prefer it whenever the list
        could be long, and reach for the recursive form mainly to demonstrate the &quot;trust the rest is already
        done&quot; reasoning, which reappears in Flattening a Linked List (29).
      </div>

      <div className="subsection-header"><h3>Dry run — iterative</h3></div>
      <pre className="diagram">{
`  head: 1 -> 2 -> 3 -> null

  prev=null, temp=1
  front=2 ; 1.next=null ; prev=1 ; temp=2      list so far: null <- 1    2->3->null
  front=3 ; 2.next=1    ; prev=2 ; temp=3      null <- 1 <- 2    3->null
  front=null ; 3.next=2 ; prev=3 ; temp=null   null <- 1 <- 2 <- 3
  loop ends (temp == null)

  return prev = 3          new list: 3 -> 2 -> 1 -> null`
      }</pre>

      <Cx three>
        <CxBox label="Time" value="O(n)">Both versions touch every node exactly once.</CxBox>
        <CxBox label="Space — iterative" value="O(1)">
          Three rolling references, no matter the list length.
        </CxBox>
        <CxBox label="Space — recursive" value="O(n)">The call stack, one frame per node.</CxBox>
      </Cx>

      {/* 15 */}
      <div id="ll-palindrome-check" data-topic-boundary="true" />
      <p className="part-subtitle">
        Find the middle, reverse the second half in place, compare the two halves — then, out of courtesy to the
        caller, put the list back exactly how it was.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 234</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Middle + reverse, O(1) space</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Determine whether a singly linked list reads the same forwards and backwards.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Reverse only the second half, then walk both halves outward together</div>
          <p>
            A palindrome check on an array can walk from both ends inward; a singly linked list cannot walk backward
            at all. The fix is to physically reverse the <strong>second half</strong> of the list in place (using the
            fast/slow middle-finding trick from Middle of a Linked List, 18), which turns &quot;compare from both
            ends inward&quot; into &quot;compare two forward walks starting from the same middle point&quot; —
            something a singly linked list can do natively.
          </p>
          <div className="recurrence">{
`slow = head ; fast = head
while fast.next != null and fast.next.next != null:
    slow = slow.next ; fast = fast.next.next      -- slow ends at (or just before) the middle

secondHalf = reverse(slow.next)                   -- reverse ONLY the back half
first = head ; second = secondHalf

while second != null:
    if first.data != second.data: reverse(secondHalf); return false
    first = first.next ; second = second.next

reverse(secondHalf)         -- restore the list before returning, either way
return true`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Restore the list before every return, including the false branch</div>
          Reversing the second half mutates the actual list the caller handed in. A caller that only expects a yes/no
          answer would be surprised to find their list permanently altered afterward — so the code explicitly
          reverses the second half back into place before <strong>either</strong> return statement, not just the
          success path. Forgetting the restore on the early <code>false</code> return is the one-line omission that
          makes this function have a side effect it was never supposed to have.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private Node reverseLinkedList(Node head) {
        Node prev = null;
        Node temp = head;
        while (temp != null) {
            Node front = temp.next;
            temp.next = prev;
            prev = temp;
            temp = front;
        }
        return prev;
    }

    public boolean isPalindrome(Node head) {
        if (head == null || head.next == null) {
            return true;
        }

        Node slow = head;
        Node fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        Node newHead = reverseLinkedList(slow.next);
        Node first = head;
        Node second = newHead;

        while (second != null) {
            if (first.data != second.data) {
                reverseLinkedList(newHead);   // restore before returning, even on failure
                return false;
            }
            first = first.next;
            second = second.next;
        }

        reverseLinkedList(newHead);           // restore before the successful return too
        return true;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Finding the middle, reversing half, comparing, and restoring are all linear.
        </CxBox>
        <CxBox label="Space" value="O(1)">
          No array copy of the values — the list itself is temporarily rewired.
        </CxBox>
      </Cx>

      {/* 16 */}
      <div id="add-1-to-a-number-as-ll" data-topic-boundary="true" />
      <p className="part-subtitle">
        The digits are stored <strong>most</strong>-significant-first this time — the opposite order from Add Two
        Numbers (10) — so the carry has to travel from the tail backward, which only recursion does naturally on a
        singly linked list.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Carry via recursion&apos;s return value</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A number is represented as a linked list of its digits, most significant digit
          first. Add <code>1</code> to it and return the head of the (possibly longer) result.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Recurse to the last digit, add 1 there, let the carry bubble back on the return value
          </div>
          <p>
            Adding <code>1</code> only ever directly affects the <strong>last</strong> digit, and only affects
            earlier digits if that addition overflows into a carry. Since the list only points forward, reaching the
            last digit means recursing to the end first; the carry is then threaded back up through the
            function&apos;s <strong>return value</strong>, one digit at a time, exactly the reverse order of how Add
            Two Numbers threaded its carry forward through a loop.
          </p>
          <div className="recurrence">{
`addHelper(node):
    if node == null: return 1              -- fell off the end: there WAS a carry of 1 to add
    carry = addHelper(node.next)           -- handle everything to the right first
    node.data += carry
    if node.data < 10: return 0            -- no further carry needed
    node.data = 0
    return 1                               -- this digit overflowed; carry 1 further left

addOne(head):
    carry = addHelper(head)
    if carry == 1:
        newHead = new Node(1) ; newHead.next = head     -- the number grew one digit longer
        return newHead
    return head`
          }</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 Why the base case returns 1, not 0</div>
          Reaching <code>null</code> means the recursion walked past the actual last digit — which is exactly where
          the <code>+1</code> the whole problem asks for needs to be injected. Returning <code>1</code> here is that
          injection: the caller one level up (holding the true last digit) receives it as <code>carry</code> and adds
          it in, exactly as if a phantom &quot;+1&quot; digit sat just past the end of the list.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private int addHelper(Node temp) {
        if (temp == null) {
            return 1;                         // the "+1" itself, injected past the last digit
        }

        int carry = addHelper(temp.next);
        temp.data += carry;

        if (temp.data < 10) {
            return 0;                         // no overflow -- nothing more to carry
        }
        temp.data = 0;
        return 1;                             // this digit overflowed; carry 1 to the left
    }

    public Node addOne(Node head) {
        int carry = addHelper(head);
        if (carry == 1) {
            Node newNode = new Node(1);
            newNode.next = head;
            head = newNode;                   // the number grew by one digit
        }
        return head;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  head: 1 -> 9 -> 9        (represents 199)

  addHelper(9[last]): carry = addHelper(null) = 1
                      9.data = 9+1 = 10 >= 10, so data=0, return 1

  addHelper(9[mid]):  carry = 1 (from above)
                      9.data = 9+1 = 10 >= 10, so data=0, return 1

  addHelper(1[head]): carry = 1 (from above)
                      1.data = 1+1 = 2 < 10, return 0

  top-level carry = 0 -> no new head needed

  result: 2 -> 0 -> 0      (represents 200 = 199 + 1)`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">One recursive call per digit.</CxBox>
        <CxBox label="Space" value="O(n)">
          The recursion stack — one frame per digit, same trade-off as recursive reversal (14).
        </CxBox>
      </Cx>

      {/* 17 */}
      <div id="intersection-of-y-shaped-ll" data-topic-boundary="true" />
      <p className="part-subtitle">
        Two lists that merge into one tail. Find exactly where they merge, without ever needing to know either
        list&apos;s length up front. This opens a run of six problems built on one idea — one pointer moving twice as
        fast as the other — which finds the middle of a list, detects a cycle, measures a cycle&apos;s length, and
        locates exactly where a cycle begins, all in <code>O(1)</code> space.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 160</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Switch lists at the end</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Two singly linked lists eventually merge into a shared tail, forming a
          &quot;Y&quot; shape. Find the node where they first become the same node, or <code>null</code> if they
          never do.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Walking both, then swapping onto the other list, equalises the distance for free
          </div>
          <p>
            If the two lists have lengths <code>n</code> and <code>m</code>, a pointer that walks list A to its end
            and then continues onto list B travels <code>n + m</code> nodes total by the time it reaches the
            intersection; a pointer that walks B then switches to A also travels <code>n + m</code> nodes to reach
            the very same point. Running both walks <strong>at the same time</strong>, switching each pointer onto
            the other list the instant it hits <code>null</code>, means they arrive at the intersection after
            exactly the same number of steps — no need to measure either list&apos;s length beforehand and compute
            the difference manually; the swap does that cancellation automatically.
          </p>
          <div className="recurrence">{
`temp1 = firstHead ; temp2 = secondHead

while temp1 != temp2:
    temp1 = (temp1 == null) ? secondHead : temp1.next     -- fell off A: continue on B
    temp2 = (temp2 == null) ? firstHead  : temp2.next     -- fell off B: continue on A

return temp1          -- either the intersection node, or null if they never meet`
          }</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">
            📌 Why the loop also correctly returns <code>null</code> for non-intersecting lists
          </div>
          If the lists never merge, each pointer eventually becomes <code>null</code> at the same moment — after
          travelling <code>n + m</code> steps each, having walked both full lists — and <code>null == null</code> is{' '}
          <code>true</code> in Java, so the loop exits with <code>temp1</code> correctly holding <code>null</code>. No
          separate &quot;do they even intersect&quot; check is needed; the same loop handles both outcomes.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node findIntersection(Node firstHead, Node secondHead) {
        if (firstHead == null || secondHead == null) {
            return null;
        }

        Node temp1 = firstHead;
        Node temp2 = secondHead;

        while (temp1 != temp2) {
            temp1 = (temp1 == null) ? secondHead : temp1.next;
            temp2 = (temp2 == null) ? firstHead : temp2.next;
        }
        return temp1;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  A: 1 -> 2 ->        \\
                        6 -> 7 -> 8        (shared tail starting at node "6")
  B: 3 -> 4 -> 5 ->   /

  temp1 walks A then B:  1,2,6,7,8, null, 3,4,5,6 ...
  temp2 walks B then A:  3,4,5,6,7,8, null, 1,2,6 ...

  both reach node "6" after 6 steps each -- loop exits, return "6"`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n + m)">Each pointer walks at most one full pass of each list.</CxBox>
        <CxBox label="Space" value="O(1)">
          Two traversal pointers — no hash set of visited nodes needed.
        </CxBox>
      </Cx>

      {/* 18 */}
      <div id="middle-of-a-linked-list" data-topic-boundary="true" />
      <p className="part-subtitle">
        The foundational fast/slow pattern every other problem in this part builds on: move one pointer twice as fast
        as the other, and when the fast one finishes, the slow one is exactly halfway.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 876</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">One pass, no length needed first</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return the middle node of a singly linked list. For an even number of nodes,
          return the <strong>second</strong> of the two middle nodes.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Twice the speed means half the distance travelled</div>
          If <code>fast</code> advances two nodes for every one that <code>slow</code> advances, then by the time{' '}
          <code>fast</code> has covered the whole list, <code>slow</code> has covered exactly half of it — without
          ever having counted the list&apos;s length as a separate step. This is the single cheapest way to find a
          linked list&apos;s midpoint in one pass.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node findMiddle(Node head) {
        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 The loop condition is what decides which middle you get on an even-length list
        </div>
        With <code>fast != null &amp;&amp; fast.next != null</code>, a list of 4 nodes (
        <code>1-&gt;2-&gt;3-&gt;4</code>) finishes with <code>slow</code> on node <code>3</code> — the{' '}
        <strong>second</strong> of the two middles, matching the problem&apos;s requirement. A version that instead
        starts <code>fast</code> one step ahead (<code>fast = head.next</code>) would land on the{' '}
        <strong>first</strong> middle instead; both are standard, and the difference is exactly where{' '}
        <code>fast</code> begins. Sort a Linked List (31) specifically needs the other convention.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One pass; <code>fast</code> covers the list, <code>slow</code> covers half.
        </CxBox>
        <CxBox label="Space" value="O(1)">Two pointers, regardless of list length.</CxBox>
      </Cx>

      {/* 19 */}
      <div id="detect-a-loop-in-a-ll" data-topic-boundary="true" />
      <p className="part-subtitle">
        Floyd&apos;s Cycle Detection: if a fast and a slow pointer are both walking around the same closed loop, the
        faster one is guaranteed to lap the slower one eventually.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 141</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">The tortoise and the hare</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Determine whether a linked list contains a cycle — some node&apos;s{' '}
          <code>next</code> eventually points back to an earlier node instead of reaching <code>null</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 On a cycle, &quot;twice as fast&quot; eventually means &quot;same spot&quot;</div>
          <p>
            If there is no cycle, <code>fast</code> reaches <code>null</code> and the search correctly reports no
            loop. If a cycle <em>does</em> exist, both pointers enter it and keep going around forever — and since{' '}
            <code>fast</code> gains exactly one extra step on <code>slow</code> every iteration, the gap between them
            (measured around the cycle) shrinks by one each time. A shrinking gap on a loop of finite size must
            eventually hit zero: <code>fast</code> and <code>slow</code> become the <strong>same node</strong>, which
            only happens if they are both stuck circling the same cycle.
          </p>
          <div className="recurrence">{
`slow = head ; fast = head

while fast != null and fast.next != null:
    slow = slow.next
    fast = fast.next.next
    if slow == fast: return true       -- the two pointers met: a cycle exists

return false                           -- fast reached null: no cycle`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public boolean detectCycle(Node head) {
        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;                  // the pointers met inside the cycle
            }
        }
        return false;
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The alternative: a HashSet of visited nodes</div>
        Walking once with a single pointer and inserting every node into a <code>HashSet&lt;Node&gt;</code>, reporting
        a cycle the instant a node is seen that is already in the set, also works — <code>O(n)</code> time, but{' '}
        <code>O(n)</code> space for the set. Floyd&apos;s two-pointer version gets the same time bound in{' '}
        <code>O(1)</code> space, which is why it is the version worth knowing by heart; the hash-set version is worth
        knowing exists, as the natural first idea before arriving at the trick.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n)">
          The pointers meet within one full lap of the cycle, if one exists.
        </CxBox>
        <CxBox label="Space" value="O(1)">Two pointers — no auxiliary set.</CxBox>
      </Cx>

      {/* 20 */}
      <div id="length-of-a-loop-in-a-ll" data-topic-boundary="true" />
      <p className="part-subtitle">
        Once Floyd&apos;s algorithm has found the meeting point inside a cycle, measuring the cycle&apos;s length is
        one more lap, counted.
      </p>
      <div className="meta-row">
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Keep one pointer still, lap it with the other</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> If a linked list contains a cycle, return the number of nodes in that cycle;
          otherwise return <code>0</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 From the meeting point, lap it once more and count</div>
          Detect the cycle exactly as in 19. The instant <code>slow</code> and <code>fast</code> meet, both are
          standing somewhere inside the cycle — not necessarily at its start, but <em>on</em> it. From there, freeze
          one pointer&apos;s position conceptually and advance the other all the way around until it comes back to
          that same node, counting every step taken. That count is the cycle&apos;s exact length, because
          &quot;coming back to where you started by only moving forward&quot; is precisely what walking one full lap
          means.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private int findLength(Node slow, Node fast) {
        int cnt = 1;
        fast = fast.next;                     // take the first step away from the meeting point
        while (slow != fast) {
            cnt++;
            fast = fast.next;
        }
        return cnt;
    }

    public int lengthOfLoop(Node head) {
        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return findLength(slow, fast); // they just met -- lap the cycle once more
            }
        }
        return 0;                             // fast reached null: no cycle
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 Why <code>findLength</code> only moves one pointer
        </div>
        At the moment of the meeting, <code>slow</code> is treated as a fixed landmark inside the cycle;{' '}
        <code>fast</code> alone keeps stepping forward, one node at a time, and the count increments on every step
        until <code>fast</code> arrives back at <code>slow</code>. There is no need for the speed difference any more
        — that trick was only needed to <em>detect</em> that a cycle exists and to find a guaranteed point on it;
        measuring its length from a known point on it is just a plain walk.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Detection is <code>O(n)</code>; measuring the length is at most one more full lap.
        </CxBox>
        <CxBox label="Space" value="O(1)">Two pointers throughout.</CxBox>
      </Cx>

      {/* 21 */}
      <div id="delete-the-middle-node" data-topic-boundary="true" />
      <p className="part-subtitle">
        Middle-finding (18), with one twist: the pointer that deletes needs to stop one node{' '}
        <strong>before</strong> the middle, not on it.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 2095</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Start fast two steps ahead</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Delete the middle node of a linked list (for an even length, delete the second of
          the two middle nodes, matching 18&apos;s convention) and return the new head.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Deleting a node needs its predecessor, so stop slow one step short</div>
          <p>
            Finding the middle itself is problem 18&apos;s job; deleting it needs something slightly different — a
            pointer standing on the node <strong>just before</strong> the middle, so its <code>next</code> can be
            rewired to skip over the real middle. Starting <code>fast</code> <strong>two</strong> nodes ahead of{' '}
            <code>slow</code> (at <code>head.next.next</code> instead of <code>head</code>) shifts the whole race by
            exactly one position relative to problem 18&apos;s middle-finder, which lands <code>slow</code> on the
            predecessor of the middle instead of on the middle itself.
          </p>
          <div className="recurrence">{
`slow = head ; fast = head.next.next     -- fast starts TWO STEPS AHEAD

while fast != null and fast.next != null:
    slow = slow.next
    fast = fast.next.next

slow.next = slow.next.next               -- slow is the predecessor; splice the middle out
return head`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ One step ahead is NOT enough — it deletes the wrong node on odd-length lists
          </div>
          <p>
            It is tempting to shift <code>fast</code> by only one node (<code>fast = head.next</code>), mirroring
            problem 18&apos;s own middle-finder exactly. That shift is correct only for <strong>even</strong>-length
            lists; on an odd-length list it leaves <code>slow</code> sitting <em>on</em> the middle itself rather
            than just before it, and <code>slow.next</code> then deletes the node <strong>after</strong> the middle
            instead of the middle. A 5-node list <code>[0,1,2,3,4]</code>, whose middle is index 2, would wrongly
            lose index 3 instead. Shifting by <strong>two</strong> nodes is what correctly reproduces &quot;the
            predecessor of the middle&quot; for every length, odd or even.
          </p>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 A one-node list is a special case</div>
          A single-node list has no &quot;middle&quot; left once it is deleted — the answer is simply{' '}
          <code>null</code>. Checking <code>head.next == null</code> up front and returning <code>null</code>{' '}
          immediately avoids the main loop ever running on a list too short for the{' '}
          <code>fast = head.next.next</code> shift to make sense.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node deleteMiddle(Node head) {
        if (head == null || head.next == null) {
            return null;                      // 0 or 1 nodes: nothing is left after deletion
        }

        Node slow = head;
        Node fast = head.next.next;           // shifted TWO steps ahead of slow

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        slow.next = slow.next.next;           // slow now sits on the middle's PREDECESSOR
        return head;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n)">One pass to find the predecessor of the middle.</CxBox>
        <CxBox label="Space" value="O(1)">Two pointers.</CxBox>
      </Cx>

      {/* 22 */}
      <div id="starting-point-of-a-loop" data-topic-boundary="true" />
      <p className="part-subtitle">
        The most celebrated consequence of Floyd&apos;s algorithm: a short proof of distances shows that a pointer
        restarted from the head meets the cycle&apos;s entry point exactly where the original two pointers collided.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 142</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Reset one pointer to the head after the meeting</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> If a linked list has a cycle, return the node where the cycle begins; otherwise
          return <code>null</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The distance argument, in brief</div>
          <p>
            Let the distance from the head to the cycle&apos;s start be <code>L</code>, and let the meeting point
            found by Floyd&apos;s detection (19) be <code>k</code> steps into the cycle from its start. By the time{' '}
            <code>slow</code> and <code>fast</code> meet, it can be shown (from <code>fast</code> having travelled
            exactly twice <code>slow</code>&apos;s distance, and both having gone around the cycle some whole number
            of times) that <strong>the remaining distance from the meeting point back around to the cycle&apos;s
            start equals <code>L</code></strong> — the exact same distance as from the head to the cycle&apos;s start
            in the first place.
          </p>
          <p>
            So: once <code>slow</code> and <code>fast</code> meet, reset one of them to <code>head</code>, and advance{' '}
            <strong>both</strong> remaining pointers one step at a time from there. Having equal distances left to
            travel to the same destination, they arrive together — at the cycle&apos;s starting node.
          </p>
          <div className="recurrence">{
`slow = head ; fast = head
while fast != null and fast.next != null:
    slow = slow.next ; fast = fast.next.next
    if slow == fast:                         -- a cycle exists; they just met
        slow = head                          -- RESET one pointer to the head
        while slow != fast:
            slow = slow.next
            fast = fast.next                 -- now both step ONE at a time
        return slow                           -- they meet at the cycle's start

return null                                   -- fast reached null: no cycle`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node firstNode(Node head) {
        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                slow = head;                  // reset ONE pointer to the head
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;         // both now move ONE step at a time
                }
                return slow;                  // the cycle's starting node
            }
        }
        return null;                          // no cycle
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  list:  1 -> 2 -> 3 -> 4 -> 5
                   ^         |
                   +---------+      (cycle starts at node 3, L=2 steps from head)

  phase 1 (detect): slow,fast both start at 1
    step1: slow=2  fast=3
    step2: slow=3  fast=5
    step3: slow=4  fast=4      <-- MEET at node 4

  phase 2 (locate start): slow reset to head=1 ; fast stays at 4
    slow=1,fast=4 -> not equal -> slow=2,fast=5
    slow=2,fast=5 -> not equal -> slow=3,fast=3     <-- MEET at node 3

  answer: node 3 -- exactly where the cycle begins`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Detection plus the second, slower-paced walk are both linear.
        </CxBox>
        <CxBox label="Space" value="O(1)">
          Two pointers throughout — no distance values are even stored.
        </CxBox>
      </Cx>

      {/* 23 */}
      <div id="delete-all-occurrences-in-dll" data-topic-boundary="true" />
      <p className="part-subtitle">
        Every deletion in this walk is <code>O(1)</code>, because a DLL node already knows both of its neighbours.
        The next three problems lean specifically on those two-way pointers — deleting without a predecessor search,
        and walking from both ends inward the way an array two-pointer technique would.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Delete-in-place while walking</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Delete every node holding a given value <code>k</code> from a doubly linked list,
          and return the (possibly new) head.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Rewire the neighbours directly; only move the head pointer when the head itself is deleted
          </div>
          <p>
            Walk the list with a single pointer. Whenever its value matches <code>k</code>, read off its{' '}
            <code>prev</code> and <code>next</code> neighbours (both already known, no search needed), and reconnect
            them to each other — skipping the current node entirely. The one extra piece of bookkeeping: if the node
            being deleted happens to be the current <strong>head</strong>, the list&apos;s head reference itself has
            to move to the next node, since nothing else in the list points at the old head any more once it is
            spliced out.
          </p>
          <div className="recurrence">{
`temp = head
while temp != null:
    if temp.data == k:
        if temp == head: head = temp.next        -- moving the head is special; nothing else is
        nextNode = temp.next ; prevNode = temp.prev
        if nextNode != null: nextNode.prev = prevNode
        if prevNode != null: prevNode.next = nextNode
        temp = nextNode                          -- continue from where we rewired to
    else:
        temp = temp.next

return head`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Both neighbour checks need a null guard</div>
          If the matching node is the very first node, it has no <code>prev</code> to rewire (hence the special
          head-handling above); if it is the very last node, it has no <code>next</code> to rewire. Both{' '}
          <code>if (nextNode != null)</code> and the symmetric check on <code>prevNode</code> exist specifically so
          deleting the first or last occurrence of the key never dereferences a null pointer.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node deleteAllOccurrences(Node head, int k) {
        Node temp = head;

        while (temp != null) {
            if (temp.data == k) {
                if (temp == head) {
                    head = temp.next;            // the head itself is being deleted
                }

                Node nextNode = temp.next;
                Node prevNode = temp.prev;

                if (nextNode != null) {
                    nextNode.prev = prevNode;
                }
                if (prevNode != null) {
                    prevNode.next = nextNode;
                }

                temp.next = null;
                temp.prev = null;
                temp = nextNode;                 // continue from the node we reconnected to
            } else {
                temp = temp.next;
            }
        }
        return head;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One pass; every deletion along the way is <code>O(1)</code>.
        </CxBox>
        <CxBox label="Space" value="O(1)">One traversal pointer.</CxBox>
      </Cx>

      {/* 24 */}
      <div id="pairs-with-given-sum-dll" data-topic-boundary="true" />
      <p className="part-subtitle">
        The classic array two-pointer technique, transplanted onto a linked list — which only works because a DLL can
        walk backward from the tail just as easily as forward from the head.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Left from the head, right from the tail</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a <strong>sorted</strong> doubly linked list and a target sum{' '}
          <code>k</code>, return every pair of values that add up to <code>k</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why sortedness plus two-way pointers makes this O(n) instead of O(n²)</div>
          <p>
            With the list sorted, start one pointer at the head (<code>left</code>, the smallest value) and another
            at the tail (<code>right</code>, the largest). At every step, compare their sum to <code>k</code>:
          </p>
          <ul>
            <li>
              If the sum equals <code>k</code>, record the pair and move <strong>both</strong> pointers inward.
            </li>
            <li>
              If the sum is <strong>too small</strong>, the only way to increase it is to advance <code>left</code> —
              moving <code>right</code> would only make the sum smaller, since the list is sorted.
            </li>
            <li>
              If the sum is <strong>too large</strong>, symmetrically, move <code>right</code> backward.
            </li>
          </ul>
          <p>
            Each step moves one of the two pointers strictly closer to the other, so the whole scan is bounded by the
            list&apos;s length rather than every possible pair.
          </p>
          <div className="recurrence">{
`left = head ; right = findTail(head)

while left.data < right.data:
    sum = left.data + right.data
    if sum == k:
        record (left.data, right.data)
        left = left.next ; right = right.prev
    elif sum < k:
        left = left.next
    else:
        right = right.prev

return the recorded pairs`
          }</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 Finding the tail costs a traversal here, because no tail reference is given</div>
          Unlike an array (where the last index is <code>O(1)</code> to compute) or a DLL that happens to already
          carry a stored <code>tail</code> reference, this problem&apos;s input is only a <code>head</code>.{' '}
          <code>findTail</code> walks the whole list once up front purely to locate the starting position for{' '}
          <code>right</code> — after that one-time cost, the main two-pointer scan itself is linear.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private Node findTail(Node head) {
        Node tail = head;
        while (tail.next != null) {
            tail = tail.next;
        }
        return tail;
    }

    public List<int[]> findPairs(Node head, int k) {
        List<int[]> ans = new ArrayList<>();
        if (head == null) {
            return ans;
        }

        Node left = head;
        Node right = findTail(head);

        while (left.data < right.data) {
            if (left.data + right.data == k) {
                ans.add(new int[]{left.data, right.data});
                left = left.next;
                right = right.prev;
            } else if (left.data + right.data < k) {
                left = left.next;
            } else {
                right = right.prev;
            }
        }
        return ans;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ The loop condition compares VALUES, not node identity</div>
        Using <code>left.data &lt; right.data</code> rather than something like &quot;while{' '}
        <code>left != right</code>&quot; is deliberate: with duplicate values in the list, <code>left</code> and{' '}
        <code>right</code> could sit on different nodes holding the <em>same</em> value right as the pointers are
        about to cross, and a node-identity check could let them pass each other without the loop ever catching up.
        Comparing the actual values is what correctly stops exactly when the two pointers would otherwise cross or
        meet.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n)">The tail search plus the inward scan are both linear.</CxBox>
        <CxBox label="Space" value="O(1)">
          Excluding the output list itself — just two pointers.
        </CxBox>
      </Cx>

      {/* 25 */}
      <div id="remove-duplicates-sorted-dll" data-topic-boundary="true" />
      <p className="part-subtitle">
        Sortedness again does the heavy lifting: every duplicate of a value sits in one unbroken run, so a single
        forward pass catches all of them.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Skip forward while the value repeats</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a <strong>sorted</strong> doubly linked list, remove duplicate values so
          each distinct value appears exactly once, preserving order.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 An inner loop consumes a whole run of duplicates before the outer one advances
          </div>
          At each node, look ahead through every immediately-following node that shares its value, and once that
          inner scan finds a node with a <strong>different</strong> value (or runs off the end), splice the current
          node directly to that different node — discarding the whole run of duplicates in one connection, rather
          than removing them one at a time.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node removeDuplicates(Node head) {
        Node temp = head;

        while (temp != null && temp.next != null) {
            Node nextNode = temp.next;

            while (nextNode != null && nextNode.data == temp.data) {
                Node duplicate = nextNode;
                nextNode = nextNode.next;
                duplicate.next = null;           // detach the duplicate cleanly
                duplicate.prev = null;
            }

            temp.next = nextNode;                // skip the WHOLE run of duplicates at once
            if (nextNode != null) {
                nextNode.prev = temp;
            }
            temp = temp.next;
        }
        return head;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  before:  1 <-> 1 <-> 1 <-> 2 <-> 3 <-> 3

  temp=1(first):
    inner loop consumes the next two 1's -- nextNode lands on the node holding 2
    temp.next = nextNode(2) ; nextNode.prev = temp
    temp = 2

  temp=2:
    inner loop: next node holds 3, not equal to 2 -- inner loop does not run
    temp.next stays 3 ; temp = 3

  temp=3(first):
    inner loop consumes the second 3 -- nextNode becomes null
    temp.next = null
    temp = null -> outer loop ends

  after:  1 <-> 2 <-> 3`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Despite the nested loops, every node is visited by the inner loop at most once overall.
        </CxBox>
        <CxBox label="Space" value="O(1)">Existing nodes are rewired in place.</CxBox>
      </Cx>

      {/* 26 */}
      <div id="reverse-nodes-in-groups-of-k" data-topic-boundary="true" />
      <p className="part-subtitle">
        Reverse a Linked List (14), applied repeatedly to fixed-size chunks instead of to the whole list at once —
        with a look-ahead check so a short final group is left untouched. The remaining problems combine the earlier
        operations into bigger machinery: reversing in chunks, merging whole lists, and linked structures that are no
        longer a simple chain at all.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 25</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Reverse a chunk, then stitch it back in</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Reverse every consecutive group of <code>k</code> nodes. If the number of nodes
          remaining at the end is not a multiple of <code>k</code>, leave that final short group as it is.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Check that a full group exists before reversing anything</div>
          <p>
            Before touching any pointers, walk <code>k</code> nodes ahead to confirm a <strong>full</strong> group of{' '}
            <code>k</code> actually exists starting here — if the list runs out early, the remaining nodes are left
            exactly as they are, per the problem&apos;s own rule. Once a full group is confirmed, reverse just those{' '}
            <code>k</code> nodes (the same iterative reversal from 14, bounded to stop after <code>k</code> steps
            instead of running to the end of the list), then <strong>recurse on the rest of the list</strong> and
            attach that result to the tail of the just-reversed group — the group&apos;s own original head, which is
            now its last node.
          </p>
          <div className="recurrence">{
`getKthNode(temp, k):
    k -= 1
    while temp != null and k > 0: temp = temp.next ; k -= 1
    return temp                           -- null if fewer than k nodes remain

kReverse(head, k):
    kThNode = getKthNode(head, k)
    if kThNode == null: return head       -- fewer than k nodes left: leave this group alone

    nextNode = kThNode.next
    kThNode.next = null                   -- cut this group off from the rest, temporarily

    reverse(head)                         -- reverse JUST this isolated group of k nodes

    head.next = kReverse(nextNode, k)     -- recurse on the rest, attach to the group's new tail
    return kThNode                        -- the group's old k-th node is now its head`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Cutting the group off before reversing is what keeps the reversal bounded</div>
          Setting <code>kThNode.next = null</code> temporarily disconnects the group from the rest of the list before
          calling the plain reversal routine on it. Without that cut, a reversal that walks until{' '}
          <code>temp == null</code> would keep going straight past the group&apos;s boundary and reverse the{' '}
          <em>entire remainder</em> of the list, not just the intended <code>k</code> nodes.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private Node getKthNode(Node temp, int k) {
        k -= 1;
        while (temp != null && k > 0) {
            k--;
            temp = temp.next;
        }
        return temp;
    }

    private Node reverseLinkedList(Node head) {
        Node prev = null;
        Node temp = head;
        while (temp != null) {
            Node front = temp.next;
            temp.next = prev;
            prev = temp;
            temp = front;
        }
        return prev;
    }

    public Node kReverse(Node head, int k) {
        Node kThNode = getKthNode(head, k);
        if (kThNode == null) {
            return head;                      // fewer than k nodes remain: leave as is
        }

        Node nextNode = kThNode.next;
        kThNode.next = null;                  // isolate exactly k nodes from the rest

        reverseLinkedList(head);              // reverse ONLY the isolated group

        head.next = kReverse(nextNode, k);    // recurse on the remainder, attach to the new tail
        return kThNode;                       // the old k-th node is this group's new head
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  head: 1 -> 2 -> 3 -> 4 -> 5 ,  k = 3

  kReverse(1, 3):
    getKthNode(1,3) -> node 3 (walked 2 steps)
    nextNode = 4 ; 3.next = null            -- isolated group: 1->2->3
    reverse(1) on the isolated group -> 3->2->1
    head(=1).next = kReverse(4, 3)

      kReverse(4, 3):
        getKthNode(4,3) -> walk 2 steps from 4: 4->5->null -> returns null (only 2 left)
        return head(=4) unchanged           -- too short for a full group: leave as 4->5

    1.next = 4            -- attach the unchanged remainder to the reversed group's new tail
    return kThNode = 3    -- this group's new head

  final: 3 -> 2 -> 1 -> 4 -> 5`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Every node is visited a constant number of times across all the recursive calls combined.
        </CxBox>
        <CxBox label="Space" value="O(n/k)">Recursion depth is one call per group.</CxBox>
      </Cx>

      {/* 27 */}
      <div id="rotate-a-linked-list" data-topic-boundary="true" />
      <p className="part-subtitle">
        Find the tail, join it back to the head to form a ring, then break the ring open at a new point —{' '}
        <code>k</code> nodes further along.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 61</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Close the loop, then reopen it elsewhere</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Rotate a linked list to the right by <code>k</code> places.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Rotating a closed ring is just picking a new place to cut it open</div>
          <p>
            Find the list&apos;s length and its tail in one pass. Temporarily join the tail&apos;s <code>next</code>{' '}
            to the original <code>head</code>, turning the list into a genuine ring. Rotating the list to the right
            by <code>k</code> places is now equivalent to walking <code>length - k</code> steps around that ring from
            the head and cutting it there: the node you land on becomes the new head, and the node just before it
            becomes the new tail, with its <code>next</code> set back to <code>null</code> to reopen the ring into a
            list again.
          </p>
          <div className="recurrence">{
`if head == null or k == 0: return head

tail = head ; len = 1
while tail.next != null: tail = tail.next ; len++

k = k % len                           -- rotating by a full length changes nothing
if k == 0: return head                -- already back to the original arrangement

tail.next = head                      -- CLOSE the ring

newTailNode = findNthNode(head, len - k)   -- walk to the node just before the new head
head = newTailNode.next                    -- the new head
newTailNode.next = null                    -- REOPEN the ring here

return head`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ <code>k % len</code> before doing anything else
          </div>
          Rotating a list of length <code>len</code> by exactly <code>len</code> places (or any multiple of it)
          returns it to its original arrangement, so only <code>k % len</code> of the rotation actually has any
          visible effect. Skipping this reduction would still produce a correct answer eventually, but would waste a
          potentially enormous number of unnecessary rotations when <code>k</code> is much larger than the list
          itself — and if <code>k % len</code> comes out to exactly <code>0</code>, the ring must never even be
          closed, since there is nothing to rotate.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private Node findNthNode(Node temp, int k) {
        k -= 1;
        while (k > 0) {
            temp = temp.next;
            k--;
        }
        return temp;
    }

    public Node rotateList(Node head, int k) {
        if (head == null || head.next == null || k == 0) {
            return head;
        }

        Node tail = head;
        int len = 1;
        while (tail.next != null) {
            tail = tail.next;
            len++;
        }

        k = k % len;
        if (k == 0) {
            return head;                      // a full rotation: nothing changes
        }

        tail.next = head;                     // close the list into a ring

        Node newLastNode = findNthNode(head, len - k);
        head = newLastNode.next;              // the new head
        newLastNode.next = null;              // reopen the ring right here
        return head;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  head: 1 -> 2 -> 3 -> 4 -> 5 ,  k = 2

  len = 5 ; k = 2 % 5 = 2
  tail(5).next = head(1)        -- ring: 1->2->3->4->5->1->2->...

  newLastNode = findNthNode(head, len-k=3) = node 3

  head = 3.next = 4             -- new head
  3.next = null                 -- reopen the ring right after node 3

  result: 4 -> 5 -> 1 -> 2 -> 3        (rotated right by 2)`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n)">
          One pass to find the length/tail, one more to find the new split point.
        </CxBox>
        <CxBox label="Space" value="O(1)">No new nodes; the same nodes are rewired.</CxBox>
      </Cx>

      {/* 28 */}
      <div id="merge-two-sorted-lls" data-topic-boundary="true" />
      <p className="part-subtitle">
        The merge step of merge sort, written directly against linked lists — which turns out to need no auxiliary
        array at all.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 21</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Dummy head, pick the smaller front each time</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Merge two sorted linked lists into one sorted list by splicing the existing nodes
          together (no new nodes).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Always attach the smaller of the two current fronts</div>
          With a dummy head (the same device from Add Two Numbers, 10) to avoid a special case for the first node,
          repeatedly compare the two lists&apos; current front nodes and attach whichever is smaller to the growing
          result, advancing only that list&apos;s pointer. Once one list runs out entirely, the <strong>other</strong>{' '}
          list&apos;s remaining nodes are already sorted relative to each other and all larger than everything merged
          so far — so they can be attached in one single link, with no further comparisons needed.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node mergeTwoLists(Node list1, Node list2) {
        Node dummyNode = new Node(-1);
        Node temp = dummyNode;

        while (list1 != null && list2 != null) {
            if (list1.data <= list2.data) {
                temp.next = list1;
                list1 = list1.next;
            } else {
                temp.next = list2;
                list2 = list2.next;
            }
            temp = temp.next;
        }

        // Whichever list still has nodes left is already sorted -- attach it in one go.
        if (list1 != null) {
            temp.next = list1;
        } else {
            temp.next = list2;
        }

        return dummyNode.next;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n + m)">Every node from both lists is visited exactly once.</CxBox>
        <CxBox label="Space" value="O(1)">No new nodes — existing ones are relinked.</CxBox>
      </Cx>

      {/* 29 */}
      <div id="flattening-a-linked-list" data-topic-boundary="true" />
      <p className="part-subtitle">
        A linked list of linked lists: every node has a normal <code>next</code> pointer across the top row, and its
        own sorted <code>child</code> list hanging beneath it. Flatten the whole thing into one sorted list.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Merge, recursively, from the back</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A linked list where every node additionally has a <code>child</code> pointer to
          its own separate, already-sorted linked list (using <code>child</code> in place of <code>next</code> within
          that sub-list). Flatten the structure into a single sorted list, linked via <code>child</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Recurse to the last top-row node, then merge pairwise on the way back</div>
          <p>
            This is Merge Two Sorted Linked Lists (28), applied recursively. Recurse along the top-row{' '}
            <code>next</code> pointers all the way to the last node first; its own <code>child</code> list is, by
            definition, already flat and sorted, needing nothing further. Walking back up the call stack, merge the
            current node&apos;s <code>child</code> list with the already-fully-flattened result from everything after
            it — exactly the same &quot;trust what is already done&quot; shape recursive reversal (14) used, just
            merging two sorted lists instead of flipping pointers.
          </p>
          <div className="recurrence">{
`flattenLinkedList(head):
    if head == null or head.next == null: return head    -- last top-row node: already flat

    mergedHead = flattenLinkedList(head.next)            -- flatten everything after, first
    head = mergeTwoLists(head, mergedHead)               -- merge THIS node's child list in
    return head

mergeTwoLists(list1, list2):    -- identical to 28, but merges along .child instead of .next`
          }</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">
            📌 The merge uses <code>child</code> as its &quot;next&quot;, not the top-row <code>next</code>
          </div>
          Once two lists are merged by this routine, the result is a chain linked entirely through{' '}
          <code>child</code> — the top-row <code>next</code> pointers are no longer meaningful for anything past the
          original head, and the final flattened answer is read off by following <code>child</code> from the head, not{' '}
          <code>next</code>.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Node {
    int data;
    Node next;
    Node child;

    Node(int data) {
        this.data = data;
        this.next = null;
        this.child = null;
    }
}

class Solution {
    private Node mergeTwoLists(Node list1, Node list2) {
        Node dummyNode = new Node(-1);
        Node res = dummyNode;

        while (list1 != null && list2 != null) {
            if (list1.data < list2.data) {
                res.child = list1;
                res = list1;
                list1 = list1.child;
            } else {
                res.child = list2;
                res = list2;
                list2 = list2.child;
            }
            res.next = null;                  // the merged chain only uses .child from here on
        }

        if (list1 != null) {
            res.child = list1;
        } else {
            res.child = list2;
        }

        if (dummyNode.child != null) {
            dummyNode.child.next = null;
        }
        return dummyNode.child;
    }

    public Node flattenLinkedList(Node head) {
        if (head == null || head.next == null) {
            return head;                      // the last top-row node: its child is already flat
        }

        Node mergedHead = flattenLinkedList(head.next);
        head = mergeTwoLists(head, mergedHead);
        return head;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ This problem needs a <code>child</code> field the basic <code>Node</code> does not have
        </div>
        Every other problem in this topic reuses the plain <code>Node</code> class from section 1 as-is. Flattening
        genuinely needs a third field, so this code block declares its own extended <code>Node</code> — a reminder
        that the canonical class is a starting point, not a constraint, and a problem is free to add exactly the
        field it needs.
      </div>

      <Cx>
        <CxBox label="Time" value="O(N·M)">
          <code>N</code> top-row nodes, <code>M</code> average child-list length — every node is merged in once.
        </CxBox>
        <CxBox label="Space" value="O(N)">Recursion depth, one frame per top-row node.</CxBox>
      </Cx>

      {/* 30 */}
      <div id="merge-k-sorted-lists" data-topic-boundary="true" />
      <p className="part-subtitle">
        Merge Two Sorted Lists (28), generalised to <code>k</code> lists at once using a min-heap to always know
        which of the <code>k</code> current fronts is smallest.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 23</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Min-heap over the k current fronts</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given <code>k</code> sorted linked lists, merge them into one sorted list.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 A min-heap finds the smallest of k candidates in O(log k), repeatedly</div>
          <p>
            Seed a <code>PriorityQueue</code> with the head node of every one of the <code>k</code> lists (skipping
            any list that happens to be empty). Repeatedly pop the smallest node in the heap, attach it to the result,
            and — if that node has a <code>next</code> — push its successor into the heap, keeping exactly one
            &quot;current front&quot; per still-nonempty list in the heap at any time.
          </p>
          <div className="recurrence">{
`pq = min-heap by node value, holding ONE entry per nonempty list's current front
for each list head: if head != null: pq.add(head)

dummyNode = new Node(-1) ; temp = dummyNode
while pq not empty:
    smallest = pq.poll()
    temp.next = smallest
    temp = temp.next
    if smallest.next != null: pq.add(smallest.next)   -- the same list's next front

return dummyNode.next`
          }</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 Why this beats merging the lists two at a time</div>
          Merging the <code>k</code> lists by repeatedly calling Merge Two Sorted Lists (28) pairwise costs{' '}
          <code>O(N·k)</code> overall, where <code>N</code> is the total number of nodes — each of the roughly{' '}
          <code>k</code> merge rounds re-touches every node processed so far. The heap approach only ever holds{' '}
          <code>k</code> candidates at a time and does one <code>O(log k)</code> operation per node{' '}
          <strong>total</strong> (not per round), giving <code>O(N log k)</code> — a real win once <code>k</code> is
          large.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public Node mergeKLists(Node[] listArray) {
        PriorityQueue<Node> pq = new PriorityQueue<Node>((a, b) -> a.data - b.data);

        for (int i = 0; i < listArray.length; i++) {
            if (listArray[i] != null) {
                pq.add(listArray[i]);
            }
        }

        Node dummyNode = new Node(-1);
        Node temp = dummyNode;

        while (!pq.isEmpty()) {
            Node smallest = pq.poll();
            temp.next = smallest;
            temp = temp.next;

            if (smallest.next != null) {
                pq.add(smallest.next);        // the same list's next front joins the heap
            }
        }

        return dummyNode.next;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(N log k)">
          <code>N</code> = total nodes across all lists; each is pushed and popped once.
        </CxBox>
        <CxBox label="Space" value="O(k)">The heap never holds more than one entry per input list.</CxBox>
      </Cx>

      {/* 31 */}
      <div id="sort-a-linked-list" data-topic-boundary="true" />
      <p className="part-subtitle">
        Merge sort, the algorithm whose &quot;merge&quot; step this topic has already built twice over — and whose
        &quot;split in half&quot; step is exactly the fast/slow middle-finder from Part 4.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 148</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Split at the middle, sort both halves, merge</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Sort a linked list in <code>O(n log n)</code> time.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why merge sort, specifically, fits a linked list so naturally</div>
          <p>
            An array-based quicksort partitions in place using random access, which a linked list cannot do cheaply.
            Merge sort, by contrast, needs only two operations a linked list already does well:{' '}
            <strong>splitting</strong> a list into two halves (the fast/slow pointer trick from Middle of a Linked
            List, 18, finds the split point in one pass) and <strong>merging</strong> two sorted lists back together
            (problem 28, unchanged). Recursively split down to single nodes — trivially sorted — then merge pairs
            back together on the way up the call stack.
          </p>
          <div className="recurrence">{
`sortLL(head):
    if head == null or head.next == null: return head   -- 0 or 1 nodes: already sorted

    middle = findMiddle(head)
    right = middle.next
    middle.next = null                     -- SEVER the list into two independent halves
    left = head

    left = sortLL(left)                    -- recursively sort each half
    right = sortLL(right)

    return mergeTwoLists(left, right)      -- problem 28, unchanged`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ <code>findMiddle</code> here must NOT be the exact same version as problem 18
          </div>
          Problem 18&apos;s middle-finder starts both pointers at <code>head</code>, which for a 2-node list returns
          the <strong>second</strong> node as the middle — and severing there would leave an empty right half that
          recurses forever on the same 2-node input. The version used for splitting starts <code>fast</code> at{' '}
          <code>head.next</code> instead, landing on the <strong>first</strong> of the two middles for an even-length
          list, which always leaves both halves strictly shorter than the original. This is a small but
          easy-to-miss detail when reusing &quot;the same&quot; fast/slow pattern for a different purpose.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private Node findMiddle(Node head) {
        Node slow = head;
        Node fast = head.next;                // shifted one step ahead -- see the warning above
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    private Node mergeTwoLists(Node list1, Node list2) {
        Node dummyNode = new Node(-1);
        Node temp = dummyNode;
        while (list1 != null && list2 != null) {
            if (list1.data < list2.data) {
                temp.next = list1;
                list1 = list1.next;
            } else {
                temp.next = list2;
                list2 = list2.next;
            }
            temp = temp.next;
        }
        if (list1 != null) temp.next = list1;
        else temp.next = list2;
        return dummyNode.next;
    }

    public Node sortLL(Node head) {
        if (head == null || head.next == null) {
            return head;
        }

        Node middle = findMiddle(head);
        Node right = middle.next;
        middle.next = null;                   // sever into two independent halves
        Node left = head;

        left = sortLL(left);
        right = sortLL(right);

        return mergeTwoLists(left, right);
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n log n)">
          <code>log n</code> levels of splitting, <code>O(n)</code> work merging at each level.
        </CxBox>
        <CxBox label="Space" value="O(log n)">
          Recursion depth — the list itself is sorted in place, no auxiliary array.
        </CxBox>
      </Cx>

      {/* 32 */}
      <div id="clone-ll-random-pointer" data-topic-boundary="true" />
      <p className="part-subtitle">
        A third pointer per node, pointing anywhere in the list (or nowhere), makes a direct copy awkward — the
        classic fix weaves the copies directly into the original list instead of using a lookup table.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 138</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Interleave, wire randoms, then unweave</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Each node has a <code>next</code> pointer and a <code>random</code> pointer, the
          latter pointing to any node in the list (or <code>null</code>). Return a deep copy of the whole structure.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why a direct copy struggles, and the three-pass fix</div>
          <p>
            Copying node-by-node in one pass runs into a problem: a node&apos;s <code>random</code> pointer may point
            to a node that has not been copied <strong>yet</strong>, so there is nothing valid to point the
            copy&apos;s own <code>random</code> at in that moment. A natural fix is a{' '}
            <code>HashMap&lt;Node, Node&gt;</code> from original to copy, filled in a first pass and consulted in a
            second — entirely correct, at <code>O(n)</code> extra space.
          </p>
          <p>
            The classic <code>O(1)</code>-extra-space trick instead threads every copy directly into the original
            list, right after the node it copies:
          </p>
          <ol className="steps">
            <li>
              <strong>Interleave.</strong> For every original node, insert a copy of it immediately after:{' '}
              <code>orig1 → copy1 → orig2 → copy2 → …</code>
            </li>
            <li>
              <strong>Wire the randoms.</strong> Now <code>copy.random</code> can be set to{' '}
              <code>orig.random.next</code> — because <code>orig.random</code>&apos;s copy is, by construction,
              sitting immediately after it.
            </li>
            <li>
              <strong>Unweave.</strong> Separate the interleaved chain back into the original list (restored to its
              original shape) and the new, fully-independent copy list.
            </li>
          </ol>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The original list must be restored, not left interleaved</div>
          Step 1 mutates the input list&apos;s own <code>next</code> pointers as a side effect of the technique. The
          unweave step is not optional cleanup — without it, the function would corrupt the caller&apos;s original
          list permanently, which is exactly the kind of side effect the palindrome check (15) was careful to avoid
          as well.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Node {
    int data;
    Node next;
    Node random;

    Node(int data) {
        this.data = data;
        this.next = null;
        this.random = null;
    }
}

class Solution {
    private void insertCopyInBetween(Node head) {
        Node temp = head;
        while (temp != null) {
            Node nextElement = temp.next;
            Node copy = new Node(temp.data);

            copy.next = nextElement;
            temp.next = copy;
            temp = nextElement;
        }
    }

    private void connectRandomPointers(Node head) {
        Node temp = head;
        while (temp != null) {
            Node copyNode = temp.next;
            if (temp.random != null) {
                copyNode.random = temp.random.next;   // the copy of temp.random sits after it
            } else {
                copyNode.random = null;
            }
            temp = temp.next.next;                    // skip the copy, to the next ORIGINAL
        }
    }

    private Node getDeepCopyList(Node head) {
        Node temp = head;
        Node dummyNode = new Node(-1);
        Node res = dummyNode;

        while (temp != null) {
            // Take the copy out of the interleaved chain.
            res.next = temp.next;
            res = res.next;

            // Unweave: restore the ORIGINAL list's next pointer.
            temp.next = temp.next.next;
            temp = temp.next;
        }
        return dummyNode.next;
    }

    public Node cloneLL(Node head) {
        if (head == null) {
            return null;
        }
        insertCopyInBetween(head);
        connectRandomPointers(head);
        return getDeepCopyList(head);
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 Reading <code>connectRandomPointers</code>&apos;s advance step
        </div>
        <code>temp = temp.next.next</code> moves two nodes forward in the interleaved chain — past the
        just-processed copy, landing on the <strong>next original</strong> node, not its copy. This mirrors the same
        &quot;skip the node you just handled&quot; shape as the odd/even rewiring in problem 11, applied to a
        read-only pass instead of a rewiring one.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n)">
          Three separate linear passes: interleave, wire randoms, unweave.
        </CxBox>
        <CxBox label="Space" value="O(1)">
          Excluding the output copy itself — no hash map needed.
        </CxBox>
      </Cx>

      {/* 33 */}
      <div id="design-browser-history" data-topic-boundary="true" />
      <p className="part-subtitle">
        A doubly linked list is, quite literally, a browser&apos;s back/forward history — <code>prev</code> is
        &quot;back,&quot; <code>next</code> is &quot;forward,&quot; and visiting a new page overwrites whatever
        &quot;forward&quot; used to lead to.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1472</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">DLL as the natural data structure</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Design a browser history system supporting: start at a homepage,{' '}
          <code>visit(url)</code> a new page (which discards any forward history), move <code>back(steps)</code>, and
          move <code>forward(steps)</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The current page is a node; back/forward are just prev/next, clamped</div>
          <p>
            Keep one reference, <code>currentPage</code>, which is always the DLL node for the page being viewed
            right now. <strong>Visiting</strong> a new URL creates a fresh node, links it after the current one, and
            moves <code>currentPage</code> to it — which automatically discards any old &quot;forward&quot; page,
            because nothing ever re-links to whatever used to be ahead of the old current page.{' '}
            <strong>Back</strong> and <strong>forward</strong> simply walk <code>prev</code> or <code>next</code>{' '}
            repeatedly, stopping early the moment the chain runs out — you cannot go back past the very first page
            you visited, or forward past the most recent one.
          </p>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Visiting a new page must drop the OLD forward chain entirely</div>
          Simply setting <code>currentPage.next = newNode</code> is not enough if the current page already had a{' '}
          <code>next</code> from an earlier forward move — that old forward chain needs to be replaced, not appended
          to. Because the new node&apos;s own <code>next</code> starts as <code>null</code> by construction,
          assigning <code>currentPage.next = newNode</code> overwrites whatever the old <code>next</code> reference
          was, and the old forward pages become unreachable (and, in Java, eligible for garbage collection)
          automatically — exactly the behaviour the problem specifies.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Node {
    String data;
    Node next;
    Node prev;

    Node(String data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class Browser {
    private Node currentPage;

    public Browser(String homepage) {
        currentPage = new Node(homepage);
    }

    public void visit(String url) {
        Node newNode = new Node(url);
        currentPage.next = newNode;           // drops any old forward chain automatically
        newNode.prev = currentPage;
        currentPage = newNode;
    }

    public String back(int steps) {
        while (steps > 0 && currentPage.prev != null) {
            currentPage = currentPage.prev;
            steps--;
        }
        return currentPage.data;
    }

    public String forward(int steps) {
        while (steps > 0 && currentPage.next != null) {
            currentPage = currentPage.next;
            steps--;
        }
        return currentPage.data;
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">
          💡 This <code>Node</code> holds a <code>String</code>, not an <code>int</code>
        </div>
        It is the only problem in this topic whose payload is not numeric — a reminder that the <code>data</code>{' '}
        field&apos;s type was never the point. Some write-ups also name the backward pointer <code>back</code> rather
        than <code>prev</code>, reading more naturally next to a <code>back()</code> method; this topic keeps{' '}
        <code>prev</code> throughout for consistency with every other section&apos;s <code>Node</code> class.
      </div>

      <Cx>
        <CxBox label="visit" value="O(1)">One new node, two pointer writes.</CxBox>
        <CxBox label="back / forward" value="O(steps)">
          Bounded by how many steps are actually taken, not the history&apos;s total size.
        </CxBox>
      </Cx>

      {/* 34 */}
      <div id="patterns-and-cheat-sheet" data-topic-boundary="true" />
      <p className="part-subtitle">
        Everything in this topic reduces to a small handful of pointer-manipulation ideas, reused over and over
        against slightly different wiring. Section numbers below match the sidebar&apos;s numbering.
      </p>

      <div className="subsection-header"><h3>Pattern recognition</h3></div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Phrase in the problem</th>
              <th>Technique</th>
              <th>Section</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&quot;find the middle&quot; / &quot;second half&quot;</td>
              <td>Fast/slow pointers (fast moves 2× slow)</td>
              <td>18, 31</td>
            </tr>
            <tr>
              <td>&quot;detect a cycle&quot; / &quot;has a loop&quot;</td>
              <td>Floyd&apos;s tortoise &amp; hare</td>
              <td>19</td>
            </tr>
            <tr>
              <td>&quot;length of the cycle&quot;</td>
              <td>Lap the cycle once more from the meeting point</td>
              <td>20</td>
            </tr>
            <tr>
              <td>&quot;starting point of the loop&quot;</td>
              <td>Reset one pointer to head after meeting, advance both by 1</td>
              <td>22</td>
            </tr>
            <tr>
              <td>&quot;intersection of two lists&quot; (Y-shaped)</td>
              <td>
                Switch lists at <code>null</code> to equalise the walked distance
              </td>
              <td>17</td>
            </tr>
            <tr>
              <td>&quot;delete the N-th node from the end&quot;</td>
              <td>
                Two pointers with a fixed gap of <code>n</code>
              </td>
              <td>13</td>
            </tr>
            <tr>
              <td>&quot;reverse the list&quot; / &quot;reverse in groups of k&quot;</td>
              <td>Iterative 3-pointer reversal (or bounded, for groups)</td>
              <td>14, 26</td>
            </tr>
            <tr>
              <td>&quot;is it a palindrome&quot;</td>
              <td>Find middle, reverse second half, compare, restore</td>
              <td>15</td>
            </tr>
            <tr>
              <td>&quot;merge two sorted lists&quot;</td>
              <td>Dummy head, always attach the smaller front</td>
              <td>28</td>
            </tr>
            <tr>
              <td>&quot;merge k sorted lists&quot;</td>
              <td>Min-heap over the k current fronts</td>
              <td>30</td>
            </tr>
            <tr>
              <td>&quot;sort a linked list&quot; (no array allowed)</td>
              <td>Merge sort: split at middle, recurse, merge</td>
              <td>31</td>
            </tr>
            <tr>
              <td>&quot;rotate the list&quot;</td>
              <td>Close into a ring, reopen at a new point</td>
              <td>27</td>
            </tr>
            <tr>
              <td>&quot;add two numbers&quot; / &quot;add 1&quot;</td>
              <td>Dummy head + carry (iterative), or carry via return value (recursive)</td>
              <td>10, 16</td>
            </tr>
            <tr>
              <td>&quot;random pointer&quot; / &quot;deep copy with an extra pointer&quot;</td>
              <td>Interleave copies, wire the extra pointer, unweave</td>
              <td>32</td>
            </tr>
            <tr>
              <td>&quot;nested list&quot; / &quot;child pointer&quot;</td>
              <td>Recurse to the end, merge pairwise on the way back</td>
              <td>29</td>
            </tr>
            <tr>
              <td>&quot;sorted DLL, find a pair / remove duplicates&quot;</td>
              <td>Two pointers from both ends, or a run-consuming inner loop</td>
              <td>24, 25</td>
            </tr>
            <tr>
              <td>&quot;group by position, not value&quot;</td>
              <td>Two chains built in lock-step, then stitched</td>
              <td>11</td>
            </tr>
            <tr>
              <td>&quot;only a few distinct values&quot;</td>
              <td>One dummy-headed bucket per value, then stitch</td>
              <td>12</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Complexity cheat sheet</h3></div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Technique</th>
              <th>Time</th>
              <th>Space</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Any single traversal (search, length, insert/delete at a known point)</td>
              <td>O(n)</td>
              <td>O(1)</td>
            </tr>
            <tr><td>Fast/slow pointer (middle, cycle detection)</td><td>O(n)</td><td>O(1)</td></tr>
            <tr><td>Iterative reversal (whole list or in groups of k)</td><td>O(n)</td><td>O(1)</td></tr>
            <tr><td>Recursive reversal / recursive carry (Add 1)</td><td>O(n)</td><td>O(n) call stack</td></tr>
            <tr><td>Merge two sorted lists</td><td>O(n + m)</td><td>O(1)</td></tr>
            <tr><td>Merge sort on a linked list</td><td>O(n log n)</td><td>O(log n) call stack</td></tr>
            <tr><td>Merge k sorted lists (heap)</td><td>O(N log k)</td><td>O(k)</td></tr>
            <tr><td>Clone with random pointer (weave technique)</td><td>O(n)</td><td>O(1) extra</td></tr>
            <tr><td>Flatten a multi-level list</td><td>O(N·M)</td><td>O(N) call stack</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Common mistakes, collected</h3></div>
      <div className="card">
        <ol className="steps">
          <li>
            <strong>
              Losing <code>next</code> before saving it.
            </strong>{' '}
            Any time a node&apos;s <code>next</code> is about to be overwritten, save it to a temporary variable{' '}
            <em>first</em> — the single most common way a reversal or insertion silently truncates the rest of the
            list (5, 7, 14).
          </li>
          <li>
            <strong>Forgetting the head can change.</strong> Deleting or inserting at the front means the
            function&apos;s own <code>head</code> reference has to be reassigned and returned — the caller&apos;s
            original variable is never updated by itself (6, 8, 23).
          </li>
          <li>
            <strong>
              Mixing up which <code>findMiddle</code> convention is in use.
            </strong>{' '}
            Starting <code>fast</code> at <code>head</code> finds the second middle of an even-length list; starting
            it at <code>head.next</code> finds the first. The two are not interchangeable — merge sort specifically
            needs the second convention so both halves always shrink (18, 31).
          </li>
          <li>
            <strong>Not restoring a list that was temporarily modified.</strong> Both the palindrome check (reversing
            the second half) and the random-pointer clone (interleaving copies) mutate the input list as a working
            step and must put it back before returning (15, 32).
          </li>
          <li>
            <strong>
              Skipping the null-guard on <code>prev</code>/<code>next</code> in a DLL.
            </strong>{' '}
            The first node has no <code>prev</code>; the last has no <code>next</code>. Every DLL rewiring needs both
            checked before dereferencing (7, 8, 9, 23).
          </li>
          <li>
            <strong>
              Forgetting <code>k % length</code> before rotating.
            </strong>{' '}
            A rotation by a multiple of the list&apos;s own length is a no-op, and skipping the modulo wastes work
            (or, worse, computes a wrong split point) when <code>k</code> is larger than the list (27).
          </li>
          <li>
            <strong>Reversing too much.</strong> Reversing nodes in groups of k requires cutting the current group
            off from the rest of the list first — otherwise a reversal that runs until <code>null</code> keeps going
            straight through the group boundary (26).
          </li>
          <li>
            <strong>Confusing the SLL and DLL deletion loop bounds.</strong> Singly linked deletion walks to{' '}
            <code>k-1</code> because it needs the predecessor; doubly linked deletion walks to <code>k</code> itself
            and reads <code>.prev</code> on arrival (6, 8).
          </li>
        </ol>
      </div>
    </>
  );
}
