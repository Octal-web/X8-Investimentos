<?php

namespace App\Services;

use App\Models\Contato;
use App\Models\Lead;

use Carbon\Carbon;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ContactService
{
    // TODO: informar os e-mails que recebem o aviso de novo lead
    protected const LEAD_RECIPIENTS = [];

    protected const BCC = 'rafael@8poroito.com.br';

    public function create(array $data): array
    {
        return DB::transaction(function () use ($data) {
            $contato = Contato::create($this->prepareContactData($data));

            // $lead = $this->createLead(
            //     contato: $contato,
            //     data: $data,
            //     conversoes: $this->countConversions($contato->email),
            // );

            $this->sendEmail($contato->toArray());

            return [
                'contato' => $contato,
                // 'lead' => $lead,
            ];
        });
    }

    protected function prepareContactData(array $data): array
    {
        return [
            'nome' => $data['nome'],
            'email' => $data['email'],
            'empresa' => $data['empresa'],
            'telefone' => $data['telefone'],
            'faturamento' => $data['faturamento'],
            'segmento' => $data['segmento'],
            'entrada' => !empty($data['entrada']) ? Carbon::parse($data['entrada']) : null,
            'token' => md5(uniqid(rand(), true)),
        ];
    }

    protected function countConversions(string $email): int
    {
        return Lead::query()
            ->where([
                'email' => $email,
                'cliente' => 'x8investimentos',
                'projeto' => 'lpx8investimentos',
            ])
            ->count();
    }

    protected function createLead(Contato $contato, array $data, int $conversoes): Lead
    {
        return Lead::create([
            'nome' => $contato->nome,
            'email' => $contato->email,
            'telefone' => $contato->telefone,
            'conversoes' => $conversoes,
            'cliente' => 'x8investimentos',
            'projeto' => 'lpx8investimentos',
            'observacao' => implode("\n", [
                'Empresa: ' . $contato->empresa,
                'Faturamento mensal: ' . $contato->faturamento,
                'Segmento: ' . $contato->segmento,
            ]),
            'token' => $contato->token,
            'entrada' => $contato->entrada,
            'dispositivo' => $this->detectDevice(),
            'posicao_formulario' => $data['posicao_formulario'] ?? null,

            'origem' => $data['origem'] ?? null,
            'campanha' => $data['campanha'] ?? null,
            'grupo' => $data['grupo'] ?? null,
            'termo' => $data['termo'] ?? null,
            'anuncio' => $data['anuncio'] ?? null,
        ]);
    }

    protected function sendEmail(array $data): void
    {
        Mail::send('emails.contact', $data, function ($message) use ($data) {
            $message->to($data['email'])
                    ->bcc(self::BCC)
                    ->subject('[X8] Recebemos seu contato');
        });

        if (!self::LEAD_RECIPIENTS) {
            return;
        }

        Mail::send('emails.lead', $data, function ($message) {
            $message->to(self::LEAD_RECIPIENTS)
                    ->bcc(self::BCC)
                    ->subject('Um novo prospect se cadastrou através da Landing Page');
        });
    }

    protected function detectDevice(): string
    {
        $mobileAgents = [
            'iPhone',
            'iPad',
            'Android',
            'BlackBerry',
            'Windows Phone',
        ];

        $userAgent = request()->userAgent() ?? '';

        foreach ($mobileAgents as $agent) {
            if (stripos($userAgent, $agent) !== false) {
                return 'Mobile';
            }
        }

        return 'Computador';
    }
}
