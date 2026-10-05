<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth scroll-pt-[125px] max-md:scroll-pt-[90px] motion-reduce:scroll-auto">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="bg-x8-bg font-sans text-white antialiased selection:bg-x8-blue selection:text-white">
        @inertia

        <!-- X8 Leads: rastreio (UTM, gclid, fbclid) + envio do lead ao CRM. -->
        <script>
        (function () {
          var CFG = {
            webhook: 'https://x8performance.app.n8n.cloud/webhook/x8-lead',
            sucesso: '/contato/cadastro-concluido', // trecho da URL da página de obrigado
            dias: 90
          };

          var UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'];
          var CLICK = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid'];
          var PENDENTE = 'x8_lead_pendente';

          function setCookie(nome, valor) {
            var exp = new Date(Date.now() + CFG.dias * 864e5).toUTCString();
            document.cookie = nome + '=' + encodeURIComponent(valor) + '; expires=' + exp + '; path=/; SameSite=Lax';
          }
          function getCookie(nome) {
            var m = document.cookie.match(new RegExp('(?:^|; )' + nome + '=([^;]*)'));
            return m ? decodeURIComponent(m[1]) : null;
          }
          function lerJson(nome) {
            try { return JSON.parse(getCookie(nome) || 'null'); } catch (e) { return null; }
          }
          function uuid() {
            if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
            return String(Date.now()) + Math.random().toString(16).slice(2);
          }
          function param(nome) {
            var m = location.search.match(new RegExp('[?&]' + nome + '=([^&#]*)'));
            if (!m) return null;
            try { return decodeURIComponent(m[1].replace(/\+/g, ' ')); } catch (e) { return m[1]; }
          }

          // 1. Guarda de onde o visitante veio (primeiro e último toque)
          function capturar() {
            var achou = {}, tem = false, chaves = UTM.concat(CLICK), i, v;
            for (i = 0; i < chaves.length; i++) {
              v = param(chaves[i]);
              if (v) { achou[chaves[i]] = v; tem = true; }
            }
            if (!tem) return;
            achou.ts = Date.now();
            achou.landing_url = location.href.split('#')[0];
            achou.referrer = document.referrer || null;
            var json = JSON.stringify(achou);
            if (!getCookie('x8_ft')) setCookie('x8_ft', json);
            setCookie('x8_lt', json);
            if (achou.fbclid && !getCookie('_fbc')) setCookie('_fbc', 'fb.1.' + achou.ts + '.' + achou.fbclid);
          }

          function rastreio() {
            var lt = lerJson('x8_lt') || {}, ft = lerJson('x8_ft') || {}, t = {}, i, ga = getCookie('_ga');
            t.event_id = uuid();
            for (i = 0; i < UTM.length; i++) {
              t[UTM[i]] = lt[UTM[i]] || null;
              t['first_' + UTM[i]] = ft[UTM[i]] || null;
            }
            for (i = 0; i < CLICK.length; i++) t[CLICK[i]] = lt[CLICK[i]] || null;
            t.first_landing_url = ft.landing_url || null;
            t.first_referrer = ft.referrer || null;
            t.fbc = getCookie('_fbc');
            t.fbp = getCookie('_fbp');
            t.ga_client_id = ga ? ga.split('.').slice(-2).join('.') : null;
            t.page_url = location.href.split('#')[0];
            t.referrer = document.referrer || null;
            t.user_agent = navigator.userAgent;
            t.submitted_at = new Date().toISOString();
            return t;
          }

          // 2. Lê os campos do formulário pelo atributo "name"
          function lerFormulario(form) {
            var dados = {}, els = form.elements, i, e;
            for (i = 0; i < els.length; i++) {
              e = els[i];
              if (!e.name || e.name.charAt(0) === '_') continue;
              if (e.type === 'password' || e.type === 'file' || e.type === 'submit' || e.type === 'button') continue;
              if ((e.type === 'checkbox' || e.type === 'radio') && !e.checked) continue;
              dados[e.name] = e.value;
            }
            return dados;
          }
          function valido(d) {
            var tel = String(d.telefone || '').replace(/\D/g, '');
            return /.+@.+\..+/.test(String(d.email || '')) || tel.length >= 10;
          }

          // 3. No envio, guarda o lead. Só manda ao CRM quando a página de obrigado aparecer.
          function guardar(form) {
            var d = lerFormulario(form);
            if (!valido(d)) return;
            d.tracking = rastreio();
            try { sessionStorage.setItem(PENDENTE, JSON.stringify({ t: Date.now(), d: d })); } catch (e) { return; }
            vigiar();
          }
          function enviar() {
            var bruto, p;
            try { bruto = sessionStorage.getItem(PENDENTE); } catch (e) { return; }
            if (!bruto) return;
            try { sessionStorage.removeItem(PENDENTE); } catch (e) {}
            try { p = JSON.parse(bruto); } catch (e) { return; }
            if (!p || !p.d || Date.now() - p.t > 10 * 60 * 1000) return;
            var corpo = JSON.stringify(p.d);
            function reserva() {
              try { navigator.sendBeacon(CFG.webhook, new Blob([corpo], { type: 'text/plain' })); } catch (e) {}
            }
            try {
              fetch(CFG.webhook, {
                method: 'POST', mode: 'cors', credentials: 'omit', keepalive: true,
                headers: { 'Content-Type': 'application/json' }, body: corpo
              }).catch(reserva);
            } catch (e) { reserva(); }
          }
          function conferir() {
            if (location.pathname.indexOf(CFG.sucesso) !== -1) enviar();
          }
          function vigiar() {
            var n = 0, id = setInterval(function () {
              conferir();
              if (++n >= 120) clearInterval(id);
            }, 500);
          }

          document.addEventListener('submit', function (ev) {
            if (ev.target && ev.target.tagName === 'FORM') guardar(ev.target);
          }, true);
          window.addEventListener('popstate', conferir);

          window.__x8leads = { rastreio: rastreio, lerFormulario: lerFormulario }; // apoio para teste

          capturar();
          conferir();
        })();
        </script>
    </body>
</html>
