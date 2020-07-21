require("isomorphic-fetch");
const bitcore = require("bitcore-lib");

const defaultXpub =
	"xpub6BjvMVU8RJBPBKgtTCckY4mvKkCcwv5Wctm34U7ZVsCXNL7ZizWK8Bj7RpmJruzkWEW698HEGjgppaH1gQYQwtDmPmpRd9XowwP8j493i1J";

async function getBtcPaymentAddress(id, xpubkey = defaultXpub) {
	console.log("smksmsksmksms skmsksmsk sksmk");
	const hDPublicKey = bitcore.HDPublicKey(xpubkey);

	const derivedPublicKey = hDPublicKey.derive(0).derive(id).publicKey;

	const address = derivedPublicKey.toAddress().toString();

	console.log(address);

	return address;

	try {
		let response = await fetch(
			`https://insight.bitpay.com/api/addr/${address}`
		);
		response = await response.json();
		console.log(response);
		if (response.totalReceived > 0) {
			await getBtcPaymentAddress(id + 1);
		} else {
			return address;
		}
	} catch (error) {
		return address;
	}
}

function getBtcTestAddress(id, xpubkey = defaultXpub) {
	const hDPublicKey = bitcore.HDPublicKey(xpubkey);

	const derivedPublicKey = hDPublicKey.derive(0).derive(id).publicKey;

	const address = derivedPublicKey.toAddress().toString();

	return address;
}

exports.getBtcPaymentAddress = getBtcPaymentAddress;
exports.getBtcTestAddress = getBtcTestAddress;
