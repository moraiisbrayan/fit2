# Academia Fit2 — landing page

Landing page da Academia Fit2 (Av. Dom Pedro II, 1134, Centro de São
Lourenço/MG). Página única em HTML/CSS/JS puro: sem framework, sem build,
sem dependência externa além da fonte do Google.

Feito por [Digital Beyond](https://www.instagram.com/digitalbeyond.co/).

## Estrutura

```
.
├── index.html              página inteira
├── vercel.json             cache dos assets e clean URLs
├── README.md
└── assets/
    ├── css/style.css       estilos, em blocos numerados
    ├── js/main.js          menu, reveals, parallax, lightbox, vídeo, planos
    ├── img/                logo + fotos otimizadas (.webp)
    └── video/              vídeo do Leo Stronda (.mp4)
```

## Publicação

Site estático: não tem build, não precisa de servidor Node.

Na **Vercel**, importar este repositório e deixar tudo no padrão —
*Framework Preset* em `Other`, *Build Command* vazio, *Output Directory*
vazio (a raiz do repo). Cada push na branch `main` republica sozinho.

Serve igual em Netlify, Cloudflare Pages, cPanel ou qualquer hospedagem
estática.

---

## ⚠️ ANTES DE PUBLICAR

### 1. Número do WhatsApp
`assets/js/main.js`, primeira linha útil:

```js
const WHATSAPP_NUMERO = '5535999999999'; // <-- TROCAR
```

Formato: país + DDD + número, só dígitos. Todos os botões da página puxam
desse único lugar, cada um com a sua mensagem pronta.

### 2. Preços dos planos são FICTÍCIOS
A seção "Escolha o seu plano" está com valores inventados só para fechar o
layout: R$ 119,90 mensal, R$ 99,90 trimestral e R$ 79,90 anual.

Tudo que precisa ser trocado está marcado com `data-placeholder` no HTML —
busque por essa palavra e você acha os três preços e as condições
comerciais (economia no trimestre, parcelamento, isenção de matrícula,
"sem fidelidade", reavaliação a cada 45 dias). Nenhuma dessas condições foi
confirmada pela academia.

Os itens **sem** `data-placeholder` são verdadeiros e podem ficar: acesso
das 6h às 22h, ficha montada por professor e acompanhamento na sala.

Ao trocar um preço, mantenha também o atributo `data-conta` com o mesmo
número — é ele que faz o valor contar de zero na animação.

**Não publicar com esses valores.**

### 3. Direito de imagem do vídeo
O vídeo do Leo Stronda aparece com nome e imagem numa página comercial.
Confirmar com a academia se existe autorização de uso — mensagem, contrato
ou publicação dele marcando a Fit2 já resolve.

O texto da seção não coloca nenhuma frase na boca dele: só diz que ele
treinou lá e gravou a recomendação. O vídeo fala por si.

### 4. Conferir com o cliente
- **Telefone (35) 3332-1811** — veio de listagem pública, confirmar.
- **Horários 6h–22h / sáb 8h–12h** — batem com a bio do Instagram, confirmar.
- **"Professor junto"** — a página afirma que há professor acompanhando na
  sala. Confirmar se vale para todos os horários.

---

## Avaliações

As três da seção "Quem sobe essa escada todo dia" são reais, publicadas no
Google por Isabele Pereira, Rafael Torres e Elisangela Marilia Francisca da
Rosa. O texto está exatamente como cada um escreveu — não editar o
conteúdo de depoimento, só o que fica em volta.

Se for trocar por outras, mantenha o formato: cinco estrelas, texto, nome e
a linha de origem com o tempo ("Avaliação no Google, há 3 meses"). Os
tempos são relativos, então vale revisar de vez em quando.

---

## O que a página tem, em ordem

Hero em tela cheia → números (6h / 22h / 16h) → por que a Fit2 →
estrutura (foto fixa trocando enquanto o texto rola) → primeiro dia em
4 passos → galeria → vídeo do Leo Stronda → depoimentos → planos →
CTA → localização e horários → rodapé com a marca em tipografia grande.

---

## Decisões de design

**Cores tiradas da logo e das fotos**, não de paleta genérica:
vermelho `#f20510` (o vermelho exato da logo), preto puro do piso,
`#dcd6cb` do creme dos aparelhos antigos, `#86868a` do teto de concreto.

**A viga vermelha** que abre cada seção é referência direta às vigas
pintadas no teto da academia. É o elemento gráfico que amarra a página.

**Tipografia:** Archivo variável, uma única família usada em larguras
diferentes — 120 de largura e 900 de peso no título do hero, 100 no
corpo. O itálico pesado repete o corte inclinado da logo.

**Hero:** foto real em tela cheia (`sala-geral-hero.webp`, 1090×1443, que é
a resolução do arquivo original, exportada em qualidade 93) com parallax
discreto e a headline em três tempos — "Levanta. / Repete. / Evolui." A
linha do meio é vazada (só contorno) e a de baixo em vermelho.

**Segunda seção:** foto do professor em círculo com arco vermelho em SVG
atrás e quatro vantagens com ícone ao lado — estrutura, acompanhamento,
horário e localização — e fecho com o CTA de quem nunca treinou.

**Galeria:** todas as fotos da academia são verticais, em torno de 3:4, e
cada célula da grade usa essa mesma proporção, senão a foto perde metade
do enquadramento. Três colunas no desktop e duas no celular, com a última
fileira centralizada. Clique em qualquer foto abre em tela cheia.

**Seção do vídeo:** faixa de largura total com um brilho vermelho baixo por
trás, que separa o bloco do resto da página sem trocar a cor de fundo. Play
com halo pulsando e selo de duração no canto.

**Planos:** três cards, o do meio destacado em vermelho com selo. O preço
conta de zero até o valor quando o card entra na tela (dígitos de largura
fixa, então nada treme), os itens da lista entram em cascata, uma barra
vermelha corre no topo no hover e uma luz vermelha suave acompanha o
cursor. A luz e o efeito de subir só ligam em ponteiro de mouse — no toque
ficariam presos depois do clique.

**Movimento:** vigas que se abrem da esquerda pra direita, seção de
estrutura com foto fixa que troca conforme o texto rola, e reveal
escalonado por seção. Cascata nos números, passos, galeria, planos e
vantagens feita só com `transition-delay`, que não custa processamento
nenhum. Tudo em `opacity` e `transform` — nada de `filter`,
`box-shadow` animado ou `background-position`, que são os que travam
celular fraco.

**Tom da copy:** motivacional e energético, mas sempre ancorado em algo
concreto da academia — horário, andar, aparelho, rotina. Sem "transforme
seu corpo" e sem "supere seus limites".

**Rodapé:** "FIT2" em contorno ocupando a largura toda, e a assinatura da
agência leva pro Instagram da Digital Beyond (@digitalbeyond.co).

---

## O vídeo

`assets/video/leo-stronda-fit2.mp4` — recodificado do original para rodar
em qualquer lugar:

- H.264 perfil **Main**, nível 3.1, 540×960, `yuv420p`
- Áudio **AAC-LC** 80 kbps, 44,1 kHz estéreo
- `-movflags +faststart`: o índice fica no começo do arquivo, então o vídeo
  começa a tocar antes de baixar inteiro
- 2,9 MB (o original tinha 7,6 MB)

Essa combinação toca em Chrome, Safari, Firefox, Edge, iOS e Android sem
plugin. No HTML: `preload="none"` (não baixa nada até clicarem),
`playsinline` (no iPhone não abre em tela cheia sozinho), `poster` com um
quadro do próprio vídeo e `controls` nativo — se o JavaScript falhar, o
play ainda funciona.

Para trocar o vídeo depois:

```
ffmpeg -i original.mp4 -c:v libx264 -profile:v main -level 3.1 -crf 30 \
  -preset veryslow -vf scale=540:960 -pix_fmt yuv420p \
  -c:a aac -b:a 80k -ar 44100 -ac 2 -movflags +faststart saida.mp4
```

---

## Sobre a nitidez da hero

A foto de fundo está no tamanho máximo que o arquivo original permite:
1090×1443. Num monitor de 1440px de largura ela ainda é ampliada cerca de
1,3x, e isso é limite da foto, não do código.

Se a academia tiver o arquivo original da câmera (antes de passar pelo
WhatsApp ou pelo Instagram, que reduzem), é só trocar
`assets/img/sala-geral-hero.webp` por uma exportação daquele arquivo.

---

## Cuidados de renderização no celular

Três coisas que causam foto preta em Android e iOS mais antigos foram
tiradas ou limitadas:

1. **`backdrop-filter` no header** — o desfoque sobre foto rolando gera
   retângulo preto em vários aparelhos. Abaixo de 900px o header vira preto
   sólido, sem desfoque.
2. **`clip-path` animado na foto do hero** — trocado por `opacity` +
   `scale`, e no celular a animação de entrada nem roda.
3. **`will-change: transform` fixo** — removido. Ele mantinha uma camada de
   composição ligada o tempo todo, o que consome memória de vídeo à toa.

Se estiver testando no iPhone abrindo o `index.html` direto pelo app
Arquivos, a tela preta é esperada e não é bug: o iOS abre HTML local num
visualizador isolado que não carrega arquivos vizinhos, então CSS, JS e
imagens simplesmente não chegam. O teste válido é publicar a pasta e abrir
pelo Safari.

---

## Detalhes técnicos

- Imagens em WebP, `loading="lazy"` fora da primeira dobra,
  `width`/`height` declarados (evita layout shift).
- `prefers-reduced-motion` desliga todas as animações.
- Sem overflow horizontal em 390, 820, 1280 e 1440 px (testado).
- Foco visível no teclado, `aria-expanded` no menu, link de pular
  conteúdo, lightbox com Esc e devolução de foco.
- Dados estruturados `ExerciseGym` no `<head>` (ajuda Google e Maps).

## Preview

`fit2-preview.html` é a mesma página com tudo embutido num arquivo só,
para abrir com dois cliques. Use a pasta `fit2/` para publicar.
