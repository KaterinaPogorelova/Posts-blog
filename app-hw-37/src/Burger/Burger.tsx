import React, { ReactNode } from 'react';
import '../Menu/menu.css';
import { ReactComponent as Bars } from "./bars-solid.svg"
import { ReactComponent as Xmark } from "./xmark-solid.svg"

type Props = {
	children: ReactNode,
	btnState: boolean,
	click: () => void
}

export const Burger = (props: Props) => {
	return (
		<button className="menu__btn" onClick={props.click}>
			<input id="menu__toggle" type="checkbox" />
			{props.btnState ? <Bars /> : <Xmark />}
		</button >)
}
