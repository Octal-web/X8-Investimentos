<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'nome' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'empresa' => 'required|string|max:255',
            'telefone' => ['required', 'regex:/^\(\d{2}\) \d{4,5}-\d{4}$/'],
            'faturamento' => [
                'required',
                Rule::in([
                    'Até R$ 100 mil',
                    'De R$ 100 mil a R$ 500 mil',
                    'De R$ 500 mil a R$ 1 milhão',
                    'De R$ 1 milhão a R$ 5 milhões',
                    'Acima de R$ 5 milhões',
                ]),
            ],
            'segmento' => [
                'required',
                Rule::in([
                    'E-commerce / Varejo',
                    'Serviços',
                    'Indústria',
                    'Educação',
                    'Saúde',
                    'Imobiliário',
                    'Tecnologia / SaaS',
                    'Outro',
                ]),
            ],
            'politica' => 'required|accepted',
            'entrada' => 'nullable|date',
            'posicao_formulario' => 'nullable|string',

            'origem' => 'nullable|string',
            'campanha' => 'nullable|string',
            'grupo' => 'nullable|string',
            'termo' => 'nullable|string',
            'anuncio' => 'nullable|string',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'nome.required' => 'Preencha nome e sobrenome.',
            'email.required' => 'Preencha e-mail corporativo.',
            'email.email' => 'Informe um e-mail válido.',
            'empresa.required' => 'Preencha empresa.',
            'telefone.required' => 'Preencha telefone.',
            'telefone.regex' => 'Informe um telefone com DDD.',
            'faturamento.required' => 'Preencha faturamento mensal.',
            'faturamento.in' => 'Selecione uma faixa de faturamento válida.',
            'segmento.required' => 'Preencha segmento.',
            'segmento.in' => 'Selecione um segmento válido.',
            'politica.required' => 'Concorde com a Política de Privacidade para continuar.',
            'politica.accepted' => 'Concorde com a Política de Privacidade para continuar.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'origem' => $this->input('origem', $this->input('utm_source')),
            'campanha' => $this->input('campanha', $this->input('utm_campaign')),
            'grupo' => $this->input('grupo', $this->input('utm_group')),
            'termo' => $this->input('termo', $this->input('utm_term')),
            'anuncio' => $this->input('anuncio', $this->input('utm_content')),
        ]);
    }
}
