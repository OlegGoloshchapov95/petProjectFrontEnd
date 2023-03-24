import {useCallback} from "react"
import {useNavigate} from "react-router-dom"

interface LinkProps {
	children: any
	to: string
	className?: string
}

function Link(props: LinkProps) {
	const {children, to, className} = props
	const navigate = useNavigate()

	const gotoCallback = useCallback(() => {
		navigate(to)
	}, [navigate, to])

	return (
		<a
			href={to}
			onClick={(e) => {
				e.preventDefault()
				gotoCallback()
			}}
			className={className}
		>
			{children}
		</a>
	)
}

export default Link
