import React from 'react';
import './loading.css';

const Loading = () => {
	return (
		<div className='loader'>
			<div className='loader__overlay'>
				<div className='loader__content'>
					<div className='loader__text'>Loading...</div>
					<div className='loader__spinner'></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
