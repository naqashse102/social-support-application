import "./App.css";
import WizardContainer from "./components/wizard-container";
import { AppLayout } from "./layout";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { DirectionHandler } from "./components/direction-handler";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <DirectionHandler/>
      <AppLayout>
        <WizardContainer />
      </AppLayout>
    </I18nextProvider>
  );
}

export default App;
