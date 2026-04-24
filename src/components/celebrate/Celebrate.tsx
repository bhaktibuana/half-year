import React, { useEffect, useState } from 'react';

import { Celebrate1, PhotoCard1, PhotoCard2, PhotoCard3, PhotoCard4 } from '@/assets/images';

import '@/components/celebrate/celebrate.scss';

const Celebrate = () => {
	const [phase, setPhase] = useState(1);

	useEffect(() => {
		const interval = setInterval(() => {
			setPhase((prev) => (prev === 1 ? 2 : 1));
		}, 3500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="celebrate-wrapper">
			{/* LEFT PHOTOS */}
			<div className="side-photos left">
				<img src={PhotoCard1} className="photo-card rotate-1" />
				<img src={PhotoCard2} className="photo-card rotate-2" />
			</div>

			{/* MAIN CONTENT */}
			<div className="main-content">
				<h1 className="celebrate-title">Knew you would say yes! 🎉</h1>

				<div className="gif-container">
					<img id="cat-gif" src={Celebrate1} />
				</div>

				<div
					className={`message-group ${phase === 1 ? 'show' : 'hide'}`}
				>
					<p className="yes-message delay-1">
						I love you too, my sweetheart ❤️
					</p>
					<p className="yes-message delay-2">
						6 months with you feels like a dream 💕
					</p>
				</div>

				<div
					className={`message-group ${phase === 2 ? 'show' : 'hide'}`}
				>
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

			{/* RIGHT PHOTOS */}
			<div className="side-photos right">
				<img src={PhotoCard3} className="photo-card rotate-3" />
				<img src={PhotoCard4} className="photo-card rotate-4" />
			</div>
		</div>
	);
};

export default Celebrate;
