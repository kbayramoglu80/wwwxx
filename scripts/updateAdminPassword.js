const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '../.env' });

async function updateAdminPassword() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB'ye bağlanıldı.");

        const admin = await User.findOne({ email: 'admin@admin.com' });
        
        if (!admin) {
            console.log('Admin kullanıcısı bulunamadı.');
            process.exit();
        }

        const newPassword = 'Giz1234';
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        admin.password = hashedPassword;
        await admin.save();
        
        console.log('✓ Admin şifresi başarıyla güncellendi.');
        console.log('E-posta: admin@admin.com');
        console.log('Yeni Şifre: Giz1234');
        process.exit();
    } catch (err) {
        console.error('Hata:', err);
        process.exit(1);
    }
}

updateAdminPassword();
