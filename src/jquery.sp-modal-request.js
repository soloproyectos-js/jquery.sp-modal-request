/**
 * jQuery.spModalRequest - A Modal Request plugin for jQuery.
 *
 * This plugin requires: 
 *      1. jQuery >= 2.1.3
 *
 * @author    Gonzalo Chumillas <gchumillas@email.com>
 * @license   https://github.com/soloproyectos/jquery.modal-request/blob/master/LICENSE MIT License
 * @link      https://github.com/soloproyectos/jquery.modal-request
 */
(function ($) {
    var methods = {
        /**
         * Sends a GET request.
         * 
         * This function uses internally the $.get function and accepts the same parameters. More info:
         * https://api.jquery.com/jquery.get/
         * 
         * Example:
         * ```JavaScript
         * $.spModalRequest('get', 'test.php', {one: 1, two: 2, three: 3}).always(function () {
         *     console.log('This is always executed');
         * }).done(function (data) {
         *     console.log('This is executed on success requests');
         * }).fail(function () {
         *     console.log('This is executed on failed requests');
         * });
         * ```
         * 
         * @param {Mixed} args Additional arguments
         * 
         * @return {jQuery.Promise}
         */
        'get': function (args) {
            // Based on a Matthew Crumley solution,
            // as we can't use the .apply() method in conjunction with the 'new' operator
            // http://goo.gl/PRL0eZ (redirects to http://stackoverflow.com)
            function F(args) {
                return $.spModalRequestGetClass.apply(this, args);
            }
            F.prototype = $.spModalRequestGetClass.prototype;
            
            var req = new F(arguments);
            return req.send();
        },
        
        /**
         * Sends a POST request.
         * 
         * This function uses internally the $.get function and accepts the same parameters. More info:
         * https://api.jquery.com/jquery.post/
         * 
         * Example:
         * ```JavaScript
         * $.spModalRequest('post', 'test.php', {one: 1, two: 2, three: 3}).always(function () {
         *     console.log('This is always executed');
         * }).done(function (data) {
         *     console.log('This is executed on success requests');
         * }).fail(function () {
         *     console.log('This is executed on failed requests');
         * });
         * ```
         * 
         * @param {Mixed} args Additional arguments
         * 
         * @return {jQuery.Promise}
         */
        'post': function (args) {
            // Based on a Matthew Crumley solution,
            // as we can't use the .apply() method in conjunction with the 'new' operator
            // http://goo.gl/PRL0eZ (redirects to http://stackoverflow.com)
            function F(args) {
                return $.spModalRequestPostClass.apply(this, args);
            }
            F.prototype = $.spModalRequestPostClass.prototype;
            
            var req = new F(arguments);
            return req.send();
        }
    };
    
    /**
     * Registers plugin.
     * 
     * @param {String} methodName Method name
     * @param {Mixed}  args,...   Additional arguments (not required)
     * 
     * @return {Mixed}
     */
    $.spModalRequest = function (methodName, args) {
        var method = methods[methodName];
        var args = Array.prototype.slice.call(arguments, 1);
        
        if (method === undefined) {
            $.error('Method not found: ' + methodName);
        }
        
        return method.apply(this, args);
    };
})(jQuery);
