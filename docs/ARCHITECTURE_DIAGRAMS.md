# Grain SaaS Architecture Diagrams

**Version:** 5.7.0 | **Last Updated:** 2026-01-11

Bu dokuman Grain SaaS Automation Suite'in tam mimari diyagramlarini icerir.

---

## 1. Genel Sistem Mimarisi

```mermaid
flowchart TB
    subgraph Core["CORE SYSTEM"]
        MO[Master Orchestrator]
        MCP[MCP Client Connector]
        SHP[Self-Healing Pipeline]
        WBU[Workflow Backup]
        MON[MCP Workflow Monitor]
    end

    subgraph AI["AI ENGINE"]
        AAO[Agentic AI Orchestrator v2 Pro]
        RAG[RAG Company Chatbot]
        KB[Knowledge Base AI Search]
        CW[AI Copywriting Studio]
        VCG[AI Visual Content Generator]
    end

    subgraph Data["DATA INTELLIGENCE"]
        CDP[Intelligent CDP]
        WSA[Web Scraper Agent]
        UAD[Unified Analytics Dashboard]
        OCR[Document OCR Processing]
    end

    MO --> AAO
    MO --> CDP
    MO --> MCP
    MCP --> MON
    SHP --> MO
    AAO --> RAG
    AAO --> KB
    AAO --> CW
    AAO --> VCG
    CDP --> UAD
    WSA --> CDP
    OCR --> CDP
```

---

## 2. Modul Baglantilari (19 Modul)

```mermaid
graph LR
    subgraph Platform["GRAIN PLATFORM"]
        CORE((Core))
        AI((AI Engine))
        DATA((Data Intel))
    end

    subgraph Business["BUSINESS OPERATIONS"]
        CS((Customer Success))
        SR((Sales Revenue))
        MKT((Marketing))
        FIN((Finance))
        HR((HR Ops))
    end

    subgraph Verticals["VERTICAL SOLUTIONS"]
        ECOM((E-commerce))
        HOSP((Hospitality))
        RE((Real Estate))
        LST((Local SEO TR))
    end

    subgraph Growth["GROWTH & AUTOMATION"]
        SEO((SEO))
        VIBE((Vibe Marketing))
        VOICE((Voice AI))
        AGENCY((Agency Tools))
        COMM((Communication))
        NOTION((Notion))
        LEGACY((Legacy Products))
    end

    CORE --> AI
    CORE --> DATA
    AI --> CS
    AI --> MKT
    AI --> VIBE
    DATA --> SR
    DATA --> ECOM
    CS --> AGENCY
    MKT --> SEO
    MKT --> VIBE
    ECOM --> LEGACY
    HOSP --> LEGACY
    LST --> LEGACY
    VOICE --> AGENCY
    NOTION --> MKT
```

---

## 3. E-commerce Modulu Detay

```mermaid
flowchart TD
    subgraph Triggers["TRIGGERS"]
        T1[Schedule Trigger]
        T2[Webhook Order]
        T3[Manual Sync]
    end

    subgraph Platforms["MARKETPLACES"]
        TY[Trendyol API]
        HB[Hepsiburada API]
    end

    subgraph Processing["PROCESSING"]
        EO[Ecommerce Orchestrator]
        TOS[Trendyol Order Sync]
        TSM[Trendyol Stock Manager]
        HOS[Hepsiburada Order Sync]
    end

    subgraph Storage["DATA STORAGE"]
        PG[(PostgreSQL)]
        REDIS[(Redis Cache)]
    end

    subgraph Notifications["NOTIFICATIONS"]
        WA[WhatsApp Business]
        SLACK[Slack Alerts]
    end

    T1 --> EO
    T2 --> TOS
    T2 --> HOS
    T3 --> TSM

    TY --> TOS
    TY --> TSM
    HB --> HOS

    EO --> TOS
    EO --> HOS
    EO --> TSM

    TOS --> PG
    TSM --> PG
    HOS --> PG

    TOS --> WA
    HOS --> WA
    TSM --> SLACK

    PG --> REDIS
```

---

## 4. Vibe Marketing Modulu

```mermaid
flowchart TD
    subgraph Input["INPUT SOURCES"]
        WEB[Website URL]
        IG[Instagram Profile]
        TT[TikTok Trends]
        GT[Google Trends]
    end

    subgraph Workflows["VIBE MARKETING WORKFLOWS"]
        EP[Entity Profiler]
        CR[Competitor Research]
        TM[Trend Monitor]
        RC[Reels Creator]
        CC[Content Calendar]
    end

    subgraph AI["AI PROCESSING"]
        GPT[GPT-4o Analysis]
        PERSONA[Persona Generation]
        SWOT[SWOT Analysis]
        HOOK[Hook-Content-CTA]
    end

    subgraph Output["OUTPUT"]
        PG[(PostgreSQL)]
        NOTION[Notion DB]
        SLACK[Slack Alerts]
        CAL[Content Plan]
    end

    WEB --> EP
    WEB --> CR
    IG --> CR
    TT --> TM
    GT --> TM

    EP --> GPT
    CR --> GPT
    TM --> GPT
    RC --> GPT
    CC --> GPT

    GPT --> PERSONA
    GPT --> SWOT
    GPT --> HOOK

    EP --> PG
    CR --> NOTION
    TM --> SLACK
    RC --> NOTION
    CC --> CAL
    CC --> NOTION
```

---

## 5. Marketing Agent Iliski Diyagrami

```mermaid
flowchart TB
    subgraph CMO["CMO AGENT (Director)"]
        CMO_CORE[CMO Agent<br/>Strategy & Coordination]
    end

    subgraph Agents["SPECIALIZED AGENTS"]
        TK[TikTok Strategist<br/>Viral Content]
        GH[Growth Hacker<br/>AARRR Funnel]
        CC[Content Creator<br/>Multi-Format]
        IC[Instagram Curator<br/>3-3-3 Rule]
        RB[Reddit Builder<br/>90-9-1 Rule]
    end

    subgraph Methodologies["METHODOLOGIES"]
        VM[Vibe Marketing<br/>Video-First Strategy]
    end

    subgraph Outputs["DELIVERABLES"]
        O1[Trend Analysis]
        O2[A/B Tests]
        O3[Content Calendar]
        O4[Visual Strategy]
        O5[Community Growth]
    end

    CMO_CORE --> TK
    CMO_CORE --> GH
    CMO_CORE --> CC
    CMO_CORE --> IC
    CMO_CORE --> RB

    VM --> CMO_CORE

    TK --> O1
    GH --> O2
    CC --> O3
    IC --> O4
    RB --> O5
```

---

## 6. Legacy Products Starter Pack

```mermaid
flowchart LR
    subgraph Starters["STARTER PACKS"]
        LES[E-commerce Starter]
        LHS[Hospitality Starter]
        LLS[Local Business Starter]
    end

    subgraph EcomFeatures["E-COMMERCE"]
        E1[Order Webhook]
        E2[WhatsApp Notify]
        E3[Sales Reports]
    end

    subgraph HospFeatures["HOSPITALITY"]
        H1[Booking Mgmt]
        H2[Guest Confirm]
        H3[Morning Brief]
    end

    subgraph LocalFeatures["LOCAL BUSINESS"]
        L1[Lead Capture]
        L2[Review Monitor]
        L3[Performance Summary]
    end

    LES --> E1
    LES --> E2
    LES --> E3

    LHS --> H1
    LHS --> H2
    LHS --> H3

    LLS --> L1
    LLS --> L2
    LLS --> L3
```

---

## 7. Customer Success Pipeline

```mermaid
flowchart TD
    subgraph Acquisition["ACQUISITION"]
        LC[Lead Capture]
        LCF[Lead Conversion Funnel]
    end

    subgraph Onboarding["ONBOARDING"]
        COA[Customer Onboarding]
        NPS[NPS Feedback]
    end

    subgraph Retention["RETENTION"]
        CSA[Customer Support]
        TEM[Ticket Escalation]
        CPP[Churn Prevention]
    end

    subgraph Growth["GROWTH"]
        SLM[Subscription Manager]
        REV[RevOps Hub]
    end

    LC --> LCF
    LCF --> COA
    COA --> NPS
    NPS --> CSA
    CSA --> TEM
    TEM --> CPP
    NPS --> CPP
    CPP --> SLM
    SLM --> REV
```

---

## 8. SEO & Local SEO Turkiye

```mermaid
flowchart TD
    subgraph SEOCore["SEO ENGINE"]
        SE[SEO Engine v1]
        SSA[Site Audit]
        GSC[GSC Hub]
        CI[Competitive Intel]
    end

    subgraph LocalTR["LOCAL SEO TURKIYE"]
        TLB[Turkish Local Business Mgr]
        TGO[Turkish GBP Optimizer]
        LBL[Listing Manager]
        RMA[Review Management AI]
    end

    subgraph Outputs["OUTPUTS"]
        RPT[SEO Reports]
        GBP[Google Business Posts]
        REV[Review Responses]
    end

    SE --> SSA
    SE --> GSC
    SE --> CI

    TLB --> TGO
    TLB --> LBL
    TLB --> RMA

    SSA --> RPT
    GSC --> RPT
    TGO --> GBP
    RMA --> REV
```

---

## 9. Voice AI & Agency Tools

```mermaid
flowchart TD
    subgraph VoiceAI["VOICE AI"]
        EL[ElevenLabs Voice Agent]
        WA[WhatsApp Integration]
    end

    subgraph AgencyTools["AGENCY TOOLS"]
        WLD[WhiteLabel Dashboard]
        AAB[AI Appointment Booking]
        RMS[Reputation Management]
    end

    subgraph Clients["CLIENT SERVICES"]
        C1[Multi-Client Reports]
        C2[Smart Scheduling]
        C3[Review Monitoring]
    end

    EL --> WA
    WA --> AAB

    WLD --> C1
    AAB --> C2
    RMS --> C3

    WLD --> RMS
```

---

## 10. Tam Sistem Akis Diyagrami

```mermaid
flowchart TB
    subgraph External["EXTERNAL TRIGGERS"]
        WH[Webhooks]
        SCH[Schedulers]
        MAN[Manual Triggers]
        API[API Calls]
    end

    subgraph Core["CORE LAYER"]
        MO[Master Orchestrator]
        MCP[MCP Connector]
        SHP[Self-Healing]
    end

    subgraph AI["AI LAYER"]
        AAO[Agentic AI v2 Pro]
        GPT[GPT-4o]
        RAG[RAG Engine]
    end

    subgraph Business["BUSINESS LAYER"]
        ECOM[E-commerce]
        MKT[Marketing]
        CS[Customer Success]
        SALES[Sales/Revenue]
    end

    subgraph Verticals["VERTICAL LAYER"]
        HOSP[Hospitality]
        RE[Real Estate]
        LOCAL[Local Business TR]
    end

    subgraph Growth["GROWTH LAYER"]
        VIBE[Vibe Marketing]
        SEO[SEO Engine]
        VOICE[Voice AI]
        AGENCY[Agency Tools]
    end

    subgraph Storage["DATA LAYER"]
        PG[(PostgreSQL)]
        REDIS[(Redis)]
        NOTION[(Notion)]
    end

    subgraph Output["OUTPUT LAYER"]
        WA[WhatsApp]
        SLACK[Slack]
        EMAIL[Email]
        DASH[Dashboards]
    end

    WH --> MO
    SCH --> MO
    MAN --> MO
    API --> MO

    MO --> MCP
    MO --> AAO
    SHP --> MO

    AAO --> GPT
    AAO --> RAG

    MCP --> ECOM
    MCP --> MKT
    MCP --> CS
    MCP --> SALES

    MKT --> VIBE
    MKT --> SEO
    CS --> VOICE
    CS --> AGENCY

    ECOM --> PG
    MKT --> PG
    VIBE --> PG
    VIBE --> NOTION

    PG --> DASH
    ECOM --> WA
    CS --> WA
    VOICE --> WA
    MKT --> SLACK
    SALES --> EMAIL
```

---

## 11. Tier Dagilimi

```mermaid
pie title Workflow Tier Dagilimi (71 Workflow)
    "Critical (33)" : 33
    "High (30)" : 30
    "Medium (8)" : 8
```

---

## 12. Modul Baslarina Workflow Sayisi

```mermaid
bar title Modul Basina Workflow Sayisi
    "Core" : 5
    "AI Engine" : 8
    "Data Intel" : 5
    "Customer Success" : 6
    "Sales Revenue" : 4
    "Marketing" : 6
    "SEO" : 4
    "Local SEO TR" : 4
    "Hospitality" : 3
    "Real Estate" : 1
    "E-commerce" : 4
    "Voice AI" : 1
    "Agency Tools" : 3
    "HR Ops" : 1
    "Finance" : 2
    "Communication" : 3
    "Notion" : 3
    "Vibe Marketing" : 5
    "Legacy Products" : 3
```

---

## 13. Teknoloji Stack

```mermaid
flowchart LR
    subgraph Infra["INFRASTRUCTURE"]
        DOCKER[Docker]
        TRAEFIK[Traefik SSL]
        NGINX[Nginx]
    end

    subgraph Engine["AUTOMATION ENGINE"]
        N8N[n8n Workflow]
        REDIS[Redis Queue]
        PG[PostgreSQL]
    end

    subgraph AI["AI PROVIDERS"]
        OPENAI[OpenAI GPT-4o]
        ELEVEN[ElevenLabs Voice]
        CLAUDE[Claude/Anthropic]
    end

    subgraph Integrations["INTEGRATIONS"]
        TRENDYOL[Trendyol API]
        HEPSI[Hepsiburada API]
        WHATSAPP[WhatsApp Business]
        SLACK[Slack API]
        NOTION[Notion API]
        GOOGLE[Google APIs]
    end

    subgraph Monitoring["MONITORING"]
        GRAFANA[Grafana]
        PROMETHEUS[Prometheus]
    end

    DOCKER --> N8N
    TRAEFIK --> DOCKER
    N8N --> REDIS
    N8N --> PG

    N8N --> OPENAI
    N8N --> ELEVEN
    N8N --> CLAUDE

    N8N --> TRENDYOL
    N8N --> HEPSI
    N8N --> WHATSAPP
    N8N --> SLACK
    N8N --> NOTION
    N8N --> GOOGLE

    PROMETHEUS --> GRAFANA
    N8N --> PROMETHEUS
```

---

## Sonuc

Bu mimari diyagramlar Grain SaaS Automation Suite v5.7.0'in tam gorunumunu saglar:

- **19 Modul** - Kapsamli is otomasyonu
- **71 Workflow** - Production-ready sablonlar
- **5 Marketing Agent** - AI destekli pazarlama
- **3 Legacy Starter** - Dikey pazar cozumleri
- **Entegre Mimari** - Tum modullerin birbiriyle calismasi

---

*Diagram'lar Mermaid syntax kullanir. GitHub, Notion veya Mermaid-destekli editorde goruntulenebilir.*
