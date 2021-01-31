import React from "react";
import coronaLogo from "../Images/coronaLogo.png";

const Header = () => {
	const image = coronaLogo;

	return (
		<div>
			<h1 className="main_header">
				C<img className="Header_image" src={image} alt="Covid" />
				vid Tracker App
			</h1>
		</div>
	);
};

export default Header;
