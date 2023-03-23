import styles from "./CopyWhiteIcon.module.scss"
import {cc} from "@/utils/Classnames"

interface CopyWhiteIconProps {
	className?: string
}

function CopyWhiteIcon(props: CopyWhiteIconProps) {
	const {className} = props

	return (
		<svg
			className={cc(styles.Icon, className)}
			width="19"
			height="20"
			viewBox="0 0 19 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="1.5"
				y="5"
				width="12"
				height="14"
				rx="1.5"
				stroke="#888888"
				strokeWidth="1.5"
			/>
			<path
				d="M13.5 15H16C16.8284 15 17.5 14.3284 17.5 13.5V2.5C17.5 1.67157 16.8284 1 16 1H7C6.17157 1 5.5 1.67157 5.5 2.5V5"
				stroke="#888888"
				strokeWidth="1.5"
			/>
		</svg>
	)
}

export default CopyWhiteIcon
