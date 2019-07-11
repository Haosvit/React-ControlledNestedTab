export default interface ITab {
	id: string;
	title: string;
	subTabs?: ITab[];
}
