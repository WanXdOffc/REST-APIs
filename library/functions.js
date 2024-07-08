const crypto = require("crypto");
const { default: axios, isAxiosError } = require("axios");
const { performance } = require("perf_hooks");
const { User } = require("../database/model");
const filesize = require("../controller/filesize");
const { user } = require("./settings");
const pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ234567890".split("");
const developer = "Darmawan";

function randomText(len) {
    const result = [];
    for (let i = 0; i < len; i++) result.push(pool[Math.floor(Math.random() * pool.length)]);
    return result.join('');
}
exports.getRoute = (request) => {
	const route = request.route ? request.route.path : ''; // check if the handler exist
	const baseUrl = request.baseUrl ? request.baseUrl : ''; // adding the base url if the handler is a child of another handler
	return route ? `${baseUrl === '/' ? '' : baseUrl}${route}` : undefined;
};
exports.regexUrl = (url) => {
	const regex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, "gi");
	return url.match(regex);
};
exports.getHashedPassword = (password) => {
	const sha256 = crypto.createHash("sha256");
	const hash = sha256.update(password).digest("base64");
	return hash;
};
exports.generateAuthToken = () => {
	return crypto.randomBytes(30).toString("hex");
};
exports.randomText = (len) => {
	const result = [];
	for (let i = 0; i < len; i++) result.push(pool[Math.floor(Math.random() * pool.length)]);
	return result.join("");
};
exports.getBuffer = async (url, response = {}) => new Promise(async (resolve, reject) => {
	await axios.request({
		method: response.method || 'GET',
		url,
		headers: {
			DNT: 1,
			"Upgrade-Insecure-Request": 1,
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
		},
		responseType: response.type || 'arraybuffer'
	})
		.then(({ data }) => {
			if (isAxiosError()) throw ('axios error');
			resolve(data);
		})
		.catch(reject);
});
exports.getJson = (url, options = {}) => new Promise(async (resolve, reject) => {
	await axios.request({
		method: options.method || 'GET',
		url,
		headers: {
			...options.headers
		}
	})
		.then(({ data }) => {
			if (isAxiosError()) throw ('axios error');
			resolve(data);
		})
		.catch((err) => {
			reject(err);
		});
});
exports.resSukses = async (response, text) => {
	const newSpeed = performance.now();
	const oldSpeed = performance.now();
	await response.status(200).json({
		status: true,
		processed: oldSpeed - newSpeed + " Ms",
		developer,
		result: text
	});
};
exports.upload = async (buffer) => {
    const formData = new FormData();
    formData.append("file", buffer, {
      filename: Date.now() + ".jpg",
    });

    const response = await axios.post("https://hostfile.my.id/api/upload", formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    return response.data; 
  };
exports.resError = async (response, text) => {
	await response.status(200).json({
		status: false,
		developer,
		result: text
	});
};
exports.h2k = (number) => {
	var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"];
	var tier = Math.log10(Math.abs(number)) / 3 | 0;
	if (tier == 0) return number;
	var postfix = SI_POSTFIXES[tier];
	var scale = Math.pow(10, tier * 3);
	var scaled = number / scale;
	var formatted = scaled.toFixed(1) + "";
	if (/\.0$/.test(formatted));
	formatted = formatted.substr(0, formatted.length - 2);
	return formatted + postfix;
};
exports.formatSize = (number) => {
	fileSize = filesize.partial({ base: 2, standard: "jedec" });
	try {
		return fileSize(number);
	} catch (e) {
		return "0 MB";
	}
};
exports.loghandler = {
	noturl: {
		status: false,
		developer,
		result: "Masukan Parameter Url"
	},
	notquery: {
		status: false,
		developer,
		result: "Masukan Parameter Query"
	},
	notauthor: {
		status: false,
		developer,
		result: "Masukan Parameter Author"
	},
	notalbum: {
		status: false,
		developer,
		result: "Masukan Parameter Album"
	},
	notimage: {
		status: false,
		developer,
		result: "Masukan Parameter Image"
	},
	nottitle: {
		status: false,
		developer,
		result: "Masukan Parameter Title"
	},
	nottcharid: {
		status: false,
		developer,
		result: "Masukan Parameter charid"
	},
	notlevel: {
		status: false,
		developer,
		result: "Masukan Parameter Level"
	},
	notlevel2: {
		status: false,
		developer,
		result: "Masukan Parameter Level2"
	},
	notip: {
		status: false,
		developer,
		result: "Masukan Parameter ip"
	},
	notavatar: {
		status: false,
		developer,
		result: "Masukan Parameter Avatar"
	},
	notavatar2: {
		status: false,
		developer,
		result: "Masukan Parameter Avatar2"
	},
	nottext: {
		status: false,
		developer,
		result: "Masukan Parameter Text"
	},
	nottext2: {
		status: false,
		developer,
		result: "Masukan Parameter Text2"
	},
	nottext3: {
		status: false,
		developer,
		result: "Masukan Parameter Text3"
	},
	notusername: {
		status: false,
		developer,
		result: "Masukan Parameter Username"
	},
	notnumber: {
		status: false,
		developer,
		result: "Masukan Parameter Number"
	},
	notrank: {
		status: false,
		developer,
		result: "Masukan Parameter Rank"
	},
	notxp: {
		status: false,
		developer,
		result: "Masukan Parameter Xp"
	},
	notxp2: {
		status: false,
		developer,
		result: "Masukan Parameter Xp2"
	},
	notnumber2: {
		status: false,
		developer,
		result: "Masukan Parameter Number2"
	},
	notmail: {
		status: false,
		developer,
		result: "Masukan Parameter Email"
	},
	notkey: {
		status: false,
		developer,
		result: "Masukan Parameter Key"
	},
	urlInvalid: {
		status: false,
		developer,
		message: "Parameter Invalid, silahkan cek lagi."
	},
	error: {
		status: false,
		developer,
		result: "Error!, Silahkan Untuk Report Di https://rzky.my.id/ticket"
	}
};