import React from 'react';
import { Spinner } from '@blueprintjs/core';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Home = () => (
	<Wrapper>
		<div className="content">
			<h1 style={{ fontSize: '600%', color: '#f1f1f1' }}>HOME</h1>
		</div>
		<div className="loading" style={{ position: 'absolute' }}>
			{/* <Spinner /> */}
		</div>
	</Wrapper>
);

export default Home;
