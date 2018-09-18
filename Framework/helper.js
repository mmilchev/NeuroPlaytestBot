module.exports = {
	parseUgly: parseUgly,
	whiteSpace: whiteSpace,
	arrayRemove: arrayRemove,
	isNumeric: isNumeric,
	escapeRegExp: escapeRegExp,
	cleanIt: cleanIt,
	forHumans: forHumans,
	parseData: parseData,
	scontains: scontains,
	cleanContent: cleanContent,
	replaceAll: replaceAll
};

/**
 * Replace "find" with "replace" in "str"
 * @param {string/RegExp} find A string to find 
 * @param {string} replace A string to replace find with
 * @param {string} str The string to replace in
 * @returns {string} The replaced string
 */
function replaceAll (find, replace, str) {
	find = find.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
	return str.replace(new RegExp(find, 'g'), replace);
}

/**
 * Cleans Discord markup from dirty to clean
 * @param {string} content A string to clean
 * @param {Discord.JS Guild} guild A guild object
 * @returns {string} The cleaned "content"
 */
function cleanContent(content, guild) {
	content.replace(/@everyone/g, '@\u200Beveryone')
		.replace(/@here/g, '@\u200Bhere')
		.replace(/<@&[0-9]+>/g, roles => {
			let replaceID = roles.replace(/<|&|>|@/g, '');
			let role = guild.roles.get(replaceID);
			return `${role.name}`;
		})
		.replace(/<@!?[0-9]+>/g, user => {
			let replaceID = user.replace(/<|!|>|@/g, '');
			let member = guild.members.get(replaceID);
			if (member) {
				return `${member.user.username}`;
			} else {
				return ' '; }
		});
	return content;
}

var data = ['B', 'KB', 'MB', 'GB', 'TB'];

/**
 * Gets the maximum level of data level (1024 KB -> 1MB)
 * @param {int} byte 
 * @returns {string} <1-1023> ['B', 'KB', 'MB', 'GB', 'TB'][log(<"byte">, 1024)];
 */
function parseData(byte) {
	var level = getBaseLog(1024, byte);
	return `${byte.toFixed(2)} ${data[level]}`;
}

/**
 * Gets log "base" on "number" (getBaseLog(2,8) == 3)
 * @param {int} base Log Base
 * @param {int} number Log Number
 * @returns {int} The logarithmic value of "number" in "base"
 */
function getBaseLog(base, number) {
	return Math.log(number) / Math.log(base);
  }

/**
 * Returns a human readable string for a better time range (1230 seconds -> 20 minutes 30 seconds)
 * @param {int} seconds 
 * @returns {string} Human Readable Time Range
 */
function forHumans(seconds) {
	if(seconds === undefined) { return '0 seconds'; }
	var levels = [
		[Math.floor(seconds / 31536000), 'years'],
		[Math.floor((seconds % 31536000) / 2592000), 'months'],
		[Math.floor(((seconds % 31536000) % 2592000) / 604800), 'weeks'],
		[Math.floor((((seconds % 31536000) % 2592000) % 604800) / 86400), 'days'],
		[Math.floor((((seconds % 31536000) % 2592000) % 86400) / 3600), 'hours'],
		[Math.floor(((((seconds % 31536000) % 2592000) % 86400) % 3600) / 60), 'minutes'],
		[Math.floor(((((seconds % 31536000) % 2592000) % 86400) % 3600) % 60), 'seconds']
	];
	var returntext = '';

	for(var i = 0, max = levels.length; i < max; i++) {
		if(levels[i][0] === 0) continue;
		if(levels[i][0] === 0.00) continue;
		returntext += ` ${levels[i][0]} ${levels[i][0] === 1 ? levels[i][1].substr(0, levels[i][1].length - 1) : levels[i][1]}`; // eslint-disable-line
	}
	return returntext.trim();
}

/**
 * Returns if "it" is contained in "array"
 * @param {[*]} array The array to check
 * @param {*} it The thing to check
 * @returns {boolean} 
 */
function scontains(array, it) {
	return array.indexOf(it) !== -1;
}

/**
 * Cleans a discord input
 * @param {string} input 
 * @returns {string} Cleaned "input"
 */
function cleanIt(input) {
	return input.replace(/<@[&!]*(\d+)>/, '$1');
}

/**
 * Stringifies a Regular Expression (to be able to post a clean RegExp)
 * @param {string} str The regexp string object
 * @returns {string} The escaped RegExp string
 */
function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'); // eslint-disable-line
}

/**
 * Returns if "num" is a number.
 * @param {*} num 
 * @returns {boolean}
 */
function isNumeric(num) {
	return !isNaN(parseFloat(num)) && isFinite(num);
}

/**
 * Removes "thing" from "arr"
 * @param {[*]} arr The array to remove from.
 * @param {*} thing The object to remove.
 * @returns {[*]} The array without "thing"
 */
function arrayRemove(arr, thing) {
	if(scontains(arr, thing)) {
		return arr.slice(0, arr.indexOf(thing)).concat(arr.slice(arr.indexOf(thing) + 1, arr.length));
	} else {
		return arr;
	}
}

/**
 * Creates spacing in the array of string, so that they'll become equal length
 * @param {[string]} strs Array of strings
 * @returns {[string]} Equal length whitepspaced strings
 */
function whiteSpace(strs) {
	var maxSize = 0;
	strs.forEach((v) => {
		if(v.length > maxSize) {
			maxSize = v.length;
		}
	});

	for(var i = 0; i < strs.length; i++) {
		strs[i] = strs[i] + (new Array(maxSize - strs[i].length + 1)).join(' ');
		if(strs[i].length == 0) {
			strs[i] = (new Array(maxSize)).join(' ');
		}
	}
	return strs;
}

/**
 * Parses an ugly string and returns a custom date object
 * @param {string} timeout The ugly string to parse (?s?m?h?d?w?mo?y / More parsing inside function)
 * @returns {{absolute: Date(), relative: int, seconds: int, minutes: int, hours: int, days: int, weeks: int, years: int, delta: int}}
 */
function parseUgly(timeout) {
	timeout = timeout.replace(/\s+/g, '');
	var SECONDS = /(\d+) *(?:seconds|seconds|sec|s)/i;
	var MINUTES = /(\d+) *(?:minutes|minute|min|m)/i;
	var HOURS = /(\d+) *(?:hours|hour|h)/i;
	var DAYS = /(\d+) *(?:days|days|d)/i;
	var WEEKS = /(\d+) *(?:weeks|week|w)/i;
	var MONTHS = /(\d+) *(?:months|month|mo)/i;
	var YEARS = /(\d+) *(?:years|year|y)/i;


	var delta = 0;

	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	var days = 0;
	var years = 0;
	var weeks = 0;

	var ss = SECONDS.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1];
		seconds += +ss[1];
	}

	ss = MINUTES.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1] * 60;
		minutes += +ss[1];
	}

	ss = HOURS.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1] * 60 * 60;
		hours += +ss[1];
	}

	ss = DAYS.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1] * 60 * 60 * 24;
		days += +ss[1];
	}

	ss = WEEKS.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1] * 60 * 60 * 24 * 7;
		days += +ss[1];
	}

	ss = MONTHS.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1] * 60 * 60 * 24 * 7 * 4;
		weeks += +ss[1];
	}

	ss = YEARS.exec(timeout);
	if(ss && ss[1]) {
		delta += +ss[1] * 60 * 60 * 24 * 365;
		weeks += +ss[1];
	}

	if(isNaN(hours + minutes + seconds) || delta < 1) return false;
	return {
		absolute: new Date().getTime() + (delta * 1000),
		relative: delta * 1000,
		seconds: seconds,
		minutes: minutes,
		hours: hours,
		days: days,
		weeks: weeks,
		years: years,
		delta: delta
	};
}
