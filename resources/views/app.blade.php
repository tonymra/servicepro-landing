<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'ServicePro') }}</title>

        <link rel="icon" href="/assets/images/favicon.png" type="image/png">
        <link rel="apple-touch-icon" href="/assets/images/favicon.png">

        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

        @inertiaHead
        @vite(['resources/css/app.css', 'resources/js/app.ts'])
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
