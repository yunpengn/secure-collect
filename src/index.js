export function init() {
	// Imports all declared keys.
	const keys = importInputKeys();
	console.log("Finished loading all " + keys.size + " input key(s)!");
}

function importInputKeys() {
	const keys = new Map();

	// Iterates over every meta tag with the desired name.
	const tags = document.getElementsByTagName("meta");
	for (let i = 0; i < tags.length; i++) {
		const meta = tags[i];

		// Skips if the meta name does not match.
		if (meta.getAttribute("name") !== "input-key") {
			return;
		}

		// Gets the content.
		const content = meta.getAttribute("content");

		// Splits to process each key.
		content.split(",").forEach(element => {
			const trimmed = element.trim();

			// Finds out the key name & value.
			if (trimmed.split("=").length !== 2) {
				console.log("The given key '" + trimmer + "' is in invalid format");
				return;
			}
			const key = trimmed.split("=")[0].trim();
			const val = trimmed.split("=")[1].trim();

			// Inserts the found key.
			keys.set(key, val);
		});
	}

	// Returns all the input keys declared.
	return keys;
}
