import React, { useEffect, useState } from "react";
import "./App.css";

const initialTemplates = [
  {
    id: 1,
    title: "Modern School Brochure",
    category: "Brochure",
    size: "A4 Tri-fold",
    type: "brochure",
    color: "#315A96",
    heading: "SHAPE YOUR FUTURE",
    description: "Education for a brighter tomorrow.",
  },
  {
    id: 2,
    title: "Admission Open Flyer",
    category: "Flyer",
    size: "A4 Portrait",
    type: "admission",
    color: "#315A96",
    heading: "ADMISSIONS OPEN",
    description: "Start your success story today!",
  },
  {
    id: 3,
    title: "Education Social Post",
    category: "Social Post",
    size: "1080 × 1080 px",
    type: "social",
    color: "#315A96",
    heading: "DREAM. LEARN. ACHIEVE.",
    description: "Your future starts here.",
  },
  {
    id: 4,
    title: "Vision & Mission Board",
    category: "Wall Signage",
    size: "A2 Landscape",
    type: "signage",
    color: "#315A96",
    heading: "OUR VISION",
    description: "Inspiring minds. Transforming lives.",
  },
  {
    id: 5,
    title: "Institute Profile",
    category: "Brochure",
    size: "A4 Portrait",
    type: "profile",
    color: "#315A96",
    heading: "ABOUT OUR INSTITUTE",
    description: "Excellence in education.",
  },
  {
    id: 6,
    title: "Event Announcement",
    category: "Flyer",
    size: "A4 Portrait",
    type: "event",
    color: "#315A96",
    heading: "ANNUAL DAY 2026",
    description: "Celebrate talent and achievement.",
  },
];

const categories = [
  "All Templates",
  "Brochure",
  "Flyer",
  "Social Post",
  "Wall Signage",
];

const navigation = [
  { name: "Template Library", icon: "▦" },
  { name: "Customization", icon: "✎" },
  { name: "Preview", icon: "◉" },
  { name: "Download", icon: "↓" },
  { name: "Order Requests", icon: "▤" },
  { name: "Marketing Website", icon: "◎" },
  { name: "Lead Tracking Pages", icon: "↗" },
];

function DesignPreview({ item }) {
  return (
    <div
      className={`design-preview design-${item.type}`}
      style={{ "--design-color": item.color }}
    >
      <div className="design-top">
        <span className="design-brand">EDU.</span>
        <span className="design-tag">EDUCATION • 2026</span>
      </div>

      {item.type === "brochure" && (
        <div className="brochure-layout">
          <div className="brochure-circle" />
          <span className="design-kicker">WELCOME TO</span>
          <h2>{item.heading}</h2>
          <p>{item.description}</p>
          <div className="design-rule" />
          <div className="design-footer">LEARN • GROW • SUCCEED</div>
        </div>
      )}

      {item.type === "admission" && (
        <div className="admission-layout">
          <span className="admission-badge">2026 / 27</span>
          <span className="design-kicker">
            YOUR FUTURE STARTS HERE
          </span>
          <h2>{item.heading}</h2>
          <p>{item.description}</p>
          <div className="admission-cta">APPLY NOW →</div>
          <div className="design-footer">
            ENROLMENT NOW IN PROGRESS
          </div>
        </div>
      )}

      {item.type === "social" && (
        <div className="social-layout">
          <div className="social-orbit">✦</div>
          <span className="design-kicker">
            INSPIRE • LEARN • ACHIEVE
          </span>
          <h2>{item.heading}</h2>
          <p>{item.description}</p>
          <div className="social-pill">
            YOUR JOURNEY BEGINS HERE
          </div>
        </div>
      )}

      {item.type === "signage" && (
        <div className="signage-layout">
          <div className="signage-frame">
            <span className="design-kicker">OUR INSTITUTION</span>
            <h2>{item.heading}</h2>
            <div className="signage-rule" />
            <p>{item.description}</p>
            <div className="design-footer">
              KNOWLEDGE • INTEGRITY • SUCCESS
            </div>
          </div>
        </div>
      )}

      {item.type === "profile" && (
        <div className="profile-layout">
          <div className="profile-accent" />
          <span className="design-kicker">
            INSTITUTIONAL PROFILE
          </span>
          <div className="profile-emblem">E</div>
          <h2>{item.heading}</h2>
          <p>{item.description}</p>
          <div className="profile-bottom">
            OUR HISTORY • OUR VALUES
          </div>
        </div>
      )}

      {item.type === "event" && (
        <div className="event-layout">
          <div className="event-decoration">✦　✧　✦</div>
          <span className="design-kicker">YOU ARE INVITED TO</span>
          <h2>{item.heading}</h2>
          <p>{item.description}</p>
          <div className="event-date">20 DECEMBER 2026</div>
          <div className="design-footer">A DAY TO REMEMBER</div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [activePage, setActivePage] = useState("Template Library");
  const [activeCategory, setActiveCategory] =
    useState("All Templates");
  const [search, setSearch] = useState("");
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [notice, setNotice] = useState("");

  const [savedDesigns, setSavedDesigns] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("marketingHubDesigns") || "[]"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "marketingHubDesigns",
      JSON.stringify(savedDesigns)
    );
  }, [savedDesigns]);

  const filteredTemplates = templates.filter((item) => {
    const matchesCategory =
      activeCategory === "All Templates" ||
      item.category === activeCategory;

    const term = search.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  function navigateTo(page) {
    setActivePage(page);
    setNotice("");
  }

  function openEditor(item) {
    setEditingTemplate({ ...item });
    setNotice("");
  }

  function updateField(field, value) {
    setEditingTemplate((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function saveDesign() {
    if (!editingTemplate) return;

    const designToSave = {
      ...editingTemplate,
      savedAt: new Date().toISOString(),
    };

    setSavedDesigns((current) => [
      designToSave,
      ...current.filter((item) => item.id !== designToSave.id),
    ]);

    setTemplates((current) =>
      current.map((item) =>
        item.id === designToSave.id ? designToSave : item
      )
    );

    setNotice("Design saved successfully!");
  }

  function downloadDesign(item) {
    if (!item) return;

    const escapeHTML = (value = "") =>
      String(value).replace(/[&<>"']/g, (character) => {
        const entities = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        };
        return entities[character];
      });

    const title = escapeHTML(item.title);
    const heading = escapeHTML(item.heading);
    const description = escapeHTML(item.description);
    const color = /^#[0-9a-fA-F]{6}$/.test(item.color)
      ? item.color
      : "#315A96";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
*{box-sizing:border-box}
body{font-family:Arial,sans-serif;margin:0;padding:30px;background:#f2f5fa}
main{max-width:800px;min-height:480px;margin:auto;padding:50px;background:${color};color:white;border-radius:18px;display:flex;flex-direction:column;justify-content:center}
.brand{font-size:20px;font-weight:bold;letter-spacing:2px}
h1{font-size:clamp(30px,6vw,52px);overflow-wrap:anywhere}
p{font-size:20px;line-height:1.7}
footer{margin-top:40px;font-size:13px;letter-spacing:2px}
</style>
</head>
<body>
<main>
<div class="brand">EDU. | EDUCATION 2026</div>
<h1>${heading}</h1>
<p>${description}</p>
<footer>LEARN • GROW • SUCCEED</footer>
</main>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download =
      `${item.title.replace(/[^a-z0-9]/gi, "-") || "design"}.html`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function renderTemplateGrid(items, buttonLabel = "Edit Design") {
    return (
      <div className="template-grid">
        {items.map((item) => (
          <article className="template-card" key={item.id}>
            <DesignPreview item={item} />

            <div className="template-info">
              <div className="template-title-row">
                <h3>{item.title}</h3>
              </div>

              <p className="template-description">
                {item.description}
              </p>

              <div className="template-meta">
                <span className="type-badge">{item.category}</span>
                <span>{item.size}</span>
              </div>

              <button
                className="primary-button full-button"
                onClick={() => {
                  if (activePage === "Download") {
                    downloadDesign(item);
                  } else {
                    openEditor(item);
                  }
                }}
              >
                {activePage === "Download"
                  ? "Download HTML ↓"
                  : `${buttonLabel} →`}
              </button>
            </div>
          </article>
        ))}
      </div>
    );
  }

  function renderTemplateLibrary() {
    return (
      <>
        <section className="page-heading" id="templates">
          <div>
            <p className="eyebrow">DESIGN RESOURCES</p>
            <h1>Template Library</h1>
            <p className="page-description">
              Discover professional designs and customize them for your needs.
            </p>
          </div>

          <button
            className="secondary-button"
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
            <div className="stat-icon">▦</div>
            <div>
              <p>Total Templates</p>
              <h2>{templates.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">▤</div>
            <div>
              <p>Categories</p>
              <h2>{categories.length - 1}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">✦</div>
            <div>
              <p>Saved Designs</p>
              <h2>{savedDesigns.length}</h2>
            </div>
          </div>
        </section>

        <section className="library-section">
          <div className="library-header">
            <div>
              <h2>Explore Templates</h2>
              <p>Choose a design, edit the content, and save your work.</p>
            </div>

            <input
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
            />
          </div>

          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${
                  activeCategory === category ? "selected" : ""
                }`}
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
            <span>Consistent Design Collection</span>
          </div>

          {renderTemplateGrid(filteredTemplates, "Edit & Use Template")}

          {filteredTemplates.length === 0 && (
            <div className="empty-state">
              <h3>No templates found</h3>
              <p>Try another keyword or category.</p>
            </div>
          )}
        </section>

        <section className="saved-section" id="my-designs">
          <div className="section-title">
            <div>
              <p className="eyebrow">YOUR WORKSPACE</p>
              <h2>My Designs</h2>
            </div>
            <span className="saved-count">
              {savedDesigns.length} saved
            </span>
          </div>

          {savedDesigns.length === 0 ? (
            <p className="muted-text">
              Your saved designs will appear here after you edit and save a template.
            </p>
          ) : (
            <div className="saved-grid">
              {savedDesigns.map((item) => (
                <article className="saved-card" key={item.id}>
                  <DesignPreview item={item} />
                  <div className="saved-card-content">
                    <strong>{item.title}</strong>
                    <button
                      className="secondary-button"
                      onClick={() => openEditor(item)}
                    >
                      Edit Again
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </>
    );
  }

  function renderActivePage() {
    switch (activePage) {
      case "Template Library":
        return renderTemplateLibrary();

      case "Customization":
        return (
          <section className="extra-page">
            <p className="eyebrow">DESIGN WORKSPACE</p>
            <h1>Customization</h1>
            <p className="page-description">
              Choose a template to edit its heading, description and colour.
            </p>
            {renderTemplateGrid(templates, "Customize Design")}
          </section>
        );

      case "Preview":
        return (
          <section className="extra-page">
            <p className="eyebrow">DESIGN WORKSPACE</p>
            <h1>Preview</h1>
            <p className="page-description">
              Preview your saved designs or select a template.
            </p>
            {renderTemplateGrid(
              savedDesigns.length ? savedDesigns : templates,
              "Open Preview"
            )}
          </section>
        );

      case "Download":
        return (
          <section className="extra-page">
            <p className="eyebrow">YOUR DESIGNS</p>
            <h1>Download</h1>
            <p className="page-description">
              Download a design as an HTML file.
            </p>
            {renderTemplateGrid(
              savedDesigns.length ? savedDesigns : templates,
              "Download HTML"
            )}
          </section>
        );

      case "Order Requests":
        return (
          <section className="extra-page">
            <p className="eyebrow">CUSTOMER MANAGEMENT</p>
            <h1>Order Requests</h1>
            <p className="page-description">
              Customer order requests and their status will appear here.
            </p>
            <div className="info-panel">
              <h3>No order requests yet</h3>
              <p>
                This is a demo page. Connect your backend or database
                to display real orders, customer details and statuses.
              </p>
            </div>
          </section>
        );

      case "Marketing Website":
        return (
          <section className="extra-page">
            <p className="eyebrow">WEBSITE WORKSPACE</p>
            <h1>Marketing Website</h1>
            <p className="page-description">
              Select a design to prepare marketing website content.
            </p>
            <div className="info-panel">
              <h3>Website Workspace</h3>
              <p>
                Choose a template and customize it for your marketing website.
              </p>
              <button
                className="primary-button"
                onClick={() => navigateTo("Template Library")}
              >
                Browse Templates →
              </button>
            </div>
          </section>
        );

      case "Lead Tracking Pages":
        return (
          <section className="extra-page">
            <p className="eyebrow">MARKETING ANALYTICS</p>
            <h1>Lead Tracking Pages</h1>
            <p className="page-description">
              Track potential customers and marketing leads.
            </p>

            <section className="stats-grid">
              <div className="stat-card">
                <div>
                  <p>Total Leads</p>
                  <h2>0</h2>
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <p>New Leads</p>
                  <h2>0</h2>
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <p>Converted Leads</p>
                  <h2>0</h2>
                </div>
              </div>
            </section>

            <div className="info-panel">
              <h3>No lead data available</h3>
              <p>
                These are placeholder counts. Connect a database to track
                actual leads and conversions.
              </p>
            </div>
          </section>
        );

      default:
        return renderTemplateLibrary();
    }
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
          {navigation.map((page) => (
            <button
              key={page.name}
              type="button"
              className={`nav-item ${
                activePage === page.name ? "active" : ""
              }`}
              onClick={() => navigateTo(page.name)}
            >
              <span>{page.icon}</span>
              {page.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">F</div>
          <div>
            <strong>Design Team</strong>
            <p>Frontend Workspace</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            Workspace <span>/</span> {activePage}
          </div>
          <span className="online-status">● Frontend Preview</span>
        </header>

        {renderActivePage()}

        <footer className="page-footer">
          <span>Marketing Hub · {activePage}</span>
          <span>Design Workspace</span>
        </footer>
      </main>

      {editingTemplate && (
        <div
          className="editor-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setEditingTemplate(null);
            }
          }}
        >
          <section
            className="editor-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Template editor"
          >
            <header className="editor-header">
              <div>
                <p className="eyebrow">TEMPLATE EDITOR</p>
                <h2>{editingTemplate.title}</h2>
              </div>

              <button
                className="close-button"
                onClick={() => setEditingTemplate(null)}
                aria-label="Close editor"
              >
                ×
              </button>
            </header>

            <div className="editor-body">
              <div className="editor-controls">
                <h3>Edit your design</h3>
                <p className="muted-text">
                  Changes appear immediately in the preview.
                </p>

                <label htmlFor="design-title">Design title</label>
                <input
                  id="design-title"
                  value={editingTemplate.title}
                  maxLength={100}
                  onChange={(e) => updateField("title", e.target.value)}
                />

                <label htmlFor="design-heading">Main heading</label>
                <input
                  id="design-heading"
                  value={editingTemplate.heading}
                  maxLength={100}
                  onChange={(e) => updateField("heading", e.target.value)}
                />

                <label htmlFor="design-description">Description</label>
                <textarea
                  id="design-description"
                  rows="4"
                  maxLength={250}
                  value={editingTemplate.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                />

                <label htmlFor="design-color">Theme colour</label>
                <div className="color-control">
                  <input
                    id="design-color"
                    type="color"
                    value={editingTemplate.color}
                    onChange={(e) =>
                      updateField("color", e.target.value)
                    }
                  />
                  <span>{editingTemplate.color.toUpperCase()}</span>
                </div>

                <p className="editor-hint">
                  Keep the heading short so it fits the template.
                </p>
              </div>

              <div className="editor-preview-area">
                <div className="preview-heading">
                  <span>Live Preview</span>
                  <span className="preview-live-dot">● Live</span>
                </div>

                <DesignPreview item={editingTemplate} />

                <p className="preview-caption">
                  {editingTemplate.category} · {editingTemplate.size}
                </p>
              </div>
            </div>

            {notice && (
              <div className="success-message" role="status">
                {notice}
              </div>
            )}

            <footer className="editor-footer">
              <button
                className="secondary-button"
                onClick={() => setEditingTemplate(null)}
              >
                Close
              </button>

              <button
                className="secondary-button"
                onClick={() => downloadDesign(editingTemplate)}
              >
                Download HTML
              </button>

              <button
                className="primary-button"
                onClick={saveDesign}
              >
                Save Design
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;