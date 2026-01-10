# Performance Optimization Skill

n8n workflow performans optimizasyonu rehberi.

## Benchmark Hedefler

| Metrik | Hedef | Kritik |
|--------|-------|--------|
| Webhook Response | <500ms | >2s |
| Workflow Execution | <5s | >30s |
| API Calls/min | <1000 | >5000 |
| Memory Usage | <512MB | >1GB |
| Queue Wait Time | <1s | >10s |

## Quick Wins

### 1. Gereksiz Node'ları Kaldır
```
❌ HTTP → Code → Set → Code → IF → Merge
✅ HTTP → Code (combined logic) → IF → Merge
```

### 2. Parallel Execution
```json
{
  "type": "n8n-nodes-base.splitInBatches",
  "parameters": {
    "batchSize": 10,
    "options": {
      "reset": false
    }
  }
}
```

### 3. Early Exit
```javascript
// Gereksiz işlemi önle
if (!$json.data || $json.data.length === 0) {
  return []; // Empty result, skip rest
}
```

## Database Optimization

### Indexing
```sql
-- Sık sorgulanan alanlar
CREATE INDEX idx_customer_email ON customers(email);
CREATE INDEX idx_order_date ON orders(created_at);
CREATE INDEX idx_workflow_status ON executions(workflow_id, status);
```

### Query Optimization
```javascript
// ❌ N+1 Query
for (const order of orders) {
  const customer = await db.query('SELECT * FROM customers WHERE id = $1', [order.customer_id]);
}

// ✅ Single Query with JOIN
const results = await db.query(`
  SELECT o.*, c.name, c.email
  FROM orders o
  JOIN customers c ON o.customer_id = c.id
  WHERE o.id = ANY($1)
`, [orderIds]);
```

### Pagination
```javascript
const page = $json.page || 1;
const limit = 50;
const offset = (page - 1) * limit;

const results = await db.query(
  'SELECT * FROM customers ORDER BY id LIMIT $1 OFFSET $2',
  [limit, offset]
);
```

## API Call Optimization

### Batch Requests
```javascript
// ❌ Individual calls
for (const id of ids) {
  await api.get(`/users/${id}`);
}

// ✅ Batch call
await api.post('/users/batch', { ids });
```

### Caching Strategy
```javascript
const CACHE_TTL = {
  user_profile: 3600,      // 1 saat
  product_list: 300,       // 5 dakika
  exchange_rate: 60,       // 1 dakika
  static_config: 86400     // 1 gün
};

async function getCached(key, fetchFn, ttl) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const data = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(data));
  return data;
}
```

### Connection Pooling
```javascript
// Reuse connections
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});
```

## Memory Management

### Streaming Large Files
```javascript
// ❌ Load all into memory
const data = await fs.readFile('large-file.csv');

// ✅ Stream processing
const stream = fs.createReadStream('large-file.csv');
const parser = stream.pipe(csvParser());

for await (const row of parser) {
  await processRow(row);
}
```

### Garbage Collection
```javascript
// Clear large objects
let largeData = await fetchBigData();
await process(largeData);
largeData = null; // Allow GC
```

## Workflow Architecture

### Microservice Pattern
```
Main Orchestrator
├── Customer Service Workflow
├── Order Service Workflow
├── Notification Service Workflow
└── Analytics Service Workflow

Her servis bağımsız scale edilebilir
```

### Event-Driven Pattern
```json
{
  "trigger": "webhook",
  "actions": [
    {
      "emit": "order.created",
      "payload": "{{$json}}"
    }
  ]
}

// Ayrı workflow'lar event'leri dinler
{
  "trigger": "event.order.created",
  "actions": ["send_confirmation", "update_inventory"]
}
```

## Monitoring Queries

### Slow Executions
```sql
SELECT workflow_id, AVG(duration_ms), COUNT(*)
FROM executions
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY workflow_id
HAVING AVG(duration_ms) > 5000
ORDER BY AVG(duration_ms) DESC;
```

### Error Rate
```sql
SELECT
  workflow_id,
  COUNT(*) as total,
  SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) as errors,
  ROUND(100.0 * SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) / COUNT(*), 2) as error_rate
FROM executions
WHERE created_at > NOW() - INTERVAL '1 hour'
GROUP BY workflow_id
ORDER BY error_rate DESC;
```

## Optimization Checklist

- [ ] Gereksiz node'lar kaldırıldı
- [ ] Batch processing aktif
- [ ] Caching uygulandı
- [ ] Database index'leri kontrol edildi
- [ ] N+1 query yok
- [ ] Memory leak yok
- [ ] Monitoring aktif
