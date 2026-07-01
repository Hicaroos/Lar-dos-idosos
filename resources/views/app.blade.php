<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"  @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <?php
            $manifestPath = public_path('build/manifest.json');
            $css = '';
            $js = '';
            $componentJs = '';
            if (file_exists($manifestPath)) {
                $manifest = json_decode(file_get_contents($manifestPath), true);
                $css = $manifest['resources/css/app.css']['file'] ?? '';
                $js = $manifest['resources/js/app.ts']['file'] ?? '';
                $componentFile = "resources/js/pages/{$page['component']}.vue";
                $componentJs = $manifest[$componentFile]['file'] ?? '';
            }
        ?>
        @if($css) <link rel="stylesheet" href="/build/{{ $css }}"> @endif
        @if($js) <script type="module" src="/build/{{ $js }}"></script> @endif
        @if($componentJs) <script type="module" src="/build/{{ $componentJs }}"></script> @endif

        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-slate-100 text-slate-800">
        @inertia
    </body>
</html>
