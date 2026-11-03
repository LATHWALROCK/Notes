import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { BookIcon, LayersIcon, TreeIcon } from './Icons.jsx';

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    document.title = '404 - Page Not Found | Java Notes';
  }, []);

  return (
    <div className="not-found-page">
      {/* Top navigation header */}
      <div className="nav-sticky">
        <nav className="top-bar" aria-label="Not found navigation">
          <div className="top-bar-inner">
            <Link to="/" className="top-bar-brand flex items-center gap-2 text-ink font-semibold">
              <span className="text-accent text-lg">✦</span>
              <span>Java &amp; DSA Notes</span>
            </Link>
            <span className="nav-divider" />
            <div className="subject-tabs">
              <Link to="/dsa" className="subject-tab">
                <span className="subject-tab-icon"><TreeIcon /></span>
                <span>DSA in Java</span>
              </Link>
              <Link to="/java" className="subject-tab">
                <span className="subject-tab-icon"><BookIcon /></span>
                <span>Java Notes</span>
              </Link>
              <Link to="/collections" className="subject-tab">
                <span className="subject-tab-icon"><LayersIcon /></span>
                <span>Java Collections Framework</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Main 404 Content */}
      <main className="not-found-main">
        <div className="not-found-card">
          <div className="not-found-badge">404 Error</div>
          <h1 className="not-found-title">Page not found</h1>
          <p className="not-found-desc">
            The page you requested could not be found. It may have been moved, renamed, or never existed.
          </p>

          <div className="not-found-path-box">
            <span className="not-found-path-label">Requested URL:</span>
            <code className="not-found-path">{location.pathname}</code>
          </div>

          <div className="not-found-actions">
            <Link to="/" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span>Return to Home</span>
            </Link>
            <Link to="/dsa/dsa-sheets/strivers-180" className="btn-secondary">
              <span>Striver&apos;s 180 DSA Sheet</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="not-found-quicklinks">
            <div className="not-found-quicklinks-title">Popular Destinations</div>
            <div className="not-found-grid">
              <Link to="/dsa" className="not-found-link-card">
                <div className="not-found-link-icon text-accent"><TreeIcon /></div>
                <div className="not-found-link-content">
                  <div className="not-found-link-title">DSA in Java</div>
                  <div className="not-found-link-desc">Binary Search, Trees, Graphs, DP &amp; more</div>
                </div>
              </Link>

              <Link to="/java" className="not-found-link-card">
                <div className="not-found-link-icon text-accent"><BookIcon /></div>
                <div className="not-found-link-content">
                  <div className="not-found-link-title">Java Notes</div>
                  <div className="not-found-link-desc">Core Java, OOP, Memory &amp; Multithreading</div>
                </div>
              </Link>

              <Link to="/collections" className="not-found-link-card">
                <div className="not-found-link-icon text-accent"><LayersIcon /></div>
                <div className="not-found-link-content">
                  <div className="not-found-link-title">Collections Framework</div>
                  <div className="not-found-link-desc">List, Set, Map, Queue &amp; Internal Working</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

