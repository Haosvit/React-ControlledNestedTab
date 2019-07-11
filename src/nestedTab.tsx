import React from "react";
import { Tabs } from "antd";
import ITab from "./ITab";
import tabsJson from "./tabs.json";
import { ITabActiveState, IParentTabState } from "./ITabState";
import * as tabHelper from "./tabHelper";

const TabPane = Tabs.TabPane;

interface IProps {
	currentTabData: any;
}

interface IState {
	activeState?: ITabActiveState | undefined;
	tabs?: ITab[];
	currentContentId: string;
}

export default class NestedTab extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			tabs: [],
			currentContentId: "0"
		};

		this.onTabClick = this.onTabClick.bind(this);
		this.renderNestedTab = this.renderNestedTab.bind(this);
	}

	public componentDidMount() {
		let tabState = tabHelper.generateTabState(tabsJson);
		this.setState({
			tabs: tabsJson,
			activeState: {
				root: tabState
			},
			currentContentId: tabHelper.getCurrentContentId(tabState)
		});
	}

	private onTabClick(parentId: string, key: string) {
		let newActiveState = Object.assign({}, this.state.activeState);

		let parentState: IParentTabState = tabHelper.getParentTabState(
			newActiveState.root,
			parentId
		);

		if (parentState && parentState.currentActive !== key) {
			parentState.currentActive = key;
			// look for current active all the way down in sub tabs
			const contentId =
				parentState && tabHelper.getCurrentContentId(parentState);
			console.log("Current tab Id: ", contentId);

			this.setState({
				activeState: newActiveState,
				currentContentId: contentId
			});
		}
	}

	private renderNestedTab(
		tabs: ITab[],
		parentId: string,
		activeState: ITabActiveState | undefined,
		onClick: (parentId: string, key: string) => void
	) {
		if (!tabs || !tabs.length) {
			return null;
		}

		// if want to keep all tab state, get the 'currentActiveId' instead
		const tabState = activeState && activeState[parentId];
		const activeKey = tabState && tabState.currentActive;
		return (
			<Tabs
				type="card"
				key={parentId}
				{...activeKey && { activeKey: activeKey }}
				defaultActiveKey={tabs[0].id}
				onTabClick={(childKey: string) => onClick(parentId, childKey)}>
				{tabs.map(tab => {
					return (
						<TabPane tab={tab.title} key={tab.id}>
							{tab.subTabs &&
								this.renderNestedTab(
									tab.subTabs || [],
									tab.id,
									tabState && tabState.fullStates,
									onClick
								)}
							{!tab.subTabs && this.state.currentContentId === tab.id && (
								<p>{this.props.currentTabData}</p>
							)}
						</TabPane>
					);
				})}
			</Tabs>
		);
	}

	public render() {
		const tabs = this.state.tabs || [];
		const activeState = this.state.activeState;
		return this.renderNestedTab(tabs, "root", activeState, this.onTabClick);
	}
}
