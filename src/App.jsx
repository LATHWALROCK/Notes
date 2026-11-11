import { useEffect, useLayoutEffect, useMemo } from 'react';
import { Routes, Route, useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
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
import BinarySearch from './subjects/dsa/binary-search.jsx';
import DynamicProgramming from './subjects/dsa/dynamic-programming.jsx';
import Graph from './subjects/dsa/graph.jsx';
import LinkedList from './subjects/dsa/linked-list.jsx';
import Mathematics from './subjects/dsa/mathematics.jsx';
import SlidingWindow from './subjects/dsa/sliding-window.jsx';
import StacksQueues from './subjects/dsa/stacks-queues.jsx';
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
    mediumLabel: 'Java Notes',
    shortLabel: 'Java',
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
      { key: 'exceptions-concurrency', label: 'Exceptions & Concurrency', mediumLabel: 'Exceptions & Threads', shortLabel: 'Exceptions', Content: ExceptionsConcurrency, children: [
        { id: 'exception-hierarchy', label: 'Exception Hierarchy' },
        { id: 'cpu-and-process-architecture', label: 'CPU & Process Architecture' },
        { id: 'multitasking-vs-multithreading', label: 'Multitasking vs Multithreading' },
        { id: 'java-threads-creation', label: 'Java Threads \u2014 Creation' },
        { id: 'thread-lifecycle-and-methods', label: 'Thread Lifecycle & Methods' },
      ] },
      { key: 'sync-executors', label: 'Synchronization & Executors', mediumLabel: 'Sync & Executors', shortLabel: 'Concurrency', Content: SyncExecutors, children: [
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
    mediumLabel: 'Collections',
    shortLabel: 'Collections',
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
      { key: 'queues', label: 'Queues & Deques', mediumLabel: 'Queues & Deques', shortLabel: 'Queues', Content: Queues, children: [
        { id: 'queue-interface', label: 'Queue Interface' },
        { id: 'priorityqueue', label: 'PriorityQueue' },
        { id: 'deque-interface-and-arraydeque', label: 'Deque Interface & ArrayDeque' },
        { id: 'blockingqueue-and-variants', label: 'BlockingQueue & Variants' },
        { id: 'concurrentlinkedqueue-concurrentlinkeddeque-and-iterable-iterator', label: 'ConcurrentLinkedQueue, ConcurrentLinkedDeque & Iterable/Iterator' },
      ] },
      { key: 'java8', label: 'Java 8 Features', mediumLabel: 'Java 8', shortLabel: 'Java 8', Content: Java8Features, children: [
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
    mediumLabel: 'DSA in Java',
    shortLabel: 'DSA',
    Icon: TreeIcon,
    children: [
      { key: 'binary-search', label: 'Binary Search', Content: BinarySearch, children: [
        /* Fundamentals */
        { id: 'binary-search-basics', label: 'Binary Search Basics' },
        { id: 'lower-bound', label: 'Lower Bound' },
        { id: 'upper-bound', label: 'Upper Bound' },
        { id: 'search-insert-position', label: 'Search Insert Position' },
        { id: 'floor-in-a-sorted-array', label: 'Floor in a Sorted Array' },
        { id: 'first-and-last-occurrence-of-x', label: 'First & Last Occurrence of X' },
        { id: 'count-occurrences-of-x', label: 'Count Occurrences of X' },
        /* Searching rotated / modified arrays */
        { id: 'search-rotated-sorted-array-i', label: 'Search Rotated Sorted Array I' },
        { id: 'search-rotated-sorted-array-ii', label: 'Search Rotated Sorted Array II' },
        { id: 'minimum-in-rotated-sorted-array', label: 'Minimum in Rotated Sorted Array' },
        { id: 'number-of-times-array-rotated', label: 'Number of Times Array Rotated' },
        { id: 'single-element-in-sorted-array', label: 'Single Element in Sorted Array' },
        { id: 'find-peak-element', label: 'Find Peak Element' },
        /* Binary search on answers */
        { id: 'square-root-of-a-number', label: 'Square Root of a Number' },
        { id: 'nth-root-of-a-number', label: 'Nth Root of a Number' },
        { id: 'koko-eating-bananas', label: 'Koko Eating Bananas' },
        { id: 'min-days-to-make-m-bouquets', label: 'Min Days to Make M Bouquets' },
        { id: 'smallest-divisor-given-a-threshold', label: 'Smallest Divisor Given a Threshold' },
        { id: 'ship-packages-in-d-days', label: 'Ship Packages in D Days' },
        { id: 'kth-missing-positive-number', label: 'Kth Missing Positive Number' },
        /* Allocation & partition */
        { id: 'aggressive-cows', label: 'Aggressive Cows' },
        { id: 'allocate-books', label: 'Allocate Books' },
        { id: 'painters-partition', label: "Painter's Partition" },
        { id: 'minimize-max-distance-gas-station', label: 'Minimize Max Distance, Gas Station' },
        /* Two arrays & 2D matrices */
        { id: 'median-of-two-sorted-arrays', label: 'Median of Two Sorted Arrays' },
        { id: 'kth-element-of-two-sorted-arrays', label: 'Kth Element of Two Sorted Arrays' },
        { id: 'row-with-maximum-1s', label: 'Row With Maximum 1s' },
        { id: 'search-a-2d-matrix-i', label: 'Search a 2D Matrix I' },
        { id: 'search-a-2d-matrix-ii', label: 'Search a 2D Matrix II' },
        { id: 'find-a-peak-element-ii', label: 'Find a Peak Element II' },
        { id: 'median-of-a-row-wise-sorted-matrix', label: 'Median of a Row-Wise Sorted Matrix' },
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
      ] },
      { key: 'stacks-queues', label: 'Stacks & Queues', mediumLabel: 'Stacks & Queues', shortLabel: 'Stacks', Content: StacksQueues, children: [
        /* Fundamentals & Design */
        { id: 'implement-stack-using-arrays', label: 'Implement Stack using Arrays' },
        { id: 'implement-queue-using-arrays', label: 'Implement Queue using Arrays' },
        { id: 'implement-stack-using-queue', label: 'Implement Stack using Queue' },
        { id: 'implement-queue-using-stack', label: 'Implement Queue using Stack' },
        { id: 'implement-stack-using-linked-list', label: 'Implement Stack using Linked List' },
        { id: 'implement-queue-using-linked-list', label: 'Implement Queue using Linked List' },
        { id: 'check-for-balanced-parenthesis', label: 'Check for Balanced Parenthesis' },
        { id: 'implement-min-stack', label: 'Implement Min Stack' },
        /* Prefix, Infix & Postfix Conversions */
        { id: 'infix-to-postfix', label: 'Infix to Postfix Conversion' },
        { id: 'infix-to-prefix', label: 'Infix to Prefix Conversion' },
        { id: 'prefix-to-infix', label: 'Prefix to Infix Conversion' },
        { id: 'prefix-to-postfix', label: 'Prefix to Postfix Conversion' },
        { id: 'postfix-to-infix', label: 'Postfix to Infix Conversion' },
        { id: 'postfix-to-prefix', label: 'Postfix to Prefix Conversion' },
        /* Monotonic Stack & Queue Problems */
        { id: 'next-greater-element', label: 'Next Greater Element' },
        { id: 'next-greater-element-ii', label: 'Next Greater Element – 2' },
        { id: 'nearest-smaller-element', label: 'Nearest Smaller Element' },
        { id: 'trapping-rainwater', label: 'Trapping Rainwater' },
        { id: 'sum-of-subarray-minimums', label: 'Sum of Subarray Minimums' },
        { id: 'sum-of-subarray-ranges', label: 'Sum of Subarray Ranges' },
        { id: 'asteroid-collision', label: 'Asteroid Collision' },
        { id: 'largest-rectangle-in-histogram', label: 'Largest Rectangle in Histogram' },
        { id: 'maximal-rectangle', label: 'Maximal Rectangle' },
        { id: 'remove-k-digits', label: 'Remove K Digits' },
        { id: 'stock-span-problem', label: 'Stock Span Problem' },
        { id: 'sliding-window-maximum', label: 'Sliding Window Maximum' },
        /* Hard / Design & Real-world */
        { id: 'the-celebrity-problem', label: 'The Celebrity Problem' },
        { id: 'lru-cache', label: 'LRU Cache' },
        { id: 'lfu-cache', label: 'LFU Cache' },
      ] },
      { key: 'sliding-window', label: 'Sliding Window & 2 Pointers', mediumLabel: 'Sliding Window', shortLabel: 'Sliding Window', Content: SlidingWindow, children: [
        { id: 'sliding-window-basics', label: 'Sliding Window & 2 Pointers Fundamentals' },
        { id: 'max-points-from-cards', label: 'Maximum Points from Cards' },
        { id: 'longest-substring-without-repeating', label: 'Longest Substring Without Repeating Characters' },
        { id: 'max-consecutive-ones-iii', label: 'Max Consecutive Ones III' },
        { id: 'fruit-into-baskets', label: 'Fruit Into Baskets' },
        { id: 'longest-substring-at-most-k-distinct', label: 'Longest Substring with At Most K Distinct' },
        { id: 'number-of-substrings-three-characters', label: 'Substrings with All Three Characters' },
        { id: 'longest-repeating-character-replacement', label: 'Longest Repeating Character Replacement' },
        { id: 'binary-subarrays-with-sum', label: 'Binary Subarrays With Sum' },
        { id: 'count-number-of-nice-subarrays', label: 'Count Number of Nice Subarrays' },
        { id: 'subarrays-with-k-different-integers', label: 'Subarrays with K Different Integers' },
        { id: 'minimum-window-substring', label: 'Minimum Window Substring' },
      ] },
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
      { key: 'bst', label: 'Binary Search Tree', mediumLabel: 'BST', shortLabel: 'BST', Content: BinarySearchTree, children: [
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
      { key: 'dynamic-programming', label: 'Dynamic Programming', mediumLabel: 'DP', shortLabel: 'DP', Content: DynamicProgramming, children: [
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
      ] },
      { key: 'mathematics', label: 'Mathematics', mediumLabel: 'Maths', shortLabel: 'Maths', Content: Mathematics, children: [
        { id: 'divisors-of-a-number', label: 'Divisors of a Number' },
        { id: 'check-if-a-number-is-prime', label: 'Check if a Number is Prime' },
        { id: 'prime-factors-of-a-number', label: 'Prime Factors of a Number' },
        { id: 'power-exponentiation', label: 'Power / Exponentiation' },
        { id: 'sieve-of-eratosthenes', label: 'Sieve of Eratosthenes' },
        { id: 'count-primes-in-a-range', label: 'Count Primes in a Range [L, R]' },
        { id: 'smallest-prime-factor-sieve', label: 'Smallest Prime Factor Sieve' },
        { id: 'prime-factorization-using-spf', label: 'Prime Factorization Using SPF' },
      ] },
      { key: 'dsa-sheets', label: 'DSA Sheets', mediumLabel: 'DSA Sheets', shortLabel: 'Sheets', Content: DsaSheets, children: [
        { id: 'strivers-180', label: "Striver's 180 Master DSA Patterns" },
        { id: 'strivers-a2z', label: "Striver's A2Z DSA Sheet" },
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

function NotesView() {
  const { subjectKey, topicKey, subtopicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Validate subject: if provided, must match; if omitted (root '/'), default to first subject
  const subject = subjectKey ? SUBJECTS.find((s) => s.key === subjectKey) : SUBJECTS[0];
  const isSubjectInvalid = Boolean(subjectKey && !subject);

  // Validate topic: if provided, must match within subject; if omitted, default to first topic
  const topic = subject
    ? (topicKey
        ? subject.children.find(
            (t) =>
              nodeKey(t) === topicKey ||
              (topicKey === 'maths' && nodeKey(t) === 'mathematics') ||
              (topicKey === 'sliding-window-and-2-pointers' && nodeKey(t) === 'sliding-window') ||
              (topicKey === 'sliding-window-2-pointers' && nodeKey(t) === 'sliding-window') ||
              (topicKey === 'stacks-queues' && nodeKey(t) === 'stacks-queues') ||
              (topicKey === 'stack-and-queues' && nodeKey(t) === 'stacks-queues') ||
              (topicKey === 'stack-and-queue' && nodeKey(t) === 'stacks-queues') ||
              (topicKey === 'stacks-and-queues' && nodeKey(t) === 'stacks-queues') ||
              (topicKey === 'stack-queue' && nodeKey(t) === 'stacks-queues')
          )
        : subject.children[0])
    : null;
  const isTopicInvalid = Boolean(topicKey && !topic);

  // Validate subtopic: if provided, must match within topic; if omitted, default to first subtopic
  const subtopic = topic
    ? (subtopicId ? topic.children.find((sub) => nodeKey(sub) === subtopicId) : topic.children[0])
    : null;
  const isSubtopicInvalid = Boolean(subtopicId && !subtopic);

  const isInvalid = isSubjectInvalid || isTopicInvalid || isSubtopicInvalid;

  const activeSubjectKey = subject?.key;
  const activeTopicKey = nodeKey(topic);
  const activeSubId = nodeKey(subtopic);

  const canonicalPath = isInvalid
    ? ''
    : getCanonicalPath(activeSubjectKey, activeTopicKey, activeSubId);

  // Keep browser URL canonical on load or if user lands on partial URL (e.g. /dsa or /)
  useEffect(() => {
    if (!isInvalid && canonicalPath && location.pathname !== canonicalPath) {
      navigate(canonicalPath, { replace: true });
    }
  }, [isInvalid, location.pathname, canonicalPath, navigate]);

  const heading = topic && subtopic ? `${topic.label} \u2014 ${subtopic.label}` : '';
  const ActiveContent = topic?.Content;

  /*
   * Only the ACTIVE TOPIC is mounted, not the whole subject.
   * The element is memoized on the component itself so that selecting a
   * subtopic hands React the identical element and it skips re-rendering the
   * content subtree entirely.
   */
  const content = useMemo(() => {
    if (!ActiveContent) return null;
    return <ActiveContent />;
  }, [ActiveContent]);

  // Sync document title with current page
  useEffect(() => {
    if (!isInvalid && heading) {
      document.title = `${heading} | Java Notes`;
    }
  }, [isInvalid, heading]);

  /*
   * Show/hide content sections based on the active subtopic. Runs as a layout
   * effect so the right section is visible before the browser paints; a plain
   * effect let the previous section paint first on every switch.
   */
  useLayoutEffect(() => {
    if (isInvalid) return;
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
  }, [isInvalid, ActiveContent, activeSubId]);

  if (isInvalid) {
    return <NotFound />;
  }

  return (
    <>
      <div className="nav-sticky">
        {/* Top bar: single compact row with subjects and topics */}
        <nav className="top-bar" aria-label="Subject and topic navigation">
          <div className="top-bar-inner">
            <div className="subject-tabs">
              {SUBJECTS.map((s) => {
                const isActive = s.key === activeSubjectKey;
                const defaultTopic = s.children[0];
                const defaultSub = defaultTopic.children[0];
                const to = isActive
                  ? canonicalPath
                  : getCanonicalPath(s.key, nodeKey(defaultTopic), nodeKey(defaultSub));
                return (
                  <Link
                    key={s.key}
                    to={to}
                    className={'subject-tab' + (isActive ? ' active' : '')}
                    aria-current={isActive ? 'true' : undefined}
                    title={s.label}
                  >
                    <span className="subject-tab-icon"><s.Icon /></span>
                    <span className="tab-label">
                      {s.mediumLabel || s.shortLabel ? (
                        <>
                          <span className="label-full">{s.label}</span>
                          {s.mediumLabel && <span className="label-medium">{s.mediumLabel}</span>}
                          {s.shortLabel && <span className="label-short">{s.shortLabel}</span>}
                        </>
                      ) : (
                        <span>{s.label}</span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>

            <span className="nav-divider" />

            <div className="topic-tabs">
              {subject.children.map((t) => {
                const key = nodeKey(t);
                const isActive = key === activeTopicKey;
                const defaultSub = t.children[0];
                const to = isActive
                  ? canonicalPath
                  : getCanonicalPath(subject.key, key, nodeKey(defaultSub));
                return (
                  <Link
                    key={key}
                    to={to}
                    className={'topic-tab' + (isActive ? ' active' : '')}
                    aria-current={isActive ? 'true' : undefined}
                    title={t.label}
                  >
                    <span className="tab-label">
                      {t.mediumLabel || t.shortLabel ? (
                        <>
                          <span className="label-full">{t.label}</span>
                          {t.mediumLabel && <span className="label-medium">{t.mediumLabel}</span>}
                          {t.shortLabel && <span className="label-short">{t.shortLabel}</span>}
                        </>
                      ) : (
                        <span>{t.label}</span>
                      )}
                    </span>
                  </Link>
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
            <span className="sub-sidebar-topic">{topic.label}</span>
          </div>

          <div className="sub-sidebar-list">
            {topic.children.map((sub, idx) => {
              const subId = nodeKey(sub);
              const isActive = subId === activeSubId;
              const to = getCanonicalPath(subject.key, activeTopicKey, subId);
              return (
                <Link
                  key={subId}
                  to={to}
                  className={'sub-tab' + (isActive ? ' active' : '')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="sub-tab-idx">{idx + 1}</span>
                  <span className="sub-tab-label">{sub.label}</span>
                </Link>
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NotesView />} />
      <Route path="/:subjectKey" element={<NotesView />} />
      <Route path="/:subjectKey/:topicKey" element={<NotesView />} />
      <Route path="/:subjectKey/:topicKey/:subtopicId" element={<NotesView />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
