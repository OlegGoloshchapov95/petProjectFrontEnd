function Classnames(...classnames: any[] | string[]): string {
	return classnames.filter((e: string) => e).join(" ")
}

export {Classnames as classnames, Classnames as cc}
