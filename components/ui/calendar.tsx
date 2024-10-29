type CalendarProps = {
	activityDates: Date[];
};

export default function Calendar({ activityDates }: CalendarProps) {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const daysInMonth = lastDay.getDate();

	// Get the starting day (0 = Sunday, 6 = Saturday)
	const startingDay = (firstDay.getDay() + 6) % 7; // Shift Sunday (0) to the end

	// Create a frequency map to count activities per day
	const activityCountMap = activityDates.reduce((map, date) => {
		const dayKey = date.getDate();
		map[dayKey] = (map[dayKey] || 0) + 1;
		return map;
	}, {} as Record<number, number>);

	const calendarBoxes = [];
	// Fill in the empty boxes before the first day of the month
	for (let i = 0; i < startingDay; i++) {
		calendarBoxes.push(
			<div key={`empty-${i}`} className="w-8 h-8 bg-transparent rounded-md"></div>
		);
	}

	// Fill in the boxes for each day of the month
	for (let day = 1; day <= daysInMonth; day++) {
		const activityCount = activityCountMap[day] || 0;
		// Apply different styles based on the number of activities
		const boxStyle =
			activityCount > 1
				? 'bg-brand'
				: activityCount === 1
				? 'bg-brand-secondary'
				: 'bg-black/10 dark:bg-white/5';
		calendarBoxes.push(<div key={day} className={`w-8 h-8 rounded-md ${boxStyle}`} />);
	}

	return <div className="grid grid-cols-7 gap-3">{calendarBoxes}</div>;
}
