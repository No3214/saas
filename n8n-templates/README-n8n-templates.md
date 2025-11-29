# n8n Templates

Bu klasör `n8n` şablonlarını (workflow JSON) içerir. Siz kendi n8n template dosyalarınızı burada oluşturup/üstüne yazabilirsiniz.

Dosya ekleme/şablon yerleştirme adımları:

- `n8n-templates/` içine `.json` dosyaları koyun (ör. `my-workflow.json`).
- Değişiklikleri commit ve push edin:

```bash
git add n8n-templates
git commit -m "Add n8n templates"
git push origin main
```

Raw URL listesini oluşturmak için repoda şu scripti çalıştırın (veya ben çalıştırayım):

```bash
bash n8n-templates/generate-raw-urls.sh
```

Script en fazla 20 dosya için raw URL basar; Claude'a bu link listesini vererek dosyaları işlem yaptırabilirsiniz.

Notlar:
- Özel repo ise raw URL erişimi çalışmayabilir; bu durumda repo'yu public yapın ya da zip linki paylaşın.
- Daha fazla dosya gerekiyorsa tek bir zip oluşturup paylaşmak daha hızlıdır.
