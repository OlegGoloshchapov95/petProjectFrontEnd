import styles from "./SearchIcon.module.scss"
import {cc} from "../../../utils/Classnames"

interface SearchIconProps {
	className?: string
}

function SearchIcon(props: SearchIconProps) {
	const {className} = props

	return (
		<svg
			className={cc(styles.Icon, className)}
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle cx="9" cy="9" r="6.15" stroke="white" strokeWidth="1.7" />
			<line
				x1="14.2021"
				y1="14"
				x2="17"
				y2="16.7979"
				stroke="white"
				strokeWidth="1.7"
				strokeLinecap="round"
			/>
		</svg>
	)
}

export default SearchIcon
