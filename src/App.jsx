import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
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
import LinkedList from './subjects/dsa/linked-list.jsx';
import DsaSheets from './subjects/dsa/dsa-sheets.jsx';

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
        { id: 'architecture-and-compilation', label: 'Architecture & Compilation' },
        { id: 'java-basics', label: 'Java Basics' },
        { id: 'static-keyword', label: 'Static Keyword' },
        { id: 'data-types-and-wrappers', label: 'Data Types & Wrappers' },
        { id: 'strings-in-java', label: 'Strings in Java' },
      ] },
      { key: 'oop', label: 'OOP', Content: Oop, children: [
        { id: 'methods-and-constructors', label: 'Methods & Constructors' },
        { id: 'inheritance-and-polymorphism', label: 'Inheritance & Polymorphism' },
        { id: 'abstract-classes-and-final', label: 'Abstract Classes & Final' },
        { id: 'interfaces', label: 'Interfaces' },
        { id: 'inner-classes', label: 'Inner Classes' },
      ] },
      { key: 'exceptions-concurrency', label: 'Exceptions & Concurrency', Content: ExceptionsConcurrency, children: [
        { id: 'exception-hierarchy', label: 'Exception Hierarchy' },
        { id: 'cpu-and-process-architecture', label: 'CPU & Process Architecture' },
        { id: 'multitasking-vs-multithreading', label: 'Multitasking vs Multithreading' },
        { id: 'java-threads-creation', label: 'Java Threads \u2014 Creation' },
        { id: 'thread-lifecycle-and-methods', label: 'Thread Lifecycle & Methods' },
      ] },
      { key: 'sync-executors', label: 'Synchronization & Executors', Content: SyncExecutors, children: [
        { id: 'synchronization', label: 'Synchronization' },
        { id: 'explicit-locks', label: 'Explicit Locks' },
        { id: 'thread-communication', label: 'Thread Communication' },
        { id: 'deadlocks-and-liveness', label: 'Deadlocks & Liveness' },
        { id: 'executors-framework', label: 'Executors Framework' },
        { id: 'concurrency-utilities', label: 'Concurrency Utilities' },
      ] },
      { key: 'generics', label: 'Generics', Content: Generics, children: [
        { id: 'why-generics', label: 'Why Generics?' },
        { id: 'generic-classes-and-interfaces', label: 'Generic Classes & Interfaces' },
        { id: 'generic-methods', label: 'Generic Methods' },
        { id: 'bounded-type-params', label: 'Bounded Type Params' },
        { id: 'wildcards', label: 'Wildcards' },
        { id: 'type-erasure', label: 'Type Erasure' },
        { id: 'static-members-and-exceptions', label: 'Static Members & Exceptions' },
        { id: 'raw-types-and-best-practices', label: 'Raw Types & Best Practices' },
      ] },
    ],
  },
  {
    key: 'collections',
    label: 'Java Collections Framework',
    Icon: LayersIcon,
    children: [
      { key: 'lists', label: 'Lists', Content: Lists, children: [
        { id: 'collection-framework-overview', label: 'Collection Framework Overview' },
        { id: 'collection-interface', label: 'Collection Interface' },
        { id: 'arraylist', label: 'ArrayList' },
        { id: 'linkedlist', label: 'LinkedList' },
        { id: 'vector', label: 'Vector' },
        { id: 'stack', label: 'Stack' },
        { id: 'copyonwritearraylist', label: 'CopyOnWriteArrayList' },
      ] },
      { key: 'maps', label: 'Maps', Content: Maps, children: [
        { id: 'map-interface', label: 'Map Interface' },
        { id: 'hashmap', label: 'HashMap' },
        { id: 'linkedhashmap', label: 'LinkedHashMap' },
        { id: 'weakhashmap', label: 'WeakHashMap' },
        { id: 'identityhashmap', label: 'IdentityHashMap' },
        { id: 'sortedmap-and-treemap-navigablemap', label: 'SortedMap & TreeMap / NavigableMap' },
        { id: 'hashtable', label: 'Hashtable' },
        { id: 'concurrenthashmap', label: 'ConcurrentHashMap' },
        { id: 'concurrentskiplistmap-enummap-and-immutable-maps', label: 'ConcurrentSkipListMap, EnumMap & Immutable Maps' },
        { id: 'comparable-vs-comparator', label: 'Comparable vs Comparator' },
      ] },
      { key: 'sets', label: 'Sets', Content: Sets, children: [
        { id: 'set-interface', label: 'Set Interface' },
        { id: 'hashset', label: 'HashSet' },
        { id: 'linkedhashset', label: 'LinkedHashSet' },
        { id: 'treeset', label: 'TreeSet' },
        { id: 'enumset-copyonwritearrayset-and-concurrentskiplistset', label: 'EnumSet, CopyOnWriteArraySet & ConcurrentSkipListSet' },
      ] },
      { key: 'queues', label: 'Queues & Deques', Content: Queues, children: [
        { id: 'queue-interface', label: 'Queue Interface' },
        { id: 'priorityqueue', label: 'PriorityQueue' },
        { id: 'deque-interface-and-arraydeque', label: 'Deque Interface & ArrayDeque' },
        { id: 'blockingqueue-and-variants', label: 'BlockingQueue & Variants' },
        { id: 'concurrentlinkedqueue-concurrentlinkeddeque-and-iterable-iterator', label: 'ConcurrentLinkedQueue, ConcurrentLinkedDeque & Iterable/Iterator' },
      ] },
      { key: 'java8', label: 'Java 8 Features', Content: Java8Features, children: [
        { id: 'lambda-expressions', label: 'Lambda Expressions' },
        { id: 'functional-interfaces', label: 'Functional Interfaces' },
        { id: 'method-references', label: 'Method References' },
        { id: 'optional', label: 'Optional<T>' },
        { id: 'stream-api', label: 'Stream API' },
        { id: 'collectors-utility-class', label: 'Collectors Utility Class' },
        { id: 'parallel-streams-and-primitive-streams', label: 'Parallel Streams & Primitive Streams' },
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
        { id: 'what-is-a-binary-tree', label: 'What Is a Binary Tree?' },
        { id: 'types-of-binary-trees', label: 'Types of Binary Trees' },
        { id: 'representation-in-java', label: 'Representation in Java' },
        { id: 'traversal-overview', label: 'Traversal Overview' },
        /* Traversals */
        { id: 'recursive-traversals', label: 'Recursive Traversals' },
        { id: 'level-order-traversal', label: 'Level Order Traversal' },
        { id: 'inorder-iterative', label: 'Inorder Iterative' },
        { id: 'preorder-iterative', label: 'Preorder Iterative' },
        { id: 'postorder-iterative', label: 'Postorder Iterative' },
        { id: 'all-three-in-one-go', label: 'All Three in One Go' },
        /* Height, balance & paths */
        { id: 'maximum-depth', label: 'Maximum Depth' },
        { id: 'balanced-binary-tree', label: 'Balanced Binary Tree' },
        { id: 'diameter-of-a-tree', label: 'Diameter of a Tree' },
        { id: 'maximum-path-sum', label: 'Maximum Path Sum' },
        { id: 'identical-trees', label: 'Identical Trees' },
        /* Patterns & views */
        { id: 'zig-zag-traversal', label: 'Zig-Zag Traversal' },
        { id: 'boundary-traversal', label: 'Boundary Traversal' },
        { id: 'vertical-order-traversal', label: 'Vertical Order Traversal' },
        { id: 'top-view', label: 'Top View' },
        { id: 'bottom-view', label: 'Bottom View' },
        { id: 'right-left-side-view', label: 'Right / Left Side View' },
        { id: 'symmetric-binary-tree', label: 'Symmetric Binary Tree' },
        /* Paths, ancestors & BFS tricks */
        { id: 'root-to-node-path', label: 'Root to Node Path' },
        { id: 'lowest-common-ancestor', label: 'Lowest Common Ancestor' },
        { id: 'maximum-width', label: 'Maximum Width' },
        { id: 'children-sum-property', label: 'Children Sum Property' },
        { id: 'nodes-at-distance-k', label: 'Nodes at Distance K' },
        { id: 'burn-the-binary-tree', label: 'Burn the Binary Tree' },
        /* Construction & O(1) traversal */
        { id: 'count-complete-tree-nodes', label: 'Count Complete Tree Nodes' },
        { id: 'build-from-inorder-preorder', label: 'Build from Inorder + Preorder' },
        { id: 'build-from-inorder-postorder', label: 'Build from Inorder + Postorder' },
        { id: 'serialize-and-deserialize', label: 'Serialize & Deserialize' },
        { id: 'morris-inorder-traversal', label: 'Morris Inorder Traversal' },
        { id: 'morris-preorder-traversal', label: 'Morris Preorder Traversal' },
        { id: 'flatten-tree-to-linked-list', label: 'Flatten Tree to Linked List' },
      ] },
      { key: 'bst', label: 'Binary Search Tree', Content: BinarySearchTree, children: [
        /* BST foundations */
        { id: 'what-is-a-bst', label: 'What Is a BST?' },
        { id: 'search-in-a-bst', label: 'Search in a BST' },
        { id: 'ceil-in-a-bst', label: 'Ceil in a BST' },
        { id: 'floor-in-a-bst', label: 'Floor in a BST' },
        { id: 'insert-a-node-in-a-bst', label: 'Insert a Node in a BST' },
        { id: 'delete-a-node-in-a-bst', label: 'Delete a Node in a BST' },
        /* Order, validity & ancestors */
        { id: 'kth-smallest-largest', label: 'Kth Smallest / Largest' },
        { id: 'validate-a-bst', label: 'Validate a BST' },
        { id: 'lca-in-a-bst', label: 'LCA in a BST' },
        { id: 'construct-bst-from-preorder', label: 'Construct BST from Preorder' },
        { id: 'predecessor-and-successor', label: 'Predecessor & Successor' },
        /* Iterators & hard problems */
        { id: 'bst-iterator', label: 'BST Iterator' },
        { id: 'two-sum-in-a-bst', label: 'Two Sum in a BST' },
        { id: 'recover-a-bst', label: 'Recover a BST' },
        { id: 'largest-bst-in-a-binary-tree', label: 'Largest BST in a Binary Tree' },
      ] },
      { key: 'dynamic-programming', label: 'Dynamic Programming', Content: DynamicProgramming, children: [
        /* Introduction to DP */
        { id: 'what-is-dynamic-programming', label: 'What Is Dynamic Programming?' },
        { id: 'when-does-dp-apply', label: 'When Does DP Apply?' },
        { id: 'the-three-approaches', label: 'The Three Approaches' },
        { id: 'recipe-for-any-dp-problem', label: 'Recipe for Any DP Problem' },
        /* 1D DP */
        { id: 'fibonacci-number', label: 'Fibonacci Number' },
        { id: 'climbing-stairs', label: 'Climbing Stairs' },
        { id: 'frog-jump', label: 'Frog Jump' },
        { id: 'frog-jump-with-k-distances', label: 'Frog Jump with K Distances' },
        { id: 'maximum-sum-of-non-adjacent-elements', label: 'Maximum Sum of Non-Adjacent Elements' },
        { id: 'house-robber-ii', label: 'House Robber II' },
        /* 2D / 3D DP and DP on grids */
        { id: 'ninjas-training', label: 'Ninja\u2019s Training' },
        { id: 'grid-unique-paths', label: 'Grid Unique Paths' },
        { id: 'grid-unique-paths-ii-obstacles', label: 'Grid Unique Paths II \u2014 Obstacles' },
        { id: 'minimum-path-sum-in-a-grid', label: 'Minimum Path Sum in a Grid' },
        { id: 'minimum-path-sum-in-a-triangle', label: 'Minimum Path Sum in a Triangle' },
        { id: 'minimum-maximum-falling-path-sum', label: 'Minimum / Maximum Falling Path Sum' },
        { id: 'cherry-pickup-ii-3d-dp', label: 'Cherry Pickup II \u2014 3D DP' },
        /* DP on subsequences \u2014 subset sums */
        { id: 'subset-sum-equal-to-target', label: 'Subset Sum Equal to Target' },
        { id: 'partition-equal-subset-sum', label: 'Partition Equal Subset Sum' },
        { id: 'minimum-subset-sum-difference', label: 'Minimum Subset Sum Difference' },
        { id: 'count-subsets-with-sum-k', label: 'Count Subsets with Sum K' },
        { id: 'count-partitions-with-given-difference', label: 'Count Partitions with Given Difference' },
        /* Knapsack variants */
        { id: '0-1-knapsack', label: '0/1 Knapsack' },
        { id: 'minimum-coins', label: 'Minimum Coins' },
        { id: 'target-sum', label: 'Target Sum' },
        { id: 'coin-change-ii-count-ways', label: 'Coin Change II \u2014 Count Ways' },
        { id: 'unbounded-knapsack', label: 'Unbounded Knapsack' },
        { id: 'rod-cutting', label: 'Rod Cutting' },
        /* DP on strings */
        { id: 'longest-common-subsequence', label: 'Longest Common Subsequence' },
        { id: 'print-longest-common-subsequence', label: 'Print Longest Common Subsequence' },
        { id: 'longest-common-substring', label: 'Longest Common Substring' },
        { id: 'longest-palindromic-subsequence', label: 'Longest Palindromic Subsequence' },
        { id: 'minimum-insertions-for-a-palindrome', label: 'Minimum Insertions for a Palindrome' },
        { id: 'minimum-operations-to-convert-a-to-b', label: 'Minimum Operations to Convert A to B' },
        { id: 'shortest-common-supersequence', label: 'Shortest Common Supersequence' },
        { id: 'distinct-subsequences', label: 'Distinct Subsequences' },
        { id: 'edit-distance', label: 'Edit Distance' },
        { id: 'wildcard-matching', label: 'Wildcard Matching' },
        /* DP on stocks */
        { id: 'best-time-to-buy-and-sell-stock', label: 'Best Time to Buy and Sell Stock' },
        { id: 'buy-and-sell-stock-ii', label: 'Buy and Sell Stock II' },
        { id: 'buy-and-sell-stock-iii', label: 'Buy and Sell Stock III' },
        { id: 'buy-and-sell-stock-iv', label: 'Buy and Sell Stock IV' },
        { id: 'buy-and-sell-with-cooldown', label: 'Buy and Sell with Cooldown' },
        { id: 'buy-and-sell-with-transaction-fee', label: 'Buy and Sell with Transaction Fee' },
        /* DP on LIS */
        { id: 'longest-increasing-subsequence', label: 'Longest Increasing Subsequence' },
        { id: 'print-longest-increasing-subsequence', label: 'Print Longest Increasing Subsequence' },
        { id: 'lis-in-o-n-log-n', label: 'LIS in O(n log n)' },
        { id: 'largest-divisible-subset', label: 'Largest Divisible Subset' },
        { id: 'longest-string-chain', label: 'Longest String Chain' },
        { id: 'longest-bitonic-subsequence', label: 'Longest Bitonic Subsequence' },
        { id: 'number-of-longest-increasing-subsequences', label: 'Number of Longest Increasing Subsequences' },
        /* Partition DP \u2014 the MCM pattern */
        { id: 'matrix-chain-multiplication', label: 'Matrix Chain Multiplication' },
        { id: 'minimum-cost-to-cut-a-stick', label: 'Minimum Cost to Cut a Stick' },
        { id: 'burst-balloons', label: 'Burst Balloons' },
        { id: 'boolean-evaluation-to-true', label: 'Boolean Evaluation to True' },
        { id: 'palindrome-partitioning-ii', label: 'Palindrome Partitioning II' },
        { id: 'partition-array-for-maximum-sum', label: 'Partition Array for Maximum Sum' },
        /* DP on squares */
        { id: 'maximum-rectangle-of-1s', label: 'Maximum Rectangle of 1s' },
        { id: 'count-square-submatrices', label: 'Count Square Submatrices' },
      ] },
      { key: 'graph', label: 'Graph', Content: Graph, children: [
        /* Fundamentals */
        { id: 'what-is-a-graph', label: 'What Is a Graph?' },
        { id: 'graph-representation', label: 'Graph Representation' },
        { id: 'connected-components', label: 'Connected Components' },
        { id: 'bfs-traversal', label: 'BFS Traversal' },
        { id: 'dfs-traversal', label: 'DFS Traversal' },
        /* Traversal patterns */
        { id: 'number-of-provinces', label: 'Number of Provinces' },
        { id: 'number-of-islands', label: 'Number of Islands' },
        { id: 'flood-fill-algorithm', label: 'Flood Fill Algorithm' },
        { id: 'rotten-oranges', label: 'Rotten Oranges' },
        { id: 'cycle-in-undirected-bfs', label: 'Cycle in Undirected — BFS' },
        { id: 'cycle-in-undirected-dfs', label: 'Cycle in Undirected — DFS' },
        { id: 'distance-of-nearest-cell', label: 'Distance of Nearest Cell' },
        { id: 'surrounded-regions', label: 'Surrounded Regions' },
        { id: 'number-of-enclaves', label: 'Number of Enclaves' },
        { id: 'number-of-distinct-islands', label: 'Number of Distinct Islands' },
        { id: 'bipartite-graph-bfs', label: 'Bipartite Graph — BFS' },
        { id: 'bipartite-graph-dfs', label: 'Bipartite Graph — DFS' },
        /* Directed graphs — cycles & topological sort */
        { id: 'cycle-in-directed-dfs', label: 'Cycle in Directed — DFS' },
        { id: 'eventual-safe-states-dfs', label: 'Eventual Safe States — DFS' },
        { id: 'topological-sort-dfs', label: 'Topological Sort — DFS' },
        { id: 'topological-sort-kahns', label: 'Topological Sort — Kahn’s' },
        { id: 'cycle-in-directed-bfs', label: 'Cycle in Directed — BFS' },
        { id: 'course-schedule-i', label: 'Course Schedule I' },
        { id: 'course-schedule-ii', label: 'Course Schedule II' },
        { id: 'eventual-safe-states-bfs', label: 'Eventual Safe States — BFS' },
        { id: 'alien-dictionary', label: 'Alien Dictionary' },
        /* Shortest path algorithms */
        { id: 'shortest-path-in-a-dag', label: 'Shortest Path in a DAG' },
        { id: 'shortest-path-unit-weights', label: 'Shortest Path, Unit Weights' },
        { id: 'word-ladder-i', label: 'Word Ladder I' },
        { id: 'word-ladder-ii', label: 'Word Ladder II' },
        { id: 'dijkstras-algorithm', label: 'Dijkstra’s Algorithm' },
        { id: 'shortest-path-between-nodes', label: 'Shortest Path Between Nodes' },
        { id: 'shortest-distance-in-a-binary-maze', label: 'Shortest Distance in a Binary Maze' },
        { id: 'path-with-minimum-effort', label: 'Path With Minimum Effort' },
        /* Advanced shortest paths */
        { id: 'cheapest-flights-within-k-stops', label: 'Cheapest Flights Within K Stops' },
        { id: 'minimum-multiplications-to-reach-end', label: 'Minimum Multiplications to Reach End' },
        { id: 'ways-to-arrive-at-destination', label: 'Ways to Arrive at Destination' },
        { id: 'bellman-ford-algorithm', label: 'Bellman–Ford Algorithm' },
        { id: 'floyd-warshall-algorithm', label: 'Floyd–Warshall Algorithm' },
        { id: 'city-with-smallest-number-of-neighbours', label: 'City With Smallest Number of Neighbours' },
        /* Minimum spanning trees & disjoint set */
        { id: 'mst-prims-algorithm', label: 'MST — Prim’s Algorithm' },
        { id: 'disjoint-set-union-by-rank', label: 'Disjoint Set — Union by Rank' },
        { id: 'disjoint-set-union-by-size', label: 'Disjoint Set — Union by Size' },
        { id: 'mst-kruskals-algorithm', label: 'MST — Kruskal’s Algorithm' },
        { id: 'provinces-disjoint-set', label: 'Provinces — Disjoint Set' },
        { id: 'connecting-the-graph', label: 'Connecting the Graph' },
        { id: 'accounts-merge', label: 'Accounts Merge' },
        { id: 'number-of-islands-ii', label: 'Number of Islands II' },
        { id: 'making-a-large-island', label: 'Making a Large Island' },
        { id: 'most-stones-removed', label: 'Most Stones Removed' },
        /* Strongly connected components & critical connections */
        { id: 'scc-kosarajus-algorithm', label: 'SCC — Kosaraju’s Algorithm' },
        { id: 'bridges-tarjans-algorithm', label: 'Bridges — Tarjan’s Algorithm' },
        { id: 'articulation-point', label: 'Articulation Point' },
        { id: 'patterns-and-cheat-sheet', label: 'Patterns & Cheat Sheet' },
      ] },
      { key: 'linked-list', label: 'Linked List', Content: LinkedList, children: [
        /* Fundamentals */
        { id: 'what-is-a-linked-list', label: 'What Is a Linked List?' },
        { id: 'doubly-linked-list', label: 'Doubly Linked List' },
        { id: 'search-an-element', label: 'Search an Element' },
        { id: 'length-of-a-linked-list', label: 'Length of a Linked List' },
        /* Core operations */
        { id: 'insertion-in-a-singly-ll', label: 'Insertion in a Singly LL' },
        { id: 'deletion-in-a-singly-ll', label: 'Deletion in a Singly LL' },
        { id: 'insertion-in-a-dll', label: 'Insertion in a DLL' },
        { id: 'deletion-in-a-dll', label: 'Deletion in a DLL' },
        { id: 'reverse-a-dll', label: 'Reverse a DLL' },
        /* Classic interview problems */
        { id: 'add-two-numbers-as-lls', label: 'Add Two Numbers as LLs' },
        { id: 'odd-even-linked-list', label: 'Odd Even Linked List' },
        { id: 'sort-ll-of-0s-1s-2s', label: 'Sort LL of 0s, 1s, 2s' },
        { id: 'remove-nth-node-from-end', label: 'Remove Nth Node From End' },
        { id: 'reverse-a-linked-list', label: 'Reverse a Linked List' },
        { id: 'll-palindrome-check', label: 'LL Palindrome Check' },
        { id: 'add-1-to-a-number-as-ll', label: 'Add 1 to a Number as LL' },
        /* Fast & slow pointers — Floyd’s technique */
        { id: 'intersection-of-y-shaped-ll', label: 'Intersection of Y-Shaped LL' },
        { id: 'middle-of-a-linked-list', label: 'Middle of a Linked List' },
        { id: 'detect-a-loop-in-a-ll', label: 'Detect a Loop in a LL' },
        { id: 'length-of-a-loop-in-a-ll', label: 'Length of a Loop in a LL' },
        { id: 'delete-the-middle-node', label: 'Delete the Middle Node' },
        { id: 'starting-point-of-a-loop', label: 'Starting Point of a Loop' },
        /* Doubly linked list — specific problems */
        { id: 'delete-all-occurrences-in-dll', label: 'Delete All Occurrences in DLL' },
        { id: 'pairs-with-given-sum-dll', label: 'Pairs With Given Sum, DLL' },
        { id: 'remove-duplicates-sorted-dll', label: 'Remove Duplicates, Sorted DLL' },
        /* Merging, rotating & advanced structures */
        { id: 'reverse-nodes-in-groups-of-k', label: 'Reverse Nodes in Groups of K' },
        { id: 'rotate-a-linked-list', label: 'Rotate a Linked List' },
        { id: 'merge-two-sorted-lls', label: 'Merge Two Sorted LLs' },
        { id: 'flattening-a-linked-list', label: 'Flattening a Linked List' },
        { id: 'merge-k-sorted-lists', label: 'Merge K Sorted Lists' },
        { id: 'sort-a-linked-list', label: 'Sort a Linked List' },
        { id: 'clone-ll-random-pointer', label: 'Clone LL, Random Pointer' },
        { id: 'design-browser-history', label: 'Design Browser History' },
        /* Wrap-up */
        { id: 'patterns-and-cheat-sheet', label: 'Patterns & Cheat Sheet' },
      ] },
      { key: 'dsa-sheets', label: 'DSA Sheets', Content: DsaSheets, children: [
        { id: 'strivers-180', label: "Striver's 180 Master DSA Patterns" },
      ] },
    ],
  },
];

function nodeKey(node) {
  return node?.key ?? node?.id;
}

function getCanonicalPath(subjectKey, topicKey, subtopicId) {
  return `/${subjectKey}/${topicKey}/${subtopicId}`;
}

/*
 * Resolves a URL pathname against the SUBJECTS configuration tree into:
 * { subject, topic, subtopic, canonicalPath }
 * Falls back to first children if any segments are missing or invalid.
 */
function resolveRoute(pathname) {
  let segments = [];
  try {
    segments = (pathname || '')
      .split('/')
      .map((s) => decodeURIComponent(s.trim()))
      .filter(Boolean);
  } catch {
    segments = (pathname || '')
      .split('/')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const [wantedSubject, wantedTopic, wantedSubtopic] = segments;

  const subject = SUBJECTS.find((s) => s.key === wantedSubject) ?? SUBJECTS[0];
  const topic = subject.children.find((t) => nodeKey(t) === wantedTopic) ?? subject.children[0];
  const subtopic = topic.children.find((sub) => nodeKey(sub) === wantedSubtopic) ?? topic.children[0];

  const canonicalPath = getCanonicalPath(subject.key, nodeKey(topic), nodeKey(subtopic));

  return {
    subject,
    topic,
    subtopic,
    canonicalPath,
  };
}

export default function App() {
  const [route, setRoute] = useState(() => resolveRoute(window.location.pathname));

  const { subject: activeSubject, topic: activeTopic, subtopic: activeSubtopic, canonicalPath } = route;
  const activeSubjectKey = activeSubject.key;
  const activeTopicKey = nodeKey(activeTopic);
  const activeSubId = nodeKey(activeSubtopic);

  const heading = `${activeTopic.label} \u2014 ${activeSubtopic.label}`;
  const ActiveContent = activeTopic.Content;

  /*
   * Only the ACTIVE TOPIC is mounted, not the whole subject. Mounting every
   * topic put 163 DSA subtopics in the DOM at once, all but one hidden.
   *
   * The element is memoized on the component itself so that selecting a
   * subtopic hands React the identical element and it skips re-rendering the
   * content subtree entirely. Without this, every click re-ran every `Code` block's
   * syntax highlighting, which is what made switching slow.
   */
  const content = useMemo(() => <ActiveContent />, [ActiveContent]);

  // Keep browser URL canonical on load or if user lands on partial URL (e.g. /dsa or /)
  useEffect(() => {
    if (window.location.pathname !== canonicalPath) {
      window.history.replaceState(null, '', canonicalPath);
    }
  }, [canonicalPath]);

  // Handle browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setRoute(resolveRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document title with current page
  useEffect(() => {
    document.title = `${heading} | Java Notes`;
  }, [heading]);

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

  const navigateTo = (nextSubject, nextTopic, nextSubtopic) => {
    const targetUrl = getCanonicalPath(
      nextSubject.key,
      nodeKey(nextTopic),
      nodeKey(nextSubtopic)
    );
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
    setRoute({
      subject: nextSubject,
      topic: nextTopic,
      subtopic: nextSubtopic,
      canonicalPath: targetUrl,
    });
  };

  const handleLinkClick = (e, nextSubject, nextTopic, nextSubtopic, isCurrentActive) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (isCurrentActive) return;
    navigateTo(nextSubject, nextTopic, nextSubtopic);
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
                const defaultTopic = s.children[0];
                const defaultSub = defaultTopic.children[0];
                const href = isActive
                  ? canonicalPath
                  : getCanonicalPath(s.key, nodeKey(defaultTopic), nodeKey(defaultSub));
                return (
                  <a
                    key={s.key}
                    href={href}
                    className={'subject-tab' + (isActive ? ' active' : '')}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={(e) => handleLinkClick(e, s, defaultTopic, defaultSub, isActive)}
                  >
                    <span className="subject-tab-icon"><s.Icon /></span>
                    <span>{s.label}</span>
                  </a>
                );
              })}
            </div>

            <span className="nav-divider" />

            <div className="topic-tabs">
              {activeSubject.children.map((topic) => {
                const key = nodeKey(topic);
                const isActive = key === activeTopicKey;
                const defaultSub = topic.children[0];
                const href = isActive
                  ? canonicalPath
                  : getCanonicalPath(activeSubject.key, key, nodeKey(defaultSub));
                return (
                  <a
                    key={key}
                    href={href}
                    className={'topic-tab' + (isActive ? ' active' : '')}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={(e) => handleLinkClick(e, activeSubject, topic, defaultSub, isActive)}
                  >
                    {topic.label}
                  </a>
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
              const subId = nodeKey(sub);
              const isActive = subId === activeSubId;
              const href = getCanonicalPath(activeSubject.key, activeTopicKey, subId);
              return (
                <a
                  key={subId}
                  href={href}
                  className={'sub-tab' + (isActive ? ' active' : '')}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, activeSubject, activeTopic, sub, isActive)}
                >
                  <span className="sub-tab-idx">{idx + 1}</span>
                  <span className="sub-tab-label">{sub.label}</span>
                </a>
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
