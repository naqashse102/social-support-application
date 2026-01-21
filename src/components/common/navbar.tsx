import LanguageSwitch from "../language-switch";

const Navbar = () => {
  return (
    <nav className="bg-surface border-b border-border font-sans sticky top-0 z-50 h-28 flex items-center select-none">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center">
          <div className="shrink-0">
            <a href="/" aria-label="Home">
              <img
                className="h-18 w-auto object-contain transition-opacity hover:opacity-90"
                src="/uae-logo.svg"
                alt="UAE Government"
              />
            </a>
          </div>

          <LanguageSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
