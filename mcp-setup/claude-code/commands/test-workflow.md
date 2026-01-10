# Test Workflow Command

Bir workflow'u test et ve sonuçları raporla.

## Kullanım
```
/test-workflow [workflow-name]
```

## Test Adımları

### 1. Workflow Validation
```bash
# JSON syntax kontrolü
jq '.' n8n-templates/Grain_[name]_v1.json

# Required fields kontrolü
jq '.name, .nodes, .connections' n8n-templates/Grain_[name]_v1.json
```

### 2. Node Kontrolü
- [ ] Tüm node'lar benzersiz ID'ye sahip
- [ ] Credentials referansları doğru
- [ ] Position değerleri mantıklı
- [ ] Connection'lar geçerli node'lara işaret ediyor

### 3. Mock Data Test
```javascript
const mockData = {
  customer: {
    name: "Test Müşteri",
    email: "test@example.com",
    phone: "+905551234567"
  }
};

// Test execution
const result = await workflow.execute(mockData);
console.log('Result:', result);
```

### 4. Edge Case Tests
- Boş input
- Çok büyük input
- Geçersiz format
- Unicode karakterler
- SQL injection attempt
- XSS attempt

### 5. Performance Test
```javascript
const startTime = Date.now();
const iterations = 10;

for (let i = 0; i < iterations; i++) {
  await workflow.execute(mockData);
}

const avgTime = (Date.now() - startTime) / iterations;
console.log(`Average execution time: ${avgTime}ms`);
```

## Test Raporu

```markdown
# Test Report: [Workflow Name]

## Summary
- Status: ✅ PASSED / ❌ FAILED
- Date: [Date]
- Version: [Version]

## Results
| Test | Status | Duration |
|------|--------|----------|
| JSON Validation | ✅ | 5ms |
| Node Check | ✅ | 12ms |
| Mock Data | ✅ | 234ms |
| Edge Cases | ⚠️ | 456ms |
| Performance | ✅ | 189ms avg |

## Issues Found
1. [Issue description]

## Recommendations
1. [Recommendation]
```
