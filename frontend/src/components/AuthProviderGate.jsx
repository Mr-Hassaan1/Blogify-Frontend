import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { setUser } from "@/Redux/authSlice";
import App from "@/App";

function AuthProviderGate() {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const restoreSession = async () => {
      try {
        const res = await axios.get("https://blogify-backendpk.vercel.app/api/v1/user/me", {
          withCredentials: true,
        });

        if (mounted && res.data.success) {
          dispatch(setUser(res.data.user));
        }
      } catch {
        if (mounted) {
          dispatch(setUser(null));
        }
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    };

    restoreSession();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-200">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return <App />;
}

export default AuthProviderGate;
