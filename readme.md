# 1. O Problema

<p>Escolher uma profissão torna-se uma necessidade em determinada época de nossas vidas e os jovens têm grande dificuldade em fazer essa opção, principalmente porque o número de profissões aumenta cada vez mais e o mercado de trabalho torna-se cada vez mais exigente e competitivo.</p>

<p>Para isso será necessário que conheça suas habilidade, seus interesses e sua motivação. É aí que a QueroFuturp pode ser de grande ajuda, facilitando esse momento de escolha, auxiliando o jovem a compreender os vários fatores a considerar: aspectos pessoais, relacionais e sociais. Conhecendo todas essas variáveis ele terá mais condições para definir melhor sua escolha.</p>



# 2. Evasão

<p>Segundo estudos do <a href="https://www.semesp.org.br/mapa/edicao-11/brasil/evasao/">Instituto Semesp</a>, para cursos presenciais temos uma taxa de evasao de <b>30%</b> dos alunos de rede privada e de <b>18,4%</b> da rede publica, isso para o ano de 2019. Para os cursos de EAD, a taxa para a rede publica quase dobra, chegando a <b>31,6%.</b></p>

![Evasao](imgs/evasao.png)

<br/>

<p>Para os anos de pandemia, os numeros para o setor privado elevam para <b>37,2%</b> em 2020 e <b>36,6%</b> em 2021.</p>

<p>Os motivos para que isso aconteca, sao diversos, desde trabalho, perca do emprego durantes esses anos, a falta de renda, falta de infraestrutura, <i><b>desvinculação em relação ao curso</i></b>.</p>

# 3. A solução 
<p>O projeto consiste na criação de um chatbot que interage com o usuário, compreendendo seus interesses pessoais, habilidades e estilo de vida, a fim de sugerir a profissão mais adequada. Além disso, o chatbot também oferece orientações sobre os cursos necessários para alcançar essa carreira desejada.</p>


## 3.1 Dados utilizados
<p> Foi utilizado um banco de dados onde temos as profissões possíveis, suas descrições, e o cursos que levam a essas profissões.</p>

## 3.2 Arquitetura do Modelo

<a href='model/Ada_Embedding_Test.ipynb'>Analise exploratoria e treinamento do modelo;</a>

Exemplo de arquitetura:
![Arquitetura](imgs/arquitetura.png)

<br/>

## 3.3 Resultados

Exemplo de visualização: 

<p>Cada <i><b>"x"</b></i> nesse grafico representa o centro de um cluster ou uma determinada "profissao" conforme novos dados sao adicionados, a.</p>

<p>Para criar essa visualização, utilizamos o metodo de reducao dimensional chamado <a href="https://www.jmlr.org/papers/volume9/vandermaaten08a/vandermaaten08a.pdf?fbcl">t-SNE</a>, com ele a dimensao dos dados que possuimos caiu para apenas 2.</p>

![TSNE](imgs/tsne.png)

<br/>

# 4. Arquitetura do Projeto

<p>Nosso front end foi desenvolvido utilizando o framework Angular em javascript, enquanto nosso backend foi implementado usando o framework flask em python.</p>

![Arquitetura do projeto](imgs/arquitetura_projeto.png)
<p>

1. **Coleta de Informações Iniciais do Usuário**: O processo começa com a coleta de informações essenciais do usuário. Perguntamos ao usuário sobre seus interesses pessoais, habilidades, preferências de estilo de vida e como ele enxerga seu dia a dia de trabalho. Essas informações são cruciais para entendermos o perfil do usuário e suas preferências.

2. **Comparação com a Base de Dados de Profissões**: Em seguida, usamos um modelo de semelhança semântica, que é uma ferramenta de processamento de linguagem natural, para comparar as informações fornecidas pelo usuário com nossa base de dados de profissões. O modelo busca correspondências entre as características do usuário e as características típicas associadas a diferentes profissões.

3. **Identificação da Profissão Recomendada**: Com base na análise de semelhança semântica, o sistema identifica a profissão que melhor se encaixa com o perfil do usuário. Essa profissão recomendada é escolhida com base na correspondência de características, interesses e estilo de vida.

4. **Comunicação da Profissão Recomendada ao Usuário**: Após a identificação da profissão recomendada, o chatbot comunica essa informação ao usuário. Ele apresenta a profissão sugerida e fornece uma breve descrição do que essa carreira envolve.

5. **Sugestão de Cursos para Alcançar a Profissão**: Além de recomendar a profissão, o sistema também sugere os cursos e qualificações necessários para que o usuário possa um dia alcançar a profissão recomendada. Isso pode incluir cursos acadêmicos, treinamentos específicos ou certificações.

Em resumo, o fluxograma do projeto começa com a coleta de informações do usuário, passa pela análise de semelhança semântica para sugerir a profissão mais adequada e, em seguida, oferece orientações sobre os cursos necessários para seguir essa carreira. </p>

# 5. Monetizacao 

## 5.1 Markeplace 
<p>Taxa para universidades, plataforma de cursos, etc poderem anunciar seus cursos na plataforma da quero</p>

## 5.2 Aumentos da base
<p>Atração de um grande número de usuários, pessoas interessadas em construir uma carreira, aumentando assim a base de usuários </p>

## 5.3 Dados
<p>Novos dados serão adquiridos e podem ser utilizados para outros produtos e utilização interna</p>

## 5.4 Direcionamento
<p>Aumentar o número de usuários para as outras plataformas já existente da quero </p>


# 6. Testes Unitarios

## 6.1 Backend

* <a href='api/tests.py'>Testes.py</a>

<p>Testes implementados ate o momento:</p>

* Inicializacao do modelo de cluster <b>Kmeans</b>;
* Leitura dos dados csv como pandas <b>DataFrame</b>;
* ... 


## 6.2 Frontend

# 7. Bibliotecas Necessarias (python)

* os;
* pickle;
* openai;
* tiktoken;
* numpy;
* pandas;
* sklearn;
* flask;
* matplotlib;
* plotly;



# Fontes

* <a href="https://www.semesp.org.br/mapa/edicao-11/brasil/evasao/">Instuto Semesp</a>;
* <a href="https://g1.globo.com/educacao/noticia/2022/01/02/quase-35-milhoes-de-alunos-evadiram-de-universidades-privadas-no-brasil-em-2021.ghtml">Quase 3,5 milhões de alunos evadiram de universidades privadas no Brasil em 2021</a>;
* <a href="https://platform.openai.com/docs/guides/embeddings/what-are-embeddings">Open IA Embeddings;</a>
* <a href="https://www.sciencedirect.com/science/article/abs/pii/S1574013721000186">Conceptual and empirical comparison of dimensionality reduction algorithms (PCA, KPCA, LDA, MDS, SVD, LLE, ISOMAP, LE, ICA, t-SNE)</a>

