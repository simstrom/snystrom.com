import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

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
	const db = getFirestore(app);

	const colRef = collection(db, 'articles');
	const docsSnap = await getDocs(colRef);

	let articles = [];
	docsSnap.forEach((doc) => {
		articles.push({ id: doc.id, data: doc.data() });
	});

	res.json(articles);
}
