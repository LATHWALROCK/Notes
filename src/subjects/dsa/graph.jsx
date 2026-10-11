import Code from '../../components/Code.jsx';
import Cx, { CxBox } from '../../components/Cx.jsx';

/*
 * Subtopic ids are g1 … g54, distinct from the other DSA topics (s1-1…s6-7,
 * s7-1…s9-4, dp1-1…dp10-2). App.jsx mounts only the active topic, so
 * uniqueness within this file is what the show/hide actually requires; the `g`
 * numbering keeps ids unambiguous across the subject regardless.
 */
export default function Graph() {
  return (
    <>
      {/* 1 */}
      <div id="g1" data-topic-boundary="true" />
      <p className="part-subtitle">
        The vocabulary, the two flavours of edge, and why graphs are the superset that trees and linked lists both
        sit inside. Everything from BFS onward is this one idea applied with a different rule for &quot;which node
        comes next&quot;.
      </p>
      <div className="card">
        <p>
          A <strong>graph</strong> is a collection of <strong>nodes</strong> (also called{' '}
          <strong>vertices</strong>) connected by <strong>edges</strong>. That is the entire definition — unlike a
          tree, there is no required root, no required hierarchy, and no rule against cycles. A tree is, in fact,
          just a connected graph with no cycles and <code>n - 1</code> edges for <code>n</code> nodes; a linked list
          is a tree where every node has at most one child. Graphs drop both restrictions, which is exactly what
          makes them able to model things trees cannot: road networks, social connections, course prerequisites,
          word-ladder transformations.
        </p>
        <p>Two properties of an edge decide almost everything about which algorithm applies:</p>
      </div>
      <Cx>
        <CxBox label="Direction" value="Undirected vs Directed">
          An <strong>undirected</strong> edge <code>(u, v)</code> can be walked both ways — it is symmetric, so{' '}
          <code>u</code> is a neighbour of <code>v</code> and vice versa. A <strong>directed</strong> edge{' '}
          <code>u → v</code> can only be walked from <code>u</code> to <code>v</code>; being able to reach{' '}
          <code>u</code> from <code>v</code> says nothing about reaching <code>v</code> from <code>u</code>. Course
          prerequisites, task dependencies and web links are naturally directed.
        </CxBox>
        <CxBox label="Weight" value="Unweighted vs Weighted">
          An <strong>unweighted</strong> edge costs the same <code>1</code> step as every other edge, so the
          fewest-edges path is also the cheapest path — plain BFS finds it. A <strong>weighted</strong> edge carries
          its own cost, so the fewest-edges path and the cheapest path can disagree, which is exactly why
          Dijkstra&apos;s algorithm has to exist.
        </CxBox>
      </Cx>
      <div className="card">
        <p>
          <strong>Terminology worth being fluent in:</strong>
        </p>
        <ul>
          <li>
            <strong>Vertex / Node</strong> — a single point in the graph, usually numbered <code>0</code> to{' '}
            <code>V-1</code>.
          </li>
          <li>
            <strong>Edge</strong> — a connection between two vertices; the total is usually called <code>E</code>.
          </li>
          <li>
            <strong>Degree</strong> — the number of edges touching a vertex. In a directed graph this splits into{' '}
            <strong>in-degree</strong> (edges arriving) and <strong>out-degree</strong> (edges leaving) — a
            distinction the whole of Kahn&apos;s algorithm is built on.
          </li>
          <li>
            <strong>Path</strong> — a sequence of vertices connected by edges, with no vertex repeated.
          </li>
          <li>
            <strong>Cycle</strong> — a path that returns to its starting vertex. A graph with no cycles is called{' '}
            <strong>acyclic</strong>; a directed acyclic graph is a <strong>DAG</strong>, the structure topological
            sort exists for.
          </li>
          <li>
            <strong>Connected</strong> — an undirected graph where every vertex can reach every other vertex. A
            directed graph&apos;s analogue, where every vertex can reach every other and be reached back, is{' '}
            <strong>strongly connected</strong>.
          </li>
        </ul>
        <pre className="diagram">{
`  undirected                    directed (digraph)

    1 --- 2                       1 --> 2
    |     |                       ^     |
    |     |                       |     v
    3 --- 4                       4 <-- 3

  edge (1,2) usable both ways    edge 1->2 usable ONE way only
  degree(1) = 2                  in-degree(1)=1, out-degree(1)=1`
        }</pre>
      </div>

      {/* 2 */}
      <div id="g2" data-topic-boundary="true" />
      <p className="part-subtitle">Adjacency Matrix, Adjacency List</p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Choosing a representation</span>
      </div>
      <div className="card">
        <p>
          A graph described by <code>V</code> vertices and <code>E</code> edges needs to be stored somehow before
          any algorithm can run on it. Two representations cover essentially every problem in this document.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The trade-off in one sentence</div>
          The <strong>matrix</strong> answers &quot;are <code>u</code> and <code>v</code> connected?&quot; in{' '}
          <code>O(1)</code> but costs <code>O(V²)</code> memory regardless of how many edges actually exist; the{' '}
          <strong>list</strong> costs memory proportional to what is actually there, <code>O(V + E)</code>, but
          takes <code>O(degree(u))</code> to check a specific edge. Since almost every graph algorithm&apos;s real
          work is &quot;visit every neighbour of the current node&quot; rather than &quot;check one specific
          pair&quot;, the list is the default and the matrix is the exception — reached for only when the graph is
          dense or when <code>O(1)</code> edge lookup matters more than memory.
        </div>
      </div>

      <div className="subsection-header"><h3>Adjacency Matrix</h3></div>
      <div className="card">
        <p>
          A <code>V × V</code> grid where <code>matrix[u][v] = 1</code> means an edge exists from <code>u</code> to{' '}
          <code>v</code> (and a weight instead of <code>1</code> for a weighted graph). For an undirected graph the
          matrix is symmetric — <code>matrix[u][v] == matrix[v][u]</code> always — so half of it is redundant, which
          is part of why it is memory-expensive for sparse graphs.
        </p>
      </div>
      <div className="subsection-header"><h3>Code Implementation — Adjacency Matrix</h3></div>
      <Code>{
`class Graph {
    int[][] buildMatrix(int V, int[][] edges) {
        int[][] mat = new int[V][V];
        for (int[] e : edges) {
            int u = e[0], v = e[1];
            mat[u][v] = 1;
            mat[v][u] = 1;                    // omit this line for a DIRECTED graph
        }
        return mat;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Adjacency List</h3></div>
      <div className="card">
        <p>
          An array (or <code>List</code>) of size <code>V</code>, where slot <code>u</code> holds the list of
          vertices directly reachable from <code>u</code>. This is the representation used by essentially every
          problem from here on — <code>ArrayList&lt;ArrayList&lt;Integer&gt;&gt;</code> is the type you will type
          the most often in this entire topic.
        </p>
      </div>
      <div className="subsection-header"><h3>Code Implementation — Adjacency List</h3></div>
      <Code>{
`class Graph {
    ArrayList<ArrayList<Integer>> buildAdjList(int V, int[][] edges) {
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            int u = e[0], v = e[1];
            adj.get(u).add(v);
            adj.get(v).add(u);                // omit this line for a DIRECTED graph
        }
        return adj;
    }

    // Weighted variant: store (neighbour, weight) as a small Pair, used from
    // Dijkstra's Algorithm onward.
    ArrayList<ArrayList<int[]>> buildWeightedAdjList(int V, int[][] edges) {
        ArrayList<ArrayList<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {               // e = {u, v, weight}
            int u = e[0], v = e[1], w = e[2];
            adj.get(u).add(new int[]{v, w});
            adj.get(v).add(new int[]{u, w});  // omit this line for a DIRECTED graph
        }
        return adj;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 One line decides directed vs undirected</div>
        Every builder above is identical for a directed graph except for dropping the second{' '}
        <code>adj.get(v).add(u)</code> line. That single omission is worth checking first whenever a graph problem
        behaves unexpectedly — adding an edge in both directions when the problem meant one direction is the single
        most common silent bug in this whole topic, because the code still runs without throwing anything.
      </div>

      <Cx>
        <CxBox label="Matrix" value="O(V²) space">
          Edge lookup <code>O(1)</code>; building it is <code>O(V²)</code> or <code>O(E)</code>.
        </CxBox>
        <CxBox label="List" value="O(V + E) space">
          Edge lookup <code>O(degree(u))</code>; building it is <code>O(E)</code>.
        </CxBox>
      </Cx>

      {/* 3 */}
      <div id="g3" data-topic-boundary="true" />
      <p className="part-subtitle">
        The idea that every traversal-based graph problem in the next part is secretly built on.
      </p>
      <div className="card">
        <p>
          An undirected graph need not be one connected blob — it can split into several{' '}
          <strong>connected components</strong>, each an island where every vertex can reach every other vertex
          inside that island, but nothing outside it. A single BFS or DFS started at one vertex only ever visits
          that vertex&apos;s own component; it has no way to see the others.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The loop that turns &quot;one traversal&quot; into &quot;all components&quot;</div>
          <p>
            Wrap the traversal in a loop over every vertex, and only start a new traversal from a vertex that is
            still unvisited:
          </p>
          <div className="recurrence">{
`visited = array of false, size V
count = 0

for v in 0 .. V-1:
    if not visited[v]:
        count++
        bfs_or_dfs(v)          marks every vertex in v's component as visited

answer = count   (the number of connected components)`
          }</div>
          <p>
            This exact loop is the entire solution to Number of Provinces and Number of Islands — both problems are
            &quot;count the connected components&quot;, just over a matrix of friendships or a grid of land,
            respectively. Recognising this loop is recognising the whole pattern of the traversal part.
          </p>
        </div>
        <pre className="diagram">{
`  component A        component B      component C

    1 --- 2              5               7 --- 8
    |                    |
    3 --- 4               6

  three separate traversals needed; one BFS from vertex 1 never reaches 5, 6, 7 or 8`
        }</pre>
      </div>

      {/* 4 */}
      <div id="g4" data-topic-boundary="true" />
      <p className="part-subtitle">
        Breadth-First Search: explore the graph level by level, using a queue to guarantee that nothing farther away
        is visited before everything closer is.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">The level-by-level traversal</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a graph as an adjacency list and a starting vertex, return the order in
          which BFS visits every vertex.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why a queue, and why mark on enqueue</div>
          <p>
            A queue is First-In-First-Out, which is exactly the property needed to process vertices in the order
            they were <em>discovered</em>, which is the order of increasing distance from the start. If a stack were
            used instead, the traversal would dive down one branch before coming back for others — that is DFS, not
            BFS.
          </p>
          <p>
            <strong>Mark a vertex visited the moment it is enqueued</strong>, not when it is dequeued and processed.
            Two different neighbours can both discover the same unvisited vertex before either of them is dequeued;
            if the visited flag is set only at dequeue time, that vertex gets enqueued twice, and a graph with
            enough shared neighbours turns the queue size — and the running time — superlinear.
          </p>
        </div>
        <div className="recurrence">{
`vis = array of false, size V
q = empty queue
q.add(start); vis[start] = true          mark on ENQUEUE

while q is not empty:
    node = q.poll()
    record node in the answer
    for each neighbour of node:
        if not vis[neighbour]:
            vis[neighbour] = true        mark here too, before it ever reaches the front
            q.add(neighbour)`
        }</div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public ArrayList<Integer> bfsOfGraph(int V, ArrayList<ArrayList<Integer>> adj) {
        ArrayList<Integer> bfs = new ArrayList<>();
        boolean[] vis = new boolean[V];
        Queue<Integer> q = new LinkedList<>();

        q.add(0);
        vis[0] = true;                         // mark on enqueue, not on dequeue

        while (!q.isEmpty()) {
            int node = q.poll();
            bfs.add(node);

            for (int it : adj.get(node)) {      // every neighbour of the dequeued node
                if (!vis[it]) {                 // unvisited -> mark AND enqueue together
                    vis[it] = true;
                    q.add(it);
                }
            }
        }
        return bfs;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ A disconnected graph needs the component loop, not a single call</div>
        This function only explores the component containing vertex <code>0</code>. If the graph might be
        disconnected, wrap the call in the &quot;visit every unvisited vertex&quot; loop from Connected Components —
        starting a fresh BFS from each vertex that the previous ones never reached.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  graph:      0 --- 1
              |     |
              2 --- 3
              |
              4

  q: [0]                    vis={0}
  pop 0 -> bfs=[0]           push 1, 2    q:[1,2]     vis={0,1,2}
  pop 1 -> bfs=[0,1]         push 3       q:[2,3]     vis={0,1,2,3}
  pop 2 -> bfs=[0,1,2]       push 4       q:[3,4]     vis={0,1,2,3,4}
                             (3 already visited, skipped)
  pop 3 -> bfs=[0,1,2,3]     no new neighbours        q:[4]
  pop 4 -> bfs=[0,1,2,3,4]   done

  answer = [0, 1, 2, 3, 4]   -- level 0: {0}, level 1: {1,2}, level 2: {3,4}`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(V + E)">
          Every vertex dequeued once; every edge inspected at most twice (once from each endpoint).
        </CxBox>
        <CxBox label="Space" value="O(V)">
          The <code>vis</code> array and the queue, both bounded by <code>V</code>.
        </CxBox>
      </Cx>

      {/* 5 */}
      <div id="g5" data-topic-boundary="true" />
      <p className="part-subtitle">
        Depth-First Search: commit to one neighbour, follow it as far as possible, and only back up when there is
        nowhere left to go forward.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill">Recursion is the stack</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a graph as an adjacency list and a starting vertex, return the order in
          which DFS visits every vertex.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 The recursive call IS the stack</div>
          A BFS needs an explicit <code>Queue</code>; a DFS does not need an explicit <code>Stack</code>, because
          the Java call stack already behaves like one — each recursive call pushes a frame, and returning from it
          pops that frame. Mark a node visited the instant you arrive at it (at the top of the call, same principle
          as BFS&apos;s &quot;mark on enqueue&quot;), record it, then recurse into every unvisited neighbour before
          returning.
        </div>
        <div className="recurrence">{
`dfs(node, vis, adj, result):
    vis[node] = true
    result.add(node)
    for each neighbour of node:
        if not vis[neighbour]:
            dfs(neighbour, vis, adj, result)
    // nothing left to do -- "returning" IS the backtrack step`
        }</div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private void dfs(int node, boolean[] vis,
                      ArrayList<ArrayList<Integer>> adj, ArrayList<Integer> ls) {
        vis[node] = true;                      // mark on ARRIVAL
        ls.add(node);

        for (int it : adj.get(node)) {
            if (!vis[it]) {
                dfs(it, vis, adj, ls);          // commit fully to this neighbour before the next
            }
        }
    }

    public ArrayList<Integer> dfsOfGraph(int V, ArrayList<ArrayList<Integer>> adj) {
        boolean[] vis = new boolean[V];
        ArrayList<Integer> ls = new ArrayList<>();
        dfs(0, vis, adj, ls);
        return ls;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Stack depth on a long chain</div>
        Each recursive call is a real stack frame. A graph that is a single long chain of <code>10^5</code> vertices
        will recurse <code>10^5</code> deep and can overflow Java&apos;s default stack. Where that is a risk,
        convert to an <strong>explicit stack</strong>: push <code>node</code>, and instead of recursing, push every
        unvisited neighbour onto the stack and loop. The traversal order changes slightly (neighbours come off in
        reverse of the order they were pushed) but the set of vertices visited is identical.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  same graph:  0 --- 1
               |     |
               2 --- 3
               |
               4

  dfs(0): vis={0}, ls=[0]
    -> neighbour 1: dfs(1): vis={0,1}, ls=[0,1]
         -> neighbour 0: visited, skip
         -> neighbour 3: dfs(3): vis={0,1,3}, ls=[0,1,3]
              -> neighbour 1: visited, skip
              -> neighbour 2: dfs(2): vis={0,1,2,3}, ls=[0,1,3,2]
                   -> neighbour 0: visited, skip
                   -> neighbour 3: visited, skip
                   -> neighbour 4: dfs(4): vis={0,1,2,3,4}, ls=[0,1,3,2,4]
    back in dfs(0) -> neighbour 2: visited, skip

  answer = [0, 1, 3, 2, 4]   -- contrast with BFS's [0, 1, 2, 3, 4]:
  DFS dove down through 1 -> 3 -> 2 before ever coming back for 0's other neighbour`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(V + E)">
          Same bound as BFS — every vertex and edge touched a constant number of times.
        </CxBox>
        <CxBox label="Space" value="O(V)">
          <code>vis</code> array plus a recursion stack up to depth <code>V</code>.
        </CxBox>
      </Cx>

      <div className="callout callout-note">
        <div className="callout-title">📌 BFS or DFS — which one, when?</div>
        <p>
          Both visit the same <em>set</em> of reachable vertices in <code>O(V+E)</code>, so the choice rarely
          affects correctness for plain traversal. It matters when the problem has a direction-sensitive
          requirement:
        </p>
        <ul>
          <li>
            <strong>Shortest path in an unweighted graph</strong> needs BFS — only BFS visits in strictly increasing
            distance order.
          </li>
          <li>
            <strong>Exploring &quot;all the way down one path first&quot;</strong> — topological ordering via
            finishing times, cycle detection on a single path — is naturally DFS, because the recursion only returns
            after a whole branch is exhausted.
          </li>
          <li>
            <strong>Multi-source flood-style spreading</strong> (Rotten Oranges, Distance of Nearest Cell) wants
            BFS, because &quot;spreads one step per round, from everywhere at once&quot; is literally what a queue
            seeded with every source does.
          </li>
        </ul>
        Where these notes show both, as with Cycle Detection and Bipartite Check, both implementations are given
        side by side rather than picking one.
      </div>

      {/* 6 */}
      <div id="g6" data-topic-boundary="true" />
      <p className="part-subtitle">
        Connected Components, given as an adjacency matrix of friendships. This opens a run of twelve problems that
        are all &quot;BFS or DFS, applied to a grid or an adjacency list, with one extra rule&quot; — spot which
        shape a new problem matches and the solution is mostly already written.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 547</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Matrix → list, then count components</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> <code>isConnected[i][j] == 1</code> means city <code>i</code> and city{' '}
          <code>j</code> are directly connected. A <strong>province</strong> is a maximal group of cities reachable
          from one another, directly or indirectly. Count the provinces.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 This is exactly the Connected Components loop</div>
          &quot;Province&quot; is just this problem&apos;s word for &quot;connected component&quot;. The input
          happens to arrive as an adjacency <em>matrix</em> rather than a list, so the first step converts it, and
          the rest is the component loop verbatim: visit every unvisited vertex with a fresh DFS, counting how many
          times that happens.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private void dfs(int node, ArrayList<ArrayList<Integer>> adjLs, int[] vis) {
        vis[node] = 1;
        for (int it : adjLs.get(node)) {
            if (vis[it] == 0) {
                dfs(it, adjLs, vis);
            }
        }
    }

    public int numProvinces(ArrayList<ArrayList<Integer>> adj, int V) {
        // Convert the adjacency MATRIX into an adjacency LIST first.
        ArrayList<ArrayList<Integer>> adjLs = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adjLs.add(new ArrayList<>());
        }
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (adj.get(i).get(j) == 1 && i != j) {   // skip the diagonal: not a real edge
                    adjLs.get(i).add(j);
                    adjLs.get(j).add(i);
                }
            }
        }

        int[] vis = new int[V];
        int cnt = 0;
        for (int i = 0; i < V; i++) {
            if (vis[i] == 0) {
                cnt++;                              // a fresh component discovered
                dfs(i, adjLs, vis);
            }
        }
        return cnt;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Skip <code>i == j</code> while converting</div>
        The matrix&apos;s diagonal is always <code>1</code> (a city is trivially &quot;connected&quot; to itself),
        but that is not a real edge. Converting it into the list anyway adds a self-loop that costs nothing
        functionally here (a node cannot un-visit itself), but it is wasted work and, in graphs where self-loops
        matter elsewhere, a genuine bug source. Filtering it out while building the list is the clean habit.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V²)">Dominated by scanning the matrix to build the list.</CxBox>
        <CxBox label="Space" value="O(V)">The list, visited array, and recursion stack.</CxBox>
      </Cx>

      {/* 7 */}
      <div id="g7" data-topic-boundary="true" />
      <p className="part-subtitle">
        Connected Components again, this time over a grid where adjacency means &quot;up, down, left or right&quot;.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 200</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">The grid is the graph</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A grid of <code>&apos;1&apos;</code> (land) and <code>&apos;0&apos;</code>{' '}
          (water). An <strong>island</strong> is a maximal group of <code>&apos;1&apos;</code>s connected
          horizontally or vertically. Count the islands.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 There is no explicit adjacency list — the grid IS the graph</div>
          Each cell <code>(row, col)</code> is a vertex, and its neighbours are computed on the fly from{' '}
          <code>delrow[]</code> / <code>delcol[]</code> offset arrays rather than looked up in a <code>List</code>.
          This is the pattern every grid problem in this part shares: a <code>vis[n][m]</code> array plays the role
          of the visited array, and &quot;for each neighbour&quot; becomes a fixed 4-iteration loop with a bounds
          check.
        </div>
        <div className="recurrence">{
`delrow = {-1, 0, +1,  0}         up, down
delcol = { 0, +1, 0, -1}         right, left -- the four grid directions

for count components:
    for each cell (row, col):
        if not visited and grid[row][col] == '1':
            count++
            bfs_or_dfs(row, col)   -- floods the whole island, marking it visited`
        }</div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    int first;
    int second;
    public Pair(int first, int second) {
        this.first = first;
        this.second = second;
    }
}

class Solution {
    private void bfs(int ro, int co, int[][] vis, char[][] grid) {
        vis[ro][co] = 1;
        Queue<Pair> q = new LinkedList<>();
        q.add(new Pair(ro, co));
        int n = grid.length;
        int m = grid[0].length;

        while (!q.isEmpty()) {
            int row = q.peek().first;
            int col = q.peek().second;
            q.remove();

            // Traverse the 4 neighbours and flood any unvisited land.
            for (int delrow = -1; delrow <= 1; delrow++) {
                for (int delcol = -1; delcol <= 1; delcol++) {
                    // only the 4 straight directions -- skip diagonals and (0,0)
                    if (Math.abs(delrow) == Math.abs(delcol)) continue;

                    int nrow = row + delrow;
                    int ncol = col + delcol;
                    if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m
                        && grid[nrow][ncol] == '1' && vis[nrow][ncol] == 0) {
                        vis[nrow][ncol] = 1;
                        q.add(new Pair(nrow, ncol));
                    }
                }
            }
        }
    }

    public int numIslands(char[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        int[][] vis = new int[n][m];
        int cnt = 0;

        for (int row = 0; row < n; row++) {
            for (int col = 0; col < m; col++) {
                if (vis[row][col] == 0 && grid[row][col] == '1') {
                    cnt++;
                    bfs(row, col, vis, grid);
                }
            }
        }
        return cnt;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 The nested-loop neighbour trick</div>
        <code>Math.abs(delrow) == Math.abs(delcol)</code> is <code>true</code> for <code>(0,0)</code> (the cell
        itself) and for the four diagonals (<code>±1, ±1</code>), and <code>false</code> for exactly the four
        straight directions. It is a compact way to enumerate &quot;up, down, left, right&quot; without writing out
        two length-4 arrays, used here instead of the explicit <code>delrow[]</code>/<code>delcol[]</code> style
        used elsewhere in this part — both are equally correct; use whichever reads more clearly in the moment.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n·m)">Every cell visited and enqueued at most once.</CxBox>
        <CxBox label="Space" value="O(n·m)">
          <code>vis</code> array; the queue in the worst case (one giant island) also reaches <code>O(n·m)</code>.
        </CxBox>
      </Cx>

      {/* 8 */}
      <div id="g8" data-topic-boundary="true" />
      <p className="part-subtitle">
        The same &quot;flood an island&quot; idea as Number of Islands, but the flood repaints instead of just
        counting.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 733</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-success">Easy</span>
        <span className="pill tag-approach">DFS</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a starting pixel <code>(sr, sc)</code> and a <code>newColor</code>,
          repaint every pixel connected to it (4-directionally) that currently shares the starting pixel&apos;s
          original colour.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 The condition to flood is &quot;same original colour&quot;, and that doubles as the visited check
          </div>
          There is no separate <code>vis</code> array here: a pixel is &quot;visited&quot; exactly when its colour
          has already been changed to <code>newColor</code>, so the recursion&apos;s own guard{' '}
          <code>image[nrow][ncol] == iniColor</code> (and not already <code>newColor</code>) prevents
          re-processing. This collapsing of &quot;visited&quot; into &quot;already matches the new colour&quot; only
          works because painting is itself the side effect that marks progress — a pattern worth recognising
          whenever a problem&apos;s action and its visited-marking can be the same write.
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The edge case the guard quietly handles</div>
          If <code>newColor == iniColor</code>, painting a pixel does not change anything a future check can detect,
          and without care the recursion would flood forever. The guard <code>ans[nrow][ncol] != newColor</code> is
          what stops it: once the start pixel is set to <code>newColor</code> (which may already equal{' '}
          <code>iniColor</code>), every neighbour equal to <code>iniColor</code> also already equals{' '}
          <code>newColor</code>, so the condition is false and the recursion halts immediately rather than looping.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private void dfs(int row, int col, int[][] ans, int[][] image,
                      int newColor, int[] delRow, int[] delCol, int iniColor) {
        ans[row][col] = newColor;
        int n = image.length;
        int m = image[0].length;

        for (int i = 0; i < 4; i++) {
            int nrow = row + delRow[i];
            int ncol = col + delCol[i];
            if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m
                && image[nrow][ncol] == iniColor && ans[nrow][ncol] != newColor) {
                dfs(nrow, ncol, ans, image, newColor, delRow, delCol, iniColor);
            }
        }
    }

    public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
        int iniColor = image[sr][sc];
        int[][] ans = image;                 // an alias, not a copy -- see the note below
        int[] delRow = {-1, 0, +1, 0};
        int[] delCol = {0, +1, 0, -1};
        dfs(sr, sc, ans, image, newColor, delRow, delCol, iniColor);
        return ans;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 <code>ans = image</code> is a reference, not a copy</div>
        In Java, <code>int[][] ans = image;</code> makes <code>ans</code> point at the <em>same</em> array{' '}
        <code>image</code> does — convenient here because the DFS reads <code>image[nrow][ncol]</code> for the
        original-colour check while writing into <code>ans[nrow][ncol]</code>, and both need to see the same
        underlying grid as it is painted. If a problem ever needs the <em>original</em> grid preserved alongside the
        painted result, build a real copy with nested loops (or{' '}
        <code>Arrays.stream(image).map(int[]::clone).toArray(int[][]::new)</code>) instead of this alias.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n·m)">Each pixel entered at most once, by the guard.</CxBox>
        <CxBox label="Space" value="O(n·m)">Recursion stack, worst case a single connected region.</CxBox>
      </Cx>

      {/* 9 */}
      <div id="g9" data-topic-boundary="true" />
      <p className="part-subtitle">
        The first genuinely <strong>multi-source</strong> BFS: every rotten orange starts spreading on the same
        clock, simultaneously.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 994</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Multi-source BFS</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A grid of <code>0</code> (empty), <code>1</code> (fresh orange), <code>2</code>{' '}
          (rotten orange). Every minute, a rotten orange rots its fresh 4-neighbours. Return the minimum number of
          minutes until no fresh orange remains, or <code>-1</code> if some fresh orange can never be reached.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Seed the queue with every rotten orange, not just one</div>
          <p>
            A normal BFS starts from a single source. Here, rot spreads from <strong>every</strong> rotten orange at
            once, in lockstep — minute 1 rots everything adjacent to <em>any</em> initially rotten cell, not one at
            a time. The fix is to push every rotten cell onto the queue <em>before</em> the BFS loop starts, each
            tagged with time <code>0</code>. From then on it is an ordinary BFS; the queue&apos;s level-by-level
            nature already guarantees that everything at minute <code>t</code> is processed before anything at
            minute <code>t+1</code>, regardless of which original rotten orange a given spread traces back to.
          </p>
          <div className="recurrence">{
`q = all cells where grid[i][j] == 2, each with time 0
countFresh = number of cells where grid[i][j] == 1

tm = 0
while q not empty:
    (r, c, t) = q.poll()
    tm = max(tm, t)
    for each of the 4 neighbours:
        if in bounds and unvisited and grid[nrow][ncol] == 1:
            mark visited, push (nrow, ncol, t+1)
            cnt++                      -- oranges successfully rotted

answer = (cnt == countFresh) ? tm : -1`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Counting reachable oranges, not assuming they all are</div>
          The grid can have fresh oranges that are walled off by empty cells and never reach any rotten neighbour.
          The BFS alone only tells you how long the <em>reachable</em> part took; comparing <code>cnt</code>{' '}
          (oranges actually rotted) against <code>cntFresh</code> (oranges that existed at the start) is what
          catches the unreachable case and returns <code>-1</code> instead of silently reporting a time that ignores
          them.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    int row, col, tm;
    Pair(int _row, int _col, int _tm) {
        this.row = _row;
        this.col = _col;
        this.tm = _tm;
    }
}

class Solution {
    public int orangesRotting(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        Queue<Pair> q = new LinkedList<>();
        int[][] vis = new int[n][m];
        int cntFresh = 0;

        // Seed the queue with EVERY rotten orange, all at time 0 -- the multi-source step.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 2) {
                    q.add(new Pair(i, j, 0));
                    vis[i][j] = 2;
                } else {
                    vis[i][j] = 0;
                }
                if (grid[i][j] == 1) cntFresh++;
            }
        }

        int tm = 0;
        int[] drow = {-1, 0, +1, 0};
        int[] dcol = {0, 1, 0, -1};
        int cnt = 0;

        while (!q.isEmpty()) {
            int r = q.peek().row;
            int c = q.peek().col;
            int t = q.peek().tm;
            tm = Math.max(tm, t);
            q.remove();

            for (int i = 0; i < 4; i++) {
                int nrow = r + drow[i];
                int ncol = c + dcol[i];
                if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m
                    && vis[nrow][ncol] == 0 && grid[nrow][ncol] == 1) {
                    q.add(new Pair(nrow, ncol, t + 1));
                    vis[nrow][ncol] = 2;
                    cnt++;
                }
            }
        }

        if (cnt != cntFresh) return -1;        // some fresh orange was never reached
        return tm;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  grid:    2 1 1          minute 0: rotten = {(0,0)}, fresh = 5
           1 1 0
           0 1 1

  minute 1: (0,0) rots (0,1) and (1,0)
  minute 2: (0,1) rots (0,2) and (1,1); (1,0) rots nothing new ((1,1) already queued)
  minute 3: (1,1) rots (2,1)
  minute 4: (2,1) rots (2,2)

  all 5 fresh oranges rotted -> answer = 4`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(n·m)">Every cell enqueued at most once.</CxBox>
        <CxBox label="Space" value="O(n·m)">
          <code>vis</code> array plus the queue.
        </CxBox>
      </Cx>

      {/* 10 */}
      <div id="g10" data-topic-boundary="true" />
      <p className="part-subtitle">
        A BFS that also remembers, for every vertex, which vertex it came from.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">BFS</span>
        <span className="pill">Parent tracking</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given an undirected graph, determine whether it contains a cycle.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 An edge back to a visited, non-parent vertex IS a cycle</div>
          <p>
            In an undirected graph, every edge <code>(u, v)</code> is stored twice — once as <code>v</code> in{' '}
            <code>u</code>&apos;s list, once as <code>u</code> in <code>v</code>&apos;s list. So when BFS reaches{' '}
            <code>v</code> from <code>u</code> and later looks at <code>v</code>&apos;s own neighbour list, it will
            see <code>u</code> again — that is not a cycle, it is just the same edge reflected back. The check must
            therefore track each vertex&apos;s <strong>parent</strong> (the vertex it was discovered from) and only
            call it a cycle when a visited neighbour is found that is <strong>not</strong> the parent — meaning the
            graph reached that vertex by some <em>other</em> route too.
          </p>
          <div className="recurrence">{
`q holds (node, parent) pairs
q.add((src, -1))                       the source has no parent

while q not empty:
    (node, parent) = q.poll()
    for each adjacentNode of node:
        if unvisited:
            mark visited; q.add((adjacentNode, node))
        else if adjacentNode != parent:
            return TRUE -- a second route to an already-visited vertex: a cycle`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    int first;
    int second;
    Pair(int first, int second) {
        this.first = first;
        this.second = second;
    }
}

class Solution {
    private boolean checkForCycle(int src, int V,
                                   ArrayList<ArrayList<Integer>> adj, boolean[] vis) {
        vis[src] = true;
        Queue<Pair> q = new LinkedList<>();
        q.add(new Pair(src, -1));             // the source's "parent" is a sentinel: none

        while (!q.isEmpty()) {
            int node = q.peek().first;
            int parent = q.peek().second;
            q.remove();

            for (int adjacentNode : adj.get(node)) {
                if (!vis[adjacentNode]) {
                    vis[adjacentNode] = true;
                    q.add(new Pair(adjacentNode, node));
                } else if (parent != adjacentNode) {
                    return true;               // a visited vertex that is NOT our parent
                }
            }
        }
        return false;
    }

    public boolean isCycle(int V, ArrayList<ArrayList<Integer>> adj) {
        boolean[] vis = new boolean[V];
        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                if (checkForCycle(i, V, adj, vis)) return true;
            }
        }
        return false;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ The outer loop matters as much as the inner function</div>
        A graph can have several disconnected components, and a cycle could exist in any one of them while the
        component containing vertex <code>0</code> is perfectly acyclic. Looping over every unvisited vertex — the
        same Connected-Components loop — is what guarantees every component gets checked, not just the first.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V + E)">A standard BFS, run once per component.</CxBox>
        <CxBox label="Space" value="O(V)">
          <code>vis</code> array plus the queue of pairs.
        </CxBox>
      </Cx>

      {/* 11 */}
      <div id="g11" data-topic-boundary="true" />
      <p className="part-subtitle">
        The same parent-tracking idea, written as a recursion instead of a queue.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">DFS</span>
        <span className="pill">Parent is a call argument</span>
      </div>
      <div className="card">
        <p>
          The logic is identical to the BFS version — a visited neighbour that is not the immediate parent means a
          second route exists, hence a cycle — but here the &quot;parent&quot; is simply the argument the recursive
          call was made with, with no <code>Pair</code> needed.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private boolean dfs(int node, int parent, int[] vis,
                         ArrayList<ArrayList<Integer>> adj) {
        vis[node] = 1;
        for (int adjacentNode : adj.get(node)) {
            if (vis[adjacentNode] == 0) {
                if (dfs(adjacentNode, node, vis, adj) == true) {
                    return true;
                }
            } else if (adjacentNode != parent) {
                return true;                  // visited, and not where we came from
            }
        }
        return false;
    }

    public boolean isCycle(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] vis = new int[V];
        for (int i = 0; i < V; i++) {
            if (vis[i] == 0) {
                if (dfs(i, -1, vis, adj) == true) return true;
            }
        }
        return false;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Why the parent check still works under recursion</div>
        Each recursive call carries its own <code>parent</code> value as a plain argument — there is no shared
        mutable &quot;current parent&quot; variable to get confused across branches, because every stack frame has
        its own copy. This is the same reason a recursive DFS never needs the explicit <code>Pair</code> that the
        BFS version did: the call stack itself is carrying exactly the information a <code>Pair</code> would have
        queued.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V + E)">Identical bound to the BFS version.</CxBox>
        <CxBox label="Space" value="O(V)">
          <code>vis</code> array plus recursion depth up to <code>V</code>.
        </CxBox>
      </Cx>

      {/* 12 */}
      <div id="g12" data-topic-boundary="true" />
      <p className="part-subtitle">
        Another multi-source BFS, this time computing a distance for <em>every</em> cell instead of a single answer.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 542</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Multi-source BFS</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> For a binary grid, return a grid of the same size where each cell holds the
          distance (in 4-directional steps) to the <strong>nearest</strong> cell containing <code>1</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Same seeding trick as Rotten Oranges, different payoff</div>
          Push every cell that already holds a <code>1</code> onto the queue with distance <code>0</code>, then run
          one ordinary multi-source BFS. Because BFS explores in strictly increasing distance order, the{' '}
          <strong>first</strong> time any cell is reached, it is being reached by its nearest <code>1</code> — there
          is no need to ever revisit a cell with a worse distance, which is exactly what the <code>vis</code> check
          guarantees.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Node {
    int row, col, dist;
    Node(int _row, int _col, int _dist) {
        this.row = _row;
        this.col = _col;
        this.dist = _dist;
    }
}

class Solution {
    public int[][] nearest(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        int[][] vis = new int[n][m];
        int[][] dist = new int[n][m];
        Queue<Node> q = new LinkedList<>();

        // Seed with every cell that is already a 1.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 1) {
                    q.add(new Node(i, j, 0));
                    vis[i][j] = 1;
                } else {
                    vis[i][j] = 0;
                }
            }
        }

        int[] delrow = {-1, 0, +1, 0};
        int[] delcol = {0, +1, 0, -1};

        while (!q.isEmpty()) {
            int row = q.peek().row;
            int col = q.peek().col;
            int steps = q.peek().dist;
            q.remove();
            dist[row][col] = steps;

            for (int i = 0; i < 4; i++) {
                int nrow = row + delrow[i];
                int ncol = col + delcol[i];
                if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m && vis[nrow][ncol] == 0) {
                    vis[nrow][ncol] = 1;
                    q.add(new Node(nrow, ncol, steps + 1));
                }
            }
        }
        return dist;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 Write <code>dist[row][col]</code> on <em>dequeue</em>, not on enqueue
        </div>
        The distance a cell is enqueued with is correct, but writing it into the answer grid at dequeue time (as
        above) versus enqueue time makes no numerical difference here since both happen exactly once per cell — the
        choice is purely stylistic. What is <em>not</em> optional is marking <code>vis</code> on enqueue (the same
        &quot;mark on enqueue&quot; rule from plain BFS): without it, a cell with two equally-near sources could be
        queued twice before either is processed.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n·m)">Every cell enqueued once.</CxBox>
        <CxBox label="Space" value="O(n·m)">
          <code>vis</code> and <code>dist</code> grids plus the queue.
        </CxBox>
      </Cx>

      {/* 13 */}
      <div id="g13" data-topic-boundary="true" />
      <p className="part-subtitle">
        Flip the question around: instead of finding what connects to a source, find what connects to the{' '}
        <strong>boundary</strong> — and leave everything else to be captured.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 130</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Traverse from the edge inward</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A grid of <code>&apos;X&apos;</code> and <code>&apos;O&apos;</code>. Capture
          (flip to <code>&apos;X&apos;</code>) every region of <code>&apos;O&apos;</code> that is{' '}
          <strong>fully surrounded</strong> — i.e. does not touch the border of the grid, directly or via a
          connected chain of <code>&apos;O&apos;</code>s.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Mark what survives, not what gets captured</div>
          Checking &quot;is this region surrounded&quot; directly, for every region, is awkward. It is far easier to
          find the opposite: run DFS from <strong>every border cell</strong> that is an <code>&apos;O&apos;</code>,
          and mark everything that DFS reaches as safe. Any <code>&apos;O&apos;</code> left unmarked after that
          could not reach the border through any chain of <code>&apos;O&apos;</code>s — it is, by definition,
          surrounded — so a final sweep flips every unmarked <code>&apos;O&apos;</code> to{' '}
          <code>&apos;X&apos;</code>.
        </div>
        <div className="recurrence">{
`for every cell on the first row, last row, first column, or last column:
    if it is 'O' and unvisited:
        dfs(it)              marks it and everything connected to it as "safe"

for every cell in the grid:
    if it is 'O' and still unvisited:
        flip it to 'X'       it was surrounded -- nothing marked it safe`
        }</div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private void dfs(int row, int col, int[][] vis, char[][] mat,
                      int[] delrow, int[] delcol) {
        vis[row][col] = 1;
        int n = mat.length;
        int m = mat[0].length;

        for (int i = 0; i < 4; i++) {
            int nrow = row + delrow[i];
            int ncol = col + delcol[i];
            if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m
                && vis[nrow][ncol] == 0 && mat[nrow][ncol] == 'O') {
                dfs(nrow, ncol, vis, mat, delrow, delcol);
            }
        }
    }

    public char[][] fill(int n, int m, char[][] mat) {
        int[] delrow = {-1, 0, +1, 0};
        int[] delcol = {0, +1, 0, -1};
        int[][] vis = new int[n][m];

        // Flood from every border 'O' -- first/last row, first/last column.
        for (int j = 0; j < m; j++) {
            if (vis[0][j] == 0 && mat[0][j] == 'O') {
                dfs(0, j, vis, mat, delrow, delcol);
            }
            if (vis[n - 1][j] == 0 && mat[n - 1][j] == 'O') {
                dfs(n - 1, j, vis, mat, delrow, delcol);
            }
        }
        for (int i = 0; i < n; i++) {
            if (vis[i][0] == 0 && mat[i][0] == 'O') {
                dfs(i, 0, vis, mat, delrow, delcol);
            }
            if (vis[i][m - 1] == 0 && mat[i][m - 1] == 'O') {
                dfs(i, m - 1, vis, mat, delrow, delcol);
            }
        }

        // Anything still unvisited and 'O' was never reachable from the border -> capture.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (vis[i][j] == 0 && mat[i][j] == 'O') {
                    mat[i][j] = 'X';
                }
            }
        }
        return mat;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Four separate boundary loops, not one</div>
        The border of an <code>n × m</code> grid is not a single contiguous array — it is two full rows and two full
        columns. Missing any one of the four (first row, last row, first column, last column) means a whole
        edge&apos;s <code>&apos;O&apos;</code>s are treated as capturable even though they touch the border, which
        is wrong by definition. The corners are each covered twice (once by a row loop, once by a column loop),
        which is harmless since <code>dfs</code> is a no-op on an already-visited cell.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n·m)">
          Border seeding is <code>O(n+m)</code>; the DFS flood and final sweep are each <code>O(n·m)</code>.
        </CxBox>
        <CxBox label="Space" value="O(n·m)">
          <code>vis</code> grid plus recursion stack.
        </CxBox>
      </Cx>

      {/* 14 */}
      <div id="g14" data-topic-boundary="true" />
      <p className="part-subtitle">
        Surrounded Regions&apos; sibling: count what is trapped instead of flipping it.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1020</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Same boundary-first idea</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A binary grid of land (<code>1</code>) and water (<code>0</code>). A land cell
          can &quot;walk off the grid&quot; if a sequence of 4-directional land moves reaches the border. Count the
          land cells that <strong>cannot</strong> walk off.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Identical idea to Surrounded Regions, with BFS and a tally instead of a flip
          </div>
          Flood from every border land cell (BFS here instead of DFS, which makes no difference to correctness),
          marking everything reachable as &quot;can escape&quot;. Then count the land cells that were never marked —
          those are the enclaves. This is the same boundary-first reframing, applied to counting rather than
          mutating.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    int first, second;
    Pair(int first, int second) {
        this.first = first;
        this.second = second;
    }
}

class Solution {
    int numberOfEnclaves(int[][] grid) {
        Queue<Pair> q = new LinkedList<>();
        int n = grid.length;
        int m = grid[0].length;
        int[][] vis = new int[n][m];

        // Seed with every border land cell.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (i == 0 || j == 0 || i == n - 1 || j == m - 1) {
                    if (grid[i][j] == 1) {
                        q.add(new Pair(i, j));
                        vis[i][j] = 1;
                    }
                }
            }
        }

        int[] delrow = {-1, 0, +1, 0};
        int[] delcol = {0, +1, 0, -1};

        while (!q.isEmpty()) {
            int row = q.peek().first;
            int col = q.peek().second;
            q.remove();

            for (int i = 0; i < 4; i++) {
                int nrow = row + delrow[i];
                int ncol = col + delcol[i];
                if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m
                    && vis[nrow][ncol] == 0 && grid[nrow][ncol] == 1) {
                    q.add(new Pair(nrow, ncol));
                    vis[nrow][ncol] = 1;
                }
            }
        }

        int cnt = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 1 && vis[i][j] == 0) cnt++;
            }
        }
        return cnt;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 Prefer <code>&amp;&amp;</code> over a bitwise <code>&amp;</code> in the final count
        </div>
        A tempting shortcut in the counting loop is the bitwise <code>&amp;</code>. For two operands that are
        already strictly <code>0</code> or <code>1</code> the result happens to agree with logical AND, so it
        &quot;works&quot; — but it is worth defaulting to <code>&amp;&amp;</code> for boolean expressions
        regardless, both for the short-circuit behaviour it gives you for free and because mixing <code>&amp;</code>{' '}
        into boolean contexts habitually does occasionally bite when one side turns out to be numeric.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n·m)">Border seeding plus one BFS flood plus one counting pass.</CxBox>
        <CxBox label="Space" value="O(n·m)">
          <code>vis</code> grid plus the queue.
        </CxBox>
      </Cx>

      {/* 15 */}
      <div id="g15" data-topic-boundary="true" />
      <p className="part-subtitle">
        Number of Islands, but two islands with the same <strong>shape</strong> — wherever they happen to sit on the
        grid — count once.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Canonicalise the shape</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Count the number of <strong>distinct</strong> island shapes, where two islands
          are the same shape if one can be translated (shifted, not rotated or reflected) to exactly overlap the
          other.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Record positions relative to the island&apos;s own starting cell</div>
          <p>
            Translation-invariance means <em>absolute</em> coordinates cannot be compared directly — the same island
            shape at a different position has entirely different <code>(row, col)</code> pairs. The fix is to record
            every cell&apos;s position <strong>relative to the DFS&apos;s starting cell</strong>,{' '}
            <code>(row - row0, col - col0)</code>. Two islands with the same shape, however far apart, produce
            exactly the same set of relative offsets — because a DFS started at &quot;the same relative point&quot;
            in each visits cells in a shape-determined order.
          </p>
          <p>
            Collect each island&apos;s list of offsets, serialise it to a canonical string, and throw it into a{' '}
            <code>HashSet</code>. The set&apos;s final size is the count of distinct shapes.
          </p>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private void dfs(int row, int col, int[][] vis, int[][] grid,
                      ArrayList<String> vec, int row0, int col0) {
        vis[row][col] = 1;
        vec.add(toString(row - row0, col - col0));   // position RELATIVE to the island's start

        int n = grid.length;
        int m = grid[0].length;
        int[] delrow = {-1, 0, +1, 0};
        int[] delcol = {0, +1, 0, -1};

        for (int i = 0; i < 4; i++) {
            int nrow = row + delrow[i];
            int ncol = col + delcol[i];
            if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m
                && vis[nrow][ncol] == 0 && grid[nrow][ncol] == 1) {
                dfs(nrow, ncol, vis, grid, vec, row0, col0);
            }
        }
    }

    private String toString(int r, int c) {
        return Integer.toString(r) + " " + Integer.toString(c);
    }

    public int countDistinctIslands(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        int[][] vis = new int[n][m];
        HashSet<ArrayList<String>> st = new HashSet<>();

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (vis[i][j] == 0 && grid[i][j] == 1) {
                    ArrayList<String> vec = new ArrayList<>();
                    dfs(i, j, vis, grid, vec, i, j);     // row0, col0 fixed for this island
                    st.add(vec);
                }
            }
        }
        return st.size();
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ Why a <code>HashSet&lt;ArrayList&lt;String&gt;&gt;</code> works for shape comparison
        </div>
        Two <code>ArrayList</code>s are <code>.equals()</code> (and therefore hash identically) exactly when they
        contain the same elements <strong>in the same order</strong>. Since the DFS always visits neighbours in the
        same fixed order (up, right, down, left) starting from the same relative origin, two congruent islands
        produce offset lists that are not just set-equal but literally element-for-element identical in sequence —
        which is precisely what <code>ArrayList.equals</code> checks. Joining the offsets into one delimited{' '}
        <code>String</code> and using a <code>HashSet&lt;String&gt;</code> works identically and is a common
        alternative if a collection&apos;s hashing ever feels risky.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n·m)">
          Standard flood fill, plus <code>O(size)</code> hashing per island.
        </CxBox>
        <CxBox label="Space" value="O(n·m)">
          <code>vis</code> grid plus the set of offset lists.
        </CxBox>
      </Cx>

      {/* 16 */}
      <div id="g16" data-topic-boundary="true" />
      <p className="part-subtitle">
        Two-colour the graph with a BFS, and discover a cycle-based rule along the way: a graph is bipartite exactly
        when it has no odd-length cycle.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 785</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">BFS</span>
        <span className="pill">2-colouring</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A graph is <strong>bipartite</strong> if its vertices can be split into two
          groups such that every edge connects a vertex in one group to a vertex in the other — no edge sits inside
          a single group. Determine whether a given graph is bipartite.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Try to 2-colour it; failing IS the proof it is not bipartite</div>
          <p>
            Colour the source <code>0</code>, give every neighbour the <em>opposite</em> colour{' '}
            <code>1 - color[node]</code>, and keep going outward. If this process ever demands that a vertex be both
            colours — because it is adjacent to two vertices that already received the same colour as each other —
            the graph cannot be split into two independent groups, and it is not bipartite.
          </p>
          <div className="recurrence">{
`color[] = all -1 (uncoloured)

for every unvisited vertex i:
    color[i] = 0
    BFS from i:
        for each neighbour:
            if uncoloured: give it the OPPOSITE colour, enqueue
            else if neighbour's colour == current node's colour: return false

if every component 2-colours cleanly: return true`
          }</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 The bipartite ↔ no-odd-cycle equivalence</div>
          Walking around any cycle, the colour must alternate at every step for the 2-colouring to stay consistent;
          returning to the start after an <strong>odd</strong> number of steps forces the start vertex to disagree
          with its own colour. So a graph is bipartite if and only if it contains no cycle of odd length — any tree
          (no cycles at all) is trivially bipartite, which is why this check starts by assuming yes and only flips
          to no on a genuine contradiction.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private boolean check(int start, int V,
                           ArrayList<ArrayList<Integer>> adj, int[] color) {
        Queue<Integer> q = new LinkedList<>();
        q.add(start);
        color[start] = 0;

        while (!q.isEmpty()) {
            int node = q.peek();
            q.remove();

            for (int it : adj.get(node)) {
                // Not yet coloured -- give it the OPPOSITE colour.
                if (color[it] == -1) {
                    color[it] = 1 - color[node];
                    q.add(it);
                }
                // SAME colour -- someone coloured it along some other path.
                else if (color[it] == color[node]) {
                    return false;
                }
            }
        }
        return true;
    }

    public boolean isBipartite(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] color = new int[V];
        for (int i = 0; i < V; i++) color[i] = -1;

        for (int i = 0; i < V; i++) {
            if (color[i] == -1) {
                if (check(i, V, adj, color) == false) {
                    return false;
                }
            }
        }
        return true;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(V + E)">A standard BFS, run once per component.</CxBox>
        <CxBox label="Space" value="O(V)">
          <code>color</code> array plus the queue.
        </CxBox>
      </Cx>

      {/* 17 */}
      <div id="g17" data-topic-boundary="true" />
      <p className="part-subtitle">Same 2-colouring idea, propagated by recursion instead of a queue.</p>
      <div className="meta-row">
        <span className="pill">LeetCode 785</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">DFS</span>
        <span className="pill">Colour passed down the recursion</span>
      </div>
      <div className="card">
        <p>
          The recursive call is handed the colour <strong>to assign</strong> to the current node, and assigns the
          opposite colour to every uncoloured neighbour it recurses into — the colour alternates one level at a time
          down the call stack, exactly as it alternated one BFS level at a time above.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private boolean dfs(int node, int col, int[] color,
                         ArrayList<ArrayList<Integer>> adj) {
        color[node] = col;

        for (int it : adj.get(node)) {
            if (color[it] == -1) {
                if (dfs(it, 1 - col, color, adj) == false) {
                    return false;
                }
            } else if (color[it] == col) {
                return false;                  // a neighbour already shares OUR colour
            }
        }
        return true;
    }

    public boolean isBipartite(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] color = new int[V];
        for (int i = 0; i < V; i++) color[i] = -1;

        for (int i = 0; i < V; i++) {
            if (color[i] == -1) {
                if (dfs(i, 0, color, adj) == false) return false;
            }
        }
        return true;
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Same shape as Cycle Detection, one condition flipped</div>
        Compare this with the DFS cycle check in the undirected section: both colour or track something per vertex
        and both fail when a neighbour&apos;s recorded value conflicts with what the current path implies. Cycle
        detection fails on &quot;visited and not my parent&quot;; bipartite checking fails on &quot;coloured the
        same as me&quot;. Once you have written one, the other is a small edit away.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V + E)">Identical bound to the BFS version.</CxBox>
        <CxBox label="Space" value="O(V)">
          <code>color</code> array plus recursion depth up to <code>V</code>.
        </CxBox>
      </Cx>

      {/* 18 */}
      <div id="g18" data-topic-boundary="true" />
      <p className="part-subtitle">
        Two visited arrays instead of one: &quot;ever visited&quot; and &quot;visited on the current path&quot;.
        Directed edges break the parent-tracking trick from undirected cycle detection — reaching an
        already-visited vertex is not automatically a cycle, because a DAG&apos;s shared structure produces exactly
        that without any cycle existing.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">DFS</span>
        <span className="pill">pathVis is the real trick</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a directed graph, determine whether it contains a cycle.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why &quot;already visited&quot; is not enough here</div>
          <p>
            In <code>A → B</code>, <code>A → C</code>, <code>B → D</code>, <code>C → D</code>, a DFS from{' '}
            <code>A</code> down the <code>B</code> branch visits <code>D</code>; when it later explores the{' '}
            <code>C</code> branch and reaches <code>D</code> again, <code>D</code> is already visited — but there is
            no cycle, <code>D</code> simply has two parents reachable through different routes, which is completely
            legal in a DAG.
          </p>
          <p>
            The fix is a second array, <code>pathVis</code>, marking &quot;visited on the DFS path currently open
            above me&quot; — set when entering a node, and crucially <strong>cleared when leaving it</strong> (right
            before the function returns). A cycle exists exactly when the DFS reaches a node that is still marked in{' '}
            <code>pathVis</code>, meaning that node is one of the current call&apos;s own ancestors.
          </p>
          <div className="recurrence">{
`dfsCheck(node, vis, pathVis):
    vis[node] = true
    pathVis[node] = true

    for each neighbour:
        if unvisited: if dfsCheck(neighbour) == true: return true
        else if pathVis[neighbour] == true: return true   -- an ANCESTOR, not just "seen before"

    pathVis[node] = false      -- leaving node: it is no longer on the open path
    return false`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ Forgetting to clear <code>pathVis</code> on the way out breaks everything
          </div>
          If <code>pathVis[node]</code> is never reset to <code>false</code> when the function returns, every node
          the DFS has ever fully explored stays flagged as &quot;on the path&quot; forever, and the very situation
          described above (two legal parents sharing a descendant) gets misreported as a cycle. The reset line is
          not cleanup for its own sake — it is the only thing that makes <code>pathVis</code> mean &quot;on{' '}
          <em>this</em> path&quot; rather than &quot;ever visited&quot;, which is the entire reason it exists.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private boolean dfsCheck(int node, ArrayList<ArrayList<Integer>> adj,
                              int[] vis, int[] pathVis) {
        vis[node] = 1;
        pathVis[node] = 1;

        for (int it : adj.get(node)) {
            if (vis[it] == 0) {
                if (dfsCheck(it, adj, vis, pathVis) == true) {
                    return true;
                }
            } else if (pathVis[it] == 1) {     // seen, AND still open on this very path
                return true;
            }
        }

        pathVis[node] = 0;                     // leaving node -- it drops off the open path
        return false;
    }

    public boolean isCyclic(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] vis = new int[V];
        int[] pathVis = new int[V];

        for (int i = 0; i < V; i++) {
            if (vis[i] == 0) {
                if (dfsCheck(i, adj, vis, pathVis) == true) return true;
            }
        }
        return false;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  graph:  0 -> 1 -> 2 -> 0      (a real 3-cycle)
               |
               v
               3

  dfs(0): vis={0} pathVis={0}
    -> 1: dfs(1): vis={0,1} pathVis={0,1}
         -> 2: dfs(2): vis={0,1,2} pathVis={0,1,2}
              -> 0: vis[0]==1 AND pathVis[0]==1 -> CYCLE, return true all the way up

  contrast the DAG A->B, A->C, B->D, C->D from the callout:
    dfs(A): pathVis={A}
      -> B: pathVis={A,B}
           -> D: pathVis={A,B,D}; no neighbours; LEAVE D -> pathVis={A,B}
      LEAVE B -> pathVis={A}
      -> C: pathVis={A,C}
           -> D: vis[D]==1 but pathVis[D]==0 (we left it already) -> NOT a cycle, keep going
    no cycle reported -- correctly`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(V + E)">Standard DFS, run once per unvisited component.</CxBox>
        <CxBox label="Space" value="O(V)">
          Two <code>O(V)</code> arrays plus recursion depth.
        </CxBox>
      </Cx>

      {/* 19 */}
      <div id="g19" data-topic-boundary="true" />
      <p className="part-subtitle">
        Reusing the <code>pathVis</code> trick from cycle detection, with a third array recording the verdict for
        later.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 802</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">DFS</span>
        <span className="pill">Safe = never leads into a cycle</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A node is <strong>safe</strong> if every possible path starting from it
          eventually terminates (reaches a node with no outgoing edges) rather than looping forever. Return every
          safe node, sorted.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 A node is safe iff it cannot reach a cycle, including itself being part of one
          </div>
          <p>
            This is cycle detection with one addition: a third array, <code>check[]</code>, records <code>1</code>{' '}
            for a node once its subtree has been fully explored <strong>without</strong> discovering a cycle
            anywhere inside it. A node stuck in a cycle, or with a path leading into one, never gets to set{' '}
            <code>check[node] = 1</code> — the function returns <code>true</code> (cycle found) up through it
            instead, and <code>check</code> for it is left at its default, <code>0</code>.
          </p>
          <div className="recurrence">{
`dfsCheck(node): same cycle-detection body as before, PLUS:
    on every successful return (no cycle found anywhere below):
        check[node] = 1
    return false

a node is safe  <=>  check[node] == 1`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private boolean dfsCheck(int node, List<List<Integer>> adj,
                              int[] vis, int[] pathVis, int[] check) {
        vis[node] = 1;
        pathVis[node] = 1;
        check[node] = 0;

        for (int it : adj.get(node)) {
            if (vis[it] == 0) {
                if (dfsCheck(it, adj, vis, pathVis, check) == true) {
                    return true;
                }
            } else if (pathVis[it] == 1) {
                return true;
            }
        }

        check[node] = 1;                      // reached only on a clean, cycle-free return
        pathVis[node] = 0;
        return false;
    }

    public List<Integer> eventualSafeNodes(int V, List<List<Integer>> adj) {
        int[] vis = new int[V];
        int[] pathVis = new int[V];
        int[] check = new int[V];

        for (int i = 0; i < V; i++) {
            if (vis[i] == 0) {
                dfsCheck(i, adj, vis, pathVis, check);
            }
        }

        List<Integer> safeNodes = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            if (check[i] == 1) safeNodes.add(i);
        }
        return safeNodes;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 A node with no outgoing edges is automatically safe</div>
        Such a node&apos;s <code>for</code> loop body never executes, so the function falls straight through to{' '}
        <code>check[node] = 1</code> on its very first call — matching the definition exactly, with no special case
        required.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V + E)">One DFS pass, same bound as plain cycle detection.</CxBox>
        <CxBox label="Space" value="O(V)">
          Three <code>O(V)</code> arrays plus recursion depth.
        </CxBox>
      </Cx>

      {/* 20 */}
      <div id="g20" data-topic-boundary="true" />
      <p className="part-subtitle">
        Only valid on a DAG: an ordering of vertices such that every directed edge goes from earlier in the order to
        later.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">DFS</span>
        <span className="pill">Finish time, reversed</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a DAG, return a topological ordering of its vertices — any order where
          every edge <code>u → v</code> has <code>u</code> appearing before <code>v</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Push onto a stack when a node FINISHES, not when it starts</div>
          <p>
            A node only finishes its DFS call after every one of its descendants has already finished — that is
            simply what &quot;returning from the recursive call&quot; means. So if every node is pushed onto a stack
            at the moment its call returns, the stack ends up with <strong>dependents below their
            dependencies</strong>: popping the stack from the top yields every node before anything it points to.
            This only works because the graph is acyclic — a cycle would mean no consistent
            &quot;before/after&quot; exists at all, which is why topological sort is undefined on a cyclic graph.
          </p>
          <div className="recurrence">{
`dfs(node):
    vis[node] = true
    for each neighbour: if unvisited: dfs(neighbour)
    st.push(node)          -- AFTER all neighbours are done: node finishes LAST among its descendants

answer = pop the stack until empty`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private static void dfs(int node, int[] vis, Stack<Integer> st,
                             ArrayList<ArrayList<Integer>> adj) {
        vis[node] = 1;
        for (int it : adj.get(node)) {
            if (vis[it] == 0) {
                dfs(it, vis, st, adj);
            }
        }
        st.push(node);                        // push on FINISH, not on arrival
    }

    static int[] topoSort(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] vis = new int[V];
        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < V; i++) {
            if (vis[i] == 0) {
                dfs(i, vis, st, adj);
            }
        }

        int[] ans = new int[V];
        int i = 0;
        while (!st.isEmpty()) {
            ans[i++] = st.peek();
            st.pop();
        }
        return ans;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  graph:  5 -> 0      4 -> 0
          5 -> 2      4 -> 1
          2 -> 3      3 -> 1

  dfs(5): -> dfs(0): no neighbours, push 0            st (bottom->top): [0]
          -> dfs(2): -> dfs(3): -> dfs(1): push 1     st: [0,1]
                                    push 3            st: [0,1,3]
                          push 2                      st: [0,1,3,2]
          push 5                                      st: [0,1,3,2,5]
  dfs(4): 0 visited; 1 visited; push 4                st: [0,1,3,2,5,4]

  pop order (top to bottom): 4, 5, 2, 3, 1, 0
  check: every edge u->v has u before v -- e.g. 5->0: 5 is at index 1, 0 at index 5. OK.`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(V + E)">
          One DFS pass plus an <code>O(V)</code> drain of the stack.
        </CxBox>
        <CxBox label="Space" value="O(V)">
          <code>vis</code> array, the stack, and recursion depth.
        </CxBox>
      </Cx>

      {/* 21 */}
      <div id="g21" data-topic-boundary="true" />
      <p className="part-subtitle">
        The BFS route to the same ordering: repeatedly peel off vertices that have nothing left pointing into them.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">Kahn&apos;s Algorithm</span>
        <span className="pill">In-degree, not finish time</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> The same topological ordering, solved without recursion.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 A vertex with in-degree 0 has no unmet dependency</div>
          <p>
            Compute every vertex&apos;s <strong>in-degree</strong> — the number of edges pointing into it. A vertex
            with in-degree <code>0</code> depends on nothing and can safely go first. Place it, then{' '}
            <strong>remove</strong> it from consideration by decrementing the in-degree of everything it points to —
            which may unlock new in-degree-<code>0</code> vertices, queued the moment they reach zero. Repeating
            this drains the graph in a valid order.
          </p>
          <div className="recurrence">{
`indegree[v] = count of edges pointing into v, for every v

q = every vertex with indegree 0

topo = []
while q not empty:
    node = q.poll()
    topo.add(node)
    for each neighbour of node:
        indegree[neighbour]--
        if indegree[neighbour] == 0: q.add(neighbour)`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public int[] topoSort(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] indegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int it : adj.get(i)) {
                indegree[it]++;
            }
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) q.add(i);
        }

        int[] topo = new int[V];
        int i = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            topo[i++] = node;

            // node is now "removed": its outgoing edges no longer count against neighbours.
            for (int it : adj.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.add(it);
            }
        }
        return topo;
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Kahn&apos;s for free: cycle detection without a second array</div>
        If the graph contains a cycle, every vertex in that cycle keeps an in-degree of at least <code>1</code>{' '}
        forever — nothing outside the cycle feeds it down to zero, since the cycle only depends on itself. So{' '}
        <code>topo</code> never reaches length <code>V</code> when a cycle exists. This is the mechanism behind
        directed cycle detection by BFS: run exactly this algorithm and check whether the count of processed
        vertices equals <code>V</code>.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V + E)">
          Computing in-degrees is <code>O(E)</code>; the BFS drain is <code>O(V + E)</code>.
        </CxBox>
        <CxBox label="Space" value="O(V)">
          <code>indegree</code> array plus the queue.
        </CxBox>
      </Cx>

      {/* 22 */}
      <div id="g22" data-topic-boundary="true" />
      <p className="part-subtitle">
        Kahn&apos;s algorithm, read as a cycle detector: if topological sort cannot place every vertex, a cycle is
        exactly what is blocking it.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">BFS (Kahn&apos;s)</span>
        <span className="pill">Count processed vertices</span>
      </div>
      <div className="card">
        <p>
          Run Kahn&apos;s algorithm verbatim, counting how many vertices get dequeued. If that count reaches{' '}
          <code>V</code>, every vertex was eventually unlocked and no cycle exists. If the queue empties early with{' '}
          <code>cnt &lt; V</code>, the remaining vertices all have a permanently non-zero in-degree — they are cycle
          members (or only reachable through one) that nothing ever frees.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public boolean isCyclic(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] indegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int it : adj.get(i)) {
                indegree[it]++;
            }
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) q.add(i);
        }

        int cnt = 0;
        // O(V + E)
        while (!q.isEmpty()) {
            int node = q.poll();
            cnt++;

            for (int it : adj.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.add(it);
            }
        }

        if (cnt == V) return false;           // every vertex was eventually unlocked
        return true;                          // a cycle is holding some vertices back
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(V + E)">
          Identical to Kahn&apos;s itself — this adds only a counter.
        </CxBox>
        <CxBox label="Space" value="O(V)">
          <code>indegree</code> array plus the queue.
        </CxBox>
      </Cx>

      {/* 23 */}
      <div id="g23" data-topic-boundary="true" />
      <p className="part-subtitle">Cycle detection in a directed graph, wearing a prerequisites costume.</p>
      <div className="meta-row">
        <span className="pill">LeetCode 207</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Build the DAG, then Kahn&apos;s</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> <code>prerequisites[i] = [a, b]</code> means course <code>b</code> must be
          finished before course <code>a</code>. Determine whether it is possible to finish every course.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 &quot;Can finish everything&quot; means &quot;no circular dependency&quot;</div>
          Draw an edge <code>b → a</code> for every prerequisite pair — <code>b</code> must come before{' '}
          <code>a</code> — and the question becomes exactly &quot;is this directed graph acyclic?&quot; Run
          Kahn&apos;s algorithm and check whether the topological order reaches every course.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public boolean isPossible(int V, int[][] prerequisites) {
        // Build the graph: prerequisites[i] = [a, b] means edge b -> a.
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
        int m = prerequisites.length;
        for (int i = 0; i < m; i++) {
            adj.get(prerequisites[i][1]).add(prerequisites[i][0]);
        }

        int[] indegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int it : adj.get(i)) {
                indegree[it]++;
            }
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) q.add(i);
        }

        List<Integer> topo = new ArrayList<>();
        while (!q.isEmpty()) {
            int node = q.poll();
            topo.add(node);

            for (int it : adj.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.add(it);
            }
        }

        if (topo.size() == V) return true;
        return false;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(V + E)">
          <code>E</code> here is the number of prerequisite pairs.
        </CxBox>
        <CxBox label="Space" value="O(V + E)">Adjacency list, in-degree array, and the queue.</CxBox>
      </Cx>

      {/* 24 */}
      <div id="g24" data-topic-boundary="true" />
      <p className="part-subtitle">Course Schedule I, but return the actual order instead of just yes/no.</p>
      <div className="meta-row">
        <span className="pill">LeetCode 210</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Kahn&apos;s, returning the order</span>
      </div>
      <div className="card">
        <p>
          Identical to Course Schedule I, except the function now returns the topological order itself when one
          exists, and an empty array when it does not. Nothing about the algorithm changes — only what is handed
          back at the end.
        </p>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    static int[] findOrder(int n, int m, ArrayList<ArrayList<Integer>> prerequisites) {
        // Build the graph: prerequisites.get(i) = [a, b] means edge b -> a.
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int i = 0; i < m; i++) {
            adj.get(prerequisites.get(i).get(1)).add(prerequisites.get(i).get(0));
        }

        int[] indegree = new int[n];
        for (int i = 0; i < n; i++) {
            for (int it : adj.get(i)) {
                indegree[it]++;
            }
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) q.add(i);
        }

        int[] topo = new int[n];
        int ind = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            topo[ind++] = node;

            for (int it : adj.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.add(it);
            }
        }

        if (ind == n) return topo;
        int[] arr = {};                       // no valid order exists
        return arr;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(V + E)">Unchanged from Course Schedule I.</CxBox>
        <CxBox label="Space" value="O(V + E)">Unchanged from Course Schedule I.</CxBox>
      </Cx>

      {/* 25 */}
      <div id="g25" data-topic-boundary="true" />
      <p className="part-subtitle">
        The same problem as the DFS version, solved with a very different-looking but equally valid idea: reverse
        every edge, then peel from the outside in.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 802</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">BFS on the reversed graph</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return every node from which every path eventually terminates.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 A node with out-degree 0 in the ORIGINAL graph is trivially safe — peel from there
          </div>
          <p>
            In the original graph, a node with no outgoing edges is automatically safe (nothing to loop into). After
            reversing every edge, &quot;no outgoing edges&quot; becomes &quot;no incoming edges&quot; — an in-degree
            of <code>0</code> — which is exactly the condition Kahn&apos;s algorithm peels first. Run Kahn&apos;s on
            the <strong>reversed</strong> graph: every node that gets dequeued is safe, because it was only unlocked
            once every node that originally depended on <em>it</em> had already been confirmed safe.
          </p>
          <div className="recurrence">{
`adjRev[v] = reverse of every original edge u -> it  (store it -> u)
indegree[v] computed on adjRev  == out-degree of v in the ORIGINAL graph

q = every v with indegree 0 on the reversed graph (== out-degree 0 originally: trivially safe)

safeNodes = []
while q not empty:
    node = q.poll(); safeNodes.add(node)
    for it in adjRev[node]:
        indegree[it]--
        if indegree[it] == 0: q.add(it)       -- it depended only on already-safe nodes

sort(safeNodes)`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    List<Integer> eventualSafeNodes(int V, List<List<Integer>> adj) {
        List<List<Integer>> adjRev = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adjRev.add(new ArrayList<>());
        }
        int[] indegree = new int[V];

        for (int i = 0; i < V; i++) {
            // i -> it  becomes  it -> i  on the reversed graph
            for (int it : adj.get(i)) {
                adjRev.get(it).add(i);
                indegree[i]++;
            }
        }

        Queue<Integer> q = new LinkedList<>();
        List<Integer> safeNodes = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) q.add(i);
        }

        while (!q.isEmpty()) {
            int node = q.poll();
            safeNodes.add(node);

            for (int it : adjRev.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.add(it);
            }
        }

        Collections.sort(safeNodes);
        return safeNodes;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ <code>indegree[i]++</code> is counting the ORIGINAL out-degree
        </div>
        The increment happens while iterating <code>adj.get(i)</code> — the <em>original</em> adjacency list — so{' '}
        <code>indegree[i]</code> here ends up counting how many edges <code>i</code> had <strong>leaving</strong> it
        before any reversal, even though the variable is conceptually &quot;in-degree on the reversed graph&quot;.
        Both descriptions are the same number; naming it either way is fine as long as the code consistently treats
        it as &quot;how many not-yet-confirmed-safe successors does <code>i</code> still have&quot;, which is what
        must reach <code>0</code> before <code>i</code> can be queued.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V + E)">
          Building the reversed graph plus one Kahn&apos;s pass, plus an <code>O(V log V)</code> sort.
        </CxBox>
        <CxBox label="Space" value="O(V + E)">
          The reversed adjacency list plus the in-degree array and queue.
        </CxBox>
      </Cx>

      {/* 26 */}
      <div id="g26" data-topic-boundary="true" />
      <p className="part-subtitle">
        Topological sort, where the edges of the &quot;graph&quot; are not given — they have to be inferred from
        where two adjacent dictionary words first disagree.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">LeetCode 269 (Premium)</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Infer edges, then topo sort</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a list of <code>N</code> words from an alien language that uses the first{' '}
          <code>K</code> letters of the English alphabet, and which is known to be sorted lexicographically
          according to <em>some</em> ordering of those <code>K</code> letters, find one valid ordering of the
          letters.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Only consecutive words, and only their first mismatch, ever tell you anything
          </div>
          <p>
            If word <code>i</code> comes before word <code>i+1</code> in the sorted list, scan both words together
            until the first position where their characters differ. That one pair of characters is the only
            information this comparison yields: the alien ordering must place the first word&apos;s character before
            the second&apos;s. Draw an edge from it; do not keep scanning past the first mismatch — everything after
            it is irrelevant to this pair.
          </p>
          <p>
            Once every consecutive pair has contributed its one edge (if it has one — see the warning below), the
            result is a DAG on the <code>K</code> letters, and a topological sort of it with Kahn&apos;s algorithm
            is a valid alien alphabet order.
          </p>
          <div className="recurrence">{
`for i in 0 .. N-2:
    s1 = dict[i], s2 = dict[i+1]
    for ptr in 0 .. min(len(s1), len(s2)) - 1:
        if s1[ptr] != s2[ptr]:
            add edge  s1[ptr] -> s2[ptr]
            break                         -- stop at the FIRST mismatch only

answer = topoSort(K, adj), rendered back to letters`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The case this simplified version does not handle</div>
          If <code>s1</code> is a <strong>prefix</strong> of <code>s2</code> (e.g. <code>&quot;abc&quot;</code>{' '}
          before <code>&quot;ab&quot;</code>) and every character up to the shorter word&apos;s length matches, the
          dictionary is invalid — a word cannot come before its own prefix in any ordering, since a prefix is always
          lexicographically smaller. A fully robust solution checks for this and returns &quot;no valid order&quot;;
          the version here assumes well-formed input and omits that guard — worth naming explicitly rather than
          silently ignoring.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    // Kahn's algorithm, unchanged -- the alien alphabet IS just a topological sort.
    private List<Integer> topoSort(int V, List<List<Integer>> adj) {
        int[] indegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int it : adj.get(i)) {
                indegree[it]++;
            }
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) q.add(i);
        }

        List<Integer> topo = new ArrayList<>();
        while (!q.isEmpty()) {
            int node = q.poll();
            topo.add(node);

            for (int it : adj.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.add(it);
            }
        }
        return topo;
    }

    public String findOrder(String[] dict, int N, int K) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < K; i++) {
            adj.add(new ArrayList<>());
        }

        // Only CONSECUTIVE words are compared; only the FIRST mismatch yields an edge.
        for (int i = 0; i < N - 1; i++) {
            String s1 = dict[i];
            String s2 = dict[i + 1];
            int len = Math.min(s1.length(), s2.length());
            for (int ptr = 0; ptr < len; ptr++) {
                if (s1.charAt(ptr) != s2.charAt(ptr)) {
                    adj.get(s1.charAt(ptr) - 'a').add(s2.charAt(ptr) - 'a');
                    break;
                }
            }
        }

        List<Integer> topo = topoSort(K, adj);
        StringBuilder ans = new StringBuilder();
        for (int it : topo) {
            ans.append((char) (it + (int) 'a'));
        }
        return ans.toString();
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  dict = ["baa", "abcd", "abca", "cab", "cad"],  K = 4

  "baa" vs "abcd": mismatch at 0 ('b' vs 'a')  -> edge b -> a
  "abcd" vs "abca": mismatch at 3 ('d' vs 'a') -> edge d -> a
  "abca" vs "cab":  mismatch at 0 ('a' vs 'c') -> edge a -> c
  "cab" vs "cad":   mismatch at 2 ('b' vs 'd') -> edge b -> d

  graph: b->a, d->a, a->c, b->d
  indegree: a=2, b=0, c=1, d=1

  Kahn's: start with b (indegree 0)
    pop b -> a:1, d:0  -> queue d
    pop d -> a:0       -> queue a
    pop a -> c:0       -> queue c
    pop c

  topo order (indices): b, d, a, c  ->  answer = "bdac"`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(N·L + K)">
          <code>L</code> = average word length, for the comparisons; <code>O(K)</code> for the topo sort on the
          alphabet.
        </CxBox>
        <CxBox label="Space" value="O(K)">
          The graph has at most <code>K</code> vertices, one per distinct letter.
        </CxBox>
      </Cx>

      {/* 27 */}
      <div id="g27" data-topic-boundary="true" />
      <p className="part-subtitle">
        Topological order turns relaxing every edge into something that only ever has to happen once per edge. This
        begins four distinct shortest-path mechanisms, each matched to what the edges allow: topological order when
        the graph is a DAG, plain BFS when every edge costs exactly <code>1</code>, and a priority queue once
        weights differ.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Topo sort, then relax in that order</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A weighted DAG. Find the shortest distance from a source to every vertex (
          <code>1e9</code>, or <code>-1</code> in the final answer, if unreachable).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why topological order is exactly what makes one pass enough</div>
          <p>
            <strong>Relaxing</strong> an edge <code>u → v</code> with weight <code>wt</code> means checking{' '}
            <code>if (dist[u] + wt &lt; dist[v]) dist[v] = dist[u] + wt;</code>. For this single check to ever be
            correct, <code>dist[u]</code> must already be final by the time <code>v</code> is relaxed through it. A
            topological order guarantees precisely that: every edge <code>u → v</code> has <code>u</code> appearing
            earlier, so processing vertices in that order means every predecessor of a node has already had its
            chance to relax it before the node itself is reached.
          </p>
          <div className="recurrence">{
`topo = topological order of the DAG (any method -- DFS-stack or Kahn's)
dist[] = all 1e9 ;  dist[source] = 0

for node in topo, IN ORDER, starting from source's position:
    for each (neighbour, weight) edge of node:
        if dist[node] + weight < dist[neighbour]:
            dist[neighbour] = dist[node] + weight`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    int first, second;
    Pair(int first, int second) {
        this.first = first;
        this.second = second;
    }
}

class Solution {
    private void topoSort(int node, ArrayList<ArrayList<Pair>> adj,
                           int[] vis, Stack<Integer> st) {
        vis[node] = 1;
        for (int i = 0; i < adj.get(node).size(); i++) {
            int v = adj.get(node).get(i).first;
            if (vis[v] == 0) {
                topoSort(v, adj, vis, st);
            }
        }
        st.add(node);
    }

    public int[] shortestPath(int N, int M, int[][] edges) {
        ArrayList<ArrayList<Pair>> adj = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            adj.add(new ArrayList<>());
        }
        for (int i = 0; i < M; i++) {
            int u = edges[i][0], v = edges[i][1], wt = edges[i][2];
            adj.get(u).add(new Pair(v, wt));          // directed: only u -> v
        }

        int[] vis = new int[N];
        Stack<Integer> st = new Stack<>();
        for (int i = 0; i < N; i++) {
            if (vis[i] == 0) {
                topoSort(i, adj, vis, st);
            }
        }

        int[] dist = new int[N];
        for (int i = 0; i < N; i++) dist[i] = (int) 1e9;
        dist[0] = 0;

        // Pop the stack: this IS the topological order.
        while (!st.isEmpty()) {
            int node = st.peek();
            st.pop();

            for (int i = 0; i < adj.get(node).size(); i++) {
                int v = adj.get(node).get(i).first;
                int wt = adj.get(node).get(i).second;

                if (dist[node] + wt < dist[v]) {
                    dist[v] = wt + dist[node];
                }
            }
        }

        for (int i = 0; i < N; i++) {
            if (dist[i] == 1e9) dist[i] = -1;         // unreachable
        }
        return dist;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 Why <code>(int) 1e9</code> and a final conversion pass, not <code>-1</code> throughout
        </div>
        Using <code>-1</code> as &quot;unreached&quot; directly would break every relaxation comparison (
        <code>dist[node] + wt</code> would add to <code>-1</code> and could come out smaller than a real, positive
        distance, corrupting the result). <code>1e9</code> is large enough to lose every realistic comparison while
        still surviving being added to, exactly the sentinel discipline used throughout the Dynamic Programming
        notes for the same reason — then the very last loop translates the sentinel into the <code>-1</code> the
        problem actually wants reported.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V + E)">
          One topological sort plus one relaxation pass, each linear.
        </CxBox>
        <CxBox label="Space" value="O(V + E)">
          Adjacency list, <code>dist</code> array, stack.
        </CxBox>
      </Cx>

      {/* 28 */}
      <div id="g28" data-topic-boundary="true" />
      <p className="part-subtitle">
        When every edge costs exactly 1, plain BFS already computes shortest distances — no priority queue needed.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">BFS distance = shortest distance</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> An unweighted (equivalently, unit-weighted) undirected graph. Find the shortest
          distance from a source to every vertex.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 BFS visits in increasing distance order, by construction</div>
          A queue processes everything at distance <code>k</code> before anything at distance <code>k+1</code> is
          even looked at — that is simply what &quot;discovered from a distance-<code>k</code> node&quot; means. So{' '}
          <code>dist[neighbour] = dist[node] + 1</code>, applied the first time a vertex is reached, is already its
          shortest distance; no revisiting or priority ordering is required. This stops being true the instant edges
          can have different weights, which is exactly why Dijkstra&apos;s algorithm exists.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public int[] shortestPath(int[][] edges, int N, int M, int src) {
        ArrayList<ArrayList<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            adj.add(new ArrayList<>());
        }
        for (int i = 0; i < M; i++) {
            adj.get(edges[i][0]).add(edges[i][1]);
            adj.get(edges[i][1]).add(edges[i][0]);
        }

        int[] dist = new int[N];
        for (int i = 0; i < N; i++) dist[i] = (int) 1e9;
        dist[src] = 0;

        Queue<Integer> q = new LinkedList<>();
        q.add(src);
        while (!q.isEmpty()) {
            int node = q.poll();
            for (int it : adj.get(node)) {
                if (dist[node] + 1 < dist[it]) {      // first time reached IS the shortest
                    dist[it] = 1 + dist[node];
                    q.add(it);
                }
            }
        }

        for (int i = 0; i < N; i++) {
            if (dist[i] == 1e9) dist[i] = -1;
        }
        return dist;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(V + E)">One BFS pass.</CxBox>
        <CxBox label="Space" value="O(V + E)">
          Adjacency list, <code>dist</code> array, queue.
        </CxBox>
      </Cx>

      {/* 29 */}
      <div id="g29" data-topic-boundary="true" />
      <p className="part-subtitle">
        Unit-weight shortest path again — except the graph is never built explicitly. Every word is a vertex, and an
        edge exists between two words that differ in exactly one letter.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 127</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Generate neighbours on the fly</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given <code>startWord</code>, <code>targetWord</code>, and a{' '}
          <code>wordList</code>, find the length of the shortest transformation sequence where each step changes
          exactly one letter and every intermediate word must be in <code>wordList</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Generate neighbours by trying every letter at every position</div>
          <p>
            With up to <code>26 × L</code> possible one-letter edits of a length-<code>L</code> word, it is far
            cheaper to <em>generate</em> candidate neighbours and test membership in a <code>HashSet</code> than to
            compare every word against every other word. For each position in the current word, try all 26 letters;
            whenever the edited word is in the set, it is a genuine neighbour — BFS from there as usual, with the
            step count as the implicit distance.
          </p>
          <div className="recurrence">{
`st = HashSet of all words in wordList ; remove startWord from it
q = [(startWord, 1)]

while q not empty:
    (word, steps) = q.poll()
    if word == targetWord: return steps

    for each position i in word:
        for each letter 'a'..'z':
            replacedWord = word with position i set to that letter
            if st.contains(replacedWord):
                st.remove(replacedWord)        -- remove so this word is never re-queued
                q.add((replacedWord, steps + 1))

return 0   -- target unreachable`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ Removing from the set on discovery is standing in for a <code>vis</code> array
          </div>
          There is no separate visited array here — <code>st.remove(replacedWord)</code> does double duty as both
          &quot;this word has been used&quot; and &quot;don&apos;t offer it as a candidate again&quot;. Forgetting
          the removal would let the same word be discovered repeatedly from different queue entries, and in the
          worst case turn the BFS into exponential re-exploration rather than the intended linear-in-the-set
          visiting pattern.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    String first;
    int second;
    Pair(String _first, int _second) {
        this.first = _first;
        this.second = _second;
    }
}

class Solution {
    public int wordLadderLength(String startWord, String targetWord, String[] wordList) {
        Queue<Pair> q = new LinkedList<>();
        q.add(new Pair(startWord, 1));

        Set<String> st = new HashSet<>();
        int len = wordList.length;
        for (int i = 0; i < len; i++) {
            st.add(wordList[i]);
        }
        st.remove(startWord);

        while (!q.isEmpty()) {
            String word = q.peek().first;
            int steps = q.peek().second;
            q.remove();

            if (word.equals(targetWord) == true) return steps;

            for (int i = 0; i < word.length(); i++) {
                for (char ch = 'a'; ch <= 'z'; ch++) {
                    char[] replacedCharArray = word.toCharArray();
                    replacedCharArray[i] = ch;
                    String replacedWord = new String(replacedCharArray);

                    if (st.contains(replacedWord) == true) {
                        st.remove(replacedWord);     // consume it so it is only queued once
                        q.add(new Pair(replacedWord, steps + 1));
                    }
                }
            }
        }
        return 0;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(N·L·26)">
          <code>N</code> = word count, <code>L</code> = word length. Each word tried against 26 letters at each
          position.
        </CxBox>
        <CxBox label="Space" value="O(N·L)">
          The set of words plus the queue of (word, steps) pairs.
        </CxBox>
      </Cx>

      {/* 30 */}
      <div id="g30" data-topic-boundary="true" />
      <p className="part-subtitle">
        Word Ladder I, but return <strong>every</strong> shortest transformation sequence, not just the shortest
        length.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 126</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">BFS level by level, carrying full paths</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Return all shortest transformation sequences from <code>startWord</code> to{' '}
          <code>targetWord</code>, each step changing one letter and staying inside <code>wordList</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Carry the whole path in the queue, and remove words only once their WHOLE level is done
          </div>
          <p>
            Instead of a word and a step count, the queue now holds a <code>List&lt;String&gt;</code> — the entire
            path taken so far. Extending a path by one more valid word is just appending to a copy of that list. The
            subtlety is <em>when</em> a used word is removed from the set: if it were removed the instant any one
            path used it, a different, equally short path at the <strong>same level</strong> that also wants to use
            it would be blocked, even though both are legitimate shortest paths. So removal is batched — every word
            used anywhere in the current level is recorded, and only erased from the set after the <em>entire</em>{' '}
            level has finished being explored.
          </p>
          <div className="recurrence">{
`st = set of wordList ; level = 0
usedOnLevel = [startWord]

q = [[startWord]]              queue of PATHS, not single words
ans = []

while q not empty:
    vec = q.poll()
    if vec.size() > level:                     -- just moved to a new level
        level++
        for each word in usedOnLevel: st.remove(word)
        usedOnLevel.clear()

    word = vec.last()
    if word == targetWord:
        if ans is empty or ans[0].size() == vec.size(): ans.add(vec)
        continue                                 -- do not extend past the target

    for each one-letter edit of word:
        if st.contains(edit):
            q.add(vec + [edit])
            usedOnLevel.add(edit)                -- remembered, but NOT removed from st yet`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Why batching the removal is the entire difficulty of this problem</div>
          This is the one genuinely subtle line in Word Ladder II. Removing a word the moment it is consumed (as
          Word Ladder I safely does, since it only needs <em>one</em> path) would make this BFS miss every
          alternative shortest path that happens to pass through the same intermediate word from a sibling branch at
          the same level — silently returning too few sequences instead of all of them.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public ArrayList<ArrayList<String>> findSequences(String startWord, String targetWord,
                                                       String[] wordList) {
        Set<String> st = new HashSet<>();
        int len = wordList.length;
        for (int i = 0; i < len; i++) st.add(wordList[i]);

        Queue<ArrayList<String>> q = new LinkedList<>();
        ArrayList<String> ls = new ArrayList<>();
        ls.add(startWord);
        q.add(ls);

        ArrayList<String> usedOnLevel = new ArrayList<>();
        usedOnLevel.add(startWord);
        int level = 0;

        ArrayList<ArrayList<String>> ans = new ArrayList<>();

        while (!q.isEmpty()) {
            ArrayList<String> vec = q.peek();
            q.remove();

            // Erase every word used on the PREVIOUS level, now that the level is done.
            if (vec.size() > level) {
                level++;
                for (String it : usedOnLevel) {
                    st.remove(it);
                }
                usedOnLevel.clear();
            }

            String word = vec.get(vec.size() - 1);

            if (word.equals(targetWord)) {
                // The first sequence to reach the target fixes the answer's length.
                if (ans.size() == 0) ans.add(vec);
                else if (ans.get(0).size() == vec.size()) ans.add(vec);
            }

            for (int i = 0; i < word.length(); i++) {
                for (char c = 'a'; c <= 'z'; c++) {
                    char[] replacedCharArray = word.toCharArray();
                    replacedCharArray[i] = c;
                    String replacedWord = new String(replacedCharArray);

                    if (st.contains(replacedWord)) {
                        // Java works by reference, so copy the list before extending it.
                        ArrayList<String> temp = new ArrayList<>(vec);
                        temp.add(replacedWord);
                        q.add(temp);

                        usedOnLevel.add(replacedWord);   // used on THIS level only
                    }
                }
            }
        }
        return ans;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">
          📌 <code>new ArrayList&lt;&gt;(vec)</code> is not optional
        </div>
        Every queue entry must own its own list. Appending directly to <code>vec</code> before re-queueing it would
        mean every branch spawned from the same node shares and mutates one underlying list, corrupting every other
        path that was derived from it. The copy constructor is what gives each branch an independent history.
      </div>

      <Cx>
        <CxBox label="Time" value="O(N·L²·26)">
          Word Ladder I&apos;s bound, with an extra <code>O(L)</code> for copying each path.
        </CxBox>
        <CxBox label="Space" value="O(N·L)">
          Can grow large: many paths of length up to <code>L</code> live in the queue at once.
        </CxBox>
      </Cx>

      {/* 31 */}
      <div id="g31" data-topic-boundary="true" />
      <p className="part-subtitle">
        The algorithm this whole part has been building toward: shortest paths on a graph with{' '}
        <strong>non-negative</strong> weights that differ from edge to edge.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill tag-approach">Priority Queue</span>
        <span className="pill">Greedy + min-heap</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A weighted graph (non-negative weights) and a source <code>S</code>. Find the
          shortest distance from <code>S</code> to every vertex.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Always expand the frontier&apos;s currently-cheapest vertex next</div>
          <p>
            Plain BFS processes the frontier in the order vertices were <em>discovered</em>, which only equals
            shortest-distance order when every edge costs the same. With differing weights, the greedy fix is to
            always pull the vertex with the smallest <code>dist</code> value seen so far out of the frontier next —
            a <strong>min-heap</strong> (<code>PriorityQueue</code>) ordered by distance does exactly that in{' '}
            <code>O(log V)</code> per operation. Once a vertex is popped with its true shortest distance
            (guaranteed because nothing cheaper remains in the heap that could still improve it), every edge out of
            it is relaxed, possibly pushing better candidates for its neighbours.
          </p>
          <div className="recurrence">{
`dist[] = all 1e9 ; dist[S] = 0
pq = min-heap of (distance, node), ordered by distance; push (0, S)

while pq not empty:
    (dis, node) = pq.poll()      -- the frontier's cheapest entry
    for each (adjNode, edgeWeight) of node:
        if dis + edgeWeight < dist[adjNode]:
            dist[adjNode] = dis + edgeWeight
            pq.add((dist[adjNode], adjNode))`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ No <code>vis</code> array, and stale heap entries are expected, not a bug
          </div>
          A vertex can be pushed onto the heap multiple times, at different distances, before its final one is
          popped — there is no &quot;mark visited on push&quot; step like BFS&apos;s, because at push time it is not
          yet known whether this is the vertex&apos;s best distance. The{' '}
          <code>dis + edgeWeight &lt; dist[adjNode]</code> check is what makes stale, later-popped entries
          harmless: by the time an outdated entry is reached, <code>dist[adjNode]</code> already holds something at
          least as good, so the comparison fails and nothing incorrect happens — it is simply wasted, bounded work.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    int distance;
    int node;
    Pair(int distance, int node) {
        this.distance = distance;
        this.node = node;
    }
}

class Solution {
    static int[] dijkstra(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj, int S) {
        // min-heap ordered by distance
        PriorityQueue<Pair> pq = new PriorityQueue<Pair>((x, y) -> x.distance - y.distance);

        int[] dist = new int[V];
        for (int i = 0; i < V; i++) dist[i] = (int) 1e9;

        dist[S] = 0;
        pq.add(new Pair(0, S));

        while (pq.size() != 0) {
            int dis = pq.peek().distance;
            int node = pq.peek().node;
            pq.remove();

            for (int i = 0; i < adj.get(node).size(); i++) {
                int edgeWeight = adj.get(node).get(i).get(1);
                int adjNode = adj.get(node).get(i).get(0);

                if (dis + edgeWeight < dist[adjNode]) {
                    dist[adjNode] = dis + edgeWeight;
                    pq.add(new Pair(dist[adjNode], adjNode));
                }
            }
        }
        return dist;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Why non-negative weights are a hard requirement</div>
        Dijkstra&apos;s greediness assumes that once a vertex is popped with the cheapest distance currently known,
        nothing discovered later can ever beat it — which relies on every further edge only <em>adding</em>{' '}
        non-negative cost. A negative edge could let a path found later undercut an already-finalised distance,
        silently producing a wrong answer with no error thrown. Graphs with negative edges need Bellman–Ford
        instead, which this topic covers further on.
      </div>

      <Cx>
        <CxBox label="Time" value="O(E log V)">
          Each edge can trigger one heap push/pop, each <code>O(log V)</code>.
        </CxBox>
        <CxBox label="Space" value="O(V + E)">
          Adjacency list, <code>dist</code> array, and the priority queue.
        </CxBox>
      </Cx>

      {/* 32 */}
      <div id="g32" data-topic-boundary="true" />
      <p className="part-subtitle">
        Dijkstra&apos;s algorithm, plus a <code>parent</code> array so the actual route can be rebuilt, not just its
        length.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Reconstruct via parent pointers</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A weighted undirected graph with <code>n</code> nodes numbered <code>1</code> to{' '}
          <code>n</code>. Return the shortest path from node <code>1</code> to node <code>n</code> as an explicit
          list of nodes, or <code>[-1]</code> if none exists.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Record who last improved each node&apos;s distance</div>
          Every time <code>dist[adjNode]</code> is improved during relaxation, also set{' '}
          <code>parent[adjNode] = node</code> — &quot;the best way to reach <code>adjNode</code> currently goes
          through <code>node</code>&quot;. Once Dijkstra&apos;s finishes, walking <code>parent</code> backwards from
          the destination to the source retraces the actual shortest path, one hop at a time.
        </div>
        <div className="recurrence">{
`parent[i] = i for all i        -- self-pointer sentinel, same idiom as the LIS parent array

on every successful relaxation:
    dist[adjNode] = dis + edgeWeight
    parent[adjNode] = node

after Dijkstra's: node = n; while parent[node] != node: path.add(node); node = parent[node];
path.add(1); reverse(path)`
        }</div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    int first, second;
    Pair(int first, int second) {
        this.first = first;
        this.second = second;
    }
}

class Solution {
    public static List<Integer> shortestPath(int n, int m, int[][] edges) {
        ArrayList<ArrayList<Pair>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int i = 0; i < m; i++) {
            adj.get(edges[i][0]).add(new Pair(edges[i][1], edges[i][2]));
            adj.get(edges[i][1]).add(new Pair(edges[i][0], edges[i][2]));
        }

        PriorityQueue<Pair> pq = new PriorityQueue<Pair>((x, y) -> x.first - y.first);
        int[] dist = new int[n + 1];
        int[] parent = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dist[i] = (int) 1e9;
            parent[i] = i;                    // self-pointer: "I am my own origin"
        }

        dist[1] = 0;
        pq.add(new Pair(0, 1));

        while (pq.size() != 0) {
            Pair it = pq.peek();
            int node = it.second;
            int dis = it.first;
            pq.remove();

            for (Pair iter : adj.get(node)) {
                int adjNode = iter.first;
                int edW = iter.second;
                if (dis + edW < dist[adjNode]) {
                    dist[adjNode] = dis + edW;
                    pq.add(new Pair(dist[adjNode], adjNode));
                    parent[adjNode] = node;    // remember who last improved this node
                }
            }
        }

        List<Integer> path = new ArrayList<>();
        if (dist[n] == (int) 1e9) {
            path.add(-1);
            return path;
        }

        int node = n;
        while (parent[node] != node) {
            path.add(node);
            node = parent[node];
        }
        path.add(1);
        Collections.reverse(path);
        return path;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(E log V)">
          Identical to plain Dijkstra&apos;s — the path walk adds only <code>O(path length)</code>.
        </CxBox>
        <CxBox label="Space" value="O(V + E)">
          Adjacency list, <code>dist</code>/<code>parent</code> arrays, priority queue.
        </CxBox>
      </Cx>

      {/* 33 */}
      <div id="g33" data-topic-boundary="true" />
      <p className="part-subtitle">
        Unit-weight shortest path transplanted onto a grid — plain BFS is enough, because every move costs exactly
        one step.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1091 (variant)</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">BFS, not Dijkstra&apos;s</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A binary grid where <code>1</code> is walkable and <code>0</code> is a wall. Find
          the shortest number of steps from <code>source</code> to <code>destination</code>, moving 4-directionally
          through walkable cells.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Resist the urge to reach for Dijkstra&apos;s — every move costs 1
          </div>
          It is tempting to treat this as &quot;shortest path on a graph&quot; and default to a priority queue,
          since that is the newest and most powerful tool just introduced. But every edge here has identical weight{' '}
          <code>1</code>, which is precisely the condition under which plain BFS already computes shortest distances
          — a <code>PriorityQueue</code> would still give the right answer, just at needless <code>O(log n)</code>{' '}
          overhead per step instead of <code>O(1)</code>. Matching the tool to what the weights actually require is
          the real skill this problem is testing.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Tuple {
    int distance, row, col;
    Tuple(int distance, int row, int col) {
        this.row = row;
        this.distance = distance;
        this.col = col;
    }
}

class Solution {
    int shortestPath(int[][] grid, int[] source, int[] destination) {
        if (source[0] == destination[0] && source[1] == destination[1]) return 0;

        Queue<Tuple> q = new LinkedList<>();
        int n = grid.length;
        int m = grid[0].length;
        int[][] dist = new int[n][m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                dist[i][j] = (int) 1e9;
            }
        }

        dist[source[0]][source[1]] = 0;
        q.add(new Tuple(0, source[0], source[1]));

        int[] dr = {-1, 0, +1, 0};
        int[] dc = {0, 1, 0, -1};

        while (!q.isEmpty()) {
            Tuple it = q.peek();
            q.remove();
            int dis = it.distance;
            int r = it.row;
            int c = it.col;

            for (int i = 0; i < 4; i++) {
                int newr = r + dr[i];
                int newc = c + dc[i];

                if (newr >= 0 && newr < n && newc >= 0 && newc < m
                    && grid[newr][newc] == 1 && dis + 1 < dist[newr][newc]) {
                    dist[newr][newc] = 1 + dis;
                    if (newr == destination[0] && newc == destination[1]) {
                        return dist[newr][newc];
                    }
                    q.add(new Tuple(1 + dis, newr, newc));
                }
            }
        }
        return -1;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n·m)">Plain BFS over the grid.</CxBox>
        <CxBox label="Space" value="O(n·m)">
          <code>dist</code> grid plus the queue.
        </CxBox>
      </Cx>

      {/* 34 */}
      <div id="g34" data-topic-boundary="true" />
      <p className="part-subtitle">
        Where Dijkstra&apos;s genuinely earns its place on a grid: the &quot;weight&quot; of a path is not a sum of
        steps but the <strong>worst single step</strong> along it.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1631</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Minimax path, via a min-heap</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A grid of heights. The <strong>effort</strong> of a path is the maximum absolute
          difference in height between two <em>consecutive</em> cells on that path. Find a path from the top-left to
          the bottom-right that minimises this effort.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Dijkstra&apos;s works on any &quot;combine-and-compare&quot; cost, not only sums
          </div>
          <p>
            Ordinary Dijkstra&apos;s accumulates distance by <strong>adding</strong> edge weights and always prefers
            the smaller total. Here, extending a path by one step combines costs with <code>Math.max</code> instead
            of <code>+</code> — the new effort is <code>max(oldEffort, heightDifference)</code> — but the
            algorithm&apos;s structural guarantee (always expand the frontier&apos;s currently-best candidate next,
            via a min-heap) still holds, because nothing about Dijkstra&apos;s correctness actually depends on the
            combinator being addition. Replace the one line and the rest of the machinery — heap, relaxation guard,
            early exit at the destination — is identical.
          </p>
          <div className="recurrence">{
`dist[i][j] = effort of the best known path to (i, j) ; all 1e9, dist[0][0] = 0
pq = min-heap of (effort, row, col); push (0, 0, 0)

while pq not empty:
    (diff, row, col) = pq.poll()
    if (row, col) == destination: return diff

    for each of the 4 neighbours (newr, newc):
        newEffort = max( |heights[row][col] - heights[newr][newc]| , diff )
        if newEffort < dist[newr][newc]:
            dist[newr][newc] = newEffort
            pq.add((newEffort, newr, newc))`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Tuple {
    int distance, row, col;
    Tuple(int distance, int row, int col) {
        this.row = row;
        this.distance = distance;
        this.col = col;
    }
}

class Solution {
    int MinimumEffort(int[][] heights) {
        PriorityQueue<Tuple> pq = new PriorityQueue<Tuple>((x, y) -> x.distance - y.distance);

        int n = heights.length;
        int m = heights[0].length;
        int[][] dist = new int[n][m];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                dist[i][j] = (int) 1e9;
            }
        }

        dist[0][0] = 0;
        pq.add(new Tuple(0, 0, 0));
        int[] dr = {-1, 0, +1, 0};
        int[] dc = {0, 1, 0, -1};

        while (pq.size() != 0) {
            Tuple it = pq.peek();
            pq.remove();
            int diff = it.distance;
            int row = it.row;
            int col = it.col;

            if (row == n - 1 && col == m - 1) return diff;   // early exit at the destination

            for (int i = 0; i < 4; i++) {
                int newr = row + dr[i];
                int newc = col + dc[i];
                if (newr >= 0 && newc >= 0 && newr < n && newc < m) {
                    int newEffort = Math.max(
                        Math.abs(heights[row][col] - heights[newr][newc]), diff);

                    if (newEffort < dist[newr][newc]) {
                        dist[newr][newc] = newEffort;
                        pq.add(new Tuple(newEffort, newr, newc));
                    }
                }
            }
        }
        return 0;
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 The general lesson this part builds to</div>
        Dijkstra&apos;s algorithm is not really &quot;the sum-of-weights shortest path algorithm&quot; — it is
        &quot;the greedy, priority-queue-driven way to find the best path under any cost rule where extending a path
        monotonically combines costs and smaller is always better&quot;. Sum-of-weights and worst-single-step are
        two instances of that same shape; recognising the shape is worth more than memorising the sum-of-weights
        version alone.
      </div>

      <Cx>
        <CxBox label="Time" value="O(n·m·log(n·m))">
          Each of the <code>n·m</code> cells can be pushed and popped.
        </CxBox>
        <CxBox label="Space" value="O(n·m)">
          <code>dist</code> grid plus the priority queue.
        </CxBox>
      </Cx>

      {/* 35 */}
      <div id="g35" data-topic-boundary="true" />
      <p className="part-subtitle">
        Dijkstra&apos;s algorithm, with the state widened to include how many stops have been used. The next six
        problems relax Dijkstra&apos;s assumptions one at a time — a bounded number of stops, a need to count routes
        rather than just measure one, weights that can go negative, and distances between <em>every</em> pair.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 787</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Stops in the state</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A weighted directed graph of flights. Find the cheapest price from{' '}
          <code>src</code> to <code>dst</code> using <strong>at most <code>K</code> stops</strong> (i.e. at most{' '}
          <code>K+1</code> edges).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why plain Dijkstra&apos;s can settle the wrong answer</div>
          <p>
            Ordinary Dijkstra&apos;s greedily finalises whichever vertex currently has the smallest distance,
            trusting that nothing cheaper can appear later. That trust assumed nothing else mattered besides cost —
            but here, a path that is <em>more expensive</em> can still be the only one that respects the stop limit,
            while the &quot;cheaper&quot; path Dijkstra&apos;s would normally finalise first might already have used
            up too many stops. The fix is to put <strong>stops used</strong> into the queue entry itself and{' '}
            <strong>never discard a candidate purely for having a worse distance</strong> — only discard it once it
            has exceeded the stop budget.
          </p>
          <div className="recurrence">{
`queue holds (stopsSoFar, node, costSoFar), ordered by STOPS, not cost
push (0, src, 0)

while queue not empty:
    (stops, node, cost) = poll()
    if stops > K: continue                      -- over budget, abandon this branch
    for each (adjNode, weight) edge of node:
        if cost + weight < dist[adjNode] :
            dist[adjNode] = cost + weight
            push (stops + 1, adjNode, cost + weight)

answer = (dist[dst] still 1e9) ? -1 : dist[dst]`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ The queue is ordered by stops, and that is deliberate</div>
          This looks like Dijkstra&apos;s but is actually closer to a BFS that happens to also track cost: using a
          plain FIFO queue (not a priority queue) and processing strictly in order of increasing stop count is what
          guarantees every path is explored before it is prematurely written off. A <code>PriorityQueue</code>{' '}
          ordered by cost would finalise the globally cheapest vertex first exactly as plain Dijkstra&apos;s does —
          and that vertex might have gotten there using more stops than are available, silently pruning the only
          valid answer. The relaxation check (<code>cost + wt &lt; dist[adjNode]</code>) still prevents unbounded
          blow-up, since a strictly worse cost at the same or a later stop count is never re-explored.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    int first, second;
    Pair(int first, int second) {
        this.first = first;
        this.second = second;
    }
}

class Tuple {
    int first, second, third;
    Tuple(int first, int second, int third) {
        this.first = first;
        this.second = second;
        this.third = third;
    }
}

class Solution {
    public int CheapestFlight(int n, int[][] flights, int src, int dst, int K) {
        ArrayList<ArrayList<Pair>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int m = flights.length;
        for (int i = 0; i < m; i++) {
            adj.get(flights[i][0]).add(new Pair(flights[i][1], flights[i][2]));
        }

        // {stops, node, dist} -- a plain QUEUE, processed in order of stops
        Queue<Tuple> q = new LinkedList<>();
        q.add(new Tuple(0, src, 0));

        int[] dist = new int[n];
        for (int i = 0; i < n; i++) dist[i] = (int) 1e9;
        dist[src] = 0;

        while (!q.isEmpty()) {
            Tuple it = q.peek();
            q.remove();
            int stops = it.first;
            int node = it.second;
            int cost = it.third;

            if (stops > K) continue;              // over budget: abandon this branch

            for (Pair iter : adj.get(node)) {
                int adjNode = iter.first;
                int edW = iter.second;

                if (cost + edW < dist[adjNode] && stops <= K) {
                    dist[adjNode] = cost + edW;
                    q.add(new Tuple(stops + 1, adjNode, cost + edW));
                }
            }
        }

        if (dist[dst] == (int) 1e9) return -1;
        return dist[dst];
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(N·E)">
          In the worst case every edge is relaxed once per stop level, up to <code>K+1</code> levels.
        </CxBox>
        <CxBox label="Space" value="O(N + E)">
          Adjacency list, <code>dist</code> array, queue.
        </CxBox>
      </Cx>

      {/* 36 */}
      <div id="g36" data-topic-boundary="true" />
      <p className="part-subtitle">
        Unit-weight shortest path again — the twist is that the graph&apos;s vertices are not given, they are every
        integer from <code>0</code> to <code>99999</code>, and its edges are defined by an operation rather than
        listed.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 2059</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Implicit graph, 100000 nodes</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Starting from integer <code>start</code>, each step multiplies the current value
          by one element of <code>arr[]</code> and takes the result modulo <code>100000</code>. Find the minimum
          number of steps to reach <code>end</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Recognise the hidden unweighted graph</div>
          <p>
            Every value in <code>[0, 99999]</code> is a vertex. From value <code>v</code>, applying any of the{' '}
            <code>M</code> multipliers produces an edge to exactly one other vertex, and every such edge costs{' '}
            <code>1</code> step. That is unit-weight shortest path on a graph with a fixed <code>10^5</code>{' '}
            vertices and up to <code>10^5 × M</code> edges — generated on the fly rather than stored — so plain BFS
            applies directly, with <code>dist[]</code> doubling as the visited array.
          </p>
          <div className="recurrence">{
`dist[] = size 100000, all -1 ; dist[start % 100000] = 0
q = [start % 100000]

while q not empty:
    node = q.poll()
    if node == end: return dist[node]
    for each multiplier m in arr:
        nextNode = (node * m) % 100000
        if dist[nextNode] == -1:
            dist[nextNode] = dist[node] + 1
            q.add(nextNode)

return -1`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Take the modulo immediately, before anything else</div>
          <code>node * m</code> can reach roughly <code>10^5 × 10^5 = 10^10</code>, which overflows a 32-bit{' '}
          <code>int</code> before the modulo ever has a chance to shrink it back down. Compute the product in a{' '}
          <code>long</code>, apply <code>% 100000</code>, and only then narrow back to <code>int</code> for storage
          and comparison.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    int first, second;        // {value, stepsSoFar}
    Pair(int first, int second) {
        this.first = first;
        this.second = second;
    }
}

class Solution {
    public int minimumMultiplications(int[] arr, int start, int end) {
        final int MOD = 100000;
        int[] dist = new int[MOD];
        Arrays.fill(dist, -1);                 // doubles as the visited array

        Queue<Pair> q = new LinkedList<>();
        dist[start % MOD] = 0;
        q.add(new Pair(start % MOD, 0));

        while (!q.isEmpty()) {
            int node = q.peek().first;
            int steps = q.peek().second;
            q.remove();

            if (node == end) return steps;

            for (int m : arr) {
                long next = ((long) node * (long) m) % MOD;   // avoid int overflow
                int nextNode = (int) next;

                if (dist[nextNode] == -1) {
                    dist[nextNode] = steps + 1;
                    q.add(new Pair(nextNode, steps + 1));
                }
            }
        }
        return -1;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(100000 × M)">
          <code>M</code> = size of <code>arr</code>; each of the fixed 100000 vertices expands <code>M</code> edges
          once.
        </CxBox>
        <CxBox label="Space" value="O(100000)">
          The <code>dist</code> array and the queue, both bounded by the fixed vertex count.
        </CxBox>
      </Cx>

      {/* 37 */}
      <div id="g37" data-topic-boundary="true" />
      <p className="part-subtitle">
        Dijkstra&apos;s algorithm, carrying a second array that counts <strong>how many</strong> shortest paths reach
        each vertex, not just how long the shortest one is.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1976</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Count, don&apos;t just measure</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A weighted undirected graph of road travel times between <code>n</code>{' '}
          intersections. Count the number of distinct <strong>shortest</strong> paths from <code>0</code> to{' '}
          <code>n-1</code>, modulo <code>10^9 + 7</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Two outcomes for every relaxation, not one</div>
          <p>
            Run Dijkstra&apos;s exactly as before, but alongside <code>dist[]</code> keep a <code>ways[]</code>{' '}
            array, and treat every relaxation attempt as one of two cases:
          </p>
          <ul>
            <li>
              <strong>A strictly shorter path is found</strong> (<code>dis + edW &lt; dist[adjNode]</code>): this
              path makes every previous way to reach <code>adjNode</code> obsolete. Overwrite{' '}
              <code>dist[adjNode]</code> and <strong>reset</strong> <code>ways[adjNode] = ways[node]</code> —
              inherit only from this route.
            </li>
            <li>
              <strong>An equally short path is found</strong> (<code>dis + edW == dist[adjNode]</code>): this is an{' '}
              <em>additional</em> shortest path, not a replacement. <strong>Add</strong> <code>ways[node]</code>{' '}
              onto <code>ways[adjNode]</code> instead of overwriting it.
            </li>
          </ul>
          <p>
            This is the exact same inherit-vs-accumulate split used for counting the Number of Longest Increasing
            Subsequences in the Dynamic Programming notes — a strictly better discovery resets the count, an equally
            good one adds to it.
          </p>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ <code>ways[0] = 1</code>, not <code>0</code>
          </div>
          The source has exactly one way to reach itself: the empty path. Seeding <code>ways[0] = 0</code> would
          make every count downstream come out zero, since every other count is built by summing contributions that
          ultimately trace back to the source.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    int first, second;          // {distance, node}
    Pair(int first, int second) {
        this.first = first;
        this.second = second;
    }
}

class Solution {
    static int countPaths(int n, List<List<Integer>> roads) {
        ArrayList<ArrayList<Pair>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        int m = roads.size();
        for (int i = 0; i < m; i++) {
            adj.get(roads.get(i).get(0))
               .add(new Pair(roads.get(i).get(1), roads.get(i).get(2)));
            adj.get(roads.get(i).get(1))
               .add(new Pair(roads.get(i).get(0), roads.get(i).get(2)));
        }

        PriorityQueue<Pair> pq = new PriorityQueue<Pair>((x, y) -> x.first - y.first);

        int[] dist = new int[n];
        int[] ways = new int[n];
        for (int i = 0; i < n; i++) dist[i] = (int) 1e9;

        dist[0] = 0;
        ways[0] = 1;                            // ONE way to reach the source: the empty path
        pq.add(new Pair(0, 0));
        int mod = (int) (1e9 + 7);

        while (pq.size() != 0) {
            int dis = pq.peek().first;
            int node = pq.peek().second;
            pq.remove();

            for (Pair it : adj.get(node)) {
                int adjNode = it.first;
                int edW = it.second;

                // The FIRST time we reach adjNode with this short a distance.
                if (dis + edW < dist[adjNode]) {
                    dist[adjNode] = dis + edW;
                    pq.add(new Pair(dist[adjNode], adjNode));
                    ways[adjNode] = ways[node];          // RESET: inherit from this route only
                }
                // An EQUALLY short route -- an additional shortest path, not a better one.
                else if (dis + edW == dist[adjNode]) {
                    ways[adjNode] = (ways[adjNode] + ways[node]) % mod;
                }
            }
        }
        return ways[n - 1] % mod;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(E log V)">
          Identical bound to plain Dijkstra&apos;s — the counting adds only <code>O(1)</code> per relaxation.
        </CxBox>
        <CxBox label="Space" value="O(V + E)">
          Adjacency list, <code>dist</code>/<code>ways</code> arrays, priority queue.
        </CxBox>
      </Cx>

      {/* 38 */}
      <div id="g38" data-topic-boundary="true" />
      <p className="part-subtitle">
        Shortest paths when edges can be <strong>negative</strong> — the one setting where Dijkstra&apos;s greedy
        assumption breaks, and a slower but more honest algorithm has to take over.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Relax every edge, V-1 times</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A directed, weighted graph whose edges may be negative. Find the shortest
          distance from a source to every vertex, and detect whether a <strong>negative-weight cycle</strong> exists
          (which would make &quot;shortest path&quot; undefined — going around the cycle keeps decreasing the cost
          forever).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Why Dijkstra&apos;s breaks, and what Bellman–Ford does instead</div>
          <p>
            Dijkstra&apos;s finalises a vertex&apos;s distance the moment it is popped, trusting that nothing relaxed
            later could ever improve it — which relies on every further edge only adding non-negative cost. A
            negative edge discovered later can undercut an already-&quot;final&quot; distance, and Dijkstra&apos;s
            has no mechanism to revisit it.
          </p>
          <p>
            Bellman–Ford gives up on being greedy and instead relaxes <strong>every</strong> edge,{' '}
            <strong>every</strong> vertex&apos;s worth of times. The reasoning: the shortest path between any two
            vertices in a graph with <code>V</code> vertices uses at most <code>V - 1</code> edges (more than that
            would have to repeat a vertex, which is never beneficial without a negative cycle). So relaxing every
            edge <code>V - 1</code> times is guaranteed to have propagated the true shortest distance to every
            reachable vertex, however many rounds of &quot;discover a slightly better route&quot; that took.
          </p>
          <div className="recurrence">{
`dist[] = all 1e8 ; dist[S] = 0

repeat V - 1 times:
    for each edge (u, v, wt):
        if dist[u] != 1e8 and dist[u] + wt < dist[v]:
            dist[v] = dist[u] + wt

// one more round: if anything STILL improves, a negative cycle exists
for each edge (u, v, wt):
    if dist[u] != 1e8 and dist[u] + wt < dist[v]:
        return [-1]            -- negative cycle detected`
          }</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">
            📌 The extra relaxation round is the cycle detector, for free
          </div>
          If every shortest path uses at most <code>V-1</code> edges, then after exactly <code>V-1</code> full
          rounds of relaxation, nothing legitimate should be able to improve any further. Running one extra,{' '}
          <code>V</code>-th round and finding that some edge <em>still</em> relaxes is proof that a path of length{' '}
          <code>V</code> or more was needed — which is only possible if a negative cycle exists somewhere upstream
          of that edge, since no acyclic shortest path can need that many edges.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    static int[] bellman_ford(int V, ArrayList<ArrayList<Integer>> edges, int S) {
        int[] dist = new int[V];
        for (int i = 0; i < V; i++) dist[i] = (int) 1e8;
        dist[S] = 0;

        // V - 1 rounds: enough for the shortest path to any vertex to fully propagate.
        for (int i = 0; i < V - 1; i++) {
            for (ArrayList<Integer> it : edges) {
                int u = it.get(0);
                int v = it.get(1);
                int wt = it.get(2);
                if (dist[u] != (int) 1e8 && dist[u] + wt < dist[v]) {
                    dist[v] = dist[u] + wt;
                }
            }
        }

        // Nth relaxation: if anything STILL improves, a negative cycle exists.
        for (ArrayList<Integer> it : edges) {
            int u = it.get(0);
            int v = it.get(1);
            int wt = it.get(2);
            if (dist[u] != (int) 1e8 && dist[u] + wt < dist[v]) {
                int[] temp = new int[1];
                temp[0] = -1;
                return temp;                   // sentinel: negative cycle present
            }
        }
        return dist;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ Bellman–Ford works on edges directly — it does not need an adjacency list
        </div>
        Notice the algorithm never calls <code>adj.get(node)</code> — it loops over the flat{' '}
        <strong>edge list</strong> itself, <code>V-1</code> times. This is what makes it correct even when a
        relaxation in round <code>i</code> depends on a vertex that was only updated earlier in that very same
        round; processing by edge rather than by &quot;current frontier&quot; is precisely why no greedy ordering
        assumption is required, at the cost of touching every edge <code>V-1</code> times instead of each edge once.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V·E)">
          <code>V-1</code> (plus one) rounds, each scanning every edge.
        </CxBox>
        <CxBox label="Space" value="O(V)">
          The <code>dist</code> array.
        </CxBox>
      </Cx>

      {/* 39 */}
      <div id="g39" data-topic-boundary="true" />
      <p className="part-subtitle">
        Every algorithm so far answers &quot;shortest path from <strong>one</strong> source&quot;. Floyd–Warshall
        answers shortest path between <strong>every</strong> pair at once — by trying every vertex as a potential
        stepping-stone.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">All-pairs, via the matrix itself</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a graph as an adjacency matrix (<code>-1</code> meaning no direct edge),
          compute the shortest distance between <strong>every</strong> pair of vertices, in place.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 &quot;Is routing through k ever better?&quot; asked for every k, in order
          </div>
          <p>
            For every vertex <code>k</code>, and every pair <code>(i, j)</code>, check whether going{' '}
            <code>i → k → j</code> beats the current best known <code>i → j</code>. Doing this for{' '}
            <code>k = 0</code>, then <code>k = 1</code>, and so on up through every vertex means that by the time{' '}
            <code>k</code> reaches its final value, <code>matrix[i][j]</code> has already considered every possible
            intermediate stepping-stone — including <em>chains</em> of them, because by the time vertex{' '}
            <code>k</code> is tried as a stepping-stone, the matrix entries <code>matrix[i][k]</code> and{' '}
            <code>matrix[k][j]</code> it reads may themselves already route through earlier vertices{' '}
            <code>0 .. k-1</code>.
          </p>
          <div className="recurrence">{
`for k in 0 .. n-1:            -- try every vertex as an intermediate stop
    for i in 0 .. n-1:
        for j in 0 .. n-1:
            matrix[i][j] = min( matrix[i][j], matrix[i][k] + matrix[k][j] )

after all n rounds: matrix[i][j] = shortest distance from i to j, for every pair`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ <code>k</code> must be the OUTERMOST loop
          </div>
          Unlike the inner two loops, whose order makes no difference, <code>k</code> has to be outermost.{' '}
          <code>matrix[i][k]</code> and <code>matrix[k][j]</code> are only guaranteed to already reflect every
          earlier intermediate vertex if <strong>all</strong> pairs have finished considering stepping-stone{' '}
          <code>k-1</code> before any pair starts considering stepping-stone <code>k</code>. Interleaving the{' '}
          <code>k</code> loop with the others breaks that guarantee and can leave some pairs under-relaxed.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    public void shortest_distance(int[][] matrix) {
        int n = matrix.length;

        // Translate the problem's "-1 = no edge" into "a very large distance",
        // and the diagonal (a vertex to itself) into 0.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == -1) {
                    matrix[i][j] = (int) 1e9;
                }
                if (i == j) matrix[i][j] = 0;
            }
        }

        for (int k = 0; k < n; k++) {                 // k MUST be outermost
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    matrix[i][j] = Math.min(matrix[i][j],
                                             matrix[i][k] + matrix[k][j]);
                }
            }
        }

        // Translate "still effectively infinite" back into the problem's -1.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == (int) 1e9) {
                    matrix[i][j] = -1;
                }
            }
        }
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 It can detect a negative cycle too</div>
        After the triple loop finishes, if any <code>matrix[i][i]</code> — the distance from a vertex back to{' '}
        <strong>itself</strong> — has become negative, a negative-weight cycle passes through <code>i</code>. Under
        normal circumstances <code>matrix[i][i]</code> can only ever be <code>0</code> or better (there is no reason
        to leave and come back at a cost); a negative diagonal entry is only possible if looping around some cycle
        through <code>i</code> keeps reducing the cost, exactly the condition Bellman–Ford&apos;s extra round was
        built to catch.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V³)">Three nested loops over all vertices.</CxBox>
        <CxBox label="Space" value="O(1) extra">
          Updates the matrix in place — no auxiliary structure needed.
        </CxBox>
      </Cx>

      {/* 40 */}
      <div id="g40" data-topic-boundary="true" />
      <p className="part-subtitle">
        Floyd–Warshall as a subroutine: once every pairwise distance is known, the rest is a straightforward scan.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1334</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">All-pairs, then count and compare</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A weighted graph. For a given <code>distanceThreshold</code>, find the city that
          has the <strong>fewest</strong> other cities reachable within that threshold distance; break ties by
          preferring the city with the larger number.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 &quot;Fewest reachable within a threshold, across every city&quot; needs all-pairs distances
          </div>
          This question asks about <strong>every</strong> city&apos;s reachability, not one source&apos;s — which is
          exactly the signal to reach for Floyd–Warshall rather than running Dijkstra&apos;s once per city (which
          would also work, at <code>O(V · E log V)</code>, but the dense <code>O(V³)</code> all-pairs computation is
          simpler to reason about and just as fast on the modest vertex counts this problem allows). Once{' '}
          <code>dist[i][j]</code> is known for every pair, count, for each city, how many others are within the
          threshold, and keep the smallest count — preferring the higher-numbered city on a tie by comparing with{' '}
          <code>≤</code> rather than <code>&lt;</code> as the loop walks upward.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    int findCity(int n, int m, int[][] edges, int distanceThreshold) {
        int[][] dist = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                dist[i][j] = Integer.MAX_VALUE;
            }
        }
        for (int i = 0; i < m; i++) {
            int u = edges[i][0];
            int v = edges[i][1];
            int wt = edges[i][2];
            dist[u][v] = wt;
            dist[v][u] = wt;
        }
        for (int i = 0; i < n; i++) dist[i][i] = 0;

        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (dist[i][k] == Integer.MAX_VALUE || dist[k][j] == Integer.MAX_VALUE) {
                        continue;                      // avoid overflow adding two MAX_VALUEs
                    }
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }

        int cntCity = n;
        int cityNo = -1;
        for (int city = 0; city < n; city++) {
            int cnt = 0;
            for (int adjCity = 0; adjCity < n; adjCity++) {
                if (dist[city][adjCity] <= distanceThreshold) {
                    cnt++;
                }
            }
            // <= so that among EQUAL counts the higher-numbered city wins, since city increases
            if (cnt <= cntCity) {
                cntCity = cnt;
                cityNo = city;
            }
        }
        return cityNo;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ Guard against adding two <code>MAX_VALUE</code>s together
        </div>
        Unlike the <code>(int) 1e9</code> sentinel used elsewhere in this part, this version guards the relaxation
        with an explicit <code>if</code> rather than relying on the sum staying safely large. Adding two{' '}
        <code>Integer.MAX_VALUE</code>s overflows into a negative number, and that corrupted value would then look
        like an extremely short — and completely wrong — distance. Skip the relaxation entirely whenever either leg
        is still unreachable, rather than trusting the arithmetic to stay safe.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V³)">
          Floyd–Warshall dominates; the final scan is <code>O(V²)</code>.
        </CxBox>
        <CxBox label="Space" value="O(V²)">The all-pairs distance matrix.</CxBox>
      </Cx>

      {/* 41 */}
      <div id="g41" data-topic-boundary="true" />
      <p className="part-subtitle">
        A new question: not the cheapest way to get from A to B, but the cheapest way to connect{' '}
        <strong>everything</strong>. A spanning tree touches every vertex using exactly <code>V-1</code> edges and
        no cycle; among every way to do that, find the one with the least total weight — by growing it one cheapest
        edge at a time.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill tag-approach">Prim&apos;s Algorithm</span>
        <span className="pill">Dijkstra&apos;s skeleton, different goal</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A connected, undirected, weighted graph. Find the sum of edge weights in a
          Minimum Spanning Tree (MST) — a subset of <code>V-1</code> edges connecting every vertex at minimum total
          cost.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Grow one tree outward, always by its cheapest available edge</div>
          <p>
            Start the tree at any vertex. At every step, look at every edge leaving the{' '}
            <strong>current tree</strong> to a vertex <strong>not yet in it</strong>, and add the cheapest one. This
            is almost the exact machinery of Dijkstra&apos;s — a min-heap popping the globally cheapest frontier
            candidate — except the heap orders by <strong>edge weight</strong> directly rather than by accumulated
            distance from a source, because an MST does not care how far a vertex is from any particular root, only
            that every edge used to reach it was the cheapest available at the time.
          </p>
          <div className="recurrence">{
`pq = min-heap of (weight, node), ordered by weight; push (0, anyStartVertex)
vis = all false

sum = 0
while pq not empty:
    (wt, node) = pq.poll()
    if vis[node]: continue             -- already safely in the tree, this entry is stale
    vis[node] = true
    sum += wt                          -- the edge that brought US here, now locked in

    for each (adjNode, edgeWeight) of node:
        if not vis[adjNode]:
            pq.add((edgeWeight, adjNode))

answer = sum`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ <code>vis</code> is checked on POP, and that is what makes stale heap entries harmless
          </div>
          A vertex not yet in the tree can be offered by several different tree edges before any of them is actually
          popped — the heap may hold three or four entries all pointing at the same unvisited vertex, each from a
          different neighbour already in the tree. Checking <code>vis[node]</code> immediately after popping, and
          skipping if it is already true, is what guarantees only the <strong>cheapest</strong> of those offers ever
          gets added to <code>sum</code>; the rest are quietly discarded rather than double-counted.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Pair {
    int distance;
    int node;
    Pair(int distance, int node) {
        this.distance = distance;
        this.node = node;
    }
}

class Solution {
    // Returns the sum of edge weights of the Minimum Spanning Tree.
    static int spanningTree(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj) {
        PriorityQueue<Pair> pq =
            new PriorityQueue<Pair>((x, y) -> x.distance - y.distance);

        int[] vis = new int[V];
        // {wt, node}
        pq.add(new Pair(0, 0));
        int sum = 0;

        while (pq.size() > 0) {
            int wt = pq.peek().distance;
            int node = pq.peek().node;
            pq.remove();

            if (vis[node] == 1) continue;        // stale: already settled via a cheaper offer
            vis[node] = 1;                       // add it to the MST
            sum += wt;

            for (int i = 0; i < adj.get(node).size(); i++) {
                int edW = adj.get(node).get(i).get(1);
                int adjNode = adj.get(node).get(i).get(0);
                if (vis[adjNode] == 0) {
                    pq.add(new Pair(edW, adjNode));
                }
            }
        }
        return sum;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(E log E)">
          Every edge can be pushed once, each heap operation <code>O(log E)</code>.
        </CxBox>
        <CxBox label="Space" value="O(V + E)">
          Adjacency list, <code>vis</code> array, priority queue.
        </CxBox>
      </Cx>

      {/* 42 */}
      <div id="g42" data-topic-boundary="true" />
      <p className="part-subtitle">
        A new data structure, built for one question asked over and over: &quot;are these two elements in the same
        group?&quot; — answered in close to <code>O(1)</code>, even as groups keep merging.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill tag-approach">Union by Rank</span>
        <span className="pill">Path compression + rank</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Support two operations on a collection of elements, each starting in its own
          singleton group: <code>union(u, v)</code> (merge <code>u</code>&apos;s group and <code>v</code>&apos;s
          group), and <code>findUPar(node)</code> (return an identifier for <code>node</code>&apos;s current group,
          so two calls return the same thing exactly when the two nodes are in the same group).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Every element points toward a representative; find follows the pointers</div>
          <p>
            Each node starts as its own <strong>parent</strong> — its own group&apos;s representative.{' '}
            <code>findUPar</code> follows parent pointers until it reaches a node that is its own parent (the
            representative), and <strong>path compression</strong> rewires every node visited along the way to point{' '}
            <strong>directly</strong> at that representative before returning — so the next call from any of those
            nodes is a single hop, not a walk.
          </p>
          <p>
            <code>unionByRank</code> additionally tracks each representative&apos;s approximate tree{' '}
            <strong>height</strong> (its <code>rank</code>) and, when merging two groups, always attaches the{' '}
            <strong>shorter</strong> tree under the <strong>taller</strong> one&apos;s root. Attaching
            short-under-tall keeps the combined tree&apos;s height from growing unless the two trees were equally
            tall, which is what keeps <code>findUPar</code> fast even without path compression&apos;s help on a
            given call.
          </p>
          <div className="recurrence">{
`findUPar(node):
    if node == parent[node]: return node          -- found the representative
    ulp = findUPar(parent[node])                  -- recurse up the chain
    parent[node] = ulp                            -- PATH COMPRESSION: point directly at it
    return ulp

unionByRank(u, v):
    pu = findUPar(u) ; pv = findUPar(v)
    if pu == pv: return                            -- already in the same group
    if rank[pu] < rank[pv]: parent[pu] = pv
    else if rank[pv] < rank[pu]: parent[pv] = pu
    else: parent[pv] = pu ; rank[pu]++             -- equal height: pick one, it grows by 1`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class DisjointSet {
    List<Integer> rank = new ArrayList<>();
    List<Integer> parent = new ArrayList<>();

    public DisjointSet(int n) {
        for (int i = 0; i <= n; i++) {
            rank.add(0);
            parent.add(i);                      // everyone starts as their own representative
        }
    }

    public int findUPar(int node) {
        if (node == parent.get(node)) {
            return node;
        }
        int ulp = findUPar(parent.get(node));
        parent.set(node, ulp);                  // path compression: shortcut the chain
        return parent.get(node);
    }

    public void unionByRank(int u, int v) {
        int ulp_u = findUPar(u);
        int ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;              // already the same group

        if (rank.get(ulp_u) < rank.get(ulp_v)) {
            parent.set(ulp_u, ulp_v);            // shorter tree attaches under the taller one
        } else if (rank.get(ulp_v) < rank.get(ulp_u)) {
            parent.set(ulp_v, ulp_u);
        } else {
            parent.set(ulp_v, ulp_u);
            int rankU = rank.get(ulp_u);
            rank.set(ulp_u, rankU + 1);          // equal height: the merged tree grew by one
        }
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Rank is a height estimate, not an exact one</div>
        Because path compression keeps shortening chains behind the scenes, a representative&apos;s true subtree
        height can end up smaller than its recorded <code>rank</code> — <code>rank</code> only ever increases, it is
        never recalculated downward. That is fine: <code>rank</code> only needs to be a reasonable enough proxy for
        height to keep the attach-shorter-under-taller rule effective, and together with path compression it
        provably keeps every operation close to <code>O(1)</code> amortised.
      </div>

      <Cx>
        <CxBox label="Time" value="~O(1) amortised">
          Per <code>find</code>/<code>union</code> call, with both optimisations in place.
        </CxBox>
        <CxBox label="Space" value="O(n)">
          The <code>rank</code> and <code>parent</code> lists.
        </CxBox>
      </Cx>

      {/* 43 */}
      <div id="g43" data-topic-boundary="true" />
      <p className="part-subtitle">
        The same structure, with a more intuitive rule for which tree attaches under which: count of nodes instead
        of height.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill tag-approach">Union by Size</span>
        <span className="pill">Attach the smaller group</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> The same Disjoint Set Union, merging by the number of elements in each group
          rather than by an estimated tree height.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Attach fewer-nodes under more-nodes — and the total size is easy to track exactly
          </div>
          <code>unionBySize</code> keeps a <code>size[]</code> array, initialised to <code>1</code> for every
          singleton. When merging, the group with <strong>fewer</strong> elements attaches under the group with
          more, and the absorbing representative&apos;s size is updated to the <strong>sum</strong> of both — unlike{' '}
          <code>rank</code>, <code>size</code> stays exactly correct at every step, which makes it the natural
          choice whenever a problem later wants to ask &quot;how big is this group?&quot; (as Making a Large Island
          does).
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class DisjointSet {
    List<Integer> rank = new ArrayList<>();
    List<Integer> parent = new ArrayList<>();
    List<Integer> size = new ArrayList<>();

    public DisjointSet(int n) {
        for (int i = 0; i <= n; i++) {
            rank.add(0);
            parent.add(i);
            size.add(1);                         // every singleton starts with size 1
        }
    }

    public int findUPar(int node) {
        if (node == parent.get(node)) {
            return node;
        }
        int ulp = findUPar(parent.get(node));
        parent.set(node, ulp);                   // path compression
        return parent.get(node);
    }

    public void unionByRank(int u, int v) {
        int ulp_u = findUPar(u);
        int ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;

        if (rank.get(ulp_u) < rank.get(ulp_v)) {
            parent.set(ulp_u, ulp_v);
        } else if (rank.get(ulp_v) < rank.get(ulp_u)) {
            parent.set(ulp_v, ulp_u);
        } else {
            parent.set(ulp_v, ulp_u);
            int rankU = rank.get(ulp_u);
            rank.set(ulp_u, rankU + 1);
        }
    }

    public void unionBySize(int u, int v) {
        int ulp_u = findUPar(u);
        int ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;              // already the same group

        if (size.get(ulp_u) < size.get(ulp_v)) {
            parent.set(ulp_u, ulp_v);             // fewer nodes attaches under more nodes
            size.set(ulp_v, size.get(ulp_v) + size.get(ulp_u));
        } else {
            parent.set(ulp_v, ulp_u);
            size.set(ulp_u, size.get(ulp_u) + size.get(ulp_v));
        }
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 One class, both union strategies, picked per problem</div>
        From here on, every problem in this part uses <strong>this</strong> combined <code>DisjointSet</code> class —
        with <code>rank</code>, <code>parent</code> <strong>and</strong> <code>size</code> all kept — and simply
        calls whichever of <code>unionByRank</code> or <code>unionBySize</code> suits the problem. Most of what
        follows uses size, because several of these problems need to know a group&apos;s member count directly. The
        code blocks below show only the problem-specific class and assume this one is in scope, rather than
        reprinting thirty identical lines each time.
      </div>

      <Cx>
        <CxBox label="Time" value="~O(1) amortised">Identical guarantee to union by rank.</CxBox>
        <CxBox label="Space" value="O(n)">Three parallel lists now, instead of two.</CxBox>
      </Cx>

      {/* 44 */}
      <div id="g44" data-topic-boundary="true" />
      <p className="part-subtitle">
        A second route to the same MST as Prim&apos;s — sort every edge once, then greedily accept each one that
        does not create a cycle, using the Disjoint Set to make &quot;would this create a cycle?&quot; an{' '}
        <code>O(1)</code> question.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill tag-approach">Kruskal&apos;s Algorithm</span>
        <span className="pill">Sort edges, then Union-Find</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Find the total weight of a Minimum Spanning Tree.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Cheapest edges first; skip anything that would close a loop</div>
          <p>
            Sort every edge by weight, ascending. Walk the sorted list and, for each edge <code>(u, v, wt)</code>,
            ask the Disjoint Set whether <code>u</code> and <code>v</code> are already in the same group. If they
            are, adding this edge would create a cycle — skip it. If they are not, this edge safely connects two
            previously separate groups at the cheapest possible cost for doing so — take it, union the two groups,
            and add its weight to the running total.
          </p>
          <div className="recurrence">{
`edges = every edge, sorted ascending by weight
ds = new DisjointSet(V)

mstWt = 0
for (u, v, wt) in edges:
    if ds.findUPar(u) != ds.findUPar(v):      -- different groups: safe to connect
        mstWt += wt
        ds.unionBySize(u, v)

answer = mstWt`
          }</div>
        </div>
        <div className="callout callout-note">
          <div className="callout-title">📌 Prim&apos;s or Kruskal&apos;s — does it matter which?</div>
          Both always produce an MST of the same total weight (though possibly a different <em>set</em> of edges,
          when several MSTs tie). Kruskal&apos;s is usually the more natural choice when edges are already available
          as a flat list and sorting them once is convenient; Prim&apos;s is more natural when the graph is given as
          an adjacency list and growing outward from a single vertex fits the existing traversal machinery. Knowing
          both is less about picking the &quot;correct&quot; one and more about recognising that the Disjoint Set
          Union, once learned here, is reusable far beyond Kruskal&apos;s — as the rest of this part demonstrates.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`// Uses the combined DisjointSet class from "Disjoint Set -- Union by Size".

class Edge implements Comparable<Edge> {
    int src, dest, weight;
    Edge(int _src, int _dest, int _wt) {
        this.src = _src;
        this.dest = _dest;
        this.weight = _wt;
    }

    // Comparator used for sorting edges by their weight.
    public int compareTo(Edge compareEdge) {
        return this.weight - compareEdge.weight;
    }
}

class Solution {
    // Returns the sum of weights of the edges of the Minimum Spanning Tree.
    static int spanningTree(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj) {
        List<Edge> edges = new ArrayList<Edge>();
        // O(V + E): flatten the adjacency list into a plain edge list
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < adj.get(i).size(); j++) {
                int adjNode = adj.get(i).get(j).get(0);
                int wt = adj.get(i).get(j).get(1);
                edges.add(new Edge(i, adjNode, wt));
            }
        }

        DisjointSet ds = new DisjointSet(V);
        // E log E
        Collections.sort(edges);
        int mstWt = 0;

        for (int i = 0; i < edges.size(); i++) {
            int wt = edges.get(i).weight;
            int u = edges.get(i).src;
            int v = edges.get(i).dest;

            if (ds.findUPar(u) != ds.findUPar(v)) {
                mstWt += wt;
                ds.unionBySize(u, v);
            }
        }
        return mstWt;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">⚠️ Every undirected edge is collected twice — harmlessly</div>
        Building <code>edges</code> from an adjacency list where each undirected edge was stored in{' '}
        <strong>both</strong> endpoints&apos; lists means <code>(u, v, wt)</code> and <code>(v, u, wt)</code> both
        end up in the list. This does not corrupt the result: the first copy encountered (after sorting) unions the
        two groups, and the second copy is then skipped by the <code>findUPar(u) != findUPar(v)</code> check, since
        they are already in the same group by that point.
      </div>

      <Cx>
        <CxBox label="Time" value="O(E log E)">
          Dominated by sorting the edges; the Union-Find pass is close to <code>O(E)</code>.
        </CxBox>
        <CxBox label="Space" value="O(V + E)">
          The edge list plus the Disjoint Set&apos;s three arrays.
        </CxBox>
      </Cx>

      {/* 45 */}
      <div id="g45" data-topic-boundary="true" />
      <p className="part-subtitle">
        The same problem as Number of Provinces, solved by a completely different mechanism — a good chance to see
        the Disjoint Set Union do what BFS/DFS already could.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 547</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill tag-approach">Disjoint Set</span>
        <span className="pill">Union every edge, count the roots</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Count the connected components given as an adjacency matrix of city connections.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Every edge is a union; every root left standing is a component</div>
          <p>
            Instead of flooding each component with a traversal, simply <code>union</code> the two endpoints of{' '}
            <strong>every</strong> edge in the graph. Once every edge has been processed, each remaining connected
            component has exactly one node whose <code>parent</code> still points to itself — its representative.
            Counting those self-pointing nodes counts the provinces, with no traversal at all.
          </p>
          <div className="recurrence">{
`ds = new DisjointSet(V)
for each i, j with adj[i][j] == 1:
    ds.unionBySize(i, j)

cnt = 0
for i in 0 .. V-1:
    if ds.parent[i] == i:     -- i is still its own representative: a distinct component
        cnt++

answer = cnt`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`// Uses the combined DisjointSet class from "Disjoint Set -- Union by Size".

class Solution {
    static int numProvinces(ArrayList<ArrayList<Integer>> adj, int V) {
        DisjointSet ds = new DisjointSet(V);

        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (adj.get(i).get(j) == 1) {
                    ds.unionBySize(i, j);        // i and j are directly connected
                }
            }
        }

        int cnt = 0;
        for (int i = 0; i < V; i++) {
            if (ds.parent.get(i) == i) cnt++;    // still its own representative
        }
        return cnt;
    }
}`
      }</Code>

      <div className="callout callout-tip">
        <div className="callout-title">💡 Why bother, when DFS already solved this?</div>
        This version is not faster for a one-off count — both are close to linear. It earns its place because the{' '}
        <em>next</em> few problems are naturally phrased as &quot;keep merging groups as edges arrive&quot;, which
        Disjoint Set Union supports incrementally far more gracefully than re-running a full traversal after every
        new edge would.
      </div>

      <Cx>
        <CxBox label="Time" value="O(V²)">Scanning the adjacency matrix dominates.</CxBox>
        <CxBox label="Space" value="O(V)">The Disjoint Set&apos;s arrays.</CxBox>
      </Cx>

      {/* 46 */}
      <div id="g46" data-topic-boundary="true" />
      <p className="part-subtitle">
        A direct, practical payoff of counting components via Disjoint Set: knowing exactly how many{' '}
        <strong>redundant</strong> edges exist tells you exactly how many operations are needed.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1319</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-warn">Medium</span>
        <span className="pill">Redundant edges become the budget</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> <code>n</code> computers, each cable given as an edge. Removing a cable from
          somewhere and placing it between two currently-disconnected computers counts as one operation. Find the
          minimum number of operations to make the whole network connected, or <code>-1</code> if there are not
          enough cables to possibly succeed.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Connecting C components needs exactly C-1 extra edges — and extra edges are exactly what you have
            spare
          </div>
          <p>
            Union every given edge. Any edge whose two endpoints are <strong>already</strong> in the same group
            before the union is a <strong>redundant</strong> cable — it was not needed to connect anything, and it
            is exactly the kind of cable the problem lets you move. If there are <code>C</code> connected components
            once every edge is processed, exactly <code>C - 1</code> moved cables are needed to link them all into
            one. The only way this fails is if fewer redundant cables exist than that.
          </p>
          <div className="recurrence">{
`ds = new DisjointSet(n)
cntExtras = 0

for each edge (u, v):
    if ds.findUPar(u) == ds.findUPar(v):
        cntExtras++                      -- this cable was redundant: free to relocate
    else:
        ds.unionBySize(u, v)

cntComponents = number of i with ds.parent[i] == i
needed = cntComponents - 1

answer = (cntExtras >= needed) ? needed : -1`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`// Uses the combined DisjointSet class from "Disjoint Set -- Union by Size".

class Solution {
    public int Solve(int n, int[][] edge) {
        DisjointSet ds = new DisjointSet(n);
        int cntExtras = 0;
        int m = edge.length;

        for (int i = 0; i < m; i++) {
            int u = edge[i][0];
            int v = edge[i][1];
            if (ds.findUPar(u) == ds.findUPar(v)) {
                cntExtras++;                     // redundant cable: safe to relocate
            } else {
                ds.unionBySize(u, v);
            }
        }

        int cntC = 0;
        for (int i = 0; i < n; i++) {
            if (ds.parent.get(i) == i) cntC++;
        }

        int ans = cntC - 1;                      // operations needed to join cntC components
        if (cntExtras >= ans) return ans;
        return -1;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="~O(n + m)">One Union-Find pass over the edge list.</CxBox>
        <CxBox label="Space" value="O(n)">The Disjoint Set&apos;s arrays.</CxBox>
      </Cx>

      {/* 47 */}
      <div id="g47" data-topic-boundary="true" />
      <p className="part-subtitle">
        Grouping is the whole problem here — two accounts belong together exactly when they share any email,
        directly or transitively. That is Disjoint Set Union wearing an email-address costume.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 721</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Union on shared emails</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Each account is <code>[name, email1, email2, ...]</code>. Two accounts belong to
          the same person if they share at least one email. Merge all accounts belonging to the same person,
          returning each merged account as <code>[name, sortedEmail1, sortedEmail2, ...]</code>.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Union accounts by index, triggered by a shared email</div>
          <p>
            Index the accounts <code>0 .. n-1</code> and keep a <code>HashMap&lt;String, Integer&gt;</code> from an
            email to the <em>first</em> account index that owned it. Walk through every email of every account: the
            first time an email is seen, just record its owner; every <strong>later</strong> time the same email
            appears (under a different account), that account must belong to the same person — union the two account
            indices. After every account has been scanned, every email can be looked up by its node&apos;s
            representative account, and emails sharing a representative are collected together into one merged
            group.
          </p>
          <div className="recurrence">{
`mapMailNode: email -> first account index that owned it
ds = new DisjointSet(n)

for each account i, for each email in account i:
    if email not in mapMailNode: mapMailNode[email] = i
    else: ds.unionBySize(i, mapMailNode[email])     -- shared email -> same person

for each (email, originalOwner) in mapMailNode:
    node = ds.findUPar(originalOwner)
    mergedMail[node].add(email)

for each account index with a non-empty mergedMail:
    sort its emails, prepend the account's name, add to the answer`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Union against the FIRST owner, not against the current account index</div>
          Unioning <code>i</code> with <code>mapMailNode.get(mail)</code> — the index that <em>originally</em>{' '}
          claimed this email — rather than with some other account the loop happens to be visiting is what correctly
          chains together every account that ever shares an email, even across three or more accounts linked by a
          transitive chain of shared addresses. The union operation itself (through <code>findUPar</code>&apos;s
          path compression) is what collapses that chain down to one representative per actual person.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`// Uses the combined DisjointSet class from "Disjoint Set -- Union by Size".

class Solution {
    static List<List<String>> accountsMerge(List<List<String>> details) {
        int n = details.size();
        DisjointSet ds = new DisjointSet(n);
        HashMap<String, Integer> mapMailNode = new HashMap<>();

        for (int i = 0; i < n; i++) {
            for (int j = 1; j < details.get(i).size(); j++) {   // j = 1: skip the name
                String mail = details.get(i).get(j);
                if (mapMailNode.containsKey(mail) == false) {
                    mapMailNode.put(mail, i);
                } else {
                    ds.unionBySize(i, mapMailNode.get(mail));
                }
            }
        }

        ArrayList<String>[] mergedMail = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            mergedMail[i] = new ArrayList<String>();
        }

        for (Map.Entry<String, Integer> it : mapMailNode.entrySet()) {
            String mail = it.getKey();
            int node = ds.findUPar(it.getValue());
            mergedMail[node].add(mail);
        }

        List<List<String>> ans = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            if (mergedMail[i].size() == 0) continue;     // not a representative
            Collections.sort(mergedMail[i]);
            List<String> temp = new ArrayList<>();
            temp.add(details.get(i).get(0));             // the name
            for (String it : mergedMail[i]) {
                temp.add(it);
            }
            ans.add(temp);
        }
        return ans;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(N·K log(N·K))">
          <code>N</code> accounts, <code>K</code> average emails each; dominated by sorting each merged group.
        </CxBox>
        <CxBox label="Space" value="O(N·K)">
          The hashmap, the Disjoint Set, and the merged-mail arrays.
        </CxBox>
      </Cx>

      {/* 48 */}
      <div id="g48" data-topic-boundary="true" />
      <p className="part-subtitle">
        Number of Islands, run <strong>forward in time</strong>: land is added one cell at a time, and the island
        count is wanted after every addition.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 305</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Incremental connectivity</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> An initially all-water grid. A sequence of operators each turns one cell into
          land. After <em>each</em> operation, report the current number of islands.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Re-running BFS/DFS after every single addition would be far too slow</div>
          <p>
            A fresh flood-fill count after each of up to <code>10^4</code> operations would cost{' '}
            <code>O(nm)</code> every time. Disjoint Set Union instead lets each operation be handled incrementally:
            flatten every cell <code>(row, col)</code> into a single integer id <code>row × m + col</code>, so the
            whole grid becomes <code>n × m</code> elements of one Disjoint Set.
          </p>
          <p>
            Turning a cell into land is one new singleton group (<code>cnt++</code>), immediately followed by
            unioning it with every already-land 4-neighbour it touches — each successful union (two{' '}
            <em>different</em> groups merging) reduces the running island count by one (<code>cnt--</code>). The
            running <code>cnt</code> after each operation is exactly that moment&apos;s answer, with no traversal
            needed at all.
          </p>
          <div className="recurrence">{
`ds = new DisjointSet(n * m)
vis = grid of false, cnt = 0
ans = []

for each operator (row, col):
    if vis[row][col]: ans.add(cnt); continue     -- already land: nothing changes
    vis[row][col] = true
    cnt++                                        -- a brand new singleton island

    for each of the 4 neighbours (adjr, adjc):
        if in bounds and vis[adjr][adjc]:
            nodeNo = row * m + col
            adjNodeNo = adjr * m + adjc
            if ds.findUPar(nodeNo) != ds.findUPar(adjNodeNo):
                cnt--                            -- two islands just became one
                ds.unionBySize(nodeNo, adjNodeNo)

    ans.add(cnt)`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Check the groups differ BEFORE unioning, and decrement only on success</div>
          The order matters: check <code>findUPar(nodeNo) != findUPar(adjNodeNo)</code> <strong>before</strong>{' '}
          calling <code>unionBySize</code>, because after the union they are trivially the same group and the check
          would always read false. And decrement <code>cnt</code> exactly once per <strong>successful</strong>{' '}
          merge — two neighbours that are already in the same island must never decrement twice for what is really
          one existing connection.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`// Uses the combined DisjointSet class from "Disjoint Set -- Union by Size".

class Solution {
    private boolean isValid(int adjr, int adjc, int n, int m) {
        return adjr >= 0 && adjr < n && adjc >= 0 && adjc < m;
    }

    public List<Integer> numOfIslands(int n, int m, int[][] operators) {
        DisjointSet ds = new DisjointSet(n * m);
        int[][] vis = new int[n][m];
        int cnt = 0;
        List<Integer> ans = new ArrayList<>();
        int len = operators.length;

        for (int i = 0; i < len; i++) {
            int row = operators[i][0];
            int col = operators[i][1];

            if (vis[row][col] == 1) {
                ans.add(cnt);
                continue;
            }
            vis[row][col] = 1;
            cnt++;                               // a new singleton island

            int[] dr = {-1, 0, 1, 0};
            int[] dc = {0, 1, 0, -1};

            for (int ind = 0; ind < 4; ind++) {
                int adjr = row + dr[ind];
                int adjc = col + dc[ind];

                if (isValid(adjr, adjc, n, m)) {
                    if (vis[adjr][adjc] == 1) {
                        int nodeNo = row * m + col;
                        int adjNodeNo = adjr * m + adjc;
                        if (ds.findUPar(nodeNo) != ds.findUPar(adjNodeNo)) {
                            cnt--;               // two islands just merged into one
                            ds.unionBySize(nodeNo, adjNodeNo);
                        }
                    }
                }
            }
            ans.add(cnt);
        }
        return ans;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="~O(Q)">
          <code>Q</code> = number of operators; each does <code>O(1)</code> amortised Union-Find work.
        </CxBox>
        <CxBox label="Space" value="O(n·m)">
          The Disjoint Set sized for every grid cell, plus the <code>vis</code> grid.
        </CxBox>
      </Cx>

      {/* 49 */}
      <div id="g49" data-topic-boundary="true" />
      <p className="part-subtitle">
        Union by size pays off directly: once every existing island&apos;s true size is tracked by the Disjoint Set
        itself, answering &quot;what if I flip one water cell?&quot; needs no new flood fill at all.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 827</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Try every 0, sum the DSU sizes around it</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> A binary grid. You may change <strong>at most one</strong> <code>0</code> into a{' '}
          <code>1</code>. Return the size of the largest island achievable.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Build the DSU once over the existing land; then simulate each flip in O(1)</div>
          <p>
            <strong>Step 1</strong> — exactly like Number of Islands II: union every pair of adjacent land cells, so
            each existing island&apos;s representative&apos;s <code>size</code> is already its true cell count.
          </p>
          <p>
            <strong>Step 2</strong> — for every <code>0</code> cell, look at its up-to-4 land neighbours, collect
            the <strong>distinct</strong> island representatives among them into a <code>HashSet</code> (a single
            island can touch the same <code>0</code> from two different sides, and must only be counted once), sum
            their sizes, add <code>1</code> for the flipped cell itself, and keep the running maximum.
          </p>
          <div className="recurrence">{
`step 1: union every adjacent pair of land cells   -- DSU sizes now = true island sizes

step 2: for every cell (row, col) with grid[row][col] == 0:
    components = distinct findUPar(neighbour) over all 4 land neighbours
    sizeTotal = sum of ds.size[r] for r in components
    mx = max(mx, sizeTotal + 1)                 -- +1 for the flipped cell itself

edge case: if the grid is ALL land, no 0 exists to flip -- answer is the whole grid's size`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ The <code>HashSet</code> is what stops double-counting a single island
          </div>
          A <code>0</code> cell can be adjacent to the <strong>same</strong> island through two different neighbour
          directions (for instance, both its left and right neighbours end up belonging to the same connected island
          after path compression). Summing <code>size</code> over the four neighbours directly, without first
          collapsing to distinct representatives, would count that one island&apos;s size twice and over-report the
          achievable total.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`// Uses the combined DisjointSet class from "Disjoint Set -- Union by Size".

class Solution {
    private boolean isValid(int newr, int newc, int n) {
        return newr >= 0 && newr < n && newc >= 0 && newc < n;
    }

    public int MaxConnection(int[][] grid) {
        int n = grid.length;
        DisjointSet ds = new DisjointSet(n * n);

        // step 1: union every pair of adjacent LAND cells -- sizes become real island sizes
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                if (grid[row][col] == 0) continue;
                int[] dr = {-1, 0, 1, 0};
                int[] dc = {0, 1, 0, -1};

                for (int ind = 0; ind < 4; ind++) {
                    int newr = row + dr[ind];
                    int newc = col + dc[ind];
                    if (isValid(newr, newc, n) && grid[newr][newc] == 1) {
                        int nodeNo = row * n + col;
                        int adjNodeNo = newr * n + newc;
                        ds.unionBySize(nodeNo, adjNodeNo);
                    }
                }
            }
        }

        // step 2: try flipping every 0, summing the DISTINCT islands it would join
        int mx = 0;
        for (int row = 0; row < n; row++) {
            for (int col = 0; col < n; col++) {
                if (grid[row][col] == 1) continue;
                int[] dr = {-1, 0, 1, 0};
                int[] dc = {0, 1, 0, -1};
                HashSet<Integer> components = new HashSet<>();

                for (int ind = 0; ind < 4; ind++) {
                    int newr = row + dr[ind];
                    int newc = col + dc[ind];
                    if (isValid(newr, newc, n)) {
                        if (grid[newr][newc] == 1) {
                            components.add(ds.findUPar(newr * n + newc));
                        }
                    }
                }

                int sizeTotal = 0;
                for (Integer parents : components) {
                    sizeTotal += ds.size.get(parents);
                }
                mx = Math.max(mx, sizeTotal + 1);      // +1 for the cell being flipped
            }
        }

        // If the grid is entirely land, the loop above never ran -- fall back to the
        // size of the single island covering the whole grid.
        for (int cellNo = 0; cellNo < n * n; cellNo++) {
            mx = Math.max(mx, ds.size.get(ds.findUPar(cellNo)));
        }
        return mx;
    }
}`
      }</Code>

      <Cx>
        <CxBox label="Time" value="O(n²)">
          Two full passes over the grid, each <code>O(1)</code> amortised DSU work per cell.
        </CxBox>
        <CxBox label="Space" value="O(n²)">The Disjoint Set sized for every grid cell.</CxBox>
      </Cx>

      {/* 50 */}
      <div id="g50" data-topic-boundary="true" />
      <p className="part-subtitle">
        A graph that is never built from explicit coordinates — rows and columns themselves become the vertices, and
        every stone is an edge connecting its row to its column.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 947</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Union row-index with column-index</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Stones sit at integer grid coordinates. A stone can be removed if some{' '}
          <strong>other</strong> stone shares its row or its column. Find the maximum number of stones that can be
          removed.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Within one connected component, every stone but one is removable</div>
          <p>
            Think of every row index and every column index as its own node (to keep them from colliding, offset
            column indices by <code>maxRow + 1</code> before using them). Each stone unions its row&apos;s node with
            its column&apos;s node. Two stones end up in the same connected component exactly when a chain of shared
            rows and columns links them — and within such a component, stones can be removed one at a time (each
            still shares a row or column with some remaining stone) until only <strong>one</strong> is left. So the
            answer is <code>totalStones - numberOfConnectedComponents</code>.
          </p>
          <div className="recurrence">{
`ds = new DisjointSet(maxRow + maxCol + 1)
stoneNodes = map tracking every row-node and column-node actually used

for each stone (row, col):
    nodeRow = row
    nodeCol = col + maxRow + 1          -- offset so rows and columns never collide
    ds.unionBySize(nodeRow, nodeCol)
    mark nodeRow and nodeCol as used

cnt = number of USED nodes that are still their own representative
       (== number of connected components among the stones)

answer = n - cnt`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">⚠️ Count representatives only among nodes a stone actually touched</div>
          The Disjoint Set is allocated over the full range <code>maxRow + maxCol + 1</code>, but most row and
          column indices in that range are never used by any stone. Counting every untouched index as its own
          &quot;component&quot; would wildly overcount; the <code>stoneNodes</code> map is what restricts the final
          count to exactly the row- and column-nodes some stone actually unioned.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`// Uses the combined DisjointSet class from "Disjoint Set -- Union by Size".

class Solution {
    int maxRemove(int[][] stones, int n) {
        int maxRow = 0;
        int maxCol = 0;
        for (int i = 0; i < n; i++) {
            maxRow = Math.max(maxRow, stones[i][0]);
            maxCol = Math.max(maxCol, stones[i][1]);
        }

        DisjointSet ds = new DisjointSet(maxRow + maxCol + 1);
        HashMap<Integer, Integer> stoneNodes = new HashMap<>();

        for (int i = 0; i < n; i++) {
            int nodeRow = stones[i][0];
            int nodeCol = stones[i][1] + maxRow + 1;   // offset: rows and columns never collide
            ds.unionBySize(nodeRow, nodeCol);
            stoneNodes.put(nodeRow, 1);
            stoneNodes.put(nodeCol, 1);
        }

        int cnt = 0;
        for (Map.Entry<Integer, Integer> it : stoneNodes.entrySet()) {
            if (ds.findUPar(it.getKey()) == it.getKey()) {
                cnt++;
            }
        }
        return n - cnt;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 Why the offset trick works, and where else it reappears</div>
        Using a single number to mean two different things (here, &quot;row 3&quot; and &quot;column 3&quot; would
        otherwise be the same integer) is only safe once one of the two ranges is shifted clear of the other. The
        same offsetting idea — two conceptually different index spaces sharing one flat array by shifting one of
        them — is what Number of Islands II and Making a Large Island do when flattening a 2D grid to{' '}
        <code>row * m + col</code>; here it is one-dimensional instead of two.
      </div>

      <Cx>
        <CxBox label="Time" value="~O(n)">
          <code>n</code> stones, each one <code>O(1)</code> amortised union.
        </CxBox>
        <CxBox label="Space" value="O(maxRow + maxCol)">
          The Disjoint Set&apos;s arrays, plus the small map of touched nodes.
        </CxBox>
      </Cx>

      {/* 51 */}
      <div id="g51" data-topic-boundary="true" />
      <p className="part-subtitle">
        A closing trio built on discovery order rather than distance. In a directed graph, a{' '}
        <strong>strongly connected component</strong> is a maximal group where every vertex can reach every other —
        and back. Kosaraju&apos;s finds every one of them in two DFS passes and one reversal.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill tag-approach">Kosaraju&apos;s Algorithm</span>
        <span className="pill">Finish order + reversed graph</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> Given a directed graph, count its strongly connected components (SCCs).
        </p>
        <div className="callout callout-key">
          <div className="callout-title">🔑 Three steps, each doing exactly one job</div>
          <ol className="steps">
            <li>
              <strong>Order vertices by DFS finish time</strong> — the identical &quot;push on finish&quot; stack
              from Topological Sort. This has no meaningful &quot;topological order&quot; here, since the graph may
              have cycles, but the finishing-time ordering it produces is exactly what step 3 needs.
            </li>
            <li>
              <strong>Reverse every edge</strong> in the graph. Reversing cannot merge two different SCCs into one,
              nor split one SCC into two — mutual reachability is symmetric under reversal by definition, so the
              reversed graph has exactly the same SCCs as the original.
            </li>
            <li>
              <strong>
                DFS the reversed graph, visiting vertices in the finish-time order from step 1 (highest finish time
                first).
              </strong>{' '}
              Starting from the vertex that finished last guarantees that any DFS launched from it on the reversed
              graph cannot &quot;leak&quot; into a different SCC that finished earlier — because a leak would
              require an edge back to that earlier SCC in the reversed graph, which would mean an edge forward to it
              in the original, contradicting that the earlier SCC already finished (and was therefore fully
              explored) first. Every DFS launched in this step therefore explores exactly one SCC, and the count of
              separate launches is the SCC count.
            </li>
          </ol>
          <div className="recurrence">{
`step 1:  for every unvisited vertex: dfs(vertex), pushing onto st on FINISH
step 2:  adjT = adj with every edge reversed
step 3:  pop st; for every still-unvisited node popped: dfs3(node, adjT); scc++

answer = scc`
          }</div>
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private void dfs(int node, int[] vis, ArrayList<ArrayList<Integer>> adj,
                      Stack<Integer> st) {
        vis[node] = 1;
        for (int it : adj.get(node)) {
            if (vis[it] == 0) {
                dfs(it, vis, adj, st);
            }
        }
        st.push(node);                          // push on FINISH -- same idiom as Topo Sort
    }

    private void dfs3(int node, int[] vis, ArrayList<ArrayList<Integer>> adjT) {
        vis[node] = 1;
        for (int it : adjT.get(node)) {
            if (vis[it] == 0) {
                dfs3(it, vis, adjT);
            }
        }
    }

    // Number of strongly connected components in the graph.
    public int kosaraju(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] vis = new int[V];
        Stack<Integer> st = new Stack<Integer>();

        // STEP 1: order by finish time.
        for (int i = 0; i < V; i++) {
            if (vis[i] == 0) {
                dfs(i, vis, adj, st);
            }
        }

        // STEP 2: reverse every edge, and reset vis for the third pass.
        ArrayList<ArrayList<Integer>> adjT = new ArrayList<ArrayList<Integer>>();
        for (int i = 0; i < V; i++) {
            adjT.add(new ArrayList<Integer>());
        }
        for (int i = 0; i < V; i++) {
            vis[i] = 0;
            for (Integer it : adj.get(i)) {
                adjT.get(it).add(i);            // i -> it   becomes   it -> i
            }
        }

        // STEP 3: DFS the reversed graph, highest finish time first.
        int scc = 0;
        while (!st.isEmpty()) {
            int node = st.peek();
            st.pop();
            if (vis[node] == 0) {
                scc++;                          // a brand new SCC, launched from here
                dfs3(node, vis, adjT);
            }
        }
        return scc;
    }
}`
      }</Code>

      <div className="callout callout-warning">
        <div className="callout-title">
          ⚠️ <code>vis</code> is reset to all zero between step 1 and step 3
        </div>
        The first DFS pass needs its own complete visited tracking to establish finish order; the third pass needs to
        start from a completely fresh &quot;nothing visited&quot; state on the <strong>reversed</strong> graph.
        Reusing the same array without resetting it would make every vertex already appear visited and the third
        pass would never run at all — the reset loop folded into step 2 above is not optional cleanup, it is
        required for step 3 to do anything.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  graph:   0 -> 2 -> 1 -> 0        (a 3-cycle: 0,1,2 are mutually reachable)
                 2 -> 3
                 3 -> 4

  step 1 (finish order, pushed bottom to top): e.g. [4, 3, 1, 2, 0]
  step 2: reverse every edge -> 2->0, 0->1, 1->2, 3->2, 4->3

  step 3: pop 0 first (top of stack) -> dfs3(0) on REVERSED graph visits 0, 1, 2
             (0->1->2->0, all still unvisited the first time) -> scc = 1
          pop 2: already visited, skip
          pop 1: already visited, skip
          pop 3: unvisited -> dfs3(3) visits just {3} (3->2 is visited, goes nowhere new)
             -> scc = 2
          pop 4: unvisited -> dfs3(4) visits just {4} -> scc = 3

  answer = 3 SCCs:  {0,1,2},  {3},  {4}`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(V + E)">
          Two DFS passes plus one edge reversal, each linear.
        </CxBox>
        <CxBox label="Space" value="O(V + E)">
          The reversed adjacency list plus the stack and visited array.
        </CxBox>
      </Cx>

      {/* 52 */}
      <div id="g52" data-topic-boundary="true" />
      <p className="part-subtitle">
        An edge whose removal disconnects the graph. Finding every one of them in a single DFS, by tracking how
        early each vertex could be reached if that edge were not there.
      </p>
      <div className="meta-row">
        <span className="pill">LeetCode 1192</span>
        <span className="pill">Coding Ninjas</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill tag-approach">Tarjan&apos;s Algorithm</span>
        <span className="pill">Discovery time + low-link</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> An undirected, connected graph. Find every <strong>bridge</strong> — an edge
          whose removal would disconnect the graph.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 Two numbers per vertex: when it was found, and the earliest anything below it can reach back to
          </div>
          <p>
            DFS the graph, stamping every vertex with a <strong>discovery time</strong>, <code>tin[node]</code> — a
            simple counter, incremented and assigned at the moment each vertex is first visited. Alongside it, track{' '}
            <code>low[node]</code>: the <strong>earliest</strong> discovery time reachable from{' '}
            <code>node</code>&apos;s subtree, using at most <strong>one back-edge</strong> to an ancestor (an edge to
            an already-visited vertex that is not the immediate parent). <code>low[node]</code> starts equal to{' '}
            <code>tin[node]</code> and only ever gets smaller, pulled down by either a child&apos;s own{' '}
            <code>low</code> value or a direct back-edge.
          </p>
          <p>
            The edge from <code>node</code> down to a child <code>it</code> is a bridge exactly when{' '}
            <code>low[it] &gt; tin[node]</code> — meaning nothing in <code>it</code>&apos;s entire subtree has any
            way back up to <code>node</code> or higher <strong>except</strong> through that one edge. Remove it, and
            that whole subtree is cut off.
          </p>
          <div className="recurrence">{
`dfs(node, parent):
    tin[node] = low[node] = timer++
    for each neighbour it of node:
        if it == parent: continue                     -- not a back-edge, just the same edge
        if it unvisited:
            dfs(it, node)
            low[node] = min(low[node], low[it])         -- inherit the child's best escape route
            if low[it] > tin[node]:
                bridges.add((node, it))                 -- its subtree cannot escape any other way
        else:
            low[node] = min(low[node], tin[it])         -- a direct back-edge: pull low[node] down`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ Skip only the edge back to the PARENT, not every already-visited neighbour
          </div>
          In an undirected adjacency list, the edge to the vertex that <em>called</em> the current DFS always
          reappears as a neighbour — that reflection is not a real back-edge and must be ignored, which is exactly
          what the <code>if (it == parent) continue;</code> guard does. Any <strong>other</strong> already-visited
          neighbour, however, is a genuine back-edge to some ancestor and must still update <code>low[node]</code>;
          conflating the two (skipping every visited neighbour) would silently miss real cycles and misreport
          bridges that do not exist.
        </div>
        <div className="callout callout-note">
          <div className="callout-title">
            📌 The back-edge branch uses <code>tin[it]</code>, not <code>low[it]</code>
          </div>
          A back-edge only ever reaches as far back as the moment <code>it</code> was <em>discovered</em>, not
          wherever <code>it</code>&apos;s own subtree later found an escape route to — so the correct update is{' '}
          <code>low[node] = min(low[node], tin[it])</code>. Several write-ups use <code>low[it]</code> here and
          usually get away with it, but <code>tin[it]</code> is the precise definition and the one to memorise.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private int timer = 1;

    private void dfs(int node, int parent, int[] vis,
                      ArrayList<ArrayList<Integer>> adj, int[] tin, int[] low,
                      List<List<Integer>> bridges) {
        vis[node] = 1;
        tin[node] = low[node] = timer;
        timer++;

        for (int it : adj.get(node)) {
            if (it == parent) continue;         // the reflection of the edge we arrived on

            if (vis[it] == 0) {
                dfs(it, node, vis, adj, tin, low, bridges);
                low[node] = Math.min(low[node], low[it]);

                // node --- it  is a bridge: nothing below it reaches node or higher
                if (low[it] > tin[node]) {
                    bridges.add(Arrays.asList(it, node));
                }
            } else {
                low[node] = Math.min(low[node], tin[it]);   // a genuine back-edge
            }
        }
    }

    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
        ArrayList<ArrayList<Integer>> adj = new ArrayList<ArrayList<Integer>>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<Integer>());
        }
        for (List<Integer> it : connections) {
            int u = it.get(0);
            int v = it.get(1);
            adj.get(u).add(v);
            adj.get(v).add(u);
        }

        int[] vis = new int[n];
        int[] tin = new int[n];
        int[] low = new int[n];
        List<List<Integer>> bridges = new ArrayList<>();
        dfs(0, -1, vis, adj, tin, low, bridges);
        return bridges;
    }
}`
      }</Code>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  graph:  0 - 1 - 2 - 0        (a triangle: 0,1,2)
              1 - 3            (a bridge hanging off vertex 1)

  dfs(0, -1): tin[0]=low[0]=1
    -> 1: dfs(1, 0): tin[1]=low[1]=2
         -> 2: dfs(2, 1): tin[2]=low[2]=3
                -> 0: visited, not parent -> low[2]=min(3, tin[0]=1) = 1
              low[1] = min(2, low[2]=1) = 1
              low[2]=1 is NOT > tin[1]=2  -> edge 1-2 is NOT a bridge
         -> 3: dfs(3, 1): tin[3]=low[3]=4
              low[1] = min(1, low[3]=4) = 1
              low[3]=4 IS > tin[1]=2      -> edge 1-3 IS a bridge
    low[0] = min(1, low[1]=1) = 1

  answer: bridges = [[3, 1]]
  -- removing 1-3 disconnects vertex 3; the triangle stays connected either way`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(V + E)">A single DFS pass.</CxBox>
        <CxBox label="Space" value="O(V)">
          <code>tin</code>, <code>low</code>, <code>vis</code> arrays plus recursion depth.
        </CxBox>
      </Cx>

      {/* 53 */}
      <div id="g53" data-topic-boundary="true" />
      <p className="part-subtitle">
        Bridges found critical edges; this finds critical <strong>vertices</strong> — the same <code>tin</code>/
        <code>low</code> machinery, with one condition changed and one extra counter for the root.
      </p>
      <div className="meta-row">
        <span className="pill">Coding Ninjas</span>
        <span className="pill">GeeksforGeeks</span>
        <span className="pill pill-danger">Hard</span>
        <span className="pill">Child count at the root is the special case</span>
      </div>
      <div className="card">
        <p>
          <strong>Problem.</strong> An undirected graph. Find every <strong>articulation point</strong> — a vertex
          whose removal increases the number of connected components.
        </p>
        <div className="callout callout-key">
          <div className="callout-title">
            🔑 A non-root vertex is critical if some child&apos;s subtree has nowhere else to go but through it
          </div>
          <p>
            For a <strong>non-root</strong> vertex <code>node</code>, the test is{' '}
            <code>low[it] ≥ tin[node]</code> — notice this uses <code>≥</code>, not <code>&gt;</code> as bridges
            did. The difference matters: even if the child&apos;s subtree can reach <em>exactly back to</em>{' '}
            <code>node</code> itself (rather than strictly past it, to some ancestor), removing <code>node</code>{' '}
            still isolates that subtree, because <code>node</code> <em>was</em> the escape route. A bridge only
            cares whether that one specific edge is load-bearing; articulation only cares whether the vertex is.
          </p>
          <p>
            The <strong>root</strong> of the DFS tree needs a separate rule, because it has no parent to be
            &quot;cut off from&quot; — it is only critical if removing it would split its own{' '}
            <strong>children&apos;s subtrees apart from each other</strong>. That happens precisely when the root
            has <strong>more than one child</strong> in the DFS tree: two or more independent branches that only
            shared a path through the root.
          </p>
          <div className="recurrence">{
`dfs(node, parent):
    tin[node] = low[node] = timer++
    child = 0
    for each neighbour it of node:
        if it == parent: continue
        if it unvisited:
            dfs(it, node)
            low[node] = min(low[node], low[it])
            if low[it] >= tin[node] and parent != -1:     -- >=, and NOT the root
                mark[node] = 1
            child++
        else:
            low[node] = min(low[node], tin[it])

    if child > 1 and parent == -1:                        -- the ROOT's special rule
        mark[node] = 1

answer = every node with mark[node] == 1 ; [-1] if none`
          }</div>
        </div>
        <div className="callout callout-warning">
          <div className="callout-title">
            ⚠️ Why the root needs <code>child &gt; 1</code> instead of the <code>low ≥ tin</code> test
          </div>
          The <code>low[it] ≥ tin[node]</code> condition is meaningless for the root, because{' '}
          <code>tin[root] = 1</code> is the smallest discovery time in the whole traversal — nothing can have a
          smaller <code>low</code> value to compare against, so the test would either never fire or fire for the
          wrong reason depending on how it is written. Counting DFS-tree children directly sidesteps the issue
          entirely: more than one child literally means more than one independent branch hangs off the root with no
          other connection between them.
        </div>
      </div>

      <div className="subsection-header"><h3>Code Implementation</h3></div>
      <Code>{
`class Solution {
    private int timer = 1;

    private void dfs(int node, int parent, int[] vis, int[] tin, int[] low, int[] mark,
                      ArrayList<ArrayList<Integer>> adj) {
        vis[node] = 1;
        tin[node] = low[node] = timer;
        timer++;
        int child = 0;

        for (int it : adj.get(node)) {
            if (it == parent) continue;

            if (vis[it] == 0) {
                dfs(it, node, vis, tin, low, mark, adj);
                low[node] = Math.min(low[node], low[it]);

                if (low[it] >= tin[node] && parent != -1) {
                    mark[node] = 1;             // non-root: load-bearing for this subtree
                }
                child++;
            } else {
                low[node] = Math.min(low[node], tin[it]);
            }
        }

        if (child > 1 && parent == -1) {
            mark[node] = 1;                     // ROOT: more than one independent branch
        }
    }

    public ArrayList<Integer> articulationPoints(int n, ArrayList<ArrayList<Integer>> adj) {
        int[] vis = new int[n];
        int[] tin = new int[n];
        int[] low = new int[n];
        int[] mark = new int[n];

        for (int i = 0; i < n; i++) {
            if (vis[i] == 0) {
                dfs(i, -1, vis, tin, low, mark, adj);
            }
        }

        ArrayList<Integer> ans = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (mark[i] == 1) {
                ans.add(i);
            }
        }
        if (ans.size() == 0) {
            ans.add(-1);
        }
        return ans;
    }
}`
      }</Code>

      <div className="callout callout-note">
        <div className="callout-title">📌 The outer loop handles a disconnected graph, and each tree gets its own root</div>
        Looping over every unvisited vertex before calling <code>dfs</code> (with <code>parent = -1</code> each
        time) means a graph with several disconnected pieces correctly treats the first vertex visited in{' '}
        <strong>each</strong> piece as that piece&apos;s own root, subject to the child-count rule, rather than
        accidentally applying the non-root rule to a vertex that has no real parent at all.
      </div>

      <div className="subsection-header"><h3>Dry run</h3></div>
      <pre className="diagram">{
`  graph:  0 - 1 - 2 - 0        (triangle)
              1 - 3 - 4
                  3 - 5

  dfs(0,-1): tin=low=1
    -> dfs(1,0): tin=low=2
         -> dfs(2,1): tin=low=3
              -> 0 visited, not parent: low[2]=min(3,tin[0]=1)=1
            low[1]=min(2, low[2]=1)=1 ; low[2]=1 >= tin[1]=2? NO -> not marked via this child
         -> dfs(3,1): tin=low=4
              -> dfs(4,3): tin=low=5; low[3]=min(4,5)=4
              -> dfs(5,3): tin=low=6; low[3]=min(4,6)=4
            low[1]=min(1, low[3]=4)=1
            low[3]=4 >= tin[1]=2? YES, parent(1)!=-1 -> mark[1]=1
            ALSO inside dfs(3): low[4]=5 >= tin[3]=4 -> mark[3]=1
                                low[5]=6 >= tin[3]=4 -> mark[3]=1 (already marked)
    low[0] = min(1, low[1]=1) = 1
    child for node 0 = 1 (only went to vertex 1) ; parent==-1 but child is NOT >1
                                                 -> root not marked

  answer: articulation points = {1, 3}
  -- vertex 1 separates {0,2} from {3,4,5}; vertex 3 separates {4} and {5} from the rest`
      }</pre>

      <Cx>
        <CxBox label="Time" value="O(V + E)">A single DFS pass, run once per component.</CxBox>
        <CxBox label="Space" value="O(V)">
          <code>tin</code>, <code>low</code>, <code>vis</code>, <code>mark</code> arrays plus recursion depth.
        </CxBox>
      </Cx>

      {/* 54 */}
      <div id="g54" data-topic-boundary="true" />
      <p className="part-subtitle">
        The same question-to-pattern mapping that closed out the Dynamic Programming notes, done for graphs: what a
        problem&apos;s wording implies about the state, the traversal, and which of the fifty-three techniques above
        it wants. Section numbers below match the sidebar&apos;s numbering.
      </p>

      <div className="subsection-header"><h3>Recognising the pattern from the question</h3></div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>The question sounds like</th>
              <th>Pattern</th>
              <th>Section</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&quot;count the groups / provinces / islands&quot;</td>
              <td>Connected components — loop + BFS/DFS</td>
              <td>3, 6, 7</td>
            </tr>
            <tr>
              <td>&quot;spreads from every X at once&quot; (fire, rot, infection)</td>
              <td>Multi-source BFS</td>
              <td>9, 12</td>
            </tr>
            <tr>
              <td>&quot;touches the border&quot; / &quot;cannot escape the edge&quot;</td>
              <td>Flood from the boundary inward; keep what is unmarked</td>
              <td>13, 14</td>
            </tr>
            <tr>
              <td>&quot;same shape, regardless of position&quot;</td>
              <td>Canonicalise relative to a per-component origin</td>
              <td>15</td>
            </tr>
            <tr>
              <td>&quot;split into two groups with no edge inside either&quot;</td>
              <td>2-colouring (bipartite check)</td>
              <td>16, 17</td>
            </tr>
            <tr>
              <td>&quot;does it ever loop forever&quot; (undirected)</td>
              <td>Parent-tracking BFS/DFS</td>
              <td>10, 11</td>
            </tr>
            <tr>
              <td>&quot;does it ever loop forever&quot; (directed)</td>
              <td>
                <code>pathVis</code> DFS, or Kahn&apos;s vertex count
              </td>
              <td>18, 22</td>
            </tr>
            <tr>
              <td>&quot;order tasks given their dependencies&quot;</td>
              <td>Topological sort (DFS finish-time or Kahn&apos;s)</td>
              <td>20, 21</td>
            </tr>
            <tr>
              <td>&quot;can all tasks finish&quot; / &quot;return a valid order&quot;</td>
              <td>Topological sort on the dependency DAG</td>
              <td>23, 24</td>
            </tr>
            <tr>
              <td>&quot;never leads into a loop&quot;</td>
              <td>Safe states — DFS with a 3rd marker, or Kahn&apos;s on the reverse</td>
              <td>19, 25</td>
            </tr>
            <tr>
              <td>&quot;infer an ordering from partial comparisons&quot;</td>
              <td>Build edges from first differences, then topo sort</td>
              <td>26</td>
            </tr>
            <tr>
              <td>&quot;fewest edges / steps&quot; (all weights equal)</td>
              <td>Plain BFS</td>
              <td>28, 29, 33</td>
            </tr>
            <tr>
              <td>&quot;cheapest route&quot;, weights differ, DAG</td>
              <td>Topological order + relax once</td>
              <td>27</td>
            </tr>
            <tr>
              <td>&quot;cheapest route&quot;, weights differ, general graph</td>
              <td>Dijkstra&apos;s — min-heap, greedy settle</td>
              <td>31, 32</td>
            </tr>
            <tr>
              <td>&quot;minimise the worst single step&quot;, not the sum</td>
              <td>
                Dijkstra&apos;s with <code>max</code> as the combinator
              </td>
              <td>34</td>
            </tr>
            <tr>
              <td>&quot;transform one string into another, one edit at a time&quot;</td>
              <td>Implicit graph: BFS over generated one-edit neighbours</td>
              <td>29, 30</td>
            </tr>
            <tr>
              <td>&quot;cheapest route&quot;, weights differ, but capped at K stops/edges</td>
              <td>Dijkstra&apos;s shape with a FIFO queue ordered by stops, not cost</td>
              <td>35</td>
            </tr>
            <tr>
              <td>&quot;fewest operations&quot;, vertices generated by a rule, not listed</td>
              <td>Implicit unit-weight graph — plain BFS over generated neighbours</td>
              <td>36</td>
            </tr>
            <tr>
              <td>&quot;count the number of shortest paths&quot;</td>
              <td>
                Dijkstra&apos;s + a <code>ways[]</code> array, reset on improve / add on tie
              </td>
              <td>37</td>
            </tr>
            <tr>
              <td>&quot;weights can be negative&quot; / &quot;detect a negative cycle&quot;</td>
              <td>Bellman–Ford — relax every edge, V−1 times</td>
              <td>38</td>
            </tr>
            <tr>
              <td>&quot;shortest distance between every pair of vertices&quot;</td>
              <td>Floyd–Warshall — try every vertex as an intermediate stop</td>
              <td>39, 40</td>
            </tr>
            <tr>
              <td>&quot;cheapest way to connect everything&quot; (spanning tree)</td>
              <td>MST — Prim&apos;s (grow a tree) or Kruskal&apos;s (grow a forest)</td>
              <td>41, 44</td>
            </tr>
            <tr>
              <td>&quot;are these two elements in the same group?&quot;, asked many times</td>
              <td>Disjoint Set Union — path compression + union by rank/size</td>
              <td>42, 43</td>
            </tr>
            <tr>
              <td>&quot;groups merge as edges/relations arrive, incrementally&quot;</td>
              <td>Disjoint Set Union, unioned once per new relation</td>
              <td>45–50</td>
            </tr>
            <tr>
              <td>&quot;group by a shared attribute, transitively&quot; (email, row, column)</td>
              <td>Union the shared attribute&apos;s two owners; count components after</td>
              <td>47, 50</td>
            </tr>
            <tr>
              <td>&quot;mutually reachable&quot; / &quot;critical edge or vertex&quot;</td>
              <td>
                <code>tin</code>/<code>low</code> DFS — Kosaraju&apos;s, Tarjan&apos;s bridges/articulation
              </td>
              <td>51, 52, 53</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Complexity cheat sheet</h3></div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Time</th>
              <th>Space</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>BFS / DFS traversal</td><td>O(V + E)</td><td>O(V)</td></tr>
            <tr><td>Connected components</td><td>O(V + E)</td><td>O(V)</td></tr>
            <tr><td>Grid BFS/DFS (flood fill family)</td><td>O(n·m)</td><td>O(n·m)</td></tr>
            <tr><td>Cycle detection, undirected</td><td>O(V + E)</td><td>O(V)</td></tr>
            <tr><td>Cycle detection, directed (DFS)</td><td>O(V + E)</td><td>O(V)</td></tr>
            <tr><td>Topological sort (DFS or Kahn&apos;s)</td><td>O(V + E)</td><td>O(V)</td></tr>
            <tr><td>Bipartite check</td><td>O(V + E)</td><td>O(V)</td></tr>
            <tr><td>Alien Dictionary</td><td>O(N·L + K)</td><td>O(K)</td></tr>
            <tr><td>Word Ladder I</td><td>O(N·L·26)</td><td>O(N·L)</td></tr>
            <tr><td>Word Ladder II</td><td>O(N·L²·26)</td><td>O(N·L), can grow large</td></tr>
            <tr><td>Shortest path in a DAG</td><td>O(V + E)</td><td>O(V + E)</td></tr>
            <tr><td>Dijkstra&apos;s algorithm</td><td>O(E log V)</td><td>O(V + E)</td></tr>
            <tr><td>Path With Minimum Effort</td><td>O(n·m·log(n·m))</td><td>O(n·m)</td></tr>
            <tr><td>Cheapest Flights Within K Stops</td><td>O(N·E)</td><td>O(N + E)</td></tr>
            <tr><td>Bellman–Ford algorithm</td><td>O(V·E)</td><td>O(V)</td></tr>
            <tr><td>Floyd–Warshall algorithm</td><td>O(V³)</td><td>O(V²)</td></tr>
            <tr><td>MST — Prim&apos;s algorithm</td><td>O(E log E)</td><td>O(V + E)</td></tr>
            <tr><td>MST — Kruskal&apos;s algorithm</td><td>O(E log E)</td><td>O(V + E)</td></tr>
            <tr><td>Disjoint Set Union (find / union)</td><td>~O(1) amortised</td><td>O(n)</td></tr>
            <tr><td>Accounts Merge</td><td>O(N·K log(N·K))</td><td>O(N·K)</td></tr>
            <tr><td>Kosaraju&apos;s algorithm (SCC)</td><td>O(V + E)</td><td>O(V + E)</td></tr>
            <tr><td>Bridges / Articulation Points (Tarjan&apos;s)</td><td>O(V + E)</td><td>O(V)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="subsection-header"><h3>Common mistakes, collected</h3></div>
      <div className="card">
        <ol className="steps">
          <li>
            <strong>
              Forgetting the second <code>adj.get(v).add(u)</code> line, or adding it by mistake.
            </strong>{' '}
            This is the one line that distinguishes every undirected builder from its directed twin, and getting it
            backwards produces a graph that runs without error but answers a different question entirely.
          </li>
          <li>
            <strong>Marking a vertex visited at dequeue/arrival time instead of at enqueue/discovery time.</strong>{' '}
            Two neighbours can discover the same vertex before either is processed; mark on discovery or the same
            vertex gets queued more than once.
          </li>
          <li>
            <strong>Treating &quot;already visited&quot; as proof of a cycle in a directed graph.</strong> A DAG
            lets two different parents share a descendant with no cycle involved — only a second{' '}
            <code>pathVis</code> array, tracking the currently-open path, tells the two situations apart.
          </li>
          <li>
            <strong>
              Forgetting to clear <code>pathVis</code> on the way out of a DFS call.
            </strong>{' '}
            Without the reset, every node ever explored stays flagged as &quot;on the path&quot; forever, and the
            DAG case above gets misreported as cyclic.
          </li>
          <li>
            <strong>Pushing onto the topological-sort stack on arrival instead of on finish.</strong> The ordering
            guarantee depends entirely on a node being pushed only after every descendant has already finished.
          </li>
          <li>
            <strong>
              Reaching for Dijkstra&apos;s (or a priority queue) when every edge weight is <code>1</code>.
            </strong>{' '}
            Plain BFS already produces shortest distances for free in that case; a heap only adds{' '}
            <code>O(log n)</code> overhead with no benefit.
          </li>
          <li>
            <strong>
              Using <code>-1</code> as &quot;unreachable&quot; inside the relaxation itself.
            </strong>{' '}
            A sentinel that distances get <em>added to</em> must be a large, additions-safe value like{' '}
            <code>(int) 1e9</code>; convert it to <code>-1</code> only in a final pass over the finished{' '}
            <code>dist</code> array.
          </li>
          <li>
            <strong>Removing a word from the candidate set immediately in Word Ladder II.</strong> That blocks
            sibling paths at the same BFS level from using the same word, silently dropping valid shortest
            sequences; removal must be batched per level.
          </li>
          <li>
            <strong>Ordering the Cheapest-Flights-Within-K-Stops queue by cost instead of by stops.</strong> A
            priority queue would greedily finalise the globally cheapest vertex exactly as Dijkstra&apos;s does — and
            that vertex may have used more stops than the budget allows, pruning the only valid answer. A plain FIFO
            queue, processed in increasing stop order, is what this problem needs.
          </li>
          <li>
            <strong>
              Letting <code>k</code> be anything but the outermost loop in Floyd–Warshall.
            </strong>{' '}
            <code>matrix[i][k]</code> and <code>matrix[k][j]</code> are only guaranteed to reflect every earlier
            stepping-stone if every pair finishes considering stepping-stone <code>k-1</code> before any pair starts
            on <code>k</code>.
          </li>
          <li>
            <strong>
              Forgetting path compression, or forgetting to attach the smaller tree under the larger one, in a
              Disjoint Set.
            </strong>{' '}
            Either omission turns what should be a near-flat structure into a long chain, degrading every{' '}
            <code>find</code>/<code>union</code> call toward <code>O(n)</code> instead of amortised{' '}
            <code>O(1)</code>.
          </li>
          <li>
            <strong>
              Checking <code>low[it] &gt; tin[node]</code> for an articulation point instead of <code>≥</code>.
            </strong>{' '}
            Bridges use the strict inequality; a vertex is critical even when a child&apos;s subtree can reach back
            to exactly that vertex, which only the non-strict <code>≥</code> captures.
          </li>
          <li>
            <strong>Applying the non-root articulation rule to the DFS root, or vice versa.</strong> The root has no
            parent to be cut off from; it is only critical when it has more than one DFS-tree child. Conflating the
            two rules misreports the root in graphs where it should, or should not, be flagged.
          </li>
        </ol>
      </div>
    </>
  );
}
