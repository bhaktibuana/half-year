import React, { useEffect, useState } from 'react';

import { Celebrate1 } from '@/assets/images';

import '@/components/celebrate/celebrate.scss';

type CelebrateProps = {
	photoCards: string[];
};

const Celebrate: React.FC<CelebrateProps> = ({ photoCards }) => {
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
				<img
					src={photoCards[0]}
					className="photo-card rotate-1"
					loading="lazy"
					onLoad={(e) => e.currentTarget.classList.add('loaded')}
				/>

				<img
					src={photoCards[1]}
					className="photo-card rotate-2"
					loading="lazy"
					onLoad={(e) => e.currentTarget.classList.add('loaded')}
				/>
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
				<img
					src={photoCards[2]}
					className="photo-card rotate-3"
					loading="lazy"
					onLoad={(e) => e.currentTarget.classList.add('loaded')}
				/>

				<img
					src={photoCards[3]}
					className="photo-card rotate-4"
					loading="lazy"
					onLoad={(e) => e.currentTarget.classList.add('loaded')}
				/>
			</div>
		</div>
	);
};

export default Celebrate;
