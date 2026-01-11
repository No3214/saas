#!/usr/bin/env python3
"""
Grain SaaS - Secret Scanner
Scans files for potential hardcoded secrets and credentials
"""

import os
import re
import sys
import argparse
from pathlib import Path

# Patterns that indicate potential secrets
SECRET_PATTERNS = [
    (r'sk-[a-zA-Z0-9]{20,}', 'OpenAI API Key'),
    (r'sk-ant-[a-zA-Z0-9\-_]{20,}', 'Anthropic API Key'),
    (r'xoxb-[a-zA-Z0-9\-]+', 'Slack Bot Token'),
    (r'ghp_[a-zA-Z0-9]{36}', 'GitHub Personal Access Token'),
    (r'gho_[a-zA-Z0-9]{36}', 'GitHub OAuth Token'),
    (r'-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----', 'Private Key'),
    (r'AKIA[0-9A-Z]{16}', 'AWS Access Key ID'),
    (r'eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*', 'JWT Token'),
]

# Files/directories to skip
SKIP_PATTERNS = [
    '.git',
    'node_modules',
    '__pycache__',
    '.env.example',
    '*.md',  # Documentation files often have example keys
    'scan_secrets.py',  # This file
]

# Known false positives (placeholder patterns)
FALSE_POSITIVES = [
    'sk-...',
    'sk-ant-...',
    'xoxb-...',
    'YOUR_',
    'change-me',
    'your-api-key',
    'your_api_key',
    'example',
    'placeholder',
]


def should_skip(path: str) -> bool:
    """Check if path should be skipped"""
    for pattern in SKIP_PATTERNS:
        if pattern in path:
            return True
    return False


def is_false_positive(match: str) -> bool:
    """Check if match is a known false positive"""
    match_lower = match.lower()
    for fp in FALSE_POSITIVES:
        if fp.lower() in match_lower:
            return True
    return False


def scan_file(filepath: str) -> list:
    """Scan a single file for secrets"""
    findings = []

    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        for pattern, secret_type in SECRET_PATTERNS:
            matches = re.finditer(pattern, content)
            for match in matches:
                matched_text = match.group()
                if not is_false_positive(matched_text):
                    # Get line number
                    line_num = content[:match.start()].count('\n') + 1
                    findings.append({
                        'file': filepath,
                        'line': line_num,
                        'type': secret_type,
                        'match': matched_text[:50] + '...' if len(matched_text) > 50 else matched_text
                    })
    except Exception as e:
        print(f"Warning: Could not scan {filepath}: {e}", file=sys.stderr)

    return findings


def scan_directory(path: str) -> list:
    """Recursively scan directory for secrets"""
    all_findings = []

    for root, dirs, files in os.walk(path):
        # Skip certain directories
        dirs[:] = [d for d in dirs if not should_skip(d)]

        for filename in files:
            filepath = os.path.join(root, filename)

            if should_skip(filepath):
                continue

            # Only scan text files
            if filepath.endswith(('.json', '.js', '.ts', '.py', '.yml', '.yaml', '.sh', '.env')):
                findings = scan_file(filepath)
                all_findings.extend(findings)

    return all_findings


def main():
    parser = argparse.ArgumentParser(description='Scan for hardcoded secrets')
    parser.add_argument('--path', default='.', help='Path to scan')
    parser.add_argument('--strict', action='store_true', help='Exit with error if secrets found')
    args = parser.parse_args()

    print('\n╔═══════════════════════════════════════════════════════════════╗')
    print('║            Grain SaaS - Secret Scanner                        ║')
    print('╚═══════════════════════════════════════════════════════════════╝\n')

    findings = scan_directory(args.path)

    if findings:
        print(f'⚠️  Found {len(findings)} potential secret(s):\n')
        for f in findings:
            print(f"  📁 {f['file']}:{f['line']}")
            print(f"     Type: {f['type']}")
            print(f"     Match: {f['match']}\n")

        if args.strict:
            print('❌ Secret scan failed (strict mode)\n')
            sys.exit(1)
        else:
            print('⚠️  Review the findings above\n')
    else:
        print('✅ No secrets found\n')

    sys.exit(0)


if __name__ == '__main__':
    main()
