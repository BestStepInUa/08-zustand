import css from './Footer.module.css'

export default function Footer() {
	return (
		<footer className={css.footer}>
			<div className={css.content}>
				<p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
				<div className={css.wrap}>
					<p>Developer: Oleksandr Vasylenko</p>
					<p>
						Contact me:
						<a href='mailto:beststep.in.ua@gmail.com'> beststep.in.ua@gmail.com</a>
					</p>
				</div>
			</div>
		</footer>
	)
}

