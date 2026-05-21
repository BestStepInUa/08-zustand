import Link from 'next/link'

import css from './SidebarNotes.module.css'

const sidebarItems = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo']

export default function SidebarNotes() {
	return (
		<ul className={css.menuList}>
			<li className={css.menuItem}>
				<Link href={`/notes/filter/all`} className={css.menuLink}>
					All notes
				</Link>
			</li>
			{sidebarItems.map((item) => (
				<li key={item} className={css.menuItem}>
					<Link href={`/notes/filter/${item}`} className={css.menuLink}>
						{item}
					</Link>
				</li>
			))}
		</ul>
	)
}

