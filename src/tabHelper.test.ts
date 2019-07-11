import * as tabHelper from "./tabHelper";
import { ITabActiveState } from "./ITabState";
import ITab from "./ITab";

describe("tab state helper", () => {
	it("generate state with an input of ITab[]", () => {
		const tabs: ITab[] = [
			{
				id: "1",
				title: "A",
				subTabs: [
					{
						id: "1:0",
						title: "Aa"
					},
					{
						id: "1:1",
						title: "Ab"
					}
				]
			},
			{
				id: "2",
				title: "B",
				subTabs: [
					{
						id: "2:0",
						title: "Ba"
					}
				]
			}
		];

		const state: ITabActiveState = {
			root: tabHelper.generateTabState(tabs)
		};

		expect(state).toEqual({
			root: {
				currentActive: "1",
				fullStates: {
					"1": {
						currentActive: "1:0"
					},
					"2": {
						currentActive: "2:0"
					}
				}
			}
		});
	});
});
