import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, increment, setDoc } from 'firebase/firestore';

export default async function Views(req, res) {
	const firebaseConfig = {
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		projectId: process.env.FIREBASE_PROJECT_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.FIREBASE_APP_ID,
	};

	const app = initializeApp(firebaseConfig);
	const slug = req.query.slug;
	const db = getFirestore(app);

	const docRef = doc(db, 'articles', slug);
	await setDoc(docRef, { views: increment(1) }, { merge: true });
	const docSnap = await getDoc(docRef);
	const data = docSnap.data();

	res.json(data);
}
