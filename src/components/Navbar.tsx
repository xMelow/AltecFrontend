import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const links = [
    { name: 'Home', path: '/'},
    {
        name: 'Labels', path: '/labels',
        children: [
            { name: 'TSPL', path: '/labels/tspl' },
            { name: 'ZPL', path: '/labels/zpl' },
        ]
    },
    { name: 'Printer', path: '/printer' },
    { name: 'NiceLabel', path: '/nicelabel' }
]

export default function Navbar() {
    const location = useLocation()
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)

    return (
    <nav className="navbar">
      <ul className="navbar-links">
        {links.map(link => (
          <li
            key={link.name}
            className="navbar-item"
            onMouseEnter={() => link.children && setOpenDropdown(link.name)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.name}
            </Link>

            {link.children && openDropdown === link.name && (
              <ul className="dropdown">
                {link.children.map(child => (
                  <li key={child.name}>
                    <Link to={child.path}>{child.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
