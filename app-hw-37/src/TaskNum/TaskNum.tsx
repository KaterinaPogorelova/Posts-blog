import React, { ReactNode } from 'react';

export const TaskNum = (text: { children: string }) => (
	<h2 className='task-title'>{text.children}</h2>
)