import React, { useEffect, useState } from 'react';

import {
	Question1,
	Question2,
	Question3,
	Question4,
	Question5,
	Question6,
	Question7,
	Question8,
} from '@/assets/images';

import '@/components/questions/question.scss';

const yesTeasePokes = [
	"Try clicking 'No' first... I promise it's interesting 😏",
	"Come on, just hit 'No' once 👀",
	"You're kinda missing the fun 😈",
	"Go ahead... click 'No', I dare you 😏",
];

const noMessages = [
	'No',
	'Are you sure? 🤔',
	'Pookie please... 🥺',
	"If you say no, I'll be really sad...",
	'I would be very, very sad... 😢',
	'Please??? ❤️',
];

type ToastElement = HTMLElement & {
	_timer?: ReturnType<typeof setTimeout>;
};

type CatGifElement = HTMLElement & {
	src?: string;
};

type QuestionsProps = {
	setStep: (step: number) => void;
};

const Questions: React.FC<QuestionsProps> = ({ setStep }) => {
	const noBtn = document.getElementById('no-btn') as HTMLElement;
	const yesBtn = document.getElementById('yes-btn') as HTMLElement;
	const catGif = document.getElementById('cat-gif') as CatGifElement;

	const gifStages = [
		Question1,
		Question2,
		Question3,
		Question4,
		Question5,
		Question6,
		Question7,
		Question8,
	];

	const [yesTeasedCount, setYesTeasedCount] = useState<number>(0);
	const [noClickCount, setNoClickCount] = useState<number>(0);
	const [runawayEnabled, setRunawayEnabled] = useState<boolean>(false);

	const handleYesClick = () => {
		if (!runawayEnabled) {
			const msg =
				yesTeasePokes[
					Math.min(yesTeasedCount, yesTeasePokes.length - 1)
				];
			setYesTeasedCount((prev) => prev + 1);
			showTeaseMessage(msg);
			return;
		}
		setStep(3);
	};

	const handleNoClick = () => {
		setNoClickCount((prev) => prev + 1);
	};

	useEffect(() => {
		if (noClickCount > 0) {
			const msgIndex = Math.min(noClickCount, noMessages.length - 1);
			noBtn.textContent = noMessages[msgIndex];

			const currentSize = parseFloat(
				window.getComputedStyle(yesBtn).fontSize,
			);
			yesBtn.style.fontSize = `${currentSize * 1.35}px`;

			if (noClickCount >= 2) {
				const noSize = parseFloat(
					window.getComputedStyle(noBtn).fontSize,
				);
				noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`;
			}

			const gifIndex = Math.min(noClickCount, gifStages.length - 1);
			swapGif(gifStages[gifIndex]);

			if (noClickCount >= 5 && !runawayEnabled) {
				enableRunaway();
				setRunawayEnabled(true);
			}
		}
	}, [noClickCount]);

	const showTeaseMessage = (msg: string) => {
		const toast = document.getElementById('tease-toast') as ToastElement;
		toast.textContent = msg;
		toast.classList.add('show');
		clearTimeout(toast._timer);
		toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
	};

	const swapGif = (src: string) => {
		catGif.style.opacity = '0';
		setTimeout(() => {
			catGif.src = src;
			catGif.style.opacity = '1';
		}, 200);
	};

	const enableRunaway = () => {
		noBtn.addEventListener('mouseover', runAway);
		noBtn.addEventListener('touchstart', runAway, { passive: true });
	};

	const runAway = () => {
		const margin = 20;
		const btnW = noBtn.offsetWidth;
		const btnH = noBtn.offsetHeight;
		const maxX = window.innerWidth - btnW - margin;
		const maxY = window.innerHeight - btnH - margin;

		const randomX = Math.random() * maxX + margin / 2;
		const randomY = Math.random() * maxY + margin / 2;

		noBtn.style.position = 'fixed';
		noBtn.style.left = `${randomX}px`;
		noBtn.style.top = `${randomY}px`;
		noBtn.style.zIndex = '50';
	};

	return (
		<>
			<div>
				<h1 className="question-title">
					You still love me, right baby? ❤️
				</h1>

				<div className="question-gif-container">
					<img id="cat-gif" className="cat-gif" src={Question1}></img>
				</div>

				<div className="question-buttons">
					<button id="yes-btn" onClick={handleYesClick}>
						Yes
					</button>

					<button id="no-btn" onClick={handleNoClick}>
						No
					</button>
				</div>

				<div id="tease-toast"></div>
			</div>
		</>
	);
};

export default Questions;
