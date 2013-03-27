/**
 * bootstrap-notify.js v1.0.0
 * --
 * Copyright 2012 Nijiko Yonskai <nijikokun@gmail.com>
 * Copyright 2012 Goodybag, Inc.
 * --
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function ($) {
  var Notification = function (element, options) {
    // Element collection
    this.$element = $(element);
    this.$note    = $('<div class="alert"></div>');
    this.options  = $.extend(true, {}, $.fn.notify.defaults, options);
    this._link    = null;

    // Setup from options
    if (this.options.transition)
      if (this.options.transition === 'fade')
        this.$note.addClass('in').addClass(this.options.transition);
      else this.$note.addClass(this.options.transition);
    else this.$note.addClass('fade').addClass('in');

    if (this.options.type)
      this.$note.addClass('alert-' + this.options.type);
    else this.$note.addClass('alert-success');

    if (this.options.message)
      if (typeof this.options.message === 'string')
        this.$note.html(this.options.message);
      else if (typeof this.options.message === 'object')
        if (this.options.message.html)
          this.$note.html(this.options.message.html);
        else if (this.options.message.text)
          this.$note.text(this.options.message.text);

    if (this.options.closable)
      this._link = $('<a class="close pull-right">&times;</a>'),
      $(this._link).on('click', $.proxy(Notification.onClose, this)),
      this.$note.prepend(this._link);

    return this;
  };

  Notification.onClose = function () {
    var that = this;
    this.options.onClose();
    this.isShown = false
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden')
    })
    $(this.$note).remove();
    this.options.onClosed();
  };

  Notification.prototype.show = function () {
  	var that = this;
    if (this.options.fadeOut.enabled)
      this.$note.delay(this.options.fadeOut.delay || 3000).fadeOut('slow', $.proxy(Notification.onClose, this));
      
    this.isShown = true

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) //don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      transition ?
        that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
        that.$element.focus().trigger('shown')

    })
    
    this.$element.append(this.$note).focus();
    this.$note.alert();
  };

  Notification.prototype.hide = function () {
  	var that = this
    if (this.options.fadeOut.enabled)
      this.$note.delay(this.options.fadeOut.delay || 3000).fadeOut('slow', $.proxy(Notification.onClose, this));
    else Notification.onClose.call(this);
  };
  
  Notification.prototype.removeBackdrop= function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      };

  Notification.prototype.backdrop= function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      };

  $.fn.notify = function (options) {
    return new Notification(this, options);
  };

  $.fn.notify.defaults = {
    type: 'success',
    closable: true,
    backdrop: false,
    transition: 'fade',
    fadeOut: {
      enabled: true,
      delay: 3000
    },
    message: null,
    onClose: function () {},
    onClosed: function () {}
  }
})(window.jQuery);
