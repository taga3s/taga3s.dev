import type { FC } from "hono/jsx";

type Props = {
	title: string;
};
export const ImageBase: FC<Props> = ({ title }) => {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				justifyContent: "space-between",
				flexDirection: "column",
				backgroundColor: "#fef9ef",
				fontWeight: 600,
				padding: 64,
				borderRight: "56px solid #38bcd3",
			}}
		>
			<div
				style={{
					color: "#000000",
					fontSize: 56,
					maxWidth: 1000,
					marginTop: 24,
				}}
			>
				{title}
			</div>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<div
					style={{
						color: "#000000",
						fontSize: 48,
						display: "flex",
						alignItems: "center",
					}}
				>
					<img
						src="https://avatars.githubusercontent.com/u/107479598?s=400&u=fc33cc981efd0eec445dba32cfc294a4e6a045ec&v=4"
						alt="taga3s-dev"
						width={64}
						height={64}
						style={{ borderRadius: 9999, marginRight: 24 }}
					/>
					taga3s-dev
				</div>
			</div>
		</div>
	);
};
