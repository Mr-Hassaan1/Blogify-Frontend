import { useSelector } from "react-redux";

function ThemeProvider({children }) {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme}>
      <div className="bg-gray-200 dark:bg-slate-900 text-gray-800 dark:text-gray-200">
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
