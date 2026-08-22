import { useEffect, useState } from 'react';
import './App.css';
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

const SUBJECTS = [
  {
    key: 'java',
    label: 'Java Notes',
    icon: '📘',
    Content: JavaNotesContent,
    topics: [
      { key: 'core-java', label: 'Core Java', subs: [
        { id: 'part1-1', label: 'Architecture & Compilation' },
        { id: 'part1-2', label: 'Java Basics' },
        { id: 'part1-3', label: 'Static Keyword' },
        { id: 'part1-4', label: 'Data Types & Wrappers' },
        { id: 'part1-5', label: 'Strings in Java' },
      ] },
      { key: 'oop', label: 'OOP', subs: [
        { id: 'part2-1', label: 'Methods & Constructors' },
        { id: 'part2-2', label: 'Inheritance & Polymorphism' },
        { id: 'part2-3', label: 'Abstract Classes & Final' },
        { id: 'part2-4', label: 'Interfaces' },
        { id: 'part2-5', label: 'Inner Classes' },
      ] },
      { key: 'exceptions-concurrency', label: 'Exceptions & Concurrency', subs: [
        { id: 's3-1', label: 'Exception Hierarchy' },
        { id: 's3-2', label: 'CPU & Process Architecture' },
        { id: 's3-3', label: 'Multitasking vs Multithreading' },
        { id: 's3-4', label: 'Java Threads — Creation' },
        { id: 's3-5', label: 'Thread Lifecycle & Methods' },
      ] },
      { key: 'sync-executors', label: 'Synchronization & Executors', subs: [
        { id: 's4-1', label: 'Synchronization' },
        { id: 's4-2', label: 'Explicit Locks' },
        { id: 's4-3', label: 'Thread Communication' },
        { id: 's4-4', label: 'Deadlocks & Liveness' },
        { id: 's4-5', label: 'Executors Framework' },
        { id: 's4-6', label: 'Concurrency Utilities' },
      ] },
      { key: 'generics', label: 'Generics', subs: [
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
    icon: '🗂️',
    Content: JavaCollectionsContent,
    topics: [
      { key: 'lists', label: 'Lists', subs: [
        { id: 's1-1', label: 'Collection Framework Overview' },
        { id: 's1-2', label: 'Collection Interface' },
        { id: 's1-3', label: 'ArrayList' },
        { id: 's14', label: 'LinkedList' },
        { id: 's15', label: 'Vector' },
        { id: 's16', label: 'Stack' },
        { id: 's17', label: 'CopyOnWriteArrayList' },
      ] },
      { key: 'maps', label: 'Maps', subs: [
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
      { key: 'sets', label: 'Sets', subs: [
        { id: 'part3', label: 'Set Interface' },
        { id: 's3-2', label: 'HashSet' },
        { id: 's3-3', label: 'LinkedHashSet' },
        { id: 's3-4', label: 'TreeSet' },
        { id: 's3-5', label: 'EnumSet, CopyOnWriteArraySet & ConcurrentSkipListSet' },
      ] },
      { key: 'queues', label: 'Queues & Deques', subs: [
        { id: 'part4', label: 'Queue Interface' },
        { id: 's4-2', label: 'PriorityQueue' },
        { id: 's4-3', label: 'Deque Interface & ArrayDeque' },
        { id: 's4-4', label: 'BlockingQueue & Variants' },
        { id: 's4-5', label: 'ConcurrentLinkedQueue, ConcurrentLinkedDeque & Iterable/Iterator' },
      ] },
      { key: 'java8', label: 'Java 8 Features', subs: [
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
];

function TopNav({ activeSubjectKey, activeTopicKey, activeSubId, onSelectSubject, onSelectTopic, onSelectSub }) {
  const activeSubject = SUBJECTS.find((s) => s.key === activeSubjectKey) ?? SUBJECTS[0];
  const activeTopic = activeSubject.topics.find((t) => t.key === activeTopicKey) ?? activeSubject.topics[0];

  return (
    <div id="topnav">
      <div className="nav-row nav-row-subjects">
        {SUBJECTS.map((s) => (
          <button
            key={s.key}
            className={'nav-pill nav-pill-subject' + (s.key === activeSubject.key ? ' active' : '')}
            onClick={() => onSelectSubject(s)}
          >
            <span>{s.icon}</span> {s.label}
          </button>
        ))}
      </div>
      <div className="nav-row nav-row-topics">
        {activeSubject.topics.map((t) => (
          <button
            key={t.key}
            className={'nav-pill' + (t.key === activeTopic.key ? ' active' : '')}
            onClick={() => onSelectTopic(t)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="nav-row nav-row-subs">
        {activeTopic.subs.map((sub) => (
          <button
            key={sub.id}
            className={'nav-pill nav-pill-sub' + (sub.id === activeSubId ? ' active' : '')}
            onClick={() => onSelectSub(sub, activeTopic)}
          >
            {sub.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeSubjectKey, setActiveSubjectKey] = useState(SUBJECTS[0].key);
  const [activeTopicKey, setActiveTopicKey] = useState(SUBJECTS[0].topics[0].key);
  const [activeSubId, setActiveSubId] = useState(SUBJECTS[0].topics[0].subs[0].id);

  const activeSubject = SUBJECTS.find((s) => s.key === activeSubjectKey) ?? SUBJECTS[0];
  const activeTopic = activeSubject.topics.find((t) => t.key === activeTopicKey) ?? activeSubject.topics[0];
  const activeSub = activeTopic.subs.find((s) => s.id === activeSubId) ?? activeTopic.subs[0];
  const ActiveContent = activeSubject.Content;

  useEffect(() => {
    const bar = document.getElementById('progress-bar');
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
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

  const handleSelectTopic = (topic) => {
    setActiveTopicKey(topic.key);
    const firstSub = topic.subs[0];
    if (firstSub) setActiveSubId(firstSub.id);
  };

  const handleSelectSub = (sub, topic) => {
    setActiveTopicKey(topic.key);
    setActiveSubId(sub.id);
  };

  const handleSelectSubject = (subject) => {
    if (subject.key === activeSubjectKey) return;
    setActiveSubjectKey(subject.key);
    const firstTopic = subject.topics[0];
    setActiveTopicKey(firstTopic.key);
    setActiveSubId(firstTopic.subs[0].id);
  };

  return (
    <>
      <div id="progress-bar" />
      <TopNav
        activeSubjectKey={activeSubjectKey}
        activeTopicKey={activeTopicKey}
        activeSubId={activeSubId}
        onSelectSubject={handleSelectSubject}
        onSelectTopic={handleSelectTopic}
        onSelectSub={handleSelectSub}
      />
      <div id="main">
        <h1 className="content-heading">{activeTopic.label} — {activeSub.label}</h1>
        <ActiveContent />
      </div>
    </>
  );
}
