export default function PortfolioHeader({ page }) {
  return (
    <header className="hero-header">
      <span>Portfolio</span>
      <nav className="hero-actions" aria-label="Main navigation">
        <a href="#projects" aria-current={page === 'projects' ? 'page' : undefined}>Projects</a>
        <span aria-hidden="true">-</span>
        <a href="#about" aria-current={page === 'about' ? 'page' : undefined}>About</a>
        <span aria-hidden="true">-</span>
        <a href="mailto:3la2suliman12345@gmail.com">Contact</a>
      </nav>
    </header>
  )
}
