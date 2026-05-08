import { supabaseAdmin } from '../src/config/database.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Check if tables exist
    console.log('Checking database tables...');
    try {
      await supabaseAdmin.from('users').select('count', { count: 'exact' }).limit(1);
      console.log('✅ Database tables verified\n');
    } catch (error) {
      console.error('❌ Database tables not found!');
      console.error('Please run: npm run setup-db\n');
      process.exit(1);
    }

    // Hash demo passwords
    const hashedPassword = await bcryptjs.hash('admin123', 10);

    // Seed Users (Demo accounts)
    console.log('📝 Adding demo users...');
    const { data: usersData, error: usersError } = await supabaseAdmin
      .from('users')
      .insert([
        {
          email: 'customer1@example.com',
          password: hashedPassword,
          name: 'Amit Kumar',
          phone: '9876543210',
          role: 'customer',
          address: '123 Main Street, Bangalore',
          is_active: true
        },
        {
          email: 'admin@fooddelivery.com',
          password: hashedPassword,
          name: 'Admin User',
          phone: '9876543211',
          role: 'admin',
          address: 'Admin Office',
          is_active: true
        },
        {
          email: 'agent1@fooddelivery.com',
          password: hashedPassword,
          name: 'Delivery Agent',
          phone: '9876543212',
          role: 'agent',
          address: 'Agent Station',
          is_active: true
        }
      ])
      .select();

    if (usersError) {
      if (usersError.message.includes('duplicate')) {
        console.log('⏭️  Users already exist, skipping...');
      } else {
        console.warn('⚠️  Error seeding users:', usersError.message);
      }
    } else {
      console.log('✅ Users created successfully');
    }

    // Seed Products
    console.log('\n📝 Adding sample products...');
    const productsToSeed = [
      {
        name: 'Wheat Roti',
        description: 'Fresh whole wheat roti made daily',
        category: 'Roti',
        flour_type: 'Wheat',
        price: 5.00,
        quantity: 100,
        image_url: '/images/wheat-roti.jpg',
        is_active: true
      },
      {
        name: 'Maida Chapati',
        description: 'Soft maida chapati, perfect for curries',
        category: 'Chapati',
        flour_type: 'Maida',
        price: 3.00,
        quantity: 150,
        image_url: '/images/maida-chapati.jpg',
        is_active: true
      },
      {
        name: 'Jowar Roti',
        description: 'Healthy jowar roti with traditional recipe',
        category: 'Roti',
        flour_type: 'Jowar',
        price: 6.00,
        quantity: 80,
        image_url: '/images/jowar-roti.jpg',
        is_active: true
      },
      {
        name: 'Rice Holige',
        description: 'Traditional rice holige with jaggery and ghee',
        category: 'Holige',
        flour_type: 'Rice',
        price: 8.00,
        quantity: 50,
        image_url: '/images/rice-holige.jpg',
        is_active: true
      },
      {
        name: 'Wheat Chapati',
        description: 'Nutritious wheat chapati',
        category: 'Chapati',
        flour_type: 'Wheat',
        price: 4.00,
        quantity: 120,
        image_url: '/images/wheat-chapati.jpg',
        is_active: true
      }
    ];

    const { error: productsError } = await supabaseAdmin
      .from('products')
      .insert(productsToSeed)
      .select();

    if (productsError) {
      if (productsError.message.includes('duplicate') || productsError.message.includes('violates')) {
        console.log('⏭️  Products already exist, skipping...');
      } else {
        console.warn('⚠️  Error seeding products:', productsError.message);
      }
    } else {
      console.log('✅ Products created successfully');
    }

    // Seed Delivery Slots
    console.log('\n📝 Adding delivery slots...');
    const { error: slotsError } = await supabaseAdmin
      .from('delivery_slots')
      .insert([
        { start_time: '10:00', end_time: '11:00', max_orders: 20, is_available: true },
        { start_time: '12:00', end_time: '13:00', max_orders: 20, is_available: true },
        { start_time: '15:00', end_time: '16:00', max_orders: 20, is_available: true },
        { start_time: '18:00', end_time: '19:00', max_orders: 20, is_available: true }
      ])
      .select();

    if (slotsError) {
      if (slotsError.message.includes('duplicate')) {
        console.log('⏭️  Delivery slots already exist, skipping...');
      } else {
        console.warn('⚠️  Error seeding slots:', slotsError.message);
      }
    } else {
      console.log('✅ Delivery slots created successfully');
    }

    console.log('\n✅ Database seeding completed!\n');
    console.log('📋 Demo Credentials:');
    console.log('   Customer:  customer1@example.com / admin123');
    console.log('   Admin:     admin@fooddelivery.com / admin123');
    console.log('   Agent:     agent1@fooddelivery.com / admin123\n');

  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
          flour_type: 'Wheat',
          price: 4.00,
          quantity: 120,
          image_url: '/images/wheat-chapati.jpg',
          is_active: true
        }
      ])
      .select();

    if (productsError && !productsError.message.includes('duplicate')) {
      console.error('Error seeding products:', productsError);
    } else {
      console.log('✅ Products seeded');
    }

    // Seed Delivery Slots
    console.log('Adding delivery slots...');
    const { error: slotsError } = await supabaseAdmin
      .from('delivery_slots')
      .insert([
        {
          start_time: '07:00:00',
          end_time: '09:00:00',
          max_orders: 20,
          current_orders: 0,
          is_available: true
        },
        {
          start_time: '12:00:00',
          end_time: '14:00:00',
          max_orders: 25,
          current_orders: 0,
          is_available: true
        },
        {
          start_time: '18:00:00',
          end_time: '20:00:00',
          max_orders: 30,
          current_orders: 0,
          is_available: true
        }
      ]);

    if (slotsError && !slotsError.message.includes('duplicate')) {
      console.error('Error seeding delivery slots:', slotsError);
    } else {
      console.log('✅ Delivery slots seeded');
    }

    // Seed Coupons
    console.log('Adding coupons...');
    const { error: couponsError } = await supabaseAdmin
      .from('coupons')
      .insert([
        {
          code: 'WELCOME20',
          discount_type: 'percentage',
          discount_value: 20,
          min_order_value: 100,
          max_usage: 100,
          current_usage: 0,
          is_active: true
        },
        {
          code: 'SAVE50',
          discount_type: 'fixed',
          discount_value: 50,
          min_order_value: 200,
          max_usage: 50,
          current_usage: 0,
          is_active: true
        }
      ]);

    if (couponsError && !couponsError.message.includes('duplicate')) {
      console.error('Error seeding coupons:', couponsError);
    } else {
      console.log('✅ Coupons seeded');
    }

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
