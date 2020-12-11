import React from 'react';
import { BsX } from 'react-icons/bs';
import './error.css';

const Error = ({ errMsg, closeModal }) => {
	let { title, content } = errMsg;
	return (
		<div className='error'>
			<div className='modal__overlay'>
				<div className='modal__window'>
					<div className='modal__titlebar'>
						<span className='modal__title'>{title}</span>
						<button className='modal__close' onClick={() => closeModal()}>
							<BsX />
						</button>
					</div>
					<div className='modal__content'>{content}</div>
				</div>
			</div>
		</div>
	);
};

export default Error;
