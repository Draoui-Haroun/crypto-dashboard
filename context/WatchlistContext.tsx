
"use client";
import {createContext, useContext, useEffect, useState, ReactNode} from "react";


type WatchlistContextType = {
  watchlist: string[];
  toggleWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

type WatchlistProviderProps = {
  children: ReactNode;
};

export function WatchlistProvider({
  children,
}: WatchlistProviderProps) {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");

    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    );
  }, [watchlist]);

  const toggleWatchlist = (id: string) => {
    setWatchlist((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  const isInWatchlist = (id: string) => {
    return watchlist.includes(id);
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        toggleWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error(
      "useWatchlist must be used inside WatchlistProvider"
    );
  }

  return context;
}