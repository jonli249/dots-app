import * as Realm from "realm-web";
import { useEffect, useState } from "react";

// Define your MongoDB Realm App ID
const realmAppId = 'dotstester-bpjzg';

export function useApp() {
  const [app, setApp] = useState(null);

  // Move the getApp call into the useEffect
  useEffect(() => {
    const realmApp = Realm.getApp(realmAppId);
    setApp(realmApp);
  }, []);

  return app;
}
