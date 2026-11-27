import Link from "next/link";

export default function Home() {
  return (
    <main className="welcome-page">
      <div className="welcome-glow welcome-glow-one" />
      <div className="welcome-glow welcome-glow-two" />
      <header className="welcome-header">
        <Link className="welcome-brand" href="/" aria-label="SI Tower">
          <span>SI-TOWER</span>
        </Link>
        <span className="welcome-header-label">MITRATEL OPERATIONS</span>
      </header>

      <section className="welcome-content">
        <h1>
          Selamat datang di <br />
          <span>SI-Tower</span>
        </h1>

        <p>
          Satu tempat untuk melihat data dan memantau operasional tower
          Mitratel.
        </p>
        <Link className="explore-button" href="/dashboard">
          Jelajahi
        </Link>
        <div className="welcome-caption">
          <span className="welcome-caption-line" />
          <span>MONITORING DATA TOWER</span>
          <span className="welcome-caption-line" />
        </div>
      </section>

      <footer className="welcome-footer">
        <span>SI-Tower</span>
        <span>Mitratel · Sistem Informasi Tower</span>
      </footer>
    </main>
  );
}
