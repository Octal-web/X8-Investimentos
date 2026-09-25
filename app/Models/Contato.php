<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contato extends Model
{
    protected $table = 'contatos';

    protected $fillable = [
        'nome',
        'email',
        'empresa',
        'telefone',
        'faturamento',
        'segmento',
        'token',
        'entrada',
    ];

    const CREATED_AT = 'criado';
    const UPDATED_AT = 'modificado';
}
