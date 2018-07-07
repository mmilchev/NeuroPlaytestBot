module.exports = {
	parseUgly: parseUgly,
	whiteSpace: whiteSpace,
	arrayRemove: remove,
	isNumeric: isNumeric,
	escapeRegExp: escapeRegExp,
	cleanIt: cleanIt,
	forHumans: forHumans,
	parseData: parseData,
	scontains: scontains,
	cleanContent: cleanContent,
	replaceAll: replaceAll,
	forHumansHun: forHumansHun
};

function replaceAll (find, replace, str) {
	var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	return str.replace(new RegExp(find, 'g'), replace);
}

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
				return ` `; }
			});
	return content;
}

var data = ['B', 'KB', 'MB', 'GB', 'TB'];

function parseData(byte) {
	var more = true;
	var value = byte;
	var level = 0;
	while(more) {
		value /= 1024;
		level += 1;
		if(value < 1024) {
			more = false;
		}
	}
	return `${value.toFixed(2)} ${data[level]}`;
}

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

function forHumansHun(seconds) {
	if(seconds === undefined) { return '0 másodperc'; }
	var levels = [
		[Math.floor(seconds / 31536000), 'év'],
		[Math.floor((seconds % 31536000) / 2592000), 'hónap'],
        [Math.floor(((seconds % 31536000) % 2592000) / 604800), 'hét'],
        [Math.floor((((seconds % 31536000) % 2592000) % 604800) / 86400), 'nap'],
        [Math.floor((((seconds % 31536000) % 2592000) % 86400) / 3600), 'óra'],
        [Math.floor(((((seconds % 31536000) % 2592000) % 86400) % 3600) / 60), 'perc'],
        [Math.floor(((((seconds % 31536000) % 2592000) % 86400) % 3600) % 60), 'másodperc']
	];
	var returntext = '';

	for(var i = 0, max = levels.length; i < max; i++) {
		if(levels[i][0] === 0) continue;
		if(levels[i][0] === 0.00) continue;
		returntext += ` ${levels[i][0]} ${levels[i][1]}`; // eslint-disable-line
	}
	return returntext.trim();
}

function scontains(array, it) {
	return array.indexOf(it) !== -1;
}

function cleanIt(input) {
	return input.replace(/<@[&!]*(\d+)>/, '$1');
}

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'); // eslint-disable-line
}

function isNumeric(num) {
	return !isNaN(parseFloat(num)) && isFinite(num);
}

function remove(arr, thing) {
	if(scontains(arr, thing)) {
		return arr.slice(0, arr.indexOf(thing)).concat(arr.slice(arr.indexOf(thing) + 1, arr.length));
	} else {
		return arr;
	}
}

function whiteSpace(strs) {
	var maxSize = 0;
	var strs = strs;
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
