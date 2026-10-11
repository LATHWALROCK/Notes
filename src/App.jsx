import { useLayoutEffect, useMemo, useState } from 'react';
import {
  BookIcon,
  LayersIcon,
  TreeIcon,
} from './components/Icons.jsx';
/*
 * Content files: one folder per subject, one file per topic, named after the
 * topic's `key` below. Each file emits the `data-topic-boundary` markers for
 * its own subtopics.
 */
import CoreJava from './subjects/java/core-java.jsx';
import Oop from './subjects/java/oop.jsx';
import ExceptionsConcurrency from './subjects/java/exceptions-concurrency.jsx';
import SyncExecutors from './subjects/java/sync-executors.jsx';
import Generics from './subjects/java/generics.jsx';
import Lists from './subjects/collections/lists.jsx';
import Maps from './subjects/collections/maps.jsx';
import Sets from './subjects/collections/sets.jsx';
import Queues from './subjects/collections/queues.jsx';
import Java8Features from './subjects/collections/java8.jsx';
import BinaryTree from './subjects/dsa/binary-tree.jsx';
import BinarySearchTree from './subjects/dsa/binary-search-tree.jsx';
import DynamicProgramming from './subjects/dsa/dynamic-programming.jsx';
import Graph from './subjects/dsa/graph.jsx';

/*
 * Each subject holds a tree of nav nodes in `children`. An internal node is
 * `{ key, label, children }`; a leaf is `{ id, label }`, where `id` matches a
 * `data-topic-boundary` marker in the content. The top bar shows subjects and
 * topics; the sub-bar shows the subtopics of the selected topic.
 */
const SUBJECTS = [
  {
    key: 'java',
    label: 'Java Notes',
    Icon: BookIcon,
    children: [
      { key: 'core-java', label: 'Core Java', Content: CoreJava, children: [
        { id: 'part1-1', label: 'Architecture & Compilation' },
        { id: 'part1-2', label: 'Java Basics' },
        { id: 'part1-3', label: 'Static Keyword' },
        { id: 'part1-4', label: 'Data Types & Wrappers' },
        { id: 'part1-5', label: 'Strings in Java' },
      ] },
      { key: 'oop', label: 'OOP', Content: Oop, children: [
        { id: 'part2-1', label: 'Methods & Constructors' },
        { id: 'part2-2', label: 'Inheritance & Polymorphism' },
        { id: 'part2-3', label: 'Abstract Classes & Final' },
        { id: 'part2-4', label: 'Interfaces' },
        { id: 'part2-5', label: 'Inner Classes' },
      ] },
      { key: 'exceptions-concurrency', label: 'Exceptions & Concurrency', Content: ExceptionsConcurrency, children: [
        { id: 's3-1', label: 'Exception Hierarchy' },
        { id: 's3-2', label: 'CPU & Process Architecture' },
        { id: 's3-3', label: 'Multitasking vs Multithreading' },
        { id: 's3-4', label: 'Java Threads \u2014 Creation' },
        { id: 's3-5', label: 'Thread Lifecycle & Methods' },
      ] },
      { key: 'sync-executors', label: 'Synchronization & Executors', Content: SyncExecutors, children: [
        { id: 's4-1', label: 'Synchronization' },
        { id: 's4-2', label: 'Explicit Locks' },
        { id: 's4-3', label: 'Thread Communication' },
        { id: 's4-4', label: 'Deadlocks & Liveness' },
        { id: 's4-5', label: 'Executors Framework' },
        { id: 's4-6', label: 'Concurrency Utilities' },
      ] },
      { key: 'generics', label: 'Generics', Content: Generics, children: [
        { id: 's51', label: 'Why Generics?' },
        { id: 's52', label: 'Generic Classes & Interfaces' },
        { id: 's53', label: 'Generic Methods' },
        { id: 's54', label: 'Bounded Type Params' },
        { id: 's55', label: 'Wildcards' },
        { id: 's56', label: 'Type Erasure' },
        { id: 's57', label: 'Static Members & Exceptions' },
        { id: 's58', label: 'Raw Types & Best Practices' },
      ] },
    ],
  },
  {
    key: 'collections',
    label: 'Java Collections Framework',
    Icon: LayersIcon,
    children: [
      { key: 'lists', label: 'Lists', Content: Lists, children: [
        { id: 's1-1', label: 'Collection Framework Overview' },
        { id: 's1-2', label: 'Collection Interface' },
        { id: 's1-3', label: 'ArrayList' },
        { id: 's14', label: 'LinkedList' },
        { id: 's15', label: 'Vector' },
        { id: 's16', label: 'Stack' },
        { id: 's17', label: 'CopyOnWriteArrayList' },
      ] },
      { key: 'maps', label: 'Maps', Content: Maps, children: [
        { id: 'partC', label: 'Map Interface' },
        { id: 'hashmap', label: 'HashMap' },
        { id: 'linkedhashmap', label: 'LinkedHashMap' },
        { id: 'weakhashmap', label: 'WeakHashMap' },
        { id: 'identityhashmap', label: 'IdentityHashMap' },
        { id: 's26', label: 'SortedMap & TreeMap / NavigableMap' },
        { id: 's27', label: 'Hashtable' },
        { id: 's28', label: 'ConcurrentHashMap' },
        { id: 's29', label: 'ConcurrentSkipListMap, EnumMap & Immutable Maps' },
        { id: 's210', label: 'Comparable vs Comparator' },
      ] },
      { key: 'sets', label: 'Sets', Content: Sets, children: [
        { id: 'part3', label: 'Set Interface' },
        { id: 's3-2', label: 'HashSet' },
        { id: 's3-3', label: 'LinkedHashSet' },
        { id: 's3-4', label: 'TreeSet' },
        { id: 's3-5', label: 'EnumSet, CopyOnWriteArraySet & ConcurrentSkipListSet' },
      ] },
      { key: 'queues', label: 'Queues & Deques', Content: Queues, children: [
        { id: 'part4', label: 'Queue Interface' },
        { id: 's4-2', label: 'PriorityQueue' },
        { id: 's4-3', label: 'Deque Interface & ArrayDeque' },
        { id: 's4-4', label: 'BlockingQueue & Variants' },
        { id: 's4-5', label: 'ConcurrentLinkedQueue, ConcurrentLinkedDeque & Iterable/Iterator' },
      ] },
      { key: 'java8', label: 'Java 8 Features', Content: Java8Features, children: [
        { id: 's5-1', label: 'Lambda Expressions' },
        { id: 's5-2', label: 'Functional Interfaces' },
        { id: 's5-3', label: 'Method References' },
        { id: 's5-4', label: 'Optional<T>' },
        { id: 's5-5', label: 'Stream API' },
        { id: 's5-6', label: 'Collectors Utility Class' },
        { id: 's5-7', label: 'Parallel Streams & Primitive Streams' },
      ] },
    ],
  },
  {
    key: 'dsa',
    label: 'DSA in Java',
    Icon: TreeIcon,
    children: [
      { key: 'binary-tree', label: 'Binary Tree', Content: BinaryTree, children: [
        /* Foundations */
        { id: 's1-1', label: 'What Is a Binary Tree?' },
        { id: 's1-2', label: 'Types of Binary Trees' },
        { id: 's1-3', label: 'Representation in Java' },
        { id: 's1-4', label: 'Traversal Overview' },
        /* Traversals */
        { id: 's2-1', label: 'Recursive Traversals' },
        { id: 's2-2', label: 'Level Order Traversal' },
        { id: 's2-3', label: 'Inorder Iterative' },
        { id: 's2-4', label: 'Preorder Iterative' },
        { id: 's2-5', label: 'Postorder Iterative' },
        { id: 's2-6', label: 'All Three in One Go' },
        /* Height, balance & paths */
        { id: 's3-1', label: 'Maximum Depth' },
        { id: 's3-2', label: 'Balanced Binary Tree' },
        { id: 's3-3', label: 'Diameter of a Tree' },
        { id: 's3-4', label: 'Maximum Path Sum' },
        { id: 's3-5', label: 'Identical Trees' },
        /* Patterns & views */
        { id: 's4-1', label: 'Zig-Zag Traversal' },
        { id: 's4-2', label: 'Boundary Traversal' },
        { id: 's4-3', label: 'Vertical Order Traversal' },
        { id: 's4-4', label: 'Top View' },
        { id: 's4-5', label: 'Bottom View' },
        { id: 's4-6', label: 'Right / Left Side View' },
        { id: 's4-7', label: 'Symmetric Binary Tree' },
        /* Paths, ancestors & BFS tricks */
        { id: 's5-1', label: 'Root to Node Path' },
        { id: 's5-2', label: 'Lowest Common Ancestor' },
        { id: 's5-3', label: 'Maximum Width' },
        { id: 's5-4', label: 'Children Sum Property' },
        { id: 's5-5', label: 'Nodes at Distance K' },
        { id: 's5-6', label: 'Burn the Binary Tree' },
        /* Construction & O(1) traversal */
        { id: 's6-1', label: 'Count Complete Tree Nodes' },
        { id: 's6-2', label: 'Build from Inorder + Preorder' },
        { id: 's6-3', label: 'Build from Inorder + Postorder' },
        { id: 's6-4', label: 'Serialize & Deserialize' },
        { id: 's6-5', label: 'Morris Inorder Traversal' },
        { id: 's6-6', label: 'Morris Preorder Traversal' },
        { id: 's6-7', label: 'Flatten Tree to Linked List' },
      ] },
      { key: 'bst', label: 'Binary Search Tree', Content: BinarySearchTree, children: [
        /* BST foundations */
        { id: 's7-1', label: 'What Is a BST?' },
        { id: 's7-2', label: 'Search in a BST' },
        { id: 's7-3', label: 'Ceil in a BST' },
        { id: 's7-4', label: 'Floor in a BST' },
        { id: 's7-5', label: 'Insert a Node in a BST' },
        { id: 's7-6', label: 'Delete a Node in a BST' },
        /* Order, validity & ancestors */
        { id: 's8-1', label: 'Kth Smallest / Largest' },
        { id: 's8-2', label: 'Validate a BST' },
        { id: 's8-3', label: 'LCA in a BST' },
        { id: 's8-4', label: 'Construct BST from Preorder' },
        { id: 's8-5', label: 'Predecessor & Successor' },
        /* Iterators & hard problems */
        { id: 's9-1', label: 'BST Iterator' },
        { id: 's9-2', label: 'Two Sum in a BST' },
        { id: 's9-3', label: 'Recover a BST' },
        { id: 's9-4', label: 'Largest BST in a Binary Tree' },
      ] },
      { key: 'dynamic-programming', label: 'Dynamic Programming', Content: DynamicProgramming, children: [
        /* Introduction to DP */
        { id: 'dp1-1', label: 'What Is Dynamic Programming?' },
        { id: 'dp1-2', label: 'When Does DP Apply?' },
        { id: 'dp1-3', label: 'The Three Approaches' },
        { id: 'dp1-4', label: 'Recipe for Any DP Problem' },
        /* 1D DP */
        { id: 'dp2-1', label: 'Fibonacci Number' },
        { id: 'dp2-2', label: 'Climbing Stairs' },
        { id: 'dp2-3', label: 'Frog Jump' },
        { id: 'dp2-4', label: 'Frog Jump with K Distances' },
        { id: 'dp2-5', label: 'Maximum Sum of Non-Adjacent Elements' },
        { id: 'dp2-6', label: 'House Robber II' },
        /* 2D / 3D DP and DP on grids */
        { id: 'dp3-1', label: 'Ninja\u2019s Training' },
        { id: 'dp3-2', label: 'Grid Unique Paths' },
        { id: 'dp3-3', label: 'Grid Unique Paths II \u2014 Obstacles' },
        { id: 'dp3-4', label: 'Minimum Path Sum in a Grid' },
        { id: 'dp3-5', label: 'Minimum Path Sum in a Triangle' },
        { id: 'dp3-6', label: 'Minimum / Maximum Falling Path Sum' },
        { id: 'dp3-7', label: 'Cherry Pickup II \u2014 3D DP' },
        /* DP on subsequences \u2014 subset sums */
        { id: 'dp4-1', label: 'Subset Sum Equal to Target' },
        { id: 'dp4-2', label: 'Partition Equal Subset Sum' },
        { id: 'dp4-3', label: 'Minimum Subset Sum Difference' },
        { id: 'dp4-4', label: 'Count Subsets with Sum K' },
        { id: 'dp4-5', label: 'Count Partitions with Given Difference' },
        /* Knapsack variants */
        { id: 'dp5-1', label: '0/1 Knapsack' },
        { id: 'dp5-2', label: 'Minimum Coins' },
        { id: 'dp5-3', label: 'Target Sum' },
        { id: 'dp5-4', label: 'Coin Change II \u2014 Count Ways' },
        { id: 'dp5-5', label: 'Unbounded Knapsack' },
        { id: 'dp5-6', label: 'Rod Cutting' },
        /* DP on strings */
        { id: 'dp6-1', label: 'Longest Common Subsequence' },
        { id: 'dp6-2', label: 'Print Longest Common Subsequence' },
        { id: 'dp6-3', label: 'Longest Common Substring' },
        { id: 'dp6-4', label: 'Longest Palindromic Subsequence' },
        { id: 'dp6-5', label: 'Minimum Insertions for a Palindrome' },
        { id: 'dp6-6', label: 'Minimum Operations to Convert A to B' },
        { id: 'dp6-7', label: 'Shortest Common Supersequence' },
        { id: 'dp6-8', label: 'Distinct Subsequences' },
        { id: 'dp6-9', label: 'Edit Distance' },
        { id: 'dp6-10', label: 'Wildcard Matching' },
        /* DP on stocks */
        { id: 'dp7-1', label: 'Best Time to Buy and Sell Stock' },
        { id: 'dp7-2', label: 'Buy and Sell Stock II' },
        { id: 'dp7-3', label: 'Buy and Sell Stock III' },
        { id: 'dp7-4', label: 'Buy and Sell Stock IV' },
        { id: 'dp7-5', label: 'Buy and Sell with Cooldown' },
        { id: 'dp7-6', label: 'Buy and Sell with Transaction Fee' },
        /* DP on LIS */
        { id: 'dp8-1', label: 'Longest Increasing Subsequence' },
        { id: 'dp8-2', label: 'Print Longest Increasing Subsequence' },
        { id: 'dp8-3', label: 'LIS in O(n log n)' },
        { id: 'dp8-4', label: 'Largest Divisible Subset' },
        { id: 'dp8-5', label: 'Longest String Chain' },
        { id: 'dp8-6', label: 'Longest Bitonic Subsequence' },
        { id: 'dp8-7', label: 'Number of Longest Increasing Subsequences' },
        /* Partition DP \u2014 the MCM pattern */
        { id: 'dp9-1', label: 'Matrix Chain Multiplication' },
        { id: 'dp9-2', label: 'Minimum Cost to Cut a Stick' },
        { id: 'dp9-3', label: 'Burst Balloons' },
        { id: 'dp9-4', label: 'Boolean Evaluation to True' },
        { id: 'dp9-5', label: 'Palindrome Partitioning II' },
        { id: 'dp9-6', label: 'Partition Array for Maximum Sum' },
        /* DP on squares */
        { id: 'dp10-1', label: 'Maximum Rectangle of 1s' },
        { id: 'dp10-2', label: 'Count Square Submatrices' },
      ] },
      { key: 'graph', label: 'Graph', Content: Graph, children: [
        /* Fundamentals */
        { id: 'g1', label: 'What Is a Graph?' },
        { id: 'g2', label: 'Graph Representation' },
        { id: 'g3', label: 'Connected Components' },
        { id: 'g4', label: 'BFS Traversal' },
        { id: 'g5', label: 'DFS Traversal' },
        /* Traversal patterns */
        { id: 'g6', label: 'Number of Provinces' },
        { id: 'g7', label: 'Number of Islands' },
        { id: 'g8', label: 'Flood Fill Algorithm' },
        { id: 'g9', label: 'Rotten Oranges' },
        { id: 'g10', label: 'Cycle in Undirected — BFS' },
        { id: 'g11', label: 'Cycle in Undirected — DFS' },
        { id: 'g12', label: 'Distance of Nearest Cell' },
        { id: 'g13', label: 'Surrounded Regions' },
        { id: 'g14', label: 'Number of Enclaves' },
        { id: 'g15', label: 'Number of Distinct Islands' },
        { id: 'g16', label: 'Bipartite Graph — BFS' },
        { id: 'g17', label: 'Bipartite Graph — DFS' },
        /* Directed graphs — cycles & topological sort */
        { id: 'g18', label: 'Cycle in Directed — DFS' },
        { id: 'g19', label: 'Eventual Safe States — DFS' },
        { id: 'g20', label: 'Topological Sort — DFS' },
        { id: 'g21', label: 'Topological Sort — Kahn’s' },
        { id: 'g22', label: 'Cycle in Directed — BFS' },
        { id: 'g23', label: 'Course Schedule I' },
        { id: 'g24', label: 'Course Schedule II' },
        { id: 'g25', label: 'Eventual Safe States — BFS' },
        { id: 'g26', label: 'Alien Dictionary' },
        /* Shortest path algorithms */
        { id: 'g27', label: 'Shortest Path in a DAG' },
        { id: 'g28', label: 'Shortest Path, Unit Weights' },
        { id: 'g29', label: 'Word Ladder I' },
        { id: 'g30', label: 'Word Ladder II' },
        { id: 'g31', label: 'Dijkstra’s Algorithm' },
        { id: 'g32', label: 'Shortest Path Between Nodes' },
        { id: 'g33', label: 'Shortest Distance in a Binary Maze' },
        { id: 'g34', label: 'Path With Minimum Effort' },
        /* Advanced shortest paths */
        { id: 'g35', label: 'Cheapest Flights Within K Stops' },
        { id: 'g36', label: 'Minimum Multiplications to Reach End' },
        { id: 'g37', label: 'Ways to Arrive at Destination' },
        { id: 'g38', label: 'Bellman–Ford Algorithm' },
        { id: 'g39', label: 'Floyd–Warshall Algorithm' },
        { id: 'g40', label: 'City With Smallest Number of Neighbours' },
        /* Minimum spanning trees & disjoint set */
        { id: 'g41', label: 'MST — Prim’s Algorithm' },
        { id: 'g42', label: 'Disjoint Set — Union by Rank' },
        { id: 'g43', label: 'Disjoint Set — Union by Size' },
        { id: 'g44', label: 'MST — Kruskal’s Algorithm' },
        { id: 'g45', label: 'Provinces — Disjoint Set' },
        { id: 'g46', label: 'Connecting the Graph' },
        { id: 'g47', label: 'Accounts Merge' },
        { id: 'g48', label: 'Number of Islands II' },
        { id: 'g49', label: 'Making a Large Island' },
        { id: 'g50', label: 'Most Stones Removed' },
        /* Strongly connected components & critical connections */
        { id: 'g51', label: 'SCC — Kosaraju’s Algorithm' },
        { id: 'g52', label: 'Bridges — Tarjan’s Algorithm' },
        { id: 'g53', label: 'Articulation Point' },
        { id: 'g54', label: 'Patterns & Cheat Sheet' },
      ] },
    ],
  },
];

function nodeKey(node) {
  return node.key ?? node.id;
}

/* Keys of the first child at every level below `node`, i.e. the default selection. */
function firstPath(node) {
  const path = [];
  let cur = node;
  while (cur.children?.length) {
    cur = cur.children[0];
    path.push(nodeKey(cur));
  }
  return path;
}

/*
 * One node per nav level below the subject; the last entry is always the leaf
 * that owns a content id. Any key the subject does not have falls back to its
 * first child, so a path left over from another subject can never break the nav.
 */
function resolvePath(subject, path) {
  const nodes = [];
  let cur = subject;
  while (cur.children?.length) {
    const wanted = path[nodes.length];
    const next = cur.children.find((c) => nodeKey(c) === wanted) ?? cur.children[0];
    nodes.push(next);
    cur = next;
  }
  return nodes;
}

export default function App() {
  const [activeSubjectKey, setActiveSubjectKey] = useState(SUBJECTS[0].key);
  const [activePath, setActivePath] = useState(() => firstPath(SUBJECTS[0]));

  const activeSubject = SUBJECTS.find((s) => s.key === activeSubjectKey) ?? SUBJECTS[0];
  const activeNodes = resolvePath(activeSubject, activePath);
  const activeTopic = activeNodes[0];
  const activeSubId = activeNodes[activeNodes.length - 1].id;
  const heading = activeNodes.slice(-2).map((n) => n.label).join(' \u2014 ');
  const ActiveContent = activeTopic.Content;

  /*
   * Only the ACTIVE TOPIC is mounted, not the whole subject. Mounting every
   * topic put 163 DSA subtopics in the DOM at once, all but one hidden.
   *
   * The element is memoized on the component itself so that selecting a
   * subtopic \u2014 which changes `activePath` and therefore re-renders App \u2014 hands
   * React the identical element and it skips re-rendering the content subtree
   * entirely. Without this, every click re-ran every `Code` block's syntax
   * highlighting, which is what made switching slow.
   */
  const content = useMemo(() => <ActiveContent />, [ActiveContent]);

  /*
   * Show/hide content sections based on the active subtopic. Runs as a layout
   * effect so the right section is visible before the browser paints; a plain
   * effect let the previous section paint first on every switch.
   */
  useLayoutEffect(() => {
    const mainEl = document.getElementById('main');
    if (!mainEl) return;
    const children = mainEl.children;
    const markers = [];
    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      if (el.dataset && el.dataset.topicBoundary) markers.push({ id: el.id, index: i });
    }
    markers.forEach((m, mi) => {
      const end = mi + 1 < markers.length ? markers[mi + 1].index : children.length;
      const want = m.id === activeSubId ? '' : 'none';
      for (let i = m.index; i < end; i++) {
        /* Assigning an unchanged value still invalidates style, so compare first. */
        if (children[i].style.display !== want) children[i].style.display = want;
      }
    });
    window.scrollTo(0, 0);
  }, [ActiveContent, activeSubId]);

  const handleSelectSubject = (subject) => {
    if (subject.key === activeSubjectKey) return;
    const path = firstPath(subject);
    setActiveSubjectKey(subject.key);
    setActivePath(path);
  };

  const handleSelectTopic = (topic) => {
    const topicKey = nodeKey(topic);
    if (activePath[0] === topicKey) return;
    const firstSub = topic.children[0];
    setActivePath([topicKey, nodeKey(firstSub)]);
  };

  const handleSelectSubtopic = (sub) => {
    setActivePath((prev) => [prev[0], nodeKey(sub)]);
  };

  return (
    <>
      <div className="nav-sticky">
        {/* Top bar: subjects + topics */}
        <nav className="top-bar" aria-label="Subject and topic navigation">
          <div className="top-bar-inner">
            <div className="subject-tabs">
              {SUBJECTS.map((s) => {
                const isActive = s.key === activeSubjectKey;
                return (
                  <button
                    key={s.key}
                    type="button"
                    className={'subject-tab' + (isActive ? ' active' : '')}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => handleSelectSubject(s)}
                  >
                    <span className="subject-tab-icon"><s.Icon /></span>
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="nav-divider" />

            <div className="topic-tabs">
              {activeSubject.children.map((topic) => {
                const key = nodeKey(topic);
                const isActive = key === activePath[0];
                return (
                  <button
                    key={key}
                    type="button"
                    className={'topic-tab' + (isActive ? ' active' : '')}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => handleSelectTopic(topic)}
                  >
                    {topic.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </div>

      <div className="content-layout">
        {/* Subtopic sidebar */}
        <aside className="sub-sidebar" aria-label="Subtopic navigation">
          <div className="sub-sidebar-header">
            <span className="sub-sidebar-badge">Subtopics</span>
            <span className="sub-sidebar-topic">{activeTopic.label}</span>
          </div>

          <div className="sub-sidebar-list">
            {activeTopic.children.map((sub, idx) => {
              const isActive = sub.id === activeSubId;
              return (
                <button
                  key={sub.id}
                  type="button"
                  className={'sub-tab' + (isActive ? ' active' : '')}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => handleSelectSubtopic(sub)}
                >
                  <span className="sub-tab-idx">{idx + 1}</span>
                  <span className="sub-tab-label">{sub.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <main id="main" className="main-content">
          <h1 className="content-heading">{heading}</h1>
          {content}
        </main>
      </div>
    </>
  );
}
