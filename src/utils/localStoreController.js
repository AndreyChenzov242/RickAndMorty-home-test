export const localStoreController = {
  addCharacter(character) {
    const { id, name, isLiked, isDisliked, image, status } = character;

    if (this.getCharacter()) {
      if (this.getCharacter(name)) {
        const characters = this.getCharacter();
        characters.forEach((element) => {
          element.name === name
            ? (element.isLiked = isLiked)
            : (element.isLiked = element.isLiked);
        });
        characters.forEach((element) => {
          element.name === name
            ? (element.isDisliked = isDisliked)
            : (element.isDisliked = element.isDisliked);
        });
        characters.forEach((element) => {
          element.name === name
            ? (element.image = image || "")
            : (element.image = element.image);
        });
        localStorage.setItem("characters", JSON.stringify(characters));
        return;
      }

      localStorage.setItem(
        "characters",
        JSON.stringify([
          ...this.getCharacter(),
          {
            id: id,
            name: name,
            status: status,
            isLiked: isLiked,
            isDisliked: isDisliked,
          },
        ])
      );

      return;
    }

    localStorage.setItem("characters", JSON.stringify(new Array(character)));
  },

  getCharacter(name) {
    if (!localStorage.getItem("characters")) {
      return;
    }
    if (!name) {
      return JSON.parse(localStorage.getItem("characters"));
    }

    const characters = JSON.parse(localStorage.getItem("characters"));

    let index = -1;
    for (let i = 0; i < characters.length; i++) {
      if (characters[i].name === name) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      return;
    }
    return characters[index];
  },
};
