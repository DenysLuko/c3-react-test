import React from "react";
import { shallow } from "enzyme";
import PearsonUser from "./PearsonUser";

const mockUser = {
  id: 4,
  firstName: "Eve",
  lastName: "Holt",
  avatar:
    "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg",
  deleteUser: () => {}
};

describe("PearsonUser", () => {
  let component;
  beforeEach(() => {
    component = shallow(<PearsonUser {...mockUser}/>);
  });

  it("renders avatar for a user", () => {
    const avatar = component.find(".user__avatar");
    expect(avatar.length).toEqual(1);
  });

  it("renders user name for a user", () => {
    const name = component.find(".user__name");
    expect(name.length).toEqual(1);

  });

  it("renders delete button for a user", () => {
    const button = component.find(".user__delete-button");
    expect(button.length).toEqual(1);
  });
});
