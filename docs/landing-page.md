# Landing page X8

Implementação em React/Inertia a partir do SVG, PDF e PNG de 1440 × 12006 enviados. Conteúdo em HTML, com adaptação responsiva; a imagem do layout não é usada como página.

## Edição

- `resources/js/data/homeDoubts.js`: perguntas e respostas do FAQ.
- `resources/js/data/homePlans.js`: planos e tabela de entregáveis.
- `resources/js/data/homeContent.js`: indicadores, disciplinas, método, implantação e depoimentos.
- `resources/js/data/homeBrands.js`: marcas; os 25 PNGs originais foram extraídos do SVG para `resources/js/assets/img/brands`.
- `resources/js/data/contactOptions.js`: opções dos formulários.
- `resources/js/data/navigation.js`: links do cabeçalho e rodapé.
- `resources/css/home.css`: medidas, cores e comportamento responsivo.
- `resources/js/hooks/useHomeAnimations.js`: GSAP/ScrollTrigger, com limpeza ao desmontar e respeito a `prefers-reduced-motion`.

Grid desktop: 1200 px, centralizado em 1440 px. Cores extraídas do SVG: fundo `#040914`, cartões `#071029`, azul `#2F74E6`, destaque `#86AAF2`, texto secundário `#AEBBD1`. Referências de tamanho: título principal 64 px, títulos de seção 52 px, disciplinas 96 px e textos de apoio 18–20 px. As medidas tipográficas foram aproximadas visualmente, pois o SVG contém texto em curvas. Space Grotesk, já indicada na configuração original do projeto, agora é servida localmente por Fontsource.

## Conteúdo a revisar

Os três depoimentos legíveis foram transcritos do layout e ainda contêm “Nome do cliente” e “Empresa”. O quarto estava cortado; não foi completado por suposição. Substituir por depoimentos aprovados antes da publicação. No FAQ, apenas a primeira resposta estava visível; as outras são sugestões editoriais identificadas no arquivo.

## Integração de contato existente

Os dois formulários têm validação local, máscara de telefone, consentimento conforme o layout, identificação de posição e captura de parâmetros de campanha. Apontam para a rota existente `POST /contato/enviar`. A validação e o serviço PHP ainda precisam ser adaptados antes de usar o envio:

- `PostContactRequest.php` exige CEP, confirmação de telefone e campos de um projeto de móveis; não valida os novos campos empresa, faturamento e segmento.
- `ContactService.php` consulta CEP, usa o esquema antigo de contatos e contém destinatários e remetente da Matriz Office.
- Definir o armazenamento dos campos X8 e os destinatários corretos antes de habilitar o fluxo real. Nenhum envio de contato ou e-mail foi realizado na verificação da interface.

O componente ausente `FinishedRegistration` foi implementado para permitir o build da página de confirmação já existente.

## Verificação

`npm run build` gera os arquivos de produção. A interface foi verificada com Chrome/Playwright local: FAQ, carrossel, máscara de telefone, validação de campos e consentimento, menu mobile, âncoras, preferência de movimento reduzido e animações. Os scripts temporários de conferência e imagens não fazem parte do código da aplicação.
