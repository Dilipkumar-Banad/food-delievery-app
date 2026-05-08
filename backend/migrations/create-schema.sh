#!/bin/bash
# Script to create database schema via Supabase SQL API

# Use environment variables instead of hardcoded secrets
SUPABASE_URL="${SUPABASE_URL}"
SERVICE_ROLE_KEY="${SUPABASE_SERVICE_ROLE_KEY}"
PROJECT_ID="${SUPABASE_URL##*/}"

# Read the SQL file
SQL_FILE="../../database/schema.sql"

# Execute each SQL statement
echo "🚀 Creating database tables..."

# Create tables one by one
curl -X POST \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  "$SUPABASE_URL/rest/v1/rpc/sql_runner" \
  -d "{\"query\": \"$(cat $SQL_FILE | sed 's/"/\\"/g' | tr '\n' ' ')\"}" \
  2>/dev/null

echo "✅ Schema creation submitted!"
