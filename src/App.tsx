import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { createPage } from "./utils/createPage";

function App() {
  const initialState = createPage();
  return (
    <AppStateProvider initialState={initialState}>
      <Page />
    </AppStateProvider>
  );
}

export default App;
