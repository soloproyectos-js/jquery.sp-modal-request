# jquery.sp-modal-request
A Modal Request plugin for jQuery

You can perform asynchronous HTTP requests. Each time you perform an HTTP request a modal loading appears and it is closed when the request is complete. Available methods are `get` and `post`.

```JavaScript
$.spModal('get', 'test.php', {param1: 'one', param2: 'two'})
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
