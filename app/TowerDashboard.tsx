"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type TowerRecord = {
  id: string;
  status: string;
  site: string;
  customer: string;
  priority: string;
  issueType: string;
  city: string;
  region: string;
  createdAt: string;
};

const pageSize = 8;

function Icon({
  name,
  size = 18,
}: {
  name:
    | "grid"
    | "database"
    | "search"
    | "bell"
    | "chevron"
    | "clock"
    | "check"
    | "alert"
    | "tower";
  size?: number;
}) {
  const paths = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    alert: (
      <>
        <path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4m0 4h.01" />
      </>
    ),
    tower: (
      <>
        <path d="m7 21 5-18 5 18M5 10h14M4 15h16M9 21h6M8 6h8" />
        <path d="M12 3V1m-6 2 2 2m10-2-2 2" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
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

function formatDate(value: string) {
  const date = value.slice(0, 10).split("-");
  if (date.length !== 3) return "—";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const month = Number(date[1]);
  return month >= 1 && month <= 12
    ? `${date[2]} ${months[month - 1]} ${date[0]}`
    : "—";
}

export default function TowerDashboard({
  records,
}: {
  records: TowerRecord[];
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua status");
  const [page, setPage] = useState(1);

  const openCount = records.filter(
    (record) => record.status === "On Progress",
  ).length;
  const closedCount = records.filter(
    (record) => record.status === "Closed",
  ).length;
  const majorCount = records.filter(
    (record) => record.priority === "Major",
  ).length;

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("id");
    return records.filter((record) => {
      const matchesStatus =
        statusFilter === "Semua status" ||
        (statusFilter === "Sedang berjalan" &&
          record.status === "On Progress") ||
        (statusFilter === "Selesai" && record.status === "Closed");
      const searchableText = [
        record.id,
        record.site,
        record.customer,
        record.priority,
        record.issueType,
        record.city,
        record.region,
      ]
        .join(" ")
        .toLocaleLowerCase("id");

      return matchesStatus && searchableText.includes(normalizedQuery);
    });
  }, [query, records, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const visibleRecords = filteredRecords.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateStatus(value: string) {
    setStatusFilter(value);
    setPage(1);
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar ">
        <div className="brand" aria-label="Si Tower beranda">
          <span className="brand-icon">
            <Icon name="tower" size={23} />
          </span>
          <span>
            <strong>SI TOWER</strong>
            <small>MITRATEL OPERATIONS</small>
          </span>
        </div>

        <div className="nav-section-label">MENU UTAMA</div>
        <nav className="sidebar-nav" aria-label="Navigasi utama">
          <a className="nav-item" href="#ringkasan">
            <Icon name="grid" />
            <span>Ringkasan</span>
          </a>
          <a className="nav-item active" href="#data-tower" aria-current="page">
            <Icon name="database" />
            <span>Data Tower</span>
            <span className="nav-count">{records.length}</span>
          </a>
        </nav>

        <div className="sidebar-bottom">
        
          <div className="sidebar-footer">SI Tower · Area 3</div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="breadcrumb">
           
            <Icon name="chevron" size={14} />
            <strong>Data Tower</strong>
          </div>
          <div className="topbar-right">
            <span className="region-pill">
              AREA 3 <span>·</span> JAWA TIMUR
            </span>
            
          </div>
        </header>

        <div className="content">
          <section className="page-heading" id="ringkasan">
            <div>
             
              <h1>Data Tower</h1>
              <p>
                Pantau tiket dan kondisi operasional tower dalam satu tempat.
              </p>
            </div>
            <div className="data-source">
              
              <span>
                <small>SUMBER DATA</small>
                <strong>Database Mitratel TCM</strong>
              </span>
            </div>
          </section>

          <section className="table-card" id="data-tower">
            <div className="table-heading">
              <div>
                <h2>Daftar tiket tower</h2>
                <p>Data terbaru dari database operasional</p>
              </div>
              <span className="record-count">
                {filteredRecords.length} DATA
              </span>
            </div>

            <div className="table-toolbar">
              <label className="search-box">
                <Icon name="search" size={18} />
                <input
                  type="search"
                  placeholder="Cari ID tiket, nama tower, kota..."
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                  aria-label="Cari data tower"
                />
              </label>
              <label className="filter-select">
                <span className="sr-only">Filter status</span>
                <select
                  value={statusFilter}
                  onChange={(event) => updateStatus(event.target.value)}
                >
                  <option>Semua status</option>
                  <option>Sedang berjalan</option>
                  <option>Selesai</option>
                </select>
              </label>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>ID TIKET</th>
                    <th>NAMA TOWER</th>
                    <th>PELANGGAN</th>
                    <th>LOKASI</th>
                    <th>PRIORITAS</th>
                    <th>STATUS</th>
                    <th>TANGGAL</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRecords.map((record) => (
                    <tr key={record.id}>
                      <td>
                        <span className="ticket-id">{record.id}</span>
                      </td>
                      <td>
                        <strong className="tower-name">
                          {record.site || "—"}
                        </strong>
                        <span className="tower-type">
                          {record.issueType || "Gangguan tower"}
                        </span>
                      </td>
                      <td>
                        <span className="customer-name">
                          {record.customer || "—"}
                        </span>
                      </td>
                      <td>
                        <span className="city-name">{record.city || "—"}</span>
                        <span className="region-name">
                          {record.region || "—"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`priority-badge ${record.priority === "Major" ? "priority-major" : "priority-minor"}`}
                        >
                          <span />
                          {record.priority || "Normal"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${record.status === "Closed" ? "status-closed" : "status-progress"}`}
                        >
                          <span />
                          {record.status === "Closed"
                            ? "Selesai"
                            : "Sedang berjalan"}
                        </span>
                      </td>
                      <td className="date-cell">
                        {formatDate(record.createdAt)}
                      </td>
                    </tr>
                  ))}
                  {visibleRecords.length === 0 && (
                    <tr>
                      <td className="empty-state" colSpan={7}>
                        Tidak ada data tower yang sesuai dengan pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-pagination">
              <span>
                Menampilkan{" "}
                <strong>
                  {filteredRecords.length === 0 ? 0 : (page - 1) * pageSize + 1}
                  –{Math.min(page * pageSize, filteredRecords.length)}
                </strong>{" "}
                dari <strong>{filteredRecords.length}</strong> data
              </span>
              <div className="pagination-actions">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                >
                  Sebelumnya
                </button>
                <span className="page-number">
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  disabled={page === totalPages}
                >
                  Berikutnya
                </button>
              </div>
            </div>
          </section>

          <footer className="content-footer">
            <span>SI Tower Management System</span>
            <span>Data operasional · Mitratel</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
