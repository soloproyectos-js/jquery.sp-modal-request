/**
 * jQuery.spModal - A Modal Window System.
 *
 * This plugin requires: 
 *      1. jQuery >= 2.1.3
 *      2. jQuery.ui >= 1.11.4
 *
 * @author    Gonzalo Chumillas <gchumillas@email.com>
 * @license   https://github.com/soloproyectos/jquery.modal/blob/master/LICENSE MIT License
 * @link      https://github.com/soloproyectos/jquery.modal
 */
(function ($) {
    /**
     * Sends an HTTP request.
     * 
     * @param {String} method Request method. Can be either 'get' or 'post'
     * @param {String} url    URL
     * @param {Object} data   Parameters (not required)
     * @param {String} type   Expected document type (not required)
     */
    $.spModalRequestClass = function (method, url, data, type) {
        if ($.inArray(method, ['get', 'post']) < 0) {
            $.error('Method not allowed: ' + method);
        }
        
        this._method = method;
        this._args = Array.prototype.slice.call(arguments, 1);
        this._url = url;
        this._data = data;
        this._type = type;
    };
    
    /**
     * Labels.
     * @var {Object}
     */
    $.spModalRequestClass.prototype.labels = {
        dialog: {
            accept: 'Accept'
        }
    };
    
    /**
     * Reqest method.
     * This method can be either 'get' or 'post'
     * @var {String}
     */
    $.spModalRequestClass.prototype._method = null;
    
    /**
     * URL.
     * @var {String}
     */
    $.spModalRequestClass.prototype._url = "";
    
    /**
     * Parametes.
     * @var {Object}
     */
    $.spModalRequestClass.prototype._data = {};
    
    /**
     * Expected document type.
     * @var {String}
     */
    $.spModalRequestClass.prototype._type = "";
    
    /**
     * Sends an HTTP request.
     * 
     * @return {jQuery.Promise}
     */
    $.spModalRequestClass.prototype.send = function () {
        var self = this;
        var ret = new $.Deferred();
        var req = null;

        var loading = new $.spModalLoading();
        loading.addButton('Cancel', function () {
            if (req != null) {
                req.abort();
            }
        });

        // sends a request
        req = $[this._method].call(
            this, this._url, this._data, function () {}, this._type
        ).always(function () {
            loading.close();
        }).done(function (data, status, xhr) {
            ret.resolve(data, status, xhr);
        }).fail(function (xhr, status) {
            var errorCode = parseInt(xhr.status, 10);
            var title = errorCode < 500? 'Error': 'Server Error';
            var message = $.type(xhr.statusText) == 'string' && xhr.statusText.length > 0
                ? xhr.statusText
                : 'The request has failed';
            
            // document type not expected or malformed
            if (status == 'parsererror') {
                title = 'Error';
                message = 'The document is not well formed';
            }
            
            // shows an error message and rejects the request
            var msg = $.spModal('message', title, message);
            msg.addButton(self.labels.dialog.accept, function () {
                ret.reject(xhr, status);
                msg.close();
            });
            $.error(message);
        });

        return ret.promise();
    };
})(jQuery);
