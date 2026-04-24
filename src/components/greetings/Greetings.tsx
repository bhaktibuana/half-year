import React from 'react';

import '@/components/greetings/greetings.scss';

type GreetingsProps = {
	setStep: (step: number) => void;
};

const Greetings: React.FC<GreetingsProps> = ({ setStep }) => {
	return (
		<>
			<div>
				<h1 className="greetings-title">
					Hey love... today is a special day for us ❤️
				</h1>

				<button className="greeting-button" onClick={() => setStep(2)}>
					Open the letter 💌
				</button>
			</div>
		</>
	);
};

export default Greetings;
