
// Width/Height are in characters
var Canvas = function(id, width, height) {
	var ctx;
	var fascent;
	var fdescent;
	var fwidth;
	var supports_text;
	
	var canv;

	// Public functions.
	var changeFont = function(to) {
		size = getFontSize(to);
		if (supports_text) {
			ctx.font = to;
			fascent = size * 0.1;
			fdescent = size;
			fwidth = size;
		}
		else {
			fascent = ctx.fontDescent('sans', size);
			fdescent = ctx.fontAscent('sans', size);
			fwidth = ctx.measureText('sans', size, '@');
		}
		
		canv.width = (fwidth*width);
		canv.height = (fascent+fdescent)*height;
	}
	
	var fontAscent = function() {
		return fascent;
	}
	
	var fontDescent = function() {
		return fdescent;
	}
	
	var fontWidth = function() {
		return fwidth;
	}
	
	var fontHeight = function() {
		return fascent + fdescent;
	}
	
	// Gets the font size from a string like, "10px monospace"
	var getFontSize = function(str) {
		if (!str)
			return 10;
		if (str.indexOf('px') != -1) {
			return 1 * str.substring(0, str.indexOf('px'));
		}
		else if (str.indexOf('pt') != -1) {
			return 1 * str.substring(0, str.indexOf('px'));
		}
		else {
			// default to 10
			return 10;
		}
	}
	
	// Compatibility functions.
	var showText = function(str, x, y) {
		var temp = ctx.strokeStyle;
		ctx.strokeStyle = ctx.fillStyle;
		ctx.drawText('sans', 10, x, y, str);
		ctx.strokeStype = temp;
	}
	
	// Initialize
	canv = document.getElementById(id);
	
	if (!canv || !canv.getContext)
		return null;
	
	ctx = canv.getContext('2d');
	
	// Doesn't support text functions.
	if (!ctx.fillText) {
		supports_text = false;
		CanvasTextFunctions.enable(ctx);
		
		ctx.fillText = showText;
		ctx.strokeText = showText;
		
		changeFont('10px monospace');
	}
	else {
		supports_text = true;
		changeFont('10px monospace');
	}
	
	return {
		canvas: canv,
		ctx: ctx,
		
		changeFont: changeFont,
		fontAscent: fontAscent,
		fontDescent: fontDescent,
		fontWidth: fontWidth,
		fontHeight: fontHeight,
	};
}