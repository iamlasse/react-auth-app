import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`
const Spinner = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #333;
	font-size: 18px;
	font-family: sans-serif;
	&:before {
		display: inline-block;
		content: '';
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: solid 4px #ccc;
		border-bottom-color: #55aaeeff;
		animation: ${rotate360} 0.5s linear infinite;
		margin-right: 10px;
		vertical-align: bottom;
	}
`
const Loading = () => <Spinner>Loading</Spinner>
export default Loading
