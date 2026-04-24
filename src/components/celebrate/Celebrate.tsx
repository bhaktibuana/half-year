import React, { useEffect, useState } from 'react';

import { Celebrate1 } from '@/assets/images';

import '@/components/celebrate/celebrate.scss';

const Celebrate = () => {
	const [phase, setPhase] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setPhase((prev) => (prev === 1 ? 2 : 1));
		}, 3500); // durasi tiap phase

		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			<h1 className="celebrate-title">Knew you would say yes! 🎉</h1>

			<div className="gif-container">
				<img id="cat-gif" src={Celebrate1} />
			</div>

			{/* Phase 1 */}
			<div className={`message-group ${phase === 1 ? 'show' : 'hide'}`}>
				<p className="yes-message delay-1">
					I love you too, my sweetheart ❤️
				</p>
				<p className="yes-message delay-2">
					6 months with you feels like a dream 💕
				</p>
			</div>

			{/* Phase 2 */}
			<div className={`message-group ${phase === 2 ? 'show' : 'hide'}`}>
				<p className="yes-message delay-1">
					Thank you for staying with me all this time...
				</p>
				<p className="yes-message delay-2">
					And I hope we stay together for a long, long time 🥰
				</p>
				<p className="yes-message delay-3">
					Half a year loving you, and forever to go 💖
				</p>
			</div>
		</div>
	);
};

export default Celebrate;
