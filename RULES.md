# Regras do Projeto (SuperStorys Analytics Dashboard)

**⚠️ IMPORTANTE: A INTELIGÊNCIA ARTIFICIAL DEVE LER ESTE ARQUIVO OBRIGATORIAMENTE ANTES DE EXECUTAR QUALQUER MODIFICAÇÃO NO PROJETO.**

Este documento define as diretrizes de arquitetura, design, tecnologias e boas práticas para o desenvolvimento do dashboard SuperStorys. O não cumprimento dessas regras pode resultar em regressões visuais ou bugs no código.

## 1. Stack Tecnológica
- **Linguagens:** HTML5, CSS3 puro (Vanilla CSS), JavaScript (Vanilla JS).
- **Bibliotecas Externas:**
  - **Gráficos:** Chart.js (`chart.umd.min.js`) e `chartjs-plugin-datalabels`.
  - **Mapas:** D3.js (`d3.min.js`) e TopoJSON (`topojson-client.min.js`).
- **Frameworks:** **Não utilizar** frameworks (como React, Angular, Vue) ou bibliotecas de estilo baseadas em utilitários (como Tailwind CSS ou Bootstrap). Todo o estilo deve ser mantido em CSS puro.

## 2. Design System e Estética
- **Tipografia:** 
  - Utilizar primariamente as fontes do Google: `Inter`, `Plus Jakarta Sans`, e `JetBrains Mono`.
  - Priorizar tamanhos de fonte maiores para melhor legibilidade, especialmente em rótulos de gráficos, tooltips e títulos.
- **Inspiração Visual:** O projeto segue uma estética moderna e limpa ("React-inspired UI polish"), com uso de glassmorphism, sombras suaves e paleta de cores harmoniosa.
- **Cores Oficiais (Acentos):** Indigo (`var(--accent-indigo)`), Teal (`var(--accent-teal)`), Rose (`var(--accent-rose)`), Amber (`var(--accent-amber)`).
- **Interatividade:** Adicionar micro-interações (hover effects, transições suaves) em cards e gráficos para garantir que a interface pareça dinâmica.

## 3. Estrutura de Layout e Responsividade
- **Sidebar:** A navegação lateral não possui mais um botão de "toggle" (expandir/recolher) para a visualização no desktop, foi removido por decisão de design. O rodapé e ícones devem ser estritamente bem alinhados e os tooltips preservados quando a sidebar for adaptada.
- **Scroll e Navegação:** Todas as seções devem ter `scroll-margin-top` configurado corretamente para evitar que os títulos sejam cortados pelo cabeçalho fixo durante a navegação/ancoragem.
- **Gráficos:** As áreas de conteúdo dos gráficos devem ser consistentes e ter tamanhos alinhados horizontalmente (ex: gráficos 2x2 ou em colunas devem fluir lado a lado com alturas similares).

## 4. Diretrizes para Visualização de Dados (Gráficos)
- **Legibilidade em Testes/Produção:** Todos os rótulos de eixos, legendas e tooltips nos gráficos (Chart.js) devem ter fontes em um tamanho considerável, usando configurações globais do Chart.js para a fonte padrão (`Chart.defaults.font.family`, tamanho maior para `size`).
- **Alinhamento:** Quando houver gráficos dispostos em colunas (ex.: Volume por Segmento vs Ações por Segmento, Curva de Retenção vs Retenção Mês 1), garantir que os contentores tenham a mesma altura.
- **Responsividade do Gráfico:** Os gráficos devem sempre respeitar o tamanho do contêiner pai sem transbordar (`maintainAspectRatio: false` geralmente é usado dependendo do layout).

## 5. Práticas de Código
- **IDs Únicos:** Sempre que uma seção ou tab for duplicada (como no caso da "Análise Descritiva II"), certifique-se rigorosamente de que os IDs HTML e referências aos Canvas (`id="xxxChart"`) sejam únicos e não conflitantes com a versão original.
- **CSS DRY (Don't Repeat Yourself):** Evite duplicar códigos CSS. Faça o reuso de classes (ex.: `.section-card`, `.chart-wrap`, `.kpi-card`) em vez de criar novas regras redundantes.
- **Semântica:** Use HTML5 semântico quando possível (`<main>`, `<aside>`, `<header>`, `<nav>`).

## 6. Fluxo de Trabalho (Para IA)
Ao receber um prompt para modificar ou adicionar funcionalidades:
1. **Analise o Pedido:** Verifique como se enquadra na arquitetura Vanilla (HTML/CSS/JS).
2. **Avalie o Impacto Visual:** Certifique-se de que a estética moderna de alto padrão não será degradada.
3. **Modifique com Cuidado:** Se alterar estilos, altere o `style.css` original, preservando as variáveis CSS base. Se alterar o JS, altere `app.js` verificando as instâncias contínuas do Chart.js (fazer `destroy()` ou `update()` quando repintar gráficos, se necessário).
4. **Verifique IDs:** Em cada nova subaba ou componente, invente novos nomes de IDs lógicos para não sobrescrever elementos existentes.

---
**Declaração de Conformidade:**
Qualquer geração de código deve estar em estreita conformidade com estas regras. Em caso de dúvidas sobre adoção de uma nova tecnologia, recuse-se a integrá-la até consultar o usuário, preferindo soluções nativas/vanilla adequadas ao contexto do projeto.
