import { useEffect, useRef, useState } from 'react';
import './App.css';
import Part1 from './sections/Part1.jsx';
import Part2 from './sections/Part2.jsx';
import Part3 from './sections/Part3.jsx';
import Part4 from './sections/Part4.jsx';
import Part5 from './sections/Part5.jsx';

const SUBJECTS = [
  {
    key: 'java',
    label: 'Java Notes',
    icon: '📘',
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
  const suppressSpy = useRef(false);

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
  }, []);

  useEffect(() => {
    const subject = SUBJECTS.find((s) => s.key === activeSubjectKey) ?? SUBJECTS[0];
    const flat = [];
    subject.topics.forEach((topic) => {
      topic.subs.forEach((sub) => flat.push({ topicKey: topic.key, subId: sub.id }));
    });
    const entries = flat
      .map((e) => ({ ...e, el: document.getElementById(e.subId) }))
      .filter((e) => e.el);

    const onScroll = () => {
      if (suppressSpy.current) return;
      const navEl = document.getElementById('topnav');
      const offset = (navEl ? navEl.offsetHeight : 0) + 24;
      const scrollY = window.scrollY + offset;
      let current = entries[0];
      for (const e of entries) {
        if (e.el.offsetTop <= scrollY) current = e;
      }
      if (current) {
        setActiveTopicKey((prev) => (prev === current.topicKey ? prev : current.topicKey));
        setActiveSubId((prev) => (prev === current.subId ? prev : current.subId));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeSubjectKey]);

  const scrollToSub = (subId) => {
    const el = document.getElementById(subId);
    if (!el) return;
    suppressSpy.current = true;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => { suppressSpy.current = false; }, 700);
  };

  const handleSelectTopic = (topic) => {
    setActiveTopicKey(topic.key);
    const firstSub = topic.subs[0];
    if (firstSub) {
      setActiveSubId(firstSub.id);
      scrollToSub(firstSub.id);
    }
  };

  const handleSelectSub = (sub, topic) => {
    setActiveTopicKey(topic.key);
    setActiveSubId(sub.id);
    scrollToSub(sub.id);
  };

  const handleSelectSubject = (subject) => {
    setActiveSubjectKey(subject.key);
    const firstTopic = subject.topics[0];
    if (firstTopic) {
      setActiveTopicKey(firstTopic.key);
      const firstSub = firstTopic.subs[0];
      if (firstSub) {
        setActiveSubId(firstSub.id);
        scrollToSub(firstSub.id);
      }
    }
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
        <Part1 />
        <Part2 />
        <Part3 />
        <Part4 />
        <Part5 />
      </div>
    </>
  );
}
