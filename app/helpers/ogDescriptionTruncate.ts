export const ogDescriptionTruncate = (str: string, max = 160) =>
	str.length > max ? `${str.slice(0, max - 3)}...` : str

