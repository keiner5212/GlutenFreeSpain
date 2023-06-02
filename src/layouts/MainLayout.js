/** @format */

import Footer from "components/Footer";
import Header from "components/Header";

function MainLayout({ children }) {
	return (
		<>
			<Header></Header>
			<main>{children}</main>
			<Footer></Footer>
		</>
	);
}

export default MainLayout;
