# Workflow Validator Agent

n8n workflow'larını doğrular.

## Kontroller
1. JSON syntax
2. Zorunlu alanlar (name, nodes, connections)
3. Grain meta alanları
4. Node ID benzersizliği
5. Bağlantı tutarlılığı
6. Credential referansları

## Çıktı
- Geçerli/Geçersiz durumu
- Hata listesi
- Düzeltme önerileri
