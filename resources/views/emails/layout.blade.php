<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light only">
    <title>@yield('title', 'X8')</title>
</head>
<body style="margin:0; padding:0; background-color:#eef2f8; font-family:Arial, Helvetica, sans-serif; color:#1b2438;">
    <div style="display:none; max-height:0; overflow:hidden;">@yield('preheader')</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef2f8;">
        <tr>
            <td align="center" style="padding:32px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden;">
                    <tr>
                        <td style="background-color:#040914; padding:32px 40px;">
                            <img src="{{ asset('img/email/logo.png') }}" alt="X8" width="96" height="36" style="display:block; border:0; width:96px; height:auto;">
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#2f74e6; height:4px; line-height:4px; font-size:0;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="padding:40px;">
                            @yield('content')
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#040914; padding:24px 40px; color:#aebbd1; font-size:12px; line-height:18px;">
                            X8 · Mídia, dados, automação, tecnologia e inteligência artificial.<br>
                            <a href="{{ url()->to('/') }}" style="color:#86aaf2; text-decoration:none;">{{ preg_replace('#^https?://#', '', config('app.url')) }}</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
