import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import bridge from "@vkontakte/vk-bridge";
import {
  platform,
  IOS,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  List,
  Cell,
  Avatar,
} from "@vkontakte/vkui";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";

import utils from "../utils";

const osName = platform();

const ListGeo = ({ geoArray }) => {
  return (
    <List>
      {geoArray.length !== 0 &&
        geoArray.map((geo, index) => (
          <Cell key={`geopoint-${index}`}>{`${geo.lat} ${geo.long}`}</Cell>
        ))}
    </List>
  );
};

export default ListGeo;
