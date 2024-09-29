"use client";
import Signup from "./component/signup";
import Main from "./component/main";
import { useToggleThemeContext } from "./context/toggleThemeContext";


export default function Home() {
  const { isDark } = useToggleThemeContext()!;
  return (
    <>{isDark ?
      <div className="bg-slate-800">
        <Main />
      </div>
      :
      <div>
        <Main />
      </div>
    }
    </>
  );
}
