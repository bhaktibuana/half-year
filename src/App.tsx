import React, { useEffect, useRef, useState } from 'react';

import Greetings from '@/components/greetings/Greetings';
import Questions from '@/components/questions/Questions';
import Celebrate from '@/components/celebrate/Celebrate';

import { themeSong } from '@/assets/sounds';

import {
	PhotoCard1,
	PhotoCard2,
	PhotoCard3,
	PhotoCard4,
} from '@/assets/images';

import '@/app.scss';

const App = () => {
	const audioRef = useRef<HTMLAudioElement>(null);

	const [step, setStep] = useState<number>(1);
	const [musicPlaying, setMusicPlaying] = useState<boolean>(true);

	// 🔥 Unlock audio saat user pertama kali klik (biar terasa autoplay)
	useEffect(() => {
		const unlockAudio = () => {
			const music = audioRef.current;
			if (!music) return;

			music.muted = false;

			music
				.play()
				.then(() => {
					setMusicPlaying(true);
				})
				.catch(() => {});

			window.removeEventListener('click', unlockAudio);
		};

		window.addEventListener('click', unlockAudio);

		return () => {
			window.removeEventListener('click', unlockAudio);
		};
	}, []);

	const toggleMusic = () => {
		const music = audioRef.current;
		if (!music) return;

		if (musicPlaying) {
			music.pause();
			setMusicPlaying(false);
		} else {
			music.muted = false;

			music
				.play()
				.then(() => {
					setMusicPlaying(true);
				})
				.catch(() => {});
		}
	};

	return (
		<>
			<div className="app-container">
				<div className="hearts-bg"></div>

				<div className="container">
					{/* Step 1 */}
					{step === 1 && <Greetings setStep={setStep} />}

					{/* Step 2 */}
					{step === 2 && <Questions setStep={setStep} />}

					{/* Step 3 */}
					{step === 3 && (
						<Celebrate
							photoCards={[
								PhotoCard1,
								PhotoCard2,
								PhotoCard3,
								PhotoCard4,
							]}
						/>
					)}
				</div>

				{/* 🎵 Audio */}
				<audio ref={audioRef} loop autoPlay muted>
					<source src={themeSong} type="audio/mpeg" />
				</audio>

				{/* 🔊 Toggle */}
				<button id="music-toggle" onClick={toggleMusic}>
					{musicPlaying ? '🔊' : '🔇'}
				</button>
			</div>
		</>
	);
};

export default App;
