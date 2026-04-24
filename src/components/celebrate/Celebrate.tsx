import React from 'react';

import { Celebrate1 } from '@/assets/images';

import '@/components/celebrate/celebrate.scss';

const Celebrate = () => {
	return (
		<>
			<div>
				<h1 className="celebrate-title">Knew you would say yes! 🎉</h1>

				<div className="gif-container">
					<img id="cat-gif" src={Celebrate1}></img>
				</div>

				<p className="yes-message">I love you too, my sweetheart ❤️</p>
				<p className="yes-message">Happy 6 Months Anniversary 🥰</p>
				<p className="yes-message">
					Thank you for staying with me all this time...
				</p>
				<p className="yes-message">
					And I hope we stay together for a long, long time 💕
				</p>
			</div>
		</>
	);
};

export default Celebrate;
