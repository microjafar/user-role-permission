import apiRequest from ".";

export function restApi(path) {
  return {
    gets(query_params = {}) {
      return apiRequest().get(path, { params: query_params });
    },
    get(id) {
      return apiRequest().get(`${path}/${id}`);
    },
    store(payload) {
      return apiRequest().post(path, payload);
    },
    update(payload) {
      // The payload must contain the object id
      // ex: payload.id = 5
      // { id: 5, name: 'example', ... }
      return apiRequest().put(`${path}/${payload.id}`, payload);
    },
    delete(id) {
      return apiRequest().delete(`${path}/${id}`);
    },
  };
}
