const allCharactersUrl = "https://rickandmortyapi.com/api/character";
const allEpisodeUrl = "https://rickandmortyapi.com/api/episode";

export const rickMortyApi = {
  async getСharacters() {
    const response = await fetch(allCharactersUrl, { method: "GET" }).then(
      (res) => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        } else {
          let error = new Error(res.statusText);
          error.response = res;
          throw error;
        }
      }
    );
    const json = await response.json();

    return json;
  },

  async getСharactersFromPage(page) {
    const response = await fetch(allCharactersUrl + "/?page=" + page, {
      method: "GET",
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res;
      } else {
        let error = new Error(res.statusText);
        error.response = res;
        throw error;
      }
    });
    const json = await response.json();

    return json;
  },

  async getСharactersById(id) {
    const response = await fetch(allCharactersUrl + "/" + id, {
      method: "GET",
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res;
      } else {
        let error = new Error(res.statusText);
        error.response = res;
        throw error;
      }
    });
    const json = await response.json();

    return json;
  },

  async getСharactersWithName(name) {
    const response = await fetch(allCharactersUrl + "/?name=" + name, {
      method: "GET",
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res;
      } else {
        let error = new Error(res.statusText);
        error.response = res;
        throw error;
      }
    });
    const json = await response.json();

    return json;
  },

  async getEpisode(episode) {
    const response = await fetch(allEpisodeUrl + "/" + episode, {
      method: "GET",
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res;
      } else {
        let error = new Error(res.statusText);
        error.response = res;
        throw error;
      }
    });
    const json = await response.json();

    return json;
  },
};
