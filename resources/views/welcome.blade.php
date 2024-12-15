<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Styles / Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/spa.js'])
    </head>
    <body>
        <div class="w-full bg-blue-500">Navbar</div>
        <div id="app-content">
            <h1>this is the welcome page</h1>
            <a href="/test" class=" nav-link">test</a>
        </div>
    </body>
</html>
