// ─── CHAPTERS ────────────────────────────────────────────────────────────────

const chapters = {
  1: {
    tag: "Capítulo 1 · Parte I — Fundamentos",
    title: "Confiabilidade, Escalabilidade e Manutenibilidade",
    desc: "Os três pilares fundamentais para construir sistemas de dados robustos em produção",
    content: `
<div class="section-h2">Os três pilares</div>
<p class="prose">Kleppmann começa estabelecendo que aplicações data-intensive são aquelas onde o desafio principal é o <em>dado</em> — quantidade, complexidade, velocidade de mudança — em contraste com aplicações compute-intensive onde a CPU é o gargalo.</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">🔒</div>
    <h4>Confiabilidade (Reliability)</h4>
    <p>O sistema funciona corretamente mesmo diante de falhas de hardware, software ou erros humanos. Tolerância a falhas ≠ prevenção de falhas.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">📈</div>
    <h4>Escalabilidade (Scalability)</h4>
    <p>Capacidade de lidar com carga crescente de forma razoável. Demanda definir métricas de carga e performance antes de escalar.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🔧</div>
    <h4>Manutenibilidade (Maintainability)</h4>
    <p>Facilidade para que equipes possam operar, entender e adaptar o sistema ao longo do tempo — operabilidade, simplicidade, evolvabilidade.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🎯</div>
    <h4>Métricas de Carga</h4>
    <p>Fan-out do Twitter como exemplo: publicar vs. ler tweets. A escolha da métrica certa é crucial para modelar o problema de escalabilidade.</p>
  </div>
</div>

<div class="section-h2">Confiabilidade em detalhe</div>
<p class="prose">Falhas são inevitáveis. A estratégia é construir sistemas tolerantes a falhas. Kleppmann distingue três tipos:</p>
<div class="callout">
  <div class="callout-label">Tipos de Falha</div>
  <strong>Hardware:</strong> discos falhando, quedas de rede — mitiga-se com redundância. <strong>Software:</strong> bugs sistemáticos difíceis de prever, como o bug do leap second. <strong>Humano:</strong> erros de configuração são a maior causa de outages — mitiga-se com abstração, testing e rollback fácil.
</div>

<div class="section-h2">Escalabilidade: Descrever Performance</div>
<p class="prose">O percentil é mais útil que a média. <code>p50</code>, <code>p95</code>, <code>p99</code>, <code>p999</code> — os tail latencies afetam os clientes mais valiosos e se amplificam em sistemas com fan-out alto (como fan-out de leitura no Twitter).</p>
<div class="callout tip">
  <div class="callout-label">Conceito Chave</div>
  <strong>Head-of-line blocking</strong>: uma requisição lenta pode bloquear todas as seguintes no servidor. Por isso p99 e p999 importam mesmo para uma pequena fração dos usuários.
</div>

<div class="key-terms">
  <span class="term-tag">SLA/SLO</span>
  <span class="term-tag">Tail Latency</span>
  <span class="term-tag">Scale-up vs Scale-out</span>
  <span class="term-tag">Operabilidade</span>
  <span class="term-tag">Evolvabilidade</span>
  <span class="term-tag">Fan-out</span>
</div>
    `
  },
  2: {
    tag: "Capítulo 2 · Parte I — Fundamentos",
    title: "Modelos de Dados e Query Languages",
    desc: "Relacional vs. Documento vs. Grafos — trade-offs e quando usar cada modelo",
    content: `
<div class="section-h2">A batalha dos modelos</div>
<p class="prose">Cada modelo de dados incorpora uma forma de <em>pensar sobre o problema</em>. A escolha errada cria o famoso <strong>impedance mismatch</strong> — a fricção entre como o dado existe no código vs. no banco.</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">🗃️</div>
    <h4>Modelo Relacional</h4>
    <p>Invented by Codd (1970). Dados em tabelas, joins, normalização. Bom para muitos-para-muitos. SQL é declarativo.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">📄</div>
    <h4>Modelo Documento</h4>
    <p>JSON/BSON. Schema-on-read, localidade de dados. Bom para dados hierárquicos e poucos joins. MongoDB, CouchDB.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🕸️</div>
    <h4>Modelo Grafo</h4>
    <p>Nodes e edges. Ideal quando tudo se conecta com tudo: redes sociais, recomendações. Neo4j, Cypher, SPARQL.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🔑</div>
    <h4>Modelo Key-Value / Wide Column</h4>
    <p>Extremamente simples. Cassandra, DynamoDB. Alta performance e escalabilidade ao custo de queries limitadas.</p>
  </div>
</div>

<div class="callout">
  <div class="callout-label">Insight Central</div>
  Não existe modelo universalmente melhor. A regra geral: se você tem muitos relacionamentos muitos-para-muitos, prefira relacional. Se o dado é naturalmente hierárquico e raramente você precisa de joins, documental pode ser mais simples. Se o dado É um grafo, use grafo.
</div>

<div class="section-h2">SQL Declarativo vs. Imperativo</div>
<p class="prose">SQL diz <em>o que</em> você quer, não <em>como</em> obtê-lo. Isso permite que o query optimizer escolha o melhor plano de execução. O equivalente imperativo (loops) não pode ser otimizado da mesma forma — e é isso que deu ao modelo relacional sua longevidade.</p>

<div class="key-terms">
  <span class="term-tag">Impedance Mismatch</span>
  <span class="term-tag">Schema-on-read</span>
  <span class="term-tag">MapReduce</span>
  <span class="term-tag">Cypher</span>
  <span class="term-tag">Normalização</span>
</div>
    `
  },
  3: {
    tag: "Capítulo 3 · Parte I — Fundamentos",
    title: "Storage e Recuperação",
    desc: "Como os bancos de dados armazenam e encontram dados — índices, LSM-Trees, B-Trees e OLAP",
    content: `
<div class="section-h2">Estruturas de dados que movem o mundo</div>
<p class="prose">A ideia mais simples de banco de dados: um arquivo append-only com pares chave-valor. Busca em O(n). Isso leva naturalmente à necessidade de índices — estruturas de dados adicionais que <em>acelerem leituras ao custo de escritas mais lentas</em>.</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">🌲</div>
    <h4>B-Trees</h4>
    <p>Estrutura padrão de praticamente todo banco relacional. Leituras e escritas em O(log n). Atualização in-place. Bom para leituras.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">📝</div>
    <h4>LSM-Trees (Log-Structured)</h4>
    <p>SSTables + memtable. Escritas sequenciais no disco, muito rápidas. Leituras precisam mesclar múltiplos arquivos. Usado por Cassandra, LevelDB, RocksDB.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🏭</div>
    <h4>OLAP / Data Warehouse</h4>
    <p>Analytics em vez de transações. Queries varrem bilhões de linhas. Column-oriented storage comprime bem e lê apenas as colunas necessárias.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">⚡</div>
    <h4>Column-Oriented Storage</h4>
    <p>Armazena todos os valores de uma coluna juntos. Compressão excelente com bitmap encoding. Fundamental para OLAP performático.</p>
  </div>
</div>

<div class="callout tip">
  <div class="callout-label">Trade-off Fundamental</div>
  <strong>LSM-Trees</strong>: melhor para workloads write-heavy. Compaction em background pode causar latência intermitente.<br>
  <strong>B-Trees</strong>: melhor para workloads read-heavy. Cada chave existe em exatamente um lugar, facilitando locks e transações.
</div>

<div class="key-terms">
  <span class="term-tag">SSTables</span>
  <span class="term-tag">WAL</span>
  <span class="term-tag">Bloom Filters</span>
  <span class="term-tag">OLTP vs OLAP</span>
  <span class="term-tag">Materialized Views</span>
  <span class="term-tag">Bitmap Encoding</span>
</div>
    `
  },
  4: {
    tag: "Capítulo 4 · Parte I — Fundamentos",
    title: "Encoding e Evolução",
    desc: "Como serializar dados e manter compatibilidade quando schemas evoluem ao longo do tempo",
    content: `
<div class="section-h2">O problema da evolução de schemas</div>
<p class="prose">Sistemas reais mudam. Você precisa manter <strong>forward compatibility</strong> (código novo lê dados velhos) e <strong>backward compatibility</strong> (código velho lê dados novos). Isso é difícil com formatos verbosos como JSON/XML.</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">📊</div>
    <h4>JSON & XML</h4>
    <p>Legível por humanos, schema opcional. Problema: não distingue inteiro de float, não suporta binário, verboso. Bom para APIs externas.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">⚡</div>
    <h4>Thrift & Protocol Buffers</h4>
    <p>Binário, compacto, com schema obrigatório e field tags numéricas. Forward/backward compatibility garantida. Usado no gRPC.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🦅</div>
    <h4>Avro</h4>
    <p>Sem field tags — usa schema implícito. Schema do writer e do reader podem diferir. Excelente para batch (Hadoop). Schema evolution elegante.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🌊</div>
    <h4>Dataflow</h4>
    <p>Dados fluem via bancos, REST/RPC ou message queues. Cada canal tem implicações diferentes para evolução de schema e versioning.</p>
  </div>
</div>

<div class="callout warn">
  <div class="callout-label">Cuidado</div>
  Usar formatos de serialização específicos de linguagem (Java Serializable, Python pickle) é uma armadilha: acoplam o dado à linguagem, criam vulnerabilidades de segurança e dificultam versionamento.
</div>

<div class="key-terms">
  <span class="term-tag">Forward/Backward Compat</span>
  <span class="term-tag">Field Tags</span>
  <span class="term-tag">Avro Schema</span>
  <span class="term-tag">REST vs RPC</span>
  <span class="term-tag">Message Queues</span>
</div>
    `
  },
  5: {
    tag: "Capítulo 5 · Parte II — Dados Distribuídos",
    title: "Replicação",
    desc: "Como manter múltiplas cópias dos dados sincronizadas em máquinas diferentes",
    content: `
<div class="section-h2">Por que replicar?</div>
<p class="prose">Replicação serve a três propósitos: <em>latência</em> (dados perto dos usuários), <em>disponibilidade</em> (sistema funciona quando nós falham) e <em>throughput de leitura</em> (múltiplos nós respondem reads). O desafio real é lidar com mudanças nos dados replicados.</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">👑</div>
    <h4>Single-Leader</h4>
    <p>Um leader recebe writes, followers replicam. Simples e consistente. O gargalo é o leader. Usado no PostgreSQL, MySQL, MongoDB.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">👥</div>
    <h4>Multi-Leader</h4>
    <p>Múltiplos leaders aceitam writes. Melhor para multi-datacenter. Problema central: conflitos de escrita. Requer estratégia de resolução.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🌐</div>
    <h4>Leaderless (Dynamo-style)</h4>
    <p>Qualquer nó aceita writes. Quorum: W + R > N para consistência. Permite operação com nós caídos via sloppy quorum e hinted handoff.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">⏱️</div>
    <h4>Replication Lag</h4>
    <p>Replicação async gera inconsistências temporárias. Read-your-writes, monotonic reads e consistent prefix reads são garantias parciais.</p>
  </div>
</div>

<div class="callout">
  <div class="callout-label">Problema Clássico</div>
  <strong>Conflitos de escrita no multi-leader</strong>: dois usuários editam o mesmo dado simultaneamente em leaders diferentes. Estratégias: last-write-wins (LWW), union de conflitos, ou delegar resolução à aplicação. LWW perde dados — use com cautela.
</div>

<div class="key-terms">
  <span class="term-tag">Quorum (W+R>N)</span>
  <span class="term-tag">Read-your-writes</span>
  <span class="term-tag">Sloppy Quorum</span>
  <span class="term-tag">CRDTs</span>
  <span class="term-tag">Replication Log</span>
</div>
    `
  },
  6: {
    tag: "Capítulo 6 · Parte II — Dados Distribuídos",
    title: "Particionamento",
    desc: "Como distribuir dados entre múltiplos nós para escalar além do que uma máquina comporta",
    content: `
<div class="section-h2">Sharding: dividir para conquistar</div>
<p class="prose">Particionamento (sharding) é a técnica de dividir um dataset grande em partições menores, distribuídas entre múltiplos nós. O objetivo é distribuir carga de queries e dados de forma que nenhum nó individual seja gargalo.</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">🔑</div>
    <h4>Partição por Key Range</h4>
    <p>Chaves ordenadas e divididas em ranges. Permite range queries eficientes. Risco: hot spots se escritas se concentrarem em um range.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">#️⃣</div>
    <h4>Partição por Hash</h4>
    <p>Hash da chave determina a partição. Distribui carga uniformemente. Perde a capacidade de range queries eficientes.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🔄</div>
    <h4>Rebalancing</h4>
    <p>Quando nós são adicionados/removidos, dados precisam migrar. Consistent hashing minimiza movimentação, mas fixed number of partitions é mais simples.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🔀</div>
    <h4>Request Routing</h4>
    <p>Como cliente sabe em qual nó está sua chave? ZooKeeper para service discovery, ou gossip protocol. Coordination vs. autonomia.</p>
  </div>
</div>

<div class="key-terms">
  <span class="term-tag">Hot Spots</span>
  <span class="term-tag">Consistent Hashing</span>
  <span class="term-tag">Secondary Indexes</span>
  <span class="term-tag">Scatter/Gather</span>
</div>
    `
  },
  7: {
    tag: "Capítulo 7 · Parte II — Dados Distribuídos",
    title: "Transações",
    desc: "ACID, níveis de isolamento, anomalias, e quando transações são necessárias (ou não)",
    content: `
<div class="section-h2">ACID — mais complexo do que parece</div>
<p class="prose">ACID é frequentemente mal entendido. Cada letra esconde camadas de complexidade, e diferentes bancos implementam de formas radicalmente diferentes:</p>

<div class="callout">
  <div class="callout-label">ACID Desmistificado</div>
  <strong>A</strong>tomicity: "all or nothing" — não é sobre concorrência, é sobre falhas.<br>
  <strong>C</strong>onsistency: propriedade da aplicação, não do banco — é o C menos útil.<br>
  <strong>I</strong>solation: transações paralelas não interferem — o mais complexo e costoso.<br>
  <strong>D</strong>urability: dado committed não some — WAL + replication.
</div>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">😈</div>
    <h4>Anomalias de Concorrência</h4>
    <p>Dirty reads, dirty writes, read skew, write skew, phantom reads, lost updates. Cada nível de isolamento protege contra diferentes subsets.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">📸</div>
    <h4>Snapshot Isolation (MVCC)</h4>
    <p>Leitores não bloqueiam escritores, escritores não bloqueiam leitores. Cada transação vê uma snapshot consistente dos dados.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🔒</div>
    <h4>Two-Phase Locking (2PL)</h4>
    <p>Locks compartilhados para leitura, exclusivos para escrita. Serializable, mas lento. Susceptível a deadlocks.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🚀</div>
    <h4>SSI — Serializable SI</h4>
    <p>Serializable sem locks pesados. Detecta conflitos ao invés de prevenir. Optimistic concurrency control. Melhor throughput que 2PL.</p>
  </div>
</div>

<div class="key-terms">
  <span class="term-tag">Write Skew</span>
  <span class="term-tag">MVCC</span>
  <span class="term-tag">SSI</span>
  <span class="term-tag">Lost Update</span>
  <span class="term-tag">Isolation Levels</span>
</div>
    `
  },
  8: {
    tag: "Capítulo 8 · Parte II — Dados Distribuídos",
    title: "Problemas em Sistemas Distribuídos",
    desc: "Redes não confiáveis, relógios imprecisos e o fundamento filosófico do que pode dar errado",
    content: `
<div class="section-h2">A difícil realidade dos sistemas distribuídos</div>
<p class="prose">Este capítulo é uma imersão no pessimismo necessário: o que pode dar errado. Redes podem atrasar ou perder pacotes. Relógios derivam. Processos pausam por GC ou virtualização. <strong>Partial failures</strong> — onde alguns componentes falham mas outros não — são impossíveis em máquinas locais, mas inevitáveis em redes.</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">🌐</div>
    <h4>Redes Não Confiáveis</h4>
    <p>Timeouts não provam que o servidor falhou — o request pode ter chegado, processado, mas a resposta se perdeu. Você não sabe.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">⏰</div>
    <h4>Relógios Não Confiáveis</h4>
    <p>NTP pode voltar no tempo. Clock skew entre nós invalida qualquer ordenação baseada em timestamps. Use logical clocks para causality.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🧟</div>
    <h4>Process Pauses</h4>
    <p>GC stop-the-world, swap, virtualização — um processo pode pausar por minutos e não saber. "Leases" baseados em tempo se tornam inválidos.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🧠</div>
    <h4>Truth by Majority</h4>
    <p>Um nó não pode confiar em si mesmo. Um nó que se considera líder pode ser morto por split-brain. Quorum define a realidade.</p>
  </div>
</div>

<div class="callout warn">
  <div class="callout-label">A falácia fundamental</div>
  A rede é confiável, latência é zero, bandwidth é infinita, a rede é segura, topologia não muda, há um administrador, custo de transporte é zero, a rede é homogênea. — As 8 Falácias da Computação Distribuída (Peter Deutsch, 1994).
</div>

<div class="key-terms">
  <span class="term-tag">Fencing Tokens</span>
  <span class="term-tag">Byzantine Faults</span>
  <span class="term-tag">Logical Clocks</span>
  <span class="term-tag">Split Brain</span>
</div>
    `
  },
  9: {
    tag: "Capítulo 9 · Parte II — Dados Distribuídos",
    title: "Consistência e Consenso",
    desc: "Linearizabilidade, total order broadcast e o problema do consenso distribuído",
    content: `
<div class="section-h2">O coração teórico do livro</div>
<p class="prose">Consistência tem muitos significados. Linearizabilidade é a forma mais forte: o sistema se comporta como se houvesse <em>uma única cópia do dado</em>. Isso tem um custo enorme em sistemas distribuídos — é incompatível com disponibilidade sob partições (CAP theorem).</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">🎯</div>
    <h4>Linearizabilidade</h4>
    <p>Após uma escrita completar, todos os reads devem ver o novo valor. "Recency guarantee". Necessária para eleição de líder e distributed locks.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">📬</div>
    <h4>Total Order Broadcast</h4>
    <p>Mensagens entregues na mesma ordem para todos os nós. Equivalente a consensus. Base para log replication (Raft, Paxos).</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🤝</div>
    <h4>Two-Phase Commit (2PC)</h4>
    <p>Protocolo para atomic commit distribuído. Um coordinator pergunta a todos os participantes. Problema: coordinator pode falhar, deixando tudo bloqueado.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">⚡</div>
    <h4>Raft / Paxos</h4>
    <p>Algoritmos de consenso tolerantes a falhas. Garantem progresso enquanto maioria dos nós funciona. Base do etcd, ZooKeeper.</p>
  </div>
</div>

<div class="callout">
  <div class="callout-label">CAP Theorem — A visão real</div>
  O teorema de Brewer diz que durante uma partição de rede, você escolhe entre Consistency (C) ou Availability (A). <strong>Kleppmann argumenta</strong> que o CAP theorem é frequentemente mal interpretado e que o trade-off real é entre consistência e latência (PACELC).
</div>

<div class="key-terms">
  <span class="term-tag">CAP Theorem</span>
  <span class="term-tag">Raft</span>
  <span class="term-tag">ZooKeeper</span>
  <span class="term-tag">2PC</span>
  <span class="term-tag">Causal Consistency</span>
</div>
    `
  },
  10: {
    tag: "Capítulo 10 · Parte III — Dados Derivados",
    title: "Batch Processing",
    desc: "MapReduce, Unix philosophy e como processar datasets gigantescos de forma confiável",
    content: `
<div class="section-h2">A filosofia Unix aplicada a big data</div>
<p class="prose">O Unix pipe é o ancestral do MapReduce. A filosofia: programas simples que fazem uma coisa bem, comunicando-se via stdin/stdout. MapReduce aplica esse princípio a datasets que não cabem em memória, espalhados por centenas de máquinas.</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">🗺️</div>
    <h4>MapReduce</h4>
    <p>Map extrai chaves. Shuffle/Sort agrupa por chave. Reduce agrega. Tolerante a falhas: qualquer etapa pode ser reexecutada.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🔗</div>
    <h4>Joins em Batch</h4>
    <p>Sort-merge join, broadcast hash join, partitioned hash join. Cada estratégia tem trade-offs de memória e I/O.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🚀</div>
    <h4>Além do MapReduce</h4>
    <p>Spark, Flink, Tez — dataflow engines que evitam materializar estado intermediário em disco. Muito mais rápidos para iterative algorithms.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🌊</div>
    <h4>Output de Batch Jobs</h4>
    <p>Não é só relatórios: batch jobs constroem índices de busca, treinam modelos ML, pré-computam recomendações.</p>
  </div>
</div>

<div class="key-terms">
  <span class="term-tag">Shuffle</span>
  <span class="term-tag">Spark vs MapReduce</span>
  <span class="term-tag">HDFS</span>
  <span class="term-tag">Lambda Architecture</span>
</div>
    `
  },
  11: {
    tag: "Capítulo 11 · Parte III — Dados Derivados",
    title: "Stream Processing",
    desc: "Eventos, message brokers, CEP e como processar dados em tempo real com garantias",
    content: `
<div class="section-h2">O mundo é uma sequência de eventos</div>
<p class="prose">Streaming é batch com datasets infinitos. Eventos imutáveis fluem por um log. Kafka popularizou o <strong>partitioned log</strong> como message broker: mensagens são persistidas e consumidores podem fazer replay, ao contrário de message queues tradicionais.</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">📋</div>
    <h4>Partitioned Log (Kafka)</h4>
    <p>Log append-only, particionado, com offsets. Consumidores controlam sua posição. Permite replay, reprocessamento e múltiplos consumers independentes.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🔄</div>
    <h4>Change Data Capture (CDC)</h4>
    <p>Captura mudanças no banco de dados como eventos. Permite replicar para outros sistemas (search, cache, analytics) de forma confiável.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🎭</div>
    <h4>Event Sourcing</h4>
    <p>Armazenar eventos (causas) em vez de estado (efeitos). Estado é derivado dos eventos. Audit log gratuito, viagem no tempo possível.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">⏳</div>
    <h4>Tempo em Streams</h4>
    <p>Event time vs. processing time. Watermarks para lidar com eventos atrasados. Janelas (tumbling, hopping, sliding, session).</p>
  </div>
</div>

<div class="callout tip">
  <div class="callout-label">Insight</div>
  O database é um cache do log. Essa inversão de pensamento — o evento como primeira classe, o estado como derivado — é o core do event sourcing e do "unbundling the database" que o capítulo 12 vai explorar.
</div>

<div class="key-terms">
  <span class="term-tag">Kafka Consumer Groups</span>
  <span class="term-tag">Exactly-once</span>
  <span class="term-tag">Watermarks</span>
  <span class="term-tag">Stream-Table Join</span>
</div>
    `
  },
  12: {
    tag: "Capítulo 12 · Parte III — Dados Derivados",
    title: "O Futuro dos Sistemas de Dados",
    desc: "Dataflow, integridade end-to-end, ética dos dados e a visão de futuro do Kleppmann",
    content: `
<div class="section-h2">Desagregando o banco de dados</div>
<p class="prose">O argumento final do livro: ao invés de um banco de dados único que faz tudo, podemos compor ferramentas especializadas usando <em>logs de eventos como espinha dorsal</em>. CDC + stream processing + views materializadas = o banco de dados como conceito estendido por toda a infraestrutura.</p>

<div class="concept-grid">
  <div class="concept-card">
    <div class="card-icon">🔧</div>
    <h4>Unbundling Databases</h4>
    <p>Separar armazenamento, indexação, query, cache, search em ferramentas especializadas integradas por dataflow. Mais flexível que um monolito de banco.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">✅</div>
    <h4>End-to-End Argument</h4>
    <p>Idempotência e exactly-once nas camadas inferiores não resolvem o problema — a aplicação precisa de suas próprias garantias de integridade.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">🔍</div>
    <h4>Auditabilidade</h4>
    <p>Sistemas imutáveis baseados em eventos permitem verificar depois que os dados estão corretos. Integridade verificável como consequência natural.</p>
  </div>
  <div class="concept-card">
    <div class="card-icon">⚖️</div>
    <h4>Ética dos Dados</h4>
    <p>Privacy, tracking, predictive analytics e seus impactos em pessoas reais. O livro termina com uma chamada à responsabilidade dos engenheiros de dados.</p>
  </div>
</div>

<div class="callout tip">
  <div class="callout-label">A grande mensagem do livro</div>
  Entender <em>por que</em> as ferramentas funcionam como funcionam — seus trade-offs fundamentais — é mais valioso que conhecer qualquer ferramenta específica. O landscape muda; os princípios persistem.
</div>

<div class="key-terms">
  <span class="term-tag">Dataflow Model</span>
  <span class="term-tag">Kappa Architecture</span>
  <span class="term-tag">Privacy by Design</span>
  <span class="term-tag">System of Record</span>
</div>
    `
  }
};

// ─── FLASHCARDS ───────────────────────────────────────────────────────────────

const flashcardsData = [
  { q: "Qual a diferença entre falha (fault) e falha do sistema (failure) no contexto de confiabilidade?", a: "Uma fault é quando um componente específico se desvia do comportamento esperado. Uma failure é quando o sistema como um todo para de fornecer o serviço ao usuário. Sistemas tolerantes a falhas (fault-tolerant) evitam que faults individuais se tornem failures." },
  { q: "Por que percentis (p95, p99) são mais úteis que a média para medir latência?", a: "A média esconde a distribuição real. O p95 (95th percentile) significa que 95% das requests são mais rápidas que aquele valor. Clientes com mais dados tendem a ter requests mais lentas, e são frequentemente os mais valiosos. Tail latencies impactam experiência real." },
  { q: "Explique o impedance mismatch em bancos de dados.", a: "É a fricção entre o modelo orientado a objetos usado no código (aplicação) e o modelo relacional (tabelas). Para salvar/ler objetos, precisa-se de mapeamento (ORM). Bancos de documentos eliminam parte dessa fricção para dados hierárquicos." },
  { q: "Qual a diferença entre LSM-Trees e B-Trees em termos de performance?", a: "LSM-Trees são superiores para write-heavy workloads (escritas sequenciais no disco, mais rápidas). B-Trees são melhores para read-heavy workloads (acesso direto O(log n)). LSM-Trees têm write amplification durante compaction; B-Trees têm read amplification." },
  { q: "O que são SSTables e como se relacionam com LSM-Trees?", a: "SSTables (Sorted String Tables) são arquivos imutáveis com pares chave-valor ordenados por chave. São o componente de storage das LSM-Trees. Escritas vão primeiro para uma memtable (in-memory), que quando cheia é descarregada como SSTable. Múltiplas SSTables são periodicamente compactadas." },
  { q: "O que é backward compatibility e forward compatibility?", a: "Backward compatibility: código novo pode ler dados escritos por código antigo. Forward compatibility: código antigo pode ler dados escritos por código novo. Ambas são necessárias quando diferentes versões de código rodam simultaneamente (rolling upgrades)." },
  { q: "Como Avro difere de Protocol Buffers em termos de evolução de schema?", a: "Protocol Buffers usa field tags numéricas no schema para identificar campos (compatível com versões sem tags novas). Avro não usa tags — usa resolução de schema comparando o schema do writer com o do reader. Avro é melhor para batch (Hadoop); Protobuf para serviços (gRPC)." },
  { q: "Quais são os problemas de replication lag em single-leader replication?", a: "Três inconsistências: (1) Read-your-writes: usuário não vê sua própria escrita em follower. (2) Monotonic reads: usuário vê dados 'voltando no tempo' lendo de followers diferentes. (3) Consistent prefix reads: em conversas causais, respostas aparecem antes das perguntas." },
  { q: "Explique o problema de write conflicts em multi-leader replication.", a: "Dois usuários editam o mesmo dado simultaneamente em leaders diferentes. Quando as escritas se propagam, há conflito. Estratégias: last-write-wins (LWW, perde dados), merge automático via CRDTs, ou delegar resolução à aplicação. Conflitos só podem ser detectados de forma assíncrona." },
  { q: "O que é write skew e como difere de lost updates?", a: "Lost update: duas transações leem o mesmo valor, ambas modificam baseadas nele — uma sobrescreve a outra. Write skew: duas transações leem o mesmo dado, fazem decisões diferentes baseadas nele, e escrevem em objetos diferentes — cada uma individualmente parece correta, mas juntas violam uma invariante." },
  { q: "Como Serializable Snapshot Isolation (SSI) funciona?", a: "SSI é otimista: transações rodam sem locks, mas o banco rastreia quais transações leram quais versões de dados. No commit, verifica se alguma premissa da transação ficou obsoleta (outra transação escreveu nos dados lidos). Se sim, aborta e reexecuta. Melhor throughput que 2PL sob baixa contenção." },
  { q: "Por que relógios de tempo real são problemáticos em sistemas distribuídos?", a: "NTP pode sincronizar com precisão de milissegundos, mas pode andar para trás. Clock skew entre nós torna timestamps não confiáveis para ordenação de eventos. Se dois eventos têm o mesmo timestamp, não sabemos qual ocorreu primeiro. Logical clocks (Lamport, Vector Clocks) são a solução." },
  { q: "O que é linearizabilidade e qual seu custo?", a: "Linearizabilidade é a garantia mais forte de consistência: o sistema se comporta como se houvesse uma única cópia dos dados, e toda operação parece instantânea. O custo: em sistemas distribuídos com partições de rede, linearizabilidade exige sacrificar disponibilidade (CAP theorem)." },
  { q: "Explique o Two-Phase Commit (2PC) e seu principal problema.", a: "2PC garante atomic commit em transações distribuídas. Fase 1: coordinator pergunta a todos os participantes se podem commitar (todos respondem yes/no). Fase 2: se todos disseram yes, coordinator manda commit; senão, abort. Problema: se o coordinator falha após receber os yes mas antes de enviar o commit, os participantes ficam bloqueados indefinidamente (in-doubt)." },
  { q: "Qual a diferença entre event sourcing e change data capture (CDC)?", a: "CDC captura mudanças de estado num banco existente (geralmente relacional) como eventos no log. É retroativo — o banco primário ainda pensa em estado. Event sourcing é uma escolha de design: o sistema armazena eventos como primeira classe, e o estado é derivado dos eventos. Event sourcing é mais radical e ideológico." },
];

// ─── PROGRESS ─────────────────────────────────────────────────────────────────

const progressData = [
  { title: "Confiabilidade, Escalabilidade, Manutenibilidade", pct: 0, ch: 1 },
  { title: "Modelos de Dados e Query Languages", pct: 0, ch: 2 },
  { title: "Storage e Recuperação", pct: 0, ch: 3 },
  { title: "Encoding e Evolução", pct: 0, ch: 4 },
  { title: "Replicação", pct: 0, ch: 5 },
  { title: "Particionamento", pct: 0, ch: 6 },
  { title: "Transações", pct: 0, ch: 7 },
  { title: "Problemas em Sistemas Distribuídos", pct: 0, ch: 8 },
  { title: "Consistência e Consenso", pct: 0, ch: 9 },
  { title: "Batch Processing", pct: 0, ch: 10 },
  { title: "Stream Processing", pct: 0, ch: 11 },
  { title: "O Futuro dos Sistemas de Dados", pct: 0, ch: 12 },
];
