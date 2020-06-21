import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import bridge from "@vkontakte/vk-bridge";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  List,
  Cell,
  Avatar,
  ModalPageHeader,
  ModalPage,
  ModalCard,
  ModalRoot,
  View,
  platform,
  ANDROID,
  IOS,
  Button,
} from "@vkontakte/vkui";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Done from "@vkontakte/icons/dist/24/done";
import Icon24Add from "@vkontakte/icons/dist/24/add";
import coupon from "../img/coupon.svg";

import api from "../api";

const MapStyle = {
  width: "100vw",
  height: "100vh",
};

const modalHeaderStyle = {
  textAlign: "center",
  background: "red",
};

const modalPageStyle = {
  paddingBottom: "50px",
  background: "red",
  fontSize: "10px",
};

const osName = platform();

const options = {
  iconLayout: "default#image",
  iconImageHref: coupon,
  iconImageSize: [50, 50],
  iconImageOffset: [0, 0],
};

const Geo = ({ id, user, access_token }) => {
  const [shopsArray, setShopsArray] = useState([]);
  const [geoPoint, setGeoPoint] = useState({});
  const [activePanel, setActivePanel] = useState("main");
  const [currentShop, setCurrentShop] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [geoPointCenter, setGeoPointCenter] = useState({});

  async function getCenter() {
    const result = await bridge.send("VKWebAppGetGeodata");
    setGeoPointCenter(result);
  }

  async function fetchGeo() {
    const result = await bridge.send("VKWebAppGetGeodata");
    setGeoPoint(result);
    try {
      const shops = await api.checkNearPromos({
        lat: result.lat,
        long: result.long,
      });

      // const ids = shopsArray.map((el) => el.id);
      // let newArray = [];
      // // newArray = newArray.concat(shopsArray);
      // // console.log(newArray);

      // for (const shop of shops.data) {
      //   // console.log(ids.includes(shop.id));
      //   if (ids.includes(shop.id)) {
      //     continue;
      //   } else {
      //     newArray.push(shop);
      //   }
      // }

      // console.dir(shops.data);
      // setShopsArray(shopsArray.concat(newArray));
      // console.log(shopsArray);

      setShopsArray(shops.data);
    } catch (e) {
      console.dir(e);
    }
    console.log(`Ваша позиция: ${result.lat} ${result.long}`);
  }

  useEffect(() => {
    const interval = setInterval(fetchGeo, 2000);
    getCenter();
    return () => clearInterval(interval);
  }, [geoPoint]);

  const go = (e) => {
    setActivePanel(e.currentTarget.dataset.to);
  };

  const selectCoupon = (shop) => {
    setCurrentShop(shop);
    setActiveModal("PromoCard");
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  async function addPromocode() {
    try {
      const response = await api.createPromocode({
        vk_id: user.id,
        promocode_id: currentShop.promocode.id,
      });
      console.log(response);

      closeModal();
    } catch (error) {}
  }

  const modalheader = (
    <ModalPageHeader
      style={modalHeaderStyle}
      right={
        <Fragment>
          {osName === ANDROID && (
            <PanelHeaderButton onClick={closeModal}>
              <Icon24Cancel />
            </PanelHeaderButton>
          )}
          {osName === IOS && (
            <PanelHeaderButton onClick={closeModal}>Закрыть</PanelHeaderButton>
          )}
        </Fragment>
      }
    >
      <div style={{ width: "100%", textAlign: "center" }}>
        {currentShop !== null && currentShop.name}
      </div>
    </ModalPageHeader>
  );

  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalPage
        style={modalPageStyle}
        id="PromoCard"
        settlingHeight={50}
        onClose={closeModal}
        header={modalheader}
      >
        <div>
          {currentShop && (
            <div
              style={{
                fontSize: "14px",
                lineHeight: "18px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                letterSpacing: "-0.154px",
                color: "#6D7885",
              }}
            >
              {currentShop.promocode.img && (
                <div
                  style={{
                    height: "150px",
                    width: "200px",
                    marginBottom: "20px",
                    backgroundSize: "cover",
                    backgroundImage: `url(${`https://promoappback.herokuapp.com${currentShop.promocode.img}`})`,
                    borderRadius: "10px",
                  }}
                >
                  {/* <img
                    src={`https://promoappback.herokuapp.com${currentShop.promocode.img}`}
                  /> */}
                </div>
              )}
            </div>
          )}
          {user && (
            <div
              style={{
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "23px",
                textAlign: "center",
              }}
            >
              {`Вот ваша персональная акция, ${user.first_name}!`}
            </div>
          )}
          {currentShop && (
            <div
              style={{
                fontSize: "14px",
                lineHeight: "18px",
                textAlign: "center",
                letterSpacing: "-0.154px",
                color: "#6D7885",
              }}
            >
              {`${currentShop.promocode.text}`}
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <Button
              before={<Icon24Add />}
              style={{
                marginBottom: "50px",
                marginTop: "20px",
              }}
              align="center"
              size="l"
              onClick={addPromocode}
            >
              Добавить
            </Button>
          </div>
        </div>
      </ModalPage>
    </ModalRoot>
  );

  return (
    <View id={id} activePanel={activePanel} modal={modal}>
      <Panel id="main">
        <PanelHeader>Найди свою скидку!</PanelHeader>
        <YMaps>
          {geoPointCenter.available && (
            <Map
              defaultState={{
                center: [geoPointCenter.lat, geoPointCenter.long],
                zoom: 18,
              }}
              style={MapStyle}
            >
              {geoPoint.available && (
                <Placemark geometry={[geoPoint.lat, geoPoint.long]} />
              )}
              {shopsArray.map((shop) => (
                <Placemark
                  onClick={() => selectCoupon(shop)}
                  key={shop.id}
                  geometry={[shop.location.lat, shop.location.long]}
                  options={options}
                />
              ))}
            </Map>
          )}
        </YMaps>
      </Panel>
    </View>
  );
};

Geo.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default Geo;
