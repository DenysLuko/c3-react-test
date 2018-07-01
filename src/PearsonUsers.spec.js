import React from "react";
import { shallow } from "enzyme";
import { PearsonUsers } from "./PearsonUsers";

describe("PearsonUsers", () => {
  describe("general", () => {
    let component;
    beforeEach(() => {
      component = shallow(<PearsonUsers />);
    });

    it("renders a header", () => {
      const header = component.find(".header");
      expect(header.text()).toEqual("Pearson User Management");
    });

    it("renders all users", (done) => {
      setImmediate(() => {
        component.update();
        const users = component.find(".users-list-item");
        expect(users.length).toEqual(5);
        done();
      });
    });
  });

  describe("#deleteUser", () => {
    let component;

    beforeEach(() => {
      component = new PearsonUsers();
      component.setState = jest.fn();
    });

    it("is robust to invalid id", () => {
      expect(component.deleteUser('a')).toThrow(TypeError);
      expect(component.setState.mock.calls.length).toEqual(0);
    });

    it("is robust to lack of id", () => {
      expect(component.deleteUser()).toThrow(TypeError);
      expect(component.setState.mock.calls.length).toEqual(0);
    });

    it("is robust to invalid users", () => {
      component.state.users = {};
      expect(component.deleteUser(1)).toThrow(TypeError);
      expect(component.setState.mock.calls.length).toEqual(0);
    });

    it("removes user with passed id from state", () => {
      component.deleteUser(4)();
      const setStateCalledWith = component.setState.mock.calls[0][0];
      const setStateContainsUserOne = setStateCalledWith.users.some(user => user.id === 4)
      expect(setStateContainsUserOne).toEqual(false);
      expect(setStateCalledWith.users.length).toEqual(2);
    });
  });

  describe("#dedupeUsers", () => {
    let component;

    beforeEach(() => {
      component = new PearsonUsers();
    });

    it("is robust to invalid arguments", () => {
      expect(() => component.dedupeUsers(123)).toThrow(TypeError);
    });

    it("removes duplicate users based on id", () => {
      component.setState = jest.fn();
      const result = component.dedupeUsers([
        {id:1},
        {id:2},
        {id:2},
        {id:3}
      ]);
      const setStateCalledWith = component.setState.mock.calls[0][0];
      expect(setStateCalledWith).toEqual({users: [{id:1}, {id:2}, {id:3}]});
    });
  });
});
