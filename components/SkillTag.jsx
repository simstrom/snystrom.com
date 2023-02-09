import { useState } from 'react';
import skills from '../lib/skills';
import { CodeIcon } from './Icons';

const findSkill = (skillName) => {
	let skill = skills.find((o) => o.name === skillName);
	if (!skill) {
		skill = { name: skillName, icon: <CodeIcon /> };
	}
	return skill;
};

export default function SkillTag(props) {
	const [skill, setSkill] = useState(findSkill(props.skill));

	return (
		<div className="flex gap-2 items-center text-xs font-medium text-tertiary px-3 py-1 rounded bg-tertiary/60 dark:bg-tertiary/30">
			<div>{skill.icon}</div>
			<div>{skill.name}</div>
		</div>
	);
}
