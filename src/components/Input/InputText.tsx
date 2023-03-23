import styles from "./InputText.module.scss"
import {cc} from "../../utils/Classnames"
import {useEffect, useRef} from "react"
import {useClipboard} from "use-clipboard-copy"
import CopyIcon from "../Icons/Copy/CopyIcon"
import CopyWhiteIcon from "../Icons/CopyWhite/CopyWhiteIcon"
import ErrorIcon from "../Icons/Error/ErrorIcon"
import VisibilityIcon from "../Icons/VisibilityIcon/VisibilityIcon"
import VisibilityOffIcon from "../Icons/VisibilityOffIcon/VisibilityOffIcon"
import SearchIcon from "../Icons/Search/SearchIcon"

interface InputTextProps {
	field?: any
	required?: boolean | false
	placeholder?: string
	type?:
		| "text"
		| "number"
		| "password"
		| "email"
		| "copyLink"
		| "copyLinkWhite"
		| "searchIcon"
	id?: string
	disabled?: boolean
	maxLength?: number
	error?: string
	autoComplete?: boolean
	spellCheck?: boolean
	showOKIcon?: boolean
	onClick?: any
	onChange?: any
	fullWidth?: "full"
	value?: string
	readonly?: boolean
	onFocus?: any
	isPointerEventsNone?: boolean
	inputProhibited?: boolean
	onChangeInput?: any
	onBlur?: any
	isNarrowInHeight?: boolean
	isThinInput?: boolean
}

function InputText(props: InputTextProps) {
	const {
		field,
		placeholder,
		type,
		id,
		disabled,
		maxLength,
		autoComplete,
		spellCheck,
		fullWidth,
		error,
		value,
		readonly,
		onFocus,
		onClick,
		onChange,
		isPointerEventsNone,
		inputProhibited,
		onChangeInput,
		onBlur,
		isNarrowInHeight,
		isThinInput,
	} = props

	const visibility: any = useRef(null)
	const visibilityOff: any = useRef(null)
	const inputRef: any = useRef<HTMLInputElement>(null)
	const clipboard = useClipboard()
	const onVisibleOn = () => {
		inputRef.current.type = "text"
		visibility.current.style.display = "none"
		visibilityOff.current.style.display = "inline-block"
	}
	const onVisibleOff = () => {
		inputRef.current.type = "password"
		visibilityOff.current.style.display = "none"
		visibility.current.style.display = "inline-block"
	}
	const copyLink = () => {
		clipboard.copy(value)
	}
	useEffect(() => {
		field && (value || value === "") && field.onChange(value)
	}, [value, field])
	return (
		<div
			className={cc(
				styles.InputTextContainer,
				fullWidth && styles["FullWidth-" + fullWidth]
			)}
		>
			<div
				className={cc(
					styles["input-inner-wrapper"],
					error && styles["isError"]
				)}
			>
				<input
					{...(field && {...field})}
					ref={inputRef}
					{...(onBlur && {onBlur: onBlur})}
					{...(inputProhibited && {
						onKeyDown: (e) => {
							if (e.keyCode !== 9) {
								e.preventDefault()
							}
							if (e.keyCode === 8 || e.keyCode === 46) {
								onChangeInput("")
							}
						},
						onKeyPress: (e) => {
							e.preventDefault()
						},
					})}
					className={cc(
						disabled && styles["disabled"],
						fullWidth && styles["FullWidth-" + fullWidth],
						(type === "password" ||
							type === "copyLink" ||
							type === "copyLinkWhite") &&
							styles["icon-in-right"],
						isPointerEventsNone && styles["pointer-events-none"],
						type === "copyLinkWhite" && styles["copyLinkWhite"],
						type === "searchIcon" && styles["searchIcon"],
						isNarrowInHeight && styles.isNarrowInHeight,
						isThinInput && styles.isThinInput
					)}
					{...(id && {id: id})}
					{...((value || value === "") && {value: value})}
					{...(type !== undefined ? {type: type} : {type: "text"})}
					{...(type === "number" && {
						inputMode: "decimal",
					})}
					{...((type === "copyLink" || readonly) && {
						readOnly: !!value,
					})}
					{...(placeholder && {placeholder: placeholder})}
					disabled={disabled ? disabled : false}
					autoComplete={autoComplete ? "on" : "off"}
					spellCheck={!!spellCheck}
					{...(maxLength && {maxLength: maxLength})}
					{...(onFocus && {onFocus: onFocus})}
					{...(onChange && {onChange: onChange})}
					{...(onClick && {onClick: onClick})}
				/>
				{type === "copyLink" && (
					<span onClick={copyLink}>
						<CopyIcon className={styles["copy-icon"]} />
					</span>
				)}
				{type === "copyLinkWhite" && (
					<span onClick={copyLink}>
						<CopyWhiteIcon className={styles["copy-icon"]} />
					</span>
				)}
				{error && <ErrorIcon className={styles["error-icon"]} />}
				{type === "password" && !disabled && !error && (
					<div className={styles.visibilityIcon}>
						<span ref={visibility} onClick={onVisibleOn}>
							<VisibilityIcon />
						</span>
						<span
							ref={visibilityOff}
							onClick={onVisibleOff}
							style={{display: "none"}}
						>
							<VisibilityOffIcon />
						</span>
					</div>
				)}
				{type === "searchIcon" && (
					<span>
						<SearchIcon className={styles["search-icon"]} />
					</span>
				)}
			</div>
			{error && (
				<div className={styles.ErrorContainer}>
					<p className={styles.InputTextError}>{error}</p>
				</div>
			)}
		</div>
	)
}

export default InputText
