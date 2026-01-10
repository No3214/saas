#!/bin/bash

# Grain SaaS Automation Suite - Setup Script
# This script sets up n8n with all required community nodes

set -e

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║       Grain SaaS Automation Suite - Setup Script              ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check for npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm found${NC}"

# Step 1: Install n8n globally
echo ""
echo -e "${YELLOW}Step 1: Installing n8n...${NC}"
npm install -g n8n || {
    echo -e "${YELLOW}Using npx instead...${NC}"
}

# Step 2: Install community nodes
echo ""
echo -e "${YELLOW}Step 2: Installing community nodes...${NC}"

COMMUNITY_NODES=(
    "n8n-nodes-evolution-api"
    "n8n-nodes-elevenlabs"
    "n8n-nodes-perplexity"
    "n8n-nodes-pdforge"
    "n8n-nodes-scrapeninja"
    "n8n-nodes-tesseractjs"
)

# Get n8n custom extensions directory
N8N_DIR="${HOME}/.n8n"
CUSTOM_DIR="${N8N_DIR}/nodes"

mkdir -p "$CUSTOM_DIR"
cd "$CUSTOM_DIR"

for node in "${COMMUNITY_NODES[@]}"; do
    echo -e "  Installing ${node}..."
    npm install "$node" 2>/dev/null || echo -e "  ${YELLOW}⚠ Could not install ${node}${NC}"
done

echo -e "${GREEN}✓ Community nodes installed${NC}"

# Step 3: Setup environment
echo ""
echo -e "${YELLOW}Step 3: Setting up environment...${NC}"

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env from .env.example${NC}"
        echo -e "${YELLOW}  Please edit .env and add your API keys${NC}"
    fi
fi

# Step 4: Start n8n
echo ""
echo -e "${YELLOW}Step 4: Starting n8n...${NC}"
echo ""
echo -e "Run one of these commands to start n8n:"
echo ""
echo -e "  ${GREEN}Option A (npx):${NC}"
echo "    npx n8n"
echo ""
echo -e "  ${GREEN}Option B (Docker):${NC}"
echo "    docker-compose up -d"
echo ""
echo -e "  ${GREEN}Option C (Global):${NC}"
echo "    n8n start"
echo ""

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                    Setup Complete!                            ║"
echo "╠═══════════════════════════════════════════════════════════════╣"
echo "║  n8n URL: http://localhost:5678                               ║"
echo "║  Default User: admin                                          ║"
echo "║  Default Pass: grain2024                                      ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
