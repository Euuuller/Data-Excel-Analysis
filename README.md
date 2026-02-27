# SuperStorys Analytics Dashboard

<div align="center">

![SuperStorys Banner](https://img.shields.io/badge/SuperStorys-Analytics%20Dashboard-4F46E5?style=for-the-badge&logoColor=white)

[![Status](https://img.shields.io/badge/Status-Active-22c55e?style=flat-square)](.)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla%20ES5%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Vanilla-1572B6?style=flat-square&logo=css3)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![HTML5](https://img.shields.io/badge/HTML5-Semântico-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![Chart.js](https://img.shields.io/badge/Chart.js-v4.4-FF6384?style=flat-square&logo=chart.js&logoColor=white)](https://www.chartjs.org/)
[![D3.js](https://img.shields.io/badge/D3.js-v7-F9A03C?style=flat-square&logo=d3.js&logoColor=white)](https://d3js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-94a3b8?style=flat-square)](LICENSE)

**Uma plataforma analítica interativa de alto padrão para inteligência de negócios,**  
**construída inteiramente com tecnologias nativas da web — sem frameworks, sem dependências extras.**

[🚀 Como Executar](#-como-executar-localmente) · [📐 Arquitetura](#-arquitetura-do-projeto) · [📊 Módulos Analíticos](#-módulos-analíticos) · [🎨 Design System](#-design-system) · [🤝 Contribuindo](#-contribuindo)

</div>

---

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Módulos Analíticos](#-módulos-analíticos)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Design System](#-design-system)
- [Arquitetura do Projeto](#-arquitetura-do-projeto)
- [Como Executar Localmente](#-como-executar-localmente)
- [Regras e Convenções](#-regras-e-convenções-rulesmd)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🔭 Visão Geral

O **SuperStorys Analytics Dashboard** é uma plataforma analítica cliente-side completamente construída com **HTML5, CSS3 e JavaScript Vanilla** — sem nenhum framework de UI. O projeto demonstra que é possível entregar experiências visuais de altíssimo nível com as tecnologias fundamentais da web.

A aplicação consolida análises de negócio complexas — Cohort, RFM, Descritiva e Performance — em uma interface moderna, responsiva e com um rigoroso sistema de design tokenizado.

### Destaques

| Característica | Detalhe |
|---|---|
| 🏗️ Arquitetura | Modular, CSS em camadas, JS por responsabilidade |
| 🎨 UI/UX | Glassmorphism, micro-animações, gradientes suaves |
| 📊 Visualizações | 15+ gráficos interativos (Chart.js + D3.js) |
| 🗺️ Mapa Geográfico | Choropleth dos EUA com D3 + TopoJSON |
| 📱 Responsividade | Full responsive — mobile, tablet e desktop |
| ⚡ Performance | Charts carregados lazily — somente na primeira visita à aba |
| 💾 Dados | JSON separados por aba — fácil atualização independente |

---

## 📊 Módulos Analíticos

### 1. 🏢 Problema de Negócio
Contexto estratégico do projeto: desafios identificados, abordagem analítica adotada e resultados esperados. Inclui cards de impacto e roadmap em timeline.

### 2. 🔄 Análise de Cohort
Retenção de clientes ao longo do tempo com:
- **Heatmap de Retenção** — tabela colorizada com escala de gradiente indigo (M0–M11)
- **Curva de Retenção Média** — line chart com fill gradiente
- **Usuários por Cohort** — bar chart com gradiente teal

### 3. 🎯 Segmentação RFM
Segmentação Recência × Frequência × Monetarização:
- **Treemap D3.js** — 10 segmentos coloridos por volume de clientes
- **Scatter Plot (Bubble)** — distribuição R×M×F de 60 pontos
- **Receita por Segmento** — horizontal bar chart

### 4. 📈 Análise Descritiva I & II
Dois painéis com:
- **Receita Histórica** — line chart multiano (2020–2023)
- **Mapa de Vendas EUA** — choropleth D3 com escala sequencial
- **Categorias** — donut chart
- **Top 5 Produtos** — horizontal bar chart
- **Taxa de Devoluções** — line chart dual

### 5. 🚀 Performance
KPIs e indicadores avançados:
- **Receita vs Meta vs Lucro** — line chart triaxial
- **Margem por Categoria** — radar chart (2022×2023)
- **Crescimento YoY** — bar chart com cores condicionais
- **Conversão por Canal** — polar area chart
- **LTV vs CAC** — grouped bar chart

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| **HTML5** | — | Marcação semântica, estrutura de abas |
| **CSS3** | — | Design system tokenizado, layout, animações |
| **JavaScript** | ES5+ Vanilla | Lógica, navegação, inicialização de charts |
| **[Chart.js](https://www.chartjs.org/)** | v4.4.0 | 11+ tipos de gráficos interativos |
| **[D3.js](https://d3js.org/)** | v7.8.5 | Treemap RFM + Choropleth EUA |
| **[TopoJSON](https://github.com/topojson/topojson)** | v3.1.0 | Topologia vetorial do mapa dos EUA |
| **[Inter](https://fonts.google.com/specimen/Inter)** | — | Tipografia base |
| **[Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)** | — | Títulos e headings |
| **[JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)** | — | Dados numéricos e KPIs |

> **Zero dependências de framework:** Sem React, Angular, Vue, Tailwind, Bootstrap ou qualquer lib de UI.

---

## 🎨 Design System

O projeto utiliza um sistema de design tokenizado via **CSS Custom Properties** — definidas em `assets/css/base/variables.css`.

### Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `--brand-primary` | `#4F46E5` | Ações principais, links ativos |
| `--accent-indigo` | `#6366F1` | Charts, destaques |
| `--accent-teal` | `#14B8A6` | Dados secundários, gradientes |
| `--accent-rose` | `#F43F5E` | Alertas, devoluções, CAC |
| `--accent-amber` | `#F59E0B` | Metas, avisos |
| `--accent-emerald` | `#10B981` | Positivo, lucro, LTV |
| `--bg-sidebar` | `#0F172A` | Nav lateral, cover |
| `--bg-base` | `#F8F9FC` | Fundo principal |

### Tokens de Espaçamento e Forma

```css
--radius-sm: 8px  |  --radius-md: 12px
--radius-lg: 16px |  --radius-xl: 20px
--sidebar-w: 256px
--shadow-sm / --shadow-md / --shadow-lg / --shadow-card-hover
```

---

## 📐 Arquitetura do Projeto

```
Data-Excel-Analysis/
│
├── index.html                  ← Shell HTML + 15 <script> ordenados
├── RULES.md                    ← Convenções obrigatórias do projeto
├── LICENSE
│
└── assets/
    │
    ├── css/                    ← 17 módulos CSS em 5 camadas
    │   ├── main.css            ← Entry point (@import em cascata)
    │   │
    │   ├── base/               ── Camada 1: fundação
    │   │   ├── variables.css   ← Design tokens (CSS vars)
    │   │   └── reset.css       ← Reset universal + body
    │   │
    │   ├── layout/             ── Camada 2: regiões estruturais
    │   │   ├── app.css         ← App shell, tabs, page-header
    │   │   ├── sidebar.css     ← Sidebar completa (nav, footer)
    │   │   └── topbar.css      ← Topbar mobile + hamburger
    │   │
    │   ├── components/         ── Camada 3: blocos reutilizáveis
    │   │   ├── section-card.css
    │   │   ├── kpi-cards.css
    │   │   ├── chart-wrap.css
    │   │   ├── heatmap.css
    │   │   ├── treemap.css
    │   │   ├── us-map.css
    │   │   └── tooltips.css
    │   │
    │   ├── pages/              ── Camada 4: estilos por tela
    │   │   ├── cover.css       ← Landing screen animada
    │   │   └── business.css    ← Aba Business Problem
    │   │
    │   └── utils/              ── Camada 5: utilitários
    │       ├── utilities.css   ← .hidden, .sidebar-overlay
    │       └── responsive.css  ← Media queries (tablet + mobile)
    │
    ├── js/                     ← 16 módulos JS em 3 camadas
    │   ├── main.js             ← Bootstrap (DOMContentLoaded)
    │   │
    │   ├── core/               ── Camada 1: infraestrutura global
    │   │   ├── registry.js     ← chartRegistry + registerChart()
    │   │   ├── color-utils.js  ← COLORS, hexAlpha(), gradientH/V()
    │   │   └── config.js       ← Chart.defaults globais
    │   │
    │   ├── navigation/         ── Camada 2: UI interativa
    │   │   ├── sidebar.js      ← open/close/initSidebarMobile()
    │   │   ├── tabs.js         ← switchTab() + lazy chart init
    │   │   └── cover.js        ← initCover() + initBusinessDate()
    │   │
    │   └── charts/             ── Camada 3: visualizações por aba
    │       ├── cohort/
    │       │   ├── heatmap.js  ← Tabela heatmap (lerpColor, builder)
    │       │   └── index.js    ← initCohortCharts()
    │       ├── rfm/
    │       │   ├── treemap.js  ← initRFMTreemap() (D3)
    │       │   └── index.js    ← initRFMCharts()
    │       ├── descriptive/
    │       │   ├── us-map.js   ← FIPS_TO_ABBREV + initUSMap() (shared)
    │       │   └── index.js    ← initDescriptiveCharts() + renders
    │       ├── descriptive2/
    │       │   └── index.js    ← initDescriptiveCharts2() (reutiliza descriptive/)
    │       └── performance/
    │           └── index.js    ← initPerformanceCharts()
    │
    └── data/                   ← 5 JSONs — um por aba/contexto
        ├── cohort.json         ← months, users[], retention[][]
        ├── rfm.json            ← segments[], revenueBySegment{}
        ├── descriptive.json    ← revenue{}, stateSales{}, categories{}, topProducts{}, returnRate{}
        ├── descriptive2.json   ← mesmo schema (tab duplicada)
        └── performance.json    ← revenue[], target[], profit[], margin{}, yoyGrowth{}, channels{}
```

### Diagrama de Dependências JS

```
core/registry.js
      ↓
core/color-utils.js
      ↓
core/config.js
      ↓
charts/cohort/heatmap.js  →  charts/cohort/index.js
charts/rfm/treemap.js     →  charts/rfm/index.js
charts/descriptive/us-map.js → charts/descriptive/index.js
                               charts/descriptive2/index.js (reutiliza)
charts/performance/index.js
      ↓
navigation/sidebar.js
navigation/cover.js
navigation/tabs.js
      ↓
main.js  ←  DOMContentLoaded entry point
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Navegador moderno (Chrome 90+, Firefox 88+, Edge 90+)
- Um servidor HTTP local (obrigatório — os charts usam `fetch()` para os JSONs)

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/Data-Excel-Analysis.git
cd Data-Excel-Analysis
```

### 2. Inicie um servidor local

**Opção A — VS Code Live Server (recomendado):**
> Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) e clique em **"Go Live"** na barra inferior.

**Opção B — Node.js:**
```bash
npx serve .
```

**Opção C — Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### 3. Acesse
```
http://localhost:8000
```

> ⚠️ **Não abra o `index.html` diretamente pelo sistema de arquivos (`file://`).** O `fetch()` usado para carregar os arquivos JSON de dados é bloqueado pelo CORS do browser nesse modo.

---

## � Regras e Convenções (`RULES.md`)

Este projeto possui um arquivo `RULES.md` com convenções **obrigatórias** para qualquer contribuição — incluindo colaborações via IA. As principais são:

| Regra | Detalhe |
|---|---|
| **Vanilla only** | Sem React, Angular, Vue, Tailwind, Bootstrap |
| **Fontes obrigatórias** | Inter, Plus Jakarta Sans, JetBrains Mono |
| **IDs únicos** | Nunca duplicar IDs no HTML, especialmente em tabs clonadas |
| **CSS DRY** | Reutilizar variáveis e classes; sem redundância |
| **Modern aesthetic** | Manter glassmorphism, gradientes e micro-animações |
| **Clean Code** | Funções pequenas, nomes descritivos, JSDoc nos módulos |

> Leia o `RULES.md` **antes de qualquer modificação** no projeto.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga o fluxo abaixo:

```bash
# 1. Fork e clone
git clone https://github.com/seu-usuario/Data-Excel-Analysis.git

# 2. Crie uma branch descritiva
git checkout -b feat/nova-analise-xyz

# 3. Faça as alterações respeitando o RULES.md

# 4. Commit semântico
git commit -m "feat: adiciona análise de churn na aba de cohort"

# 5. Push e abra um Pull Request
git push origin feat/nova-analise-xyz
```

### Convenção de Commits

| Prefixo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `style:` | Alterações visuais/CSS sem mudança de lógica |
| `refactor:` | Refatoração sem mudança de comportamento |
| `docs:` | Documentação |
| `data:` | Atualização dos arquivos JSON |

---

## ⚖️ Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

Feito com ❤️ e **zero frameworks**

*SuperStorys Analytics Dashboard — © 2026*

</div>
