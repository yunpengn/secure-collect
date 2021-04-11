import { JSEncrypt } from 'jsencrypt';

export function init() {
	// Imports the encryption scheme.
	const scheme = importInputScheme();
	console.log("Going to use '" + scheme + "' as the encryption scheme!");

	// Imports all declared keys.
	const keys = importInputKeys();
	console.log("Finished loading all " + keys.size + " input key(s)!");
}

function importInputScheme() {
	const tags = document.getElementsByTagName("meta");
	for (let i = 0; i < tags.length; i++) {
		const meta = tags[i];

		// Skips if the meta name does not match.
		if (meta.getAttribute("name") !== "input-scheme") {
			continue;
		}

		// Gets the content.
		return meta.getAttribute("content");
	}

	// Throws error when there is no scheme.
	throw "No input scheme is defined";
}

function importInputKeys() {
	const keys = new Map();

	// Iterates over every meta tag with the desired name.
	const tags = document.getElementsByTagName("meta");
	for (let i = 0; i < tags.length; i++) {
		const meta = tags[i];

		// Skips if the meta name does not match.
		if (meta.getAttribute("name") !== "input-key") {
			continue;
		}

		// Gets the content.
		const content = meta.getAttribute("content");

		// Splits to process each key.
		content.split(",").forEach(element => {
			const trimmed = element.trim();

			// Finds out the key name & value.
			const pos = trimmed.indexOf('=');
			const key = trimmed.substring(0, pos).trim();
			const val = trimmed.substring(pos + 1).trim();

			// Inserts the found key.
			keys.set(key, atob(val));
		});
	}

	// Returns all the input keys declared.
	return keys;
}

function encrypt(key, val) {
	const encrypt = new JSEncrypt();

	// Sets the encryption key.
	encrypt.setPublicKey(key);

	// Returns the encryption result.
	return encrypt.encrypt(val);
}
