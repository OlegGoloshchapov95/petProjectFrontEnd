import styles from "./WhiteButton.module.scss"
import {cc} from "../../utils/Classnames"
import {useNavigate} from "react-router-dom"
import {useCallback} from "react"

interface WhiteButtonProps {
	children: any
	onClick?: (e: any) => void
	className?: any
	socialComponent?: any
	variant?: "transparent-with-white-border" | "white-text"
	isSubmit?: boolean
	isNotFullWith?: boolean
	disabled?: boolean
	to?: string
	isLoading?: boolean
}

function WhiteButton(props: WhiteButtonProps) {
	const {
		children,
		onClick,
		className,
		variant,
		isSubmit,
		isNotFullWith,
		disabled,
		to,
	} = props

	const navigate = useNavigate()

	const gotoCallback = useCallback(() => {
		if (to) {
			navigate(to)
		}
	}, [navigate, to])

	const handleOnClick = (e: any) => {
		onClick && onClick(e)
		gotoCallback()
	}

	return (
		<button
			className={cc(
				styles.Button,
				variant && styles[variant],
				!variant && styles["default-variant"],
				className && className,
				isNotFullWith && styles["not-full-width"],
				disabled && styles.Disabled
			)}
			onClick={handleOnClick}
			{...(isSubmit && {type: "submit"})}
			{...(disabled && {disabled: true})}
		>
			{children}
		</button>
	)
}

export default WhiteButton
