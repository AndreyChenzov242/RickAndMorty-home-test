export const localStoreController = {
  addCharacter(character) {
    const { id, name, isLiked, isDisliked, image, status } = character;

    if (this.getCharacter()) {
      if (this.getCharacter(name)) {
        const characters = this.getCharacter();

        characters.forEach((element) => {
          if (element.name === name) {
            element.isLiked = isLiked;
            element.isDisliked = isDisliked;
            element.image = image || "";
          }
        });

        this.setCharacter(characters);
        return;
      }

      this.setCharacter([
        ...this.getCharacter(),
        {
          id: id,
          name: name,
          status: status,
          isLiked: isLiked,
          isDisliked: isDisliked,
        },
      ]);
      return;
    }

    this.setCharacter(new Array(character));
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

  setCharacter(character) {
    localStorage.setItem("characters", JSON.stringify(character));
  },
};
