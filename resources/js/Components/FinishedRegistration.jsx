import React from 'react';
import { ButtonLink } from '@/Components/HomeUI';

export function FinishedRegistration() {
    return <section className="x8-container min-h-[75vh] pb-32 pt-48">
        <p className="eyebrow mb-6">Próximo passo</p>
        <h1 className="mb-6 max-w-3xl text-4xl leading-tight tracking-tight md:text-6xl">Vamos construir a próxima fase do seu crescimento.</h1>
        <p className="mb-10 max-w-xl text-lg text-secondary">Recebemos seu cadastro. Em breve, um especialista da X8 entrará em contato com você.</p>
        <ButtonLink href="/">Voltar ao início</ButtonLink>
    </section>;
}
