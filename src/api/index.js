import axios from "axios";

const hostname = "https://promoappback.herokuapp.com/api/v1/";

export default {
  checkNearPromos(data) {
    return axios({ method: "post", url: hostname + "getshops/", data });
  },

  getAllPromocodes(data) {
    return axios({
      method: "get",
      url: `${hostname}getallpromocodes/${data.vk_id}`,
    });
  },

  createPromocode(data) {
    return axios({ method: "post", url: hostname + "createpromocode/", data });
  },
};
