# Workflow Oluştur

$ARGUMENTS için yeni n8n workflow oluştur:

1. İstek: $ARGUMENTS
2. Grain naming convention kullan: `Grain_[PascalCase]_v1.json`
3. Zorunlu yapıyı ekle:
   - name, nodes, connections, settings
   - meta: grain_module, grain_tier, grain_version, grain_language: "tr"
4. Error handler node ekle
5. templates/ klasörüne kaydet
6. index.json'u güncelle

Workflow Türkçe node isimleri ve açıklamalar içersin.
