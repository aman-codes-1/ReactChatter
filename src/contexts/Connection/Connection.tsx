import { ReactElement, createContext } from 'react';
import { useNavigatorOnLine } from '../../hooks';

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100svh',
};

const imgStyles = {
  width: '50%',
  height: '50%',
};

export const ConnectionContext = createContext<any>({});

export const ConnectionProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const { isLoading, isOffline }: any = useNavigatorOnLine();

  if (!isLoading && isOffline) {
    return (
      <div style={containerStyles}>
        <img
          style={imgStyles}
          src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjIuODggMTIyLjg4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6I2Q5MmQyNzt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPm5vLXdpZmk8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEwMS42OCwzMi45MywzMi45MiwxMDEuNjhhNDkuMjksNDkuMjksMCwwLDAsNzcuODMtNDAuMjRoMEE0OS4zNCw0OS4zNCwwLDAsMCwxMDgsNDUuMTVhNDguODUsNDguODUsMCwwLDAtNi4zMi0xMi4yMlpNMjQsOTMuNSw5My40OSwyNEE0OS4zMSw0OS4zMSwwLDAsMCwyNCw5My41WiIvPjxwYXRoIGQ9Ik0zMC4yOSw1MkEzLDMsMCwwLDEsMjYsNTEuNjN2MGEzLDMsMCwwLDEsLjM0LTQuMjRoMEE1OS4yNyw1OS4yNywwLDAsMSw0My4yNywzN2E0OCw0OCwwLDAsMSwzNi40LjMxQTYxLDYxLDAsMCwxLDk2LjQ2LDQ3LjlhMS4yOSwxLjI5LDAsMCwxLC4xNy4xNiwzLDMsMCwwLDEsLjI3LDQuMDcsMS41NCwxLjU0LDAsMCwxLS4xNy4xOSwzLDMsMCwwLDEtNC4xNi4xOUE1NS4yMyw1NS4yMywwLDAsMCw3Ny40Nyw0M2E0MS44Niw0MS44NiwwLDAsMC0zMi4wOC0uMjdBNTMuMzgsNTMuMzgsMCwwLDAsMzAuMjksNTJaTTYxLjQ0LDc2LjA5QTYuNTksNi41OSwwLDEsMSw1Ni43Nyw3OGgwYTYuNjIsNi42MiwwLDAsMSw0LjY3LTEuOTNaTTUwLjA1LDcyLjVhMywzLDAsMCwxLTQuMTYtLjM1LDEuMzcsMS4zNywwLDAsMS0uMTYtLjE4LDMsMywwLDAsMSwuNDMtNC4wN2wuMTctLjE0YTI3LjY0LDI3LjY0LDAsMCwxLDcuMzMtNC4zMywyMS42OCwyMS42OCwwLDAsMSw3Ljg0LTEuNTIsMjEuMzUsMjEuMzUsMCwwLDEsNy44LDEuNDcsMjcuMTIsMjcuMTIsMCwwLDEsNy4zNCw0LjM2QTMsMywwLDAsMSw3Ny4wOCw3MmgwYTMsMywwLDAsMS0yLDEuMSwzLjA2LDMuMDYsMCwwLDEtMi4yMS0uNjZoMGEyMS4yNywyMS4yNywwLDAsMC01LjYyLTMuMzcsMTUuMTIsMTUuMTIsMCwwLDAtMTEuNDcsMCwyMiwyMiwwLDAsMC01LjcsMy40MVptLTkuNTYtOS43MS0uMTUuMTNhMy4wNiwzLjA2LDAsMCwxLTIuMDguNjcsMywzLDAsMCwxLTItMSwxLDEsMCwwLDEtLjE0LS4xNSwzLDMsMCwwLDEsLjM0LTQuMTYsNDUuNzgsNDUuNzgsMCwwLDEsMTIuMzYtOCwzMC43NiwzMC43NiwwLDAsMSwyNS42LjQyLDQ1Ljc0LDQ1Ljc0LDAsMCwxLDEyLjExLDguNDFsLjA4LjA3YTMuMDksMy4wOSwwLDAsMSwuODcsMiwzLDMsMCwwLDEtLjgyLDIuMTVsLS4wNy4wOGEzLDMsMCwwLDEtMiwuODcsMywzLDAsMCwxLTIuMTUtLjgxQTQwLjEzLDQwLjEzLDAsMCwwLDcyLDU2LjI4YTI0Ljc1LDI0Ljc1LDAsMCwwLTIxLS4zNSwzOS42OCwzOS42OCwwLDAsMC0xMC41LDYuODZaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNjEuNDQsMEE2MS4zMSw2MS4zMSwwLDEsMSwzOCw0LjY2LDYxLjI5LDYxLjI5LDAsMCwxLDYxLjQ0LDBabTQwLjI0LDMyLjkzTDMyLjkzLDEwMS42OEE0OS40NCw0OS40NCwwLDAsMCw4MC4zMSwxMDcsNDkuNTMsNDkuNTMsMCwwLDAsMTA3LDgwLjNhNDksNDksMCwwLDAsMy43My0xOC44NmgwYTQ4LjkzLDQ4LjkzLDAsMCwwLTkuMDgtMjguNTFaTTI0LDkzLjUsOTMuNSwyNEE0OS4zMiw0OS4zMiwwLDAsMCwyNCw5My41WiIvPjwvc3ZnPg=="
          alt="no-wifi-icon.svg"
        />
      </div>
    );
  }

  return (
    <ConnectionContext.Provider value={{ isLoading, isOffline }}>
      {children}
    </ConnectionContext.Provider>
  );
};
