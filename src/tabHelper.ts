import ITab from "./ITab";
import { IParentTabState } from "./ITabState";

export function generateTabState(
	tabs: ITab[] | undefined
): IParentTabState | undefined {
	if (!tabs) {
		return undefined;
	}

	let fullStates = tabs.reduce((stateDict, tab) => {
		let subStates = generateTabState(tab.subTabs);

		if (subStates) {
			stateDict[tab.id] = subStates;
		}

		return stateDict;
	}, {});

	if (!Object.keys(fullStates).length) {
		fullStates = undefined;
	}

	let state = {
		currentActive: tabs[0].id,
		fullStates
	};

	return state;
}

export function getCurrentContentId(tabState: IParentTabState) {
	if (!tabState) {
		return undefined;
	}

	let activePaneId = tabState.currentActive;
	let fullStates = tabState.fullStates;

	if (
		!fullStates ||
		!fullStates.hasOwnProperty(tabState.currentActive) ||
		!fullStates[tabState.currentActive]
	) {
		return activePaneId;
	}

	return getCurrentContentId(fullStates[activePaneId]);
}

export function getParentTabState(state: IParentTabState, parentId: string) {
	if (!state) {
		return undefined;
	}

	if (parentId === "root") {
		return state;
	} else if (
		state &&
		state.fullStates &&
		state.fullStates.hasOwnProperty(parentId)
	) {
		return state.fullStates[parentId];
	}

	return getParentTabState(state.fullStates[state.currentActive], parentId);
}
