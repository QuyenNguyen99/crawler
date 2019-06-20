
$.fn.vi = function (prop, value) {
    if ($(this).length > 0) {
        return (value) ? $(this).css(prop, value + 'px') : parseFloat($(this).css(prop).replace('px', ''));
    }
    else {
        return 0;
    }
}
$.fn.heightTrue = function () {
    return $(this).height() + $(this).vi('margin-top') + $(this).vi('margin-bottom') + $(this).vi('padding-top') + $(this).vi('padding-bottom') + $(this).vi('border-top-width') + $(this).vi('border-bottom-width');
}

/**
 * All width + margin-left + margin-right + padding-left + padding-right
 * @returns {jQuery}
 */
$.fn.widthTrue = function () {
    return $(this).width() + $(this).vi('margin-left') + $(this).vi('margin-right') + $(this).vi('padding-left') + $(this).vi('padding-right') + $(this).vi('border-left-width') + $(this).vi('border-right-width');
};

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (selector) {
        console.log('this: ', this);
        var el = this;
        while (el) {
            if (el.matches(selector)) {
                return el;
            }
            el = el.parentElement;
        }
    };
}