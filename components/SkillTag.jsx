import { useEffect } from 'react';
import skills from '../lib/skills';

export default function SkillTag({ skill }) {
	useEffect(() => {
		let foundSkill = skills.find((o) => o.name === skill);
		console.log(foundSkill);
	}, [skill]);

	return <div>{}</div>;
}
