@extends('emails.layout')

@section('title', 'Recebemos seu contato')
@section('preheader', 'Obrigado pelo contato! Em breve um especialista da X8 fala com você.')

@section('content')
    <p style="margin:0 0 8px; color:#2f74e6; font-size:12px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase;">Diagnóstico gratuito</p>
    <h1 style="margin:0 0 24px; color:#040914; font-size:26px; line-height:34px;">Obrigado pelo contato, {{ strtok($nome, ' ') }}!</h1>

    <p style="margin:0 0 16px; font-size:16px; line-height:26px;">
        Recebemos suas informações. Em breve, um especialista da nossa equipe vai entrar em contato
        para entender o momento da <strong>{{ $empresa }}</strong> e mostrar como a X8 pode transformar
        a sua performance em resultado de negócio.
    </p>

    <p style="margin:0 0 32px; font-size:16px; line-height:26px;">
        Fique de olho no seu telefone e no seu e-mail.
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td style="background-color:#2f74e6; border-radius:999px;">
                <a href="{{ url()->to('/') }}" style="display:inline-block; padding:14px 28px; color:#ffffff; font-size:15px; font-weight:bold; text-decoration:none;">Conheça a X8 &rarr;</a>
            </td>
        </tr>
    </table>

    <p style="margin:32px 0 0; font-size:14px; line-height:22px; color:#5b6780;">
        Até breve,<br>
        <strong style="color:#040914;">Equipe X8</strong>
    </p>
@endsection
