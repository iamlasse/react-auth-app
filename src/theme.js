import { normalizeColor } from 'grommet/utils'
import { rgba } from 'polished'

export default {
	accordion: {},
	icon: {
		size: {
			small: '20px',
			medium: '24px',
			large: '48px',
			xlarge: '96px'
		},
		extend: undefined
	},
	global: {
		icon: {},

		font: {
			family: 'Roboto',
			size: '14px',
			height: '20px'
		},
		edgeSize: {
			small: '14px'
		},
		elevation: {
			light: {
				medium:
					'0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
			}
		},
		colors: {
			text: {
				light: 'rgba(0, 0, 0, 0.87)'
			},
			'brand-1': '#aa3355',
			'brand-2': '#ccaa88'
		}
	},
	anchor: {
		color: '#cc44ee'
	},
	button: {
		border: {
			width: '1px',
			radius: '50px'
		},
		padding: {
			vertical: '16px',
			horizontal: '16px'
		},
		extend: props => `
     text-transform: uppercase;
     font-size: 0.875rem;
     font-weight: 700;
     line-height: normal;

    ${!props.primary &&
		` padding: 10px;
      border-color: ${rgba(normalizeColor(props.colorValue, props.theme), 0.5)};
      color: ${normalizeColor(props.colorValue, props.theme)};
      :hover {
         box-shadow: none;
         background-color: ${rgba(normalizeColor(props.colorValue, props.theme), 0.08)};
       }
     `}
   `
	}
}
