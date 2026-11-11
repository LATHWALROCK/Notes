import Code from '../../components/Code.jsx';

export default function StacksQueues() {
  return (
    <>
      {/* 1. Implement Stack using Arrays */}
      <div id="implement-stack-using-arrays" data-topic-boundary="true" />
      <p className="page-sub">
        A Stack is a fundamental linear data structure operating under the Last In First Out (LIFO) paradigm.
        An array-based implementation guarantees strict O(1) time complexity for all primary operations.
      </p>
      <div className="meta-row">
        <span className="pill">Fundamentals</span>
        <span className="pill pill-success">Data Structure Design</span>
        <span className="pill">LIFO &bull; O(1) Operations</span>
      </div>

      <div className="card">
        <p>
          <strong>Core Mechanism.</strong> In a stack, insertions and deletions are restricted to a single endpoint
          called the <strong>top</strong>. A fixed-capacity array holds elements, and an integer pointer <code>topIndex</code>
          maintains the boundary of valid data.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Stack Invariants and Boundary Conditions</div>
          <ul>
            <li><strong>Empty State:</strong> <code>topIndex = -1</code> indicates the stack contains no items.</li>
            <li>
              <strong>Push(x):</strong> Increment <code>topIndex</code> and store <code>x</code> at <code>data[topIndex]</code>.
              If <code>topIndex == capacity - 1</code>, throw <em>Stack Overflow</em>.
            </li>
            <li>
              <strong>Pop():</strong> Read <code>data[topIndex]</code> and decrement <code>topIndex</code>.
              If <code>topIndex == -1</code>, throw <em>Stack Underflow</em>.
            </li>
            <li><strong>Peek() / Top():</strong> Return <code>data[topIndex]</code> without mutating the index.</li>
            <li><strong>isEmpty():</strong> Returns <code>topIndex == -1</code>.</li>
            <li><strong>size():</strong> Returns <code>topIndex + 1</code>.</li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class ArrayStack {
    private int[] data;
    private int topIndex;
    private int capacity;

    // Initialize the stack with fixed capacity.
    public ArrayStack(int capacity) {
        this.capacity = capacity;
        this.data = new int[capacity];
        this.topIndex = -1;
    }

    // Pushes value x onto the stack.
    public void push(int x) {
        if (topIndex == capacity - 1) {
            throw new IllegalStateException("Stack Overflow: capacity reached (" + capacity + ")");
        }
        data[++topIndex] = x;
    }

    // Removes and returns the top value.
    public int pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack Underflow: stack is empty");
        }
        return data[topIndex--];
    }

    // Returns the top value without removing it.
    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        return data[topIndex];
    }

    // Returns true if the stack contains no elements.
    public boolean isEmpty() {
        return topIndex == -1;
    }

    // Returns the current number of elements.
    public int size() {
        return topIndex + 1;
    }
}`}</Code>

      <div className="sub-header">
        <h3>LIFO Memory State Diagram</h3>
      </div>
      <pre className="diagram">{`Initial: topIndex = -1, capacity = 4
push(10) -> [10,  _,  _,  _]  (topIndex = 0)
push(20) -> [10, 20,  _,  _]  (topIndex = 1)
push(30) -> [10, 20, 30,  _]  (topIndex = 2)
pop()    -> returns 30        (topIndex = 1)
peek()   -> returns 20        (topIndex = 1)`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Push, pop, peek, isEmpty, and size execute in strict constant time.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Fixed array buffer allocated for N elements.</div>
        </div>
      </div>

      {/* 2. Implement Queue using Arrays */}
      <div id="implement-queue-using-arrays" data-topic-boundary="true" />
      <p className="page-sub">
        A Queue enforces First In First Out (FIFO) ordering. Implementing a queue using a circular buffer
        recycles freed indices upon dequeue and prevents artificial buffer exhaustion.
      </p>
      <div className="meta-row">
        <span className="pill">Fundamentals</span>
        <span className="pill pill-success">Data Structure Design</span>
        <span className="pill">FIFO &bull; Circular Buffer</span>
      </div>

      <div className="card">
        <p>
          <strong>Why Circular Buffers?</strong> In a naive linear array, removing elements from the front
          permanently consumes index slots unless remaining items are shifted left in O(N) time.
          Using modulo arithmetic <code>(index + 1) % capacity</code> wraps boundaries back to 0, recycling slots in O(1).
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Circular Index Arithmetic</div>
          <ul>
            <li><code>front</code>: Tracks index of the earliest admitted element.</li>
            <li><code>rear</code>: Tracks index where the newest element was admitted.</li>
            <li><code>count</code>: Running count of valid items, eliminating full vs. empty ambiguity.</li>
            <li><strong>Enqueue:</strong> <code>rear = (rear + 1) % capacity; data[rear] = x; count++;</code></li>
            <li><strong>Dequeue:</strong> <code>val = data[front]; front = (front + 1) % capacity; count--;</code></li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class ArrayQueue {
    private int[] data;
    private int front;
    private int rear;
    private int count;
    private int capacity;

    // Initialize circular queue with given capacity.
    public ArrayQueue(int capacity) {
        this.capacity = capacity;
        this.data = new int[capacity];
        this.front = 0;
        this.rear = -1;
        this.count = 0;
    }

    // Inserts element at the rear of the queue.
    public void enqueue(int x) {
        if (isFull()) {
            throw new IllegalStateException("Queue Overflow: capacity reached (" + capacity + ")");
        }
        rear = (rear + 1) % capacity;
        data[rear] = x;
        count++;
    }

    // Removes and returns the front element.
    public int dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue Underflow: queue is empty");
        }
        int removed = data[front];
        front = (front + 1) % capacity;
        count--;
        return removed;
    }

    // Returns front element without removing it.
    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        return data[front];
    }

    public boolean isEmpty() {
        return count == 0;
    }

    public boolean isFull() {
        return count == capacity;
    }

    public int size() {
        return count;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Enqueue, dequeue, peek, and size all run in O(1) time.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Pre-allocated continuous array of capacity N.</div>
        </div>
      </div>

      {/* 3. Implement Stack using Queue */}
      <div id="implement-stack-using-queue" data-topic-boundary="true" />
      <p className="page-sub">
        Implement a LIFO Stack using only standard FIFO Queue operations. A single queue suffices by rotating
        previously admitted elements behind every freshly inserted element.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 225</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Single Queue Rotation &bull; LIFO Simulation</span>
      </div>

      <div className="card">
        <p>
          <strong>The Rotation Invariant.</strong> A queue removes from the front, whereas a stack must remove
          from the newest element. When inserting <code>x</code>, we enqueue <code>x</code> to the back of the queue,
          and then dequeue and re-enqueue all preceding <code>size - 1</code> elements. This rotates <code>x</code>
          directly to the head of the queue!
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Operation Mechanics</div>
          <ol>
            <li><code>push(x)</code>: <code>q.add(x)</code>, then repeat <code>q.add(q.remove())</code> for <code>q.size() - 1</code> steps.</li>
            <li><code>pop()</code>: Simply call <code>q.remove()</code> in O(1) time.</li>
            <li><code>top()</code>: Simply call <code>q.peek()</code> in O(1) time.</li>
          </ol>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class MyStackUsingQueue {
    private Queue<Integer> queue;

    public MyStackUsingQueue() {
        this.queue = new LinkedList<>();
    }

    // Pushes element x onto stack by rotating previous elements behind it.
    public void push(int x) {
        queue.add(x);
        int rotations = queue.size() - 1;
        for (int i = 0; i < rotations; i++) {
            queue.add(queue.remove());
        }
    }

    // Removes element on top of the stack and returns it.
    public int pop() {
        return queue.remove();
    }

    // Get the top element.
    public int top() {
        return queue.peek();
    }

    // Returns whether the stack is empty.
    public boolean empty() {
        return queue.isEmpty();
    }
}`}</Code>

      <div className="sub-header">
        <h3>Queue Rotation Step-by-Step</h3>
      </div>
      <pre className="diagram">{`Existing Queue:  [10, 20]  (front is 10, back is 20)
push(30):
Step 1: Enqueue 30        -> [10, 20, 30]
Step 2: Rotate 10 to back -> [20, 30, 10]
Step 3: Rotate 20 to back -> [30, 10, 20]  (front is now 30!)
pop() immediately removes 30 -> LIFO behavior achieved in single queue!`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">Push O(N) &bull; Pop O(1)</div>
          <div className="cx-note">Push rotates N-1 elements; pop and top are direct O(1) queue operations.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">A single queue storing N elements.</div>
        </div>
      </div>

      {/* 4. Implement Queue using Stack */}
      <div id="implement-queue-using-stack" data-topic-boundary="true" />
      <p className="page-sub">
        Implement a FIFO Queue using LIFO Stacks. Two stacks achieve amortized O(1) time complexity by reversing
        element order only on demand when the output stack empties.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 232</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Two Stacks &bull; Amortized O(1)</span>
      </div>

      <div className="card">
        <p>
          <strong>Dual-Stack Architecture.</strong> Maintain an <code>input</code> stack for admissions and an{' '}
          <code>output</code> stack for departures. Pushing is unconditionally O(1) onto <code>input</code>.
          When popping or peeking, if <code>output</code> is empty, pour all elements from <code>input</code> into{' '}
          <code>output</code>. Because pouring inverts order twice, FIFO order emerges!
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Amortized Cost Analysis</div>
          <p>
            Although a single transfer from <code>input</code> to <code>output</code> takes O(k) steps, each item
            is pushed to <code>input</code> once (1), transferred to <code>output</code> once (1), and popped from{' '}
            <code>output</code> once (1). Across any sequence of M operations, total work is &le; 3M, yielding strict{' '}
            <strong>Amortized O(1)</strong> per operation!
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class MyQueueUsingStack {
    private Deque<Integer> input;
    private Deque<Integer> output;

    public MyQueueUsingStack() {
        this.input = new ArrayDeque<>();
        this.output = new ArrayDeque<>();
    }

    // Pushes element x to the back of queue.
    public void push(int x) {
        input.push(x);
    }

    // Removes the element from the front of queue and returns it.
    public int pop() {
        peek(); // Ensure output stack has current front element
        return output.pop();
    }

    // Get the front element.
    public int peek() {
        if (output.isEmpty()) {
            while (!input.isEmpty()) {
                output.push(input.pop());
            }
        }
        return output.peek();
    }

    // Returns whether the queue is empty.
    public boolean empty() {
        return input.isEmpty() && output.isEmpty();
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(1) Amortized</div>
          <div className="cx-note">Push is O(1); pop and peek are O(1) amortized across all queries.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Total capacity distributed between input and output stacks.</div>
        </div>
      </div>

      {/* 5. Implement Stack using Linked List */}
      <div id="implement-stack-using-linked-list" data-topic-boundary="true" />
      <p className="page-sub">
        Implementing a Stack using a Singly Linked List yields dynamic memory allocation with no predetermined capacity limits,
        placing the stack top at the linked list head.
      </p>
      <div className="meta-row">
        <span className="pill">Fundamentals</span>
        <span className="pill pill-success">Data Structure Design</span>
        <span className="pill">Dynamic Sizing &bull; Head Pointer</span>
      </div>

      <div className="card">
        <p>
          <strong>Head-Centric Operations.</strong> Adding or removing from the head of a singly linked list is an O(1)
          pointer manipulation. Thus, <code>top</code> points directly to the <code>head</code> node.
          Push creates a node pointing to current <code>top</code> and reassigns <code>top</code>. Pop updates{' '}
          <code>top = top.next</code>.
        </p>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class LinkedListStack {
    private static class Node {
        int val;
        Node next;
        Node(int val) {
            this.val = val;
            this.next = null;
        }
    }

    private Node top;
    private int count;

    public LinkedListStack() {
        this.top = null;
        this.count = 0;
    }

    // Pushes value x onto the stack.
    public void push(int x) {
        Node newNode = new Node(x);
        newNode.next = top;
        top = newNode;
        count++;
    }

    // Removes and returns the top value.
    public int pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack Underflow");
        }
        int popped = top.val;
        top = top.next;
        count--;
        return popped;
    }

    // Inspects the top value without removing.
    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Stack is empty");
        }
        return top.val;
    }

    public boolean isEmpty() {
        return top == null;
    }

    public int size() {
        return count;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Push, pop, and peek manipulate only the head reference in constant time.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Dynamic allocation of one Node per stored element.</div>
        </div>
      </div>

      {/* 6. Implement Queue using Linked List */}
      <div id="implement-queue-using-linked-list" data-topic-boundary="true" />
      <p className="page-sub">
        Implementing a Queue via a Singly Linked List uses dual pointers: a <code>front</code> pointer for O(1) departures
        and a <code>rear</code> pointer for O(1) admissions.
      </p>
      <div className="meta-row">
        <span className="pill">Fundamentals</span>
        <span className="pill pill-success">Data Structure Design</span>
        <span className="pill">Front &amp; Rear Pointers &bull; O(1) Operations</span>
      </div>

      <div className="card">
        <p>
          <strong>Pointer Dualism.</strong> Dequeuing removes from <code>front</code> (head of list).
          Enqueuing appends to <code>rear.next</code> and advances <code>rear</code> (tail of list).
          When the last element departs, both <code>front</code> and <code>rear</code> reset to null.
        </p>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class LinkedListQueue {
    private static class Node {
        int val;
        Node next;
        Node(int val) {
            this.val = val;
            this.next = null;
        }
    }

    private Node front;
    private Node rear;
    private int count;

    public LinkedListQueue() {
        this.front = null;
        this.rear = null;
        this.count = 0;
    }

    // Appends element x to the rear of queue.
    public void enqueue(int x) {
        Node newNode = new Node(x);
        if (rear == null) {
            front = rear = newNode;
        } else {
            rear.next = newNode;
            rear = newNode;
        }
        count++;
    }

    // Removes and returns the element at the front of queue.
    public int dequeue() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue Underflow");
        }
        int removed = front.val;
        front = front.next;
        if (front == null) {
            rear = null;
        }
        count--;
        return removed;
    }

    public int peek() {
        if (isEmpty()) {
            throw new IllegalStateException("Queue is empty");
        }
        return front.val;
    }

    public boolean isEmpty() {
        return front == null;
    }

    public int size() {
        return count;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Enqueue appends at rear; dequeue detaches at front; both take O(1) time.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Dynamically grows and contracts with stored node count.</div>
        </div>
      </div>

      {/* 7. Check for Balanced Parenthesis */}
      <div id="check-for-balanced-parenthesis" data-topic-boundary="true" />
      <p className="page-sub">
        Given a string containing only brackets <code>&apos;(&apos;</code>, <code>&apos;)&apos;</code>, <code>&apos;&#123;&apos;</code>,{' '}
        <code>&apos;&#125;&apos;</code>, <code>&apos;[&apos;</code>, and <code>&apos;]&apos;</code>, determine if the input string is valid.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 20</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Bracket Matching &bull; Classic LIFO</span>
      </div>

      <div className="card">
        <p>
          <strong>LIFO Symmetry.</strong> Every opening bracket must be closed by the same type of bracket in reverse
          chronological order. A stack tracks pending opening brackets. Any incoming closing bracket must match the
          most recently unclosed opening bracket sitting at <code>st.peek()</code>.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Validation Rules</div>
          <ul>
            <li>If character is an opening bracket (<code>(</code>, <code>&#123;</code>, <code>[</code>), push to stack.</li>
            <li>If closing bracket arrives and stack is empty, return <code>false</code> (unmatched closing).</li>
            <li>If stack top does not match current closing bracket, return <code>false</code> (type mismatch).</li>
            <li>After processing entire string, return <code>st.isEmpty()</code> (ensures no dangling openings).</li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Checks whether a bracket string is balanced.
    public boolean isBalanced(String s) {
        Stack<Character> st = new Stack<>();

        // Every character is processed in original order.
        for (int index = 0; index < s.length(); index++) {
            char ch = s.charAt(index);

            // Opening brackets wait for a future matching close.
            if (ch == '(' || ch == '{' || ch == '[') {
                st.push(ch);
                continue;
            }

            // A closing bracket needs an available opening bracket.
            if (st.isEmpty()) {
                return false;
            }

            char topBracket = st.peek();

            // Closing parenthesis must match an opening parenthesis.
            if (ch == ')' && topBracket != '(') {
                return false;
            }

            // Closing brace must match an opening brace.
            if (ch == '}' && topBracket != '{') {
                return false;
            }

            // Matching closing and opening square brackets.
            if (ch == ']' && topBracket != '[') {
                return false;
            }

            // A valid pair is removed from the pending openings.
            st.pop();
        }

        // Balanced strings leave no unmatched opening bracket.
        return st.isEmpty();
    }
}`}</Code>

      <div className="sub-header">
        <h3>Trace Example</h3>
      </div>
      <pre className="diagram">{`String: "([{}])"
Index 0: '(' -> Push '('    Stack: ['(']
Index 1: '[' -> Push '['    Stack: ['(', '[']
Index 2: '{' -> Push '{'    Stack: ['(', '[', '{']
Index 3: '}' -> Matches '{' Pop '{'   Stack: ['(', '[']
Index 4: ']' -> Matches '[' Pop '['   Stack: ['(']
Index 5: ')' -> Matches '(' Pop '('   Stack: []
End of string: stack is empty -> VALID (true)`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Single linear traversal visiting each character once.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Worst-case stack holds all opening brackets (e.g. "((((((").</div>
        </div>
      </div>

      {/* 8. Implement Min Stack */}
      <div id="implement-min-stack" data-topic-boundary="true" />
      <p className="page-sub">
        Design a stack supporting <code>push</code>, <code>pop</code>, <code>top</code>, and retrieving the minimum
        element <code>getMin</code> in strict O(1) time and O(1) auxiliary space.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 155</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Algebraic Encoding &bull; O(1) Extra Space</span>
      </div>

      <div className="card">
        <p>
          <strong>Mathematical Encoding Technique.</strong> Storing pairs <code>(val, minSoFar)</code> requires 2x memory.
          Instead, we maintain a single primitive variable <code>min</code>. When pushing a value <code>x &lt; min</code>,
          we push a flag value <code>2 * x - min</code> onto the stack, and then set <code>min = x</code>.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 The Algebraic Invariant</div>
          <p>
            Because <code>x &lt; min</code>, we have <code>x - min &lt; 0</code>, hence{' '}
            <code>2 * x - min = x + (x - min) &lt; x</code>. The stored value is <em>strictly smaller</em> than the new minimum!
          </p>
          <ul>
            <li><strong>On Pop:</strong> If popped value <code>top &lt; min</code>, a minimum transition occurred. The previous minimum was <code>2 * min - top</code>!</li>
            <li><strong>On Peek:</strong> If <code>top &lt; min</code>, current minimum <code>min</code> is the true original value.</li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class MinStack {
    private Deque<Long> st;
    private long min;

    public MinStack() {
        this.st = new ArrayDeque<>();
    }

    public void push(int val) {
        long x = val;
        if (st.isEmpty()) {
            min = x;
            st.push(x);
        } else if (x >= min) {
            st.push(x);
        } else {
            // Encode transition: 2 * x - min is strictly < x
            st.push(2 * x - min);
            min = x;
        }
    }

    public void pop() {
        if (st.isEmpty()) return;
        long popped = st.pop();
        if (popped < min) {
            // Restore previous min: 2 * min - popped
            min = 2 * min - popped;
        }
    }

    public int top() {
        long topVal = st.peek();
        if (topVal < min) {
            return (int) min;
        }
        return (int) topVal;
    }

    public int getMin() {
        return (int) min;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Push, pop, top, and getMin are all strict O(1) arithmetic operations.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1) Auxiliary</div>
          <div className="cx-note">Single scalar variable tracks min; no redundant pair objects created.</div>
        </div>
      </div>

      {/* 9. Infix to Postfix conversion */}
      <div id="infix-to-postfix" data-topic-boundary="true" />
      <p className="page-sub">
        Convert an Infix expression containing operators and parentheses into Postfix notation (Reverse Polish Notation)
        using Dijkstra&apos;s classic Shunting-Yard operator stack.
      </p>
      <div className="meta-row">
        <span className="pill">Expression Parsing</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Shunting Yard &bull; Operator Precedence</span>
      </div>

      <div className="card">
        <p>
          <strong>Precedence &amp; Associativity Rules.</strong> Operators are postponed onto a stack until their operands
          arrive or until an operator of higher precedence forces them to output.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Shunting-Yard Protocol</div>
          <ul>
            <li><strong>Operand:</strong> Append directly to output.</li>
            <li><strong>&apos;(&apos;:</strong> Push directly onto stack.</li>
            <li><strong>&apos;)&apos;:</strong> Pop and append to output until <code>&apos;(&apos;</code> is popped.</li>
            <li>
              <strong>Operator:</strong> Pop while stack top has higher or equal precedence (for left-associative operators),
              then push current operator.
            </li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class InfixToPostfix {
    private static int precedence(char ch) {
        switch (ch) {
            case '+': case '-': return 1;
            case '*': case '/': return 2;
            case '^': return 3;
            default: return -1;
        }
    }

    public static String convert(String exp) {
        StringBuilder result = new StringBuilder();
        Deque<Character> stack = new ArrayDeque<>();

        for (char ch : exp.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                result.append(ch);
            } else if (ch == '(') {
                stack.push(ch);
            } else if (ch == ')') {
                while (!stack.isEmpty() && stack.peek() != '(') {
                    result.append(stack.pop());
                }
                if (!stack.isEmpty()) stack.pop(); // discard '('
            } else {
                // Operator: right-associative '^' pops only strictly greater
                while (!stack.isEmpty() && (precedence(ch) < precedence(stack.peek()) ||
                       (precedence(ch) == precedence(stack.peek()) && ch != '^'))) {
                    result.append(stack.pop());
                }
                stack.push(ch);
            }
        }
        while (!stack.isEmpty()) {
            result.append(stack.pop());
        }
        return result.toString();
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Each character is pushed and popped from operator stack at most once.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Operator stack bounded by total length of expression.</div>
        </div>
      </div>

      {/* 10. Infix to Prefix conversion */}
      <div id="infix-to-prefix" data-topic-boundary="true" />
      <p className="page-sub">
        Convert an Infix expression into Prefix notation (Polish Notation). By reversing the expression and swapping
        parentheses, the problem reduces to a modified Infix to Postfix conversion.
      </p>
      <div className="meta-row">
        <span className="pill">Expression Parsing</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Reversal Trick &bull; Polish Notation</span>
      </div>

      <div className="card">
        <div className="callout callout-key">
          <div className="callout-title">🔑 4-Step Reversal Algorithm</div>
          <ol>
            <li>Reverse the given infix string.</li>
            <li>Swap all <code>&apos;(&apos;</code> with <code>&apos;)&apos;</code> and vice versa.</li>
            <li>Compute postfix conversion, but pop only when precedence is <em>strictly smaller</em> for equal operators (preserving right associativity).</li>
            <li>Reverse the postfix result to obtain the final prefix string!</li>
          </ol>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class InfixToPrefix {
    private static int prec(char ch) {
        if (ch == '+' || ch == '-') return 1;
        if (ch == '*' || ch == '/') return 2;
        if (ch == '^') return 3;
        return -1;
    }

    public static String convert(String exp) {
        // Step 1 & 2: Reverse and swap parentheses
        StringBuilder rev = new StringBuilder();
        for (int i = exp.length() - 1; i >= 0; i--) {
            char c = exp.charAt(i);
            if (c == '(') rev.append(')');
            else if (c == ')') rev.append('(');
            else rev.append(c);
        }

        // Step 3: Modified postfix conversion
        StringBuilder postfix = new StringBuilder();
        Deque<Character> st = new ArrayDeque<>();
        for (char ch : rev.toString().toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                postfix.append(ch);
            } else if (ch == '(') {
                st.push(ch);
            } else if (ch == ')') {
                while (!st.isEmpty() && st.peek() != '(') postfix.append(st.pop());
                if (!st.isEmpty()) st.pop();
            } else {
                if (ch == '^') {
                    while (!st.isEmpty() && prec(ch) <= prec(st.peek())) postfix.append(st.pop());
                } else {
                    while (!st.isEmpty() && prec(ch) < prec(st.peek())) postfix.append(st.pop());
                }
                st.push(ch);
            }
        }
        while (!st.isEmpty()) postfix.append(st.pop());

        // Step 4: Reverse postfix result
        return postfix.reverse().toString();
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">String reversals and linear scan each take O(N) time.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Auxiliary string builder and operator stack.</div>
        </div>
      </div>

      {/* 11. Prefix to Infix conversion */}
      <div id="prefix-to-infix" data-topic-boundary="true" />
      <p className="page-sub">
        Convert a Prefix expression into fully parenthesized Infix notation by scanning right-to-left
        and using a string stack for operand assembly.
      </p>
      <div className="meta-row">
        <span className="pill">Expression Parsing</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Right-to-Left Scan &bull; Operand Stack</span>
      </div>

      <div className="card">
        <p>
          <strong>Algorithm.</strong> Scan the prefix expression from right to left (index n-1 down to 0).
          When an operand is encountered, push it onto the stack. When an operator is encountered, pop two operands
          <code>op1 = st.pop()</code> and <code>op2 = st.pop()</code>, combine them into <code>&quot;(&quot; + op1 + op + op2 + &quot;)&quot;</code>,
          and push the result back onto the stack.
        </p>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class PrefixToInfix {
    public static String convert(String prefix) {
        Deque<String> st = new ArrayDeque<>();

        // Traverse from right to left
        for (int i = prefix.length() - 1; i >= 0; i--) {
            char ch = prefix.charAt(i);

            if (Character.isLetterOrDigit(ch)) {
                st.push(String.valueOf(ch));
            } else {
                String op1 = st.pop();
                String op2 = st.pop();
                String combined = "(" + op1 + ch + op2 + ")";
                st.push(combined);
            }
        }
        return st.peek();
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Single backward traversal with string concatenations.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">String stack stores operand sub-expressions.</div>
        </div>
      </div>

      {/* 12. Prefix to Postfix conversion */}
      <div id="prefix-to-postfix" data-topic-boundary="true" />
      <p className="page-sub">
        Convert a Prefix expression directly into Postfix notation by scanning right to left and assembling
        operand pairs followed by the operator.
      </p>
      <div className="meta-row">
        <span className="pill">Expression Parsing</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Right-to-Left Scan &bull; Postfix Assembly</span>
      </div>

      <div className="card">
        <p>
          <strong>Formula.</strong> For operator <code>op</code> and operands <code>op1</code> and <code>op2</code>:
          prefix <code>op op1 op2</code> transforms into postfix <code>op1 op2 op</code>.
        </p>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class PrefixToPostfix {
    public static String convert(String prefix) {
        Deque<String> st = new ArrayDeque<>();

        // Scan from right to left
        for (int i = prefix.length() - 1; i >= 0; i--) {
            char ch = prefix.charAt(i);

            if (Character.isLetterOrDigit(ch)) {
                st.push(String.valueOf(ch));
            } else {
                String op1 = st.pop();
                String op2 = st.pop();
                st.push(op1 + op2 + ch);
            }
        }
        return st.peek();
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Each character processed once in reverse order.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Operand stack storing intermediate string tokens.</div>
        </div>
      </div>

      {/* 13. Postfix to Infix conversion */}
      <div id="postfix-to-infix" data-topic-boundary="true" />
      <p className="page-sub">
        Convert a Postfix expression into fully parenthesized Infix notation by scanning left to right.
      </p>
      <div className="meta-row">
        <span className="pill">Expression Parsing</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Left-to-Right Scan &bull; Infix Parenthesization</span>
      </div>

      <div className="card">
        <p>
          <strong>Algorithm.</strong> Scan left to right. When an operator is read, pop <code>op2 = st.pop()</code>,
          then <code>op1 = st.pop()</code>. Combine as <code>&quot;(&quot; + op1 + op + op2 + &quot;)&quot;</code> and push back.
        </p>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class PostfixToInfix {
    public static String convert(String postfix) {
        Deque<String> st = new ArrayDeque<>();

        for (char ch : postfix.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                st.push(String.valueOf(ch));
            } else {
                String op2 = st.pop();
                String op1 = st.pop();
                st.push("(" + op1 + ch + op2 + ")");
            }
        }
        return st.peek();
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Single forward linear scan with O(N) total string construction.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Stack size bounded by number of operands.</div>
        </div>
      </div>

      {/* 14. Postfix to Prefix conversion */}
      <div id="postfix-to-prefix" data-topic-boundary="true" />
      <p className="page-sub">
        Convert a Postfix expression directly into Prefix notation by scanning left to right.
      </p>
      <div className="meta-row">
        <span className="pill">Expression Parsing</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Left-to-Right Scan &bull; Polish Notation Assembly</span>
      </div>

      <div className="card">
        <p>
          <strong>Formula.</strong> Pop <code>op2</code>, pop <code>op1</code>, construct <code>op + op1 + op2</code>,
          and push the result back onto the stack.
        </p>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class PostfixToPrefix {
    public static String convert(String postfix) {
        Deque<String> st = new ArrayDeque<>();

        for (char ch : postfix.toCharArray()) {
            if (Character.isLetterOrDigit(ch)) {
                st.push(String.valueOf(ch));
            } else {
                String op2 = st.pop();
                String op1 = st.pop();
                st.push(ch + op1 + op2);
            }
        }
        return st.peek();
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Forward scan with constant number of string operations per token.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Stack stores intermediate string tokens.</div>
        </div>
      </div>

      {/* 15. Next Greater Element */}
      <div id="next-greater-element" data-topic-boundary="true" />
      <p className="page-sub">
        For each element in an array, find the first element to its right that is strictly greater than it.
        If no greater element exists, output -1.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 496</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Monotonic Decreasing Stack &bull; O(N)</span>
      </div>

      <div className="card">
        <p>
          <strong>Monotonic Stack Intuition.</strong> A brute-force nested loop inspects all subsequent elements in O(N&sup2;).
          By scanning <strong>right to left</strong>, we maintain a stack of candidate greater elements in strictly decreasing order.
          Any candidate smaller than or equal to the current element can never be the next greater element for any future element
          to the left, so it is safely popped!
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Right-to-Left Monotonic Scan Protocol</div>
          <ol>
            <li>While <code>!st.isEmpty() &amp;&amp; st.peek() &lt;= arr[i]</code>: pop from stack.</li>
            <li>If stack is not empty, <code>answer[i] = st.peek()</code>; else <code>answer[i] = -1</code>.</li>
            <li>Push <code>arr[i]</code> onto stack to serve as candidate for earlier elements.</li>
          </ol>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Finds next greater values with a monotonic stack.
    public int[] nextGreaterElements(int[] arr) {
        int n = arr.length;
        int[] answer = new int[n];
        Arrays.fill(answer, -1);
        Deque<Integer> candidates = new ArrayDeque<>();

        // Scan right to left to prepare valid candidates.
        for (int i = n - 1; i >= 0; i--) {
            // Remove values failing the strict greater condition.
            while (!candidates.isEmpty() && candidates.peek() <= arr[i]) {
                candidates.pop();
            }

            // Use the nearest greater candidate at the stack top.
            if (!candidates.isEmpty()) {
                answer[i] = candidates.peek();
            }

            candidates.push(arr[i]);
        }
        return answer;
    }
}`}</Code>

      <div className="sub-header">
        <h3>Dry Run Trace</h3>
      </div>
      <pre className="diagram">{`arr = [4, 12, 5, 3, 1, 2, 5, 3, 1, 2, 4, 6]
Scanning right-to-left:
i = 11 (val = 6): Stack []               -> NGE = -1,  Push 6   Stack: [6]
i = 10 (val = 4): Stack [6], 6 > 4       -> NGE =  6,  Push 4   Stack: [4, 6]
i =  9 (val = 2): Stack [4, 6], 4 > 2    -> NGE =  4,  Push 2   Stack: [2, 4, 6]
i =  8 (val = 1): Stack [2, 4, 6], 2 > 1 -> NGE =  2,  Push 1   Stack: [1, 2, 4, 6]
i =  7 (val = 3): Pop 1, Pop 2, 4 > 3    -> NGE =  4,  Push 3   Stack: [3, 4, 6]
Every element pushed and popped at most once -> O(N) Total Steps!`}</pre>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Each array element pushed once and popped at most once across entire scan.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Candidates stack holds at most N elements.</div>
        </div>
      </div>

      {/* 16. Next Greater Element – 2 */}
      <div id="next-greater-element-ii" data-topic-boundary="true" />
      <p className="page-sub">
        Given a circular array (the next element of the last element is the first element of the array),
        return the next greater number for every element.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 503</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Circular Array &bull; Double Pass Virtualization</span>
      </div>

      <div className="card">
        <p>
          <strong>Virtual 2N Concatenation.</strong> Instead of actually copying the array, loop from index{' '}
          <code>2 * n - 1</code> down to <code>0</code>, using <code>index = i % n</code>.
          The first pass (from <code>2n - 1</code> down to <code>n</code>) populates the monotonic stack with right-side circular
          candidates; the second pass (from <code>n - 1</code> down to <code>0</code>) writes the definitive answers.
        </p>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Finds next greater values with a monotonic stack.
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];
        Arrays.fill(answer, -1);
        Deque<Integer> candidates = new ArrayDeque<>();

        // Two reverse passes simulate circular order.
        for (int i = 2 * n - 1; i >= 0; i--) {
            int index = i % n;

            // Blocked values cannot be strictly greater.
            while (!candidates.isEmpty() && candidates.peek() <= nums[index]) {
                candidates.pop();
            }

            // Only the real pass writes final answers.
            if (i < n && !candidates.isEmpty()) {
                answer[index] = candidates.peek();
            }

            candidates.push(nums[index]);
        }
        return answer;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Loop runs 2N iterations; each index pushed and popped at most twice.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Stack holds at most N distinct candidate values.</div>
        </div>
      </div>

      {/* 17. Nearest Smaller Element */}
      <div id="nearest-smaller-element" data-topic-boundary="true" />
      <p className="page-sub">
        For each element in an array, find the nearest element to its left that is strictly smaller than it.
        If no such element exists, output -1.
      </p>
      <div className="meta-row">
        <span className="pill">InterviewBit / GFG</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Previous Smaller Element &bull; Left-to-Right Scan</span>
      </div>

      <div className="card">
        <p>
          <strong>Monotonic Increasing Stack.</strong> Scan from <strong>left to right</strong>. Maintain elements
          in strictly increasing order. While <code>stack.peek() &gt;= arr[i]</code>, pop elements because they are larger
          than <code>arr[i]</code> and farther away from future elements.
        </p>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class NearestSmallerElement {
    // Finds nearest smaller element on left for every element.
    public int[] prevSmaller(int[] arr) {
        int n = arr.length;
        int[] answer = new int[n];
        Deque<Integer> st = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && st.peek() >= arr[i]) {
                st.pop();
            }
            answer[i] = st.isEmpty() ? -1 : st.peek();
            st.push(arr[i]);
        }
        return answer;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Linear amortized scan; each element enters and leaves stack at most once.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Stack holds candidate left-smaller elements.</div>
        </div>
      </div>

      {/* 18. Trapping Rainwater */}
      <div id="trapping-rainwater" data-topic-boundary="true" />
      <p className="page-sub">
        Given n non-negative integers representing an elevation map where the width of each bar is 1,
        compute how much water it can trap after raining.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 42</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Two Pointers &bull; Dynamic Boundaries &bull; O(1) Space</span>
      </div>

      <div className="card">
        <p>
          <strong>The Limiting Boundary Principle.</strong> Water trapped above bar <code>i</code> equals{' '}
          <code>Math.min(leftMax, rightMax) - height[i]</code>. We do not need the exact values of both boundaries &mdash;
          only the smaller one! By converging two pointers <code>left</code> and <code>right</code> inward, we can safely
          calculate trapped water on whichever side has the smaller boundary.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Two-Pointer Boundary Logic</div>
          <ul>
            <li>If <code>height[left] &lt; height[right]</code>: Water on left side is guaranteed to be bounded by <code>leftMax</code> because <code>height[right] &ge; height[left]</code>.
              <ul>
                <li>If <code>height[left] &ge; leftMax</code>: Update <code>leftMax = height[left]</code>.</li>
                <li>Else: <code>totalWater += leftMax - height[left]</code>.</li>
                <li>Advance <code>left++</code>.</li>
              </ul>
            </li>
            <li>Else: Water on right side is guaranteed to be bounded by <code>rightMax</code>.
              <ul>
                <li>If <code>height[right] &ge; rightMax</code>: Update <code>rightMax = height[right]</code>.</li>
                <li>Else: <code>totalWater += rightMax - height[right]</code>.</li>
                <li>Advance <code>right--</code>.</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Uses two pointers and keeps only the required boundaries.
    public int trap(int[] height) {
        int n = height.length;

        // At least three bars are required to trap water.
        if (n < 3) {
            return 0;
        }

        int left = 0;
        int right = n - 1;
        int leftMax = 0;
        int rightMax = 0;
        int totalWater = 0;

        // Process the side with the smaller current boundary.
        while (left < right) {
            // The left side can be decided using leftMax.
            if (height[left] < height[right]) {
                // Update the left boundary when a taller bar appears.
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    // Otherwise, the gap above this bar stores water.
                    totalWater += leftMax - height[left];
                }
                left++;
            } else {
                // The right side can be decided using rightMax.
                // Update the right boundary when a taller bar appears.
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    // Otherwise, the gap above this bar stores water.
                    totalWater += rightMax - height[right];
                }
                right--;
            }
        }
        return totalWater;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Left and right pointers meet after exactly N total iterations.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Only integer boundary accumulators; zero auxiliary array allocation.</div>
        </div>
      </div>

      {/* 19. Sum of subarray minimums */}
      <div id="sum-of-subarray-minimums" data-topic-boundary="true" />
      <p className="page-sub">
        Given an array of integers, find the sum of <code>min(b)</code>, where <code>b</code> ranges over every
        contiguous subarray. Return the answer modulo 10^9 + 7.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 907</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Contribution Technique &bull; Monotonic Stack</span>
      </div>

      <div className="card">
        <p>
          <strong>Contribution Technique.</strong> Rather than evaluating each of the ~N&sup2; subarrays, determine how many
          subarrays have <code>arr[i]</code> as their minimum.
          If <code>arr[i]</code> extends to index <code>previousLess[i]</code> on the left and <code>nextLessOrEqual[i]</code>
          on the right:
        </p>
        <div className="recurrence">{`Subarrays where arr[i] is minimum = (i - previousLess[i]) * (nextLessOrEqual[i] - i)
Contribution of arr[i] = arr[i] * leftChoices * rightChoices (mod 10^9 + 7)`}</div>
        <div className="callout callout-tip">
          <div className="callout-title">💡 Preventing Duplicate Counting</div>
          <p>
            When duplicate elements exist (e.g. <code>[2, 2]</code>), strict inequality on both sides would count subarrays twice,
            while non-strict on both sides would miss boundaries. We use <strong>strictly smaller</strong> on the left
            (<code>&gt;=</code> pop condition) and <strong>smaller or equal</strong> on the right (<code>&gt;</code> pop condition).
            This asymmetric tie-breaking guarantees every subarray minimum is attributed to exactly one unique index!
          </p>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Finds the previous strictly smaller index for every element.
    private int[] findPreviousLess(int[] arr) {
        int n = arr.length;
        int[] previousLess = new int[n];
        Arrays.fill(previousLess, -1);
        Stack<Integer> indices = new Stack<>();

        // Scan from left to right for previous boundaries.
        for (int i = 0; i < n; i++) {
            // Remove values that are not strictly smaller.
            while (!indices.isEmpty() && arr[indices.peek()] >= arr[i]) {
                indices.pop();
            }
            // A remaining index is the previous smaller boundary.
            if (!indices.isEmpty()) {
                previousLess[i] = indices.peek();
            }
            // Save the current index for later elements.
            indices.push(i);
        }
        return previousLess;
    }

    // Finds the next smaller-or-equal index for every element.
    private int[] findNextLessOrEqual(int[] arr) {
        int n = arr.length;
        int[] nextLessOrEqual = new int[n];
        Arrays.fill(nextLessOrEqual, n);
        Stack<Integer> indices = new Stack<>();

        // Scan from right to left for next boundaries.
        for (int i = n - 1; i >= 0; i--) {
            // Remove values that are strictly greater.
            while (!indices.isEmpty() && arr[indices.peek()] > arr[i]) {
                indices.pop();
            }
            // A remaining index is the next valid boundary.
            if (!indices.isEmpty()) {
                nextLessOrEqual[i] = indices.peek();
            }
            // Save the current index for earlier elements.
            indices.push(i);
        }
        return nextLessOrEqual;
    }

    // Returns the sum of all subarray minimums.
    public int sumSubarrayMins(int[] arr) {
        int n = arr.length;
        long mod = 1000000007L;

        int[] previousLess = findPreviousLess(arr);
        int[] nextLessOrEqual = findNextLessOrEqual(arr);

        long answer = 0;

        // Calculate each element's contribution as the minimum.
        for (int i = 0; i < n; i++) {
            long leftChoices = i - previousLess[i];
            long rightChoices = nextLessOrEqual[i] - i;

            // Count all subarrays where arr[i] owns the minimum.
            long contribution = (arr[i] * leftChoices) % mod;
            contribution = (contribution * rightChoices) % mod;

            // Add the current contribution to the answer.
            answer = (answer + contribution) % mod;
        }
        return (int) answer;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Two linear boundary scans and one contribution loop, all running in O(N).</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">previousLess and nextLessOrEqual index arrays.</div>
        </div>
      </div>

      {/* 20. Sum of subarray Ranges */}
      <div id="sum-of-subarray-ranges" data-topic-boundary="true" />
      <p className="page-sub">
        The range of a subarray is the difference between the largest and smallest element in the subarray.
        Return the sum of all subarray ranges of nums.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 2104</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Max-Min Linear Decomposition &bull; O(N)</span>
      </div>

      <div className="card">
        <p>
          <strong>Linear Algebraic Splitting.</strong> Sum of ranges ={' '}
          <code>&Sigma; (max(sub) &minus; min(sub)) = &Sigma; max(sub) &minus; &Sigma; min(sub)</code>.
          Instead of quadratic brute force, calculate the sum of subarray maximums and sum of subarray minimums
          independently using monotonic stacks, and subtract!
        </p>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Function to find the indices of next smaller elements.
    private int[] findNSE(int[] arr) {
        int n = arr.length;
        int[] ans = new int[n];
        Stack<Integer> st = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            int currEle = arr[i];
            while (!st.isEmpty() && arr[st.peek()] >= currEle) {
                st.pop();
            }
            ans[i] = !st.isEmpty() ? st.peek() : n;
            st.push(i);
        }
        return ans;
    }

    // Function to find the indices of next greater elements.
    private int[] findNGE(int[] arr) {
        int n = arr.length;
        int[] ans = new int[n];
        Stack<Integer> st = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            int currEle = arr[i];
            while (!st.isEmpty() && arr[st.peek()] <= currEle) {
                st.pop();
            }
            ans[i] = !st.isEmpty() ? st.peek() : n;
            st.push(i);
        }
        return ans;
    }

    // Function to find the indices of previous smaller or equal elements.
    private int[] findPSEE(int[] arr) {
        int n = arr.length;
        int[] ans = new int[n];
        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < n; i++) {
            int currEle = arr[i];
            while (!st.isEmpty() && arr[st.peek()] > currEle) {
                st.pop();
            }
            ans[i] = !st.isEmpty() ? st.peek() : -1;
            st.push(i);
        }
        return ans;
    }

    // Function to find the indices of previous greater or equal elements.
    private int[] findPGEE(int[] arr) {
        int n = arr.length;
        int[] ans = new int[n];
        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < n; i++) {
            int currEle = arr[i];
            while (!st.isEmpty() && arr[st.peek()] < currEle) {
                st.pop();
            }
            ans[i] = !st.isEmpty() ? st.peek() : -1;
            st.push(i);
        }
        return ans;
    }

    // Function to find the sum of minimum values in all subarrays.
    private long sumSubarrayMins(int[] arr) {
        int[] nse = findNSE(arr);
        int[] psee = findPSEE(arr);
        int n = arr.length;
        long sum = 0;

        for (int i = 0; i < n; i++) {
            long left = i - psee[i];
            long right = nse[i] - i;
            long freq = left * right;
            long val = freq * arr[i];
            sum += val;
        }
        return sum;
    }

    // Function to find the sum of maximum values in all subarrays.
    private long sumSubarrayMaxs(int[] arr) {
        int[] nge = findNGE(arr);
        int[] pgee = findPGEE(arr);
        int n = arr.length;
        long sum = 0;

        for (int i = 0; i < n; i++) {
            long left = i - pgee[i];
            long right = nge[i] - i;
            long freq = left * right;
            long val = freq * arr[i];
            sum += val;
        }
        return sum;
    }

    // Function to find the sum of all subarray ranges.
    public long subArrayRanges(int[] arr) {
        return sumSubarrayMaxs(arr) - sumSubarrayMins(arr);
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Four monotonic boundary traversals of length N, running in strict linear time.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Index arrays for NSE, NGE, PSEE, and PGEE.</div>
        </div>
      </div>

      {/* 21. Asteroid Collision */}
      <div id="asteroid-collision" data-topic-boundary="true" />
      <p className="page-sub">
        Given an array of asteroids moving at identical speeds: positive asteroids move right, negative asteroids
        move left. When two asteroids collide, the smaller one explodes; if equal, both explode.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 735</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Collision Simulation &bull; Stack Physics</span>
      </div>

      <div className="card">
        <p>
          <strong>Collision Dynamics.</strong> Collisions happen <em>only</em> when a left-moving asteroid (<code>&lt; 0</code>)
          encounters preceding right-moving asteroids (<code>&gt; 0</code>). Two asteroids moving in the same direction,
          or a left-mover followed by a right-mover (<code>&lt;- -&gt;</code> moving away), will never collide.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Survivor Resolution Rules</div>
          <ul>
            <li><code>asteroid &gt; 0</code>: Cannot collide with past asteroids; add directly to survivors.</li>
            <li><code>asteroid &lt; 0</code>: Collides with right-movers at stack top:
              <ul>
                <li>If <code>topSize &lt; currentSize</code>: Right-mover explodes (pop stack), keep resolving.</li>
                <li>If <code>topSize == currentSize</code>: Both explode (pop stack), current is destroyed.</li>
                <li>If <code>topSize &gt; currentSize</code>: Current asteroid explodes, stack remains untouched.</li>
              </ul>
            </li>
            <li>If current negative asteroid was not destroyed by any right-mover, add it to survivors.</li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Simulates asteroid collisions with an array stack.
    public int[] asteroidCollision(int[] asteroids) {
        ArrayList<Integer> survivors = new ArrayList<>();

        // Process asteroids from left to right.
        for (int asteroid : asteroids) {
            // A right mover cannot hit earlier asteroids.
            if (asteroid > 0) {
                survivors.add(asteroid);
            } else {
                int currentSize = Math.abs(asteroid);
                boolean destroyed = false;

                // Check only right movers nearest to the asteroid.
                while (!survivors.isEmpty()
                        && survivors.get(survivors.size() - 1) > 0) {
                    int topIndex = survivors.size() - 1;
                    int topSize = Math.abs(survivors.get(topIndex));

                    // Smaller right movers explode first.
                    if (topSize < currentSize) {
                        survivors.remove(topIndex);
                    } else {
                        // Equal size removes the stored asteroid too.
                        if (topSize == currentSize) {
                            survivors.remove(topIndex);
                        }
                        destroyed = true;
                        break;
                    }
                }

                // Store a left mover after every blocker is gone.
                if (!destroyed) {
                    survivors.add(asteroid);
                }
            }
        }

        int[] answer = new int[survivors.size()];
        // Copy list values into the required array result.
        for (int index = 0; index < survivors.size(); index++) {
            answer[index] = survivors.get(index);
        }
        return answer;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Each asteroid added to survivors and removed at most once.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">List holds at most N surviving asteroids.</div>
        </div>
      </div>

      {/* 22. Largest rectangle in a given histogram */}
      <div id="largest-rectangle-in-histogram" data-topic-boundary="true" />
      <p className="page-sub">
        Given an array of integers heights representing the histogram&apos;s bar height where the width of each bar is 1,
        return the area of the largest rectangle in the histogram.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 84</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Monotonic Stack &bull; Sentinel Bar Trick</span>
      </div>

      <div className="card">
        <p>
          <strong>Single-Pass Monotonic Stack with Sentinel.</strong> A bar of height <code>H</code> can extend sideways
          until encountering a bar with strictly smaller height on the left and right.
          By appending a virtual sentinel bar of <strong>height 0 at index n</strong>, all remaining active bars in the stack
          are cleanly popped and evaluated at the end without requiring secondary cleanup loops!
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Width Calculation Formula</div>
          <p>
            When bar <code>height = heights[indices.pop()]</code> is popped:
          </p>
          <ul>
            <li>Right smaller boundary is the current <code>index</code>.</li>
            <li>Left smaller boundary is the new stack top <code>indices.peek()</code>.</li>
            <li>Width: <code>indices.isEmpty() ? index : index - indices.peek() - 1</code>.</li>
            <li>Area: <code>(long) height * width</code>.</li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Finds the largest rectangle with a stack.
    public long largestRectangleArea(int[] heights) {
        int n = heights.length;
        Deque<Integer> indices = new ArrayDeque<>();
        long maxArea = 0;

        // Add a zero sentinel to close remaining bars.
        for (int index = 0; index <= n; index++) {
            int currentHeight = index == n ? 0 : heights[index];

            // A shorter bar closes taller rectangles.
            while (!indices.isEmpty() &&
                    heights[indices.peek()] >= currentHeight) {
                int height = heights[indices.pop()];

                // The new top is the smaller left boundary.
                int width = indices.isEmpty()
                        ? index
                        : index - indices.peek() - 1;

                // The popped bar limits the closed rectangle.
                long area = (long) height * width;

                // Preserve the largest closed rectangle.
                maxArea = Math.max(maxArea, area);
            }

            // Only real bar indices belong in the stack.
            if (index < n) {
                indices.push(index);
            }
        }
        // The sentinel has resolved every bar.
        return maxArea;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Every index is pushed onto the stack once and popped at most once.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Stack holds at most N bar indices.</div>
        </div>
      </div>

      {/* 23. Maximal Rectangle */}
      <div id="maximal-rectangle" data-topic-boundary="true" />
      <p className="page-sub">
        Given a rows x cols binary matrix filled with 0&apos;s and 1&apos;s, find the largest rectangle containing only 1&apos;s
        and return its area.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 85</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Matrix to Histogram Transformation &bull; O(R &times; C)</span>
      </div>

      <div className="card">
        <p>
          <strong>Histogram Accumulation.</strong> Treat each row as the base of a histogram.
          Maintain a 1D array <code>heights[col]</code>. As we scan row by row:
        </p>
        <ul>
          <li>If <code>matrix[row][col] == &apos;1&apos;</code>: <code>heights[col]++</code> (extends column height upwards).</li>
          <li>If <code>matrix[row][col] == &apos;0&apos;</code>: <code>heights[col] = 0</code> (base broken, reset to zero).</li>
          <li>Run <code>largestRectangleArea(heights)</code> on the updated histogram row!</li>
        </ul>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Finds largest rectangle containing only 1's in a binary matrix.
    public int maximalRectangle(char[][] matrix) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
            return 0;
        }

        int rows = matrix.length;
        int cols = matrix[0].length;
        int[] heights = new int[cols];
        int maxArea = 0;

        for (int r = 0; r < rows; r++) {
            // Update column heights for current row base
            for (int c = 0; c < cols; c++) {
                if (matrix[r][c] == '1') {
                    heights[c]++;
                } else {
                    heights[c] = 0;
                }
            }
            // Evaluate largest histogram on this row
            maxArea = Math.max(maxArea, (int) largestHistogram(heights));
        }
        return maxArea;
    }

    private long largestHistogram(int[] heights) {
        int n = heights.length;
        Deque<Integer> st = new ArrayDeque<>();
        long max = 0;

        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.isEmpty() && heights[st.peek()] >= h) {
                int height = heights[st.pop()];
                int width = st.isEmpty() ? i : i - st.peek() - 1;
                max = Math.max(max, (long) height * width);
            }
            if (i < n) st.push(i);
        }
        return max;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(R &times; C)</div>
          <div className="cx-note">For R rows, calculating O(C) histogram area takes O(R &times; C) total steps.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(C)</div>
          <div className="cx-note">Heights array and stack of size equal to column count C.</div>
        </div>
      </div>

      {/* 24. Remove K digits */}
      <div id="remove-k-digits" data-topic-boundary="true" />
      <p className="page-sub">
        Given string num representing a non-negative integer and an integer k, return the smallest possible integer
        after removing k digits from num.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 402</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Greedy Monotonic Stack &bull; Leading Zero Strip</span>
      </div>

      <div className="card">
        <p>
          <strong>Greedy Monotonicity.</strong> A number is minimized when its higher-order place values (leftmost digits)
          are as small as possible. If a digit is followed by a smaller digit, dropping the preceding larger digit
          guarantees a smaller prefix value.
        </p>

        <div className="callout callout-key">
          <div className="callout-title">🔑 Edge Case Handling</div>
          <ul>
            <li><strong>Monotonic Increasing End:</strong> If remaining <code>k &gt; 0</code> after scan (e.g. <code>&quot;12345&quot;, k=2</code>), pop remaining digits from end.</li>
            <li><strong>Leading Zeroes:</strong> Stripping leading zeroes from the result string.</li>
            <li><strong>All Digits Removed:</strong> If no digits remain, return <code>&quot;0&quot;</code>.</li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Returns the smallest number after k removals.
    public String removeKdigits(String num, int k) {
        Stack<Character> digits = new Stack<>();
        int remaining = k;

        // Process every digit from left to right.
        for (char digit : num.toCharArray()) {
            // Remove larger previous digits to make the number smaller.
            while (remaining > 0 && !digits.isEmpty()
                    && digits.peek() > digit) {
                digits.pop();
                remaining--;
            }
            // Retain the current digit for future comparisons.
            digits.push(digit);
        }

        // A non-decreasing sequence needs removals from the end.
        while (remaining > 0 && !digits.isEmpty()) {
            digits.pop();
            remaining--;
        }

        StringBuilder result = new StringBuilder();
        // Stack order is reversed, so collect digits first.
        while (!digits.isEmpty()) {
            result.append(digits.pop());
        }
        result.reverse();

        int start = 0;
        // Skip leading zeroes from the final number.
        while (start < result.length()
                && result.charAt(start) == '0') {
            start++;
        }

        // No remaining digit represents zero.
        if (start == result.length()) {
            return "0";
        }
        return result.substring(start);
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Each digit pushed and popped from stack at most once.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Stack and StringBuilder holding at most N characters.</div>
        </div>
      </div>

      {/* 25. Stock span problem */}
      <div id="stock-span-problem" data-topic-boundary="true" />
      <p className="page-sub">
        The span of the stock&apos;s price today is the maximum number of consecutive days (starting today and going backward)
        for which the price of the stock was less than or equal to today&apos;s price.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 901</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Monotonic Stack &bull; Index Distance</span>
      </div>

      <div className="card">
        <p>
          <strong>Nearest Greater Price on Left.</strong> The span on day <code>i</code> is the distance to the previous day
          whose price was <em>strictly greater</em> than <code>prices[i]</code>.
          Maintain a monotonic decreasing stack of indices. All days with price &le; today&apos;s price are subsumed into today&apos;s
          span and can be popped!
        </p>
        <div className="recurrence">{`If stack is empty:  span[i] = i + 1  (all prior days had price <= today)
Else:               span[i] = i - stack.peek()`}</div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Calculates every stock span with a monotonic stack.
    public int[] calculateSpan(int[] prices) {
        int n = prices.length;
        int[] spans = new int[n];
        Stack<Integer> indices = new Stack<>();

        // Earlier greater-price candidates stay on the stack.
        for (int currentDay = 0; currentDay < n; currentDay++) {
            // Smaller or equal prices cannot bound the span.
            while (!indices.empty() &&
                    prices[indices.peek()] <= prices[currentDay]) {
                indices.pop();
            }

            // An empty stack allows the span to reach day zero.
            if (indices.empty()) {
                spans[currentDay] = currentDay + 1;
            } else {
                // The nearest greater price on the left limits how far the span can extend.
                spans[currentDay] = currentDay - indices.peek();
            }

            indices.push(currentDay);
        }
        return spans;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Each day index pushed once and popped at most once in O(N) total steps.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Monotonic index stack bounded by total number of days N.</div>
        </div>
      </div>

      {/* 26. Sliding window maximum */}
      <div id="sliding-window-maximum" data-topic-boundary="true" />
      <p className="page-sub">
        You are given an array of integers nums and a sliding window of size k moving from left to right.
        Return the max sliding window.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 239</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Monotonic Deque &bull; Decreasing Values &bull; O(N)</span>
      </div>

      <div className="card">
        <p>
          <strong>Monotonic Double-Ended Queue (Deque).</strong> Maintain a deque of indices in strictly decreasing order of element values:
        </p>
        <ol>
          <li><strong>Out of Window Eviction:</strong> If <code>dq.peekFirst() &le; i - k</code>, evict from front.</li>
          <li><strong>Smaller Value Eviction:</strong> While <code>!dq.isEmpty() &amp;&amp; nums[dq.peekLast()] &le; nums[i]</code>, pop from back (they can never be max while <code>nums[i]</code> is present).</li>
          <li><strong>Admit Current:</strong> Push <code>i</code> to back.</li>
          <li><strong>Record Max:</strong> Once <code>i &ge; k - 1</code>, <code>nums[dq.peekFirst()]</code> is the window maximum!</li>
        </ol>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Returns maximum in each sliding window of size k.
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        if (n == 0 || k == 0) return new int[0];

        int[] result = new int[n - k + 1];
        int ri = 0;
        // Store indices in decreasing order of element values
        Deque<Integer> dq = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // 1. Remove elements outside current window [i - k + 1, i]
            if (!dq.isEmpty() && dq.peekFirst() <= i - k) {
                dq.pollFirst();
            }

            // 2. Remove elements smaller than current element nums[i]
            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) {
                dq.pollLast();
            }

            // 3. Add current element's index
            dq.offerLast(i);

            // 4. Record front as maximum when first window is formed
            if (i >= k - 1) {
                result[ri++] = nums[dq.peekFirst()];
            }
        }
        return result;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Every index inserted and removed from deque at most once; strict 2N operations.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(K)</div>
          <div className="cx-note">Deque holds at most K indices at any given moment.</div>
        </div>
      </div>

      {/* 27. The Celebrity Problem */}
      <div id="the-celebrity-problem" data-topic-boundary="true" />
      <p className="page-sub">
        A celebrity is a person who is known to everyone else at the party, but knows nobody.
        Given an n x n binary matrix M, find if there is a celebrity in O(N) time and O(1) space.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 277 / GFG</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Elimination Tournament &bull; O(1) Auxiliary Space</span>
      </div>

      <div className="card">
        <p>
          <strong>Elimination Principle.</strong> Given two people A and B:
        </p>
        <ul>
          <li>If <code>knows(A, B) == 1</code>: A cannot be a celebrity (celebrities know nobody). A is eliminated.</li>
          <li>If <code>knows(A, B) == 0</code>: B cannot be a celebrity (everyone knows a celebrity). B is eliminated.</li>
        </ul>
        <p>
          Each comparison eliminates exactly one candidate. After <code>n - 1</code> comparisons using two pointers
          or a stack, only one potential candidate survives. A single O(N) verification pass confirms they meet the criteria.
        </p>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class Solution {
    // Function to find if there is a celebrity in the party or not.
    public int celebrity(int[][] M, int n) {
        // Two-pointer elimination tournament
        int top = 0;
        int down = n - 1;

        while (top < down) {
            if (M[top][down] == 1) {
                // top knows down -> top cannot be celebrity
                top++;
            } else {
                // top does not know down -> down cannot be celebrity
                down--;
            }
        }

        int candidate = top;

        // Verification pass: candidate must know 0 people, and all n-1 must know candidate
        for (int i = 0; i < n; i++) {
            if (i == candidate) continue;
            if (M[candidate][i] == 1 || M[i][candidate] == 0) {
                return -1; // No celebrity exists
            }
        }
        return candidate;
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(N)</div>
          <div className="cx-note">Elimination takes N-1 steps; verification takes 2(N-1) steps; total &le; 3N.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Constant extra space; two pointers and candidate identifier.</div>
        </div>
      </div>

      {/* 28. LRU cache */}
      <div id="lru-cache" data-topic-boundary="true" />
      <p className="page-sub">
        Design a data structure that follows the constraints of a Least Recently Used (LRU) cache, supporting
        <code>get</code> and <code>put</code> operations in strict O(1) time.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 146</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">HashMap + Doubly Linked List &bull; O(1) Operations</span>
      </div>

      <div className="card">
        <p>
          <strong>Hybrid Architecture.</strong>
          A <code>HashMap&lt;Integer, Node&gt;</code> provides O(1) lookup. A <strong>Doubly Linked List</strong> with dummy
          <code>head</code> and <code>tail</code> sentinels maintains access order in O(1):
        </p>
        <ul>
          <li><strong>Most Recently Used:</strong> Placed immediately after <code>head</code>.</li>
          <li><strong>Least Recently Used (Eviction Candidate):</strong> Located immediately before <code>tail</code>.</li>
          <li>Any <code>get</code> or update detaches the node from its current spot and reattaches it right after <code>head</code>.</li>
        </ul>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class LRUCache {
    private static class Node {
        int key;
        int val;
        Node prev;
        Node next;

        Node(int key, int val) {
            this.key = key;
            this.val = val;
        }
    }

    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head;
    private final Node tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.head = new Node(-1, -1);
        this.tail = new Node(-1, -1);
        head.next = tail;
        tail.prev = head;
    }

    // Insert node directly after dummy head (most recently used)
    private void addNode(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    // Unlink node from DLL
    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    public int get(int key) {
        if (!map.containsKey(key)) {
            return -1;
        }
        Node node = map.get(key);
        removeNode(node);
        addNode(node); // Mark as most recently used
        return node.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.val = value;
            removeNode(node);
            addNode(node);
        } else {
            if (map.size() == capacity) {
                // Evict LRU node right before dummy tail
                Node lru = tail.prev;
                map.remove(lru.key);
                removeNode(lru);
            }
            Node newNode = new Node(key, value);
            map.put(key, newNode);
            addNode(newNode);
        }
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">HashMap lookups and DLL pointer mutations are strictly O(1) for both get and put.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(Capacity)</div>
          <div className="cx-note">Stores up to capacity key-node pairs in map and DLL.</div>
        </div>
      </div>

      {/* 29. LFU Cache */}
      <div id="lfu-cache" data-topic-boundary="true" />
      <p className="page-sub">
        Design and implement a data structure for a Least Frequently Used (LFU) cache. When the cache is full,
        evict the key with lowest access frequency, breaking ties using LRU.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 460</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Dual HashMaps + Frequency Lists &bull; O(1) Operations</span>
      </div>

      <div className="card">
        <p>
          <strong>Frequency Buckets Architecture.</strong>
        </p>
        <ul>
          <li><code>keyToNode</code>: Map of <code>key &rarr; Node</code>, where each Node stores <code>(key, val, freq)</code>.</li>
          <li><code>freqToList</code>: Map of <code>freq &rarr; DoublyLinkedList</code> holding all nodes with that frequency in LRU order.</li>
          <li><code>minFreq</code>: Scalar tracking current global minimum frequency.</li>
        </ul>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Frequency Promotion &amp; Eviction Invariants</div>
          <ul>
            <li><strong>Access (get/put existing):</strong> Remove node from <code>freqToList[node.freq]</code>. If that list becomes empty and was equal to <code>minFreq</code>, increment <code>minFreq++</code>. Increment <code>node.freq++</code> and insert into <code>freqToList[node.freq]</code>.</li>
            <li><strong>Eviction:</strong> Remove LRU node from <code>freqToList[minFreq].tail.prev</code>, delete from <code>keyToNode</code>.</li>
            <li><strong>New Key:</strong> Insert with <code>freq = 1</code>, reset <code>minFreq = 1</code>.</li>
          </ul>
        </div>
      </div>

      <div className="sub-header">
        <h3>Code Implementation</h3>
      </div>
      <Code>{`class LFUCache {
    private static class Node {
        int key, val, freq;
        Node prev, next;

        Node(int key, int val) {
            this.key = key;
            this.val = val;
            this.freq = 1;
        }
    }

    private static class DoublyLinkedList {
        Node head, tail;
        int size;

        DoublyLinkedList() {
            this.head = new Node(-1, -1);
            this.tail = new Node(-1, -1);
            head.next = tail;
            tail.prev = head;
            this.size = 0;
        }

        void addFirst(Node node) {
            node.next = head.next;
            node.prev = head;
            head.next.prev = node;
            head.next = node;
            size++;
        }

        void remove(Node node) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            size--;
        }

        Node removeLast() {
            if (size == 0) return null;
            Node node = tail.prev;
            remove(node);
            return node;
        }
    }

    private final int capacity;
    private int minFreq;
    private final Map<Integer, Node> keyToNode;
    private final Map<Integer, DoublyLinkedList> freqToList;

    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        this.keyToNode = new HashMap<>();
        this.freqToList = new HashMap<>();
    }

    private void updateFreq(Node node) {
        int curFreq = node.freq;
        DoublyLinkedList curList = freqToList.get(curFreq);
        curList.remove(node);

        if (curFreq == minFreq && curList.size == 0) {
            minFreq++;
        }

        node.freq++;
        DoublyLinkedList newList = freqToList.computeIfAbsent(node.freq, k -> new DoublyLinkedList());
        newList.addFirst(node);
    }

    public int get(int key) {
        if (!keyToNode.containsKey(key)) {
            return -1;
        }
        Node node = keyToNode.get(key);
        updateFreq(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (capacity <= 0) return;

        if (keyToNode.containsKey(key)) {
            Node node = keyToNode.get(key);
            node.val = value;
            updateFreq(node);
        } else {
            if (keyToNode.size() == capacity) {
                DoublyLinkedList minList = freqToList.get(minFreq);
                Node toEvict = minList.removeLast();
                keyToNode.remove(toEvict.key);
            }
            Node newNode = new Node(key, value);
            keyToNode.put(key, newNode);
            minFreq = 1;
            DoublyLinkedList list = freqToList.computeIfAbsent(1, k -> new DoublyLinkedList());
            list.addFirst(newNode);
        }
    }
}`}</Code>

      <div className="cx-grid">
        <div className="cx-box">
          <div className="cx-label">Time Complexity</div>
          <div className="cx-val">O(1)</div>
          <div className="cx-note">Both get and put run in O(1) time using dual map lookups and DLL insertions.</div>
        </div>
        <div className="cx-box">
          <div className="cx-label">Space Complexity</div>
          <div className="cx-val">O(Capacity)</div>
          <div className="cx-note">Bounded by maximum capacity across node map and frequency list buckets.</div>
        </div>
      </div>
    </>
  );
}
