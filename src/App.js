import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { Root, View, Panel, List, Cell } from "@vkontakte/vkui";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";
import "@vkontakte/vkui/dist/vkui.css";

import Geo from "./views/Geo";

const App = () => {
  const [appID, setAppID] = useState(7514365);
  const [accessToken, setAccessToken] = useState("");
  const [activeView, setActiveView] = useState("geo");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });

    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }

    async function getAuthToken() {
      console.log(1);

      const token = await bridge.send("VKWebAppGetAuthToken", {
        app_id: appID,
        scope: "friends",
      });

      setAccessToken(token);
    }

    fetchData();
    getAuthToken();
  }, []);

  console.log(fetchedUser);

  return (
    <Root activeView={activeView}>
      {/* <View id="geo" activePanel={activePanel} popout={popout}>
        <Home id="home" fetchedUser={fetchedUser} go={go} />
        <Friends
          id="friends"
          go={go}
          fetchedUser={fetchedUser}
          access_token={accessToken.access_token}
        />
        <Geo id="geo" go={go} access_token={accessToken.access_token}></Geo>
      </View> */}
      <Geo id="geo" user={fetchedUser}></Geo>
    </Root>
  );
};

export default App;
