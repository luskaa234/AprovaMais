import { NotificationProvider } from "./NotificationContext";
import { PreferencesProvider } from "./PreferencesContext";
import { ThemeProvider } from "./ThemeContext";
import { UserProvider } from "./UserContext";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <PreferencesProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </PreferencesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
