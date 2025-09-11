'use client';

import React, { useState } from 'react';
import TabList from '../ui/TabList';

interface TabListProps {
	labels: string[];
	children: React.ReactNode[];
}

export default function Tabs({ labels = ['Preview', 'Code'], children, ...props }: TabListProps) {
	const [activeView, setActiveView] = useState<number>(0);

	return (
		<>
			<TabList
				labels={labels}
				selected={activeView}
				setSelected={setActiveView}
				className="mt-8 w-full"
			/>
			<div className="">
				{children.map((child, idx) => activeView === idx && <div key={idx}>{child}</div>)}
			</div>
		</>
	);
}
