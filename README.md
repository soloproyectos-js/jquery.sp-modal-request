# jQuery.spModalRequest

A Modal Request plugin for jQuery.

## Install

Using [bower](http://bower.io/) package manager:

```bash
bower install jquery.sp-modal-request
```

Or copy the `dist/` files in your preferred location.

## Basic Example

Each time you perform an HTTP request a modal loading appears and it is closed when the request is complete. Available methods are `get` and `post`.

```JavaScript
$.spModalRequest('get', 'test.php', {param1: 'one', param2: 'two'})
    .done(function () {
        console.log('Success!');
    })
    .fail(function () {
        console.log('An error has ocurred');
    })
    .always(function () {
        console.log('This function is always called');
    });
```

See `demos/modal-request` for a complete example.
