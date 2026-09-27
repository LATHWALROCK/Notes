import { useEffect, useState } from 'react';
import {
  BookIcon,
  LayersIcon,
  TreeIcon,
  PanelExpandIcon,
  PanelCollapseIcon,
  ChevronDownIcon,
} from './components/Icons.jsx';
/*
 * Content files mirror the sidebar: one folder per subject, one file per topic,
 * named after the topic's `key` below. Each file emits the
 * `data-topic-boundary` markers for its own subtopics.
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

function JavaNotesContent() {
  return (
    <>
      <CoreJava />
      <Oop />
      <ExceptionsConcurrency />
      <SyncExecutors />
      <Generics />
    </>
  );
}

function JavaCollectionsContent() {
  return (
    <>
      <Lists />
      <Maps />
      <Sets />
      <Queues />
      <Java8Features />
    </>
  );
}

function DSAContent() {
  return (
    <>
      <BinaryTree />
      <BinarySearchTree />
      <DynamicProgramming />
    </>
  );
}

/*
 * Each subject holds a tree of nav nodes in `children`, and the sidebar renders
 * that tree recursively. An internal node is `{ key, label, children }`;
 * a leaf is `{ id, label }`, where `id` matches a `data-topic-boundary` marker in
 * the content. The renderer handles any depth; all three subjects currently use
 * two levels below the subject (topic -> subtopic).
 */
const SUBJECTS = [
  {
    key: 'java',
    label: 'Java Notes',
    Icon: BookIcon,
    Content: JavaNotesContent,
    children: [
      { key: 'core-java', label: 'Core Java', children: [
        { id: 'part1-1', label: 'Architecture & Compilation' },
        { id: 'part1-2', label: 'Java Basics' },
        { id: 'part1-3', label: 'Static Keyword' },
        { id: 'part1-4', label: 'Data Types & Wrappers' },
        { id: 'part1-5', label: 'Strings in Java' },
      ] },
      { key: 'oop', label: 'OOP', children: [
        { id: 'part2-1', label: 'Methods & Constructors' },
        { id: 'part2-2', label: 'Inheritance & Polymorphism' },
        { id: 'part2-3', label: 'Abstract Classes & Final' },
        { id: 'part2-4', label: 'Interfaces' },
        { id: 'part2-5', label: 'Inner Classes' },
      ] },
      { key: 'exceptions-concurrency', label: 'Exceptions & Concurrency', children: [
        { id: 's3-1', label: 'Exception Hierarchy' },
        { id: 's3-2', label: 'CPU & Process Architecture' },
        { id: 's3-3', label: 'Multitasking vs Multithreading' },
        { id: 's3-4', label: 'Java Threads — Creation' },
        { id: 's3-5', label: 'Thread Lifecycle & Methods' },
      ] },
      { key: 'sync-executors', label: 'Synchronization & Executors', children: [
        { id: 's4-1', label: 'Synchronization' },
        { id: 's4-2', label: 'Explicit Locks' },
        { id: 's4-3', label: 'Thread Communication' },
        { id: 's4-4', label: 'Deadlocks & Liveness' },
        { id: 's4-5', label: 'Executors Framework' },
        { id: 's4-6', label: 'Concurrency Utilities' },
      ] },
      { key: 'generics', label: 'Generics', children: [
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
    Content: JavaCollectionsContent,
    children: [
      { key: 'lists', label: 'Lists', children: [
        { id: 's1-1', label: 'Collection Framework Overview' },
        { id: 's1-2', label: 'Collection Interface' },
        { id: 's1-3', label: 'ArrayList' },
        { id: 's14', label: 'LinkedList' },
        { id: 's15', label: 'Vector' },
        { id: 's16', label: 'Stack' },
        { id: 's17', label: 'CopyOnWriteArrayList' },
      ] },
      { key: 'maps', label: 'Maps', children: [
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
      { key: 'sets', label: 'Sets', children: [
        { id: 'part3', label: 'Set Interface' },
        { id: 's3-2', label: 'HashSet' },
        { id: 's3-3', label: 'LinkedHashSet' },
        { id: 's3-4', label: 'TreeSet' },
        { id: 's3-5', label: 'EnumSet, CopyOnWriteArraySet & ConcurrentSkipListSet' },
      ] },
      { key: 'queues', label: 'Queues & Deques', children: [
        { id: 'part4', label: 'Queue Interface' },
        { id: 's4-2', label: 'PriorityQueue' },
        { id: 's4-3', label: 'Deque Interface & ArrayDeque' },
        { id: 's4-4', label: 'BlockingQueue & Variants' },
        { id: 's4-5', label: 'ConcurrentLinkedQueue, ConcurrentLinkedDeque & Iterable/Iterator' },
      ] },
      { key: 'java8', label: 'Java 8 Features', children: [
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
    Content: DSAContent,
    children: [
      { key: 'binary-tree', label: 'Binary Tree', children: [
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
      { key: 'bst', label: 'Binary Search Tree', children: [
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
      { key: 'dynamic-programming', label: 'Dynamic Programming', children: [
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
        { id: 'dp3-1', label: 'Ninja’s Training' },
        { id: 'dp3-2', label: 'Grid Unique Paths' },
        { id: 'dp3-3', label: 'Grid Unique Paths II — Obstacles' },
        { id: 'dp3-4', label: 'Minimum Path Sum in a Grid' },
        { id: 'dp3-5', label: 'Minimum Path Sum in a Triangle' },
        { id: 'dp3-6', label: 'Minimum / Maximum Falling Path Sum' },
        { id: 'dp3-7', label: 'Cherry Pickup II — 3D DP' },
        /* DP on subsequences — subset sums */
        { id: 'dp4-1', label: 'Subset Sum Equal to Target' },
        { id: 'dp4-2', label: 'Partition Equal Subset Sum' },
        { id: 'dp4-3', label: 'Minimum Subset Sum Difference' },
        { id: 'dp4-4', label: 'Count Subsets with Sum K' },
        { id: 'dp4-5', label: 'Count Partitions with Given Difference' },
        /* Knapsack variants */
        { id: 'dp5-1', label: '0/1 Knapsack' },
        { id: 'dp5-2', label: 'Minimum Coins' },
        { id: 'dp5-3', label: 'Target Sum' },
        { id: 'dp5-4', label: 'Coin Change II — Count Ways' },
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
        /* Partition DP — the MCM pattern */
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
    ],
  },
];

const MOBILE = '(max-width: 900px)';

function isMobile() {
  return window.matchMedia(MOBILE).matches;
}

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

/*
 * One nav node, rendered recursively. Grouping levels only open and close —
 * `expandedPath` holds at most one open key per level, so opening a node closes
 * its siblings and anything nested below them, and clicking the open node closes
 * it. Selection is separate: only leaves change the visible content.
 */
/*
 * Shared Tailwind class strings for the sidebar. They live here rather than
 * inline so the markup below stays readable and the states stay consistent.
 * `LIST` also undoes the base list styling, which the notes content needs but
 * the nav does not.
 */
const LIST = 'list-none m-0 p-0 [&>li]:mb-0';

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-focus';

const ROW =
  'flex w-full items-start gap-2.5 rounded-lg px-2.5 py-[9px] text-left text-[.85rem] ' +
  'leading-[1.45] font-semibold cursor-pointer transition-colors hover:bg-nav-hover ' +
  FOCUS + ' focus-visible:outline-offset-[-2px]';

const PILL =
  'flex max-w-full items-start rounded-full border px-3 py-1.5 text-left text-[.78rem] ' +
  'leading-[1.4] font-medium cursor-pointer transition-colors ' +
  FOCUS + ' focus-visible:outline-offset-[-2px]';

const ICON_BTN =
  'inline-flex shrink-0 items-center justify-center size-[34px] rounded-[9px] text-ink-muted ' +
  'cursor-pointer transition-colors hover:bg-nav-hover hover:text-ink [&_svg]:size-[18px] ' +
  FOCUS + ' focus-visible:outline-offset-1';

/* Same glyph size as the expanded sidebar, so collapsing changes the button
   and never the icon. */
const RAIL_BTN =
  'inline-flex shrink-0 items-center justify-center size-11 rounded-[13px] cursor-pointer ' +
  'transition-colors hover:bg-nav-hover hover:text-ink [&_svg]:size-[18px] ' +
  'max-nav:size-10 max-nav:rounded-[11px] ' +
  FOCUS + ' focus-visible:outline-offset-1';

function SidebarNode({ node, level, expandedPath, activeSubId, onToggle, onSelect }) {
  const key = nodeKey(node);

  if (!node.children?.length) {
    const isActive = node.id === activeSubId;
    return (
      <li className="flex max-w-full">
        <button
          type="button"
          className={
            PILL +
            (isActive
              ? ' bg-nav-active border-line-strong text-white font-semibold'
              : ' border-line text-ink-muted hover:bg-nav-hover hover:border-line-strong hover:text-ink')
          }
          aria-current={isActive ? 'page' : undefined}
          onClick={() => onSelect(level, node)}
        >
          {node.label}
        </button>
      </li>
    );
  }

  const isOpen = expandedPath[level] === key;
  return (
    <li>
      <button
        type="button"
        className={ROW + (isOpen ? ' text-white' : ' text-ink')}
        aria-expanded={isOpen}
        onClick={() => onToggle(level, node)}
      >
        <span className="flex-1 min-w-0">{node.label}</span>
        <span
          className={
            'shrink-0 size-4 mt-0.5 transition-transform [&_svg]:size-full ' +
            (isOpen ? 'rotate-0' : '-rotate-90')
          }
        >
          <ChevronDownIcon />
        </span>
      </button>
      {isOpen && (
        /* Subtopics are a wrapping row of pills — no guide line, no full-width rows. */
        <ul className={LIST + ' flex flex-wrap gap-1.5 mt-1.5 mb-2.5 ml-2.5'}>
          {node.children.map((child) => (
            <SidebarNode
              key={nodeKey(child)}
              node={child}
              level={level + 1}
              expandedPath={expandedPath}
              activeSubId={activeSubId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/*
 * The sidebar is a floating rounded card in both states. Expanded it shows the
 * full tree; collapsed it narrows to a rail of subject icons, so navigation is
 * always reachable and no separate floating toggle button is needed.
 */
function Sidebar({
  activeSubject,
  expandedPath,
  activeSubId,
  open,
  onToggleSidebar,
  onToggleGroup,
  onSelectLeaf,
  onSelectSubject,
}) {
  return (
    <nav
      aria-label="Notes navigation"
      className={
        'fixed z-[200] flex flex-col overflow-hidden rounded-[18px] border border-line bg-card ' +
        'top-gutter left-gutter h-[calc(100vh-28px)] transition-[width] duration-200 ease-out ' +
        'max-nav:top-gutter-sm max-nav:left-gutter-sm max-nav:h-[calc(100vh-16px)] ' +
        (open
          ? 'w-panel max-nav:shadow-[0_8px_40px_rgba(0,0,0,0.55)]'
          : 'w-rail max-nav:w-rail-sm')
      }
    >
      {open ? (
        <>
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-line py-3.5 pl-5 pr-3.5">
            <span className="text-[.95rem] font-bold text-ink">Menu</span>
            <button
              type="button"
              className={ICON_BTN}
              onClick={onToggleSidebar}
              aria-label="Collapse navigation"
              aria-expanded="true"
            >
              <PanelCollapseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain pb-4">
            <ul className={LIST + ' p-2 border-b border-line'}>
              {SUBJECTS.map((s) => {
                const isActive = s.key === activeSubject.key;
                return (
                  <li key={s.key}>
                    <button
                      type="button"
                      className={ROW + (isActive ? ' bg-nav-active text-white' : ' text-ink')}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => onSelectSubject(s)}
                    >
                      <span
                        className={
                          'flex shrink-0 items-center justify-center size-5 mt-px [&_svg]:size-[18px] ' +
                          (isActive ? 'text-white' : 'text-ink-muted')
                        }
                      >
                        <s.Icon />
                      </span>
                      <span className="flex-1 min-w-0">{s.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <ul className={LIST + ' p-2'}>
              {activeSubject.children.map((node) => (
                <SidebarNode
                  key={nodeKey(node)}
                  node={node}
                  level={0}
                  expandedPath={expandedPath}
                  activeSubId={activeSubId}
                  onToggle={onToggleGroup}
                  onSelect={onSelectLeaf}
                />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-1.5 py-3.5">
          <button
            type="button"
            className={ICON_BTN}
            onClick={onToggleSidebar}
            aria-label="Expand navigation"
            aria-expanded="false"
          >
            <PanelExpandIcon />
          </button>
          <span className="mt-1 mb-2 h-px w-8 bg-line" />
          {SUBJECTS.map((s) => {
            const isActive = s.key === activeSubject.key;
            return (
              <button
                key={s.key}
                type="button"
                className={RAIL_BTN + (isActive ? ' bg-nav-active text-white' : ' text-ink-muted')}
                title={s.label}
                aria-label={s.label}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => onSelectSubject(s)}
              >
                <s.Icon />
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}

export default function App() {
  const [activeSubjectKey, setActiveSubjectKey] = useState(SUBJECTS[0].key);
  const [activePath, setActivePath] = useState(() => firstPath(SUBJECTS[0]));
  const [expandedPath, setExpandedPath] = useState(() => firstPath(SUBJECTS[0]).slice(0, -1));
  const [sidebarOpen, setSidebarOpen] = useState(() => !isMobile());

  const activeSubject = SUBJECTS.find((s) => s.key === activeSubjectKey) ?? SUBJECTS[0];
  const activeNodes = resolvePath(activeSubject, activePath);
  const activeSubId = activeNodes[activeNodes.length - 1].id;
  const heading = activeNodes.slice(-2).map((n) => n.label).join(' — ');
  const ActiveContent = activeSubject.Content;
  /* Both the content column and the progress bar clear the sidebar: the rail
     width when collapsed, the panel width when open. These have to be whole
     literal class names — Tailwind scans source text, so a string built like
     `ml-${x}-gap` would never be generated. */
  const mainOffset = sidebarOpen ? 'ml-panel-gap' : 'ml-rail-gap';
  const barOffset = sidebarOpen ? 'left-panel-gap' : 'left-rail-gap';

  useEffect(() => {
    const bar = document.getElementById('progress-bar');
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = 'scaleX(' + (total > 0 ? scrolled / total : 0) + ')';
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeSubjectKey, activeSubId]);

  useEffect(() => {
    const mainEl = document.getElementById('main');
    if (!mainEl) return;
    const children = Array.from(mainEl.children);
    const markers = [];
    children.forEach((el, i) => {
      if (el.dataset && el.dataset.topicBoundary) markers.push({ id: el.id, index: i });
    });
    markers.forEach((m, mi) => {
      const start = m.index;
      const end = mi + 1 < markers.length ? markers[mi + 1].index : children.length;
      const visible = m.id === activeSubId;
      for (let i = start; i < end; i++) {
        children[i].style.display = visible ? '' : 'none';
      }
    });
    window.scrollTo(0, 0);
  }, [activeSubjectKey, activeSubId]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isMobile()) setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  /*
   * Accordion: re-clicking the open node at this level closes it (and everything
   * nested below), otherwise open it and drop any sibling branch that was open.
   */
  const handleToggleGroup = (level, node) => {
    const key = nodeKey(node);
    setExpandedPath((prev) =>
      prev[level] === key ? prev.slice(0, level) : [...prev.slice(0, level), key],
    );
  };

  /* A visible leaf's ancestors are exactly the open branch above it. */
  const handleSelectLeaf = (level, node) => {
    setActivePath([...expandedPath.slice(0, level), nodeKey(node)]);
    if (isMobile()) setSidebarOpen(false);
  };

  const handleSelectSubject = (subject) => {
    setSidebarOpen(true); // a click on the collapsed rail also opens the tree
    if (subject.key === activeSubjectKey) return;
    const path = firstPath(subject);
    setActiveSubjectKey(subject.key);
    setActivePath(path);
    setExpandedPath(path.slice(0, -1));
  };

  return (
    <>
      <div
        id="progress-bar"
        className={`progress-bar ${barOffset} max-nav:left-rail-gap-sm`}
      />

      <Sidebar
        activeSubject={activeSubject}
        expandedPath={expandedPath}
        activeSubId={activeSubId}
        open={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onToggleGroup={handleToggleGroup}
        onSelectLeaf={handleSelectLeaf}
        onSelectSubject={handleSelectSubject}
      />

      {/* Only ever visible below the nav breakpoint, where the panel overlays. */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[150] hidden bg-black/60 max-nav:block"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        id="main"
        className={
          `px-12 py-10 transition-[margin] duration-200 ease-out ${mainOffset} ` +
          'max-nav:ml-rail-gap-sm max-nav:px-5 max-nav:py-6'
        }
      >
        <h1 className="content-heading">{heading}</h1>
        <ActiveContent />
      </div>
    </>
  );
}
