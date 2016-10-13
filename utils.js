"use strict";
var path = require('path');

module.exports = exports = function(Nightmare) {
	Nightmare.action('tableExtract', function(id, columns, separator, done){
		this.evaluate_now(function() {
			var trs = document.querySelectorAll(id);
			var colrx = /(?:([0-9]+)(?:-)([0-9]+))|([0-9]+)/g
			var cols = columns.match(colrx).map(function(e){
				if(/-/.test(e)){
					var rarr = e.split("-").map(Number).sort();
					return (function(a,b){
						var c = [];
						for(var i=a;i<=b;i++)
							c[i-a] = i;
						return c;
					}(rarr[0],rarr[1]));
				}
				else
					return parseInt(elem);
			}).sort();
			cols = [].concat.apply([], cols);

			return Object.keys(trs).map(function (k) {
				var estr = "";
				for(var i=0;i<cols.length;i++)
					estr += trs[k].getElementByTagName('td')[cols[i]].innerText + separator;
				return estr.trim();
			});
		}, done)
	});
};
