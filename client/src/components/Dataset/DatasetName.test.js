import { shallowMount } from "@vue/test-utils";
import { getLocalVue } from "tests/jest/helpers";

import DatasetName from "./DatasetName";

const localVue = getLocalVue();

describe("Dataset Name", () => {
    it("test dataset default", async () => {
        const wrapper = shallowMount(DatasetName, {
            propsData: { item: { name: "name", state: "success" } },
            localVue,
        });
        const state = wrapper.findAll(".name");
        expect(state.length).toBe(1);
        expect(state.at(0).text()).toBe("name");
        const $linkCopy = wrapper.find(".dropdown-item:first-child");
        $linkCopy.trigger("click");
        expect(Array.isArray(wrapper.emitted().copyDataset)).toBe(true);
    });
    it("test dataset error", async () => {
        const wrapper = shallowMount(DatasetName, {
            propsData: { item: { name: "name", state: "error" } },
            localVue,
        });
        const state = wrapper.findAll(".name");
        expect(state.length).toBe(1);
        expect(state.at(0).text()).toBe("name");
        const errorstate = wrapper.findAll(".error");
        expect(errorstate.length).toBe(1);
        expect(errorstate.at(0).classes()).toEqual(expect.arrayContaining(["text-danger"]));
    });
    it("test dataset paused", async () => {
        const wrapper = shallowMount(DatasetName, {
            propsData: { item: { name: "name", state: "paused" } },
            localVue,
        });
        const state = wrapper.findAll(".name");
        expect(state.length).toBe(1);
        expect(state.at(0).text()).toBe("name");
        const pausestate = wrapper.findAll(".pause");
        expect(pausestate.length).toBe(1);
        expect(pausestate.at(0).classes()).toEqual(expect.arrayContaining(["text-info"]));
    });
});
