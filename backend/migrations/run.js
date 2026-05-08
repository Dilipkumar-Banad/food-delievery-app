import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  try {
    console.log('📊 Starting database migrations...');
    
    // Parse Supabase URL to get connection details
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }

    // Extract database credentials from Supabase URL
    // Format: https://xxxxx.supabase.co
    const projectId = supabaseUrl.split('//')[1].split('.')[0];
    
    // For local development, create a connection to Supabase
    const dbUrl = `postgresql://postgres.${projectId}:${supabaseKey}@db.${projectId}.supabase.co:5432/postgres`;
    
    const sql = postgres(dbUrl);

    // Read schema SQL
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

    // Split by CREATE TABLE statements
    const tableStatements = schemaSql.match(/CREATE TABLE[^;]+;/gi) || [];
    const indexStatements = schemaSql.match(/CREATE INDEX[^;]+;/gi) || [];

    console.log(`Found ${tableStatements.length} tables and ${indexStatements.length} indexes\n`);

    // Create tables
    for (let i = 0; i < tableStatements.length; i++) {
      const statement = tableStatements[i];
      try {
        const tableName = statement.match(/CREATE TABLE\s+(?:IF NOT EXISTS\s+)?(\w+)/i)?.[1] || `table ${i}`;
        process.stdout.write(`[${i+1}/${tableStatements.length}] Creating ${tableName}... `);
        
        await sql.unsafe(statement);
        console.log('✅');
      } catch (error) {
        if (error.message?.includes('already exists')) {
          console.log('⏭️  (already exists)');
        } else {
          console.log(`⚠️  (${error.message})`);
        }
      }
    }

    // Create indexes
    console.log('\nCreating indexes...');
    for (let i = 0; i < indexStatements.length; i++) {
      const statement = indexStatements[i];
      try {
        const indexName = statement.match(/CREATE INDEX\s+(\w+)/i)?.[1] || `index ${i}`;
        process.stdout.write(`[${i+1}/${indexStatements.length}] Creating ${indexName}... `);
        
        await sql.unsafe(statement);
        console.log('✅');
      } catch (error) {
        if (error.message?.includes('already exists')) {
          console.log('⏭️  (already exists)');
        } else {
          console.log(`⚠️  (${error.message})`);
        }
      }
    }

    console.log('\n✅ Migration completed! Tables are ready.');
    await sql.end();
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigrations();
