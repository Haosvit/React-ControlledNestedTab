import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import NestedTab from "./nestedTab";

ReactDOM.render(
	<NestedTab currentTabData={["abc"]} />,
	document.getElementById("root")
);
