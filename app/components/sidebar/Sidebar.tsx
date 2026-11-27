"use client";

import { useState } from "react";
import Link from "next/link";

type SidebarIconName = "grid" | "tower" | "menu" | "close";

function SidebarIcon({ name }: { name: SidebarIconName }) {
  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    tower: (
      <>
        <path d="m7 21 5-18 5 18M5 10h14M4 15h16M9 21h6M8 6h8" />
        <path d="M12 3V1m-6 2 2 2m10-2-2 2" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg
      aria-hidden="true"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export default function Sidebar({ recordCount }: { recordCount: number }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("data");

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <header className="si-sidebar-mobile-header">
        <Link className="si-sidebar-mobile-brand" href="/dashboard">
          <span className="si-sidebar-mark">ST</span>
          <span>SI-TOWER</span>
        </Link>
        <button
          className="si-sidebar-menu-button"
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="si-primary-navigation"
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <SidebarIcon name={open ? "close" : "menu"} />
        </button>
      </header>

      {open && (
        <button
          className="si-sidebar-backdrop"
          type="button"
          aria-label="Tutup menu"
          onClick={closeMenu}
        />
      )}

      <aside
        className={`si-sidebar${open ? " is-open" : ""}`}
        id="si-primary-navigation"
      >
        <div className="si-sidebar-decoration" aria-hidden="true" />
        <div className="si-sidebar-brand-row">
          <Link
            className="si-sidebar-brand"
            href="/dashboard"
            onClick={closeMenu}
          >
            <span className="si-sidebar-mark">ST</span>
            <span>
              <strong>SI-TOWER</strong>
              <small>MITRATEL OPERATIONS</small>
            </span>
          </Link>
          <button
            className="si-sidebar-close"
            type="button"
            aria-label="Tutup menu"
            onClick={closeMenu}
          >
            <SidebarIcon name="close" />
          </button>
        </div>

        <div className="si-sidebar-profile">
          <span className="si-sidebar-avatar">ST</span>
          <span>
            <strong>Operator Tower</strong>
            <small>Workspace access</small>
          </span>
        </div>

        <p className="si-sidebar-section-label">MENU UTAMA</p>
        <nav className="si-sidebar-nav" aria-label="Navigasi utama">
          <Link
            className={`si-sidebar-link${activeItem === "overview" ? " active" : ""}`}
            href="/dashboard#ringkasan"
            onClick={() => {
              setActiveItem("overview");
              closeMenu();
            }}
          >
            <SidebarIcon name="grid" />
            <span>Ringkasan</span>
          </Link>
          <Link
            className={`si-sidebar-link${activeItem === "data" ? " active" : ""}`}
            href="/dashboard#data-tower"
            onClick={() => {
              setActiveItem("data");
              closeMenu();
            }}
          >
            <SidebarIcon name="tower" />
            <span>Data Tower</span>
            <span className="si-sidebar-count">{recordCount}</span>
          </Link>
        </nav>

        <div className="si-sidebar-footer">
          <span className="si-sidebar-status-dot" />
          <span>
            <strong>Database Mitratel</strong>
            <small>{recordCount} tiket tersedia</small>
          </span>
        </div>
      </aside>
    </>
  );
}
