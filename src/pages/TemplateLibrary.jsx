import React, { useState } from "react";
import "../App.css";

const templates = [
  {
    id: 1,
    title: "Modern School Brochure",
    category: "Brochure",
    size: "A4 Tri-fold",
    type: "brochure",
    description: "Professional school brochure",
    heading: "SHAPE YOUR FUTURE",
    subheading: "Education for a brighter tomorrow",
    color: "#244B87",
    icon: "📘",
  },
  {
    id: 2,
    title: "Admission Open Flyer",
    category: "Flyer",
    size: "A4 Portrait",
    type: "admission",
    description: "Attract new student admissions",
    heading: "ADMISSIONS OPEN",
    subheading: "Start your success story today!",
    color: "#15803D",
    icon: "🎓",
  },
  {
    id: 3,
    title: "Education Social Post",
    category: "Social Post",
    size: "1080 × 1080 px",
    type: "social",
    description: "Creative social media promotion",
    heading: "DREAM. LEARN. ACHIEVE.",
    subheading: "Your future starts here",
    color: "#6D28D9",
    icon: "✨",
  },
  {
    id: 4,
    title: "Vision & Mission Board",
    category: "Wall Signage",
    size: "A2 Landscape",
    type: "signage",
    description: "Professional institutional signage",
    heading: "OUR VISION",
    subheading: "Inspiring minds. Transforming lives.",
    color: "#92400E",
    icon: "🏛️",
  },
  {
    id: 5,
    title: "Institute Profile",
    category: "Brochure",
    size: "A4 Portrait",
    type: "profile",
    description: "Elegant institutional profile cover",
    heading: "ABOUT OUR INSTITUTE",
    subheading: "Excellence in education since 2010",
    color: "#0F766E",
    icon: "🏫",
  },
  {
    id: 6,
    title: "Event Announcement",
    category: "Flyer",
    size: "A4 Portrait",
    type: "event",
    description: "Eye-catching event announcement",
    heading: "ANNUAL DAY 2026",
    subheading: "Celebrate talent and achievement",
    color: "#BE123C",
    icon: "🎉",
  },
];

const categories = [
  "All Templates",
  "Brochure",
  "Flyer",
  "Social Post",
  "Wall Signage",
];

function App() {
  const [activeCategory, setActiveCategory] =
    useState("All Templates");
  const [search, setSearch] = useState("");

  const filteredTemplates = templates.filter((item) => {
    const categoryMatch =
      activeCategory === "All Templates" ||
      item.category === activeCategory;

    const searchMatch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  function useTemplate(item) {
    alert(`Selected Template: ${item.title}`);
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">M</div>
          <div>
            <h2>Marketing Hub</h2>
            <span>Design Workspace</span>
          </div>
        </div>

        <p className="menu-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <a className="nav-item active" href="#templates">
            <span>▦</span> Template Library
          </a>
          <a className="nav-item" href="#my-designs">
            <span>✎</span> My Designs
          </a>
          <a className="nav-item" href="#orders">
            <span>▤</span> My Orders
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">F</div>
          <div>
            <strong>Design Team</strong>
            <p>Frontend Workspace</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="templates">
        <header className="topbar">
          <span>Workspace / Template Library</span>
          <span className="online-status">● Frontend Preview</span>
        </header>

        <section className="page-heading">
          <div>
            <p className="eyebrow">DESIGN RESOURCES</p>
            <h1>Template Library</h1>
            <p>
              Discover creative designs for your institution.
              Choose a template to get started.
            </p>
          </div>

          <button
            className="reset-button"
            onClick={() => {
              setSearch("");
              setActiveCategory("All Templates");
            }}
          >
            ↻ Reset Filters
          </button>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">▦</span>
            <div>
              <p>Total Templates</p>
              <h2>{templates.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon green">▤</span>
            <div>
              <p>Categories</p>
              <h2>4</h2>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon purple">✦</span>
            <div>
              <p>Ready to Customize</p>
              <h2>{templates.length}</h2>
            </div>
          </div>
        </section>

        <section className="library-section">
          <div className="library-header">
            <div>
              <h2>Explore Templates</h2>
              <p>Find a unique design for your next project.</p>
            </div>

            <input
              className="search-input"
              type="text"
              placeholder="⌕ Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "category-button selected"
                    : "category-button"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="results-row">
            <span>
              Showing <strong>{filteredTemplates.length}</strong> templates
            </span>
            <span>Creative Collection</span>
          </div>

          <div className="template-grid">
            {filteredTemplates.map((item) => (
              <article className="template-card" key={item.id}>
                <div
                  className={`design-preview ${item.type}`}
                  style={{ "--design-color": item.color }}
                >
                  {item.type === "brochure" && (
                    <div className="brochure-art">
                      <div className="brochure-top">
                        <span>EDU / INSTITUTE</span>
                        <span>01</span>
                      </div>
                      <div className="brochure-shape" />
                      <div className="brochure-text">
                        <small>WELCOME TO</small>
                        <h3>{item.heading}</h3>
                        <p>{item.subheading}</p>
                        <span className="mini-line" />
                      </div>
                      <div className="brochure-bottom">
                        LEARN MORE · GROW MORE
                      </div>
                    </div>
                  )}

                  {item.type === "admission" && (
                    <div className="admission-art">
                      <div className="admission-top">
                        <span>✦ EDU ACADEMY</span>
                        <span>2026/27</span>
                      </div>
                      <div className="admission-circle">
                        <span>NEW</span>
                        <strong>2026</strong>
                      </div>
                      <div className="admission-text">
                        <h3>{item.heading}</h3>
                        <p>{item.subheading}</p>
                        <span className="admission-strip">
                          APPLY NOW →
                        </span>
                      </div>
                    </div>
                  )}

                  {item.type === "social" && (
                    <div className="social-art">
                      <div className="social-sun" />
                      <span className="social-label">YOUR DAILY INSPIRATION</span>
                      <div className="social-book">📚</div>
                      <h3>{item.heading}</h3>
                      <p>{item.subheading}</p>
                      <span className="social-hashtag">#LEARNEVERYDAY</span>
                    </div>
                  )}

                  {item.type === "signage" && (
                    <div className="signage-art">
                      <div className="signage-inner">
                        <span>✧ OUR INSTITUTION ✧</span>
                        <div className="signage-symbol">◇</div>
                        <h3>{item.heading}</h3>
                        <div className="gold-line" />
                        <p>{item.subheading}</p>
                        <small>KNOWLEDGE · INTEGRITY · SUCCESS</small>
                      </div>
                    </div>
                  )}

                  {item.type === "profile" && (
                    <div className="profile-art">
                      <div className="profile-side" />
                      <div className="profile-content">
                        <span className="profile-kicker">INSTITUTIONAL PROFILE</span>
                        <div className="profile-emblem">E</div>
                        <h3>{item.heading}</h3>
                        <div className="profile-line" />
                        <p>{item.subheading}</p>
                        <div className="profile-details">
                          <span>OUR HISTORY</span>
                          <span>OUR VALUES</span>
                          <span>OUR FUTURE</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {item.type === "event" && (
                    <div className="event-art">
                      <div className="event-confetti">✦　✧　✦</div>
                      <span className="event-kicker">YOU ARE INVITED TO</span>
                      <div className="event-star">✹</div>
                      <h3>{item.heading}</h3>
                      <p>{item.subheading}</p>
                      <div className="event-date">
                        <strong>20</strong>
                        <span>DECEMBER<br />2026</span>
                      </div>
                      <span className="event-footer">AN UNFORGETTABLE CELEBRATION</span>
                    </div>
                  )}
                  <span className="preview-badge">PREVIEW</span>
                </div>

                <div className="template-info">
                  <div className="template-title-row">
                    <h3>{item.title}</h3>
                    <span className="more-icon">⋮</span>
                  </div>

                  <p className="template-description">
                    {item.description}
                  </p>

                  <div className="template-meta">
                    <span className="type-badge">{item.category}</span>
                    <span>{item.size}</span>
                  </div>

                  <button
                    className="use-template-button"
                    onClick={() => useTemplate(item)}
                  >
                    Use Template <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="empty-state">
              <h3>No templates found</h3>
              <p>Try a different keyword or category.</p>
              <button
                className="use-template-button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All Templates");
                }}
              >
                View All Templates
              </button>
            </div>
          )}
        </section>

        <footer className="page-footer">
          <span>Marketing Hub · Template Library</span>
          <span>Design Workspace</span>
        </footer>
      </main>
    </div>
  );
}

export default App;