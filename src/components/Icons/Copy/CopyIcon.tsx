import styles from "./CopyIcon.module.scss"
import {cc} from "../../../utils/Classnames"

interface GoogleIconProps {
	className?: string
}

function CopyIcon(props: GoogleIconProps) {
	const {className} = props

	return (
		<svg
			className={cc(styles.Icon, className)}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15.5 13.15H13.33C11.55 13.15 10.1 11.71 10.1 9.92V7.75C10.1 7.34 9.77 7 9.35 7H6.18C3.87 7 2 8.5 2 11.18V17.82C2 20.5 3.87 22 6.18 22H12.07C14.38 22 16.25 20.5 16.25 17.82V13.9C16.25 13.48 15.91 13.15 15.5 13.15Z"
				fill="white"
			/>
			<path
				d="M17.8198 2H15.8498H14.7598H11.9298C9.66977 2 7.83977 3.44 7.75977 6.01C7.81977 6.01 7.86977 6 7.92977 6H10.7598H11.8498H13.8198C16.1298 6 17.9998 7.5 17.9998 10.18V12.15V14.86V16.83C17.9998 16.89 17.9898 16.94 17.9898 16.99C20.2198 16.92 21.9998 15.44 21.9998 12.83V10.86V8.15V6.18C21.9998 3.5 20.1298 2 17.8198 2Z"
				fill="white"
			/>
			<path
				d="M11.9806 7.1517C11.6706 6.8417 11.1406 7.0517 11.1406 7.4817V10.1017C11.1406 11.2017 12.0706 12.1017 13.2106 12.1017C13.9206 12.1117 14.9106 12.1117 15.7606 12.1117C16.1906 12.1117 16.4106 11.6117 16.1106 11.3117C15.0206 10.2217 13.0806 8.2717 11.9806 7.1517Z"
				fill="white"
			/>
		</svg>
	)
}

export default CopyIcon
