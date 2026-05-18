import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import { classNames } from "../util/lang"

export default (() => {
  const NavBar: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
    const baseDir = pathToRoot(fileData.slug!)
    return (
      <nav class={classNames(displayClass, "navbar")}>
        <a href={baseDir} class="navbar-brand">
          火花
        </a>
        <div class="navbar-links">
          <a href="https://github.com/sunkai2212/spark" target="_blank" rel="noopener">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a href={`${baseDir}ideas`}>创意</a>
          <a href={`${baseDir}tags`}>标签</a>
          <a href={`${baseDir}about`}>关于</a>
        </div>
      </nav>
    )
  }

  NavBar.css = `
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 0;
      margin-bottom: 2rem;
    }

    .navbar-brand {
      font-family: var(--headerFont);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--dark);
      text-decoration: none;
      letter-spacing: 0.02em;
    }

    .navbar-brand:hover {
      color: var(--secondary);
    }

    .navbar-links {
      display: flex;
      align-items: center;
      gap: 1.75rem;
    }

    .navbar-links a {
      font-family: var(--bodyFont);
      font-size: 0.95rem;
      font-weight: 400;
      color: var(--gray);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .navbar-links a:hover {
      color: var(--dark);
    }

    .navbar-links svg {
      display: block;
    }
  `

  return NavBar
}) satisfies QuartzComponentConstructor
