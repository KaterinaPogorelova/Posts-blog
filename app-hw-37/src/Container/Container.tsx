import { ReactNode } from "react";

export const Container = (props: { children: ReactNode }) => (
	<div className="container">
		{props.children}
	</div>
)