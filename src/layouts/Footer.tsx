function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer footer-center p-4 text-base-content">
			<aside>
				<p>&copy; {currentYear} AshTheDev. All Rights Reserved.</p>
			</aside>
		</footer>
	);
}

export default Footer;
