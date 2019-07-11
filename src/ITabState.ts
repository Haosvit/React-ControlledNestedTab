export interface ITabActiveState {
	[parentId: string]: IParentTabState;
}

export interface IParentTabState {
	currentActive: string;
	fullStates?: ITabActiveState | undefined;
}
