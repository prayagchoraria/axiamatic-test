import { EXIT_TEXT, LOGO_TEXT } from '../../utils/constants';

const Header: React.FC = () => {
  const handleExitClick = () => {
    alert('Exit');
  };

  return (
    <header
      data-testid="header"
      className="flex items-center justify-between p-7"
    >
      <h2 className="text-4xl font-bold">{LOGO_TEXT}</h2>
      <button
        id="exitBtn"
        onClick={handleExitClick}
        type="button"
        tabIndex={2}
        aria-label={EXIT_TEXT}
        className="background-transparent align-center text-md mr-1 mb-1 flex px-6 py-2 text-slate-400 underline underline-offset-4 outline-none focus:outline-none"
      >
        {EXIT_TEXT}
      </button>
    </header>
  );
};

export default Header;
