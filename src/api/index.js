import axios from "axios";

const hostname = "https://promoappback.herokuapp.com/api/v1/";

export default {
  checkNearPromos(data) {
    return axios({ method: "post", url: hostname + "getshops/", data });
  },
};
