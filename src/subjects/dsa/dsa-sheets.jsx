import { useState, useMemo, useCallback, useRef } from 'react';
import { DSA_SHEETS } from './sheets/registry.js';
import { useDsaStorage, encodeSyncPayload } from './sheets/useDsaStorage.js';
import { getArticleUrl } from './sheets/article-map.js';

/* ── SVG Icons ────────────────────────────────────────────────────────── */

function ArticleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

function LeetCodeLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill="#FFA116"
        d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.959-.002l-2.394 2.392c-.997.997-2.73 1.01-3.753.027l-.039-.038-4.277-4.193a3.57 3.57 0 0 1-.795-1.135 3.69 3.69 0 0 1-.222-.647 3.593 3.593 0 0 1-.038-1.53c.02-.178.06-.355.12-.527a3.475 3.475 0 0 1 .78-1.356l3.853-4.125 5.406-5.788a1.378 1.378 0 0 0-.988-2.302z"
      />
      <path
        fill="#CBD5E1"
        d="M19.98 5.325a1.374 1.374 0 0 0-.986.417L11.4 13.34a1.375 1.375 0 0 0 0 1.944 1.375 1.375 0 0 0 1.945 0l7.594-7.598a1.375 1.375 0 0 0-.96-2.361z"
      />
    </svg>
  );
}

function GfgLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill="#2F8D46"
        d="M5.665 5.823c-.667 0-1.247.08-1.741.241-.495.161-.93.356-1.308.583l-.342-.566h-.666l-.075 4.132h.683a11.2 11.2 0 0 1 .433-1.341c.172-.445.394-.842.666-1.192a3.02 3.02 0 0 1 1-.833c.389-.21.855-.316 1.4-.316.594 0 1.124.122 1.59.366.467.24.873.597 1.217 1.075.339.461.6 1.036.783 1.724.184.69.275 1.458.275 2.308 0 .192-.006.38-.017.567H0v.608c.133.016.314.044.541.083.222.033.403.083.542.15a.748.748 0 0 1 .358.358c.067.15.1.328.1.534v.916c0 .666-.003 1.116-.008 1.35a22.14 22.14 0 0 1-.033.574 12.57 12.57 0 0 0 2.207.767 9.138 9.138 0 0 0 2.158.266c.755 0 1.483-.141 2.183-.425a5.46 5.46 0 0 0 1.832-1.208 5.815 5.815 0 0 0 1.258-1.924 6.09 6.09 0 0 0 .389-1.441h.946c.075.511.204.992.389 1.44.31.756.73 1.398 1.258 1.925a5.46 5.46 0 0 0 1.833 1.208c.7.284 1.427.425 2.182.425.705 0 1.425-.089 2.158-.266a12.57 12.57 0 0 0 2.208-.767c-.012-.15-.023-.341-.034-.575a66.751 66.751 0 0 1-.008-1.35v-.915c0-.206.033-.384.1-.534a.748.748 0 0 1 .358-.358c.14-.067.32-.117.542-.15.228-.039.408-.067.541-.083v-.608h-9.563a9.108 9.108 0 0 1-.017-.567z"
      />
    </svg>
  );
}

function MedalRibbonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <circle cx="12" cy="9" r="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="4" fill="#f1f5f9" />
      <path d="M9 14.5 7 21l5-2.5 5 2.5-2-6.5" fill="#94a3b8" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
        transition: 'transform 0.18s ease',
      }}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ── Difficulty Helper ─────────────────────────────────────────────────── */

const DIFFICULTY_RANKS = {
  basic: 1,
  easy: 2,
  medium: 3,
  hard: 4,
};

function getProblemDifficulty(problem) {
  const lcNorm = (problem.difficultyLC || '').toLowerCase().trim();
  const gfgNorm = (problem.difficultyGFG || '').toLowerCase().trim();

  const rankLc = DIFFICULTY_RANKS[lcNorm] || 0;
  const rankGfg = DIFFICULTY_RANKS[gfgNorm] || 0;

  const highest = Math.max(rankLc, rankGfg);

  if (highest >= 4) {
    return {
      tier: 'Pro',
      className: 'diff-pro',
      tooltip: `Pro (Hard) — LC: ${problem.difficultyLC || '—'}, GFG: ${problem.difficultyGFG || '—'}`,
    };
  }
  if (highest === 3) {
    return {
      tier: 'Core',
      className: 'diff-core',
      tooltip: `Core (Medium) — LC: ${problem.difficultyLC || '—'}, GFG: ${problem.difficultyGFG || '—'}`,
    };
  }
  return {
    tier: 'Basic',
    className: 'diff-basic',
    tooltip: `Basic (Easy) — LC: ${problem.difficultyLC || '—'}, GFG: ${problem.difficultyGFG || '—'}`,
  };
}

function SyncIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
    </svg>
  );
}

function SyncModal({ isOpen, onClose, completedMap, onImport }) {
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const isLocal = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  );

  const payload = encodeSyncPayload(completedMap);
  const liveTargetUrl = `https://notes-sooty-nu-49.vercel.app/dsa/dsa-sheets/strivers-180#sync=${payload}`;
  const localTargetUrl = `http://localhost:5173/dsa/dsa-sheets/strivers-180#sync=${payload}`;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(completedMap, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `dsa-progress-${new Date().toISOString().slice(0, 10)}.json`);
    dl.click();
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (typeof json === 'object' && json !== null) {
          onImport(json);
          onClose();
        }
      } catch {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="dsa-modal-backdrop" onClick={onClose}>
      <div className="dsa-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="dsa-modal-header">
          <div className="dsa-modal-title-wrap">
            <SyncIcon />
            <h3 className="dsa-modal-title">Sync DSA Progress</h3>
          </div>
          <button type="button" className="dsa-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <p className="dsa-modal-desc">
          Because of browser security (Same-Origin Policy), <code>localStorage</code> is isolated per website domain.
          Use the 1-click options below to sync your progress between <strong>localhost</strong> and <strong>notes-sooty-nu-49.vercel.app</strong>.
        </p>

        <div className="dsa-modal-actions">
          {isLocal ? (
            <div className="dsa-sync-card-block">
              <span className="dsa-sync-block-title">Sync to Live Website</span>
              <p className="dsa-sync-block-sub">Open the live Vercel website in a new tab with your current progress imported:</p>
              <div className="dsa-sync-btn-row">
                <a
                  href={liveTargetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dsa-btn-primary"
                  onClick={onClose}
                >
                  🚀 Open Live Website with Progress
                </a>
                <button
                  type="button"
                  className="dsa-btn-secondary"
                  onClick={() => copyToClipboard(liveTargetUrl)}
                >
                  {copied ? '✓ Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          ) : (
            <div className="dsa-sync-card-block">
              <span className="dsa-sync-block-title">Sync to Localhost</span>
              <p className="dsa-sync-block-sub">Open your local dev server in a new tab with your current live progress imported:</p>
              <div className="dsa-sync-btn-row">
                <a
                  href={localTargetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dsa-btn-primary"
                  onClick={onClose}
                >
                  💻 Open Localhost with Progress
                </a>
                <button
                  type="button"
                  className="dsa-btn-secondary"
                  onClick={() => copyToClipboard(localTargetUrl)}
                >
                  {copied ? '✓ Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
          )}

          <div className="dsa-sync-card-block">
            <span className="dsa-sync-block-title">File Backup & Restore</span>
            <div className="dsa-sync-btn-row">
              <button
                type="button"
                className="dsa-btn-secondary"
                onClick={handleExportJson}
              >
                ⬇ Export JSON
              </button>
              <button
                type="button"
                className="dsa-btn-secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                ⬆ Import JSON
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                style={{ display: 'none' }}
                onChange={handleImportFile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Sheet View Component ────────────────────────────────────────── */

function SheetView({ sheet }) {
  const { completedMap, toggleCompleted, importMap, syncNotice } = useDsaStorage();
  const [showSyncModal, setShowSyncModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Expanded state for topics and patterns. By default, open first topic and its first pattern.
  const [expandedTopics, setExpandedTopics] = useState(() => ({
    [sheet.questions[0]?.topic || 'Arrays']: true,
  }));
  const [expandedPatterns, setExpandedPatterns] = useState(() => ({
    [`${sheet.questions[0]?.topic || 'Arrays'}::${sheet.questions[0]?.pattern || 'Linear Scan'}`]: true,
  }));

  // Group questions by Topic -> Pattern
  const topicGroups = useMemo(() => {
    const map = new Map();
    sheet.questions.forEach((q) => {
      const topicName = q.topic || 'General';
      const patternName = q.pattern || 'Standard';

      if (!map.has(topicName)) {
        map.set(topicName, new Map());
      }
      const patMap = map.get(topicName);
      if (!patMap.has(patternName)) {
        patMap.set(patternName, []);
      }
      patMap.get(patternName).push(q);
    });

    return Array.from(map.entries()).map(([topicName, patMap]) => {
      const patterns = Array.from(patMap.entries()).map(([patternName, questions]) => ({
        name: patternName,
        key: `${topicName}::${patternName}`,
        questions,
        total: questions.length,
      }));
      const total = patterns.reduce((sum, p) => sum + p.total, 0);
      return {
        name: topicName,
        patterns,
        total,
      };
    });
  }, [sheet.questions]);

  // Overall statistics & breakdown by tier
  const stats = useMemo(() => {
    let solvedCount = 0;
    let totalBasic = 0;
    let solvedBasic = 0;
    let totalCore = 0;
    let solvedCore = 0;
    let totalPro = 0;
    let solvedPro = 0;

    sheet.questions.forEach((q) => {
      const done = Boolean(completedMap[q.id]);
      if (done) solvedCount++;

      const diff = getProblemDifficulty(q);
      if (diff.tier === 'Basic') {
        totalBasic++;
        if (done) solvedBasic++;
      } else if (diff.tier === 'Core') {
        totalCore++;
        if (done) solvedCore++;
      } else if (diff.tier === 'Pro') {
        totalPro++;
        if (done) solvedPro++;
      }
    });

    const totalCount = sheet.questions.length;
    const percent = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

    return {
      totalCount,
      solvedCount,
      percent,
      totalBasic,
      solvedBasic,
      totalCore,
      solvedCore,
      totalPro,
      solvedPro,
    };
  }, [sheet.questions, completedMap]);

  // Filter questions based on search & filters
  const isQuestionVisible = useCallback((q) => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(term);
      const matchPattern = (q.pattern || '').toLowerCase().includes(term);
      const matchTopic = (q.topic || '').toLowerCase().includes(term);
      if (!matchTitle && !matchPattern && !matchTopic) return false;
    }

    if (selectedTier !== 'ALL') {
      const diff = getProblemDifficulty(q);
      if (diff.tier !== selectedTier) return false;
    }

    const done = Boolean(completedMap[q.id]);
    if (statusFilter === 'SOLVED' && !done) return false;
    if (statusFilter === 'UNSOLVED' && done) return false;

    return true;
  }, [searchTerm, selectedTier, statusFilter, completedMap]);

  const toggleTopic = (topicName) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicName]: !prev[topicName],
    }));
  };

  const togglePattern = (patternKey) => {
    setExpandedPatterns((prev) => ({
      ...prev,
      [patternKey]: !prev[patternKey],
    }));
  };

  const expandAll = () => {
    const nextTopics = {};
    const nextPatterns = {};
    topicGroups.forEach((tg) => {
      nextTopics[tg.name] = true;
      tg.patterns.forEach((p) => {
        nextPatterns[p.key] = true;
      });
    });
    setExpandedTopics(nextTopics);
    setExpandedPatterns(nextPatterns);
  };

  const collapseAll = () => {
    setExpandedTopics({});
    setExpandedPatterns({});
  };

  return (
    <div className="dsa-sheet-page">
      {/* ── Overall Progress Section (Matches Image 2) ────────────────── */}
      <section className="dsa-overall-section" aria-label="Overall Progress">
        <div className="dsa-overall-header">
          <h2 className="dsa-overall-title">Overall Progress</h2>
          <button
            type="button"
            className="dsa-share-btn"
            onClick={() => setShowSyncModal(true)}
            title="Sync progress between localhost and website"
          >
            <SyncIcon />
            <span>Sync</span>
          </button>
        </div>

        {syncNotice && (
          <div className="dsa-sync-banner">
            <span>✓ {syncNotice}</span>
          </div>
        )}

        <div className="dsa-overall-card">
          <div className="dsa-overall-top">
            <span className="dsa-overall-percent">{stats.percent} %</span>
            <span className="dsa-overall-fraction">
              {stats.solvedCount} / {stats.totalCount} problems solved
            </span>
          </div>

          <div className="dsa-main-progress-bar">
            <div
              className="dsa-main-progress-fill"
              style={{ width: `${stats.percent}%` }}
            />
            <div
              className="dsa-main-progress-medal"
              style={{
                left: `min(calc(${stats.percent}% - 2px), calc(100% - 14px))`,
              }}
            >
              <MedalRibbonIcon />
            </div>
          </div>

          <div className="dsa-tiers-grid">
            {/* Basic */}
            <div className="dsa-tier-col">
              <span className="dsa-tier-name">Basic</span>
              <span className="dsa-tier-count">
                {stats.solvedBasic} / {stats.totalBasic}
              </span>
              <div className="dsa-tier-bar">
                <div
                  className="dsa-tier-bar-fill basic"
                  style={{
                    width: stats.totalBasic > 0 ? `${(stats.solvedBasic / stats.totalBasic) * 100}%` : '0%',
                  }}
                />
              </div>
            </div>

            {/* Core */}
            <div className="dsa-tier-col">
              <span className="dsa-tier-name">Core</span>
              <span className="dsa-tier-count">
                {stats.solvedCore} / {stats.totalCore}
              </span>
              <div className="dsa-tier-bar">
                <div
                  className="dsa-tier-bar-fill core"
                  style={{
                    width: stats.totalCore > 0 ? `${(stats.solvedCore / stats.totalCore) * 100}%` : '0%',
                  }}
                />
              </div>
            </div>

            {/* Pro */}
            <div className="dsa-tier-col">
              <span className="dsa-tier-name">Pro</span>
              <span className="dsa-tier-count">
                {stats.solvedPro} / {stats.totalPro}
              </span>
              <div className="dsa-tier-bar">
                <div
                  className="dsa-tier-bar-fill pro"
                  style={{
                    width: stats.totalPro > 0 ? `${(stats.solvedPro / stats.totalPro) * 100}%` : '0%',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Toolbar: Search & Filter ──────────────────────────────────── */}
      <section className="dsa-toolbar" aria-label="Sheet filters and search">
        <div className="dsa-search-wrap">
          <span className="dsa-search-icon">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search problems or patterns..."
            className="dsa-search-input"
          />
        </div>

        <div className="dsa-filter-chips">
          <button
            type="button"
            className={'dsa-chip' + (selectedTier === 'ALL' && statusFilter === 'ALL' ? ' active' : '')}
            onClick={() => {
              setSelectedTier('ALL');
              setStatusFilter('ALL');
            }}
          >
            All
          </button>
          <button
            type="button"
            className={'dsa-chip' + (selectedTier === 'Basic' ? ' active' : '')}
            onClick={() => setSelectedTier(selectedTier === 'Basic' ? 'ALL' : 'Basic')}
          >
            Basic
          </button>
          <button
            type="button"
            className={'dsa-chip' + (selectedTier === 'Core' ? ' active' : '')}
            onClick={() => setSelectedTier(selectedTier === 'Core' ? 'ALL' : 'Core')}
          >
            Core
          </button>
          <button
            type="button"
            className={'dsa-chip' + (selectedTier === 'Pro' ? ' active' : '')}
            onClick={() => setSelectedTier(selectedTier === 'Pro' ? 'ALL' : 'Pro')}
          >
            Pro
          </button>
          <button
            type="button"
            className={'dsa-chip' + (statusFilter === 'SOLVED' ? ' active' : '')}
            onClick={() => setStatusFilter(statusFilter === 'SOLVED' ? 'ALL' : 'SOLVED')}
          >
            Solved
          </button>
          <button
            type="button"
            className={'dsa-chip' + (statusFilter === 'UNSOLVED' ? ' active' : '')}
            onClick={() => setStatusFilter(statusFilter === 'UNSOLVED' ? 'ALL' : 'UNSOLVED')}
          >
            Unsolved
          </button>

          <span style={{ width: '1px', height: '18px', background: '#2b2c32', margin: '0 4px' }} />

          <button
            type="button"
            className="dsa-chip"
            onClick={expandAll}
            title="Expand all topics and patterns"
          >
            Expand All
          </button>
          <button
            type="button"
            className="dsa-chip"
            onClick={collapseAll}
            title="Collapse all topics and patterns"
          >
            Collapse All
          </button>
        </div>
      </section>

      {/* ── Accordion Topic Tree (Matches Image 1) ────────────────────── */}
      <section className="dsa-tree-container" aria-label="DSA Problem Categories">
        {topicGroups.map((topic) => {
          // Check matching problems
          const topicMatchingQuestions = topic.patterns.flatMap((p) =>
            p.questions.filter(isQuestionVisible)
          );

          if (topicMatchingQuestions.length === 0 && (searchTerm || selectedTier !== 'ALL' || statusFilter !== 'ALL')) {
            return null;
          }

          const isTopicOpen = searchTerm
            ? topicMatchingQuestions.length > 0
            : Boolean(expandedTopics[topic.name]);

          const topicSolved = topic.patterns.reduce(
            (sum, p) => sum + p.questions.filter((q) => completedMap[q.id]).length,
            0
          );

          return (
            <div key={topic.name} className="dsa-topic-node">
              {/* Topic Header Row */}
              <button
                type="button"
                className="dsa-topic-header"
                onClick={() => toggleTopic(topic.name)}
                aria-expanded={isTopicOpen}
              >
                <div className="dsa-topic-title-area">
                  <ChevronIcon open={isTopicOpen} />
                  <span className="dsa-topic-title">{topic.name}</span>
                </div>

                <div className="dsa-topic-stats">
                  <div className="dsa-mini-progress">
                    <div
                      className="dsa-mini-progress-fill"
                      style={{
                        width: topic.total > 0 ? `${(topicSolved / topic.total) * 100}%` : '0%',
                      }}
                    />
                  </div>
                  <span className="dsa-topic-count">
                    {topicSolved}/{topic.total}
                  </span>
                </div>
              </button>

              {/* Topic Body with Tree Branch Line */}
              {isTopicOpen && (
                <div className="dsa-topic-body">
                  {topic.patterns.map((pattern) => {
                    const patternMatching = pattern.questions.filter(isQuestionVisible);
                    if (patternMatching.length === 0 && (searchTerm || selectedTier !== 'ALL' || statusFilter !== 'ALL')) {
                      return null;
                    }

                    const isPatternOpen = searchTerm
                      ? patternMatching.length > 0
                      : (expandedPatterns[pattern.key] ?? true);

                    const patternSolved = pattern.questions.filter((q) => completedMap[q.id]).length;

                    return (
                      <div key={pattern.key} className="dsa-pattern-node">
                        {/* Pattern Header Row */}
                        <button
                          type="button"
                          className="dsa-pattern-header"
                          onClick={() => togglePattern(pattern.key)}
                          aria-expanded={isPatternOpen}
                        >
                          <div className="dsa-pattern-title-area">
                            <ChevronIcon open={isPatternOpen} />
                            <span className="dsa-pattern-title">{pattern.name}</span>
                          </div>

                          <div className="dsa-pattern-stats">
                            <div className="dsa-mini-progress">
                              <div
                                className="dsa-mini-progress-fill"
                                style={{
                                  width: pattern.total > 0 ? `${(patternSolved / pattern.total) * 100}%` : '0%',
                                }}
                              />
                            </div>
                            <span className="dsa-topic-count">
                              {patternSolved}/{pattern.total}
                            </span>
                          </div>
                        </button>

                        {/* Problems Card */}
                        {isPatternOpen && (
                          <div className="dsa-problems-card">
                            {patternMatching.map((q) => {
                              const completed = Boolean(completedMap[q.id]);
                              const diff = getProblemDifficulty(q);
                              const articleUrl = getArticleUrl(q.id);

                              return (
                                <div key={q.id} className="dsa-problem-item">
                                  <div className="dsa-problem-row">
                                    {/* Left: Checkbox, Title (link if article present), Badge */}
                                    <div className="dsa-problem-left">
                                      <button
                                        type="button"
                                        role="checkbox"
                                        aria-checked={completed}
                                        aria-label={`Mark ${q.title} as ${completed ? 'incomplete' : 'complete'}`}
                                        className={'dsa-checkbox' + (completed ? ' checked' : '')}
                                        onClick={() => toggleCompleted(q.id)}
                                      >
                                        {completed && <CheckIcon />}
                                      </button>

                                      {articleUrl ? (
                                        <a
                                          href={articleUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={'dsa-problem-title has-article' + (completed ? ' completed' : '')}
                                          title="Read detailed explanation & solution in DSA notes (opens in new tab)"
                                        >
                                          {q.title}
                                        </a>
                                      ) : (
                                        <span
                                          className={'dsa-problem-title' + (completed ? ' completed' : '')}
                                        >
                                          {q.title}
                                        </span>
                                      )}

                                      <span
                                        className={`dsa-diff-badge ${diff.className}`}
                                        title={diff.tooltip}
                                      >
                                        {diff.tier}
                                      </span>
                                    </div>

                                    {/* Right: Article Link, LeetCode Logo, GFG Logo */}
                                    <div className="dsa-actions">
                                      {/* Article link or disabled */}
                                      {articleUrl ? (
                                        <a
                                          href={articleUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="dsa-logo-link"
                                          title="Read article in DSA in Java (opens in new tab)"
                                        >
                                          <ArticleIcon />
                                        </a>
                                      ) : (
                                        <span
                                          className="dsa-logo-link disabled"
                                          title="Article not available in DSA notes"
                                          aria-disabled="true"
                                        >
                                          <ArticleIcon />
                                        </span>
                                      )}

                                      {/* LeetCode link or disabled */}
                                      {q.leetcode ? (
                                        <a
                                          href={q.leetcode}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="dsa-logo-link"
                                          title="Solve on LeetCode"
                                        >
                                          <LeetCodeLogo />
                                        </a>
                                      ) : (
                                        <span
                                          className="dsa-logo-link disabled"
                                          title="Not available on LeetCode"
                                          aria-disabled="true"
                                        >
                                          <LeetCodeLogo />
                                        </span>
                                      )}

                                      {/* GFG link or disabled */}
                                      {q.gfg ? (
                                        <a
                                          href={q.gfg}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="dsa-logo-link"
                                          title="Solve on GeeksforGeeks"
                                        >
                                          <GfgLogo />
                                        </a>
                                      ) : (
                                        <span
                                          className="dsa-logo-link disabled"
                                          title="Not available on GeeksforGeeks"
                                          aria-disabled="true"
                                        >
                                          <GfgLogo />
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <SyncModal
        isOpen={showSyncModal}
        onClose={() => setShowSyncModal(false)}
        completedMap={completedMap}
        onImport={importMap}
      />
    </div>
  );
}

export default function DsaSheets() {
  return (
    <>
      <div id="strivers-180" data-topic-boundary="true" />
      <SheetView sheet={DSA_SHEETS[0]} />
    </>
  );
}
