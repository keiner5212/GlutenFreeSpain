/** @format */

import SimpleFooter from "components/SimpleFooter";
import Header from "components/Header";

function GeneralLayout({ children }) {
	return (
		<>
			<Header></Header>
			<main>{children}</main>
			<SimpleFooter></SimpleFooter>
		</>
	);
}

export default GeneralLayout;
