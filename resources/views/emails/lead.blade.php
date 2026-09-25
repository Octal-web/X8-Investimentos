@extends('emails.layout')

@section('title', 'Novo contato na Landing Page')
@section('preheader', "{$nome} · {$empresa} · {$faturamento}")

@php
    $contato = [
        'Nome' => $nome,
        'E-mail' => $email,
        'Telefone' => $telefone,
        'Empresa' => $empresa,
        'Faturamento mensal' => $faturamento,
        'Segmento' => $segmento,
    ];

    $origem = array_filter([
        'Formulário' => $posicao_formulario,
        'Dispositivo' => $dispositivo,
        'Origem' => $origem,
        'Campanha' => $campanha,
        'Grupo' => $grupo,
        'Termo' => $termo,
        'Anúncio' => $anuncio,
    ], fn ($value) => filled($value));

    $whatsapp = '55' . preg_replace('/\D/', '', $telefone);
@endphp

@section('content')
    <p style="margin:0 0 8px; color:#2f74e6; font-size:12px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase;">Novo lead</p>
    <h1 style="margin:0 0 8px; color:#040914; font-size:24px; line-height:32px;">Um novo contato se cadastrou pela Landing Page</h1>
    @if ($criado)
        <p style="margin:0 0 28px; font-size:14px; color:#5b6780;">{{ \Carbon\Carbon::parse($criado)->format('d/m/Y \à\s H:i') }}</p>
    @endif

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #dde4f0; border-radius:12px; border-collapse:separate;">
        @foreach ($contato as $label => $value)
            <tr>
                <td style="padding:14px 18px; width:40%; font-size:13px; color:#5b6780; {{ $loop->last ? '' : 'border-bottom:1px solid #dde4f0;' }}">{{ $label }}</td>
                <td style="padding:14px 18px; font-size:15px; font-weight:bold; color:#040914; {{ $loop->last ? '' : 'border-bottom:1px solid #dde4f0;' }}">
                    @if ($label === 'E-mail')
                        <a href="mailto:{{ $value }}" style="color:#2f74e6; text-decoration:none;">{{ $value }}</a>
                    @elseif ($label === 'Telefone')
                        <a href="tel:+{{ $whatsapp }}" style="color:#2f74e6; text-decoration:none;">{{ $value }}</a>
                    @else
                        {{ $value }}
                    @endif
                </td>
            </tr>
        @endforeach
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
        <tr>
            <td style="background-color:#2f74e6; border-radius:999px;">
                <a href="https://wa.me/{{ $whatsapp }}" style="display:inline-block; padding:14px 28px; color:#ffffff; font-size:15px; font-weight:bold; text-decoration:none;">Chamar no WhatsApp &rarr;</a>
            </td>
        </tr>
    </table>

    @if ($origem)
        <p style="margin:36px 0 12px; color:#5b6780; font-size:12px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase;">Origem do contato</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f7fc; border-radius:12px;">
            @foreach ($origem as $label => $value)
                <tr>
                    <td style="padding:10px 18px; width:40%; font-size:13px; color:#5b6780;">{{ $label }}</td>
                    <td style="padding:10px 18px; font-size:13px; color:#1b2438;">{{ $value }}</td>
                </tr>
            @endforeach
        </table>
    @endif
@endsection
