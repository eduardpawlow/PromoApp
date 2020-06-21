import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import bridge from "@vkontakte/vk-bridge";
import {
  platform,
  ANDROID,
  IOS,
  View,
  Panel,
  PanelHeader,
  Avatar,
  Group,
  Cell,
  Headline,
  Text,
  List,
  Spinner,
} from "@vkontakte/vkui";

import api from "../api";

const osName = platform();

const Profile = ({ id, user }) => {
  const [promoArray, setPromoArray] = useState([]);
  const [activePanel, setActivePanel] = useState("main");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchPromoArray() {
    const response = await api.getAllPromocodes({ vk_id: user.id });
    setPromoArray(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPromoArray();
  }, []);

  return (
    <View id={id} activePanel={activePanel}>
      <Panel id="main">
        <PanelHeader>Профиль</PanelHeader>
        {user && (
          <Group title="User Data Fetched with VK Bridge">
            <Cell
              before={user.photo_200 ? <Avatar src={user.photo_200} /> : null}
              description={user.city && user.city.title ? user.city.title : ""}
              style={{ borderBottom: "1px solid #D7D8D9", margin: "0px 20px" }}
            >
              {`${user.first_name} ${user.last_name}`}
            </Cell>
          </Group>
        )}
        <Headline weight="medium" style={{ fontSize: "21px", margin: "20px" }}>
          Найденные акции
        </Headline>
        {isLoading && <Spinner size="small"></Spinner>}
        {!isLoading && (
          <div>
            {promoArray.length !== 0 && (
              <List
                style={{
                  padding: "0px 20px",
                }}
              >
                {promoArray.map((promocode, index) => (
                  <Cell
                    before={
                      <div
                        style={{
                          fontSize: "20px",
                          width: "30px",
                          height: "100%",
                          color: "#000",
                        }}
                      >
                        {index + 1}
                      </div>
                    }
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderBottom: "1px solid #D7D8D9",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {promocode.shop}
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      {promocode.code}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "red",
                      }}
                    >
                      {`Действителен до: ${promocode.end_date}`}
                    </div>
                  </Cell>
                ))}
              </List>
            )}
            {promoArray.length === 0 && (
              <Text style={{ textAlign: "center" }}>
                {"Промокодов еще нет :("}
              </Text>
            )}
          </div>
        )}
      </Panel>
    </View>
  );
};

Profile.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default Profile;
