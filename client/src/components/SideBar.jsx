import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ menu, open, setOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1023);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1023);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 "
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sideeebar */}
      <aside
        className={`
          bg-secondary text-white h-screen w-64 fixed left-0 top-0 z-40
          transition-transform duration-300
          ${
            isMobile
              ? open
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="p-4 text-xl h-[70px] font-bold flex items-center">
          <span className="px-4 py-2 bg-ternary rounded-md">OLS</span>
        </div>

        {/* navigaation */}
        <nav className="mt-4">
          {menu.map((item, i) => (
            <div key={i}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === i ? null : i)
                    }
                    className="flex items-center w-full px-4 py-3 hover:bg-gray-700"
                  >
                    <span>{item.icon}</span>
                    <span className="ml-2">{item.title}</span>

                    <svg
                      className={`ml-auto w-4 h-4 transition-transform ${
                        openDropdown === i ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* children */}
                  {openDropdown === i && (
                    <div className="ml-10 mt-1">
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
                          to={child.path}
                          className="block px-2 py-2 text-sm rounded hover:bg-gray-700"
                          onClick={() => isMobile && setOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className="block px-4 py-3 hover:bg-gray-700"
                  onClick={() => isMobile && setOpen(false)}
                >
                  {item.icon} <span className="ml-2">{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
