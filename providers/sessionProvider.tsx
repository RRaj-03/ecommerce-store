"use client";
import { SessionProvider as Session } from "next-auth/react";
import React, { useEffect, useState } from "react";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) {
		return null;
	}
	return (
		<>
			<Session>{children}</Session>
		</>
	);
};

export default SessionProvider;
