#!/usr/bin/env node

import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse database URL from Supabase
function parseSupabaseUrl() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  }

  // Extract project ID from URL (e.g., https://xxxxx.supabase.co)
  const projectId = supabaseUrl.split('//')[1]?.split('.')[0];
  if (!projectId) {
    throw new Error('Invalid SUPABASE_URL format');
  }

  // Construct the database URL
  const dbUrl = `postgresql://postgres.${projectId}:${supabaseKey}@db.${projectId}.supabase.co:5432/postgres`;
  return dbUrl;
}

async function setupDatabase() {
  let sql;
  try {
    console.log('🚀 Food Delivery App - Database Setup\n');
    console.log('Connecting to Supabase database...');
    
    const dbUrl = parseSupabaseUrl();
    sql = postgres(dbUrl, { max: 1, timeout: 30 });

    // Test connection
    await sql`SELECT 1`;
    console.log('✅ Connected successfully!\n');

    // Read schema SQL
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found at ${schemaPath}`);
    }
    
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

    // Parse CREATE TABLE statements
    const tableMatches = schemaSql.matchAll(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]*?)\);/gi);
    const tableStatements = [];
    
    for (const match of tableMatches) {
      tableStatements.push(match[0]);
    }

    console.log(`📋 Found ${tableStatements.length} tables to create\n`);

    // Create tables
    let successCount = 0;
    for (let i = 0; i < tableStatements.length; i++) {
      const statement = tableStatements[i];
      const tableName = statement.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)/i)?.[1] || `table ${i}`;
      
      try {
        process.stdout.write(`[${i+1}/${tableStatements.length}] Creating ${tableName}... `);
        
        await sql.unsafe(statement);
        console.log('✅');
        successCount++;
      } catch (error) {
        if (error.message?.includes('already exists')) {
          console.log('⏭️  (already exists)');
          successCount++;
        } else {
          console.log(`❌ ${error.message}`);
        }
      }
    }

    // Create indexes
    const indexMatches = schemaSql.matchAll(/CREATE\s+INDEX\s+(\w+)\s+ON\s+(\w+)[^;]*;/gi);
    const indexStatements = [];
    
    for (const match of indexMatches) {
      indexStatements.push(match[0]);
    }

    if (indexStatements.length > 0) {
      console.log(`\n📊 Creating ${indexStatements.length} indexes...\n`);
      
      for (let i = 0; i < indexStatements.length; i++) {
        const statement = indexStatements[i];
        const indexName = statement.match(/CREATE\s+INDEX\s+(\w+)/i)?.[1] || `index ${i}`;
        
        try {
          process.stdout.write(`[${i+1}/${indexStatements.length}] Creating ${indexName}... `);
          
          await sql.unsafe(statement);
          console.log('✅');
        } catch (error) {
          if (error.message?.includes('already exists')) {
            console.log('⏭️  (already exists)');
          } else {
            console.log(`⚠️  ${error.message}`);
          }
        }
      }
    }

    console.log(`\n✅ Database setup completed! (${successCount}/${tableStatements.length} tables created/verified)`);
    console.log('\n📝 Next steps:');
    console.log('1. (Optional) Run: npm run seed');
    console.log('2. Restart backend: npm run dev');
    console.log('3. Visit: http://localhost:3000\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('1. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env');
    console.error('2. Check your Supabase project is active');
    console.error('3. Alternatively, manually create tables in Supabase SQL Editor');
    console.error('   See DATABASE_SETUP.md for manual instructions\n');
    process.exit(1);
  } finally {
    if (sql) {
      await sql.end();
    }
  }
}

setupDatabase();
