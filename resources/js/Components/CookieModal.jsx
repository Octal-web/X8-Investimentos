import { useState } from 'react';

export const hasCookie = (name) => document.cookie.split(';').some((cookie) => cookie.trim() === `${name}=1`);

export const CookieModal = ({ onConsent }) => {
    const [visible, setVisible] = useState(() => !hasCookie('notify-cookies') && !hasCookie('reject-cookies'));

    const saveConsent = (accepted) => {
        const selected = accepted ? 'notify-cookies' : 'reject-cookies';
        const opposite = accepted ? 'reject-cookies' : 'notify-cookies';
        document.cookie = `${opposite}=; Max-Age=0; Path=/; SameSite=Lax`;
        document.cookie = `${selected}=1; Max-Age=31536000; Path=/; SameSite=Lax`;
        onConsent(accepted);
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <section role="dialog" aria-labelledby="cookie-title" className="fixed inset-x-0 bottom-0 z-[100] border-t border-x8-border bg-x8-bg p-5 shadow-2xl">
            <div className="x8-container flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl text-sm text-secondary">
                    <h2 id="cookie-title" className="mb-2 font-semibold text-white">Preferências de cookies</h2>
                    <p>Utilizamos cookies para melhorar sua experiência e analisar o desempenho do site. Você pode aceitar ou rejeitar os cookies não necessários. Saiba mais em nossa <a href="/politica-de-privacidade" className="underline">Política de Privacidade</a>.</p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={() => saveConsent(false)} className="rounded-full border border-white/30 px-5 py-3 text-sm text-white hover:bg-white/10">Rejeitar não necessários</button>
                    <button type="button" onClick={() => saveConsent(true)} className="rounded-full bg-white px-5 py-3 text-sm font-medium text-blue-700 hover:bg-secondary">Aceitar todos os cookies</button>
                </div>
            </div>
        </section>
    );
};
