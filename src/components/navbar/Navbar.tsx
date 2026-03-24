import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./Navbar.module.css"

const links = [
    { name: 'Home', path: '/'},
    {
        name: 'Labels', path: '/labels',
        children: [
            { name: 'TSPL', path: '/labels/tspl' },
            { name: 'ZPL', path: '/labels/zpl' },
        ]
    },
    { name: 'Printers', path: '/printers' },
    { name: 'NiceLabel', path: '/nicelabel' }
]

export default function Navbar() {
  const location = useLocation()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarLinks}>
        {links.map(link => (
          <li
            key={link.name}
            className={styles.navbarItem}
            onMouseEnter={() => link.children && setOpenDropdown(link.name)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              to={link.path}
              className={`${styles.link} ${location.pathname === link.path ? styles.active : ''}`}
            >
              {link.name}
            </Link>

            {link.children && openDropdown === link.name && (
              <ul className={styles.dropdown}>
                {link.children.map(child => (
                  <li key={child.name}>
                    <Link 
                    to={child.path}
                    className={`${styles.link} ${location.pathname === link.path ? styles.active : ''}`}
                    >
                      {child.name}
                    </Link>
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
