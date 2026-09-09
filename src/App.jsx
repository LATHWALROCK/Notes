import { useEffect, useState } from 'react';
import './App.css';
import {
  BookIcon,
  LayersIcon,
  TreeIcon,
  PanelExpandIcon,
  PanelCollapseIcon,
  ChevronDownIcon,
} from './components/Icons.jsx';
import JavaPart1 from './sections/Part1.jsx';
import JavaPart2 from './sections/Part2.jsx';
import JavaPart3 from './sections/Part3.jsx';
import JavaPart4 from './sections/Part4.jsx';
import JavaPart5 from './sections/Part5.jsx';
import JCFPart1 from './subjects/collections/Part1.jsx';
import JCFPart2 from './subjects/collections/Part2.jsx';
import JCFPart3 from './subjects/collections/Part3.jsx';
import JCFPart4 from './subjects/collections/Part4.jsx';
import JCFPart5 from './subjects/collections/Part5.jsx';
import DSAPart1 from './subjects/dsa/Part1.jsx';
import DSAPart2 from './subjects/dsa/Part2.jsx';
import DSAPart3 from './subjects/dsa/Part3.jsx';
import DSAPart4 from './subjects/dsa/Part4.jsx';
import DSAPart5 from './subjects/dsa/Part5.jsx';
import DSAPart6 from './subjects/dsa/Part6.jsx';
import DSAPart7 from './subjects/dsa/Part7.jsx';
import DSAPart8 from './subjects/dsa/Part8.jsx';
import DSAPart9 from './subjects/dsa/Part9.jsx';

function JavaNotesContent() {
  return (
    <>
      <JavaPart1 />
      <JavaPart2 />
      <JavaPart3 />
      <JavaPart4 />
      <JavaPart5 />
    </>
  );
}

function JavaCollectionsContent() {
  return (
    <>
      <JCFPart1 />
      <JCFPart2 />
      <JCFPart3 />
      <JCFPart4 />
      <JCFPart5 />
    </>
  );
}

function DSAContent() {
  return (
    <>
      <DSAPart1 />
      <DSAPart2 />
      <DSAPart3 />
      <DSAPart4 />
      <DSAPart5 />
      <DSAPart6 />
      <DSAPart7 />
      <DSAPart8 />
      <DSAPart9 />
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
        { id: 's9-5', label: 'Complexity Cheat Sheet' },
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
function SidebarNode({ node, level, expandedPath, activeSubId, onToggle, onSelect }) {
  const key = nodeKey(node);

  if (!node.children?.length) {
    const isActive = node.id === activeSubId;
    return (
      <li>
        <button
          type="button"
          className={'side-item side-leaf' + (isActive ? ' active' : '')}
          aria-current={isActive ? 'page' : undefined}
          onClick={() => onSelect(level, node)}
        >
          <span className="side-label">{node.label}</span>
        </button>
      </li>
    );
  }

  const isOpen = expandedPath[level] === key;
  return (
    <li>
      <button
        type="button"
        className={'side-item side-group' + (isOpen ? ' open' : '')}
        aria-expanded={isOpen}
        onClick={() => onToggle(level, node)}
      >
        <span className="side-label">{node.label}</span>
        <span className="side-chevron"><ChevronDownIcon /></span>
      </button>
      {isOpen && (
        <ul className="side-list">
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
      id="sidebar"
      className={open ? 'open' : undefined}
      aria-label="Notes navigation"
    >
      {open ? (
        <>
          <div className="side-header">
            <span className="side-title">Menu</span>
            <button
              type="button"
              className="side-icon-btn"
              onClick={onToggleSidebar}
              aria-label="Collapse navigation"
              aria-expanded="true"
            >
              <PanelCollapseIcon />
            </button>
          </div>

          <div className="side-scroll">
            <ul className="side-list side-subjects">
              {SUBJECTS.map((s) => (
                <li key={s.key}>
                  <button
                    type="button"
                    className={'side-item side-subject' + (s.key === activeSubject.key ? ' active' : '')}
                    aria-current={s.key === activeSubject.key ? 'true' : undefined}
                    onClick={() => onSelectSubject(s)}
                  >
                    <span className="side-icon"><s.Icon /></span>
                    <span className="side-label">{s.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <ul className="side-list side-tree">
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
        <div className="side-rail">
          <button
            type="button"
            className="side-icon-btn"
            onClick={onToggleSidebar}
            aria-label="Expand navigation"
            aria-expanded="false"
          >
            <PanelExpandIcon />
          </button>
          <span className="side-rail-sep" />
          {SUBJECTS.map((s) => (
            <button
              key={s.key}
              type="button"
              className={'side-rail-btn' + (s.key === activeSubject.key ? ' active' : '')}
              title={s.label}
              aria-label={s.label}
              aria-current={s.key === activeSubject.key ? 'true' : undefined}
              onClick={() => onSelectSubject(s)}
            >
              <s.Icon />
            </button>
          ))}
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
  const shift = sidebarOpen ? ' nav-shift' : '';

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
      <div id="progress-bar" className={shift.trim() || undefined} />

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

      {sidebarOpen && <div id="nav-backdrop" onClick={() => setSidebarOpen(false)} />}

      <div id="main" className={shift.trim() || undefined}>
        <h1 className="content-heading">{heading}</h1>
        <ActiveContent />
      </div>
    </>
  );
}
