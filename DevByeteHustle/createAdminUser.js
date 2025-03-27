const admin = require('firebase-admin');
const path = require('path');

// Set the path to your service account key file
const serviceAccountPath = path.resolve(__dirname, 'devbyteshustle-firebase-adminsdk-fbsvc-a82cd3d7de.json');

// Initialize Firebase Admin SDK
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

async function createAdminUser() {
  const email = 'admin2@gmail.com';
  const password = '123456789';
  const adminUser = {
    name: 'Admin',
    email: email,
    phone: '1234567890',
  };

  try {
    // Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      emailVerified: true, 
      displayName: adminUser.name,
    });

    // Add user data to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      ...adminUser,
      uid: userRecord.uid,
      role: 'admin', // Set the role in Firestore
    });

    // Set custom claims
    await auth.setCustomUserClaims(userRecord.uid, { admin: true });

    console.log('Admin user created and added to Firestore successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();ggg