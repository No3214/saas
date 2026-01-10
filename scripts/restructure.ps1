# PowerShell script to restructure files
Move-Item "Grain_Agentic_AI_Orchestrator_v1.json" "templates/ai-automation/" -ErrorAction SilentlyContinue
Move-Item "Grain_AI_Visual_Content_Generator_v1.json" "templates/ai-automation/" -ErrorAction SilentlyContinue
Move-Item "Grain_Prompt_Engineering_Studio_v1.json" "templates/ai-automation/" -ErrorAction SilentlyContinue
Move-Item "Grain_Knowledge_Base_AI_Search_v1.json" "templates/ai-automation/" -ErrorAction SilentlyContinue
Move-Item "Grain_Voice_AI_Assistant_v1.json" "templates/ai-automation/" -ErrorAction SilentlyContinue

Move-Item "Grain_SEO_Engine_v1.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue
Move-Item "Grain_Keyword_Gap_Analysis_v1.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue
Move-Item "Grain_GBP_Auto_Posting_v1.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue
Move-Item "Grain_Content_Repurposing_Engine_v1.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue
Move-Item "Grain_Multi_Platform_Publisher_v2.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue
Move-Item "Grain_Email_Marketing_Automation_v1.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue
Move-Item "Grain_Webinar_Event_Automation_v1.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue
Move-Item "Grain_Influencer_Outreach_v1.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue
Move-Item "Grain_Landing_Page_CRO_Hub_v1.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue
Move-Item "Grain_GSC_Hub_v1.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue
Move-Item "Grain_SEO_Keyword_Research_Free_v1.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue
Move-Item "Grain_SERP_Rank_Tracker_Free_v1.json" "templates/seo-marketing/" -ErrorAction SilentlyContinue

Move-Item "Grain_Guest_Communication_Journey_v1.json" "templates/hospitality/" -ErrorAction SilentlyContinue
Move-Item "Grain_Review_Management_v1.json" "templates/hospitality/" -ErrorAction SilentlyContinue
Move-Item "Grain_Restaurant_Reservation_v1.json" "templates/hospitality/" -ErrorAction SilentlyContinue
Move-Item "Grain_Booking_Channel_Sync_v1.json" "templates/hospitality/" -ErrorAction SilentlyContinue

Move-Item "Grain_RevOps_Hub_v1.json" "templates/agency-revops/" -ErrorAction SilentlyContinue
Move-Item "Grain_Lead_Conversion_Funnel_v1.json" "templates/agency-revops/" -ErrorAction SilentlyContinue
Move-Item "Grain_Client_Reporting_Dashboard_v1.json" "templates/agency-revops/" -ErrorAction SilentlyContinue
Move-Item "Grain_Proposal_Contract_Generator_v1.json" "templates/agency-revops/" -ErrorAction SilentlyContinue
Move-Item "Grain_Meeting_Intelligence_Hub_v1.json" "templates/agency-revops/" -ErrorAction SilentlyContinue

Move-Item "Grain_HR_Onboarding_Offboarding_v1.json" "templates/ops-hr/" -ErrorAction SilentlyContinue
Move-Item "Grain_Recruitment_AI_Agent_v1.json" "templates/ops-hr/" -ErrorAction SilentlyContinue
Move-Item "Grain_Ticket_Escalation_Manager_v1.json" "templates/ops-hr/" -ErrorAction SilentlyContinue
Move-Item "Grain_Contract_Review_Compliance_v1.json" "templates/ops-hr/" -ErrorAction SilentlyContinue

Move-Item "Grain_Master_Orchestrator_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_Self_Healing_Pipeline_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_NPS_Feedback_Collection_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_Subscription_Lifecycle_Manager_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_Competitor_Monitoring_Hub_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_Referral_Affiliate_Program_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_Social_Inbox_Manager_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_Intelligent_CDP_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_Unified_Analytics_Dashboard_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_Invoice_Billing_Automation_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_Churn_Prediction_Prevention_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_Customer_Onboarding_Automation_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_Ecommerce_Orchestrator_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_MCP_Client_Connector_v1.json" "templates/general/" -ErrorAction SilentlyContinue
Move-Item "Grain_AB_Testing_Engine_v1.json" "templates/general/" -ErrorAction SilentlyContinue

Move-Item "sales_guide.md" "docs/" -ErrorAction SilentlyContinue
Move-Item "guide_n8n_business.md" "docs/" -ErrorAction SilentlyContinue
Move-Item "import_all.*" "scripts/" -ErrorAction SilentlyContinue
Move-Item "INSTALL.md" "docs/" -ErrorAction SilentlyContinue
Move-Item "bundler.js" "scripts/" -ErrorAction SilentlyContinue

Write-Host "Restructuring Complete"
