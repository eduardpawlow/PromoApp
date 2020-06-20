import bridge from "@vkontakte/vk-bridge";

export default {
  sendAPIMethod(method, params = {}) {
    const API_VERSION = "5.110";

    params.v = API_VERSION;

    console.log(params);

    return bridge.send("VKWebAppCallAPIMethod", {
      method,
      request_id: "ToxicOrk",
      params,
    });
  },
};
