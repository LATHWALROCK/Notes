import { useEffect } from 'react';
import './App.css';
import Part1 from './sections/Part1.jsx';
import Part2 from './sections/Part2.jsx';
import Part3 from './sections/Part3.jsx';
import Part4 from './sections/Part4.jsx';
import Part5 from './sections/Part5.jsx';

const NAV_LINKS = [
  { group: 'Part 1 — Core Java', links: [
    ['#part1-1', '1.1 Architecture & Compilation'],
    ['#part1-2', '1.2 Java Basics'],
    ['#part1-3', '1.3 Static Keyword'],
    ['#part1-4', '1.4 Data Types & Wrappers'],
    ['#part1-5', '1.5 Strings in Java'],
  ]},
  { group: 'Part 2 — OOP', links: [
    ['#part2-1', '2.1 Methods & Constructors'],
    ['#part2-2', '2.2 Inheritance & Polymorphism'],
    ['#part2-3', '2.3 Abstract Classes & Final'],
    ['#part2-4', '2.4 Interfaces'],
    ['#part2-5', '2.5 Inner Classes'],
  ]},
  { group: 'Part 3 — Exceptions & Concurrency', links: [
    ['#s3-1', '3.1 Exception Hierarchy'],
    ['#s3-2', '3.2 CPU & Process Architecture'],
    ['#s3-3', '3.3 Multitasking vs Multithreading'],
    ['#s3-4', '3.4 Java Threads — Creation'],
    ['#s3-5', '3.5 Thread Lifecycle & Methods'],
  ]},
  { group: 'Part 4 — Synchronization & Executors', links: [
    ['#s4-1', '4.1 Synchronization'],
    ['#s4-2', '4.2 Explicit Locks'],
    ['#s4-3', '4.3 Thread Communication'],
    ['#s4-4', '4.4 Deadlocks & Liveness'],
    ['#s4-5', '4.5 Executors Framework'],
    ['#s4-6', '4.6 Concurrency Utilities'],
  ]},
  { group: 'Part 5 — Generics', links: [
    ['#s51', '5.1 Why Generics?'],
    ['#s52', '5.2 Generic Classes & Interfaces'],
    ['#s53', '5.3 Generic Methods'],
    ['#s54', '5.4 Bounded Type Params'],
    ['#s55', '5.5 Wildcards'],
    ['#s56', '5.6 Type Erasure'],
    ['#s57', '5.7 Static Members & Exceptions'],
    ['#s58', '5.8 Raw Types & Best Practices'],
  ]},
];

function Sidebar() {
  return (
    <div id="sidebar">
      <div className="sidebar-logo"><span>📘</span> Java Notes</div>
      {NAV_LINKS.map((group) => (
        <div className="nav-group" key={group.group}>
          <div className="part-label">{group.group}</div>
          {group.links.map(([href, label]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function App() {
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
    const navLinks = Array.from(document.querySelectorAll('#sidebar a'));
    const sections = navLinks
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    const onScroll = () => {
      const scrollY = window.scrollY + 80;
      let current = sections[0];
      for (const sec of sections) {
        if (sec.offsetTop <= scrollY) current = sec;
      }
      navLinks.forEach((a) => {
        const id = a.getAttribute('href').replace('#', '');
        a.classList.toggle('active', current && current.id === id);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div id="progress-bar" />
      <Sidebar />
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
