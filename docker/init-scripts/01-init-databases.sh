#!/bin/bash
# Grain SaaS - PostgreSQL Init Script
# Creates multiple databases and required tables

set -e

# Create additional databases
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create grain_db if not exists
    SELECT 'CREATE DATABASE grain_db'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'grain_db')\gexec

    -- Grant privileges
    GRANT ALL PRIVILEGES ON DATABASE grain_db TO $POSTGRES_USER;
EOSQL

# Connect to grain_db and create tables
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "grain_db" <<-EOSQL
    -- Orders table for e-commerce
    CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_id VARCHAR(100) UNIQUE NOT NULL,
        marketplace VARCHAR(50) NOT NULL DEFAULT 'unknown',
        customer_name VARCHAR(255),
        customer_phone VARCHAR(50),
        customer_city VARCHAR(100),
        customer_address TEXT,
        total_price DECIMAL(10,2),
        status VARCHAR(50) DEFAULT 'new',
        cargo_company VARCHAR(100),
        cargo_tracking VARCHAR(100),
        order_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Products table for inventory
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(100) UNIQUE,
        barcode VARCHAR(100),
        product_name VARCHAR(500),
        marketplace VARCHAR(50),
        stock INTEGER DEFAULT 0,
        price DECIMAL(10,2),
        list_price DECIMAL(10,2),
        category VARCHAR(255),
        brand VARCHAR(100),
        source VARCHAR(50),
        last_sync TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Customers table
    CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        external_id VARCHAR(100),
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        city VARCHAR(100),
        source VARCHAR(50),
        tags TEXT[],
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Workflow executions log
    CREATE TABLE IF NOT EXISTS workflow_logs (
        id SERIAL PRIMARY KEY,
        workflow_name VARCHAR(255),
        execution_id VARCHAR(100),
        status VARCHAR(50),
        error_message TEXT,
        duration_ms INTEGER,
        input_data JSONB,
        output_data JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create indexes
    CREATE INDEX IF NOT EXISTS idx_orders_marketplace ON orders(marketplace);
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
    CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
    CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode);
    CREATE INDEX IF NOT EXISTS idx_products_marketplace ON products(marketplace);
    CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
    CREATE INDEX IF NOT EXISTS idx_workflow_logs_name ON workflow_logs(workflow_name);

    -- ============================================
    -- PLAYWRIGHT / VIBE MARKETING TABLES
    -- ============================================

    -- Competitor analysis table
    CREATE TABLE IF NOT EXISTS competitor_analysis (
        id SERIAL PRIMARY KEY,
        competitor_url VARCHAR(500) NOT NULL,
        competitor_name VARCHAR(255),
        analysis_date DATE NOT NULL DEFAULT CURRENT_DATE,
        value_proposition TEXT,
        target_audience TEXT,
        pricing_strategy TEXT,
        key_features JSONB,
        weaknesses TEXT,
        opportunities TEXT,
        screenshot_path VARCHAR(500),
        raw_content TEXT,
        ai_analysis JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(competitor_url, analysis_date)
    );

    -- Social profiles to monitor
    CREATE TABLE IF NOT EXISTS social_profiles (
        id SERIAL PRIMARY KEY,
        profile_url VARCHAR(500) UNIQUE NOT NULL,
        profile_name VARCHAR(255),
        platform VARCHAR(50) NOT NULL,
        is_competitor BOOLEAN DEFAULT false,
        is_active BOOLEAN DEFAULT true,
        tags TEXT[],
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Social metrics history
    CREATE TABLE IF NOT EXISTS social_metrics (
        id SERIAL PRIMARY KEY,
        profile_id INTEGER REFERENCES social_profiles(id) ON DELETE CASCADE,
        check_date DATE NOT NULL DEFAULT CURRENT_DATE,
        followers INTEGER,
        following INTEGER,
        posts INTEGER,
        engagement_rate DECIMAL(5,2),
        content_type VARCHAR(100),
        post_frequency VARCHAR(100),
        bio TEXT,
        last_posts JSONB,
        raw_snapshot JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(profile_id, check_date)
    );

    -- Entity profiles (Vibe Marketing)
    CREATE TABLE IF NOT EXISTS entity_profiles (
        id SERIAL PRIMARY KEY,
        entity_name VARCHAR(255) NOT NULL,
        website_url VARCHAR(500),
        persona JSONB,
        brand_archetype VARCHAR(100),
        target_audience JSONB,
        communication_style JSONB,
        content_pillars JSONB,
        core_messaging TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Content calendar
    CREATE TABLE IF NOT EXISTS content_calendar (
        id SERIAL PRIMARY KEY,
        entity_id INTEGER REFERENCES entity_profiles(id) ON DELETE CASCADE,
        post_date DATE NOT NULL,
        platform VARCHAR(50) NOT NULL,
        content_type VARCHAR(50),
        content_pillar VARCHAR(100),
        hook TEXT,
        content TEXT,
        cta TEXT,
        hashtags TEXT[],
        status VARCHAR(50) DEFAULT 'planned',
        published_url VARCHAR(500),
        performance_data JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Playwright indexes
    CREATE INDEX IF NOT EXISTS idx_competitor_analysis_url ON competitor_analysis(competitor_url);
    CREATE INDEX IF NOT EXISTS idx_competitor_analysis_date ON competitor_analysis(analysis_date);
    CREATE INDEX IF NOT EXISTS idx_social_profiles_platform ON social_profiles(platform);
    CREATE INDEX IF NOT EXISTS idx_social_metrics_profile ON social_metrics(profile_id);
    CREATE INDEX IF NOT EXISTS idx_social_metrics_date ON social_metrics(check_date);
    CREATE INDEX IF NOT EXISTS idx_entity_profiles_name ON entity_profiles(entity_name);
    CREATE INDEX IF NOT EXISTS idx_content_calendar_entity ON content_calendar(entity_id);
    CREATE INDEX IF NOT EXISTS idx_content_calendar_date ON content_calendar(post_date);

    -- Triggers for new tables
    DROP TRIGGER IF EXISTS update_social_profiles_updated_at ON social_profiles;
    CREATE TRIGGER update_social_profiles_updated_at
        BEFORE UPDATE ON social_profiles
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_entity_profiles_updated_at ON entity_profiles;
    CREATE TRIGGER update_entity_profiles_updated_at
        BEFORE UPDATE ON entity_profiles
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_content_calendar_updated_at ON content_calendar;
    CREATE TRIGGER update_content_calendar_updated_at
        BEFORE UPDATE ON content_calendar
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    -- Update trigger function
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS \$\$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    \$\$ language 'plpgsql';

    -- Apply update trigger to tables
    DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
    CREATE TRIGGER update_orders_updated_at
        BEFORE UPDATE ON orders
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_products_updated_at ON products;
    CREATE TRIGGER update_products_updated_at
        BEFORE UPDATE ON products
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

    DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
    CREATE TRIGGER update_customers_updated_at
        BEFORE UPDATE ON customers
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

EOSQL

echo "Grain SaaS database initialization complete!"
